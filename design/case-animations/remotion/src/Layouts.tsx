import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrowserFrame, CaptionBlock, ScreenContent, Script } from "./Screen";
import { C, SANS, kf, loadFonts } from "./theme";

export const DURATION = 540; // 18 s @ 30 fps

const useLoop = (duration: number) => {
  const frame = useCurrentFrame();
  return kf(frame, [
    [0, 0],
    [12, 1],
    [duration - 18, 1],
    [duration - 1, 0],
  ]);
};

/** 16:9 laptop layout: browser window, caption card bottom-left, outro on the right after `script.handoffAt`. */
export const CaseDesktop: React.FC<{ script: Script; outro?: React.ReactNode; duration?: number; outroScale?: number; outroShift?: number }> = ({
  script: s,
  outro,
  duration = DURATION,
  outroScale = 0.62,
  outroShift = -330,
}) => {
  loadFonts();
  const frame = useCurrentFrame();
  const opacity = useLoop(duration);
  const winW = 1500;
  const h = s.handoffAt;
  const winScale = outro ? kf(frame, [[h, 1], [h + 30, outroScale]]) : 1;
  const winX = outro ? kf(frame, [[h, 0], [h + 30, outroShift]]) : 0;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{ position: "absolute", left: 210, top: 34, scale: `${winScale}`, translate: `${winX}px 0px`, transformOrigin: "50% 50%" }}>
          <BrowserFrame script={s} width={winW}>
            <ScreenContent script={s} width={winW} height={(winW * s.vh) / s.vw} />
          </BrowserFrame>
        </div>
        {outro}
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
            opacity: kf(frame, [[duration - 26, 1], [duration - 14, 0]]),
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

/** 4:5 phone layout: full-width screen at ~native scale, caption band on top, outro over a dimmed screen. */
export const CaseMobile: React.FC<{ script: Script; outro?: React.ReactNode; duration?: number }> = ({ script: s, outro, duration = DURATION }) => {
  loadFonts();
  const frame = useCurrentFrame();
  const opacity = useLoop(duration);
  const W = 1080;
  const bar = 76;
  const screenH = 1350 - bar;
  const h = s.handoffAt;
  const dim = outro ? kf(frame, [[h, 1], [h + 26, 0.22]]) : 1;
  const shrink = outro ? kf(frame, [[h, 1], [h + 26, 0.94]]) : 1;
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
        {outro}
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
            opacity: kf(frame, [[duration - 26, 1], [duration - 14, 0]]),
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
