'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', navyDeep: '#070F1C', card: '#10202f',
  cream: '#F5F1EB', creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)', border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531', amber: '#C49A3C', violet: '#8a6cc9',
  green: '#4A9E6B', blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function WingCard({ color, name, tagline, desc, href, items }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: hovered ? color + '08' : C.card,
        border: `1px solid ${hovered ? color + '30' : C.border}`,
        borderRadius: 8, padding: '24px 20px',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: color, marginBottom: 8,
      }}>{name}</div>
      <div style={{
        fontFamily: font.display, fontSize: 18, fontWeight: 600,
        color: C.cream, marginBottom: 8,
      }}>{tagline}</div>
      <div style={{
        fontFamily: font.body, fontSize: 14, color: C.creamDim,
        lineHeight: 1.6, marginBottom: 14,
      }}>{desc}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            padding: '3px 8px', background: C.creamGhost, borderRadius: 3,
          }}>{item}</span>
        ))}
      </div>
    </Link>
  );
}

function QuickLink({ href, label, color }) {
  return (
    <Link href={href} style={{
      fontFamily: font.mono, fontSize: 11, color: C.creamDim,
      textDecoration: 'none', padding: '8px 14px',
      border: `1px solid ${C.border}`, borderRadius: 6,
      transition: 'all 0.15s', display: 'inline-flex',
      alignItems: 'center', gap: 6,
    }}
      onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = (color || C.crimson) + '40'; }}
      onMouseLeave={e => { e.currentTarget.style.color = C.creamDim; e.currentTarget.style.borderColor = C.border; }}
    >{label}</Link>
  );
}

export default function DDLLanding() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto', padding: '60px 24px 100px',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: 'all 0.6s ease',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.crimson, marginBottom: 12,
        }}>
          Dropdown Logistics
        </div>
        <div style={{
          fontFamily: font.display, fontSize: 36, fontWeight: 700,
          color: C.cream, marginBottom: 16, letterSpacing: '-0.5px',
          lineHeight: 1.2,
        }}>
          Chaos &rarr; Structured &rarr; Automated
        </div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 620,
        }}>
          DDL is a one-person operations studio that turns messy problems
          into governed systems. The methodology started in Excel spreadsheets
          during internal audits. It grew into a full architecture: dimensional
          modeling, star schemas, governance standards, and a nine-model AI
          council that reviews everything.
        </div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 620, marginTop: 16,
        }}>
          The domain changes. The architecture doesn't. A trading dashboard
          uses the same fact table structure as a D&D campaign tracker. A
          memoir uses the same governance standards as an analytics engine.
          If it generates data, DDL builds the system.
        </div>
      </div>

      {/* The Loop */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 48, flexWrap: 'wrap',
        borderRadius: 8, overflow: 'hidden',
      }}>
        {[
          { phase: 'Chaos', color: C.crimson,
            desc: 'Collect everything. Files, exports, ideas, conversations. No judgment. Just capture.' },
          { phase: 'Structured', color: C.amber,
            desc: 'Find the grain. Define the facts, dimensions, and measures. Build the star schema.' },
          { phase: 'Automated', color: C.green,
            desc: 'Make it repeatable. Systems run themselves. The corpus grows while you sleep.' },
        ].map((p, i) => (
          <div key={i} style={{
            flex: '1 1 220px', padding: '24px 20px',
            background: C.card, borderTop: `3px solid ${p.color}`,
            borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
          }}>
            <div style={{
              fontFamily: font.display, fontSize: 18, fontWeight: 600,
              color: p.color, marginBottom: 8,
            }}>{p.phase}</div>
            <div style={{
              fontFamily: font.body, fontSize: 14, color: C.creamDim,
              lineHeight: 1.6,
            }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Five Wings */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>Five Wings</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 24, maxWidth: 560,
        }}>
          Everything on the site belongs to a wing. Each wing has its own
          color, its own scope, and its own audience. Together they form
          the full picture.
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}>
          <WingCard color={C.crimson} name="DDL" tagline="The Governance Engine"
            desc="Standards, systems, council, methodology. The operating system behind everything."
            href="/ddl/reference"
            items={['65 Standards', '44 Systems', '9 Council Models', 'PSS', 'MindFrame']} />
          <WingCard color={C.amber} name="D&A" tagline="The Intelligence Surface"
            desc="Analytics engines for domains nobody thinks to measure."
            href="/blindspot"
            items={['BlindSpot', 'Trading', 'Campaign', 'Grammarly', 'Recaps']} />
          <WingCard color={C.violet} name="DexVerse" tagline="The Archaeological Record"
            desc="The origin stories, companions, and mythology that became a changelog."
            href="/dexlore"
            items={['DexLore', 'Continuum', '15 Companions', 'Glossary']} />
          <WingCard color={C.green} name="Dossiers" tagline="The Character Archive"
            desc="Governed character profiles across D&D 5e, Divinity OS2, and Skyrim."
            href="/dossiers"
            items={['14 Dossiers', '3 Games', 'Party Registries', 'Campaign Analytics']} />
          <WingCard color={C.blue} name="Products" tagline="Behavioral Intelligence"
            desc="AI-native behavioral analytics. The conversation is the measurement instrument."
            href="/products/behavioral-intelligence"
            items={['Concept Suite', 'MindFrame Session', 'Live Demo']} />
        </div>
      </div>

      {/* What's Under the Hood */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>What's Under the Hood</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 24, maxWidth: 560,
        }}>
          The site isn't just content. It's a governed system with its own
          AI infrastructure, local models, and search engine.
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 10,
        }}>
          {[
            { label: 'AI Council', desc: '9 cloud models + 1 local model review every major artifact', href: '/council' },
            { label: 'Local AI', desc: 'RTX 3070 running 8 models via Ollama. 140K searchable chunks.', href: '/council/1010' },
            { label: 'MindFrame', desc: 'Live AI calibration sessions. Behavioral profiling through conversation.', href: '/mindframe/session' },
            { label: 'Site Search', desc: 'Cmd+K search across every route. Deep search via local RAG.', href: '#' },
            { label: 'The Manifest', desc: 'llms.txt governs how every AI model collaborates on this site.', href: '/llms.txt' },
            { label: 'The BackEnd', desc: 'The full governance architecture, visualized for humans.', href: '/backend' },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{
              display: 'block', textDecoration: 'none',
              padding: '16px 14px', background: C.card,
              border: `1px solid ${C.border}`, borderRadius: 6,
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.crimson + '30'}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{
                fontFamily: font.display, fontSize: 14, fontWeight: 600,
                color: C.cream, marginBottom: 4,
              }}>{item.label}</div>
              <div style={{
                fontFamily: font.body, fontSize: 13, color: C.creamDim,
                lineHeight: 1.5,
              }}>{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div style={{
        paddingTop: 32, borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.creamDim, marginBottom: 16,
        }}>
          Quick links
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <QuickLink href="/ddl/reference" label="DDL Reference" color={C.crimson} />
          <QuickLink href="/council" label="Council Hub" color={C.amber} />
          <QuickLink href="/council/profiles" label="Council Profiles" color={C.amber} />
          <QuickLink href="/memoir" label="Memoir" color={C.violet} />
          <QuickLink href="/forewords" label="Forewords" color={C.violet} />
          <QuickLink href="/about" label="Operator Profile" color={C.crimson} />
          <QuickLink href="/projects" label="Projects" color={C.crimson} />
          <QuickLink href="/social" label="Social" color={C.blue} />
        </div>
      </div>
    </div>
  );
}
