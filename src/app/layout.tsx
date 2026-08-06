import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

const sans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Iowan Old Style', 'Palatino', 'Georgia', 'Times New Roman', 'serif'],
});
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

const DESC =
  'Budujemy oprogramowanie produkcyjne, od POC po pełne wdrożenie, i rozwijamy liderów, którzy je poprowadzą. Automotive, legal, HR.';

export const metadata: Metadata = {
  title: {
    default: 'Finarena. Budujemy procesy i aplikacje, nie tylko doradzamy',
    template: '%s | Finarena',
  },
  description: DESC,
  keywords: [
    'software house', 'MVP', 'POC', 'wdrożenia AI', 'automatyzacja procesów',
    'executive mentoring', 'CliftonStrengths', 'Gallup', 'rozwój przywództwa',
    'oprogramowanie dla automotive', 'legal tech', 'HR tech',
  ],
  authors: [{ name: 'Finarena' }],
  creator: 'Finarena',
  publisher: 'Finarena',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl'),
  alternates: { canonical: '/' },
  icons: { icon: '/images/finarena.svg' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/',
    siteName: 'Finarena',
    title: 'Finarena. Budujemy procesy i aplikacje, nie tylko doradzamy',
    description: DESC,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Finarena' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finarena. Budujemy procesy i aplikacje, nie tylko doradzamy',
    description: DESC,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
