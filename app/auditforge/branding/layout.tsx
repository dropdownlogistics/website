export const metadata = {
  title: "Branding — AuditForge",
  description: "Branding — AuditForge, Dropdown Logistics.",
  openGraph: {
    title: "Branding — AuditForge",
    description: "Branding — AuditForge, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/auditforge/branding",
    images: [{ url: "/og-auditforge.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Branding — AuditForge",
    description: "Branding — AuditForge, Dropdown Logistics.",
    images: ["/og-auditforge.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
