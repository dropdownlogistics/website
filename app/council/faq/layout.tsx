export const metadata = {
  title: "Council FAQ — DDL Council",
  description: "Council FAQ — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Council FAQ — DDL Council",
    description: "Council FAQ — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/faq",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Council FAQ — DDL Council",
    description: "Council FAQ — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
