// GOLD STANDARD TEMPLATE — 2026-04-13
// This wing page is the new reference template for all DDL product wings.
// Other wings (Ledger, AuditForge, Excelligence, BlindSpot, etc.) will be
// rewritten against this pattern. See Marcus Caldwell brief, April 13 2026.
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
  teal:        '#2C7A7B',
  tealLine:    'rgba(44,122,123,0.35)',
  steel:       '#6B7B8D',
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

const receipts = [
  { id: 'CR-WB-CANON-001',        line: 'Vocabulary ratified. Nine terms locked including PortableRecord, GovernedCohesion, AsymmetricTaxonomy.' },
  { id: 'CR-WB-FACTLAYER-001',    line: 'Substrate ratified. Immutable event log + derived dimensions. 17 requirements. The floor everything else rests on.' },
  { id: 'CR-WB-CONNECTIVITY-001', line: 'Bring Your Data posture locked. HARD / SOFT / FORBIDDEN tiers for third-party data integration.' },
  { id: 'CR-WB-ANALYTICS-001',    line: 'Three-stage analytics roadmap ratified. Starter Dashboards \u2192 Configurable Measures \u2192 Natural Language Query. STD-WB-MEASURE-001: 13 fields per measure.' },
  { id: 'CR-WB-MODULE-001',       line: 'Module composition ratified. 19 requirements. Four contract categories. Manifest-driven architecture.' },
  { id: 'CR-WB-HRPEOPLE-001',     line: 'Module 1 ratified. HR & People reference implementation. Build-ready spec.' },
  { id: 'CR-WB-MODBUILD-001',     line: 'Module build procedure ratified. Six phases. Principles placement. Lean standards family.' },
];

const substrate = [
  { h: 'Immutable Event Log',  t: 'Every action is an event. Events are never edited. The past is always recoverable.' },
  { h: 'Derived Dimensions',   t: 'State is computed from events, not stored. Consistency is structural, not enforced.' },
  { h: 'Cross-Module Truth',   t: 'headcount_total means the same thing in HR, in Capacity, and in Finance. One definition. Everywhere.' },
];

const tiles = [
  { mod: 'HR & People',       measure: 'headcount_total', value: '12', caption: 'Active employees, full-time equivalent', color: C.teal },
  { mod: 'Capacity Planning', measure: 'headcount_total', value: '12', caption: 'Billable capacity denominator',          color: C.amber },
  { mod: 'Finance',           measure: 'headcount_total', value: '12', caption: 'Cost per head baseline',                 color: C.crimson },
];

const stages = [
  { n: '1', label: 'STARTER DASHBOARDS',    t: 'Module-level KPIs, pre-built, no configuration required.' },
  { n: '2', label: 'CONFIGURABLE MEASURES', t: 'Operator-defined measures using the governed STD-WB-MEASURE-001 schema.' },
  { n: '3', label: 'NATURAL LANGUAGE QUERY', t: 'Ask questions in plain language. The substrate answers from governed data.' },
];

const pattern = [
  { n: '1', label: 'Record',        t: 'The primary entity the module manages.' },
  { n: '2', label: 'Categories',    t: 'The taxonomy that organizes records.' },
  { n: '3', label: 'Substrate',     t: 'How the module writes to the FactLayer.' },
  { n: '4', label: 'Dashboards',    t: 'The pre-built analytics views for this module.' },
  { n: '5', label: 'Ledger Export', t: 'How records become portable Ledger Cards.' },
  { n: '6', label: 'Connectivity',  t: 'HARD / SOFT / FORBIDDEN tiers for this module\u2019s data.' },
  { n: '7', label: 'Deferred',      t: 'What\u2019s explicitly out of scope for V1.' },
  { n: '8', label: 'Build Phases',  t: 'Six phases from schema to deployment.' },
];

const hrCovers = [
  'Employee records with skill tokens and verified profiles',
  'Org structure \u2014 teams, managers, reporting lines',
  'Employment history with effective dating',
  'Compensation tracking (ranges, not amounts \u2014 privacy by default)',
  'Analytics: headcount, turnover, tenure distribution, team balance',
  'Ledger Card export: every employee gets a portable professional record',
];

