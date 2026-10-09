# Motolia case animation (finarena.pl/realizacje/motolia)

Screen-led animation of the motolia.pl customer journey, built from real screens.
Output: `public/cases/motolia/{desktop,mobile}.{mp4,webm}` + posters in the site repo.

## Rules
- Real screens only, recorded on production **without submitting any form** (test data typed, never sent).
- No metrics or results on screen: the response-time claim on the lead page is blurred by `capture.py`.
- The final hand-off card is an illustrative Finarena graphic ("widok poglądowy"), not a third-party UI.
  Replace it with a real Thulium recording once a test account is available.

## Rebuild
```bash
# 1. Capture screens (Python Playwright + Chromium). Writes public/d, public/m and src/*_meta.json
python3 capture.py d m

# 2. Render (Remotion 4). Pass a local headless Chrome if Remotion cannot download one.
npm i
npx remotion render MotoliaDesktop out/desktop.mp4 --codec=h264 --crf=26
npx remotion render MotoliaMobile  out/mobile.mp4  --codec=h264 --crf=26
npx remotion still  MotoliaDesktop out/poster-desktop.jpg --frame=205 --image-format=jpeg
npx remotion still  MotoliaMobile  out/poster-mobile.jpg  --frame=205 --image-format=jpeg

# 3. Web encodes (faststart MP4 + VP9 WebM fallback + WebP posters)
for v in desktop mobile; do
  ffmpeg -i out/$v.mp4 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -an web-$v.mp4
  ffmpeg -i out/$v.mp4 -c:v libvpx-vp9 -crf 46 -b:v 0 -row-mt 1 -an web-$v.webm
  ffmpeg -i out/poster-$v.jpg -c:v libwebp -quality 78 poster-$v.webp
done
```
Copy results to `../../../public/cases/motolia/` (names: desktop.mp4, desktop.webm, mobile.mp4, mobile.webm, poster-*.webp).

## Timing
Scenes, camera moves, pointer path and captions are data in `src/MotoliaCase.tsx`
(`desktopScript`, `mobileScript`, 30 fps, 540 frames). Element positions come from `src/*_meta.json`.
If motolia.pl changes layout, re-capture and adjust the pointer/camera keys.

License: Remotion is free for teams of up to 3 people (https://www.remotion.pro/license).
