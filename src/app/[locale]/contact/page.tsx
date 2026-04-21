import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactPage from '@/components/ContactPage';

const BASE_URL = 'https://livelyfoot-hk.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('contact_title'),
    description: t('contact_desc'),
    alternates: { canonical: `${BASE_URL}/${locale}/contact` },
  };
}

export default function Page() {
  return <ContactPage />;
}
