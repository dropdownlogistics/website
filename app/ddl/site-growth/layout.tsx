export const metadata = {
  title: "Site Growth — DDL Studio",
  description: "Site Growth — DDL Studio, Dropdown Logistics.",
  openGraph: {
    title: "Site Growth — DDL Studio",
    description: "Site Growth — DDL Studio, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/ddl/site-growth",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Site Growth — DDL Studio",
    description: "Site Growth — DDL Studio, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
