'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Gotowy na transformację swojej organizacji?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Skontaktuj się z nami i dowiedz się, jak możemy wspólnie przyspieszyć rozwój Twojej firmy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Umów bezpłatną konsultację
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Przeglądaj usługi
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
