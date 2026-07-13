export const metadata = {
  title: "LeChat — Council Profile · DDL",
  description: "LeChat — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "LeChat — Council Profile · DDL",
    description: "LeChat — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/lechat",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "LeChat — Council Profile · DDL",
    description: "LeChat — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
