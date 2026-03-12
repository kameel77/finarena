'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Bot, Settings, Code2, Target, Lightbulb, Users } from 'lucide-react';

const serviceItems = [
  { href: '/uslugi/ai', label: 'Rozwiązania AI', icon: Bot },
  { href: '/uslugi/automatyzacje', label: 'Automatyzacja', icon: Settings },
  { href: '/uslugi/mvp', label: 'POC/MVP', icon: Code2 },
  { href: '/uslugi/rozwoj-przywodztwa', label: 'Przywództwo', icon: Target },
  { href: '/uslugi/innowacje-kultura-organizacji', label: 'Kultura Innowacji', icon: Lightbulb },
  { href: '/uslugi/mentoring', label: 'Executive Mentoring', icon: Users },
];

const navItems = [
  { href: '/', label: 'Strona główna' },
  { label: 'Usługi', children: serviceItems },
  { href: '/uslugi/gallup-mapy-kompetencji', label: 'Mapy Kompetencji' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center max-w-[160px] md:max-w-[200px]">
            <Image src="/images/finarena-logo.svg" alt="Finarena Logo" width={200} height={40} className="w-full h-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-primary transition-colors py-6">
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-6">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-4 group/item hover:bg-background-secondary p-3 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                              <child.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 mt-0.5">
                              <div className="text-sm font-semibold text-text-primary group-hover/item:text-primary transition-colors">
                                {child.label}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href || item.label}
                  href={item.href || '#'}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-text-secondary'
                    }`}
                  prefetch={item.href ? undefined : false} 
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Rozpocznij współpracę
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => {
                  if (item.children) {
                    return (
                      <div key={item.label} className="space-y-3 pt-2">
                        <div className="text-sm font-semibold text-text-primary px-2">{item.label}</div>
                        <div className="pl-4 border-l-2 border-border space-y-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center gap-3 text-sm font-medium transition-colors hover:text-primary ${pathname === child.href ? 'text-primary' : 'text-text-secondary'
                                }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <child.icon className="w-4 h-4" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href || item.label}
                      href={item.href || '#'}
                      className={`block text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-text-secondary'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/kontakt"
                  className="block px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rozpocznij współpracę
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
