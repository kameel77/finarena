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

export interface StoryStep {
  id: string;
  label: string;
  narrative: string;
}

/**
 * Hook zarządzający narracyjną pętlą animacji makiety (4–5 s na krok):
 * - Historia „akcja → skutek” z 1-zdaniowym podpisem i płynnym paskiem postępu
 * - Pauza po najechaniu myszą (hover)
 * - Pauza po kliknięciu ręcznym (manualOverride) z automatycznym wznowieniem po 8 s bez interakcji
 * - Pełne poszanowanie `prefers-reduced-motion: reduce` (statyczny stan końcowy/początkowy)
 * - Uruchamia się wyłącznie po wejściu w viewport (IntersectionObserver)
 */
export function useStoryLoop({
  steps,
  stepDurationMs = 4500,
  defaultReducedStep = 0,
}: {
  steps: StoryStep[];
  stepDurationMs?: number;
  defaultReducedStep?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<number>(defaultReducedStep);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        setStep(defaultReducedStep);
        setProgress(100);
      }
    };
    updateMotion();
    mq.addEventListener('change', updateMotion);
    return () => mq.removeEventListener('change', updateMotion);
  }, [defaultReducedStep]);

  // IntersectionObserver
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Timer loop & progress bar ticker
  useEffect(() => {
    if (reducedMotion || !inView || isPaused) return;

    const intervalMs = 50;
    const increment = (intervalMs / stepDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStep((cur) => (cur + 1) % steps.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [reducedMotion, inView, isPaused, stepDurationMs, steps.length]);

  // Ręczny wybór kroku: pauzuje i wznawia po 8 s braku interakcji
  const selectStep = (index: number) => {
    setStep(index);
    setProgress(0);
    setIsPaused(true);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      resumeTimerRef.current = null;
    }, 8000);
  };

  const onMouseEnter = () => {
    if (!reducedMotion) setIsPaused(true);
  };

  const onMouseLeave = () => {
    if (!reducedMotion && !resumeTimerRef.current) {
      setIsPaused(false);
    }
  };

  return {
    containerRef,
    step,
    currentStepData: steps[step] || steps[0],
    progress: reducedMotion ? 100 : Math.min(progress, 100),
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  };
}

/**
 * Pasek nawigacji, narracji i postępu pod makietą
 */
