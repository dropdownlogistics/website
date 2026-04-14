export const metadata = {
  title: 'GroundTruth — CanonPress',
  description: 'Operator direct observations. No model. No filter. The human layer.',
  openGraph: {
    title: 'GroundTruth — CanonPress',
    description: 'Operator direct observations. No model. No filter. The human layer.',
    url: 'https://www.dropdownlogistics.com/canonpress/groundtruth',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GroundTruth — CanonPress',
    description: 'Operator direct observations. No model. No filter. The human layer.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
