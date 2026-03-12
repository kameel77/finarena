'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: 'BF Agencja', logo: '/images/clients/bfagencja-logo.jpeg' },
  { name: 'BHZ', logo: '/images/clients/bhz-logo.png' },
  { name: 'iDOXXY', logo: '/images/clients/idoxxy-logo.webp' },
  { name: 'KGZ', logo: '/images/clients/kgz-logo-long.svg' },
  { name: 'LUX MED', logo: '/images/clients/luxmed-logo.jpg' },
  { name: 'Motolia', logo: '/images/clients/motolia-logo.png' },
  { name: 'Satto', logo: '/images/clients/satto-logo.svg' },
  { name: 'Sharp', logo: '/images/clients/sharp-logo.svg' },
  { name: 'Toyota', logo: '/images/clients/toyota-b.png' },
  { name: 'Votenti', logo: '/images/clients/votenti-logo.svg' },
];

export function ClientsSection() {
  return (
    <section className="bg-white py-12 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-light text-sm mb-8">Zaufali nam</p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative w-32 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 150px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
