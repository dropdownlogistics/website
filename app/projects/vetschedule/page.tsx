'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const FOREST = '#1B4D3E'; const SAGE = '#5B8C7E'; const TERRA = '#C17349'; const GOLD = '#D4A853'; const MINT = '#A8D5C8';

interface StatItem { value: string; label: string; }
interface FeatureCard { icon: string; title: string; desc: string; bg: string; }
interface StepItem { num: string; title: string; desc: string; }
interface ProviderRow { name: string; appts: number; util: string; status: string; statusColor: string; }

const STATS: StatItem[] = [
  { value: '87%', label: 'Avg Completion Rate' },
  { value: '12 min', label: 'Avg Wait Time' },
  { value: '4.3★', label: 'Client Satisfaction' },
  { value: '6%', label: 'No-Show Rate' },
];

const FEATURES: FeatureCard[] = [
  { icon: '📊', title: 'Provider Utilization', desc: 'See who\'s overbooked, who has gaps, and where your schedule is bleeding revenue — by day, week, or month.', bg: 'rgba(91,140,126,0.12)' },
  { icon: '🐕', title: 'Species & Service Mix', desc: 'Understand your patient population. Track appointment types across species to optimize staffing and inventory.', bg: 'rgba(193,115,73,0.12)' },
  { icon: '⏱️', title: 'Wait Time Analytics', desc: 'Measure the gap between check-in and provider contact. Find bottlenecks before your clients find review sites.', bg: 'rgba(212,168,83,0.12)' },
  { icon: '📉', title: 'No-Show Patterns', desc: 'Identify which days, providers, and appointment types have the highest no-show rates — then fix the pattern.', bg: 'rgba(91,140,126,0.12)' },
  { icon: '💰', title: 'Revenue Visibility', desc: 'Track revenue by provider, service category, and time period. See what\'s driving income and what\'s costing it.', bg: 'rgba(193,115,73,0.12)' },
  { icon: '⭐', title: 'Satisfaction Tracking', desc: 'Connect client satisfaction scores to specific providers, wait times, and appointment types. Data-driven care.', bg: 'rgba(212,168,83,0.12)' },
];

const STEPS: StepItem[] = [
  { num: '01', title: 'Export Your Data', desc: 'Pull a report from your practice management system. CSV, spreadsheet — any format works.' },
  { num: '02', title: 'Load the Engine', desc: 'Drop your data into the fact table. Named ranges and formulas handle the rest automatically.' },
  { num: '03', title: 'See Everything', desc: 'Heatmaps, utilization, revenue, no-shows — sliced however you need, updated instantly.' },
];

const PROVIDERS: ProviderRow[] = [
  { name: 'Dr. A', appts: 7, util: '88%', status: 'On Track', statusColor: '#4CAF50' },
  { name: 'Dr. B', appts: 5, util: '63%', status: 'Gaps', statusColor: '#FFA726' },
  { name: 'Dr. C', appts: 8, util: '100%', status: 'Full', statusColor: '#4CAF50' },
  { name: 'Dr. D', appts: 3, util: '38%', status: 'Under', statusColor: '#FF6B6B' },
  { name: 'Dr. E', appts: 6, util: '75%', status: 'On Track', statusColor: '#4CAF50' },
];

export default function VetSchedulePage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      {/* HERO */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Business-in-a-Box</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Vet<span style={{ color: TERRA }}>Schedule</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Clarity for the clinics that care — giving veterinary practices instant visibility into appointments,
            provider utilization, no-shows, and revenue from data they already have.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'Veterinary clinics track schedules in binders, memory, and disconnected practice management exports. No one can see provider utilization, no-show patterns, or revenue per service category without hours of manual reconciliation.' },
            { label: 'Approach', text: 'DDL\'s scheduling engine: every appointment is a fact row with provider, patient/species, service, time period, and outcome dimensions. Excel-native — no software purchase, no IT ticket, no eighteen-month implementation.' },
            { label: 'Deliverable', text: 'Full product landing page and analytics engine — stats bar, 6-feature grid, 3-step onboarding flow, live provider utilization mockup, testimonial, and CTA. A complete business-in-a-box ready for market.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* STATS BAR */}
      <FadeIn delay={300}>
        <div style={{ background: `linear-gradient(135deg, ${FOREST} 0%, ${SAGE} 100%)`, borderRadius: 10, padding: '32px 24px', marginBottom: 56, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' as const, gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: MINT, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* FEATURES */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: TERRA, marginBottom: 8 }}>What You Get</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 24 }}>Everything your spreadsheet wishes it could be</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, padding: '24px 20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* HOW IT WORKS */}
      <FadeIn delay={500}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: TERRA, marginBottom: 8 }}>How It Works</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 8 }}>Three steps. No software to install.</h2>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.45)', marginBottom: 28 }}>It runs in Excel. Because your team already knows Excel.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' as const }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', color: 'rgba(27,77,62,0.15)', fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* PROVIDER UTILIZATION MOCKUP */}
      <FadeIn delay={600}>
        <div style={{ background: FOREST, borderRadius: 12, padding: '28px 24px', marginBottom: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', color: '#F5F1EB', fontWeight: 700, marginBottom: 12 }}>Your clinic at a glance</h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: MINT, lineHeight: 1.7 }}>
              Every appointment, every provider, every outcome — visible in one view.
              No more digging through binders or guessing at patterns. The engine shows you what&rsquo;s actually happening.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: 12, padding: '6px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: MINT, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              <span style={{ flex: 1 }}>Provider</span><span style={{ width: 45 }}>Appts</span><span style={{ width: 50 }}>Util %</span><span style={{ width: 70 }}>Status</span>
            </div>
            {PROVIDERS.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 10px', borderRadius: 6, fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', alignItems: 'center' }}>
                <span style={{ flex: 1, color: '#fff', fontWeight: 500, fontFamily: 'Source Serif 4, serif' }}>{p.name}</span>
                <span style={{ width: 45, fontFamily: 'JetBrains Mono, monospace' }}>{p.appts}</span>
                <span style={{ width: 50, fontFamily: 'JetBrains Mono, monospace' }}>{p.util}</span>
                <span style={{ width: 70, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.statusColor, display: 'inline-block' }} />{p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* TESTIMONIAL */}
      <FadeIn delay={700}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56, padding: '0 20px' }}>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.2rem', color: 'rgba(245,241,235,0.55)', fontStyle: 'italic' as const, lineHeight: 1.5, maxWidth: 600, margin: '0 auto 16px' }}>
            &ldquo;We were tracking everything in binders and memory. Now we can actually see where the gaps are — and our no-show rate dropped 40% in two months.&rdquo;
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(245,241,235,0.3)' }}>— Practice Manager, Multi-Provider Veterinary Clinic</p>
        </div>
      </FadeIn>

      <FadeIn delay={800}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            VetSchedule Engine · Clarity for Clinics That Care · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
