'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import type { ProductConfig } from '@/content/products/types';
import {
  getUtmAndReferrer,
  trackProductEvent,
  type H1Variant,
} from '@/lib/product-analytics';

const ENTITIES_OPTIONS = ['1', '2–3', '4–10', '10+'] as const;
const USERS_OPTIONS = ['do 10', '11–50', '51–200', '200+'] as const;
const HOSTING_OPTIONS = ['Chmura', 'Dedykowany VPS', 'Własny serwer', 'Nie wiem'] as const;

const BETA_INDUSTRIES = [
  'Elektryka',
  'HVAC',
  'Sanitarne',
  'Automatyka i BMS',
  'Fit-out',
  'Inna',
] as const;

const BETA_TEAM_SIZES = ['1–4', '5–15', '16–50', '50+'] as const;

const BETA_PAIN_POINTS = [
  'Aneksy',
  'Odbiory',
  'Fakturowanie etapów',
  'Kaucje',
  'Dokumentacja zdjęciowa',
  'Spory',
] as const;

export interface ProductLeadFormProps {
  product: ProductConfig;
  h1Variant: H1Variant;
  activeFormTab: 'demo' | 'beta';
  onFormTabChange: (tab: 'demo' | 'beta') => void;
  preferredHostingOverride?: string | null;
}

