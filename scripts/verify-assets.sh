#!/usr/bin/env bash
set -euo pipefail

ROOT="${ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

need() {
  local p="$1"
  [[ -f "$p" ]] || { echo "MISSING: $p" >&2; exit 1; }
}

echo "Verifying required public assets…"

need "$ROOT/public/assets/icons/github.svg"
need "$ROOT/public/assets/icons/linkedin.svg"
need "$ROOT/public/assets/icons/mail.svg"
need "$ROOT/public/assets/background/bg.jpg"
need "$ROOT/public/assets/background/bg-loop.webm"

echo "Validating SVG payloads…"
grep -qiE '<svg(\s|>)' "$ROOT/public/assets/icons/github.svg"
grep -qiE '<svg(\s|>)' "$ROOT/public/assets/icons/linkedin.svg"
grep -qiE '<svg(\s|>)' "$ROOT/public/assets/icons/mail.svg"

echo "Validating file signatures…"
python3 - <<'PY' "$ROOT/public/assets/background/bg.jpg" "$ROOT/public/assets/background/bg-loop.webm"
import sys

jpg, webm = sys.argv[1], sys.argv[2]

with open(jpg,'rb') as f:
  if f.read(2) != b'\xff\xd8':
    raise SystemExit("bg.jpg is not JPEG")

with open(webm,'rb') as f:
  if f.read(4) != bytes([0x1A,0x45,0xDF,0xA3]):
    raise SystemExit("bg-loop.webm is not WebM")

print("OK")
PY

echo "OK: assets present and valid."