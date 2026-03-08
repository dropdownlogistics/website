'use client';
import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
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
  rose: "#c94a6e",
  roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Shared Primitives
// ═══════════════════════════════════════════════════════════
function KPI({ label, value, sub, color = C.cream }) {
  return (
    <div style={{
      flex: "1 1 155px", minWidth: 140, background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 6,
      padding: "16px 14px 12px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.5 }} />
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Tag({ label, color = C.blue }) {
  return (
    <span style={{
      fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3,
      background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function SectionLabel({ number, title, color = C.amber }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 48 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 5, background: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font.mono, fontSize: 12, fontWeight: 700, color,
      }}>{number}</div>
      <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CROSSOVER CHART — Quant vs Verbal across instruments
// ═══════════════════════════════════════════════════════════
function CrossoverChart() {
  const points = [
    { year: "2001", age: 15, label: "PSAT Soph", verbal: 63, quant: 81, instrument: "PSAT/NMSQT" },
    { year: "2002", age: 16, label: "PSAT Jr", verbal: 83, quant: 92, instrument: "PSAT/NMSQT" },
    { year: "2005", age: 18, label: "Strong", verbal: null, quant: null, interest: true, instrument: "Strong Interest Inventory", note: "Math Interest: 51 (Avg) · Writing: 31 (VL)" },
    { year: "2008", age: 21, label: "GMAT", verbal: 75, quant: 44, instrument: "GMAT" },
  ];

  const chartW = 680;
  const chartH = 200;
  const padL = 50;
  const padR = 30;
  const padT = 20;
  const padB = 40;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const scored = points.filter(p => p.verbal !== null);
  const xPositions = { "2001": 0, "2002": 0.15, "2005": 0.55, "2008": 1 };

  const toX = (year) => padL + xPositions[year] * innerW;
  const toY = (pct) => padT + innerH - (pct / 100) * innerH;

  const vLine = scored.map(p => `${toX(p.year)},${toY(p.verbal)}`).join(" ");
  const qLine = scored.map(p => `${toX(p.year)},${toY(p.quant)}`).join(" ");

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px", marginBottom: 16, overflowX: "auto" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        The Crossover — Percentile Rank by Domain
      </div>
      <svg width={chartW} height={chartH} style={{ display: "block", maxWidth: "100%" }} viewBox={`0 0 ${chartW} ${chartH}`}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={chartW - padR} y2={toY(v)} stroke={C.border} strokeWidth={1} />
            <text x={padL - 8} y={toY(v) + 4} fill={C.creamDim} fontSize={9} fontFamily={font.mono} textAnchor="end">{v}</text>
          </g>
        ))}

        {/* Verbal line */}
        <polyline points={vLine} fill="none" stroke={C.blue} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {/* Quant line */}
        <polyline points={qLine} fill="none" stroke={C.green} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {scored.map(p => (
          <g key={p.year + "v"}>
            <circle cx={toX(p.year)} cy={toY(p.verbal)} r={5} fill={C.navy} stroke={C.blue} strokeWidth={2} />
            <text x={toX(p.year)} y={toY(p.verbal) - 10} fill={C.blue} fontSize={10} fontFamily={font.mono} textAnchor="middle">{p.verbal}</text>
          </g>
        ))}
        {scored.map(p => (
          <g key={p.year + "q"}>
            <circle cx={toX(p.year)} cy={toY(p.quant)} r={5} fill={C.navy} stroke={C.green} strokeWidth={2} />
            <text x={toX(p.year)} y={toY(p.quant) - 10} fill={C.green} fontSize={10} fontFamily={font.mono} textAnchor="middle">{p.quant}</text>
          </g>
        ))}

        {/* Strong marker (interest, not percentile) */}
        <line x1={toX("2005")} y1={padT} x2={toX("2005")} y2={chartH - padB} stroke={C.amber} strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />
        <text x={toX("2005")} y={padT + 12} fill={C.amber} fontSize={8} fontFamily={font.mono} textAnchor="middle">INTEREST</text>
        <text x={toX("2005")} y={padT + 22} fill={C.amber} fontSize={8} fontFamily={font.mono} textAnchor="middle">(not %ile)</text>

        {/* X-axis labels */}
        {points.map(p => (
          <g key={p.year + "label"}>
            <text x={toX(p.year)} y={chartH - padB + 16} fill={C.creamMid} fontSize={10} fontFamily={font.mono} textAnchor="middle">{p.year}</text>
            <text x={toX(p.year)} y={chartH - padB + 28} fill={C.creamDim} fontSize={8} fontFamily={font.mono} textAnchor="middle">{p.label}</text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 3, background: C.blue, borderRadius: 2 }} />
          <span style={{ fontFamily: font.mono, fontSize: 10, color: C.blue }}>Verbal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 3, background: C.green, borderRadius: 2 }} />
          <span style={{ fontFamily: font.mono, fontSize: 10, color: C.green }}>Quantitative</span>
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginLeft: "auto" }}>
          Lines cross between 2002 and 2008 — the inversion
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RIASEC HEXAGON — Strong Interest Profile
// ═══════════════════════════════════════════════════════════
function RIASECHex() {
  const themes = [
    { code: "R", label: "Realistic", score: 44, norm: 0.44, color: C.creamDim },
    { code: "I", label: "Investigative", score: 40, norm: 0.40, color: C.creamDim },
    { code: "A", label: "Artistic", score: 31, norm: 0.31, color: C.rose },
    { code: "S", label: "Social", score: 45, norm: 0.45, color: C.blue },
    { code: "E", label: "Enterprising", score: 40, norm: 0.40, color: C.green },
    { code: "C", label: "Conventional", score: 75, norm: 0.75, color: C.amber },
  ];

  const cx = 150, cy = 130, maxR = 100;
  const angleOffset = -Math.PI / 2;

  const getXY = (i, r) => {
    const angle = angleOffset + (2 * Math.PI * i) / 6;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const outerPoly = themes.map((_, i) => { const p = getXY(i, maxR); return `${p.x},${p.y}`; }).join(" ");
  const midPoly = themes.map((_, i) => { const p = getXY(i, maxR * 0.5); return `${p.x},${p.y}`; }).join(" ");
  const dataPoly = themes.map((t, i) => { const p = getXY(i, maxR * t.norm); return `${p.x},${p.y}`; }).join(" ");

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        RIASEC Profile — Strong Interest Inventory · Age 18
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
        <svg width={300} height={260} style={{ flexShrink: 0 }}>
          {/* Grid */}
          <polygon points={outerPoly} fill="none" stroke={C.border} strokeWidth={1} />
          <polygon points={midPoly} fill="none" stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
          {/* Spokes */}
          {themes.map((_, i) => {
            const p = getXY(i, maxR);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.border} strokeWidth={1} />;
          })}
          {/* Data shape */}
          <polygon points={dataPoly} fill={C.amber + "20"} stroke={C.amber} strokeWidth={2} />
          {/* Data points + labels */}
          {themes.map((t, i) => {
            const dp = getXY(i, maxR * t.norm);
            const lp = getXY(i, maxR + 24);
            return (
              <g key={t.code}>
                <circle cx={dp.x} cy={dp.y} r={4} fill={C.navy} stroke={t.color} strokeWidth={2} />
                <text x={lp.x} y={lp.y - 6} fill={t.color} fontSize={14} fontFamily={font.mono} fontWeight="700" textAnchor="middle">{t.code}</text>
                <text x={lp.x} y={lp.y + 6} fill={C.creamDim} fontSize={8} fontFamily={font.mono} textAnchor="middle">{t.score}</text>
              </g>
            );
          })}
          {/* Center code */}
          <text x={cx} y={cy - 6} fill={C.amber} fontSize={18} fontFamily={font.mono} fontWeight="700" textAnchor="middle">CES</text>
          <text x={cx} y={cy + 10} fill={C.creamDim} fontSize={8} fontFamily={font.mono} textAnchor="middle">Theme Code</text>
        </svg>

        {/* Legend */}
        <div style={{ flex: "1 1 180px" }}>
          {themes.map(t => (
            <div key={t.code} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: t.color, width: 18 }}>{t.code}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{t.label}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: t.color }}>{t.score}</span>
                </div>
                <div style={{ height: 4, background: C.creamGhost, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${t.norm * 100}%`, background: t.color, borderRadius: 2, opacity: 0.6 }} />
                </div>
              </div>
            </div>
          ))}
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, marginTop: 10 }}>
            Conventional spike at 75 · Artistic floor at 31
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXECUTIVE FUNCTION RADAR — Brown EF/A
// ═══════════════════════════════════════════════════════════
function EFRadar() {
  const domains = [
    { label: "Activation", t: 70, pct: 95, desc: "Organizing, prioritizing, activating" },
    { label: "Focus", t: 74, pct: 98, desc: "Sustaining, shifting attention" },
    { label: "Effort", t: 68, pct: 93, desc: "Alertness, processing speed" },
    { label: "Emotion", t: 60, pct: 82, desc: "Frustration, modulating" },
    { label: "Memory", t: 70, pct: 95, desc: "Working memory, recall" },
    { label: "Action", t: 66, pct: 91, desc: "Self-regulation" },
  ];

  const getColor = (t) => t >= 70 ? C.crimson : t >= 60 ? C.amber : C.green;
  const getClass = (t) => t >= 70 ? "MARKEDLY ATYPICAL" : t >= 60 ? "MODERATELY ATYPICAL" : "TYPICAL";

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
        Executive Function Profile — Brown EF/A Scales · Age 37
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, marginBottom: 16 }}>
        Total Composite: T=70 · 95th percentile for dysfunction
      </div>

      {domains.map(d => (
        <div key={d.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <div>
              <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{d.label}</span>
              <span style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, marginLeft: 8 }}>{d.desc}</span>
            </div>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: getColor(d.t) }}>{getClass(d.t)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 8, background: C.creamGhost, borderRadius: 4, overflow: "hidden", position: "relative" }}>
              {/* Threshold markers */}
              <div style={{ position: "absolute", left: "54%", top: 0, bottom: 0, width: 1, background: C.creamDim, opacity: 0.3 }} />
              <div style={{ position: "absolute", left: "70%", top: 0, bottom: 0, width: 1, background: C.crimson, opacity: 0.3 }} />
              <div style={{ height: "100%", width: `${d.pct}%`, background: getColor(d.t), borderRadius: 4, opacity: 0.7 }} />
            </div>
            <span style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: getColor(d.t), width: 44, textAlign: "right" }}>T{d.t}</span>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: C.crimson, opacity: 0.7 }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>T≥70 Markedly atypical</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: C.amber, opacity: 0.7 }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>T 60–69 Moderately atypical</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROCESSING SPLIT — Auditory vs Visual
// ═══════════════════════════════════════════════════════════
function ProcessingSplit() {
  const metrics = [
    { label: "Response Control", aud: 82, vis: 107 },
    { label: "Attention", aud: 91, vis: 110 },
    { label: "Sustained Attention", aud: 99, vis: 111 },
  ];

  const vineland = [
    { label: "Receptive (listening)", score: 16, color: C.creamMid },
    { label: "Expressive (speaking)", score: 12, color: C.crimson },
    { label: "Written (reading/writing)", score: 16, color: C.creamMid },
  ];

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
        Processing Channel — Auditory vs Visual
      </div>

      {/* IVA bars */}
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 8 }}>IVA Continuous Performance Test · Age 37</div>
      {metrics.map(m => (
        <div key={m.label} style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, marginBottom: 4 }}>{m.label}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.rose }}>AUD</span>
                <span style={{ fontFamily: font.mono, fontSize: 11, color: m.aud < 90 ? C.crimson : C.creamMid }}>{m.aud}</span>
              </div>
              <div style={{ height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(m.aud / 130) * 100}%`, background: C.rose, borderRadius: 3, opacity: m.aud < 90 ? 0.8 : 0.4 }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.green }}>VIS</span>
                <span style={{ fontFamily: font.mono, fontSize: 11, color: m.vis > 105 ? C.green : C.creamMid }}>{m.vis}</span>
              </div>
              <div style={{ height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(m.vis / 130) * 100}%`, background: C.green, borderRadius: 3, opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ height: 1, background: C.border, margin: "16px 0" }} />

      {/* Vineland Communication */}
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 8 }}>Vineland-3 Communication Subdomains · v-scale (mean=15, SD=3)</div>
      <div style={{ display: "flex", gap: 8 }}>
        {vineland.map(v => (
          <div key={v.label} style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
            <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: v.color, lineHeight: 1 }}>{v.score}</div>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginTop: 4, lineHeight: 1.3 }}>{v.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, marginTop: 8, textAlign: "center" }}>
        Expressive (v=12) is a statistically significant weakness vs Receptive (16) and Written (16)
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SENSORY QUADRANT
// ═══════════════════════════════════════════════════════════
function SensoryQuadrant() {
  const quads = [
    { label: "Low Registration", score: 29, max: 75, cls: "Similar to Most", color: C.creamMid },
    { label: "Sensation Seeking", score: 37, max: 75, cls: "Less Than Most", color: C.amber },
    { label: "Sensory Sensitivity", score: 38, max: 75, cls: "Similar to Most", color: C.creamMid },
    { label: "Sensation Avoiding", score: 50, max: 75, cls: "MUCH MORE Than Most", color: C.crimson },
  ];

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
        Sensory Processing — Adolescent/Adult Sensory Profile · Age 37
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {quads.map(q => {
          const pct = (q.score / q.max) * 100;
          return (
            <div key={q.label} style={{
              padding: "14px 12px", background: C.navy, border: `1px solid ${q.color === C.crimson ? q.color + "40" : C.border}`,
              borderRadius: 6, position: "relative", overflow: "hidden",
            }}>
              {q.color === C.crimson && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.crimson, opacity: 0.6 }} />}
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{q.label}</div>
              <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: q.color, lineHeight: 1 }}>
                {q.score}<span style={{ fontSize: 14, color: C.creamDim }}>/{q.max}</span>
              </div>
              <div style={{ height: 4, background: C.creamGhost, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: q.color, borderRadius: 2, opacity: 0.6 }} />
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: q.color, marginTop: 4 }}>{q.cls}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, padding: "10px 14px", background: C.crimsonFaint,
        borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 4px 4px 0",
      }}>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
          Sensation Avoiding at extreme range. Sensation Seeking below threshold. The operator actively builds 
          environments that limit sensory input — dark UIs, controlled audio, structured routines. 
          This is not preference. It is documented neurology expressed as design language.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ADAPTIVE BEHAVIOR — Vineland domain comparison
// ═══════════════════════════════════════════════════════════
function AdaptiveBehavior() {
  const domains = [
    { label: "Communication", score: 96, pct: 39, color: C.blue },
    { label: "Daily Living Skills", score: 83, pct: 13, color: C.crimson, flag: "Weakness" },
    { label: "Socialization", score: 107, pct: 68, color: C.green, flag: "Strength" },
  ];

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
        Adaptive Behavior — Vineland-3 · Age 37
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, marginBottom: 16 }}>
        ABC: 93 · 32nd percentile · Respondent: Emily K. Kitchens
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {domains.map(d => (
          <div key={d.label} style={{
            flex: 1, textAlign: "center", padding: "16px 10px", background: C.navy,
            border: `1px solid ${d.flag ? d.color + "40" : C.border}`, borderRadius: 6,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 32, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.score}</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 4 }}>{d.pct}th %ile</div>
            <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamMid, marginTop: 8 }}>{d.label}</div>
            {d.flag && <Tag label={d.flag} color={d.color} />}
          </div>
        ))}
      </div>

      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 12, textAlign: "center" }}>
        24-point gap between Daily Living (83) and Socialization (107) · Personal subdomain at ≤2% base rate
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MUSIC BEHAVIORAL SIGNATURE
// ═══════════════════════════════════════════════════════════
function MusicSignature() {
  const artists = [
    { name: "ILLENIUM", mins: 9400, genre: "Melodic Bass", color: C.crimson },
    { name: "Polyphia", mins: 2534, genre: "Math Rock", color: C.violet },
    { name: "Said The Sky", mins: 1937, genre: "Melodic Bass", color: C.blue },
    { name: "Seven Lions", mins: 868, genre: "Melodic Bass", color: C.crimson },
    { name: "Excision", mins: 680, genre: "Melodic Bass", color: C.crimson },
    { name: "Chainsmokers", mins: 624, genre: "Melodic Bass", color: C.crimson },
    { name: "Gryffin", mins: 599, genre: "Melodic Bass", color: C.crimson },
    { name: "Good Charlotte", mins: 556, genre: "Pop-Punk", color: C.rose },
    { name: "NFG", mins: 555, genre: "Pop-Punk", color: C.rose },
    { name: "Yellowcard", mins: 553, genre: "Pop-Punk", color: C.rose },
  ];
  const max = artists[0].mins;

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
        Self-Selected Auditory Stimulus — Apple Music Replay · Age 38
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 11, color: C.violet, marginBottom: 16 }}>
        The only instrument where the subject chose the data
      </div>

      {artists.map((a, i) => (
        <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 16, textAlign: "right" }}>{i + 1}</span>
          <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color: C.cream, width: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
          <div style={{ flex: 1, height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(a.mins / max) * 100}%`, background: a.color, borderRadius: 3, opacity: 0.6 }} />
          </div>
          <span style={{ fontFamily: font.mono, fontSize: 10, color: a.color, width: 48, textAlign: "right" }}>{(a.mins / 60).toFixed(0)}h</span>
          <Tag label={a.genre} color={a.color} />
        </div>
      ))}

      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 120px", padding: "10px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4, textAlign: "center" }}>
          <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: C.crimson }}>43.8%</div>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>ILLENIUM share of total</div>
        </div>
        <div style={{ flex: "1 1 120px", padding: "10px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4, textAlign: "center" }}>
          <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: C.amber }}>15,750</div>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>Personal station minutes</div>
        </div>
        <div style={{ flex: "1 1 120px", padding: "10px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4, textAlign: "center" }}>
          <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: C.rose }}>6</div>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>Pop-punk artists (2001–05 era)</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ACADEMIC TRAJECTORY
