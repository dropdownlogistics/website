export const metadata = {
  title: "Current — AuditForge",
  description: "AuditForge is a system of structure — not a system of execution. It defines what the control is. The auditor issues the opinion. AuditForge produces the evidence package. That line",
  openGraph: {
    title: "Current — AuditForge",
    description: "AuditForge is a system of structure — not a system of execution. It defines what the control is. The auditor issues the opinion. AuditForge produces the evidence package. That line",
    url: "https://www.dropdownlogistics.com/auditforge/current",
    images: [{ url: "/og-auditforge.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Current — AuditForge",
    description: "AuditForge is a system of structure — not a system of execution. It defines what the control is. The auditor issues the opinion. AuditForge produces the evidence package. That line",
    images: ["/og-auditforge.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
