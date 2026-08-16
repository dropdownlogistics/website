'use client';
import { useState } from "react";
import WhatAreYouFeeling from "./WhatAreYouFeeling";
import { WINGS, FOUNDATION, PRODUCTS, productsByWing } from "@/lib/products";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  navyDeep: "#070F1C",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  border: "rgba(245,241,235,0.07)",
  borderMed: "rgba(245,241,235,0.1)",
};

const font = {
  display: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Wing marks (placeholder icons — real marks TBD)
// ═══════════════════════════════════════════════════════════
const WING_ICON = {
  "professional-systems": (
    <svg viewBox="0 0 22 22"><path d="M11 2 L19 5 V11 C19 16 15 19 11 20 C7 19 3 16 3 11 V5 Z" /><path d="M8 11 l2 2 l4 -4" /></svg>
  ),
  "knowledge-systems": (
    <svg viewBox="0 0 22 22"><path d="M11 3 L20 7.5 L11 12 L2 7.5 Z" /><path d="M2 12 L11 16.5 L20 12" /></svg>
  ),
  "markets-wagers": (
    <svg viewBox="0 0 22 22"><path d="M3 15 L8 10 L12 13 L19 5" /><path d="M14 5 H19 V10" /></svg>
  ),
  "personal-record": (
    <svg viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12" rx="2" /><path d="M6.5 9 H11" /><path d="M6.5 12 H9" /><circle cx="15" cy="11" r="1.4" /></svg>
  ),
};

const STATUS_COLOR = {
  live: "#22C55E",
  beta: "#6B9DC2",
  invite: "#C49A3C",
  waitlist: "#C49A3C",
  "case-study": "#6B7B8D",
  concept: "#6B7B8D",
};
const statusColor = (s) => STATUS_COLOR[s] || "#6B7B8D";

const wingHref = (id) => `/wings/${id}`;
const productHref = (p) => p.url || (p.pages && p.pages[0]) || "#";

// ═══════════════════════════════════════════════════════════
// Scoped CSS — animations + hover (inline styles can't do @keyframes)
// ═══════════════════════════════════════════════════════════
const CSS = `
.ddl-frame { animation: ddl-spin 34s linear infinite; }
.ddl-badge { animation: ddl-anti 34s linear infinite; }
.ddl-badge-inner svg { fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
@keyframes ddl-spin { to { transform: rotate(360deg); } }
@keyframes ddl-anti { to { transform: rotate(-360deg); } }
.ddl-node:hover .ddl-badge-inner { box-shadow: 0 0 0 4px var(--nc); }
.ddl-track { animation: ddl-slide 40s linear infinite; }
@keyframes ddl-slide { to { transform: translateX(-100%); } }
.ddl-wc { transition: background .2s, border-color .2s; }
.ddl-wc:hover { background: ${C.cardHover}; }
.ddl-kid { transition: border-color .2s, background .2s; }
.ddl-kid:hover { background: ${C.cardHover}; }
.ddl-enter:hover { text-decoration: underline; }
@media (prefers-reduced-motion: reduce) {
  .ddl-frame, .ddl-badge, .ddl-track { animation: none; }
}
`;

// ═══════════════════════════════════════════════════════════
// Orbital Hero — Option B (spinning frame · static arms · upright badges)
// ═══════════════════════════════════════════════════════════
function OrbitalHero() {
  const [hovered, setHovered] = useState(null);
  const arm = (i) => {
    const deg = i * 90;
    return { transform: `rotate(${deg}deg) translateY(-128px) rotate(${-deg}deg)` };
  };
  const active = WINGS.find((w) => w.id === hovered);

  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <div style={{ position: "relative", width: 320, height: 320, margin: "0 auto 8px" }}>
        <div style={{ position: "absolute", inset: 24, border: `1px dashed ${C.borderMed}`, borderRadius: "50%" }} />
        <div className="ddl-frame" style={{ position: "absolute", inset: 0 }}>
          {WINGS.map((w, i) => (
            <a
              key={w.id}
              href={wingHref(w.id)}
              className="ddl-node"
              onMouseEnter={() => setHovered(w.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={w.name}
              style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, ...arm(i) }}
            >
              <div
                className="ddl-badge"
                style={{ position: "absolute", margin: "-28px 0 0 -28px", width: 56, height: 56 }}
              >
                <div
                  className="ddl-badge-inner"
                  style={{
                    "--nc": w.accent, width: 56, height: 56, borderRadius: "50%",
                    background: C.card, border: `1.5px solid ${w.accent}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: w.accent,
                  }}
                >
                  <span style={{ width: 25, height: 25, display: "block" }}>
                    {WING_ICON[w.id]}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 76, height: 76, borderRadius: "50%", background: C.card, border: `2px solid ${C.crimson}`,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4,
          fontFamily: font.display, fontWeight: 700, fontSize: 23, color: C.cream,
          boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
        }}>DD</div>
      </div>

      <h1 style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, color: C.cream, margin: "6px 0 6px" }}>
        Dropdown Logistics
      </h1>
      <p style={{
        fontFamily: font.body, fontStyle: "italic", fontSize: 16, minHeight: 46,
        color: active ? active.accent : C.creamMid, lineHeight: 1.5, maxWidth: 520, margin: "0 auto",
        transition: "color .2s",
      }}>
        {active ? <><strong>{active.name}.</strong> {active.belief}</> : "Four wings. One foundation. One cathedral."}
      </p>
      <div style={{ height: 2, width: 48, background: C.crimson, margin: "18px auto 0", opacity: 0.4 }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Ticker — product · status · live stat (from the registry + metrics)
// ═══════════════════════════════════════════════════════════
function Ticker() {
  const items = PRODUCTS.filter((p) => p.publicationStatus === "verified");
  const line = items.map((p, i) => (
    <span key={p.id} style={{ marginRight: 4 }}>
      <b style={{ color: C.cream, fontWeight: 600 }}>{p.name}</b>
      <span style={{ opacity: 0.4 }}> · </span>
      <span style={{ color: statusColor(p.status) }}>{p.status}</span>
      {p.counts && p.counts[0] && (
        <span style={{ opacity: 0.7 }}> · {p.counts[0].value} {p.counts[0].label}</span>
      )}
      {i < items.length - 1 && <span style={{ opacity: 0.25, margin: "0 10px" }}>—</span>}
    </span>
  ));
  return (
    <div style={{
      borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      background: C.navyDeep, overflow: "hidden", whiteSpace: "nowrap", padding: "9px 0", marginBottom: 40,
    }}>
      <div className="ddl-track" style={{
        display: "inline-block", paddingLeft: "100%",
        fontFamily: font.mono, fontSize: 11, letterSpacing: "0.05em", color: C.creamMid,
      }}>
        {line}{line}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Wing Card — registry-driven, expandable to product children
// ═══════════════════════════════════════════════════════════
function WingCard({ wing, index, isExpanded, onToggle }) {
  const kids = productsByWing(wing.id);
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="ddl-wc" style={{
      background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${wing.accent}`,
      borderRadius: 8, padding: "15px 18px",
    }}>
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
      >
        <div>
          <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: wing.accent }}>
            Wing {num}
          </div>
          <div style={{ fontFamily: font.display, fontSize: 19, fontWeight: 700, color: C.cream, marginTop: 3 }}>
            {wing.name}
          </div>
          <div style={{ fontFamily: font.body, fontStyle: "italic", fontSize: 13, color: C.creamMid, marginTop: 5, maxWidth: "90%" }}>
            {wing.belief}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, whiteSpace: "nowrap" }}>
            {kids.length} {kids.length === 1 ? "product" : "products"}
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: wing.accent, marginTop: 4 }}>
            {isExpanded ? "▾ collapse" : "▸ expand"}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 7 }}>
            {kids.map((p) => {
              const pending = p.publicationStatus !== "verified";
              const inner = (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 13, color: C.cream }}>{p.name}</span>
                    <span style={{
                      fontFamily: font.mono, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: statusColor(p.status), padding: "1px 6px", borderRadius: 10,
                      background: statusColor(p.status) + "1f",
                    }}>{pending ? "coming soon" : p.status}</span>
                  </div>
                  {p.tagline && (
                    <div style={{ fontFamily: font.body, fontSize: 11.5, color: C.creamMid, marginTop: 4, lineHeight: 1.5 }}>
                      {p.tagline}
                    </div>
                  )}
                </>
              );
              const boxStyle = {
                display: "block", background: C.navyDeep, border: `1px solid ${C.border}`,
                borderRadius: 6, padding: "9px 11px", textDecoration: "none",
              };
              return pending || productHref(p) === "#" ? (
                <div className="ddl-kid" key={p.id} style={boxStyle}>{inner}</div>
              ) : (
                <a className="ddl-kid" key={p.id} href={productHref(p)} target={p.url ? "_blank" : undefined} rel={p.url ? "noreferrer" : undefined} style={boxStyle}>{inner}</a>
              );
            })}
          </div>
          <a className="ddl-enter" href={wingHref(wing.id)} style={{
            display: "inline-block", marginTop: 12, fontFamily: font.mono, fontSize: 11,
            letterSpacing: "0.05em", color: wing.accent, textDecoration: "none",
          }}>
            Enter {wing.name} →
          </a>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Foundation strip
