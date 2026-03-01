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

interface KpiData { label: string; value: string; delta: string; deltaDown?: boolean; accent?: string; }
interface BarRow { label: string; pct: number; value: string; color: string; }
interface ArtistData { initial: string; name: string; role: string; bookings: number; utilization: number; rating: string; revenue: string; color: string; }
interface TimelineItem { day: string; month: string; client: string; service: string; meta: string; revenue: string; }
interface PipelineStage { count: number; name: string; detail: string; color: string; }

const KPIS: KpiData[] = [
  { label: 'YTD Revenue', value: '$187K', delta: '▲ 24% vs prior year', accent: '#B8907A' },
  { label: 'Bookings (90d)', value: '47', delta: '▲ 12 vs same period LY' },
  { label: 'Avg Booking Value', value: '$1,240', delta: '▲ 8% vs prior year', accent: '#C9A96E' },
  { label: 'Artist Utilization', value: '78%', delta: 'Target: 80%', accent: '#9CAF96' },
  { label: 'Client Satisfaction', value: '4.9', delta: '138 reviews' },
];

const REVENUE_MIX: BarRow[] = [
  { label: 'On-Location', pct: 62, value: '$116K', color: '#B8907A' },
  { label: 'In-Studio', pct: 24, value: '$45K', color: '#C9A96E' },
  { label: 'Rental', pct: 14, value: '$26K', color: '#9CAF96' },
];

const TOP_SERVICES: BarRow[] = [
  { label: 'Bridal Glam', pct: 85, value: '$72K', color: '#B8907A' },
  { label: 'Bridal Party', pct: 60, value: '$51K', color: '#E8C4B8' },
  { label: 'Trial Session', pct: 28, value: '$24K', color: '#C9A96E' },
  { label: 'Special Event', pct: 20, value: '$17K', color: '#8A7968' },
  { label: 'Studio Session', pct: 16, value: '$14K', color: '#9CAF96' },
];

const ARTISTS: ArtistData[] = [
  { initial: 'S', name: 'Lead Artist / Owner', role: 'Hair & Makeup · Bridal Specialist', bookings: 38, utilization: 86, rating: '5.0', revenue: '$68K', color: '#B8907A' },
  { initial: 'M', name: 'Senior Artist', role: 'Hair & Makeup · Senior Artist', bookings: 29, utilization: 74, rating: '4.9', revenue: '$48K', color: '#C9A96E' },
  { initial: 'A', name: 'Editorial Specialist', role: 'Makeup · Editorial Focus', bookings: 22, utilization: 68, rating: '4.9', revenue: '$35K', color: '#9CAF96' },
  { initial: 'J', name: 'Texture Specialist', role: 'Hair · Updo & Texture Focus', bookings: 18, utilization: 62, rating: '4.8', revenue: '$24K', color: '#E8C4B8' },
  { initial: 'R', name: 'Contract Artist', role: 'Hair & Makeup · On-Call', bookings: 12, utilization: 48, rating: '4.8', revenue: '$12K', color: '#C4B5A2' },
];

const UPCOMING: TimelineItem[] = [
  { day: '22', month: 'Feb', client: 'Wedding — Party of 6', service: 'Bridal Glam + Bridal Party', meta: 'Venue TBD · Lead + Senior · 7:00 AM', revenue: '$2,850' },
  { day: '25', month: 'Feb', client: 'Bridal Trial', service: 'Trial + Consultation', meta: 'Studio · Lead Artist · 2:00 PM', revenue: '$250' },
  { day: '1', month: 'Mar', client: 'Wedding — Party of 9', service: 'Bridal Glam + Full Party', meta: 'Event Space · Full Team · 5:30 AM', revenue: '$4,100' },
  { day: '5', month: 'Mar', client: 'Editorial Photoshoot', service: 'Styling (4 looks)', meta: 'Studio · Lead + Editorial · 10:00 AM', revenue: '$1,200' },
];

const PIPELINE: PipelineStage[] = [
  { count: 14, name: 'New Inquiries', detail: '$18,200 potential · Avg 2.3 days to respond', color: '#C4B5A2' },
  { count: 9, name: 'Consultation Scheduled', detail: '$12,600 potential · 78% conversion rate', color: '#C9A96E' },
  { count: 6, name: 'Trial Booked', detail: '$9,800 potential · 92% conversion rate', color: '#B8907A' },
  { count: 22, name: 'Confirmed & Deposited', detail: '$58,400 contracted · $23,360 deposits collected', color: '#9CAF96' },
];

