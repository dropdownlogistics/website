'use client';

import { useEffect, useState, CSSProperties } from 'react';
import Link from 'next/link';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(18px)', transition: 'opacity 0.5s ease, transform 0.5s ease', ...style }}>{children}</div>;
}

interface Project {
  slug: string;
  title: string;
  type: 'Business-in-a-Box' | 'Analytics Engine' | 'Governance Architecture';
  desc: string;
  accent: string;
}

const PROJECTS: Project[] = [
  { slug: 'nomadic-notary', title: 'Nomadic Notary', type: 'Business-in-a-Box', desc: 'Mobile notary service — brand identity, service grid, pricing tiers, and go-to-market roadmap.', accent: '#1B4D3E' },
  { slug: 'sprinkles', title: 'Sprinkles & Co', type: 'Business-in-a-Box', desc: 'Custom cookie company — full brand system, product catalog, pricing engine, and launch plan.', accent: '#C17349' },
  { slug: 'vetschedule', title: 'VetSchedule', type: 'Business-in-a-Box', desc: 'Veterinary scheduling analytics — provider utilization, no-show patterns, and revenue visibility.', accent: '#1B4D3E' },
  { slug: 'drinks-o-system', title: 'Drinks-O-System', type: 'Analytics Engine', desc: 'Cocktail program intelligence — 127 recipes, spirit distribution, margin ranking, and creative gap analysis.', accent: '#C9A84C' },
  { slug: 'graceful-beauty', title: 'Graceful Beauty', type: 'Analytics Engine', desc: 'Bridal beauty operations — booking pipeline, artist utilization, revenue mix, and conversion funnel.', accent: '#B8907A' },
  { slug: 'getsum', title: 'GetSum', type: 'Analytics Engine', desc: 'Deterministic capital analysis — variance classification, drift detection, and capital efficiency signals.', accent: '#00C853' },
  { slug: 'grant-tracker', title: 'GrantTracker', type: 'Analytics Engine', desc: 'Nonprofit grant compliance — fund balances, burn rates, compliance calendar, and cost-per-procedure.', accent: '#2D6A4F' },
  { slug: 'heartbeat', title: 'HeartBeat', type: 'Analytics Engine', desc: 'Organizational growth intelligence — mood pulse, team heatmap, burnout radar, and nudge effectiveness.', accent: '#FF6B8A' },
  { slug: 'payguard', title: 'PayGuard', type: 'Analytics Engine', desc: 'Benefits & payroll compliance — exception detection, vendor aging, deduction reconciliation.', accent: '#6C3B7C' },
  { slug: 'integrityos', title: 'IntegrityOS', type: 'Governance Architecture', desc: 'Healthcare payment governance — decision memory capture, override detection, and audit-ready lineage.', accent: '#9B1B3C' },
];

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  'Business-in-a-Box': { color: '#C17349', bg: 'rgba(193,115,73,0.12)' },
  'Analytics Engine': { color: '#2BB5A4', bg: 'rgba(43,181,164,0.12)' },
  'Governance Architecture': { color: '#B388FF', bg: 'rgba(179,136,255,0.12)' },
};

export default function ProjectsHub() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ padding: '100px 24px 48px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B23531',
            marginBottom: 12,
          }}>DDL Portfolio</div>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#F5F1EB',
            lineHeight: 1.15,
            marginBottom: 12,
          }}>Projects</h1>
          <p style={{
            fontFamily: 'Source Serif 4, serif',
            fontSize: '1.1rem',
            color: 'rgba(245,241,235,0.5)',
            lineHeight: 1.6,
            maxWidth: 600,
          }}>
            10 systems built across 10 domains. Same dimensional architecture. Same governance-grade methodology.
            Different data. The engine doesn&rsquo;t care.
          </p>
        </div>
      </FadeIn>

      {/* Type legend */}
      <FadeIn delay={100}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
          {Object.entries(TYPE_COLORS).map(([type, { color, bg }]) => (
            <span key={type} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 10,
              background: bg,
              color: color,
              letterSpacing: '0.02em',
            }}>{type}</span>
          ))}
        </div>
      </FadeIn>

      {/* Project grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {PROJECTS.map((p, i) => {
          const tc = TYPE_COLORS[p.type];
          const isHovered = hovered === p.slug;
          return (
            <FadeIn key={p.slug} delay={150 + i * 60}>
              <Link
                href={`/projects/${p.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
                onMouseEnter={() => setHovered(p.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: isHovered ? 'rgba(245,241,235,0.06)' : 'rgba(245,241,235,0.03)',
                  border: `1px solid ${isHovered ? `${p.accent}44` : 'rgba(245,241,235,0.06)'}`,
                  borderLeft: `3px solid ${p.accent}`,
                  borderRadius: 8,
                  padding: '22px 20px',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  cursor: 'pointer',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <h2 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#F5F1EB',
                        lineHeight: 1.2,
                      }}>{p.title}</h2>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.5rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 8,
                        background: tc.bg,
                        color: tc.color,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        marginLeft: 12,
                      }}>{p.type}</span>
                    </div>
                    <p style={{
                      fontFamily: 'Source Serif 4, serif',
                      fontSize: '0.85rem',
                      color: 'rgba(245,241,235,0.5)',
                      lineHeight: 1.55,
                    }}>{p.desc}</p>
                  </div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: isHovered ? p.accent : 'rgba(245,241,235,0.2)',
                    marginTop: 12,
                    transition: 'color 0.2s',
                    letterSpacing: '0.04em',
                  }}>View Case Study →</div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={900}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.06)', marginTop: 48, paddingTop: 24, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(245,241,235,0.2)',
            letterSpacing: '0.08em',
          }}>
            10 projects · 4,148 lines · Same engine, different data · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
