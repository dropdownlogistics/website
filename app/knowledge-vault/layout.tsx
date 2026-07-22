import { METRICS } from '@/lib/metrics';

const _desc = `The front door for DDL institutional memory. ${METRICS.CORPUS_CHUNKS} chunks across ${METRICS.CORPUS_COLLECTIONS} collections.`;

export const metadata = {
  title: 'Knowledge Vault — Dropdown Logistics',
  description: _desc,
  openGraph: {
    title: 'Knowledge Vault — Dropdown Logistics',
    description: _desc,
    url: 'https://www.dropdownlogistics.com/knowledge-vault',
    images: [{ url: '/og-kv.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Vault — Dropdown Logistics',
    description: _desc,
    images: ['/og-kv.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
