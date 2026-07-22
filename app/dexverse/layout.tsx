import { METRICS } from '@/lib/metrics';

const _desc = `The local AI layer. Dex Jr. on RTX 3070. ${METRICS.CORPUS_CHUNKS} chunks. The rig stays awake.`;

export const metadata = {
  title: 'DexVerse — Dropdown Logistics',
  description: _desc,
  openGraph: {
    title: 'DexVerse — Dropdown Logistics',
    description: _desc,
    url: 'https://www.dropdownlogistics.com/dexverse',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DexVerse — Dropdown Logistics',
    description: _desc,
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
