import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { PersonCard } from '@/components/ui/PersonCard';
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

        <Reveal className="grid md:grid-cols-2 gap-5 max-w-[880px]">
          <>
            {people.map((p) => (
              <PersonCard key={p.name} person={p} />
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
