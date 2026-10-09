import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CaptionBlock, Caption } from "./Screen";
import { C, MONO, SANS, clamp01, kf, loadFonts } from "./theme";
import { DURATION } from "./Layouts";

// Reconstruction from the motolia-voicebot-orchestrator repository (tool schema, ticket body format,
// phone hashing, dedupe). Test data only; not a third-party UI.

type Line = { at: number; who: "bot" | "client"; text: string };
const LINES: Line[] = [
  { at: 14, who: "bot", text: "Dzień dobry, Motolia. W czym mogę pomóc?" },
  { at: 44, who: "client", text: "Interesuje mnie Audi A4 z oferty, w leasingu dla firmy." },
  { at: 78, who: "bot", text: "Chętnie pomogę. Jak mogę się do Pana zwracać?" },
  { at: 102, who: "client", text: "Jan Kowalski." },
  { at: 120, who: "bot", text: "Kiedy doradca może oddzwonić?" },
  { at: 140, who: "client", text: "Jutro rano." },
  { at: 158, who: "bot", text: "Dziękuję. Doradca oddzwoni jutro rano na ten numer." },
];

const T = { tool: 190, ticket: 250, log: 330, repeat: 400 };

const CAPTIONS: Caption[] = [
  { from: 6, to: T.tool - 6, kicker: "01 · Rozmowa", text: "Bot odbiera telefon i zbiera to, czego potrzebuje doradca." },
  { from: T.tool + 4, to: T.ticket - 6, kicker: "02 · Integracja", text: "Rozmowa kończy się wywołaniem narzędzia, a nie notatką." },
  { from: T.ticket + 4, to: T.log - 6, kicker: "03 · Zgłoszenie", text: "Zgłoszenie trafia tam, gdzie zespół już pracuje." },
  { from: T.log + 4, to: T.repeat - 6, kicker: "04 · RODO", text: "W logach numer telefonu zapisujemy tylko jako skrót." },
  { from: T.repeat + 4, to: 518, kicker: "05 · Ponowny kontakt", text: "Drugi telefon dopisuje komentarz zamiast duplikatu." },
];

const YELLOW = "#F5B800";

const Wave: React.FC<{ active: boolean; w: number; h: number; color: string }> = ({ active, w, h, color }) => {
  const frame = useCurrentFrame();
  const bars = 28;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: w / bars / 3, height: h, width: w }}>
      {Array.from({ length: bars }).map((_, i) => {
        const v = active ? 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.35 + i * 0.9) * Math.cos(frame * 0.11 + i * 0.4)) : 0.12;
        return <div key={i} style={{ flex: 1, height: h * v, borderRadius: 3, background: color, opacity: 0.85 }} />;
      })}
    </div>
  );
};

