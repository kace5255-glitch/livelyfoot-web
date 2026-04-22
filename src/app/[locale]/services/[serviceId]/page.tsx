import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { serviceIds, serviceToTreatment, mainServices, type ServiceId } from '@/data/services';
import { locales } from '@/i18n/routing';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://livelyfoot-hk.com';

export function generateStaticParams() {
  return serviceIds.map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>;
}): Promise<Metadata> {
  const { locale, serviceId } = await params;
  if (!serviceIds.includes(serviceId as ServiceId)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });
  const tt = await getTranslations({ locale, namespace: 'treatments' });
  const treatmentKey = serviceToTreatment[serviceId as ServiceId];
  const name = tt(`${treatmentKey}.name`);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}/services/${serviceId}`;
  }

  return {
    title: name,
    description: t(`service_${serviceId}_desc`),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${serviceId}`,
      languages,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>;
}) {
  const { locale, serviceId } = await params;
  if (!serviceIds.includes(serviceId as ServiceId)) notFound();

  const tt = await getTranslations({ locale, namespace: 'treatments' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const treatmentKey = serviceToTreatment[serviceId as ServiceId];
  const service = mainServices.find((s) => s.id === serviceId)!;
  const priceRange = `$${service.prices[0]}-$${service.prices[service.prices.length - 1]}`;

  return (
    <>
      <ServiceJsonLd
        name={tt(`${treatmentKey}.name`)}
        description={tt(`${treatmentKey}.description`)}
        url={`${BASE_URL}/${locale}/services/${serviceId}`}
        priceRange={priceRange}
      />
      <BreadcrumbJsonLd
        items={[
          { name: nav('home'), url: `${BASE_URL}/${locale}` },
          { name: nav('services'), url: `${BASE_URL}/${locale}/services` },
          { name: tt(`${treatmentKey}.name`), url: `${BASE_URL}/${locale}/services/${serviceId}` },
        ]}
      />
      <ServiceDetailPage serviceId={serviceId as ServiceId} />
    </>
  );
}
