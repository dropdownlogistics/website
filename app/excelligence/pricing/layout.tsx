export const metadata = {
  title: "Pricing — Excelligence",
  description: "Pricing — Excelligence knowledge graph, Dropdown Logistics.",
  openGraph: {
    title: "Pricing — Excelligence",
    description: "Pricing — Excelligence knowledge graph, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/excelligence/pricing",
    images: [{ url: "/og-excelligence.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing — Excelligence",
    description: "Pricing — Excelligence knowledge graph, Dropdown Logistics.",
    images: ["/og-excelligence.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
