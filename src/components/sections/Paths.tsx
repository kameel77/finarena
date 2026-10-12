import Link from 'next/link';
import { ArrowRight, Code2, Users2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard';

const build = [
  'Produkty i platformy: POC → MVP → produkcja → run',
  'Wdrożenia AI: asystenci, ekstrakcja dokumentów, scoring',
  'Automatyzacja procesów i integracje systemów',
  'Audyt architektury i przejęcie zastanego projektu',
];

const lead = [
  'Executive mentoring dla founderów i C-level',
  'CliftonStrengths®: mapy kompetencji i matryce talentów',
  'Programy rozwoju przywództwa',
  'Kultura innowacji i modele operacyjne',
];

export function Paths() {
  return (
    <section id="tory" className="py-[120px]">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="eyebrow">Dwa tory, jedna teza</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4">
              Technologia bez zmiany w ludziach to{' '}
              <em className="font-serif italic font-normal text-accent">przepalony budżet</em>.
            </h2>
            <p className="sub">
              Wdrożenie, którego nikt w organizacji nie chce prowadzić, umiera po sześciu miesiącach. Dlatego jedno
              i drugie robimy u tego samego klienta, ale wchodzisz tą ścieżką, która jest teraz Twoim problemem.
            </p>
          </>
        </Reveal>

        <Reveal className="grid lg:grid-cols-2 gap-6">
          <>
            <SpotlightCard
              theme="dark"
              spotlightColor="rgba(224, 92, 49, 0.25)"
              intensity={0.7}
              shape="circle"
              className="!bg-ink text-paper !border-white/10 rounded p-8 md:p-11 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="kicker text-white/45 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-accent-hi" />
                    Tor 1 · dla CTO, COO, foundera
                  </div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                    Studio Produktowe
                  </span>
                </div>
                <h3 className="text-[30px] mb-1.5 font-medium tracking-tight">Finarena Build</h3>
                <div className="text-accent-hi text-[13.5px] font-medium mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Wdrożenia w wertykałach & AI
                </div>
                <p className="text-[15px] text-white/70 mb-6 max-w-[44ch] leading-relaxed">
                  Budujemy oprogramowanie produkcyjne, od POC po pełne wdrożenie i utrzymanie. Nie „projekt”, tylko
                  sekwencja odwracalnych decyzji, w której każdy etap kończy się czymś działającym.
                </p>
                <ul className="mb-7">
                  {build.map((t, i) => (
                    <li key={t} className="flex gap-3 items-baseline text-[14.5px] text-white/80 py-2.5 border-b border-white/10 last:border-0">
                      <b className="font-mono text-[9.5px] text-accent-hi font-medium">0{i + 1}</b>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/build" className="btn-ghost-dark self-start mt-4 group">
                Zobacz, jak pracujemy <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </SpotlightCard>

            <SpotlightCard
              theme="light"
              spotlightColor="rgba(194, 74, 38, 0.15)"
              intensity={0.6}
              shape="circle"
              className="!bg-card !border-hair rounded p-8 md:p-11 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lift"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="kicker text-ink-faint flex items-center gap-2">
                    <Users2 className="w-3.5 h-3.5 text-accent" />
                    Tor 2 · dla CEO, właściciela, zarządu
                  </div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent-soft text-accent border border-accent/20">
                    Certyfikat Gallup
                  </span>
                </div>
                <h3 className="text-[30px] mb-1.5 font-medium tracking-tight">Finarena Leadership</h3>
                <div className="text-accent text-[13.5px] font-medium mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Butik doradczy · praca z ludźmi
                </div>
                <p className="text-[15px] text-ink-soft mb-6 max-w-[44ch] leading-relaxed">
                  Pracujemy z osobami, które podejmują decyzje, i z zespołami, które je wykonują. Certyfikowana metodyka,
                  mierzalny efekt, brak korporacyjnych warsztatów bez konsekwencji.
                </p>
                <ul className="mb-7">
                  {lead.map((t, i) => (
                    <li key={t} className="flex gap-3 items-baseline text-[14.5px] text-ink-soft py-2.5 border-b border-hair last:border-0">
                      <b className="font-mono text-[9.5px] text-accent font-medium">0{i + 1}</b>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/leadership" className="btn-ghost self-start mt-4 group">
                Poznaj ludzi, z którymi pracujesz <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </SpotlightCard>
          </>
        </Reveal>
      </div>
    </section>
  );
}
