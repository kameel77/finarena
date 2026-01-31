'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

const features = [
  'Ekspertyzę techniczną w AI i automatyzacji',
  'Certyfikowane kompetencje w metodologii Gallup',
  'Doświadczenie w transformacji kultury organizacyjnej',
  'Indywidualne podejście do każdego klienta',
];

export function ApproachSection() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-6">
              Nasze podejście
            </span>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              Technologia i ludzie - idealne połączenie
            </h2>
            
            <p className="text-text-secondary mb-4">
              Wierzymy, że prawdziwa transformacja biznesowa wymaga równowagi między zaawansowanymi technologiami a rozwojem kompetencji zespołowych.
            </p>
            
            <p className="text-text-secondary mb-6">
              Nie wdrażamy rozwiązań technologicznych w izolacji - zawsze towarzyszy im rozwój kultury organizacyjnej i kompetencji pracowników.
            </p>

            <p className="font-medium text-text-primary mb-4">Nasz unikalny model łączy:</p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/uslugi"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Poznaj szczegóły
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                alt="Strategia biznesowa"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
