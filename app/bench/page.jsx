'use client';
import { useState } from "react";

const C = {
  navy:    "#0D1B2A",
  card:    "#10202f",
  cream:   "#F5F1EB",
  creamDim:"#9a9590",
  bench:   "#4A7C9B",
  benchDim:"#3a6580",
  border:  "rgba(74,124,155,0.18)",
};

const font = {
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  body:    "'Source Serif 4', serif",
};

const TOOLS = [
  {
    slug: "onenote",
    name: "OneNote",
    label: "MICROSOFT",
    tagline: "Stop fighting the app. Start using it.",
    count: 7,
    icon: "📓",
    tier_counts: { "Day One": 3, "Flow": 2, "Sharp": 1, "Flex": 1 },
  },
  {
    slug: "excel",
    name: "Excel",
    label: "MICROSOFT",
    tagline: "Where the real work happens.",
    count: 8,
    icon: "📊",
    tier_counts: { "Day One": 2, "Flow": 3, "Sharp": 2, "Flex": 1 },
  },
  {
    slug: "word",
    name: "Word",
    label: "MICROSOFT",
    tagline: "Most people use 10% of it.",
    count: 7,
    icon: "📝",
    tier_counts: { "Day One": 3, "Flow": 2, "Sharp": 2, "Flex": 0 },
  },
  {
    slug: "visio",
    name: "Visio",
    label: "MICROSOFT",
    tagline: "It does more than boxes and arrows.",
    count: 5,
    icon: "🗂️",
    tier_counts: { "Day One": 1, "Flow": 2, "Sharp": 2, "Flex": 0 },
  },
  {
    slug: "cmd",
    name: "CMD",
    label: "WINDOWS",
    tagline: "The terminal that's already on your machine.",
    count: 7,
    icon: "⬛",
    tier_counts: { "Day One": 3, "Flow": 3, "Sharp": 1, "Flex": 0 },
  },
  {
    slug: "powershell",
    name: "PowerShell",
    label: "WINDOWS",
    tagline: "More capable than you think.",
    count: 7,
    icon: "💙",
    tier_counts: { "Day One": 2, "Flow": 3, "Sharp": 2, "Flex": 0 },
  },
  {
    slug: "adobe",
    name: "Acrobat",
    label: "ADOBE",
    tagline: "It's not just a PDF viewer.",
    count: 7,
    icon: "📄",
    tier_counts: { "Day One": 2, "Flow": 3, "Sharp": 2, "Flex": 0 },
  },
];

const TIERS = ["Day One", "Flow", "Sharp", "Flex"];

const TIER_COLORS = {
  "Day One": "#4A9E6B",
  "Flow":    "#4A7C9B",
  "Sharp":   "#C49A3C",
  "Flex":    "#B23531",
};

const FEATURED = [
  { tool: "OneNote", tier: "Day One", title: "Paste Without the Mess", desc: "Ctrl+Shift+V strips formatting on paste. Every Microsoft app. Every time." },
  { tool: "Excel",  tier: "Flow",    title: "Double-Click the Fill Handle", desc: "After entering a formula, double-click the corner square. It fills to the end of your data instantly." },
  { tool: "CMD",    tier: "Day One", title: "Pipe to Clipboard", desc: "Add | clip to any command. Output goes straight to your clipboard." },
  { tool: "PowerShell", tier: "Sharp", title: "Out-GridView", desc: "Pipe any output to Out-GridView. Instant interactive table with sort and filter." },
];

