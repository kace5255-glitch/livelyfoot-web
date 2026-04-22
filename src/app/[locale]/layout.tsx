import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, locales } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Noto_Sans, Noto_Serif } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LocalBusinessJsonLd } from '@/components/JsonLd';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

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

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}`;
  }

  return {
    title: {
      template: `%s | ${brand}`,
      default: `${brand} — ${t('home_title')}`,
    },
    description: t('home_desc'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: `${brand} — ${t('home_title')}`,
      description: t('home_desc'),
      url: `${BASE_URL}/${locale}`,
      siteName: brand,
      locale,
      type: 'website',
      images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand} — ${t('home_title')}`,
      description: t('home_desc'),
      images: ['/og-image.svg'],
    },
    icons: {
      icon: '/LivelyfootLogo.png',
      apple: '/LivelyfootLogo.png',
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
    <html lang={locale} dir={dir}>
      <body className={`${notoSans.variable} ${notoSerif.variable} min-h-screen flex flex-col`}>
        <LocalBusinessJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
