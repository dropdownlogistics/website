'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── pillar data ─── */
const pillars = [
  {
    href: '/ddl',
    tag: 'METHOD',
    title: 'DDL',
    subtitle: 'Dropdown Logistics',
    desc: 'The operational methodology. Charter, standards, governance, and the 8-step build sequence that turns chaos into governed systems.',
    accent: '#B23531',
    sections: ['Core Charter', 'Standards Index', 'Governance Model', 'Branding Standards', 'Generator Tools', 'Validator Tools'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="4" y="4" width="24" height="24" rx="3" />
        <line x1="4" y1="12" x2="28" y2="12" />
        <line x1="4" y1="20" x2="28" y2="20" />
        <line x1="14" y1="12" x2="14" y2="28" />
      </svg>
    ),
  },
  {
    href: '/dexos',
    tag: 'OPERATING SYSTEM',
    title: 'DexOS',
    subtitle: 'Behavior-First Schema',
    desc: 'The AI operating layer. MasterSpec, runtime enforcement, relay protocol, and the nine-model contributor matrix.',
    accent: '#97072F',
    sections: ['MasterSpec v3.0', 'Runtime v3.0', 'Relay Protocol', 'Contributor Matrix', 'DexLanguage', 'Governance Engine'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="4" />
        <line x1="16" y1="4" x2="16" y2="12" />
        <line x1="16" y1="20" x2="16" y2="28" />
        <line x1="4" y1="16" x2="12" y2="16" />
        <line x1="20" y1="16" x2="28" y2="16" />
      </svg>
    ),
  },
  {
    href: '/mindframe',
    tag: 'COGNITIVE ARCHITECTURE',
    title: 'MindFrame',
    subtitle: 'Persona & Calibration Engine',
    desc: 'The governance engine. Persona calibration, program execution, and the architecture that makes AI collaboration repeatable.',
    accent: '#B23531',
    sections: ['Calibration System', 'Programs Library', 'Execution Engine', 'Governance & Freeze', 'Architecture', 'Design Conversations'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <path d="M16 4 C10 4 6 9 6 14 C6 18 8 20 10 22 L10 26 L22 26 L22 22 C24 20 26 18 26 14 C26 9 22 4 16 4Z" />
        <line x1="12" y1="26" x2="12" y2="29" />
        <line x1="20" y1="26" x2="20" y2="29" />
        <line x1="11" y1="16" x2="21" y2="16" />
        <line x1="13" y1="19" x2="19" y2="19" />
      </svg>
    ),
  },
];

const stats = [
  { value: '44', label: 'Systems' },
  { value: '65', label: 'Standards' },
  { value: '26', label: 'Months' },
  { value: '9', label: 'AI Models' },
];

/* ─── intersection observer hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const pillarsReveal = useReveal(0.1);
  const statsReveal = useReveal(0.2);
  const ctaReveal = useReveal(0.2);

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1200, margin: '0 auto' }}>

      {/* ─── HERO ─── */}
      <section style={{
        textAlign: 'center',
        marginBottom: 80,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.3)',
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B23531' }} />
          ONE-PERSON OPS STUDIO
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#F5F1EB',
          margin: '0 0 20px',
        }}>
          Dropdown<br />Logistics
        </h1>

        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'rgba(245,241,235,0.55)',
          maxWidth: 560,
          margin: '0 auto 12px',
          lineHeight: 1.6,
        }}>
          Chaos → Structured → Automated
        </p>

        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: 'rgba(245,241,235,0.35)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Clean surface. Deep structure. Every system governed,<br />every decision traceable, every output beautiful.
        </p>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section
        ref={pillarsReveal.ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
          marginBottom: 80,
        }}
      >
        {pillars.map((p, i) => (
          <Link key={p.href} href={p.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              position: 'relative',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'linear-gradient(165deg, rgba(15,26,46,0.8) 0%, rgba(7,16,28,0.95) 100%)',
              padding: '32px 28px 28px',
              minHeight: 360,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: pillarsReveal.visible ? 1 : 0,
              transform: pillarsReveal.visible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`,
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${p.accent}44`;
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 28,
                right: 28,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${p.accent}66, transparent)`,
              }} />

              {/* Tag + Icon row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: p.accent,
                  textTransform: 'uppercase',
                  opacity: 0.85,
                }}>
                  {p.tag}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>{p.icon}</span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#F5F1EB',
                margin: '0 0 4px',
                lineHeight: 1.1,
              }}>
                {p.title}
              </h2>

              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'rgba(245,241,235,0.4)',
                margin: '0 0 16px',
              }}>
                {p.subtitle}
              </p>

              {/* Description */}
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 15,
                lineHeight: 1.6,
                color: 'rgba(245,241,235,0.5)',
                margin: '0 0 24px',
                flex: 1,
              }}>
                {p.desc}
              </p>

              {/* Section tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.sections.map((s) => (
                  <span key={s} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    padding: '3px 10px',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(245,241,235,0.35)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div style={{
                position: 'absolute',
                bottom: 28,
                right: 28,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                color: 'rgba(255,255,255,0.12)',
                transition: 'color 0.3s, transform 0.3s',
              }}>
                →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ─── STATS BAR ─── */}
      <section
        ref={statsReveal.ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 80,
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        {stats.map((s, i) => (
          <div key={s.label} style={{
            textAlign: 'center',
            padding: '28px 16px',
            background: 'rgba(15,26,46,0.5)',
            opacity: statsReveal.visible ? 1 : 0,
            transform: statsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`,
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: '#F5F1EB',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.08em',
              color: 'rgba(245,241,235,0.35)',
              textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ─── METHODOLOGY STRIP ─── */}
      <section
        ref={ctaReveal.ref}
        style={{
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(165deg, rgba(15,26,46,0.6) 0%, rgba(7,16,28,0.9) 100%)',
          padding: '40px 36px',
          marginBottom: 60,
          opacity: ctaReveal.visible ? 1 : 0,
          transform: ctaReveal.visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.12em',
          color: '#B23531',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          THE BUILD SEQUENCE
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0,
          alignItems: 'center',
        }}>
          {['Gather', 'Sort', 'Structure', 'Encode', 'Govern', 'Automate', 'Beautify', 'Preserve'].map((step, i) => (
            <span key={step} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: `rgba(245,241,235,${0.3 + (i * 0.08)})`,
                padding: '4px 0',
              }}>
                {step}
              </span>
              {i < 7 && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: 'rgba(178,53,49,0.5)',
                  padding: '0 10px',
                }}>
                  →
                </span>
              )}
            </span>
          ))}
        </div>

        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 14,
          color: 'rgba(245,241,235,0.35)',
          marginTop: 20,
          lineHeight: 1.6,
          maxWidth: 600,
        }}>
          If something is important enough to track — model it, govern it, automate it, and make it look good.
        </p>
      </section>

      {/* ─── EXPLORE MORE ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { href: '/registry', label: 'Registry', desc: 'All 44 systems' },
          { href: '/graph', label: 'Graph', desc: 'Knowledge graph' },
          { href: '/forewords', label: 'Forewords', desc: '9-model synthesis' },
          { href: '/council', label: 'Council', desc: 'AI methodology' },
          { href: '/methodology', label: 'Methodology', desc: 'How it works' },
          { href: '/about', label: 'About', desc: 'The builder' },
        ].map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(15,26,46,0.3)',
              padding: '16px 18px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(15,26,46,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(15,26,46,0.3)';
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: '#F5F1EB',
                marginBottom: 4,
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'rgba(245,241,235,0.3)',
              }}>
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
