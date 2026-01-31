'use client';

import { motion } from 'framer-motion';

const clients = [
  'TechCorp', 'InnovateSA', 'FutureBank', 'DataFlow', 'CloudNet'
];

export function ClientsSection() {
  return (
    <section className="bg-white py-12 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-light text-sm mb-8">Zaufali nam</p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-text-light opacity-60 hover:opacity-100 transition-opacity"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
