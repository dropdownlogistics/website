'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', amber: '#C49A3C',
  violet: '#8a6cc9', green: '#4A9E6B', blue: '#6B9DC2',
  steel: '#4A7C9B', teal: '#2C7A7B',
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
      { href: '/projects', label: 'All Projects' },
      { href: '/projects/drinks-o-system', label: 'Drinks-O-System' },
      { href: '/projects/graceful-beauty', label: 'Graceful Beauty' },
      { href: '/projects/integrityos', label: 'IntegrityOS' },
      { href: '/projects/nomadic-notary', label: 'Nomadic Notary' },
      { href: '/projects/sprinkles', label: 'Sprinkles & Co' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/dexos', label: 'DexOS' },
      { href: '/framework/pss', label: 'Prompt Strategy System' },
      { href: '/framework/vibe-coding', label: 'Vibe Coding with Governance' },
      { href: '/guides/llm', label: 'LLM Setup Guide' },
      { href: '/prioritease', label: 'PrioritEase' },
      { href: '/work/rexcel', label: 'r/Excel' },
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
      { href: '/ai', label: 'AI Overview' },
      { href: '/backend', label: 'BackEnd' },
      { href: '/sitemap', label: 'Site Map' },
    ],
  },
  {
    label: 'D&A', color: C.amber, routes: [
      { href: '/blindspot', label: 'BlindSpot Hub' },
      { href: '/blindspot/trading', label: 'Trading Dashboard' },
      { href: '/blindspot/steam', label: 'Steam Library Analytics' },
      { href: '/blindspot/campaign', label: 'D&D Campaign Analytics' },
      { href: '/blindspot/betting', label: 'Betting' },
      { href: '/blindspot/backtest', label: 'Backtest' },
      { href: '/blindspot/llm', label: 'LLM Setup' },
      { href: '/analytics', label: 'Analytics Hub' },
      { href: '/analytics/grammarly', label: 'Grammarly — 4.57M Words' },
      { href: '/analytics/tone', label: 'Tone Analysis' },
      { href: '/analytics/memoir', label: 'Memoir Analytics' },
      { href: '/analytics/dexdash', label: 'DexDash' },
      { href: '/analytics/catnip-map', label: 'Catnip Map' },
      { href: '/analytics/dimensional-map', label: 'Dimensional Map' },
      { href: '/analytics/build-log', label: 'Build Log' },
      { href: '/analytics/callback-engine', label: 'Callback Engine' },
      { href: '/analytics/sonic-thread', label: 'Sonic Thread' },
      { href: '/recaps', label: 'Year-End Recaps' },
      { href: '/recaps/apple-music', label: 'Apple Music Replay' },
      { href: '/recaps/annual-signal', label: 'Annual Signal Report' },
      { href: '/recaps/predictions', label: 'Prediction Audit' },
    ],
  },
  {
    label: 'DexVerse', color: C.violet, routes: [
      { href: '/dexlore', label: 'DexLore Hub' },
      { href: '/dexlore/continuum', label: 'The Continuum' },
      { href: '/dexlore/council', label: 'Companions' },
      { href: '/dexverse/origin', label: 'DexVerse Origin' },
      { href: '/dexverse/build-log', label: 'Build Log' },
      { href: '/dexverse/howlround', label: 'Howlround' },
      { href: '/dexverse/lotr', label: 'Council of the DexVerse' },
      { href: '/knowledge/glossary', label: 'Canon Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/methodology/palette', label: 'Template Palette' },
      { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
      { href: '/other-works', label: 'Other Works' },
      { href: '/forewords', label: 'Foreword Convergence' },
    ],
  },
  {
    label: 'Dossiers', color: C.green, routes: [
      { href: '/dossiers', label: 'All Dossiers' },
      { href: '/dossiers/feliciano', label: 'Feliciano' },
      { href: '/dossiers/hillie', label: 'Hillie' },
      { href: '/dossiers/ash-snow-steel', label: 'Ash, Snow & Steel' },
      { href: '/dossiers/merrick', label: 'Merrick' },
      { href: '/dossiers/riflen', label: 'Riflen' },
      { href: '/dossiers/doc-rickets', label: 'Doc Rickets' },
      { href: '/dossiers/fort-joy', label: 'Fort Joy Ledger' },
      { href: '/dossiers/xuth-jr', label: 'Xuth Leafshadow Jr.' },
      { href: '/dossiers/xuth-iii', label: 'Xuth Leafshadow III' },
      { href: '/dossiers/xuth-sr', label: 'Xuth Leafshadow Sr.' },
      { href: '/dossiers/leafshadow-lineage', label: 'Leafshadow Lineage' },
      { href: '/dossiers/hal-style-lock', label: 'Hal Style Lock' },
      { href: '/dossiers/campaign-analytics', label: 'Campaign Analytics' },
      { href: '/dossiers/operator', label: 'The Operator' },
    ],
  },
  {
    label: 'The Bench', color: C.steel, routes: [
      { href: '/bench', label: 'The Bench — Landing' },
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
    label: 'CanonPress', color: C.crimson, routes: [
      { href: '/canonpress', label: 'CanonPress Hub' },
      { href: '/canonpress/converge', label: 'Converge' },
      { href: '/canonpress/converge/week-01', label: 'Week 01' },
      { href: '/canonpress/schedule', label: 'Schedule' },
      { href: '/canonpress/tuning-log', label: 'Tuning Log' },
      { href: '/canonpress/redline', label: 'RedLine' },
      { href: '/canonpress/deepcut', label: 'DeepCut' },
      { href: '/canonpress/deepcut/dc-001', label: 'DC-001 — The Recursion Problem' },
      { href: '/canonpress/groundtruth', label: 'GroundTruth' },
      { href: '/canonpress/groundtruth/gt-001', label: 'GT-001 — Watching the System Run' },
      { href: '/canonpress/groundtruth/gt-002', label: 'GT-002 — The Outfit Doesn\'t Kill the Idea' },
    ],
  },
  {
    label: 'AuditForge', color: C.teal, routes: [
      { href: '/auditforge', label: 'AuditForge Landing' },
      { href: '/auditforge/current', label: 'Current Build' },
      { href: '/auditforge/branding', label: 'Brand Kit' },
      { href: '/auditforge/architecture', label: 'Architecture' },
      { href: '/auditforge/features', label: 'Features' },
    ],
  },
  {
    label: 'Memoir', color: C.crimson, routes: [
      { href: '/memoir', label: 'Little to Know Experience' },
      { href: '/memoir/reading-room', label: 'Reading Room' },
      { href: '/memoir/architecture', label: 'How the Memoir Was Built' },
      { href: '/memoir/dashboard', label: 'Memoir Dashboard' },
      { href: '/memoir/braid', label: 'The Braid' },
      { href: '/memoir/false-summit', label: 'False Summit' },
      { href: '/memoir/reckoning', label: 'The Reckoning' },
      { href: '/memoir/reconciliation', label: 'Reconciliation' },
      { href: '/memoir/quiet-and-chase', label: 'Quiet and Chase' },
      { href: '/memoir/spiral-and-turning', label: 'Spiral and Turning' },
      { href: '/memoir/mask-and-cracks', label: 'Mask and Cracks' },
      { href: '/memoir/the-protocol', label: 'The Protocol' },
      { href: '/memoir/map-of-13j', label: 'Map of 13J' },
      { href: '/memoir/informed-patient', label: 'The Informed Patient' },
      { href: '/memoir/clinical-instrument', label: 'Clinical Instrument' },
      { href: '/memoir/psychometric-archaeology', label: 'Psychometric Archaeology' },
      { href: '/memoir/measurement-arc', label: 'Measurement Arc' },
      { href: '/memoir/release-calendar', label: 'Release Calendar' },
    ],
  },
];

const totalRoutes = wings.reduce((sum, w) => sum + w.routes.length, 0);

export default function SiteMap() {
  const [activeWing, setActiveWing] = useState(null);

  const displayed = activeWing
    ? wings.filter(w => w.label === activeWing)
    : wings;

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: font.body }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.amber, letterSpacing: '0.2em', marginBottom: 12 }}>
            DDL · SITE MAP
          </div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Everything
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim }}>
            {totalRoutes} routes across {wings.length} wings.
          </div>
        </div>

        {/* Wing filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          <button
            onClick={() => setActiveWing(null)}
            style={{
              fontFamily: font.mono, fontSize: 11, padding: '5px 12px', borderRadius: 4,
              border: '1px solid ' + (activeWing === null ? C.amber : C.border),
              background: activeWing === null ? 'rgba(196,154,60,0.1)' : 'transparent',
              color: activeWing === null ? C.amber : C.creamDim,
              cursor: 'pointer',
            }}
          >All</button>
          {wings.map(w => (
            <button
              key={w.label}
              onClick={() => setActiveWing(activeWing === w.label ? null : w.label)}
              style={{
                fontFamily: font.mono, fontSize: 11, padding: '5px 12px', borderRadius: 4,
                border: '1px solid ' + (activeWing === w.label ? w.color : C.border),
                background: activeWing === w.label ? w.color + '18' : 'transparent',
                color: activeWing === w.label ? w.color : C.creamDim,
                cursor: 'pointer',
              }}
            >{w.label}</button>
          ))}
        </div>

        {/* Wings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {displayed.map(wing => (
            <div key={wing.label}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid ' + C.border }}>
                <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: '1.1rem', color: wing.color }}>
                  {wing.label}
                </span>
                <span style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim }}>
                  {wing.routes.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {wing.routes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    style={{
                      fontFamily: font.mono, fontSize: 11,
                      color: C.creamMid, textDecoration: 'none',
                      padding: '5px 10px', borderRadius: 4,
                      border: '1px solid transparent',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = wing.color;
                      e.currentTarget.style.borderColor = wing.color + '30';
                      e.currentTarget.style.background = wing.color + '08';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = C.creamMid;
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {route.label}
                    <span style={{ fontSize: 9, opacity: 0.4 }}>{route.href}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid ' + C.border, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim }}>
            {totalRoutes} routes &middot; {wings.length} wings &middot; dropdownlogistics.com
          </span>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim }}>
            Chaos &#x2192; Structured &#x2192; Automated
          </span>
        </div>

      </div>
    </div>
  );
}
