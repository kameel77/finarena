import type { ProductConfig } from './types';

/**
 * Placeholder link do kalendarza rezerwacji rozmowy (Cal.com / Calendly).
 * Docelowy adres zostanie podmieniony przez właściciela produktu (Kamila).
 */
export const DEMO_BOOKING_URL =
  process.env.NEXT_PUBLIC_GROUPOS_DEMO_BOOKING_URL ||
  'https://cal.com/finarena/groupos-demo';

export const grouposProduct: ProductConfig = {
  slug: 'groupos',
  name: 'GroupOS',
  shortDescription:
    'CRM i praca projektowa w jednym systemie, zbudowane dla grup wielu spółek, marek i partnerstw. Każda spółka ma osobne dane i uprawnienia, a zarząd widzi całość.',
  category: 'BusinessApplication',
  noindex: false,
  demoBookingUrl: DEMO_BOOKING_URL,
  contactRecipientEmail: 'hello@finarena.pl',
  theme: {
    bgDark: '#0B0F17',
    bgDarkElevated: '#121826',
    bgDarkCard: '#171F30',
    bgLight: '#F6F4EF',
    bgLightSubtle: '#ECE9E1',
    surfaceLight: '#FFFFFF',
    textOnDark: '#F8FAFC',
    textMutedOnDark: '#94A3B8',
    textOnLight: '#0F172A',
    textMutedOnLight: '#475569',
    accent: '#4F6BFF',
    accentOnLight: '#2E4AE6',
    accentHover: '#2844D8',
    accentSoftDark: 'rgba(79, 107, 255, 0.16)',
    accentSoftLight: 'rgba(46, 74, 230, 0.10)',
    borderDark: 'rgba(148, 163, 184, 0.16)',
    borderLight: 'rgba(15, 23, 42, 0.11)',
    statusGreen: '#15803D',
    statusGreenBg: '#DCFCE7',
    statusAmber: '#B45309',
    statusAmberBg: '#FEF3C7',
    statusRed: '#B91C1C',
    statusRedBg: '#FEE2E2',
    fontSans: 'var(--font-sans), system-ui, -apple-system, sans-serif',
    fontMono: 'var(--font-mono), ui-monospace, SFMono-Regular, monospace',
    radiusCard: '14px',
    radiusButton: '10px',
  },
  seo: {
    title: 'GroupOS — CRM, projekty i umowy dla grup spółek | Finarena',
    description:
      'CRM i praca projektowa w jednym systemie dla grup wielu spółek, marek i partnerstw. Osobne dane i uprawnienia każdej spółki, wspólny widok dla zarządu. Chmura w UE lub dedykowany serwer VPS.',
    canonicalPath: '/produkty/groupos',
    ogTitle: 'Cała grupa firm. Jeden system. Każda spółka z osobnymi danymi.',
    ogSubtitle:
      'Relacje z klientami, projekty, zadania, dokumenty i umowy wszystkich spółek w jednym miejscu. W chmurze w UE albo na Twoim własnym serwerze.',
  },
  navAnchors: [
    { id: 'problem', label: 'Problem' },
    { id: 'jak-dziala', label: 'Jak to działa' },
    { id: 'pulpit', label: 'Pulpit zarządu' },
    { id: 'dla-kogo', label: 'Dla kogo' },
    { id: 'bezpieczenstwo', label: 'Bezpieczeństwo i VPS' },
    { id: 'wdrozenie', label: 'Wdrożenie' },
    { id: 'faq', label: 'FAQ' },
  ],
  hero: {
    eyebrow: 'CRM i praca projektowa dla grup firm',
    h1Variants: {
      a: 'Cała grupa firm. Jeden system. Każda spółka z osobnymi danymi.',
      b: 'Zarządzaj grupą spółek jak jedną organizacją, bez mieszania ich danych.',
    },
    lead: 'Relacje z klientami, projekty, zadania, dokumenty i umowy wszystkich spółek, marek i partnerstw w jednym miejscu. Zarząd widzi całość, a zespoły tylko to, co do nich należy. W chmurze w UE albo na Twoim własnym serwerze.',
    primaryCta: {
      label: 'Umów demo',
      href: '#formularz',
    },
    secondaryCta: {
      label: 'Zobacz, jak chronimy dane',
      href: '#bezpieczenstwo',
    },
    microcopy:
      'Dane w UE · wdrożenie dedykowane na Twoim serwerze · MFA i pełny dziennik audytu',
  },
  references: {
    heading: 'Pierwsze wdrożenie dedykowane:',
    items: [
      {
        name: 'East Gate Group',
        label: 'East Gate Group',
        role: 'Wdrożenie dedykowane (logo — placeholder do podmiany po dostarczeniu assetu)',
        logoSvg: 'east-gate-placeholder',
      },
    ],
  },
  problem: {
    eyebrow: 'Diagnoza operacyjna',
    h2: 'Kilka spółek, kilka marek, a każda pracuje w innym narzędziu.',
    intro:
      'Gdy właściciel lub zarząd prowadzi kilka podmiotów jednocześnie, praca na osobnych arkuszach lub jednym wspólnym koncie CRM szybko rodzi chaos i ryzyko dostępu.',
    cards: [
      {
        id: 'scattered-tools',
        symptomTag: 'Rozproszony obraz',
        title: 'CRM w jednej spółce, Excel w drugiej, WhatsApp w trzeciej. Zarząd nie widzi całości.',
        description:
          'Każda spółka raportuje w innym formacie. Zanim dane o szansach sprzedaży, zaległych zadaniach i wygasających umowach trafią na spotkanie zarządu, trzeba je ręcznie sklejać.',
      },
      {
        id: 'mixed-data',
        symptomTag: 'Brak izolacji',
        title: 'Jedno wspólne narzędzie miesza dane spółek i daje wszystkim dostęp do wszystkiego.',
        description:
          'W typowym systemie wrzucenie kilku spółek do jednego konta oznacza, że zespół jednego podmiotu widzi klientów, umowy i projekty pozostałych spółek.',
      },
      {
        id: 'per-entity-saas-cost',
        symptomTag: 'Brak kontroli nad danymi',
        title: 'Popularne narzędzia SaaS liczą każdą spółkę osobno i trzymają dane poza Twoją kontrolą.',
        description:
          'Osobne abonamenty dla każdego podmiotu mnożą koszty, nadal nie dają wspólnego widoku grupy i nie pozwalają uruchomić systemu na własnym, odizolowanym serwerze.',
      },
    ],
  },
  howItWorks: {
    eyebrow: 'Jak to działa',
    h2: 'Cztery obszary w jednym modelu danych grupy.',
    intro:
      'GroupOS łączy strukturę podmiotów, CRM, pracę projektową oraz repozytorium dokumentów, umów i ryzyk.',
    steps: [
      {
        id: 'struktura',
        stepNumber: '01',
        label: 'Grupa jako struktura',
        title: 'Spółki, marki i partnerstwa w jednej strukturze. Każda z własnymi danymi, zespołem i uprawnieniami.',
        bullets: [
          'Podmioty (spółki, JDG) i jednostki operacyjne (marki, partnerstwa) z hierarchią i widokiem grupy.',
          'Zespoły, zaproszenia i onboarding w jednym kroku oraz własny branding organizacji (logo i kolory).',
          'Silnik uprawnień (organizacja → podmiot → projekt → rekord) i role systemowe: prezes widzi całą grupę, kierownik spółki widzi wyłącznie przypisane podmioty.',
        ],
        mockupId: 'M1-M5',
        linearRefs: ['KAM-132', 'KAM-133', 'KAM-134', 'KAM-135', 'KAM-136', 'KAM-117', 'KAM-131'],
      },
      {
        id: 'crm',
        stepNumber: '02',
        label: 'Relacje i sprzedaż',
        title: 'Firmy, osoby i szanse w lejkach każdej spółki. System pilnuje następnego kroku i pokazuje relacje, które stygną.',
        bullets: [
          'Firmy i osoby jako osobne obiekty — jedna osoba może pełnić role w wielu firmach powiązanych z różnymi spółkami grupy.',
          'Szanse sprzedaży w lejkach per podmiot, oś aktywności i szybkie logowanie rozmowy telefonicznej lub spotkania.',
          'Wymagany następny krok z datą oraz widok „Wymaga uwagi” wskazujący szanse bez zaplanowanego działania i relacje bez kontaktu.',
        ],
        mockupId: 'M2',
        linearRefs: ['KAM-155', 'KAM-156', 'KAM-157', 'KAM-158'],
      },
      {
        id: 'praca',
        stepNumber: '03',
        label: 'Praca i projekty',
        title: 'Projekty, etapy, zadania i checklisty powiązane z klientem lub szansą. Kanban, lista, kalendarz i „Moja praca”.',
        bullets: [
          'Hierarchia: projekty → etapy → zadania → podzadania → checklisty, z konfigurowalnymi statusami, priorytetami, tagami i szacunkiem czasu.',
          'Wielu wykonawców i obserwatorzy, zadania cykliczne, operacje masowe, archiwizacja projektów oraz komentarze z @wzmiankami.',
          'Widoki: Kanban z przeciąganiem, lista/tabela, kalendarz, „Moja praca”, zapisane widoki, eksport widoku oraz powiadomienia e-mail i push (PWA).',
        ],
        mockupId: 'M3',
        linearRefs: [
          'KAM-137',
          'KAM-138',
          'KAM-139',
          'KAM-140',
          'KAM-141',
          'KAM-142',
          'KAM-145',
          'KAM-146',
          'KAM-148',
          'KAM-150',
          'KAM-153',
        ],
      },
      {
        id: 'dokumenty',
        stepNumber: '04',
        label: 'Dokumenty, umowy, ryzyka',
        title: 'Foldery spółek i projektów, poufne pliki z audytem pobrań, rejestr umów z alertami terminów i rejestr ryzyk.',
        bullets: [
          'Repozytorium dokumentów z drzewem folderów (podmiot, projekt, rekord CRM) oraz weryfikacją integralności plików sumą kontrolną SHA-256.',
          'Uprawnienia do dokumentów i klasyfikacja „Poufne” — każde pobranie poufnego pliku jest rejestrowane w dzienniku audytu.',
          'Rejestr umów z alertami nadchodzących terminów wygasania oraz rejestr ryzyk i obserwacji przypisanych do właścicieli.',
        ],
        mockupId: 'M4',
        linearRefs: ['KAM-159', 'KAM-160', 'KAM-161', 'KAM-162', 'KAM-121'],
      },
    ],
  },
  executiveDashboard: {
    eyebrow: 'Pulpit zarządu',
    h2: 'Zarząd widzi całą grupę. Bez raportów sklejanych w Excelu.',
    description:
      'Szanse, projekty, zaległości, ryzyka i terminy umów wszystkich spółek na jednym pulpicie. Zespoły widzą tylko swoje dane.',
    highlights: [
      {
        label: 'Zagregowany widok grupy i porównanie spółek',
        detail:
          'Jednym przełącznikiem przechodzisz między zagregowanymi wskaźnikami całej grupy a widokiem pojedynczej spółki lub marki.',
        linearRef: 'KAM-133 / KAM-163',
      },
      {
        label: 'Alerty umów, ryzyk i zaległości',
        detail:
          'Wygasające umowy, otwarte ryzyka, zadania po terminie i szanse wymagające uwagi w jednym uporządkowanym miejscu.',
        linearRef: 'KAM-154 / KAM-161 / KAM-162',
      },
      {
        label: 'Wyszukiwanie globalne (Cmd+K) i eksport widoku',
        detail:
          'Błyskawiczne wyszukiwanie po całej grupie z poszanowaniem uprawnień użytkownika oraz zapisane widoki z opcją eksportu widoku.',
        linearRef: 'KAM-124 / KAM-147 / KAM-149',
      },
    ],
  },
  forWhom: {
    eyebrow: 'Dla kogo (branże i struktury)',
    h2: 'Dla grup, które prowadzą kilka biznesów naraz',
    orgTypesTitle: 'Typy organizacji',
    orgTypes: [
      'Holdingi i grupy kapitałowe',
      'Firmy wielomarkowe',
      'Partnerstwa i joint venture',
      'Family office i portfele inwestycyjne',
      'Firmy z JDG i spółkami wokół jednego właściciela',
    ],
    industriesTitle: 'Branże',
    industries: [
      {
        id: 'energia-oze',
        title: 'Energia i OZE',
        pain: 'Wiele spółek projektowych i wykonawczych, kontrakty długoterminowe, rygorystyczne terminy umowne i dokumentacja techniczna.',
        solution:
          'Osobne uprawnienia dla każdej spółki celowej, rejestr umów z alertami terminów i kontrola ryzyk projektowych.',
        iconName: 'Wrench',
      },
      {
        id: 'nieruchomosci-deweloperka',
        title: 'Nieruchomości i deweloperka',
        pain: 'Osobne spółki celowe dla inwestycji, dziesiątki umów z wykonawcami i konieczność nadzoru właścicielskiego nad harmonogramami.',
        solution:
          'Struktura grupy z podziałem na podmioty, foldery dokumentów z audytem pobrań i wspólny pulpit zarządu.',
        iconName: 'Building2',
      },
      {
        id: 'motoryzacja',
        title: 'Motoryzacja (dealerzy, leasing, wynajem)',
        pain: 'Równoległe spółki handlowe, flotowe i usługowe obsługujące tych samych klientów biznesowych.',
        solution:
          'Firmy i osoby jako osobne obiekty (jedna osoba w wielu firmach), lejki szans per spółka i pilnowanie kolejnego kroku.',
        iconName: 'Car',
      },
      {
        id: 'eventy-sport',
        title: 'Eventy i sport',
        pain: 'Wiele marek projektowych, równoległe wydarzenia, dziesiątki partnerów i napięte terminy realizacji.',
        solution:
          'Projekty z etapami i checklistami, kalendarz z przeciąganiem, zadania cykliczne i powiadomienia push na telefonie.',
        iconName: 'CalendarRange',
      },
      {
        id: 'handel-marki',
        title: 'Handel i marki konsumenckie',
        pain: 'Kilka marek i kanałów sprzedaży pod jednym właścicielem, rozproszone ustalenia i brak wspólnego obrazu pracy zespołów.',
        solution:
          'Jednostki operacyjne (marki) w jednej strukturze grupy, widok „Moja praca” i zapisane widoki dla managerów.',
        iconName: 'Cpu',
      },
      {
        id: 'uslugi-profesjonalne',
        title: 'Usługi profesjonalne i doradztwo',
        pain: 'Wrażliwe dokumenty klientów i wymóg ścisłego odseparowania zespołów doradczych oraz projektowych.',
        solution:
          'Silnik uprawnień per spółka, projekt i rekord, klasyfikacja plików „Poufne” z rejestrem pobrań oraz wdrożenie na dedykowanym VPS.',
        iconName: 'Briefcase',
      },
      {
        id: 'inwestycje-pe',
        title: 'Inwestycje i private equity',
        pain: 'Nadzór nad portfelem spółek operacyjnych bez spójnego widoku ryzyk, kluczowych umów i postępu inicjatyw.',
        solution:
          'Pulpit zarządu agregujący aktywne szanse, projekty, zaległości, ryzyka i umowy wygasające w 30 dni.',
        iconName: 'ShieldCheck',
      },
    ],
    profileNote:
      'Profil: od 2 podmiotów i kilkunastu użytkowników wzwyż; najwięcej zyskują grupy, w których jedna osoba lub jeden zarząd odpowiada za kilka spółek.',
    betaCard: {
      badge: 'Wkrótce: wersja branżowa',
      title:
        'Podwykonawcy w budownictwie i instalacjach: umowa → zadania dla ekipy → zdjęcia z budowy → protokół odbioru → faktura. Szukamy 10 firm do bety.',
      subtitle: 'Szukamy 10 firm do bety',
      description:
        'Przygotowujemy wyspecjalizowany wariant dla firm wykonawczych B2B (elektryka, HVAC, instalacje sanitarne, automatyka i BMS, fit-out), łączący pracę brygady na budowie z odbiorami etapów i aneksami.',
      painPoints: [
        'Zadania dla ekipy powiązane z konkretnym etapem umowy wykonawczej.',
        'Zdjęcia z budowy i checklista wykonania przed zgłoszeniem etapu do odbioru.',
        'Uporządkowana ścieżka od protokołu odbioru do fakturowania etapów i pilnowania kaucji.',
      ],
      ctaLabel: 'Zapisz się do bety',
      ctaHref: '#formularz',
    },
    notForNote: {
      title: 'Uczciwie „nie dla”',
      description:
        'GroupOS nie jest programem księgowym, nie wystawia faktur i nie zastępuje biura rachunkowego.',
    },
  },
  security: {
    eyebrow: 'Bezpieczeństwo danych, RODO, dedykowany VPS',
    h2: 'Twoje dane zostają w UE. Na dedykowanym serwerze także fizycznie oddzielone od innych firm.',
    intro:
      'Wybierz model chmurowy w Unii Europejskiej albo dedykowaną instalację na osobnym serwerze VPS — także na własnej infrastrukturze Twojej organizacji.',
    comparisonCards: [
      {
        id: 'cloud',
        badge: 'Model 01 · Chmura (SaaS)',
        title: 'Chmura (SaaS)',
        subtitle:
          'Gotowe środowisko utrzymywane w Unii Europejskiej dla grup, które chcą wystartować szybko bez administracji serwerem.',
        points: [
          'Serwery w UE (EOG)',
          'Dane organizacji oddzielone w aplikacji i w bazie',
          'Szyfrowane połączenia',
          'Codzienny backup z testem odtworzenia',
        ],
      },
      {
        id: 'vps',
        badge: 'Model 02 · Dedykowana instalacja (VPS)',
        title: 'Dedykowana instalacja (VPS)',
        subtitle:
          'Fizycznie odseparowana instalacja wyłącznie dla Twojej grupy spółek — w wybranej lokalizacji w UE lub na Twojej infrastrukturze.',
        points: [
          'Osobny serwer i osobna baza tylko dla Twojej grupy',
          'Wybór lokalizacji serwera w UE',
          'Możliwa instalacja na infrastrukturze klienta',
          'Aktualizacje w uzgodnionych oknach serwisowych z możliwością wycofania',
          'Kopie zapasowe w uzgodnionej lokalizacji',
        ],
        highlighted: true,
      },
    ],
    whyVpsTitle: 'Dlaczego dedykowany VPS jest bezpieczniejszy',
    whyVpsBullets: [
      'Brak współdzielonej bazy: incydent u innej firmy nie dotyka Twoich danych.',
      'Jasna lokalizacja danych: wiesz, w którym kraju UE stoi serwer, i możesz to wpisać do rejestru czynności przetwarzania.',
      'Ty decydujesz, kto ma dostęp administracyjny. Każdy dostęp i każda zmiana trafia do dziennika audytu.',
      'Łatwiej spełnić wymagania banków, inwestorów i audytorów: lokalizacja danych, retencja, kopie, odtworzenie.',
      'Mniejsze ryzyko uzależnienia od dostawcy: system działa na Twoim serwerze.',
    ],
    featuresTitle: 'Zabezpieczenia w każdym modelu',
    features: [
      {
        id: 'mfa-totp',
        title: 'MFA dla wszystkich użytkowników',
        description:
          'Uwierzytelnianie dwuskładnikowe (TOTP) dostępne dla każdego konta wraz z bezpieczną polityką haseł, limitami prób logowania i zarządzaniem aktywnymi sesjami.',
        iconName: 'KeyRound',
        linearRef: 'KAM-126 / KAM-127 / KAM-128',
      },
      {
        id: 'granular-permissions',
        title: 'Uprawnienia per spółka, projekt i rekord',
        description:
          'Silnik uprawnień weryfikujący dostęp na poziomie organizacji, podmiotu, projektu i pojedynczego rekordu oraz role systemowe.',
        iconName: 'Shield',
        linearRef: 'KAM-112 / KAM-117 / KAM-131',
      },
      {
        id: 'confidential-files',
        title: 'Pliki poufne z rejestrem pobrań',
        description:
          'Możliwość oznaczenia dokumentów klauzulą „Poufne” z kontrolą uprawnień i automatycznym zapisem każdego pobrania pliku.',
        iconName: 'Lock',
        linearRef: 'KAM-159 / KAM-160',
      },
      {
        id: 'audit-log',
        title: 'Pełny dziennik audytu ze zmianami',
        description:
          'Historia operacji pokazująca kto, kiedy i jaką zmianę wprowadził w rekordach, uprawnieniach oraz dokumentach.',
        iconName: 'History',
        linearRef: 'KAM-129',
      },
      {
        id: 'trash-restore',
        title: 'Kosz i przywracanie',
        description:
          'Ochrona przed przypadkowym usunięciem danych — usunięte rekordy trafiają do kosza z możliwością kontrolowanego przywrócenia.',
        iconName: 'FileSpreadsheet',
        linearRef: 'KAM-130',
      },
      {
        id: 'sha256-checksum',
        title: 'Pliki z sumą kontrolną SHA-256',
        description:
          'Każdy wgrany plik otrzymuje kryptograficzną sumę kontrolną SHA-256 potwierdzającą jego integralność.',
        iconName: 'HardDrive',
        linearRef: 'KAM-121',
      },
      {
        id: 'daily-backup-restore',
        title: 'Codzienny backup z automatycznym testem odtworzenia',
        description:
          'Regularne kopie zapasowe bazy danych i plików weryfikowane automatycznym testem odtworzenia środowiska.',
        iconName: 'DatabaseBackup',
        linearRef: 'KAM-120',
      },
    ],
    rodoBlock: {
      title: 'RODO i UE',
      bullets: [
        'Dane przetwarzane i przechowywane w UE (EOG).',
        'Umowa powierzenia przetwarzania (art. 28 RODO).',
        'Brak transferu danych poza EOG.',
        'Dostawca: Finarena Sp. z o.o., firma z Polski.',
      ],
    },
  },
  cooperationModels: {
    eyebrow: 'Modele współpracy',
    h2: 'Trzy modele uruchomienia — ten sam kod i pełna funkcjonalność.',
    intro:
      'Wybierz wariant odpowiadający strukturze Twojej grupy oraz wymaganiom dotyczącym lokalizacji danych.',
    cards: [
      {
        id: 'cloud',
        name: 'Chmura',
        badge: 'SaaS w UE',
        forWhom: 'Grupy, które chcą zacząć szybko',
        highlights: [
          'Konfiguracja grupy i uprawnień',
          'Aktualizacje w cenie utrzymania',
          'Codzienny backup z testem odtworzenia',
        ],
        ctaLabel: 'Umów demo',
        hostingPreferenceValue: 'Chmura',
      },
      {
        id: 'dedicated-vps',
        name: 'Dedykowany VPS',
        badge: 'Fizyczna izolacja',
        forWhom: 'Grupy z wymaganiami dotyczącymi danych',
        highlights: [
          'Osobny serwer i osobna baza w UE',
          'Wybór lokalizacji serwera w UE',
          'Aktualizacje w uzgodnionych oknach serwisowych',
        ],
        ctaLabel: 'Porozmawiajmy',
        hostingPreferenceValue: 'Dedykowany VPS',
        featured: true,
      },
      {
        id: 'on-premise',
        name: 'Na Twoim serwerze',
        badge: 'Infrastruktura klienta',
        forWhom: 'Organizacje z własną infrastrukturą lub IT',
        highlights: [
          'Pakiet instalacyjny na serwer klienta',
          'Kontrolowane aktualizacje z możliwością wycofania',
          'Wsparcie wdrożeniowe i techniczne',
        ],
        ctaLabel: 'Porozmawiajmy',
        hostingPreferenceValue: 'Własny serwer',
      },
    ],
    pricingNote:
      'Cena zależy od liczby spółek, użytkowników edytujących i modelu hostingu.',
  },
  onboarding: {
    eyebrow: 'Proces uruchomienia',
    h2: 'Wdrożenie w 4 krokach',
    intro:
      'Przechodzimy od rozmowy o strukturze Twojej grupy do gotowego środowiska pracy dla zarządu i zespołów.',
    steps: [
      {
        step: 'Krok 01',
        title: 'Rozmowa i mapa grupy (30 min)',
        description:
          'Poznajemy strukturę spółek, marek i partnerstw oraz ustalamy, kto powinien widzieć całość, a kto tylko wybrany podmiot.',
      },
      {
        step: 'Krok 02',
        title: 'Konfiguracja spółek, ról i uprawnień',
        description:
          'Odwzorowujemy podmioty, zespoły, lejki sprzedaży, etapy projektów i reguły dostępu.',
      },
      {
        step: 'Krok 03',
        title: 'Instalacja w chmurze albo na dedykowanym serwerze',
        description:
          'Uruchamiamy instancję w chmurze w UE lub instalujemy dedykowane środowisko na osobnym serwerze VPS / infrastrukturze klienta.',
      },
      {
        step: 'Krok 04',
        title: 'Szkolenie zespołu i start',
        description:
          'Przeprowadzamy praktyczne wdrożenie dla zarządu i zespołów poszczególnych spółek oraz uruchamiamy codzienną pracę.',
      },
    ],
  },
  formSection: {
    eyebrow: 'Formularz kontaktowy',
    h2: 'Porozmawiajmy o Twojej grupie',
    intro:
      'Wybierz „Demo GroupOS”, aby umówić prezentację systemu dla grupy spółek, albo „Beta dla podwykonawców”, aby zgłosić firmę wykonawczą do testów wersji branżowej.',
    tabs: {
      demo: {
        label: 'Demo GroupOS',
        badge: 'Dla grup spółek, marek i partnerstw',
        submitLabel: 'Umów demo GroupOS',
      },
      beta: {
        label: 'Beta dla podwykonawców',
        badge: 'Budownictwo i instalacje (szukamy 10 firm)',
        submitLabel: 'Zapisz się do bety',
      },
    },
    rodoConsentText:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Finarena Sp. z o.o. w celu kontaktu i odpowiedzi na zgłoszenie zgodnie z',
    thankYou: {
      title: 'Dziękujemy za zgłoszenie.',
      message:
        'Twoja wiadomość trafiła do zespołu Finarena. Odezwiemy się, aby omówić strukturę Twojej grupy — możesz też od razu wybrać termin rozmowy w kalendarzu:',
      bookingCtaLabel: 'Wybierz termin rozmowy',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    h2: 'Najczęściej zadawane pytania',
    items: [
      {
        question: 'Czym GroupOS różni się od monday, ClickUp czy HubSpot?',
        answer:
          'Modeluje grupę spółek natywnie: osobne dane i uprawnienia dla każdej spółki, wspólny widok dla zarządu, CRM i projekty w jednym modelu danych. Może działać na Twoim serwerze.',
      },
      {
        question: 'Czy to program księgowy?',
        answer:
          'Nie. Nie wystawiamy faktur i nie prowadzimy księgowości.',
      },
      {
        question: 'Gdzie są przechowywane dane?',
        answer:
          'W UE. W modelu dedykowanym na osobnym serwerze w wybranej lokalizacji albo na Twojej infrastrukturze.',
      },
      {
        question: 'Czy można go używać na telefonie?',
        answer:
          'Tak, w przeglądarce telefonu, z powiadomieniami push.',
      },
      {
        question: 'Czy jest wersja angielska?',
        answer:
          'Interfejs działa po polsku i angielsku, obsługuje strefy czasowe i waluty.',
      },
      {
        question: 'Jak długo trwa wdrożenie?',
        answer:
          'To zależy od liczby spółek i migracji danych. Konkretny plan dostajesz po pierwszej rozmowie.',
      },
    ],
  },
  finalCta: {
    h2: 'Zobacz swoją grupę w jednym systemie.',
    subtitle:
      'Porozmawiajmy o strukturze Twoich spółek, uprawnieniach zespołów i wyborze między chmurą w UE a dedykowanym serwerem.',
    ctaLabel: 'Umów demo',
    ctaHref: '#formularz',
  },
  traceability: [
    {
      feature:
        'Podmioty (spółki/JDG) i jednostki operacyjne (marki, partnerstwa), hierarchia i widok grupy, zespoły, zaproszenia i onboarding, branding organizacji',
      linearIssues: ['KAM-132', 'KAM-133', 'KAM-134', 'KAM-135', 'KAM-136'],
      status: 'Done',
      sectionRef: '7.1 Hero (M1), 7.4 Krok 1 (M1, M5), 7.6 Dla kogo',
    },
    {
      feature:
        'CRM: firmy i osoby jako osobne obiekty (osoba w wielu firmach), szanse w lejkach per podmiot, oś aktywności z szybkim logowaniem rozmowy, wymagany następny krok, widok „Wymaga uwagi” i relacje bez kontaktu',
      linearIssues: ['KAM-155', 'KAM-156', 'KAM-157', 'KAM-158'],
      status: 'Done',
      sectionRef: '7.4 Krok 2 (M2)',
    },
    {
      feature:
        'Praca: projekty → etapy → zadania → podzadania → checklisty, konfigurowalne statusy, wielu wykonawców i obserwatorzy, daty, szacunek, priorytety, tagi, zadania cykliczne, operacje masowe, archiwizacja, powiązanie z firmą/osobą/szansą',
      linearIssues: [
        'KAM-137',
        'KAM-138',
        'KAM-139',
        'KAM-140',
        'KAM-141',
        'KAM-142',
        'KAM-143',
        'KAM-144',
      ],
      status: 'Done',
      sectionRef: '7.4 Krok 3 (M3)',
    },
    {
      feature:
        'Widoki: lista/tabela, Kanban z przeciąganiem, kalendarz, „Moja praca”, zapisane widoki, eksport widoku, pulpit zarządu',
      linearIssues: [
        'KAM-145',
        'KAM-146',
        'KAM-147',
        'KAM-148',
        'KAM-149',
        'KAM-163',
      ],
      status: 'Done',
      sectionRef: '7.1 Hero (M1), 7.4 Krok 3 (M3), 7.5 Pulpit zarządu (M1)',
    },
    {
      feature:
        'Współpraca: komentarze z @wzmiankami, oś „Historia i aktywność”, centrum powiadomień, e-mail i push (PWA) z preferencjami, przypomnienia i raport zaległości',
      linearIssues: ['KAM-150', 'KAM-151', 'KAM-152', 'KAM-153', 'KAM-154'],
      status: 'Done',
      sectionRef: '7.4 Krok 3 (M3), 7.5 Pulpit zarządu, 7.11 FAQ',
    },
    {
      feature:
        'Dokumenty i umowy: repozytorium z folderami (podmiot, projekt, rekord CRM), uprawnienia i klasyfikacja „poufne”, rejestr umów z alertami terminów, rejestr ryzyk i obserwacji',
      linearIssues: ['KAM-159', 'KAM-160', 'KAM-161', 'KAM-162'],
      status: 'Done',
      sectionRef: '7.4 Krok 4 (M4), 7.5 Pulpit zarządu, 7.7 Bezpieczeństwo',
    },
    {
      feature:
        'Bezpieczeństwo: MFA (TOTP) dla wszystkich, bezpieczne hasła i limity prób logowania, zarządzanie sesjami, silnik uprawnień (organizacja → podmiot → projekt → rekord), role systemowe, pełny dziennik audytu ze zmianami, kosz i przywracanie, pliki z sumą kontrolną SHA-256, codzienny backup z automatycznym testem odtworzenia',
      linearIssues: [
        'KAM-112',
        'KAM-117',
        'KAM-120',
        'KAM-121',
        'KAM-126',
        'KAM-127',
        'KAM-128',
        'KAM-129',
        'KAM-130',
        'KAM-131',
      ],
      status: 'Done',
      sectionRef: '7.1 Hero, 7.4 Krok 1 (M5), 7.7 Bezpieczeństwo (M6)',
    },
    {
      feature:
        'Platforma: jeden kod w trybie SaaS i w trybie dedykowanym, wyszukiwanie globalne z uprawnieniami (Cmd+K), PL/EN, strefy czasowe i waluty, API v1',
      linearIssues: ['KAM-113', 'KAM-116', 'KAM-123', 'KAM-124'],
      status: 'Done',
      sectionRef: '7.5 Pulpit zarządu, 7.7 Bezpieczeństwo, 7.8 Modele współpracy, 7.11 FAQ',
    },
    {
      feature:
        'W trakcie (In Review, opisane bez podawania dat): PWA na iPhonie i tablecie oraz pakiet instalacji dedykowanej',
      linearIssues: ['KAM-164', 'KAM-122'],
      status: 'In Review',
      sectionRef: '7.4 Krok 3 (M3), 7.7 Bezpieczeństwo, 7.8 Modele współpracy, 7.11 FAQ',
    },
  ],
};
