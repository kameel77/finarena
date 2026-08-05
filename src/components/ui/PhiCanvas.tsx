'use client';

import { useEffect, useRef, useState } from 'react';

type Pt = { x: number; y: number };
const PHI = 1.618034;
const N = 1100;
const LABELS = ['Chaos', 'Struktura', 'Proporcja Φ', 'Skala'];

function goldenSquares() {
  const sq: { x: number; y: number; w: number; h: number }[] = [];
  let x = 0, y = 0, w = 1, h = 1 / PHI;
  for (let i = 0; i < 8; i++) {
    const s = Math.min(w, h);
    if (s < 0.004) break;
    if (i % 4 === 0) { sq.push({ x, y, w: s, h: s }); x += s; w -= s; }
    else if (i % 4 === 1) { sq.push({ x, y, w: s, h: s }); y += s; h -= s; }
    else if (i % 4 === 2) { sq.push({ x: x + w - s, y, w: s, h: s }); w -= s; }
    else { sq.push({ x, y: y + h - s, w: s, h: s }); h -= s; }
  }
  return sq;
}

const SQ = goldenSquares();
const YOFF = (1 - 1 / PHI) / 2;

const chaos = (): Pt[] => Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random() }));

function lattice(): Pt[] {
  const per = SQ.map((s) => s.w * 4);
  const tot = per.reduce((a, b) => a + b, 0);
  const a: Pt[] = [];
  SQ.forEach((s, i) => {
    const n = Math.max(8, Math.round((N * per[i]) / tot));
    for (let k = 0; k < n; k++) {
      const t = (k / n) * 4, e = Math.floor(t), f = t - e;
      let X: number, Y: number;
      if (e === 0) { X = s.x + f * s.w; Y = s.y; }
      else if (e === 1) { X = s.x + s.w; Y = s.y + f * s.h; }
      else if (e === 2) { X = s.x + s.w - f * s.w; Y = s.y + s.h; }
      else { X = s.x; Y = s.y + s.h - f * s.h; }
      a.push({ x: X, y: Y + YOFF });
    }
  });
  while (a.length < N) a.push(a[Math.floor(Math.random() * a.length)]);
  return a.slice(0, N);
}

function spiral(): Pt[] {
  return Array.from({ length: N }, (_, i) => {
    const th = (i / N) * Math.PI * 4.6;
    const r = 0.012 * Math.pow(PHI, (th * 2) / Math.PI);
    const j = (Math.random() - 0.5) * 0.012;
    return { x: 0.5 + Math.cos(th) * r * 0.62 + j, y: 0.5 + Math.sin(th) * r * 0.62 + j };
  });
}

/**
 * Canvas nie rozwija zmiennych CSS w ctx.font — `var(--font-serif)` daje
 * nieprawidłowy ciąg, przypisanie jest ignorowane i zostaje domyślne
 * 10px sans-serif, przez co glif renderuje się jako punkcik. Rodzinę
 * trzeba odczytać z computed style i wstawić dosłownie.
 */
function serifFamily(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim();
  return v ? `${v}, Georgia, serif` : 'Georgia, "Times New Roman", serif';
}

function samplePool(family: string, n: number): Pt[] {
  const c = document.createElement('canvas');
  c.width = c.height = n;
  const q = c.getContext('2d', { willReadFrequently: true });
  if (!q) return [];
  q.clearRect(0, 0, n, n);
  q.fillStyle = '#000';
  q.textAlign = 'center';
  q.textBaseline = 'middle';
  q.font = `400 ${Math.round(n * 0.94)}px ${family}`;
  q.fillText('Φ', n / 2, n / 2 + n * 0.02);
  const d = q.getImageData(0, 0, n, n).data;
  const pool: Pt[] = [];
  for (let y = 0; y < n; y += 2) for (let x = 0; x < n; x += 2) {
    if (d[(y * n + x) * 4 + 3] > 110) pool.push({ x: x / n, y: y / n });
  }
  return pool;
}

function glyph(): Pt[] {
  const n = 170;
  let pool = samplePool(serifFamily(), n);
  // Za mała próbka = font się nie załadował albo nie ma glifu Φ — bierzemy generyczny serif.
  if (pool.length < 250) pool = samplePool('Georgia, "Times New Roman", serif', n);
  if (pool.length < 100) return spiral();
  return Array.from({ length: N }, () => {
    const p = pool[Math.floor(Math.random() * pool.length)];
    return { x: p.x + (Math.random() - 0.5) * 0.006, y: p.y + (Math.random() - 0.5) * 0.006 };
  });
}

