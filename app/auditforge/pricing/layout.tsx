export const metadata = {
  title: "Pricing — AuditForge",
  description: "One schema. One council. Every engagement governed.",
  openGraph: {
    title: "Pricing — AuditForge",
    description: "One schema. One council. Every engagement governed.",
    url: "https://www.dropdownlogistics.com/auditforge/pricing",
    images: [{ url: "/og-auditforge.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing — AuditForge",
    description: "One schema. One council. Every engagement governed.",
    images: ["/og-auditforge.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
