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
  blue:    '#6B9DC2',
};

const wings = [
  {
    id: 'ddl',
    name: 'DDL',
    color: '#B23531',
    href: '/ddl',
    tag: 'Framework',
    tagline: 'Governance, methodology, council, memoir.',
    desc: 'The operating layer. Standards, systems, methodology, and the AI council that reviews everything. The framework behind every other wing.',
    links: [
      { label: 'Council', href: '/council' },
      { label: 'Standards', href: '/standards' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Memoir', href: '/memoir' },
    ],
  },
  {
    id: 'da',
    name: 'D&A',
    color: '#C49A3C',
    href: '/blindspot',
    tag: 'Analytics',
    tagline: 'BlindSpot analytics, dashboards, recaps.',
    desc: 'BlindSpot analytics modules — trading, Steam, campaign, sports betting. Annual recaps and signal reports.',
    links: [
      { label: 'Trading', href: '/blindspot/trading' },
      { label: 'Steam', href: '/blindspot/steam' },
      { label: 'Annual Signal', href: '/recaps/annual-signal' },
      { label: 'All Recaps', href: '/recaps' },
    ],
  },
  {
    id: 'dexverse',
    name: 'DexVerse',
    color: '#8a6cc9',
    href: '/dexlore',
    tag: 'Lore',
    tagline: 'Origin stories, companions, lore, glossary.',
    desc: 'The narrative layer. DexOS origin, council companions mapped to LOTR characters, continuum timeline, and the canon glossary.',
    links: [
      { label: 'Origin Hub', href: '/dexlore' },
      { label: 'LOTR Council', href: '/dexverse/lotr' },
      { label: 'Glossary', href: '/knowledge/glossary' },
      { label: 'Template Palette', href: '/methodology/palette' },
    ],
  },
  {
    id: 'dossiers',
    name: 'Dossiers',
    color: '#4A9E6B',
    href: '/dossiers',
    tag: 'Characters',
    tagline: 'Character archive across three universes.',
    desc: 'CottageHumble-styled character files for D&D 5e, Divinity: Original Sin 2, and Skyrim. Governed documents, not wiki entries.',
    links: [
      { label: 'Ash, Snow & Steel', href: '/dossiers/ash-snow-steel' },
      { label: 'Fort Joy', href: '/dossiers/fort-joy' },
      { label: 'Leafshadow Lineage', href: '/dossiers/leafshadow-lineage' },
      { label: 'All Characters', href: '/dossiers' },
    ],
  },
  {
    id: 'bench',
    name: 'The Bench',
    color: '#4A7C9B',
    href: '/bench',
    tag: 'Tools',
    tagline: 'Software tips. OneNote to PowerShell.',
    desc: '48 tips across 7 tools. Day One, Flow, Sharp, and Flex tiers. Origin: a Teams conversation about OneNote.',
    links: [
      { label: 'Excel', href: '/bench/excel' },
      { label: 'OneNote', href: '/bench/onenote' },
      { label: 'PowerShell', href: '/bench/powershell' },
      { label: 'All Tools', href: '/bench' },
    ],
  },
  {
    id: 'canonpress',
    name: 'CanonPress',
    color: '#B23531',
    href: '/canonpress',
    tag: 'Publication',
    tagline: 'Governed publication. Four series.',
    desc: 'Converge, RedLine, DeepCut, GroundTruth. AI-assisted reasoning published in the open. Weekly cadence on Converge.',
    links: [
      { label: 'Converge', href: '/canonpress/converge' },
      { label: 'GroundTruth', href: '/canonpress/groundtruth' },
      { label: 'RedLine', href: '/canonpress/redline' },
      { label: 'DeepCut', href: '/canonpress/deepcut' },
    ],
  },
  {
    id: 'auditforge',
    name: 'AuditForge',
    color: '#2C7A7B',
    href: '/auditforge',
    tag: 'Product',
    tagline: 'Governed audit document generation.',
    desc: 'Structured data in. Governed documents out. RCM, MCL, and Walkthrough Narratives from a live star schema. Built by a CPA.',
    links: [
      { label: 'Landing', href: '/auditforge' },
      { label: 'Current Build', href: '/auditforge/current' },
      { label: 'Brand Kit', href: '/auditforge/branding' },
    ],
  },
  {
    id: 'products',
    name: 'Products',
    color: '#6B9DC2',
    href: '/products/behavioral-intelligence',
    tag: 'Concepts',
    tagline: 'Concept products and design mockups.',
    desc: 'Behavioral intelligence, Nordic Nomad, Drinks O System. Product concepts built to spec — not shipped, but fully designed.',
    links: [
      { label: 'Behavioral Intelligence', href: '/products/behavioral-intelligence' },
    ],
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
  '/excelligence', '/council', '/dexlore', '/memoir',
  '/blindspot/trading', '/dossiers/feliciano', '/dossiers/xuth-jr',
  '/canonpress/groundtruth/gt-001', '/methodology', '/dexverse/lotr',
  '/bench/excel', '/auditforge/current', '/forewords',
  '/framework/pss', '/mindframe', '/knowledge/glossary',
  '/dossiers/fort-joy', '/recaps/annual-signal',
];

export default function DDLLanding() {
  const [open, setOpen] = useState(null);
  const [surpriseHref, setSurpriseHref] = useState('/excelligence');

  useEffect(() => {
    setSurpriseHref(surpriseRoutes[Math.floor(Math.random() * surpriseRoutes.length)]);
  }, []);

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* ── HERO ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '96px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.3em', marginBottom: 28 }}>
          DROPDOWN LOGISTICS
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 8 }}>
          Chaos
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: C.muted, letterSpacing: '0.15em', marginBottom: 8 }}>
          &#x2193;
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 8 }}>
          Structured
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: C.muted, letterSpacing: '0.15em', marginBottom: 8 }}>
          &#x2193;
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 40 }}>
          Automated
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: C.dim, maxWidth: 560, lineHeight: 1.8, marginBottom: 16 }}>
          A one-person operations studio. Tools, governance systems, analytics engines, and a publication platform &#x2014; built with AI as a collaborator, not a replacement.
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.muted, letterSpacing: '0.05em', marginBottom: 48, fontStyle: 'italic' }}>
          &#x201C;What are the actual load-bearing elements of a human life?&#x201D; &#x2014; Leo Prescott, Seat 1007
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/ddl" style={{
            display: 'inline-block', background: C.crimson, color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem',
            padding: '13px 32px', borderRadius: 6, textDecoration: 'none',
          }}>
            Enter the Site
          </Link>
          <Link href={surpriseHref} style={{
            display: 'inline-block', background: 'transparent', color: C.cream,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.95rem',
            padding: '13px 32px', borderRadius: 6, textDecoration: 'none',
            border: '1px solid rgba(245,241,235,0.15)',
          }}>
            Surprise Me &#x2192;
          </Link>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── STATS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.muted, letterSpacing: '0.2em', textAlign: 'center', marginBottom: 28 }}>
          BY THE NUMBERS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.card, border: '1px solid rgba(245,241,235,0.06)', borderRadius: 6, padding: '20px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: C.crimson, lineHeight: 1, marginBottom: 6 }}>
                {s.n}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: C.muted, letterSpacing: '0.08em', lineHeight: 1.3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── WINGS ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.muted, letterSpacing: '0.2em', marginBottom: 28, textAlign: 'center' }}>
          EIGHT WINGS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {wings.slice(0, 4).map((wing) => (
            <WingCard key={wing.id} wing={wing} isOpen={open === wing.id} onToggle={() => toggle(wing.id)} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {wings.slice(4).map((wing) => (
            <WingCard key={wing.id} wing={wing} isOpen={open === wing.id} onToggle={() => toggle(wing.id)} />
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }} />

      {/* ── FOOTER ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.muted, letterSpacing: '0.1em' }}>
          DROPDOWN LOGISTICS &#x00B7; D.K. HALE &#x00B7; CPA
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[{ label: 'llms.txt', href: '/llms.txt' }, { label: 'Backend', href: '/backend' }, { label: 'Sitemap', href: '/sitemap' }].map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, textDecoration: 'none', letterSpacing: '0.05em' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

function WingCard({ wing, isOpen, onToggle }) {
  return (
    <div style={{
      background: isOpen ? C.cardHi : C.card,
      border: '1px solid rgba(245,241,235,0.06)',
      borderTop: isOpen ? '2px solid ' + wing.color : '2px solid transparent',
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'all 0.15s ease',
      cursor: 'pointer',
    }}
      onClick={onToggle}
    >
      {/* Header */}
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: isOpen ? wing.color : C.cream, transition: 'color 0.15s' }}>
            {wing.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.48rem', color: wing.color, background: wing.color + '18', padding: '3px 7px', borderRadius: 3, letterSpacing: '0.08em' }}>
              {wing.tag}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              &#x25BE;
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.75rem', color: isOpen ? 'rgba(245,241,235,0.55)' : 'rgba(245,241,235,0.35)', lineHeight: 1.5, transition: 'color 0.15s' }}>
          {wing.tagline}
        </div>
      </div>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.06)', padding: '14px 18px 18px' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.8rem', color: C.dim, lineHeight: 1.7, marginBottom: 14 }}>
            {wing.desc}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {wing.links.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: wing.color,
                textDecoration: 'none',
                padding: '4px 0',
                borderBottom: '1px solid rgba(245,241,235,0.04)',
              }}>
                {link.label} &#x2192;
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