export default function BenchLanding() {
  const [filter, setFilter] = useState(null);

  const filtered = filter ? TOOLS.filter(t => t.tier_counts[filter] > 0) : TOOLS;

  return (
    <div style={{ background: C.navy, minHeight: "100vh", color: C.cream, fontFamily: font.body }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "64px 48px 48px" }}>
        <p style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: 3, color: C.bench, marginBottom: 16 }}>
          DROPDOWN LOGISTICS
        </p>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1, margin: "0 0 16px", color: C.cream }}>
          THE BENCH
        </h1>
        <p style={{ fontFamily: font.body, fontSize: "clamp(16px, 2vw, 20px)", color: C.creamDim, maxWidth: 560, fontStyle: "italic", margin: 0 }}>
          Operator-tested tips for tools you already use. Not documentation. Not tutorials.
          The things you didn't know you were missing.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48, marginTop: 40, flexWrap: "wrap" }}>
          {[["7", "TOOLS"], ["48+", "TIPS"], ["4", "TIERS"], ["0", "OBVIOUS ONES"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.bench }}>{n}</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, color: C.creamDim }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured tips */}
      <div style={{ padding: "48px 48px 0" }}>
        <p style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 3, color: C.creamDim, marginBottom: 24 }}>
          QUICK HITS
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 56 }}>
          {FEATURED.map((tip) => (
            <div key={tip.title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 2, color: C.bench }}>{tip.tool.toUpperCase()}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 1, color: TIER_COLORS[tip.tier], background: `${TIER_COLORS[tip.tier]}18`, padding: "2px 8px", borderRadius: 3 }}>
                  {tip.tier.toUpperCase()}
                </span>
              </div>
              <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream, marginBottom: 8 }}>{tip.title}</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.5 }}>{tip.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier filter */}
      <div style={{ padding: "0 48px 32px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setFilter(null)}
            style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, padding: "6px 14px", borderRadius: 4, border: `1px solid ${filter === null ? C.bench : C.border}`, background: filter === null ? `${C.bench}22` : "transparent", color: filter === null ? C.bench : C.creamDim, cursor: "pointer" }}
          >ALL</button>
          {TIERS.map(t => (
            <button
              key={t}
              onClick={() => setFilter(filter === t ? null : t)}
              style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, padding: "6px 14px", borderRadius: 4, border: `1px solid ${filter === t ? TIER_COLORS[t] : C.border}`, background: filter === t ? `${TIER_COLORS[t]}22` : "transparent", color: filter === t ? TIER_COLORS[t] : C.creamDim, cursor: "pointer" }}
            >{t.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* Tool grid */}
      <div style={{ padding: "0 48px 80px" }}>
        <p style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 3, color: C.creamDim, marginBottom: 24 }}>
          TOOLS
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
          {filtered.map((tool) => (
            <a
              key={tool.slug}
              href={`/bench/${tool.slug}`}
              style={{ textDecoration: "none", display: "block", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px 32px", transition: "border-color 0.15s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.bench}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <p style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 3, color: C.creamDim, margin: "0 0 6px" }}>{tool.label}</p>
                  <h2 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, margin: 0 }}>{tool.name}</h2>
                </div>
                <span style={{ fontSize: 28 }}>{tool.icon}</span>
              </div>
              <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, fontStyle: "italic", margin: "0 0 20px" }}>{tool.tagline}</p>
              {/* Tier breakdown */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TIERS.map(t => tool.tier_counts[t] > 0 && (
                  <span key={t} style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 1, color: TIER_COLORS[t], background: `${TIER_COLORS[t]}18`, padding: "3px 8px", borderRadius: 3 }}>
                    {t} {tool.tier_counts[t]}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 20, fontFamily: font.mono, fontSize: 10, letterSpacing: 2, color: C.bench }}>
                {tool.count} TIPS →
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Tier legend */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "40px 48px" }}>
        <p style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 3, color: C.creamDim, marginBottom: 24 }}>TIER SYSTEM</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { tier: "Day One", desc: "Set this up before anything else. The default behavior costs you time." },
            { tier: "Flow",    desc: "Once you're comfortable. Unlocks the tool's real efficiency." },
            { tier: "Sharp",   desc: "Non-obvious. Requires knowing the basics first." },
            { tier: "Flex",    desc: "The thing you show people. Takes a minute to explain. Worth it." },
          ].map(({ tier, desc }) => (
            <div key={tier}>
              <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, color: TIER_COLORS[tier], marginBottom: 8 }}>{tier.toUpperCase()}</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Origin note */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "32px 48px", background: "#0a1520" }}>
        <p style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, color: C.creamDim, margin: 0 }}>
          ORIGIN — This wing started with a Teams message on 3/12/26: "I'm going to have a session with ChatGPT to learn what I can do in there." That's the energy.
        </p>
      </div>
    </div>
  );
}
