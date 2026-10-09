export type CaseDecision = { lead: string; why: string; rejected: string };
export type CaseShift = { from: string; to: string };

export type CaseVideo = {
  /** H.264 MP4 (all browsers) */
  desktop: string;
  mobile: string;
  /** VP9 WebM fallback */
  desktopWebm?: string;
  mobileWebm?: string;
  posterDesktop: string;
  posterMobile: string;
  /** Text alternative for the animation (screen readers, no-JS). */
  alt: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  sector: { slug: string; label: string };
  ownProject: boolean;
  headline: string;
  context: string;
  realProblem: string;
  decisions: CaseDecision[];
  built: string[];
  shifts: CaseShift[];
  fitsWhen: string;
  tags: string[];
  video?: CaseVideo;
  ogImage?: string;
  metaTitle: string;
  metaDesc: string;
};

export const cases: CaseStudy[] = [
  {
    slug: 'motolia',
    name: 'Motolia',
    sector: { slug: 'automotive', label: 'Automotive' },
    ownProject: true,
    headline: 'Z katalogu ofert w system, który prowadzi klienta od wyboru auta do rozmowy z doradcą',
    context:
      'Motolia to portal finansowania samochodów: leasing, kredyt i wynajem długoterminowy. Rynek jest pełen porównywarek, które wyglądają podobnie i konkurują tym samym, czyli listą ofert. Kolejna lista ofert nie miała szans się wyróżnić.',
    realProblem:
      'Problemem nie był brak funkcji, tylko brak spójnego łańcucha. Marka, wyszukiwarka, oferta, formularz i rozmowa z konsultantem żyły osobno. Każde ogniwo działało, ale klient gubił się na styku dwóch z nich.',
    decisions: [
      {
        lead: 'Pozycjonowanie przed funkcjami.',
        why: 'Zamiast kolejnej porównywarki: ekspert po stronie klienta. Hasło „Motolia. Po Twojej stronie.” wyznacza produkt, a nie tylko reklamę: doradztwo, rozmowę i prowadzenie przez decyzję.',
        rejected: 'model „jak najwięcej ofert”, w którym wygrywa ten, kto ma największy budżet.',
      },
      {
        lead: 'Decyzja finansowa przy samej ofercie.',
        why: 'Klient od razu wybiera tryb, prywatnie albo na firmę, i widzi ratę, która przelicza się przy każdej zmianie okresu i wpłaty. Wybór przechodzi dalej do zapytania, więc nikt nie pyta go o to drugi raz.',
        rejected: 'osobny kalkulator i formularz, który zaczyna rozmowę od zera.',
      },
      {
        lead: 'Diagnoza zamiast „więcej treści”.',
        why: 'Audyt pokazał, że wyszukiwarka kojarzyła portal głównie z marką i wynajmem, a leasing i kredyt były dla niej praktycznie niewidoczne. Dlatego przebudowujemy fundament: strony filarowe dla każdego produktu, klastry tematyczne, renderowanie po stronie serwera i dane strukturalne.',
        rejected: 'pisanie kolejnych artykułów na fundamencie, którego wyszukiwarka nie rozumie.',
      },
      {
        lead: 'Fale zamiast wielkiej przebudowy.',
        why: 'Zmiany wchodzą etapami, każdy z własnym kryterium sukcesu i możliwością korekty kursu.',
        rejected: 'jednorazowy relaunch, który łączy największe ryzyko z najpóźniejszą informacją zwrotną.',
      },
      {
        lead: 'Wiedza konsultantów jako system, nie folklor.',
        why: 'Skrypty rozmów zbudowaliśmy jako bazę wiedzy dla agenta AI: drzewa decyzyjne, typowe obiekcje, profile klientów. Konsultant mówi spójnym językiem marki, a skrypt poprawia się jak kod.',
        rejected: 'wiedzę w głowach kilku najlepszych osób, której nie da się przekazać nowemu konsultantowi.',
      },
    ],
    built: [
      'Portal w Next.js z automatycznym importem i wzbogacaniem danych o ofertach i pojazdach (ekstrakcja AI)',
      'Kalkulator finansowania przy każdej ofercie, z trybem prywatnie / na firmę i ratą liczoną na żywo',
      'Formularz zapytania, który przenosi wybrane auto i parametry finansowania do zespołu sprzedaży',
      'Architekturę SEO opartą na tematach: strony filarowe, klastry, SSR, dane strukturalne',
      'Integrację zapytań z systemem obsługi zgłoszeń (Thulium)',
      'Bibliotekę skryptów rozmów zarządzaną przez agenta AI',
    ],
    shifts: [
      {
        from: 'Osobne działania marketingu, IT i call center',
        to: 'Jeden zaprojektowany łańcuch: wybór auta, kalkulacja, zapytanie, rozmowa',
      },
      {
        from: 'Kalkulator i formularz, które o sobie nie wiedzą',
        to: 'Zapytanie, które niesie auto i wybrane finansowanie do konsultanta',
      },
      {
        from: 'Widoczność oparta na nazwie marki',
        to: 'Architektura, która pozwala rosnąć na frazach produktowych, tam gdzie klient dopiero szuka',
      },
      {
        from: 'Wiedza w głowach najlepszych konsultantów',
        to: 'Skrypty, którymi można wdrożyć nową osobę i które można testować',
      },
    ],
    fitsWhen:
      'Gdy masz dobry produkt i działające kanały, ale klient odpada gdzieś między reklamą, stroną i rozmową, a nikt nie widzi całej ścieżki naraz.',
    tags: ['Next.js', 'AI extraction', 'SEO techniczne', 'Thulium', 'Agenci AI', 'Strategia marki'],
    video: {
      desktop: '/cases/motolia/desktop.mp4',
      mobile: '/cases/motolia/mobile.mp4',
      desktopWebm: '/cases/motolia/desktop.webm',
      mobileWebm: '/cases/motolia/mobile.webm',
      posterDesktop: '/cases/motolia/poster-desktop.webp',
      posterMobile: '/cases/motolia/poster-mobile.webp',
      alt: 'Nagranie ekranu motolia.pl: klient wybiera tryb na firmę, otwiera ofertę Forda Focusa, zmienia okres finansowania w kalkulatorze, a rata przelicza się na żywo. Następnie wypełnia formularz zapytania z danymi testowymi. Na końcu schemat zgłoszenia, które trafia do konsultanta razem z wybranym autem i finansowaniem.',
    },
    ogImage: '/cases/motolia/og.jpg',
    metaTitle: 'Motolia: ścieżka klienta od oferty do rozmowy z doradcą',
    metaDesc:
      'Jak zaprojektowaliśmy portal finansowania aut jako jeden łańcuch: pozycjonowanie, kalkulator przy ofercie, zapytanie z kontekstem, SEO i skrypty rozmów z agentem AI.',
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
