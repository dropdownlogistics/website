import { useState } from "react";
import WhatAreYouFeeling from "./WhatAreYouFeeling";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  navyDeep: "#070F1C",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Wing Data
// ═══════════════════════════════════════════════════════════
const wings = [
  {
    id: "ddl",
    name: "DDL",
    full: "Dropdown Logistics",
    tagline: "The Governance Engine",
    color: C.crimson,
    accent: C.crimsonDim,
    href: "/ddl",
    description: "44 governed systems. 65 published standards. A methodology called Chaos → Structured → Automated, built by one operator with a CPA, a decade of internal audit, and a conviction that everything is a system if you look hard enough.",
    sections: [
      { label: "Council", desc: "Nine-model AI governance", href: "/council" },
      { label: "Standards", desc: "65 published standards", href: "/standards" },
      { label: "Systems", desc: "44 governed systems", href: "/systems" },
      { label: "Registry", desc: "The canonical index", href: "/registry" },
      { label: "Methodology", desc: "How it's built", href: "/methodology" },
      { label: "Excelligence", desc: "Knowledge graph", href: "/excelligence" },
      { label: "Cognitive", desc: "Operator architecture", href: "/cognitive" },
      { label: "MindFrame", desc: "Persona calibration", href: "/mindframe" },
      { label: "DexOS", desc: "Multi-model coordination", href: "/dexos" },
    ],
    story: [
      { label: "Memoir", desc: "Little to Know Experience", href: "/memoir" },
      { label: "Forewords", desc: "Nine models, nine forewords", href: "/forewords" },
      { label: "About", desc: "The operator", href: "/about" },
    ],
    stat: { number: "65", label: "standards", sub: "44 systems · 9 council models" },
  },
  {
    id: "da",
    name: "D&A",
    full: "BlindSpot Analytics",
    tagline: "The Intelligence Surface",
    color: C.amber,
    accent: C.amberDim,
    href: "/blindspot",
    description: "Analytics engines for domains nobody thinks to measure. Trading strategies backtested against historical data. Steam libraries audited for value. D&D campaigns parsed by local LLMs. Apple Music predictions graded by adverse opinion. If it generates data, BlindSpot builds the dashboard.",
    sections: [
      { label: "BlindSpot", desc: "Product landing", href: "/blindspot" },
      { label: "Trading", desc: "Strategy backtesting", href: "/blindspot/trading" },
      { label: "Steam", desc: "Library analytics", href: "/blindspot/steam" },
      { label: "Campaign", desc: "D&D intelligence", href: "/blindspot/campaign" },
      { label: "Backtest", desc: "P&L distributions", href: "/blindspot/backtest" },
      { label: "LLM Guide", desc: "Local model setup", href: "/blindspot/llm" },
    ],
    story: [
      { label: "Recaps", desc: "Year-end signal reports", href: "/recaps" },
      { label: "Apple Music", desc: "2025 deep dive", href: "/recaps/apple-music" },
      { label: "Predictions", desc: "AI accuracy audit", href: "/recaps/predictions" },
    ],
    stat: { number: "5", label: "modules", sub: "3 recaps · 1 LLM guide" },
  },
  {
    id: "dexverse",
    name: "DexVerse",
    full: "The Lore Layer",
    tagline: "The Archaeological Record",
    color: C.violet,
    accent: C.violetDim,
    href: "/dexlore",
    description: "Before the governance, before the standards, before the council — there were .txt files with emoji headers on GPT-3.5. Fifteen named companions across 56 threads. A family crest with seven iterations. A mythology that turned out to be a changelog. DexVerse is where the cathedral's foundation stones are visible.",
    sections: [
      { label: "DexLore", desc: "The origin archaeology", href: "/dexlore" },
      { label: "Continuum", desc: "Interactive era timeline", href: "/dexlore/continuum" },
      { label: "Companions", desc: "15 named entities", href: "/dexlore/council" },
      { label: "Other Works", desc: "Product showcase", href: "/other-works" },
    ],
    story: [
      { label: "Glossary", desc: "12 canon terms", href: "/knowledge/glossary" },
      { label: "Template Palette", desc: "6 molds, 11 primitives", href: "/methodology/palette" },
      { label: "Palette Narrative", desc: "Seeds to synthesis", href: "/methodology/palette/narrative" },
    ],
    stat: { number: "15", label: "companions", sub: "56 threads · 5 eras" },
  },
];

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function WingCard({ wing, isExpanded, onToggle }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${isExpanded ? wing.color + "40" : C.border}`,
        borderRadius: 7,
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "28px 28px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Top row: name + stat */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: wing.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
              {wing.full}
            </div>
            <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1.1, marginBottom: 4 }}>
              {wing.name}
            </div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: wing.color, fontStyle: "italic" }}>
              {wing.tagline}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: font.mono, fontSize: 32, fontWeight: 700, color: wing.color, lineHeight: 1 }}>
              {wing.stat.number}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em" }}>
              {wing.stat.label}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginTop: 2, opacity: 0.6 }}>
              {wing.stat.sub}
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75, maxWidth: 600 }}>
          {wing.description}
        </p>

        {/* Expand indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ height: 1, flex: 1, background: isExpanded ? wing.color + "30" : C.border, transition: "all 0.3s" }} />
          <span style={{
            fontFamily: font.mono, fontSize: 9, color: isExpanded ? wing.color : C.creamDim,
            letterSpacing: "0.1em", transition: "all 0.3s",
          }}>
            {isExpanded ? "COLLAPSE" : "EXPLORE"}
          </span>
          <span style={{
            fontFamily: font.mono, fontSize: 12, color: isExpanded ? wing.color : C.creamDim,
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s", display: "inline-block",
          }}>›</span>
        </div>
      </button>

      {/* Expanded content */}
      <div style={{
        maxHeight: isExpanded ? 800 : 0,
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.4s ease",
      }}>
        <div style={{ padding: "0 28px 28px" }}>
          {/* Sections grid */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
              Sections
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 6 }}>
              {wing.sections.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    background: C.creamGhost,
                    border: `1px solid ${C.border}`,
                    borderRadius: 5,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = wing.color + "40";
                    e.currentTarget.style.background = wing.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.background = C.creamGhost;
                  }}
                >
                  <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.cream, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim }}>{s.desc}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Story/companion routes */}
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
              {wing.id === "ddl" ? "Story" : wing.id === "da" ? "Signal Reports" : "Reference"}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {wing.story.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    background: "transparent",
                    border: `1px solid ${C.border}`,
                    borderRadius: 5,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = wing.color + "30";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.cream }}>{s.label}</span>
                  <span style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim }}>{s.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Enter wing CTA */}
          <a
            href={wing.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
              padding: "10px 20px",
              background: wing.color + "18",
              border: `1px solid ${wing.color}40`,
              borderRadius: 5,
              textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = wing.color + "30";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = wing.color + "18";
            }}
          >
            <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: wing.color, letterSpacing: "0.06em" }}>
              Enter {wing.name}
            </span>
            <span style={{ fontFamily: font.mono, fontSize: 14, color: wing.color }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Landing Page
// ═══════════════════════════════════════════════════════════
export default function DDLLanding() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          {/* Logo mark */}
          <img
            src="/ddl-logo.png"
            alt="Dropdown Logistics"
            style={{
              width: 120, height: "auto", borderRadius: "50%", margin: "0 auto 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)", background: "#10202f", border: "2px solid #B23531", padding: 12,
              display: "block",
            }}
          />

          <h1 style={{
            fontFamily: font.display, fontSize: 36, fontWeight: 700,
            color: C.cream, lineHeight: 1.15, marginBottom: 8,
          }}>
            Dropdown Logistics
          </h1>

          <p style={{
            fontFamily: font.body, fontSize: 18, color: C.creamMid,
            lineHeight: 1.7, maxWidth: 520, margin: "0 auto",
            fontStyle: "italic",
          }}>
            Three wings. One cathedral.
          </p>

          <div style={{ height: 2, width: 48, background: C.crimson, margin: "24px auto 0", opacity: 0.4 }} />
        </div>

        {/* ─── METHODOLOGY LINE ─── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 16, marginBottom: 48,
        }}>
          {["Chaos", "Structured", "Automated"].map((phase, i) => (
            <div key={phase} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{
                fontFamily: font.mono, fontSize: 11, letterSpacing: "0.08em",
                color: i === 0 ? C.creamDim : i === 1 ? C.creamMid : C.cream,
              }}>
                {phase}
              </span>
              {i < 2 && (
                <span style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim }}>→</span>
              )}
            </div>
          ))}
        </div>

        {/* ─── THREE WINGS ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {wings.map((wing) => (
            <WingCard
              key={wing.id}
              wing={wing}
              isExpanded={expanded === wing.id}
              onToggle={() => setExpanded(expanded === wing.id ? null : wing.id)}
            />
          ))}
        </div>

        {/* ─── DISCOVERY ─── */}
        <div style={{ marginTop: 24 }}>
          <WhatAreYouFeeling />
        </div>

        {/* ─── BOTTOM STATS ─── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 32,
          marginTop: 48, padding: "20px 0",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}>
          {[
            { n: "44", l: "systems" },
            { n: "65", l: "standards" },
            { n: "9", l: "council models" },
            { n: "15", l: "companions" },
            { n: "56", l: "threads" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: C.cream }}>{s.n}</div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ─── FOOTER ─── */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2, borderRadius: 1, marginBottom: 14,
            background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.violet})`,
          }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", marginBottom: 4 }}>
              Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, opacity: 0.4 }}>
              D.K. Hale · CPA · One-person operations studio · Est. 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




