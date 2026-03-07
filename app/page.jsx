'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════

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
  green: '#4A9E6B',
  blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════
// Animated Counter
// ═══════════════════════════════════════════════════════

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return <>{count}{suffix}</>;
}

// ═══════════════════════════════════════════════════════
// Door Card
// ═══════════════════════════════════════════════════════

function DoorCard({ color, label, title, description, href, items }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: hovered ? `${color}12` : C.card,
        border: `1px solid ${hovered ? color + '40' : C.border}`,
        borderRadius: 8,
        padding: '32px 28px',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 32px ${color}15` : 'none',
      }}
    >
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: color, marginBottom: 12,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: font.display, fontSize: 22, fontWeight: 600,
        color: C.cream, marginBottom: 12, lineHeight: 1.3,
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: font.body, fontSize: 15, color: C.creamMid,
        lineHeight: 1.7, marginBottom: 20,
      }}>
        {description}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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
      <div style={{
        marginTop: 20, fontFamily: font.mono, fontSize: 11,
        color: color, letterSpacing: '0.05em',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        Enter {title.split(' ')[0]} →
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════

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
      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section style={{
          maxWidth: 900, margin: '0 auto', padding: '80px 24px 60px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s ease',
        }}>
          {/* Headshot */}
          <Link href="/about" style={{ display: 'inline-block', marginBottom: 28 }}>
            <img
              src="/images/operator-headshot.jpg"
              alt="Dave Kitchens"
              style={{
                width: 88, height: 88, borderRadius: '50%',
                border: `2px solid ${C.amber}40`,
                objectFit: 'cover',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.amber}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.amber + '40'}
            />
          </Link>

          {/* The Quote */}
          <div style={{
            fontFamily: font.body, fontSize: 20, fontStyle: 'italic',
            color: C.creamHigh, lineHeight: 1.6, maxWidth: 600,
            margin: '0 auto 32px',
          }}>
            "You build cathedrals and then whisper<br />
            'cottage humble' on the door."
          </div>

          {/* Name + Title */}
          <div style={{
            fontFamily: font.display, fontSize: 13, fontWeight: 500,
            color: C.creamDim, letterSpacing: '0.08em', marginBottom: 40,
          }}>
            <Link href="/about" style={{ color: C.creamMid, textDecoration: 'none' }}>
              Dave Kitchens
            </Link>
            <span style={{ margin: '0 10px', color: C.creamGhost }}>·</span>
            Dropdown Logistics
          </div>

          {/* Divider */}
          <div style={{
            width: 40, height: 1, background: C.crimson + '40',
            margin: '0 auto 40px',
          }} />

          {/* Tagline */}
          <div style={{
            fontFamily: font.display, fontSize: 38, fontWeight: 700,
            color: C.cream, lineHeight: 1.2, marginBottom: 16,
            letterSpacing: '-0.5px',
          }}>
            Chaos → Structured → Automated
          </div>
          <div style={{
            fontFamily: font.body, fontSize: 17, color: C.creamMid,
            lineHeight: 1.7, maxWidth: 560, margin: '0 auto',
          }}>
            A systems studio exploring how humans and machines collaborate to produce governed work.
          </div>
        </section>

        {/* ─── THREE DOORS ─── */}
        <section style={{
          maxWidth: 1000, margin: '0 auto', padding: '40px 24px 60px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: C.creamDim,
            textAlign: 'center', marginBottom: 32,
          }}>
            Choose your depth
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}>
            <DoorCard
              color={C.crimson}
              label="Front Door"
              title="Systems"
              description="Interactive tools, analytics engines, and applied systems. See what the architecture actually produces."
              href="/ddl"
              items={[
                'BlindSpot Trading & Campaign Analytics',
                'Commission Intelligence Engine',
                'Behavioral Intelligence Suite',
                'MindFrame Calibration System',
              ]}
            />
            <DoorCard
              color={C.amber}
              label="Back Door"
              title="Governance"
              description="Standards, protocols, and the architecture that makes the systems reliable. How everything is built."
              href="/council"
              items={[
                '9-Model AI Council',
                '65 Standards · 44 Systems',
                'Content Type Registry (SYS-020)',
                'Prompt Strategy System',
              ]}
            />
            <DoorCard
              color={C.violet}
              label="Side Door"
              title="Chronicle"
              description="The narrative history of how the systems evolved. The story behind the structure."
              href="/memoir"
              items={[
                'Little to Know Experience (Memoir)',
                'DexLore · Five-Era Timeline',
                'Foreword Convergence Experiment',
                'Operator Profile & Dossiers',
              ]}
            />
          </div>
        </section>

        {/* ─── THE RECEIPT ─── */}
        <section style={{
          maxWidth: 900, margin: '0 auto', padding: '48px 24px',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.8s ease 0.4s',
        }}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: '32px 28px',
          }}>
            <div style={{
              fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.crimson, marginBottom: 20,
            }}>
              The Receipt
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 20,
            }}>
              {[
                { value: 155, suffix: '+', label: 'Live Routes' },
                { value: 44, suffix: '', label: 'Systems' },
                { value: 65, suffix: '', label: 'Standards' },
                { value: 9, suffix: '', label: 'Council Models' },
                { value: 110, suffix: 'K', label: 'RAG Chunks' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: font.display, fontSize: 28, fontWeight: 700,
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
              color: C.creamDim, textAlign: 'center', marginTop: 24,
            }}>
              Built by one person. Governed by nine models. Running locally and in the cloud.
            </div>
          </div>
        </section>

        {/* ─── EXPLORE ─── */}
        <section style={{
          maxWidth: 900, margin: '0 auto', padding: '20px 24px 40px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.8s ease 0.5s',
        }}>
          <Link href="/ddl" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: font.mono, fontSize: 12, color: C.creamMid,
            textDecoration: 'none', padding: '10px 20px',
            border: `1px solid ${C.border}`, borderRadius: 6,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.crimson + '40'; e.currentTarget.style.color = C.cream; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.creamMid; }}
          >
            Explore the Full Site →
          </Link>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          maxWidth: 900, margin: '0 auto', padding: '40px 24px 32px',
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
            CottageHumble surface. Cathedral underneath.
          </span>
        </footer>
      </div>
    </div>
  );
}
