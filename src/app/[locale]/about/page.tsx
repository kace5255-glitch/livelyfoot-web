import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPage from '@/components/AboutPage';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

const BASE_URL = 'https://livelyfoot-hk.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const brand = (await getTranslations({ locale }))('brand');

  return {
    title: t('about_title'),
    description: t('about_desc'),
    alternates: buildAlternates('/about', locale),
    openGraph: buildOpenGraph({
      title: t('about_title'),
      description: t('about_desc'),
      path: '/about',
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
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: nav('home'), url: `${BASE_URL}/${locale}` },
          { name: nav('about'), url: `${BASE_URL}/${locale}/about` },
        ]}
      />
      <AboutPage />
    </>
  );
}
