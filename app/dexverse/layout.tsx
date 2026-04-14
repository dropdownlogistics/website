export const metadata = {
  title: 'DexVerse — Dropdown Logistics',
  description: 'The local AI layer. Dex Jr. on RTX 3070. 540K+ chunks. The rig stays awake.',
  openGraph: {
    title: 'DexVerse — Dropdown Logistics',
    description: 'The local AI layer. Dex Jr. on RTX 3070. 540K+ chunks. The rig stays awake.',
    url: 'https://www.dropdownlogistics.com/dexverse',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DexVerse — Dropdown Logistics',
    description: 'The local AI layer. Dex Jr. on RTX 3070. 540K+ chunks. The rig stays awake.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