// ═══════════════════════════════════════════════════════════
function AcademicArc() {
  const semesters = [
    { term: "F04", gpa: 3.37, label: "Liberal Arts", color: C.blue },
    { term: "S05", gpa: 3.19, label: "Liberal Arts", color: C.blue },
    { term: "F05", gpa: 2.80, label: "Liberal Arts", color: C.blue },
    { term: "S06", gpa: 3.10, label: "Transfer", color: C.creamDim },
    { term: "F06", gpa: 3.15, label: "Business UG", color: C.green },
    { term: "S07", gpa: 3.36, label: "Business UG", color: C.green },
    { term: "Su07", gpa: 3.35, label: "Business UG", color: C.green },
    { term: "F07", gpa: 3.33, label: "Business UG", color: C.green },
    { term: "S08", gpa: 3.31, label: "Business UG", color: C.green },
    { term: "F08", gpa: 3.35, label: "Graduate", color: C.amber },
    { term: "S09", gpa: 3.67, label: "Graduate", color: C.amber },
  ];

  const barH = 100;

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 16px 16px" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
        Academic Trajectory — University of Kansas · 2004–2009
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: barH + 30, marginBottom: 8 }}>
        {semesters.map(s => {
          const h = ((s.gpa - 2.5) / 1.5) * barH;
          return (
            <div key={s.term} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: s.color, marginBottom: 2 }}>{s.gpa.toFixed(2)}</span>
              <div style={{
                width: "100%", height: h, background: s.color, borderRadius: "3px 3px 0 0", opacity: 0.5,
                minHeight: 4,
              }} />
              <span style={{ fontFamily: font.mono, fontSize: 7, color: C.creamDim, marginTop: 4, transform: "rotate(-45deg)", transformOrigin: "top left", whiteSpace: "nowrap" }}>
                {s.term}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: C.blue, opacity: 0.5 }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Liberal Arts</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: C.green, opacity: 0.5 }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Business UG</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: C.amber, opacity: 0.5 }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Graduate</span>
        </div>
      </div>

      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, textAlign: "center", marginTop: 8 }}>
        UG cumulative: 3.350 · Graduate: 3.690 · GPA rises when coursework aligns with CES profile
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN CONSOLE
// ═══════════════════════════════════════════════════════════
export default function ConsoleMap() {
  const [view, setView] = useState("aptitude");

  const views = [
    { id: "aptitude", label: "Aptitude Arc" },
    { id: "interest", label: "Interest Profile" },
    { id: "executive", label: "Executive Function" },
    { id: "processing", label: "Processing Split" },
    { id: "sensory", label: "Sensory Profile" },
    { id: "adaptive", label: "Adaptive Behavior" },
    { id: "academic", label: "Academic Record" },
    { id: "music", label: "Auditory Stimulus" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Template tag */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · The Dimensional Map
        </div>

        {/* Header */}
        <h1 style={{
          fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream,
          margin: "0 0 4px 0", lineHeight: 1.2,
        }}>
          Dimensional Map
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          Eight instruments. Twenty-four years. One operator. The analytical surface.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Companion to <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · Linked from <span style={{ color: C.blue }}>MindFrame</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 12, opacity: 0.5 }} />

        {/* KPI Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28, marginBottom: 8 }}>
          <KPI label="Instruments" value="8" sub="2001–2025" color={C.amber} />
          <KPI label="Theme Code" value="CES" sub="Conventional · Enterprising · Social" color={C.amber} />
          <KPI label="EF Composite" value="T70" sub="95th %ile dysfunction" color={C.crimson} />
          <KPI label="Sensation Avoiding" value="50/75" sub="Much More Than Most" color={C.crimson} />
        </div>

        {/* View Nav */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 32, marginBottom: 8 }}>
          {views.map(v => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              style={{
                padding: "8px 14px", borderRadius: 5, border: `1px solid ${view === v.id ? C.amber : C.border}`,
                background: view === v.id ? C.amberDim : C.creamGhost,
                cursor: "pointer", fontFamily: font.mono, fontSize: 10,
                color: view === v.id ? C.amber : C.creamDim,
                letterSpacing: "0.06em", transition: "all 0.15s",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Viz Panels */}
        <div style={{ marginTop: 20, minHeight: 400 }}>
          {view === "aptitude" && (
            <div>
              <SectionLabel number="01" title="The Crossover — Aptitude Arc" color={C.blue} />
              <CrossoverChart />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.blue}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  Math peaked at the 92nd percentile (age 17) and fell to the 44th by the GMAT (age 21). 
                  Verbal rose from the 63rd to the 75th over the same window. The Strong Interest Inventory, 
                  administered at age 18 between those two tests, measured Math interest at 51 (average) and 
                  Writing interest at 31 (floor). Aptitude followed interest. The verbal channel won.
                </div>
              </div>
            </div>
          )}

          {view === "interest" && (
            <div>
              <SectionLabel number="02" title="RIASEC — Vocational Interest Profile" color={C.amber} />
              <RIASECHex />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.amber}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  Conventional dominates at 75. Artistic bottoms at 31. Computer Activities and Organizational Management 
                  are the highest basic interest scales. The instrument predicted Accountant as the top occupational match 
                  at age 18. It missed the creative expression that would emerge through systems design — 
                  because no vocational inventory in 2005 had a scale for building governance architectures with AI.
                </div>
              </div>
            </div>
          )}

          {view === "executive" && (
            <div>
              <SectionLabel number="03" title="Executive Function — Brown EF/A" color={C.crimson} />
              <EFRadar />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.crimson}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  Five of six domains at or above the "significant problem" threshold. Focus at the 98th percentile for dysfunction. 
                  The 2020 qEEG attributed this to anxiety-driven over-arousal, not primary ADHD. The 2023 eval diagnosed ADHD-PI 
                  alongside Bipolar II. Both agree: the brain works harder than comfortable to process, activate, and sustain. 
                  DDL's externalized systems — checklists, governance standards, structured routines — are the compensatory architecture.
                </div>
              </div>
            </div>
          )}

          {view === "processing" && (
            <div>
              <SectionLabel number="04" title="Processing Channels — Auditory vs Visual" color={C.ember} />
              <ProcessingSplit />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.ember}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  Consistent auditory deficit across response control (82), attention (91), and the Vineland's Expressive subdomain (v=12). 
                  Visual channels are average to above-average across all measures. The operator processes better through reading 
                  than listening, and outputs better through writing than speaking. Text-based AI collaboration — 
                  the primary medium of DDL's entire methodology — plays directly to both sides of this split.
                </div>
              </div>
            </div>
          )}

          {view === "sensory" && (
            <div>
              <SectionLabel number="05" title="Sensory Processing Profile" color={C.crimson} />
              <SensoryQuadrant />
            </div>
          )}

          {view === "adaptive" && (
            <div>
              <SectionLabel number="06" title="Adaptive Behavior — The Inversion" color={C.green} />
              <AdaptiveBehavior />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.green}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  Daily Living Skills at the 13th percentile. Socialization at the 68th. Personal self-sufficiency is a ≤2% base rate weakness. 
                  Community functioning is a strength. The profile: someone who struggles with mundane personal maintenance 
                  but excels at navigating external systems and social structures. "Medicated, calibrated, and defrictionated" 
                  is a compensatory architecture for a documented adaptive behavior gap.
                </div>
              </div>
            </div>
          )}

          {view === "academic" && (
            <div>
              <SectionLabel number="07" title="Academic Trajectory" color={C.green} />
              <AcademicArc />
            </div>
          )}

          {view === "music" && (
            <div>
              <SectionLabel number="08" title="Auditory Regulation Stack" color={C.violet} />
              <MusicSignature />
              <div style={{
                marginTop: 12, padding: "12px 16px", background: C.card,
                borderLeft: `3px solid ${C.violet}`, borderRadius: "0 6px 6px 0",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                  9,400 minutes of ILLENIUM. Melodic bass provides structured sonic density — predictable builds, 
                  reliable catharsis, a wall of sound that displaces chaotic environmental input for a Sensation Avoider at 50/75. 
                  Polyphia provides pattern recognition as music — feeding the same Occipital Alpha creativity the qEEG identified. 
                  Six pop-punk artists anchor to the 2001–2005 formative window. The listening is heavily curated, not passive. 
                  The operator builds auditory environments the same way he builds governance systems.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2, borderRadius: 1, marginBottom: 12,
            background: `linear-gradient(90deg, ${C.amber}, ${C.crimson}, ${C.blue}, ${C.green}, ${C.violet})`,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CONSOLE · The Dimensional Map
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              dropdownlogistics.com · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

