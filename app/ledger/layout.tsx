export const metadata = {
  title: 'Ledger — Dropdown Logistics',
  description: 'LinkedIn is self-reported. This is verified. The credential layer for professional work.',
  openGraph: {
    title: 'Ledger — Dropdown Logistics',
    description: 'LinkedIn is self-reported. This is verified. The credential layer for professional work.',
    url: 'https://www.dropdownlogistics.com/ledger',
    images: [{ url: '/og-ledger.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ledger — Dropdown Logistics',
    description: 'LinkedIn is self-reported. This is verified. The credential layer for professional work.',
    images: ['/og-ledger.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
