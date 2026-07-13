export const metadata = {
  title: "CR-LLMS-003 — DDL Council",
  description: "CR-LLMS-003 — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "CR-LLMS-003 — DDL Council",
    description: "CR-LLMS-003 — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/reviews/cr-llms-003",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CR-LLMS-003 — DDL Council",
    description: "CR-LLMS-003 — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
