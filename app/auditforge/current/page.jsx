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
  copperDim: 'rgba(196,154,60,0.12)',
  steel:     '#6B7B8D',
  crimsonAF: '#9B111E',
  crimsonDim:'rgba(155,17,30,0.12)',
  green:     '#4A9E6B',
  greenDim:  'rgba(74,158,107,0.12)',
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
      <circle cx={cx} cy={cy} r="44" fill={C.crimsonDim} stroke={C.crimsonAF} strokeWidth="2"/>
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="11" fill={C.cream}>Fact_Control</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.muted}>grain: 1 ctrl</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.muted}>per co/period/ver</text>
    </svg>
  );
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.teal, letterSpacing: '0.2em', marginBottom: 20 }}>{children}</div>
);

const features = [
  { label: 'DOCUMENT GENERATION', desc: 'RCM, MCL, Walkthrough Narratives, Audit Plan. XLSX and DOCX. One click. Full DDL standards on every output.' },
  { label: 'FRAMEWORK MAPPING', desc: 'Map controls to SOX, COSO, COBIT simultaneously. Coverage gaps surface instantly.' },
  { label: 'REVIEW WORKFLOW', desc: 'Draft \u2192 Prepared \u2192 Reviewed \u2192 Approved. Segregation of duties enforced. Every transition logged.' },
  { label: 'AUDIT TRAIL', desc: 'Every change recorded. Who, when, what, why. Edit without rationale? Rejected.' },
  { label: 'BULK IMPORT', desc: 'Three-step flow: Upload \u2192 Map \u2192 Preview \u2192 Execute. Controls, Risks, Processes. Auto column mapping. Row-level validation.' },
  { label: 'GLOBAL SEARCH', desc: 'Cmd+K / Ctrl+K modal. Searches controls, risks, and processes simultaneously. Results grouped, text highlighted.' },
  { label: 'ANALYTICS DASHBOARD', desc: 'Council-ratified KPIs: unmitigated risks, coverage rate, control health heatmap, workflow funnel, nature \u00d7 type matrix.' },
  { label: 'VERSIONING', desc: 'Controls versioned. Templates versioned. Generated documents carry data hashes. Regenerate any historical document exactly as it was.' },
  { label: 'SILENT FIX PREVENTION', desc: 'Edit without documented rationale is rejected at the system level. Not a policy. A constraint.' },
  { label: 'MULTI-COMPANY', desc: 'Data isolation by company. One system, many clients.' },
];

const phases = [
  {
    phase: 'Phase 1', label: 'Core Engine', status: 'SHIPPED', color: C.teal,
    items: ['Star schema + dimensional model', 'Bridge tables with effective dating', 'Review + lifecycle state machines', 'Audit trail + Silent Fix Prevention', 'RCM, MCL, Walkthrough generation', 'Full API with CRUD + validation', 'Natural ID resolution'],
  },
  {
    phase: 'Phase 2', label: 'Web UI + Import', status: 'SHIPPED', color: C.teal,
    items: ['Dashboard with council-ratified KPIs', 'Controls, Risks, Processes views', 'Generate view — fires from browser', 'Bulk import UI (3-step, 3 entity types)', 'Global search Cmd+K modal', 'Analytics dashboard', 'Audit Plan generator (v0.4 layer)'],
  },
  {
    phase: 'Phase 3', label: 'Desktop App', status: 'NEXT', color: C.steel,
    items: ['Electron wrapper', 'Install like Quicken, opens as native app', 'Cloud sync with web version'],
  },
  {
    phase: 'Phase 4', label: 'Mobile App', status: 'NEXT', color: C.steel,
    items: ['Read-only dashboard + approvals', 'Review status on the go', 'Push notifications for review queue'],
  },
  {
    phase: 'Phase 5', label: 'AI Layer', status: 'PLANNED', color: C.muted,
    items: ['Draft control descriptions from process inputs', 'Suggest risks by industry/process type', 'Flag coverage gaps', 'Local AI option for data-sensitive firms'],
  },
  {
    phase: 'Phase 6', label: 'Platform Integration', status: 'LONG-TERM', color: C.muted,
    items: ["Clayton's multi-agent knowledge platform", 'Real-time collaboration', 'Automated testing schedules', 'Predictive risk analytics'],
  },
];

const liveData = [
  { k: 'COMPANY', v: 'CO-DDL · Dropdown Logistics' },
  { k: 'PERIOD', v: 'FY2025' },
  { k: 'CONTROLS', v: '15 (11 CAE + 4 test imports)' },
  { k: 'RISKS', v: '14 (bridge-mapped to COSO)' },
  { k: 'PROCESSES', v: '7' },
  { k: 'DOMAINS', v: 'GOV · PRO · CTX · HAB' },
  { k: 'FRAMEWORKS', v: 'COSO 2013 · SOX/PCAOB · COBIT 2019' },
  { k: 'DOMAIN', v: 'auditforge.dev (live)' },
  { k: 'STACK', v: 'Next.js 16 · Prisma 6 · PostgreSQL 17 (Neon)' },
];

