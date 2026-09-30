export const metadata = {
  title: "Feed — CanonPress",
  description: "Every CanonPress artifact currently cleared for publication, rendered from the governed contract — one template, not one hand-authored page per artifact.",
  openGraph: {
    title: "Feed — CanonPress",
    description: "Every CanonPress artifact currently cleared for publication, rendered from the governed contract.",
    url: "https://www.dropdownlogistics.com/canonpress/feed",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Feed — CanonPress",
    description: "Every CanonPress artifact currently cleared for publication, rendered from the governed contract.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
