#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <source.gif>"
  exit 1
fi

SRC="$1"
BASE="${SRC%.*}"

echo "Source GIF: $SRC"
echo "Output base: $BASE"

# Create a still poster frame
echo "Generating poster frame..."
ffmpeg -y -i "$SRC" -vf "select=eq(n\,0)" -q:v 3 "${BASE}-poster.png"

# Create a WebM optimized
echo "Generating WebM..."
ffmpeg -y -i "$SRC" \
  -c:v libvpx-vp9 \
  -b:v 0 \
  -crf 32 \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -auto-alt-ref 4 \
  -arnr-maxframes 7 \
  -quality good \
  "${BASE}.webm"

# Create an MP4 H.264 fallback
echo "Generating MP4..."
ffmpeg -y -i "$SRC" \
  -c:v libx264 \
  -profile:v high \
  -level 4.0 \
  -pix_fmt yuv420p \
  -crf 23 \
  -movflags +faststart \
  "${BASE}.mp4"

echo "Done."
echo "Generated files:"
echo "  - ${BASE}-poster.png"
echo "  - ${BASE}.webm"
echo "  - ${BASE}.mp4"review this