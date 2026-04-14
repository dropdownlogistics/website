export const metadata = {
  title: 'Operator Manifest — Dropdown Logistics',
  description: 'The DDL system as it stood on March 15, 2026. One operator. One studio. Eight wings. Everything here happened.',
  openGraph: {
    title: 'Operator Manifest — Dropdown Logistics',
    description: 'The DDL system as it stood on March 15, 2026. One operator. One studio. Eight wings. Everything here happened.',
    url: 'https://www.dropdownlogistics.com/legacy',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Operator Manifest — Dropdown Logistics',
    description: 'The DDL system as it stood on March 15, 2026. One operator. One studio. Eight wings. Everything here happened.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
