# scripts/normalize-svgs.sh
#!/usr/bin/env bash
set -euo pipefail

ICON_DIR="public/assets/icons"
echo "Normalizing SVG fills in ${ICON_DIR} (forcing currentColor)…"

if [[ ! -d "${ICON_DIR}" ]]; then
  echo "ERROR: ${ICON_DIR} not found"
  exit 1
fi

shopt -s nullglob
for f in "${ICON_DIR}"/*.svg; do
  # Remove fill/stroke attributes so CSS color works
  # Then ensure root svg has fill="currentColor" (safe even if present)
  perl -0777 -i -pe '
    s/\s(fill|stroke|style)="[^"]*"//g;
    s/<svg\b/<svg fill="currentColor"/ unless /<svg[^>]*\bfill="/;
  ' "$f"
  echo "  ✓ $(basename "$f")"
done

echo "Done."