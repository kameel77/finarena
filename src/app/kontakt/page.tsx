import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Kontakt | Finarena',
  description: 'Skontaktuj się z nami. Porozmawiajmy o transformacji, AI, automatyzacji procesów i rozwoju kompetencji Twojego zespołu.',
  openGraph: {
    title: 'Kontakt | Finarena',
    description: 'Skontaktuj się z nami. Porozmawiajmy o transformacji, AI, automatyzacji procesów i rozwoju kompetencji.',
  }
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Finarena',
            image: 'https://finarena.pl/images/og-image.jpg',
            '@id': 'https://finarena.pl',
            url: 'https://finarena.pl/kontakt',
            telephone: '+48502358645',
            email: 'kontakt@finarena.pl',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ul. Alternatywy 7 lok. 135',
              addressLocality: 'Warszawa',
              postalCode: '02-775',
              addressCountry: 'PL'
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00'
              }
            ]
          })
        }}
      />
      <ContactPageClient />
    </>
  );
}
