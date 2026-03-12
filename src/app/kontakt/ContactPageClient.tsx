'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import React, { useState } from 'react';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: 'Napisz do nas',
    value: 'kontakt@finarena.pl',
    href: 'mailto:kontakt@finarena.pl',
    description: 'Najszybsza opcja na początek'
  },
  {
    icon: <Phone className="w-6 h-6 text-primary" />,
    title: 'Zadzwoń',
    value: '+48 502 358 645',
    href: 'tel:+48502358645',
    description: 'Bieżące szybkie pytania'
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: 'Adres biura',
    value: 'ul. Alternatywy 7 lok. 135\n02-775 Warszawa',
    description: 'Dostępne po wcześniejszym umówieniu'
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: 'Godziny pracy',
    value: 'Pn - Pt: 9:00 - 17:00\nWeekend: Zamknięte',
    description: 'Reagujemy najszybciej w tych godzinach'
  }
];

export function ContactPageClient() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Create payload from input fields using IDs
    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;
    
    const payload = {
      firstName: (formElement.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (formElement.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement).value,
      phone: (formElement.elements.namedItem('phone') as HTMLInputElement).value,
      service: (formElement.elements.namedItem('service') as HTMLSelectElement).value,
      message: (formElement.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        const errorData = await response.json();
        console.error('Server error submitting form:', errorData);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Network error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/3 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Porozmawiajmy o rozwoju
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Rozpocznij transformację <br className="hidden md:block" />
              swojej organizacji
            </h1>
            <p className="text-lg text-text-secondary">
              Nieważne czy chodzi o strategie AI, wdrożenia automatyzacji czy budowanie talentów.
              Podziel się swoim dylematem, a my zaproponujemy najlepsze rozwiązanie.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8"
            >
              {contactInfo.map((info, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-white shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {info.title}
                    </h3>
                    <div className="text-text-secondary text-sm mb-2">{info.description}</div>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="text-primary font-medium hover:text-primary-dark transition-colors whitespace-pre-line"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-text-primary font-medium whitespace-pre-line">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Bądź na bieżąco z Finarena
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
                  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
                  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full bg-background-secondary flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden"
          >
            {/* Form decorative background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10" />

            {formStatus === 'success' ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Wiadomość wysłana!</h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Dziękujemy za kontakt. Nasz ekspert skontaktuje się z Tobą najszybciej jak to możliwe.
                  </p>
                </div>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-text-primary">Imię *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Jan"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-text-primary">Nazwisko *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Kowalski"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-text-primary">Email służbowy *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="jan.kowalski@firma.pl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-text-primary">Telefon (opcjonalnie)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="+48 000 000 000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-text-primary">Interesujący Cię obszar *</label>
                  <select 
                    id="service" 
                    name="service"
                    defaultValue=""
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Wybierz specjalizację...</option>
                    <option value="ai">Wdrożenia i strategie AI</option>
                    <option value="automation">Automatyzacja procesów (RPA)</option>
                    <option value="mvp">Development aplikacji (MVP)</option>
                    <option value="gallup">Mapy kompetencji i sesje Gallup</option>
                    <option value="leadership">Szkolenia liderów i mentoring</option>
                    <option value="other">Inne / Konsultacja wstępna</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-text-primary">Twoja wiadomość *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                    placeholder="Opisz krótko z jakim wyzwaniem się mierzycie, lub w jakiej usłudze możemy Ci pomóc..."
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="group w-full py-4 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                    {!formStatus && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  {formStatus === 'error' && (
                    <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                      Podczas wysyłania formularza wystąpił błąd. Skontaktuj się z nami bezpośrednio pod adresem kontakt@finarena.pl
                    </div>
                  )}
                  <p className="text-xs text-text-light text-center mt-4">
                    Pola oznaczone gwiazdką (*) są wymagane. Przesyłając formularz akceptujesz naszą politykę prywatności.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
