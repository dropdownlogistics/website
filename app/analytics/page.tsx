'use client';

import Link from 'next/link';

const DASHBOARDS = [
  {
    title: 'Grammarly Insights',
    href: '/analytics/grammarly',
    description: '47 weeks of writing analytics. 4.57M words analyzed. Productivity, accuracy, vocabulary percentiles, and tone evolution.',
    stat: '4.57M',
    statLabel: 'words',
    color: '#14b8a6',
  },
  {
    title: 'Tone Fingerprint',
    href: '/analytics/tone',
    description: 'Voice profile analysis. How Dave\'s writing tone compares to the average Grammarly user — signature strength, consistency, and evolution.',
    stat: '87',
    statLabel: 'signature',
    color: '#8b5cf6',
  },
  {
    title: 'DexDash',
    href: '/analytics/dexdash',
    description: 'Communication analytics across 10 relationships. 86.3K messages, hourly heatmaps, conversation depth, and pattern analysis.',
    stat: '86.3K',
    statLabel: 'messages',
    color: '#3b82f6',
  },
  {
    title: 'Memoir Analysis',
    href: '/analytics/memoir',
    description: 'Structural analysis of Little to Know Experience. 49 excerpts, narrative arcs, thematic clusters, character density, and findings.',
    stat: '52.6K',
    statLabel: 'words',
    color: '#d97706',
  },
];

export default function AnalyticsHub() {
  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: 'linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      color: '#e6edf3',
      minHeight: '100vh',
      padding: '120px 24px 60px',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&display=swap');`}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, color: '#14b8a6', fontWeight: 700, marginBottom: 8 }}>
            DDL Analytics
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 800, margin: 0,
            background: 'linear-gradient(135deg, #e6edf3, #8892b0)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: '#5a6a8a', fontSize: 15, marginTop: 8 }}>
            Data-driven analysis across writing, communication, and creative work.
            Every dashboard built from real data. Every insight traceable to source.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {DASHBOARDS.map((d) => (
            <Link key={d.href} href={d.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: 14,
                padding: '28px 32px',
                border: '1px solid #2a2a4a',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
              }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: d.color }}>
                    {d.title}
                  </h2>
                  <p style={{ margin: '8px 0 0', fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>
                    {d.description}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontSize: 32, fontWeight: 800, color: d.color,
                    fontFamily: "'JetBrains Mono', monospace", lineHeight: 1,
                  }}>
                    {d.stat}
                  </div>
                  <div style={{ fontSize: 11, color: '#5a6a8a', marginTop: 4 }}>
                    {d.statLabel}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          textAlign: 'center', marginTop: 48, padding: '20px 0',
          borderTop: '1px solid #2a2a4a', color: '#3a4a6a', fontSize: 12,
        }}>
          Drop Down Logistics · Analytics Suite · Chaos → Structured → Automated
        </div>
      </div>
    </div>
  );
}
