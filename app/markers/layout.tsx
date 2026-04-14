export const metadata = {
  title: 'Ecosystem Markers — Dropdown Logistics',
  description: 'Eight thresholds. Twenty-six months. One operator. The DDL ecosystem markers.',
  openGraph: {
    title: 'Ecosystem Markers — Dropdown Logistics',
    description: 'Eight thresholds. Twenty-six months. One operator. The DDL ecosystem markers.',
    url: 'https://www.dropdownlogistics.com/markers',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecosystem Markers — Dropdown Logistics',
    description: 'Eight thresholds. Twenty-six months. One operator. The DDL ecosystem markers.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
