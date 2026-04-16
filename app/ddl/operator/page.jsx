// DDL Operator Profile — /ddl/operator
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
  crimsonLine: 'rgba(178,53,49,0.35)',
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

const credentials = [
  { k: 'CREDENTIAL', v: 'CPA (Active)' },
  { k: 'ROLE',       v: 'Commission Analyst II \u00b7 UMB Bank' },
  { k: 'EXPERIENCE', v: '10+ years internal audit' },
  { k: 'METHODOLOGY', v: 'Dimensional modeling \u00b7 Star schema' },
  { k: 'COUNCIL',    v: 'Operator \u00b7 Seat 0000 reserved (Emily)' },
  { k: 'STUDIO',     v: 'Dropdown Logistics \u00b7 Est. 2024' },
  { k: 'LOCAL AI',   v: 'Dex Jr. \u00b7 RTX 3070 \u00b7 566,804-chunk corpus' },
  { k: 'DESIGN',     v: 'CottageHumble (\u201cHumble surface. Cathedral underneath.\u201d)' },
];

const principles = [
  { h: 'Cathedral Planning, Cottage Steps', t: 'Designs at horizon scale. Ships at concrete-step scale. The architecture is always larger than the current build.' },
  { h: 'Architecture is the Lock, Data is the Variable', t: 'The dimensional model doesn\u2019t change between domains. The data does. Every DDL product runs on the same underlying structure.' },
  { h: 'Governance as Moat', t: 'Standards aren\u2019t bureaucracy. They\u2019re the differentiator that makes it possible to ship with structural integrity faster than anyone who skipped the governance step.' },
  { h: 'Forward Motion as Resting State', t: 'The default is build. Pauses are explicit. Friction is a signal about the question\u2019s quality, not about capacity.' },
];

export default function OperatorProfile() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; OPERATOR
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 16 }}>
          Dave Kitchens
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.steel, letterSpacing: '0.06em', marginBottom: 28 }}>
          CPA &middot; Commission Analyst II &middot; Studio Operator
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          The architecture doesn&rsquo;t change. The data does.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8 }}>
          Dave Kitchens is the operator and sole architect of Dropdown Logistics. A licensed CPA with ten years of internal audit experience, he applies dimensional modeling and governed systems thinking across every domain he touches &mdash; from incentive compensation analysis at a Fortune 500 bank to multi-product AI-governed software development.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — CREDENTIALS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>CREDENTIALS &amp; BACKGROUND</SLabel>

          <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '22px 24px', maxWidth: 620 }}>
            {credentials.map((row, i) => (
              <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 16, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.14em' }}>{row.k}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.cream, letterSpacing: '0.02em' }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — HOW HE WORKS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>OPERATING PRINCIPLES</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 24 }}>
          {principles.map(p => (
            <div key={p.h} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 8, padding: '26px 24px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 10 }}>{p.h}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.65 }}>{p.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — CLOSING */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE STUDIO</SLabel>

          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 22, marginTop: 12, marginBottom: 32, maxWidth: 760 }}>
            &ldquo;We build what we would actually want to use.&rdquo;
          </div>

          <SBody>
            Every product in the DDL ecosystem exists because the operator needed it and no adequate version existed. AuditForge for governed audit documentation. BlindSpot for pattern recognition in betting. WorkBench for modular business operations. The need comes first. The product follows.
          </SBody>

          <Link href="/ddl/council" style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
            View the council &rarr;
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            Dave Kitchens &middot; CPA &middot; Operator
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Dropdown Logistics &middot; Chaos &rarr; Structured &rarr; Automated
          </div>
        </div>
        <Link href="/ddl/operator" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/operator
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
