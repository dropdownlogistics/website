// DDL Studio Hub — /ddl
// Institutional home of Dropdown Logistics.
'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import snapshot from '@/data/ddl-snapshot.json';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  card2:       '#0F1D2A',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  borderSoft:  'rgba(245,241,235,0.05)',
  crimson:     '#B23531',
  crimsonLine: 'rgba(178,53,49,0.35)',
  copper:      '#C49A3C',
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

// Figures come from data/ddl-snapshot.json (`npm run snapshot`), which
// derives what it can from the org's own records and is explicit about what
// it cannot. See surface-web/work/DDL-WING-REDESIGN-001/DESIGN_PLAN_v0.1.md
// §5.4 for why the claim is "fresh as of" and never "live".
//
// Each figure carries its own provenance, because a blanket "all of this is
// re-derived" over numbers that are actually hand-carried is precisely the
// overclaim this page was rebuilt to stop making.
// The date a derived figure carries is when its DATA was true (stated by the
// source), not when the build read it. Those are different claims.
const SRC = snapshot.source || {};
const DERIVED_ON = (SRC.dataGeneratedAt || snapshot.capturedAt || '').slice(0, 10);
const F = snapshot.figures || {};

const figures = [
  { key: 'activePeople',    l: 'Active people' },
  { key: 'wingsWithPeople', l: 'Wings with people' },
  { key: 'systems',         l: 'Systems' },
  { key: 'governedArtifacts', l: 'Governed artifacts' },
  { key: 'routesInWing',    l: 'Routes in wing' },
]
  // A figure the generator could not derive and could not carry is omitted
  // rather than rendered as a zero or an em-dash pretending to be a value.
  .map(({ key, l }) => ({ l, ...(F[key] || {}) }))
  .filter(f => f.value !== null && f.value !== undefined);

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

const areas = [
  { name: 'Charter',    href: '/ddl/charter',  note: 'Six ratified sections and the tenets in force.' },
  { name: 'Council',    href: '/ddl/council',  note: 'Ten seats, their lanes, and the verdicts they render.' },
  { name: 'Team',       href: '/ddl/team',      note: 'The people, by tier.', isNew: true },
  { name: 'Governance', href: '/governance',    note: 'Standards, protocols, council reviews, audit program.' },
  { name: 'Operator',   href: '/ddl/operator',  note: 'The method, the credential, the decisions.' },
  { name: 'Knowledge Vault', href: 'https://dropdownlogistics.github.io/knowledge-vault/', note: 'The corpus.' },
  { name: 'Brand identity', href: '/branding',  note: 'CottageHumble Brand Hub, AdmitOne Brand Kit.' },
  { name: 'Projects',   href: '/ddl',           note: 'Drinks-O-System, Graceful Beauty, IntegrityOS, Nomadic Notary, Sprinkles & Co.' },
];

export default function DDLStudioHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 48px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; STUDIO
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Dropdown</span>{' '}<span style={{ color: C.crimson }}>Logistics</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          From scattered to structured.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 720, lineHeight: 1.8, marginBottom: 14 }}>
          DDL is the methodology and governance layer the rest of the site is built on. Seventy-three of the two hundred routes on dropdownlogistics.com live in this wing &mdash; more than a third of everything published here.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.body, maxWidth: 720, lineHeight: 1.8, marginBottom: 40 }}>
          What follows is not a founding snapshot. Figures marked <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: C.cream }}>derived</span> are rebuilt from the org&rsquo;s own personnel and canon records; the rest are carried by hand and say so. Each one is stamped with the moment it was captured.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {figures.map(s => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: s.derived ? C.steel : C.muted }}>
                {s.derived ? `derived · ${DERIVED_ON}` : `stated · ${s.asOf || 'undated'}`}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, flexWrap: 'wrap' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: snapshot.available ? C.crimson : C.copper, flexShrink: 0 }} />
          <span>True as of {DERIVED_ON || 'unknown'}</span>
          <span style={{ color: C.muted }}>&middot;</span>
          <span>
            {snapshot.available
              ? 'Rebuilt from personnel/ and canon by a generator that reads the governed record. The date is when the data was true, not when the page was built — fresh as of then, never live.'
              : 'Source unavailable at last build — figures shown are the last good capture, not current.'}
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE WING IN FULL */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <SHead style={{ marginBottom: 0 }}>The wing in full</SHead>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel }}>73 routes</span>
          </div>
          <SBody max={720}>Eight areas, each a real destination with governed material behind it.</SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {areas.map(a => (
              <Link key={a.name} href={a.href} style={{
                display: 'block', background: C.navy, border: `1px solid ${C.border}`,
                borderRadius: 6, padding: '20px 20px', textDecoration: 'none',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#14293C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.navy; }}
              >
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: C.cream, marginBottom: 8 }}>{a.name}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.5, marginBottom: 10 }}>{a.note}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.08em', color: a.isNew ? C.crimson : C.steel }}>
                  {a.isNew ? 'NEW' : 'LIVE'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE METHOD */}
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

      {/* SECTION 4 — OPERATOR / GOVERNANCE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            <div>
              <SLabel>OPERATOR</SLabel>
              <SHead>Operator.</SHead>
              <SBody max={460}>
                Dave Kitchens, CPA. Runs the method, holds the credential, chairs the council. The council advises; the Operator decides.
              </SBody>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>
                <span style={{ color: C.steel }}>METHOD</span><span>Dropdown Logistics</span>
                <span style={{ color: C.steel }}>DESIGN SYSTEM</span><span>CottageHumble</span>
                <span style={{ color: C.steel }}>STANDARD</span><span>STD-DDL-DESIGN-002</span>
                <span style={{ color: C.steel }}>FOUNDED</span><span>2024</span>
              </div>
            </div>
            <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: 40 }}>
              <SLabel>GOVERNANCE</SLabel>
              <SHead>Governance.</SHead>
              <SBody max={460}>
                Sixty-five and counting governed artifacts &mdash; standards, protocols, and council reviews &mdash; behind an active audit program across nine process areas, ratified 2026-08-07.
              </SBody>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: 460 }}>
                Findings and reviews in progress stay internal. That the function exists, and what it covers, does not.
              </div>
            </div>
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
