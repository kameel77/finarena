import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PhiCanvas } from '@/components/ui/PhiCanvas';

const meta = [
  { n: '3 tyg.', l: 'od pomysłu do POC' },
  { n: '30+', l: 'wdrożonych MVP' },
  { n: '420+', l: 'sesji CliftonStrengths' },
];

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
          <div className="eyebrow">Produkty · Wdrożenia · Przywództwo</div>
          <h1 className="text-[clamp(38px,4.9vw,66px)] max-w-[19ch] mb-7 balance">
            Nie tylko doradzamy, jak budować procesy i aplikacje.{' '}
            <em className="font-serif italic font-normal text-accent">Budujemy je.</em>
          </h1>
          <p className="lede max-w-[50ch] mb-9">
            Mamy działające produkty w automotive, legal i HR — i wiemy, dlaczego większość wdrożeń nie przyjmuje się
            w organizacji. Dlatego prowadzimy dwa tory naraz: budujemy systemy i rozwijamy ludzi, którzy je poprowadzą.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/build" className="btn-accent">
              Chcę zbudować produkt <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/leadership" className="btn-ghost">
              Chcę rozwinąć zespół i siebie
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-hair pt-6 mt-12">
            {meta.map((m) => (
              <div key={m.l}>
                <span className="block font-serif text-[32px] leading-tight">{m.n}</span>
                <span className="block text-[12.5px] text-ink-mute">{m.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <PhiCanvas />
        </div>
      </div>
    </section>
  );
}
