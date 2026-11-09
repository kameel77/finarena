import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Shield } from 'lucide-react';
import { getAllProducts } from '@/content/products';

export const metadata: Metadata = {
  title: 'Produkty Finarena — Oprogramowanie dla grup spółek i firm B2B',
  description:
    'Poznaj autorskie produkty software’owe Finarena Sp. z o.o., w tym GroupOS — system operacyjny dla grup spółek z opcją dedykowanego serwera VPS.',
  alternates: { canonical: '/produkty' },
};

export default function ProductsHubPage() {
  const products = getAllProducts({ includeNoindex: false });

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <header className="border-b border-slate-800 bg-[#0B0F17]/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#4F6BFF] flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </span>
            <span className="font-semibold text-white">Produkty Finarena</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Wróć na finarena.pl</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="max-w-2xl space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-indigo-300">
            Finarena Sp. z o.o. · Produkty własne
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Systemy operacyjne dla wymagających organizacji.
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Każdy produkt powstaje z realnych wdrożeń i może działać w chmurze w UE albo na
            odizolowanym, dedykowanym serwerze VPS klienta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/produkty/${p.slug}`}
              className="group rounded-2xl border border-slate-800 hover:border-[#4F6BFF] bg-[#121826] p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    {p.hero.eyebrow}
                  </span>
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {p.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {p.shortDescription}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 group-hover:text-white">
                <span>Zobacz stronę produktu {p.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-[#080B11] py-8 text-xs text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Finarena Sp. z o.o.</span>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white">
              finarena.pl
            </Link>
            <Link href="/polityka-prywatnosci" className="hover:text-white">
              Polityka prywatności
            </Link>
            <Link href="/kontakt" className="hover:text-white">
              Kontakt
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
