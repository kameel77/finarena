import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Block, Bullets, Faq, PageHero } from '@/components/ui/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';
import { People } from '@/components/sections/People';

export const metadata: Metadata = {
  title: 'Finarena Leadership: executive mentoring, przywództwo, kultura',
  description:
    'Mentoring 1:1 dla właścicieli i C-level, programy rozwoju przywództwa, mapy kompetencji CliftonStrengths i praca nad kulturą organizacji.',
};

const mentoring = [
  'Sesje 1:1: strategia, priorytety, egzekucja',
  'Praca nad realnymi decyzjami zarządczymi i organizacyjnymi',
  'Rozwój kompetencji właścicielskich i liderskich',
  'Sparing przy kluczowych zmianach w firmie',
  'Plan wdrożeniowy między sesjami',
  'Cykl 8–12 tygodni, z opcją rozszerzenia do programu półrocznego',
];

const leadership = [
  'Audyt kompetencji liderów i modelu decyzyjnego',
  'Program rozwoju liderów: 1:1 plus warsztaty',
  'Narzędzia delegowania, feedbacku i egzekucji',
  'Wsparcie transformacji roli managera w rolę lidera',
  'Mierniki efektywności przywództwa',
  'Praca na realnych sytuacjach z Twojej firmy, nie na teorii',
];

const culture = [
  'Diagnoza kultury i barier rozwojowych',
  'Warsztaty strategiczne: wartości, zasady, zachowania',
  'Programy współpracy międzydziałowej',
  'System feedbacku i uczenia się organizacji',
  'Plan wdrożenia innowacji w codziennych procesach',
  'Powiązanie działań kulturowych z KPI biznesowymi',
];

const results = [
  'Szybsze i bardziej spójne decyzje w organizacji',
  'Krótsza droga od decyzji do wdrożenia',
  'Wyższa odpowiedzialność liderów za wynik',
  'Lepsza współpraca i przepływ informacji między działami',
  'Mniej chaosu operacyjnego i większa przewidywalność',
  'Lepsza retencja kluczowych ludzi',
];

const faqs = [
  { q: 'Dla kogo jest mentoring?', a: 'Dla właścicieli firm, członków zarządu i liderów odpowiedzialnych za wynik. Pracujemy na Twoich realnych decyzjach, nie na ogólnych modelach.' },
  { q: 'Czym mentoring różni się od szkolenia?', a: 'Szkolenie przekazuje wiedzę. Mentoring pracuje na konkretnej sytuacji, w której jesteś, i kończy się decyzją oraz planem wdrożenia.' },
  { q: 'Jak długo trwa program rozwoju przywództwa?', a: 'Wersja podstawowa to 8–12 tygodni. Programy obejmujące całą kadrę menedżerską rozkładamy zwykle na dwa kwartały.' },
  { q: 'Czy kultura organizacyjna realnie wpływa na wyniki?', a: 'Tak. Na tempo decyzji, jakość współpracy i skuteczność wdrażania strategii. Mierzymy to konkretami: retencja, eNPS, czas realizacji projektów, liczba eskalacji.' },
  { q: 'Jak uniknąć „projektu HR”, który nie działa operacyjnie?', a: 'Wiążemy działania z KPI biznesowymi i z odpowiedzialnością konkretnych liderów za wdrożenie. Bez właściciela po stronie biznesu nie zaczynamy.' },
  { q: 'Czy pracujecie razem z torem technologicznym?', a: 'Często tak i to jest nasza przewaga. Wdrożenie systemu i przygotowanie ludzi do jego prowadzenia idą wtedy równolegle, w jednym kontrakcie.' },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Finarena Leadership"
        title={<>Rozwijamy ludzi, którzy <em className="font-serif italic font-normal text-accent">poprowadzą zmianę</em> po naszym wyjściu.</>}
        lead="Butikowe doradztwo dla właścicieli, zarządów i liderów. Certyfikowana metodyka, praca na realnych decyzjach, mierzalny efekt zamiast warsztatów bez konsekwencji."
      >
        <Link href="/kontakt" className="btn-accent">Umów rozmowę <ArrowRight className="w-3.5 h-3.5" /></Link>
        <Link href="/leadership/mapy-kompetencji" className="btn-ghost">Mapy kompetencji Gallup</Link>
      </PageHero>

      <Block eyebrow="Problem" title="Dlaczego zmiana nie przechodzi przez organizację">
        <div className="space-y-4 text-[15.5px] text-ink-soft max-w-[68ch]">
          <p>
            Liderzy działają pod presją i samotnie podejmują decyzje o wysokiej stawce. Brak zewnętrznej perspektywy
            zwiększa ryzyko błędu i spowalnia rozwój firmy.
          </p>
          <p>
            Równolegle organizacja dostaje nowe narzędzia, ale nikt nie zmienia sposobu, w jaki ludzie pracują.
            Wdrożenie formalnie się kończy, a praktyka wraca do starych nawyków po kilku miesiącach.
          </p>
          <p className="text-ink font-medium">
            Dlatego pracujemy na dwóch poziomach naraz: z osobą, która decyduje, i z zespołem, który wykonuje.
          </p>
        </div>
      </Block>

      <Block id="mentoring" eyebrow="Zakres" title="Executive mentoring 1:1">
        <Bullets items={mentoring} />
      </Block>

      <Block id="przywodztwo" eyebrow="Zakres" title="Rozwój przywództwa">
        <Bullets items={leadership} />
      </Block>

      <Block id="kultura" eyebrow="Zakres" title="Innowacje i kultura organizacji">
        <Bullets items={culture} />
      </Block>

      <Block eyebrow="Metodyka" title="Mapy kompetencji CliftonStrengths">
        <div className="space-y-4 text-[15.5px] text-ink-soft max-w-[68ch]">
          <p>
            Najbardziej rozbudowany element tego toru: diagnoza indywidualna, obraz talentów całego zespołu,
            przełożenie ich na role i odpowiedzialności, warsztat wdrożeniowy i follow-up przez 6–12 tygodni.
          </p>
          <Link href="/leadership/mapy-kompetencji" className="btn-ghost">Pełen opis procesu <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
      </Block>

      <Block eyebrow="Efekty" title="Czego możesz oczekiwać">
        <Bullets items={results} />
      </Block>

      <People />

      <Block eyebrow="FAQ" title="Częste pytania">
        <Faq items={faqs} />
      </Block>

      <ContactSection />
    </>
  );
}
