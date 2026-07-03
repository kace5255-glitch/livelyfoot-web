import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesPage from '@/components/ServicesPage';
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
    title: t('services_title'),
    description: t('services_desc'),
    alternates: buildAlternates('/services', locale),
    openGraph: buildOpenGraph({
      title: t('services_title'),
      description: t('services_desc'),
      path: '/services',
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
          { name: nav('services'), url: `${BASE_URL}/${locale}/services` },
        ]}
      />
      <ServicesPage />
    </>
  );
}
