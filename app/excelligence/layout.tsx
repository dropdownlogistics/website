export const metadata = {
  title: 'Excelligence — Dropdown Logistics',
  description: 'Excel knowledge, governed and graphed. 105 entries, 228 edges, 4 tiers.',
  openGraph: {
    title: 'Excelligence — Dropdown Logistics',
    description: 'Excel knowledge, governed and graphed. 105 entries, 228 edges, 4 tiers.',
    url: 'https://www.dropdownlogistics.com/excelligence',
    images: [{ url: '/og-excelligence.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excelligence — Dropdown Logistics',
    description: 'Excel knowledge, governed and graphed. 105 entries, 228 edges, 4 tiers.',
    images: ['/og-excelligence.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
