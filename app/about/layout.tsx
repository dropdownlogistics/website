export const metadata = {
  title: "About — Dropdown Logistics",
  description: "About — Dropdown Logistics.",
  openGraph: {
    title: "About — Dropdown Logistics",
    description: "About — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About — Dropdown Logistics",
    description: "About — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
