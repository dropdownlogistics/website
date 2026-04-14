export const metadata = {
  title: 'RedLine — CanonPress',
  description: 'Constraint documentation. When the system hits a wall, RedLine records it.',
  openGraph: {
    title: 'RedLine — CanonPress',
    description: 'Constraint documentation. When the system hits a wall, RedLine records it.',
    url: 'https://www.dropdownlogistics.com/canonpress/redline',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RedLine — CanonPress',
    description: 'Constraint documentation. When the system hits a wall, RedLine records it.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
