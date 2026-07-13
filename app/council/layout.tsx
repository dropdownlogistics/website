export const metadata = {
  title: "DDL Council — Dropdown Logistics",
  description: "Council — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "DDL Council — Dropdown Logistics",
    description: "Council — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DDL Council — Dropdown Logistics",
    description: "Council — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
