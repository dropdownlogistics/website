export const metadata = {
  title: "Knowledge Vault Brand Kit — Dropdown Logistics",
  description: "Knowledge Vault brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "Knowledge Vault Brand Kit — Dropdown Logistics",
    description: "Knowledge Vault brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/knowledge-vault",
    images: [{ url: "/og-kv.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Knowledge Vault Brand Kit — Dropdown Logistics",
    description: "Knowledge Vault brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-kv.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
