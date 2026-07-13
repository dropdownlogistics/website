export const metadata = {
  title: "Other Works — Dropdown Logistics",
  description: "Other Works — Dropdown Logistics.",
  openGraph: {
    title: "Other Works — Dropdown Logistics",
    description: "Other Works — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/other-works",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Other Works — Dropdown Logistics",
    description: "Other Works — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
