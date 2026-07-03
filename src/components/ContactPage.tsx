'use client';

import { useTranslations } from 'next-intl';
import Breadcrumb from './Breadcrumb';
import OpenStatus from './OpenStatus';
import { business } from '@/data/business';
import { buildWaLink } from '@/lib/whatsapp';
import { WhatsAppIcon, PhoneIcon } from './BookingCta';

export default function ContactPage() {
  const t = useTranslations('contact');
  const nav = useTranslations('nav');
  const cta = useTranslations('cta');

  return (
    <div>
      <Breadcrumb items={[{ label: nav('contact') }]} />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-spa-ink mb-3">{t('title')}</h1>
          <p className="text-spa-ink/60">{t('subtitle')}</p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-spa-sand/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-spa-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-spa-ink mb-1">{t('address_label')}</p>
                <p className="text-sm text-spa-ink/75">{t('address')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center shrink-0">
                <PhoneIcon className="w-5 h-5 text-spa-olive" />
              </div>
              <div>
                <p className="font-semibold text-spa-ink mb-1">{t('phone_label')}</p>
                <p className="text-sm">
                  <a href={`tel:${business.phone}`} className="text-spa-ink/75 hover:text-gold transition-colors">{t('phone')}</a>
                </p>
                <p className="text-sm">
                  <a href={`tel:${business.phone2}`} className="text-spa-ink/75 hover:text-gold transition-colors">{t('phone2')}</a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-spa-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-spa-ink mb-1">{t('hours_label')}</p>
                <p className="text-sm text-spa-ink/75">{t('hours')}</p>
                <OpenStatus className="mt-1 text-spa-ink/75" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={buildWaLink(cta('wa_generic'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t('whatsapp')}
            </a>
            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center gap-2 bg-spa-ink hover:bg-spa-bronze text-cream font-medium px-6 py-3 rounded-full transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              {t('call')}
            </a>
            <a
              href={business.links.map}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-cream-dark text-spa-ink font-medium px-6 py-3 rounded-full border border-spa-sand transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {t('map')}
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="bg-spa-ink rounded-t-2xl px-4 py-3 text-cream text-center text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {t('map_title')}
        </div>
        <div className="aspect-[16/9] rounded-b-2xl overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.235970322618!2d114.18279787529167!3d22.269049479709086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404004e9e591037%3A0x9233955ef53cb520!2zTGl2ZWx5IEZvb3QgLSDmtLvlipvotrM!5e0!3m2!1szh-TW!2shk!4v1776845672687!5m2!1szh-TW!2shk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('map_title')}
          />
        </div>
      </div>
    </div>
  );
}
