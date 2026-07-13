export const metadata = {
  title: "Vote Ledger — DDL Council",
  description: "Vote Ledger — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Vote Ledger — DDL Council",
    description: "Vote Ledger — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/vote-ledger",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vote Ledger — DDL Council",
    description: "Vote Ledger — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
