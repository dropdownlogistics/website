export const metadata = {
  title: "GT-002 — CanonPress",
  description: "On almost discarding a real idea because of the skin someone else put on it.",
  openGraph: {
    title: "GT-002 — CanonPress",
    description: "On almost discarding a real idea because of the skin someone else put on it.",
    url: "https://www.dropdownlogistics.com/canonpress/groundtruth/gt-002",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "GT-002 — CanonPress",
    description: "On almost discarding a real idea because of the skin someone else put on it.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
