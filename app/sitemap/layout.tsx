export const metadata = {
  title: "Site Map — Dropdown Logistics",
  description: "Sitemap — Dropdown Logistics.",
  openGraph: {
    title: "Site Map — Dropdown Logistics",
    description: "Sitemap — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/sitemap",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Site Map — Dropdown Logistics",
    description: "Sitemap — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
