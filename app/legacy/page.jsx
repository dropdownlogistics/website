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
  amberLine:   'rgba(196,154,60,0.35)',
  green:       '#4A9E6B',
  greenLine:   'rgba(74,158,107,0.35)',
  violet:      '#8a6cc9',
  violetLine:  'rgba(138,108,201,0.35)',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
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

const RefLine = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em', marginTop: 28 }}>
    {children}
  </div>
);

const stats = [
  { v: '203',  l: 'Routes' },
  { v: '8',    l: 'Wings' },
  { v: '44',   l: 'Systems' },
  { v: '65',   l: 'Standards' },
  { v: '10',   l: 'Council Seats' },
  { v: '497K', l: 'RAG Chunks' },
  { v: '1',    l: 'Operator' },
];

const wings = [
  { name: 'DDL',           color: C.steel,   line: C.steelLine,   t: 'The studio. The methodology. The system that holds everything else.',           status: 'STUDIO'   },
  { name: 'D&A Analytics', color: C.amber,   line: C.amberLine,   t: 'BlindSpot and PositionBook. Sports betting and trading intelligence.',          status: 'LIVE'     },
  { name: 'BlindSpot',     color: C.green,   line: C.greenLine,   t: 'Sports betting analytics. Pattern recognition for the other side of the equation.', status: 'LIVE'   },
  { name: 'DexVerse',      color: C.violet,  line: C.violetLine,  t: 'The local AI layer. Dex Jr., the corpus, the rig.',                              status: 'BUILDING' },
  { name: 'Dossiers',      color: C.green,   line: C.greenLine,   t: 'Operator and subject dossiers. The identity layer.',                             status: 'BUILDING' },
  { name: 'The Bench',     color: C.steel,   line: C.steelLine,   t: "WorkBench's predecessor concept. The modular OS before it had a name.",         status: 'ARCHIVED' },
  { name: 'CanonPress',    color: C.crimson, line: C.crimsonLine, t: 'The publication system. Converge, RedLine, DeepCut, GroundTruth.',              status: 'LIVE'     },
  { name: 'AuditForge',    color: C.crimson, line: C.crimsonLine, t: 'Governed audit documentation. The flagship product.',                           status: 'LIVE'     },
];

const statusColor = {
  LIVE:     C.green,
  BUILDING: C.amber,
  STUDIO:   C.steel,
  ARCHIVED: C.muted,
};

const identity = [
  { k: 'OPERATOR', v: 'Dave Kitchens, CPA' },
  { k: 'STUDIO',   v: 'Dropdown Logistics' },
  { k: 'METHOD',   v: 'Chaos \u2192 Structured \u2192 Automated' },
  { k: 'COUNCIL',  v: '10 seats, 9 cloud + 1 local' },
  { k: 'LOCAL AI', v: 'Dex Jr. \u00b7 qwen2.5-coder:7b \u00b7 RTX 3070' },
  { k: 'CORPUS',   v: '497K chunks \u00b7 ChromaDB \u00b7 9 collections' },
  { k: 'DESIGN',   v: 'CottageHumble' },
];

const method = [
  { label: 'Chaos',      t: 'Everything starts here. Undocumented, manual, inconsistent. The raw material.' },
  { label: 'Structured', t: 'The system takes shape. Schemas, standards, governed outputs. Chaos made repeatable.' },
  { label: 'Automated',  t: 'The system runs itself. The operator steps back. The architecture handles it.' },
];

export default function LegacyManifest() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; OPERATOR MANIFEST &middot; 2026-03-15
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>One person.</span>{' '}
          <span style={{ color: C.steel }}>Eight wings.</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          The work is the proof.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8 }}>
          This is the DDL system as it stood on March 15, 2026. One operator. One studio. Eight products in various states of construction. The manifest is a snapshot, not a summary. Everything here happened.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE MANIFEST */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE MANIFEST &middot; MARCH 15, 2026</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginTop: 20 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '22px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.7rem', color: C.cream, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em' }}>
            Snapshot date: 2026-03-15. Current figures differ.
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE EIGHT WINGS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE EIGHT WINGS</SLabel>
        <SHead>What existed on March 15.</SHead>
        <SBody>
          Eight product areas. Each in a different state. Some live, some building, some conceptual. This was the portfolio on the day the manifest was written.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
          {wings.map((w) => (
            <div key={w.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${w.color}`, borderRadius: 8, padding: '22px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: w.color, letterSpacing: '-0.01em' }}>{w.name}</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: statusColor[w.status], letterSpacing: '0.16em', whiteSpace: 'nowrap' }}>{w.status}</span>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.6 }}>{w.t}</div>
            </div>
          ))}
        </div>

        <RefLine>Snapshot of the portfolio as of 2026-03-15. State has since changed.</RefLine>
      </div>

      {/* SECTION 4 — IDENTITY */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE OPERATOR</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginTop: 12, alignItems: 'start' }}>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.4, borderLeft: `2px solid ${C.steel}`, paddingLeft: 22 }}>
              &ldquo;Humble surface. Cathedral underneath.&rdquo;
            </div>

            <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '22px 24px' }}>
              {identity.map((row, i) => (
                <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.14em' }}>{row.k}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.cream, letterSpacing: '0.02em' }}>{row.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 — METHODOLOGY STRIP */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE METHOD</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginTop: 16 }}>
          {method.map((m, i) => (
            <div key={m.label} style={{ background: C.card, borderTop: `2px solid ${C.crimson}`, padding: '28px 26px', borderRight: i < method.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: C.cream, letterSpacing: '-0.01em', marginBottom: 12 }}>{m.label}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.65 }}>{m.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6 — CLOSING */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>WHERE IT WENT</SLabel>
          <SBody>
            The eight wings became nine products. The 497K corpus became 540K+. The 203 routes became more. The manifest doesn&rsquo;t update &mdash; it records. Everything that came after started here.
          </SBody>

          <Link href="/" style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
            View current site &rarr;
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            Operator Manifest v1.0 &middot; March 15, 2026
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Dropdown Logistics &middot; One operator. One council. The work is the proof.
          </div>
        </div>
        <Link href="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
