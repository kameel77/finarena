'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Settings, Code2, Target, BarChart3, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'Rozwiązania AI',
    description: 'Wdrażamy zaawansowane rozwiązania oparte o sztuczną inteligencję, które transformują sposób działania Twojej firmy.',
    href: '/uslugi#ai',
  },
  {
    icon: Settings,
    title: 'Automatyzacja Procesów',
    description: 'Optymalizujemy i automatyzujemy procesy biznesowe, eliminując zbędne działania i zwiększając efektywność.',
    href: '/uslugi#automation',
  },
  {
    icon: Code2,
    title: 'POC/MVP Development',
    description: 'Tworzymy prototypy i minimalne wersje produktów, które pozwalają szybko zweryfikować pomysły biznesowe.',
    href: '/uslugi#mvp',
  },
  {
    icon: Target,
    title: 'Rozwój Przywództwa',
    description: 'Budujemy kompetencje liderskie w zespołach, wspierając transformację menedżerów w inspirujących liderów.',
    href: '/uslugi#leadership',
  },
  {
    icon: BarChart3,
    title: 'Mapy Kompetencji Gallup',
    description: 'Tworzymy szczegółowe mapy kompetencji oparte o Gallup Strengths, optymalizując skład zespołów i rozwój talentów.',
    href: '/gallup',
    featured: true,
  },
  {
    icon: Lightbulb,
    title: 'Innowacje i Kultura',
    description: 'Wdrażamy kulturę innowacyjności i odpowiedzialności, która napędza wzrost i zaangażowanie pracowników.',
    href: '/uslugi#culture',
  },
];

export function ServicesSection() {
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
            Kompleksowe rozwiązania dostosowane do Twoich potrzeb
          </h2>
          <p className="text-lg text-text-secondary">
            Połączenie technologii, automatyzacji i rozwoju organizacyjnego dla zrównoważonego wzrostu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={service.href}
                className={`block h-full p-8 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 ${
                  service.featured
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-primary'
                    : 'bg-background-secondary border-border hover:border-primary'
                }`}
              >
                {service.featured && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4">
                    Polecane
                  </span>
                )}
                <service.icon className={`w-10 h-10 mb-4 ${service.featured ? 'text-white' : 'text-primary'}`} />
                <h3 className={`text-xl font-semibold mb-3 ${service.featured ? 'text-white' : 'text-text-primary'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm mb-4 ${service.featured ? 'text-white/90' : 'text-text-secondary'}`}>
                  {service.description}
                </p>
                <span className={`inline-flex items-center text-sm font-medium ${
                  service.featured ? 'text-white' : 'text-primary'
                }`}>
                  Dowiedz się więcej
                  <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
