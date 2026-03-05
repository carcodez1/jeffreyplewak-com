#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PACK_DIR="$ROOT_DIR/prompts/promptpack-v1"
MANIFEST_PATH="$PACK_DIR/manifest.json"
SIG_PATH="$PACK_DIR/manifest.json.sig"

if [[ ! -f "$MANIFEST_PATH" ]]; then
  echo "Missing manifest: $MANIFEST_PATH" >&2
  echo "Run: bash scripts/prompts/sign-prompts.sh" >&2
  exit 1
fi

mapfile -t PROMPT_FILES < <(
  find "$PACK_DIR" -maxdepth 1 -type f -name '*.md' -print \
    | sed "s#^$PACK_DIR/##" \
    | LC_ALL=C sort
)

if [[ "${#PROMPT_FILES[@]}" -eq 0 ]]; then
  echo "No prompt markdown files found in $PACK_DIR" >&2
  exit 1
fi

for rel in "${PROMPT_FILES[@]}"; do
  file="$PACK_DIR/$rel"
  grep -q '^Author:' "$file" || { echo "Missing Author header in $rel" >&2; exit 1; }
  grep -q '^Created:' "$file" || { echo "Missing Created header in $rel" >&2; exit 1; }
  grep -q '^License:' "$file" || { echo "Missing License header in $rel" >&2; exit 1; }
done

node - <<'NODE' "$PACK_DIR" "$MANIFEST_PATH"
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const [, , packDir, manifestPath] = process.argv;
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

if (!manifest || !Array.isArray(manifest.files)) {
  console.error("Invalid manifest format.");
  process.exit(1);
}

function sha256(filePath) {
  const bytes = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

for (const entry of manifest.files) {
  const rel = String(entry.path || "");
  const expected = String(entry.sha256 || "");
  const abs = path.join(packDir, rel);
  if (!fs.existsSync(abs)) {
    console.error(`Manifest entry missing on disk: ${rel}`);
    process.exit(1);
  }
  const actual = sha256(abs);
  if (actual !== expected) {
    console.error(`Hash mismatch for ${rel}`);
    process.exit(1);
  }
}
NODE

if [[ -n "${COSIGN_PUBKEY:-}" && -f "$SIG_PATH" ]]; then
  if ! command -v cosign >/dev/null 2>&1; then
    echo "cosign not installed but COSIGN_PUBKEY is set." >&2
    exit 1
  fi
  cosign verify-blob \
    --key "$COSIGN_PUBKEY" \
    --signature "$SIG_PATH" \
    "$MANIFEST_PATH" >/dev/null
  echo "Cosign signature verification passed."
else
  echo "Skipping cosign verification (set COSIGN_PUBKEY and provide manifest.json.sig)."
fi

echo "Prompt verification passed."
