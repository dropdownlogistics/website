export const metadata = {
  title: "Poster — Excelligence",
  description: "The governed pattern registry for Excel knowledge.",
  openGraph: {
    title: "Poster — Excelligence",
    description: "The governed pattern registry for Excel knowledge.",
    url: "https://www.dropdownlogistics.com/excelligence/poster",
    images: [{ url: "/og-excelligence.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Poster — Excelligence",
    description: "The governed pattern registry for Excel knowledge.",
    images: ["/og-excelligence.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
