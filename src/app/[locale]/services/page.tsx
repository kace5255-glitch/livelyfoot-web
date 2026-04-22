import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesPage from '@/components/ServicesPage';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://livelyfoot-hk.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('services_title'),
    description: t('services_desc'),
    alternates: { canonical: `${BASE_URL}/${locale}/services` },
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