// ═══════════════════════════════════════════════════════════
function FoundationStrip() {
  return (
    <div style={{ margin: "12px 0 0", padding: "14px 18px", border: `1px dashed ${C.borderMed}`, borderRadius: 8 }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.creamDim, marginBottom: 8 }}>
        The Foundation · the layer beneath the wings
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {FOUNDATION.map((f) => (
          <div key={f.id} style={{ fontFamily: font.body, fontSize: 12.5, color: C.creamMid }}>
            <strong style={{ color: C.cream }}>{f.name}</strong> — {f.belief}
          </div>
        ))}
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
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 80px" }}>

        <OrbitalHero />
        <Ticker />

        {/* ——— METHODOLOGY LINE ——— */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}>
          {["Chaos", "Structured", "Automated"].map((phase, i) => (
            <div key={phase} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.08em", color: i === 0 ? C.creamDim : i === 1 ? C.creamMid : C.cream }}>
                {phase}
              </span>
              {i < 2 && <span style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim }}>→</span>}
            </div>
          ))}
        </div>

        {/* ——— WING CARDS ——— */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {WINGS.map((wing, i) => (
            <WingCard
              key={wing.id}
              wing={wing}
              index={i}
              isExpanded={expanded === wing.id}
              onToggle={() => setExpanded(expanded === wing.id ? null : wing.id)}
            />
          ))}
        </div>

        {/* ——— FOUNDATION ——— */}
        <FoundationStrip />

        {/* ——— STORY / LEGACY ——— */}
        <div style={{ marginTop: 12 }}>
          <a href="/legacy" style={{
            display: "block", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
            padding: "16px 18px", textDecoration: "none",
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.creamDim, marginBottom: 4 }}>
              Story · Legacy
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6 }}>
              Before the governance, before the standards — the DexVerse mythology, the origin
              threads, and the early work. Where the cathedral&rsquo;s foundation stones are visible. →
            </div>
          </a>
        </div>

        {/* ——— DISCOVERY ——— */}
        <div style={{ marginTop: 24 }}>
          <WhatAreYouFeeling />
        </div>

        {/* ——— BOTTOM STATS ——— */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 32, marginTop: 48, padding: "20px 0",
          borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap",
        }}>
          {[
            { n: "44+", l: "systems" },
            { n: "65+", l: "standards" },
            { n: "9", l: "council models" },
            { n: "4", l: "wings" },
            { n: "110+", l: "routes" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: C.cream }}>{s.n}</div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ——— FOOTER ——— */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 14, background: `linear-gradient(90deg, ${C.crimson}, #C49A3C, #6B9DC2, #8a6cc9, #22C55E)` }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", marginBottom: 4 }}>
              Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, opacity: 0.4 }}>
              <a href="https://davidkitchens.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>David Kitchens, CPA ↗</a>{" · One-person operations studio · Est. 2024"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
