#!/usr/bin/env bash
set -euo pipefail

# scripts/get-assets.sh
# Deterministic, retrying asset fetch with validation.
# - Creates expected public/asset dirs
# - Downloads SVG icons from multiple sources
# - Rejects non-SVG responses (HTML 404 pages, rate-limit pages, etc.)
# - Writes clean logs to stderr and returns non-zero on failure

ROOT="${ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
ICONS_DIR="$ROOT/public/assets/icons"
BG_DIR="$ROOT/public/assets/background"

CURL_COMMON=(
  --fail
  --location
  --silent
  --show-error
  --connect-timeout 10
  --max-time 60
  --retry 5
  --retry-delay 1
  --retry-all-errors
  --compressed
)

log() { printf '%s\n' "$*" >&2; }
die() { log "ERROR: $*"; exit 1; }

ensure_dirs() {
  log "Ensuring asset directories exist…"
  mkdir -p "$ICONS_DIR" "$BG_DIR"
}

is_svg_file() {
  local f="$1"
  grep -qiE '<svg(\s|>)' "$f"
}

download_one() {
  local url="$1"
  local out="$2"
  log "Trying $url"
  if curl "${CURL_COMMON[@]}" "$url" -o "$out.tmp"; then
    return 0
  else
    rm -f "$out.tmp"
    return 1
  fi
}

fetch_svg() {
  local name="$1"; shift
  local out="$ICONS_DIR/$name"
  local ok=0

  log ""
  log "--- Fetching $name"

  rm -f "$out" "$out.tmp"

  for url in "$@"; do
    if download_one "$url" "$out"; then
      if is_svg_file "$out.tmp"; then
        mv "$out.tmp" "$out"
        log "  ✓ saved to $out"
        ok=1
        break
      else
        log "  ✗ not an SVG payload from $url"
        rm -f "$out.tmp"
      fi
    else
      log "  ✗ failed from $url"
    fi
  done

  [[ "$ok" -eq 1 ]] || die "Unable to fetch valid SVG for $name"
}

fetch_bg_jpg() {
  local out="$BG_DIR/bg.jpg"
  log ""
  log "--- Downloading subtle neutral background image"

  rm -f "$out" "$out.tmp"

  local url="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1920"

  log "Trying $url"
  curl "${CURL_COMMON[@]}" "$url" -o "$out.tmp" || die "Background jpg download failed"

  python3 - <<'PY' "$out.tmp"
import sys
p=sys.argv[1]
b=open(p,'rb').read(2)
sys.exit(0 if b==b'\xff\xd8' else 1)
PY

  mv "$out.tmp" "$out"
  log "  ✓ saved to $out"
}

fetch_bg_webm() {
  local out="$BG_DIR/bg-loop.webm"
  log ""
  log "--- Downloading lightweight WebM loop"

  rm -f "$out" "$out.tmp"

  local url="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"

  log "Trying $url"
  curl "${CURL_COMMON[@]}" "$url" -o "$out.tmp" || die "Background webm download failed"

  python3 - <<'PY' "$out.tmp"
import sys
p=sys.argv[1]
b=open(p,'rb').read(4)
sys.exit(0 if b==bytes([0x1A,0x45,0xDF,0xA3]) else 1)
PY

  mv "$out.tmp" "$out"
  log "  ✓ saved to $out"
}

main() {
  ensure_dirs

  # Icons:
  # - GitHub / LinkedIn / Calendly from Simple Icons CDN fallback
  # - Mail from Bootstrap Icons (MIT)

  fetch_svg "github.svg" \
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" \
    "https://cdn.jsdelivr.net/npm/simple-icons@10/icons/github.svg"

  fetch_svg "linkedin.svg" \
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linkedin.svg" \
    "https://cdn.jsdelivr.net/npm/simple-icons@10/icons/linkedin.svg"

  fetch_svg "calendly.svg" \
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/calendly.svg" \
    "https://cdn.jsdelivr.net/npm/simple-icons@10/icons/calendly.svg"

  fetch_svg "mail.svg" \
    "https://raw.githubusercontent.com/twbs/icons/main/icons/envelope-fill.svg" \
    "https://raw.githubusercontent.com/twbs/icons/main/icons/envelope.svg"

  fetch_bg_jpg
  fetch_bg_webm

  log ""
  log "--- Asset download complete"
}

main "$@"