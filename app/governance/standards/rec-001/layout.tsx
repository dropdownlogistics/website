export const metadata = {
  title: "REC-001 — DDL Governance",
  description: "REC-001 — DDL Governance, Dropdown Logistics.",
  openGraph: {
    title: "REC-001 — DDL Governance",
    description: "REC-001 — DDL Governance, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/governance/standards/rec-001",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "REC-001 — DDL Governance",
    description: "REC-001 — DDL Governance, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
