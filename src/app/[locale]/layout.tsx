import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBookingBar from '@/components/MobileBookingBar';
import { LocalBusinessJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://livelyfoot-hk.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const brand = (await getTranslations({ locale }))('brand');

  return {
    title: {
      template: `%s | ${brand}`,
      default: `${brand} — ${t('home_title')}`,
    },
    description: t('home_desc'),
    metadataBase: new URL(BASE_URL),
    alternates: buildAlternates('', locale),
    openGraph: buildOpenGraph({
      title: `${brand} — ${t('home_title')}`,
      description: t('home_desc'),
      path: '',
      locale,
      siteName: brand,
    }),
    twitter: {
      card: 'summary_large_image',
      title: `${brand} — ${t('home_title')}`,
      description: t('home_desc'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div lang={locale} dir={dir} className="min-h-screen flex flex-col">
      <LocalBusinessJsonLd />
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBookingBar />
      </NextIntlClientProvider>
    </div>
  );
}
