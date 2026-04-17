export const metadata = {
  title: 'SlopeStat — Dropdown Logistics',
  description: 'Your rides. Your boards. Your card. SlopeStat builds your verified Rider Card for every session on the mountain.',
  openGraph: {
    title: 'SlopeStat — Dropdown Logistics',
    description: 'Your rides. Your boards. Your card. SlopeStat builds your verified Rider Card for every session on the mountain.',
    url: 'https://www.dropdownlogistics.com/slopestat',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SlopeStat — Dropdown Logistics',
    description: 'Your rides. Your boards. Your card. SlopeStat builds your verified Rider Card for every session on the mountain.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
