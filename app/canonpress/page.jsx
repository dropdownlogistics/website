'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  borderSoft:  'rgba(245,241,235,0.05)',
  crimson:     '#B23531',
  crimsonDim:  'rgba(178,53,49,0.12)',
  crimsonLine: 'rgba(178,53,49,0.35)',
  amber:       '#C49A3C',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children, style }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const series = [
  { slug: 'converge',    name: 'Converge',    code: 'CT', cadence: 'Weekly',          t: 'Multi-model deliberation. A council seat nominates material, the corpus ingests it, the council deliberates, Dex Jr. synthesizes, the operator reacts, a reviewer critiques. The full sequence publishes.' },
  { slug: 'redline',     name: 'RedLine',     code: 'RL', cadence: 'On constraint',   t: 'Constraint documentation. When the system hits a wall \u2014 a model failure, a governance gap, an architectural limit \u2014 RedLine documents it. The constraint is the artifact.' },
  { slug: 'deepcut',     name: 'DeepCut',     code: 'DC', cadence: 'On depth',        t: "Single-model deep dives. One council seat, one topic, full depth. No synthesis, no committee. One model's best thinking on one subject." },
  { slug: 'groundtruth', name: 'GroundTruth', code: 'GT', cadence: 'On observation',  t: 'Operator direct observations. What the operator sees in the field \u2014 at the bank, in the build sessions, in the gaps between what the models say and what actually happens.' },
];

const pipeline = [
  { n: '1', label: 'Nomination',      t: 'A council seat nominates source material.' },
  { n: '2', label: 'Ingestion',       t: 'The corpus ingests the material. Dex Jr. indexes it.' },
  { n: '3', label: 'Deliberation',    t: 'All 10 council seats respond independently. No cross-contamination.' },
  { n: '4', label: 'Synthesis',       t: 'Dex Jr. synthesizes the responses. Convergence points identified.' },
  { n: '5', label: 'Operator Review', t: 'The operator reacts, pushes back, or ratifies.' },
  { n: '6', label: 'Publication',     t: 'The full sequence publishes to Substack. The artifact is permanent.' },
];

const stats = [
  { v: '4',  l: 'Series' },
  { v: '10', l: 'Council Seats' },
  { v: '1',  l: 'Synthesizer (Dex Jr.)' },
  { v: '6',  l: 'Pipeline Steps' },
  { v: '0',  l: 'Filler' },
  { v: '1',  l: 'Author' },
];

const SUBSTACK = 'https://substack.com/@ddlogistics';

export default function CanonPressWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; PUBLICATION SYSTEM
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Canon</span><span style={{ color: C.crimson }}>Press</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Governed knowledge. Built in the open.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          CanonPress is the DDL publication system. Four series. One methodology. Everything published here is either a council deliberation, a constraint document, a deep model analysis, or a direct operator observation. Nothing is speculative. Nothing is filler.
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={SUBSTACK} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: C.crimson, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.01em' }}>
            Read on Substack &rarr;
          </a>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — FOUR SERIES */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>FOUR SERIES</SLabel>
          <SHead>Every publication has a type.</SHead>
          <SBody>
            CanonPress doesn&rsquo;t publish content. It publishes artifacts. Each series has a defined format, a defined trigger, and a defined audience.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginTop: 24 }}>
            {series.map((s) => (
              <Link key={s.slug} href={`/canonpress/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 8, padding: '24px 24px', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: C.cream, letterSpacing: '-0.01em' }}>{s.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.crimson, letterSpacing: '0.16em' }}>{s.code}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>{s.cadence}</div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.body, lineHeight: 1.65 }}>{s.t}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE PIPELINE */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE PIPELINE</SLabel>
        <SHead>How a Converge publishes.</SHead>
        <SBody>
          The flagship series has a six-step pipeline. Every step is governed. Nothing skips.
        </SBody>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
          {pipeline.map((p, i) => (
            <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '60px 200px 1fr', gap: 24, padding: '20px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.95rem', color: C.crimson, letterSpacing: '0.05em', paddingTop: 2 }}>0{p.n}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.98rem', color: C.cream, paddingTop: 2 }}>{p.label}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.65 }}>{p.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — BY THE NUMBERS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>BY THE NUMBERS</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginTop: 20 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 6, padding: '24px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.4rem', color: C.cream, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 10 }}>{s.v}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE POINT</SLabel>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 22, marginTop: 12, marginBottom: 32, maxWidth: 760 }}>
          &ldquo;The council deliberates. The corpus remembers. The operator decides. The publication is the receipt.&rdquo;
        </div>

        <SBody>
          CanonPress is not a blog. It is a governed record of how DDL thinks. Every entry is traceable to a model, a session, a decision, or an observation.
        </SBody>

        <a href={SUBSTACK} target="_blank" rel="noopener noreferrer"
           style={{ display: 'inline-block', background: 'transparent', color: C.crimson, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.crimsonLine}` }}>
          Read the archive &rarr;
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            CanonPress &middot; A Dropdown Logistics Publication
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Four series. One methodology. Nothing speculative.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={SUBSTACK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimson, textDecoration: 'none', letterSpacing: '0.05em' }}>
            substack.com/@ddlogistics &#x2197;
          </a>
          <Link href="/brand/canonpress" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            Brand Kit &rarr;
          </Link>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