export function PhiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState(LABELS[0]);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const g = cv.getContext('2d');
    if (!g) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const INK = '20,24,27', ACC = '194,74,38';
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, S = 0, OX = 0, OY = 0, raf = 0;
    const mouse = { x: -9e9, y: -9e9 };

    const T: Pt[][] = [chaos(), lattice(), chaos(), spiral()];
    const buildGlyph = () => { T[2] = glyph(); };
    if (document.fonts) {
      document.fonts.ready.then(buildGlyph);
      // Safari potrafi rozstrzygnąć fonts.ready przed podmianą webfontu.
      window.setTimeout(buildGlyph, 1200);
    } else {
      buildGlyph();
    }

    const P = Array.from({ length: N }, () => ({
      ox: 0, oy: 0, d: Math.random() * 0.34, acc: Math.random() < 0.13, s: 0.7 + Math.random() * 0.9,
    }));

    let state = 0, next = 1, prog = 1, hold = 0;
    const HOLD = 250, TRANS = 110;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    function fit() {
      if (!cv) return;
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      g!.setTransform(DPR, 0, 0, DPR, 0, 0);
      S = Math.min(W, H) * 0.86; OX = (W - S) / 2; OY = (H - S) / 2 - 6;
    }

    function lines(alpha: number, mode: number) {
      if (alpha <= 0.01) return;
      g!.lineWidth = 1;
      if (mode === 1) {
        g!.strokeStyle = `rgba(${INK},${alpha * 0.16})`;
        SQ.forEach((s) => g!.strokeRect(OX + s.x * S, OY + (s.y + YOFF) * S, s.w * S, s.h * S));
        g!.strokeStyle = `rgba(${ACC},${alpha * 0.5})`;
        g!.strokeRect(OX, OY + YOFF * S, S, S / PHI);
      }
      if (mode === 2) {
        g!.strokeStyle = `rgba(${INK},${alpha * 0.09})`;
        [0.382, 0.5, 0.618].forEach((f) => {
          g!.beginPath(); g!.moveTo(OX + S * f, OY); g!.lineTo(OX + S * f, OY + S); g!.stroke();
          g!.beginPath(); g!.moveTo(OX, OY + S * f); g!.lineTo(OX + S, OY + S * f); g!.stroke();
        });
      }
      if (mode === 3) {
        g!.strokeStyle = `rgba(${ACC},${alpha * 0.35})`;
        g!.beginPath();
        for (let th = 0; th < Math.PI * 4.6; th += 0.05) {
          const r = 0.012 * Math.pow(PHI, (th * 2) / Math.PI) * 0.62;
          const X = OX + (0.5 + Math.cos(th) * r) * S, Y = OY + (0.5 + Math.sin(th) * r) * S;
          th ? g!.lineTo(X, Y) : g!.moveTo(X, Y);
        }
        g!.stroke();
      }
    }

    let lastLabel = -1;
    function frame() {
      g!.clearRect(0, 0, W, H);
      hold++;
      if (hold > HOLD && prog >= 1) { prog = 0; state = next; next = (next + 1) % 4; hold = 0; }
      if (prog < 1) prog = Math.min(1, prog + 1 / TRANS);
      const from = T[(state + 3) % 4], to = T[state];
      lines(1 - (prog >= 1 ? 1 : prog), (state + 3) % 4);
      lines(prog >= 1 ? 1 : prog, state);

      if (lastLabel !== state) { setLabel(LABELS[state]); lastLabel = state; }
      if (barRef.current) barRef.current.style.width = `${prog < 1 ? prog * 100 : (hold / HOLD) * 100}%`;

      for (let i = 0; i < N; i++) {
        const p = P[i];
        const e = ease(Math.max(0, Math.min(1, (prog - p.d) / (1 - p.d))));
        const a = from[i] || from[0], b = to[i] || to[0];
        let X = OX + (a.x + (b.x - a.x) * e) * S;
        let Y = OY + (a.y + (b.y - a.y) * e) * S;
        const dx = X - mouse.x, dy = Y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 9000 && d2 > 0.01) {
          const f = ((1 - d2 / 9000) * 30) / Math.sqrt(d2);
          p.ox += dx * f * 0.09; p.oy += dy * f * 0.09;
        }
        p.ox *= 0.9; p.oy *= 0.9;
        X += p.ox; Y += p.oy;
        g!.fillStyle = p.acc ? `rgba(${ACC},.85)` : `rgba(${INK},.42)`;
        g!.beginPath(); g!.arc(X, Y, p.s * (p.acc ? 1.15 : 0.95), 0, 6.3); g!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9e9; };
    const onClick = () => { if (prog >= 1) { prog = 0; state = next; next = (next + 1) % 4; hold = 0; } };

    fit();
    window.addEventListener('resize', fit);
    cv.addEventListener('mousemove', onMove);
    cv.addEventListener('mouseleave', onLeave);
    cv.addEventListener('click', onClick);
    if (reduce) { prog = 1; state = 2; frame(); cancelAnimationFrame(raf); } else frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
      cv.removeEventListener('mousemove', onMove);
      cv.removeEventListener('mouseleave', onLeave);
      cv.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <figure className="relative w-full m-0 aspect-[1/1.12]">
      <canvas ref={ref} className="w-full h-full block cursor-crosshair" aria-hidden />
      <figcaption className="absolute left-0 bottom-0 w-full flex items-center gap-3.5">
        <span className="kicker text-ink-mute min-w-[132px]">{label}</span>
        <span className="flex-1 h-px bg-hair-strong relative overflow-hidden">
          <span ref={barRef} className="absolute left-0 inset-y-0 w-0 bg-accent" />
        </span>
      </figcaption>
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-hair-strong" />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-hair-strong" />
      <span className="absolute bottom-6 left-0 w-2.5 h-2.5 border-l border-b border-hair-strong" />
      <span className="absolute bottom-6 right-0 w-2.5 h-2.5 border-r border-b border-hair-strong" />
    </figure>
  );
}
