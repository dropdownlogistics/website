import { useState } from "react";

const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  crimson: "#B23531",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B",
  amber: "#C49A3C",
  blue: "#6B9DC2",
  violet: "#8a6cc9",
  ember: "#c98a4a",
  rose: "#c94a6e",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const moods = [
  {
    emoji: "🔥",
    label: "Show me what you built",
    color: C.crimson,
    pages: [
      { title: "BlindSpot Hub", href: "/blindspot", wing: "D&A" },
      { title: "BlindSpot Trading", href: "/blindspot/trading", wing: "D&A" },
      { title: "BlindSpot Campaign", href: "/blindspot/campaign", wing: "D&A" },
      { title: "BlindSpot Betting", href: "/blindspot/betting", wing: "D&A" },
      { title: "Excelligence — Knowledge Graph", href: "/excelligence", wing: "DDL" },
      { title: "Template Palette", href: "/methodology/palette", wing: "DDL" },
      { title: "r/excel Launch", href: "/work/rexcel", wing: "DDL" },
      { title: "Other Works", href: "/other-works", wing: "DexVerse" },
      { title: "PrioritEase", href: "/prioritease", wing: "DDL" },
      { title: "Behavioral Intelligence", href: "/products/behavioral-intelligence", wing: "Products" },
      { title: "Grammarly — 4.57M Words", href: "/analytics/grammarly", wing: "D&A" },
      { title: "PSS — Prompt Strategy System", href: "/framework/pss", wing: "DDL" },
    ],
  },
  {
    emoji: "📖",
    label: "Tell me a story",
    color: C.amber,
    pages: [
      { title: "The Basement", href: "/memoir/basement", wing: "DDL" },
      { title: "The Cleanest Day", href: "/memoir/cleanest-day", wing: "DDL" },
      { title: "February 27, 2026", href: "/memoir/feb-27", wing: "DDL" },
      { title: "The Protocol", href: "/memoir/the-protocol", wing: "DDL" },
      { title: "The Recursive Mind", href: "/mindframe/recursive", wing: "DDL" },
      { title: "Palette Narrative", href: "/methodology/palette/narrative", wing: "DexVerse" },
      { title: "Leafshadow Lineage", href: "/dossiers/leafshadow-lineage", wing: "Dossiers" },
      { title: "Forewords — Nine Models", href: "/forewords", wing: "DDL" },
      { title: "DexLore — Origin Archaeology", href: "/dexlore", wing: "DexVerse" },
      { title: "The Continuum", href: "/dexlore/continuum", wing: "DexVerse" },
    ],
  },
  {
    emoji: "🧠",
    label: "How does this work?",
    color: C.blue,
    pages: [
      { title: "Methodology", href: "/methodology", wing: "DDL" },
      { title: "Council FAQ", href: "/council/faq", wing: "DDL" },
      { title: "STD-0066 Narrative", href: "/council/std-0066-narrative", wing: "DDL" },
      { title: "DDL Glossary", href: "/knowledge/glossary", wing: "DexVerse" },
      { title: "LLM Setup Guide", href: "/guides/llm", wing: "DDL" },
      { title: "PSS — Prompt Strategy", href: "/framework/pss", wing: "DDL" },
      { title: "Vibe Coding", href: "/framework/vibe-coding", wing: "DDL" },
      { title: "AI Context — /ai", href: "/ai", wing: "DDL" },
      { title: "MindFrame", href: "/mindframe", wing: "DDL" },
      { title: "DexOS", href: "/dexos", wing: "DDL" },
      { title: "AutoCouncil", href: "/council/auto-council", wing: "DDL" },
    ],
  },
  {
    emoji: "📊",
    label: "Give me the data",
    color: C.green,
    pages: [
      { title: "Apple Music Replay 2025", href: "/recaps/apple-music", wing: "D&A" },
      { title: "Annual Signal Report", href: "/recaps/annual-signal", wing: "D&A" },
      { title: "Prediction vs Actuals", href: "/recaps/predictions", wing: "D&A" },
      { title: "BlindSpot Trading", href: "/blindspot/trading", wing: "D&A" },
      { title: "BlindSpot Steam", href: "/blindspot/steam", wing: "D&A" },
      { title: "BlindSpot Backtest", href: "/blindspot/backtest", wing: "D&A" },
      { title: "Campaign Analytics", href: "/dossiers/campaign-analytics", wing: "Dossiers" },
      { title: "Knowledge Map", href: "/knowledge/map", wing: "DexVerse" },
      { title: "Sonic Thread", href: "/analytics/sonic-thread", wing: "D&A" },
      { title: "Callback Engine", href: "/analytics/callback-engine", wing: "D&A" },
      { title: "Catnip Map", href: "/analytics/catnip-map", wing: "D&A" },
      { title: "Tone Analysis", href: "/analytics/tone", wing: "D&A" },
      { title: "Memoir Analytics", href: "/analytics/memoir", wing: "D&A" },
      { title: "DexDash", href: "/analytics/dexdash", wing: "D&A" },
    ],
  },
  {
    emoji: "🏛️",
    label: "Show me the governance",
    color: C.violet,
    pages: [
      { title: "Standards", href: "/standards", wing: "DDL" },
      { title: "Systems", href: "/systems", wing: "DDL" },
      { title: "Registry", href: "/registry", wing: "DDL" },
      { title: "Council", href: "/council", wing: "DDL" },
      { title: "Council Profiles", href: "/council/profiles", wing: "DDL" },
      { title: "Council Scaling", href: "/council/scaling", wing: "DDL" },
      { title: "Hal Style Lock", href: "/dossiers/hal-style-lock", wing: "Dossiers" },
      { title: "STD-0066 Brief", href: "/council/BRF-council-naming-std-ALL-20260301", wing: "DDL" },
    ],
  },
  {
    emoji: "⚔️",
    label: "Meet the party",
    color: C.green,
    pages: [
      { title: "Feliciano — Dragonborn Paladin", href: "/dossiers/feliciano", wing: "Dossiers" },
      { title: "Hillie — Drow Warlock", href: "/dossiers/hillie", wing: "Dossiers" },
      { title: "Merrick — Elf Mage", href: "/dossiers/merrick", wing: "Dossiers" },
      { title: "Riflen — Fighter", href: "/dossiers/riflen", wing: "Dossiers" },
      { title: "Doc Rickets — Undead Rogue", href: "/dossiers/doc-rickets", wing: "Dossiers" },
      { title: "Xuth Jr — Argonian L56", href: "/dossiers/xuth-jr", wing: "Dossiers" },
      { title: "Xuth III — Argonian Reboot", href: "/dossiers/xuth-iii", wing: "Dossiers" },
      { title: "Xuth Sr — Daedric Ancestor", href: "/dossiers/xuth-sr", wing: "Dossiers" },
      { title: "Ash, Snow & Steel — D&D Party", href: "/dossiers/ash-snow-steel", wing: "Dossiers" },
      { title: "Fort Joy — Divinity Party", href: "/dossiers/fort-joy", wing: "Dossiers" },
      { title: "Leafshadow Lineage", href: "/dossiers/leafshadow-lineage", wing: "Dossiers" },
      { title: "BlindSpot Campaign", href: "/blindspot/campaign", wing: "D&A" },
    ],
  },
  {
    emoji: "🎲",
    label: "Surprise me",
    color: C.ember,
    pages: [], // filled dynamically from all other moods
  },
];

