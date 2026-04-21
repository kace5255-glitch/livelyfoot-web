import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const BASE_URL = 'https://livelyfoot-hk.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('about_title'),
    description: t('about_desc'),
    alternates: { canonical: `${BASE_URL}/${locale}/about` },
  };
}

const treatmentKeys = ['foot_reflex', 'body_acupoint', 'lymph', 'prenatal', 'nail', 'guasha'] as const;

export default function AboutPage() {
  const t = useTranslations('about');
  const tt = useTranslations('treatments');

  return (
    <div>
      {/* Story */}
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

      {/* Treatments Detail */}
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

      {/* Environment Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-warm-brown text-center mb-12">
          {t('environment_title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/3] bg-cream-dark rounded-2xl flex items-center justify-center text-warm-brown/30">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
