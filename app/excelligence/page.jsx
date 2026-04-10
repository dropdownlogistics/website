'use client'

import { useState, useEffect, useRef } from "react";

// ============================================================
// ANIMATED COUNTER
// ============================================================
function AnimatedCount({ target, duration = 1400, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ============================================================
// TIER BADGE
// ============================================================
const TIER_COLORS = {
  Beginner: "#10B981",
  Intermediate: "#3B82F6",
  Advanced: "#8B5CF6",
  Expert: "#EF4444",
};

const TYPE_COLORS = {
  FRM: "#2563EB", PTN: "#059669", KEY: "#D97706", CON: "#7C3AED",
  ARC: "#DC2626", ANT: "#6B7280", PQ: "#0891B2",
};

const TYPE_NAMES = {
  FRM: "Formulas", PTN: "Patterns", KEY: "Shortcuts", CON: "Conventions",
  ARC: "Architecture", ANT: "Anti-Patterns", PQ: "Power Query",
};

// ============================================================
// SAMPLE PATHS (illustrative)
// ============================================================
const PATHS = [
  {
    name: "Beginner to Dashboard",
    description: "From your first Table to a selector-driven matrix.",
    steps: ["KEY-0001", "FRM-0001", "FRM-0002", "ARC-0002", "ARC-0003"],
    labels: ["Ctrl+T", "XLOOKUP", "LET", "Spill Ranges", "Selector Dashboard"],
    tiers: ["Beginner", "Intermediate", "Advanced", "Advanced", "Expert"],
  },
  {
    name: "Anti-Pattern Escape",
    description: "Stop doing it wrong. Start doing it governed.",
    steps: ["ANT-0001", "CON-0001", "ANT-0003", "PTN-0002", "FRM-0002"],
    labels: ["Merged Cells", "Center Across", "Hardcoded Values", "Named Ranges", "LET"],
    tiers: ["Beginner", "Beginner", "Beginner", "Beginner", "Advanced"],
  },
  {
    name: "Power Query Pipeline",
    description: "From raw file to governed, refreshable data.",
    steps: ["PQ-0001", "PQ-0003", "PQ-0002", "PQ-0004", "PQ-0006"],
    labels: ["Load to Table", "Type Enforce", "Unpivot", "Append", "Folder Ingest"],
    tiers: ["Intermediate", "Intermediate", "Advanced", "Advanced", "Expert"],
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ExcelligenceLanding() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0d0d12 0%, #12121a 50%, #0d1117 100%)",
      fontFamily: "'Space Grotesk', sans-serif",
      color: "#e8e4da",
      padding: "0",
      boxSizing: "border-box",
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 0.8s ease",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* === HERO === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 24px 60px",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: 3,
          color: "#B23531",
          textTransform: "uppercase",
          marginBottom: 16,
        }}>
          Dropdown Logistics
        </div>

        <h1 style={{
          fontSize: 42,
          fontWeight: 700,
          margin: "0 0 12px",
          letterSpacing: -1.5,
          lineHeight: 1.1,
          color: "#F5F1EB",
        }}>
          EXCELLIGENCE
        </h1>

        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 18,
          color: "#7a7668",
          fontStyle: "italic",
          margin: "0 0 32px",
          lineHeight: 1.5,
        }}>
          What I know about Excel, structured so others can learn it.
        </p>

        <p style={{
          fontSize: 14,
          color: "#94918a",
          lineHeight: 1.7,
          maxWidth: 580,
          margin: "0 auto 40px",
        }}>
          A governed knowledge graph of Excel formulas, patterns, shortcuts,
          conventions, architectures, and anti-patterns — connected by
          typed relationships that show you what to learn, what it depends on,
          and what breaks when you get it wrong.
        </p>

        <p style={{
          fontSize: 13,
          color: "#5a5648",
          lineHeight: 1.6,
          maxWidth: 520,
          margin: "0 auto",
        }}>
          Not a glossary. Not a tutorial. A graph that reveals how
          Excel knowledge actually connects — and shows you the
          governed path between where you are and where you want to be.
        </p>
      </div>

      {/* === STATS === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}>
        {[
          { label: "Entries", value: 105 },
          { label: "Edges", value: 228 },
          { label: "Aliases", value: 224 },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "rgba(178,53,49,0.04)",
            border: "1px solid rgba(178,53,49,0.12)",
            borderRadius: 8,
            padding: "18px 12px",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 600,
              color: "#F5F1EB",
              marginBottom: 4,
            }}>
              <AnimatedCount target={stat.value} />
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              letterSpacing: 1.5,
              color: "#5a5648",
              textTransform: "uppercase",
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* === WHAT'S INSIDE === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 2.5,
          color: "#B23531",
          textTransform: "uppercase",
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(178,53,49,0.12)",
        }}>
          Seven Entry Types
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 10,
        }}>
          {Object.entries(TYPE_COLORS).map(([code, color]) => {
            const counts = { FRM: 30, PTN: 19, KEY: 8, CON: 11, ARC: 11, ANT: 16, PQ: 10 };
            return (
              <div key={code} style={{
                background: `${color}0A`,
                border: `1px solid ${color}20`,
                borderRadius: 8,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `${color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{code}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e4da" }}>{TYPE_NAMES[code]}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, color: "#5a5648",
                  }}>{counts[code]} entries</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === FOUR TIERS === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 2.5,
          color: "#B23531",
          textTransform: "uppercase",
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(178,53,49,0.12)",
        }}>
          Four Skill Tiers
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { tier: "Beginner", count: 30, desc: "Foundation concepts. Where everyone starts." },
            { tier: "Intermediate", count: 40, desc: "Comfortable daily use. The working layer." },
            { tier: "Advanced", count: 29, desc: "Complex combinations and architecture." },
            { tier: "Expert", count: 6, desc: "Institutional-grade patterns. Full Dave." },
          ].map((t, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 0",
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: TIER_COLORS[t.tier],
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8e4da" }}>{t.tier}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, color: TIER_COLORS[t.tier],
                    marginLeft: "auto",
                  }}>{t.count} entries</span>
                </div>
                <div style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 12, color: "#7a7668", lineHeight: 1.4,
                }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === SAMPLE PATHS === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 2.5,
          color: "#B23531",
          textTransform: "uppercase",
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(178,53,49,0.12)",
        }}>
          Sample Learning Paths
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PATHS.map((path, pi) => (
            <div
              key={pi}
              style={{
                background: hoveredPath === pi ? "rgba(178,53,49,0.06)" : "rgba(255,255,255,0.015)",
                border: "1px solid rgba(178,53,49,0.08)",
                borderRadius: 10,
                padding: "18px 20px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={() => setHoveredPath(pi)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#e8e4da" }}>{path.name}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: "#5a5648",
                }}>{path.steps.length} steps</span>
              </div>
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 12, color: "#7a7668", marginBottom: 14, lineHeight: 1.4,
              }}>{path.description}</div>

              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                {path.steps.map((step, si) => (
                  <div key={si} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "4px 10px",
                      background: `${TIER_COLORS[path.tiers[si]]}10`,
                      border: `1px solid ${TIER_COLORS[path.tiers[si]]}25`,
                      borderRadius: 6,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: TIER_COLORS[path.tiers[si]],
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10, color: "#e8e4da", fontWeight: 500,
                      }}>{path.labels[si]}</span>
                    </div>
                    {si < path.steps.length - 1 && (
                      <span style={{
                        color: "#3a3830", fontSize: 10, padding: "0 4px",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === THE GRAPH DIFFERENCE === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.015)",
          borderRadius: 10,
          padding: "28px 28px",
          border: "1px solid rgba(178,53,49,0.06)",
        }}>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            color: "#7a7668",
            fontStyle: "italic",
            lineHeight: 1.7,
            marginBottom: 16,
          }}>
            Every existing Excel resource does flat lookup: name to definition.
            ExcelJet, Microsoft docs, even AI answers.
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            color: "#a09a8c",
            lineHeight: 1.7,
          }}>
            Nobody maps name to intent to tier to progression to what breaks to
            what comes next. The graph structure is the difference. When you search
            Excelligence, you don't just find XLOOKUP. You find that it leads to LET,
            which leads to MAKEARRAY, which is the engine behind every dashboard
            I've ever built. That's a skill progression path, not a search result.
          </div>
        </div>
      </div>

      {/* === COMING SOON === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 56px",
        padding: "0 24px",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: 2.5,
          color: "#B23531",
          textTransform: "uppercase",
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(178,53,49,0.12)",
        }}>
          Coming Soon — The Living Graph
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}>
          {[
            {
              icon: "⚡",
              title: "Live API",
              desc: "The registry becomes a service. Entries update in real time without redeployment. Powered by a local LLM on dedicated hardware.",
              status: "In Development",
            },
            {
              icon: "🧭",
              title: "/learn/ Wing",
              desc: "A governed decomposition library with registry-linked entries. Six entries live: Hardcoded Values, Control Panel, LET, XLOOKUP, SUMIFS, LAMBDA. Four-tab format per entry. Live at excelligence.dev/learn.",
              status: "Live",
            },
            {
              icon: "🤖",
              title: "Anti-Pattern Scanner",
              desc: "Registry-driven anti-pattern detection. 16 ANT entries, ~$0.02/scan. No hardcoded rules — the registry is the rulebook. Live at excelligence.dev/scanner.",
              status: "Live",
            },
            {
              icon: "📊",
              title: "Companion Workbook",
              desc: "An Excel workbook connected to the registry via Power Query. Refresh to get the latest entries. Practice in your own environment.",
              status: "Planned",
            },
            {
              icon: "🧠",
              title: "AI Proficiency Mapping",
              desc: "A guided conversation that assesses your Excel + AI skills and places you on the graph. Your score becomes a starting node.",
              status: "Designed",
            },
            {
              icon: "🔍",
              title: "Workbook Scanner",
              desc: "Upload a workbook. The system maps your formulas to the registry, detects anti-patterns, and suggests governed upgrades.",
              status: "Cathedral",
            },
            {
              icon: "♟",
              title: "GridTactics",
              desc: "Formula chess. Declare a piece, solve the target cell, score based on what you used. Game B is the default — here's the target, get there however you want. Game A is Hard Mode — commit before you see the board. Live at excelligence.dev/gridtactics.",
              status: "Live",
            },
            {
              icon: "🃏",
              title: "Formula Card",
              desc: "A persistent player identity card showing tier mastery, favorite formula, and total sessions. Powered by Ledger. Your score becomes your credential.",
              status: "Designed",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(178,53,49,0.06)",
              borderRadius: 10,
              padding: "18px 18px 14px",
            }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
              <div style={{
                fontSize: 14, fontWeight: 600, color: "#e8e4da",
                marginBottom: 6,
              }}>{item.title}</div>
              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 12, color: "#7a7668", lineHeight: 1.5,
                marginBottom: 10,
              }}>{item.desc}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: item.status === "Live" ? "#4A9E6B"
                     : item.status === "In Development" ? "#C49A3C"
                     : item.status === "Designed" ? "#6B9DC2"
                     : item.status === "Cathedral" ? "#8a6cc9"
                     : "#5a5648",
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}>{item.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* === CTA === */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto 40px",
        padding: "0 24px",
        textAlign: "center",
      }}>
        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/excelligence/explorer"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              background: "#B23531",
              color: "#F5F1EB",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: 0.5,
              transition: "all 0.2s",
              border: "1px solid rgba(178,53,49,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C94440";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#B23531";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Enter the Graph →
          </a>
          <a
            href="https://excelligence.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              background: "transparent",
              color: "#F5F1EB",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: 0.5,
              transition: "all 0.2s",
              border: "1px solid rgba(178,53,49,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(178,53,49,0.08)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Visit excelligence.dev ↗
          </a>
        </div>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#3a3830",
          marginTop: 12,
        }}>
          105 entries · 228 edges · 7 types · 4 tiers · Interactive explorer with Path Finder
        </p>
      </div>

      {/* === FOOTER === */}
      <div style={{
        maxWidth: 800,
        margin: "48px auto 0",
        padding: "32px 24px 48px",
        textAlign: "center",
        borderTop: "1px solid rgba(178,53,49,0.08)",
      }}>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 14,
          color: "#5a5648",
          fontStyle: "italic",
          marginBottom: 6,
        }}>
          Same engine. Different data. Every time.
        </div>
        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 12,
          color: "#3a3830",
          fontStyle: "italic",
          marginBottom: 16,
        }}>
          Built by one person. Governed by a nine-model council.
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "#2a2820",
          letterSpacing: 2,
        }}>
          CHAOS → STRUCTURED → AUTOMATED
        </div>
      </div>
    </div>
  );
}