const FUNNEL: BarRow[] = [
  { label: 'Inquiry → Consult', pct: 64, value: '64%', color: '#C9A96E' },
  { label: 'Consult → Trial', pct: 78, value: '78%', color: '#B8907A' },
  { label: 'Trial → Booked', pct: 92, value: '92%', color: '#9CAF96' },
  { label: 'Full Funnel', pct: 46, value: '46%', color: '#E8C4B8' },
];

const LEAD_SOURCES: BarRow[] = [
  { label: 'Instagram', pct: 42, value: '42%', color: '#B8907A' },
  { label: 'Referral', pct: 28, value: '28%', color: '#9CAF96' },
  { label: 'Wedding Platform', pct: 16, value: '16%', color: '#C9A96E' },
  { label: 'Google', pct: 9, value: '9%', color: '#8A7968' },
  { label: 'Other', pct: 5, value: '5%', color: '#E8C4B8' },
];

const SEASONAL_MONTHS = [
  { m: 'Jan', type: 'off' }, { m: 'Feb', type: 'off' }, { m: 'Mar', type: 'shoulder' },
  { m: 'Apr', type: 'peak' }, { m: 'May', type: 'peak' }, { m: 'Jun', type: 'peak' },
  { m: 'Jul', type: 'peak' }, { m: 'Aug', type: 'shoulder' }, { m: 'Sep', type: 'peak' },
  { m: 'Oct', type: 'peak' }, { m: 'Nov', type: 'shoulder' }, { m: 'Dec', type: 'off' },
];

const SEASON_COLORS: Record<string, { bg: string; text: string }> = {
  peak: { bg: 'rgba(184,144,122,0.25)', text: '#B8907A' },
  shoulder: { bg: 'rgba(201,169,110,0.15)', text: '#C9A96E' },
  off: { bg: 'rgba(200,185,165,0.06)', text: 'rgba(245,241,235,0.3)' },
};

const SCHEMA_DIMS = ['Dim_Client', 'Dim_Artist', 'Dim_Service', 'Dim_Venue', 'Dim_Period', 'Dim_RevenueStream', 'Dim_LeadSource'];

const ENGINE_FAMILY = [
  { name: 'VetSchedule', domain: 'Veterinary', fact: 'Fact_Appointments' },
  { name: 'Drinks-O-System', domain: 'Hospitality', fact: 'Fact_Recipes' },
  { name: 'BlindSpot', domain: 'Betting / Trading', fact: 'Fact_Picks' },
  { name: 'Graceful Beauty', domain: 'Bridal Beauty', fact: 'Fact_Bookings', highlight: true },
];