export function ProductLeadForm({
  product,
  h1Variant,
  activeFormTab,
  onFormTabChange,
  preferredHostingOverride,
}: ProductLeadFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Wspólne pola
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [rodoConsent, setRodoConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Pola Demo GroupOS
  const [entitiesCount, setEntitiesCount] = useState<string>('2–3');
  const [usersCount, setUsersCount] = useState<string>('11–50');
  const [hostingPreference, setHostingPreference] = useState<string>('Dedykowany VPS');
  const [currentTools, setCurrentTools] = useState('');

  // Pola Beta dla podwykonawców
  const [industry, setIndustry] = useState<string>('Elektryka');
  const [teamSize, setTeamSize] = useState<string>('16–50');
  const [painPoints, setPainPoints] = useState<string[]>([
    'Aneksy',
    'Odbiory',
  ]);

  // UTM & Referrer
  const [trackingMeta, setTrackingMeta] = useState({
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    referrer: '',
  });

  useEffect(() => {
    const meta = getUtmAndReferrer();
    setTrackingMeta({
      utmSource: meta.utmSource,
      utmMedium: meta.utmMedium,
      utmCampaign: meta.utmCampaign,
      referrer: meta.referrer,
    });
  }, []);

  useEffect(() => {
    if (
      preferredHostingOverride &&
      HOSTING_OPTIONS.includes(preferredHostingOverride as (typeof HOSTING_OPTIONS)[number])
    ) {
      setHostingPreference(preferredHostingOverride);
    }
  }, [preferredHostingOverride]);

  const markFormStarted = (sourceField: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackProductEvent('form_start', product.slug, h1Variant, {
        form_type: activeFormTab,
        first_field: sourceField,
      });
    }
  };

  const togglePainPoint = (item: string) => {
    markFormStarted('painPoints');
    setPainPoints((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markFormStarted('submit');
    setErrorMessage('');

    if (activeFormTab === 'beta' && painPoints.length === 0) {
      setErrorMessage('Zaznacz przynajmniej jeden obszar w polu „Co boli najbardziej”.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const payload = {
      productSlug: product.slug,
      formType: activeFormTab,
      h1Variant,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      rodoConsent,
      website: honeypot,
      // Demo fields
      entitiesCount,
      usersCount,
      hostingPreference,
      currentTools: currentTools.trim(),
      // Beta fields
      industry,
      teamSize,
      painPoints,
      // Attribution
      utmSource: trackingMeta.utmSource,
      utmMedium: trackingMeta.utmMedium,
      utmCampaign: trackingMeta.utmCampaign,
      referrer: trackingMeta.referrer,
    };

    try {
      const res = await fetch('/api/products/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data.message || 'Nie udało się wysłać zgłoszenia.');
      }

      trackProductEvent('form_submit', product.slug, h1Variant, {
        form_type: activeFormTab,
        hosting_preference: activeFormTab === 'demo' ? hostingPreference : 'beta',
      });
      setStatus('success');
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.'
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl text-slate-900 space-y-6"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            {activeFormTab === 'demo'
              ? 'Zgłoszenie przyjęte · Demo GroupOS'
              : 'Zgłoszenie przyjęte · Beta dla podwykonawców'}
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            {product.formSection.thankYou.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
            {product.formSection.thankYou.message}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={product.demoBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2E4AE6] hover:bg-[#1E38C8] text-white text-sm font-semibold shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{product.formSection.thankYou.bookingCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
          >
            Wyślij kolejne zgłoszenie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xl text-slate-900">
      {/* Przełącznik wariantu formularza */}
      <div
        role="tablist"
        aria-label="Wybierz rodzaj zgłoszenia"
        className="grid sm:grid-cols-2 gap-2.5 p-1.5 rounded-xl bg-slate-100 border border-slate-200 mb-7"
      >
        <button
          type="button"
          role="tab"
          id="tab-demo"
          aria-selected={activeFormTab === 'demo'}
          aria-controls="panel-form"
          onClick={() => {
            markFormStarted('tab_demo');
            onFormTabChange('demo');
          }}
          className={`text-left px-4 py-3 rounded-lg transition-all ${
            activeFormTab === 'demo'
              ? 'bg-[#0B0F17] text-white shadow-sm'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <div className="text-sm font-semibold">{product.formSection.tabs.demo.label}</div>
          <div
            className={`text-xs mt-0.5 ${
              activeFormTab === 'demo' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {product.formSection.tabs.demo.badge}
          </div>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-beta"
          aria-selected={activeFormTab === 'beta'}
          aria-controls="panel-form"
          onClick={() => {
            markFormStarted('tab_beta');
            onFormTabChange('beta');
          }}
          className={`text-left px-4 py-3 rounded-lg transition-all ${
            activeFormTab === 'beta'
              ? 'bg-[#0B0F17] text-white shadow-sm'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <div className="text-sm font-semibold">{product.formSection.tabs.beta.label}</div>
          <div
            className={`text-xs mt-0.5 ${
              activeFormTab === 'beta' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {product.formSection.tabs.beta.badge}
          </div>
        </button>
      </div>

      <form id="panel-form" onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        {/* Pola ukryte wymagane przez specyfikację */}
        <input type="hidden" name="h1Variant" value={h1Variant} />
        <input type="hidden" name="formType" value={activeFormTab} />
        <input type="hidden" name="utm_source" value={trackingMeta.utmSource} />
        <input type="hidden" name="utm_medium" value={trackingMeta.utmMedium} />
        <input type="hidden" name="utm_campaign" value={trackingMeta.utmCampaign} />
        <input type="hidden" name="referrer" value={trackingMeta.referrer} />

        {/* Pole-pułapka (honeypot) przeciwko spamowi */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="groupos-website-hp">Strona WWW firmy (nie wypełniaj)</label>
          <input
            id="groupos-website-hp"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Pola wspólne */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="groupos-name"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Imię *
            </label>
            <input
              id="groupos-name"
              name="name"
              type="text"
              required
              minLength={2}
              value={name}
              onFocus={() => markFormStarted('name')}
              onChange={(e) => setName(e.target.value)}
              placeholder="np. Tomasz"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
            />
          </div>

          <div>
            <label
              htmlFor="groupos-email"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              E-mail służbowy *
            </label>
            <input
              id="groupos-email"
              name="email"
              type="email"
              required
              value={email}
              onFocus={() => markFormStarted('email')}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tomasz@twojagrupa.pl"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="groupos-company"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Firma lub nazwa grupy *
            </label>
            <input
              id="groupos-company"
              name="company"
              type="text"
              required
              minLength={2}
              value={company}
              onFocus={() => markFormStarted('company')}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="np. Aurora Holding sp. z o.o."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
            />
          </div>

          <div>
            <label
              htmlFor="groupos-phone"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Telefon (opcjonalny)
            </label>
            <input
              id="groupos-phone"
              name="phone"
              type="tel"
              value={phone}
              onFocus={() => markFormStarted('phone')}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+48 500 000 000"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
            />
          </div>
        </div>

        {/* Pola zależne od wariantu: Demo GroupOS */}
        {activeFormTab === 'demo' ? (
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <span className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Liczba spółek *
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {ENTITIES_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        markFormStarted('entitiesCount');
                        setEntitiesCount(opt);
                      }}
                      className={`px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        entitiesCount === opt
                          ? 'bg-[#2E4AE6] border-[#2E4AE6] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Liczba użytkowników *
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {USERS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        markFormStarted('usersCount');
                        setUsersCount(opt);
                      }}
                      className={`px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        usersCount === opt
                          ? 'bg-[#2E4AE6] border-[#2E4AE6] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Preferowany hosting *
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {HOSTING_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        markFormStarted('hostingPreference');
                        setHostingPreference(opt);
                      }}
                      className={`px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors text-left ${
                        hostingPreference === opt
                          ? 'bg-[#2E4AE6] border-[#2E4AE6] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="groupos-current-tools"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Czego dziś używacie w spółkach? (opcjonalnie)
              </label>
              <input
                id="groupos-current-tools"
                name="currentTools"
                type="text"
                value={currentTools}
                onFocus={() => markFormStarted('currentTools')}
                onChange={(e) => setCurrentTools(e.target.value)}
                placeholder="np. Excel, Pipedrive w jednej spółce, Asana w drugiej, dysk Google..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
              />
            </div>
          </div>
        ) : (
          /* Pola dla wariantu: Beta dla podwykonawców */
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="groupos-beta-industry"
                  className="block text-xs font-semibold text-slate-800 mb-1.5"
                >
                  Branża wykonawcza *
                </label>
                <select
                  id="groupos-beta-industry"
                  name="industry"
                  value={industry}
                  onFocus={() => markFormStarted('industry')}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2E4AE6] focus:outline-none focus:ring-2 focus:ring-[#2E4AE6]/20"
                >
                  {BETA_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Liczba osób w firmie *
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {BETA_TEAM_SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        markFormStarted('teamSize');
                        setTeamSize(sz);
                      }}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        teamSize === sz
                          ? 'bg-[#2E4AE6] border-[#2E4AE6] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-800 mb-2">
                Co boli najbardziej? (wielokrotny wybór) *
              </span>
              <div className="flex flex-wrap gap-2">
                {BETA_PAIN_POINTS.map((pain) => {
                  const selected = painPoints.includes(pain);
                  return (
                    <button
                      key={pain}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => togglePainPoint(pain)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        selected
                          ? 'bg-[#2E4AE6] border-[#2E4AE6] text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {selected ? `✓ ${pain}` : pain}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Zgoda RODO */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              id="groupos-rodo"
              name="rodoConsent"
              type="checkbox"
              required
              checked={rodoConsent}
              onChange={(e) => {
                markFormStarted('rodoConsent');
                setRodoConsent(e.target.checked);
              }}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2E4AE6] focus:ring-[#2E4AE6]"
            />
            <span className="text-xs text-slate-700 leading-relaxed">
              {product.formSection.rodoConsentText}{' '}
              <Link
                href="/polityka-prywatnosci"
                prefetch={false}
                className="underline text-[#2E4AE6] hover:text-[#1E38C8]"
              >
                Polityką prywatności Finarena
              </Link>
              . *
            </span>
          </label>
        </div>

        {status === 'error' && errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-800"
          >
            {errorMessage}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2E4AE6] hover:bg-[#1E38C8] text-white text-sm font-semibold shadow-md transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Wysyłanie zgłoszenia...</span>
              </>
            ) : (
              <>
                <span>
                  {activeFormTab === 'demo'
                    ? product.formSection.tabs.demo.submitLabel
                    : product.formSection.tabs.beta.submitLabel}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Bezpośredni kontakt z zespołem Finarena Sp. z o.o. (EOG / RODO)</span>
          </div>
        </div>
      </form>
    </div>
  );
}
