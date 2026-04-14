export const metadata = {
  title: 'Converge — CanonPress',
  description: 'Multi-model deliberation. Weekly. The full council sequence publishes.',
  openGraph: {
    title: 'Converge — CanonPress',
    description: 'Multi-model deliberation. Weekly. The full council sequence publishes.',
    url: 'https://www.dropdownlogistics.com/canonpress/converge',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Converge — CanonPress',
    description: 'Multi-model deliberation. Weekly. The full council sequence publishes.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
