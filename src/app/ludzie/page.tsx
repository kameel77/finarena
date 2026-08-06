import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { PersonCard } from '@/components/ui/PersonCard';
import { ContactSection } from '@/components/sections/ContactSection';
import { people } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Ludzie. Kto prowadzi projekty w Finarenie',
  description: 'Osoby odpowiedzialne za tor Build i tor Leadership: doświadczenie, certyfikacje, dorobek.',
};

export default function PeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="Ludzie"
        title={<>W Finarenie kupujesz <em className="font-serif italic font-normal text-accent">konkretne osoby</em>, nie logo.</>}
        lead="Nie mamy anonimowego „zespołu ekspertów”. Poniżej osoby, które prowadzą projekty, podpisują rekomendacje i odbierają telefon, gdy coś idzie nie tak."
      >
        <Link href="/kontakt" className="btn-accent">Umów rozmowę <ArrowRight className="w-3.5 h-3.5" /></Link>
      </PageHero>

      <section className="py-16">
        <div className="wrap grid md:grid-cols-2 gap-5 max-w-[880px]">
          {people.map((p, i) => (
            <PersonCard key={p.name} person={p} priority={i === 0} />
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
