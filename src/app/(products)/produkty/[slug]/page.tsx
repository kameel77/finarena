import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/content/products';
import { ProductLandingClient } from '@/components/products/ProductLandingClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl';

export function generateStaticParams() {
  return getAllProducts({ includeNoindex: true }).map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Produkt nie znaleziony | Finarena',
    };
  }

  const canonicalUrl = `${SITE_URL}${product.seo.canonicalPath}`;
  const ogImageUrl = `${SITE_URL}/produkty/${product.slug}/og`;

  return {
    title: {
      absolute: product.seo.title,
    },
    description: product.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: canonicalUrl,
      siteName: 'Finarena',
      title: product.seo.title,
      description: product.seo.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo.title,
      description: product.seo.description,
      images: [ogImageUrl],
    },
    robots: product.noindex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
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
  };
}

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { v?: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}${product.seo.canonicalPath}`;

  // Schema.org SoftwareApplication — bez fikcyjnych ocen (aggregateRating) i recenzji (review)
  const softwareApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: product.category,
    operatingSystem: 'Web, Cloud (EU), Dedicated VPS (Docker / Linux)',
    inLanguage: 'pl-PL',
    url: canonicalUrl,
    description: product.seo.description,
    publisher: {
      '@type': 'Organization',
      name: 'Finarena Sp. z o.o.',
      url: SITE_URL,
    },
    featureList:
      product.featureList ??
      product.traceability?.map((t) => t.feature) ??
      product.howItWorks.steps.map((s) => s.title),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const variantParam = typeof searchParams?.v === 'string' ? searchParams.v : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProductLandingClient product={product} initialVariantParam={variantParam} />
    </>
  );
}
