export const metadata = {
  title: "Little to Know Experience — D.K. Hale",
  description: "Memoir — Dropdown Logistics.",
  openGraph: {
    title: "Little to Know Experience — D.K. Hale",
    description: "Memoir — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/memoir",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Little to Know Experience — D.K. Hale",
    description: "Memoir — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
