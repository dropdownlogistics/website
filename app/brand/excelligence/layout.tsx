export const metadata = {
  title: "Excelligence Brand Kit — Dropdown Logistics",
  description: "Excelligence brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "Excelligence Brand Kit — Dropdown Logistics",
    description: "Excelligence brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/excelligence",
    images: [{ url: "/og-excelligence.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Excelligence Brand Kit — Dropdown Logistics",
    description: "Excelligence brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-excelligence.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
