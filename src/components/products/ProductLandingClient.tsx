'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  CalendarRange,
  Car,
  Check,
  ChevronDown,
  Cpu,
  DatabaseBackup,
  FileSpreadsheet,
  HardDrive,
  History,
  KeyRound,
  Layers,
  Lock,
  Menu,
  Shield,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import type { ProductConfig, ProductIndustryCard, ProductSecurityFeature } from '@/content/products/types';
import {
  resolveH1Variant,
  trackProductEvent,
  type H1Variant,
} from '@/lib/product-analytics';
import { MockupM1ExecutiveScope } from './ProductMockups';
import { ProductLeadForm } from './ProductLeadForm';

const MockupM2CrmPipeline = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM2CrmPipeline)
);
const MockupM3ProjectsAndCalendar = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM3ProjectsAndCalendar)
);
const MockupM4ContractsAndRisks = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM4ContractsAndRisks)
);
const MockupM5AccessMatrix = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM5AccessMatrix)
);
const MockupM6SecurityDiagram = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM6SecurityDiagram)
);
const MockupM7SubcontractorLoop = dynamic(
  () => import('./ProductMockups').then((m) => m.MockupM7SubcontractorLoop)
);

function IndustryIcon({ name }: { name: ProductIndustryCard['iconName'] }) {
  const cls = 'w-5 h-5 text-[#2E4AE6]';
  switch (name) {
    case 'Wrench':
      return <Wrench className={cls} />;
    case 'Building2':
      return <Building2 className={cls} />;
    case 'Cpu':
      return <Cpu className={cls} />;
    case 'CalendarRange':
      return <CalendarRange className={cls} />;
    case 'Car':
      return <Car className={cls} />;
    case 'Briefcase':
      return <Briefcase className={cls} />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className={cls} />;
  }
}

function SecurityFeatureIcon({ name }: { name: ProductSecurityFeature['iconName'] }) {
  const cls = 'w-5 h-5 text-indigo-300';
  switch (name) {
    case 'Shield':
      return <Shield className={cls} />;
    case 'KeyRound':
      return <KeyRound className={cls} />;
    case 'History':
      return <History className={cls} />;
    case 'HardDrive':
      return <HardDrive className={cls} />;
    case 'DatabaseBackup':
      return <DatabaseBackup className={cls} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={cls} />;
    case 'Lock':
    default:
      return <Lock className={cls} />;
  }
}

function EastGatePlaceholderLogo() {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#141C2E] border border-slate-700/80"
      aria-label="East Gate Group — placeholder logotypu"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#94A3B8" strokeWidth="1.75" />
        <path d="M7 8h10M7 12h7M7 16h10" stroke="#E2E8F0" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-xs font-semibold tracking-wider uppercase text-slate-100">
        EAST GATE GROUP
      </span>
    </div>
  );
}

