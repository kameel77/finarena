import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Settings, ArrowRight, CheckCircle2, ChevronRight, Target, Workflow, BarChart, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Automatyzacje procesów | Integracje i workflow | Finarena',
    description: 'Projektujemy automatyzacje, które skracają czas pracy zespołów i redukują błędy. Integracje, workflow i wdrożenia end-to-end.',
};

const scopeItems = [
    'Audyt procesów operacyjnych (sprzedaż, obsługa, administracja)',
    'Integracje narzędzi (CRM, formularze, e-mail, kalendarz, ERP)',
    'Automatyczne powiadomienia, routing leadów i tasków',
    'Dashboardy statusów i SLA',
    'Dokumentacja procesowa i szkolenie zespołu'
];

const resultsItems = [
    'Skrócenie czasu obsługi procesów o 30–60%',
    'Mniej błędów operacyjnych i mniej pracy „ręcznej”',
    'Szybsza reakcja na zapytania klientów i leady',
    'Przewidywalny, skalowalny model operacyjny'
];

const faqs = [
    {
        q: 'Czy automatyzacja wymaga wymiany obecnych narzędzi?',
        a: 'Nie zawsze. Zazwyczaj wykorzystujemy obecny stack i dokładamy brakujące połączenia.'
    },
    {
        q: 'Jak szybko zobaczymy efekt?',
        a: 'Pierwsze usprawnienia zwykle w 2–4 tygodnie od startu projektu.'
    },
    {
        q: 'Czy zespół poradzi sobie po wdrożeniu?',
        a: 'Tak. Każde wdrożenie kończymy prostą dokumentacją i przeszkoleniem właścicieli procesu.'
    }
];

export default function AutomationServicePage() {
    return (
        <>
            <section className="bg-background-secondary pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6 mt-4">
                                Automatyzacje, które odciążają zespół i skalują operacje.
                            </h1>
                            <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
                                Usuwamy ręczne, powtarzalne czynności i budujemy przepływy pracy, które działają szybciej, taniej i bez chaosu.
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
                            <Image src="/images/hero_automation.png" alt="Automation Solutions" fill className="object-cover" />
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
                                Procesy są rozproszone między arkuszami, e-mailami i komunikatorami. Zespół traci czas na przepisywanie danych, kontrolę statusów i gaszenie błędów. Skalowanie biznesu zwiększa tylko poziom przeciążenia.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <Workflow className="w-8 h-8 text-primary" />
                                Rozwiązanie
                            </h2>
                            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                                <p className="text-text-primary font-medium mb-4">Tworzymy automatyzacje end-to-end:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Mapowanie procesu i identyfikacja wąskich gardeł</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Projekt docelowego workflow</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Wdrożenie automatycznych reguł i integracji</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">Monitoring jakości + optymalizacja po starcie</span>
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
                        Masz procesy, które „zjadają” czas zespołu?
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Umów konsultację i zobacz plan automatyzacji na najbliższe 30 dni.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Zobacz plan automatyzacji
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
