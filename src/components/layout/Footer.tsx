import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { href: '/uslugi#ai', label: 'Rozwiązania AI' },
    { href: '/uslugi#automation', label: 'Automatyzacja' },
    { href: '/uslugi#mvp', label: 'POC/MVP' },
    { href: '/gallup', label: 'Mapy Kompetencji' },
  ],
  development: [
    { href: '/uslugi#leadership', label: 'Przywództwo' },
    { href: '/uslugi#culture', label: 'Kultura Innowacji' },
    { href: '/uslugi#mentoring', label: 'Executive Mentoring' },
  ],
  company: [
    { href: '/kontakt', label: 'Kontakt' },
    { href: '/blog', label: 'Blog' },
    { href: '/case-studies', label: 'Case Studies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl">
                F
              </div>
              <span className="text-xl font-bold">Finarena</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Przyspieszamy rozwój firm przez połączenie technologii AI, automatyzacji procesów oraz rozwoju kompetencji i kultury organizacyjnej.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Usługi</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Development */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Rozwój</h3>
            <ul className="space-y-3">
              {footerLinks.development.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:kontakt@finarena.pl" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  kontakt@finarena.pl
                </a>
              </li>
              <li>
                <a href="tel:+48123456789" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +48 123 456 789
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>ul. Przykładowa 123<br />00-001 Warszawa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Finarena. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
