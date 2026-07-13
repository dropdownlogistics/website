export const metadata = {
  title: "WorkBench Brand Kit — Dropdown Logistics",
  description: "WorkBench brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "WorkBench Brand Kit — Dropdown Logistics",
    description: "WorkBench brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/workbench",
    images: [{ url: "/og-workbench.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "WorkBench Brand Kit — Dropdown Logistics",
    description: "WorkBench brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-workbench.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
