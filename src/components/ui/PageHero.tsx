import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead: string; children?: ReactNode }) {
  return (
    <section className="pt-[140px] pb-16 border-b border-hair">
      <div className="wrap max-w-[900px] animate-fade-up">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="text-[clamp(34px,4.4vw,58px)] mb-6 balance">{title}</h1>
        <p className="lede max-w-[62ch]">{lead}</p>
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function Block({ id, eyebrow, title, children }: { id?: string; eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="py-16 border-b border-hair last:border-0">
      <div className="wrap grid lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
        <div>
          {eyebrow ? <div className="kicker text-accent mb-3">{eyebrow}</div> : null}
          <h2 className="text-[26px] md:text-[30px] lg:sticky lg:top-28">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-px bg-hair border border-hair">
      {items.map((t, i) => (
        <li key={t} className="bg-card p-5 flex gap-3.5 items-baseline text-[14.5px] text-ink-soft">
          <b className="font-mono text-[9.5px] text-ink-faint font-normal">{String(i + 1).padStart(2, '0')}</b>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-hair border-y border-hair">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="cursor-pointer list-none flex justify-between gap-6 text-[16px] font-medium marker:hidden">
            {f.q}
            <span className="text-accent transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
          </summary>
          <p className="text-[14.5px] text-ink-mute mt-3 max-w-[70ch]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
