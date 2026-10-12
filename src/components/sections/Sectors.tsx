'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { otherSector, sectors } from '@/lib/content';
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard';

const tabs = [
  ...sectors.map((s) => ({ label: s.label, hint: s.hint, href: `/sektory/${s.slug}` })),
  { label: otherSector.title, hint: 'Nowe obszary · projekty dedykowane', href: '/kontakt' },
];

const panels = [
  ...sectors.map((s) => ({ title: s.title, intro: s.intro, cases: s.cases, href: `/sektory/${s.slug}` })),
  { title: otherSector.title, intro: otherSector.intro, cases: otherSector.cases, href: '/kontakt' },
];

export function Sectors() {
  const [active, setActive] = useState(0);
  const panel = panels[active];

  return (
    <section id="sektory" className="py-[120px] bg-paper-2 border-y border-hair">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="eyebrow">Obszary działania</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4 font-medium tracking-tight">
              Te branże znamy naprawdę dobrze. W kolejne wchodzimy{' '}
              <em className="font-serif italic font-normal text-accent">tą samą metodą</em>.
            </h2>
            <p className="sub">
              Każdy wertykał ma własny model danych, własne regulacje i własny sposób sprzedaży, dlatego nie udajemy,
              że znamy każdą branżę od pierwszego dnia. Znamy natomiast sposób, w jaki się w nią wchodzi: partner
              znający realia, Discovery, POC na prawdziwych danych. Ryzyko nowego obszaru weryfikujemy w trzy tygodnie,
              nie w trzy kwartały.
            </p>
          </>
        </Reveal>

        <Reveal className="grid lg:grid-cols-[0.85fr_1.618fr] border border-hair bg-card rounded overflow-hidden shadow-sm">
          <>
            <div className="flex lg:block overflow-x-auto bg-paper-2 lg:border-r border-hair">
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`relative text-left px-7 py-6 min-w-[180px] lg:w-full border-r lg:border-r-0 lg:border-b border-hair last:border-0 transition-colors ${
                    active === i ? 'bg-card text-ink' : 'text-ink-mute hover:text-ink'
                  }`}
                >
                  <span
                    className={`absolute left-0 bottom-0 lg:top-0 w-full lg:w-0.5 h-0.5 lg:h-full bg-accent origin-left lg:origin-top transition-transform duration-300 ${
                      active === i ? 'scale-100' : 'scale-0'
                    }`}
                  />
                  <span className="block text-[19px] font-semibold tracking-[-0.02em]">{t.label}</span>
                  <span className="block text-[12.5px] text-ink-faint mt-0.5">{t.hint}</span>
                </button>
              ))}
            </div>

            <div key={active} className="p-7 md:p-11 animate-panel-in flex flex-col justify-between">
              <div>
                <h3 className="text-[27px] font-medium tracking-tight mb-3">{panel.title}</h3>
                <p className="text-[15.5px] text-ink-soft max-w-[56ch] leading-relaxed">{panel.intro}</p>

                <div className="grid sm:grid-cols-2 gap-3.5 mt-8">
                  {panel.cases.map((c) => (
                    <SpotlightCard
                      key={c.name}
                      theme="light"
                      spotlightColor="rgba(194, 74, 38, 0.14)"
                      intensity={0.5}
                      className="!bg-card !border-hair rounded p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-ink/20"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="text-[15px] font-semibold flex items-center gap-2 text-ink">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {c.name}
                          </div>
                          {(c as { note?: string }).note ? (
                            <span className="font-mono text-[9.5px] text-accent px-1.5 py-0.5 rounded bg-accent-soft border border-accent/20">
                              {(c as { note?: string }).note}
                            </span>
                          ) : null}
                        </div>
                        <div className="text-[13px] text-ink-mute leading-relaxed">{c.desc}</div>
                      </div>
                      <div className="flex gap-1.5 flex-wrap mt-4 pt-3 border-t border-hair/60">
                        {c.tags.map((t) => (
                          <span key={t} className="chip bg-paper-2/60">{t}</span>
                        ))}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              <Link href={panel.href} className="inline-flex items-center gap-2 mt-8 text-[13.5px] font-medium text-accent hover:text-accent-hi transition-colors group">
                {active < sectors.length ? 'Zobacz szczegóły sektora' : 'Porozmawiajmy o Twojej branży'}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </>
        </Reveal>
      </div>
    </section>
  );
}
