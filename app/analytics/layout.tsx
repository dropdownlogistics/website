export const metadata = {
  title: "Analytics Hub — Dropdown Logistics",
  description: "Same engine. Different data.",
  openGraph: {
    title: "Analytics Hub — Dropdown Logistics",
    description: "Same engine. Different data.",
    url: "https://www.dropdownlogistics.com/analytics",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Analytics Hub — Dropdown Logistics",
    description: "Same engine. Different data.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
