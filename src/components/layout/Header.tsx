'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const sectors = [
  { href: '/sektory/automotive', label: 'Automotive', hint: 'Motolia · CarSalon' },
  { href: '/sektory/legal', label: 'Legal', hint: 'Votenti · iDOXXY' },
  { href: '/sektory/hr', label: 'HR & Talent', hint: 'Mapy kompetencji' },
];

const nav = [
  { href: '/build', label: 'Build' },
  { href: '/leadership', label: 'Leadership' },
  { label: 'Sektory', children: sectors },
  { href: '/ludzie', label: 'Ludzie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-hair' : 'border-transparent'
      }`}
    >
      <div className="wrap flex items-center justify-between h-[74px]">
        <Link href="/" className="shrink-0" aria-label="Finarena — strona główna">
          <Image src="/images/finarena-logo.svg" alt="Finarena" width={190} height={33} priority className="h-[22px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1.5 text-[13.5px] text-ink-soft hover:text-accent transition-colors py-6">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[290px] bg-card border border-hair rounded shadow-lift opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-5 py-4 border-b border-hair last:border-0 hover:bg-paper-2 transition-colors"
                    >
                      <span className="block text-[14.5px] font-medium">{c.label}</span>
                      <span className="block text-[12px] text-ink-faint mt-0.5">{c.hint}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`text-[13.5px] transition-colors hover:text-accent ${
                  pathname === item.href ? 'text-accent' : 'text-ink-soft'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link href="/kontakt" className="btn-primary hidden sm:inline-flex">
          Porozmawiajmy <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-paper border-t border-hair overflow-hidden"
          >
            <div className="wrap py-5 space-y-4">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="space-y-3">
                    <div className="kicker text-ink-faint">{item.label}</div>
                    <div className="pl-4 border-l border-hair space-y-3">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block text-[14.5px] text-ink-soft">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href!} className="block text-[14.5px] text-ink-soft">
                    {item.label}
                  </Link>
                )
              )}
              <Link href="/kontakt" className="btn-primary w-full justify-center">
                Porozmawiajmy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
