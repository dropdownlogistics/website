'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const FOREST = '#2D6A4F'; const TERRA = '#C4704B'; const SAGE = '#95D5B2';

interface KpiData { label: string; value: string; sub: string; trend?: string; trendGood?: boolean; accent?: string; }
interface GrantRow { name: string; funder: string; award: string; spent: string; remaining: string; burnPct: number; burnStatus: 'safe' | 'watch' | 'hot'; nextReport: string; status: string; statusColor: string; statusBg: string; faded?: boolean; }
interface SpendBar { label: string; pct: number; amount: string; color: string; }
interface Deadline { grant: string; type: string; date: string; days: string; urgent?: boolean; status: string; statusColor: string; statusBg: string; }
interface Procedure { icon: string; name: string; count: number; sub: string; }

const KPIS: KpiData[] = [
  { label: 'Active Grants', value: '6', sub: 'across 5 funders', trend: '+ 1 new this quarter', trendGood: true },
  { label: 'Total Awarded', value: '$345K', sub: 'active grant portfolio', trend: '↑ $25K from Q3', trendGood: true },
  { label: 'Total Spent', value: '$187K', sub: 'year-to-date', trend: '54.2% burn rate', trendGood: false, accent: TERRA },
  { label: 'Remaining Funds', value: '$158K', sub: 'across all active grants' },
  { label: 'Procedures YTD', value: '2,847', sub: 'spay/neuter completed', trend: '↑ 12% vs prior year', trendGood: true },
  { label: 'Cost / Procedure', value: '$65.70', sub: 'blended average', trend: '↓ $3.20 from Q3', trendGood: true, accent: TERRA },
];

