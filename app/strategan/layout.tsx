export const metadata = {
  title: "Strategan — Dropdown Logistics",
  description: "Strategan — Dropdown Logistics.",
  openGraph: {
    title: "Strategan — Dropdown Logistics",
    description: "Strategan — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/strategan",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Strategan — Dropdown Logistics",
    description: "Strategan — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
