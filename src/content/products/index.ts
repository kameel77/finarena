import { grouposProduct } from './groupos';
import { sampleSubcontractorProduct } from './sample-product';
import type { ProductConfig } from './types';

export const PRODUCTS_BY_SLUG: Record<string, ProductConfig> = {
  [grouposProduct.slug]: grouposProduct,
  [sampleSubcontractorProduct.slug]: sampleSubcontractorProduct,
};

export function getProductBySlug(slug: string): ProductConfig | null {
  return PRODUCTS_BY_SLUG[slug] ?? null;
}

export function getAllProducts(options?: { includeNoindex?: boolean }): ProductConfig[] {
  const all = Object.values(PRODUCTS_BY_SLUG);
  if (options?.includeNoindex) return all;
  return all.filter((p) => !p.noindex);
}

export * from './types';
export { grouposProduct, DEMO_BOOKING_URL } from './groupos';
