export const metadata = {
  title: "DDL Registry — Dropdown Logistics",
  description: "Registry — Dropdown Logistics.",
  openGraph: {
    title: "DDL Registry — Dropdown Logistics",
    description: "Registry — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/registry",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DDL Registry — Dropdown Logistics",
    description: "Registry — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
