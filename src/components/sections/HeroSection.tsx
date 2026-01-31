'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Building2, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-background-secondary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-6">
              Doradztwo biznesowe i transformacja cyfrowa
            </span>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight mb-6">
              Przyspieszamy rozwój Twojej firmy przez{' '}
              <span className="text-primary">technologię</span> i{' '}
              <span className="text-primary">ludzi</span>
            </h1>
            
            <p className="text-lg text-text-secondary mb-8 max-w-xl">
              Łączymy świat sztucznej inteligencji, automatyzacji procesów oraz rozwoju kompetencji i kultury organizacyjnej, aby Twój biznes osiągnął nowy poziom efektywności.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Rozpocznij transformację
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/uslugi"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-text-primary rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Poznaj nasze usługi
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-text-secondary">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">Indywidualne podejście</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm">Dla firm każdej wielkości</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm">Szybkie wdrożenia</span>
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Zespół w pracy"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 rounded-2xl overflow-hidden shadow-lg hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Współpraca biznesowa"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