const modules = [
  { name: 'Controls',            status: 'LIVE' },
  { name: 'Teams',               status: 'LIVE' },
  { name: 'Time Tracking',       status: 'LIVE' },
  { name: 'Analytics',           status: 'LIVE' },
  { name: 'HR & People',         status: 'TOUR' },
  { name: 'Payroll',             status: 'COMING SOON' },
  { name: 'Capacity Planning',   status: 'COMING SOON' },
  { name: 'Invoicing',           status: 'COMING SOON' },
  { name: 'Accounting',          status: 'COMING SOON' },
  { name: 'Expenses',            status: 'COMING SOON' },
  { name: 'Documents',           status: 'COMING SOON' },
  { name: 'Scheduling',          status: 'COMING SOON' },
  { name: 'CRM',                 status: 'COMING SOON' },
  { name: 'Reporting',           status: 'COMING SOON' },
  { name: 'Integrations',        status: 'COMING SOON' },
  { name: 'Ledger Cards',        status: 'COMING SOON' },
  { name: 'Client Portal',       status: 'COMING SOON' },
];

const statusColor = {
  'LIVE':        C.green,
  'TOUR':        C.amber,
  'COMING SOON': C.steel,
};

const pitfalls = [
  { label: 'Substrate Pitfalls',       t: 'Schema decisions that make cross-module analytics impossible to retrofit.' },
  { label: 'Module Pitfalls',          t: 'Composition choices that break the eight-section contract.' },
  { label: 'Commercialization Pitfalls', t: 'Pricing and access models that punish the wrong behavior.' },
  { label: 'Scaling Pitfalls',         t: 'Architecture that works for one tenant and fails at one hundred.' },
];

const WB_URL = 'https://workbench-ddl.vercel.app';

