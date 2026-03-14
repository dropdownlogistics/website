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
  daGreen: '#22C55E',
};

const ARMS = [
  { label: 'DDL',         sub: 'Framework & governance',    angle: -90,  color: C.crimson, href: '/ddl' },
  { label: 'D&A',         sub: 'Analytics & dashboards',    angle: -45,  color: C.amber,   href: '/blindspot' },
  { label: 'BlindSpot',   sub: 'signal \u2192 structure \u2192 edge', angle: 10, color: C.daGreen, href: '/blindspot/betting' },
  { label: 'DexVerse',    sub: 'Origin stories & lore',     angle: 65,   color: C.violet,  href: '/dexlore' },
  { label: 'Dossiers',    sub: 'Three universes',           angle: 120,  color: C.green,   href: '/dossiers' },
  { label: 'The Bench',   sub: 'Software tips & tricks',    angle: 168,  color: C.steel,   href: '/bench' },
  { label: 'CanonPress',  sub: 'Governed publication',      angle: 215,  color: C.crimson, href: '/canonpress' },
  { label: 'AuditForge',  sub: 'Governed audit docs',       angle: 265,  color: C.teal,    href: '/auditforge' },
];

const stats = [
  { n: '203', label: 'routes' },
  { n: '8',   label: 'wings' },
  { n: '44',  label: 'systems' },
  { n: '65',  label: 'standards' },
  { n: '10',  label: 'council seats' },
  { n: '497K',label: 'RAG chunks' },
  { n: '1',   label: 'person' },
];

const wings = [
  { id: 'ddl', name: 'DDL', color: C.crimson, href: '/ddl', tag: 'Framework', tagline: 'Governance, methodology, council, memoir.', desc: 'The operating layer. Standards, systems, methodology, and the AI council that reviews everything. The framework behind every other wing.', links: [{ label: 'Council', href: '/council' }, { label: 'Standards', href: '/standards' }, { label: 'Methodology', href: '/methodology' }, { label: 'Memoir', href: '/memoir' }] },
  { id: 'da', name: 'D&A', color: C.amber, href: '/blindspot', tag: 'Analytics', tagline: 'BlindSpot analytics, dashboards, recaps.', desc: 'BlindSpot analytics modules \u2014 trading, Steam, campaign, sports betting. Annual recaps and signal reports.', links: [{ label: 'Trading', href: '/blindspot/trading' }, { label: 'Steam', href: '/blindspot/steam' }, { label: 'Annual Signal', href: '/recaps/annual-signal' }, { label: 'All Recaps', href: '/recaps' }] },
  { id: 'blindspot', name: 'BlindSpot', color: C.daGreen, href: '/blindspot/betting', tag: 'Product', tagline: 'Sports betting analytics. signal \u2192 structure \u2192 edge.', desc: 'The data layer for the other side of the equation. Fact_Bets schema, token economy, scope declaration. Live at blindspot.bet.', links: [{ label: 'blindspot.bet', href: 'https://blindspot.bet' }, { label: 'Product Page', href: '/blindspot/betting' }] },
  { id: 'dexverse', name: 'DexVerse', color: C.violet, href: '/dexlore', tag: 'Lore', tagline: 'Origin stories, companions, lore, glossary.', desc: 'The narrative wing. DexLore, MindFrame, council origin stories, the continuum, dossiers across three universes.', links: [{ label: 'DexLore', href: '/dexlore' }, { label: 'MindFrame', href: '/mindframe' }, { label: 'Council', href: '/council' }] },
  { id: 'dossiers', name: 'Dossiers', color: C.green, href: '/dossiers', tag: 'Characters', tagline: 'Character archive across three universes.', desc: 'CottageHumble dossiers for D&D 5e, Divinity Original Sin 2, and Skyrim. Three campaigns, one format.', links: [{ label: 'Ash, Snow & Steel', href: '/dossiers/ash-snow-steel' }, { label: 'Fort Joy', href: '/dossiers/fort-joy' }, { label: 'All Dossiers', href: '/dossiers' }] },
  { id: 'bench', name: 'The Bench', color: C.steel, href: '/bench', tag: 'Tools', tagline: 'Software tips. OneNote to PowerShell.', desc: '48 tips across 7 tools. Day One, Flow, Sharp, and Flex tiers. Origin: a Teams conversation about OneNote.', links: [{ label: 'Excel', href: '/bench/excel' }, { label: 'PowerShell', href: '/bench/powershell' }, { label: 'OneNote', href: '/bench/onenote' }] },
  { id: 'canonpress', name: 'CanonPress', color: C.crimson, href: '/canonpress', tag: 'Publication', tagline: 'Governed publication. Four series.', desc: 'Converge, RedLine, DeepCut, GroundTruth. Council nominates, corpus ingests, Dex Jr. synthesizes, operator reacts.', links: [{ label: 'Converge', href: '/canonpress/converge' }, { label: 'RedLine', href: '/canonpress/redline' }, { label: 'DeepCut', href: '/canonpress/deepcut' }] },
  { id: 'auditforge', name: 'AuditForge', color: C.teal, href: '/auditforge', tag: 'Product', tagline: 'Governed audit document generation.', desc: 'System of Structure. Fact_Control at center. RCM, MCL, Walkthrough, Audit Plan. Live at auditforge.dev.', links: [{ label: 'auditforge.dev', href: 'https://auditforge.dev' }, { label: 'Current Build', href: '/auditforge/current' }] },
];

