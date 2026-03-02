export const metadata = { title: 'Private â€” DDL' };

const pages = [
  { href: '/private/ace', title: 'ACE Explained', desc: 'The framework, simply' },
  { href: '/private/ace-tools', title: 'ACE Tools Integration', desc: 'The full picture' },
  { href: '/private/convergence', title: 'Convergence Brief', desc: 'Architecture document' },
  { href: '/private/kitchens-hotze', title: 'Kitchens x Hotze', desc: 'Collaboration architecture' },
  { href: '/private/convergence-console', title: 'The Convergence', desc: 'CONSOLE view' },
  { href: '/private/lambert', title: 'Lambert Arc', desc: 'CHRONICLE' },
];

export default function PrivatePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F1EB', padding: '48px 24px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#B23531', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          Private Wing
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Unlisted Pages
        </h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14, color: 'rgba(245,241,235,0.5)', marginBottom: 32 }}>
          Not linked from public nav. URL-only access.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pages.map(p => (
            <a key={p.href} href={p.href} style={{
              display: 'block', padding: '16px 20px', background: '#10202f',
              border: '1px solid rgba(245,241,235,0.06)', borderRadius: 7,
              textDecoration: 'none',
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#F5F1EB', marginBottom: 3 }}>{p.title}</div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 12, color: 'rgba(245,241,235,0.4)' }}>{p.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
