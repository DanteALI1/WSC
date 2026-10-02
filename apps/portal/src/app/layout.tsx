import type { Metadata } from 'next';
import { Bricolage_Grotesque, Sora } from 'next/font/google';
import { WSC_BRAND } from '@wsc/ui';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-wsc-display',
  display: 'swap',
});

const body = Sora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-wsc-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: WSC_BRAND,
    template: `%s · ${WSC_BRAND}`,
  },
  description: 'Единый портал безопасного доступа к веб-приложениям',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body
        style={
          {
            ['--wsc-font-display' as string]: 'var(--font-wsc-display), sans-serif',
            ['--wsc-font-body' as string]: 'var(--font-wsc-body), sans-serif',
          } as React.CSSProperties
        }
      >
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>{children}</div>
      </body>
    </html>
  );
}
