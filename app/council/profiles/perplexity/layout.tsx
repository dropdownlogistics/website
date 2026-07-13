export const metadata = {
  title: "Perplexity — Council Profile · DDL",
  description: "Perplexity — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Perplexity — Council Profile · DDL",
    description: "Perplexity — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/perplexity",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Perplexity — Council Profile · DDL",
    description: "Perplexity — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
