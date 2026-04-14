export const metadata = {
  title: 'AuditForge — Dropdown Logistics',
  description: 'The audit package generates itself. Governed audit documentation from structured data.',
  openGraph: {
    title: 'AuditForge — Dropdown Logistics',
    description: 'The audit package generates itself. Governed audit documentation from structured data.',
    url: 'https://www.dropdownlogistics.com/auditforge',
    images: [{ url: '/og-auditforge.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuditForge — Dropdown Logistics',
    description: 'The audit package generates itself. Governed audit documentation from structured data.',
    images: ['/og-auditforge.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
