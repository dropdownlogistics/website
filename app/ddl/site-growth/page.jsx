'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)", crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════

const costBreakdown = [
  { item: "Domain (Cloudflare)", cost: "$12/yr" },
  { item: "Hosting (Vercel Hobby)", cost: "Free" },
  { item: "SSL Certificate", cost: "Free" },
  { item: "Fonts (Google Fonts)", cost: "Free" },
  { item: "Framework (Next.js)", cost: "Free" },
  { item: "Design System", cost: "Free" },
  { item: "Build Labor (AI-assisted)", cost: "Free" },
];

const brandLanes = [
  { name: "CottageHumble", scope: "DDL infrastructure, systems, methodology", palette: "Navy #0D1B2A · Crimson #B23531 · Cream #F5F1EB", fonts: "Space Grotesk · JetBrains Mono · Source Serif 4", color: C.crimson },
  { name: "D&A", scope: "BlindSpot analytics pages", palette: "Navy #0D2137 · Green #22C55E · Mint #86EFAC", fonts: "JetBrains Mono · DM Sans", color: C.green },
  { name: "Memoir", scope: "Little to Know Experience pages", palette: "Black #0a0a0f · Crimson #c73e3e", fonts: "JetBrains Mono · Source Serif 4 · DM Sans", color: C.rose },
];

