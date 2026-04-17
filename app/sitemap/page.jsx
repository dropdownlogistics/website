'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f', cardHi: '#132435',
  crimson: '#B23531', amber: '#C49A3C', violet: '#8a6cc9',
  green: '#4A9E6B', steel: '#4A7C9B', teal: '#2C7A7B',
  blue: '#6B9DC2', daGreen: '#22C55E',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.55)',
  muted: 'rgba(245,241,235,0.3)', border: 'rgba(245,241,235,0.06)',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const wings = [
  {
    label: 'DDL', color: C.crimson, tag: 'Framework',
    tagline: 'Governance, methodology, council, memoir.',
    routes: [
      { href: '/', label: 'Landing' },
      { href: '/ddl', label: 'DDL Studio Hub' },
      { href: '/ddl/operator', label: 'Operator Profile' },
      { href: '/ddl/council', label: 'Council Hub' },
      { href: '/ddl/council/hawthorne', label: 'Seat 1001 \u2014 Archer Hawthorne' },
      { href: '/ddl/council/caldwell', label: 'Seat 1002 \u2014 Marcus Caldwell' },
      { href: '/ddl/council/mercer', label: 'Seat 1003 \u2014 Elias Mercer' },
      { href: '/ddl/council/sullivan', label: 'Seat 1004 \u2014 Max Sullivan' },
      { href: '/ddl/council/bennett', label: 'Seat 1005 \u2014 Rowan Bennett' },
      { href: '/ddl/council/sinclair', label: 'Seat 1006 \u2014 Ava Sinclair' },
      { href: '/ddl/council/prescott', label: 'Seat 1007 \u2014 Leo Prescott' },
      { href: '/ddl/council/grey', label: 'Seat 1008 \u2014 Marcus Grey' },
      { href: '/ddl/council/langford', label: 'Seat 1009 \u2014 Kai Langford' },
      { href: '/ddl/council/dex-jr', label: 'Seat 1010 \u2014 Dex Jr.' },
      { href: '/ddl/reference', label: 'Reference' },
      { href: '/ddl/site-growth', label: 'Site Growth' },
      { href: '/backend', label: 'BackEnd' },
      { href: '/brand', label: 'Brand Identity' },
      { href: '/brand/admitone', label: 'AdmitOne Brand Kit' },
      { href: '/branding', label: 'CottageHumble Brand Hub' },
      { href: '/markers', label: 'Ecosystem Markers' },
      { href: '/legacy', label: 'Operator Manifest (Legacy)' },
      { href: '/system-stack', label: 'System Stack' },
      { href: '/governance', label: 'Governance' },
      { href: '/ddl/charter', label: 'Charter' },
      { href: '/dexverse', label: 'DexVerse' },
      { href: '/dexverse/dex-jr', label: 'Dex Jr. (Seat 1010)' },
      { href: '/knowledge-vault', label: 'Knowledge Vault' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/methodology/operator-loop', label: 'Operator Loop' },
      { href: '/methodology/governed-iteration', label: 'Governed Iteration' },
      { href: '/methodology/palette', label: 'Template Palette' },
      { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
      { href: '/registry', label: 'Full Registry' },
      { href: '/systems', label: 'Systems Registry' },
      { href: '/standards', label: 'Standards Registry' },
      { href: '/excelligence', label: 'Excelligence' },
      { href: '/excelligence/explorer', label: 'Excelligence Explorer' },
      { href: '/council', label: 'Council Hub' },
      { href: '/council/profiles', label: 'All Council Profiles' },
      { href: '/council/profiles/claude', label: 'Claude \u2014 Seat 1002' },
      { href: '/council/profiles/chatgpt', label: 'ChatGPT \u2014 Seat 1008' },
      { href: '/council/profiles/grok', label: 'Grok \u2014 Seat 1003' },
      { href: '/council/profiles/gemini', label: 'Gemini \u2014 Seat 1007' },
      { href: '/council/profiles/perplexity', label: 'Perplexity \u2014 Seat 1004' },
      { href: '/council/profiles/copilot', label: 'Copilot \u2014 Seat 1005' },
      { href: '/council/profiles/meta-ai', label: 'Meta AI \u2014 Seat 1006' },
      { href: '/council/profiles/lechat', label: 'LeChat \u2014 Seat 1001' },
      { href: '/council/profiles/deepseek', label: 'DeepSeek \u2014 Seat 1009' },
      { href: '/council/1010', label: 'Seat 1010 \u2014 Dex Jr.' },
      { href: '/council/auto-council', label: 'AutoCouncil' },
      { href: '/council/scaling', label: 'Scaling' },
      { href: '/council/review-system', label: 'Review System' },
      { href: '/council/faq', label: 'FAQ' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/dexos', label: 'DexOS' },
      { href: '/framework/pss', label: 'Prompt Strategy System' },
      { href: '/framework/vibe-coding', label: 'Vibe Coding with Governance' },
      { href: '/guides/llm', label: 'LLM Setup Guide' },
      { href: '/projects', label: 'All Projects' },
      { href: '/projects/drinks-o-system', label: 'Drinks-O-System' },
      { href: '/projects/graceful-beauty', label: 'Graceful Beauty' },
      { href: '/projects/integrityos', label: 'IntegrityOS' },
      { href: '/projects/nomadic-notary', label: 'Nomadic Notary' },
      { href: '/projects/sprinkles', label: 'Sprinkles & Co' },
      { href: '/chronicle/the-consolidation', label: 'The Consolidation' },
      { href: '/knowledge/glossary', label: 'Trademark Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
      { href: '/ai', label: 'AI Overview' },
      { href: '/sitemap', label: 'Site Map' },
    ],
  },
  {
    label: 'D&A', color: C.amber, tag: 'Analytics',
    tagline: 'Analytics hub, dashboards, recaps.',
    routes: [
      { href: '/analytics', label: 'Analytics Hub' },
      { href: '/analytics/grammarly', label: 'Grammarly \u2014 4.57M Words' },
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
      { href: '/recaps', label: 'Year-End Recaps' },
      { href: '/recaps/apple-music', label: 'Apple Music Replay' },
      { href: '/recaps/annual-signal', label: 'Annual Signal Report' },
      { href: '/recaps/predictions', label: 'Prediction Audit' },
      { href: '/recaps/fast-and-furious', label: 'Fast & Furious' },
      { href: '/recaps/sons-of-anarchy', label: 'Sons of Anarchy' },
      { href: '/recaps/duolingo', label: 'Duolingo' },
      { href: '/excelligence', label: 'Excelligence \u2014 Landing' },
      { href: '/excelligence/explorer', label: 'Excelligence \u2014 Graph Explorer' },
    ],
  },
  {
    label: 'BlindSpot', color: C.daGreen, tag: 'Products',
    tagline: 'Sports betting analytics. blindspot.bet.',
    routes: [
      { href: '/blindspot', label: 'BlindSpot Hub' },
      { href: '/blindspot/betting', label: 'blindspot.bet \u2014 Betting Analytics' },
      { href: '/blindspot/trading', label: 'Trading Dashboard' },
      { href: '/blindspot/steam', label: 'Steam Library Analytics' },
      { href: '/blindspot/campaign', label: 'D&D Campaign Analytics' },
      { href: '/blindspot/betting', label: 'Betting' },
      { href: '/blindspot/backtest', label: 'Backtest' },
      { href: '/blindspot/llm', label: 'LLM Setup' },
      { href: '/positionbook', label: 'PositionBook \u2014 D&A Sister Product' },
      { href: '/slopestat', label: 'SlopeStat \u2014 Rider Card' },
    ],
  },
  {
    label: 'DexVerse', color: C.violet, tag: 'Lore',
    tagline: 'Origin stories, companions, lore, glossary.',
    routes: [
      { href: '/dexlore', label: 'DexLore Hub' },
      { href: '/dexlore/continuum', label: 'The Continuum' },
      { href: '/dexlore/council', label: 'Companions' },
      { href: '/dexverse/origin', label: 'DexVerse Origin' },
      { href: '/dexverse/build-log', label: 'Build Log' },
      { href: '/dexverse/howlround', label: 'Howlround' },
      { href: '/dexverse/lotr', label: 'Council of the DexVerse' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/mindframe/recursive', label: 'Recursive' },
      { href: '/mindframe/what-are-you-feeling', label: 'What Are You Feeling' },
      { href: '/knowledge/glossary', label: 'Canon Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/methodology/palette', label: 'Template Palette' },
      { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
      { href: '/other-works', label: 'Other Works' },
      { href: '/forewords', label: 'Foreword Convergence' },
    ],
  },
  {
    label: 'Story', color: C.crimson, tag: 'Memoir',
    tagline: 'Little to Know Experience. Weekly on Substack.',
    routes: [
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
    label: 'Dossiers', color: C.green, tag: 'Characters',
    tagline: 'Character archive across three universes.',
    routes: [
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
    label: 'The Bench', color: C.steel, tag: 'Tools',
    tagline: 'Software tips. OneNote to PowerShell.',
    routes: [
      { href: '/bench', label: 'The Bench \u2014 Landing' },
      { href: '/bench/onenote', label: 'OneNote' },
      { href: '/bench/excel', label: 'Excel' },
      { href: '/bench/word', label: 'Word' },
      { href: '/bench/visio', label: 'Visio' },
      { href: '/bench/cmd', label: 'CMD' },
      { href: '/bench/powershell', label: 'PowerShell' },
      { href: '/bench/adobe', label: 'Adobe Acrobat' },
    ],
  },
  {
    label: 'CanonPress', color: C.crimson, tag: 'Publication',
    tagline: 'Governed publication. Four series.',
    routes: [
      { href: '/canonpress', label: 'CanonPress Hub' },
      { href: '/canonpress/converge', label: 'Converge' },
      { href: '/canonpress/converge/schedule', label: 'Schedule' },
      { href: '/canonpress/converge/tuning-log', label: 'Tuning Log' },
      { href: '/canonpress/redline', label: 'RedLine' },
      { href: '/canonpress/redline/rl-001', label: 'RL-001' },
      { href: '/canonpress/deepcut', label: 'DeepCut' },
      { href: '/canonpress/deepcut/dc-001', label: 'DC-001 \u2014 The Recursion Problem' },
      { href: '/canonpress/groundtruth', label: 'GroundTruth' },
      { href: '/canonpress/groundtruth/gt-002', label: "GT-002 \u2014 The Outfit Doesn't Kill the Idea" },
      { href: '/canonpress/inside-insights', label: 'InsideInsights' },
    ],
  },
  {
    label: 'AuditForge', color: C.teal, tag: 'Product',
    tagline: 'Governed audit document generation.',
    routes: [
      { href: '/auditforge', label: 'AuditForge Landing' },
      { href: '/auditforge/current', label: 'Current Build' },
      { href: '/auditforge/branding', label: 'Brand Kit' },
      { href: '/auditforge/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'WorkBench', color: C.crimson, tag: 'Modular OS',
    tagline: 'The modular business OS. 17 modules. One substrate.',
    routes: [
      { href: '/workbench', label: 'WorkBench Wing' },
      { href: '/workbench/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Ledger', color: C.amber, tag: 'Credentials',
    tagline: 'The verified credential layer.',
    routes: [
      { href: '/ledger', label: 'Ledger Wing' },
      { href: '/ledger/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Excelligence', color: C.amber, tag: 'Knowledge',
    tagline: 'Excel knowledge, governed and graphed.',
    routes: [
      { href: '/excelligence', label: 'Excelligence Wing' },
      { href: '/excelligence/explorer', label: 'Graph Explorer' },
      { href: '/excelligence/poster', label: 'Poster' },
      { href: '/excelligence/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Products', color: C.blue, tag: 'Concepts',
    tagline: 'Concept products and design mockups.',
    routes: [
      { href: '/products/behavioral-intelligence', label: 'Behavioral Intelligence' },
      { href: '/products/behavioral-intelligence/story', label: 'The Story Behind It' },
      { href: '/products/behavioral-intelligence/exec', label: 'Executive Concept' },
      { href: '/products/behavioral-intelligence/brief', label: 'Product Brief' },
      { href: '/prioritease', label: 'PrioritEase' },
      { href: '/work/rexcel', label: 'r/Excel' },
    ],
  },
  {
    label: 'About', color: C.muted, tag: 'Info',
    tagline: 'Operator profile and social hub.',
    routes: [
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
    ],
  },
];

const totalRoutes = wings.reduce((sum, w) => sum + w.routes.length, 0);

function WingCard({ wing, isOpen, onToggle }) {
  return (
    <div style={{
      background: isOpen ? C.cardHi : C.card,
      border: `1px solid ${isOpen ? wing.color + '40' : C.border}`,
      borderTop: `2px solid ${isOpen ? wing.color : 'transparent'}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'all 0.15s',
      cursor: 'pointer',
    }} onClick={onToggle}>

      {/* Header */}
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: '1rem', color: isOpen ? wing.color : C.cream, transition: 'color 0.15s' }}>
            {wing.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontFamily: font.mono, fontSize: '0.5rem', color: wing.color, background: wing.color + '18', padding: '3px 7px', borderRadius: 3, letterSpacing: '0.08em' }}>
              {wing.tag}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: '0.55rem', color: C.muted }}>
              {wing.routes.length}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: '0.6rem', color: C.muted, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              &#x25BE;
            </div>
          </div>
        </div>
        <div style={{ fontFamily: font.body, fontSize: '0.75rem', color: isOpen ? C.dim : 'rgba(245,241,235,0.35)', lineHeight: 1.5, transition: 'color 0.15s' }}>
          {wing.tagline}
        </div>
      </div>

      {/* Routes */}
      {isOpen && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 18px 16px' }}
          onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {wing.routes.map(route => (
              <Link key={route.href + route.label} href={route.href} style={{
                fontFamily: font.mono, fontSize: '0.65rem',
                color: wing.color, textDecoration: 'none',
                padding: '4px 0',
                borderBottom: `1px solid rgba(245,241,235,0.03)`,
                display: 'block',
              }}>
                {route.label} &#x2192;
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteMap() {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState('');

  const toggle = (label) => setOpen(open === label ? null : label);

  const displayed = filter
    ? wings.map(w => ({
        ...w,
        routes: w.routes.filter(r => r.label.toLowerCase().includes(filter.toLowerCase())),
      })).filter(w => w.routes.length > 0 || w.label.toLowerCase().includes(filter.toLowerCase()))
    : wings;

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: font.body }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.amber, letterSpacing: '0.2em', marginBottom: 12 }}>
            DDL &middot; SITE MAP
          </div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Everything
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 12, color: C.muted }}>
            {totalRoutes} routes across {wings.length} wings.
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Filter routes..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              width: '100%', maxWidth: 400,
              background: C.card, border: `1px solid rgba(245,241,235,0.12)`,
              borderRadius: 6, padding: '8px 14px',
              fontFamily: font.mono, fontSize: 12,
              color: C.cream, outline: 'none',
            }}
          />
        </div>

        {/* Wing cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {displayed.map(wing => (
            <WingCard
              key={wing.label}
              wing={wing}
              isOpen={open === wing.label}
              onToggle={() => toggle(wing.label)}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted }}>
            {totalRoutes} routes &middot; {wings.length} wings &middot; dropdownlogistics.com
          </span>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted }}>
            Chaos &#x2192; Structured &#x2192; Automated
          </span>
        </div>

      </div>
    </div>
  );
}

