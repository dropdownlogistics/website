'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)", crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
};
const font = { display: "'Space Grotesk', system-ui, sans-serif", mono: "'JetBrains Mono', monospace", body: "'Source Serif 4', Georgia, serif" };

// ═══════════════════════════════════════════════════════════
// Sections for nav
// ═══════════════════════════════════════════════════════════
const sections = [
  { id: "problem", num: "I", label: "Problem" },
  { id: "objective", num: "II", label: "Objective" },
  { id: "scope", num: "III", label: "Scope" },
  { id: "artifacts", num: "IV", label: "Artifacts" },
  { id: "datamodel", num: "V", label: "Data Model" },
  { id: "workflow", num: "VI", label: "Workflow" },
  { id: "governance", num: "VII", label: "Governance" },
  { id: "roadmap", num: "VIII", label: "Roadmap" },
];

// ═══════════════════════════════════════════════════════════
// Data Model Fields
// ═══════════════════════════════════════════════════════════
const coreFields = [
  { name: "StrategyID", type: "string", example: "PSS_0001", required: true },
  { name: "Title", type: "string", example: "Multi-Model Prediction Audit", required: true },
  { name: "Outcome", type: "string", example: "Accuracy comparison report", required: true },
  { name: "WhenToUse", type: "string", example: "When validating AI inferences against source data", required: true },
  { name: "Inputs", type: "string", example: "Predictions + actuals from separate contexts", required: true },
  { name: "Procedure", type: "text", example: "Steps / interaction choreography", required: true },
  { name: "Guardrails", type: "text", example: "What NOT to do / boundaries", required: true },
  { name: "FailureSignals", type: "text", example: "How you know it's going off", required: true },
  { name: "Example", type: "text", example: "Short compressed example", required: false },
  { name: "SkillLevel", type: "int 0-4", example: "3", required: true },
  { name: "DomainTags", type: "#tags", example: "#audit #ai #validation", required: true },
  { name: "PatternTags", type: "+tags", example: "+cross-thread +blind-test", required: true },
  { name: "ToneTags", type: "%tags", example: "%analytical %governance", required: false },
  { name: "Provenance", type: "string", example: "Thread A + B, 2025-12-25", required: true },
  { name: "Status", type: "enum", example: "~Active / ~Draft / ~Deprecated", required: true },
  { name: "LastValidated", type: "date", example: "2025-12-25", required: true },
];

const optionalFields = [
  { name: "ModelNotes", desc: "Claude/GPT/Local differences" },
  { name: "Variants", desc: "A/B prompts or approaches" },
  { name: "Dependencies", desc: "Requires other strategies" },
  { name: "AntiPatterns", desc: "Common mistakes" },
];

// ═══════════════════════════════════════════════════════════
// Workflow Steps
// ═══════════════════════════════════════════════════════════
const workflowSteps = [
  { num: 1, label: "Capture", color: C.crimson, desc: "Flag a moment as 'Strategy Candidate' during work. Create a rough entry immediately as Draft.", icon: "📌" },
  { num: 2, label: "Distill", color: C.amber, desc: "Convert to canonical structure. Strip story, keep mechanics. Preserve one example.", icon: "🔬" },
  { num: 3, label: "Index", color: C.blue, desc: "Assign tags + skill level + status. Record provenance. File in the LEDGER.", icon: "🗂️" },
  { num: 4, label: "Validate", color: C.green, desc: "Re-run once on a new use case. Update LastValidated. If it fails, log FailureSignals and revise.", icon: "✓" },
  { num: 5, label: "Publish", color: C.violet, desc: "Mark ~Active when stable enough for reuse. Searchable, replayable, portable.", icon: "🚀" },
];

// ═══════════════════════════════════════════════════════════
// Strategy Packets
// ═══════════════════════════════════════════════════════════
const packets = [
  { name: "Getting Unstuck", color: C.crimson, desc: "Strategies for when you're blocked, spinning, or overthinking" },
  { name: "Specification to Build", color: C.amber, desc: "Converting requirements into buildable artifacts" },
  { name: "Data Cleanup & Structuring", color: C.blue, desc: "Transforming messy inputs into governed data" },
  { name: "Tone Calibration", color: C.violet, desc: "Dialing voice, persona, and communication style" },
  { name: "Council / Red Team Protocols", color: C.rose, desc: "Multi-model coordination and adversarial review" },
  { name: "Working with Constraints", color: C.green, desc: "Context limits, token budgets, platform boundaries" },
];

