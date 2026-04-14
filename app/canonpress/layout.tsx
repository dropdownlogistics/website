export const metadata = {
  title: 'CanonPress — Dropdown Logistics',
  description: 'Governed knowledge. Built in the open. Four series. One methodology. Nothing speculative.',
  openGraph: {
    title: 'CanonPress — Dropdown Logistics',
    description: 'Governed knowledge. Built in the open. Four series. One methodology. Nothing speculative.',
    url: 'https://www.dropdownlogistics.com/canonpress',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CanonPress — Dropdown Logistics',
    description: 'Governed knowledge. Built in the open. Four series. One methodology. Nothing speculative.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
