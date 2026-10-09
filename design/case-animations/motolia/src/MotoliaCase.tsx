import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrowserFrame, CaptionBlock, ScreenContent, Script } from "./Screen";
import { C, MONO, SANS, clamp01, kf, loadFonts } from "./theme";

export const DURATION = 540; // 18 s @ 30 fps

const URL_LIST = "motolia.pl/samochody";
const URL_OFFER = "motolia.pl/oferta/ford-focus-trend";
const URL_LEAD = "motolia.pl/oferta/ford-focus-trend/lead";

// Captions carry the reasoning; no metrics, no results.
const captionsFor = (navOffer: number, navForm: number, handoff: number) => [
  { from: 4, to: navOffer - 8, kicker: "01 · Wybór", text: "Klient od razu wybiera tryb: prywatnie czy na firmę." },
  { from: navOffer + 4, to: navForm - 8, kicker: "02 · Kalkulacja", text: "Rata przelicza się na żywo, bez wysyłania formularza." },
  { from: navForm + 4, to: handoff - 4, kicker: "03 · Zapytanie", text: "Formularz zna już auto i wybrane finansowanie." },
  { from: handoff + 6, to: DURATION - 22, kicker: "04 · Kontakt", text: "Konsultant zaczyna rozmowę od kontekstu, nie od zera." },
];

export const desktopScript: Script = {
  device: "browser",
  vw: 1440,
  vh: 900,
  shots: [
    { src: "d/01_list.png", at: 0, url: URL_LIST },
    { src: "d/02_list_firm.png", at: 49 },
    { src: "d/04_offer_firm.png", at: 118, fade: 10, url: URL_OFFER },
    { src: "d/05_slide1.png", at: 176 },
    { src: "d/06_slide2.png", at: 206 },
    { src: "d/07_offer_ask.png", at: 240 },
    { src: "d/08_form.png", at: 290, fade: 10, url: URL_LEAD },
    { src: "d/09_type_name0.png", at: 318 },
    { src: "d/10_type_name1.png", at: 323 },
    { src: "d/11_type_name2.png", at: 328 },
    { src: "d/12_type_name3.png", at: 333 },
    { src: "d/13_type_phone0.png", at: 356 },
    { src: "d/14_type_phone1.png", at: 362 },
    { src: "d/15_type_phone2.png", at: 368 },
    { src: "d/16_form_send.png", at: 400, fade: 8 },
    { src: "d/15_type_phone2.png", at: 430, fade: 8 },
  ],
  camera: [
    [0, 720, 450, 1],
    [62, 720, 450, 1],
    [95, 893, 560, 1.45],
    [108, 893, 560, 1.45],
    [122, 720, 450, 1],
    [140, 720, 450, 1],
    [168, 1029, 500, 1.75],
    [226, 1029, 500, 1.75],
    [246, 1029, 640, 1.75],
    [278, 1029, 640, 1.75],
    [294, 720, 450, 1],
    [300, 720, 450, 1],
    [318, 935, 540, 1.55],
    [392, 935, 540, 1.55],
    [402, 935, 450, 1.55],
    [426, 935, 450, 1.55],
    [446, 720, 450, 1],
  ],
  pointer: [
    [0, 1500, 720],
    [14, 1320, 600],
    [45, 1125, 268],
    [62, 1125, 268],
    [100, 893, 581],
    [118, 1100, 700],
    [160, 1235, 426],
    [170, 1235, 426],
    [176, 1284, 426],
    [196, 1284, 426],
    [206, 1333, 426],
    [216, 1333, 426],
    [246, 1186, 842],
    [290, 1000, 760],
    [314, 809, 508],
    [340, 809, 508],
    [352, 809, 614],
    [384, 809, 614],
    [398, 820, 560],
    [414, 935, 450],
  ],
  pointerOpacity: [
    [0, 0],
    [10, 1],
    [426, 1],
    [434, 0],
  ],
  clicks: [48, 104, 250, 316, 353, 418],
  captions: captionsFor(118, 290, 438),
  handoffAt: 438,
};

