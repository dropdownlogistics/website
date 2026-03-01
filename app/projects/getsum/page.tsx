'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const COLORS = { green: '#00C853', red: '#FF3D3D', amber: '#FFB300', blue: '#448AFF', cyan: '#00E5FF' };
type ColorKey = 'green' | 'red' | 'amber' | 'blue' | 'cyan' | 'default';
const colorMap: Record<ColorKey, string> = { green: COLORS.green, red: COLORS.red, amber: COLORS.amber, blue: COLORS.blue, cyan: COLORS.cyan, default: '#F5F1EB' };

interface KpiData { label: string; value: string; sub: string; trend: string; trendColor: ColorKey; valColor: ColorKey; }
interface VarianceRow { category: string; budget: string; actual: string; projected: string; varDollar: string; varPct: string; trend: string; signal: string; classification: string; classColor: string; classBg: string; positive: boolean; }
interface AllocBar { label: string; pct: number; amount: string; color: string; }
interface DriftSignal { icon: string; iconColor: string; iconBg: string; text: string; }
interface EfficiencyRow { type: string; detail: string; impact: string; freq: string; action: string; actionColor: string; }

const KPIS: KpiData[] = [
  { label: 'Total Spend', value: '$4,218', sub: 'MTD actual', trend: '↑ 6.2% vs Jan pace', trendColor: 'red', valColor: 'default' },
  { label: 'Projected Month', value: '$5,905', sub: 'at current run rate', trend: '↑ $380 over budget', trendColor: 'red', valColor: 'amber' },
  { label: 'Fixed / Variable', value: '62 / 38', sub: '% split', trend: '→ stable', trendColor: 'default', valColor: 'cyan' },
  { label: 'Top 3 Concentration', value: '71.4%', sub: 'of total spend', trend: '→ normal range', trendColor: 'default', valColor: 'default' },
  { label: 'Discretionary', value: '$1,603', sub: '38% of total', trend: '↑ 11% vs 3mo avg', trendColor: 'red', valColor: 'amber' },
  { label: 'Subscriptions', value: '$287', sub: '14 active', trend: '↑ 2 added since Dec', trendColor: 'red', valColor: 'blue' },
];

const VARIANCE: VarianceRow[] = [
  { category: 'Housing', budget: '$1,650', actual: '$1,650', projected: '$1,650', varDollar: '$0', varPct: '0.0%', trend: '→ → →', signal: '—', classification: 'Clean', classColor: COLORS.green, classBg: 'rgba(0,200,83,0.1)', positive: true },
  { category: 'Groceries', budget: '$600', actual: '$482', projected: '$675', varDollar: '+$75', varPct: '+12.5%', trend: '↑ ↑ ↑', signal: 'Signal', classification: 'Environmental', classColor: COLORS.blue, classBg: 'rgba(68,138,255,0.1)', positive: false },
  { category: 'Dining Out', budget: '$250', actual: '$218', projected: '$305', varDollar: '+$55', varPct: '+22.0%', trend: '↗ ↑ ↑', signal: 'Signal', classification: 'Execution', classColor: COLORS.amber, classBg: 'rgba(255,179,0,0.1)', positive: false },
  { category: 'Auto / Gas', budget: '$350', actual: '$248', projected: '$347', varDollar: '-$3', varPct: '-0.9%', trend: '→ → ↘', signal: 'Noise', classification: 'Clean', classColor: COLORS.green, classBg: 'rgba(0,200,83,0.1)', positive: true },
  { category: 'Subscriptions', budget: '$240', actual: '$287', projected: '$287', varDollar: '+$47', varPct: '+19.6%', trend: '↗ ↗ ↑', signal: 'Signal', classification: 'Structural', classColor: COLORS.red, classBg: 'rgba(255,61,61,0.1)', positive: false },
  { category: 'Utilities', budget: '$280', actual: '$310', projected: '$310', varDollar: '+$30', varPct: '+10.7%', trend: '→ ↗ ↑', signal: 'Noise', classification: 'Environmental', classColor: COLORS.blue, classBg: 'rgba(68,138,255,0.1)', positive: false },
  { category: 'Personal', budget: '$200', actual: '$187', projected: '$262', varDollar: '+$62', varPct: '+31.0%', trend: '↑ ↑ ↑', signal: 'Signal', classification: 'Execution', classColor: COLORS.amber, classBg: 'rgba(255,179,0,0.1)', positive: false },
  { category: 'Insurance', budget: '$420', actual: '$420', projected: '$420', varDollar: '$0', varPct: '0.0%', trend: '→ → →', signal: '—', classification: 'Clean', classColor: COLORS.green, classBg: 'rgba(0,200,83,0.1)', positive: true },
  { category: 'Savings / 401k', budget: '$800', actual: '$800', projected: '$800', varDollar: '$0', varPct: '0.0%', trend: '→ → →', signal: '—', classification: 'Clean', classColor: COLORS.green, classBg: 'rgba(0,200,83,0.1)', positive: true },
];

