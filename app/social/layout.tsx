export const metadata = {
  title: "Social Hub — Dropdown Logistics",
  description: "One-person operations studio building governance-grade systems through AI collaboration. Chaos → Structured → Automated.",
  openGraph: {
    title: "Social Hub — Dropdown Logistics",
    description: "One-person operations studio building governance-grade systems through AI collaboration. Chaos → Structured → Automated.",
    url: "https://www.dropdownlogistics.com/social",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Social Hub — Dropdown Logistics",
    description: "One-person operations studio building governance-grade systems through AI collaboration. Chaos → Structured → Automated.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
