export const metadata = {
  title: 'PositionBook — Dropdown Logistics',
  description: 'You are not losing. You are not tracking. Trade intelligence from D&A Analytics.',
  openGraph: {
    title: 'PositionBook — Dropdown Logistics',
    description: 'You are not losing. You are not tracking. Trade intelligence from D&A Analytics.',
    url: 'https://www.dropdownlogistics.com/positionbook',
    images: [{ url: '/og-positionbook.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PositionBook — Dropdown Logistics',
    description: 'You are not losing. You are not tracking. Trade intelligence from D&A Analytics.',
    images: ['/og-positionbook.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
