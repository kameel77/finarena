'use client';

import { useEffect, useRef, useState } from 'react';

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at load: keep the final value, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setN(0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - start) / 1300, 1);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{n}{suffix}</span>;
}
