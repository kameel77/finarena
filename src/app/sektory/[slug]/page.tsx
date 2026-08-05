import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Block, Bullets, PageHero } from '@/components/ui/PageHero';
import { Delivery } from '@/components/sections/Delivery';
import { ContactSection } from '@/components/sections/ContactSection';
import { sectors } from '@/lib/content';

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = sectors.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDesc,
    alternates: { canonical: `/sektory/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDesc, url: `/sektory/${s.slug}` },
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sector = sectors.find((s) => s.slug === params.slug);
  if (!sector) notFound();

  const others = sectors.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <PageHero eyebrow={`Sektor · ${sector.label}`} title={sector.title} lead={sector.intro}>
        <Link href="/kontakt" className="btn-accent">Omów projekt w tym sektorze <ArrowRight className="w-3.5 h-3.5" /></Link>
        <Link href="/build" className="btn-ghost">Jak pracujemy</Link>
      </PageHero>

      <Block eyebrow="Problem" title="Co zwykle boli w tej branży">
        <p className="text-[15.5px] text-ink-soft max-w-[68ch]">{sector.problem}</p>
      </Block>

      <Block eyebrow="Podejście" title="Jak do tego podchodzimy">
        <Bullets items={sector.approach} />
      </Block>

      <Block eyebrow="Realizacje" title="Co zbudowaliśmy">
        <div className="grid sm:grid-cols-2 gap-px bg-hair border border-hair">
          {sector.cases.map((c) => (
            <div key={c.name} className="bg-card p-6">
              <div className="text-[17px] font-semibold mb-1.5 flex items-center gap-2">
                <i className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
                {c.name}
                {c.note ? <span className="text-[10px] text-ink-faint font-normal">— {c.note}</span> : null}
              </div>
              <p className="text-[13.5px] text-ink-mute leading-relaxed">{c.desc}</p>
              <div className="flex gap-1.5 flex-wrap mt-4">
                {c.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Delivery />

      <Block eyebrow="Inne sektory" title="Zobacz też">
        <div className="grid sm:grid-cols-2 gap-px bg-hair border border-hair">
          {others.map((s) => (
            <Link key={s.slug} href={`/sektory/${s.slug}`} className="bg-card p-6 hover:bg-paper-2 transition-colors">
              <div className="text-[18px] font-semibold mb-1">{s.label}</div>
              <div className="text-[12.5px] text-ink-faint mb-3">{s.hint}</div>
              <span className="text-[13px] text-accent">Zobacz →</span>
            </Link>
          ))}
        </div>
      </Block>

      <ContactSection />
    </>
  );
}
