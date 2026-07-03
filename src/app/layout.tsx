import './globals.css';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans-next',
  display: 'swap',
});

const notoSerif = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-serif-next',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
