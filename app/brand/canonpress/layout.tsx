export const metadata = {
  title: "CanonPress Brand Kit — Dropdown Logistics",
  description: "CanonPress brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "CanonPress Brand Kit — Dropdown Logistics",
    description: "CanonPress brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/canonpress",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CanonPress Brand Kit — Dropdown Logistics",
    description: "CanonPress brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
