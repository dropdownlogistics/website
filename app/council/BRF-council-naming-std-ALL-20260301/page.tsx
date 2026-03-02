import fs from 'fs';
import path from 'path';

export const metadata = { title: 'BRF — Council Naming Standard — DDL' };

export default function Page() {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'public/council/BRF-council-naming-std-ALL-20260301.md'),
    'utf-8'
  );

  return (
    <div style={{
      maxWidth: 800, margin: '0 auto', padding: '48px 24px',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: '#F5F1EB', background: '#0D1B2A', minHeight: '100vh',
    }}>
      <pre style={{
        whiteSpace: 'pre-wrap', wordWrap: 'break-word',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
        lineHeight: 1.7, color: 'rgba(245,241,235,0.7)',
      }}>
        {content}
      </pre>
    </div>
  );
}
