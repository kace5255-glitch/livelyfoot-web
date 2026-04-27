import { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { serviceIds } from '@/data/services';
import { getAllSlugs } from '@/lib/blog';

const BASE_URL = 'https://livelyfoot-hk.com';
const pages = ['', '/services', '/about', '/contact', '/blog'];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: buildAlternates(page),
      });
    }

    for (const id of serviceIds) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: buildAlternates(`/services/${id}`),
      });
    }
  }

  const blogSlugs = [...new Set([...getAllSlugs('zh-TW'), ...getAllSlugs('en')])];

  for (const locale of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: buildAlternates(`/blog/${slug}`),
      });
    }
  }

  return entries;
}
