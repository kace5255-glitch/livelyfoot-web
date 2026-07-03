'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { mainServices, serviceToTreatment, type ServiceId } from '@/data/services';
import Breadcrumb from './Breadcrumb';
import BookingCta from './BookingCta';
import Reveal from './Reveal';

const stepKeys = ['1', '2', '3', '4'] as const;
const suitableKeys = ['1', '2', '3'] as const;
const noteKeys = ['1', '2'] as const;

export default function ServiceDetailPage({ serviceId }: { serviceId: ServiceId }) {
  const t = useTranslations('services');
  const tt = useTranslations('treatments');
  const sd = useTranslations(`serviceDetail.${serviceId}`);
  const common = useTranslations('serviceDetail.common');
  const nav = useTranslations('nav');
  const bc = useTranslations('breadcrumb');

  const service = mainServices.find((s) => s.id === serviceId)!;
  const treatmentKey = serviceToTreatment[serviceId];
  const others = mainServices.filter((s) => s.id !== serviceId);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: nav('services'), href: '/services' },
          { label: tt(`${treatmentKey}.name`) },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-spa-ink mb-4">
          {tt(`${treatmentKey}.name`)}
        </h1>
        <p className="text-spa-ink/75 leading-relaxed text-lg mb-10">
          {tt(`${treatmentKey}.description`)}
        </p>

        {/* Pricing */}
        <Reveal>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-spa-sand/30 mb-10">
            <h2 className="text-2xl font-serif font-semibold text-spa-ink mb-6">
              {bc('pricing')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.durations.map((dur, i) => (
                <div
                  key={dur}
                  className="text-center p-6 rounded-xl bg-cream/60 border border-spa-sand/20"
                >
                  <div className="text-3xl font-bold text-spa-ink">${service.prices[i]}</div>
                  <div className="text-spa-ink/60 mt-1">{dur} {t('minutes')}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Process steps */}
        <Reveal>
          <div className="mb-10">
            <h2 className="text-2xl font-serif font-semibold text-spa-ink mb-6">{common('steps_title')}</h2>
            <ol className="space-y-4">
              {stepKeys.map((k, i) => (
                <li key={k} className="flex gap-4 items-start">
                  <span className="font-serif text-2xl font-light text-gold shrink-0 w-8 text-right">{i + 1}</span>
                  <p className="text-spa-ink/75 leading-relaxed pt-1">{sd(`steps.${k}`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Suitable for + Notes */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Reveal>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30 h-full">
              <h2 className="text-xl font-serif font-semibold text-spa-ink mb-4">{common('suitable_title')}</h2>
              <ul className="space-y-3">
                {suitableKeys.map((k) => (
                  <li key={k} className="flex gap-3 items-start text-sm text-spa-ink/75 leading-relaxed">
                    <svg className="w-4 h-4 text-spa-olive shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {sd(`suitable.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="bg-spa-olive/10 rounded-2xl p-6 border border-spa-olive/20 h-full">
              <h2 className="text-xl font-serif font-semibold text-spa-ink mb-4">{common('notes_title')}</h2>
              <ul className="space-y-3">
                {noteKeys.map((k) => (
                  <li key={k} className="flex gap-3 items-start text-sm text-spa-ink/75 leading-relaxed">
                    <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {sd(`notes.${k}`)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-spa-ink/75 leading-relaxed mt-4 pt-4 border-t border-spa-olive/20">
                {sd('aftercare')}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Booking CTA with service name prefilled */}
        <Reveal>
          <div className="mb-10">
            <BookingCta serviceName={tt(`${treatmentKey}.name`)} />
          </div>
        </Reveal>

        {/* Other treatments */}
        <Reveal>
          <h2 className="text-xl font-serif font-semibold text-spa-ink mb-4">{common('others_title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-spa-sand/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <p className="text-sm font-medium text-spa-ink group-hover:text-gold transition-colors">
                  {tt(`${serviceToTreatment[s.id as ServiceId]}.name`)}
                </p>
                <p className="text-xs text-spa-ink/60 mt-1">
                  {t('currency')}{s.prices[0]}+
                </p>
              </Link>
            ))}
          </div>
        </Reveal>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-spa-ink/75 hover:text-gold transition-colors font-medium"
        >
          <span aria-hidden="true">&larr;</span>
          {bc('all_services')}
        </Link>
      </section>
    </div>
  );
}
