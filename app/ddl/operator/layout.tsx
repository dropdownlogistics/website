export const metadata = {
  title: "Operator — DDL Studio",
  description: "The architecture doesn't change. The data does.",
  openGraph: {
    title: "Operator — DDL Studio",
    description: "The architecture doesn't change. The data does.",
    url: "https://www.dropdownlogistics.com/ddl/operator",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Operator — DDL Studio",
    description: "The architecture doesn't change. The data does.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
