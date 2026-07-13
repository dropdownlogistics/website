export const metadata = {
  title: "Governance — Dropdown Logistics",
  description: "Governance — DDL Governance, Dropdown Logistics.",
  openGraph: {
    title: "Governance — Dropdown Logistics",
    description: "Governance — DDL Governance, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/governance",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Governance — Dropdown Logistics",
    description: "Governance — DDL Governance, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
