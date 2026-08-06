import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/sections/LeadForm';

const steps = [
  { k: 'Krok 1', v: '30-minutowa rozmowa diagnostyczna. Bez zobowiązań.' },
  { k: 'Krok 2', v: 'Ramowa propozycja zakresu i budżetu w ciągu 3 dni.' },
  { k: 'Krok 3', v: 'Discovery lub POC. Startujemy zwykle w 2 tygodnie.' },
];

export function ContactSection({ id = 'kontakt' }: { id?: string }) {
  return (
    <section id={id} className="py-[120px] border-t border-hair">
      <div className="wrap grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          <>
            <div className="eyebrow">Kontakt</div>
            <h2 className="text-[clamp(30px,3.7vw,46px)] mb-4">
              Powiedz nam, gdzie <em className="font-serif italic font-normal text-accent">utknęło</em>.
            </h2>
            <p className="sub mb-8">
              Odpowiadamy w 24 h roboczych. Pierwsza rozmowa to 30 minut i konkretna rekomendacja, nie prezentacja o nas.
            </p>
            <ul>
              {steps.map((s) => (
                <li key={s.k} className="flex gap-4 py-5 border-b border-hair text-[14.5px] text-ink-soft">
                  <b className="kicker text-accent min-w-[90px] pt-1 font-medium">{s.k}</b>
                  <span>{s.v}</span>
                </li>
              ))}
            </ul>
          </>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
