import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const build = [
  'Produkty i platformy: POC → MVP → produkcja → run',
  'Wdrożenia AI: asystenci, ekstrakcja dokumentów, scoring',
  'Automatyzacja procesów i integracje systemów',
  'Audyt architektury i przejęcie zastanego projektu',
];

const lead = [
  'Executive mentoring dla founderów i C-level',
  'CliftonStrengths® — mapy kompetencji i matryce talentów',
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
              i drugie robimy u tego samego klienta — ale wchodzisz tą ścieżką, która jest teraz Twoim problemem.
            </p>
          </>
        </Reveal>

        <Reveal className="grid lg:grid-cols-2 gap-5">
          <>
            <div className="bg-ink text-paper border border-ink rounded p-8 md:p-11 flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <div className="kicker text-white/45 mb-5">Tor 1 — dla CTO, COO, foundera</div>
              <h3 className="text-[30px] mb-1.5">Finarena Build</h3>
              <div className="text-accent-hi text-[13.5px] font-medium mb-4">Studio produktowe w wertykałach</div>
              <p className="text-[15px] text-white/70 mb-6 max-w-[44ch]">
                Budujemy oprogramowanie produkcyjne — od POC po pełne wdrożenie i utrzymanie. Nie „projekt”, tylko
                sekwencja odwracalnych decyzji, w której każdy etap kończy się czymś działającym.
              </p>
              <ul className="mb-7 flex-1">
                {build.map((t, i) => (
                  <li key={t} className="flex gap-3 items-baseline text-[14.5px] text-white/80 py-2.5 border-b border-white/10 last:border-0">
                    <b className="font-mono text-[9.5px] text-white/35 font-normal">0{i + 1}</b>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/build" className="btn-ghost-dark self-start">
                Zobacz, jak pracujemy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-card border border-hair rounded p-8 md:p-11 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lift">
              <div className="kicker text-ink-faint mb-5">Tor 2 — dla CEO, właściciela, zarządu</div>
              <h3 className="text-[30px] mb-1.5">Finarena Leadership</h3>
              <div className="text-accent text-[13.5px] font-medium mb-4">Butik doradczy — praca z ludźmi</div>
              <p className="text-[15px] text-ink-soft mb-6 max-w-[44ch]">
                Pracujemy z osobami, które podejmują decyzje, i z zespołami, które je wykonują. Certyfikowana metodyka,
                mierzalny efekt, brak korporacyjnych warsztatów bez konsekwencji.
              </p>
              <ul className="mb-7 flex-1">
                {lead.map((t, i) => (
                  <li key={t} className="flex gap-3 items-baseline text-[14.5px] text-ink-soft py-2.5 border-b border-hair last:border-0">
                    <b className="font-mono text-[9.5px] text-ink-faint font-normal">0{i + 1}</b>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/leadership" className="btn-ghost self-start">
                Poznaj ludzi, z którymi pracujesz <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        </Reveal>
      </div>
    </section>
  );
}
