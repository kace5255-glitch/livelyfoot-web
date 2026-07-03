import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import BlogList from '@/components/BlogList';
import Breadcrumb from '@/components/Breadcrumb';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

const BASE_URL = 'https://livelyfoot-hk.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const brand = (await getTranslations({ locale }))('brand');

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates('/blog', locale),
    openGraph: buildOpenGraph({
      title: t('title'),
      description: t('subtitle'),
      path: '/blog',
      locale,
      siteName: brand,
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: nav('home'), url: `${BASE_URL}/${locale}` },
          { name: nav('blog'), url: `${BASE_URL}/${locale}/blog` },
        ]}
      />
      <Breadcrumb items={[{ label: nav('blog') }]} />
      <BlogList posts={posts} />
    </>
  );
}
