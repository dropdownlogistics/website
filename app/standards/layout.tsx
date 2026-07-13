export const metadata = {
  title: "Standards Registry — Dropdown Logistics",
  description: "Standards — Dropdown Logistics.",
  openGraph: {
    title: "Standards Registry — Dropdown Logistics",
    description: "Standards — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/standards",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Standards Registry — Dropdown Logistics",
    description: "Standards — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
