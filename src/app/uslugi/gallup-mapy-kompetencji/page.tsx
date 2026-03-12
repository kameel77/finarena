import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Target, BrainCircuit, BarChart, Clock, Layers, Users, Zap, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gallup Mapy Kompetencji dla firm | Finarena',
    description: 'Połącz talenty ludzi z celami biznesowymi. Strategiczne wdrożenie map kompetencji opartych na badaniu CliftonStrengths (Gallup) dla Twojego zespołu.',
};

const scopeItems = [
    {
        title: 'Diagnoza indywidualna CliftonStrengths',
        items: [
            'Profile talentów członków zespołu',
            'Opis naturalnych predyspozycji i ryzyk przeciążenia',
            'Wstępne hipotezy dot. stylu pracy i współpracy'
        ]
    },
    {
        title: 'Mapa kompetencji zespołu',
        items: [
            'Rozkład talentów na poziomie całego zespołu',
            'Identyfikacja luk i nadreprezentacji',
            'Analiza wpływu talentów na realizację celów biznesowych'
        ]
    },
    {
        title: 'Warsztat strategiczny dla zespołu i lidera',
        items: [
            'Wspólny język mocnych stron',
            'Ustalenie zasad komunikacji i współpracy',
            'Przełożenie talentów na role, odpowiedzialności i decyzje operacyjne'
        ]
    },
    {
        title: 'Rekomendacje wdrożeniowe',
        items: [
            'Kto i za co odpowiada w praktyce',
            'Jak delegować i feedbackować zgodnie z talentami',
            'Jak układać duet lider–zespół przy projektach o wysokiej stawce'
        ]
    },
    {
        title: 'Follow-up wdrożeniowy (6–12 tygodni)',
        items: [
            'Sesje 1:1 dla lidera',
            'Przegląd postępu zespołu',
            'Korekty i utrwalenie nowych nawyków pracy'
        ]
    }
];

const processSteps = [
    {
        title: 'Etap 1: Discovery i kontekst biznesowy',
        items: [
            'Definiujemy cele organizacyjne (np. tempo delivery, retencja, jakość współpracy)',
            'Ustalamy KPI sukcesu wdrożenia',
            'Mapujemy obszary największych napięć'
        ]
    },
    {
        title: 'Etap 2: Diagnoza Gallup',
        items: [
            'Wykonanie badania CliftonStrengths przez członków zespołu',
            'Analiza profili indywidualnych',
            'Przygotowanie materiału pod mapę kompetencji'
        ]
    },
    {
        title: 'Etap 3: Budowa mapy zespołowej',
        items: [
            'Łączymy profile w jeden obraz zespołu',
            'Identyfikujemy mocne i słabe punkty systemu pracy',
            'Przygotowujemy rekomendacje ról i odpowiedzialności'
        ]
    },
    {
        title: 'Etap 4: Warsztat wdrożeniowy',
        items: [
            'Zespół uczy się pracować na wspólnym języku talentów',
            'Porządkujemy reguły współpracy i decyzyjności',
            'Ustalamy konkretne rytuały operacyjne'
        ]
    },
    {
        title: 'Etap 5: Praca z liderami i stabilizacja zmian',
        items: [
            'Liderzy dostają narzędzia do świadomego delegowania',
            'Wzmacniamy komunikację, feedback i ownership',
            'Mierzymy postęp i korygujemy wdrożenie'
        ]
    }
];

const benefits = [
    {
        category: 'Dla organizacji',
        icon: <Briefcase className="w-6 h-6 text-primary" />,
        items: [
            'Wyższa efektywność pracy bez zwiększania headcountu',
            'Mniej kosztownych konfliktów i nieporozumień',
            'Szybsze decyzje i większa odpowiedzialność zespołów',
            'Lepsza retencja kluczowych ludzi',
            'Spójność między strategią firmy a codziennym sposobem działania'
        ]
    },
    {
        category: 'Dla zespołów',
        icon: <Users className="w-6 h-6 text-primary" />,
        items: [
            'Jasność ról i oczekiwań, większe zaufanie, lepsza komunikacja',
            'Mniejsze przeciążenie „nie swoimi” zadaniami',
            'Poczucie sensu i wpływu na rezultat',
            'Praktyczny model współpracy zamiast ogólnych deklaracji'
        ]
    },
    {
        category: 'Dla liderów',
        icon: <Zap className="w-6 h-6 text-primary" />,
        items: [
            'Precyzyjne delegowanie pod mocne strony',
            'Lepsze prowadzenie rozmów rozwojowych i feedbacku',
            'Mniejsza liczba eskalacji i „wąskich gardeł”',
            'Większa przewidywalność pracy zespołu',
            'Mocniejszy autorytet oparty na świadomym przywództwie'
        ]
    }
];

const whenToImplement = [
    'Przy skalowaniu firmy i wzroście zespołu',
    'Po reorganizacji lub zmianie struktury',
    'Gdy pojawia się spadek zaangażowania',
    'Gdy liderzy są przeciążeni operacyjnie',
    'Gdy firma chce przejść z „gaszenia pożarów” na przewidywalny model działania'
];

