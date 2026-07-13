export const metadata = {
  title: "Grok — Council Profile · DDL",
  description: "Grok — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Grok — Council Profile · DDL",
    description: "Grok — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/grok",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Grok — Council Profile · DDL",
    description: "Grok — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
