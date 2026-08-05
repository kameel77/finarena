import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Porozmawiajmy o produkcie, wdrożeniu AI, automatyzacji procesów albo o rozwoju liderów. Pierwsza rozmowa to 30 minut i konkretna rekomendacja.',
  alternates: { canonical: '/kontakt' },
  openGraph: { title: 'Kontakt | Finarena', description: 'Pierwsza rozmowa to 30 minut i konkretna rekomendacja.', url: '/kontakt' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Finarena',
  image: 'https://finarena.pl/og-image.jpg',
  '@id': 'https://finarena.pl',
  url: 'https://finarena.pl/kontakt',
  telephone: '+48502358645',
  email: 'kontakt@finarena.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Alternatywy 7 lok. 135',
    addressLocality: 'Warszawa',
    postalCode: '02-775',
    addressCountry: 'PL',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow="Kontakt"
        title={<>Pierwsza rozmowa to 30 minut i <em className="font-serif italic font-normal text-accent">konkretna rekomendacja</em>.</>}
        lead="Nie prezentacja o nas. Powiedz, gdzie utknęło — wrócimy z ramową propozycją zakresu i budżetu w ciągu trzech dni roboczych."
      />
      <ContactSection id="formularz" />
    </>
  );
}
