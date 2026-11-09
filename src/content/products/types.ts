export type FeatureLinearStatus = 'Done' | 'In Review';

export interface FeatureTraceItem {
  feature: string;
  linearIssues: string[];
  status: FeatureLinearStatus;
  sectionRef: string;
}

export interface ProductTheme {
  bgDark: string;
  bgDarkElevated: string;
  bgDarkCard: string;
  bgLight: string;
  bgLightSubtle: string;
  surfaceLight: string;
  textOnDark: string;
  textMutedOnDark: string;
  textOnLight: string;
  textMutedOnLight: string;
  accent: string;
  accentOnLight: string;
  accentHover: string;
  accentSoftDark: string;
  accentSoftLight: string;
  borderDark: string;
  borderLight: string;
  statusGreen: string;
  statusGreenBg: string;
  statusAmber: string;
  statusAmberBg: string;
  statusRed: string;
  statusRedBg: string;
  fontSans: string;
  fontMono: string;
  radiusCard: string;
  radiusButton: string;
}

export interface ProductNavAnchor {
  id: string;
  label: string;
}

export interface ProductHeroConfig {
  eyebrow: string;
  h1Variants: {
    a: string;
    b: string;
  };
  lead: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  microcopy: string;
}

export interface ProductReferenceItem {
  name: string;
  label: string;
  role: string;
  logoSvg: 'east-gate' | 'east-gate-placeholder' | 'generic-placeholder';
  logoPath?: string;
}

export interface ProductProblemCard {
  id: string;
  title: string;
  description: string;
  symptomTag: string;
}

export interface ProductHowItWorksStep {
  id: string;
  stepNumber: string;
  label: string;
  title: string;
  bullets: string[];
  mockupId: 'M1-M5' | 'M2' | 'M3' | 'M4';
  linearRefs?: string[];
}

export interface ProductIndustryCard {
  id: string;
  title: string;
  pain: string;
  solution: string;
  iconName:
    | 'Wrench'
    | 'Building2'
    | 'Cpu'
    | 'CalendarRange'
    | 'Car'
    | 'Briefcase'
    | 'ShieldCheck';
}

export interface ProductSecurityFeature {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'Shield'
    | 'Lock'
    | 'FileSpreadsheet'
    | 'History'
    | 'DatabaseBackup'
    | 'HardDrive'
    | 'KeyRound';
  linearRef?: string;
}

export interface ProductCooperationModel {
  id: string;
  name: string;
  badge: string;
  forWhom: string;
  highlights: string[];
  ctaLabel: string;
  hostingPreferenceValue: string;
  featured?: boolean;
}

export interface ProductOnboardingStep {
  step: string;
  title: string;
  description: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductConfig {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  noindex?: boolean;
  demoBookingUrl?: string;
  contactRecipientEmail: string;
  theme: ProductTheme;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    ogTitle: string;
    ogSubtitle: string;
  };
  navAnchors: ProductNavAnchor[];
  hero: ProductHeroConfig;
  references: {
    heading: string;
    items: ProductReferenceItem[];
  };
  problem: {
    eyebrow: string;
    h2: string;
    intro: string;
    cards: ProductProblemCard[];
  };
  howItWorks: {
    eyebrow: string;
    h2: string;
    intro: string;
    steps: ProductHowItWorksStep[];
  };
  executiveDashboard: {
    eyebrow: string;
    h2: string;
    description: string;
    highlights: { label: string; detail: string; linearRef?: string }[];
  };
  forWhom: {
    eyebrow: string;
    h2: string;
    orgTypesTitle: string;
    orgTypes: string[];
    industriesTitle: string;
    industries: ProductIndustryCard[];
    profileNote: string;
    betaCard: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      painPoints: string[];
      ctaLabel: string;
      ctaHref: string;
    };
    notForNote: {
      title: string;
      description: string;
    };
  };
  security: {
    eyebrow: string;
    h2: string;
    intro: string;
    comparisonCards: {
      id: 'cloud' | 'vps';
      badge: string;
      title: string;
      subtitle: string;
      points: string[];
      highlighted?: boolean;
    }[];
    whyVpsTitle: string;
    whyVpsBullets: string[];
    featuresTitle: string;
    features: ProductSecurityFeature[];
    rodoBlock: {
      title: string;
      bullets: string[];
    };
  };
  cooperationModels: {
    eyebrow: string;
    h2: string;
    intro: string;
    cards: ProductCooperationModel[];
    pricingNote: string;
  };
  onboarding: {
    eyebrow: string;
    h2: string;
    intro: string;
    steps: ProductOnboardingStep[];
  };
  formSection: {
    eyebrow: string;
    h2: string;
    intro: string;
    tabs: {
      demo: { label: string; badge: string; submitLabel: string };
      beta: { label: string; badge: string; submitLabel: string };
    };
    rodoConsentText: string;
    thankYou: {
      title: string;
      message: string;
      bookingPrompt?: string;
      bookingCtaLabel: string;
      betaMessage?: string;
    };
  };
  faq: {
    eyebrow: string;
    h2: string;
    items: ProductFaqItem[];
  };
  finalCta: {
    h2: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  featureList?: string[];
  traceability?: FeatureTraceItem[];
}
