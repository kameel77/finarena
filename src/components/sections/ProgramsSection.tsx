'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

const programs = [
  {
    id: 'executive',
    title: 'Executive Mentoring',
    subtitle: 'Indywidualny mentoring dla kadry zarządzającej',
    description: 'Program indywidualnego mentoringu dla członków zarządu i dyrektorów, łączący doradztwo strategiczne z rozwojem kompetencji przywódczych.',
    features: [
      'Regularne sesje 1-on-1 z doświadczonym mentorem',
      'Analiza mocnych stron i obszarów rozwoju',
      'Wsparcie w podejmowaniu trudnych decyzji strategicznych',
      'Networking z innymi liderami',
    ],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    badge: 'Premium',
  },
  {
    id: 'digital',
    title: 'Transformacja Cyfrowa',
    subtitle: 'Kompleksowe wdrożenie rozwiązań AI i automatyzacji',
    description: 'Kompleksowy program transformacji cyfrowej, obejmujący audyt, strategię i wdrożenie rozwiązań AI oraz automatyzacji procesów.',
    features: [
      'Audyt dojrzałości cyfrowej organizacji',
      'Strategia transformacji cyfrowej',
      'Wdrożenie rozwiązań AI i automatyzacji',
      'Szkolenia dla zespołów',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    badge: 'Popularne',
  },
  {
    id: 'audit',
    title: 'Audyt Kompetencji',
    subtitle: 'Analiza i optymalizacja struktury kompetencji w firmie',
    description: 'Szczegółowy audyt kompetencji oparty o metodologię Gallup Strengths, pozwalający zoptymalizować strukturę zespołów i procesy rekrutacyjne.',
    features: [
      'Testy Gallup dla pracowników',
      'Mapy kompetencji zespołów',
      'Rekomendacje optymalizacyjne',
      'Plany rozwoju indywidualnego',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    badge: 'Polecane',
  },
  {
    id: 'innovation',
    title: 'Bootcamp Innowacyjności',
    subtitle: 'Intensywny program budowania kultury innowacji',
    description: 'Intensywny, warsztatowy program dla zespołów, który wprowadza kulturę innowacyjności i uczy metodologii Design Thinking.',
    features: [
      'Warsztaty Design Thinking',
      'Budowanie kultury innowacji',
      'Narzędzia i metody pracy innowacyjnej',
      'Realne projekty biznesowe',
    ],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop',
    badge: 'Intensywne',
  },
];

export function ProgramsSection() {
  const [activeProgram, setActiveProgram] = useState(programs[0]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Programy rozwojowe dla Twojej organizacji
          </h2>
          <p className="text-lg text-text-secondary">
            Eksperymentalne i transformacyjne programy szkoleniowe oraz doradcze
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Program List */}
          <div className="lg:col-span-2 space-y-4">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveProgram(program)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  activeProgram.id === program.id
                    ? 'border-primary bg-white shadow-md'
                    : 'border-border bg-background-secondary hover:border-primary/50'
                }`}
              >
                <h3 className="font-semibold text-text-primary mb-1">{program.title}</h3>
                <p className="text-sm text-text-secondary">{program.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Program Detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-background-secondary rounded-xl p-8 border border-border"
              >
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-4">
                  {activeProgram.badge}
                </span>
                
                <div className="rounded-lg overflow-hidden mb-6">
                  <Image
                    src={activeProgram.image}
                    alt={activeProgram.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-4">{activeProgram.title}</h3>
                <p className="text-text-secondary mb-6">{activeProgram.description}</p>

                <ul className="space-y-3 mb-8">
                  {activeProgram.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Dowiedz się więcej
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
