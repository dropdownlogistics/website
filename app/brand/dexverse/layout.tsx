export const metadata = {
  title: "DexVerse Brand Kit — Dropdown Logistics",
  description: "DexVerse brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "DexVerse Brand Kit — Dropdown Logistics",
    description: "DexVerse brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/dexverse",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DexVerse Brand Kit — Dropdown Logistics",
    description: "DexVerse brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
