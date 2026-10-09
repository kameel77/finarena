import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, MONO, SANS, clamp01, kf } from "./theme";

export type Shot = { src: string; at: number; fade?: number; url?: string };
export type Caption = { from: number; to: number; kicker: string; text: string };

export type Script = {
  device: "browser" | "phone" | "mobileFull";
  vw: number; // viewport width in CSS px of the recording
  vh: number;
  shots: Shot[];
  camera: [number, number, number, number][]; // frame, focusX, focusY, scale
  pointer: [number, number, number][]; // frame, x, y (CSS px)
  pointerOpacity: [number, number][];
  clicks: number[];
  captions: Caption[];
  handoffAt: number;
};

const ptrAt = (script: Script, f: number) => ({
  x: kf(f, script.pointer.map(([t, x]) => [t, x])),
  y: kf(f, script.pointer.map(([t, , y]) => [t, y])),
});

/** The recorded app screen with camera moves, pointer and click ripples. */
export const ScreenContent: React.FC<{ script: Script; width: number; height: number }> = ({ script, width, height }) => {
  const frame = useCurrentFrame();
  const { vw, vh, shots, camera } = script;
  const k = width / vw;

  const s = kf(frame, camera.map(([t, , , sc]) => [t, sc]));
  const rawX = kf(frame, camera.map(([t, x]) => [t, x]));
  const rawY = kf(frame, camera.map(([t, , y]) => [t, y]));
  const halfW = width / k / (2 * s);
  const halfH = Math.min(vh / 2, height / k / (2 * s));
  const fx = Math.min(Math.max(rawX, halfW), vw - halfW);
  const fy = Math.min(Math.max(rawY, halfH), vh - halfH);

  const p = ptrAt(script, frame);
  const pOpacity = kf(frame, script.pointerOpacity);
  const isTouch = script.device !== "browser";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
      <div
        style={{
          position: "absolute",
          width: vw,
          height: vh,
          transformOrigin: "0 0",
          transform: `translate(${width / 2}px, ${height / 2}px) scale(${k * s}) translate(${-fx}px, ${-fy}px)`,
        }}
      >
        {shots.map((shot, i) => {
          const next = shots[i + 1];
          const fade = shot.fade ?? 0;
          if (frame < shot.at - fade / 2 - 1) return null;
          if (next && frame > next.at + (next.fade ?? 0) / 2 + 1) return null;
          const opacity = fade > 0 ? clamp01(frame, shot.at - fade / 2, shot.at + fade / 2) : frame >= shot.at ? 1 : 0;
          return (
            <Img
              key={`${shot.src}-${i}`}
              src={staticFile(shot.src)}
              style={{ position: "absolute", left: 0, top: 0, width: vw, height: vh, opacity }}
            />
          );
        })}

        {script.clicks.map((c) => {
          if (frame < c || frame > c + 18) return null;
          const at = ptrAt(script, c);
          const t = clamp01(frame, c, c + 18);
          const size = (isTouch ? 70 : 54) / s;
          return (
            <div
              key={c}
              style={{
                position: "absolute",
                left: at.x - (size * (0.4 + t)) / 2,
                top: at.y - (size * (0.4 + t)) / 2,
                width: size * (0.4 + t),
                height: size * (0.4 + t),
                borderRadius: "50%",
                border: `${3 / s}px solid ${C.accent}`,
                background: "rgba(194,74,38,0.18)",
                opacity: 1 - t,
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            opacity: pOpacity,
            transform: `scale(${1 / s})`,
            transformOrigin: "0 0",
          }}
        >
          {isTouch ? (
            <div
              style={{
                width: 34,
                height: 34,
                marginLeft: -17,
                marginTop: -17,
                borderRadius: "50%",
                background: "rgba(20,24,27,0.28)",
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            />
          ) : (
            <svg width="26" height="30" viewBox="0 0 26 30" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))" }}>
              <path d="M2 2 L2 24 L8 18.5 L12.5 28 L16.5 26.2 L12 17 L20 17 Z" fill={C.ink} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

/** Browser window chrome around the screen. */
export const BrowserFrame: React.FC<{ script: Script; width: number; children: React.ReactNode }> = ({ script, width, children }) => {
  const frame = useCurrentFrame();
  const bar = 46;
  const screenH = (width * script.vh) / script.vw;
  const current = [...script.shots].reverse().find((s) => frame >= s.at && s.url) ?? script.shots[0];
  return (
    <div
      style={{
        width,
        height: screenH + bar,
        borderRadius: 14,
        overflow: "hidden",
        background: C.card,
        border: `1px solid ${C.hairStrong}`,
        boxShadow: "0 40px 90px -40px rgba(20,24,27,0.45)",
      }}
    >
      <div style={{ height: bar, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", background: C.paper2, borderBottom: `1px solid ${C.hair}` }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#E2DDD4", "#E2DDD4", "#E2DDD4"].map((c, i) => (
            <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c, border: `1px solid ${C.hairStrong}` }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 560,
            margin: "0 auto",
            height: 28,
            borderRadius: 7,
            background: C.card,
            border: `1px solid ${C.hair}`,
            fontFamily: SANS,
            fontSize: 15,
            color: C.inkMute,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {current.url}
        </div>
        <div style={{ width: 52 }} />
      </div>
      <div style={{ position: "relative", width, height: screenH }}>{children}</div>
    </div>
  );
};

/** Phone body around the screen. */
export const PhoneFrame: React.FC<{ script: Script; height: number; children: React.ReactNode }> = ({ script, height, children }) => {
  const bezel = 14;
  const screenH = height - bezel * 2;
  const screenW = (screenH * script.vw) / script.vh;
  return (
    <div
      style={{
        width: screenW + bezel * 2,
        height,
        borderRadius: 64,
        background: C.ink,
        padding: bezel,
        boxShadow: "0 50px 100px -40px rgba(20,24,27,0.55)",
      }}
    >
      <div style={{ position: "relative", width: screenW, height: screenH, borderRadius: 50, overflow: "hidden" }}>
        {children}
        <div style={{ position: "absolute", top: 12, left: "50%", marginLeft: -55, width: 110, height: 30, borderRadius: 16, background: C.ink }} />
      </div>
    </div>
  );
};

export const CaptionBlock: React.FC<{ captions: Caption[]; size: number; align?: "left" | "center" }> = ({ captions, size, align = "left" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {captions.map((c) => {
        if (frame < c.from - 2 || frame > c.to + 12) return null;
        const inT = clamp01(frame, c.from, c.from + 14);
        const outT = clamp01(frame, c.to, c.to + 10);
        return (
          <div
            key={c.kicker}
            style={{
              position: "absolute",
              inset: 0,
              opacity: inT * (1 - outT),
              translate: `0px ${(1 - inT) * 18}px`,
              textAlign: align,
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: size * 0.48, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, marginBottom: size * 0.32 }}>
              {c.kicker}
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: size, lineHeight: 1.18, letterSpacing: "-0.02em", color: C.ink }}>{c.text}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
