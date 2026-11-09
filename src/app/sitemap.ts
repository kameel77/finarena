import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/content/products';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    '',
    '/build',
    '/leadership',
    '/leadership/mapy-kompetencji',
    '/sektory/automotive',
    '/sektory/legal',
    '/sektory/hr',
    '/realizacje',
    '/ludzie',
    '/kontakt',
    '/polityka-prywatnosci',
    '/produkty',
  ];

  const productPaths = getAllProducts({ includeNoindex: false }).map(
    (p) => `/produkty/${p.slug}`
  );

  return [...staticPaths, ...productPaths].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith('/produkty') ? 'weekly' : 'monthly',
    priority: route === '' || route === '/produkty/groupos' ? 1.0 : 0.8,
  }));
}
