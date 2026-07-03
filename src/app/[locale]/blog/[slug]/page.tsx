import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import BlogPost from '@/components/BlogPost';

const BASE_URL = 'https://livelyfoot-hk.com';

// Only these locales have their own blog content; the rest fall back to en.
const BLOG_LOCALES = ['zh-TW', 'en'];

function hasOwnContent(locale: string) {
  return BLOG_LOCALES.includes(locale) && fs.existsSync(path.join(process.cwd(), 'content/blog', locale));
}

export function generateStaticParams() {
  const zhSlugs = getAllSlugs('zh-TW');
  const enSlugs = getAllSlugs('en');
  const allSlugs = [...new Set([...zhSlugs, ...enSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  // Fallback locales serve English content — canonical points to the /en/ version
  // so Google doesn't index 16 duplicates of the same article.
  const canonicalLocale = hasOwnContent(locale) ? locale : 'en';
  const languages: Record<string, string> = {};
  for (const l of BLOG_LOCALES) {
    languages[l] = `${BASE_URL}/${l}/blog/${slug}`;
  }
  languages['x-default'] = `${BASE_URL}/zh-TW/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/${canonicalLocale}/blog/${slug}`,
      languages,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const nav = await getTranslations({ locale, namespace: 'nav' });
  const { content } = await compileMDX({ source: post.content });

  const readingTime = Math.max(1, Math.ceil(post.content.length / 500));

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        url={`${BASE_URL}/${locale}/blog/${slug}`}
        datePublished={post.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: nav('home'), url: `${BASE_URL}/${locale}` },
          { name: nav('blog'), url: `${BASE_URL}/${locale}/blog` },
          { name: post.title, url: `${BASE_URL}/${locale}/blog/${slug}` },
        ]}
      />
      <BlogPost title={post.title} date={post.date} description={post.description} readingTime={readingTime}>
        {content}
      </BlogPost>
    </>
  );
}
