'use client';

import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { PhiCanvas } from '@/components/ui/PhiCanvas';
import DecryptedText from '@/components/react-bits/DecryptedText/DecryptedText';
import CountUp from '@/components/react-bits/CountUp/CountUp';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-[90px]">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 font-serif text-[640px] leading-none text-ink opacity-[0.028] select-none hidden md:block"
      >
        Φ
      </span>
      <div className="wrap relative z-10 grid lg:grid-cols-[1.618fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-5 rounded border border-hair-strong bg-card/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-mute flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-accent" />
              <DecryptedText
                text="PRODUKTY · WDROŻENIA · PRZYWÓDZTWO"
                speed={35}
                maxIterations={14}
                animateOn="view"
                className="tracking-[0.14em]"
                encryptedClassName="text-accent/70 font-mono"
              />
            </span>
          </div>

          <h1 className="text-[clamp(38px,4.9vw,66px)] max-w-[19ch] mb-7 balance">
            Nie tylko doradzamy, jak budować procesy i aplikacje.{' '}
            <em className="font-serif italic font-normal text-accent">Budujemy je.</em>
          </h1>
          <p className="lede max-w-[50ch] mb-9">
            Mamy działające produkty w automotive, legal i HR. Wiemy, dlaczego większość wdrożeń nie przyjmuje się
            w organizacji. Dlatego prowadzimy dwa tory naraz: budujemy systemy i rozwijamy ludzi, którzy je poprowadzą.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/build" className="btn-accent group">
              Chcę zbudować produkt <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/leadership" className="btn-ghost">
              Chcę rozwinąć zespół i siebie
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-hair pt-6 mt-12">
            <div>
              <span className="block font-serif text-[32px] leading-tight text-ink">
                <CountUp to={3} duration={1.5} /> <span className="text-[26px]">tyg.</span>
              </span>
              <span className="block text-[12.5px] text-ink-mute mt-0.5">od pomysłu do POC</span>
            </div>
            <div>
              <span className="block font-serif text-[32px] leading-tight text-ink">
                <CountUp to={30} duration={1.8} />+
              </span>
              <span className="block text-[12.5px] text-ink-mute mt-0.5">wdrożonych MVP</span>
            </div>
            <div>
              <span className="block font-serif text-[32px] leading-tight text-ink">
                <CountUp to={420} duration={2} />+
              </span>
              <span className="block text-[12.5px] text-ink-mute mt-0.5">sesji CliftonStrengths</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <PhiCanvas />
        </div>
      </div>
    </section>
  );
}