// ═══════════════════════════════════════════════════════════
// Governance Rules
// ═══════════════════════════════════════════════════════════
const govRules = [
  { rule: "Append-first", detail: "Do not overwrite history without logging why" },
  { rule: "Attribution is factual", detail: "Human/model roles are recorded accurately" },
  { rule: "No canon wars", detail: "Multiple strategies may exist for same outcome" },
  { rule: "Deprecated = searchable", detail: "Old entries remain visible but clearly labeled" },
  { rule: "TIGHTEN is explicit", detail: "Consolidation passes are invoked, never automatic" },
];

// ═══════════════════════════════════════════════════════════
// Design Principles
// ═══════════════════════════════════════════════════════════
const principles = [
  { label: "Artifact-first", desc: "If it isn't an artifact, it doesn't exist" },
  { label: "Strategy > Prompt", desc: "Prompts are implementation details" },
  { label: "Portability > Polish", desc: "Survivability over aesthetics (early)" },
  { label: "Tags must be consistent", desc: "Or the system collapses" },
  { label: "Versioning prevents drift", desc: "And protects trust in reuse" },
];

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function SectionBlock({ id, num, title, color = C.blue, children }) {
  return (
    <div id={id} style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 6, background: color + "18",
          border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: font.mono, fontSize: 13, fontWeight: 700, color,
        }}>{num}</div>
        <span style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream }}>{title}</span>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>
      {children}
    </div>
  );
}

function Prose({ children }) {
  return <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75, marginBottom: 12, maxWidth: 640 }}>{children}</p>;
}

