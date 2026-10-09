import { continueRender, delayRender, Easing, interpolate, staticFile } from "remotion";

// Finarena brand tokens (mirrors tailwind.config.ts on finarena.pl)
export const C = {
  paper: "#F6F3ED",
  paper2: "#EFEBE3",
  card: "#FFFFFF",
  ink: "#14181B",
  inkSoft: "#3E464C",
  inkMute: "#767F87",
  inkFaint: "#A9B0B6",
  accent: "#C24A26",
  hair: "rgba(20,24,27,0.11)",
  hairStrong: "rgba(20,24,27,0.20)",
};

export const SANS = "'Instrument Sans', system-ui, sans-serif";
export const MONO = "'JetBrains Mono', monospace";

const FONTS: [string, string, string][] = [
  ["Instrument Sans", "instrument-sans-latin-400-normal.woff2", "400"],
  ["Instrument Sans", "instrument-sans-latin-ext-400-normal.woff2", "400"],
  ["Instrument Sans", "instrument-sans-latin-500-normal.woff2", "500"],
  ["Instrument Sans", "instrument-sans-latin-ext-500-normal.woff2", "500"],
  ["Instrument Sans", "instrument-sans-latin-600-normal.woff2", "600"],
  ["Instrument Sans", "instrument-sans-latin-ext-600-normal.woff2", "600"],
  ["JetBrains Mono", "jetbrains-mono-latin-400-normal.woff2", "400"],
  ["JetBrains Mono", "jetbrains-mono-latin-ext-400-normal.woff2", "400"],
  ["JetBrains Mono", "jetbrains-mono-latin-500-normal.woff2", "500"],
  ["JetBrains Mono", "jetbrains-mono-latin-ext-500-normal.woff2", "500"],
];

let fontsPromise: Promise<void> | null = null;
export const loadFonts = () => {
  if (fontsPromise) return fontsPromise;
  const handle = delayRender("fonts");
  fontsPromise = Promise.all(
    FONTS.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format('woff2')`, { weight });
      return face.load().then((f) => {
        document.fonts.add(f);
      });
    }),
  ).then(() => continueRender(handle));
  return fontsPromise;
};

export const EASE = Easing.bezier(0.45, 0, 0.2, 1);
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** Piecewise interpolation over [frame, value] keys with easing between keys. */
export const kf = (frame: number, keys: [number, number][], easing = EASE) =>
  interpolate(
    frame,
    keys.map((k) => k[0]),
    keys.map((k) => k[1]),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing },
  );

export const clamp01 = (frame: number, a: number, b: number, easing = OUT) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
