'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { mainServices, comboServices, otherServices, cashVouchers } from '@/data/services';
import Breadcrumb from './Breadcrumb';
import BookingCta from './BookingCta';
import Reveal from './Reveal';

export default function ServicesPage() {
  const t = useTranslations('services');
  const nav = useTranslations('nav');

  return (
    <div>
      <Breadcrumb items={[{ label: nav('services') }]} />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-spa-ink mb-2">{t('title')}</h1>
          <p className="text-spa-ink/60">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Main + Other */}
          <div className="space-y-8">
            <Reveal>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30">
                <h2 className="text-lg font-serif font-semibold text-spa-ink mb-6 flex items-center gap-2">
                  <span className="text-gold">✦</span> {t('main_title')}
                </h2>
                <div className="space-y-5">
                  {mainServices.map((s) => (
                    <Link key={s.id} href={`/services/${s.id}`} className="group flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-spa-ink group-hover:text-gold transition-colors flex items-center gap-1.5">
                          {t(`main.${s.id}`)}
                          <svg className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </p>
                        <p className="text-sm text-spa-ink/60">
                          {s.durations.join(' / ')} {t('minutes')}
                        </p>
                      </div>
                      <p className="text-spa-ink font-medium whitespace-nowrap">
                        {s.prices.map((p) => `${t('currency')}${p}`).join(' / ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30">
                <h2 className="text-lg font-serif font-semibold text-spa-ink mb-6">{t('other_title')}</h2>
                <div className="space-y-4">
                  {otherServices.map((s) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <p className="text-spa-ink">{t(`other.${s.id}`)}</p>
                      <p className="text-spa-ink font-semibold">{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Combo + Vouchers */}
          <div className="space-y-8">
            <Reveal delay={80}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30">
                <h2 className="text-lg font-serif font-semibold text-spa-ink mb-1">{t('combo_title')}</h2>
                <p className="text-sm text-spa-ink/60 mb-6">{t('combo_subtitle')}</p>
                <div className="space-y-4">
                  {comboServices.map((s) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <p className="text-spa-ink">{t(`combo.${s.id}`)}</p>
                      <p className="text-spa-ink font-semibold">{t('currency')}{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="bg-spa-olive rounded-2xl p-6 text-cream">
                <h2 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  {t('voucher_title')}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {cashVouchers.map((v) => (
                    <div key={v.amount} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold">{t('currency')}{v.amount.toLocaleString()}</p>
                      <p className="mt-2 text-sm bg-gold text-white rounded-full px-3 py-1 inline-block font-medium">
                        {t('voucher_bonus')} {t('currency')}{v.bonus}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-cream/70 text-center">{t('voucher_note')}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12">
          <BookingCta />
        </div>
      </div>
    </div>
  );
}
