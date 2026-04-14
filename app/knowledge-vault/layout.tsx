export const metadata = {
  title: 'Knowledge Vault — Dropdown Logistics',
  description: 'The front door for DDL institutional memory. 540K+ chunks across 9 collections.',
  openGraph: {
    title: 'Knowledge Vault — Dropdown Logistics',
    description: 'The front door for DDL institutional memory. 540K+ chunks across 9 collections.',
    url: 'https://www.dropdownlogistics.com/knowledge-vault',
    images: [{ url: '/og-kv.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Vault — Dropdown Logistics',
    description: 'The front door for DDL institutional memory. 540K+ chunks across 9 collections.',
    images: ['/og-kv.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
