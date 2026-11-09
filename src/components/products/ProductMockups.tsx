'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Folder,
  FolderOpen,
  Lock,
  MessageSquare,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  UserCheck,
} from 'lucide-react';

/**
 * Hook uruchamiający spokojną pętlę animacji (8–12 s) po wejściu w viewport,
 * z pełnym poszanowaniem `prefers-reduced-motion: reduce` (statyczny stan końcowy).
 */
export function useViewportLoop(stepsCount: number, intervalMs = 2500, defaultReducedStep = 0) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<number>(defaultReducedStep);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        setStep(defaultReducedStep);
      }
    };
    updateMotion();
    mq.addEventListener('change', updateMotion);
    return () => mq.removeEventListener('change', updateMotion);
  }, [defaultReducedStep]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !inView || manualOverride) return;
    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % stepsCount);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [reducedMotion, inView, manualOverride, stepsCount, intervalMs]);

  const selectStepManually = (nextStep: number) => {
    setManualOverride(true);
    setStep(nextStep);
  };

  return { containerRef, step, reducedMotion, selectStepManually };
}

const M1_ENTITIES = [
  {
    id: 'group',
    name: 'Grupa — wszystkie',
    dot: '#4F6BFF',
    dealsCount: '20 aktywnych',
    dealsSub: '3 z nich wymagają uwagi',
    projectsCount: '14 w realizacji',
    projectsSub: '3 spółki operacyjne',
    overdueCount: '2 po terminie',
    overdueSub: '1 w Aurora · 1 w Velo',
    risksCount: '3 otwarte ryzyka',
    risksSub: 'Każde ma właściciela',
    contractsCount: '3 wygasają w 30 dni',
    contractsSub: 'Alerty terminów aktywne',
    items: [
      {
        id: 'CTR-018',
        title: 'Umowa najmu magazynu centralnego wygasa za 30 dni',
        entity: 'Nord Events sp. z o.o.',
        meta: 'Rejestr umów · Alert 30 dni',
        tone: 'amber',
      },
      {
        id: 'RSK-012',
        title: 'Ryzyko opóźnienia dostawy rozdzielnicy SN — etap II',
        entity: 'Aurora Energy sp. z o.o.',
        meta: 'Rejestr ryzyk · Wysoki priorytet',
        tone: 'red',
      },
      {
        id: 'CRM-204',
        title: 'Wymaga uwagi: brak kontaktu 21 dni (Solaris Grid)',
        entity: 'Aurora Energy sp. z o.o.',
        meta: 'CRM · Wymagany następny krok',
        tone: 'blue',
      },
    ],
  },
  {
    id: 'aurora',
    name: 'Aurora Energy sp. z o.o.',
    dot: '#38BDF8',
    dealsCount: '9 aktywnych',
    dealsSub: '1 wymaga uwagi',
    projectsCount: '6 w realizacji',
    projectsSub: 'Energetyka i OZE',
    overdueCount: '1 po terminie',
    overdueSub: 'Zadanie pomiarowe SN',
    risksCount: '1 otwarte ryzyko',
    risksSub: 'Dostawa aparatury SN',
    contractsCount: '1 wygasa w 30 dni',
    contractsSub: 'Umowa serwisowa',
    items: [
      {
        id: 'RSK-012',
        title: 'Ryzyko opóźnienia dostawy rozdzielnicy SN — etap II',
        entity: 'Aurora Energy sp. z o.o.',
        meta: 'Rejestr ryzyk · Wysoki priorytet',
        tone: 'red',
      },
      {
        id: 'CRM-204',
        title: 'Wymaga uwagi: brak kontaktu 21 dni (Solaris Grid)',
        entity: 'Aurora Energy sp. z o.o.',
        meta: 'CRM · Wymagany następny krok',
        tone: 'blue',
      },
    ],
  },
  {
    id: 'nord',
    name: 'Nord Events sp. z o.o.',
    dot: '#A78BFA',
    dealsCount: '6 aktywnych',
    dealsSub: 'Wszystkie z datą kroku',
    projectsCount: '5 w realizacji',
    projectsSub: 'Eventy i produkcja',
    overdueCount: '0 po terminie',
    overdueSub: 'Zespół w terminie',
    risksCount: '1 otwarte ryzyko',
    risksSub: 'Rezerwacja hali Q1',
    contractsCount: '1 wygasa w 30 dni',
    contractsSub: 'Umowa najmu magazynu',
    items: [
      {
        id: 'CTR-018',
        title: 'Umowa najmu magazynu centralnego wygasa za 30 dni',
        entity: 'Nord Events sp. z o.o.',
        meta: 'Rejestr umów · Alert 30 dni',
        tone: 'amber',
      },
    ],
  },
  {
    id: 'velo',
    name: 'Velo Auto sp. z o.o.',
    dot: '#34D399',
    dealsCount: '5 aktywnych',
    dealsSub: '2 w negocjacjach',
    projectsCount: '3 w realizacji',
    projectsSub: 'Floty i kontrakty B2B',
    overdueCount: '1 po terminie',
    overdueSub: 'Weryfikacja umowy floty',
    risksCount: '1 otwarte ryzyko',
    risksSub: 'Czas dostawy aut',
    contractsCount: '1 wygasa w 30 dni',
    contractsSub: 'Polisa flotowa',
    items: [
      {
        id: 'TSK-112',
        title: 'Weryfikacja warunków przedłużenia kontraktu flotowego',
        entity: 'Velo Auto sp. z o.o.',
        meta: 'Zadanie po terminie · Wczoraj',
        tone: 'red',
      },
    ],
  },
] as const;

