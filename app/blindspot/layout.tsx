export const metadata = {
  title: 'BlindSpot — Dropdown Logistics',
  description: "You're not losing. You're not seeing. Sports betting intelligence from D&A Analytics.",
  openGraph: {
    title: 'BlindSpot — Dropdown Logistics',
    description: "You're not losing. You're not seeing. Sports betting intelligence from D&A Analytics.",
    url: 'https://www.dropdownlogistics.com/blindspot',
    images: [{ url: '/og-blindspot.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlindSpot — Dropdown Logistics',
    description: "You're not losing. You're not seeing. Sports betting intelligence from D&A Analytics.",
    images: ['/og-blindspot.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
