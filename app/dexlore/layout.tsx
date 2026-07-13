export const metadata = {
  title: "DexLore — Dropdown Logistics",
  description: "Dexlore — Dropdown Logistics.",
  openGraph: {
    title: "DexLore — Dropdown Logistics",
    description: "Dexlore — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/dexlore",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DexLore — Dropdown Logistics",
    description: "Dexlore — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
