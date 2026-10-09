#!/bin/bash
# usage: encode.sh <srcdir with Desktop.mp4 Mobile.mp4 poster-*.jpg> <site public dir>
set -e
S=$1; D=$2; mkdir -p $D
for v in desktop mobile; do V=$( [ $v = desktop ] && echo Desktop || echo Mobile )
  ffmpeg -y -loglevel error -i $S/$V.mp4 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -an $D/$v.mp4
  ffmpeg -y -loglevel error -i $S/$V.mp4 -c:v libvpx-vp9 -crf 46 -b:v 0 -row-mt 1 -deadline good -cpu-used 3 -an $D/$v.webm
  ffmpeg -y -loglevel error -i $S/poster-$v.jpg -c:v libwebp -quality 78 $D/poster-$v.webp
done
ffmpeg -y -loglevel error -i $S/poster-desktop.jpg -vf "scale=1200:-1,crop=1200:630" -q:v 4 $D/og.jpg
ls -la $D
