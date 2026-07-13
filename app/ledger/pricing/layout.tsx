export const metadata = {
  title: "Pricing — Ledger",
  description: "The card ships free. The moat is portability.",
  openGraph: {
    title: "Pricing — Ledger",
    description: "The card ships free. The moat is portability.",
    url: "https://www.dropdownlogistics.com/ledger/pricing",
    images: [{ url: "/og-ledger.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing — Ledger",
    description: "The card ships free. The moat is portability.",
    images: ["/og-ledger.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
