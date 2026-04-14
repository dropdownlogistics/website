export const metadata = {
  title: 'System Stack — Dropdown Logistics',
  description: 'Five domains. One deterministic system. Each runs on governed structure. Together, they eliminate guesswork.',
  openGraph: {
    title: 'System Stack — Dropdown Logistics',
    description: 'Five domains. One deterministic system. Each runs on governed structure. Together, they eliminate guesswork.',
    url: 'https://www.dropdownlogistics.com/system-stack',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Stack — Dropdown Logistics',
    description: 'Five domains. One deterministic system. Each runs on governed structure. Together, they eliminate guesswork.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
