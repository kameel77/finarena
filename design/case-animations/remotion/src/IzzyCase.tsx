import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { CaseDesktop, CaseMobile } from "./Layouts";
import { Caption, Script } from "./Screen";
import { C, MONO, clamp01 } from "./theme";

const URL_NEW = "izzycheck · nowe zapytanie";
const URL_REPORT = "izzycheck · raport IC-…";

const captions = (navReport: number, tabDamage: number, tabAudit: number, outro: number): Caption[] => [
  { from: 4, to: navReport - 6, kicker: "01 · Zapytanie", text: "Operator podaje VIN i wybiera moduły raportu." },
  { from: navReport + 4, to: tabDamage - 6, kicker: "02 · Moduły", text: "Każdy moduł działa osobno. Błąd jednego nie blokuje raportu." },
  { from: tabDamage + 4, to: tabAudit - 6, kicker: "03 · Szkody", text: "Strefy uszkodzeń z bazy, bez zgadywania części." },
  { from: tabAudit + 4, to: outro - 2, kicker: "04 · Audyt", text: "Każde wywołanie integracji zostawia ślad do sprawdzenia." },
  { from: outro + 8, to: 518, kicker: "05 · Dokument", text: "Zatwierdzony raport staje się niezmiennym PDF-em." },
];

// Page heights (CSS px) of the full-page captures
const H = {
  d: { form: 1196, report: 1367, damage: 3240, audit: 901 },
  m: { form: 1713, report: 2616, damage: 4949, audit: 1451 },
};

const shots = (dir: "d" | "m") => [
  { src: `izzy/${dir}/01_form.png`, at: 0, url: URL_NEW, h: H[dir].form },
  { src: `izzy/${dir}/02_vin0.png`, at: 30, h: H[dir].form },
  { src: `izzy/${dir}/03_vin1.png`, at: 40, h: H[dir].form },
  { src: `izzy/${dir}/04_vin2.png`, at: 50, h: H[dir].form },
  { src: `izzy/${dir}/05_filled.png`, at: 82, h: H[dir].form },
  { src: `izzy/${dir}/06_progress0.png`, at: 128, fade: 8, url: URL_REPORT, h: H[dir].report },
  { src: `izzy/${dir}/12_report.png`, at: 162, fade: 8, h: H[dir].report },
  { src: `izzy/${dir}/13_damage.png`, at: 258, h: H[dir].damage },
  { src: `izzy/${dir}/14_audit.png`, at: 371, h: H[dir].audit },
];

export const izzyDesktop: Script = {
  device: "browser",
  vw: 1440,
  vh: 900,
  bg: "#0b1120",
  shots: shots("d"),
  camera: [
    [0, 720, 450, 1],
    [20, 720, 450, 1],
    [32, 720, 380, 1.5],
    [56, 720, 380, 1.5],
    [70, 720, 430, 1.35],
    [88, 720, 430, 1.35],
    [112, 720, 900, 1.1],
    [124, 720, 900, 1.1],
    [134, 720, 450, 1],
    [140, 720, 300, 1.2],
    [170, 720, 300, 1.2],
    [200, 720, 700, 1.1],
    [232, 720, 1000, 1.1],
    [244, 720, 520, 1.1],
    [262, 720, 520, 1.1],
    [276, 720, 620, 1.2],
    [300, 560, 1400, 1.3],
    [342, 560, 1400, 1.3],
    [356, 720, 520, 1.1],
    [378, 720, 620, 1.2],
    [408, 720, 620, 1.2],
    [418, 1000, 300, 1.3],
    [432, 1000, 300, 1.3],
    [448, 720, 450, 1],
  ],
  pointer: [
    [0, 1300, 760],
    [14, 900, 420],
    [24, 760, 300],
    [56, 760, 300],
    [62, 518, 427],
    [72, 518, 427],
    [78, 921, 427],
    [92, 921, 427],
    [118, 720, 1136],
    [132, 900, 500],
    [236, 760, 600],
    [252, 513, 471],
    [262, 513, 471],
    [300, 560, 1330],
    [348, 600, 560],
    [366, 716, 471],
    [380, 760, 560],
    [420, 1264, 114],
  ],
  pointerOpacity: [
    [0, 0],
    [10, 1],
    [432, 1],
    [440, 0],
  ],
  clicks: [24, 64, 80, 122, 255, 368, 425],
  captions: captions(128, 258, 371, 436),
  handoffAt: 436,
};

