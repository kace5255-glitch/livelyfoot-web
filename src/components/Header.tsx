'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { buildWaLink } from '@/lib/whatsapp';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/services' as const, key: 'services' },
  { href: '/about' as const, key: 'about' },
  { href: '/blog' as const, key: 'blog' },
  { href: '/contact' as const, key: 'contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const brand = useTranslations()('brand');
  const cta = useTranslations('cta');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-spa-sand/40">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-serif font-bold text-spa-ink">
          <Image src="/LivelyfootLogo.png" alt={brand} width={40} height={40} className="h-8 md:h-10 w-auto" />
          {brand}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`text-sm tracking-wide transition-colors hover:text-gold ${
                pathname === href ? 'text-gold' : 'text-spa-ink/75'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <LanguageSwitcher />
          <a
            href={buildWaLink(cta('wa_generic'))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold tracking-wider text-gold border border-gold/60 px-5 py-2 rounded-full hover:bg-gold hover:text-white transition-colors"
          >
            {cta('book_now')}
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 text-spa-ink"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-cream border-t border-spa-sand/40 px-4 pb-4">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3.5 text-sm font-medium border-b border-spa-sand/30 active:bg-spa-sand/20 transition-colors ${
                pathname === href ? 'text-gold' : 'text-spa-ink/75'
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
