export const metadata = {
  title: "STD-0066 Narrative — DDL Council",
  description: "STD-0066 Narrative — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "STD-0066 Narrative — DDL Council",
    description: "STD-0066 Narrative — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/std-0066-narrative",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "STD-0066 Narrative — DDL Council",
    description: "STD-0066 Narrative — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
