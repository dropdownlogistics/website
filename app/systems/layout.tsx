export const metadata = {
  title: "Systems Registry — Dropdown Logistics",
  description: "Systems — Dropdown Logistics.",
  openGraph: {
    title: "Systems Registry — Dropdown Logistics",
    description: "Systems — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/systems",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Systems Registry — Dropdown Logistics",
    description: "Systems — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
