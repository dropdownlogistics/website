// DDL Studio Hub — /ddl
// Institutional home of Dropdown Logistics.
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

const RefLine = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em', marginTop: 28 }}>
    {children}
  </div>
);

const steps = [
  { n: '01', label: 'Gather',    t: 'Collect raw inputs. No judgment. Just capture.' },
  { n: '02', label: 'Sort',      t: 'Group by domain, project, and intent.' },
  { n: '03', label: 'Structure', t: 'Define fact tables, dimensions, grain, and relationships.' },
  { n: '04', label: 'Encode',    t: 'Turn rules into formulas and validation. Make logic explicit.' },
  { n: '05', label: 'Govern',    t: 'Add standards, protocols, and guardrails. Prevent silent drift.' },
  { n: '06', label: 'Automate',  t: 'Design for click once, update everywhere.' },
  { n: '07', label: 'Beautify',  t: 'Apply consistent formatting and branding. Make tools people actually use.' },
  { n: '08', label: 'Preserve',  t: 'Archive versions, log changes, capture decisions. Make it easy to restart.' },
];

const manifest = [
  { k: 'OPERATOR',   v: 'Dave Kitchens, CPA' },
  { k: 'STUDIO',     v: 'Dropdown Logistics' },
  { k: 'METHOD',     v: 'Chaos \u2192 Structured \u2192 Automated' },
  { k: 'CREDENTIAL', v: 'CPA \u00b7 Commission Analyst II' },
  { k: 'COUNCIL',    v: '10 seats \u00b7 9 cloud + 1 local' },
  { k: 'LOCAL AI',   v: 'Dex Jr. \u00b7 qwen2.5-coder:7b \u00b7 RTX 3070' },
  { k: 'CORPUS',     v: '566,804 chunks \u00b7 ChromaDB \u00b7 4 collections' },
  { k: 'DESIGN',     v: 'CottageHumble' },
  { k: 'FOUNDED',    v: '2024' },
];

const navCards = [
  { label: 'Charter',    href: '/ddl/charter',  t: 'The foundational document. Identity, mission, tenets, scope. DDL v1.0.' },
  { label: 'Operator',   href: '/ddl/operator',  t: 'The operator profile. Who built this, how it works, and why.' },
  { label: 'Council',    href: '/ddl/council',   t: 'Ten seats. Nine cloud models, one local. The advisory architecture.' },
  { label: 'Governance', href: '/governance',     t: 'Standards, protocols, observations. The ratified layer.' },
];

export default function DDLStudioHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; STUDIO
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Dropdown</span>{' '}<span style={{ color: C.crimson }}>Logistics</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          From scattered to structured.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          DDL is a one-person governed systems studio. Everything built here runs on the same architecture &mdash; dimensional modeling, ratified standards, and a ten-seat AI council. The methodology is the product. The products are the proof.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 200px))', gap: 12 }}>
          {[
            { v: '10', l: 'Council Seats' },
            { v: '44', l: 'Systems' },
            { v: '65', l: 'Standards' },
          ].map(s => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE METHODOLOGY */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>CHAOS &rarr; STRUCTURED &rarr; AUTOMATED</SLabel>
          <SHead>The build sequence.</SHead>
          <SBody>
            Every DDL project follows the same eight-step sequence. The domain changes. The sequence doesn&rsquo;t.
          </SBody>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '50px 140px 1fr', gap: 16, padding: '16px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none', borderBottom: `1px solid ${C.border}`, alignItems: 'baseline' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimson, letterSpacing: '0.05em' }}>{s.n}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream }}>{s.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.93rem', color: C.dim, lineHeight: 1.6 }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE STUDIO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE OPERATOR</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginTop: 12, alignItems: 'start' }}>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.4, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 22 }}>
            &ldquo;Humble surface. Cathedral underneath.&rdquo;
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '22px 24px' }}>
            {manifest.map((row, i) => (
              <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.14em' }}>{row.k}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.cream, letterSpacing: '0.02em' }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — NAVIGATION */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>WHAT&rsquo;S HERE</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
            {navCards.map(c => (
              <Link key={c.href} href={c.href} style={{
                display: 'block', background: C.navy, border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.crimson}`, borderRadius: 6, padding: '22px 22px', textDecoration: 'none',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.crimsonLine; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderLeftColor = C.crimson; }}
              >
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.crimson, marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.6 }}>{c.t}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE POINT</SLabel>
        <SBody>
          DDL is not a product company. It is a methodology studio that ships products to prove the methodology works. Every standard ratified, every council review completed, every product shipped &mdash; these are not outputs. They are evidence.
        </SBody>

        <RefLine>Chaos &rarr; Structured &rarr; Automated &middot; Since 2024</RefLine>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            Dropdown Logistics &middot; Studio
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            The architecture doesn&rsquo;t change. The data does.
          </div>
        </div>
        <Link href="/ddl" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl
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
