export type Sector = {
  slug: string;
  label: string;
  hint: string;
  title: string;
  intro: string;
  problem: string;
  approach: string[];
  cases: { name: string; note?: string; desc: string; tags: string[] }[];
  metaTitle: string;
  metaDesc: string;
};

export const sectors: Sector[] = [
  {
    slug: 'automotive',
    label: 'Automotive',
    hint: 'Motolia · CarSalon',
    title: 'Oprogramowanie dla motoryzacji',
    intro:
      'Cyfryzacja sprzedaży i obsługi w motoryzacji, od danych o pojazdach po ścieżkę klienta w salonie. Branża z ogromną ilością danych i procesów wciąż opartych o arkusze.',
    problem:
      'Dane o pojazdach, ofertach i klientach żyją w kilku niepołączonych systemach i arkuszach. Handlowiec traci czas na przepisywanie, a zarząd nie ma wiarygodnego obrazu lejka.',
    approach: [
      'Mapujemy realny przebieg oferty i wydania pojazdu, a nie procedurę z dokumentu',
      'Automatyzujemy wprowadzanie i wzbogacanie danych o pojazdach',
      'Integrujemy istniejący stack zamiast wymieniać go w całości',
      'Wdrażamy zmianę razem z zespołem handlowym, nie obok niego',
    ],
    cases: [
      { name: 'Motolia', desc: 'Platforma dla rynku motoryzacyjnego. Automatyzuje obsługę ofert i dane pojazdów.', tags: ['Next.js', 'AI extraction', 'Integracje'] },
      { name: 'CarSalon', desc: 'Cyfrowy proces sprzedaży w salonie: lead → wycena → finansowanie → wydanie.', tags: ['Web app', 'CRM', 'Automatyzacja'] },
    ],
    metaTitle: 'Oprogramowanie dla automotive: MVP, integracje, AI',
    metaDesc:
      'Budujemy systemy dla motoryzacji: obsługa ofert, dane pojazdów, cyfrowy proces sprzedaży w salonie. Od POC w 3 tygodnie po pełne wdrożenie.',
  },
  {
    slug: 'legal',
    label: 'Legal',
    hint: 'Votenti · iDOXXY',
    title: 'Legal tech: dokument, termin, zgodność',
    intro:
      'Sektor, w którym wartość tworzy dokument, termin i zgodność. Skracamy pracę powtarzalną i zostawiamy prawnikowi to, co wymaga osądu.',
    problem:
      'Praca powtarzalna, czyli czytanie, klasyfikowanie i porównywanie dokumentów, zjada godziny najdroższych ludzi w organizacji. Ryzyko rośnie razem z liczbą spraw.',
    approach: [
      'Zaczynamy od jednego typu dokumentu i mierzalnego kryterium jakości',
      'Model językowy pracuje na Waszych danych, z pełną audytowalnością wyniku',
      'Człowiek zostaje w pętli decyzyjnej tam, gdzie stawka jest wysoka',
      'Bezpieczeństwo i retencja danych ustalane przed pierwszą linijką kodu',
    ],
    cases: [
      { name: 'Votenti', desc: 'Cyfrowe głosowania i procesy decyzyjne z naciskiem na bezpieczeństwo i audytowalność.', tags: ['Security', 'Workflow', 'e-Voting'] },
      { name: 'iDOXXY', desc: 'Ekstrakcja, klasyfikacja i wyszukiwanie semantyczne w dokumentach.', tags: ['LLM', 'RAG', 'OCR'] },
    ],
    metaTitle: 'Legal tech: automatyzacja dokumentów i procesów decyzyjnych',
    metaDesc:
      'Ekstrakcja i klasyfikacja dokumentów, wyszukiwanie semantyczne, cyfrowe procesy decyzyjne. Wdrożenia AI dla kancelarii i działów prawnych.',
  },
  {
    slug: 'hr',
    label: 'HR & Talent',
    hint: 'Mapy kompetencji · CliftonStrengths',
    title: 'HR i talenty: dane zamiast intuicji',
    intro:
      'Tu spotykają się oba nasze tory: technologia mierzy i porządkuje, a doświadczenie w CliftonStrengths i rozwoju liderów nadaje danym sens.',
    problem:
      'Wiedza o mocnych stronach zespołu kończy się w raporcie, którego nikt nie otwiera drugi raz. Decyzje o obsadzie ról zapadają na wyczucie.',
    approach: [
      'Diagnoza indywidualna, potem obraz całego zespołu: luki i nadreprezentacje',
      'Przełożenie talentów na role, odpowiedzialności i decyzje operacyjne',
      'Warsztat wdrożeniowy, żeby zespół pracował na wspólnym języku',
      'Follow-up 6–12 tygodni, bo bez niego nawyki wracają do starych',
    ],
    cases: [
      { name: 'Mapy kompetencji i matryce talentów', desc: 'Doradczo: sesje 1:1, mapowanie zespołów, decyzje o obsadzie ról oparte o dane.', tags: ['CliftonStrengths', 'Analytics'] },
      { name: 'TalentPilot', note: 'produkt własny', desc: 'Osobny SaaS, który zbudowaliśmy dla siebie i wypuściliśmy na rynek. Prowadzi własną markę.', tags: ['SaaS', 'talentpilot.io'] },
    ],
    metaTitle: 'HR tech i mapy kompetencji: CliftonStrengths w praktyce',
    metaDesc:
      'Mapy kompetencji zespołów oparte o CliftonStrengths (Gallup), matryce talentów i narzędzia, które utrwalają wnioski z sesji rozwojowych.',
  },
];

