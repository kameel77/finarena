import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';
import { people } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Ludzie — kto prowadzi projekty w Finarenie',
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
        <div className="wrap grid md:grid-cols-3 gap-5">
          {people.map((p) => (
            <article key={p.name + p.role} className="border border-hair bg-card rounded overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="aspect-[1/1.1] bg-gradient-to-br from-paper-2 to-[#E2DDD3] border-b border-hair flex items-center justify-center text-center px-5 kicker text-ink-faint">
                Zdjęcie — sesja własna
              </div>
              <div className="p-6">
                <div className="text-[20px] font-semibold">{p.name}</div>
                <div className="text-[13px] text-accent mt-0.5 mb-4">{p.role}</div>
                <p className="text-[14px] text-ink-mute leading-relaxed">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
