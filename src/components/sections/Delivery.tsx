'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stages } from '@/lib/content';
import { Sparkles, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Delivery() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set('.stage-node', { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 1,
        },
      });

      // Animate laser pipeline line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, ease: 'none', duration: 1 }
      );

      // Stagger reveal stage cards and nodes
      gsap.from('.stage-card', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="proces" className="relative py-[120px] bg-ink text-paper overflow-hidden">
      {/* Subtle background tech grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="wrap relative z-10">
        <div className="max-w-[58ch] mb-14">
          <div className="kicker text-accent-hi flex items-center gap-3 mb-6 before:content-[''] before:w-[22px] before:h-px before:bg-accent-hi">
            Finarena Build · od POC do produkcji
          </div>
          <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4 font-medium tracking-tight">
            Zaczynamy od najtańszego dowodu. Kończymy na{' '}
            <em className="font-serif italic font-normal text-accent-hi">systemie w produkcji</em>.
          </h2>
          <p className="text-[16.5px] text-white/65 max-w-[62ch] leading-relaxed">
            Każdy etap ma stałą cenę, jasne kryterium sukcesu i możliwość wyjścia. Nie sprzedajemy zaufania na
            dwanaście miesięcy z góry.
          </p>
        </div>

        <div className="relative mt-8">
          {/* Base inactive line */}
          <div className="h-[2px] bg-white/10 relative overflow-hidden">
            {/* Active scrubbed laser line */}
            <span
              ref={lineRef}
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-accent via-accent-hi to-[#FF8C66] shadow-[0_0_12px_rgba(224,92,49,0.8)]"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-white/10 mt-[-1px]">
            {stages.map((s, idx) => (
              <div
                key={s.no}
                className="stage-card group relative pt-8 pr-6 pb-6 border-r border-white/10 last:border-r-0 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                {/* Node indicator */}
                <span className="stage-node absolute -top-[5px] left-0 w-[9px] h-[9px] rounded-full bg-ink border border-accent-hi transition-all duration-300 group-hover:bg-accent-hi group-hover:scale-125 group-hover:shadow-[0_0_18px_rgba(224,92,49,0.9)]" />

                <div className="font-mono text-[10px] tracking-[0.14em] text-accent-hi mb-3 flex items-center justify-between">
                  <span>{s.no}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-white/40">
                    Etap 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-[18px] font-medium mb-2.5 text-white/95 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-white/60 leading-relaxed mb-4 group-hover:text-white/80 transition-colors">
                  {s.desc}
                </p>
                <div className="pt-3 border-t border-white/10 font-mono text-[10.5px] text-accent-hi/90 flex items-center justify-between">
                  <span>{s.time}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-hi opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
