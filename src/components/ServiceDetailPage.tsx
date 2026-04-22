'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { mainServices } from '@/data/services';
import { serviceToTreatment, type ServiceId } from '@/data/services';
import Breadcrumb from './Breadcrumb';

export default function ServiceDetailPage({ serviceId }: { serviceId: ServiceId }) {
  const t = useTranslations('services');
  const tt = useTranslations('treatments');
  const nav = useTranslations('nav');
  const bc = useTranslations('breadcrumb');

  const service = mainServices.find((s) => s.id === serviceId)!;
  const treatmentKey = serviceToTreatment[serviceId];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: nav('services'), href: '/services' },
          { label: tt(`${treatmentKey}.name`) },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-warm-brown mb-4">
          {tt(`${treatmentKey}.name`)}
        </h1>
        <p className="text-warm-brown-dark/70 leading-relaxed text-lg mb-10">
          {tt(`${treatmentKey}.description`)}
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-cream-dark/30 mb-10">
          <h2 className="text-2xl font-serif font-semibold text-warm-brown mb-6">
            {bc('pricing')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.durations.map((dur, i) => (
              <div
                key={dur}
                className="text-center p-6 rounded-xl bg-cream/60 border border-cream-dark/20"
              >
                <div className="text-3xl font-bold text-warm-brown">${service.prices[i]}</div>
                <div className="text-warm-brown-dark/60 mt-1">{dur} {t('minutes')}</div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-warm-brown hover:text-warm-brown-dark transition-colors font-medium"
        >
          <span aria-hidden="true">&larr;</span>
          {bc('all_services')}
        </Link>
      </section>
    </div>
  );
}