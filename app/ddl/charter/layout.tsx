export const metadata = {
  title: "Charter — DDL Studio",
  description: "Charter — DDL Studio, Dropdown Logistics.",
  openGraph: {
    title: "Charter — DDL Studio",
    description: "Charter — DDL Studio, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/ddl/charter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Charter — DDL Studio",
    description: "Charter — DDL Studio, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
