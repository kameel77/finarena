'use client';

export type H1Variant = 'a' | 'b';

export type ProductAnalyticsEventName =
  | 'cta_demo_click'
  | 'cta_beta_click'
  | 'cta_security_click'
  | 'form_start'
  | 'form_submit'
  | 'security_view'
  | 'industries_view';

export interface ProductAnalyticsPayload {
  event: ProductAnalyticsEventName;
  productSlug: string;
  h1Variant: H1Variant;
  timestamp: string;
  meta?: Record<string, string | number | boolean | undefined>;
}

const COOKIE_NAME = 'groupos_h1_v';

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 30): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function resolveH1Variant(searchParamV?: string | null): H1Variant {
  const normalized = searchParamV?.toLowerCase().trim();
  if (normalized === 'a' || normalized === 'b') {
    writeCookie(COOKIE_NAME, normalized);
    return normalized;
  }

  const fromCookie = readCookie(COOKIE_NAME);
  if (fromCookie === 'a' || fromCookie === 'b') {
    return fromCookie;
  }

  const assigned: H1Variant = typeof window !== 'undefined' && Math.random() < 0.5 ? 'b' : 'a';
  writeCookie(COOKIE_NAME, assigned);
  return assigned;
}

export function getUtmAndReferrer(): {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
} {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      referrer: '',
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    referrer: document.referrer || '',
  };
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    __productAnalyticsEvents?: ProductAnalyticsPayload[];
  }
}

export function trackProductEvent(
  event: ProductAnalyticsEventName,
  productSlug: string,
  h1Variant: H1Variant,
  meta?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === 'undefined') return;

  const payload: ProductAnalyticsPayload = {
    event,
    productSlug,
    h1Variant,
    timestamp: new Date().toISOString(),
    meta,
  };

  if (!Array.isArray(window.__productAnalyticsEvents)) {
    window.__productAnalyticsEvents = [];
  }
  window.__productAnalyticsEvents.push(payload);

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event,
      product_slug: productSlug,
      h1_variant: h1Variant,
      ...meta,
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, {
      product_slug: productSlug,
      h1_variant: h1Variant,
      ...meta,
    });
  }

  if (typeof window.plausible === 'function') {
    window.plausible(event, {
      props: {
        product_slug: productSlug,
        h1_variant: h1Variant,
        ...meta,
      },
    });
  }

  window.dispatchEvent(new CustomEvent('groupos:analytics', { detail: payload }));
}
