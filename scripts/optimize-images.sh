#!/usr/bin/env bash
# Optimize every image in public/products/ for the web (macOS, uses sips).
# Product/lifestyle images: max 1600px wide. hero: max 1920px. JPEG quality ~80.
set -euo pipefail
cd "$(dirname "$0")/../public/products"

shopt -s nullglob
for f in *.jpg *.jpeg *.png *.webp; do
  base="${f%.*}"
  max=1600
  [[ "$base" == "hero" ]] && max=2400
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/ {print $2}')
  if [[ "$w" -gt "$max" ]]; then
    sips --resampleWidth "$max" "$f" >/dev/null
    echo "resized $f: ${w}px -> ${max}px"
  fi
  if [[ "$f" == *.png ]]; then
    sips -s format jpeg -s formatOptions 80 "$f" --out "${base}.jpg" >/dev/null
    rm "$f"
    echo "converted $f -> ${base}.jpg"
  fi
done
echo "done. Rebuild with: npm run build"
