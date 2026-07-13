export const metadata = {
  title: "Claude — Council Profile · DDL",
  description: "Claude — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Claude — Council Profile · DDL",
    description: "Claude — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/claude",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Claude — Council Profile · DDL",
    description: "Claude — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
