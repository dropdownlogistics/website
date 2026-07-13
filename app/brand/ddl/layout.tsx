export const metadata = {
  title: "DDL Studio Brand Kit — Dropdown Logistics",
  description: "DDL Studio brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "DDL Studio Brand Kit — Dropdown Logistics",
    description: "DDL Studio brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/ddl",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DDL Studio Brand Kit — Dropdown Logistics",
    description: "DDL Studio brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
