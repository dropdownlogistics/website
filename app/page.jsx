'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A',
  navyDeep: '#070F1C',
  card: '#10202f',
  cream: '#F5F1EB',
  creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)',
  border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531',
  amber: '#C49A3C',
  violet: '#8a6cc9',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const inc = end / steps;
    let cur = 0;
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= end) { setCount(end); clearInterval(iv); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(iv);
  }, [started, end, duration]);
  return <>{count}{suffix}</>;
}

function InfoCard({ color, label, description, items }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: '28px 24px',
    }}>
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: color, marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: font.body, fontSize: 15, color: C.creamMid,
        lineHeight: 1.7, marginBottom: 16,
      }}>
        {description}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            fontFamily: font.mono, fontSize: 11, color: C.creamDim,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: color, fontSize: 14 }}>›</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FrontDoor() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${C.navyDeep} 0%, ${C.navy} 40%, ${C.navy} 100%)`,
      color: C.cream,
      fontFamily: font.body,
    }}>
      {/* Grain */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section style={{
          maxWidth: 720, margin: '0 auto', padding: '80px 24px 48px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s ease',
        }}>
          <Link href="/about" style={{ display: 'inline-block', marginBottom: 24 }}>
            <img
              src="/images/operator-headshot.jpg"
              alt="Dave Kitchens"
              style={{
                width: 80, height: 80, borderRadius: '50%',
                border: `2px solid ${C.amber}40`,
                objectFit: 'cover',
              }}
            />
          </Link>

          <div style={{
            fontFamily: font.display, fontSize: 15, fontWeight: 500,
            color: C.creamDim, marginBottom: 24,
          }}>
            <Link href="/about" style={{ color: C.creamMid, textDecoration: 'none' }}>
              Dave Kitchens
            </Link>
            <span style={{ margin: '0 8px', color: C.creamGhost }}>·</span>
            CPA · Builder · One-Person Studio
          </div>

          <div style={{
            fontFamily: font.body, fontSize: 21, fontStyle: 'italic',
            color: C.creamHigh, lineHeight: 1.6, maxWidth: 540,
            margin: '0 auto 32px',
          }}>
            "You build cathedrals and then whisper<br />
            'cottage humble' on the door."
          </div>

          <div style={{
            width: 40, height: 1, background: C.crimson + '40',
            margin: '0 auto 32px',
          }} />

          <div style={{
            fontFamily: font.body, fontSize: 17, color: C.creamMid,
            lineHeight: 1.8, maxWidth: 560, margin: '0 auto',
          }}>
            Dropdown Logistics is a one-person studio that builds tools, 
            analytics engines, and governance systems — using AI as a 
            collaborator, not a replacement.
          </div>
          <div style={{
            fontFamily: font.body, fontSize: 17, color: C.creamMid,
            lineHeight: 1.8, maxWidth: 560, margin: '16px auto 0',
          }}>
            Everything here was built by one person with a methodology: 
            take something messy, find the structure inside it, and make 
            it repeatable.
          </div>
        </section>

        {/* ─── ENTER SITE CTA ─── */}
        <section style={{
          maxWidth: 720, margin: '0 auto', padding: '8px 24px 48px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.8s ease 0.15s',
        }}>
          <Link href="/ddl" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: font.display, fontSize: 16, fontWeight: 600,
            color: C.cream, textDecoration: 'none',
            padding: '14px 36px',
            background: C.crimson,
            borderRadius: 8,
            transition: 'all 0.2s',
            boxShadow: `0 4px 20px ${C.crimson}30`,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#9a2d2a'; e.currentTarget.style.boxShadow = `0 6px 28px ${C.crimson}50`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.crimson; e.currentTarget.style.boxShadow = `0 4px 20px ${C.crimson}30`; }}
          >
            Enter the Site →
          </Link>
        </section>

        {/* ─── WHAT'S INSIDE ─── */}
        <section style={{
          maxWidth: 1000, margin: '0 auto', padding: '20px 24px 48px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s ease 0.25s',
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: C.creamDim,
            textAlign: 'center', marginBottom: 28,
          }}>
            What you'll find inside
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}>
            <InfoCard
              color={C.crimson}
              label="Tools & Systems"
              description="Live dashboards, analytics engines, and applied tools built through the DDL methodology."
              items={[
                'BlindSpot — Trading & campaign analytics',
                'Behavioral Intelligence — AI-driven profiles',
                'MindFrame — AI calibration system',
                'Projects — Client & partner work',
                'Recaps — Year-end data stories',
              ]}
            />
            <InfoCard
              color={C.amber}
              label="How It's Built"
              description="The standards, protocols, and AI council that govern everything. The operating system behind the tools."
              items={[
                'AI Council — 9 models, independent review',
                '65 standards across 44 systems',
                'Prompt Strategy System',
                'Excelligence — Knowledge graph',
                'Content Type Registry — 20 document types',
              ]}
            />
            <InfoCard
              color={C.violet}
              label="The Story"
              description="How a CPA with a spreadsheet habit and 8 years of sobriety ended up building an AI governance studio."
              items={[
                'Little to Know Experience — Addiction memoir',
                'DexLore — Timeline of the build',
                'Foreword Convergence — 9 AIs, 1 experiment',
                'Character dossiers — D&D campaign analytics',
                'Operator profile — The full picture',
              ]}
            />
          </div>
        </section>

        {/* ─── BY THE NUMBERS ─── */}
        <section style={{
          maxWidth: 900, margin: '0 auto', padding: '20px 24px 40px',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.8s ease 0.4s',
        }}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: '28px 24px',
          }}>
            <div style={{
              fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.creamDim,
              textAlign: 'center', marginBottom: 20,
            }}>
              By the numbers
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 16,
            }}>
              {[
                { value: 155, suffix: '+', label: 'Pages' },
                { value: 44, suffix: '', label: 'Systems' },
                { value: 65, suffix: '', label: 'Standards' },
                { value: 9, suffix: '', label: 'AI Models' },
                { value: 1, suffix: '', label: 'Person' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: font.display, fontSize: 26, fontWeight: 700,
                    color: C.cream, lineHeight: 1,
                  }}>
                    {mounted ? <Counter end={stat.value} suffix={stat.suffix} /> : '0'}
                  </div>
                  <div style={{
                    fontFamily: font.mono, fontSize: 10, color: C.creamDim,
                    marginTop: 6, letterSpacing: '0.05em',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: font.body, fontSize: 14, fontStyle: 'italic',
              color: C.creamDim, textAlign: 'center', marginTop: 20,
            }}>
              Built by one person. Governed by nine AI models. Running locally and in the cloud.
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          maxWidth: 900, margin: '0 auto', padding: '32px 24px',
          borderTop: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{
            fontFamily: font.mono, fontSize: 10,
            color: 'rgba(245,241,235,0.2)',
          }}>
            © {new Date().getFullYear()} Dropdown Logistics
          </span>
          <span style={{
            fontFamily: font.body, fontSize: 12, fontStyle: 'italic',
            color: 'rgba(245,241,235,0.12)',
          }}>
            Humble surface. Something underneath.
          </span>
        </footer>
      </div>
    </div>
  );
}
