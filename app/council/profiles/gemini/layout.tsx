export const metadata = {
  title: "Gemini — Council Profile · DDL",
  description: "Gemini — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "Gemini — Council Profile · DDL",
    description: "Gemini — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/gemini",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gemini — Council Profile · DDL",
    description: "Gemini — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
