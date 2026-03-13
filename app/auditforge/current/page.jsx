'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:      '#0D1B2A',
  card:      '#10202f',
  cardDeep:  '#0e1a28',
  cream:     '#F5F1EB',
  dim:       'rgba(245,241,235,0.55)',
  muted:     'rgba(245,241,235,0.35)',
  ghost:     'rgba(245,241,235,0.08)',
  border:    'rgba(245,241,235,0.06)',
  teal:      '#2C7A7B',
  tealDim:   'rgba(44,122,123,0.12)',
  tealBorder:'rgba(44,122,123,0.25)',
  copper:    '#C49A3C',
  copperDim: 'rgba(196,154,60,0.15)',
  steel:     '#6B7B8D',
  crimsonAF: '#9B111E',
  crimsonDim:'rgba(155,17,30,0.12)',
};

/* ── STAMP SEAL ── */
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
      <textPath href="#top1" startOffset="50%" textAnchor="middle">AUDITFORGE</textPath>
    </text>
    <text fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.steel} letterSpacing="1.5">
      <textPath href="#bot1" startOffset="50%" textAnchor="middle">GOVERNED DOCUMENTATION</textPath>
    </text>
    <defs>
      <path id="top1" d="M 30,100 A 70,70 0 0,1 170,100"/>
      <path id="bot1" d="M 30,100 A 70,70 0 0,0 170,100"/>
    </defs>
    <circle cx="30" cy="100" r="2" fill={C.copper}/>
    <circle cx="170" cy="100" r="2" fill={C.copper}/>
  </svg>
);

/* ── STAR SCHEMA VIZ ── */
const StarSchema = () => {
  const dims = [
    { label: 'dim_Company',   angle: 0 },
    { label: 'dim_Process',   angle: 51.4 },
    { label: 'dim_Risk',      angle: 102.8 },
    { label: 'dim_Framework', angle: 154.2 },
    { label: 'dim_Period',    angle: 205.6 },
    { label: 'dim_Assertion', angle: 257 },
    { label: 'dim_Owner',     angle: 308.4 },
  ];
  const r = 130;
  const cx = 200, cy = 200;
  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
      {dims.map((d, i) => {
        const rad = (d.angle - 90) * Math.PI / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={C.teal} strokeWidth="1" opacity="0.4"/>
            <circle cx={x} cy={y} r="28" fill={C.card} stroke={C.teal} strokeWidth="1"/>
            <text x={x} y={y + 3} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill={C.teal}>{d.label}</text>
          </g>
        );
      })}
      {/* Bridge nodes */}
      {[{ label: 'bridge\nCtrl_Risk', angle: 25, r: 75 },
        { label: 'bridge\nCtrl_Fwk',  angle: 128, r: 75 },
        { label: 'bridge\nCtrl_Asrt', angle: 230, r: 75 }].map((b, i) => {
        const rad = (b.angle - 90) * Math.PI / 180;
        const x = cx + b.r * Math.cos(rad);
        const y = cy + b.r * Math.sin(rad);
        return (
          <g key={`b${i}`}>
            <circle cx={x} cy={y} r="22" fill={C.card} stroke={C.copper} strokeWidth="1" strokeDasharray="3 2"/>
            <text x={x} y={y - 3} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fill={C.copper}>
              {b.label.split('\n').map((t, j) => (
                <tspan key={j} x={x} dy={j === 0 ? 0 : 8}>{t}</tspan>
              ))}
            </text>
          </g>
        );
      })}
      {/* Fact center */}
      <circle cx={cx} cy={cy} r="44" fill={C.crimsonDim} stroke={C.crimsonAF} strokeWidth="2"/>
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="11" fill={C.cream}>Fact_Control</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.muted}>grain: 1 ctrl</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.muted}>per co/period/ver</text>
    </svg>
  );
};

