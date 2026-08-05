import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Block, Bullets, Faq, PageHero } from '@/components/ui/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Mapy kompetencji CliftonStrengths (Gallup) dla zespołów',
  description:
    'Połącz talenty ludzi z celami biznesowymi. Diagnoza indywidualna, mapa talentów zespołu, przełożenie na role i odpowiedzialności oraz follow-up wdrożeniowy.',
};

const stages = [
  { t: 'Etap 1 — Discovery i kontekst biznesowy', items: ['Definiujemy cele organizacyjne: tempo delivery, retencja, jakość współpracy', 'Ustalamy KPI sukcesu wdrożenia', 'Mapujemy obszary największych napięć'] },
  { t: 'Etap 2 — Diagnoza indywidualna', items: ['Badanie CliftonStrengths dla członków zespołu', 'Analiza profili: naturalne predyspozycje i ryzyka przeciążenia', 'Hipotezy dotyczące stylu pracy i współpracy'] },
  { t: 'Etap 3 — Budowa mapy zespołowej', items: ['Łączymy profile w jeden obraz zespołu', 'Identyfikujemy luki i nadreprezentacje talentów', 'Przygotowujemy rekomendacje ról i odpowiedzialności'] },
  { t: 'Etap 4 — Warsztat wdrożeniowy', items: ['Zespół uczy się pracować na wspólnym języku mocnych stron', 'Porządkujemy reguły współpracy i decyzyjności', 'Ustalamy konkretne rytuały operacyjne'] },
  { t: 'Etap 5 — Praca z liderami i stabilizacja', items: ['Liderzy dostają narzędzia do świadomego delegowania', 'Wzmacniamy komunikację, feedback i ownership', 'Follow-up 6–12 tygodni: korekty i utrwalenie nawyków'] },
];

const forOrg = [
  'Wyższa efektywność pracy bez zwiększania headcountu',
  'Mniej kosztownych konfliktów i nieporozumień',
  'Szybsze decyzje i większa odpowiedzialność zespołów',
  'Lepsza retencja kluczowych ludzi',
  'Spójność między strategią a codziennym sposobem działania',
  'Jasność ról i oczekiwań',
];

const forPeople = [
  'Mniejsze przeciążenie „nie swoimi” zadaniami',
  'Poczucie sensu i wpływu na rezultat',
  'Praktyczny model współpracy zamiast ogólnych deklaracji',
  'Precyzyjne delegowanie pod mocne strony',
  'Lepsze rozmowy rozwojowe i feedback',
  'Mniej eskalacji i wąskich gardeł',
];

const faqs = [
  { q: 'Ile trwa cały proces?', a: 'Od Discovery do warsztatu zwykle 4–6 tygodni, plus follow-up wdrożeniowy przez kolejne 6–12 tygodni.' },
  { q: 'Czy każdy musi wykonać badanie?', a: 'Mapa zespołowa ma sens, gdy obejmuje cały zespół lub całą warstwę decyzyjną. Przy pojedynczych osobach pracujemy raczej mentoringowo.' },
  { q: 'Co dostajemy na koniec?', a: 'Profile indywidualne, mapę talentów zespołu, rekomendacje ról i odpowiedzialności oraz ustalone zasady współpracy i rytuały operacyjne.' },
  { q: 'Czy wyniki da się utrzymać po zakończeniu?', a: 'Po to jest follow-up i praca z liderami. Bez tego etapu nawyki wracają do stanu wyjściowego — dlatego nie sprzedajemy samego warsztatu.' },
];

export default function CompetencyMapsPage() {
  return (
    <>
      <PageHero
        eyebrow="Finarena Leadership · Metodyka"
        title={<>Mapy kompetencji, które kończą się <em className="font-serif italic font-normal text-accent">decyzją o rolach</em>.</>}
        lead="Badanie CliftonStrengths to początek, nie produkt. Wartość powstaje wtedy, gdy talenty zostają przełożone na role, odpowiedzialności i sposób pracy zespołu."
      >
        <Link href="/kontakt" className="btn-accent">Umów rozmowę <ArrowRight className="w-3.5 h-3.5" /></Link>
        <Link href="/leadership" className="btn-ghost">Wróć do toru Leadership</Link>
      </PageHero>

      <Block eyebrow="Proces" title="Pięć etapów wdrożenia">
        <div className="space-y-px bg-hair border border-hair">
          {stages.map((s) => (
            <div key={s.t} className="bg-card p-6">
              <h3 className="text-[17px] font-semibold mb-3">{s.t}</h3>
              <ul className="space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="text-[14.5px] text-ink-soft flex gap-3">
                    <span className="text-accent">—</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block eyebrow="Efekty" title="Dla organizacji">
        <Bullets items={forOrg} />
      </Block>

      <Block eyebrow="Efekty" title="Dla ludzi i liderów">
        <Bullets items={forPeople} />
      </Block>

      <Block eyebrow="FAQ" title="Częste pytania">
        <Faq items={faqs} />
      </Block>

      <ContactSection />
    </>
  );
}
