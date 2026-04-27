import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import BlogPost from '@/components/BlogPost';

const BASE_URL = 'https://livelyfoot-hk.com';

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

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
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
