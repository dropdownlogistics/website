export const metadata = {
  title: "BackEnd — Dropdown Logistics",
  description: "Backend — Dropdown Logistics.",
  openGraph: {
    title: "BackEnd — Dropdown Logistics",
    description: "Backend — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/backend",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BackEnd — Dropdown Logistics",
    description: "Backend — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
