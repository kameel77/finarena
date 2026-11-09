import { grouposProduct } from './groupos';
import type { ProductConfig } from './types';

/**
 * Przykładowy drugi produkt (`noindex: true`) potwierdzający, że szablon
 * `/produkty/[slug]` obsługuje kolejne produkty wyłącznie przez dodanie pliku
 * konfiguracji z własną paletą CSS variables (`--brand-*`).
 */
export const sampleSubcontractorProduct: ProductConfig = {
  ...grouposProduct,
  slug: 'field-ops-preview',
  name: 'FieldOps (Preview)',
  shortDescription:
    'Przykładowa konfiguracja drugiego produktu (noindex) — od umowy wykonawczej i zdjęć z budowy do protokołu odbioru.',
  noindex: true,
  theme: {
    ...grouposProduct.theme,
    bgDark: '#0C1412',
    bgDarkElevated: '#12201C',
    bgDarkCard: '#172A24',
    accent: '#10B981',
    accentOnLight: '#047857',
    accentHover: '#059669',
    accentSoftDark: 'rgba(16, 185, 129, 0.16)',
    accentSoftLight: 'rgba(4, 120, 87, 0.10)',
  },
  seo: {
    title: 'FieldOps (Preview) — Szablon produktu Finarena',
    description:
      'Przykładowa strona produktu (noindex) weryfikująca wieloproduktową architekturę szablonu /produkty/[slug].',
    canonicalPath: '/produkty/field-ops-preview',
    ogTitle: 'FieldOps — Szablon produktu Finarena',
    ogSubtitle: 'Weryfikacja szablonu wieloproduktowego z niezależnym motywem CSS.',
  },
};
