import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, ArrowRight, CheckCircle2, ChevronRight, BarChart, Users, TrendingUp, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Rozwój przywództwa | Executive mentoring | Finarena',
    description: 'Wzmacniamy liderów i zespoły managerskie. Diagnoza, program rozwojowy i wdrożenie praktyk, które poprawiają wyniki organizacji.',
};

const scopeItems = [
    'Audyt kompetencji liderów i modelu decyzyjnego',
    'Program rozwoju liderów (1:1 + warsztaty)',
    'Narzędzia delegowania, feedbacku i egzekucji',
    'Wsparcie transformacji roli managera na leadera',
    'Mierniki efektywności przywództwa'
];

const resultsItems = [
    'Szybsze i bardziej spójne decyzje w organizacji',
    'Lepsza współpraca między działami',
    'Wyższa odpowiedzialność liderów za wynik',
    'Stabilniejszy rozwój firmy przy rosnącej skali'
];

const faqs = [
    {
        q: 'Dla kogo jest ta usługa?',
        a: 'Dla właścicieli firm, zarządów, managerów średniego i wyższego szczebla.'
    },
    {
        q: 'Jak długo trwa program?',
        a: 'Wersja podstawowa to 8–12 tygodni, z możliwością rozszerzenia do programu półrocznego.'
    },
    {
        q: 'Czy program da się połączyć z bieżącą pracą operacyjną?',
        a: 'Tak. Pracujemy na realnych sytuacjach z Twojej firmy, więc rozwój dzieje się „w trakcie”, nie obok biznesu.'
    }
];

export default function LeadershipServicePage() {
    return (
        <>
            <section className="bg-background-secondary pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6 mt-4">
                                Rozwój przywództwa, który przekłada się na wynik zespołu.
                            </h1>
                            <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
                                Wzmacniamy liderów, aby skutecznie prowadzili zmianę, podejmowali lepsze decyzje i budowali odpowiedzialność w organizacji.
                            </p>
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                            >
                                Umów darmową konsultację
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <Image src="/images/hero_leadership.png" alt="Leadership Solutions" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <Target className="w-8 h-8 text-red-500" />
                                Problem
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed border-l-4 border-red-500 pl-6 py-2 bg-red-50/50 rounded-r-lg">
                                Wzrost firmy często wyprzedza rozwój kompetencji liderów. Pojawia się chaos decyzyjny, mikrozarządzanie i spadek zaangażowania zespołu.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8 text-primary" />
                                Rozwiązanie
                            </h2>
                            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                                <p className="text-text-primary font-medium mb-4">Łączymy doradztwo strategiczne z praktyką managerską:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Diagnoza stylu przywództwa i wyzwań organizacyjnych</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Plan rozwoju liderów osadzony w realnych celach biznesowych</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Praca na konkretnych case’ach z firmy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Wdrożenie rytmów zarządczych i zasad odpowiedzialności</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-8">Zakres współpracy</h2>
                            <div className="space-y-4">
                                {scopeItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-border">
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        <span className="text-text-primary font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-primary" />
                                Oczekiwane rezultaty
                            </h2>
                            <div className="space-y-6">
                                {resultsItems.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-border flex items-center justify-center shrink-0">
                                            <span className="text-primary font-bold">{index + 1}</span>
                                        </div>
                                        <p className="text-text-secondary pt-2">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-12 text-center text-center flex items-center justify-center gap-3">
                        <Clock className="w-8 h-8 text-primary" />
                        Często zadawane pytania
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-background-secondary rounded-xl p-6 border border-border">
                                <h3 className="text-lg font-bold text-text-primary mb-3">{faq.q}</h3>
                                <p className="text-text-secondary">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Chcesz, żeby liderzy dowozili wynik, a nie tylko raportowali aktywność?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Umów rozmowę i sprawdź program rozwoju przywództwa dla Twojej organizacji.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Sprawdź program
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