const ALLOC_BARS: AllocBar[] = [
  { label: 'Housing', pct: 39.1, amount: '$1,650', color: COLORS.cyan },
  { label: 'Savings', pct: 19.0, amount: '$800', color: COLORS.green },
  { label: 'Groceries', pct: 11.4, amount: '$482', color: COLORS.amber },
  { label: 'Insurance', pct: 10.0, amount: '$420', color: COLORS.blue },
  { label: 'Utilities', pct: 7.3, amount: '$310', color: COLORS.blue },
  { label: 'Subscriptions', pct: 6.8, amount: '$287', color: COLORS.red },
  { label: 'Auto', pct: 5.9, amount: '$248', color: COLORS.cyan },
  { label: 'Dining', pct: 5.2, amount: '$218', color: COLORS.amber },
  { label: 'Personal', pct: 4.4, amount: '$187', color: COLORS.amber },
];

const DRIFT_SIGNALS: DriftSignal[] = [
  { icon: '!', iconColor: COLORS.red, iconBg: 'rgba(255,61,61,0.1)', text: 'Dining Out: 3-month consecutive increase. +22% vs budget. Pace exceeds income growth rate. Classification: Execution variance.' },
  { icon: '⚠', iconColor: COLORS.amber, iconBg: 'rgba(255,179,0,0.1)', text: 'Subscriptions: 2 new services added since Dec. No corresponding cancellations. Silent creep pattern: +$47/mo structural increase.' },
  { icon: '⚠', iconColor: COLORS.amber, iconBg: 'rgba(255,179,0,0.1)', text: 'Groceries: 3-month upward trend consistent with regional CPI food index (+4.1% YoY). Classification: Environmental shift, not behavioral.' },
  { icon: '→', iconColor: COLORS.blue, iconBg: 'rgba(68,138,255,0.1)', text: 'Personal: Volatile — $142 → $210 → $187 over 3 months. No stable baseline. Insufficient signal for classification. Monitor.' },
  { icon: '⚠', iconColor: COLORS.amber, iconBg: 'rgba(255,179,0,0.1)', text: 'Concentration risk stable but top 3 categories (Housing + Savings + Groceries) = 69.5% of total. Fixed cost dominance limits reallocation flexibility.' },
];

const EFFICIENCY: EfficiencyRow[] = [
  { type: 'Subscription Accumulation', detail: '14 active · 2 added · 0 canceled', impact: '$287/mo', freq: 'Recurring', action: 'Audit queue', actionColor: COLORS.amber },
  { type: 'High-Freq Low-Value', detail: 'Coffee/convenience: 18 txns MTD', impact: '$94.20', freq: 'Daily', action: 'Monitor', actionColor: 'rgba(245,241,235,0.35)' },
  { type: 'Redundant Merchant', detail: '2 active streaming · usage unknown', impact: '$28.98/mo', freq: 'Recurring', action: 'Evaluate', actionColor: COLORS.amber },
  { type: 'Dining Concentration', detail: '62% of dining at 3 merchants', impact: '$135.16', freq: 'Weekly', action: 'No action', actionColor: 'rgba(245,241,235,0.35)' },
];

