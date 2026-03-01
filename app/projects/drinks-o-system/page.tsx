'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  style?: CSSProperties;
}

function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── DATA ── */

interface KpiData {
  label: string;
  value: string;
  detail: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  color: string;
}

interface SpiritBar {
  label: string;
  pct: number;
  count: number;
  gradient: string;
}

interface PricingRow {
  name: string;
  base: string;
  cost: string;
  price: string;
  margin: string;
  pourCost: string;
  push: 'high' | 'mid' | 'low';
}

interface GapItem {
  label: string;
  value: string;
  note: string;
}

interface OpCard {
  number: string;
  label: string;
  sub: string;
}

const KPIS: KpiData[] = [
  { label: 'Total Recipes', value: '127', detail: 'across 4 venues', trend: '↑ 14 added this quarter', trendType: 'up', color: '#C9A84C' },
  { label: 'Active Menu', value: '42', detail: 'currently poured', trend: '— 85 in archive', trendType: 'neutral', color: '#B87333' },
  { label: 'Avg Pour Cost', value: '18.3%', detail: 'target: ≤20%', trend: '↓ 1.2% from last quarter', trendType: 'up', color: '#5BAF7B' },
  { label: 'Avg Margin', value: '$10.40', detail: 'per cocktail', trend: '↑ $0.80 from Q3', trendType: 'up', color: '#5B8FC4' },
  { label: 'Unique Ingredients', value: '89', detail: 'in active rotation', trend: '23 bottles underutilized', trendType: 'neutral', color: '#8B6BAE' },
  { label: 'Originals Ratio', value: '64%', detail: 'originals vs classics', trend: 'creative output strong', trendType: 'up', color: '#C45B5B' },
];

const SPIRITS: SpiritBar[] = [
  { label: 'Whiskey', pct: 38, count: 48, gradient: 'linear-gradient(90deg, #8B6914, #C9A84C)' },
  { label: 'Gin', pct: 18, count: 23, gradient: 'linear-gradient(90deg, #2D6B4A, #5BAF7B)' },
  { label: 'Rum', pct: 12, count: 15, gradient: 'linear-gradient(90deg, #8B4513, #B87333)' },
  { label: 'Tequila', pct: 10, count: 13, gradient: 'linear-gradient(90deg, #7A6B2A, #C4B45A)' },
  { label: 'Amaro', pct: 8, count: 10, gradient: 'linear-gradient(90deg, #5B3A6B, #8B6BAE)' },
  { label: 'Mezcal', pct: 6, count: 8, gradient: 'linear-gradient(90deg, #5A6B2A, #8AAF4A)' },
  { label: 'Brandy', pct: 5, count: 6, gradient: 'linear-gradient(90deg, #6B3A2A, #A05A3A)' },
  { label: 'Vodka', pct: 3, count: 4, gradient: 'linear-gradient(90deg, #4A5568, #718096)' },
];

const BUILD_STYLES = [
  { label: 'Stirred', pct: 36, color: '#C9A84C' },
  { label: 'Shaken', pct: 28, color: '#5B8FC4' },
  { label: 'Built', pct: 20, color: '#B87333' },
  { label: 'Batched', pct: 16, color: '#5BAF7B' },
];

const SEASONS = [
  { label: 'Spring', count: 18, bg: 'rgba(91,175,123,0.08)' },
  { label: 'Summer', count: 22, bg: 'rgba(201,168,76,0.08)' },
  { label: 'Fall', count: 26, bg: 'rgba(184,115,51,0.08)' },
  { label: 'Winter', count: 19, bg: 'rgba(91,143,196,0.08)' },
  { label: 'Perennial', count: 42, bg: 'rgba(139,107,174,0.08)' },
];

const TOP_INGREDIENTS = [
  { name: 'Simple Syrup', count: 54, pct: 92 },
  { name: 'Angostura Bitters', count: 46, pct: 78 },
  { name: 'Fresh Lemon', count: 42, pct: 72 },
  { name: 'Fresh Lime', count: 38, pct: 65 },
  { name: 'Luxardo Maraschino', count: 28, pct: 48 },
  { name: 'Demerara Syrup', count: 26, pct: 44 },
  { name: 'Orange Bitters', count: 24, pct: 40 },
  { name: 'Campari', count: 21, pct: 35 },
  { name: 'Sweet Vermouth', count: 19, pct: 33 },
  { name: 'Egg White', count: 16, pct: 28 },
];

