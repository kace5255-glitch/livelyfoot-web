import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomePage from '@/components/HomePage';
import { FaqJsonLd } from '@/components/JsonLd';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

const faqKeys = ['booking', 'duration', 'prenatal', 'voucher', 'hours', 'location'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const brand = (await getTranslations({ locale }))('brand');

  return {
    title: { absolute: `${brand} | ${t('home_title')}` },
    description: t('home_desc'),
    alternates: buildAlternates('', locale),
    openGraph: buildOpenGraph({
      title: `${brand} | ${t('home_title')}`,
      description: t('home_desc'),
      path: '',
      locale,
      siteName: brand,
    }),
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
