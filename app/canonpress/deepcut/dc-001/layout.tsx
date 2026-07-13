export const metadata = {
  title: "DC-001 — CanonPress",
  description: "A single-seat analysis of how the shift from one series to four maps against Donella Meadows' hierarchy of system interventions.",
  openGraph: {
    title: "DC-001 — CanonPress",
    description: "A single-seat analysis of how the shift from one series to four maps against Donella Meadows' hierarchy of system interventions.",
    url: "https://www.dropdownlogistics.com/canonpress/deepcut/dc-001",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DC-001 — CanonPress",
    description: "A single-seat analysis of how the shift from one series to four maps against Donella Meadows' hierarchy of system interventions.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
