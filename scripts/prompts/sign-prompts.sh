#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PACK_DIR="$ROOT_DIR/prompts/promptpack-v1"
MANIFEST_PATH="$PACK_DIR/manifest.json"
SIG_PATH="$PACK_DIR/manifest.json.sig"

if [[ ! -d "$PACK_DIR" ]]; then
  echo "Missing prompt pack directory: $PACK_DIR" >&2
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

node - <<'NODE' "$PACK_DIR" "$MANIFEST_PATH" "${PROMPT_FILES[@]}"
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const [, , packDir, manifestPath, ...files] = process.argv;

function sha256(filePath) {
  const bytes = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

const manifest = {
  promptpack: "promptpack-v1",
  version: 1,
  files: files.map((rel) => ({
    path: rel,
    sha256: sha256(path.join(packDir, rel)),
  })),
};

const out = JSON.stringify(manifest, null, 2) + "\n";
fs.writeFileSync(manifestPath, out, "utf8");
NODE

if command -v cosign >/dev/null 2>&1 && [[ -n "${COSIGN_KEY:-}" ]]; then
  cosign sign-blob \
    --yes \
    --key "$COSIGN_KEY" \
    --output-signature "$SIG_PATH" \
    "$MANIFEST_PATH"
  echo "Manifest signed: $SIG_PATH"
else
  echo "Manifest generated: $MANIFEST_PATH"
  echo "Skipping cosign signature (set COSIGN_KEY and ensure cosign is installed)."
fi
