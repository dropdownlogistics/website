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
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
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
// Primitives
// ═══════════════════════════════════════════════════════════
function KPI({ label, value, sub, color = C.cream }) {
  return (
    <div style={{
      flex: "1 1 155px", minWidth: 140, background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 6,
      padding: "16px 14px 12px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.4 }} />
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

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function ExecConcept() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "48px 24px 64px" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>
              DDL · CONSOLE · Executive Concept
            </div>
            <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 4 }}>
              A Conversation That Listens Back
            </h1>
            <div style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, fontStyle: "italic" }}>
              Behavioral intelligence through guided conversation
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>March 2026</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Confidential</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Dropdown Logistics</div>
          </div>
        </div>

        <div style={{ height: 2, width: 56, background: C.crimson, opacity: 0.5, marginBottom: 32 }} />

        {/* ── KPI ROW ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
          <KPI label="Assessment Market" value="$2.8B" sub="Annual · Self-report based" color={C.amber} />
          <KPI label="Test-Retest Failure" value="~50%" sub="Same person, different results" color={C.rose} />
          <KPI label="Active AI Users" value="250M+" sub="No behavioral persistence layer" color={C.blue} />
          <KPI label="Converging TAM" value="$40B" sub="5 markets, one gap" color={C.green} />
        </div>

        {/* ── THESIS ── */}
        <div style={{
          background: C.crimson + "08",
          borderLeft: `3px solid ${C.crimson}`,
          borderRadius: "0 8px 8px 0",
          padding: "24px 28px",
          marginBottom: 36,
        }}>
          <div style={{ fontFamily: font.body, fontSize: 20, color: C.cream, fontStyle: "italic", lineHeight: 1.5 }}>
            Every personality assessment asks who you think you are. We measure who you actually are — by watching how you perform during guided conversations where you're focused on something else entirely.
          </div>
        </div>

        {/* ── THE THREE LAYERS ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Three-Layer Architecture
          </div>

          {[
            {
              layer: "Surface",
              label: "Useful Conversation",
              desc: "Job interview prep, relationship rehearsal, pitch practice, negotiation training, self-discovery. The person comes for the practice. Real value, real utility.",
              color: C.blue,
            },
            {
              layer: "Middle",
              label: "Behavioral Calibration",
              desc: "Three MindFrame engines run simultaneously — ProficiencyStack (communication patterns), ToneprintShaper (emotional register), CraniumCartographer (cognitive architecture). Calibration happens from behavior, not self-report.",
              color: C.amber,
            },
            {
              layer: "Deep",
              label: "Multi-Model Convergence",
              desc: "Transcript analyzed independently by 9 AI models. Convergence map shows strong signals. Divergence surfaces nuance. Blind spots are documented alongside findings. Full transparency — no black box.",
              color: C.violet,
            },
          ].map((l, i) => (
            <div key={l.layer} style={{
              display: "flex",
              gap: 16,
              marginBottom: 10,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 44,
                flexShrink: 0,
                textAlign: "center",
                paddingTop: 14,
              }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l.layer}</div>
                {i < 2 && <div style={{ width: 1, height: 24, background: C.border, margin: "6px auto 0" }} />}
              </div>
              <div style={{
                flex: 1,
                background: C.card,
                borderLeft: `3px solid ${l.color}`,
                borderRadius: "0 7px 7px 0",
                padding: "14px 18px",
              }}>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 6 }}>{l.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{l.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── OUTPUT ── */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 36,
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.green, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Output: Behavioral Dossier
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7, marginBottom: 16 }}>
            Not a four-letter type. Not a color. Not a spirit animal. A longitudinal behavioral profile covering communication patterns, decision-making style, conflict architecture, cognitive signature, and documented blind spots. Each session adds a layer. Ten sessions across different contexts builds a dimensional map — the first behavioral profile that gets more accurate over time.
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Tag label="Communication Style" color={C.blue} />
            <Tag label="Decision Patterns" color={C.amber} />
            <Tag label="Conflict Architecture" color={C.rose} />
            <Tag label="Cognitive Signature" color={C.violet} />
            <Tag label="Blind Spots" color={C.ember} />
            <Tag label="Dimensional Map" color={C.green} />
          </div>
        </div>

        {/* ── MARKET POSITION ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.rose, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
            Market Position
          </div>
          <div style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr",
              gap: 1,
              background: C.border,
            }}>
              {["Capability", "Us", "Self-Report Tests", "AI Personality Tools", "HR Tech"].map((h) => (
                <div key={h} style={{
                  fontFamily: font.mono, fontSize: 9, color: h === "Us" ? C.crimson : C.creamDim,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "10px 12px", background: C.card,
                }}>
                  {h}
                </div>
              ))}
            </div>
            {/* Data rows */}
            {[
              { cap: "Behavioral (not self-report)", us: true, sr: false, ai: "Partial", hr: false },
              { cap: "Multi-model convergence", us: true, sr: false, ai: false, hr: false },
              { cap: "Longitudinal profiling", us: true, sr: false, ai: false, hr: false },
              { cap: "Useful standalone product", us: true, sr: false, ai: false, hr: true },
              { cap: "Privacy-first / user-controlled", us: true, sr: "N/A", ai: false, hr: "Partial" },
              { cap: "Context-rich (multiple scenarios)", us: true, sr: false, ai: false, hr: false },
            ].map((r, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr",
                gap: 1,
                background: C.border,
              }}>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, padding: "9px 12px", background: C.card }}>{r.cap}</div>
                {[r.us, r.sr, r.ai, r.hr].map((v, j) => (
                  <div key={j} style={{ fontFamily: font.mono, fontSize: 12, padding: "9px 12px", background: C.card,
                    color: v === true ? C.green : v === false ? C.rose : C.creamDim,
                  }}>
                    {v === true ? "✓" : v === false ? "✕" : v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── PROOF OF CONCEPT ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
            Proof of Concept — Already Built
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              {
                title: "Foreword Convergence",
                stat: "9/9",
                desc: "Nine AI models independently analyzed a memoir's architecture. All found the same thesis. Zero coordination. The multi-model methodology works.",
                color: C.crimson,
              },
              {
                title: "Operator Dossier",
                stat: "24 yrs",
                desc: "14 documents, 8 instruments, 24 years. Longitudinal profiling across psychometrics, neurology, clinical eval, and behavioral data. The output format works.",
                color: C.violet,
              },
              {
                title: "Prediction Audit",
                stat: "0/25",
                desc: "AI given full identity profile predicted 25 artists. Hit zero. Identity ≠ behavior. The case for behavioral measurement over demographic profiling.",
                color: C.amber,
              },
            ].map((p) => (
              <div key={p.title} style={{
                flex: "1 1 220px",
                background: C.card,
                border: `1px solid ${p.color}20`,
                borderRadius: 8,
                padding: "20px 18px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: p.color, opacity: 0.4 }} />
                <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: p.color, opacity: 0.4, marginBottom: 6 }}>{p.stat}</div>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── USE CASES ── */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 36,
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.blue, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Application Domains
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              "Job Interview Prep", "Salary Negotiation", "Pitch Rehearsal", "Difficult Conversations",
              "Relationship Dynamics", "Conflict Resolution", "Therapy Augmentation", "College Admissions",
              "Executive Coaching", "Team Communication", "Performance Reviews", "Self-Discovery",
            ].map((d) => (
              <Tag key={d} label={d} color={C.blue} />
            ))}
          </div>
        </div>

        {/* ── FOUNDER ── */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 36,
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.ember, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Founder
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>
            D.K. Hale. CPA. 10+ years internal audit. Built the MindFrame cognitive architecture, the nine-model Council methodology, and the DDL governance framework. Published memoir author. Built 44 governed systems and 65 standards across 26 months. The entire proof-of-concept stack — MindFrame calibration engines, Council convergence methodology, Dossier output format, CottageHumble design system — was designed, built, and documented by one person.
          </div>
        </div>

        {/* ── THE ASK ── */}
        <div style={{
          background: C.crimson + "10",
          border: `1px solid ${C.crimson}30`,
          borderRadius: 8,
          padding: "28px 28px",
          textAlign: "center",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            Status
          </div>
          <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 10 }}>
            Concept Stage — Seeking Conversations
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
            Core methodology proven. Calibration engines built. Multi-model analysis validated. Design system production-ready. Looking for the right partners to take this from proven concept to product.
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 40 }}>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.green})`,
            borderRadius: 1,
            marginBottom: 14,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              dropdownlogistics.com · 2026 · Confidential
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