// Mobile: full-width screen, caption band covers the top ~72 CSS px -> focus is offset down by ~36 px.
export const izzyMobile: Script = {
  device: "mobileFull",
  vw: 390,
  vh: 844,
  bg: "#0b1120",
  shots: shots("m"),
  camera: [
    [0, 195, 300, 1],
    [56, 195, 330, 1],
    [70, 195, 500, 1],
    [92, 195, 600, 1],
    [116, 195, 1580, 1],
    [126, 195, 1580, 1],
    [134, 195, 300, 1],
    [170, 195, 300, 1],
    [200, 195, 1040, 1],
    [236, 195, 1600, 1],
    [248, 195, 860, 1],
    [266, 195, 1020, 1],
    [302, 195, 2290, 1],
    [344, 195, 2290, 1],
    [358, 195, 860, 1],
    [378, 195, 1000, 1],
    [408, 195, 1000, 1],
    [420, 195, 300, 1],
    [448, 195, 300, 1],
  ],
  pointer: [
    [0, 300, 520],
    [16, 230, 330],
    [24, 195, 315],
    [56, 195, 315],
    [64, 195, 460],
    [74, 195, 460],
    [80, 195, 599],
    [94, 195, 599],
    [118, 195, 1652],
    [134, 250, 420],
    [238, 220, 900],
    [252, 207, 851],
    [262, 207, 851],
    [300, 150, 2240],
    [350, 260, 900],
    [366, 324, 851],
    [380, 220, 1000],
    [420, 318, 122],
  ],
  pointerOpacity: [
    [0, 0],
    [14, 1],
    [432, 1],
    [440, 0],
  ],
  clicks: [24, 64, 80, 122, 255, 368, 425],
  captions: captions(128, 258, 371, 436),
  handoffAt: 436,
};

/** Outro: the frozen PDF report (real render from the test report) slides in as paper sheets. */
const PdfSheets: React.FC<{ at: number; width: number; left: number; top: number; spreadX: number; spreadY: number }> = ({ at, width, left, top, spreadX, spreadY }) => {
  const frame = useCurrentFrame();
  const a = clamp01(frame, at + 10, at + 34);
  const b = clamp01(frame, at + 26, at + 50);
  const label = clamp01(frame, at + 46, at + 62);
  const h = width * (2339 / 1654);
  const sheet = (t: number, rot: number, dx: number, dy: number, src: string) => (
    <div
      style={{
        position: "absolute",
        left: left + dx,
        top: top + dy,
        width,
        height: h,
        opacity: t,
        translate: `${(1 - t) * 60}px ${(1 - t) * 30}px`,
        rotate: `${rot * t}deg`,
        boxShadow: "0 40px 80px -30px rgba(20,24,27,0.55)",
        border: `1px solid ${C.hairStrong}`,
        background: "#fff",
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%" }} />
    </div>
  );
  return (
    <>
      {sheet(b, 4, spreadX, spreadY, "izzy/pdf-3.png")}
      {sheet(a, -3, 0, 0, "izzy/pdf-1.png")}
      <div
        style={{
          position: "absolute",
          left: left + 8,
          top: top + h + 26,
          fontFamily: MONO,
          fontSize: Math.round(width * 0.034),
          letterSpacing: "0.12em",
          color: C.inkMute,
          opacity: label,
        }}
      >
        NIEZMIENNY PDF · DANE TESTOWE
      </div>
    </>
  );
};

export const IzzyDesktop: React.FC = () => (
  <CaseDesktop script={izzyDesktop} outro={<PdfSheets at={izzyDesktop.handoffAt} width={430} left={1110} top={110} spreadX={210} spreadY={70} />} />
);

export const IzzyMobile: React.FC = () => (
  <CaseMobile script={izzyMobile} outro={<PdfSheets at={izzyMobile.handoffAt} width={600} left={170} top={330} spreadX={150} spreadY={60} />} />
);
