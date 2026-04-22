'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations('breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4">
      <ol className="flex items-center gap-1.5 text-sm text-warm-brown-dark/50">
        <li>
          <Link href="/" className="hover:text-warm-brown transition-colors">
            {t('home')}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-warm-brown transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-warm-brown-dark/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
