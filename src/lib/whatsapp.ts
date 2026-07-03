import { business } from '@/data/business';

export function buildWaLink(text?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