export function ProductLandingClient({
  product,
  initialVariantParam,
}: {
  product: ProductConfig;
  initialVariantParam?: string | null;
}) {
  const [h1Variant, setH1Variant] = useState<H1Variant>(() =>
    initialVariantParam === 'b' ? 'b' : 'a'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStickyStep, setActiveStickyStep] = useState<number>(0);
  const [activeFormTab, setActiveFormTab] = useState<'demo' | 'beta'>('demo');
  const [preferredHostingOverride, setPreferredHostingOverride] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const industriesRef = useRef<HTMLElement | null>(null);
  const securityRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firedViewsRef = useRef<{ industries: boolean; security: boolean }>({
    industries: false,
    security: false,
  });

  // Ustalenie wariantu H1 (?v=a|b lub losowanie zapisane w ciasteczku)
  useEffect(() => {
    const params =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const vParam = params?.get('v') ?? initialVariantParam ?? null;
    const resolved = resolveH1Variant(vParam);
    setH1Variant(resolved);
  }, [initialVariantParam]);

  // Śledzenie wyświetlenia sekcji 7.6 (industries_view) oraz 7.7 (security_view)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            entry.target === industriesRef.current &&
            !firedViewsRef.current.industries
          ) {
            firedViewsRef.current.industries = true;
            trackProductEvent('industries_view', product.slug, h1Variant);
          }
          if (
            entry.target === securityRef.current &&
            !firedViewsRef.current.security
          ) {
            firedViewsRef.current.security = true;
            trackProductEvent('security_view', product.slug, h1Variant);
          }
        }
      },
      { threshold: 0.25 }
    );

    if (industriesRef.current) observer.observe(industriesRef.current);
    if (securityRef.current) observer.observe(securityRef.current);

    return () => observer.disconnect();
  }, [product.slug, h1Variant]);

  // Sticky scroll w sekcji 7.4 (Jak działa GroupOS)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveStickyStep(idx);
            }
          }
        },
        { rootMargin: '-25% 0px -45% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToForm = (
    tab: 'demo' | 'beta',
    source: string,
    hostingPref?: string
  ) => {
    setActiveFormTab(tab);
    if (hostingPref) {
      setPreferredHostingOverride(hostingPref);
    }
    if (tab === 'demo') {
      trackProductEvent('cta_demo_click', product.slug, h1Variant, { source });
    } else {
      trackProductEvent('cta_beta_click', product.slug, h1Variant, { source });
    }
    setMobileMenuOpen(false);
    const el = document.getElementById('formularz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecurityAnchorClick = (source: string) => {
    trackProductEvent('cta_security_click', product.slug, h1Variant, { source });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-bg-light)] text-[var(--brand-text-light)] font-sans">
      {/* 5.2 Własny nagłówek produktu (bez głównej nawigacji Finareny) */}
      <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/produkty/${product.slug}`}
              className="inline-flex items-center gap-2.5 text-white font-semibold tracking-tight"
              aria-label={`${product.name} — strona produktu`}
            >
              <span className="w-8 h-8 rounded-lg bg-[#3554F2] flex items-center justify-center text-white shadow-sm">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-base font-semibold tracking-tight">{product.name}</span>
              <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                by Finarena
              </span>
            </Link>

            <Link
              href="/"
              prefetch={false}
              className="hidden xl:inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors pl-3 border-l border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>finarena.pl</span>
            </Link>
          </div>

          <nav
            aria-label="Nawigacja sekcji produktu"
            className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-200"
          >
            {product.navAnchors.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                onClick={() => {
                  if (a.id === 'bezpieczenstwo') handleSecurityAnchorClick('header_nav');
                }}
                className="hover:text-white transition-colors py-1"
              >
                {a.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#formularz"
              onClick={(e) => {
                e.preventDefault();
                scrollToForm('demo', 'header_cta');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3554F2] hover:bg-[#2844D8] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>{product.hero.primaryCta.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Otwórz menu sekcji produktu"
              className="lg:hidden p-2 rounded-lg border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobilne menu sekcji produktu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0B0F17] px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {product.navAnchors.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  onClick={() => {
                    if (a.id === 'bezpieczenstwo') handleSecurityAnchorClick('mobile_nav');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#121826] text-xs font-medium text-slate-200 hover:text-white"
                >
                  {a.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-1.5 hover:text-white">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wróć na finarena.pl</span>
              </Link>
              <a
                href="#formularz"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToForm('beta', 'mobile_nav_beta');
                }}
                className="text-indigo-300 font-medium"
              >
                Zapisy do bety →
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 7.1 HERO (Ciemne tło #0B0F17) */}
      <section
        id="hero"
        className="relative bg-[#0B0F17] text-slate-100 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 font-mono text-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>{product.hero.eyebrow}</span>
            </div>

            <h1
              data-h1-variant={h1Variant}
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-[1.08]"
            >
              {product.hero.h1Variants[h1Variant]}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {product.hero.lead}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href={product.hero.primaryCta.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToForm('demo', 'hero_primary');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3554F2] hover:bg-[#2844D8] text-white text-sm sm:text-base font-semibold shadow-lg transition-colors"
              >
                <span>{product.hero.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={product.hero.secondaryCta.href}
                onClick={() => handleSecurityAnchorClick('hero_secondary')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#161F31] hover:bg-[#1E2940] border border-slate-700 text-slate-100 text-sm sm:text-base font-medium transition-colors"
              >
                <Shield className="w-4 h-4 text-indigo-300" />
                <span>{product.hero.secondaryCta.label}</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{product.hero.microcopy}</span>
            </p>
          </div>

          {/* Makieta M1 w Hero */}
          <div className="mt-10 sm:mt-12">
            <MockupM1ExecutiveScope extended={false} />
          </div>
        </div>
      </section>

      {/* 7.2 PASEK REFERENCJI */}
      <section
        aria-label="Wdrożenia referencyjne"
        className="bg-[#121826] border-b border-slate-800 text-slate-200 py-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              {product.references.heading}
            </span>
            {product.references.items.map((refItem) => (
              <div key={refItem.name} className="flex flex-wrap items-center gap-3">
                <EastGatePlaceholderLogo />
                <span className="text-xs sm:text-sm text-slate-300">{refItem.role}</span>
              </div>
            ))}
          </div>
          <div className="font-mono text-xs text-slate-300">
            Architektura wielopodmiotowa · Chmura UE lub Dedykowany VPS
          </div>
        </div>
      </section>

      {/* 7.3 PROBLEM (Jasne tło #F6F4EF) */}
      <section id="problem" className="py-16 sm:py-24 bg-[#F6F4EF] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.problem.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.problem.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {product.problem.intro}
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {product.problem.cards.map((card, i) => (
              <div
                key={card.id}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-[#2E4AE6] bg-indigo-50 px-2.5 py-1 rounded-md">
                      {card.symptomTag}
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.4 JAK DZIAŁA GROUPOS (Sticky scroll: 4 kroki po lewej, makieta po prawej) */}
      <section id="jak-dziala" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.howItWorks.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.howItWorks.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {product.howItWorks.intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Lewa kolumna: 4 kroki */}
            <div className="lg:col-span-5 space-y-8 min-w-0">
              {product.howItWorks.steps.map((st, idx) => {
                const isActive = activeStickyStep === idx;
                return (
                  <div
                    key={st.id}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveStickyStep(idx)}
                    className={`rounded-2xl border p-4 sm:p-6 transition-all cursor-pointer min-w-0 overflow-hidden ${
                      isActive
                        ? 'bg-[#F6F4EF] border-[#2E4AE6] shadow-md'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2E4AE6]">
                        Krok {st.stepNumber} · {st.label}
                      </span>
                      <span className="font-mono text-[11px] text-slate-600">
                        {st.linearRefs.join(', ')}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug mb-3">
                      {st.title}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {st.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#2E4AE6] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Na ekranach mobilnych/tabletowych makieta wyświetla się bezpośrednio pod krokiem */}
                    <div className="mt-5 lg:hidden">
                      {st.mockupId === 'M1-M5' && <MockupM5AccessMatrix />}
                      {st.mockupId === 'M2' && <MockupM2CrmPipeline />}
                      {st.mockupId === 'M3' && <MockupM3ProjectsAndCalendar />}
                      {st.mockupId === 'M4' && <MockupM4ContractsAndRisks />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prawa kolumna: Sticky makieta na desktopie */}
            <div className="hidden lg:block lg:col-span-7 sticky top-24 space-y-4">
              <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-xl p-1.5">
                {product.howItWorks.steps.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setActiveStickyStep(idx)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      activeStickyStep === idx
                        ? 'bg-[#0B0F17] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    {st.stepNumber}. {st.label}
                  </button>
                ))}
              </div>

              {activeStickyStep === 0 && (
                <div className="space-y-4">
                  <MockupM5AccessMatrix />
                  <MockupM1ExecutiveScope extended={false} />
                </div>
              )}
              {activeStickyStep === 1 && <MockupM2CrmPipeline />}
              {activeStickyStep === 2 && <MockupM3ProjectsAndCalendar />}
              {activeStickyStep === 3 && <MockupM4ContractsAndRisks />}
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 PULPIT ZARZĄDU (Ciemne tło #121826) */}
      <section
        id="pulpit"
        className="py-16 sm:py-24 bg-[#121826] text-slate-100 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-semibold">
              {product.executiveDashboard.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              {product.executiveDashboard.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {product.executiveDashboard.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {product.executiveDashboard.highlights.map((hl) => (
              <div
                key={hl.label}
                className="rounded-xl bg-[#172033] border border-slate-700/80 p-5 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-white">{hl.label}</h3>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-200">
                    {hl.linearRef}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{hl.detail}</p>
              </div>
            ))}
          </div>

          <MockupM1ExecutiveScope extended={true} />
        </div>
      </section>

      {/* 7.6 DLA KOGO — BRANŻE I ZASTOSOWANIA (Jasne tło #F6F4EF) */}
      <section
        id="dla-kogo"
        ref={industriesRef}
        className="py-16 sm:py-24 bg-[#F6F4EF] text-slate-900 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.forWhom.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.forWhom.h2}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {product.forWhom.profileNote}
            </p>
          </div>

          {/* 5 typów organizacji */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
              {product.forWhom.orgTypesTitle}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {product.forWhom.orgTypes.map((org, i) => (
                <div
                  key={org}
                  className="rounded-xl bg-[#F6F4EF] border border-slate-200/90 p-3.5 flex flex-col justify-between"
                >
                  <span className="font-mono text-xs font-semibold text-[#2E4AE6] mb-1.5">
                    0{i + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
                    {org}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 7 kart branż */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              {product.forWhom.industriesTitle}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.forWhom.industries.map((ind) => (
                <div
                  key={ind.id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <IndustryIcon name={ind.iconName} />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900">
                      {ind.title}
                    </h4>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Wyzwanie:</strong> {ind.pain}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-800 leading-relaxed">
                    <strong className="text-[#2E4AE6]">W GroupOS:</strong> {ind.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wyróżniona karta: Wkrótce wersja branżowa (Beta dla podwykonawców + M7) */}
          <div className="rounded-2xl bg-[#0B0F17] text-slate-100 border-2 border-[#4F6BFF] p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/40 font-mono text-xs uppercase tracking-wider text-indigo-200 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>{product.forWhom.betaCard.badge}</span>
              </span>
              <span className="font-mono text-xs text-emerald-300 font-semibold">
                {product.forWhom.betaCard.subtitle}
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {product.forWhom.betaCard.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {product.forWhom.betaCard.description}
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {product.forWhom.betaCard.painPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center gap-3">
                <a
                  href={product.forWhom.betaCard.ctaHref}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToForm('beta', 'beta_card_7_6');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3554F2] hover:bg-[#2844D8] text-white text-sm font-semibold shadow-lg transition-colors"
                >
                  <span>{product.forWhom.betaCard.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-300">
                  Kliknięcie automatycznie przełączy formularz na zapisy do bety
                </span>
              </div>
            </div>

            {/* Makieta M7 */}
            <MockupM7SubcontractorLoop />
          </div>

          {/* Uczciwa notatka „nie dla” */}
          <div className="rounded-xl bg-amber-50/90 border border-amber-300/80 p-5 text-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-900">
                {product.forWhom.notForNote.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {product.forWhom.notForNote.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7.7 BEZPIECZEŃSTWO DANYCH, RODO I DEDYKOWANY VPS (Ciemne tło #0B0F17) */}
      <section
        id="bezpieczenstwo"
        ref={securityRef}
        className="py-16 sm:py-24 bg-[#0B0F17] text-slate-100 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-semibold">
              {product.security.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              {product.security.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {product.security.intro}
            </p>
          </div>

          {/* 2 karty porównawcze: Chmura vs Dedykowany VPS */}
          <div className="grid lg:grid-cols-2 gap-6">
            {product.security.comparisonCards.map((card) => (
              <div
                key={card.id}
                className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between space-y-5 ${
                  card.highlighted
                    ? 'bg-[#141D33] border-indigo-500/70 shadow-xl'
                    : 'bg-[#121826] border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <span className="inline-block font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-indigo-200">
                    {card.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">{card.subtitle}</p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 pt-2 border-t border-slate-800">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Diagram M6 */}
          <MockupM6SecurityDiagram />

          {/* 5 punktów „Dlaczego dedykowany VPS jest bezpieczniejszy” */}
          <div className="rounded-2xl bg-[#121826] border border-slate-800 p-6 sm:p-8 space-y-5">
            <h3 className="text-lg sm:text-2xl font-semibold text-white">
              {product.security.whyVpsTitle}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {product.security.whyVpsBullets.map((b, idx) => (
                <div
                  key={b}
                  className="rounded-xl bg-[#0B0F17] border border-slate-800/90 p-4 flex items-start gap-3"
                >
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 shrink-0">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7 funkcji bezpieczeństwa z ikonami */}
          <div className="space-y-5">
            <h3 className="text-lg sm:text-2xl font-semibold text-white">
              {product.security.featuresTitle}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.security.features.map((feat) => (
                <div
                  key={feat.id}
                  className="rounded-xl bg-[#121826] border border-slate-800 p-5 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center">
                      <SecurityFeatureIcon name={feat.iconName} />
                    </div>
                    <span className="font-mono text-[10px] text-slate-300">{feat.linearRef}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white">{feat.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blok RODO i lokalizacji danych w UE */}
          <div className="rounded-2xl bg-[#151F34] border border-indigo-500/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base sm:text-xl font-semibold text-white">
                {product.security.rodoBlock.title}
              </h3>
            </div>
            <ul className="grid md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-200">
              {product.security.rodoBlock.bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-xl bg-[#0B0F17]/70 border border-slate-800 p-4 leading-relaxed"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7.8 MODELE WSPÓŁPRACY — BEZ CEN */}
      <section className="py-16 sm:py-24 bg-[#F6F4EF] text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.cooperationModels.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.cooperationModels.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {product.cooperationModels.intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {product.cooperationModels.cards.map((model) => (
              <div
                key={model.id}
                className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 ${
                  model.featured
                    ? 'bg-[#0B0F17] text-white border-[#4F6BFF] shadow-xl'
                    : 'bg-white text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <span
                    className={`inline-block font-mono text-xs px-2.5 py-1 rounded font-semibold ${
                      model.featured
                        ? 'bg-indigo-500/25 text-indigo-200'
                        : 'bg-indigo-50 text-[#2E4AE6]'
                    }`}
                  >
                    {model.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold">{model.name}</h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      model.featured ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {model.forWhom}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm pt-2">
                    {model.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            model.featured ? 'text-emerald-400' : 'text-[#2E4AE6]'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#formularz"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToForm('demo', `model_${model.id}`, model.hostingPreferenceValue);
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    model.featured
                      ? 'bg-[#3554F2] hover:bg-[#2844D8] text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{model.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium text-center">
            {product.cooperationModels.pricingNote}
          </p>
        </div>
      </section>

      {/* 7.9 WDROŻENIE W 4 KROKACH */}
      <section
        id="wdrozenie"
        className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.onboarding.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.onboarding.h2}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {product.onboarding.intro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.onboarding.steps.map((st) => (
              <div
                key={st.step}
                className="rounded-2xl bg-[#F6F4EF] border border-slate-200 p-6 space-y-3"
              >
                <span className="inline-block font-mono text-xs font-semibold text-[#2E4AE6] bg-white px-2.5 py-1 rounded border border-slate-200">
                  {st.step}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.10 FORMULARZ: DEMO + ZAPISY DO BETY */}
      <section
        id="formularz"
        className="py-16 sm:py-24 bg-[#F6F4EF] text-slate-900 border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.formSection.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.formSection.h2}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {product.formSection.intro}
            </p>
          </div>

          <ProductLeadForm
            product={product}
            h1Variant={h1Variant}
            activeFormTab={activeFormTab}
            onFormTabChange={setActiveFormTab}
            preferredHostingOverride={preferredHostingOverride}
          />
        </div>
      </section>

      {/* 7.11 FAQ (6 pytań) */}
      <section id="faq" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#2E4AE6] font-semibold">
              {product.faq.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {product.faq.h2}
            </h2>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#F6F4EF] overflow-hidden">
            {product.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.question} className="bg-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-600 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#2E4AE6]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7.12 KOŃCOWE WEZWANIE DO DZIAŁANIA I STOPKA PRODUKTU */}
      <section className="bg-[#0B0F17] text-slate-100 py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            {product.finalCta.h2}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {product.finalCta.subtitle}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={product.finalCta.ctaHref}
              onClick={(e) => {
                e.preventDefault();
                scrollToForm('demo', 'final_cta');
              }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#3554F2] hover:bg-[#2844D8] text-white text-sm sm:text-base font-semibold shadow-lg transition-colors"
            >
              <span>{product.finalCta.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Dyskretna stopka produktu (5.2 & 7.12) */}
      <footer className="bg-[#080B11] text-slate-300 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="font-semibold text-white">
              {product.name} to produkt Finarena Sp. z o.o.
            </div>
            <div className="text-slate-300">
              ul. Alternatywy 7/135, 02-775 Warszawa · Przetwarzanie danych w EOG (UE)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-200">
            <Link href="/" prefetch={false} className="hover:text-white underline-offset-4 hover:underline">
              finarena.pl
            </Link>
            <Link
              href="/polityka-prywatnosci"
              prefetch={false}
              className="hover:text-white underline-offset-4 hover:underline"
            >
              Polityka prywatności i RODO
            </Link>
            <Link href="/kontakt" prefetch={false} className="hover:text-white underline-offset-4 hover:underline">
              Kontakt
            </Link>
            <a
              href="mailto:kontakt@finarena.pl"
              className="font-mono text-indigo-300 hover:text-indigo-200"
            >
              kontakt@finarena.pl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
