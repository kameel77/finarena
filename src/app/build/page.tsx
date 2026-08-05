import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Block, Bullets, Faq, PageHero } from '@/components/ui/PageHero';
import { Delivery } from '@/components/sections/Delivery';
import { ContactSection } from '@/components/sections/ContactSection';
import { sectors } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Finarena Build — POC, MVP i pełne wdrożenia programistyczne',
  description:
    'Budujemy oprogramowanie produkcyjne: od POC w 3 tygodnie, przez MVP, po pełne wdrożenie i utrzymanie. Wdrożenia AI, automatyzacja procesów, integracje.',
};

const ai = [
  'Audyt gotowości AI: procesy, dane, kompetencje zespołu',
  'Wybór 2–3 use case’ów o najwyższym zwrocie',
  'Asystenci AI dla sprzedaży, obsługi i back-office',
  'Ekstrakcja i klasyfikacja dokumentów, scoring, wyszukiwanie semantyczne',
  'Integracja z narzędziami, z których zespół już korzysta',
  'Testy, adopcja i pomiar efektów po wdrożeniu',
];

const automation = [
  'Audyt procesów operacyjnych: sprzedaż, obsługa, administracja',
  'Integracje narzędzi: CRM, formularze, e-mail, kalendarz, ERP',
  'Automatyczne powiadomienia, routing leadów i zadań',
  'Dashboardy statusów i SLA',
  'Dokumentacja procesowa i przeszkolenie właścicieli procesu',
  'Utrzymanie i rozwój po uruchomieniu',
];

const product = [
  'Discovery warsztatowe i priorytetyzacja funkcji',
  'Backlog MVP i roadmapa na 90 dni',
  'Projektowanie przepływów użytkownika i podstaw UX',
  'Budowa produktu przez nasz zespół inżynierski',
  'Architektura produkcyjna od pierwszego dnia, nie „przepiszemy później”',
  'Plan iteracji po uruchomieniu: metryki i decyzje',
];

const results = [
  'Skrócenie czasu obsługi procesów o 30–60%',
  'Krótszy czas realizacji powtarzalnych zadań, typowo 20–50%',
  'Mniej błędów operacyjnych i mniej pracy ręcznej',
  'Dane do decyzji: skalować, zmieniać czy zamykać',
  'Gotowa podstawa pod wersję produkcyjną',
  'Przewidywalny, skalowalny model operacyjny',
];

const faqs = [
  { q: 'Ile trwa pierwsze działające wdrożenie?', a: 'POC zamykamy zwykle w 2–3 tygodnie, MVP w 6–10. Pierwsze usprawnienia procesowe bywają widoczne już po 2–4 tygodniach.' },
  { q: 'Czy musimy mieć własny dział IT lub data science?', a: 'Nie. Projektujemy rozwiązania tak, by były utrzymywalne przez zespół biznesowo-operacyjny, a dokumentację i szkolenie zostawiamy po swojej stronie umowy.' },
  { q: 'Czy automatyzacja wymaga wymiany obecnych narzędzi?', a: 'Zazwyczaj nie. Wykorzystujemy obecny stack i dokładamy brakujące połączenia. Wymianę proponujemy tylko wtedy, gdy koszt utrzymania starego rozwiązania przewyższa koszt migracji.' },
  { q: 'Jak mierzymy sukces wdrożenia?', a: 'KPI ustalamy na starcie — czas procesu, koszt, jakość, konwersja — i raportujemy postęp co tydzień. Kryterium sukcesu jest częścią zakresu, nie dodatkiem.' },
  { q: 'Co, jeśli chcemy przejąć projekt do siebie?', a: 'Przewidujemy to w umowie. Etap Run może się skończyć transferem systemu, dokumentacji i zespołu po Twojej stronie. Nie budujemy zależności od nas.' },
  { q: 'Czy pracujecie tylko w automotive, legal i HR?', a: 'Nie. To wertykały, w których mamy własne produkty. W nowy obszar wchodzimy tą samą metodą — z partnerem znającym branżę, przez Discovery i POC.' },
];

export default function BuildPage() {
  return (
    <>
      <PageHero
        eyebrow="Finarena Build"
        title={<>Budujemy oprogramowanie, które <em className="font-serif italic font-normal text-accent">wchodzi na produkcję</em>.</>}
        lead="Od najtańszego dowodu wykonalności po system, który obsługuje realny ruch. Każdy etap ma stałą cenę, jasne kryterium sukcesu i możliwość wyjścia."
      >
        <Link href="/kontakt" className="btn-accent">Omów projekt <ArrowRight className="w-3.5 h-3.5" /></Link>
        <Link href="#proces" className="btn-ghost">Zobacz proces</Link>
      </PageHero>

      <Block eyebrow="Problem" title="Dlaczego wdrożenia się nie udają">
        <div className="space-y-4 text-[15.5px] text-ink-soft max-w-[68ch]">
          <p>
            Firmy budują „za dużo, za długo”. Brakuje jasnych hipotez, priorytetów i kryteriów sukcesu — efektem są
            wysokie koszty, opóźnienia i produkt niedopasowany do rynku.
          </p>
          <p>
            W obszarze AI jest jeszcze gorzej: wdrożenia kończą się na pojedynczych eksperymentach. Brak właściciela
            procesu, brak mierzalnych efektów, narzędzia, które „są”, ale nie wpływają na wynik operacyjny.
          </p>
          <p className="text-ink font-medium">
            Odpowiedzią nie jest większy budżet, tylko krótsza pętla decyzyjna. Dlatego pracujemy etapami, z których
            każdy kończy się czymś działającym i decyzją, czy iść dalej.
          </p>
        </div>
      </Block>

      <Delivery />

      <Block id="ai" eyebrow="Zakres" title="Wdrożenia AI">
        <Bullets items={ai} />
      </Block>

      <Block id="automatyzacja" eyebrow="Zakres" title="Automatyzacja procesów i integracje">
        <Bullets items={automation} />
      </Block>

      <Block id="scale" eyebrow="Zakres" title="Produkty: POC, MVP, pełne wdrożenie">
        <Bullets items={product} />
      </Block>

      <Block eyebrow="Efekty" title="Czego możesz oczekiwać">
        <Bullets items={results} />
      </Block>

      <Block eyebrow="Gdzie pracujemy" title="Sektory z własnymi produktami">
        <div className="grid sm:grid-cols-3 gap-px bg-hair border border-hair">
          {sectors.map((s) => (
            <Link key={s.slug} href={`/sektory/${s.slug}`} className="bg-card p-6 hover:bg-paper-2 transition-colors">
              <div className="text-[18px] font-semibold mb-1">{s.label}</div>
              <div className="text-[12.5px] text-ink-faint mb-3">{s.hint}</div>
              <div className="text-[13px] text-ink-mute leading-relaxed">{s.problem}</div>
              <span className="inline-block mt-4 text-[13px] text-accent">Zobacz →</span>
            </Link>
          ))}
        </div>
      </Block>

      <Block eyebrow="FAQ" title="Częste pytania">
        <Faq items={faqs} />
      </Block>

      <ContactSection />
    </>
  );
}
