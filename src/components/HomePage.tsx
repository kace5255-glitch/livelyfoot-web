'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;
const faqKeys = ['booking', 'duration', 'prenatal', 'voucher', 'hours', 'location'] as const;

const treatmentIcons: Record<string, string> = {
  foot_reflex: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  body_acupoint: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  lymph: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  prenatal: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  nail: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
  guasha: 'M13 10V3L4 14h7v7l9-11h-7z',
};

export default function HomePage() {
  const t = useTranslations('home');
  const tt = useTranslations('treatments');
  const faq = useTranslations('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-warm-brown min-h-[70vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-brown-dark/60 to-warm-brown/80" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-8">
            {t('hero_subtitle')}
          </p>
          <Link
            href="/services"
            className="inline-block bg-gold hover:bg-gold-light text-warm-brown-dark font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('hero_cta')}
          </Link>
        </div>
      </section>

      {/* Treatments */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-warm-brown mb-3">
            {t('treatments_title')}
          </h2>
          <p className="text-warm-brown-dark/60">{t('treatments_subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentKeys.map((key) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/30 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-cream-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={treatmentIcons[key]} />
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-lg text-warm-brown-dark mb-3">
                {tt(`${key}.name`)}
              </h3>
              <p className="text-sm text-warm-brown-dark/60 leading-relaxed">
                {tt(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-warm-brown-dark/5 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-warm-brown mb-3">
              {faq('title')}
            </h2>
            <p className="text-warm-brown-dark/60">{faq('subtitle')}</p>
          </div>
          <div className="space-y-4">
            {faqKeys.map((key, i) => (
              <div
                key={key}
                className="bg-white rounded-2xl border border-cream-dark/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-warm-brown-dark">{faq(`items.${key}.q`)}</span>
                  <svg
                    className={`w-5 h-5 text-warm-brown-dark/50 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-forest leading-relaxed">{faq(`items.${key}.a`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
