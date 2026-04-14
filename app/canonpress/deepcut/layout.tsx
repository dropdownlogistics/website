export const metadata = {
  title: 'DeepCut — CanonPress',
  description: 'Single-model deep dives. One seat, one topic, full depth.',
  openGraph: {
    title: 'DeepCut — CanonPress',
    description: 'Single-model deep dives. One seat, one topic, full depth.',
    url: 'https://www.dropdownlogistics.com/canonpress/deepcut',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepCut — CanonPress',
    description: 'Single-model deep dives. One seat, one topic, full depth.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
