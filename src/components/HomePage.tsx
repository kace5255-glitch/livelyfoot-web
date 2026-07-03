'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { mainServices, comboServices, otherServices, cashVouchers } from '@/data/services';
import { business } from '@/data/business';
import { buildWaLink } from '@/lib/whatsapp';
import { WhatsAppIcon, PhoneIcon } from './BookingCta';
import Reveal from './Reveal';

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;
const faqKeys = ['booking', 'duration', 'prenatal', 'voucher', 'hours', 'location'] as const;

// Treatments with a dedicated detail page link there; the rest go to the pricing page.
const treatmentLinks: Record<(typeof treatmentKeys)[number], string> = {
  foot_reflex: '/services/foot',
  body_acupoint: '/services/body',
  lymph: '/services/lymph',
  prenatal: '/services/prenatal',
  nail: '/services',
  guasha: '/services',
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
  const s = useTranslations('services');
  const faq = useTranslations('faq');
  const cta = useTranslations('cta');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen font-sans text-spa-ink bg-cream overflow-x-hidden">
      {/* Hero — full-bleed image */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[85vh] overflow-hidden">
        <Image
          src="/massagephoto.jpg"
          alt={t('hero_image_alt')}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-spa-ink/80 via-spa-ink/40 to-spa-ink/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-14 md:pb-20">
            <div className="max-w-2xl flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/50 bg-spa-ink/30 backdrop-blur-sm w-fit text-gold-light text-xs font-semibold tracking-widest uppercase">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {t('location_badge')}
              </div>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.15] text-white text-balance">
                {t('hero_title')}
              </h1>
              <p className="text-base md:text-xl text-white/80 max-w-md font-light leading-relaxed">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={buildWaLink(cta('wa_generic'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm font-semibold tracking-wider hover:bg-gold-light transition-colors shadow-lg shadow-spa-ink/30 flex items-center gap-2"
                >
                  {t('hero_book')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-20 md:py-32 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <Image src="/massage2.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-spa-bronze/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-14 md:mb-20">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold uppercase tracking-widest text-sm">{t('kicker_why')}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl mb-4 font-bold tracking-wide">{t('features_title')}</h2>
              <p className="font-serif italic text-white/80">{t('features_subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {(['experience', 'team', 'night', 'comfort'] as const).map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="text-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border border-gold/50 flex items-center justify-center mb-4 md:mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons[i]} />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">{t(`feature_${key}`)}</h3>
                  <p className="text-sm opacity-80 font-light">{t(`feature_${key}_desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments — minimal numbered cards */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-6">
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl md:text-4xl mb-3 md:mb-4">{t('treatments_title')}</h2>
                <p className="text-spa-ink/75 font-light">{t('treatments_subtitle')}</p>
              </div>
              <Link href="/services" className="text-gold text-sm font-semibold tracking-wider hover:text-spa-olive transition-colors flex items-center gap-1 shrink-0">
                {t('hero_cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {treatmentKeys.map((key, i) => (
              <Reveal key={key} delay={(i % 3) * 80}>
                <Link
                  href={treatmentLinks[key]}
                  className="group block h-full bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-spa-sand/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-serif text-4xl md:text-5xl font-light text-spa-sand group-hover:text-gold transition-colors duration-300 mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="w-10 h-[1px] bg-gold/40 mb-4" />
                  <h3 className="font-serif text-base md:text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                    {tt(`${key}.name`)}
                  </h3>
                  <p className="text-sm text-spa-ink/75 leading-relaxed font-light">
                    {tt(`${key}.description`)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-24 bg-cream relative border-t border-spa-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">{t('kicker_pricing')}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-4 md:mb-6">{s('title')}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="space-y-6 md:space-y-8">
              {/* Main Services */}
              <Reveal>
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-spa-sand/20">
                  <h3 className="text-lg font-serif mb-5 md:mb-6 text-spa-ink font-semibold flex items-center gap-2">
                    <span className="text-gold">✦</span> {s('main_title')}
                  </h3>
                  <div className="space-y-5 md:space-y-6">
                    {mainServices.map((sv) => (
                      <Link key={sv.id} href={`/services/${sv.id}`} className="group flex justify-between items-end border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="text-spa-ink font-medium mb-1 group-hover:text-gold transition-colors">{s(`main.${sv.id}`)}</div>
                          <div className="text-spa-ink/60 text-xs">{sv.durations.join(' / ')} {s('minutes')}</div>
                        </div>
                        <div className="text-spa-ink font-medium text-sm md:text-base shrink-0">
                          {sv.prices.map((p) => `${s('currency')}${p}`).join(' / ')}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
              {/* Other Services */}
              <Reveal>
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
              </Reveal>
            </div>
            <div className="space-y-6 md:space-y-8">
              {/* Combos */}
              <Reveal delay={80}>
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
              </Reveal>
              {/* Cash Vouchers */}
              <Reveal delay={80}>
                <div className="bg-spa-olive/10 border border-spa-olive/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8">
                  <h3 className="text-lg font-serif mb-5 md:mb-6 text-spa-ink font-semibold flex items-center gap-2">
                    <span className="bg-spa-olive text-white p-1 rounded-md">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-cream relative border-t border-spa-sand/30">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">{t('kicker_faq')}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-2">{faq('title')}</h2>
              <p className="text-spa-ink/75">{faq('subtitle')}</p>
            </div>
          </Reveal>
          <div className="space-y-3 md:space-y-4">
            {faqKeys.map((key, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={key} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-spa-sand/20">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-serif text-spa-ink text-base md:text-lg pr-4">{faq(`items.${key}.q`)}</span>
                    <span className="bg-cream rounded-full p-2 text-spa-ink/60 shrink-0">
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-4 md:pb-5 text-spa-ink/75 text-sm leading-relaxed">
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
          <Image src="/footmassage2.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-spa-bronze/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 md:mb-6 font-bold">{t('cta_title')}</h2>
            <p className="text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <a
                href={buildWaLink(cta('wa_generic'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors shadow-lg shadow-gold/20"
              >
                <PhoneIcon className="w-5 h-5" />
                {business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
