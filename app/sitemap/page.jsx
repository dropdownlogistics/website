'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', amber: '#C49A3C',
  violet: '#8a6cc9', green: '#4A9E6B', blue: '#6B9DC2',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.3)', creamGhost: 'rgba(245,241,235,0.06)',
  border: 'rgba(245,241,235,0.06)', borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const wings = [
  {
    label: 'DDL', color: C.crimson, routes: [
      { href: '/', label: 'Landing' },
      { href: '/ddl', label: 'DDL Hub' },
      { href: '/ddl/reference', label: 'Reference' },
      { href: '/ddl/site-growth', label: 'Site Growth' },
      { href: '/backend', label: 'BackEnd' },
      { href: '/brand', label: 'Brand Identity' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/methodology/governed-iteration', label: 'Governed Iteration' },
      { href: '/registry', label: 'Full Registry' },
      { href: '/systems', label: 'Systems Registry' },
      { href: '/standards', label: 'Standards Registry' },
      { href: '/projects', label: 'All Projects' },
      { href: '/projects/drinks-o-system', label: 'Drinks-O-System' },
      { href: '/projects/getsum', label: 'GetSum' },
      { href: '/projects/graceful-beauty', label: 'Graceful Beauty' },
      { href: '/projects/grant-tracker', label: 'GrantTracker' },
      { href: '/projects/heartbeat', label: 'HeartBeat Engine' },
      { href: '/projects/integrityos', label: 'IntegrityOS' },
      { href: '/projects/nomadic-notary', label: 'Nomadic Notary' },
      { href: '/projects/payguard', label: 'PayGuard' },
      { href: '/projects/sprinkles', label: 'Sprinkles & Co' },
      { href: '/projects/vetschedule', label: 'VetSchedule' },
      { href: '/chronicle/the-consolidation', label: 'The Consolidation' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/knowledge/glossary', label: 'Trademark Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/sitemap', label: 'Site Map' },
    ],
  },
  {
    label: 'D&A', color: C.amber, routes: [
      { href: '/analytics', label: 'Analytics Hub' },
      { href: '/analytics/grammarly', label: 'Grammarly — 4.57M Words' },
      { href: '/analytics/tone', label: 'Tone Analysis' },
      { href: '/analytics/memoir', label: 'Memoir Analytics' },
      { href: '/analytics/dexdash', label: 'DexDash' },
      { href: '/analytics/catnip-map', label: 'Catnip Map' },
      { href: '/analytics/sensory-diet', label: 'Sensory Diet' },
      { href: '/analytics/dimensional-map', label: 'Dimensional Map' },
      { href: '/analytics/build-log', label: 'Build Log' },
      { href: '/analytics/callback-engine', label: 'Callback Engine' },
      { href: '/analytics/interview', label: 'Interview Analytics' },
      { href: '/analytics/sonic-thread', label: 'Sonic Thread' },
      { href: '/analytics/vehicle-fuel', label: 'Vehicle & Fuel' },
      { href: '/blindspot', label: 'BlindSpot Hub' },
      { href: '/blindspot/trading', label: 'Trading Dashboard' },
      { href: '/blindspot/steam', label: 'Steam Library Analytics' },
      { href: '/blindspot/campaign', label: 'D&D Campaign Analytics' },
      { href: '/blindspot/betting', label: 'Betting' },
      { href: '/blindspot/backtest', label: 'Backtest' },
      { href: '/blindspot/llm', label: 'LLM' },
      { href: '/recaps', label: 'Year-End Recaps' },
      { href: '/recaps/apple-music', label: 'Apple Music Replay' },
      { href: '/recaps/annual-signal', label: 'Annual Signal Report' },
      { href: '/recaps/predictions', label: 'Prediction Audit' },
      { href: '/recaps/fast-and-furious', label: 'Fast & Furious' },
      { href: '/recaps/sons-of-anarchy', label: 'Sons of Anarchy' },
      { href: '/recaps/duolingo', label: 'Duolingo' },
      { href: '/excelligence', label: 'Excelligence — Landing' },
      { href: '/excelligence/explorer', label: 'Excelligence — Graph Explorer' },
    ],
  },
  {
    label: 'DexVerse', color: C.violet, routes: [
      { href: '/dexos', label: 'DexOS' },
      { href: '/dexlore', label: 'DexLore Hub' },
      { href: '/dexlore/continuum', label: 'The Continuum' },
      { href: '/dexlore/council', label: 'Companions' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/mindframe/recursive', label: 'Recursive' },
      { href: '/mindframe/what-are-you-feeling', label: 'What Are You Feeling' },
      { href: '/council', label: 'Council Hub' },
      { href: '/council/profiles', label: 'All Council Profiles' },
      { href: '/council/profiles/claude', label: 'Claude — Seat 1002' },
      { href: '/council/profiles/chatgpt', label: 'ChatGPT — Seat 1008' },
      { href: '/council/profiles/grok', label: 'Grok — Seat 1003' },
      { href: '/council/profiles/gemini', label: 'Gemini — Seat 1007' },
      { href: '/council/profiles/perplexity', label: 'Perplexity — Seat 1004' },
      { href: '/council/profiles/copilot', label: 'Copilot — Seat 1005' },
      { href: '/council/profiles/meta-ai', label: 'Meta AI — Seat 1006' },
      { href: '/council/profiles/lechat', label: 'LeChat — Seat 1001' },
      { href: '/council/profiles/deepseek', label: 'DeepSeek — Seat 1009' },
      { href: '/council/1010', label: 'Seat 1010 — Dex Jr.' },
      { href: '/council/auto-council', label: 'AutoCouncil' },
      { href: '/council/scaling', label: 'Scaling' },
      { href: '/council/review-system', label: 'Review System' },
      { href: '/council/faq', label: 'FAQ' },
      { href: '/council/vote-ledger', label: 'Vote Ledger' },
      { href: '/ai', label: 'AI Overview' },
    ],
  },
  {
    label: 'Story', color: C.violet, routes: [
      { href: '/memoir', label: 'Little to Know Experience' },
      { href: '/memoir/reading-room', label: 'Reading Room' },
      { href: '/memoir/architecture', label: 'How the Memoir Was Built' },
      { href: '/memoir/dashboard', label: 'Memoir Dashboard' },
      { href: '/memoir/braid', label: 'The Braid' },
      { href: '/memoir/two-doors', label: 'Two Doors' },
      { href: '/memoir/basement', label: 'The Basement' },
      { href: '/memoir/false-summit', label: 'False Summit' },
      { href: '/memoir/reckoning', label: 'The Reckoning' },
      { href: '/memoir/reconciliation', label: 'Reconciliation' },
      { href: '/memoir/cleanest-day', label: 'The Cleanest Day' },
      { href: '/memoir/quiet-and-chase', label: 'Quiet and Chase' },
      { href: '/memoir/spiral-and-turning', label: 'Spiral and Turning' },
      { href: '/memoir/mask-and-cracks', label: 'Mask and Cracks' },
      { href: '/memoir/the-protocol', label: 'The Protocol' },
      { href: '/memoir/informed-patient', label: 'The Informed Patient' },
      { href: '/memoir/clinical-instrument', label: 'Clinical Instrument' },
      { href: '/memoir/psychometric-archaeology', label: 'Psychometric Archaeology' },
      { href: '/memoir/measurement-arc', label: 'Measurement Arc' },
      { href: '/memoir/substack', label: 'Substack' },
      { href: '/memoir/calendar', label: 'Release Calendar' },
      { href: '/forewords', label: 'Foreword Convergence' },
      { href: '/other-works', label: 'Other Works' },
    ],
  },
  {
    label: 'Dossiers', color: C.green, routes: [
      { href: '/dossiers', label: 'All Dossiers' },
      { href: '/dossiers/operator', label: 'The Operator' },
      { href: '/dossiers/lego', label: 'The Collection' },
      { href: '/dossiers/merrick', label: 'Merrick' },
      { href: '/dossiers/feliciano', label: 'Feliciano' },
      { href: '/dossiers/hillie', label: 'Hillie' },
      { href: '/dossiers/xuth-jr', label: 'Xuth Leafshadow Jr.' },
      { href: '/dossiers/xuth-iii', label: 'Xuth Leafshadow III' },
      { href: '/dossiers/xuth-sr', label: 'Xuth Leafshadow Sr.' },
      { href: '/dossiers/riflen', label: 'Riflen' },
      { href: '/dossiers/doc-rickets', label: 'Doc Rickets' },
      { href: '/dossiers/ash-snow-steel', label: 'Ash, Snow & Steel' },
      { href: '/dossiers/fort-joy', label: 'Fort Joy Ledger' },
      { href: '/dossiers/leafshadow-lineage', label: 'Leafshadow Lineage' },
      { href: '/dossiers/hal-style-lock', label: 'Hal Style Lock' },
      { href: '/dossiers/campaign-analytics', label: 'Campaign Analytics' },
    ],
  },
  {
    label: 'Products', color: C.blue, routes: [
      { href: '/products/behavioral-intelligence', label: 'Behavioral Intelligence' },
      { href: '/products/behavioral-intelligence/story', label: 'The Story Behind It' },
      { href: '/products/behavioral-intelligence/exec', label: 'Executive Concept' },
      { href: '/products/behavioral-intelligence/brief', label: 'Product Brief' },
      { href: '/prioritease', label: 'PrioritEase' },
      { href: '/framework/pss', label: 'Prompt Strategy System' },
      { href: '/framework/vibe-coding', label: 'Vibe Coding with Governance' },
      { href: '/guides/llm', label: 'LLM Setup Guide' },
      { href: '/work/rexcel', label: 'r/Excel' },
    ],
  },
  {
    label: 'CanonPress', color: C.crimson, routes: [
      { href: '/canonpress', label: 'CanonPress Hub' },
    ],
  },
  {
    label: 'About', color: C.crimson, routes: [
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
    ],
  },
];

export default function SitemapPage() {
  const [filter, setFilter] = useState('');
  const total = wings.reduce((a, w) => a + w.routes.length, 0);

  const filtered = filter
    ? wings.map(w => ({ ...w, routes: w.routes.filter(r => r.label.toLowerCase().includes(filter.toLowerCase()) || r.href.toLowerCase().includes(filter.toLowerCase())) })).filter(w => w.routes.length > 0)
    : wings;

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 12 }}>DDL Â· SITE MAP</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: C.cream, margin: '0 0 12px', lineHeight: 1.1 }}>Everything</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, margin: '0 0 24px' }}>{total} routes across {wings.length} wings.</p>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Filter routes..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              width: '100%', maxWidth: 400, padding: '10px 16px',
              fontFamily: font.mono, fontSize: 12, color: C.cream,
              background: C.card, border: `1px solid ${C.borderMed}`,
              borderRadius: 6, outline: 'none',
            }}
          />
        </div>

        {/* WINGS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map(wing => (
            <div key={wing.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${wing.color}`, borderRadius: 8, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: wing.color, letterSpacing: '0.05em' }}>{wing.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{wing.routes.length}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {wing.routes.map(r => (
                  <Link key={r.href} href={r.href} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0', borderBottom: `1px solid ${C.border}`,
                    textDecoration: 'none', transition: 'color 0.12s',
                  }}
                    onMouseEnter={e => e.currentTarget.querySelector('.label').style.color = C.cream}
                    onMouseLeave={e => e.currentTarget.querySelector('.label').style.color = C.creamMid}
                  >
                    <span className="label" style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, transition: 'color 0.12s' }}>{r.label}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginLeft: 8, flexShrink: 0 }}>{r.href}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{total} routes Â· {wings.length} wings Â· dropdownlogistics.com</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Chaos â†’ Structured â†’ Automated</div>
        </div>

      </div>
    </div>
  );
}

