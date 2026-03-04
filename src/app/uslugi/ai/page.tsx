import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, ArrowRight, CheckCircle2, ChevronRight, BrainCircuit, Target, BarChart, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI dla biznesu | Wdrożenia AI z mierzalnym ROI | Finarena',
    description: 'Projektujemy i wdrażamy AI, które realnie poprawia wyniki operacyjne. Audyt, strategia, implementacja i adopcja zespołu w 4–8 tygodni.',
};

const scopeItems = [
    'Audyt gotowości AI (procesy, dane, kompetencje)',
    'Strategia wdrożenia AI na 90 dni',
    'Budowa asystentów AI (sprzedaż, obsługa, back-office)',
    'Automatyzacja analizy danych i raportowania',
    'Warsztaty dla zespołu + playbook operacyjny'
];

const resultsItems = [
    'Krótszy czas realizacji powtarzalnych zadań (typowo 20–50%)',
    'Wyższa jakość decyzji dzięki szybszemu dostępowi do informacji',
    'Zmniejszenie obciążenia zespołów operacyjnych',
    'Realny plan skalowania AI na kolejne obszary firmy'
];

const faqs = [
    {
        q: 'Ile trwa pierwsze wdrożenie AI?',
        a: 'Najczęściej 4–8 tygodni do pierwszego działającego rozwiązania i pierwszych wskaźników efektywności.'
    },
    {
        q: 'Czy musimy mieć własny dział data science?',
        a: 'Nie. Projektujemy rozwiązania tak, by były utrzymywalne przez zespół biznesowo-operacyjny.'
    },
    {
        q: 'Jak mierzymy sukces wdrożenia?',
        a: 'Ustalamy KPI na starcie (czas procesu, koszt, jakość, konwersja) i raportujemy postęp co tydzień.'
    }
];

export default function AIServicePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-background-secondary pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6 mt-4">
                                AI, które pracuje na wynik, nie na prezentację.
                            </h1>
                            <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
                                Projektujemy i wdrażamy rozwiązania AI dla firm, które chcą szybciej podejmować decyzje, skrócić czas pracy zespołów i podnieść jakość obsługi klienta.
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
                            <Image src="/images/hero_ai.png" alt="AI Solutions" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem & Solution Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <Target className="w-8 h-8 text-red-500" />
                                Problem
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed border-l-4 border-red-500 pl-6 py-2 bg-red-50/50 rounded-r-lg">
                                W wielu firmach AI kończy się na pojedynczych eksperymentach: brak priorytetów biznesowych, brak właściciela procesu, brak mierzalnych efektów. Efekt to narzędzia, które „są”, ale nie wpływają na wynik operacyjny.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <BrainCircuit className="w-8 h-8 text-primary" />
                                Rozwiązanie
                            </h2>
                            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                                <p className="text-text-primary font-medium mb-4">W Finarena prowadzimy wdrożenie AI od diagnozy do działania produkcyjnego:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Wybór 2–3 use case’ów o najwyższym ROI</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Projekt rozwiązania dopasowanego do procesów firmy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Integracja z narzędziami, z których zespół już korzysta</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Testy, adopcja i pomiar efektów po wdrożeniu</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scope & Results */}
            <section className="py-20 bg-background-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        {/* Zakres */}
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

                        {/* Rezultaty */}
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
                                <BarChart className="w-8 h-8 text-primary" />
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

            {/* FAQ */}
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

            {/* CTA */}
            <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Chcesz sprawdzić, gdzie AI da najszybszy zwrot w Twojej firmie?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Umów 45-minutową konsultację i odbierz listę priorytetowych use case’ów.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Umów konsultację
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
