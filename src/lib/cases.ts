export type CaseDecision = { lead: string; why: string; rejected: string };
export type CaseShift = { from: string; to: string };

export type CaseVideo = {
  /** H.264 MP4 (all browsers). Served via /media/case/<slug>/<variant> for byte-range support (iOS). */
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
  /** slug links to /sektory/<slug>; omit for sectors without a page */
  sector: { slug?: string; label: string };
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
  /** Small note under the animation (default: real screens on test data). */
  videoNote?: string;
  /** Public product site, shown as a link chip. */
  productUrl?: string;
  /** Legal footnote shown at the end of the case (e.g. trademarks). */
  footnote?: string;
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
      desktop: '/media/case/motolia/desktop-mp4',
      mobile: '/media/case/motolia/mobile-mp4',
      desktopWebm: '/media/case/motolia/desktop-webm',
      mobileWebm: '/media/case/motolia/mobile-webm',
      posterDesktop: '/cases/motolia/poster-desktop.webp',
      posterMobile: '/cases/motolia/poster-mobile.webp',
      alt: 'Nagranie ekranu motolia.pl: klient wybiera tryb na firmę, otwiera ofertę Forda Focusa, zmienia okres finansowania w kalkulatorze, a rata przelicza się na żywo. Następnie wypełnia formularz zapytania z danymi testowymi. Na końcu schemat zgłoszenia, które trafia do konsultanta razem z wybranym autem i finansowaniem.',
    },
    ogImage: '/cases/motolia/og.jpg',
    metaTitle: 'Motolia: ścieżka klienta od oferty do rozmowy z doradcą',
    metaDesc:
      'Jak zaprojektowaliśmy portal finansowania aut jako jeden łańcuch: pozycjonowanie, kalkulator przy ofercie, zapytanie z kontekstem, SEO i skrypty rozmów z agentem AI.',
  },
  {
    slug: 'izzycheck',
    name: 'IzzyCheck',
    sector: { slug: 'automotive', label: 'Automotive' },
    ownProject: true,
    headline: 'Z ręcznego sprawdzania aut w ustandaryzowany raport, na którym można oprzeć decyzję kredytową',
    context:
      'Izzy Lease finansuje samochody. Zanim zapadnie decyzja, operator musi sprawdzić pojazd: wartość rynkową, wyposażenie i historię szkód. Dane pochodzą z zewnętrznych baz, a wynik trafia do klienta i do komitetu kredytowego.',
    realProblem:
      'Samo pobranie danych było najmniejszym problemem. Każda weryfikacja wyglądała trochę inaczej, zależała od operatora i nie zostawiała śladu. Dokument, na którym opiera się decyzja kredytowa, musi być powtarzalny, sprawdzalny i niezmienny.',
    decisions: [
      {
        lead: 'Raport z niezależnych modułów.',
        why: 'Wycena, kontrola historii szkód i szczegóły szkód działają jako osobne moduły z własnym statusem. Gdy jeden zawiedzie, reszta raportu jest gotowa, a moduł można ponowić osobno.',
        rejected: 'jedno zapytanie typu „wszystko albo nic”, w którym awaria integracji blokuje całą decyzję.',
      },
      {
        lead: 'Dokument, który się nie zmienia.',
        why: 'Zatwierdzony raport generujemy jako PDF po stronie serwera, nadajemy mu numer referencyjny i zamrażamy. Niepełny raport może zamrozić tylko administrator, z podaniem powodu.',
        rejected: 'drukowanie z przeglądarki, w którym wygląd i treść zależą od ustawień użytkownika.',
      },
      {
        lead: 'Fakty z bazy, bez interpretacji.',
        why: 'Strefy uszkodzeń pokazujemy tak, jak opisuje je baza: na sylwetce pojazdu i w wykazie. Nie zgadujemy konkretnych części i nie używamy ocen w rodzaju „bezwypadkowy”.',
        rejected: 'upiększanie raportu wnioskami, których dane nie potwierdzają.',
      },
      {
        lead: 'Ślad audytowy i role.',
        why: 'Każde wywołanie integracji, logowanie i pobranie PDF zostawia ślad. Operator widzi swoje raporty, administrator wszystkie. Surowe odpowiedzi dostawcy danych nie trafiają do przeglądarki.',
        rejected: 'wspólne konto i raporty wysyłane mailem bez historii.',
      },
      {
        lead: 'Jedno zapytanie, nawet przy podwójnym kliknięciu.',
        why: 'Powtórzone wysłanie formularza nie tworzy drugiego, płatnego zapytania do bazy danych.',
        rejected: 'liczenie na to, że użytkownik kliknie tylko raz.',
      },
    ],
    built: [
      'Formularz zapytania VIN z wyborem modułów raportu',
      'Integrację z bazą wycen i historii szkód po stronie serwera',
      'Wizualizację stref uszkodzeń na sylwetce pojazdu',
      'Generator niezmiennego raportu PDF z numerem referencyjnym',
      'Role operatora i administratora oraz dziennik audytu',
      'Tryb testowy na zanonimizowanych próbkach danych',
    ],
    shifts: [
      { from: 'Weryfikacja zależna od tego, kto ją robi', to: 'Jeden standard raportu dla każdego pojazdu' },
      { from: 'Dokument, który można zmienić po fakcie', to: 'Zamrożony PDF z numerem referencyjnym' },
      { from: 'Awaria integracji zatrzymuje decyzję', to: 'Moduł ponawiany osobno, reszta raportu dostępna' },
      { from: 'Brak śladu, kto i co sprawdził', to: 'Dziennik każdego wywołania i pobrania raportu' },
    ],
    fitsWhen:
      'Gdy decyzje w Twojej firmie opierają się na danych z zewnętrznych źródeł, a każdy pracownik sprawdza je trochę inaczej.',
    tags: ['Next.js', 'Integracje SOAP', 'PDF', 'Audyt', 'Fintech'],
    video: {
      desktop: '/media/case/izzycheck/desktop-mp4',
      mobile: '/media/case/izzycheck/mobile-mp4',
      desktopWebm: '/media/case/izzycheck/desktop-webm',
      mobileWebm: '/media/case/izzycheck/mobile-webm',
      posterDesktop: '/cases/izzycheck/poster-desktop.webp',
      posterMobile: '/cases/izzycheck/poster-mobile.webp',
      alt: 'Nagranie ekranu IzzyCheck na danych testowych: operator wpisuje numer VIN i wybiera moduły raportu, system pokazuje wycenę i specyfikację pojazdu, historię szkód ze strefami uszkodzeń na sylwetce auta oraz ślad audytowy wywołań. Na końcu strony zamrożonego raportu PDF.',
    },
    ogImage: '/cases/izzycheck/og.jpg',
    metaTitle: 'IzzyCheck: ustandaryzowany raport weryfikacji pojazdu z VIN',
    metaDesc:
      'Jak zbudowaliśmy narzędzie do weryfikacji pojazdów dla finansowania aut: moduły raportu, niezmienny PDF, strefy uszkodzeń i ślad audytowy.',
  },
  {
    slug: 'printflow',
    name: 'Printflow',
    sector: { label: 'Produkcja' },
    ownProject: false,
    headline: 'Z wycen w arkuszach w silnik, który zamienia wymiary w gotową ofertę dla klienta',
    context:
      'Drukarnia wielkoformatowa: fototapety, tablice magnetyczne i kredowe, banery. Każde zlecenie ma inne wymiary, a cena zależy od szerokości rolki, podziału na bryty, odpadu, procesów i marży. Wyceny powstawały w arkuszach.',
    realProblem:
      'Wiedza o tym, jak policzyć zlecenie, była w arkuszach i w głowach kilku osób. Każda wycena wymagała ręcznego doboru rolki, obrotu i podziału na panele, a koszt i cena żyły w różnych miejscach. Handlowiec nie widział, ile firma zarabia, gdy dawał rabat.',
    decisions: [
      {
        lead: 'Silnik zamiast tabeli cen.',
        why: 'Dla każdego zlecenia system sprawdza dostępne szerokości rolek w obu orientacjach, dzieli duże wydruki na bryty z zakładką i wybiera najtańszy wariant.',
        rejected: 'cennik za metr kwadratowy, który ignoruje odpad i ograniczenia maszyn.',
      },
      {
        lead: 'Koszt i cena osobno.',
        why: 'Koszt materiałów, procesów i pracy liczymy niezależnie od ceny dla klienta, więc handlowiec widzi marżę przy każdej zmianie. Rabat poniżej kosztu zmiennego daje ostrzeżenie, a nie blokadę.',
        rejected: 'jedna liczba, w której nie widać, ile firma naprawdę zarabia.',
      },
      {
        lead: 'Stare oferty się nie zmieniają.',
        why: 'Oferta zapamiętuje ceny z chwili wyceny. Zmiana cennika nie przepisuje historii.',
        rejected: 'przeliczanie archiwalnych ofert po nowych cenach.',
      },
      {
        lead: 'Jeden silnik dla każdego kanału.',
        why: 'Oferty z aplikacji, ze sklepu internetowego i z automatyzacji liczy ten sam silnik. Oferta z API powstaje jako szkic, który zatwierdza człowiek, a każda integracja ma własny klucz.',
        rejected: 'osobna ścieżka wyceny dla sklepu i wspólny sekret dla wszystkich integracji.',
      },
      {
        lead: 'Klient decyduje online.',
        why: 'Oferta trafia do klienta jako link z wariantami. Klient akceptuje albo odrzuca ją jednym kliknięciem, a zespół widzi wyświetlenia i decyzję.',
        rejected: 'PDF w załączniku i dopytywanie telefoniczne o decyzję.',
      },
    ],
    built: [
      'Kalkulator z kategoriami, opcjami produktu i podglądem kosztu oraz marży',
      'Silnik doboru rolki, podziału na bryty i kosztów procesów',
      'Oferty z wariantami, statusami i publicznym linkiem dla klienta',
      'Bazę klientów z historią ofert',
      'Panel rentowności i raport rabatów',
      'API dla sklepu internetowego i automatyzacji (n8n)',
    ],
    shifts: [
      { from: 'Wycena w arkuszu, inna u każdego', to: 'Wycena z produktu i wymiarów, liczona zawsze tak samo' },
      { from: 'Cena bez kontekstu kosztu', to: 'Marża widoczna przy każdej zmianie, tylko dla zespołu' },
      { from: 'Oferta w załączniku', to: 'Link z decyzją klienta i historią wyświetleń' },
      { from: 'Osobne zasady dla sklepu', to: 'Jeden silnik dla wszystkich kanałów sprzedaży' },
    ],
    fitsWhen:
      'Gdy każde zlecenie jest inne, a poprawna cena zależy od wiedzy, którą mają tylko najbardziej doświadczeni ludzie.',
    tags: ['FastAPI', 'Next.js', 'Silnik wycen', 'API', 'n8n'],
    video: {
      desktop: '/media/case/printflow/desktop-mp4',
      mobile: '/media/case/printflow/mobile-mp4',
      desktopWebm: '/media/case/printflow/desktop-webm',
      mobileWebm: '/media/case/printflow/mobile-webm',
      posterDesktop: '/cases/printflow/poster-desktop.webp',
      posterMobile: '/cases/printflow/poster-mobile.webp',
      alt: 'Nagranie ekranu systemu wycen na danych testowych: handlowiec wybiera fototapetę i wpisuje wymiary, system dzieli wydruk na bryty i pokazuje składniki wyceny, a koszt i marża są ukryte. Wycena staje się ofertą, klient akceptuje ją przez link, a zespół widzi decyzję w historii oferty.',
    },
    ogImage: '/cases/printflow/og.jpg',
    videoNote: 'Prawdziwe ekrany na fikcyjnym katalogu i danych testowych. Koszt i marża rozmyte.',
    metaTitle: 'Printflow: silnik wycen i oferty dla drukarni wielkoformatowej',
    metaDesc:
      'Jak zamieniliśmy wyceny w arkuszach w silnik, który dobiera rolkę, dzieli wydruk na bryty, pokazuje marżę i wysyła klientowi ofertę do akceptacji online.',
  },
  {
    slug: 'talentpilot',
    name: 'TalentPilot',
    sector: { slug: 'hr', label: 'HR & Talent' },
    ownProject: true,
    headline: 'Z raportów, do których nikt nie wraca, w żywą mapę talentów zespołu',
    context:
      'W Finarenie prowadzimy sesje CliftonStrengths® i mapujemy zespoły. Wyniki żyły w plikach PDF i arkuszach, a warsztat kończył się raportem, który po pewnym czasie nikt już nie otwierał.',
    realProblem:
      'Brakowało nie danych o talentach, tylko miejsca, w którym lider i zespół wracają do nich przy codziennych decyzjach: kto z kim pracuje, gdzie są luki i na kim wisi zbyt wiele.',
    decisions: [
      {
        lead: 'Najpierw dla siebie.',
        why: 'Narzędzie zbudowaliśmy na potrzeby własnej praktyki doradczej i sprawdzaliśmy je na naszych sesjach, zanim stało się osobnym produktem.',
        rejected: 'projektowanie funkcji pod wyobrażonego klienta.',
      },
      {
        lead: 'Pełny ranking, nie tylko Top 5.',
        why: 'Każda osoba ma wszystkie 34 talenty z miejscem w rankingu. Profil pokazuje Top 5, Top 15 albo całość, w podziale na cztery domeny.',
        rejected: 'model oparty tylko na pięciu najsilniejszych talentach, który ukrywa luki.',
      },
      {
        lead: 'Zespół jako całość.',
        why: 'Matryca pokazuje cały zespół na jednym ekranie, a analiza wskazuje luki, pojedyncze punkty zależności i pary komplementarne.',
        rejected: 'zbiór indywidualnych raportów, które trzeba porównywać ręcznie.',
      },
      {
        lead: 'Dane wrażliwe chronione domyślnie.',
        why: 'Link do prezentacji zespołu nie jest indeksowany, może ukryć nazwiska, a analiza ryzyk jest w nim domyślnie wyłączona. W aplikacji ryzyka widzą tylko lider, coach i administrator.',
        rejected: 'otwarte udostępnianie pełnych profili całej organizacji.',
      },
      {
        lead: 'Wartość w historii, nie w eksporcie.',
        why: 'Pierwszeństwo dostały funkcje, które zostają z zespołem między sesjami, a nie kolejny eksport do PDF, który łatwo skopiować.',
        rejected: 'jeszcze jeden generator raportów.',
      },
    ],
    built: [
      'Profile 34 talentów z podziałem na domeny',
      'Matrycę talentów i ranking całego zespołu',
      'Analizę domen, luk, krytycznych zależności i par komplementarnych',
      'Prezentację zespołu przez link, z opcją ukrycia nazwisk',
      'Import wyników z raportów PDF i profile osób bez kont',
      'Asystenta AI odpowiadającego na pytania o zespół',
    ],
    shifts: [
      { from: 'Raport PDF na jeden warsztat', to: 'Narzędzie, do którego zespół wraca między sesjami' },
      { from: 'Wyniki porównywane ręcznie', to: 'Matryca całego zespołu na jednym ekranie' },
      { from: 'Intuicja przy obsadzie ról', to: 'Luki i zależności widoczne, zanim zaczną boleć' },
      { from: 'Wyniki w skrzynce coacha', to: 'Prezentacja dla zespołu jednym linkiem' },
    ],
    fitsWhen:
      'Gdy inwestujesz w rozwój ludzi, ale wnioski z warsztatów nie przekładają się na codzienne decyzje lidera.',
    tags: ['CliftonStrengths®', 'FastAPI', 'Next.js', 'AI', 'HR tech'],
    video: {
      desktop: '/media/case/talentpilot/desktop-mp4',
      mobile: '/media/case/talentpilot/mobile-mp4',
      desktopWebm: '/media/case/talentpilot/desktop-webm',
      mobileWebm: '/media/case/talentpilot/mobile-webm',
      posterDesktop: '/cases/talentpilot/poster-desktop.webp',
      posterMobile: '/cases/talentpilot/poster-mobile.webp',
      alt: 'Nagranie ekranu TalentPilot na fikcyjnym zespole: matryca talentów całego zespołu, profil osoby z przełączaniem Top 5, Top 15 i wszystkich 34 talentów, rozkład domen, luki i krytyczne zależności, pary komplementarne oraz link do prezentacji zespołu z opcją ukrycia nazwisk.',
    },
    ogImage: '/cases/talentpilot/og.jpg',
    videoNote: 'Prawdziwe ekrany na fikcyjnym zespole i danych testowych.',
    productUrl: 'https://talentpilot.io',
    footnote: 'CliftonStrengths® jest znakiem towarowym Gallup, Inc. TalentPilot nie jest powiązany z Gallup ani przez niego rekomendowany.',
    metaTitle: 'TalentPilot: matryca talentów zespołu zamiast raportów PDF',
    metaDesc:
      'Jak z narzędzia dla własnej praktyki doradczej powstał produkt do mapowania talentów: profile 34 talentów, matryca zespołu, luki, zależności i prezentacja wyników.',
  },
  {
    slug: 'voicebot',
    name: 'Voicebot Motolii',
    sector: { slug: 'automotive', label: 'Automotive' },
    ownProject: true,
    headline: 'Z oddzwaniania „kiedy ktoś będzie wolny” w rozmowę, która od razu staje się zgłoszeniem',
    context:
      'Motolia obsługuje zapytania o finansowanie aut przez telefon. Klienci dzwonią także wtedy, gdy konsultanci rozmawiają z innymi albo są poza biurem.',
    realProblem:
      'Nieodebrany telefon to klient, który dzwoni do konkurencji. A rozmowa odebrana w pośpiechu kończy się notatką, którą ktoś musi przepisać do systemu, zanim doradca oddzwoni.',
    decisions: [
      {
        lead: 'Bot zbiera kontekst, decyzję zostawia ludziom.',
        why: 'Voicebot na ElevenLabs pyta o auto, imię i preferowany czas kontaktu, a na prośbę klienta przełącza rozmowę do konsultanta.',
        rejected: 'bot, który próbuje sam sprzedać produkt finansowy.',
      },
      {
        lead: 'Zgłoszenie tam, gdzie pracuje zespół.',
        why: 'Rozmowa kończy się wywołaniem narzędzia, które tworzy zgłoszenie w Thulium z danymi klienta i linkiem do transkrypcji.',
        rejected: 'osobny panel dla bota, do którego nikt nie zagląda.',
      },
      {
        lead: 'Prywatność w projekcie, nie w regulaminie.',
        why: 'W logu rozmów numer telefonu zapisujemy wyłącznie jako skrót z solą. Logi aplikacji maskują dane, a transkrypcja jest linkowana, nie kopiowana.',
        rejected: 'pełne numery w arkuszu dostępnym dla połowy firmy.',
      },
      {
        lead: 'Bez duplikatów.',
        why: 'Ponowny telefon z tego samego numeru dopisuje komentarz do istniejącego zgłoszenia zamiast tworzyć nowe.',
        rejected: 'osobne zgłoszenie z każdej rozmowy i ręczne scalanie.',
      },
      {
        lead: 'Odporność na awarie.',
        why: 'Gdy system zgłoszeń jest chwilowo niedostępny, zgłoszenie czeka w kolejce i jest ponawiane, a klient słyszy zwykłe potwierdzenie. Webhooki są podpisywane.',
        rejected: 'rozmowa zakończona błędem i utracony kontakt.',
      },
    ],
    built: [
      'Agenta głosowego ElevenLabs z bazą wiedzy',
      'Backend webhooków z narzędziami: zgłoszenie oddzwonienia i przełączenie do konsultanta',
      'Integrację z Thulium: zgłoszenia i komentarze',
      'Log rozmów z haszowaniem numerów telefonów',
      'Kolejkę ponowień na wypadek niedostępności integracji',
      'Testy automatyczne ścieżek krytycznych',
    ],
    shifts: [
      { from: 'Nieodebrany telefon', to: 'Rozmowa i zgłoszenie od razu' },
      { from: 'Notatka do przepisania', to: 'Zgłoszenie z danymi klienta i transkrypcją' },
      { from: 'Kilka zgłoszeń od jednego klienta', to: 'Jedno zgłoszenie z historią kontaktu' },
      { from: 'Numery telefonów w arkuszach', to: 'Log, w którym numer jest tylko skrótem' },
    ],
    fitsWhen:
      'Gdy Twój zespół traci zapytania, bo telefon dzwoni częściej, niż ludzie są w stanie odebrać.',
    tags: ['ElevenLabs', 'Voicebot', 'Thulium', 'Webhooki', 'RODO'],
    video: {
      desktop: '/media/case/voicebot/desktop-mp4',
      mobile: '/media/case/voicebot/mobile-mp4',
      desktopWebm: '/media/case/voicebot/desktop-webm',
      mobileWebm: '/media/case/voicebot/mobile-webm',
      posterDesktop: '/cases/voicebot/poster-desktop.webp',
      posterMobile: '/cases/voicebot/poster-mobile.webp',
      alt: 'Animacja-rekonstrukcja na danych testowych: rozmowa klienta z voicebotem na ekranie telefonu, wywołanie narzędzia tworzącego zgłoszenie, zgłoszenie w formacie integracji, wpis w logu z numerem zapisanym jako skrót oraz komentarz dopisany przy ponownym telefonie.',
    },
    ogImage: '/cases/voicebot/og.jpg',
    videoNote: 'Rekonstrukcja na danych testowych, zgodna z formatem integracji. Karta zgłoszenia jest widokiem poglądowym, a nie interfejsem Thulium.',
    metaTitle: 'Voicebot Motolii: rozmowa, która od razu staje się zgłoszeniem',
    metaDesc:
      'Jak połączyliśmy voicebota ElevenLabs z Thulium: zbieranie kontekstu rozmowy, zgłoszenia bez duplikatów, haszowanie numerów i odporność na awarie integracji.',
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
