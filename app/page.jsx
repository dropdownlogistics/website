'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  navy:    '#0D1B2A',
  card:    '#10202f',
  cardHi:  '#132435',
  cream:   '#F5F1EB',
  dim:     'rgba(245,241,235,0.55)',
  muted:   'rgba(245,241,235,0.3)',
  ghost:   'rgba(245,241,235,0.06)',
  border:  'rgba(245,241,235,0.06)',
  crimson: '#B23531',
  amber:   '#C49A3C',
  violet:  '#8a6cc9',
  green:   '#4A9E6B',
  steel:   '#4A7C9B',
  teal:    '#2C7A7B',
  copper:  '#C49A3C',
};

const wings = [
  {
    id: 'ddl',
    name: 'DDL',
    color: C.crimson,
    href: '/ddl',
    tagline: 'Governance, methodology, council, memoir.',
    tag: 'Framework',
  },
  {
    id: 'da',
    name: 'D&A',
    color: C.amber,
    href: '/blindspot',
    tagline: 'BlindSpot analytics, dashboards, recaps.',
    tag: 'Analytics',
  },
  {
    id: 'dexverse',
    name: 'DexVerse',
    color: C.violet,
    href: '/dexlore',
    tagline: 'Origin stories, companions, lore, glossary.',
    tag: 'Lore',
  },
  {
    id: 'dossiers',
    name: 'Dossiers',
    color: C.green,
    href: '/dossiers',
    tagline: 'Character archive across three universes.',
    tag: 'Characters',
  },
  {
    id: 'bench',
    name: 'The Bench',
    color: C.steel,
    href: '/bench',
    tagline: 'Software tips. OneNote to PowerShell.',
    tag: 'Tools',
  },
  {
    id: 'canonpress',
    name: 'CanonPress',
    color: C.crimson,
    href: '/canonpress',
    tagline: 'Governed publication. Four series.',
    tag: 'Publication',
  },
  {
    id: 'auditforge',
    name: 'AuditForge',
    color: C.teal,
    href: '/auditforge',
    tagline: 'Governed audit document generation.',
    tag: 'Product',
  },
  {
    id: 'products',
    name: 'Products',
    color: '#6B9DC2',
    href: '/products/behavioral-intelligence',
    tagline: 'Concept products and design mockups.',
    tag: 'Concepts',
  },
];

const stats = [
  { n: '203', label: 'Pages' },
  { n: '8',   label: 'Wings' },
  { n: '44',  label: 'Systems' },
  { n: '65',  label: 'Standards' },
  { n: '10',  label: 'Council Seats' },
  { n: '320K', label: 'RAG Chunks' },
  { n: '1',   label: 'Person' },
];

const surpriseRoutes = [
  '/excelligence',
  '/council',
  '/dexlore',
  '/memoir',
  '/blindspot/trading',
  '/dossiers/feliciano',
  '/dossiers/xuth-jr',
  '/canonpress/groundtruth/gt-001',
  '/methodology',
  '/dexverse/lotr',
  '/bench/excel',
  '/auditforge/current',
  '/forewords',
  '/framework/pss',
  '/mindframe',
  '/knowledge/glossary',
  '/dossiers/fort-joy',
  '/recaps/annual-signal',
];

