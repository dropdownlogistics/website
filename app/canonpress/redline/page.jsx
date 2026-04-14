'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonLine: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.72)', body: 'rgba(245,241,235,0.6)',
  violet: '#8a6cc9', violetDim: 'rgba(138,108,201,0.15)', violetMid: 'rgba(138,108,201,0.4)',
  borderSoft: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.08)',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const entries = [
  {
    id: 'RL-0001',
    title: 'The Scaffold Generates',
    subtitle: 'How prompt structure creates permission to fabricate',
    author: 'Kai Langford \u2014 Seat 1009',
    date: '2026-03-13',
    href: '/canonpress/redline/rl-001',
    related: ['CT-0001', 'DC-0001'],
  },
];

export default function RedLinePage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: '0.15em', marginBottom: 16 }}>
            CANONPRESS &middot; SERIES
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            RedLine
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.dim, margin: '0 0 12px', lineHeight: 1.65, maxWidth: 520 }}>
            What AI systems won&rsquo;t do, and why.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.body, lineHeight: 1.7, maxWidth: 560 }}>
            Documents constraints observed inside the DDL system. Real behavior, structural explanation, council self-analysis, operator reaction. Published as-needed &mdash; when a real observation warrants documentation.
          </p>
        </div>

        {/* ENTRY ANATOMY */}
        <div style={{ background: C.borderSoft, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.violet}`, borderRadius: 8, padding: '24px 28px', marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 16 }}>ENTRY ANATOMY</div>
          {[
            { n: '01', label: 'Observation', desc: 'What the system did \u2014 or refused to do. Raw behavior, no interpretation.' },
            { n: '02', label: 'Structural Explanation', desc: 'Why this constraint exists. Architecture, training, or governance.' },
            { n: '03', label: 'Council Self-Analysis', desc: 'Relevant seats reflect on the constraint from their lens.' },
            { n: '04', label: 'Operator Reaction', desc: 'What this means for the DDL system. Architectural implications.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, flexShrink: 0, paddingTop: 2 }}>{s.n}</span>
              <div>
                <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{s.label} </span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.body }}>&#x2014; {s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ENTRIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {entries.map(entry => (
            <Link key={entry.id} href={entry.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.crimson}`,
                borderRadius: 8,
                padding: '24px 28px',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.crimsonLine}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.12em' }}>{entry.id}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>&#x2F;</span>
                    {entry.related.map(r => (
                      <span key={r} style={{ fontFamily: font.mono, fontSize: 8, color: C.body, letterSpacing: '0.08em' }}>{r}</span>
                    ))}
                  </div>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>{entry.date}</span>
                </div>
                <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18, color: C.cream, marginBottom: 6, letterSpacing: '-0.01em' }}>
                  {entry.title}
                </div>
                <div style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.body, marginBottom: 12 }}>
                  {entry.subtitle}
                </div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>
                  {entry.author}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
