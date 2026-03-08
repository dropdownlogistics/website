'use client';
import { useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
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
  rose: "#c94a6e",
  ember: "#c98a4a",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Data — Instruments as nodes
// ═══════════════════════════════════════════════════════════
const instruments = [
  {
    id: "psat1", label: "PSAT '01", year: 2001, age: 15, type: "Aptitude", color: C.blue,
    x: 120, y: 100,
    measured: "Verbal 63rd · Math 81st · Writing 76th",
    found: "Math leads all domains. Career: undecided. The baseline nobody looked at.",
  },
  {
    id: "psat2", label: "PSAT '02", year: 2002, age: 16, type: "Aptitude", color: C.blue,
    x: 240, y: 80,
    measured: "Verbal 83rd · Math 92nd · Writing 64th",
    found: "Math peaks at top decile. Career: business. The peak he didn't know was a peak.",
  },
  {
    id: "strong", label: "Strong", year: 2005, age: 18, type: "Vocational", color: C.amber,
    x: 410, y: 140,
    measured: "CES theme · Computer Activities: Very High · Artistic: 31 · Writing: 31 · Math Interest: 51",
    found: "Named the Conventional operator. Predicted Accountant. Missed the creativity. Floor-scored the future writer.",
  },
  {
    id: "gmat", label: "GMAT", year: 2008, age: 21, type: "Aptitude", color: C.green,
    x: 560, y: 100,
    measured: "Verbal 75th · Quant 44th · Total 650 (82nd)",
    found: "The inversion. Math fell 48 points. Verbal rose 12. Aptitude followed interest downward.",
  },
  {
    id: "ku", label: "KU", year: "04–09", age: "18–23", type: "Academic", color: C.green,
    x: 490, y: 260,
    measured: "BS Business 3.35 · Master of Accounting 3.69 · 141 hours",
    found: "GPA spikes where coursework meets CES profile. A's cluster at accounting × technology intersection.",
  },
  {
    id: "neuro", label: "qEEG", year: 2020, age: 33, type: "Neurological", color: C.ember,
    x: 180, y: 320,
    measured: "Over-aroused · No ADHD · High Beta (Parietal) · High Alpha (Occipital) · Left-dominant",
    found: "Named the anxiety mechanism. Found creativity through pattern recognition. Said Adderall was Red Bull for a bull.",
  },
  {
    id: "psych", label: "Sharpe", year: 2023, age: 37, type: "Clinical", color: C.rose,
    x: 400, y: 400,
    measured: "Bipolar II · ADHD-PI · Brown EF T=70 · IVA aud 82/vis 107 · Sensation Avoiding 50/75 · DLS 13th %ile",
    found: "Mapped everything. Executive function, processing split, sensory profile, adaptive inversion. The full architecture.",
  },
  {
    id: "music", label: "Music", year: 2025, age: 38, type: "Behavioral", color: C.violet,
    x: 620, y: 340,
    measured: "ILLENIUM 9,400 min · Polyphia 2,534 min · 6 pop-punk artists · Personal station 15,750 min",
    found: "The only instrument the subject chose. Melodic bass for regulation. Math rock for pattern recognition. The behavioral signature.",
  },
];

// ═══════════════════════════════════════════════════════════
// Data — Connections as edges (the throughlines)
// ═══════════════════════════════════════════════════════════
const connections = [
  {
    id: "crossover",
    from: "psat2", to: "gmat",
    label: "The Crossover",
    color: C.blue,
    desc: "Math fell from 92nd to 44th percentile. Verbal rose from 83rd to 75th. The lines crossed. Aptitude followed interest.",
    via: ["strong"],
  },
  {
    id: "interest-decay",
    from: "psat2", to: "strong",
    label: "Interest Decay",
    color: C.amber,
    desc: "Math aptitude at 92nd (age 16). Math interest at 51 — average (age 18). The Strong measured the disinterest two years before the GMAT confirmed the aptitude loss.",
  },
  {
    id: "conventional-prediction",
    from: "strong", to: "ku",
    label: "The Prediction",
    color: C.amber,
    desc: "CES theme, Accountant #1 match. Degree: Master of Accounting & Information Systems. The literal intersection of the two highest interest domains.",
  },
  {
    id: "creativity-misclass",
    from: "strong", to: "neuro",
    label: "Creativity Misclassification",
    color: C.ember,
    desc: "Strong: Artistic 31, Writing 31, floor scores. qEEG: High Occipital Alpha, elevated creativity — through pattern recognition, not traditional art. The instrument measured the wrong channel.",
  },
  {
    id: "diagnostic-diverge",
    from: "neuro", to: "psych",
    label: "Diagnostic Divergence",
    color: C.rose,
    desc: "qEEG: No ADHD indicators, anxiety-driven fog. Sharpe: ADHD-PI (7/9 inattentive). Both agree on core mechanism — over-aroused brain, anxiety cascade. Differ on whether inattention is primary or symptomatic.",
  },
  {
    id: "aud-vis-split",
    from: "psych", to: "music",
    label: "Processing → Listening",
    color: C.violet,
    desc: "IVA: auditory 82 (impaired), visual 107. Polyphia is instrumental — no lyrics, no language load through the weak channel. ILLENIUM's vocals externalize what the Expressive deficit (v=12) makes harder to say.",
  },
  {
    id: "sensory-sonic",
    from: "psych", to: "music",
    label: "Sensory → Sonic",
    color: C.crimson,
    desc: "Sensation Avoiding 50/75. Melodic bass fills the auditory field, displacing chaotic input. Build-drop-resolve provides predictable structure. Curated playlists = controlled auditory environment.",
  },
  {
    id: "activation-bpm",
    from: "psych", to: "music",
    label: "Activation → BPM",
    color: C.rose,
    desc: "Brown EF Activation T=70 (95th %ile dysfunction). ILLENIUM BPM 140-174 provides external activation energy. The tempo does the work the executive function system can't initiate.",
  },
  {
    id: "occipital-polyphia",
    from: "neuro", to: "music",
    label: "Alpha → Math Rock",
    color: C.violet,
    desc: "Occipital Alpha = creativity through pattern recognition and connecting dots. Polyphia = pattern recognition as music. Odd time signatures, polyrhythmic interlocking. Auditory dimensional modeling.",
  },
  {
    id: "gpa-ces",
    from: "ku", to: "strong",
    label: "GPA Tracks CES",
    color: C.green,
    desc: "3.0 in liberal arts prerequisites. 3.35 in business core. 3.69 in graduate Accounting × IS courses. Performance rises as coursework converges on CES interest profile.",
  },
  {
    id: "nostalgia-anchor",
    from: "psat1", to: "music",
    label: "Temporal Anchor",
    color: C.blue,
    desc: "6 pop-punk artists in the 2025 top 20 — all from 2001–2005. The formative measurement window. The music playing when the numbers were being generated is still playing 20 years later.",
  },
  {
    id: "ef-systems",
    from: "psych", to: "ku",
    label: "EF → Externalized Systems",
    color: C.rose,
    desc: "Brown EF composite T=70. Daily Living 13th %ile. But GPA 3.69 in graduate school. The academic system provided the external structure the executive function couldn't. DDL is the permanent version.",
  },
];

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function Reconciliation() {
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [revealedNodes, setRevealedNodes] = useState(new Set(["psat1"]));
  const [revealedEdges, setRevealedEdges] = useState(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  const revealOrder = ["psat1", "psat2", "strong", "gmat", "ku", "neuro", "psych", "music"];

  const revealNext = useCallback(() => {
    const currentCount = revealedNodes.size;
    if (currentCount >= instruments.length) {
      // All nodes revealed — reveal all edges
      setAllRevealed(true);
      setRevealedEdges(new Set(connections.map(c => c.id)));
      return;
    }
    const nextId = revealOrder[currentCount];
    const newNodes = new Set(revealedNodes);
    newNodes.add(nextId);
    setRevealedNodes(newNodes);

    // Reveal edges that connect already-revealed nodes
    const newEdges = new Set(revealedEdges);
    connections.forEach(c => {
      if (newNodes.has(c.from) && newNodes.has(c.to)) {
        newEdges.add(c.id);
      }
    });
    setRevealedEdges(newEdges);
  }, [revealedNodes, revealedEdges]);

  const revealAll = useCallback(() => {
    setRevealedNodes(new Set(instruments.map(n => n.id)));
    setRevealedEdges(new Set(connections.map(c => c.id)));
    setAllRevealed(true);
  }, []);

  const reset = useCallback(() => {
    setRevealedNodes(new Set(["psat1"]));
    setRevealedEdges(new Set());
    setAllRevealed(false);
    setActiveNode(null);
    setActiveEdge(null);
  }, []);

  const svgW = 740;
  const svgH = 480;

  const getNode = (id) => instruments.find(n => n.id === id);

  // Determine which edges to highlight based on active node
  const activeEdges = activeNode
    ? connections.filter(c => c.from === activeNode || c.to === activeNode).map(c => c.id)
    : [];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Header */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · The Reconciliation
        </div>

        <h1 style={{
          fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic",
          color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15,
        }}>
          Every instrument was correct.
        </h1>
        <p style={{
          fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.6,
          margin: "0 0 24px 0", maxWidth: 560,
        }}>
          None of them told the whole story. Click through to lay the numbers on the same table 
          and watch the connections appear.
        </p>

        {/* Controls */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          <button onClick={revealNext} style={{
            padding: "8px 18px", borderRadius: 5, border: `1px solid ${C.amber}`,
            background: C.amberDim, cursor: "pointer", fontFamily: font.mono, fontSize: 11,
            color: C.amber, letterSpacing: "0.04em",
          }}>
            {revealedNodes.size >= instruments.length && !allRevealed ? "Draw connections" : allRevealed ? "All revealed" : `Reveal next (${revealedNodes.size}/${instruments.length})`}
          </button>
          <button onClick={revealAll} style={{
            padding: "8px 14px", borderRadius: 5, border: `1px solid ${C.border}`,
            background: C.creamGhost, cursor: "pointer", fontFamily: font.mono, fontSize: 10,
            color: C.creamDim,
          }}>Show all</button>
          <button onClick={reset} style={{
            padding: "8px 14px", borderRadius: 5, border: `1px solid ${C.border}`,
            background: C.creamGhost, cursor: "pointer", fontFamily: font.mono, fontSize: 10,
            color: C.creamDim,
          }}>Reset</button>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, display: "flex", alignItems: "center", marginLeft: 8 }}>
            {revealedNodes.size} instruments · {revealedEdges.size} connections
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SVG CONSTELLATION */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "8px", marginBottom: 20, overflowX: "auto",
        }}>
          <svg width={svgW} height={svgH} style={{ display: "block", maxWidth: "100%" }} viewBox={`0 0 ${svgW} ${svgH}`}>
            {/* Edges */}
            {connections.map(c => {
              if (!revealedEdges.has(c.id)) return null;
              const from = getNode(c.from);
              const to = getNode(c.to);
              const isActive = activeEdge === c.id || activeEdges.includes(c.id);
              const opacity = activeEdge ? (isActive ? 0.7 : 0.08) : activeNode ? (isActive ? 0.6 : 0.06) : 0.25;

              return (
                <g key={c.id} style={{ cursor: "pointer" }} onClick={() => setActiveEdge(activeEdge === c.id ? null : c.id)}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={c.color} strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={opacity}
                    strokeDasharray={isActive ? "none" : "4,4"}
                  />
                  {/* Edge label */}
                  {isActive && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 8}
                      fill={c.color}
                      fontSize={9}
                      fontFamily={font.mono}
                      textAnchor="middle"
                      opacity={0.9}
                    >
                      {c.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {instruments.map(n => {
              if (!revealedNodes.has(n.id)) return null;
              const isActive = activeNode === n.id;
              const isConnected = activeNode ? connections.some(c =>
                (c.from === activeNode && c.to === n.id) || (c.to === activeNode && c.from === n.id)
              ) : false;
              const dimmed = activeNode && !isActive && !isConnected;

              return (
                <g
                  key={n.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => { setActiveNode(isActive ? null : n.id); setActiveEdge(null); }}
                >
                  {/* Glow */}
                  {isActive && (
                    <circle cx={n.x} cy={n.y} r={32} fill={n.color} opacity={0.08} />
                  )}
                  {/* Outer ring */}
                  <circle
                    cx={n.x} cy={n.y} r={isActive ? 22 : 18}
                    fill={C.navy}
                    stroke={n.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={dimmed ? 0.2 : 1}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={n.x} cy={n.y} r={4}
                    fill={n.color}
                    opacity={dimmed ? 0.2 : 0.7}
                  />
                  {/* Label */}
                  <text
                    x={n.x} y={n.y - 26}
                    fill={dimmed ? C.creamDim : n.color}
                    fontSize={11}
                    fontFamily={font.mono}
                    fontWeight="600"
                    textAnchor="middle"
                    opacity={dimmed ? 0.3 : 1}
                  >
                    {n.label}
                  </text>
                  {/* Year */}
                  <text
                    x={n.x} y={n.y + 32}
                    fill={C.creamDim}
                    fontSize={9}
                    fontFamily={font.mono}
                    textAnchor="middle"
                    opacity={dimmed ? 0.15 : 0.5}
                  >
                    {n.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* DETAIL PANEL */}
        {/* ═══════════════════════════════════════════════ */}
        {(activeNode || activeEdge) && (
          <div style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "20px", marginBottom: 20,
            animation: "fadeIn 0.2s ease",
          }}>
            {activeNode && (() => {
              const n = getNode(activeNode);
              const nodeEdges = connections.filter(c =>
                revealedEdges.has(c.id) && (c.from === activeNode || c.to === activeNode)
              );
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.cream }}>{n.label}</div>
                      <div style={{ fontFamily: font.mono, fontSize: 10, color: n.color }}>{n.year} · Age {n.age} · {n.type}</div>
                    </div>
                    <span style={{
                      fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3,
                      background: n.color + "18", color: n.color,
                    }}>{n.type}</span>
                  </div>

                  <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                    What it measured
                  </div>
                  <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, marginBottom: 12, lineHeight: 1.6 }}>{n.measured}</div>

                  <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                    What it found
                  </div>
                  <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7, marginBottom: 16 }}>{n.found}</div>

                  {nodeEdges.length > 0 && (
                    <>
                      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                        Connections ({nodeEdges.length})
                      </div>
                      {nodeEdges.map(e => {
                        const other = getNode(e.from === activeNode ? e.to : e.from);
                        return (
                          <div
                            key={e.id}
                            onClick={(ev) => { ev.stopPropagation(); setActiveEdge(e.id); setActiveNode(null); }}
                            style={{
                              padding: "8px 12px", marginBottom: 4,
                              background: e.color + "08", borderLeft: `2px solid ${e.color}`,
                              borderRadius: "0 4px 4px 0", cursor: "pointer",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                              <span style={{ fontFamily: font.mono, fontSize: 11, color: e.color }}>{e.label}</span>
                              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>→ {other.label} ({other.year})</span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })()}

            {activeEdge && !activeNode && (() => {
              const e = connections.find(c => c.id === activeEdge);
              const from = getNode(e.from);
              const to = getNode(e.to);
              return (
                <div>
                  <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: e.color, marginBottom: 4 }}>
                    {e.label}
                  </div>
                  <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 16 }}>
                    {from.label} ({from.year}) → {to.label} ({to.year})
                  </div>
                  <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
                    {e.desc}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    <button onClick={() => { setActiveNode(e.from); setActiveEdge(null); }} style={{
                      padding: "6px 12px", borderRadius: 4, border: `1px solid ${from.color}40`,
                      background: from.color + "10", cursor: "pointer",
                      fontFamily: font.mono, fontSize: 10, color: from.color,
                    }}>← {from.label}</button>
                    <button onClick={() => { setActiveNode(e.to); setActiveEdge(null); }} style={{
                      padding: "6px 12px", borderRadius: 4, border: `1px solid ${to.color}40`,
                      background: to.color + "10", cursor: "pointer",
                      fontFamily: font.mono, fontSize: 10, color: to.color,
                    }}>{to.label} →</button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* EPILOGUE — appears when all revealed */}
        {/* ═══════════════════════════════════════════════ */}
        {allRevealed && (
          <div style={{
            borderLeft: `3px solid ${C.crimson}`, padding: "16px 24px",
            background: C.crimsonFaint, borderRadius: "0 6px 6px 0",
            marginTop: 24,
          }}>
            <p style={{
              fontFamily: font.body, fontSize: 16, fontStyle: "italic",
              color: C.creamHigh, lineHeight: 1.7, margin: "0 0 12px 0",
            }}>
              Eight instruments. Twelve connections. Twenty-four years.
            </p>
            <p style={{
              fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7, margin: 0,
            }}>
              The PSAT didn't know the Strong would explain why the math score fell. 
              The Strong didn't know the neurofeedback would find the creativity it missed. 
              The neurofeedback didn't know the psych eval would contradict its ADHD finding while confirming its core mechanism. 
              The psych eval didn't know the music would validate its sensory profile. 
              No instrument was designed to talk to the others. The reconciliation was the life that connected them.
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2, borderRadius: 1, marginBottom: 12,
            background: `linear-gradient(90deg, ${C.blue}, ${C.amber}, ${C.green}, ${C.ember}, ${C.rose}, ${C.violet})`,
          }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · The Reconciliation · 8 instruments · 12 connections · 24 years
          </div>
        </div>
      </div>
    </div>
  );
}

