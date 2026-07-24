'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { PRODUCTS } from '@/lib/products';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const _prod = PRODUCTS.find((p: any) => p.id === 'fleetline')!;

const C = {
  amber: (_prod.accent ?? '#F59E0B'),
  orange: '#FB923C',
  green: '#22C55E',
  red: '#F87171',
  blue: '#60A5FA',
  slate: '#94A3B8',
  muted: 'rgba(245,241,235,0.45)',
};

const LOADS = [
  { id: 'FL-0841', lane: 'Chicago → Atlanta', carrier: 'Apex Freight', status: 'DELIVERED', mode: 'FTL', rev: '$3,240', margin: '18.2%', mColor: C.green, days: 2.1 },
  { id: 'FL-0842', lane: 'Dallas → Denver', carrier: 'Mesa Carriers', status: 'IN_TRANSIT', mode: 'FTL', rev: '$2,870', margin: '14.7%', mColor: C.amber, days: 1.4 },
  { id: 'FL-0843', lane: 'Memphis → Charlotte', carrier: 'Ridge Logistics', status: 'PICKED_UP', mode: 'LTL', rev: '$1,140', margin: '11.3%', mColor: C.amber, days: 0.2 },
  { id: 'FL-0844', lane: 'LA → Phoenix', carrier: 'Southwest Trans', status: 'EXCEPTION', mode: 'FTL', rev: '$2,010', margin: '—', mColor: C.red, days: 0.8 },
  { id: 'FL-0845', lane: 'Houston → Nashville', carrier: 'Apex Freight', status: 'BOOKED', mode: 'FTL', rev: '$3,550', margin: '19.1%', mColor: C.green, days: 0 },
];

const LANE_PERFORMANCE = [
  { lane: 'Chicago → Atlanta', loads: 42, revenue: '$132K', avgMargin: 17.4, onTime: 92, color: C.green },
  { lane: 'Dallas → Denver', loads: 31, revenue: '$89K', avgMargin: 14.2, onTime: 87, color: C.green },
  { lane: 'LA → Phoenix', loads: 28, revenue: '$56K', avgMargin: 12.8, onTime: 79, color: C.amber },
  { lane: 'Memphis → Charlotte', loads: 19, revenue: '$37K', avgMargin: 10.6, onTime: 84, color: C.amber },
  { lane: 'Houston → Nashville', loads: 16, revenue: '$57K', avgMargin: 18.9, onTime: 94, color: C.green },
];

const CARRIER_SCORES = [
  { name: 'Apex Freight', loads: 38, onTime: 94, claim: '0.2%', rateAdherence: '98%', score: 94, color: C.green },
  { name: 'Ridge Logistics', loads: 29, onTime: 88, claim: '0.6%', rateAdherence: '95%', score: 85, color: C.green },
  { name: 'Mesa Carriers', loads: 22, onTime: 81, claim: '1.1%', rateAdherence: '92%', score: 74, color: C.amber },
  { name: 'Southwest Trans', loads: 17, onTime: 71, claim: '2.4%', rateAdherence: '88%', score: 61, color: C.red },
];

const KPI_CARDS = [
  { label: 'Active Loads', value: '47', sub: 'FTL 31 · LTL 16', color: C.amber },
  { label: 'MTD Revenue', value: '$371K', sub: 'vs $344K last month', trend: '▲ +7.8%', tColor: C.green, color: C.green },
  { label: 'Avg Margin', value: '15.6%', sub: 'target 14.0%', trend: '▲ above target', tColor: C.green, color: C.green },
  { label: 'On-Time Rate', value: '87%', sub: 'L30 days · 136 loads', trend: '▼ 3 pts vs prior L30', tColor: C.red, color: C.amber },
  { label: 'Open Exceptions', value: '4', sub: '2 carrier delays · 2 shipper', color: C.red },
  { label: 'Carrier Pool', value: '12', sub: '4 preferred · 8 backup', color: C.blue },
];

const EXCEPTIONS = [
  { id: 'EXC-0019', load: 'FL-0844', type: 'CARRIER_DELAY', age: '14 hrs', carrier: 'Southwest Trans', note: 'Equipment swap at origin. Pickup pushed 18 hrs. Customer notified.', color: C.red, iconBg: 'rgba(248,113,113,0.1)' },
  { id: 'EXC-0018', load: 'FL-0837', type: 'SHIPPER_NOT_READY', age: '6 hrs', carrier: 'Mesa Carriers', note: 'Dock appointment missed. Carrier held at origin detention — billing flag raised.', color: C.red, iconBg: 'rgba(248,113,113,0.1)' },
  { id: 'EXC-0017', load: 'FL-0831', type: 'CARRIER_DELAY', age: 'Resolved', carrier: 'Ridge Logistics', note: 'Weather delay cleared. Delivered 4 hrs late. On-time exception recorded.', color: C.slate, iconBg: 'rgba(148,163,184,0.1)' },
];