/** Phone call screen with live transcript. `u` = unit scale. */
const Phone: React.FC<{ u: number; maxLines: number }> = ({ u, maxLines }) => {
  const frame = useCurrentFrame();
  const visible = LINES.filter((l) => frame >= l.at);
  const shown = visible.slice(-maxLines);
  const speaking = [...LINES].reverse().find((l) => frame >= l.at && frame < l.at + 24);
  const secs = Math.max(0, Math.floor((Math.min(frame, T.tool) - 6) / 30));
  const ended = frame >= T.tool;
  return (
    <div style={{ width: 380 * u, height: 780 * u, borderRadius: 52 * u, background: C.ink, padding: 12 * u, boxShadow: "0 50px 100px -40px rgba(20,24,27,0.55)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 42 * u, background: "#0f1418", overflow: "hidden", padding: `${54 * u}px ${22 * u}px ${22 * u}px` }}>
        <div style={{ position: "absolute", top: 12 * u, left: "50%", marginLeft: -50 * u, width: 100 * u, height: 26 * u, borderRadius: 14 * u, background: "#000" }} />
        <div style={{ textAlign: "center", color: "#fff", fontFamily: SANS }}>
          <div style={{ fontSize: 13 * u, letterSpacing: "0.12em", color: "#8a949c", fontFamily: MONO }}>{ended ? "POŁĄCZENIE ZAKOŃCZONE" : "POŁĄCZENIE PRZYCHODZĄCE"}</div>
          <div style={{ fontSize: 28 * u, fontWeight: 600, marginTop: 8 * u }}>Motolia</div>
          <div style={{ fontSize: 15 * u, color: "#8a949c", marginTop: 4 * u, fontFamily: MONO }}>
            00:{String(secs).padStart(2, "0")}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: `${18 * u}px 0 ${14 * u}px` }}>
          <Wave active={!!speaking && !ended} w={280 * u} h={44 * u} color={speaking?.who === "client" ? "#cfd6dc" : YELLOW} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 * u }}>
          {shown.map((l) => {
            const t = clamp01(frame, l.at, l.at + 10);
            const bot = l.who === "bot";
            return (
              <div key={l.at} style={{ alignSelf: bot ? "flex-start" : "flex-end", maxWidth: "84%", opacity: t, translate: `0px ${(1 - t) * 10 * u}px` }}>
                <div style={{ fontFamily: MONO, fontSize: 10 * u, letterSpacing: "0.1em", color: "#8a949c", marginBottom: 3 * u, textAlign: bot ? "left" : "right" }}>{bot ? "BOT" : "KLIENT"}</div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 16 * u,
                    lineHeight: 1.3,
                    padding: `${9 * u}px ${12 * u}px`,
                    borderRadius: 14 * u,
                    background: bot ? "rgba(245,184,0,0.16)" : "#232b31",
                    color: bot ? "#ffe9a6" : "#e8ecef",
                    border: `1px solid ${bot ? "rgba(245,184,0,0.35)" : "#2f3940"}`,
                  }}
                >
                  {l.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Mono: React.FC<{ u: number; children: React.ReactNode; color?: string }> = ({ u, children, color = C.inkSoft }) => (
  <div style={{ fontFamily: MONO, fontSize: 15 * u, lineHeight: 1.55, color, whiteSpace: "pre" }}>{children}</div>
);

/** Tool call payload (create_callback_ticket). */
const ToolCall: React.FC<{ u: number; at: number }> = ({ u, at }) => {
  const frame = useCurrentFrame();
  const t = clamp01(frame, at, at + 16);
  const ok = clamp01(frame, at + 34, at + 46);
  return (
    <div style={{ width: 430 * u, opacity: t, translate: `${(1 - t) * -30 * u}px 0px`, background: C.ink, borderRadius: 8 * u, padding: 20 * u, boxShadow: "0 30px 60px -30px rgba(20,24,27,0.6)" }}>
      <div style={{ fontFamily: MONO, fontSize: 12 * u, letterSpacing: "0.14em", color: "#E05C31", marginBottom: 10 * u }}>WYWOŁANIE NARZĘDZIA</div>
      <Mono u={u} color="#e8ecef">{"create_callback_ticket({"}</Mono>
      <Mono u={u} color="#cfd6dc">{'  name: "Jan Kowalski",\n  phone: "+48 5•• ••• •67",\n  topic: "Audi A4 — leasing",\n  preferred_time: "jutro_rano",\n  notes: "Leasing dla firmy"'}</Mono>
      <Mono u={u} color="#e8ecef">{"})"}</Mono>
      <div style={{ marginTop: 12 * u, opacity: ok, fontFamily: MONO, fontSize: 13 * u, color: "#7fd1a3" }}>✓ numer zweryfikowany · format E.164</div>
    </div>
  );
};

/** Ticket card in the exact body format the integration sends (neutral styling, not a third-party UI). */
const Ticket: React.FC<{ u: number; at: number; repeatAt: number }> = ({ u, at, repeatAt }) => {
  const frame = useCurrentFrame();
  const t = clamp01(frame, at, at + 18);
  const rows: [string, string][] = [
    ["Imię i nazwisko", "Jan Kowalski"],
    ["Telefon", "+48 5•• ••• •67"],
    ["Preferowany czas kontaktu", "jutro_rano"],
    ["Notatka", "Leasing dla firmy"],
    ["Link do transkrypcji", "…/conversations/test"],
  ];
  const rep = clamp01(frame, repeatAt + 30, repeatAt + 46);
  return (
    <div style={{ width: 520 * u, opacity: t, translate: `0px ${(1 - t) * 30 * u}px`, background: C.card, border: `1px solid ${C.hairStrong}`, borderRadius: 8 * u, padding: 26 * u, boxShadow: "0 30px 70px -36px rgba(20,24,27,0.45)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 * u }}>
        <span style={{ fontFamily: MONO, fontSize: 13 * u, letterSpacing: "0.14em", color: C.accent }}>NOWE ZGŁOSZENIE · ŹRÓDŁO: PHONE</span>
        <span style={{ fontFamily: MONO, fontSize: 11 * u, color: C.inkMute, border: `1px solid ${C.hairStrong}`, borderRadius: 3 * u, padding: `${3 * u}px ${7 * u}px` }}>widok poglądowy</span>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 26 * u, fontWeight: 600, color: C.ink, marginBottom: 12 * u }}>Audi A4 — leasing</div>
      {rows.map(([k, v], i) => {
        const r = clamp01(frame, at + 12 + i * 6, at + 24 + i * 6);
        return (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16 * u, padding: `${9 * u}px 0`, borderTop: `1px solid ${C.hair}`, opacity: r, fontFamily: SANS, fontSize: 18 * u }}>
            <span style={{ color: C.inkMute }}>{k}</span>
            <span style={{ color: C.ink, fontWeight: 500 }}>{v}</span>
          </div>
        );
      })}
      <div style={{ marginTop: 12 * u * rep, maxHeight: 120 * u * rep, overflow: "hidden", opacity: rep }}>
        <div style={{ background: C.paper2, borderRadius: 6 * u, padding: `${12 * u}px ${14 * u}px`, borderLeft: `3px solid ${C.accent}` }}>
          <div style={{ fontFamily: MONO, fontSize: 11 * u, letterSpacing: "0.12em", color: C.accent, marginBottom: 4 * u }}>KOMENTARZ · VOICEBOT</div>
          <div style={{ fontFamily: SANS, fontSize: 16 * u, color: C.inkSoft }}>Klient zadzwonił ponownie. Zainteresowany autem: Audi A4.</div>
        </div>
      </div>
    </div>
  );
};

/** Log row: phone stored only as a salted hash. */
const LogRow: React.FC<{ u: number; at: number }> = ({ u, at }) => {
  const frame = useCurrentFrame();
  const t = clamp01(frame, at, at + 16);
  const cells: [string, string][] = [
    ["call_id", "test-0042"],
    ["phone_hash", "9f2c…e41a"],
    ["intent", "callback"],
    ["ticket", "utworzone"],
  ];
  return (
    <div style={{ width: 520 * u, opacity: t, translate: `0px ${(1 - t) * 20 * u}px` }}>
      <div style={{ fontFamily: MONO, fontSize: 12 * u, letterSpacing: "0.14em", color: C.inkMute, marginBottom: 8 * u }}>LOG ROZMÓW</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `1px solid ${C.hairStrong}`, borderRadius: 6 * u, overflow: "hidden", background: C.card }}>
        {cells.map(([k, v]) => (
          <div key={k} style={{ padding: `${10 * u}px ${12 * u}px`, borderRight: `1px solid ${C.hair}` }}>
            <div style={{ fontFamily: MONO, fontSize: 11 * u, color: C.inkFaint }}>{k}</div>
            <div style={{ fontFamily: MONO, fontSize: 15 * u, color: k === "phone_hash" ? C.accent : C.ink, marginTop: 3 * u, fontWeight: k === "phone_hash" ? 600 : 400 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Second call badge for the dedupe scene. */
const RepeatBadge: React.FC<{ u: number; at: number }> = ({ u, at }) => {
  const frame = useCurrentFrame();
  const t = clamp01(frame, at, at + 14);
  const out = clamp01(frame, at + 40, at + 52);
  return (
    <div style={{ opacity: t * (1 - out * 0.4), translate: `0px ${(1 - t) * 16 * u}px`, display: "inline-flex", alignItems: "center", gap: 10 * u, background: C.ink, color: C.paper, borderRadius: 30 * u, padding: `${12 * u}px ${20 * u}px`, fontFamily: SANS, fontSize: 18 * u }}>
      <span style={{ width: 10 * u, height: 10 * u, borderRadius: 5 * u, background: YELLOW }} />
      Ten sam numer dzwoni ponownie
    </div>
  );
};

const Badge: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.12em", color: C.inkMute }}>REKONSTRUKCJA NA DANYCH TESTOWYCH</div>
);

const useLoop = () => {
  const frame = useCurrentFrame();
  return kf(frame, [
    [0, 0],
    [12, 1],
    [DURATION - 18, 1],
    [DURATION - 1, 0],
  ]);
};

export const VoicebotDesktop: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  const opacity = useLoop();
  const phoneX = kf(frame, [[T.tool - 10, 0], [T.tool + 20, -60]]);
  const toolOut = clamp01(frame, T.ticket - 6, T.ticket + 10);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{ position: "absolute", left: 760, top: 66, translate: `${phoneX}px 0px` }}>
          <Phone u={1.1} maxLines={6} />
        </div>
        <div style={{ position: "absolute", left: 1220, top: 230, opacity: 1 - toolOut * 0.75, scale: `${1 - toolOut * 0.12}`, transformOrigin: "0 0" }}>
          <ToolCall u={1.35} at={T.tool} />
        </div>
        <div style={{ position: "absolute", left: 1240, top: 130 }}>
          <Ticket u={1.2} at={T.ticket} repeatAt={T.repeat} />
        </div>
        <div style={{ position: "absolute", left: 1240, top: 830 }}>
          <LogRow u={1.2} at={T.log} />
        </div>
        <div style={{ position: "absolute", left: 1240, top: 60 }}>
          <RepeatBadge u={1.1} at={T.repeat} />
        </div>
        <div style={{ position: "absolute", right: 48, bottom: 30 }}>
          <Badge size={16} />
        </div>
        <div style={{ position: "absolute", left: 54, top: 846, width: 640, height: 190, background: "rgba(246,243,237,0.96)", border: `1px solid ${C.hairStrong}`, borderRadius: 6, boxShadow: "0 24px 50px -30px rgba(20,24,27,0.4)", opacity: kf(frame, [[DURATION - 26, 1], [DURATION - 14, 0]]) }}>
          <div style={{ position: "absolute", inset: "28px 34px" }}>
            <CaptionBlock captions={CAPTIONS} size={36} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const VoicebotMobile: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  const opacity = useLoop();
  const phoneOut = clamp01(frame, T.tool + 40, T.ticket);
  const toolT = clamp01(frame, T.tool, T.tool + 16) * (1 - clamp01(frame, T.ticket - 4, T.ticket + 10));
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{ position: "absolute", left: (1080 - 380 * 1.42) / 2, top: 300, opacity: 1 - phoneOut, scale: `${1 - phoneOut * 0.1}` }}>
          <Phone u={1.42} maxLines={6} />
        </div>
        <div style={{ position: "absolute", left: (1080 - 430 * 2) / 2, top: 520, opacity: toolT }}>
          <ToolCall u={2} at={T.tool} />
        </div>
        <div style={{ position: "absolute", left: (1080 - 520 * 1.74) / 2, top: 360, opacity: clamp01(frame, T.ticket - 2, T.ticket + 2) }}>
          <Ticket u={1.74} at={T.ticket} repeatAt={T.repeat} />
        </div>
        <div style={{ position: "absolute", left: (1080 - 520 * 1.74) / 2, top: 1130, opacity: 1 - clamp01(frame, T.repeat, T.repeat + 10) }}>
          <LogRow u={1.74} at={T.log} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 296, display: "flex", justifyContent: "center" }}>
          <RepeatBadge u={1.6} at={T.repeat} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, textAlign: "center" }}>
          <Badge size={20} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 270, background: "rgba(246,243,237,0.97)", borderBottom: `1px solid ${C.hairStrong}`, opacity: kf(frame, [[DURATION - 26, 1], [DURATION - 14, 0]]) }}>
          <div style={{ position: "absolute", inset: "44px 52px" }}>
            <CaptionBlock captions={CAPTIONS} size={50} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