const MARGIN_TABLE: PricingRow[] = [
  { name: 'Paper Plane', base: 'Bourbon', cost: '$2.15', price: '$15', margin: '$12.85', pourCost: '14.3%', push: 'high' },
  { name: 'Gold Rush', base: 'Bourbon', cost: '$2.40', price: '$14', margin: '$11.60', pourCost: '17.1%', push: 'high' },
  { name: 'Division Bell', base: 'Mezcal', cost: '$3.10', price: '$16', margin: '$12.90', pourCost: '19.4%', push: 'high' },
  { name: 'Bee\'s Knees', base: 'Gin', cost: '$1.85', price: '$13', margin: '$11.15', pourCost: '14.2%', push: 'high' },
  { name: 'Penicillin', base: 'Scotch', cost: '$3.60', price: '$16', margin: '$12.40', pourCost: '22.5%', push: 'mid' },
  { name: 'Naked & Famous', base: 'Mezcal', cost: '$3.25', price: '$15', margin: '$11.75', pourCost: '21.7%', push: 'mid' },
  { name: 'Last Word', base: 'Gin', cost: '$3.45', price: '$15', margin: '$11.55', pourCost: '23.0%', push: 'mid' },
  { name: 'House Old Fashioned', base: 'Bourbon', cost: '$4.20', price: '$16', margin: '$11.80', pourCost: '26.3%', push: 'mid' },
  { name: 'Jungle Bird', base: 'Rum', cost: '$2.50', price: '$14', margin: '$11.50', pourCost: '17.9%', push: 'high' },
  { name: 'Toronto', base: 'Rye', cost: '$3.90', price: '$15', margin: '$11.10', pourCost: '26.0%', push: 'mid' },
];

const GAPS: GapItem[] = [
  { label: 'Underbuilt Spirit', value: 'Brandy', note: '6 recipes total · 3% of menu. Room for sidecar riffs, brandy sours, batched punches.' },
  { label: 'Missing Style', value: 'Rum Flips', note: 'Zero rum flips in system. Winter seasonal opportunity with aged rum + egg + nutmeg.' },
  { label: 'Low-Push / High-Margin', value: 'Jungle Bird', note: '$11.50 margin, 17.9% pour cost. Currently not on push list. Easy win.' },
  { label: 'Seasonal Gap', value: 'Spring Stirred', note: 'Only 3 stirred drinks in spring rotation. Floral vermouth + gin opportunity.' },
  { label: 'Underutilized Bottle', value: 'Suze', note: 'On shelf, in 1 recipe. Pairs with gin, tequila, citrus. White Negroni riff candidate.' },
  { label: 'Mezcal Depth', value: '8 recipes · 2 shaken', note: 'Strong spirit, thin coverage. Mezcal sour, mezcal highball, batched paloma all open.' },
];

const OPS: OpCard[] = [
  { number: '21', label: 'Batch-Ready', sub: 'Pre-mix, keg, or bottle service' },
  { number: '14', label: 'Speed Builds', sub: 'Under 90 sec ticket time' },
  { number: '8', label: 'High-Prep', sub: 'Fresh juice, infusion, or cordial' },
  { number: '3.2', label: 'Avg Stations', sub: 'Touches per cocktail' },
];

const SPEED_TIERS = [
  { time: '< 60s', color: '#5BAF7B', bg: 'rgba(91,175,123,0.15)', desc: '8 drinks — Highballs, built drinks, batched pours' },
  { time: '60–90s', color: '#C9A84C', bg: 'rgba(201,168,76,0.1)', desc: '18 drinks — Stirred classics, simple shaken' },
  { time: '90–120s', color: '#B87333', bg: 'rgba(184,115,51,0.1)', desc: '12 drinks — Multi-step shaken, egg drinks' },
  { time: '120s+', color: '#C45B5B', bg: 'rgba(196,91,91,0.1)', desc: '4 drinks — Tableside, flamed, elaborate garnish' },
];

const PUSH_COLORS: Record<string, string> = { high: '#5BAF7B', mid: '#C9A84C', low: '#C45B5B' };
const TREND_COLORS: Record<string, string> = { up: '#5BAF7B', down: '#C45B5B', neutral: 'rgba(245,241,235,0.35)' };