const REVENUE_BARS = [62, 68, 71, 65, 74, 78, 72, 80, 77, 83, 88, 91].map((v, i) => ({ h: v, color: i >= 10 ? C.amber : C.blue }));

const SCHEMA = [
  { kw: 'CREATE TABLE', obj: 'Fact_Load', rest: '(' },
  { obj: 'load_id', type: 'INT', ref: 'PRIMARY KEY' },
  { obj: 'carrier_id', type: 'INT', ref: 'REFERENCES Dim_Carrier' },
  { obj: 'lane_id', type: 'INT', ref: 'REFERENCES Dim_Lane' },
  { obj: 'shipper_id', type: 'INT', ref: 'REFERENCES Dim_Shipper' },
  { obj: 'period_id', type: 'INT', ref: 'REFERENCES Dim_Period' },
  { obj: 'mode', type: 'VARCHAR(3)', cmt: '-- FTL | LTL | PTL' },
  { obj: 'status', type: 'VARCHAR(20)', cmt: '-- BOOKED → PICKED_UP → IN_TRANSIT → DELIVERED' },
  { obj: 'quoted_rate', type: 'DECIMAL(10,2)' },
  { obj: 'carrier_pay', type: 'DECIMAL(10,2)' },
  { obj: 'margin_pct', type: 'DECIMAL(5,2)', cmt: '-- (quoted - carrier_pay) / quoted' },
  { obj: 'on_time_flag', type: 'BOOLEAN' },
  { obj: 'exception_id', type: 'INT', ref: 'REFERENCES Fact_Exception NULLABLE' },
];

