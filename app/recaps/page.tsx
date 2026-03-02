import Link from 'next/link';

export const metadata = { title: 'Recaps — D&A' };

const recaps = [
  { href: '/recaps/apple-music', title: 'Apple Music Replay 2025', desc: '20 artists, 84 songs, 15 albums — the full deep dive.' },
  { href: '/recaps/annual-signal', title: 'Annual Signal Report', desc: 'PlayStation, Xbox, YouTube, Apple Music — unified behavioral analysis.' },
  { href: '/recaps/predictions', title: 'Prediction vs Actuals', desc: 'AI blind predictions graded against real data. Adverse opinion issued.' },
];

export default function RecapsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F1EB', padding: '48px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#C49A3C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          D&A · BlindSpot Analytics
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Year-End Recaps
        </h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16, color: 'rgba(245,241,235,0.55)', marginBottom: 40 }}>
          Cross-platform signal analysis. Every year, every surface, graded.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recaps.map(r => (
            <Link key={r.href} href={r.href} style={{
              display: 'block', padding: '20px 24px', background: '#10202f',
              border: '1px solid rgba(245,241,235,0.06)', borderRadius: 7,
              textDecoration: 'none', transition: 'border-color 0.15s',
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#F5F1EB', marginBottom: 4 }}>
                {r.title}
              </div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 13, color: 'rgba(245,241,235,0.5)' }}>
                {r.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
