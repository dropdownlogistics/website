import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Drop Down Logistics — Chaos → Structured → Automated',
  description: 'A one-person operations studio building governed systems, dimensional architectures, and automation frameworks. Every tool documented. Every standard enforced. Every decision traceable.',
  openGraph: {
    title: 'Drop Down Logistics',
    description: 'Chaos → Structured → Automated. 44 governed systems. 65 enforced standards. Built to institutional grade.',
    type: 'website',
    url: 'https://dropdownlogistics.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drop Down Logistics',
    description: 'Chaos → Structured → Automated',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {/* Grain overlay for texture */}
        <div
          className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