/**
 * M1 — Hero: widok grupy i przełącznik podmiotów (Aurora Energy, Nord Events, Velo Auto, Grupa — wszystkie).
 * Po wybraniu „Grupa — wszystkie” 5 kafli pulpitu zarządu agreguje się:
 * aktywne szanse, projekty, zadania po terminie, ryzyka, umowy wygasające w 30 dni.
 */
export function MockupM1ExecutiveScope({ extended = false }: { extended?: boolean }) {
  // Stan końcowy (i stan dla prefers-reduced-motion): indeks 0 ("Grupa — wszystkie")
  const { containerRef, step, selectStepManually } = useViewportLoop(4, 2600, 0);

  const isDropdownOpen = step === 1;
  const activeEntityIndex = step === 2 ? 1 : step === 3 ? 2 : 0;
  const current = M1_ENTITIES[activeEntityIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M1: Przełącznik podmiotów i zagregowany pulpit zarządu GroupOS"
      className="rounded-2xl border border-slate-700/70 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      {/* Górny pasek okna i przełącznik podmiotów */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-[11px] text-slate-300 tracking-wide">
            GroupOS · Pulpit zarządu
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => selectStepManually(activeEntityIndex === 0 ? 2 : 0)}
            aria-label={`Przełącznik podmiotu: ${current.name}`}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#172033] border border-indigo-500/50 text-xs font-medium text-white shadow-sm transition-colors hover:border-indigo-400"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: current.dot }}
            />
            <span>Podmiot: {current.name}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180 text-indigo-300' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-[#161F30] border border-slate-700 shadow-2xl p-1.5 z-20">
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300">
                Przełącz podmiot lub widok grupy
              </div>
              {M1_ENTITIES.map((ent, idx) => (
                <button
                  key={ent.id}
                  type="button"
                  onClick={() => selectStepManually(idx === 0 ? 0 : idx === 1 ? 2 : 3)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                    idx === 0
                      ? 'bg-indigo-600/30 text-white font-medium border border-indigo-400/40'
                      : 'text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: ent.dot }}
                    />
                    <span className="truncate">{ent.name}</span>
                  </span>
                  {idx === 0 && (
                    <span className="font-mono text-[10px] text-indigo-200">agregacja</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pasek stanu animacji */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#121929] border-b border-slate-800/80 text-[11px]">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>
            {step === 0 &&
              'Grupa — wszystkie: zagregowane szanse, projekty, zaległości, ryzyka i umowy (30 dni)'}
            {step === 1 && 'Lista podmiotów: zarząd przełącza kontekst jednym kliknięciem'}
            {step === 2 && 'Aurora Energy sp. z o.o.: widok zawężony do jednej spółki'}
            {step === 3 && 'Nord Events sp. z o.o.: osobne szanse, projekty i umowy spółki'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {(['Grupa — wszystkie', 'Lista spółek', 'Aurora Energy', 'Nord Events'] as const).map(
            (label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => selectStepManually(idx)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  step === idx
                    ? 'bg-[#3554F2] text-white font-medium'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {/* 5 zagregowanych kafli KPI zgodnie z Sekcją 6 (M1) */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3">
            <div className="text-[11px] text-slate-300 font-medium">Aktywne szanse</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums">
              {current.dealsCount}
            </div>
            <div className="mt-1 text-[11px] text-emerald-300">{current.dealsSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3">
            <div className="text-[11px] text-slate-300 font-medium">Projekty</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums">
              {current.projectsCount}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{current.projectsSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3">
            <div className="text-[11px] text-slate-300 font-medium">Zadania po terminie</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-amber-300 tabular-nums">
              {current.overdueCount}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{current.overdueSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3">
            <div className="text-[11px] text-slate-300 font-medium">Ryzyka</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-rose-300 tabular-nums">
              {current.risksCount}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{current.risksSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-slate-300 font-medium">Umowy (wygasające w 30 dni)</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums">
              {current.contractsCount}
            </div>
            <div className="mt-1 text-[11px] text-indigo-300">{current.contractsSub}</div>
          </div>
        </div>

        {/* Porównanie spółek + sygnały wymagające uwagi */}
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 rounded-xl bg-[#141C2C] border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#101726]">
              <span className="text-xs font-semibold text-white">
                Podmioty w grupie — zestawienie dla zarządu
              </span>
              <span className="font-mono text-[10px] text-slate-300">Dane fikcyjne</span>
            </div>
            <div className="divide-y divide-slate-800/80 text-xs">
              {[
                {
                  name: 'Aurora Energy sp. z o.o.',
                  dot: '#38BDF8',
                  deals: '9 szans',
                  projects: '6 projektów',
                  alert: '1 ryzyko · 1 umowa (30 dni)',
                  active: activeEntityIndex === 0 || activeEntityIndex === 1,
                },
                {
                  name: 'Nord Events sp. z o.o.',
                  dot: '#A78BFA',
                  deals: '6 szans',
                  projects: '5 projektów',
                  alert: 'Umowa najmu: 30 dni',
                  active: activeEntityIndex === 0 || activeEntityIndex === 2,
                },
                {
                  name: 'Velo Auto sp. z o.o.',
                  dot: '#34D399',
                  deals: '5 szans',
                  projects: '3 projekty',
                  alert: '1 zadanie po terminie',
                  active: activeEntityIndex === 0,
                },
              ].map((row) => (
                <div
                  key={row.name}
                  className={`flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 transition-opacity ${
                    row.active ? 'opacity-100' : 'opacity-35'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[160px]">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: row.dot }}
                    />
                    <span className="font-medium text-white">{row.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-slate-300 tabular-nums">
                    <span>{row.deals}</span>
                    <span className="text-slate-400">·</span>
                    <span>{row.projects}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      {row.alert}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl bg-[#141C2C] border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#101726]">
              <span className="text-xs font-semibold text-white">Sygnały na pulpicie grupy</span>
              <span className="font-mono text-[10px] text-indigo-300">
                {current.items.length} poz.
              </span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {current.items.map((item) => (
                <div key={item.id} className="px-3.5 py-2.5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-300">{item.id}</span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        item.tone === 'red'
                          ? 'bg-rose-500/20 text-rose-200'
                          : item.tone === 'amber'
                          ? 'bg-amber-500/20 text-amber-200'
                          : 'bg-sky-500/20 text-sky-200'
                      }`}
                    >
                      {item.meta}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-white leading-snug">{item.title}</div>
                  <div className="text-[11px] text-slate-300">{item.entity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wariant rozszerzony dla sekcji 7.5 (Pulpit zarządu) — bez rachunków bankowych */}
        {extended && (
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            {[
              {
                title: 'Zapisane widoki i eksport widoku',
                value: 'Filtr: Zaległości i ryzyka Q4',
                sub: 'Gotowy do eksportu z bieżącego widoku tabeli',
              },
              {
                title: 'Wyszukiwanie globalne (Cmd+K)',
                value: 'Przeszukuje spółki zgodnie z rolą',
                sub: 'Firmy, osoby, szanse, projekty, dokumenty i umowy',
              },
              {
                title: 'Raport zaległości i przypomnienia',
                value: '2 zadania po terminie · 3 umowy (30 dni)',
                sub: 'Zespoły spółek widzą wyłącznie własne przypomnienia',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl bg-[#101726] border border-slate-800 px-3.5 py-3 flex flex-col justify-between"
              >
                <div className="text-[11px] text-slate-300">{card.title}</div>
                <div className="mt-1 font-mono text-xs sm:text-sm font-semibold text-white">
                  {card.value}
                </div>
                <div className="mt-1 text-[11px] text-slate-300">{card.sub}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * M5 — Izolacja danych w grupie:
 * Dwóch użytkowników: prezes widzi całą grupę, kierownik spółki A widzi tylko spółkę A,
 * a dane spółki B (i C) są dla niego zablokowane (kłódka).
 */
export function MockupM5AccessMatrix() {
  const { containerRef, step, selectStepManually } = useViewportLoop(2, 3200, 1);

  const isManagerView = step === 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M5: Izolacja danych w grupie — Prezes vs Kierownik spółki A"
      className="rounded-xl border border-slate-700/80 bg-[#0F1523] text-slate-100 p-4 shadow-xl space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-indigo-300" />
          <span className="text-xs font-semibold text-white">
            Izolacja danych: Prezes grupy vs Kierownik spółki A
          </span>
        </div>
        <div className="flex gap-1">
          {[
            '1. Prezes (widzi całą grupę)',
            '2. Kierownik spółki A (spółka B zablokowana)',
          ].map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => selectStepManually(idx)}
              className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                step === idx ? 'bg-[#3554F2] text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        {/* Użytkownik 1: Prezes */}
        <div
          className={`rounded-xl p-3.5 border transition-all ${
            !isManagerView
              ? 'bg-[#162038] border-indigo-400 shadow-md'
              : 'bg-[#12192B] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div>
              <div className="font-semibold text-white">Marek Jaworski — Prezes</div>
              <div className="text-[11px] text-slate-300">Rola: Właściciel organizacji</div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/25 text-indigo-200 border border-indigo-400/40">
              Cała grupa
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              'Spółka A · Aurora Energy sp. z o.o.',
              'Spółka B · Nord Events sp. z o.o.',
              'Spółka C · Velo Auto sp. z o.o.',
            ].map((ent) => (
              <div
                key={ent}
                className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0E1422] border border-slate-800"
              >
                <span className="text-slate-100">{ent}</span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-300">
                  <Check className="w-3 h-3" /> Pełny dostęp
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Użytkownik 2: Kierownik spółki A */}
        <div
          className={`rounded-xl p-3.5 border transition-all ${
            isManagerView
              ? 'bg-[#162038] border-indigo-400 shadow-md'
              : 'bg-[#12192B] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div>
              <div className="font-semibold text-white">Karolina Nowak — Kierownik spółki A</div>
              <div className="text-[11px] text-slate-300">Przypisanie: wyłącznie Aurora Energy</div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/40">
              Tylko Spółka A
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0E1422] border border-emerald-500/40">
              <span className="text-white font-medium">Spółka A · Aurora Energy sp. z o.o.</span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-300">
                <Check className="w-3 h-3" /> Dostęp aktywny
              </span>
            </div>

            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-rose-950/25 border border-rose-500/40">
              <span className="text-slate-300">Spółka B · Nord Events sp. z o.o.</span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-rose-200">
                <Lock className="w-3 h-3" /> Zablokowane
              </span>
            </div>

            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-rose-950/25 border border-rose-500/40">
              <span className="text-slate-300">Spółka C · Velo Auto sp. z o.o.</span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-rose-200">
                <Lock className="w-3 h-3" /> Zablokowane
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * M2 — CRM: szansa w lejku:
 * Karta szansy przesuwa się między etapami. System wymaga „następnego kroku” z datą.
 * Na liście pojawia się znacznik „Wymaga uwagi: brak kontaktu 21 dni”.
 * Na osi aktywności wpada szybki wpis „Rozmowa telefoniczna”.
 */
export function MockupM2CrmPipeline() {
  const { containerRef, step, selectStepManually } = useViewportLoop(3, 2700, 2);

  const movedStage = step >= 1;
  const callLogged = step === 2;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M2: Szansa w lejku CRM, wymagany następny krok i oś aktywności"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 p-4 sm:p-5 shadow-2xl space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            CRM · Lejek szans per podmiot + Oś aktywności
          </div>
          <div className="text-[11px] text-slate-300">
            Firmy i osoby jako osobne obiekty · Wymagany następny krok z datą
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {([
            '1. Brak kontaktu 21 dni',
            '2. Przesunięcie + Następny krok',
            '3. Wpis: Rozmowa telefoniczna',
          ] as const).map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => selectStepManually(idx)}
              className={`px-2 py-1 rounded font-mono text-[10px] transition-colors ${
                step === idx ? 'bg-[#3554F2] text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Kolumny lejka */}
      <div className="grid sm:grid-cols-3 gap-3">
        {/* Etap 1: Kwalifikacja / Oferta */}
        <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <span className="font-semibold text-white">Oferta</span>
            <span className="font-mono text-[10px] text-slate-300">Aurora Energy</span>
          </div>

          {!movedStage && (
            <div className="rounded-lg p-3 bg-amber-950/30 border border-amber-500/60 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-amber-200">DEAL-211</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/25 text-amber-200 font-semibold">
                  Wymaga uwagi: brak kontaktu 21 dni
                </span>
              </div>
              <div className="text-xs font-semibold text-white">
                Solaris Grid — modernizacja rozdzielnicy SN
              </div>
              <div className="text-[11px] text-amber-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>System wymaga „następnego kroku” z datą</span>
              </div>
            </div>
          )}

          <div className="rounded-lg p-3 bg-[#182238] border border-slate-700/70 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-300">
              <span>DEAL-215</span>
              <span>Nord Events</span>
            </div>
            <div className="text-xs font-medium text-white">Obsługa scenografii Kongresu Horyzont</div>
            <div className="text-[11px] text-slate-300 font-mono">
              Następny krok: 18.11 · Prezentacja koncepcji
            </div>
          </div>
        </div>

        {/* Etap 2: Negocjacje */}
        <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <span className="font-semibold text-white">Negocjacje</span>
            <span className="font-mono text-[10px] text-indigo-300">Wymagany następny krok</span>
          </div>

          {movedStage && (
            <div className="rounded-lg p-3 bg-indigo-950/40 border border-indigo-400 space-y-2 shadow-lg">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-indigo-200">DEAL-211 · Solaris Grid</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200">
                  Krok zaplanowany
                </span>
              </div>
              <div className="text-xs font-semibold text-white">
                Solaris Grid — modernizacja rozdzielnicy SN
              </div>
              <div className="text-[11px] text-indigo-200 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Następny krok: 21.11 · Omówienie warunków umowy</span>
              </div>
            </div>
          )}

          <div className="rounded-lg p-3 bg-[#182238] border border-slate-700/70 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-300">
              <span>DEAL-198</span>
              <span>Velo Auto</span>
            </div>
            <div className="text-xs font-medium text-white">Wynajem długoterminowy 12 aut serwisowych</div>
            <div className="text-[11px] text-amber-200 font-mono">
              Wymaga uwagi: brak kontaktu 21 dni
            </div>
          </div>
        </div>

        {/* Kolumna 3: Oś aktywności i powiązana osoba w wielu firmach */}
        <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="border-b border-slate-800 pb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Oś aktywności · Solaris Grid</span>
              <span className="font-mono text-[10px] text-slate-300">CRM-03</span>
            </div>

            {callLogged && (
              <div className="rounded-lg p-2.5 bg-emerald-950/35 border border-emerald-500/50 space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px] text-emerald-300">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> Rozmowa telefoniczna
                  </span>
                  <span>Przed chwilą</span>
                </div>
                <div className="text-[11px] text-white">
                  Potwierdzono zakres techniczny rozdzielnicy i termin spotkania na 21.11.
                </div>
              </div>
            )}

            <div className="rounded-lg p-2.5 bg-[#101726] border border-slate-800 space-y-1">
              <div className="font-mono text-[10px] text-slate-300">Osoba kontaktowa (w 2 firmach)</div>
              <div className="text-xs font-medium text-white">Tomasz Krawczyk</div>
              <div className="text-[11px] text-slate-300">
                1. Solaris Grid sp. z o.o. (Dyrektor Techniczny)
                <br />
                2. Solaris Inwestycje sp. z o.o. (Prokurent)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * M3 — Praca: Kanban i checklista:
 * Zadanie przeciągnięte do „W toku”. Checklista odhacza się pozycja po pozycji,
 * pasek postępu etapu rośnie. Komentarz z @wzmianką. W rogu telefon z powiadomieniem push.
 */
export function MockupM3ProjectsAndCalendar() {
  const { containerRef, step, selectStepManually } = useViewportLoop(3, 2700, 2);

  const progressPct = step === 0 ? 50 : step === 1 ? 75 : 100;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M3: Kanban zadań, checklista, komentarz z @wzmianką i powiadomienie push"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 p-4 sm:p-5 shadow-2xl space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            Projekt: Uruchomienie stacji transformatorowej · Etap II (Aurora Energy)
          </div>
          <div className="text-[11px] text-slate-300">
            Projekty → Etapy → Zadania → Podzadania → Checklisty · Komentarze z @wzmiankami
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['1. Przeciągnięto do W toku', '2. Checklista 75%', '3. @wzmianka + Push PWA'] as const).map(
            (label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => selectStepManually(idx)}
                className={`px-2 py-1 rounded font-mono text-[10px] ${
                  step === idx ? 'bg-[#3554F2] text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Pasek postępu etapu */}
      <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white">Postęp etapu: Próby i pomiary odbiorowe</span>
          <span className="font-mono text-xs text-emerald-300 tabular-nums">{progressPct}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4 items-start">
        {/* Kanban + Checklista */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
          {/* Kolumna: W toku */}
          <div className="rounded-xl bg-[#141C2E] border border-indigo-500/50 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> W toku
              </span>
              <span className="font-mono text-[10px] text-indigo-300">Przeciągnięto</span>
            </div>

            <div className="rounded-lg bg-[#182238] border border-indigo-400/60 p-3 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate-300">TSK-119 · Priorytet: Wysoki</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200">W toku</span>
              </div>
              <div className="text-xs font-semibold text-white">
                Pomiary ochronne i próby funkcjonalne rozdzielnicy
              </div>

              {/* Checklista odhaczająca się pozycja po pozycji */}
              <div className="space-y-1.5 pt-1">
                {[
                  { label: 'Sprawdzenie ciągłości przewodów ochronnych', done: true },
                  { label: 'Pomiar rezystancji izolacji torów SN', done: true },
                  { label: 'Test wyzwalaczy zabezpieczeń nadprądowych', done: step >= 1 },
                  { label: 'Kompletacja załączników pomiarowych do odbioru', done: step >= 2 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-2 py-1 rounded bg-[#101726] border border-slate-800 text-[11px]"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] shrink-0 ${
                        item.done
                          ? 'bg-emerald-400 text-slate-950 font-bold'
                          : 'border border-slate-600 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={item.done ? 'line-through text-slate-300' : 'text-white'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Komentarz z @wzmianką */}
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-300" /> Komentarze zadania
              </span>
              <span className="font-mono text-[10px] text-slate-300">COL-01</span>
            </div>

            <div className="rounded-lg bg-[#101726] border border-slate-800 p-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span>Piotr Zieliński</span>
                <span>14:20</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 font-mono text-[11px]">
                  @Karolina Nowak
                </span>{' '}
                pomiary rezystancji zakończone bez uwag, protokół wgrany do folderu projektu.
              </p>
            </div>
          </div>
        </div>

        {/* W rogu telefon z powiadomieniem push (PWA) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0B0F17] border-2 border-slate-700 p-3.5 shadow-xl space-y-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 border-b border-slate-800 pb-2">
            <span className="inline-flex items-center gap-1 text-indigo-300">
              <Smartphone className="w-3.5 h-3.5" /> Telefon · PWA Push
            </span>
            <span>09:41</span>
          </div>
          <div className="rounded-xl bg-[#162038] border border-indigo-400/60 p-3 space-y-1.5 shadow-md">
            <div className="flex items-center justify-between text-[10px] font-mono text-indigo-200">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Bell className="w-3 h-3" /> GroupOS · Powiadomienie
              </span>
              <span>Teraz</span>
            </div>
            <div className="text-xs font-semibold text-white">
              Piotr Zieliński oznaczył Cię w TSK-119
            </div>
            <div className="text-[11px] text-slate-200">
              „@Karolina Nowak pomiary rezystancji zakończone bez uwag...”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * M4 — Dokumenty i umowy:
 * Drzewo folderów (podmiot → projekt). Plik oznaczony „Poufne”, po pobraniu pojawia się
 * wpis w dzienniku audytu. W rejestrze umów alert „Umowa najmu wygasa za 30 dni”.
 */
export function MockupM4ContractsAndRisks() {
  const { containerRef, step, selectStepManually } = useViewportLoop(3, 2800, 2);

  const fileDownloaded = step >= 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M4: Drzewo folderów, poufne pliki z dziennikiem audytu i rejestr umów"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 p-4 sm:p-5 shadow-2xl space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            Repozytorium dokumentów, klasyfikacja „Poufne” i rejestr umów
          </div>
          <div className="text-[11px] text-slate-300">
            Drzewo folderów (podmiot → projekt) · Suma kontrolna SHA-256 · Dziennik audytu pobrań
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['1. Drzewo folderów', '2. Pobranie pliku Poufne', '3. Alert umowy 30 dni'] as const).map(
            (label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => selectStepManually(idx)}
                className={`px-2 py-1 rounded font-mono text-[10px] ${
                  step === idx ? 'bg-[#3554F2] text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Drzewo folderów: podmiot → projekt */}
        <div className="lg:col-span-5 rounded-xl bg-[#141C2E] border border-slate-800 p-3.5 space-y-2 text-xs">
          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-300 pb-1 border-b border-slate-800">
            Struktura folderów
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-indigo-200 font-semibold">
              <FolderOpen className="w-4 h-4 text-indigo-300 shrink-0" />
              <span>Aurora Energy sp. z o.o. (Podmiot)</span>
            </div>
            <div className="pl-5 space-y-1.5">
              <div className="flex items-center gap-2 text-white">
                <FolderOpen className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>PRJ-042 · Rozdzielnica SN (Projekt)</span>
              </div>
              <div className="pl-5 space-y-1.5">
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#182238] border border-rose-500/40">
                  <span className="flex items-center gap-1.5 text-white truncate">
                    <FileText className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                    <span className="truncate">Aneks_cenowy_Solaris.pdf</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-500/25 text-rose-200 text-[10px] shrink-0">
                    Poufne
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300 pt-1">
              <Folder className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Nord Events sp. z o.o. (Podmiot)</span>
            </div>
          </div>
        </div>

        {/* Prawa kolumna: Dziennik audytu pobrań + Alert w rejestrze umów */}
        <div className="lg:col-span-7 space-y-3">
          {/* Wpis w dzienniku audytu po pobraniu pliku Poufne */}
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-indigo-300" /> Dziennik audytu pobrań i zmian
              </span>
              <span className="font-mono text-[10px] text-slate-300">SHA-256 zweryfikowano</span>
            </div>
            <div
              className={`rounded-lg p-2.5 border text-xs transition-colors ${
                fileDownloaded
                  ? 'bg-indigo-950/35 border-indigo-400/60 text-white'
                  : 'bg-[#101726] border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-indigo-200">
                <span>AUDIT-8841 · POBRANIE PLIKU POUFNEGO</span>
                <span>14:32:10</span>
              </div>
              <div className="mt-1 font-medium">
                Użytkownik Karolina Nowak pobrała plik „Aneks_cenowy_Solaris.pdf” (SHA-256: 9f86d08...12a4)
              </div>
            </div>
          </div>

          {/* Rejestr umów z alertem 30 dni */}
          <div className="rounded-xl bg-[#161F33] border border-amber-500/50 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">
                  Alert rejestru umów: Umowa najmu wygasa za 30 dni
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Podmiot: Nord Events sp. z o.o. · Powiązane ryzyko: ciągłość magazynu scenografii
                </div>
              </div>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-amber-500/25 text-amber-200 border border-amber-400/40 font-semibold">
              Umowa najmu wygasa za 30 dni
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * M6 — Hosting: SaaS vs dedykowany VPS (Diagram SVG):
 * Model współdzielony w UE vs dedykowany serwer klienta w UE (osobna baza, backup, kłódka).
 * Przepływy danych nie wychodzą poza granicę UE.
 */
export function MockupM6SecurityDiagram() {
  return (
    <div
      role="img"
      aria-label="Diagram M6: Porównanie modelu współdzielonego w UE (SaaS) oraz dedykowanego serwera klienta w UE (VPS). Przepływy danych nie wychodzą poza granicę UE."
      className="rounded-2xl border border-slate-700/80 bg-[#0D1320] p-4 sm:p-6 shadow-2xl space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Granica przetwarzania: Unia Europejska (EOG) — dane nie opuszczają UE</span>
        </div>
        <span className="font-mono text-[11px] text-indigo-300">
          Ten sam kod aplikacji · Dwa modele izolacji
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Lewa strona: Model współdzielony w UE (SaaS) */}
        <div className="rounded-xl border border-slate-800 bg-[#12192A] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Model 01 · Chmura (SaaS w UE)
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                Izolacja w aplikacji i bazie
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2">
              Współdzielona infrastruktura w UE z separacją danych organizacji
            </h4>
          </div>

          <svg
            viewBox="0 0 420 210"
            className="w-full h-auto my-3 rounded-lg bg-[#0B0F19] border border-slate-800/90"
            aria-hidden="true"
          >
            <rect
              x="14"
              y="14"
              width="392"
              height="182"
              rx="10"
              fill="#111827"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="5 3"
            />
            <text x="28" y="36" fill="#93C5FD" fontSize="10.5" fontFamily="monospace">
              GRANICA UNII EUROPEJSKIEJ (EOG) · SZYFROWANE POŁĄCZENIA TLS
            </text>

            <rect x="28" y="52" width="114" height="52" rx="6" fill="#1E293B" stroke="#4F6BFF" />
            <text x="40" y="74" fill="#F8FAFC" fontSize="11" fontWeight="bold">
              Twoja Grupa
            </text>
            <text x="40" y="91" fill="#93C5FD" fontSize="10" fontFamily="monospace">
              Oddzielny tenant
            </text>

            <rect x="153" y="52" width="114" height="52" rx="6" fill="#1E293B" stroke="#475569" />
            <text x="165" y="74" fill="#CBD5E1" fontSize="11">
              Organizacja B
            </text>
            <text x="165" y="91" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              Oddzielny tenant
            </text>

            <rect x="278" y="52" width="114" height="52" rx="6" fill="#1E293B" stroke="#475569" />
            <text x="290" y="74" fill="#CBD5E1" fontSize="11">
              Organizacja C
            </text>
            <text x="290" y="91" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              Oddzielny tenant
            </text>

            <rect x="28" y="122" width="364" height="56" rx="6" fill="#0F172A" stroke="#334155" />
            <text x="42" y="145" fill="#E2E8F0" fontSize="11" fontWeight="bold">
              Baza danych i pliki w UE + Codzienny backup z testem odtworzenia
            </text>
            <text x="42" y="164" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              Przepływy danych nie wychodzą poza granicę EOG
            </text>
          </svg>
        </div>

        {/* Prawa strona: Dedykowany serwer klienta w UE (VPS) */}
        <div className="rounded-xl border border-indigo-500/60 bg-[#131C31] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-300">
                Model 02 · Dedykowany VPS w UE
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-100 border border-indigo-400/40">
                Fizyczna separacja serwera i bazy
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2">
              Osobny serwer i osobna baza wyłącznie dla Twojej grupy w wybranej lokalizacji UE
            </h4>
          </div>

          <svg
            viewBox="0 0 420 210"
            className="w-full h-auto my-3 rounded-lg bg-[#090D16] border border-indigo-500/40"
            aria-hidden="true"
          >
            <rect
              x="14"
              y="14"
              width="392"
              height="182"
              rx="10"
              fill="#0F172A"
              stroke="#4F6BFF"
              strokeWidth="1.75"
            />
            <text x="28" y="36" fill="#A5B4FC" fontSize="10.5" fontFamily="monospace">
              GRANICA UE (EOG) · DEDYKOWANY SERWER TWOJEJ GRUPY
            </text>

            {/* Ikona kłódki w SVG */}
            <rect x="366" y="22" width="24" height="20" rx="4" fill="#1E293B" stroke="#34D399" />
            <text x="373" y="36" fill="#34D399" fontSize="11" fontWeight="bold">
              🔒
            </text>

            <rect x="28" y="52" width="114" height="44" rx="6" fill="#1E293B" stroke="#38BDF8" />
            <text x="38" y="72" fill="#F8FAFC" fontSize="10.5" fontWeight="bold">
              Aurora Energy
            </text>
            <text x="38" y="87" fill="#7DD3FC" fontSize="9.5" fontFamily="monospace">
              Spółka A
            </text>

            <rect x="153" y="52" width="114" height="44" rx="6" fill="#1E293B" stroke="#A78BFA" />
            <text x="163" y="72" fill="#F8FAFC" fontSize="10.5" fontWeight="bold">
              Nord Events
            </text>
            <text x="163" y="87" fill="#C4B5FD" fontSize="9.5" fontFamily="monospace">
              Spółka B
            </text>

            <rect x="278" y="52" width="114" height="44" rx="6" fill="#1E293B" stroke="#34D399" />
            <text x="288" y="72" fill="#F8FAFC" fontSize="10.5" fontWeight="bold">
              Velo Auto
            </text>
            <text x="288" y="87" fill="#6EE7B7" fontSize="9.5" fontFamily="monospace">
              Spółka C
            </text>

            <rect x="28" y="112" width="114" height="66" rx="6" fill="#172036" stroke="#4F6BFF" />
            <text x="38" y="134" fill="#FFFFFF" fontSize="10.5" fontWeight="bold">
              Osobna baza
            </text>
            <text x="38" y="150" fill="#CBD5E1" fontSize="9.5">
              Tylko Twoja grupa
            </text>
            <text x="38" y="165" fill="#93C5FD" fontSize="9" fontFamily="monospace">
              Zero innych firm
            </text>

            <rect x="153" y="112" width="114" height="66" rx="6" fill="#172036" stroke="#4F6BFF" />
            <text x="163" y="134" fill="#FFFFFF" fontSize="10.5" fontWeight="bold">
              Pliki SHA-256
            </text>
            <text x="163" y="150" fill="#CBD5E1" fontSize="9.5">
              Poufne + Audyt
            </text>
            <text x="163" y="165" fill="#93C5FD" fontSize="9" fontFamily="monospace">
              Osobny magazyn
            </text>

            <rect x="278" y="112" width="114" height="66" rx="6" fill="#172036" stroke="#34D399" />
            <text x="288" y="134" fill="#FFFFFF" fontSize="10.5" fontWeight="bold">
              Backup w UE
            </text>
            <text x="288" y="150" fill="#CBD5E1" fontSize="9.5">
              Test odtworzenia
            </text>
            <text x="288" y="165" fill="#6EE7B7" fontSize="9" fontFamily="monospace">
              Uzgodnione okna
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * M7 — Teaser branżowy (wkrótce):
 * Telefon brygadzisty: zadanie „Montaż tras kablowych — piętro 3” → zdjęcie → checklista → „Zgłoś do odbioru”.
 * Wyszarzony, z etykietą „Wkrótce: beta”.
 */
export function MockupM7SubcontractorLoop() {
  const { containerRef, step, selectStepManually } = useViewportLoop(4, 2400, 3);

  const steps = [
    {
      id: 'task',
      label: '1. Zadanie dla ekipy',
      detail: 'Montaż tras kablowych — piętro 3',
    },
    {
      id: 'photo',
      label: '2. Zdjęcie z budowy',
      detail: 'Dodano 4 zdjęcia przed zakryciem bruzd (znacznik czasu i autora)',
    },
    {
      id: 'checklist',
      label: '3. Checklista etapu',
      detail: '✓ Uchwyt ognioodporny co 60 cm · ✓ Oznaczenie obwodów',
    },
    {
      id: 'submit',
      label: '4. Zgłoś do odbioru',
      detail: 'Gotowe do protokołu odbioru i fakturowania etapu',
    },
  ];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Makieta M7: Wyszarzony podgląd telefonu brygadzisty (Wkrótce: beta) — Montaż tras kablowych — piętro 3"
      className="rounded-xl border border-slate-700/80 bg-[#0E131F]/90 p-4 text-slate-200 shadow-lg opacity-90"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-slate-300" />
          <span className="font-mono text-xs text-slate-200 font-semibold">
            Widok telefonu brygadzisty: „Montaż tras kablowych — piętro 3”
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-200 border border-amber-400/40 font-semibold">
          Wkrótce: beta
        </span>
      </div>

      {/* Symulowany ekran telefonu brygadzisty w stonowanej/wyszarzonej stylistyce */}
      <div className="grid sm:grid-cols-4 gap-2.5">
        {steps.map((s, idx) => {
          const isActive = step === idx;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectStepManually(idx)}
              className={`text-left rounded-lg p-3 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-slate-500 text-white'
                  : 'bg-[#111726]/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-slate-300">{s.label}</div>
                <div className="text-xs font-semibold text-white leading-snug">{s.detail}</div>
              </div>
              {idx === 3 && (
                <div className="mt-2.5 inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-700 text-white font-mono text-[10px] font-semibold">
                  Zgłoś do odbioru →
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
