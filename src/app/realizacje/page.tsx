import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';
import { cases } from '@/lib/cases';

const TITLE = 'Realizacje: jak myślimy i co budujemy';
const DESC =
  'Case studies Finareny: problem, decyzje, odrzucone alternatywy i zmiana, jaką przyniosło rozwiązanie. Pokazujemy prawdziwe ekrany produktów.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/realizacje' },
  openGraph: { title: TITLE, description: DESC, url: '/realizacje' },
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Realizacje"
        title={
          <>
            Decyzje, nie <em className="font-serif italic font-normal text-accent">deklaracje</em>.
          </>
        }
        lead="Nie publikujemy wyników klientów. Pokazujemy coś, co mówi o nas więcej: jak przeformułowaliśmy problem, co świadomie odrzuciliśmy i jak działa to, co zbudowaliśmy."
      />

      <section className="py-14 md:py-20">
        <div className="wrap grid md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((c) => (
            <Link key={c.slug} href={`/realizacje/${c.slug}`} className="group block bg-card border border-hair hover:shadow-lift transition-shadow">
              {c.video ? (
                <div className="aspect-video overflow-hidden border-b border-hair bg-paper-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.video.posterDesktop}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <div className="p-6 md:p-7">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="chip border-accent text-accent">{c.sector.label}</span>
                  {c.ownProject ? <span className="chip">Projekt własny</span> : null}
                </div>
                <div className="text-[13px] text-ink-faint mb-1.5">{c.name}</div>
                <h2 className="text-[22px] md:text-[24px] leading-[1.2] mb-5 balance">{c.headline}</h2>
                <span className="inline-flex items-center gap-2 text-[13.5px] text-accent">
                  Zobacz case <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