const siteTimeline = [
  {
    phase: "Genesis",
    date: "Feb 27, 2026",
    color: C.crimson,
    events: [
      "Boot prompt written — 10-page architecture document before a single line of code",
      "Domain purchased: dropdownlogistics.com ($12/year on Cloudflare)",
      "Vercel account created (free tier)",
      "GitHub repo initialized",
      "Next.js 14 scaffolded with TypeScript + Tailwind",
      "8 placeholder pages deployed — site is live with a URL before anything is built",
    ],
    metric: { value: "1", label: "session to go live" },
    quote: "Not a portfolio. Not a blog. Not a landing page. This is the public-facing surface of everything Dave has built.",
  },
  {
    phase: "Foundation",
    date: "Feb 28, 2026",
    color: C.amber,
    events: [
      "DDL favicon system (crimson DD circuit board mark, all sizes)",
      "Landing page: hero, animated stat counters, artifact grid, memoir teaser",
      "About page: bio, 8 DDL tenets, methodology timeline",
      "Foreword Convergence → /forewords (first real artifact deployed)",
      "Design tokens locked: navy, crimson, wine, cream",
      "Font stack established: Space Grotesk + Source Serif 4 + JetBrains Mono",
    ],
    metric: { value: "3", label: "live pages with real content" },
    quote: "When someone asks 'what is DDL?' the answer is a URL.",
  },
  {
    phase: "Analytics Suite",
    date: "Late Feb – Early Mar",
    color: C.blue,
    events: [
      "Analytics hub page with 4 dashboard cards",
      "Grammarly Insights: 47 weeks, 4.57M words, productivity/tone/percentiles",
      "Tone Fingerprint: voice comparison vs average user, radar charts",
      "DexDash: 293K messages, 10 relationships, hourly heatmaps",
      "Memoir Analysis: 49 excerpts, emotional intensity arc, thematic clusters",
      "recharts dependency added, ANALYTICS nav item with sub-route highlighting",
    ],
    metric: { value: "8", label: "live pages" },
    quote: "Node.js installed on my machine. I have zero prior web dev experience but understand the mental model: route = folder, component = page, git push = live.",
  },
  {
    phase: "Multi-Brand Architecture",
    date: "Early March 2026",
    color: C.green,
    events: [
      "Three brand lanes formalized: CottageHumble, D&A, Memoir",
      "SiteNav.tsx built — dropdown menus, mobile hamburger, sub-route highlighting",
      "BlindSpot pages begin (D&A brand): trading dashboard, campaign dashboard rebranded",
      "CottageHumble rebrand queue defined: 3 files to remap from legacy palettes",
      "8 preview pages identified for production graduation",
      "Artifact conversion pattern documented (JSX → page.tsx in 8 steps)",
    ],
    metric: { value: "3", label: "brand systems running in parallel" },
    quote: null,
  },
  {
    phase: "DEXLORE Layer",
    date: "Early–Mid March",
    color: C.violet,
    events: [
      "12 files built for the narrative/myth layer of the DexVerse",
      "Lore Hub: 5-era navigator, companion previews, closing quote",
      "Dynamic Era Pages: scroll-like reading, 700px column, serif headlines",
      "Council Canon: 12 companion profiles (6 active, 6 archived), reflection logs",
      "Continuum Map: pure SVG horizontal timeline, 16 nodes, dual lineage flows",
      "New nav group added to SiteNav.tsx — one array push, zero existing code touched",
    ],
    metric: { value: "8", label: "new routes in one layer" },
    quote: "This layer is story, not analytics. Serif headlines feel carved, not typed. Crimson accents feel like embers in darkness.",
  },
  {
    phase: "Dossier Wing",
    date: "Early–Mid March",
    color: C.ember,
    events: [
      "13 HTML pages: RPG character dossiers across 3 game systems",
      "6 character dossiers: Merrick, Feliciano, Hillie, Xuth Jr., Xuth III, Xuth Sr.",
      "2 scaffolds: Riflen, Doc Rickets (structure ready, stats placeholder)",
      "5 supporting docs: party registries, lineage chronicle, governance codex, analytics",
      "BlindSpot engine applied to RPG data: d20 roll analytics, spotlight share, Hex uptime",
      "DDL methodology proven in creative domain — star schema thinking for campaign data",
    ],
    metric: { value: "13", label: "pages in one wing" },
    quote: "If we can systematize a 56-level Argonian's cheese wheel economy, we can systematize your operations.",
  },
  {
    phase: "Product Concept Suite",
    date: "Early–Mid March",
    color: C.rose,
    events: [
      "\"A Conversation That Listens Back\" — behavioral intelligence product concept",
      "CHRONICLE: origin story, 8 instruments across 24 years, TED-talk format",
      "CONSOLE: user-facing landing page with interactive scenario picker",
      "CONSOLE (exec): investor one-pager, KPI strip, competitive matrix",
      "ATLAS: full product brief with sticky sidebar, 7 deep-dive sections",
      "MindFrame calibration engines + Council convergence as product architecture",
    ],
    metric: { value: "4", label: "template types for one concept" },
    quote: "A Conversation That Listens Back.",
  },
  {
    phase: "The 14-Hour Session",
    date: "Feb 27–28, 2026",
    color: C.crimson,
    events: [
      "Apple Music Replay 2025 deep dive — 84 songs, 20 artists, 15 albums from 5 screenshots",
      "Annual Signal Report — 4 platforms unified in one cross-platform behavioral analysis",
      "Prediction vs. Actuals audit — 0/25 hit rate, formal adverse opinion, genre inversion",
      "PSS Proposal (ATLAS) — full project proposal rendered as structured reference",
      "PSS Strategy Index (LEDGER) — filterable registry seeded with 12 entries",
      "PSS Strategy Packets (CODEX) — 26 strategies in 6 packets, v0.1 target exceeded",
      "1 context compaction survived. Zero data loss. Zero design drift.",
    ],
    metric: { value: "7", label: "pages in one session" },
    quote: "The session started with Apple Music screenshots and ended with a governance-grade strategy library.",
  },
];