export default function WorkBenchWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; MODULAR BUSINESS OS
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Work</span><span style={{ color: C.crimson }}>Bench</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          The modular business OS where every module shares one substrate.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          Seventeen modules planned. One reference implementation ratified. The same star schema discipline that built AuditForge now powers a horizontal operating system for small businesses. The architecture doesn&rsquo;t change. The data does.
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={WB_URL} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: C.crimson, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.01em' }}>
            Visit WorkBench &rarr;
          </a>
          <a href="#sprint" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.cream, textDecoration: 'none', padding: '14px 20px', letterSpacing: '0.05em', opacity: 0.75 }}>
            Read the architectural sprint &darr;
          </a>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — SPRINT */}
      <div id="sprint" style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE ARCHITECTURAL SPRINT</SLabel>
          <SHead>Seven CRs. One weekend. One substrate.</SHead>
          <SBody>
            Over 48 hours in April 2026, the WorkBench governance stack was ratified. One operator. One PM thread. Seven council reviews. The result: a complete architectural foundation for a 17-module business operating system.
          </SBody>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            {receipts.map((r, i) => (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: '18px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.crimson, letterSpacing: '0.05em', paddingTop: 3 }}>{r.id}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.65 }}>{r.line}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel, lineHeight: 1.7, letterSpacing: '0.03em' }}>
            Plus OBS-WB-PITFALLS-001 &mdash; the pitfall observatory, transitioned from CR to standing instrument at sprint close.
          </div>
        </div>
      </div>

      {/* SECTION 3 — SUBSTRATE */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE SUBSTRATE</SLabel>
        <SHead>One truth. Every module.</SHead>
        <SBody>
          WorkBench&rsquo;s FactLayer is an immutable event log with derived dimensions. Every module writes events. Every dashboard reads derived state. No measure drift. Full history preserved. Cross-module analytics work without retrofit &mdash; because the architecture never required one.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
          {substrate.map((s) => (
            <div key={s.h} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 8, padding: '26px 24px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 10 }}>{s.h}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.65 }}>{s.t}</div>
            </div>
          ))}
        </div>

        <RefLine>Ratified: CR-WB-FACTLAYER-001 &middot; 17 requirements</RefLine>
      </div>

      {/* SECTION 4 — CROSS-MODULE ANALYTICS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>CROSS-MODULE ANALYTICS</SLabel>
          <SHead>The same number. Every module.</SHead>
          <SBody>
            Most business platforms bolt analytics on after the fact. WorkBench&rsquo;s analytics layer is structural &mdash; it&rsquo;s part of CR-WB-ANALYTICS-001, ratified before a single module was built. Every measure follows STD-WB-MEASURE-001: 13 fields, including definition, unit, aggregation, and cross-module tag.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
            {tiles.map((t, i) => (
              <div key={i} style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `3px solid ${t.color}`, borderRadius: 8, padding: '24px 22px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.15em', marginBottom: 6 }}>MODULE</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.02rem', color: t.color, marginBottom: 18 }}>{t.mod}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.15em', marginBottom: 4 }}>MEASURE</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: C.cream, marginBottom: 18 }}>{t.measure}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.6rem', color: C.cream, lineHeight: 1, marginBottom: 12 }}>{t.value}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.body, lineHeight: 1.55, fontStyle: 'italic' }}>{t.caption}</div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.95rem', color: C.body, lineHeight: 1.7, textAlign: 'center', margin: '32px auto 0', maxWidth: 680 }}>
            Same measure. Same number. Same definition. Three modules. Zero configuration.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0, marginTop: 48, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            {stages.map((s, i) => (
              <div key={s.n} style={{ background: C.navy, padding: '26px 24px', borderRight: i < stages.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.crimson, letterSpacing: '0.15em', marginBottom: 10 }}>STAGE {s.n}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: C.cream, letterSpacing: '0.08em', marginBottom: 10 }}>{s.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.6 }}>{s.t}</div>
              </div>
            ))}
          </div>

          <RefLine>Ratified: CR-WB-ANALYTICS-001 + STD-WB-MEASURE-001</RefLine>
        </div>
      </div>

      {/* SECTION 5 — MODULE PATTERN */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE MODULE PATTERN</SLabel>
        <SHead>Every module. Same eight sections.</SHead>
        <SBody>
          CR-WB-MODULE-001 defines 19 requirements for module composition across four contract categories. Every module in WorkBench follows the same eight-section pattern &mdash; Record, Categories, Substrate, Dashboards, Ledger Export, Connectivity, Deferred. Consistency is structural.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 24 }}>
          {pattern.map((p) => (
            <div key={p.n} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.crimson}`, borderRadius: 6, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson }}>0{p.n}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream }}>{p.label}</span>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.83rem', color: C.body, lineHeight: 1.6 }}>{p.t}</div>
            </div>
          ))}
        </div>

        <RefLine>Ratified: CR-WB-MODULE-001 &middot; CR-WB-MODBUILD-001</RefLine>
      </div>

      {/* SECTION 6 — HR & PEOPLE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>MODULE 1 &middot; REFERENCE IMPLEMENTATION</SLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3.6vw, 2.4rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              HR &amp; People
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.green, letterSpacing: '0.18em', border: `1px solid ${C.greenLine}`, background: 'rgba(74,158,107,0.1)', padding: '5px 10px', borderRadius: 4 }}>
              RATIFIED
            </span>
          </div>
          <SBody>
            The first WorkBench module, chosen for maximum architectural leverage. Every other module inherits the patterns HR &amp; People proves out. Employees are the entity everything else references &mdash; capacity, payroll, utilization, scheduling, finance. Start here; everything compounds.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12, marginTop: 16, marginBottom: 36 }}>
            {hrCovers.map((h, i) => (
              <div key={i} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: C.crimson, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', paddingTop: 2 }}>&#9632;</span>
                <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.6 }}>{h}</span>
              </div>
            ))}
          </div>

          <a href={`${WB_URL}/modules/hr-people`} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: 'transparent', color: C.crimson, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '12px 26px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.crimsonLine}` }}>
            See the full module tour &rarr;
          </a>

          <RefLine>Ratified: CR-WB-HRPEOPLE-001</RefLine>
        </div>
      </div>

      {/* SECTION 7 — ROADMAP */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>SEVENTEEN MODULES</SLabel>
        <SHead>The roadmap.</SHead>
        <SBody>
          One substrate. Seventeen modules. Every module follows the same eight-section pattern. Every module shares the same analytics layer. The architecture is built once.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginTop: 24, marginBottom: 32 }}>
          {modules.map((m) => {
            const color = statusColor[m.status];
            return (
              <div key={m.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${color}`, borderRadius: 6, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: C.cream }}>{m.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>{m.status}</span>
              </div>
            );
          })}
        </div>

        <a href={WB_URL} target="_blank" rel="noopener noreferrer"
           style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.9rem', padding: '12px 26px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.border}` }}>
          Explore the full roadmap &rarr;
        </a>
      </div>

      {/* SECTION 8 — PITFALLS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>OBS-WB-PITFALLS-001</SLabel>
          <SHead>We&rsquo;re watching the failure modes.</SHead>
          <SBody>
            Every modular business platform before WorkBench has failed in one of four ways. WorkBench&rsquo;s substrate is built to avoid them. The Pitfalls Observatory is a standing instrument &mdash; not a one-time review.
          </SBody>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24, borderTop: `1px solid ${C.border}` }}>
            {pitfalls.map((p) => (
              <div key={p.label} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, padding: '20px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.crimson }}>{p.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.93rem', color: C.dim, lineHeight: 1.65 }}>{p.t}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.05rem', color: C.cream, lineHeight: 1.7, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 20, maxWidth: 640 }}>
            The observatory is open. The substrate is built. The first wall is going up.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            WorkBench &middot; A Dropdown Logistics Product
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Cathedral planned. Substrate ratified. First wall going up.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={WB_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimson, textDecoration: 'none', letterSpacing: '0.05em' }}>
            workbench-ddl.vercel.app &#x2197;
          </a>
          <Link href="/workbench" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            /workbench
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
