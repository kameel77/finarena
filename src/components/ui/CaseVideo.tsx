'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { CaseVideo as CaseVideoData } from '@/lib/cases';

/**
 * Looping, muted case animation.
 * - Server render: poster only (fast LCP, works without JS).
 * - Loads only the variant that fits the screen (4:5 phone, 16:9 laptop).
 * - Plays only while visible; pause button for everyone; respects reduced motion.
 */
export function CaseVideo({ video }: { video: CaseVideoData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<'desktop' | 'mobile' | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pick = () => setVariant(mq.matches ? 'mobile' : 'desktop');
    pick();
    if (reduce.matches) setPaused(true);
    mq.addEventListener('change', pick);
    return () => mq.removeEventListener('change', pick);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) el.play().catch(() => setPaused(true));
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, paused]);

  const src = variant === 'mobile' ? video.mobile : video.desktop;
  const webm = variant === 'mobile' ? video.mobileWebm : video.desktopWebm;
  const poster = variant === 'mobile' ? video.posterMobile : video.posterDesktop;

  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] md:aspect-video overflow-hidden rounded-lg border border-hair bg-paper-2">
        <picture>
          <source media="(max-width: 767px)" srcSet={video.posterMobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.posterDesktop} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        </picture>
        {variant ? (
          <video
            key={variant}
            ref={ref}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
            {webm ? <source src={webm} type="video/webm" /> : null}
          </video>
        ) : null}
        <button
          type="button"
          onClick={() => {
            const el = ref.current;
            if (!el) return;
            if (paused) {
              setPaused(false);
              el.play().catch(() => setPaused(true));
            } else {
              setPaused(true);
              el.pause();
            }
          }}
          className="absolute top-2 right-2 md:top-auto md:bottom-4 md:right-4 inline-flex items-center justify-center gap-2 rounded bg-ink/80 text-paper w-9 h-9 md:w-auto md:h-auto md:px-3.5 md:py-2.5 text-[12.5px] backdrop-blur-sm hover:bg-ink transition-colors"
          aria-label={paused ? 'Odtwórz animację' : 'Zatrzymaj animację'}
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{paused ? 'Odtwórz' : 'Pauza'}</span>
        </button>
      </div>
      <figcaption className="sr-only">{video.alt}</figcaption>
    </figure>
  );
}
