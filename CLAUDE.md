# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LivelyFoot (活力足) is a marketing website for a massage spa in Happy Valley, Hong Kong. Built with Next.js 14 (App Router), Tailwind CSS v4, and next-intl for i18n across 18 locales. The site is a Supabase-backed, server-rendered, SEO-optimized business site — not a SPA.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build (standalone output for Docker)
- `npm run start` — serve production build
- `npm run lint` — run Next.js lint

No test framework is configured.

## Architecture

### Routing & i18n

All pages live under `src/app/[locale]/`. The `next-intl` middleware (`src/middleware.ts`) handles locale detection and routing. Default locale is `zh-TW`. Locale config is in `src/i18n/routing.ts`.

Always use the navigation helpers from `src/i18n/navigation.ts` (`Link`, `redirect`, `usePathname`, `useRouter`) instead of `next/link` or `next/navigation` — they handle locale prefixing.

Translation files are in `messages/{locale}.json`. All 18 locales share the same key structure. When adding a new translatable string, add it to all 18 message files.

### Page Structure

Pages are thin server components in `src/app/[locale]/` that handle metadata and JSON-LD, then render a corresponding client component from `src/components/`. Pattern:
- `src/app/[locale]/page.tsx` → `src/components/HomePage.tsx`
- `src/app/[locale]/contact/page.tsx` → `src/components/ContactPage.tsx`

Pages: Home (`/`), Services/Pricing (`/services`), Treatments/About (`/about`), Blog (`/blog`), Contact (`/contact`), Service Detail (`/services/[serviceId]`).

### Blog

Blog posts are MDX files in `content/blog/{locale}/`. Currently `zh-TW` and `en` have posts; other locales fall back to `en`. Posts are loaded via `src/lib/blog.ts` using gray-matter for frontmatter and `next-mdx-remote` for rendering. Blog slugs are defined by frontmatter `slug` or filename.

### Data Layer

- **Services/Pricing**: Hardcoded in `src/data/services.ts` — service IDs, durations, prices. Referenced by service detail pages and homepage pricing section.
- **Supabase**: Client in `src/lib/supabase.ts` (browser) and `src/lib/supabase-server.ts` (server/service role). Used for contact form submissions. Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Custom theme colors and fonts are defined in `src/app/globals.css` using `@theme` — not a `tailwind.config` file. Key design tokens: `cream`, `warm-brown`, `forest`, `gold`, `spa-ink`, `spa-olive`, `spa-sand`. Fonts: Noto Sans TC (body), Noto Serif TC (headings).

### SEO

- JSON-LD components in `src/components/JsonLd.tsx` (LocalBusiness, FAQ, Service, BlogPosting, Breadcrumb).
- Sitemap at `src/app/sitemap.ts`, robots at `src/app/robots.ts`.
- All pages generate per-locale metadata with `generateMetadata`.
- Base URL: `https://livelyfoot-hk.com`.

### Deployment

Docker multi-stage build (`Dockerfile`) using Next.js standalone output. Runs as non-root `nextjs` user on port 3000.

### Ignored Directory

`Web/` is a legacy Vite prototype — excluded from tsconfig and not part of the active app. Do not modify it.
