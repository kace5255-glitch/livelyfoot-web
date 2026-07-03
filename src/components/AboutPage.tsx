'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumb from './Breadcrumb';
import Reveal from './Reveal';

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;

const treatmentLinks: Record<(typeof treatmentKeys)[number], string> = {
  foot_reflex: '/services/foot',
  body_acupoint: '/services/body',
  lymph: '/services/lymph',
  prenatal: '/services/prenatal',
  nail: '/services',
  guasha: '/services',
};

const hygieneKeys = ['1', '2', '3'] as const;

const hygieneIcons = [
  'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
];

export default function AboutPage() {
  const t = useTranslations('about');
  const tt = useTranslations('treatments');
  const nav = useTranslations('nav');

  return (
    <div>
      <Breadcrumb items={[{ label: nav('about') }]} />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-spa-ink text-center mb-4">
          {t('title')}
        </h1>
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-semibold text-spa-ink mb-6">
            {t('story_title')}
          </h2>
          <p className="text-spa-ink/75 leading-relaxed mb-4">{t('story_p1')}</p>
          <p className="text-spa-ink/75 leading-relaxed mb-4">{t('story_p2')}</p>
          <p className="text-spa-ink/75 leading-relaxed">{t('story_p3')}</p>
        </div>
      </section>

      {/* Hygiene & quality commitment */}
      <section className="bg-spa-olive/10 py-16 border-y border-spa-olive/15">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-serif font-bold text-spa-ink text-center mb-12">
              {t('hygiene_title')}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hygieneKeys.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30 text-center h-full">
                  <div className="w-14 h-14 mx-auto rounded-full bg-spa-olive/10 flex items-center justify-center text-spa-olive mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={hygieneIcons[i]} />
                    </svg>
                  </div>
                  <p className="text-sm text-spa-ink/75 leading-relaxed">{t(`hygiene_${key}`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-serif font-bold text-spa-ink text-center mb-12">
              {t('treatments_title')}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentKeys.map((key, i) => (
              <Reveal key={key} delay={(i % 3) * 80}>
                <Link
                  href={treatmentLinks[key]}
                  className="group block h-full bg-white rounded-2xl p-6 shadow-sm border border-spa-sand/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-serif font-semibold text-lg text-spa-ink group-hover:text-gold transition-colors mb-3">
                    {tt(`${key}.name`)}
                  </h3>
                  <p className="text-sm text-spa-ink/75 leading-relaxed">
                    {tt(`${key}.description`)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
