import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomePage from '@/components/HomePage';
import { FaqJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://livelyfoot-hk.com';
const faqKeys = ['booking', 'duration', 'prenatal', 'voucher', 'hours', 'location'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('home_title'),
    description: t('home_desc'),
    alternates: { canonical: `${BASE_URL}/${locale}` },
  };
}

export default async function Page() {
  const t = await getTranslations('faq');
  const faqItems = faqKeys.map((key) => ({
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <HomePage />
    </>
  );
}
