export const metadata = {
  title: "RL-001 — CanonPress",
  description: "How prompt structure creates permission to fabricate",
  openGraph: {
    title: "RL-001 — CanonPress",
    description: "How prompt structure creates permission to fabricate",
    url: "https://www.dropdownlogistics.com/canonpress/redline/rl-001",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "RL-001 — CanonPress",
    description: "How prompt structure creates permission to fabricate",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
