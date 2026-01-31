import { Organization, Service, Article, WebSite, LocalBusiness } from 'schema-dts';
import getConfig from 'next/config';

// Get runtime config (works with Coolify ENV variables)
const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} };

const siteUrl = publicRuntimeConfig.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl';
const siteName = publicRuntimeConfig.siteName || process.env.NEXT_PUBLIC_SITE_NAME || 'Finarena';

export function generateOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Doradztwo biznesowe w zakresie AI, automatyzacji procesów i rozwoju organizacyjnego',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Przykładowa 123',
      addressLocality: 'Warszawa',
      postalCode: '00-001',
      addressCountry: 'PL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48-123-456-789',
      contactType: 'customer service',
      availableLanguage: ['Polish', 'English'],
    },
    sameAs: [
      'https://linkedin.com/company/finarena',
      'https://twitter.com/finarena',
    ],
  };
}

export function generateLocalBusinessSchema(): LocalBusiness {
  return {
    '@type': 'ProfessionalService',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Doradztwo biznesowe w zakresie AI, automatyzacji i rozwoju organizacyjnego',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Przykładowa 123',
      addressLocality: 'Warszawa',
      postalCode: '00-001',
      addressCountry: 'PL',
    },
    telephone: '+48-123-456-789',
    email: 'kontakt@finarena.pl',
    priceRange: '$$$',
    openingHours: 'Mo-Fr 09:00-17:00',
  };
}

export function generateWebSiteSchema(): WebSite {
  return {
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  image?: string
): Service {
  return {
    '@type': 'Service',
    name,
    description,
    url: `${siteUrl}${url}`,
    image: image || `${siteUrl}/og-image.jpg`,
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  image: string,
  publishedAt: string,
  modifiedAt?: string,
  author?: string
): Article {
  return {
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}${url}`,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author || siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}