const OBSERVATIONS = [
  'Fixed costs (Housing + Insurance + Savings) represent 68.1% of budget — high stability but low reallocation optionality',
  'Subscription layer growing without corresponding cancellation discipline — net adds +2 in 60 days',
  'Grocery variance tracks CPI food index within 1.2 standard deviations — environmental, not behavioral',
  'Dining Out is the only category showing 3-month consecutive execution variance with no environmental justification',
  'Savings allocation maintained at $800/mo for 6 consecutive months — governance discipline intact on primary objective',
];

const RISKS = [
  'Subscription silent creep: at current trajectory, annualized increase = +$564 with no governance review',
  'Dining + Personal combined discretionary trending toward $567/mo — approaching structural threshold',
  'Variable spend as % of total increasing while income flat — margin compression pattern',
];

const ACTIONS = [
  'Subscription audit: evaluate 14 active services against usage data — potential recovery $40–80/mo',
  'Dining Out: implement weekly cap or shift allocation to contain combined discretionary drift',
  'Grocery budget: adjust target to $640 to reflect environmental reality — reduces false variance signal',
];

export default function GetSumPage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      {/* HERO */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Analytics Engine</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            GetSum<span style={{ color: COLORS.green, fontWeight: 400 }}>.engine</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Deterministic capital analysis — a household finance engine that classifies every budget variance
            as environmental, execution, or structural, with drift detection and capital efficiency signals.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'Household budgets track what was spent — but never why it drifted. No distinction between a grocery increase caused by inflation vs. a dining increase caused by behavior change. Every variance looks the same.' },
            { label: 'Approach', text: 'DDL\'s variance classification engine: every category deviation is analyzed against 3-month trends, CPI benchmarks, and behavioral patterns to classify as Environmental (external), Execution (behavioral), or Structural (permanent shift).' },
            { label: 'Deliverable', text: 'Terminal-style capital analysis dashboard — KPI strip, variance table with classification badges, allocation bars, drift detection signals, capital efficiency audit, and executive summary with actionable recommendations.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* KPI STRIP */}
      <FadeIn delay={300}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: COLORS.cyan, marginBottom: 16 }}>I. Capital Structure Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, padding: '16px 14px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', marginBottom: 6 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', fontWeight: 600, color: colorMap[kpi.valColor] }}>{kpi.value}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.3)', marginTop: 4 }}>{kpi.sub}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: colorMap[kpi.trendColor], marginTop: 4, fontWeight: 500 }}>{kpi.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* VARIANCE TABLE */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: COLORS.cyan, marginBottom: 16 }}>II. Variance Analysis — Category Level</div>
          <div style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', minWidth: 800 }}>
                <thead>
                  <tr>
                    {['Category', 'Budget', 'Actual', 'Projected', 'Var $', 'Var %', '3mo', 'Signal', 'Class'].map(h => (
                      <th key={h} style={{ color: 'rgba(245,241,235,0.3)', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 12px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VARIANCE.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(14,14,18,0.4)' }}>
                      <td style={{ padding: '10px 12px', color: '#F5F1EB', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.category}</td>
                      <td style={{ padding: '10px 12px', color: 'rgba(245,241,235,0.3)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.budget}</td>
                      <td style={{ padding: '10px 12px', color: 'rgba(245,241,235,0.6)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.actual}</td>
                      <td style={{ padding: '10px 12px', color: r.positive ? COLORS.green : COLORS.amber, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.projected}</td>
                      <td style={{ padding: '10px 12px', color: r.positive ? COLORS.green : COLORS.red, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.varDollar}</td>
                      <td style={{ padding: '10px 12px', color: r.positive ? COLORS.green : COLORS.red, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.varPct}</td>
                      <td style={{ padding: '10px 12px', color: 'rgba(245,241,235,0.3)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.trend}</td>
                      <td style={{ padding: '10px 12px', color: r.signal === 'Signal' ? COLORS.amber : 'rgba(245,241,235,0.2)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.signal}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 3, fontSize: '0.58rem', fontWeight: 600, background: r.classBg, color: r.classColor }}>{r.classification}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ALLOCATION + DRIFT */}
      <FadeIn delay={500}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Allocation */}
          <div style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, padding: '18px 16px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 14 }}>Category Allocation — % of Total</div>
            {ALLOC_BARS.map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 90, textAlign: 'right' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'rgba(245,241,235,0.45)' }}>{b.label}</span>
                <div style={{ flex: 1, height: 8, background: 'rgba(8,8,10,0.8)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: 2 }} />
                </div>
                <span style={{ width: 38, textAlign: 'right' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.4)' }}>{b.pct}%</span>
                <span style={{ width: 55, textAlign: 'right' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.25)' }}>{b.amount}</span>
              </div>
            ))}
          </div>

          {/* Drift */}
          <div style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, padding: '18px 16px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: COLORS.red, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 14 }}>III. Drift Detection — Active Signals</div>
            {DRIFT_SIGNALS.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < DRIFT_SIGNALS.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, background: d.iconBg, color: d.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 600, flexShrink: 0 }}>{d.icon}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.78rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.5 }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* EFFICIENCY TABLE */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: COLORS.cyan, marginBottom: 16 }}>V. Capital Efficiency Signals</div>
          <div style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
              <thead>
                <tr>
                  {['Signal', 'Detail', 'Impact', 'Freq', 'Action'].map(h => (
                    <th key={h} style={{ color: 'rgba(245,241,235,0.3)', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EFFICIENCY.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(14,14,18,0.4)' }}>
                    <td style={{ padding: '10px 14px', color: '#F5F1EB', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.type}</td>
                    <td style={{ padding: '10px 14px', color: 'rgba(245,241,235,0.3)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.detail}</td>
                    <td style={{ padding: '10px 14px', color: COLORS.amber, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.impact}</td>
                    <td style={{ padding: '10px 14px', color: 'rgba(245,241,235,0.4)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.freq}</td>
                    <td style={{ padding: '10px 14px', color: r.actionColor, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* SYSTEM STATE */}
      <FadeIn delay={700}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: COLORS.cyan, marginBottom: 16 }}>VII. System State Output</div>
          <div style={{ background: 'rgba(16,16,20,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, padding: '20px' }}>
            {[{ title: '5 Structural Observations', items: OBSERVATIONS }, { title: '3 Emerging Risks', items: RISKS }, { title: '3 Capital Reallocation Considerations', items: ACTIONS }].map((section, si) => (
              <div key={si} style={{ marginBottom: si < 2 ? 20 : 0, paddingBottom: si < 2 ? 20 : 0, borderBottom: si < 2 ? '1px solid rgba(245,241,235,0.06)' : 'none' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{section.title}</div>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ paddingLeft: 14, position: 'relative', fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.55, marginBottom: 6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'rgba(245,241,235,0.2)' }}>›</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* EXEC SUMMARY */}
      <FadeIn delay={800}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ background: 'rgba(24,24,30,0.8)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 6, padding: '20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: COLORS.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 10 }}>Executive Summary</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.7 }}>
              Monthly spend is tracking 6.2% above prior month pace, projecting $5,905 against a $5,525 budget.
              Core fixed allocations (Housing, Insurance, Savings) remain clean with zero variance — governance discipline
              is holding where it matters most. The primary pressure is discretionary: Dining Out shows a 3-month execution
              drift pattern (+22% vs budget) with no environmental justification, and the subscription layer has added 2 services
              without cancellations, creating a $47/month structural increase. Grocery variance is environmental (CPI-aligned),
              not behavioral — the budget target should adjust rather than the behavior. The system is not in crisis. The savings rate
              is protected. But discretionary drift is compounding, and subscription accumulation without audit creates silent margin
              compression.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={900}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            GetSum.engine · Deterministic Capital Analysis · v0.1 · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
