'use client';

import { useTranslations } from 'next-intl';
import Breadcrumb from './Breadcrumb';

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;

export default function AboutPage() {
  const t = useTranslations('about');
  const tt = useTranslations('treatments');
  const nav = useTranslations('nav');

  return (
    <div>
      <Breadcrumb items={[{ label: nav('about') }]} />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-warm-brown text-center mb-4">
          {t('title')}
        </h1>
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-semibold text-warm-brown mb-6">
            {t('story_title')}
          </h2>
          <p className="text-warm-brown-dark/70 leading-relaxed mb-4">{t('story_p1')}</p>
          <p className="text-warm-brown-dark/70 leading-relaxed">{t('story_p2')}</p>
        </div>
      </section>

      <section className="bg-warm-brown-dark/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-warm-brown text-center mb-12">
            {t('team_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentKeys.map((key) => (
              <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/30">
                <h3 className="font-serif font-semibold text-lg text-warm-brown-dark mb-3">
                  {tt(`${key}.name`)}
                </h3>
                <p className="text-sm text-warm-brown-dark/60 leading-relaxed">
                  {tt(`${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}