export const mobileScript: Script = {
  device: "mobileFull",
  vw: 390,
  vh: 844,
  shots: [
    { src: "m/01_list.png", at: 0, url: URL_LIST },
    { src: "m/02_list_firm.png", at: 30, fade: 8 },
    { src: "m/03_offer.png", at: 92, fade: 10, url: URL_OFFER },
    { src: "m/04_offer_firm.png", at: 136, fade: 10 },
    { src: "m/05_slide1.png", at: 180 },
    { src: "m/06_slide2.png", at: 210 },
    { src: "m/07_offer_ask.png", at: 240 },
    { src: "m/08_form.png", at: 284, fade: 10, url: URL_LEAD },
    { src: "m/09_type_name0.png", at: 310 },
    { src: "m/10_type_name1.png", at: 316 },
    { src: "m/11_type_name2.png", at: 322 },
    { src: "m/12_type_name3.png", at: 328 },
    { src: "m/13_type_phone0.png", at: 350 },
    { src: "m/14_type_phone1.png", at: 356 },
    { src: "m/15_type_phone2.png", at: 362 },
    { src: "m/16_form_send.png", at: 396, fade: 8 },
    { src: "m/15_type_phone2.png", at: 430, fade: 8 },
  ],
  // Screen fills the frame width at ~native size; the camera only pans vertically to the element in use.
  // Focus Y is offset so targets sit below the caption band at the top.
  camera: [
    [0, 195, 340, 1],
    [84, 195, 340, 1],
    [100, 195, 360, 1],
    [128, 195, 360, 1],
    [146, 195, 614, 1],
    [276, 195, 614, 1],
    [292, 195, 600, 1],
    [388, 195, 600, 1],
    [400, 195, 400, 1],
    [424, 195, 400, 1],
    [436, 195, 600, 1],
  ],
  pointer: [
    [0, 300, 620],
    [24, 240, 420],
    [44, 194, 310],
    [70, 200, 560],
    [140, 231, 690],
    [160, 231, 681],
    [172, 231, 681],
    [180, 267, 681],
    [202, 267, 681],
    [210, 303, 681],
    [222, 303, 681],
    [246, 272, 804],
    [286, 260, 640],
    [302, 195, 492],
    [336, 195, 600],
    [342, 195, 703],
    [380, 195, 703],
    [396, 195, 600],
    [410, 195, 422],
  ],
  pointerOpacity: [
    [0, 0],
    [14, 1],
    [70, 1],
    [84, 0],
    [146, 0],
    [158, 1],
    [424, 1],
    [432, 0],
  ],
  clicks: [48, 250, 304, 344, 414],
  captions: captionsFor(92, 284, 438),
  handoffAt: 438,
};

