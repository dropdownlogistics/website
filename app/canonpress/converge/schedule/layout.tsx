export const metadata = {
  title: "Schedule — CanonPress",
  description: "Nominators and reviewers rotate on an 8-week cycle. Fixed roles never rotate. Week 9+ repeats with domain variation.",
  openGraph: {
    title: "Schedule — CanonPress",
    description: "Nominators and reviewers rotate on an 8-week cycle. Fixed roles never rotate. Week 9+ repeats with domain variation.",
    url: "https://www.dropdownlogistics.com/canonpress/converge/schedule",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Schedule — CanonPress",
    description: "Nominators and reviewers rotate on an 8-week cycle. Fixed roles never rotate. Week 9+ repeats with domain variation.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
