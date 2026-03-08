'use client'

import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", violet: "#8a6cc9", rose: "#c94a6e", ember: "#c98a4a",
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

export default function FastConsole() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · Media Map — Fast and Furious
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          Family
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          A franchise about chosen family, earned loyalty, and the completely unironic belief 
          that the people you pick are more real than the ones you're given.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · <span style={{ color: C.amber }}>CONSOLE: Dimensional Map</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* Franchise Profile */}
        <div style={{ background: C.card, border: `1px solid ${C.crimson}30`, borderRadius: 8, padding: "20px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.crimson, opacity: 0.6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream }}>Fast and Furious</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, marginTop: 2 }}>Universal · 2001–present · 11 films</div>
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>First and foremost</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
            {["CHOSEN FAMILY", "LOYALTY ABOVE ALL", "EARNED TRUST", "ROLE-BASED CREW", "ESCALATING STAKES", "YOU EARN YOUR SEAT", "RIDICULOUS ON PURPOSE"].map(t => <Tag key={t} label={t} color={C.crimson} />)}
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Structural DNA
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Core Unit", value: "The family — chosen, not assigned", color: C.crimson },
              { label: "Entry Model", value: "Prove yourself first, belong second", color: C.amber },
              { label: "Operating Principle", value: "You don't turn your back on family", color: C.crimson },
              { label: "Conflict Pattern", value: "Betrayal → separation → earned return", color: C.rose },
              { label: "Skill Framework", value: "Everyone has a specialty — driver, tech, muscle, tactician", color: C.green },
              { label: "Escalation Arc", value: "Street racing → heists → geopolitics → space", color: C.creamMid },
            ].map(f => (
              <div key={f.label} style={{ padding: "10px 12px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: f.color, lineHeight: 1.4 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull Quote */}
        <div style={{ borderLeft: `3px solid ${C.crimson}`, padding: "14px 20px", background: C.crimsonFaint, borderRadius: "0 6px 6px 0", marginBottom: 32 }}>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            "I know it's ridiculous, that's the point. FAMILY unironically." 
            The ridiculousness is a feature, not a bug. The franchise escalates past realism 
            so the emotional core can operate without ironic distance. 
            You can't roll your eyes at the loyalty if you're too busy watching a car jump between skyscrapers. 
            The absurdity is the permission structure for sincerity.
          </p>
        </div>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 40 }}>
          <div style={{ width: 28, height: 28, borderRadius: 5, background: C.crimsonDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.crimson }}>F</div>
          <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Fast & Furious → Measurement Map</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        <MappingRow
          trait="Chosen family — you pick your people, and they're more real than blood"
          measurement="Socialization — Strongest Domain"
          instrument="Vineland-3 · 2023"
          score="107 · 68th %ile · Strength"
          mechanism="The measurement stack's single strongest domain. Community functioning and Coping Skills are both elevated strengths. The franchise's thesis — that the family you choose is the one that counts — maps directly to a profile where social bonds and community navigation are the most intact adaptive behaviors."
          color={C.green}
        />

        <MappingRow
          trait="You earn your seat — trust is built through action, not given by default"
          measurement="Avoidant Pattern (2A)"
          instrument="MCMI-IV · 2023"
          score="BR 82 · Crosses 'Type' threshold"
          mechanism="Avoidant personality features approach and withdrawal — wanting connection but needing proof of safety first. The franchise literalizes this: every new member proves themselves through action before they're accepted. Trust isn't assumed. It's demonstrated. The prospect period, but with NOS."
          color={C.rose}
        />

        <MappingRow
          trait="Role-based crew — everyone has a specialty (Dom drives, Tej does tech, Roman talks)"
          measurement="CES Theme Code — Organizational Management"
          instrument="Strong Interest Inventory · 2005"
          score="Org Mgmt: 57 · High"
          mechanism="Each crew member has a defined function. Nobody does somebody else's job. This is the CES operator's ideal organizational structure — clear roles, clear responsibilities, a team where the system works because everyone stays in their lane. DDL is a one-person crew with 44 system-role assignments."
          color={C.amber}
        />

        <MappingRow
          trait="Escalation past realism as permission for sincerity"
          measurement="Sensation Avoiding"
          instrument="Adolescent/Adult Sensory Profile · 2023"
          score="50/75 · Much More Than Most"
          mechanism="Sensation Avoidance paradox: the absurdity functions as a sensory buffer. By pushing the action past believability, the franchise creates emotional distance from threat while preserving emotional access to loyalty. The stakes are fake. The feelings are real. That's a Sensation Avoiding architecture for sincerity."
          color={C.crimson}
        />

        <MappingRow
          trait="Betrayal → separation → earned return (the Hobbs arc, the Han arc, the Jakob arc)"
          measurement="Internalizing Behavior"
          instrument="Vineland-3 Maladaptive · 2023"
          score="v=21 · Clinically Significant"
          mechanism="Clinically significant internalizing means rupture is processed inward. The franchise's most emotionally loaded sequences are always about reunion after betrayal — the moment when someone comes back and is accepted. That arc is a narrative guarantee that internal rupture resolves. The same harmonic resolution as ILLENIUM."
          color={C.rose}
        />

        <MappingRow
          trait="Dom Toretto — the operator who holds the system together through presence, not performance"
          measurement="Daily Living ↔ Community inversion"
          instrument="Vineland-3 · 2023"
          score="DLS 13th %ile · Socialization 68th"
          mechanism="Dom doesn't do paperwork. He doesn't manage logistics. He doesn't handle the details. What he does is hold the family together — community functioning, social cohesion, loyalty as operating principle. His weakness is everything domestic. His strength is everything relational. The Vineland drew this profile."
          color={C.green}
        />

        <MappingRow
          trait="Brian O'Conner — the outsider who earns his way in by choosing the family over the institution"
          measurement="Melancholic Pattern (2B)"
          instrument="MCMI-IV · 2023"
          score="BR 78 · Approaches 'Type' threshold"
          mechanism="Brian's arc: law enforcement officer who discovers the institution is less meaningful than the people. He lets Dom go. He walks away from the system. The Melancholic pattern features disillusionment with formal structures and a pull toward authentic connection. Brian's choice is the Melancholic resolution — abandon the institution, keep the people."
          color={C.rose}
        />

        <MappingRow
          trait="Quarter-mile at a time — the franchise's temporal philosophy"
          measurement="Focus deficit"
          instrument="Brown EF/A Scales · 2023"
          score="T=74 · 98th %ile dysfunction"
          mechanism="Focus at the 98th percentile for dysfunction. The franchise's mantra — 'I live my life a quarter mile at a time; for those ten seconds, nothing else matters' — is executive function accommodation as dialogue. Compress the relevant timeframe to something the attention system can hold. Ten seconds. One quarter mile. One task."
          color={C.crimson}
        />

        {/* Convergence */}
        <div style={{ marginTop: 40, padding: "20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Why This Franchise
          </div>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              Fast and Furious is a franchise about a man who can't manage the daily but can hold a family together, 
              who lives in compressed timeframes because the long view overwhelms, 
              who builds a crew with defined roles because that's how systems work, 
              and who believes — unironically, indefensibly, completely — that chosen loyalty 
              is the only structure that matters.
            </p>
            <p style={{ margin: "0 0 14px 0" }}>
              The absurdity doesn't undermine the sincerity. It protects it. 
              A Sensation Avoider can't access that level of emotional vulnerability 
              in a realistic frame — the processing cost is too high. 
              But wrap it in a car jumping out of an airplane and the sensory threat drops to zero 
              while the emotional channel stays wide open.
            </p>
            <p style={{ margin: 0 }}>
              This is the same architecture as ILLENIUM. Controlled catharsis. 
              Predictable emotional payoff inside a structure that manages the sensory cost. 
              Different medium. Same function. Same operator.
            </p>
          </div>
        </div>

        {/* Instruments Referenced */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Instruments Referenced
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px" }}>
            {[
              { instrument: "Strong Interest Inventory", date: "2005", used: "CES theme, Organizational Management", color: C.amber },
              { instrument: "Psych Evaluation (Sharpe)", date: "2023", used: "MCMI-IV, Brown EF/A, Vineland, Sensory Profile", color: C.rose },
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
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.green})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · CONSOLE · Media Map: Fast and Furious · 8 connections across 2 instruments
          </div>
        </div>
      </div>
    </div>
  );
}

