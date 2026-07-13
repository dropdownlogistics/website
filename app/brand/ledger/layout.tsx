export const metadata = {
  title: "Ledger Brand Kit — Dropdown Logistics",
  description: "Ledger brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "Ledger Brand Kit — Dropdown Logistics",
    description: "Ledger brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/ledger",
    images: [{ url: "/og-ledger.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ledger Brand Kit — Dropdown Logistics",
    description: "Ledger brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-ledger.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
