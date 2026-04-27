'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumb from './Breadcrumb';

export default function BlogPost({
  title,
  date,
  description,
  readingTime,
  children,
}: {
  title: string;
  date: string;
  description: string;
  readingTime: number;
  children: React.ReactNode;
}) {
  const t = useTranslations('blog');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact');

  return (
    <div>
      <Breadcrumb
        items={[
          { label: nav('blog'), href: '/blog' },
          { label: title },
        ]}
      />

      {/* Elegant hero */}
      <div className="relative bg-gradient-to-b from-warm-brown-dark via-warm-brown to-warm-brown-light overflow-hidden">
        {/* Soft organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-warm-brown-light/20 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-gold-light" />
            <time className="text-gold-light/80 text-sm tracking-wider uppercase">{date}</time>
            <span className="w-1 h-1 rounded-full bg-gold-light/50" />
            <span className="text-gold-light/80 text-sm tracking-wider">{t('read_time', { min: readingTime })}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-5 text-cream/60 text-lg leading-relaxed max-w-2xl font-light">
            {description}
          </p>
        </div>
      </div>

      {/* Article body — overlaps hero */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        <article className="bg-white rounded-3xl shadow-lg border border-cream-dark/20 overflow-hidden">
          {/* Gold accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="p-6 md:p-10 lg:p-14">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-warm-brown prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:relative prose-h2:pl-5 prose-h2:border-l-3 prose-h2:border-gold
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-warm-brown-dark
                prose-p:text-warm-brown-dark/65 prose-p:leading-[1.85] prose-p:text-base
                prose-li:text-warm-brown-dark/65 prose-li:leading-[1.85]
                prose-ul:my-5 prose-ol:my-5
                prose-a:text-forest prose-a:underline prose-a:underline-offset-4 prose-a:decoration-forest/30 hover:prose-a:decoration-forest
                prose-strong:text-warm-brown-dark prose-strong:font-semibold
                prose-hr:border-cream-dark/30"
            >
              {children}
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-8 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-warm-brown-dark to-warm-brown p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <p className="text-gold-light font-serif text-xl font-semibold">{t('cta_title')}</p>
                <p className="text-cream/50 text-sm mt-1.5">{t('cta_desc')}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/85228032880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/25 transition-colors border border-white/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.822-6.34-2.2l-.442-.37-3.09 1.036 1.036-3.09-.37-.442A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  WhatsApp
                </a>
                <a
                  href="tel:+85228032880"
                  className="inline-flex items-center gap-2 bg-gold text-warm-brown-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {contact('call')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-warm-brown/70 hover:text-warm-brown transition-colors text-sm font-medium"
          >
            <span aria-hidden="true">&larr;</span>
            {t('back')}
          </Link>
        </div>
      </div>
    </div>
  );
}
