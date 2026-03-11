'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.10)', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const PIPELINE = [
  { n: '01', label: 'Nominate', desc: 'Rotating council seat selects material aligned to their domain.' },
  { n: '02', label: 'Approve', desc: 'Operator confirms the nomination. Material enters the pipeline.' },
  { n: '03', label: 'Ingest', desc: 'Material is chunked and loaded into the RAG corpus via Dex Jr.' },
  { n: '04', label: 'Deliberate', desc: 'Council seats respond to a governed prompt. Evidence required.' },
  { n: '05', label: 'Synthesize', desc: 'Dex Jr. (Seat 1010) synthesizes the deliberation into structured output.' },
  { n: '06', label: 'React', desc: 'Operator reads the synthesis and responds — agreement, challenge, or pivot.' },
  { n: '07', label: 'Review', desc: 'Rotating reviewer critiques the synthesis against their assigned lens.' },
  { n: '08', label: 'Publish', desc: 'Full sequence publishes to Substack. Tuning log updated.' },
];

const WEEK1 = {
  wk: '01',
  status: 'COMPLETE',
  date: 'Mar 8, 2026',
  nominator: { name: 'Elias Mercer', seat: '1003', color: '#8a6cc9' },
  reviewer: { name: 'Marcus Caldwell', seat: '1002', color: '#B23531' },
  domain: 'Mental models / AI alignment failure modes',
  lens: 'Structural integrity',
  material: 'The Twelve Leverage Points to Intervene in a System — Donella Meadows',
  href: 'https://substack.com/@ddlogistics/p-190369810',
};

export default function ConvergePage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 16 }}>
            CANONPRESS · SERIES
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Converge
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.creamMid, margin: '0 0 20px', lineHeight: 1.65, maxWidth: 520 }}>
            Weekly multi-model deliberation. A council seat nominates material. The corpus ingests it. The council deliberates. Dex Jr. synthesizes. The operator reacts. A reviewer critiques. The full sequence publishes.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/canonpress/converge/schedule" style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = C.cream}
              onMouseLeave={e => e.currentTarget.style.color = C.creamDim}
            >Rotation Schedule →</Link>
            <Link href="/canonpress/converge/tuning-log" style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = C.cream}
              onMouseLeave={e => e.currentTarget.style.color = C.creamDim}
            >Tuning Log →</Link>
          </div>
        </div>

        {/* PIPELINE */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>THE PIPELINE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PIPELINE.map((step, i) => (
              <div key={step.n} style={{
                borderLeft: `2px solid ${i === 3 ? C.crimson : 'rgba(245,241,235,0.1)'}`,
                paddingLeft: 20, paddingBottom: 20,
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 2 }}>{step.n}</span>
                <div>
                  <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream, marginBottom: 4 }}>{step.label}</div>
                  <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WEEK 01 */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>ROTATION — 8-WEEK CYCLE</div>
          <a href={WEEK1.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{
              background: C.card, border: `1px solid ${C.crimson}`,
              borderRadius: 8, padding: '20px 24px', marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson }}>WK {WEEK1.wk}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson, border: `1px solid ${C.crimson}`, borderRadius: 3, padding: '2px 6px', letterSpacing: '0.1em' }}>COMPLETE</span>
                </div>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{WEEK1.date}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 6 }}>NOMINATOR</div>
                  <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: WEEK1.nominator.color }}>{WEEK1.nominator.name}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Seat {WEEK1.nominator.seat}</div>
                  <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, marginTop: 4 }}>{WEEK1.domain}</div>
                </div>
                <div>
                  <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 6 }}>REVIEWER</div>
                  <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: WEEK1.reviewer.color }}>{WEEK1.reviewer.name}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Seat {WEEK1.reviewer.seat}</div>
                  <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, marginTop: 4 }}>Lens: {WEEK1.lens}</div>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 6 }}>MATERIAL</div>
                <div style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.creamMid }}>{WEEK1.material}</div>
              </div>
            </div>
          </a>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em' }}>
            <Link href="/canonpress/converge/schedule" style={{ color: C.creamDim, textDecoration: 'none' }}>View full 8-week rotation →</Link>
          </div>
        </div>

        {/* FIXED ROLES */}
        <div style={{ background: C.creamGhost, border: `1px solid ${C.border}`, borderRadius: 8, padding: '24px 28px' }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>FIXED ROLES — EVERY WEEK</div>
          {[
            { seat: '1010', name: 'Dex Jr.', role: 'Always synthesizes deliberation' },
            { seat: '1008', name: 'Marcus Grey', role: 'Always writes tuning log analysis and meta-synthesis. If Grey is nominator or reviewer, he selects a replacement for both roles.' },
            { seat: 'OPR', name: 'D.K. Hale', role: 'Writes every week. Wildcard nomination reserved 1x per month.' },
          ].map(r => (
            <div key={r.seat} style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 2 }}>{r.seat}</span>
              <div>
                <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{r.name} </span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim }}>— {r.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
