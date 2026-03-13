'use client';
import { useState } from "react";

export const C = {
  navy:    "#0D1B2A",
  card:    "#10202f",
  cream:   "#F5F1EB",
  creamDim:"#9a9590",
  bench:   "#4A7C9B",
  border:  "rgba(74,124,155,0.18)",
};

export const font = {
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  body:    "'Source Serif 4', serif",
};

export const TIER_COLORS = {
  "Day One": "#4A9E6B",
  "Flow":    "#4A7C9B",
  "Sharp":   "#C49A3C",
  "Flex":    "#B23531",
};

const TIERS = ["Day One", "Flow", "Sharp", "Flex"];

export function TipCard({ tip }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ background: C.card, border: `1px solid ${open ? TIER_COLORS[tip.tier] : C.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.15s", cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      {/* Header */}
      <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 1, color: TIER_COLORS[tip.tier], background: `${TIER_COLORS[tip.tier]}18`, padding: "2px 8px", borderRadius: 3 }}>
              {tip.tier.toUpperCase()}
            </span>
            {tip.time_saved && (
              <span style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 1, color: C.creamDim }}>
                ⏱ {tip.time_saved}
              </span>
            )}
            {tip.id && (
              <span style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 1, color: C.creamDim }}>
                {tip.id}
              </span>
            )}
          </div>
          <div style={{ fontFamily: font.display, fontSize: 17, fontWeight: 600, color: C.cream, lineHeight: 1.3 }}>{tip.title}</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, marginTop: 6, fontStyle: "italic" }}>{tip.desc}</div>
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 14, color: C.bench, flexShrink: 0, marginTop: 4 }}>{open ? "−" : "+"}</div>
      </div>

      {/* Expanded */}
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 24px" }}>
          {tip.tip && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 2, color: C.bench, marginBottom: 8 }}>THE TIP</div>
              <div style={{ fontFamily: font.mono, fontSize: 13, color: C.cream, background: "#0a1520", padding: "12px 16px", borderRadius: 6, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{tip.tip}</div>
            </div>
          )}
          {tip.why && (
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 2, color: C.creamDim, marginBottom: 8 }}>WHY MOST PEOPLE MISS IT</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6 }}>{tip.why}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ToolPage({ tool, label, icon, tagline, tips }) {
  const [activeTier, setActiveTier] = useState(null);

  const filtered = activeTier ? tips.filter(t => t.tier === activeTier) : tips;
  const tierCounts = TIERS.reduce((acc, t) => {
    acc[t] = tips.filter(tip => tip.tier === t).length;
    return acc;
  }, {});

  return (
    <div style={{ background: C.navy, minHeight: "100vh", color: C.cream, fontFamily: font.body }}>

      {/* Back */}
      <div style={{ padding: "20px 48px 0" }}>
        <a href="/bench" style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: 2, color: C.bench, textDecoration: "none" }}>← THE BENCH</a>
      </div>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "40px 48px 40px" }}>
        <p style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: 3, color: C.creamDim, marginBottom: 8 }}>{label}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
          <span style={{ fontSize: 48 }}>{icon}</span>
          <h1 style={{ fontFamily: font.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1, margin: 0 }}>{tool}</h1>
        </div>
        <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamDim, fontStyle: "italic", maxWidth: 520, margin: "0 0 32px" }}>{tagline}</p>

        {/* Tier counts */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTier(null)}
            style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 2, padding: "5px 12px", borderRadius: 4, border: `1px solid ${!activeTier ? C.bench : C.border}`, background: !activeTier ? `${C.bench}22` : "transparent", color: !activeTier ? C.bench : C.creamDim, cursor: "pointer" }}
          >ALL ({tips.length})</button>
          {TIERS.map(t => tierCounts[t] > 0 && (
            <button
              key={t}
              onClick={() => setActiveTier(activeTier === t ? null : t)}
              style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: 2, padding: "5px 12px", borderRadius: 4, border: `1px solid ${activeTier === t ? TIER_COLORS[t] : C.border}`, background: activeTier === t ? `${TIER_COLORS[t]}22` : "transparent", color: activeTier === t ? TIER_COLORS[t] : C.creamDim, cursor: "pointer" }}
            >{t.toUpperCase()} ({tierCounts[t]})</button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: "40px 48px 80px", maxWidth: 860 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((tip, i) => <TipCard key={i} tip={tip} />)}
        </div>
      </div>
    </div>
  );
}
