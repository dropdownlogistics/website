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
    const steps = 60; const inc = end / steps; let cur = 0;
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= end) { setCount(end); clearInterval(iv); } else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(iv);
  }, [started, end, duration]);
  return <>{count}{suffix}</>;
}

// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?
// Door Data
// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?

const doors = [
  {
    color: C.crimson,
    label: 'Tools & Systems',
    description: 'Live dashboards, analytics engines, and applied tools built through the DDL methodology.',
    hub: '/ddl',
    groups: [
      {
        name: 'BlindSpot',
        items: [
          { href: '/blindspot', label: 'Overview' },
          { href: '/blindspot/trading', label: 'Trading Dashboard' },
          { href: '/blindspot/steam', label: 'Steam Library Analytics' },
          { href: '/blindspot/campaign', label: 'D&D Campaign Analytics' },
        ],
      },
      {
        name: 'Analytics',
        items: [
          { href: '/analytics', label: 'Analytics Hub' },
          { href: '/analytics/grammarly', label: 'Grammarly â€” 4.57M Words' },
          { href: '/analytics/tone', label: 'Tone Analysis' },
          { href: '/analytics/memoir', label: 'Memoir Analytics' },
          { href: '/analytics/dexdash', label: 'DexDash' },
        ],
      },
      {
        name: 'Products',
        items: [
          { href: '/products/behavioral-intelligence', label: 'Behavioral Intelligence' },
          { href: '/products/behavioral-intelligence/story', label: 'The Story Behind It' },
          { href: '/products/behavioral-intelligence/exec', label: 'Executive Concept' },
          { href: '/products/behavioral-intelligence/brief', label: 'Product Brief' },
        ],
      },
      {
        name: 'Projects',
        items: [
          { href: '/projects', label: 'All Projects' },
          { href: '/mindframe', label: 'MindFrame' },
          { href: '/prioritease', label: 'PrioritEase' },
          { href: '/work/rexcel', label: 'r/Excel' },
        ],
      },
      {
        name: 'Recaps',
        items: [
          { href: '/recaps', label: 'All Recaps' },
          { href: '/recaps/apple-music', label: 'Apple Music Replay' },
          { href: '/recaps/annual-signal', label: 'Annual Signal Report' },
          { href: '/recaps/predictions', label: 'Prediction Audit' },
        ],
      },
    ],
  },
  {
    color: C.amber,
    label: "How It's Built",
    description: 'The standards, protocols, and AI council that govern everything. The operating system behind the tools.',
    hub: '/council',
    groups: [
      {
        name: 'Council',
        items: [
          { href: '/council', label: 'Council Hub' },
          { href: '/council/profiles', label: 'All Council Profiles' },
          { href: '/council/1010', label: 'Seat 1010 â€” Dex Jr.' },
          { href: '/council/auto-council', label: 'AutoCouncil' },
          { href: '/council/scaling', label: 'Scaling' },
        ],
      },
      {
        name: 'Governance',
        items: [
          { href: '/standards', label: 'Standards Registry' },
          { href: '/systems', label: 'Systems Registry' },
          { href: '/registry', label: 'Full Registry' },
          { href: '/excelligence', label: 'Excelligence â€” Knowledge Graph' },
        ],
      },
      {
        name: 'Framework',
        items: [
          { href: '/methodology', label: 'Methodology' },
          { href: '/dexos', label: 'DexOS' },
          { href: '/framework/pss', label: 'Prompt Strategy System' },
          { href: '/framework/vibe-coding', label: 'Vibe Coding with Governance' },
          { href: '/guides/llm', label: 'LLM Setup Guide' },
        ],
      },
    ],
  },
  {
    color: C.violet,
    label: 'The Story',
    description: 'How a CPA with a spreadsheet habit and 8 years of sobriety ended up building an AI governance studio.',
    hub: '/memoir',
    groups: [
      {
        name: 'Memoir',
        items: [
          { href: '/memoir', label: 'Little to Know Experience' },
          { href: '/memoir/reading-room', label: 'Reading Room' },
          { href: '/memoir/architecture', label: 'How the Memoir Was Built' },
          { href: '/memoir/dashboard', label: 'Memoir Dashboard' },
          { href: '/memoir/braid', label: 'The Braid' },
          { href: '/forewords', label: 'Foreword Convergence' },
        ],
      },
      {
        name: 'DexVerse',
        items: [
          { href: '/dexlore', label: 'DexLore Hub' },
          { href: '/dexlore/continuum', label: 'The Continuum' },
          { href: '/dexlore/council', label: 'Companions' },
          { href: '/other-works', label: 'Other Works' },
          { href: '/knowledge/glossary', label: 'Glossary' },
        ],
      },
      {
        name: 'Dossiers',
        items: [
          { href: '/dossiers', label: 'All Dossiers' },
          { href: '/dossiers/merrick', label: 'Merrick' },
          { href: '/dossiers/feliciano', label: 'Feliciano' },
          { href: '/dossiers/hillie', label: 'Hillie' },
          { href: '/dossiers/ash-snow-steel', label: 'Ash, Snow & Steel' },
        ],
      },
      {
        name: 'About',
        items: [
          { href: '/about', label: 'Operator Profile' },
          { href: '/social', label: 'Social Hub' },
        ],
      },
    ],
  },
];

// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?
// Expandable Door Card
// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?

function DoorCard({ door }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${open ? door.color + '30' : C.border}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Header â€” always visible, clickable */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: 12,
          padding: '28px 24px', background: 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: door.color, marginBottom: 10,
          }}>
            {door.label}
          </div>
          <div style={{
            fontFamily: font.body, fontSize: 15, color: C.creamMid,
            lineHeight: 1.7,
          }}>
            {door.description}
          </div>
        </div>
        <span style={{
          fontFamily: font.mono, fontSize: 18, color: door.color,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
          flexShrink: 0, marginTop: 4,
        }}>+</span>
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{
          padding: '0 24px 24px',
          borderTop: `1px solid ${C.border}`,
          animation: 'doorExpand 0.2s ease',
        }}>
          <style>{`@keyframes doorExpand { from { opacity:0; max-height:0; } to { opacity:1; max-height:2000px; } }`}</style>

          {door.groups.map((group, gi) => (
            <div key={gi} style={{ marginTop: 20 }}>
              <div style={{
                fontFamily: font.mono, fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: door.color,
                marginBottom: 8, opacity: 0.7,
              }}>
                {group.name}
              </div>
              {group.items.map((item, ii) => (
                <Link key={ii} href={item.href} style={{
                  display: 'block', fontFamily: font.display, fontSize: 14,
                  color: C.creamMid, textDecoration: 'none',
                  padding: '7px 0', borderBottom: `1px solid ${C.border}`,
                  transition: 'color 0.12s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = C.cream}
                  onMouseLeave={e => e.currentTarget.style.color = C.creamMid}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          <Link href={door.hub} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: font.mono, fontSize: 11, color: door.color,
            textDecoration: 'none', marginTop: 20,
            letterSpacing: '0.05em',
          }}>
            Enter {door.label.split(' ')[0]} â†’
          </Link>
        </div>
      )}
    </div>
  );
}

// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?
// Main Page
// ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?ï¿½?

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
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* â”€â”€â”€ HERO â”€â”€â”€ */}
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
            <span style={{ margin: '0 8px', color: C.creamGhost }}>Â·</span>
            CPA Â· Builder Â· One-Person Studio
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
            analytics engines, and governance systems â€” using AI as a
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

        {/* â”€â”€â”€ ENTER SITE CTA â”€â”€â”€ */}
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
            Enter the Site â†’
          </Link>
        </section>

        {/* â”€â”€â”€ EXPANDABLE DOORS â”€â”€â”€ */}
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
            Or explore by section
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}>
            {doors.map((door, i) => (
              <DoorCard key={i} door={door} />
            ))}
          </div>
        </section>

        {/* â”€â”€â”€ BY THE NUMBERS â”€â”€â”€ */}
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

      </div>
    </div>
  );
}
