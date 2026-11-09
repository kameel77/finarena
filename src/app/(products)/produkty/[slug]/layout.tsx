import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/content/products';

export default function ProductSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const { theme } = product;

  const cssVariables = {
    '--brand-bg-dark': theme.bgDark,
    '--brand-bg-dark-elevated': theme.bgDarkElevated,
    '--brand-bg-dark-card': theme.bgDarkCard,
    '--brand-bg-light': theme.bgLight,
    '--brand-bg-light-subtle': theme.bgLightSubtle,
    '--brand-surface-light': theme.surfaceLight,
    '--brand-text-dark': theme.textOnDark,
    '--brand-text-muted-dark': theme.textMutedOnDark,
    '--brand-text-light': theme.textOnLight,
    '--brand-text-muted-light': theme.textMutedOnLight,
    '--brand-accent': theme.accent,
    '--brand-accent-light': theme.accentOnLight,
    '--brand-accent-hover': theme.accentHover,
    '--brand-accent-soft-dark': theme.accentSoftDark,
    '--brand-accent-soft-light': theme.accentSoftLight,
    '--brand-border-dark': theme.borderDark,
    '--brand-border-light': theme.borderLight,
    '--brand-green': theme.statusGreen,
    '--brand-green-bg': theme.statusGreenBg,
    '--brand-amber': theme.statusAmber,
    '--brand-amber-bg': theme.statusAmberBg,
    '--brand-red': theme.statusRed,
    '--brand-red-bg': theme.statusRedBg,
    '--brand-radius-card': theme.radiusCard,
    '--brand-radius-button': theme.radiusButton,
  } as React.CSSProperties;

  return (
    <div
      data-product-layout={product.slug}
      style={cssVariables}
      className="min-h-screen antialiased selection:bg-[#4F6BFF] selection:text-white"
    >
      {children}
    </div>
  );
}