const faqs = [
    {
        q: 'Czy Gallup to test osobowości?',
        a: 'Nie. To narzędzie identyfikujące naturalne talenty i preferowane wzorce działania. Jego wartość pojawia się dopiero wtedy, gdy przełożymy wyniki na realne decyzje o współpracy, rolach i przywództwie.'
    },
    {
        q: 'Czy to działa tylko dla dużych organizacji?',
        a: 'Nie. W mniejszych firmach efekt bywa jeszcze szybszy, bo każdy członek zespołu ma większy wpływ na wynik biznesowy.'
    },
    {
        q: 'Ile trwa wdrożenie?',
        a: 'Zależnie od skali: od kilku tygodni dla jednego zespołu do programu wieloetapowego dla całej organizacji.'
    },
    {
        q: 'Jak mierzycie skuteczność?',
        a: 'Pracujemy na KPI ustalonych na starcie: tempo realizacji, jakość współpracy, zaangażowanie, retencja, poziom eskalacji, skuteczność liderów.'
    }
];

export default function GallupMapyKompetencjiPage() {
    return (
        <>
            <section className="bg-background-secondary pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6 mt-4">
                                Gallup Mapy Kompetencji<br />strategiczny LP dla firm, które chcą rosnąć bez chaosu.
                            </h1>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
                                To nie jest kolejny „miękki warsztat”. To proces, który łączy talenty ludzi z celami biznesowymi firmy: wynikiem, odpowiedzialnością, jakością współpracy i skutecznością liderów.
                            </p>

                            <div className="bg-white rounded-xl p-6 border border-border mb-10 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 text-primary">Name it. Claim it. Aim it.</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary"><strong className="text-text-primary">Name it:</strong> nazywamy naturalne talenty i wzorce działania zespołu</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary"><strong className="text-text-primary">Claim it:</strong> uczymy, jak świadomie z nich korzystać</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary"><strong className="text-text-primary">Aim it:</strong> kierujemy je na realne cele organizacji</span>
                                    </li>
                                </ul>
                            </div>

                            <Link
                                href="/kontakt"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                            >
                                Umów darmową konsultację
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border bg-gray-100 flex items-center justify-center">
                            {/* Placeholder for the hero image if there isn't one specifically for Gallup yet. */}
                            <Image src="/images/hero_mentoring.png" alt="Gallup Mapy Kompetencji" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-6">Dlaczego ta usługa jest kluczowa dla organizacji</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <Target className="w-8 h-8 text-red-500" />
                                Problem
                            </h3>
                            <div className="bg-red-50/50 rounded-2xl p-8 border-l-4 border-red-500">
                                <p className="text-lg text-text-secondary mb-4">
                                    W większości firm problemem nie jest brak kompetencji, tylko brak wspólnego języka pracy:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-text-secondary">ludzie nie rozumieją swoich stylów działania,</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-text-secondary">liderzy delegują „po równo”, zamiast zgodnie z mocnymi stronami,</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-text-secondary">zespoły tracą energię na tarcia i domysły,</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-text-secondary">role i odpowiedzialności są formalnie opisane, ale praktycznie rozmyte.</span>
                                    </li>
                                </ul>
                                <p className="text-text-primary font-medium">
                                    Efekt? Spadek tempa realizacji, frustracja, konflikty w komunikacji i trudność w utrzymaniu zaangażowania kluczowych osób.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <BrainCircuit className="w-8 h-8 text-primary" />
                                Rozwiązanie
                            </h3>
                            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 h-full flex items-center">
                                <div>
                                    <p className="text-xl text-text-primary font-medium mb-4">
                                        <strong className="text-primary font-bold">Gallup Mapy Kompetencji</strong> porządkują ten obszar systemowo.
                                    </p>
                                    <p className="text-text-secondary">
                                        Dzięki naszemu procesowi, naturalne talenty członków Twoich zespołów stają się przewidywalnym i łatwym w zarządzaniu zasobem biznesowym, który pomaga realizować strategię firmy bez chaosu i wypalenia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-6">Co obejmuje usługa (pełny zakres)</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scopeItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                    <span className="text-primary font-bold text-xl">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-4">{item.title}</h3>
                                <ul className="space-y-3">
                                    {item.items.map((subItem, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
                                            <span className="text-text-secondary text-sm">{subItem}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-12">Jak wygląda proces (krok po kroku)</h2>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                                {processSteps.map((step, index) => (
                                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background-secondary p-6 rounded-xl border border-border">
                                            <h3 className="font-bold text-text-primary mb-3">{step.title}</h3>
                                            <ul className="space-y-2">
                                                {step.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                                                        <span className="text-sm text-text-secondary">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="sticky top-24">
                                <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
                                    <BarChart className="w-8 h-8 text-primary" />
                                    Korzyści z wdrożenia
                                </h2>
                                <div className="space-y-6">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="bg-background-secondary rounded-xl p-6 border border-border">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                                                    {benefit.icon}
                                                </div>
                                                <h3 className="text-lg font-bold text-text-primary">{benefit.category}</h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {benefit.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                                                        <span className="text-sm text-text-secondary">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-primary" />
                                        Kiedy warto wdrożyć mapy kompetencji?
                                    </h3>
                                    <ul className="space-y-2">
                                        {whenToImplement.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background-secondary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-12 text-center flex items-center justify-center gap-3">
                        <Clock className="w-8 h-8 text-primary" />
                        Najczęstsze pytania (FAQ)
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 border border-border shadow-sm">
                                <h3 className="text-lg font-bold text-text-primary mb-3 pr-8">{faq.q}</h3>
                                <p className="text-text-secondary">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Umów konsultację strategiczną Gallup Mapy Kompetencji
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Sprawdź, jak przełożyć talenty Twoich ludzi na lepsze wyniki organizacji, silniejsze zespoły i skuteczniejsze przywództwo. Zaczynamy od diagnozy i planu wdrożenia dopasowanego do celów Twojej firmy.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Rozpocznij współpracę
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
