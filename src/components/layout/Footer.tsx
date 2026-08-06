import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const cols = [
  {
    title: 'Sektory',
    links: [
      { href: '/sektory/automotive', label: 'Automotive' },
      { href: '/sektory/legal', label: 'Legal' },
      { href: '/sektory/hr', label: 'HR & Talent' },
    ],
  },
  {
    title: 'Build',
    links: [
      { href: '/build#proces', label: 'POC / MVP' },
      { href: '/build#ai', label: 'Wdrożenia AI' },
      { href: '/build#automatyzacja', label: 'Automatyzacja procesów' },
      { href: '/build#scale', label: 'Pełne wdrożenia' },
    ],
  },
  {
    title: 'Leadership',
    links: [
      { href: '/leadership#mentoring', label: 'Executive mentoring' },
      { href: '/leadership/mapy-kompetencji', label: 'Mapy kompetencji Gallup' },
      { href: '/leadership#przywodztwo', label: 'Rozwój przywództwa' },
      { href: '/leadership#kultura', label: 'Kultura innowacji' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper-2 border-t border-hair pt-16 pb-9">
      <div className="wrap">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.618fr_1fr_1fr_1fr] gap-11 mb-12">
          <div>
            <Link href="/" aria-label="Finarena, strona główna" className="inline-block">
              <Image src="/images/finarena-logo.svg" alt="Finarena" width={190} height={33} className="h-[22px] w-auto" />
            </Link>
            <p className="text-ink-mute text-[14px] max-w-[36ch] mt-4">
              Budujemy procesy i aplikacje. Rozwijamy ludzi, którzy je prowadzą.
            </p>
            <ul className="mt-6 space-y-2.5 text-[13.5px] text-ink-soft">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-ink-faint" /> ul. Alternatywy 7/135, 02-775 Warszawa
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ink-faint" />
                <a href="mailto:kontakt@finarena.pl" className="hover:text-accent">kontakt@finarena.pl</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ink-faint" />
                <a href="tel:+48502358645" className="hover:text-accent">+48 502 358 645</a>
              </li>
            </ul>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h5 className="kicker text-ink-faint mb-4">{col.title}</h5>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] text-ink-soft hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-hair pt-6 text-[12.5px] text-ink-faint">
          <span>© {new Date().getFullYear()} Finarena</span>
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/company/finarena" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-accent">
              <Linkedin className="w-4 h-4" />
            </a>
            <Link href="/ludzie" className="hover:text-accent">Ludzie</Link>
            <span className="kicker">Designed in Φ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
