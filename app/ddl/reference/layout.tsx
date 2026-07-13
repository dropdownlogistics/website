export const metadata = {
  title: "Reference — DDL Studio",
  description: "Reference — DDL Studio, Dropdown Logistics.",
  openGraph: {
    title: "Reference — DDL Studio",
    description: "Reference — DDL Studio, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/ddl/reference",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reference — DDL Studio",
    description: "Reference — DDL Studio, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
