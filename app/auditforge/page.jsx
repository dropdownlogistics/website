'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:       '#0D1B2A',
  card:       '#10202f',
  cream:      '#F5F1EB',
  dim:        'rgba(245,241,235,0.55)',
  muted:      'rgba(245,241,235,0.3)',
  ghost:      'rgba(245,241,235,0.06)',
  border:     'rgba(245,241,235,0.06)',
  teal:       '#2C7A7B',
  tealDim:    'rgba(44,122,123,0.12)',
  tealBorder: 'rgba(44,122,123,0.25)',
  copper:     '#C49A3C',
  copperDim:  'rgba(196,154,60,0.12)',
  steel:      '#6B7B8D',
  crimsonAF:  '#9B111E',
  crimsonDim: 'rgba(155,17,30,0.1)',
};

const StampSeal = ({ size = 72 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <circle cx="100" cy="100" r="90" fill="none" stroke={C.cream} strokeWidth="3"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke={C.cream} strokeWidth="1"/>
    <circle cx="100" cy="100" r="78" fill="none" stroke={C.cream} strokeWidth="1"/>
    <circle cx="100" cy="100" r="95" fill="none" stroke={C.cream} strokeWidth="1" strokeDasharray="6 4"/>
    <path d="M 100,18 A 82,82 0 1,1 99.99,18 Z" fill={C.crimsonAF} opacity="0.15"/>
    <circle cx="100" cy="100" r="78" fill={C.navy}/>
    <text x="100" y="88" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="52" fill={C.crimsonAF}>AF</text>
    <text fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill={C.cream} letterSpacing="2">
      <textPath href="#topS" startOffset="50%" textAnchor="middle">AUDITFORGE</textPath>
    </text>
    <text fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.steel} letterSpacing="1.5">
      <textPath href="#botS" startOffset="50%" textAnchor="middle">GOVERNED DOCUMENTATION</textPath>
    </text>
    <defs>
      <path id="topS" d="M 30,100 A 70,70 0 0,1 170,100"/>
      <path id="botS" d="M 30,100 A 70,70 0 0,0 170,100"/>
    </defs>
    <circle cx="30" cy="100" r="2" fill={C.copper}/>
    <circle cx="170" cy="100" r="2" fill={C.copper}/>
  </svg>
);

const Mono = ({ children, color = C.steel, size = '0.6rem' }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size, color, letterSpacing: '0.05em' }}>
    {children}
  </span>
);

const SLabel = ({ children }) => (
  <div style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.6rem',
    color: C.teal,
    letterSpacing: '0.2em',
    marginBottom: 20,
  }}>{children}</div>
);

const receipts = [
  { time: '9:30 AM', event: 'Sat down. AuditForge existed as a database with API routes. No UI. No documents. No brand.' },
  { time: '9:45 AM', event: 'Natural ID resolution deployed. CO-DDL works. The API now speaks your language, not the database\'s.' },
  { time: '10:15 AM', event: 'First RCM generated. Not a mockup. 11 live controls, risk mappings, COSO references, PCAOB assertions. Three sheets. Under one second.' },
  { time: '10:45 AM', event: 'DDL Excel standards codified. 6px spacer frame. Grid off. Footer on every page. Copper accents. Rebuilt into all three generators.' },
  { time: '11:15 AM', event: 'All three generators rebuilt from scratch. RCM, MCL, Walkthrough Narratives. 7 documents. All branded. All governed.' },
  { time: '11:45 AM', event: 'Full web UI shipped. 5 views on live data. Dashboard, Controls, Risks, Processes, Generate. CottageHumble throughout.' },
  { time: '12:00 PM', event: 'Brand kit complete. DDL + AuditForge. All SVG. Production-ready. Council-ratified Crimson AF seal as primary mark.' },
];

const stats = [
  { n: '11', label: 'controls in live schema' },
  { n: '14', label: 'risks mapped' },
  { n: '7',  label: 'processes structured' },
  { n: '3',  label: 'document generators' },
  { n: '7',  label: 'documents generated' },
  { n: '<1s', label: 'per document' },
  { n: '5',  label: 'live UI views' },
  { n: '1',  label: 'morning' },
];

const what = [
  {
    head: 'Define',
    color: C.teal,
    lines: [
      'Star schema. Fact_Control at center.',
      '7 dimension tables. 3 bridge tables.',
      'Effective dating on all relationships.',
      'COSO 2013, SOX/PCAOB, COBIT 2019.',
    ],
  },
  {
    head: 'Generate',
    color: C.copper,
    lines: [
      'RCM — full matrix, summary, cover.',
      'MCL — complete catalog, status breakdown.',
      'Walkthroughs — one per domain, sign-off table.',
      'XLSX and DOCX. Under one second each.',
    ],
  },
  {
    head: 'Govern',
    color: C.crimsonAF,
    lines: [
      'Draft \u2192 Prepared \u2192 Reviewed \u2192 Approved.',
      'Silent Fix Prevention: no edit without rationale.',
      'Audit trail on every mutation.',
      'Segregation of duties enforced at system level.',
    ],
  },
];