const SURPRISE_ROUTES = ['/', '/ddl', '/council', '/standards', '/methodology', '/dexlore', '/mindframe', '/memoir', '/blindspot', '/dossiers', '/canonpress', '/auditforge', '/bench', '/excelligence', '/forewords', '/about', '/recaps', '/analytics'];

function RadialHero({ visible }) {
  const ARM_LEN = 160;
  const STAMP_R = 52;
  const CX = 260;
  const CY = 260;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto', opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
      <svg viewBox="0 0 520 520" style={{ width: '100%', height: 'auto' }}>
        {/* Orbit rings */}
        <circle cx={CX} cy={CY} r={ARM_LEN + 56} fill="none" stroke={C.crimson} strokeWidth="0.3" strokeOpacity="0.06" />
        <circle cx={CX} cy={CY} r={ARM_LEN + 22} fill="none" stroke={C.crimson} strokeWidth="0.5" strokeOpacity="0.15" />

        {/* Rotating arc */}
        <circle cx={CX} cy={CY} r={ARM_LEN + 22} fill="none" stroke={C.crimson} strokeWidth="1.5"
          strokeDasharray={`${(ARM_LEN + 22) * 0.3} ${(ARM_LEN + 22) * 6}`} strokeLinecap="round" opacity="0.4"
          style={{ animation: 'spin 22s linear infinite', transformOrigin: `${CX}px ${CY}px` }} />

        {/* Arms + nodes */}
        {ARMS.map((arm, i) => {
          const rad = (arm.angle * Math.PI) / 180;
          const x1 = CX + STAMP_R * Math.cos(rad);
          const y1 = CY + STAMP_R * Math.sin(rad);
          const x2 = CX + ARM_LEN * Math.cos(rad);
          const y2 = CY + ARM_LEN * Math.sin(rad);
          const isRight = x2 > CX + 20;
          const isLeft  = x2 < CX - 20;
          const bx = isRight ? x2 + 8 : isLeft ? x2 - 136 : x2 - 68;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={arm.color} strokeWidth="0.8" strokeOpacity="0.35"
                style={{ animation: `armIn 0.8s ${0.8 + i * 0.1}s ease forwards`, opacity: 0 }} />
              <circle cx={x2} cy={y2} r={5} fill={C.navy} stroke={arm.color} strokeWidth="1.2"
                style={{ animation: `fadeIn 0.4s ${1.4 + i * 0.1}s ease forwards`, opacity: 0 }} />
              <circle cx={x2} cy={y2} r={2.5} fill={arm.color}
                style={{ animation: `fadeIn 0.4s ${1.4 + i * 0.1}s ease forwards`, opacity: 0 }} />
              <g style={{ animation: `fadeIn 0.6s ${2.0 + i * 0.08}s ease forwards`, opacity: 0 }}>
                <rect x={bx} y={y2 - 21} width={128} height={42} rx={6}
                  fill={C.card} stroke={arm.color} strokeWidth="0.5" strokeOpacity="0.2" />
                <text x={bx + 9} y={y2 - 5}
                  fontFamily="'Space Grotesk',sans-serif" fontSize="11" fontWeight="700"
                  fill={C.cream} letterSpacing="0.01em">{arm.label}</text>
                <text x={bx + 9} y={y2 + 11}
                  fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill="rgba(245,241,235,0.3)" letterSpacing="0.03em">{arm.sub}</text>
              </g>
            </g>
          );
        })}

        {/* Center stamp — DD */}
        <circle cx={CX} cy={CY} r={STAMP_R + 10} fill="none" stroke={C.cream} strokeWidth="1" strokeOpacity="0.08" />
        <circle cx={CX} cy={CY} r={STAMP_R + 4}  fill="none" stroke={C.cream} strokeWidth="1.5" strokeOpacity="0.15" />
        <circle cx={CX} cy={CY} r={STAMP_R}       fill={C.crimson} />
        <circle cx={CX} cy={CY} r={STAMP_R - 5}  fill="none" stroke={C.cream} strokeWidth="0.8" strokeOpacity="0.2" />
        <text x={CX} y={CY + 9} textAnchor="middle"
          fontFamily="'Space Grotesk',sans-serif" fontWeight="900" fontSize="26" fill={C.cream} letterSpacing="-0.5">DD</text>
        <text x={CX} y={CY + 22} textAnchor="middle"
          fontFamily="'JetBrains Mono',monospace" fontSize="5" fill={C.cream} opacity="0.4" letterSpacing="2.5">DROPDOWN</text>
        {/* Copper dots */}
        <circle cx={CX - STAMP_R - 4} cy={CY} r={2} fill={C.amber} opacity="0.6" />
        <circle cx={CX + STAMP_R + 4} cy={CY} r={2} fill={C.amber} opacity="0.6" />
      </svg>
      <style>{`
        @keyframes spin    { from { transform: rotate(0deg)   } to { transform: rotate(360deg) } }
        @keyframes armIn   { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

export default function DDLLanding() {
  const [visible, setVisible] = useState(false);
  const [openWing, setOpenWing] = useState(null);
  const [surpriseHref, setSurpriseHref] = useState('/');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    setSurpriseHref(SURPRISE_ROUTES[Math.floor(Math.random() * SURPRISE_ROUTES.length)]);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* HERO */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

          {/* Left — text */}
          <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: '0.2em', marginBottom: 20 }}>
              DROPDOWN LOGISTICS
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
              Chaos<br />
              <span style={{ color: C.crimson }}>&#x2193;</span><br />
              Structured<br />
              <span style={{ color: C.crimson }}>&#x2193;</span><br />
              Automated
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.8, maxWidth: 380, marginBottom: 28 }}>
              A one-person operations studio. Tools, governance systems, analytics engines, and a publication platform &mdash; built with AI as a collaborator, not a replacement.
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', fontStyle: 'italic', color: C.muted, marginBottom: 32, maxWidth: 380 }}>
              &ldquo;What are the actual load-bearing elements of a human life?&rdquo;<br />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', fontStyle: 'normal' }}>&#x2014; Leo Prescott, Seat 1007</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/ddl" style={{ background: C.crimson, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, padding: '11px 24px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>
                Enter the Site
              </Link>
              <Link href={surpriseHref} style={{ background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13, padding: '11px 24px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.border}` }}>
                Surprise Me &#x2192;
              </Link>
            </div>
          </div>

          {/* Right — radial */}
          <RadialHero visible={visible} />
        </div>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.6s' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: '0.2em', marginBottom: 16 }}>BY THE NUMBERS</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 56 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: C.crimson, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, marginTop: 4, letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WINGS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: '0.2em', marginBottom: 20 }}>EIGHT WINGS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {wings.map(wing => (
            <div key={wing.id}
              onClick={() => setOpenWing(openWing === wing.id ? null : wing.id)}
              style={{ background: openWing === wing.id ? C.cardHi : C.card, border: `1px solid ${openWing === wing.id ? wing.color + '40' : C.border}`, borderTop: `2px solid ${openWing === wing.id ? wing.color : 'transparent'}`, borderRadius: 8, padding: '18px', cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: openWing === wing.id ? wing.color : C.cream }}>{wing.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: wing.color, background: wing.color + '18', padding: '3px 7px', borderRadius: 3, letterSpacing: '0.08em' }}>{wing.tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, transform: openWing === wing.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>&#x25BE;</span>
                </div>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.75rem', color: openWing === wing.id ? C.dim : 'rgba(245,241,235,0.35)', lineHeight: 1.5 }}>{wing.tagline}</div>
              {openWing === wing.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.8rem', color: C.dim, lineHeight: 1.7, marginBottom: 14 }}>{wing.desc}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {wing.links.map((l, i) => (
                      <Link key={i} href={l.href} onClick={e => e.stopPropagation()} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: wing.color, textDecoration: 'none' }}>
                        {l.label} &#x2192;
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 1100, margin: '0 auto', padding: '28px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(245,241,235,0.25)' }}>
          DROPDOWN LOGISTICS &middot; DAVE KITCHENS &middot; CPA
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="/llms.txt" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(245,241,235,0.25)', textDecoration: 'none' }}>llms.txt</a>
          <Link href="/backend" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(245,241,235,0.25)', textDecoration: 'none' }}>Backend</Link>
          <Link href="/sitemap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(245,241,235,0.25)', textDecoration: 'none' }}>Sitemap</Link>
        </div>
      </div>

    </div>
  );
}
