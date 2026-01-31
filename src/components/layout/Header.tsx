'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Strona główna' },
  { href: '/uslugi', label: 'Usługi' },
  { href: '/gallup', label: 'Mapy Kompetencji' },
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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <span className="text-xl font-bold text-text-primary">Finarena</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? 'text-primary' : 'text-text-secondary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
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
