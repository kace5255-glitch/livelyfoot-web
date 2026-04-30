'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { mainServices, comboServices, otherServices, cashVouchers } from '@/data/services';

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

const treatmentPhotos: Record<string, string> = {
  foot_reflex: '/footmassage.jpg',
  body_acupoint: '/massage.jpg',
  lymph: '/massage2.jpg',
  prenatal: '/massage.jpg',
  nail: '/footmassage2.jpg',
  guasha: '/massage2.jpg',
};

const featureIcons = [
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
];

function LeafDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 10 C60 10, 20 60, 25 110 C30 160, 55 140, 60 160 C65 140, 90 160, 95 110 C100 60, 60 10, 60 10Z" fill="currentColor" opacity="0.15" />
      <path d="M60 160 L60 310" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <path d="M60 80 C60 80, 35 100, 30 130" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M60 80 C60 80, 85 100, 90 130" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M60 120 C60 120, 40 135, 38 155" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <path d="M60 120 C60 120, 80 135, 82 155" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <path d="M60 200 C60 200, 30 230, 28 260 C26 290, 55 270, 60 280 C65 270, 94 290, 92 260 C90 230, 60 200, 60 200Z" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const tt = useTranslations('treatments');
  const about = useTranslations('about');
  const s = useTranslations('services');
  const faq = useTranslations('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[75vh] flex items-center justify-center text-center px-4 py-12 md:py-4 overflow-hidden">
        <img
          src="/massagephoto.jpg"
          alt="LivelyFoot massage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-brown-dark/65" />
        <LeafDecoration className="absolute left-0 top-1/2 -translate-y-1/2 h-64 md:h-80 text-gold hidden md:block" />
        <LeafDecoration className="absolute right-0 top-1/2 -translate-y-1/2 h-64 md:h-80 text-gold hidden md:block -scale-x-100" />
        <div className="relative z-10 max-w-3xl w-full">
          <p className="text-gold text-xs md:text-base tracking-[0.3em] uppercase mb-2 md:mb-4">Spa & Health Massage</p>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-cream mb-3 md:mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-sm md:text-lg text-cream/70 mb-5 md:mb-10 max-w-xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2.5 md:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              href="/services"
              className="inline-block bg-gold hover:bg-gold-light text-warm-brown-dark font-semibold text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 rounded-full transition-colors text-center"
            >
              {t('hero_cta')}
            </Link>
            <a
              href="https://wa.me/85228032880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="tel:+85228032880"
              className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-cream/20 hover:bg-cream/30 text-cream font-semibold text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-cream/40 transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              2803 2880
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <LeafDecoration className="absolute -left-6 top-0 h-72 text-warm-brown opacity-40 hidden lg:block" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">— {t('about_badge')}</p>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-warm-brown-dark mb-6 leading-snug">
                {t('about_title')}
              </h2>
              <p className="text-sm md:text-base text-warm-brown-dark/70 leading-relaxed mb-4">
                {about('story_p1')}
              </p>
              <p className="text-sm md:text-base text-warm-brown-dark/70 leading-relaxed">
                {about('story_p2')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="/massage.jpg"
                  alt="LivelyFoot experience"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-12 bg-gold/30" />
        <span className="text-gold/50 text-sm">✦</span>
        <div className="h-px w-12 bg-gold/30" />
      </div>

      {/* Why Choose Us */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <img
          src="/massage2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-brown-dark/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <p className="text-gold/80 text-sm tracking-[0.2em] uppercase mb-2">— Why Choose Us</p>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-cream mb-3 md:mb-4">
            {t('features_title')}
          </h2>
          <p className="text-sm md:text-base text-cream/60 mb-10 md:mb-14 italic">
            {t('features_subtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {(['experience', 'team', 'night', 'comfort'] as const).map((key, i) => (
              <div key={key} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons[i]} />
                  </svg>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-cream mb-1">
                  {t(`feature_${key}`)}
                </h3>
                <p className="text-xs md:text-sm text-cream/60">
                  {t(`feature_${key}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-12 bg-gold/30" />
        <span className="text-gold/50 text-sm">✦</span>
        <div className="h-px w-12 bg-gold/30" />
      </div>

      {/* Treatments */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">— Our Services</p>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-warm-brown mb-2 md:mb-3">
            {t('treatments_title')}
          </h2>
          <p className="text-sm md:text-base text-warm-brown-dark/60">{t('treatments_subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {treatmentKeys.map((key) => (
            <div
              key={key}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-cream-dark/30 hover:border-gold/40 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-cream-dark rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-forest group-hover:text-warm-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={treatmentIcons[key]} />
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-sm md:text-lg text-warm-brown-dark mb-1.5 md:mb-2">
                {tt(`${key}.name`)}
              </h3>
              <p className="text-xs md:text-sm text-warm-brown-dark/60 leading-relaxed line-clamp-3">
                {tt(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-12 bg-gold/30" />
        <span className="text-gold/50 text-sm">✦</span>
        <div className="h-px w-12 bg-gold/30" />
      </div>

      {/* Pricing */}
      <section className="bg-warm-brown-dark/5 py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">— Pricing</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-warm-brown mb-2">
              {s('title')}
            </h2>
            <p className="text-sm md:text-base text-warm-brown-dark/50">{s('subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-cream-dark/30">
                <h3 className="text-base md:text-lg font-semibold text-warm-brown-dark mb-4 md:mb-6 flex items-center gap-2">
                  <span className="text-gold">✦</span> {s('main_title')}
                </h3>
                <div className="space-y-4 md:space-y-5">
                  {mainServices.map((sv) => (
                    <div key={sv.id} className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm md:text-base text-warm-brown-dark">{s(`main.${sv.id}`)}</p>
                        <p className="text-xs md:text-sm text-warm-brown-dark/50">
                          {sv.durations.join(' / ')} {s('min')}
                        </p>
                      </div>
                      <p className="text-sm md:text-base text-warm-brown-dark font-medium whitespace-nowrap shrink-0">
                        {sv.prices.map((p) => `${s('currency')}${p}`).join(' / ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-cream-dark/30">
                <h3 className="text-base md:text-lg font-semibold text-warm-brown-dark mb-4 md:mb-6">{s('other_title')}</h3>
                <div className="space-y-3 md:space-y-4">
                  {otherServices.map((sv) => (
                    <div key={sv.id} className="flex items-center justify-between gap-2">
                      <p className="text-sm md:text-base text-warm-brown-dark">{s(`other.${sv.id}`)}</p>
                      <p className="text-sm md:text-base text-warm-brown-dark font-semibold whitespace-nowrap shrink-0">{sv.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-cream-dark/30">
                <h3 className="text-base md:text-lg font-semibold text-warm-brown-dark mb-1">{s('combo_title')}</h3>
                <p className="text-xs md:text-sm text-warm-brown-dark/50 mb-4 md:mb-6">{s('combo_subtitle')}</p>
                <div className="space-y-3 md:space-y-4">
                  {comboServices.map((sv) => (
                    <div key={sv.id} className="flex items-center justify-between gap-2">
                      <p className="text-sm md:text-base text-warm-brown-dark">{s(`combo.${sv.id}`)}</p>
                      <p className="text-sm md:text-base text-warm-brown-dark font-semibold whitespace-nowrap shrink-0">{s('currency')}{sv.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl md:rounded-2xl p-4 md:p-6 text-warm-brown-dark overflow-hidden border-2 border-gold/40 bg-gradient-to-br from-gold/10 via-cream to-gold/5">
                <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-gold">🎫</span> {s('voucher_title')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                    {cashVouchers.map((v) => (
                      <div key={v.amount} className="relative bg-white rounded-lg md:rounded-xl p-3 md:p-4 text-center border border-gold/30 shadow-sm">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cream rounded-full border border-gold/30" />
                        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cream rounded-full border border-gold/30" />
                        <p className="text-xl md:text-2xl font-bold text-warm-brown-dark">{s('currency')}{v.amount.toLocaleString()}</p>
                        <p className="mt-1.5 md:mt-2 text-xs md:text-sm bg-gold text-warm-brown-dark rounded-full px-2 md:px-3 py-0.5 md:py-1 inline-block font-medium">
                          {s('voucher_bonus')} {s('currency')}{v.bonus}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-warm-brown-dark/60 text-center">{s('voucher_note')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">— FAQ</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-warm-brown mb-2 md:mb-3">
              {faq('title')}
            </h2>
            <p className="text-sm md:text-base text-warm-brown-dark/60">{faq('subtitle')}</p>
          </div>
          <div className="space-y-2 md:space-y-3">
            {faqKeys.map((key, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={key}
                  className={`rounded-xl md:rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'bg-white border-gold/40 shadow-md'
                      : 'bg-white border-cream-dark/30 hover:border-gold/30 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-4 md:px-6 md:py-5 text-left group"
                  >
                    <span className={`text-sm md:text-base font-semibold transition-colors duration-200 pr-2 ${
                      isOpen ? 'text-warm-brown' : 'text-warm-brown-dark group-hover:text-warm-brown'
                    }`}>
                      {faq(`items.${key}.q`)}
                    </span>
                    <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-gold/20 rotate-180' : 'bg-cream-dark/50'
                    }`}>
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-warm-brown-dark/70"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 md:px-6 md:pb-5">
                        <div className="h-px bg-cream-dark/30 mb-3 md:mb-4" />
                        <p className="text-xs md:text-sm text-warm-brown-dark/70 leading-relaxed">{faq(`items.${key}.a`)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <img
          src="/massage.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-brown-dark/75" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-cream mb-3 md:mb-4">
            {t('hero_subtitle')}
          </h2>
          <p className="text-sm md:text-base text-cream/60 mb-6 md:mb-8">
            {about('story_p3')}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="https://wa.me/85228032880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="tel:+85228032880"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-warm-brown-dark font-semibold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              2803 2880
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
