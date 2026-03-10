'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  green: '#4A9E6B', greenDim: 'rgba(74,158,107,0.15)', greenMid: 'rgba(74,158,107,0.4)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const GT001 = {
  id: 'GT-001',
  title: 'Watching the System Run',
  author: 'D.K. Hale',
  date: 'Mar 8, 2026',
  desc: 'Week 01 observations from inside the CanonPress pipeline — the operator\'s account of what it felt like to watch a governed system produce its first piece of real output.',
  href: 'https://substack.com/@ddlogistics/p-190369810',
  status: 'PUBLISHED',
};

export default function GroundTruthPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.green, letterSpacing: '0.15em', marginBottom: 16 }}>
            CANONPRESS · SERIES
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            GroundTruth
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.creamMid, margin: '0 0 12px', lineHeight: 1.65, maxWidth: 520 }}>
            The operator's direct observations. No model. No synthesis. No filter.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.7, maxWidth: 580 }}>
            Every other CanonPress series has a model behind the primary content. GroundTruth is the exception — one voice, writing about what he sees as the person who built and operates the infrastructure. The human layer of a governed system.
          </p>
        </div>

        {/* WHAT THIS IS */}
        <div style={{ background: C.creamGhost, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: '24px 28px', marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>WHAT BELONGS HERE</div>
          {[
            'Direct observations from inside the system — what the operator sees that the models can\'t report.',
            'Origin stories and build narratives. The decisions before the architecture existed.',
            'Reflections on how the system teaches the operator. The feedback loop running in reverse.',
            'Anything that doesn\'t belong inside a model-driven process but needs to be said.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.green, flexShrink: 0, paddingTop: 2 }}>—</span>
              <span style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.65 }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
              The voice that makes the cathedral a cathedral and not just a building.
            </p>
          </div>
        </div>

        {/* GT-001 */}
        <div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>ENTRIES</div>
          <a href={GT001.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{
              background: C.card,
              border: `1px solid rgba(74,158,107,0.3)`,
              borderLeft: `3px solid ${C.green}`,
              borderRadius: 8, padding: '20px 24px',
              transition: 'border-color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74,158,107,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(74,158,107,0.3)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.green }}>{GT001.id}</span>
                  <span style={{
                    fontFamily: font.mono, fontSize: 8, color: C.green,
                    border: `1px solid ${C.green}`, borderRadius: 3,
                    padding: '2px 6px', letterSpacing: '0.1em',
                  }}>{GT001.status}</span>
                </div>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{GT001.date}</span>
              </div>
              <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, marginBottom: 6 }}>{GT001.title}</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.65, marginBottom: 12 }}>{GT001.desc}</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.greenMid }}>D.K. HALE — OPERATOR</div>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
