export const metadata = {
  title: "Meta AI — Council Profile · DDL",
  description: "Meta AI — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Meta AI — Council Profile · DDL",
    description: "Meta AI — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/meta-ai",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meta AI — Council Profile · DDL",
    description: "Meta AI — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
