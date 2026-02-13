#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PKG_DIR="$ROOT_DIR/release/matlab-fileexchange-gpacalc"
OUT_DIR="$ROOT_DIR/release/packages"
OUT_ZIP="$OUT_DIR/gpacalc-matlab-fileexchange-v1.0.0.zip"

if [[ ! -d "$PKG_DIR" ]]; then
  echo "Package directory not found: $PKG_DIR" >&2
  exit 1
fi

cp -f "$ROOT_DIR/screenshot001.png" "$PKG_DIR/screenshot001.png"
mkdir -p "$OUT_DIR"
rm -f "$OUT_ZIP"

(
  cd "$PKG_DIR"
  zip -r "$OUT_ZIP" \
    Contents.m \
    gpacalc_*.m \
    README.md \
    SUBMISSION_COPY.md \
    LICENSE \
    screenshot001.png
)

echo "Built package: $OUT_ZIP"
