import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Block, Bullets } from '@/components/ui/PageHero';
import { CaseVideo } from '@/components/ui/CaseVideo';
import { ContactSection } from '@/components/sections/ContactSection';
import { cases, getCase } from '@/lib/cases';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCase(params.slug);
  if (!c) return {};
  const url = `/realizacje/${c.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      images: c.ogImage ? [{ url: c.ogImage, width: 1200, height: 630, alt: c.name }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description: c.metaDesc, images: c.ogImage ? [c.ogImage] : undefined },
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug);
  if (!c) notFound();
  const others = cases.filter((x) => x.slug !== c.slug);

  return (
    <>
      <section className="pt-[120px] md:pt-[140px] pb-10 md:pb-12">
        <div className="wrap max-w-[900px] animate-fade-up">
          <div className="eyebrow">
            <Link href="/realizacje" className="hover:text-accent-hi">Realizacje</Link>
            <span className="text-ink-faint">·</span>
            {c.sector.slug ? (
              <Link href={`/sektory/${c.sector.slug}`} className="hover:text-accent-hi">{c.sector.label}</Link>
            ) : (
              <span>{c.sector.label}</span>
            )}
          </div>
          <h1 className="text-[clamp(30px,4.2vw,54px)] mb-6 balance">{c.headline}</h1>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
            <span className="chip shrink-0 border-accent text-accent">{c.name}</span>
            {c.ownProject ? <span className="chip shrink-0">Projekt własny</span> : null}
            {c.productUrl ? (
              <a href={c.productUrl} target="_blank" rel="noopener" className="chip shrink-0 hover:border-accent hover:text-accent">
                {c.productUrl.replace(/^https?:\/\//, '')} ↗
              </a>
            ) : null}
            {c.tags.map((t) => (
              <span key={t} className="chip shrink-0">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {c.video ? (
        <section className="pb-14 md:pb-20 border-b border-hair">
          <div className="wrap max-w-[1120px] animate-fade-up">
            <CaseVideo video={c.video} />
            <p className="mt-3 text-[12.5px] text-ink-faint">
              {c.videoNote ?? 'Prawdziwe ekrany na danych testowych. Wartości i dane klientów pominięte.'}
            </p>
          </div>
        </section>
      ) : null}

      <Block eyebrow="Punkt wyjścia" title="Z czym przyszliśmy">
        <div className="grid md:grid-cols-2 gap-px bg-hair border border-hair">
          <div className="bg-card p-6 md:p-7">
            <div className="kicker text-ink-faint mb-3">Sytuacja</div>
            <p className="text-[15.5px] text-ink-soft leading-relaxed">{c.context}</p>
          </div>
          <div className="bg-card p-6 md:p-7">
            <div className="kicker text-accent mb-3">Prawdziwy problem</div>
            <p className="text-[15.5px] text-ink leading-relaxed">{c.realProblem}</p>
          </div>
        </div>
      </Block>

      <Block eyebrow="Decyzje" title="Jak myśleliśmy">
        <ol className="border-y border-hair divide-y divide-hair">
          {c.decisions.map((d, i) => (
            <li key={d.lead} className="py-6 md:py-7 grid grid-cols-[28px_1fr] gap-3 md:gap-4">
              <span className="font-mono text-[11px] text-accent pt-1.5">{String(i + 1).padStart(2, '0')}</span>
              <div className="max-w-[64ch]">
                <h3 className="text-[19px] md:text-[21px] font-medium mb-2">{d.lead}</h3>
                <p className="text-[15px] text-ink-soft leading-relaxed">{d.why}</p>
                <p className="mt-3 text-[13.5px] text-ink-mute leading-relaxed">
                  <span className="kicker text-ink-faint mr-2">Odrzuciliśmy</span>
                  {d.rejected}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block eyebrow="Realizacja" title="Co zbudowaliśmy">
        <Bullets items={c.built} />
      </Block>

      <Block eyebrow="Efekt" title="Co się zmieniło">
        <ul className="space-y-3">
          {c.shifts.map((s) => (
            <li
              key={s.from}
              className="grid md:grid-cols-[1fr_44px_1fr] items-stretch border border-hair bg-card"
            >
              <div className="p-5 md:p-6">
                <div className="kicker text-ink-faint mb-2">Z</div>
                <p className="text-[15px] text-ink-mute leading-snug">{s.from}</p>
              </div>
              <div className="flex items-center justify-center border-y md:border-y-0 md:border-x border-hair py-2 md:py-0 bg-paper-2">
                <ArrowRight className="hidden md:block w-4 h-4 text-accent" />
                <ArrowDown className="md:hidden w-4 h-4 text-accent" />
              </div>
              <div className="p-5 md:p-6">
                <div className="kicker text-accent mb-2">Na</div>
                <p className="text-[16px] text-ink font-medium leading-snug">{s.to}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <section className="py-16 border-b border-hair">
        <div className="wrap">
          <div className="bg-ink text-paper rounded-lg p-7 md:p-12 grid lg:grid-cols-[1.618fr_1fr] gap-8 items-end">
            <div>
              <div className="kicker text-accent-hi mb-4">Kiedy to pasuje do Twojej firmy</div>
              <p className="text-[22px] md:text-[28px] leading-[1.25] balance">{c.fitsWhen}</p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/kontakt" className="btn-accent justify-center">Porozmawiajmy <ArrowRight className="w-3.5 h-3.5" /></Link>
              <Link href="/build" className="btn-ghost-dark justify-center">Jak pracujemy</Link>
            </div>
          </div>
        </div>
      </section>

      {c.footnote ? (
        <div className="wrap pt-8">
          <p className="text-[12px] text-ink-faint max-w-[80ch]">{c.footnote}</p>
        </div>
      ) : null}

      {others.length ? (
        <Block eyebrow="Inne realizacje" title="Zobacz też">
          <div className="grid sm:grid-cols-2 gap-px bg-hair border border-hair">
            {others.slice(0, 4).map((o) => (
              <Link key={o.slug} href={`/realizacje/${o.slug}`} className="bg-card p-6 hover:bg-paper-2 transition-colors">
                <div className="text-[18px] font-semibold mb-1">{o.name}</div>
                <div className="text-[13.5px] text-ink-mute mb-3">{o.headline}</div>
                <span className="text-[13px] text-accent">Zobacz →</span>
              </Link>
            ))}
          </div>
        </Block>
      ) : null}

      <ContactSection />
    </>
  );
}
