'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '150+', label: 'Wdrożonych projektów AI' },
  { value: '50+', label: 'Zadowolonych klientów' },
  { value: '500+', label: 'Przeprowadzonych audytów Gallup' },
  { value: '98%', label: 'Poziom rekomendacji' },
];

export function StatsSection() {
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
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              Dowodzimy doskonałością doradztwa i transformacji
            </h2>
            <p className="text-text-secondary">
              Zwiększamy produktywność organizacji i napędzamy zrównoważony wzrost. Nasze sukcesy i opinie klientów są dowodem realnych rezultatów osiąganych dzięki naszym specjalistycznym usługom.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <span className="block text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-text-secondary">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