function MockupStoryFooter({
  steps,
  currentStepIndex,
  progress,
  isPaused,
  onSelectStep,
}: {
  steps: StoryStep[];
  currentStepIndex: number;
  progress: number;
  isPaused: boolean;
  onSelectStep: (idx: number) => void;
}) {
  const current = steps[currentStepIndex] || steps[0];
  return (
    <div className="border-t border-slate-800 bg-[#0B0F17] px-3.5 sm:px-4 py-2.5 space-y-2 select-none">
      {/* Pasek postępu kroku */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3554F2] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {/* Narracja kroku */}
        <div className="flex items-center gap-2 text-slate-200 min-w-0">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold shrink-0">
            Krok {currentStepIndex + 1}/{steps.length}
          </span>
          <span className="font-medium text-slate-200 truncate sm:whitespace-normal">
            {current.narrative}
          </span>
          {isPaused && (
            <span className="font-mono text-[9px] text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0 hidden md:inline">
              Pauza (wznawia po 8 s)
            </span>
          )}
        </div>

        {/* Przyciski bezpośredniego wyboru kroku */}
        <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-0.5 sm:pb-0">
          {steps.map((st, idx) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onSelectStep(idx)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors whitespace-nowrap ${
                currentStepIndex === idx
                  ? 'bg-[#3554F2] text-white font-semibold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {idx + 1}. {st.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Animowany kursor SVG do prezentacji akcji użytkownika
 */
function MockupCursor({
  x,
  y,
  isClicking = false,
  visible = true,
}: {
  x: number | string;
  y: number | string;
  isClicking?: boolean;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none absolute z-30 transition-all duration-500 ease-out"
      style={{ left: x, top: y }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-lg transition-transform duration-200 ${
          isClicking ? 'scale-90 translate-y-0.5' : 'scale-100'
        }`}
      >
        <path
          d="M3 3l7 18 3-7 7-3L3 3z"
          fill="#3554F2"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {isClicking && (
        <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-indigo-400 animate-ping opacity-75" />
      )}
    </div>
  );
}

/* =========================================================================
 * M1 — Hero: Widok grupy i przełącznik podmiotów (4 kroki narracji)
 * 10. Hero (M1) — „jeden przełącznik, różne widoki”:
 * animowany kursor otwiera selektor „Podmiot” → wybiera „Aurora Energy” →
 * liczby KPI płynnie przeliczają się (tween liczb), wiersze innych spółek
 * zwijają się, sygnały filtrują się → po 4 s powrót do „Grupa — wszystkie”.
 * Podpis: „Zarząd przełącza widok grupy na jedną spółkę jednym kliknięciem”.
 * ========================================================================= */

const M1_STEPS: StoryStep[] = [
  {
    id: 'group_view',
    label: 'Grupa — wszystkie',
    narrative: 'Zarząd widzi zagregowany stan całej grupy: 20 aktywnych szans, 14 projektów i 3 otwarte ryzyka.',
  },
  {
    id: 'cursor_select',
    label: 'Kursor: wybór spółki',
    narrative: 'Animowany kursor otwiera selektor podmiotów i klika spółkę zależną Aurora Energy.',
  },
  {
    id: 'single_view',
    label: 'Aurora Energy (pojedyncza)',
    narrative: 'Zarząd przełącza widok grupy na jedną spółkę jednym kliknięciem: liczby przeliczają się, inne spółki zwijają się.',
  },
  {
    id: 'return_group',
    label: 'Powrót do grupy',
    narrative: 'Jeden klik przywraca pełny widok strategiczny całej grupy i wszystkich jej podmiotów.',
  },
];

export function MockupM1ExecutiveScope({ extended = false }: { extended?: boolean }) {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M1_STEPS,
    stepDurationMs: 4600,
    defaultReducedStep: 0,
  });

  // Logika stanów kroków
  const isDropdownOpen = step === 1;
  const isSingleCompany = step === 2;
  const isReturn = step === 3;

  // Aktywny podmiot w nagłówku
  const currentEntityName =
    isSingleCompany
      ? 'Aurora Energy sp. z o.o.'
      : 'Grupa — wszystkie (3 spółki)';
  const currentEntityDot = isSingleCompany ? '#38BDF8' : '#4F6BFF';

  // Dane KPI zależne od wybranego widoku
  const kpiData = isSingleCompany
    ? {
        deals: '9 szans',
        dealsSub: '1 wymaga uwagi',
        projects: '6 projektów',
        projectsSub: 'Energetyka i OZE',
        overdue: '1 po terminie',
        overdueSub: 'Zadanie pomiarowe SN',
        risks: '1 otwarte',
        risksSub: 'Aparatura SN',
        contracts: '1 wygasa',
        contractsSub: 'Umowa serwisowa PV (28 dni)',
      }
    : {
        deals: '20 szans',
        dealsSub: '3 wymagają uwagi',
        projects: '14 projektów',
        projectsSub: '3 spółki operacyjne',
        overdue: '2 po terminie',
        overdueSub: '1 w Aurora · 1 w Velo',
        risks: '3 otwarte',
        risksSub: 'Każde ma właściciela',
        contracts: '3 wygasają',
        contractsSub: 'Alerty terminów aktywne',
      };

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M1: Przełącznik podmiotów i zagregowany pulpit zarządu GroupOS"
      className="relative rounded-2xl border border-slate-700/70 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      {/* Animowany kursor wskazujący selektor w kroku 1 i 3 */}
      {!reducedMotion && (
        <>
          {step === 1 && (
            <MockupCursor
              x="calc(100% - 190px)"
              y="68px"
              isClicking={progress > 50}
              visible={true}
            />
          )}
          {step === 3 && (
            <MockupCursor
              x="calc(100% - 190px)"
              y="22px"
              isClicking={progress > 50}
              visible={true}
            />
          )}
        </>
      )}

      {/* Pasek okna i przełącznik podmiotów */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-[11px] text-slate-300 tracking-wide">
            GroupOS · Pulpit zarządu
          </span>
        </div>

        {/* Selektor podmiotu z menu rozwijanym */}
        <div className="relative">
          <button
            type="button"
            onClick={() => selectStep(isSingleCompany ? 0 : 2)}
            aria-label={`Przełącznik podmiotu: ${currentEntityName}`}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#172033] border border-indigo-500/50 text-xs font-medium text-white shadow-sm transition-colors hover:border-indigo-400"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
              style={{ backgroundColor: currentEntityDot }}
            />
            <span className="transition-all duration-300">{currentEntityName}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180 text-indigo-300' : ''
              }`}
            />
          </button>

          {/* Symulowane menu rozwijane w kroku 1 */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-[#141C2E] border border-indigo-500/60 shadow-2xl p-1.5 z-40 text-xs space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Wybierz zakres widoku:
              </div>
              <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-between text-slate-300 hover:bg-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F6BFF]" />
                  <span>Grupa — wszystkie</span>
                </span>
              </div>
              <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-between bg-indigo-500/25 text-white font-medium border border-indigo-400/50">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Aurora Energy sp. z o.o.</span>
                </span>
                <Check className="w-3.5 h-3.5 text-indigo-300" />
              </div>
              <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                  <span>Nord Events sp. z o.o.</span>
                </span>
              </div>
              <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                  <span>Velo Auto sp. z o.o.</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5 zagregowanych kafli KPI ze płynnym tweenem liczb */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 transition-colors">
            <div className="text-[11px] text-slate-300 font-medium">Aktywne szanse</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums transition-all duration-300">
              {kpiData.deals}
            </div>
            <div className="mt-1 text-[11px] text-emerald-300">{kpiData.dealsSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 transition-colors">
            <div className="text-[11px] text-slate-300 font-medium">Projekty</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums transition-all duration-300">
              {kpiData.projects}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{kpiData.projectsSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 transition-colors">
            <div className="text-[11px] text-slate-300 font-medium">Zadania po terminie</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-amber-300 tabular-nums transition-all duration-300">
              {kpiData.overdue}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{kpiData.overdueSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 transition-colors">
            <div className="text-[11px] text-slate-300 font-medium">Ryzyka</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-rose-300 tabular-nums transition-all duration-300">
              {kpiData.risks}
            </div>
            <div className="mt-1 text-[11px] text-slate-300">{kpiData.risksSub}</div>
          </div>

          <div className="rounded-xl bg-[#161F31] border border-slate-800 p-3 col-span-2 sm:col-span-1 transition-colors">
            <div className="text-[11px] text-slate-300 font-medium">Umowy (wygasające w 30 dni)</div>
            <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white tabular-nums transition-all duration-300">
              {kpiData.contracts}
            </div>
            <div className="mt-1 text-[11px] text-indigo-300">{kpiData.contractsSub}</div>
          </div>
        </div>

        {/* Porównanie spółek + sygnały wymagające uwagi */}
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 rounded-xl bg-[#141C2C] border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#101726]">
              <span className="text-xs font-semibold text-white">
                {isSingleCompany
                  ? 'Aurora Energy sp. z o.o. — wyodrębniony podmiot'
                  : 'Podmioty w grupie — zestawienie dla zarządu'}
              </span>
              <span className="font-mono text-[10px] text-slate-400">Dane fikcyjne</span>
            </div>
            <div className="divide-y divide-slate-800/80 text-xs">
              {/* Spółka A: Aurora Energy */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 transition-all duration-300 ${
                  isSingleCompany
                    ? 'bg-indigo-950/20 border-l-2 border-indigo-400'
                    : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-[160px]">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#38BDF8]" />
                  <span className="font-medium text-white">Aurora Energy sp. z o.o.</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-slate-300 tabular-nums">
                  <span>9 szans</span>
                  <span className="text-slate-500">·</span>
                  <span>6 projektów</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    1 ryzyko · 1 umowa (28 dni)
                  </span>
                </div>
              </div>

              {/* Spółka B: Nord Events — zwija się gdy wybrana jest Aurora */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2 px-3.5 transition-all duration-300 ${
                  isSingleCompany
                    ? 'max-h-0 py-0 opacity-0 overflow-hidden border-none'
                    : 'max-h-16 py-2.5 opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-[160px]">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#A78BFA]" />
                  <span className="font-medium text-white">Nord Events sp. z o.o.</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-slate-300 tabular-nums">
                  <span>6 szans</span>
                  <span className="text-slate-500">·</span>
                  <span>5 projektów</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    Umowa najmu: 30 dni
                  </span>
                </div>
              </div>

              {/* Spółka C: Velo Auto — zwija się gdy wybrana jest Aurora */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2 px-3.5 transition-all duration-300 ${
                  isSingleCompany
                    ? 'max-h-0 py-0 opacity-0 overflow-hidden border-none'
                    : 'max-h-16 py-2.5 opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-[160px]">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#34D399]" />
                  <span className="font-medium text-white">Velo Auto sp. z o.o.</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-slate-300 tabular-nums">
                  <span>5 szans</span>
                  <span className="text-slate-500">·</span>
                  <span>3 projekty</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    1 zadanie po terminie
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl bg-[#141C2C] border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#101726]">
              <span className="text-xs font-semibold text-white">
                {isSingleCompany
                  ? 'Sygnały spółki: Aurora Energy'
                  : 'Sygnały na pulpicie grupy'}
              </span>
              <span className="font-mono text-[10px] text-indigo-300">
                {isSingleCompany ? '2 poz.' : '3 poz.'}
              </span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {/* Sygnał 1: RSK-012 (Aurora Energy) */}
              <div className="px-3.5 py-2.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-slate-300">RSK-012</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200">
                    Rejestr ryzyk · Wysoki
                  </span>
                </div>
                <div className="text-xs font-medium text-white leading-snug">
                  Ryzyko opóźnienia dostawy rozdzielnicy SN — etap II
                </div>
                <div className="text-[11px] text-slate-300">Aurora Energy sp. z o.o.</div>
              </div>

              {/* Sygnał 2: CRM-204 (Aurora Energy) */}
              <div className="px-3.5 py-2.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-slate-300">CRM-204</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200">
                    CRM · Wymagany krok
                  </span>
                </div>
                <div className="text-xs font-medium text-white leading-snug">
                  Wymaga uwagi: brak kontaktu 21 dni (Solaris Grid)
                </div>
                <div className="text-[11px] text-slate-300">Aurora Energy sp. z o.o.</div>
              </div>

              {/* Sygnał 3: CTR-018 (Nord Events) — ukryty w widoku pojedynczym */}
              <div
                className={`px-3.5 space-y-1 transition-all duration-300 ${
                  isSingleCompany
                    ? 'max-h-0 py-0 opacity-0 overflow-hidden border-none'
                    : 'max-h-20 py-2.5 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-slate-300">CTR-018</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200">
                    Rejestr umów · Alert 30 dni
                  </span>
                </div>
                <div className="text-xs font-medium text-white leading-snug">
                  Umowa najmu magazynu centralnego wygasa za 30 dni
                </div>
                <div className="text-[11px] text-slate-300">Nord Events sp. z o.o.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pasek narracji i postępu M1 */}
      <MockupStoryFooter
        steps={M1_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}

/* =========================================================================
 * M1-DEEP — Pulpit zarządu (Sekcja 7.5 #pulpit):
 * Pokazuje dedykowany widok jednej spółki zależnej (Aurora Energy)
 * z rozbiciem etapów, portfelem, szansami i kartami narzędziowymi.
 * Zgodnie z wytyczną Nit 9: różni się od widoku grupy w Hero.
 * ========================================================================= */
export function MockupM1ExecutiveDeepDive() {
  const [activeTab, setActiveTab] = useState<'overview' | 'deals' | 'stages'>('overview');

  return (
    <div
      role="region"
      aria-label="Makieta Pulpitu Zarządu: Widok pojedynczej spółki Aurora Energy sp. z o.o."
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      {/* Pasek nagłówka okna */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-[11px] text-slate-300 tracking-wide">
            GroupOS · Spółka: Aurora Energy sp. z o.o. · Widok operacyjny
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { id: 'overview', label: 'Przegląd spółki' },
            { id: 'deals', label: 'Lejek szans (9)' },
            { id: 'stages', label: 'Realizacja projektów (6)' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === t.id
                  ? 'bg-[#3554F2] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* KPI wybranej spółki */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5">
            <div className="text-[11px] text-slate-300">Wartość szans w toku</div>
            <div className="mt-1 font-mono text-base font-semibold text-white">1 420 000 PLN</div>
            <div className="mt-1 text-[11px] text-emerald-300">9 szans w lejkach</div>
          </div>
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5">
            <div className="text-[11px] text-slate-300">Aktywne projekty</div>
            <div className="mt-1 font-mono text-base font-semibold text-white">6 w realizacji</div>
            <div className="mt-1 text-[11px] text-sky-300">84% etapów w terminie</div>
          </div>
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5">
            <div className="text-[11px] text-slate-300">Zadania po terminie</div>
            <div className="mt-1 font-mono text-base font-semibold text-amber-300">1 zadanie</div>
            <div className="mt-1 text-[11px] text-slate-400">Pomiary rozdzielnicy</div>
          </div>
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5">
            <div className="text-[11px] text-slate-300">Umowy wygasające (30 dni)</div>
            <div className="mt-1 font-mono text-base font-semibold text-white">1 umowa</div>
            <div className="mt-1 text-[11px] text-indigo-300">Serwis PV · 28 dni do końca</div>
          </div>
        </div>

        {/* Projekty spółki Aurora */}
        <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white border-b border-slate-800 pb-2">
            <span>Bieżące projekty i etapy operacyjne (Aurora Energy)</span>
            <span className="font-mono text-[10px] text-slate-400">Widok zarządczy</span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'PRJ-042',
                name: 'Stacja transformatorowa SN — Etap II',
                stage: 'Próby i pomiary odbiorowe',
                progress: 75,
                owner: 'Piotr Zieliński',
                statusTone: 'sky',
              },
              {
                id: 'PRJ-045',
                name: 'Farma PV Południe — Uzgodnienia przyłączeniowe',
                stage: 'Kompletacja dokumentacji prawnej',
                progress: 40,
                owner: 'Karolina Nowak',
                statusTone: 'indigo',
              },
              {
                id: 'PRJ-048',
                name: 'Serwis turbin wiatrowych Baltic — Przegląd okresowy',
                stage: 'Odbiór protokołu serwisowego',
                progress: 90,
                owner: 'Tomasz Bąk',
                statusTone: 'emerald',
              },
            ].map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#101726] border border-slate-800 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{p.id}</span>
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Etap: {p.stage} · Odpowiedzialny: {p.owner}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-28 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 transition-all duration-300"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-indigo-200 tabular-nums w-8 text-right">
                    {p.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 karty narzędziowe pulpitu */}
        <div className="grid sm:grid-cols-3 gap-3 pt-1">
          <div className="rounded-xl bg-[#101726] border border-slate-800 px-3.5 py-3 space-y-1">
            <div className="text-[11px] text-slate-300 font-medium">Zapisane widoki i eksport</div>
            <div className="font-mono text-xs font-semibold text-white">
              Filtr: Realizacja Q4 Aurora
            </div>
            <div className="text-[11px] text-slate-400">
              Eksport z bieżącego widoku do formatu XLS/CSV
            </div>
          </div>
          <div className="rounded-xl bg-[#101726] border border-slate-800 px-3.5 py-3 space-y-1">
            <div className="text-[11px] text-slate-300 font-medium">Wyszukiwanie globalne (Cmd+K)</div>
            <div className="font-mono text-xs font-semibold text-white">
              Zakres: Spółka Aurora Energy
            </div>
            <div className="text-[11px] text-slate-400">
              Przeszukuje firmy, osoby, szanse, zadania i umowy
            </div>
          </div>
          <div className="rounded-xl bg-[#101726] border border-slate-800 px-3.5 py-3 space-y-1">
            <div className="text-[11px] text-slate-300 font-medium">Raport zaległości i terminów</div>
            <div className="font-mono text-xs font-semibold text-white">
              1 zadanie · 1 umowa (28 dni)
            </div>
            <div className="text-[11px] text-slate-400">
              Powiadomienia trafiają wyłącznie do zespołu spółki
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * M5 — Izolacja danych w grupie (3 kroki narracji)
 * 11. Izolacja (M5) — „ta sama baza, różne uprawnienia”:
 * po wejściu w viewport sama przełącza Prezes → Kierownik spółki A;
 * na Spółce B i C pojawia się kłódka z krótką animacją, a wiersze przygasają.
 * To najmocniejszy argument produktu — bezpośrednio pod paskiem referencji.
 * ========================================================================= */

const M5_STEPS: StoryStep[] = [
  {
    id: 'prezes_view',
    label: 'Prezes (cała grupa)',
    narrative: 'Prezes grupy (Marek Jaworski) posiada pełny wgląd we wszystkie 3 spółki, ich kontrakty i finanse.',
  },
  {
    id: 'switch_manager',
    label: 'Przełączenie: Kierownik Spółki A',
    narrative: 'Zmiana kontekstu użytkownika: system natychmiast aplikuje uprawnienia Karoliny Nowak (Kierownik Spółki A).',
  },
  {
    id: 'locked_view',
    label: 'Kłódka na Spółce B i C',
    narrative: 'Na Spółce B i C pojawia się kłódka: pracownik spółki A nie ma dostępu do danych ani umów pozostałych firm.',
  },
];

export function MockupM5AccessMatrix() {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M5_STEPS,
    stepDurationMs: 4400,
    defaultReducedStep: 2, // w trybie reduced motion pokazujemy stan izolacji
  });

  const isPrezesActive = step === 0;
  const isSwitching = step === 1;
  const isManagerLocked = step >= 1;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M5: Izolacja danych w grupie — Prezes vs Kierownik spółki A"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-indigo-300" />
          <span className="text-xs font-semibold text-white">
            Izolacja danych w grupie · Prezes vs Kierownik spółki zależnej
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">
          Silnik RBAC: Organizacja → Podmiot → Projekt → Rekord
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          {/* Użytkownik 1: Prezes */}
          <div
            className={`rounded-xl p-4 border transition-all duration-300 ${
              isPrezesActive
                ? 'bg-[#162038] border-indigo-400 shadow-lg ring-1 ring-indigo-400/30'
                : 'bg-[#12192B]/80 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <div className="font-semibold text-white text-sm">Marek Jaworski — Prezes</div>
                <div className="text-[11px] text-slate-400">Rola: Właściciel organizacji</div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 font-semibold">
                Cała grupa (3 spółki)
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Spółka A · Aurora Energy sp. z o.o.', dot: '#38BDF8' },
                { name: 'Spółka B · Nord Events sp. z o.o.', dot: '#A78BFA' },
                { name: 'Spółka C · Velo Auto sp. z o.o.', dot: '#34D399' },
              ].map((ent) => (
                <div
                  key={ent.name}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0E1422] border border-slate-800"
                >
                  <span className="flex items-center gap-2 text-slate-200">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: ent.dot }}
                    />
                    <span>{ent.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-300 font-medium">
                    <Check className="w-3 h-3" /> Pełny dostęp
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Użytkownik 2: Kierownik spółki A (Karolina Nowak) */}
          <div
            className={`rounded-xl p-4 border transition-all duration-300 ${
              isManagerLocked
                ? 'bg-[#162038] border-indigo-400 shadow-lg ring-1 ring-indigo-400/30'
                : 'bg-[#12192B]/80 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <div className="font-semibold text-white text-sm">
                  Karolina Nowak — Kierownik spółki A
                </div>
                <div className="text-[11px] text-slate-400">
                  Przypisanie: wyłącznie Aurora Energy sp. z o.o.
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 font-semibold">
                Tylko Spółka A
              </span>
            </div>

            <div className="space-y-2">
              {/* Spółka A: Dostęp aktywny */}
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0E1422] border border-emerald-500/50 shadow-sm">
                <span className="flex items-center gap-2 text-white font-medium">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#38BDF8]" />
                  <span>Spółka A · Aurora Energy sp. z o.o.</span>
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-300 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Dostęp aktywny
                </span>
              </div>

              {/* Spółka B: Kłódka z animacją */}
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 ${
                  isManagerLocked
                    ? 'bg-rose-950/20 border border-rose-500/40 opacity-50'
                    : 'bg-[#0E1422] border border-slate-800'
                }`}
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#A78BFA]" />
                  <span>Spółka B · Nord Events sp. z o.o.</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-rose-300 font-semibold">
                  <Lock
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isManagerLocked ? 'scale-110 text-rose-400' : ''
                    }`}
                  />
                  <span>Dostęp zablokowany</span>
                </span>
              </div>

              {/* Spółka C: Kłódka z animacją */}
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 ${
                  isManagerLocked
                    ? 'bg-rose-950/20 border border-rose-500/40 opacity-50'
                    : 'bg-[#0E1422] border border-slate-800'
                }`}
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#34D399]" />
                  <span>Spółka C · Velo Auto sp. z o.o.</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-rose-300 font-semibold">
                  <Lock
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isManagerLocked ? 'scale-110 text-rose-400' : ''
                    }`}
                  />
                  <span>Dostęp zablokowany</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MockupStoryFooter
        steps={M5_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}

/* =========================================================================
 * M2 — CRM: Szansa w lejku (3 kroki narracji)
 * 12. CRM (M2) — „system pilnuje następnego kroku”:
 * karta szansy przesuwa się do kolejnego etapu → pojawia się okno
 * „Wymagany następny krok” z datą → ten krok pojawia się jako zadanie
 * w „Moja praca”.
 * ========================================================================= */

const M2_STEPS: StoryStep[] = [
  {
    id: 'attention_card',
    label: '1. Brak kontaktu 21 dni',
    narrative: 'System wykrywa brak kontaktu: szansa DEAL-211 (Solaris Grid) oznaczona jako »Wymaga uwagi: brak kontaktu 21 dni«.',
  },
  {
    id: 'stage_move',
    label: '2. Przesunięcie + Wymagany krok',
    narrative: 'Karta przesuwa się do etapu Negocjacje: GroupOS wymaga podania konkretnej daty i opisu następnego kroku z klientem.',
  },
  {
    id: 'my_work_task',
    label: '3. Zadanie w »Moja praca«',
    narrative: 'Następny krok automatycznie staje się zaplanowanym zadaniem w widoku »Moja praca« i kalendarzu handlowca.',
  },
];

export function MockupM2CrmPipeline() {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M2_STEPS,
    stepDurationMs: 4600,
    defaultReducedStep: 2,
  });

  const isMovedStage = step >= 1;
  const isTaskCreated = step === 2;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M2: Szansa w lejku CRM, wymagany następny krok i zadanie w Moja praca"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            CRM · Lejek szans per podmiot + Oś aktywności
          </div>
          <div className="text-[11px] text-slate-400">
            Firmy i osoby jako osobne obiekty · Wymagany następny krok z datą
          </div>
        </div>
        <span className="font-mono text-[10px] text-indigo-300">
          Podmiot: Aurora Energy sp. z o.o.
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          {/* Etap 1: Oferta */}
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-semibold text-white">1. Oferta</span>
              <span className="font-mono text-[10px] text-slate-400">Aurora Energy</span>
            </div>

            {/* Karta DEAL-211 gdy jeszcze nie przesunięta */}
            {!isMovedStage && (
              <div className="rounded-lg p-3 bg-amber-950/30 border border-amber-500/60 space-y-2 animate-panel-in shadow-md">
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
                  <span>System wymaga zaplanowania następnego kroku</span>
                </div>
              </div>
            )}

            <div className="rounded-lg p-3 bg-[#182238] border border-slate-700/70 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>DEAL-215</span>
                <span>Nord Events</span>
              </div>
              <div className="text-xs font-medium text-white">
                Obsługa scenografii Kongresu Horyzont
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Następny krok: 18.11 · Prezentacja
              </div>
            </div>
          </div>

          {/* Etap 2: Negocjacje */}
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-semibold text-white">2. Negocjacje</span>
              <span className="font-mono text-[10px] text-indigo-300">Wymagany następny krok</span>
            </div>

            {/* Karta przesunięta do Negocjacji */}
            {isMovedStage && (
              <div className="rounded-lg p-3 bg-indigo-950/40 border border-indigo-400 space-y-2 shadow-lg animate-panel-in">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-indigo-200">DEAL-211 · Solaris Grid</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-semibold">
                    Krok zaplanowany
                  </span>
                </div>
                <div className="text-xs font-semibold text-white">
                  Solaris Grid — modernizacja rozdzielnicy SN
                </div>
                <div className="text-[11px] text-indigo-200 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Następny krok: 21.11 · Omówienie warunków</span>
                </div>
              </div>
            )}

            <div className="rounded-lg p-3 bg-[#182238] border border-slate-700/70 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>DEAL-198</span>
                <span>Velo Auto</span>
              </div>
              <div className="text-xs font-medium text-white">
                Wynajem 12 aut serwisowych dla ekipy
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Następny krok: 24.11 · Akceptacja umowy
              </div>
            </div>
          </div>

          {/* Kolumna 3: Moja praca oraz Oś aktywności */}
          <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Moja praca · Zadania handlowca</span>
                <span className="font-mono text-[10px] text-emerald-400">Automatyczny sync</span>
              </div>

              {/* Zadanie powstałe automatycznie z następnego kroku */}
              {isTaskCreated ? (
                <div className="rounded-lg p-2.5 bg-emerald-950/35 border border-emerald-500/60 space-y-1 animate-panel-in shadow-md">
                  <div className="flex items-center justify-between font-mono text-[10px] text-emerald-300">
                    <span className="font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Następny krok jako zadanie
                    </span>
                    <span>Termin: 21.11</span>
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Solaris Grid: Omówienie warunków umowy i akceptacja wyceny
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    Przypisany: Piotr Zieliński · Widok »Moja praca«
                  </div>
                </div>
              ) : (
                <div className="rounded-lg p-2.5 bg-[#101726] border border-slate-800 text-[11px] text-slate-400">
                  Przesuń szansę, aby wygenerować zadanie w widoku handlowca...
                </div>
              )}

              {/* Wpis w osi aktywności */}
              <div className="rounded-lg p-2.5 bg-[#101726] border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px] text-indigo-300">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> Rozmowa telefoniczna
                  </span>
                  <span>Przed chwilą</span>
                </div>
                <div className="text-[11px] text-slate-200">
                  Potwierdzono zakres techniczny rozdzielnicy SN i ustalono termin spotkania na 21.11.
                </div>
              </div>

              <div className="rounded-lg p-2 bg-[#0E1422] border border-slate-800/80 text-[10px] font-mono text-slate-400">
                Osoba: Tomasz Krawczyk (Solaris Grid sp. z o.o. + Prokurent w Solaris Inwestycje)
              </div>
            </div>
          </div>
        </div>
      </div>

      <MockupStoryFooter
        steps={M2_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}

/* =========================================================================
 * M3 — Praca: Kanban, Checklista i Push PWA (3 kroki narracji)
 * ========================================================================= */

const M3_STEPS: StoryStep[] = [
  {
    id: 'kanban_drag',
    label: '1. Przeciągnięto do W toku',
    narrative: 'Zadanie TSK-119 zostaje przeciągnięte do »W toku«, uruchamiając etap pomiarów stacji transformatorowej.',
  },
  {
    id: 'checklist_done',
    label: '2. Checklista krok po kroku',
    narrative: 'Kolejne pozycje checklisty pomiarowej odhaczają się, a pasek postępu etapu rośnie z 50% do 100%.',
  },
  {
    id: 'mention_push',
    label: '3. @wzmianka i Push PWA',
    narrative: 'Komentarz z @wzmianką natychmiast wyzwala powiadomienie push PWA na telefonie kierownika projektu.',
  },
];

export function MockupM3ProjectsAndCalendar() {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M3_STEPS,
    stepDurationMs: 4600,
    defaultReducedStep: 2,
  });

  const progressPct = step === 0 ? 50 : step === 1 ? 75 : 100;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M3: Kanban zadań, checklista, komentarz z @wzmianką i powiadomienie push"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            Projekt: Uruchomienie stacji transformatorowej · Etap II (Aurora Energy)
          </div>
          <div className="text-[11px] text-slate-400">
            Projekty → Etapy → Zadania → Podzadania → Checklisty · Komentarze z @wzmiankami
          </div>
        </div>
        <span className="font-mono text-[10px] text-emerald-300">
          Etap aktywny: 100% w terminie
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Pasek postępu etapu */}
        <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Postęp etapu: Próby i pomiary odbiorowe</span>
            <span className="font-mono text-xs text-emerald-300 tabular-nums font-semibold">
              {progressPct}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 items-start">
          {/* Kanban + Checklista */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#141C2E] border border-indigo-500/50 p-3 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" /> W toku
                </span>
                <span className="font-mono text-[10px] text-indigo-300">Zadanie przypisane</span>
              </div>

              <div className="rounded-lg bg-[#182238] border border-indigo-400/60 p-3 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-300">TSK-119 · Priorytet: Wysoki</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200">W toku</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  Pomiary ochronne i próby funkcjonalne rozdzielnicy
                </div>

                <div className="space-y-1.5 pt-1">
                  {[
                    { label: 'Sprawdzenie ciągłości przewodów ochronnych', done: true },
                    { label: 'Pomiar rezystancji izolacji torów SN', done: true },
                    { label: 'Test wyzwalaczy zabezpieczeń nadprądowych', done: step >= 1 },
                    { label: 'Kompletacja załączników pomiarowych do odbioru', done: step >= 2 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 px-2 py-1 rounded bg-[#101726] border border-slate-800 text-[11px] transition-colors"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] shrink-0 transition-colors ${
                          item.done
                            ? 'bg-emerald-400 text-slate-950 font-bold'
                            : 'border border-slate-600 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className={item.done ? 'line-through text-slate-400' : 'text-white'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Komentarze zadania */}
            <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-300" /> Komentarze zadania
                </span>
                <span className="font-mono text-[10px] text-slate-400">Aktywność</span>
              </div>

              <div className="rounded-lg bg-[#101726] border border-slate-800 p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
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

          {/* Telefon z powiadomieniem Push (PWA) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0B0F17] border-2 border-slate-700 p-3.5 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-2">
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

      <MockupStoryFooter
        steps={M3_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}

/* =========================================================================
 * M4 — Dokumenty i umowy (4 kroki narracji)
 * 13. Umowy (M4) — „termin nie umyka”:
 * oś czasu umowy przesuwa się do „30 dni do końca” → zapala się alert →
 * ten sam sygnał pojawia się na pulpicie grupy (spina M4 z M1).
 * ========================================================================= */

const M4_STEPS: StoryStep[] = [
  {
    id: 'folder_tree',
    label: '1. Drzewo i plik Poufne',
    narrative: 'Repozytorium organizuje pliki per podmiot i projekt: Aneks_cenowy_Solaris.pdf oznaczony jest jako »Poufne«.',
  },
  {
    id: 'audit_download',
    label: '2. Audyt pobrania (SHA-256)',
    narrative: 'Po pobraniu pliku poufnego w dzienniku audytu natychmiast pojawia się wpis ze sumą SHA-256 i czasem operacji.',
  },
  {
    id: 'timeline_30d',
    label: '3. Alert: 30 dni do końca',
    narrative: 'Oś czasu umowy przesuwa się do progu 30 dni: system automatycznie zapala ostrzeżenie o wygasaniu kontraktu.',
  },
  {
    id: 'sync_dashboard',
    label: '4. Sygnał na pulpicie grupy',
    narrative: 'Ten sam alert natychmiast zasila pulpit zarządu grupy: CTR-018 trafia do sygnałów wymagających uwagi (spina z M1).',
  },
];

export function MockupM4ContractsAndRisks() {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M4_STEPS,
    stepDurationMs: 4600,
    defaultReducedStep: 2,
  });

  const fileDownloaded = step >= 1;
  const isAlertActive = step >= 2;
  const isSyncedToM1 = step === 3;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M4: Drzewo folderów, poufne pliki z audytem, alert umowy 30 dni i spięcie z pulpitem grupy"
      className="rounded-2xl border border-slate-700/80 bg-[#0F1523] text-slate-100 shadow-2xl overflow-hidden select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-white">
            Repozytorium dokumentów, klasyfikacja „Poufne” i rejestr umów
          </div>
          <div className="text-[11px] text-slate-400">
            Drzewo folderów · Suma kontrolna SHA-256 · Rejestr umów spięty z pulpitem zarządu
          </div>
        </div>
        <span className="font-mono text-[10px] text-indigo-300">
          Rejestr ryzyk i umów
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Drzewo folderów: podmiot → projekt */}
          <div className="lg:col-span-5 rounded-xl bg-[#141C2E] border border-slate-800 p-3.5 space-y-2 text-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800">
              Struktura folderów organizacji
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
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/25 text-rose-200 text-[10px] shrink-0 font-semibold">
                      Poufne
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <Folder className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Nord Events sp. z o.o. (Podmiot)</span>
              </div>
            </div>
          </div>

          {/* Dziennik audytu + Rejestr umów */}
          <div className="lg:col-span-7 space-y-3">
            {/* Wpis w dzienniku audytu */}
            <div className="rounded-xl bg-[#141C2E] border border-slate-800 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-indigo-300" /> Dziennik audytu pobrań i zmian
                </span>
                <span className="font-mono text-[10px] text-slate-400">SHA-256 zweryfikowano</span>
              </div>
              <div
                className={`rounded-lg p-2.5 border text-xs transition-colors duration-300 ${
                  fileDownloaded
                    ? 'bg-indigo-950/35 border-indigo-400/60 text-white'
                    : 'bg-[#101726] border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-indigo-200">
                  <span>AUDIT-8841 · POBRANIE PLIKU POUFNEGO</span>
                  <span>14:32:10</span>
                </div>
                <div className="mt-1 font-medium">
                  Użytkownik Karolina Nowak pobrała plik „Aneks_cenowy_Solaris.pdf” (SHA-256: 9f86d...12a4)
                </div>
              </div>
            </div>

            {/* Rejestr umów z alertem 30 dni */}
            <div
              className={`rounded-xl border p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs transition-all duration-300 ${
                isAlertActive
                  ? 'bg-[#182136] border-amber-500/70 shadow-lg'
                  : 'bg-[#12192B] border-slate-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <ShieldAlert
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isAlertActive ? 'text-amber-300 animate-pulse' : 'text-slate-500'
                  }`}
                />
                <div>
                  <div className="font-semibold text-white">
                    Rejestr umów: Umowa najmu magazynu centralnego (Nord Events)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Oś czasu wygasania: 30 dni do końca kontraktu · Wymaga decyzji o przedłużeniu
                  </div>
                </div>
              </div>
              <span
                className={`font-mono text-[10px] px-2.5 py-1 rounded font-semibold border ${
                  isAlertActive
                    ? 'bg-amber-500/25 text-amber-200 border-amber-400/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Alert 30 dni wygasania
              </span>
            </div>

            {/* Sygnał spięty z pulpitem grupy (spina z M1) */}
            {isSyncedToM1 && (
              <div className="rounded-xl bg-[#101726] border border-indigo-500/50 p-3 text-xs space-y-1.5 animate-panel-in">
                <div className="flex items-center justify-between font-mono text-[10px] text-indigo-300">
                  <span>WIDOK ZARZĄDU · SYGNAŁ PRZEKAZANY DO M1</span>
                  <span>Aktywny alert grupy</span>
                </div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>CTR-018: Umowa najmu magazynu centralnego wygasa za 30 dni</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Ten sam sygnał pojawia się na zagregowanym pulpicie prezesa grupy w sekcji „Sygnały wymagające uwagi”.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MockupStoryFooter
        steps={M4_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}

/* =========================================================================
 * M6 — Hosting: SaaS vs Dedykowany VPS (Wektorowy diagram SVG)
 * ========================================================================= */
export function MockupM6SecurityDiagram() {
  return (
    <div
      role="img"
      aria-label="Diagram M6: Porównanie modelu współdzielonego w UE (SaaS) oraz dedykowanego serwera klienta w UE (VPS). Przepływy danych nie wychodzą poza granicę UE."
      className="rounded-2xl border border-slate-700/80 bg-[#0D1320] p-4 sm:p-6 shadow-2xl space-y-4 select-none"
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
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-100 border border-indigo-400/40 font-semibold">
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

/* =========================================================================
 * M7 — Teaser branżowy: Podwykonawcy (4 kroki narracji)
 * ========================================================================= */

const M7_STEPS: StoryStep[] = [
  {
    id: 'task',
    label: '1. Zadanie dla ekipy',
    narrative: 'Brygadzista otrzymuje zadanie na telefon: »Montaż tras kablowych — piętro 3« powiązane z umową i projektem.',
  },
  {
    id: 'photo',
    label: '2. Zdjęcia z budowy',
    narrative: 'Dodanie 4 zdjęć z budowy przed zakryciem bruzd: system rejestruje geolokalizację, autora i sumę kontrolną.',
  },
  {
    id: 'checklist',
    label: '3. Checklista etapu',
    narrative: 'Odhaczenie punktów kontrolnych: uchwyty ognioodporne co 60 cm i oznaczenie obwodów zrealizowane.',
  },
  {
    id: 'submit',
    label: '4. Zgłoś do odbioru',
    narrative: 'Zgłoszenie do protokołu odbioru: kierownik budowy otrzymuje powiadomienie, a etap jest gotowy do fakturowania.',
  },
];

export function MockupM7SubcontractorLoop() {
  const {
    containerRef,
    step,
    progress,
    isPaused,
    reducedMotion,
    selectStep,
    onMouseEnter,
    onMouseLeave,
  } = useStoryLoop({
    steps: M7_STEPS,
    stepDurationMs: 4400,
    defaultReducedStep: 3,
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Makieta M7: Podgląd telefonu brygadzisty (Wkrótce: beta) — Montaż tras kablowych — piętro 3"
      className="rounded-xl border border-slate-700/80 bg-[#0E131F]/90 text-slate-200 shadow-lg overflow-hidden select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-slate-800 bg-[#0B0F17]">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-slate-400" />
          <span className="font-mono text-xs text-slate-200 font-semibold">
            Widok telefonu brygadzisty: „Montaż tras kablowych — piętro 3”
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-200 border border-amber-400/40 font-semibold">
          Wkrótce: beta
        </span>
      </div>

      <div className="p-4">
        <div className="grid sm:grid-cols-4 gap-2.5">
          {M7_STEPS.map((s, idx) => {
            const isActive = step === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectStep(idx)}
                className={`text-left rounded-lg p-3 border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-800/90 border-slate-500 text-white shadow-md'
                    : 'bg-[#111726]/80 border-slate-800 text-slate-400'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-slate-400">{s.label}</div>
                  <div className="text-xs font-semibold text-white leading-snug">{s.narrative}</div>
                </div>
                {idx === 3 && (
                  <div className="mt-2.5 inline-flex items-center justify-center px-2.5 py-1 rounded bg-indigo-600 text-white font-mono text-[10px] font-semibold">
                    Zgłoś do odbioru →
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <MockupStoryFooter
        steps={M7_STEPS}
        currentStepIndex={step}
        progress={progress}
        isPaused={isPaused}
        onSelectStep={selectStep}
      />
    </div>
  );
}