function BarChart({ rows }: { rows: BarRow[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
      {rows.map((r) => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.55)', width: 120, textAlign: 'right' as const }}>{r.label}</span>
          <div style={{ flex: 1, height: 22, background: 'rgba(200,185,165,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${r.pct}%`, height: '100%', background: `linear-gradient(90deg, ${r.color}, ${r.color}cc)`, borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#F5F1EB', width: 60, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function GracefulBeautyPage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      {/* BACK LINK */}
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
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
            Graceful <span style={{ color: '#B8907A' }}>Beauty</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            A luxury bridal beauty operations engine — booking intelligence, artist utilization tracking,
            studio occupancy analytics, and pipeline management built on a star schema architecture.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'A growing luxury bridal beauty studio managing 5 artists, 3 revenue streams, seasonal demand swings, and a booking pipeline — all tracked in scattered spreadsheets and DMs with no unified view.' },
            { label: 'Approach', text: 'DDL\'s dimensional engine: every booking becomes a fact row with client, artist, service, venue, period, and revenue stream dimensions — revealing utilization gaps, pipeline conversion rates, and capacity ceilings.' },
            { label: 'Deliverable', text: 'Multi-tab operations dashboard — overview KPIs, booking register, artist roster with utilization gauges, studio occupancy calendar, pipeline funnel with conversion rates, and full star schema documentation.' },
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
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Overview</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Key Performance Indicators</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1, background: 'rgba(200,185,165,0.06)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ background: 'rgba(15,26,46,0.8)', padding: '24px 20px', textAlign: 'center' as const }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 10 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 300, color: kpi.accent || '#F5F1EB', lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.7rem', color: '#9CAF96', marginTop: 8 }}>{kpi.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* REVENUE + SEASONAL */}
      <FadeIn delay={400}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Revenue Mix</div>
            <BarChart rows={REVENUE_MIX} />
          </div>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Seasonal Pattern</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {SEASONAL_MONTHS.map((m) => (
                <div key={m.m} style={{ flex: 1, height: 32, borderRadius: 2, background: SEASON_COLORS[m.type].bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: SEASON_COLORS[m.type].text }}>{m.m}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              {[{ label: 'Peak', c: 'rgba(184,144,122,0.4)' }, { label: 'Shoulder', c: 'rgba(201,169,110,0.3)' }, { label: 'Off-Peak', c: 'rgba(200,185,165,0.1)' }].map((l) => (
                <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.35)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: l.c, display: 'inline-block' }} /> {l.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* TOP SERVICES + UPCOMING */}
      <FadeIn delay={500}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Top Service Packages</div>
            <BarChart rows={TOP_SERVICES} />
          </div>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Upcoming Bookings</div>
            {UPCOMING.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < UPCOMING.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ textAlign: 'center' as const, minWidth: 48 }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 300, color: '#F5F1EB', lineHeight: 1 }}>{item.day}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginTop: 2 }}>{item.month}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: '#F5F1EB' }}>{item.client}</div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.75rem', color: 'rgba(245,241,235,0.5)', marginTop: 2 }}>{item.service}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', marginTop: 4 }}>{item.meta}</div>
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 400, color: '#B8907A', display: 'flex', alignItems: 'center' }}>{item.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ARTIST ROSTER */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Artists</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Artist Roster & Utilization</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {ARTISTS.map((a, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#0F1A2E', flexShrink: 0 }}>{a.initial}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: '#F5F1EB' }}>{a.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.4)', letterSpacing: '0.05em', marginTop: 2 }}>{a.role}</div>
                  <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
                    {[{ l: 'Bookings', v: String(a.bookings) }, { l: 'Utilization', v: `${a.utilization}%` }, { l: 'Rating', v: a.rating }, { l: 'Revenue', v: a.revenue }].map((stat) => (
                      <div key={stat.l}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.05em' }}>{stat.l}</div>
                        <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.65)' }}>{stat.v}</div>
                      </div>
                    ))}
                  </div>
                  {/* utilization bar */}
                  <div style={{ height: 3, background: 'rgba(200,185,165,0.08)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${a.utilization}%`, height: '100%', background: a.utilization >= 80 ? '#9CAF96' : a.utilization >= 60 ? '#C9A96E' : '#C4B5A2', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* PIPELINE + FUNNEL */}
      <FadeIn delay={700}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Pipeline */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Booking Pipeline</div>
            {PIPELINE.map((stage, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < PIPELINE.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 300, color: stage.color, minWidth: 40, textAlign: 'center' as const }}>{stage.count}</div>
                <div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: '#F5F1EB' }}>{stage.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.35)', marginTop: 2 }}>{stage.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Funnel + Lead Sources */}
          <div>
            <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Conversion Funnel</div>
              <BarChart rows={FUNNEL} />
            </div>
            <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Lead Sources</div>
              <BarChart rows={LEAD_SOURCES} />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* SCHEMA */}
      <FadeIn delay={800}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>Schema</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Dimensional Model</h2>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '28px 24px', textAlign: 'center' as const }}>
            {/* Fact table */}
            <div style={{ display: 'inline-block', background: 'rgba(184,144,122,0.12)', border: '1px solid rgba(184,144,122,0.3)', borderRadius: 4, padding: '14px 28px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#B8907A', fontWeight: 500 }}>Fact_Bookings</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.35)', marginTop: 4 }}>booking_id · date_key · client_key · artist_key · service_key · venue_key · stream_key · revenue · deposit · party_size · status</div>
            </div>
            {/* Connector */}
            <div style={{ width: 1, height: 24, background: 'rgba(200,185,165,0.2)', margin: '0 auto' }} />
            {/* Dims */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
              {SCHEMA_DIMS.map((dim) => (
                <span key={dim} style={{ background: 'rgba(200,185,165,0.06)', border: '1px solid rgba(200,185,165,0.12)', borderRadius: 2, padding: '8px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(245,241,235,0.5)' }}>{dim}</span>
              ))}
            </div>

            {/* Engine Family */}
            <div style={{ marginTop: 32, borderTop: '1px solid rgba(245,241,235,0.06)', paddingTop: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 16 }}>Engine Family</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, maxWidth: 500, margin: '0 auto' }}>
                {ENGINE_FAMILY.map((e) => (
                  <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 4, background: e.highlight ? 'rgba(184,144,122,0.06)' : 'transparent' }}>
                    <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: e.highlight ? '#B8907A' : '#F5F1EB', fontWeight: e.highlight ? 600 : 400 }}>{e.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: e.highlight ? '#B8907A' : 'rgba(245,241,235,0.4)' }}>{e.fact}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(245,241,235,0.35)', marginTop: 20 }}>
                The data changes. <span style={{ color: '#B8907A' }}>The engine doesn&rsquo;t care.</span>
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* FOOTER */}
      <FadeIn delay={900}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            Graceful Beauty · Operations Engine v1.0 · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
