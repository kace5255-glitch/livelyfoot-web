import { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { serviceIds } from '@/data/services';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://livelyfoot-hk.com';
const pages = ['', '/services', '/about', '/contact', '/blog'];

// Bump manually when static page content meaningfully changes.
// `new Date()` on every deploy makes lastmod meaningless to crawlers.
const STATIC_LAST_MODIFIED = new Date('2026-07-03');

// Only these locales have their own blog content; others serve English fallbacks
// and must not be declared as translations.
const BLOG_LOCALES = ['zh-TW', 'en'] as const;

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/zh-TW${path}`;
  return { languages };
}

function buildBlogAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of BLOG_LOCALES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/zh-TW${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: buildAlternates(page),
      });
    }

    for (const id of serviceIds) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${id}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: buildAlternates(`/services/${id}`),
      });
    }
  }

  for (const locale of BLOG_LOCALES) {
    for (const post of getAllPosts(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: buildBlogAlternates(`/blog/${post.slug}`),
      });
    }
  }

  return entries;
}
