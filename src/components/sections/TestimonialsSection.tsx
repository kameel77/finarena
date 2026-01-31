'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Wdrożenie rozwiązań AI przez Finarena zmieniło sposób, w jaki działamy. Automatyzacja procesów zaoszczędziła nam 40% czasu, a zespół jest bardziej zaangażowany niż kiedykolwiek wcześniej.',
    author: 'Michał Kowalski',
    role: 'CEO, TechFlow SA',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
  },
  {
    quote: 'Mapy kompetencji oparte o Gallup Strengths pomogły nam zrozumieć prawdziwy potencjał naszych zespołów. Reorganizacja struktury była strzałem w dziesiątkę - produktywność wzrosła o 35%.',
    author: 'Anna Nowak',
    role: 'Dyrektor HR, InnovateCorp',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
  },
  {
    quote: 'Program mentoringu dla naszego zespołu managerskiego przeszedł nasze oczekiwania. Finarena potrafi połączyć techniczne aspekty transformacji z rozwojem ludzi - to rzadka kombinacja.',
    author: 'Piotr Wiśniewski',
    role: 'CTO, DataSystems',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    quote: 'Kultura innowacyjności, którą wspólnie zbudowaliśmy, przynosi efekty każdego dnia. Pracownicy są bardziej proaktywni, a nowe pomysły pojawiają się naturalnie w każdym dziale.',
    author: 'Katarzyna Zielińska',
    role: 'Dyrektor Operacyjny, FutureBank',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
  },
];

export function TestimonialsSection() {
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
            Opinie i rekomendacje
          </h2>
          <p className="text-lg text-text-secondary">
            Te opinie i rekomendacje pokazują transformacyjną moc naszych usług, bezpośrednio od osób, które skorzystały z naszego wsparcia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background-secondary p-8 rounded-xl border border-border"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-text-secondary mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{testimonial.author}</p>
                  <p className="text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