export default function AuditForgeCurrent() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* HERO */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <StampSeal size={88} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>AuditForge</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.15em', marginTop: 6 }}>A DROPDOWN LOGISTICS PRODUCT &middot; CURRENT BUILD &middot; v0.4</div>
            <a href="https://auditforge.dev" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.teal, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
              auditforge.dev &#x2197;
            </a>
          </div>
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 700, marginBottom: 20 }}>
          Governed audit documentation.
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', color: C.teal, letterSpacing: '0.02em', marginBottom: 24 }}>
          Structured data in. Governed documents out.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
          AuditForge is a system of structure &mdash; not a system of execution. It defines what the control is. The auditor issues the opinion. AuditForge produces the evidence package. That line does not move.
        </div>
        <a href="#demo" style={{ display: 'inline-block', background: C.teal, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '12px 28px', borderRadius: 6, textDecoration: 'none' }}>
          See it in action &#x2192;
        </a>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }}/>

      {/* WHAT IT DOES */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>WHAT IT DOES</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { verb: 'Define', color: C.teal, desc: 'Star schema. Fact_Control at center. 7 dimensions. 3 bridge tables. Effective dating. Controls, risks, processes, frameworks, assertions, and owners in a governed relational model.' },
            { verb: 'Generate', color: C.copper, desc: 'RCM, MCL, Walkthroughs, Audit Plan in XLSX and DOCX. Every document produced from live cloud data. Full DDL brand standards baked in. Under one second each.' },
            { verb: 'Govern', color: C.crimsonAF, desc: 'Draft \u2192 Prepared \u2192 Reviewed \u2192 Approved. Silent Fix Prevention: edit without rationale is rejected. Audit trail on every mutation. Segregation of duties enforced.' },
          ].map((card, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${card.color}`, borderRadius: 8, padding: 28 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.4rem', color: card.color, marginBottom: 12 }}>{card.verb}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.7 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ARCHITECTURE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>THE ARCHITECTURE</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: 16 }}>
                The dimensional model <em>is</em> the product.
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.8, marginBottom: 24 }}>
                Fact_Control at the center. Seven dimension tables radiating outward. Three bridge tables with effective dating. One control can simultaneously mitigate multiple risks, map to multiple frameworks, and cover multiple assertions.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.05em', marginBottom: 8 }}>THE GRAIN</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.teal, marginBottom: 20 }}>
                One control instance per company per period per version.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.copper }}>
                "The architecture repeats. The data changes."
              </div>
            </div>
            <StarSchema />
          </div>
        </div>
      </div>

      {/* LIVE DATA */}
      <div id="demo" style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>LIVE DATA — NEON POSTGRESQL</SLabel>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>
          The product demos itself governing itself.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          The demo data is DDL&rsquo;s own Control Audit Engine. The product&rsquo;s first audit is of its own creator&rsquo;s governance.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {liveData.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.08em' }}>{r.k}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.cream }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>FEATURES</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 8, padding: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.teal, letterSpacing: '0.15em', marginBottom: 10 }}>{f.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FRAMEWORK SUPPORT */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>FRAMEWORK SUPPORT</SLabel>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.2rem', marginBottom: 24 }}>
          Map once. Generate everywhere.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { name: 'COSO 2013', count: '17 requirements' },
            { name: 'SOX / PCAOB', count: '15 requirements' },
            { name: 'COBIT 2019', count: '13 objectives' },
            { name: 'PCAOB Assertions', count: '9 assertions' },
          ].map((fw, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 24px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{fw.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.teal }}>{fw.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NO AI REQUIRED */}
      <div style={{ background: C.tealDim, borderTop: `1px solid ${C.tealBorder}`, borderBottom: `1px solid ${C.tealBorder}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 140 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.teal, letterSpacing: '0.2em', marginBottom: 8 }}>NO AI REQUIRED</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.steel }}>Core is deterministic.</div>
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.8, maxWidth: 560 }}>
            Structured data in, governed documents out. No black box. No hallucination risk. No AI dependency. An optional AI acceleration layer is planned for a future premium tier &mdash; but the core product works fully without it.
          </div>
        </div>
      </div>

      {/* ROADMAP */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>ROADMAP</SLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {phases.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 100px 1fr', gap: 16, padding: '20px 0', borderBottom: i < phases.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: p.color }}>{p.label}</div>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em',
                  color: p.status === 'SHIPPED' ? C.teal : p.status === 'BUILDING' ? C.copper : C.steel,
                  background: p.status === 'SHIPPED' ? C.tealDim : p.status === 'BUILDING' ? C.copperDim : C.ghost,
                  border: `1px solid ${p.status === 'SHIPPED' ? C.tealBorder : p.status === 'BUILDING' ? 'rgba(196,154,60,0.25)' : C.border}`,
                  borderRadius: 4, padding: '4px 8px', textAlign: 'center', alignSelf: 'flex-start', marginTop: 2,
                }}>{p.status}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.8rem', color: p.status === 'SHIPPED' ? C.dim : C.muted, paddingRight: 8 }}>
                      {p.status === 'SHIPPED' ? '\u2713' : '\u25cb'} {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUILT BY */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <SLabel>BUILT BY</SLabel>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', marginBottom: 4 }}>Dave Kitchens, CPA</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.1em', marginBottom: 20 }}>10 YEARS OF AUDIT. ONE PRODUCT.</div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.8, maxWidth: 480 }}>
              AuditForge was designed by someone who has lived inside audit documentation for a decade. The dimensional model reflects real audit methodology &mdash; not a software engineer&rsquo;s approximation of it.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
            {[
              { k: 'CREDENTIAL', v: 'CPA' },
              { k: 'BACKGROUND', v: '10+ yrs internal audit' },
              { k: 'ARCHITECTURE', v: 'Star schema, dimensional' },
              { k: 'STUDIO', v: 'Dropdown Logistics' },
              { k: 'PARTNER', v: 'Clayton Hotze (engineering)' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.08em', minWidth: 110 }}>{r.k}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.cream }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 960, margin: '0 auto', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel }}>AUDITFORGE &middot; v0.4 &middot; auditforge.dev</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/auditforge" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, textDecoration: 'none' }}>&#x2190; Overview</Link>
          <Link href="/auditforge/branding" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, textDecoration: 'none' }}>Brand Kit &#x2192;</Link>
        </div>
      </div>

    </div>
  );
}