export const otherSector = {
  title: 'Twoja branża',
  intro:
    'To, co powtarzalne, to nie branża, tylko sposób wejścia w nią. Discovery z Twoimi ludźmi, POC na Twoich danych, decyzja o skali dopiero wtedy, gdy wiadomo, że działa. Tak powstały wszystkie nasze wertykały i tak wejdziemy w kolejny.',
  cases: [
    { name: 'Projekty dedykowane', desc: 'Pełne wdrożenia programistyczne w dowolnym obszarze, od przejęcia zastanego systemu po budowę od zera.', tags: ['Custom dev', 'Team as a service'] },
    { name: 'Wspólny venture', desc: 'Budujemy produkt razem z partnerem, który zna branżę od środka. Dzielimy ryzyko i efekt.', tags: ['Venture build', 'Partnerstwo'] },
  ],
};

export const stages = [
  { no: '01 · Discovery', title: 'Ramowanie problemu', desc: 'Warsztat z decydentami. Hipoteza biznesowa i kryterium sukcesu przed pierwszą linijką kodu.', time: '3–5 dni · fixed price' },
  { no: '02 · POC', title: 'Dowód wykonalności', desc: 'Najtańszy artefakt odpowiadający „czy to zadziała”. Wąski zakres, prawdziwe dane.', time: '2–3 tygodnie' },
  { no: '03 · MVP', title: 'Produkt dla pierwszych użytkowników', desc: 'Wersja do oddania klientom i mierzenia adopcji. Architektura już produkcyjna.', time: '6–10 tygodni' },
  { no: '04 · Scale', title: 'Pełne wdrożenie', desc: 'Integracje, uprawnienia, wydajność, bezpieczeństwo, zgodność. Przejęcie ruchu produkcyjnego.', time: 'kwartały · zespół dedykowany' },
  { no: '05 · Run', title: 'Utrzymanie i rozwój', desc: 'SLA, monitoring, roadmapa albo transfer systemu i zespołu do Ciebie. Bez uzależnienia.', time: 'retainer lub transfer' },
];

export const stats = [
  { value: 30, suffix: '+', label: 'wdrożonych MVP i automatyzacji' },
  { value: 420, suffix: '+', label: 'sesji CliftonStrengths 1:1' },
  { value: 20, suffix: '+', label: 'map kompetencji i matryc talentów' },
  { value: 5, suffix: '', label: 'strategii i audytów kultury organizacji' },
];

export const clientLogos = [
  'bfagencja-logo.jpeg', 'bhz-logo.png', 'idoxxy-logo.webp', 'kgz-logo-long.svg',
  'luxmed-logo.jpg', 'motolia-logo.png', 'satto-logo.svg', 'sharp-logo.svg',
  'toyota-b.png', 'votenti-logo.svg',
];

export type Person = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  linkedin: string;
  /** /public/images/people/<plik>.jpg, 1600x2000 px, kadr 4:5 */
  photo?: string;
};

export const people: Person[] = [
  {
    name: 'Kamil Tonkowicz',
    role: 'Founder',
    focus: 'Technologia, produkt, delivery',
    bio: 'Zaczynał w fintechu, gdzie błąd w decyzji kredytowej kosztuje realne pieniądze. Nauczył się tam patrzeć na wdrożenie przez wynik, a nie przez listę zrobionych funkcji. W Finarenie prowadzi tor Build: architekturę, wdrożenia AI i projekty od pierwszego POC do działającej produkcji. Współtworzy produkty w automotive, legal i HR.',
    linkedin: 'https://www.linkedin.com/in/kamiltonkowicz/',
    photo: '/images/people/kamil-tonkowicz.jpg',
  },
  {
    name: 'Joanna Tonkowicz',
    role: 'Partner',
    focus: 'Ludzie, kultura organizacyjna, executive mentoring',
    bio: 'Pracuje z ludźmi, którzy podejmują decyzje, i z zespołami, które je wykonują. Ma certyfikację CliftonStrengths (Gallup), ponad 400 przeprowadzonych sesji indywidualnych i mapy kompetencji zbudowane dla kilkudziesięciu zespołów. W Finarenie odpowiada za tor Leadership: rozwój liderów, kulturę organizacji i mentoring dla właścicieli firm oraz kadry zarządzającej.',
    linkedin: 'https://www.linkedin.com/in/joannatonkowicz/',
    photo: '/images/people/joanna-tonkowicz.jpg',
  },
];
