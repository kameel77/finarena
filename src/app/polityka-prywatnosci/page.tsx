import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka prywatności i RODO',
  description:
    'Informacje o przetwarzaniu danych osobowych (RODO) przez Finarena Sp. z o.o. dla serwisu finarena.pl oraz stron produktów (w tym GroupOS).',
  alternates: { canonical: '/polityka-prywatnosci' },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="wrap max-w-3xl space-y-6 text-ink">
        <div className="kicker text-accent">Finarena Sp. z o.o. · RODO</div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Polityka prywatności i ochrona danych osobowych
        </h1>
        <p className="text-ink-soft text-base leading-relaxed">
          Administratorem danych osobowych przekazywanych za pośrednictwem formularzy kontaktowych i
          produktowych w domenie <strong>finarena.pl</strong> (w tym na podstronach produktów takich
          jak <strong>GroupOS</strong>) jest <strong>Finarena Sp. z o.o.</strong> z siedzibą w
          Warszawie (ul. Alternatywy 7/135, 02-775 Warszawa).
        </p>

        <div className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">1. Cel i podstawa przetwarzania danych</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Dane podane w formularzu (imię, służbowy adres e-mail, numer telefonu, nazwa firmy lub
            grupy oraz parametry zapytania) przetwarzamy wyłącznie w celu udzielenia odpowiedzi na
            przesłane zapytanie, przeprowadzenia prezentacji produktu lub rekrutacji do programu
            pilotażowego (art. 6 ust. 1 lit. a oraz lit. b/f RODO).
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">2. Lokalizacja danych (EOG)</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Dane przetwarzane w ramach usług i produktów Finarena Sp. z o.o. są utrzymywane na
            serwerach zlokalizowanych na terenie Europejskiego Obszaru Gospodarczego (Unii
            Europejskiej). Przy wdrożeniach produkcyjnych systemu GroupOS zawieramy z klientem umowę
            powierzenia przetwarzania danych osobowych zgodnie z art. 28 RODO.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">3. Prawa osób, których dane dotyczą</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Każdej osobie przysługuje prawo dostępu do swoich danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania, przenoszenia danych oraz wycofania zgody w dowolnym
            momencie. W sprawach dotyczących ochrony danych osobowych skontaktuj się z nami pod
            adresem:{' '}
            <a href="mailto:kontakt@finarena.pl" className="text-accent underline">
              kontakt@finarena.pl
            </a>
            .
          </p>
        </div>

        <div className="pt-4">
          <Link href="/produkty/groupos" className="btn-primary">
            Powrót do strony GroupOS
          </Link>
        </div>
      </div>
    </section>
  );
}
