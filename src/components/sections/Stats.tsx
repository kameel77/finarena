'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/lib/content';
import CountUp from '@/components/react-bits/CountUp/CountUp';
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard';

export function Stats() {
  return (
    <section className="py-[120px]">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="eyebrow">Dowody</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4 font-medium tracking-tight">
              Liczby, nie <em className="font-serif italic font-normal text-accent">deklaracje</em>.
            </h2>
            <p className="sub mb-5">
              Liczby mówią, ile zrobiliśmy. Realizacje pokazują, jak myślimy i jak działa to, co budujemy.
            </p>
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-accent-hi transition-colors group"
            >
              Zobacz realizacje{' '}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </>
        </Reveal>
        <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <>
            {stats.map((s) => (
              <SpotlightCard
                key={s.label}
                theme="light"
                spotlightColor="rgba(194, 74, 38, 0.12)"
                intensity={0.5}
                className="!bg-card !border-hair rounded p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-ink/20"
              >
                <div className="font-serif text-[48px] md:text-[56px] leading-none text-accent font-normal tracking-tight">
                  <CountUp to={s.value} duration={2} />
                  <span>{s.suffix}</span>
                </div>
                <div className="text-[13.5px] text-ink-mute mt-4 max-w-[22ch] leading-relaxed">{s.label}</div>
              </SpotlightCard>
            ))}
          </>
        </Reveal>
      </div>
    </section>
  );
}
