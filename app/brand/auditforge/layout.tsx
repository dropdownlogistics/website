export const metadata = {
  title: "AuditForge Brand Kit — Dropdown Logistics",
  description: "AuditForge brand kit — CottageHumble design system, Dropdown Logistics.",
  openGraph: {
    title: "AuditForge Brand Kit — Dropdown Logistics",
    description: "AuditForge brand kit — CottageHumble design system, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/brand/auditforge",
    images: [{ url: "/og-auditforge.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AuditForge Brand Kit — Dropdown Logistics",
    description: "AuditForge brand kit — CottageHumble design system, Dropdown Logistics.",
    images: ["/og-auditforge.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
