export const metadata = {
  title: "Scaling — DDL Council",
  description: "Scaling — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Scaling — DDL Council",
    description: "Scaling — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/scaling",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Scaling — DDL Council",
    description: "Scaling — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
