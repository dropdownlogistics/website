export const metadata = {
  title: "Brand Hub — Dropdown Logistics",
  description: "Dropdown Logistics brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "Brand Hub — Dropdown Logistics",
    description: "Dropdown Logistics brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Brand Hub — Dropdown Logistics",
    description: "Dropdown Logistics brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
