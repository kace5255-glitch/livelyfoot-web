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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-block bg-gold hover:bg-gold-light text-warm-brown-dark font-semibold px-8 py-3 rounded-full transition-colors"
            >
              {t('hero_cta')}
            </Link>
            <a
              href="https://wa.me/85228032880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="tel:+85228032880"
              className="inline-flex items-center gap-2 bg-cream/20 hover:bg-cream/30 text-cream font-semibold px-6 py-3 rounded-full border border-cream/40 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              2803 2880
            </a>
          </div>
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
