import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/lib/content';

export function Stats() {
  return (
    <section className="py-[120px]">
      <div className="wrap">
        <Reveal className="max-w-[58ch] mb-14">
          <>
            <div className="eyebrow">Dowody</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4">
              Liczby, nie <em className="font-serif italic font-normal text-accent">deklaracje</em>.
            </h2>
            <p className="sub">
              Docelowo w tym miejscu 2–3 case studies z wynikiem przed/po. Bez nich ta sekcja pracuje na ćwierć gwizdka.
            </p>
          </>
        </Reveal>
        <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair">
          <>
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-8 md:p-10 transition-colors hover:bg-paper-2">
                <div className="font-serif text-[52px] leading-none text-accent">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[13.5px] text-ink-mute mt-3 max-w-[22ch]">{s.label}</div>
              </div>
            ))}
          </>
        </Reveal>
      </div>
    </section>
  );
}
