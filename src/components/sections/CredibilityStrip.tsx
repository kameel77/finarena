import { Reveal } from '@/components/ui/Reveal';

export function CredibilityStrip() {
  return (
    <section className="border-y border-hair py-9">
      <Reveal className="wrap grid lg:grid-cols-[1.618fr_1fr] gap-6 lg:gap-12 items-center">
        <>
          <div>
            <div className="kicker text-accent mb-2.5">Skąd to wiemy</div>
            <p className="text-[15px] text-ink-soft max-w-[62ch]">
              Sami przeszliśmy tę drogę: narzędzie do map kompetencji zbudowaliśmy najpierw na własne potrzeby doradcze,
              a potem wypuściliśmy jako osobny produkt. <b className="text-ink font-semibold">Nie doradzamy budowania produktów z boku.</b>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end text-[12.5px] text-ink-mute">
            <span className="flex items-baseline gap-2 whitespace-nowrap"><b className="font-mono text-[9.5px] text-ink-faint font-normal">01</b> Problem w naszej pracy</span>
            <span className="text-ink-faint">→</span>
            <span className="flex items-baseline gap-2 whitespace-nowrap"><b className="font-mono text-[9.5px] text-ink-faint font-normal">02</b> Narzędzie wewnętrzne</span>
            <span className="text-ink-faint">→</span>
            <a href="https://talentpilot.io" target="_blank" rel="noopener" className="flex items-baseline gap-2 whitespace-nowrap text-accent font-medium hover:text-accent-hi transition-colors">
              <b className="font-mono text-[9.5px] font-normal opacity-70">03</b> talentpilot.io ↗
            </a>
          </div>
        </>
      </Reveal>
    </section>
  );
}
