'use client';

import { useTranslations } from 'next-intl';
import { business } from '@/data/business';
import { buildWaLink } from '@/lib/whatsapp';
import { WhatsAppIcon, PhoneIcon } from './BookingCta';

export default function MobileBookingBar() {
  const t = useTranslations('cta');

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-spa-sand/40 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={buildWaLink(t('wa_generic'))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold py-3 rounded-full"
        >
          <WhatsAppIcon className="w-4 h-4" />
          {t('whatsapp')}
        </a>
        <a
          href={`tel:${business.phone}`}
          className="flex items-center justify-center gap-2 bg-spa-ink text-white text-sm font-semibold py-3 rounded-full"
        >
          <PhoneIcon className="w-4 h-4" />
          {t('call')}
        </a>
      </div>
    </div>
  );
}
