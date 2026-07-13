export const metadata = {
  title: "PositionBook Brand Kit — Dropdown Logistics",
  description: "PositionBook brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "PositionBook Brand Kit — Dropdown Logistics",
    description: "PositionBook brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/positionbook",
    images: [{ url: "/og-positionbook.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PositionBook Brand Kit — Dropdown Logistics",
    description: "PositionBook brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-positionbook.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
