export const metadata = {
  title: "AutoCouncil — DDL Council",
  description: "AutoCouncil — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "AutoCouncil — DDL Council",
    description: "AutoCouncil — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/auto-council",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AutoCouncil — DDL Council",
    description: "AutoCouncil — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