export default function AuditForgeLanding() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* ── HERO ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <StampSeal size={80} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              AuditForge
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.15em', marginTop: 6 }}>
              A DROPDOWN LOGISTICS PRODUCT
            </div>
          </div>
        </div>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          maxWidth: 720,
          marginBottom: 20,
        }}>
          Governed audit documentation<br/>
          <span style={{ color: C.teal }}>from structured data.</span>
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.95rem',
          color: C.dim,
          marginBottom: 32,
          letterSpacing: '0.02em',
        }}>
          Structured data in. Governed documents out.
        </div>

        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '1rem',
          color: C.dim,
          maxWidth: 560,
          lineHeight: 1.8,
          marginBottom: 40,
        }}>
          AuditForge is a system of structure — not a system of execution. It defines what the control is. The auditor issues the opinion. AuditForge produces the evidence package. That line does not move.
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/auditforge/current" style={{
            display: 'inline-block',
            background: C.teal,
            color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '12px 28px',
            borderRadius: 6,
            textDecoration: 'none',
          }}>
            Current Build \u2192
          </Link>
          <Link href="/auditforge/branding" style={{
            display: 'inline-block',
            background: 'transparent',
            color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',
            padding: '12px 28px',
            borderRadius: 6,
            textDecoration: 'none',
            border: `1px solid ${C.border}`,
          }}>
            Brand Kit
          </Link>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }}/>

      {/* ── STATS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>BY THE NUMBERS</SLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 2,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '2rem',
                color: C.teal,
                lineHeight: 1,
                marginBottom: 8,
              }}>{s.n}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                color: C.steel,
                letterSpacing: '0.05em',
                lineHeight: 1.4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECEIPTS ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>FRIDAY, MARCH 13 — THE RECEIPTS</SLabel>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.3rem',
            letterSpacing: '-0.01em',
            marginBottom: 8,
          }}>
            One person. One morning. One thread.
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: C.copper,
            marginBottom: 36,
            letterSpacing: '0.05em',
          }}>
            No code existed before March 12.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {receipts.map((r, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 20,
                padding: '16px 0',
                borderBottom: i < receipts.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: C.teal,
                  paddingTop: 2,
                  letterSpacing: '0.05em',
                }}>{r.time}</div>
                <div style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: '0.9rem',
                  color: C.dim,
                  lineHeight: 1.6,
                }}>{r.event}</div>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{
            marginTop: 48,
            borderLeft: `2px solid ${C.crimsonAF}`,
            paddingLeft: 24,
          }}>
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: '1.05rem',
              color: C.cream,
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: 12,
            }}>
              "The product demos itself governing itself. The demo data is DDL's own Control Audit Engine. The audit plan you generate will scope DDL's own controls for review by DDL's own auditor using DDL's own product."
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: C.steel,
              letterSpacing: '0.1em',
            }}>
              CR-AUDITFORGE-003 · 2026-03-13
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT IT DOES ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>WHAT IT DOES</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {what.map((w, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderTop: `2px solid ${w.color}`,
              borderRadius: 8,
              padding: 28,
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.2rem',
                color: w.color,
                marginBottom: 16,
              }}>{w.head}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {w.lines.map((line, j) => (
                  <div key={j} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: C.dim,
                    lineHeight: 1.5,
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NO AI REQUIRED ── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.tealDim} 0%, transparent 60%)`,
        borderTop: `1px solid ${C.tealBorder}`,
        borderBottom: `1px solid ${C.tealBorder}`,
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 140 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: C.teal,
              letterSpacing: '0.2em',
              marginBottom: 8,
            }}>NO AI REQUIRED</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.55rem',
              color: C.steel,
            }}>Core is deterministic.</div>
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: '1rem',
            color: C.dim,
            lineHeight: 1.8,
            maxWidth: 560,
          }}>
            Structured data in, governed documents out. No black box. No hallucination risk. No AI dependency. An optional AI acceleration layer is planned for a future premium tier — drafting assistance, gap detection, control suggestions — but the core product works fully without it.
          </div>
        </div>
      </div>

      {/* ── BUILT BY ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>BUILT BY AN AUDITOR</SLabel>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.5rem',
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}>
          10 years of audit. One product.
        </div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '0.95rem',
          color: C.dim,
          maxWidth: 560,
          lineHeight: 1.8,
          marginBottom: 32,
        }}>
          The dimensional model reflects real audit methodology — not a software engineer's approximation of it. The 6px spacer frame, the grid-off standard, the copper accent dividers: those came from a decade of knowing what professional Excel output actually looks like.
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: C.copper,
          letterSpacing: '0.08em',
        }}>
          Dave Kitchens, CPA · Dropdown Logistics
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: 6 }}>
              ReasonedHype.
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel }}>
              Enthusiasm with receipts. The forge produced its first steel.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/auditforge/current" style={{
              display: 'inline-block',
              background: C.teal,
              color: C.cream,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '12px 28px',
              borderRadius: 6,
              textDecoration: 'none',
            }}>
              Current Build \u2192
            </Link>
            <Link href="/auditforge/branding" style={{
              display: 'inline-block',
              background: 'transparent',
              color: C.cream,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '0.9rem',
              padding: '12px 28px',
              borderRadius: 6,
              textDecoration: 'none',
              border: `1px solid ${C.border}`,
            }}>
              Brand Kit
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        maxWidth: 960,
        margin: '0 auto',
        padding: '28px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.steel, letterSpacing: '0.1em' }}>
          AUDITFORGE · A DROPDOWN LOGISTICS PRODUCT
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.steel }}>
          Chaos \u2192 Structured \u2192 Automated
        </div>
      </div>

    </div>
  );
}
