import { METRICS } from '@/lib/metrics';

const _desc = `Excel knowledge, governed and graphed. ${METRICS.EXCEL_ENTRIES} entries, ${METRICS.EXCEL_EDGES} edges, ${METRICS.EXCEL_TIERS} tiers.`;

export const metadata = {
  title: 'Excelligence — Dropdown Logistics',
  description: _desc,
  openGraph: {
    title: 'Excelligence — Dropdown Logistics',
    description: _desc,
    url: 'https://www.dropdownlogistics.com/excelligence',
    images: [{ url: '/og-excelligence.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excelligence — Dropdown Logistics',
    description: _desc,
    images: ['/og-excelligence.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
