'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog';

function estimateReadingTime(content: string) {
  return Math.max(1, Math.ceil(content.length / 500));
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog');

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-warm-brown-dark via-warm-brown to-warm-brown-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-warm-brown-light/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center relative">
          <span className="inline-block w-12 h-px bg-gold-light mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-4 text-cream/55 text-lg font-light max-w-lg mx-auto">{t('subtitle')}</p>
          <span className="inline-block w-12 h-px bg-gold-light mt-6" />
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <p className="text-warm-brown-dark/50">{t('empty')}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-3xl shadow-sm border border-cream-dark/20 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left accent */}
                  <div className={`md:w-2 shrink-0 h-1.5 md:h-auto ${i % 2 === 0 ? 'bg-gradient-to-b from-gold to-gold-light' : 'bg-gradient-to-b from-forest to-forest-light'}`} />

                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center gap-3 text-sm text-warm-brown-dark/45 mb-3">
                      <time>{post.date}</time>
                      <span className="w-1 h-1 rounded-full bg-warm-brown-dark/25" />
                      <span>{t('read_time', { min: estimateReadingTime(post.content) })}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif font-bold text-warm-brown group-hover:text-warm-brown-dark transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-warm-brown-dark/55 text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                      {t('read_more')}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
