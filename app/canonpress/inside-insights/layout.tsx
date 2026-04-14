export const metadata = {
  title: 'InsideInsights — CanonPress',
  description: 'Meta-analysis of council reasoning patterns.',
  openGraph: {
    title: 'InsideInsights — CanonPress',
    description: 'Meta-analysis of council reasoning patterns.',
    url: 'https://www.dropdownlogistics.com/canonpress/inside-insights',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsideInsights — CanonPress',
    description: 'Meta-analysis of council reasoning patterns.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
