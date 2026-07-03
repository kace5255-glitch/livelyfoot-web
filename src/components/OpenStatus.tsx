'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// Business hours are 10:00–24:00 Hong Kong time, daily.
function isOpenNow(): boolean {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: 'Asia/Hong_Kong',
    }).format(new Date())
  );
  return hour >= 10;
}

export default function OpenStatus({ className = '' }: { className?: string }) {
  const t = useTranslations('openStatus');
  // null until mounted to avoid SSR/client hydration mismatch on time
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenNow());
    const timer = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (open === null) return null;

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span
        className={`w-2 h-2 rounded-full ${open ? 'bg-emerald-500' : 'bg-spa-sand'}`}
        aria-hidden="true"
      />
      {open ? t('open_now') : t('closed_now')}
    </span>
  );
}