export default function FleetlinePage() {
  return (
    <div style={{ padding: '100px 24px 48px', maxWidth: 1060, margin: '0 auto' }}>

      {/* Back */}
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Analytics Engine</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Fleet<span style={{ color: C.amber }}>line</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            {_prod.tagline}
          </p>
        </div>
      </FadeIn>

      {/* Problem / Approach / Deliverable */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            {
              label: 'Problem',
              text: 'Freight brokers manage load data across a TMS, carrier emails, shipper portals, and a shared spreadsheet that\'s always two days behind. Margin visibility requires manual calculation. Carrier performance is institutional memory. Exceptions surface through phone calls, not dashboards.',
            },
            {
              label: 'Approach',
              text: 'A dimensional load intelligence stack — Fact_Load as the single source of truth for every load from book to deliver. Carrier and lane dimensions enable slice-and-dice across any combination. Exception rows are FK-linked to loads, not tracked in a separate tracker. Every margin calculation is in the schema, not a spreadsheet.',
            },
            {
              label: 'Deliverable',
              text: 'Operational dashboard with live load table, 12-month revenue trend, lane performance heatmap, carrier scorecard, open exception log, and a star schema architecture built on the same DDL dimensional methodology used across every other analytics engine in the portfolio.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* KPIs */}
      <FadeIn delay={280}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.amber, marginBottom: 16 }}>▶ Operations Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
            {KPI_CARDS.map((k, i) => (
              <div key={i} style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '16px 14px', borderTop: `2px solid ${k.color}` }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', marginBottom: 5 }}>{k.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.25rem', fontWeight: 700, color: k.color }}>{k.value}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)', marginTop: 3 }}>{k.sub}</div>
                {k.trend && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: k.tColor, marginTop: 3 }}>{k.trend}</div>}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Revenue trend */}
      <FadeIn delay={340}>
        <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: 20, marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 14 }}>▶ 12-Month Revenue Trend (indexed)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 90, marginBottom: 10 }}>
            {REVENUE_BARS.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: `${bar.h}%`, borderRadius: '3px 3px 0 0', background: `linear-gradient(to top, ${bar.color}33, ${bar.color}88)`, minWidth: 0 }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.48rem', color: 'rgba(245,241,235,0.2)' }}>
            {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem' }}>
            {[{ label: 'Prior 10 months', c: C.blue }, { label: 'Current month (MTD)', c: C.amber }].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(245,241,235,0.4)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: l.c, display: 'inline-block' }} /> {l.label}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Active load table */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.amber, marginBottom: 16 }}>Active Loads</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', minWidth: 700 }}>
                <thead>
                  <tr>{['Load', 'Lane', 'Carrier', 'Mode', 'Revenue', 'Margin', 'Status'].map(h => (
                    <th key={h} style={{ fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', padding: '10px 14px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)' }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {LOADS.map((l, i) => {
                    const sColor = l.status === 'DELIVERED' ? C.green : l.status === 'EXCEPTION' ? C.red : l.status === 'IN_TRANSIT' ? C.blue : C.amber;
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '9px 14px', color: C.amber, borderBottom: '1px solid rgba(255,255,255,0.02)', fontWeight: 600 }}>{l.id}</td>
                        <td style={{ padding: '9px 14px', color: '#F5F1EB', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{l.lane}</td>
                        <td style={{ padding: '9px 14px', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{l.carrier}</td>
                        <td style={{ padding: '9px 14px', color: 'rgba(245,241,235,0.4)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{l.mode}</td>
                        <td style={{ padding: '9px 14px', color: '#F5F1EB', borderBottom: '1px solid rgba(255,255,255,0.02)', fontVariantNumeric: 'tabular-nums' }}>{l.rev}</td>
                        <td style={{ padding: '9px 14px', color: l.mColor, borderBottom: '1px solid rgba(255,255,255,0.02)', fontVariantNumeric: 'tabular-nums' }}>{l.margin}</td>
                        <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 700, padding: '2px 7px', borderRadius: 3, background: `${sColor}15`, color: sColor }}>{l.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Lane + Carrier side by side */}
      <FadeIn delay={460}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Lane performance */}
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.blue, marginBottom: 16 }}>Lane Performance · MTD</div>
            {LANE_PERFORMANCE.map((ln, i) => (
              <div key={i} style={{ marginBottom: i < LANE_PERFORMANCE.length - 1 ? 14 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#F5F1EB' }}>{ln.lane}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: ln.color }}>{ln.avgMargin.toFixed(1)}% margin</span>
                </div>
                <div style={{ height: 4, background: 'rgba(10,10,16,0.8)', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ width: `${ln.onTime}%`, height: '100%', background: ln.color, borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)' }}>
                  <span>{ln.loads} loads · {ln.revenue}</span>
                  <span>{ln.onTime}% on-time</span>
                </div>
              </div>
            ))}
          </div>

          {/* Carrier scorecard */}
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.amber, marginBottom: 16 }}>Carrier Scorecard</div>
            {CARRIER_SCORES.map((cs, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < CARRIER_SCORES.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#F5F1EB' }}>{cs.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, color: cs.color }}>{cs.score}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(10,10,16,0.8)', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ width: `${cs.score}%`, height: '100%', background: cs.color, borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', gap: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)' }}>
                  <span>{cs.loads} loads</span>
                  <span>{cs.onTime}% on-time</span>
                  <span>claim {cs.claim}</span>
                  <span>rate adh {cs.rateAdherence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Exception log */}
      <FadeIn delay={520}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.red, marginBottom: 16 }}>⚠ Exception Log</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: 14 }}>
            {EXCEPTIONS.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < EXCEPTIONS.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: ex.iconBg, color: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>!</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' as const }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: ex.color, fontWeight: 600 }}>{ex.id}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', padding: '1px 6px', borderRadius: 3, background: `${ex.color}15`, color: ex.color }}>{ex.type}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)' }}>Load {ex.load} · {ex.carrier} · {ex.age}</span>
                  </div>
                  <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.55 }}>{ex.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Schema */}
      <FadeIn delay={580}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.amber, marginBottom: 16 }}>Architecture · Star Schema</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: 20 }}>
            <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', lineHeight: 1.8, color: 'rgba(245,241,235,0.45)', whiteSpace: 'pre-wrap' as const, margin: 0 }}>
              {SCHEMA.map(l => {
                if (l.kw) return <span key="create"><span style={{ color: '#00D4E5', fontWeight: 600 }}>{l.kw}</span> <span style={{ color: C.green }}>{l.obj}</span> {l.rest}{'\n'}</span>;
                return <span key={l.obj}>{'  '}<span style={{ color: C.green }}>{l.obj}</span>{'  '}<span style={{ color: C.amber }}>{l.type}</span>{'  '}{l.ref ? <span style={{ color: '#F59E0B' }}>{l.ref}</span> : ''}{l.cmt ? <span style={{ color: 'rgba(245,241,235,0.2)' }}> {l.cmt}</span> : ''}{'\n'}</span>;
              })}
              <span style={{ color: 'rgba(245,241,235,0.2)' }}>{'-- Margin is a stored computed field — calculated once at DELIVERED status\n-- Exception rows FK to Fact_Load — no separate tracker sheet\n-- Carrier score is a DIM, not a fact — refreshed nightly from Fact_Load aggregation'}</span>
            </pre>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={660}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            Fleetline · v0.1 · Freight Operations Intelligence · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