export default function DDLLanding() {
  const [hovered, setHovered] = useState(null);
  const [surpriseHref, setSurpriseHref] = useState('/excelligence');

  useEffect(() => {
    setSurpriseHref(surpriseRoutes[Math.floor(Math.random() * surpriseRoutes.length)]);
  }, []);

  return (
    <div style={{
      background: C.navy,
      minHeight: '100vh',
      color: C.cream,
      fontFamily: "'Source Serif 4', Georgia, serif",
    }}>

      {/* ── HERO ── */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '96px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Wordmark */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: C.crimson,
          letterSpacing: '0.3em',
          marginBottom: 28,
        }}>
          DROPDOWN LOGISTICS
        </div>

        {/* Primary methodology */}
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          marginBottom: 8,
        }}>
          Chaos
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: C.muted,
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}>&#x2193;</div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          marginBottom: 8,
        }}>
          Structured
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: C.muted,
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}>&#x2193;</div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          marginBottom: 40,
        }}>
          Automated
        </div>

        {/* Description */}
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
          color: C.dim,
          maxWidth: 560,
          lineHeight: 1.8,
          marginBottom: 16,
        }}>
          A one-person operations studio. Tools, governance systems, analytics engines, and a publication platform &#x2014; built with AI as a collaborator, not a replacement.
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: C.muted,
          letterSpacing: '0.05em',
          marginBottom: 48,
          fontStyle: 'italic',
        }}>
          "What are the actual load-bearing elements of a human life?" &#x2014; Leo Prescott, Seat 1007
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/ddl" style={{
            display: 'inline-block',
            background: C.crimson,
            color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            padding: '13px 32px',
            borderRadius: 6,
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}>
            Enter the Site
          </Link>
          <Link href={surpriseHref} style={{
            display: 'inline-block',
            background: 'transparent',
            color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '0.95rem',
            padding: '13px 32px',
            borderRadius: 6,
            textDecoration: 'none',
            border: `1px solid rgba(245,241,235,0.15)`,
            letterSpacing: '0.01em',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(245,241,235,0.35)';
              e.currentTarget.style.color = C.cream;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245,241,235,0.15)';
            }}
          >
            Surprise Me →
          </Link>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── STATS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem',
          color: C.muted,
          letterSpacing: '0.2em',
          textAlign: 'center',
          marginBottom: 28,
        }}>
          BY THE NUMBERS
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: '20px 12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: C.crimson,
                lineHeight: 1,
                marginBottom: 6,
              }}>{s.n}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.5rem',
                color: C.muted,
                letterSpacing: '0.08em',
                lineHeight: 1.3,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── WINGS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem',
          color: C.muted,
          letterSpacing: '0.2em',
          marginBottom: 28,
          textAlign: 'center',
        }}>
          EIGHT WINGS
        </div>

        {/* Two rows of four */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 12,
        }}>
          {wings.slice(0, 4).map((wing) => (
            <WingCard key={wing.id} wing={wing} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {wings.slice(4).map((wing) => (
            <WingCard key={wing.id} wing={wing} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── FOOTER ── */}
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '40px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          color: C.muted,
          letterSpacing: '0.1em',
        }}>
          DROPDOWN LOGISTICS · D.K. HALE · CPA
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'llms.txt', href: '/llms.txt' },
            { label: 'Backend', href: '/backend' },
            { label: 'Sitemap', href: '/sitemap' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: C.muted,
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
              onMouseEnter={e => e.currentTarget.style.color = C.cream}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

function WingCard({ wing, hovered, setHovered }) {
  const isHov = hovered === wing.id;
  return (
    <Link
      href={wing.href}
      onMouseEnter={() => setHovered(wing.id)}
      onMouseLeave={() => setHovered(null)}
      style={{
        display: 'block',
        background: isHov ? C.cardHi : C.card,
        border: `1px solid ${isHov ? wing.color + '40' : C.border}`,
        borderTop: `2px solid ${isHov ? wing.color : 'transparent'}`,
        borderRadius: 8,
        padding: '20px 18px',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1rem',
          color: isHov ? wing.color : C.cream,
          letterSpacing: '-0.01em',
          transition: 'color 0.15s',
        }}>
          {wing.name}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem',
          color: wing.color,
          background: `${wing.color}15`,
          padding: '3px 7px',
          borderRadius: 3,
          letterSpacing: '0.08em',
          opacity: isHov ? 1 : 0.7,
        }}>
          {wing.tag}
        </div>
      </div>
      <div style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: '0.78rem',
        color: isHov ? 'rgba(245,241,235,0.65)' : 'rgba(245,241,235,0.4)',
        lineHeight: 1.5,
        transition: 'color 0.15s',
      }}>
        {wing.tagline}
      </div>
    </Link>
  );
}
