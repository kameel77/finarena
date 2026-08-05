import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { people } from '@/lib/content';

export function People() {
  return (
    <section id="ludzie" className="py-[120px]">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="eyebrow">Ludzie</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4">
              W Finarenie kupujesz <em className="font-serif italic font-normal text-accent">konkretne osoby</em>, nie logo.
            </h2>
            <p className="sub">
              Doradztwo sprzedaje się nazwiskiem i dorobkiem. Poniżej osoby, które prowadzą projekty — nie anonimowy
              „zespół ekspertów”.
            </p>
          </>
        </Reveal>

        <Reveal className="grid md:grid-cols-3 gap-5">
          <>
            {people.map((p) => (
              <article key={p.name + p.role} className="border border-hair bg-card rounded overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[1/1.1] bg-gradient-to-br from-paper-2 to-[#E2DDD3] border-b border-hair flex items-center justify-center text-center px-5 kicker text-ink-faint">
                  Zdjęcie — sesja własna
                </div>
                <div className="p-5">
                  <div className="text-[18px] font-semibold">{p.name}</div>
                  <div className="text-[13px] text-accent mt-0.5 mb-3">{p.role}</div>
                  <p className="text-[13.5px] text-ink-mute leading-relaxed">{p.bio}</p>
                </div>
              </article>
            ))}
          </>
        </Reveal>

        <Reveal className="mt-8">
          <Link href="/ludzie" className="btn-ghost">Pełne biogramy →</Link>
        </Reveal>
      </div>
    </section>
  );
}
