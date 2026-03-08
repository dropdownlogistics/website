'use client'

import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", ember: "#c98a4a",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function Tag({ label, color = C.blue }) {
  return (<span style={{ fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3, background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{label}</span>);
}

function MappingRow({ trait, measurement, instrument, score, mechanism, color }) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: 2, minHeight: 72 }}>
      <div style={{ flex: "1 1 38%", padding: "12px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "6px 0 0 6px", borderRight: "none" }}>
        <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream }}>{trait}</div>
      </div>
      <div style={{ width: 36, display: "flex", alignItems: "center", justifyContent: "center", background: color + "12", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontFamily: font.mono, fontSize: 14, color }}>→</span>
      </div>
      <div style={{ flex: "1 1 62%", padding: "12px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "0 6px 6px 0", borderLeft: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
          <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color }}>{measurement}</span>
          <span style={{ fontFamily: font.mono, fontSize: 10, color }}>{score}</span>
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 4 }}>{instrument}</div>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.5 }}>{mechanism}</div>
      </div>
    </div>
  );
}

export default function SonsConsole() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · Media Map — Sons of Anarchy
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          The Bylaws
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          A show about a governance system that operates by codified rules, 
          votes on decisions at a table, and destroys people who deviate from the standard.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · <span style={{ color: C.amber }}>CONSOLE: Dimensional Map</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* Show Profile */}
        <div style={{ background: C.card, border: `1px solid ${C.amber}30`, borderRadius: 8, padding: "20px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.amber, opacity: 0.6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream }}>Sons of Anarchy</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, color: C.amber, marginTop: 2 }}>FX · 2008–2014 · 7 seasons · 92 episodes</div>
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Creator: Kurt Sutter</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
            {["GOVERNANCE STRUCTURE", "BYLAWS & VOTING", "INSTITUTIONAL HIERARCHY", "LOYALTY SYSTEMS", "CONSEQUENCES FOR DEVIATION", "CHOSEN FAMILY", "ROLE-BASED IDENTITY"].map(t => <Tag key={t} label={t} color={C.amber} />)}
          </div>

          {/* Structural DNA */}
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Structural DNA
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Decision Framework", value: "Chapel vote — majority rules, president breaks ties", color: C.amber },
              { label: "Governance Doc", value: "The Bylaws — written, codified, binding", color: C.amber },
              { label: "Hierarchy", value: "President → VP → SGT at Arms → Road Captain → Members → Prospects", color: C.creamMid },
              { label: "Conflict Resolution", value: "Brought to the table, not freelanced", color: C.green },
              { label: "Deviation Consequence", value: "Excommunication (Mayhem vote)", color: C.crimson },
              { label: "Membership Model", value: "Earned, not given — prospect period", color: C.blue },
            ].map(f => (
              <div key={f.label} style={{ padding: "10px 12px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: f.color, lineHeight: 1.4 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull Quote */}
        <div style={{ borderLeft: `3px solid ${C.amber}`, padding: "14px 20px", background: C.amberDim, borderRadius: "0 6px 6px 0", marginBottom: 32 }}>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            SAMCRO is a governance system that happens to ride motorcycles. 
            The bylaws, the chapel, the chain of command, the prospect period, the Mayhem vote — 
            this is institutional architecture with leather and exhaust fumes. 
            The operator who builds governance-grade systems for a living 
            didn't pick this show at random.
          </p>
        </div>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 40 }}>
          <div style={{ width: 28, height: 28, borderRadius: 5, background: C.amberDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.amber }}>S</div>
          <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>SOA → Measurement Map</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        <MappingRow
          trait="Chapel — decisions brought to the table, voted on by patch-holders"
          measurement="Conventional Theme Dominance"
          instrument="Strong Interest Inventory · 2005"
          score="C = 75 · High Interest"
          mechanism="Conventional craves procedure, process, codified order. The Chapel is a governance meeting with formal rules of engagement — motions, votes, documented outcomes. SAMCRO runs by Roberts Rules of Order with higher stakes."
          color={C.amber}
        />

        <MappingRow
          trait="The Bylaws — a written governance document that supersedes individual preference"
          measurement="Organizational Management"
          instrument="Strong Interest Inventory · 2005"
          score="57 · High Interest"
          mechanism="DDL has 44 systems and 65 standards. SAMCRO has the Bylaws. Both are governance architectures that formalize what would otherwise be improvised. The appeal isn't the content — it's the existence of the document."
          color={C.amber}
        />

        <MappingRow
          trait="Role-based identity — every member has a defined function (President, SGT, Road Captain)"
          measurement="Daily Living Skills ↔ Socialization inversion"
          instrument="Vineland-3 · 2023"
          score="DLS: 13th %ile · Socialization: 68th"
          mechanism="Low personal self-sufficiency, high community functioning. Role clarity solves this — when your function is defined by the organization, the system carries what individual maintenance can't. SAMCRO members are stronger as positions than as people. That's recognition, not escapism."
          color={C.rose}
        />

        <MappingRow
          trait="Loyalty as operating principle — betrayal is the cardinal violation"
          measurement="Socialization — Strongest Domain"
          instrument="Vineland-3 · 2023"
          score="107 · 68th %ile · Strength"
          mechanism="Coping Skills (v=17) and Community (v=17) are both strengths. Interpersonal Relationships: 16. The measurement stack says social structures and loyalty systems are where this person operates best. SAMCRO's core tension — loyalty vs. self-interest — is the exact axis the Vineland says matters most."
          color={C.green}
        />

        <MappingRow
          trait="Consequences for deviation — the Mayhem vote, excommunication, Mr. Mayhem"
          measurement="Compulsive Pattern (7)"
          instrument="MCMI-IV · 2023"
          score="BR 69 · Approaching threshold"
          mechanism="Compulsive personality approaches clinical threshold. This is the personality pattern that values rules, order, and consistent consequences. SAMCRO's world is appealing precisely because deviation has clear, codified consequences — the anxiety of ambiguity doesn't exist. The rules are known. The stakes are posted."
          color={C.rose}
        />

        <MappingRow
          trait="Jax Teller — inherits a system, discovers it's been corrupted, tries to reform it from inside"
          measurement="Activation + Focus deficit"
          instrument="Brown EF/A Scales · 2023"
          score="Activation T=70 · Focus T=74"
          mechanism="Jax's arc is about seeing the system clearly while struggling to act on what he sees. Executive function deficits create the same gap — the pattern is visible, the corrective action is identified, the activation energy to execute is where it breaks down. Jax's tragedy is an executive function metaphor."
          color={C.crimson}
        />

        <MappingRow
          trait="Gemma — the shadow governance layer, operating outside the bylaws while protecting the institution"
          measurement="Avoidant Pattern (2A)"
          instrument="MCMI-IV · 2023"
          score="BR 82 · Crosses 'Type' threshold"
          mechanism="Avoidant personality recognizes shadow governance systems — the rules that aren't written down but shape outcomes more than the ones that are. Gemma's manipulation is uncomfortable not because it's alien but because it maps to the anxiety of navigating systems where the real rules are hidden."
          color={C.rose}
        />

        <MappingRow
          trait="The club as chosen family — you earn your patch, your seat at the table"
          measurement="Social Theme (S) + Enterprising (E)"
          instrument="Strong Interest Inventory · 2005"
          score="CES code — Social third"
          mechanism="CES: structured systems (C), organizational management (E), and social bonds (S). SAMCRO is all three simultaneously. The club is a Conventional organization with Enterprising leadership and Social bonds. It's the theme code as a narrative."
          color={C.amber}
        />

        {/* Convergence */}
        <div style={{ marginTop: 40, padding: "20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Why This Show
          </div>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              Sons of Anarchy is a show about what happens when a governance system encounters entropy. 
              The bylaws exist. The hierarchy is clear. The decision framework is codified. 
              And every season asks: what happens when the humans inside the system 
              can't live up to what the system requires?
            </p>
            <p style={{ margin: "0 0 14px 0" }}>
              For an operator who builds governance-grade systems to compensate for executive function deficits 
              documented at the 95th percentile for dysfunction — who has a written governance architecture 
              of 44 systems and 65 standards — who scores Conventional at 75 and Organizational Management at 57 — 
              SAMCRO isn't entertainment. It's a case study.
            </p>
            <p style={{ margin: 0 }}>
              The show asks the question DDL answers every day: 
              can the system hold when the operator can't?
            </p>
          </div>
        </div>

        {/* Instruments Referenced */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Instruments Referenced
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px" }}>
            {[
              { instrument: "Strong Interest Inventory", date: "2005", used: "CES theme, Conventional dominance, Organizational Management", color: C.amber },
              { instrument: "Psych Evaluation (Sharpe)", date: "2023", used: "Brown EF/A, MCMI-IV personality patterns, Vineland adaptive behavior", color: C.rose },
            ].map((r, i) => (
              <div key={r.instrument} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 1 ? `1px solid ${C.border}` : "none", flexWrap: "wrap", gap: 6 }}>
                <div>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.cream }}>{r.instrument}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginLeft: 8 }}>{r.date}</span>
                </div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: r.color }}>{r.used}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.amber}, ${C.crimson}, ${C.rose})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · CONSOLE · Media Map: Sons of Anarchy · 8 connections across 2 instruments
          </div>
        </div>
      </div>
    </div>
  );
}