const GRANTS: GrantRow[] = [
  { name: 'Community Grant', funder: 'National Animal Welfare Org', award: '$75,000', spent: '$42,180', remaining: '$32,820', burnPct: 56, burnStatus: 'safe', nextReport: 'Mar 31', status: '39 days', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { name: 'Spay/Neuter Fund', funder: 'Pet Retail Foundation', award: '$50,000', spent: '$31,450', remaining: '$18,550', burnPct: 63, burnStatus: 'watch', nextReport: 'Mar 31', status: '39 days', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { name: 'Animal Care Grant', funder: 'State Agency', award: '$120,000', spent: '$89,200', remaining: '$30,800', burnPct: 74, burnStatus: 'watch', nextReport: 'Feb 28', status: '8 days', statusColor: '#D64045', statusBg: 'rgba(214,64,69,0.12)' },
  { name: 'Community Impact', funder: 'Corporate Charity', award: '$35,000', spent: '$12,600', remaining: '$22,400', burnPct: 36, burnStatus: 'safe', nextReport: 'May 31', status: '100 days', statusColor: FOREST, statusBg: 'rgba(45,106,79,0.12)' },
  { name: 'Spay/Neuter Initiative', funder: 'County Government', award: '$25,000', spent: '$4,800', remaining: '$20,200', burnPct: 19, burnStatus: 'safe', nextReport: 'Mar 31', status: '39 days', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { name: 'Animal Welfare Fund', funder: 'Community Foundation', award: '$40,000', spent: '$6,950', remaining: '$33,050', burnPct: 17, burnStatus: 'safe', nextReport: 'Jul 31', status: '161 days', statusColor: FOREST, statusBg: 'rgba(45,106,79,0.12)' },
  { name: 'Veterinary Care', funder: 'Veterinary Foundation', award: '$15,000', spent: '$15,000', remaining: '$0', burnPct: 100, burnStatus: 'hot', nextReport: 'Closed', status: 'Complete', statusColor: 'rgba(245,241,235,0.3)', statusBg: 'rgba(245,241,235,0.05)', faded: true },
];

const SPEND_BARS: SpendBar[] = [
  { label: 'Labor / Staffing', pct: 31, amount: '$57,970', color: FOREST },
  { label: 'Surgical Supplies', pct: 24, amount: '$44,880', color: '#40916C' },
  { label: 'Medications', pct: 19, amount: '$35,530', color: '#40916C' },
  { label: 'Facility Costs', pct: 11, amount: '$20,570', color: TERRA },
  { label: 'Equipment', pct: 8, amount: '$14,960', color: '#E8A87C' },
  { label: 'Outreach', pct: 5, amount: '$9,350', color: SAGE },
  { label: 'Administrative', pct: 2, amount: '$3,740', color: 'rgba(245,241,235,0.3)' },
];

const DEADLINES: Deadline[] = [
  { grant: 'State Agency Animal Care', type: 'Monthly Report', date: 'Feb 28', days: '8 days', urgent: true, status: 'Due Soon', statusColor: '#D64045', statusBg: 'rgba(214,64,69,0.12)' },
  { grant: 'National Org Community Grant', type: 'Quarterly Report', date: 'Mar 31', days: '39 days', status: 'Upcoming', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { grant: 'Pet Retail Spay/Neuter', type: 'Semi-Annual Report', date: 'Mar 31', days: '39 days', status: 'Upcoming', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { grant: 'County Initiative', type: 'Quarterly Report', date: 'Mar 31', days: '39 days', status: 'Upcoming', statusColor: TERRA, statusBg: 'rgba(196,112,75,0.12)' },
  { grant: 'Corporate Charity Impact', type: 'Quarterly Report', date: 'May 31', days: '100 days', status: 'On Track', statusColor: FOREST, statusBg: 'rgba(45,106,79,0.12)' },
  { grant: 'Community Foundation', type: 'Semi-Annual Report', date: 'Jul 31', days: '161 days', status: 'On Track', statusColor: FOREST, statusBg: 'rgba(45,106,79,0.12)' },
];

const PROCEDURES: Procedure[] = [
  { icon: '🐱', name: 'Feline Spay', count: 842, sub: '$54,730 total · $65/avg' },
  { icon: '🐱', name: 'Feline Neuter', count: 614, sub: '$27,630 total · $45/avg' },
  { icon: '🐕', name: 'Canine Spay', count: 523, sub: '$57,530 total · $110/avg' },
  { icon: '🐕', name: 'Canine Neuter', count: 389, sub: '$33,540 total · $86/avg' },
  { icon: '✂️', name: 'Feral Cat TNR', count: 312, sub: '$10,920 total · $35/avg' },
  { icon: '💉', name: 'Vaccine Add-On', count: 167, sub: '$4,175 total · $25/avg' },
];

const ASSUMPTIONS = [
  'A typical clinic manages 5–8 active grants from a mix of federal, state, foundation, and corporate sources',
  'Grant awards range from $5,000 to $150,000 with 6–24 month terms',
  'Primary eligible expenses: surgical supplies, medications, labor, facility costs, outreach, equipment',
  'Reporting frequency varies by funder — monthly, quarterly, semi-annual, or at close-out',
  'Cost-per-procedure is the #1 metric funders care about',
  'The people entering data are veterinarians and clinic managers — not accountants',
];

const BURN_COLORS: Record<string, string> = { safe: FOREST, watch: '#E8973A', hot: '#D64045' };

export default function GrantTrackerPage() {
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
            Grant<span style={{ color: TERRA }}>Tracker</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Grant intelligence for animal welfare clinics — real-time fund balances, burn rate monitoring,
            compliance deadlines, and cost-per-procedure analytics from data clinics already have.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'Low-cost spay/neuter clinics juggle 5–8 active grants from different funders, each with unique reporting schedules, eligible expense categories, and burn rate concerns — tracked in disconnected spreadsheets with no unified view.' },
            { label: 'Approach', text: 'DDL\'s grant intelligence engine: every expenditure is a fact row with grant, category, procedure, and period dimensions — enabling real-time fund balance tracking, burn rate alerts, compliance calendars, and cost-per-procedure analytics that funders care about.' },
            { label: 'Deliverable', text: 'Grant operations dashboard — portfolio KPIs, fund balance table with burn rate visualizations, spend-by-category breakdowns, compliance deadline calendar, procedure metrics by type, and assumption documentation for client validation.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* KPIs */}
      <FadeIn delay={300}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Key Metrics</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 12 }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '20px 16px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: kpi.accent || '#F5F1EB', lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.72rem', color: 'rgba(245,241,235,0.4)', marginTop: 4 }}>{kpi.sub}</div>
                {kpi.trend && (
                  <div style={{ display: 'inline-block', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', fontWeight: 600, padding: '2px 8px', borderRadius: 10, marginTop: 6, background: kpi.trendGood ? 'rgba(45,106,79,0.15)' : 'rgba(196,112,75,0.15)', color: kpi.trendGood ? FOREST : TERRA }}>{kpi.trend}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* GRANT STATUS TABLE */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Grant Status</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Fund Balances & Burn Rates</h2>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: 800 }}>
                <thead>
                  <tr>
                    {['Grant', 'Funder', 'Award', 'Spent', 'Remaining', 'Burn Rate', 'Next Report', 'Status'].map(h => (
                      <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#F5F1EB', background: 'rgba(45,106,79,0.2)', padding: '12px 14px', textAlign: 'left' as const, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GRANTS.map((g, i) => (
                    <tr key={i} style={{ opacity: g.faded ? 0.4 : 1 }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: '#F5F1EB', fontWeight: 600, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.name}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.funder}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'rgba(245,241,235,0.6)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.award}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'rgba(245,241,235,0.6)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.spent}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#F5F1EB', fontWeight: 500, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.remaining}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(245,241,235,0.04)', minWidth: 120 }}>
                        <div style={{ width: '100%', height: 6, background: 'rgba(149,213,178,0.15)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}>
                          <div style={{ width: `${g.burnPct}%`, height: '100%', background: BURN_COLORS[g.burnStatus], borderRadius: 3 }} />
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.4)' }}>{g.burnPct}%</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{g.nextReport}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, fontSize: '0.65rem', fontWeight: 600, background: g.statusBg, color: g.statusColor }}>{g.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* SPEND + COMPLIANCE */}
      <FadeIn delay={500}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Spend by Category */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 16 }}>Spend by Category</div>
            {SPEND_BARS.map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ width: 110, fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.55)', textAlign: 'right' as const, flexShrink: 0 }}>{b.label}</span>
                <div style={{ flex: 1, height: 10, background: 'rgba(149,213,178,0.1)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: 5 }} />
                </div>
                <span style={{ width: 35, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: FOREST, fontWeight: 600, textAlign: 'right' as const }}>{b.pct}%</span>
                <span style={{ width: 65, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'rgba(245,241,235,0.35)', textAlign: 'right' as const }}>{b.amount}</span>
              </div>
            ))}
          </div>

          {/* Compliance */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 16 }}>Compliance Calendar</div>
            {DEADLINES.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < DEADLINES.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: '#F5F1EB' }}>{d.grant}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.35)' }}>{d.type}</div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: FOREST, fontWeight: 600 }}>{d.date}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: d.urgent ? '#D64045' : 'rgba(245,241,235,0.35)', fontWeight: d.urgent ? 600 : 400 }}>{d.days}</span>
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, fontSize: '0.6rem', fontWeight: 600, background: d.statusBg, color: d.statusColor, whiteSpace: 'nowrap' as const }}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* PROCEDURES */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Procedure Intelligence</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Impact by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 12 }}>
            {PROCEDURES.map((p, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '20px 16px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.6)', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: FOREST }}>{p.count.toLocaleString()}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.35)', marginTop: 4 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ASSUMPTIONS */}
      <FadeIn delay={700}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ background: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.15)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: TERRA, marginBottom: 8 }}>Built on These Assumptions</div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', color: SAGE, fontWeight: 600, marginBottom: 14 }}>This was made on the assumptions that...</h3>
            {ASSUMPTIONS.map((a, i) => (
              <div key={i} style={{ paddingLeft: 20, position: 'relative', fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.7, marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 0, color: '#E8A87C' }}>→</span>
                {a}
              </div>
            ))}
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: SAGE, marginTop: 16, fontWeight: 500 }}>
              Tell us where we&rsquo;re wrong. The engine adjusts — that&rsquo;s the whole point.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={800}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            GrantTracker Engine · v1.0 · Grant Intelligence for Clinics That Care · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