export default function DrinksOSystemPage() {
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      {/* BACK LINK */}
      <FadeIn>
        <a
          href="/projects"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#B23531',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 32,
          }}
        >
          ← Back to Projects
        </a>
      </FadeIn>

      {/* HERO */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>
            DDL Case Study · Analytics Engine
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Drinks-O-<span style={{ color: '#C9A84C' }}>System</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            A cocktail intelligence dashboard that turns recipe libraries into margin analytics,
            creative gap analysis, and operational insights across a multi-venue bar collective.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'A bar collective running 127+ cocktail recipes across 4 venues with no centralized view of cost structure, creative gaps, ingredient utilization, or operational load.' },
            { label: 'Approach', text: 'DDL\'s dimensional analytics engine: every recipe becomes a fact row with spirit, style, season, cost, and venue dimensions — enabling margin ranking, gap heatmaps, and operator-level insights.' },
            { label: 'Deliverable', text: 'Full-stack cocktail intelligence dashboard — KPI strip, spirit distribution, build style rings, ingredient network, margin ranking table, creative gap heatmap, and operator speed/station analysis.' },
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
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Dashboard KPIs</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>At a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {KPIS.map((kpi, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredKpi(i)}
                onMouseLeave={() => setHoveredKpi(null)}
                style={{
                  background: hoveredKpi === i ? 'rgba(245,241,235,0.06)' : 'rgba(245,241,235,0.03)',
                  border: '1px solid rgba(245,241,235,0.08)',
                  borderRadius: 8,
                  padding: '18px 16px',
                  borderTop: hoveredKpi === i ? `2px solid ${kpi.color}` : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#F5F1EB', lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.7rem', color: 'rgba(245,241,235,0.45)', marginTop: 4 }}>{kpi.detail}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: TREND_COLORS[kpi.trendType], marginTop: 6 }}>{kpi.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* SPIRIT DISTRIBUTION */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Recipe Overview</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 24 }}>Base Spirit Distribution</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {SPIRITS.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.55)', width: 80, textAlign: 'right' as const }}>{s.label}</span>
                <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: s.gradient, borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)' }}>{s.pct}%</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(245,241,235,0.35)', width: 30 }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* BUILD STYLE + SEASONS */}
      <FadeIn delay={450}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Build Style */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', marginBottom: 16 }}>Build Style</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' as const, gap: 16 }}>
              {BUILD_STYLES.map((s) => (
                <div key={s.label} style={{ textAlign: 'center' as const }}>
                  <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 8px' }}>
                    <svg viewBox="0 0 72 72" width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                      <circle cx="36" cy="36" r="28" fill="none" stroke={s.color} strokeWidth="4" strokeDasharray={`${(s.pct / 100) * 176} 176`} />
                    </svg>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#F5F1EB' }}>{s.pct}%</span>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Rotation */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', marginBottom: 16 }}>Seasonal Rotation</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
              {SEASONS.map((s) => (
                <div key={s.label} style={{ flex: 1, minWidth: 80, background: s.bg, border: '1px solid rgba(245,241,235,0.06)', borderRadius: 8, padding: '14px 10px', textAlign: 'center' as const }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#F5F1EB', lineHeight: 1 }}>{s.count}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* TOP INGREDIENTS */}
      <FadeIn delay={500}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Ingredient Intelligence</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Most Used Ingredients</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            {TOP_INGREDIENTS.map((ing) => (
              <div key={ing.name} style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', borderRadius: 6, gap: 12 }}>
                <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: '#F5F1EB', width: 160 }}>{ing.name}</span>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${ing.pct}%`, height: '100%', background: 'linear-gradient(90deg, #C9A84C, #D4A853)', borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#C9A84C', width: 90, textAlign: 'right' as const }}>{ing.count} recipes</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* MARGIN TABLE */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Cost + Margin Layer</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Margin Ranking — Active Menu</h2>
          <div style={{ background: 'rgba(245,241,235,0.03)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: 700 }}>
                <thead>
                  <tr>
                    {['Recipe', 'Base', 'Cost', 'Price', 'Margin', 'Pour %', ''].map((h) => (
                      <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', padding: '10px 14px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MARGIN_TABLE.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: '10px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: '#F5F1EB', fontWeight: 500, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.name}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.78rem', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.base}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.cost}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.price}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#5BAF7B', fontWeight: 600, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.margin}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'rgba(245,241,235,0.45)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{row.pourCost}</td>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: PUSH_COLORS[row.push] }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 20, padding: '12px 14px', borderTop: '1px solid rgba(245,241,235,0.06)' }}>
              {[{ label: 'High push', color: '#5BAF7B' }, { label: 'Balanced', color: '#C9A84C' }, { label: 'Watch', color: '#C45B5B' }].map((l) => (
                <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.4)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, display: 'inline-block' }} /> {l.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* CREATIVE GAP ANALYSIS */}
      <FadeIn delay={700}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Creative Gap Analysis</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Identified Gaps & Opportunities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {GAPS.map((gap, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.03)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '16px 14px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', marginBottom: 6 }}>{gap.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', color: '#C45B5B', fontWeight: 600, marginBottom: 6 }}>{gap.value}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.75rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.5 }}>{gap.note}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* OPERATOR VIEW */}
      <FadeIn delay={800}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Operator View</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Operational Intelligence</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            {OPS.map((op, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.03)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '18px 14px', textAlign: 'center' as const }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#F5F1EB', lineHeight: 1 }}>{op.number}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginTop: 6 }}>{op.label}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.65rem', color: 'rgba(245,241,235,0.35)', marginTop: 4 }}>{op.sub}</div>
              </div>
            ))}
          </div>

          {/* Speed Tiers */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.4)', marginBottom: 14 }}>Service Speed Tiers</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {SPEED_TIERS.map((tier) => (
                <div key={tier.time} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 70, textAlign: 'right' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: tier.color }}>{tier.time}</div>
                  <div style={{ flex: 1, height: 28, background: tier.bg, borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
                    <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.72rem', color: tier.color }}>{tier.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* FOOTER */}
      <FadeIn delay={900}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            Drinks-O-System · v0.1 · Cocktail Intelligence Engine · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
