import { locales } from '@/i18n/routing';
import { business } from '@/data/business';

const BASE_URL = business.baseUrl;

// Next.js metadata merges shallowly: a page that sets only `canonical` wipes
// the layout's `languages`, so every page must build the full alternates object.
export function buildAlternates(path: string, locale: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/zh-TW${path}`;

  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages,
  };
}

export function buildOpenGraph({
  title,
  description,
  path,
  locale,
  siteName,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  siteName: string;
}) {
  return {
    title,
    description,
    url: `${BASE_URL}/${locale}${path}`,
    siteName,
    locale,
    type: 'website' as const,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  };
}
