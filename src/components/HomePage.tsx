'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { mainServices, comboServices, otherServices, cashVouchers } from '@/data/services';

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;
const faqKeys = ['booking', 'duration', 'prenatal', 'voucher', 'hours', 'location'] as const;

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

export default function HomePage() {
  const t = useTranslations('home');
  const tt = useTranslations('treatments');
  const about = useTranslations('about');
  const s = useTranslations('services');
  const faq = useTranslations('faq');
  const contact = useTranslations('contact');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen font-sans text-spa-ink bg-cream overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/massagephoto.jpg" alt="Spa" className="w-full h-full object-cover opacity-[0.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/80 to-cream" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 w-fit text-gold text-xs font-semibold tracking-widest uppercase">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              香港跑馬地
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.15] text-balance">
              {t('hero_title')}
            </h1>
            <p className="text-base md:text-xl text-spa-ink/70 max-w-md font-light leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 md:pt-4">
              <a
                href="https://wa.me/85228032880"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm font-semibold tracking-wider hover:bg-spa-olive transition-colors shadow-lg shadow-gold/20 flex items-center gap-2"
              >
                聯絡我們預約
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
              <img src="/massage.jpg" alt="Foot Massage" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 md:p-6 rounded-2xl shadow-xl glass-panel">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-cream flex items-center justify-center text-gold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">{t('feature_night')}</div>
                  <div className="text-xs text-spa-ink/60">{t('feature_night_desc')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-20 md:py-32 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src="/massage2.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#6B5A39]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-widest text-sm">WHY CHOOSE US</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 font-bold tracking-wide">{t('features_title')}</h2>
            <p className="font-serif italic text-white/80">{t('features_subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {(['experience', 'team', 'night', 'comfort'] as const).map((key, i) => (
              <div key={key} className="text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border border-gold/50 flex items-center justify-center mb-4 md:mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons[i]} />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">{t(`feature_${key}`)}</h3>
                <p className="text-sm opacity-80 font-light">{t(`feature_${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl mb-3 md:mb-4">{t('treatments_title')}</h2>
              <p className="text-spa-ink/70 font-light">{t('treatments_subtitle')}</p>
            </div>
            <Link href="/about" className="text-gold text-sm font-semibold tracking-wider hover:text-spa-olive transition-colors flex items-center gap-1 shrink-0">
              {t('hero_cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {treatmentKeys.map((key) => (
              <div key={key} className="group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-spa-sand/20 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={treatmentPhotos[key]}
                    alt={key}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-base md:text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                    {tt(`${key}.name`)}
                  </h3>
                  <p className="text-sm text-spa-ink/70 leading-relaxed font-light line-clamp-3">
                    {tt(`${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-24 bg-cream relative border-t border-spa-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Pricing</span>
            <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-4 md:mb-6">{s('title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="space-y-6 md:space-y-8">
              {/* Main Services */}
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-5 md:mb-6 text-spa-ink font-semibold flex items-center gap-2">
                  <span className="text-gold">✦</span> {s('main_title')}
                </h3>
                <div className="space-y-5 md:space-y-6">
                  {mainServices.map((sv) => (
                    <div key={sv.id} className="flex justify-between items-end border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="text-spa-ink font-medium mb-1">{s(`main.${sv.id}`)}</div>
                        <div className="text-spa-ink/60 text-xs">{sv.durations.join(' / ')} {s('min')}</div>
                      </div>
                      <div className="text-spa-ink font-medium text-sm md:text-base shrink-0">
                        {sv.prices.map((p) => `${s('currency')}${p}`).join(' / ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Other Services */}
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-5 md:mb-6 text-spa-ink font-semibold">{s('other_title')}</h3>
                <div className="space-y-5 md:space-y-6">
                  {otherServices.map((sv) => (
                    <div key={sv.id} className="flex justify-between items-center border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div className="text-spa-ink font-medium">{s(`other.${sv.id}`)}</div>
                      <div className="text-spa-ink font-medium shrink-0">{sv.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              {/* Combos */}
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-1 text-spa-ink font-semibold">{s('combo_title')}</h3>
                <p className="text-xs text-spa-ink/60 mb-5 md:mb-6">{s('combo_subtitle')}</p>
                <div className="space-y-5 md:space-y-6">
                  {comboServices.map((sv) => (
                    <div key={sv.id} className="flex justify-between items-center border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div className="text-spa-ink font-medium">{s(`combo.${sv.id}`)}</div>
                      <div className="text-spa-ink font-medium shrink-0">{s('currency')}{sv.price}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Cash Vouchers */}
              <div className="bg-spa-olive/10 border border-spa-olive/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8">
                <h3 className="text-lg font-serif mb-5 md:mb-6 text-spa-ink font-semibold flex items-center gap-2">
                  <span className="bg-spa-olive text-white p-1 rounded-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </span>
                  {s('voucher_title')}
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
                  {cashVouchers.map((v) => (
                    <div key={v.amount} className="bg-white rounded-xl p-4 md:p-6 text-center border border-spa-sand/30 shadow-sm">
                      <div className="text-2xl font-light text-spa-ink mb-2">{s('currency')}{v.amount.toLocaleString()}</div>
                      <div className="bg-gold/90 text-white text-xs py-1 px-3 rounded-full inline-block">
                        {s('voucher_bonus')} {s('currency')}{v.bonus}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-spa-ink/60">{s('voucher_note')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-cream relative border-t border-spa-sand/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-2">{faq('title')}</h2>
            <p className="text-spa-ink/60">{faq('subtitle')}</p>
          </div>
          <div className="space-y-3 md:space-y-4">
            {faqKeys.map((key, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={key} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-spa-sand/20">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-serif text-spa-ink text-base md:text-lg pr-4">{faq(`items.${key}.q`)}</span>
                    <span className="bg-cream rounded-full p-2 text-spa-ink/60 shrink-0">
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-4 md:pb-5 text-spa-ink/70 text-sm leading-relaxed">
                        {faq(`items.${key}.a`)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src="/massagephoto.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#6B5A39]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 md:mb-6 font-bold">{t('hero_subtitle')}</h2>
          <p className="text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {about('story_p3')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="https://wa.me/85228032880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="tel:+85228032880"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors shadow-lg shadow-gold/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              2803 2880
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
