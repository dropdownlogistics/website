import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import LayoutFooter from '@/components/LayoutFooter';
const SiteNav = dynamic(() => import('@/components/SiteNav'), {
  ssr: false,
  loading: () => <div style={{ height: 60 }} />,
});
const SearchProvider = dynamic(() => import('@/components/SearchProvider'), {
  ssr: false,
});
export const metadata: Metadata = {
  metadataBase: new URL('https://www.dropdownlogistics.com'),
  title: 'Dropdown Logistics',
  description: 'Chaos → Structured → Automated. One-person ops studio.',
  openGraph: {
    title: 'Dropdown Logistics',
    description: 'Humble surface. Cathedral underneath. One operator. Chaos → Structured → Automated.',
    url: 'https://www.dropdownlogistics.com',
    siteName: 'Dropdown Logistics',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dropdown Logistics' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dropdown Logistics',
    description: 'Humble surface. Cathedral underneath.',
    images: ['/og-image.png'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0, padding: 0, minHeight: '100vh',
        background: '#0F1A2E', color: '#F5F1EB',
        fontFamily: "'Source Serif 4', serif",
      }}>
        <div aria-hidden style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.035,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <SiteNav />
          <SearchProvider />
          <main>{children}</main>
          <LayoutFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
