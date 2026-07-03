'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumb from './Breadcrumb';
import { business } from '@/data/business';
import { buildWaLink } from '@/lib/whatsapp';
import { WhatsAppIcon, PhoneIcon } from './BookingCta';

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
  const cta = useTranslations('cta');

  return (
    <div>
      <Breadcrumb
        items={[
          { label: nav('blog'), href: '/blog' },
          { label: title },
        ]}
      />

      {/* Elegant hero */}
      <div className="relative bg-gradient-to-b from-spa-ink via-spa-bronze to-spa-olive overflow-hidden">
        {/* Soft organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-spa-olive/20 blur-3xl" />
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
        <article className="bg-white rounded-3xl shadow-lg border border-spa-sand/20 overflow-hidden">
          {/* Gold accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="p-6 md:p-10 lg:p-14">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-spa-ink prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:relative prose-h2:pl-5 prose-h2:border-l-3 prose-h2:border-gold
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-spa-ink
                prose-p:text-spa-ink/70 prose-p:leading-[1.85] prose-p:text-base
                prose-li:text-spa-ink/70 prose-li:leading-[1.85]
                prose-ul:my-5 prose-ol:my-5
                prose-a:text-spa-olive prose-a:underline prose-a:underline-offset-4 prose-a:decoration-spa-olive/30 hover:prose-a:decoration-spa-olive
                prose-strong:text-spa-ink prose-strong:font-semibold
                prose-hr:border-spa-sand/30"
            >
              {children}
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-8 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-spa-ink to-spa-bronze p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <p className="text-gold-light font-serif text-xl font-semibold">{t('cta_title')}</p>
                <p className="text-cream/50 text-sm mt-1.5">{t('cta_desc')}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={buildWaLink(cta('wa_generic'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/25 transition-colors border border-white/20"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" />
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
            className="inline-flex items-center gap-2 text-spa-ink/70 hover:text-gold transition-colors text-sm font-medium"
          >
            <span aria-hidden="true">&larr;</span>
            {t('back')}
          </Link>
        </div>
      </div>
    </div>
  );
}
