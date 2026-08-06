import { Reveal } from '@/components/ui/Reveal';
import { stages } from '@/lib/content';

export function Delivery() {
  return (
    <section id="proces" className="py-[120px] bg-ink text-paper">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="kicker text-accent-hi flex items-center gap-3 mb-6 before:content-[''] before:w-[22px] before:h-px before:bg-accent-hi">
              Finarena Build · od POC do produkcji
            </div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4">
              Zaczynamy od najtańszego dowodu. Kończymy na{' '}
              <em className="font-serif italic font-normal text-accent-hi">systemie w produkcji</em>.
            </h2>
            <p className="text-[16.5px] text-white/65 max-w-[62ch]">
              Każdy etap ma stałą cenę, jasne kryterium sukcesu i możliwość wyjścia. Nie sprzedajemy zaufania na
              dwanaście miesięcy z góry.
            </p>
          </>
        </Reveal>

        <Reveal>
          <>
            <div className="h-px bg-white/15 relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-accent-hi to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-white/15">
              {stages.map((s) => (
                <div key={s.no} className="group relative pt-8 pr-6 border-r border-white/10 last:border-r-0">
                  <span className="absolute -top-1 left-0 w-[7px] h-[7px] rounded-full bg-ink border border-accent-hi transition-all duration-300 group-hover:bg-accent-hi group-hover:shadow-[0_0_16px_rgba(224,92,49,.6)]" />
                  <div className="font-mono text-[10px] tracking-[0.14em] text-accent-hi mb-3">{s.no}</div>
                  <h3 className="text-[18px] mb-2.5">{s.title}</h3>
                  <p className="text-[13.5px] text-white/55 leading-relaxed">{s.desc}</p>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-white/75">{s.time}</div>
                </div>
              ))}
            </div>
          </>
        </Reveal>
      </div>
    </section>
  );
}
