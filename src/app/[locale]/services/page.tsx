import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesPage from '@/components/ServicesPage';

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

export default function Page() {
  return <ServicesPage />;
}