const sessionBreakdown = [
  {
    num: 1, file: "apple-music-replay.jsx", template: "CONSOLE", section: "Year-End Recaps",
    desc: "Full Apple Music Replay 2025 deep dive. 5 tabs, 20 artists, 84 songs, 15 albums, genre-coded, behavioral insights.",
    color: C.crimson, dataPoints: "119 data entities extracted from screenshots",
  },
  {
    num: 2, file: "annual-signal-report.jsx", template: "CONSOLE", section: "Year-End Recaps",
    desc: "Unified cross-platform 2025 report. PlayStation, Xbox/Steam, YouTube, Apple Music. Behavioral pattern analysis.",
    color: C.blue, dataPoints: "4 platforms, 2,000+ hours tracked",
  },
  {
    num: 3, file: "prediction-vs-actuals.jsx", template: "CONSOLE", section: "Year-End Recaps",
    desc: "AI prediction accuracy audit. Blind guesses vs actual data. 0/25 match rate. Formal adverse opinion in audit language.",
    color: C.amber, dataPoints: "50 predictions scored, 5 root causes identified",
  },
  {
    num: 4, file: "pss-proposal.jsx", template: "ATLAS", section: "Prompt Strategy System",
    desc: "Project proposal rendered as structured reference. 8 sections, sidebar nav, data model, workflow pipeline.",
    color: C.green, dataPoints: "16 data model fields defined",
  },
  {
    num: 5, file: "pss-strategy-index.jsx", template: "LEDGER", section: "Prompt Strategy System",
    desc: "Filterable strategy registry with search, filters, expandable detail rows, packet distribution.",
    color: C.violet, dataPoints: "12 strategies seeded from real work",
  },
  {
    num: 6, file: "pss-strategy-packets.jsx", template: "CODEX", section: "Prompt Strategy System",
    desc: "26 strategies in 6 themed packets. Nested expand/collapse. Every entry from actual DDL builds.",
    color: C.ember, dataPoints: "26 strategies, 6 packets — v0.1 target exceeded",
  },
  {
    num: 7, file: "site-growth-chronicle.jsx", template: "CHRONICLE", section: "Meta",
    desc: "This page. The story of the site's growth and the session that produced it.",
    color: C.rose, dataPoints: "9 source documents synthesized",
  },
];

