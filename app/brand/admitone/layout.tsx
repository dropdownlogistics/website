export const metadata = {
  title: "AdmitOne Brand Kit — Dropdown Logistics",
  description: "AdmitOne brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "AdmitOne Brand Kit — Dropdown Logistics",
    description: "AdmitOne brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/admitone",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AdmitOne Brand Kit — Dropdown Logistics",
    description: "AdmitOne brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
