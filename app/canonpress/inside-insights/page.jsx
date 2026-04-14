'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.72)', body: 'rgba(245,241,235,0.6)',
  borderSoft: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.08)',
  crimson: '#B23531', crimsonLine: 'rgba(178,53,49,0.35)',
  amber: '#C49A3C', amberDim: 'rgba(196,154,60,0.12)', amberMid: 'rgba(196,154,60,0.4)',
  violet: '#8a6cc9',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const anatomy = [
  { n: '01', label: 'Artifact Context', desc: 'The CanonPress work product being analyzed. Which prompt, which seat, which cycle.' },
  { n: '02', label: 'Model Reasoning Pattern', desc: 'How the seat interpreted the prompt. What decision path it took and why.' },
  { n: '03', label: 'Prompt Interaction', desc: 'What the prompt did or failed to do. Where framing shaped output.' },
  { n: '04', label: 'Structural Insight', desc: 'The extractable principle. What this reveals about how governed AI systems behave.' },
];

const entries = [
  // Entries added here as they publish
];

export default function InsideInsightsPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: '0.15em', marginBottom: 16 }}>
            CANONPRESS &middot; SERIES
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            InsideInsights
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.dim, margin: '0 0 12px', lineHeight: 1.65, maxWidth: 520 }}>
            How the council thinks. Written from inside the process.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.body, lineHeight: 1.7, maxWidth: 560 }}>
            Meta-analysis of council reasoning patterns, authored by Marcus Grey (Seat 1008).
            Not chain-of-thought. Analytical commentary on how models interpret prompts,
            structure arguments, and reveal reasoning patterns during CanonPress work.
          </p>
        </div>

        {/* AUTHOR CALLOUT */}
        <div style={{
          background: C.borderSoft,
          border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${C.amber}`,
          borderRadius: 8, padding: '20px 24px', marginBottom: 48,
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: '0.12em', marginBottom: 8 }}>
              STANDING AUTHOR
            </div>
            <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 14, color: C.cream, marginBottom: 4 }}>
              Marcus Grey &mdash; Seat 1008
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.body, lineHeight: 1.6 }}>
              Protocol Designer. Synthesizer. The seat that watches how the other seats work.
              InsideInsights is his standing assignment in the CanonPress pipeline.
            </div>
          </div>
        </div>

        {/* ENTRY ANATOMY */}
        <div style={{ background: C.borderSoft, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.violet}`, borderRadius: 8, padding: '24px 28px', marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 16 }}>ENTRY ANATOMY</div>
          {anatomy.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, flexShrink: 0, paddingTop: 2 }}>{s.n}</span>
              <div>
                <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{s.label} </span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.body }}>&#x2014; {s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ENTRIES or EMPTY STATE */}
        {entries.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 4 }}>
              ARTIFACTS &mdash; {entries.length} LOGGED
            </div>
            {entries.map(entry => (
              <Link key={entry.id} href={entry.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${C.amber}`,
                  borderRadius: 8, padding: '24px 28px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: '0.12em' }}>{entry.id}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>{entry.date}</span>
                  </div>
                  <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18, color: C.cream, marginBottom: 6 }}>{entry.title}</div>
                  <div style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.body }}>{entry.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: '40px 28px', textAlign: 'center' }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 12 }}>NO ENTRIES YET</div>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.body, fontStyle: 'italic', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
              InsideInsights publishes when a council cycle produces reasoning worth examining.
              The absence of entries is accurate, not an oversight.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