const templateUsage = [
  { name: "CONSOLE", count: 3, desc: "KPI + viz + data grids", color: C.crimson, used: true },
  { name: "ATLAS", count: 1, desc: "Structured reference + sidebar", color: C.blue, used: true },
  { name: "LEDGER", count: 1, desc: "Filterable registry", color: C.green, used: true },
  { name: "CODEX", count: 1, desc: "Expandable disclosure bundles", color: C.amber, used: true },
  { name: "CHRONICLE", count: 1, desc: "Narrative timeline", color: C.violet, used: true },
  { name: "DOSSIER", count: 0, desc: "Entity spotlight", color: C.creamDim, used: false },
];

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function PullQuote({ children, color = C.crimson }) {
  return (
    <div style={{
      padding: "16px 20px", margin: "16px 0", borderLeft: `3px solid ${color}`,
      background: color + "08", borderRadius: "0 7px 7px 0",
    }}>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

function MetricCard({ value, label, color, sub }) {
  return (
    <div style={{
      flex: "1 1 130px", background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 7, padding: "18px 14px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.6 }} />
      <div style={{ fontFamily: font.mono, fontSize: 32, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, fontStyle: "italic", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function SiteGrowthChronicle() {
  const [expandedPhase, setExpandedPhase] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
html{scroll-behavior:smooth}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fade-up{animation:fadeUp 0.6s ease both}
.fade-d1{animation-delay:0.1s}.fade-d2{animation-delay:0.2s}.fade-d3{animation-delay:0.3s}.fade-d4{animation-delay:0.4s}
`}</style>

      {/* ═══ Hero ═══ */}
      <div style={{
        padding: "56px 24px 40px",
        background: `linear-gradient(180deg, ${C.crimson}12 0%, transparent 60%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }} className="fade-up">
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
            DDL · CHRONICLE · SITE GROWTH REPORT
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 700, color: C.cream, lineHeight: 1.1, marginBottom: 8 }}>
            From <span style={{ color: C.crimson }}>$12/year</span> to<br />Cathedral
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.7, maxWidth: 600, fontStyle: "italic" }}>
            The story of dropdownlogistics.com — built by a CPA with zero web dev experience, an AI collaborator, and the conviction that governance-grade systems deserve a public URL.
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 20, opacity: 0.5 }} />
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

        {/* ═══ Act I: The Numbers ═══ */}
        <div style={{ marginTop: 40, marginBottom: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>The Numbers</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }} className="fade-up fade-d1">
          <MetricCard value="$12" label="Annual Cost" color={C.green} sub="Domain only. Everything else is free." />
          <MetricCard value="50+" label="Pages Built" color={C.crimson} sub="Across 3 brand systems" />
          <MetricCard value="6" label="Template Types" color={C.blue} sub="CHRONICLE · ATLAS · CODEX · LEDGER · DOSSIER · CONSOLE" />
          <MetricCard value="0" label="Prior Web Dev Experience" color={C.amber} sub="route = folder, push = live" />
        </div>

        {/* Cost breakdown */}
        <div style={{ marginTop: 16, background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 16px" }} className="fade-up fade-d2">
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Total Cost of Ownership</div>
          {costBreakdown.map((c, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "4px 0",
              borderBottom: i < costBreakdown.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{c.item}</span>
              <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: c.cost === "Free" ? C.green : C.cream }}>{c.cost}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", marginTop: 6, borderTop: `1px solid ${C.borderMed}` }}>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.cream }}>Total</span>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.green }}>$12/year</span>
          </div>
        </div>

        {/* Brand lanes */}
        <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }} className="fade-up fade-d3">
          {brandLanes.map(b => (
            <div key={b.name} style={{
              flex: "1 1 200px", background: C.card, border: `1px solid ${b.color}20`,
              borderRadius: 7, padding: "14px", borderLeft: `3px solid ${b.color}`,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: b.color, marginBottom: 4 }}>{b.name}</div>
              <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamMid, lineHeight: 1.5, marginBottom: 6 }}>{b.scope}</div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, lineHeight: 1.6 }}>{b.palette}</div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>{b.fonts}</div>
            </div>
          ))}
        </div>

        <PullQuote color={C.amber}>The most expensive part of this project is the domain name. Everything else is free. The value is in the artifacts, and those already exist.</PullQuote>

        {/* ═══ Act II: The Timeline ═══ */}
        <div style={{ marginTop: 48, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, letterSpacing: "0.2em", textTransform: "uppercase" }}>Growth Timeline</div>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6, marginTop: 8, maxWidth: 600 }}>
            Eight phases from boot prompt to a multi-brand, multi-layer site. Each phase delivered something live. Zero phases were "planning only."
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{
            position: "absolute", left: 15, top: 4, bottom: 4, width: 2,
            background: `linear-gradient(180deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet}, ${C.ember}, ${C.rose}, ${C.crimson})`,
          }} />

          {siteTimeline.map((phase, pi) => {
            const isOpen = expandedPhase === pi;
            return (
              <div key={pi} style={{ position: "relative", marginBottom: 12 }}>
                {/* Node */}
                <div style={{
                  position: "absolute", left: -33, top: 14, width: 14, height: 14, borderRadius: "50%",
                  background: phase.color + "30", border: `2px solid ${phase.color}`,
                }} />

                <div style={{
                  background: C.card, border: `1px solid ${isOpen ? phase.color + "40" : C.border}`,
                  borderRadius: 7, overflow: "hidden", transition: "border-color 0.2s",
                }}>
                  {/* Header */}
                  <div onClick={() => setExpandedPhase(isOpen ? null : pi)} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                    cursor: "pointer", userSelect: "none",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 700, color: C.cream }}>{phase.phase}</span>
                        <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>{phase.date}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: phase.color }}>{phase.metric.value}</span>
                      <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>{phase.metric.label}</span>
                    </div>
                    <span style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▸</span>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: "12px 0" }}>
                        {phase.events.map((e, i) => (
                          <div key={i} style={{
                            display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6,
                          }}>
                            <span style={{ fontFamily: font.mono, fontSize: 10, color: phase.color, marginTop: 3, flexShrink: 0 }}>→</span>
                            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{e}</span>
                          </div>
                        ))}
                      </div>
                      {phase.quote && (
                        <div style={{ padding: "10px 14px", borderLeft: `2px solid ${phase.color}40`, background: phase.color + "06", borderRadius: "0 5px 5px 0" }}>
                          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>"{phase.quote}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ Act III: The 14-Hour Session ═══ */}
        <div style={{ marginTop: 56 }}>
          <div style={{
            padding: "24px 20px", background: `linear-gradient(135deg, ${C.crimson}12, ${C.amber}08)`,
            border: `1px solid ${C.crimson}25`, borderRadius: 9,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 10 }}>ACT III — THE 14-HOUR SESSION</div>
            <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>
              Seven Pages. One Compaction.<br />Zero Design Drift.
            </h2>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7, maxWidth: 580 }}>
              What started as "extract my Apple Music Replay from these screenshots" became a full year-end recap suite, a cross-thread prediction audit, and the entire v0.1 of a Prompt Strategy System — including 26 real strategies extracted from actual DDL work sessions.
            </p>
          </div>
        </div>

        {/* Session KPIs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <MetricCard value="7" label="Pages Shipped" color={C.crimson} />
          <MetricCard value="5" label="Template Types Used" color={C.blue} sub="of 6 total" />
          <MetricCard value="26" label="Strategies Indexed" color={C.green} sub="v0.1 target: 25" />
          <MetricCard value="1" label="Compactions Survived" color={C.amber} sub="Zero data loss" />
        </div>

        {/* Session timeline — each page */}
        <div style={{ marginTop: 24, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Build Sequence</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sessionBreakdown.map(s => (
            <div key={s.num} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "14px 16px", borderLeft: `3px solid ${s.color}`,
              display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 5, background: s.color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: s.color, flexShrink: 0,
              }}>{s.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.cream }}>{s.file}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: s.color + "18", color: s.color }}>{s.template}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: C.creamGhost, color: C.creamDim }}>{s.section}</span>
                </div>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{s.desc}</div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>{s.dataPoints}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Template coverage */}
        <div style={{ marginTop: 28, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Template Coverage — This Session</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {templateUsage.map(t => (
            <div key={t.name} style={{
              flex: "1 1 120px", background: C.card, border: `1px solid ${t.used ? t.color + "30" : C.border}`,
              borderRadius: 7, padding: "12px", opacity: t.used ? 1 : 0.4,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: t.color }}>{t.name}</span>
                <span style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: t.used ? t.color : C.creamDim }}>{t.count}</span>
              </div>
              <div style={{ fontFamily: font.body, fontSize: 9, color: C.creamDim, marginTop: 2 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* The Arc */}
        <div style={{ marginTop: 32 }}>
          <PullQuote color={C.crimson}>
            The session started with Apple Music screenshots and ended with a governance-grade strategy library. The trigger for the second half was a meme.
          </PullQuote>
        </div>

        {/* ═══ Epilogue ═══ */}
        <div style={{ marginTop: 48, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.2em", textTransform: "uppercase" }}>Epilogue</div>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div style={{ maxWidth: 600 }}>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
              dropdownlogistics.com started as a boot prompt that included instructions on how to buy a domain. It now hosts a multi-brand, multi-layer site with 50+ pages across three visual identities, six template types, and a design system that maintains token-level consistency across builds done weeks apart in different threads by different model instances.
            </p>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
              The operator who wrote "I have zero prior web dev experience" now manages a git-based deployment pipeline, runs three brand systems in parallel, and produces governance-grade interactive pages at a rate of roughly one per two hours.
            </p>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
              The site costs $12 a year. The methodology is free. The artifacts already existed. The only thing that needed building was the front door.
            </p>
          </div>
        </div>

        <PullQuote color={C.violet}>CottageHumble on the surface. Cathedral underneath. Exactly like everything else Dave builds.</PullQuote>

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 48, paddingBottom: 32 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet}, ${C.rose})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

