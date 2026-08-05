import { Reveal } from '@/components/ui/Reveal';

export function Manifest() {
  return (
    <section className="py-[120px] bg-paper-2 border-y border-hair">
      <div className="wrap grid lg:grid-cols-[1fr_1.618fr] gap-14 items-center">
        <div className="hidden lg:flex justify-center">
          <svg width="240" height="240" viewBox="0 0 260 260" fill="none" aria-hidden>
            <rect x="10" y="10" width="240" height="148" stroke="rgba(20,24,27,.16)" />
            <rect x="10" y="10" width="148" height="148" stroke="rgba(20,24,27,.16)" />
            <rect x="158" y="10" width="92" height="92" stroke="rgba(20,24,27,.16)" />
            <rect x="158" y="102" width="56" height="56" stroke="rgba(20,24,27,.16)" />
            <path d="M10 158 A148 148 0 0 1 158 10" stroke="#C24A26" strokeWidth="1.3" />
            <path d="M158 10 A92 92 0 0 1 250 102" stroke="#C24A26" strokeWidth="1.3" />
            <path d="M250 102 A56 56 0 0 1 194 158" stroke="#C24A26" strokeWidth="1.3" />
            <text x="60" y="216" fontFamily="Georgia, serif" fontSize="66" fill="#C24A26">Φ</text>
            <text x="116" y="216" fontFamily="monospace" fontSize="11.5" fill="#A9B0B6">= 1,618…</text>
          </svg>
        </div>
        <Reveal>
          <>
            <div className="eyebrow">Manifest</div>
            <blockquote className="font-serif italic text-[clamp(25px,2.9vw,38px)] leading-[1.28] tracking-[-0.01em]">
              Najlepsze systemy nie są ani zbyt złożone, ani zbyt proste. Są{' '}
              <span className="text-accent">we właściwej proporcji</span> — między technologią, procesem i człowiekiem.
            </blockquote>
            <p className="mt-6 text-ink-mute text-[13.5px] max-w-[52ch]">
              Φ to grecka litera oznaczająca złoty podział — zasadę, według której projektowano budowle przez dwa
              tysiące lat. U nas nie jest ozdobą: wyznacza siatkę tej strony i sposób, w jaki dzielimy budżet projektu
              między system a ludzi, którzy mają go używać.
            </p>
          </>
        </Reveal>
      </div>
    </section>
  );
}