/** Illustrative hand-off card: clearly styled as Finarena graphic, not as a third-party UI. */
const Handoff: React.FC<{ at: number; scale: number }> = ({ at, scale }) => {
  const frame = useCurrentFrame();
  const t = clamp01(frame, at + 8, at + 30);
  const rows: [string, string][] = [
    ["Auto", "Ford Focus Trend"],
    ["Klient", "Firma"],
    ["Finansowanie", "Kredyt · 84 mies."],
    ["Kontakt", "Telefon"],
  ];
  const bubble = clamp01(frame, at + 58, at + 78);
  const u = (n: number) => n * scale;
  return (
    <div style={{ width: u(620), opacity: t, translate: `${(1 - t) * u(40)}px 0px` }}>
      <div style={{ background: C.card, border: `1px solid ${C.hairStrong}`, borderRadius: u(6), padding: u(34), boxShadow: "0 30px 70px -36px rgba(20,24,27,0.45)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: u(18) }}>
          <span style={{ fontFamily: MONO, fontSize: u(15), letterSpacing: "0.14em", color: C.accent }}>NOWE ZGŁOSZENIE</span>
          <span style={{ fontFamily: MONO, fontSize: u(12), letterSpacing: "0.06em", color: C.inkMute, border: `1px solid ${C.hairStrong}`, borderRadius: u(3), padding: `${u(4)}px ${u(8)}px` }}>
            widok poglądowy
          </span>
        </div>
        {rows.map(([label, value], i) => {
          const r = clamp01(frame, at + 20 + i * 7, at + 34 + i * 7);
          return (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: `${u(14)}px 0`,
                borderTop: `1px solid ${C.hair}`,
                opacity: r,
                fontFamily: SANS,
                fontSize: u(26),
              }}
            >
              <span style={{ color: C.inkMute }}>{label}</span>
              <span style={{ color: C.ink, fontWeight: 600 }}>{value}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: u(22),
          marginLeft: u(40),
          background: C.ink,
          color: C.paper,
          borderRadius: u(6),
          padding: `${u(22)}px ${u(28)}px`,
          opacity: bubble,
          translate: `0px ${(1 - bubble) * u(16)}px`,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: u(13), letterSpacing: "0.14em", color: "#E05C31", marginBottom: u(8) }}>SKRYPT ROZMOWY · KROK 1</div>
        <div style={{ fontFamily: SANS, fontSize: u(24), lineHeight: 1.3 }}>Potwierdź auto i formę finansowania, zapytaj o termin decyzji.</div>
      </div>
    </div>
  );
};

const useLoop = () => {
  const frame = useCurrentFrame();
  return kf(frame, [
    [0, 0],
    [12, 1],
    [DURATION - 18, 1],
    [DURATION - 1, 0],
  ]);
};

export const MotoliaDesktop: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  const s = desktopScript;
  const opacity = useLoop();
  const winW = 1500;
  const h = s.handoffAt;
  const winScale = kf(frame, [[h, 1], [h + 30, 0.62]]);
  const winX = kf(frame, [[h, 0], [h + 30, -330]]);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{ position: "absolute", left: 210, top: 34, scale: `${winScale}`, translate: `${winX}px 0px`, transformOrigin: "50% 50%" }}>
          <BrowserFrame script={s} width={winW}>
            <ScreenContent script={s} width={winW} height={(winW * s.vh) / s.vw} />
          </BrowserFrame>
        </div>
        <div style={{ position: "absolute", left: 1150, top: 250 }}>
          <Handoff at={h} scale={1.1} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 54,
            top: 846,
            width: 640,
            height: 190,
            background: "rgba(246,243,237,0.96)",
            border: `1px solid ${C.hairStrong}`,
            borderRadius: 6,
            boxShadow: "0 24px 50px -30px rgba(20,24,27,0.4)",
            opacity: kf(frame, [[DURATION - 26, 1], [DURATION - 14, 0]]),
          }}
        >
          <div style={{ position: "absolute", inset: "28px 34px" }}>
            <CaptionBlock captions={s.captions} size={36} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MotoliaMobile: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  const s = mobileScript;
  const opacity = useLoop();
  const W = 1080;
  const bar = 76;
  const screenH = 1350 - bar;
  const h = s.handoffAt;
  const dim = kf(frame, [[h, 1], [h + 26, 0.22]]);
  const shrink = kf(frame, [[h, 1], [h + 26, 0.94]]);
  const current = [...s.shots].reverse().find((x) => frame >= x.at && x.url) ?? s.shots[0];
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{ position: "absolute", inset: 0, scale: `${shrink}`, opacity: dim }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: bar, background: C.paper2, borderBottom: `1px solid ${C.hair}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 640, height: 46, borderRadius: 23, background: C.card, border: `1px solid ${C.hair}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 24, color: C.inkMute }}>
              {current.url}
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, top: bar, width: W, height: screenH }}>
            <ScreenContent script={s} width={W} height={screenH} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 92, top: 430 }}>
          <Handoff at={h} scale={1.44} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: bar,
            height: 200,
            background: "rgba(246,243,237,0.97)",
            borderBottom: `1px solid ${C.hairStrong}`,
            boxShadow: "0 18px 40px -30px rgba(20,24,27,0.5)",
            opacity: kf(frame, [[DURATION - 26, 1], [DURATION - 14, 0]]),
          }}
        >
          <div style={{ position: "absolute", inset: "26px 44px" }}>
            <CaptionBlock captions={s.captions} size={46} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
