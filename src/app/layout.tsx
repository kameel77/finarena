import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Finarena - Doradztwo Biznesowe i Transformacja Cyfrowa',
    template: '%s | Finarena',
  },
  description: 'Finarena dostarcza usługi doradcze w zakresie AI, automatyzacji procesów, rozwoju kompetencji liderskich i mapowania talentów Gallup Strengths.',
  keywords: ['doradztwo biznesowe', 'AI', 'automatyzacja', 'Gallup Strengths', 'rozwój liderów', 'transformacja cyfrowa'],
  authors: [{ name: 'Finarena' }],
  creator: 'Finarena',
  publisher: 'Finarena',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/',
    siteName: 'Finarena',
    title: 'Finarena - Doradztwo Biznesowe i Transformacja Cyfrowa',
    description: 'Przyspieszamy rozwój firm przez połączenie technologii AI, automatyzacji oraz rozwoju kompetencji i kultury organizacyjnej.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Finarena - Transformacja Biznesowa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finarena - Doradztwo Biznesowe i Transformacja Cyfrowa',
    description: 'Przyspieszamy rozwój firm przez połączenie technologii AI, automatyzacji oraz rozwoju kompetencji i kultury organizacyjnej.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
