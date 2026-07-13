export const metadata = {
  title: "DexOS — Dropdown Logistics",
  description: "Dexos — Dropdown Logistics.",
  openGraph: {
    title: "DexOS — Dropdown Logistics",
    description: "Dexos — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/dexos",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DexOS — Dropdown Logistics",
    description: "Dexos — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
