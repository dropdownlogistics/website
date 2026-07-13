export const metadata = {
  title: "AI Overview — Dropdown Logistics",
  description: "Ai — Dropdown Logistics.",
  openGraph: {
    title: "AI Overview — Dropdown Logistics",
    description: "Ai — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/ai",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Overview — Dropdown Logistics",
    description: "Ai — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
