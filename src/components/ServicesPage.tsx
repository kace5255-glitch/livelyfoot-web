'use client';

import { useTranslations } from 'next-intl';
import { mainServices, comboServices, otherServices, cashVouchers } from '@/data/services';
import Breadcrumb from './Breadcrumb';

export default function ServicesPage() {
  const t = useTranslations('services');
  const nav = useTranslations('nav');

  return (
    <div>
      <Breadcrumb items={[{ label: nav('services') }]} />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-warm-brown mb-2">{t('title')}</h1>
        <p className="text-warm-brown-dark/50">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Main + Other */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/30">
            <h2 className="text-lg font-semibold text-warm-brown-dark mb-6 flex items-center gap-2">
              <span className="text-gold">✦</span> {t('main_title')}
            </h2>
            <div className="space-y-5">
              {mainServices.map((s) => (
                <div key={s.id} className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-warm-brown-dark">{t(`main.${s.id}`)}</p>
                    <p className="text-sm text-warm-brown-dark/50">
                      {s.durations.map((d) => d).join(' / ')} {t('min')}
                    </p>
                  </div>
                  <p className="text-warm-brown-dark font-medium whitespace-nowrap">
                    {s.prices.map((p) => `${t('currency')}${p}`).join(' / ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/30">
            <h2 className="text-lg font-semibold text-warm-brown-dark mb-6">{t('other_title')}</h2>
            <div className="space-y-4">
              {otherServices.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <p className="text-warm-brown-dark">{t(`other.${s.id}`)}</p>
                  <p className="text-warm-brown-dark font-semibold">{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Combo + Vouchers */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/30">
            <h2 className="text-lg font-semibold text-warm-brown-dark mb-1">{t('combo_title')}</h2>
            <p className="text-sm text-warm-brown-dark/50 mb-6">{t('combo_subtitle')}</p>
            <div className="space-y-4">
              {comboServices.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <p className="text-warm-brown-dark">{t(`combo.${s.id}`)}</p>
                  <p className="text-warm-brown-dark font-semibold">{t('currency')}{s.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-forest rounded-2xl p-6 text-cream">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎫</span> {t('voucher_title')}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {cashVouchers.map((v) => (
                <div key={v.amount} className="bg-forest-light/30 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{t('currency')}{v.amount.toLocaleString()}</p>
                  <p className="mt-2 text-sm bg-gold text-warm-brown-dark rounded-full px-3 py-1 inline-block font-medium">
                    {t('voucher_bonus')} {t('currency')}{v.bonus}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-cream/70 text-center">{t('voucher_note')}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
