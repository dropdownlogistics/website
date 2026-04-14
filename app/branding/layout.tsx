export const metadata = {
  title: 'CottageHumble — Dropdown Logistics',
  description: 'One design system. Nine products. Humble surface. Cathedral underneath.',
  openGraph: {
    title: 'CottageHumble — Dropdown Logistics',
    description: 'One design system. Nine products. Humble surface. Cathedral underneath.',
    url: 'https://www.dropdownlogistics.com/branding',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CottageHumble — Dropdown Logistics',
    description: 'One design system. Nine products. Humble surface. Cathedral underneath.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
