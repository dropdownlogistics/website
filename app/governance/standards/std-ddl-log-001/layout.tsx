export const metadata = {
  title: "STD-DDL-LOG-001 — DDL Governance",
  description: "STD-DDL-LOG-001 — DDL Governance, Dropdown Logistics.",
  openGraph: {
    title: "STD-DDL-LOG-001 — DDL Governance",
    description: "STD-DDL-LOG-001 — DDL Governance, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/governance/standards/std-ddl-log-001",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "STD-DDL-LOG-001 — DDL Governance",
    description: "STD-DDL-LOG-001 — DDL Governance, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
