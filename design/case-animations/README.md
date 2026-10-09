# Case study animations (finarena.pl/realizacje)

Screen-led animations for the case studies. Each case = real screens captured with Playwright on
**test data**, assembled in Remotion into two variants: 16:9 laptop (browser frame) and 4:5 phone
(full-width screen). Output goes to `public/cases/<slug>/` and is streamed by
`src/app/media/case/[slug]/[file]/route.ts` (byte ranges, needed by iOS Safari).

| Case | Source of screens | How it was run for capture |
| --- | --- | --- |
| motolia | motolia.pl (production) | browsing only, inquiry form typed but **never submitted** |
| izzycheck | kameel77/izzycheck, local build | `AUDATEX_MOCK_MODE=true` (anonymised fixtures), demo account, fictional VINs |
| printflow | kameel77/printflow, local build | fictional catalog `capture/printflow_demo_catalog.json`, fictional client; cost/margin blurred; e-mail sending simulated by setting status SENT locally |
| talentpilot | kameel77/talentpilot, local build | fictional team created by `capture/tp_team.py` (6 people, full 34 rankings) |
| voicebot | no UI — reconstruction | built directly in Remotion from the repo's tool schema and Thulium ticket body format |

## Rules (keep for every new case)
- Test or fictional data only. No real customer data, no metrics/results on screen.
- Blur internal economics (cost, margin) and hide client brand marks.
- A screen that is not the real product UI is labelled "widok poglądowy" / "rekonstrukcja".
- Captions: max 2 lines on the laptop card (~60 characters).

## Layout
- `remotion/src/Screen.tsx` — browser frame, screen with camera/pointer/clicks, captions.
- `remotion/src/Layouts.tsx` — `CaseDesktop` (1920×1080) and `CaseMobile` (1080×1350).
- `remotion/src/<Case>Case.tsx` — one script per case: shots (`h`/`w` = page size in CSS px),
  camera keys `[frame, focusX, focusY, scale]`, pointer keys, clicks, captions. 30 fps, 540 frames.
- `capture/*.py` — capture scripts (paths inside point to the local work dir; adjust before reuse).
- `capture/encode.sh` — faststart MP4 + VP9 WebM + WebP posters + OG image.

## Render
```bash
cd remotion && npm i
# copy captured PNGs to remotion/public/<case>/ (see shot paths in each *Case.tsx)
npx remotion render IzzyDesktop out/izzy/Desktop.mp4 --codec=h264 --crf=26
npx remotion render IzzyMobile  out/izzy/Mobile.mp4  --codec=h264 --crf=26
npx remotion still  IzzyDesktop out/izzy/poster-desktop.jpg --frame=300 --image-format=jpeg
npx remotion still  IzzyMobile  out/izzy/poster-mobile.jpg  --frame=300 --image-format=jpeg
../capture/encode.sh out/izzy ../../../public/cases/izzycheck
```
Pass `--browser-executable` with a local headless Chrome if Remotion cannot download one.

Remotion is free for teams of up to 3 people (https://www.remotion.pro/license).