// Build the surprise pool from all other moods
const allPages = moods.slice(0, -1).flatMap((m) => m.pages);
moods[moods.length - 1].pages = allPages;

const wingColors = {
  DDL: C.crimson,
  "D&A": C.amber,
  DexVerse: C.violet,
  Dossiers: C.green,
  Products: C.blue,
};

export default function WhatAreYouFeeling() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [pickedPage, setPickedPage] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const pickRandom = (mood) => {
    setSelectedMood(mood);
    setSpinning(true);
    setPickedPage(null);

    // Slot machine effect — cycle through 6-8 pages before landing
    const pool = mood.pages;
    let cycles = 0;
    const maxCycles = 6 + Math.floor(Math.random() * 3);
    const interval = setInterval(() => {
      setPickedPage(pool[Math.floor(Math.random() * pool.length)]);
      cycles++;
      if (cycles >= maxCycles) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 120);
  };

  const reset = () => {
    setSelectedMood(null);
    setPickedPage(null);
    setSpinning(false);
  };

  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        padding: "24px 28px",
        maxWidth: 800,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 10,
          color: C.creamDim,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        {selectedMood ? "Picking..." : "What are you feeling?"}
      </div>

      {/* Mood buttons */}
      {!selectedMood && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8,
          }}
        >
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => pickRandom(mood)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                background: C.creamGhost,
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = mood.color + "40";
                e.currentTarget.style.background = mood.color + "12";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.background = C.creamGhost;
              }}
            >
              <span style={{ fontSize: 20 }}>{mood.emoji}</span>
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: 11,
                  color: C.cream,
                }}
              >
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Result */}
      {selectedMood && pickedPage && (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div
            style={{
              fontSize: 28,
              marginBottom: 12,
              transition: "all 0.1s",
              opacity: spinning ? 0.5 : 1,
            }}
          >
            {selectedMood.emoji}
          </div>

          <a
            href={pickedPage.href}
            style={{
              display: "inline-block",
              padding: "16px 28px",
              background: spinning
                ? C.creamGhost
                : selectedMood.color + "18",
              border: `1px solid ${
                spinning ? C.border : selectedMood.color + "40"
              }`,
              borderRadius: 7,
              textDecoration: "none",
              transition: "all 0.2s",
              pointerEvents: spinning ? "none" : "auto",
              minWidth: 260,
            }}
          >
            <div
              style={{
                fontFamily: font.display,
                fontSize: 16,
                fontWeight: 600,
                color: C.cream,
                marginBottom: 4,
              }}
            >
              {pickedPage.title}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: 9,
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: (wingColors[pickedPage.wing] || C.creamDim) + "18",
                  color: wingColors[pickedPage.wing] || C.creamDim,
                }}
              >
                {pickedPage.wing}
              </span>
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: 9,
                  color: C.creamDim,
                }}
              >
                {pickedPage.href}
              </span>
            </div>
          </a>

          {!spinning && (
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 10 }}>
              <button
                onClick={() => pickRandom(selectedMood)}
                style={{
                  fontFamily: font.mono,
                  fontSize: 10,
                  color: selectedMood.color,
                  background: "transparent",
                  border: `1px solid ${selectedMood.color}30`,
                  borderRadius: 5,
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = selectedMood.color + "12";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Spin again
              </button>
              <button
                onClick={reset}
                style={{
                  fontFamily: font.mono,
                  fontSize: 10,
                  color: C.creamDim,
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  borderRadius: 5,
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.creamGhost;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Change mood
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
