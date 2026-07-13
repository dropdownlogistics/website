export const metadata = {
  title: "BlindSpot Brand Kit — Dropdown Logistics",
  description: "BlindSpot brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "BlindSpot Brand Kit — Dropdown Logistics",
    description: "BlindSpot brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/blindspot",
    images: [{ url: "/og-blindspot.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BlindSpot Brand Kit — Dropdown Logistics",
    description: "BlindSpot brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-blindspot.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