function Callout({ color, label, children }) {
  return (
    <div style={{ padding: "14px 18px", background: color + "10", border: `1px solid ${color}30`, borderRadius: 7, borderLeft: `3px solid ${color}`, marginBottom: 12 }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function PSSProposal() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "0 0 48px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
html{scroll-behavior:smooth}`}</style>

      {/* ═══ Hero ═══ */}
      <div style={{
        padding: "40px 24px 32px",
        background: `linear-gradient(180deg, ${C.blue}10 0%, transparent 100%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
            DDL · ATLAS · PROJECT PROPOSAL
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>
            Prompt Strategy System
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, maxWidth: 600, fontStyle: "italic" }}>
            Turn great moments into durable assets. A strategy library that is deterministic, replayable, searchable, and portable.
          </p>
          <div style={{ height: 2, width: 48, background: C.blue, marginTop: 16, opacity: 0.5 }} />
        </div>
      </div>

      {/* ═══ Main Layout: Content + Sidebar ═══ */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 0", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* ─── Sidebar Rail ─── */}
        <div style={{ flex: "0 0 200px", position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Nav */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 12px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Sections</div>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(s.id)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "5px 6px",
                borderRadius: 4, textDecoration: "none", marginBottom: 2,
                background: activeSection === s.id ? C.blueDim : "transparent",
                transition: "background 0.15s",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, width: 18, textAlign: "right" }}>{s.num}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: activeSection === s.id ? C.cream : C.creamMid }}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Metadata */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 12px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Metadata</div>
            {[
              { label: "Version", value: "v0.1" },
              { label: "Status", value: "Exploratory" },
              { label: "Owner", value: "Dave + Dex" },
              { label: "Updated", value: "2026-02-16" },
              { label: "Template", value: "ATLAS" },
            ].map(m => (
              <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{m.label}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.cream }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 12px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Design Principles</div>
            {principles.map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, lineHeight: 1.4 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Success Criteria */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 12px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Success Criteria (v0.1)</div>
            {[
              { metric: "25", label: "Strategy Entries captured" },
              { metric: "< 2 min", label: "to answer 'best move here?'" },
              { metric: "10+", label: "entries validated on 2nd scenario" },
              { metric: "0", label: "reliance on platform memory" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: C.green }}>{s.metric}</span>
                <span style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Primary Content ─── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* I — Problem */}
          <SectionBlock id="problem" num="I" title="Problem Statement" color={C.crimson}>
            <Prose>We generate high-signal strategies in real time, but they decay if not externalized. They become unfindable when stored as raw chat. They drift when platforms and models change. They are hard to teach or reuse without structure.</Prose>
            <Prose>This creates friction and lost leverage. The goal: turn "great moments" into durable assets.</Prose>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Idea Evaporation", icon: "💨", desc: "Strategies generated in-session disappear after the thread closes" },
                { label: "Raw Chat Burial", icon: "📦", desc: "Valuable patterns trapped in conversational noise" },
                { label: "Model Drift", icon: "🌊", desc: "What worked on one model may not replay on the next" },
                { label: "Teaching Friction", icon: "🧱", desc: "No structure means no reusability across contexts" },
              ].map(p => (
                <div key={p.label} style={{ flex: "1 1 160px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px" }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{p.icon}</div>
                  <div style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* II — Objective */}
          <SectionBlock id="objective" num="II" title="Objective" color={C.blue}>
            <Prose>Create a strategy library with four properties:</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Deterministic", letter: "A", color: C.crimson, desc: "Clear triggers, inputs, outputs, and boundaries" },
                { label: "Replayable", letter: "B", color: C.amber, desc: "Re-run against new project/model, get similar utility" },
                { label: "Searchable", letter: "C", color: C.blue, desc: "Indexed by outcome, skill level, domain, pattern type" },
                { label: "Portable", letter: "D", color: C.green, desc: "Survives account loss, model drift, platform changes" },
              ].map(o => (
                <div key={o.letter} style={{
                  background: C.card, border: `1px solid ${o.color}25`, borderRadius: 7,
                  padding: "16px", display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 5, background: o.color + "20",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: o.color, flexShrink: 0,
                  }}>{o.letter}</div>
                  <div>
                    <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 3 }}>{o.label}</div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.5 }}>{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* III — Scope */}
          <SectionBlock id="scope" num="III" title="Scope" color={C.green}>
            <Callout color={C.green} label="In Scope">
              Strategy Entries describing <em>how to get outcomes</em> with AI — intent, triggers, prerequisites, interaction choreography, guardrails, failure signals, examples, and provenance. Plus index, taxonomy, governance rules, and export formats (TXT/CSV first).
            </Callout>
            <Callout color={C.crimson} label="Out of Scope">
              Not a prompt marketplace. Not an investor pitch. Not a clinical tool. Not "the one true prompt." Not a mystical/anthropomorphic framing system. This is a practical craft library.
            </Callout>
          </SectionBlock>

          {/* IV — Core Artifacts */}
          <SectionBlock id="artifacts" num="IV" title="Core Artifacts" color={C.amber}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { num: "5.1", name: "Strategy Entry", template: "DOSSIER", desc: "The canonical unit. One record capturing one reusable strategy.", color: C.violet },
                { num: "5.2", name: "Strategy Index", template: "LEDGER", desc: "Master table — filterable by outcome, skill level, domain, pattern type, model compatibility, last validated date.", color: C.green },
                { num: "5.3", name: "Strategy Packets", template: "CODEX", desc: "Curated bundles of strategies by theme. Expandable, sequential, grouped.", color: C.ember },
                { num: "5.4", name: "Provenance Log", template: "LEDGER", desc: "Lightweight lineage log — origin context, author(s), version history, edits and rationale.", color: C.blue },
              ].map(a => (
                <div key={a.num} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "16px 18px", borderLeft: `3px solid ${a.color}`,
                  display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: a.color, marginTop: 2 }}>{a.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{a.name}</span>
                      <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 6px", borderRadius: 3, background: a.color + "18", color: a.color }}>{a.template}</span>
                    </div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Packets Grid */}
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 24, marginBottom: 12 }}>Planned Strategy Packets</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
              {packets.map(p => (
                <div key={p.name} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "12px 14px",
                }}>
                  <div style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color: p.color, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* V — Data Model */}
          <SectionBlock id="datamodel" num="V" title="Data Model" color={C.violet}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>StrategyEntry Fields (Core)</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 10px", marginBottom: 16 }}>
              {/* Header */}
              <div style={{ display: "flex", gap: 6, padding: "4px 6px 8px", borderBottom: `1px solid ${C.border}`, marginBottom: 4 }}>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 110 }}>FIELD</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 65 }}>TYPE</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, flex: 1 }}>EXAMPLE</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 20 }}>REQ</span>
              </div>
              {coreFields.map((f, i) => (
                <div key={f.name} style={{
                  display: "flex", gap: 6, padding: "4px 6px", alignItems: "center",
                  background: i % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3,
                }}>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, fontWeight: 600, width: 110 }}>{f.name}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, width: 65 }}>{f.type}</span>
                  <span style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, flex: 1, fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.example}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: f.required ? C.green : C.creamDim, width: 20, textAlign: "center" }}>{f.required ? "✓" : "—"}</span>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Optional Fields (v0.2+)</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {optionalFields.map(f => (
                <div key={f.name} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 5,
                  padding: "8px 12px", flex: "1 1 180px",
                }}>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.ember, fontWeight: 600 }}>{f.name}</span>
                  <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, marginTop: 2 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* VI — Workflow */}
          <SectionBlock id="workflow" num="VI" title="Workflow" color={C.amber}>
            <Prose>Five-phase lifecycle from raw observation to published, reusable strategy entry.</Prose>
            <div style={{ position: "relative", paddingLeft: 36, marginTop: 8 }}>
              <div style={{ position: "absolute", left: 13, top: 4, bottom: 4, width: 2, background: `linear-gradient(180deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet})` }} />
              {workflowSteps.map(s => (
                <div key={s.num} style={{ position: "relative", marginBottom: 16 }}>
                  <div style={{
                    position: "absolute", left: -30, top: 4, width: 16, height: 16, borderRadius: "50%",
                    background: s.color + "30", border: `2px solid ${s.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8,
                  }}>{s.icon}</div>
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: font.mono, fontSize: 10, color: s.color, fontWeight: 700 }}>{s.num}.</span>
                      <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{s.label}</span>
                    </div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* VII — Governance */}
          <SectionBlock id="governance" num="VII" title="Governance" color={C.green}>
            <Prose>Lightweight rules that prevent entropy without creating bureaucracy.</Prose>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px" }}>
              {govRules.map((g, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "8px 4px", alignItems: "flex-start",
                  borderBottom: i < govRules.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <span style={{
                    fontFamily: font.mono, fontSize: 9, color: C.green, fontWeight: 600,
                    flexShrink: 0, width: 140,
                  }}>{g.rule}</span>
                  <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.5 }}>{g.detail}</span>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* VIII — Roadmap */}
          <SectionBlock id="roadmap" num="VIII" title="Roadmap" color={C.ember}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                {
                  version: "v0.1", label: "Foundation", color: C.crimson, status: "Active",
                  items: ["Template_StrategyEntry.txt", "StrategyIndex.csv", "ProvenanceLog.csv", "First 25 entries"],
                },
                {
                  version: "v0.2", label: "Usability", color: C.amber, status: "Next",
                  items: ["Strategy Packets (bundles)", "Skill Path 0→4 progression", "'Find by Outcome' quick index"],
                },
                {
                  version: "v0.3", label: "Optional", color: C.creamDim, status: "Future",
                  items: ["Simple UI layer (Excel/web)", "Export pipeline (one-click bundle)", "Model compatibility notes"],
                },
              ].map(v => (
                <div key={v.version} style={{
                  flex: "1 1 200px", background: C.card, border: `1px solid ${v.color}25`,
                  borderRadius: 7, padding: "16px", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: v.color, opacity: 0.5 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: v.color }}>{v.version}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 8, padding: "2px 6px", borderRadius: 3, background: v.color + "18", color: v.color }}>{v.status}</span>
                  </div>
                  <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 8 }}>{v.label}</div>
                  {v.items.map((item, j) => (
                    <div key={j} style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.6, paddingLeft: 10, borderLeft: `2px solid ${v.color}20`, marginBottom: 3 }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Open Questions */}
            <div style={{ marginTop: 24 }}>
              <Callout color={C.violet} label="Open Questions (For Later)">
                Is "Capture → Distill → Validate" a CAE loop? Should strategies be decision records or playbooks? Do we need "Decision Lineage" fields for why a strategy exists?
              </Callout>
            </div>
          </SectionBlock>

        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet})`, borderRadius: 1, marginBottom: 14 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
        </div>
      </div>
    </div>
  );
}

