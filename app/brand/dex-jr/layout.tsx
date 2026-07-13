export const metadata = {
  title: "Dex Jr. Brand Kit — Dropdown Logistics",
  description: "Dex Jr. brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "Dex Jr. Brand Kit — Dropdown Logistics",
    description: "Dex Jr. brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/dex-jr",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dex Jr. Brand Kit — Dropdown Logistics",
    description: "Dex Jr. brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
