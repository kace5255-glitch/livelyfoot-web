'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/services' as const, key: 'services' },
  { href: '/about' as const, key: 'about' },
  { href: '/contact' as const, key: 'contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const brand = useTranslations()('brand');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-warm-brown">
          <img src="/LivelyfootLogo.png" alt={brand} className="h-10 w-auto" />
          {brand}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-warm-brown ${
                pathname === href ? 'text-warm-brown' : 'text-warm-brown-dark/70'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-warm-brown"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-cream border-t border-cream-dark px-4 pb-4">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-cream-dark/50 ${
                pathname === href ? 'text-warm-brown' : 'text-warm-brown-dark/70'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <div className="pt-3">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