/* ── SECTION LABEL ── */
const SLabel = ({ children }) => (
  <div style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.6rem',
    color: C.teal,
    letterSpacing: '0.2em',
    marginBottom: 20,
  }}>{children}</div>
);

/* ── FEATURE PILL ── */
const Pill = ({ children }) => (
  <span style={{
    background: C.tealDim,
    border: `1px solid ${C.tealBorder}`,
    borderRadius: 4,
    padding: '4px 10px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    color: C.cream,
    display: 'inline-block',
  }}>{children}</span>
);

/* ── RCM MOCKUP ── */
const RCMPreview = () => (
  <div style={{
    background: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    border: `1px solid ${C.border}`,
    fontFamily: "'Space Grotesk', sans-serif",
  }}>
    {/* Header */}
    <div style={{ background: C.navy, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: C.cream }}>Dropdown Logistics</div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.65rem', color: C.steel }}>Risk Control Matrix · FY2025</div>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.crimsonAF, fontWeight: 700 }}>AF</div>
    </div>
    {/* Copper rule */}
    <div style={{ height: 2, background: C.copper }}/>
    {/* Table header */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr', background: '#f0ede8', padding: '6px 10px', gap: 8 }}>
      {['Control ID','Control Name','Framework','Status'].map((h, i) => (
        <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.navy, fontWeight: 600 }}>{h}</div>
      ))}
    </div>
    {/* Rows */}
    {[
      ['CO-DDL-001','Model Governance Policy','COSO CA-1','APPROVED'],
      ['CO-DDL-002','Prompt Review Cadence','SOX IT-3','REVIEWED'],
      ['CO-DDL-003','Context Boundary Check','COBIT APO-2','PREPARED'],
    ].map((row, i) => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr', padding: '5px 10px', gap: 8, borderBottom: '1px solid #e8e4de' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.navy }}>{row[0]}</div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.6rem', color: '#333' }}>{row[1]}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#555' }}>{row[2]}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem',
          color: row[3] === 'APPROVED' ? '#2C7A7B' : row[3] === 'REVIEWED' ? C.copper : '#6B7B8D',
          fontWeight: 600,
        }}>{row[3]}</div>
      </div>
    ))}
    {/* Footer */}
    <div style={{ borderTop: '1px solid #ddd', padding: '5px 10px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: '#999' }}>Dropdown Logistics</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: '#999' }}>Chaos \u2192 Structured \u2192 Automated</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: '#999' }}>Page 1 of 3</div>
    </div>
  </div>
);

/* ── ROADMAP DATA ── */
const phases = [
  {
    phase: 'Phase 1',
    label: 'Core Engine',
    status: 'SHIPPED',
    color: C.teal,
    items: ['Star schema + dimensional model','Bridge tables with effective dating','Review + lifecycle state machines','Audit trail with Silent Fix Prevention','RCM, MCL, Walkthrough generation','Full API with CRUD + validation','Bulk import with preview mode'],
  },
  {
    phase: 'Phase 2',
    label: 'Web UI',
    status: 'BUILDING',
    color: C.copper,
    items: ['Dashboard, Controls, Risks, Processes','Generate views','Bulk import column mapping UI','PDF export','Custom framework CRUD'],
  },
  {
    phase: 'Phase 3',
    label: 'Desktop App',
    status: 'NEXT',
    color: C.steel,
    items: ['Electron wrapper','Install like Quicken, opens as native app','Cloud sync with web version'],
  },
  {
    phase: 'Phase 4',
    label: 'Mobile App',
    status: 'NEXT',
    color: C.steel,
    items: ['Read-only dashboard + approvals','Review status on the go','Push notifications for review queue'],
  },
  {
    phase: 'Phase 5',
    label: 'AI Layer',
    status: 'PLANNED',
    color: C.muted,
    items: ['Draft control descriptions from process inputs','Suggest risks by industry/process type','Review documents for completeness','Flag coverage gaps','Local AI option for data-sensitive firms'],
  },
  {
    phase: 'Phase 6',
    label: 'Platform Integration',
    status: 'LONG-TERM',
    color: C.muted,
    items: ['Clayton\'s multi-agent knowledge platform','Real-time collaboration','Automated testing schedules','Predictive risk analytics'],
  },
];

/* ══════════════════════════════════════════════════════ */
export default function AuditForgeCurrent() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* ── 1. HERO ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <StampSeal size={88} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>AuditForge</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.15em', marginTop: 6 }}>
              A DROPDOWN LOGISTICS PRODUCT · CURRENT BUILD
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 700, marginBottom: 20 }}>
          Governed audit documentation.
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', color: C.teal, letterSpacing: '0.02em', marginBottom: 24 }}>
          Structured data in. Governed documents out.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
          AuditForge is a system of structure — not a system of execution. It defines what the control is. It does not test whether the control works. The auditor issues the opinion. AuditForge produces the evidence package.
        </div>
        <a href="#demo" style={{
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
          See it in action \u2192
        </a>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }}/>

      {/* ── 2. WHAT IT DOES ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>WHAT IT DOES</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            {
              verb: 'Define',
              desc: 'Star schema at the core. Controls, risks, processes, frameworks, assertions, and owners in a governed relational model. Every relationship is explicit. Every mapping is traceable.',
              accent: C.teal,
            },
            {
              verb: 'Generate',
              desc: 'RCM, MCL, and Walkthrough Narratives in XLSX and DOCX. Every document produced in under one second from live cloud data. Full metadata stamps. DDL brand standards on every output.',
              accent: C.copper,
            },
            {
              verb: 'Govern',
              desc: 'Draft \u2192 Prepared \u2192 Reviewed \u2192 Approved. Segregation of duties enforced at the system level. Silent Fix Prevention: edit without documented rationale is rejected. Not a policy — a constraint.',
              accent: C.crimsonAF,
            },
          ].map((card, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${card.accent}`, borderRadius: 8, padding: 28 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.4rem', color: card.accent, marginBottom: 12 }}>{card.verb}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.7 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. ARCHITECTURE ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>THE ARCHITECTURE</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: 16 }}>
                The dimensional model <em>is</em> the product.
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.8, marginBottom: 24 }}>
                Fact_Control at the center. Seven dimension tables radiating outward. Three bridge tables handling many-to-many relationships with effective dating. One control can simultaneously mitigate multiple risks, map to multiple frameworks, and cover multiple assertions.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.05em', marginBottom: 16 }}>
                THE GRAIN
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.teal, marginBottom: 24 }}>
                One control instance per company per period per version.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.copper, letterSpacing: '0.1em' }}>
                "The architecture repeats. The data changes."
              </div>
            </div>
            <StarSchema />
          </div>
        </div>
      </div>

      {/* ── 4. GENERATED OUTPUT ── */}
      <div id="demo" style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>GENERATED OUTPUT</SLabel>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.2rem', marginBottom: 8 }}>
          Every document. Every time. Under one second.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
          The demo data is DDL's own Control Audit Engine (CAE v1.2) — 11 controls across 4 AI-native domains. The product demos itself governing itself.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { type: 'RCM', format: 'XLSX', desc: 'Cover sheet, full matrix with risk mappings, framework references, PCAOB assertions, conditional formatting, summary tab.' },
            { type: 'MCL', format: 'XLSX', desc: 'Complete control catalog with numbering. Status breakdown by review state, type, nature. Filterable, sortable, protected.' },
            { type: 'WALKTHROUGH', format: 'DOCX', desc: 'One per process area. Branded header/footer. Control detail tables. Risk summary. Gap analysis. Sign-off table.' },
          ].map((doc, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem' }}>{doc.type}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.teal, background: C.tealDim, padding: '3px 8px', borderRadius: 3 }}>{doc.format}</div>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6 }}>{doc.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.15em', marginBottom: 16 }}>
            SAMPLE RCM — DDL CONTROL AUDIT ENGINE
          </div>
          <RCMPreview />
        </div>
      </div>

      {/* ── 5. FRAMEWORK SUPPORT ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>FRAMEWORK SUPPORT</SLabel>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.2rem', marginBottom: 8 }}>
            Map once. Generate everywhere.
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, maxWidth: 500, lineHeight: 1.7, marginBottom: 32 }}>
            Controls map simultaneously to all seeded frameworks. Coverage gaps surface instantly. Custom framework CRUD is on the roadmap.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { name: 'COSO 2013', count: '17 requirements' },
              { name: 'SOX / PCAOB', count: '15 requirements' },
              { name: 'COBIT 2019', count: '13 objectives' },
              { name: 'PCAOB Assertions', count: '9 assertions' },
            ].map((fw, i) => (
              <div key={i} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{fw.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.teal }}>{fw.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. DDL STANDARDS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>DDL STANDARDS ON ALL OUTPUT</SLabel>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.2rem', marginBottom: 24 }}>
          Professional output is not optional.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { label: 'FRAME', desc: 'Row 1 / Column A spacer. 6px. Grid lines off.' },
            { label: 'HEADER', desc: 'Navy bar, cream text. Space Grotesk 700.' },
            { label: 'COPPER RULE', desc: '2px accent divider below every header.' },
            { label: 'TYPOGRAPHY', desc: 'Space Grotesk · JetBrains Mono · Source Serif 4' },
            { label: 'FOOTER', desc: 'Studio · Methodology · Page X of N. Every page.' },
            { label: 'METADATA STAMP', desc: 'Template ID · version · generation timestamp on every document.' },
          ].map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.copper, letterSpacing: '0.15em', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. ROADMAP ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>ROADMAP</SLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {phases.map((p, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '120px 80px 1fr',
                gap: 16,
                padding: '20px 0',
                borderBottom: i < phases.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: p.color }}>{p.label}</div>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: p.status === 'SHIPPED' ? C.teal : p.status === 'BUILDING' ? C.copper : C.steel,
                  background: p.status === 'SHIPPED' ? C.tealDim : p.status === 'BUILDING' ? C.copperDim : C.ghost,
                  border: `1px solid ${p.status === 'SHIPPED' ? C.tealBorder : p.status === 'BUILDING' ? 'rgba(196,154,60,0.25)' : C.border}`,
                  borderRadius: 4,
                  padding: '4px 8px',
                  textAlign: 'center',
                  alignSelf: 'flex-start',
                  marginTop: 2,
                }}>{p.status}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: '0.8rem',
                      color: p.status === 'SHIPPED' ? C.dim : C.muted,
                      paddingRight: 8,
                    }}>
                      {p.status === 'SHIPPED' ? '\u2713' : '\u25cb'} {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. BUILT BY ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>BUILT BY</SLabel>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', marginBottom: 4 }}>
              Dave Kitchens, CPA
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.1em', marginBottom: 20 }}>
              10 YEARS OF AUDIT. ONE PRODUCT.
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.8, maxWidth: 480 }}>
              AuditForge was designed by someone who has lived inside audit documentation for a decade. The dimensional model reflects real audit methodology — not a software engineer's approximation of it.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
            {[
              { k: 'CREDENTIAL', v: 'CPA' },
              { k: 'BACKGROUND', v: '10+ yrs internal audit' },
              { k: 'ARCHITECTURE', v: 'Star schema, dimensional' },
              { k: 'STUDIO', v: 'Dropdown Logistics' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.08em', minWidth: 110 }}>{r.k}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.cream }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 960, margin: '0 auto', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel }}>
          AUDITFORGE · CURRENT BUILD · v0.3
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/auditforge" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, textDecoration: 'none' }}>
            \u2190 Overview
          </Link>
          <Link href="/auditforge/branding" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, textDecoration: 'none' }}>
            Brand Kit \u2192
          </Link>
        </div>
      </div>

    </div>
  );
}
