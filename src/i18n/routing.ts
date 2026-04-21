import { defineRouting } from 'next-intl/routing';

export const locales = [
  'zh-TW', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'pt',
  'it', 'ru', 'ar', 'th', 'vi', 'id', 'ms', 'nl', 'tr', 'hi'
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'zh-TW',
});
