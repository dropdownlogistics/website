export const metadata = {
  title: "DDL Section — DDL Studio",
  description: "DDL Section — DDL Studio, Dropdown Logistics.",
  openGraph: {
    title: "DDL Section — DDL Studio",
    description: "DDL Section — DDL Studio, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/ddl/section/[slug]",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DDL Section — DDL Studio",
    description: "DDL Section — DDL Studio, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
