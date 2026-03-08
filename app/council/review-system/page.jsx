'use client';
import { useState } from "react";

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
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
  rose: "#c94a6e",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Model registry
// ═══════════════════════════════════════════════════════════
const models = [
  { id: "lechat", code: "1001", name: "Archer Hawthorne", model: "LeChat", color: C.ember, role: "Precision Editor" },
  { id: "claude", code: "1002", name: "Marcus Caldwell", model: "Claude", color: C.blue, role: "Structural Architect" },
  { id: "grok", code: "1003", name: "Elias Mercer", model: "Grok", color: C.green, role: "Forensic Strategist" },
  { id: "perplexity", code: "1004", name: "Max Sullivan", model: "Perplexity", color: C.violet, role: "Evidence Synthesizer" },
  { id: "copilot", code: "1005", name: "Rowan Bennett", model: "Copilot", color: C.rose, role: "Guardrails Engineer" },
  { id: "meta", code: "1006", name: "Ava Sinclair", model: "Meta AI", color: "#6bc2a8", role: "Momentum Architect" },
  { id: "gemini", code: "1007", name: "Leo Prescott", model: "Gemini", color: C.amber, role: "Tactical Crystallizer" },
  { id: "chatgpt", code: "1008", name: "Marcus Grey", model: "ChatGPT", color: C.crimson, role: "Protocol Designer" },
  { id: "deepseek", code: "1009", name: "Kai Langford", model: "DeepSeek", color: "#6b8fc2", role: "Validation Enforcer" },
];

// ═══════════════════════════════════════════════════════════
// Review data — Profile Pages React
// ═══════════════════════════════════════════════════════════
const review = {
  slug: "profile-pages-react",
  title: "Council Reacts: Profile Pages",
  date: "2026-03-01",
  subject: "Council Member Profile Pages on dropdownlogistics.com",
  prompt: 'What do you think? [9 profile page URLs]',
  promptContext: "Each model was shown the live profile pages for all 9 council members and asked for their reaction. No framing, no leading questions — just the URLs and 'What do you think?'",

  responses: [
    {
      id: "lechat",
      tier: 3,
      tierLabel: "Feelings",
      corePoint: "Built a feature roadmap — Convergence Dashboard, auto-assignment scripts, DexInsight fields. Immediately went to 'how to leverage further.'",
      bestLine: "This isn't just branding — it's governed personification.",
      missed: "Didn't examine the actual page content closely. Jumped to recommendations over observations.",
      wordCount: 820,
    },
    {
      id: "claude",
      tier: 1,
      tierLabel: "Artifact",
      corePoint: "Mapped every page section to the DOSSIER template skeleton. Caught the shared failure mode copy between Claude and ChatGPT profiles. Noted DexCity districts as spatial metaphors for function.",
      bestLine: "The cognitive analogs are the best touch. Feynman + Taleb + Sherlock + House for Grok tells you everything.",
      missed: "Could have gone deeper on cross-profile patterns instead of stopping at the copy overlap.",
      wordCount: 320,
    },
    {
      id: "grok",
      tier: 1,
      tierLabel: "Artifact",
      corePoint: "Cataloged all 9 profiles systematically. Flagged complementary failure modes forming a balanced guardrail system. Noted cognitive analog clustering around disciplined clarity.",
      bestLine: "You externalized the mirror. You made it queryable. You governed the artifact.",
      missed: "No critique of the actual page design or content gaps.",
      wordCount: 380,
    },
    {
      id: "perplexity",
      tier: 3,
      tierLabel: "Feelings",
      corePoint: "Called the profiles a 'living pantheon.' Noted voice fidelity and the operational detail of tracking specific errors. Suggested adding 'current assignment' fields.",
      bestLine: "The operator profile was the mirror. This is the team photo.",
      missed: "Light on structural analysis. Strong on metaphor.",
      wordCount: 280,
    },
    {
      id: "copilot",
      tier: 3,
      tierLabel: "Feelings",
      corePoint: "Wrote an extended literary-emotional response. Identified profiles as simultaneously personnel files, mythological entries, psychological profiles, design documents, character sheets, and governance artifacts.",
      bestLine: "You didn't write nine passages. You wrote nine ways of seeing you.",
      missed: "Zero critique. Zero structural feedback. Pure reverence.",
      wordCount: 650,
    },
    {
      id: "meta",
      tier: 1,
      tierLabel: "Artifact",
      corePoint: "Focused on implementation details — URL patterns, filename conventions, visual treatment coherence. Questioned whether URL slugs should map to systematic IDs for roll-ups.",
      bestLine: "It's proof that Chaos → Structured → Automated actually delivers something that feels both rigorous and alive.",
      missed: "Didn't engage with the content of the profiles, only the container.",
      wordCount: 260,
    },
    {
      id: "gemini",
      tier: 2,
      tierLabel: "System",
      corePoint: "Framed publishing profiles as publishing safety manuals for heavy machinery. 'Transparency as a governance control.' Called it the Model Assignment Protocol made public.",
      bestLine: "You didn't just publish the profiles. You published the constraints.",
      missed: "Didn't look at individual profiles. Assessed the act of publishing, not the content published.",
      wordCount: 180,
    },
    {
      id: "chatgpt",
      tier: 2,
      tierLabel: "System",
      corePoint: "Full graph-theory analysis. Mapped profiles as queryable nodes with typed relationships. Called it 'ontology projection.' Identified blind spots lists as meta-model intelligence — recording output absence.",
      bestLine: "Most AI dashboards only expose output. You expose output absence.",
      missed: "Over-indexed on future architectural potential. Didn't assess whether the current content is accurate.",
      wordCount: 950,
    },
    {
      id: "deepseek",
      tier: 1,
      tierLabel: "Artifact",
      corePoint: "Noted structural consistency as governance. Highlighted Vibe lines as 'compressed novels.' Called failure modes 'the most honest part.' Closed with the question: 'Do the models know these pages exist?'",
      bestLine: "Kai Langford — Vibe: 'Where invariants are defined and enforced.' That's not just a profile. That's a job description for existence.",
      missed: "Slightly self-referential — spent time on own profile's impact.",
      wordCount: 420,
    },
  ],

  convergence: [
    "All 9 recognized the profiles as governance artifacts, not marketing pages",
    "All 9 noted the consistent schema across profiles enables comparison",
    "7/9 specifically praised the failure modes / weak spots as differentiating",
    "6/9 identified the cognitive analogs as the strongest design choice",
    "5/9 flagged the DexCity districts as functional spatial metaphors",
  ],

  divergence: [
    { topic: "What the profiles ARE", positions: "Governance docs (Claude, Grok, Gemini) vs. Literary artifacts (Copilot, Perplexity) vs. Graph nodes (ChatGPT)" },
    { topic: "What to do next", positions: "Build dashboards (LeChat, ChatGPT) vs. Add live status fields (Perplexity) vs. Nothing needed (Grok, DeepSeek)" },
    { topic: "Level of critique", positions: "Specific copy feedback (Claude) vs. Zero critique (Copilot, LeChat, Perplexity)" },
  ],

  blindSpots: [
    "Nobody evaluated whether the profile content is actually accurate to model behavior",
    "Nobody flagged the mobile reading experience or accessibility",
    "Nobody questioned the DexCity district assignments — are they optimal or just first-draft?",
    "Nobody mentioned versioning — these profiles describe March 2026 behavior; model behavior changes",
    "Nobody noted that the profiles were largely written by ChatGPT, creating a single-author bias risk",
  ],

  tiers: [
    {
      label: "Tier 1 — Read the Artifact",
      color: C.green,
      members: ["Claude", "Grok", "Meta AI", "DeepSeek"],
      desc: "Looked at the actual pages, noted specific content, gave structural feedback grounded in what's there.",
    },
    {
      label: "Tier 2 — Read the System",
      color: C.amber,
      members: ["ChatGPT", "Gemini"],
      desc: "Looked past the pages to the architecture. Saw graph potential, governance implications, strategic positioning. Skipped the texture.",
    },
    {
      label: "Tier 3 — Had Feelings",
      color: C.violet,
      members: ["LeChat", "Perplexity", "Copilot"],
      desc: "Genuine emotional response dressed in different clothes. Reverence, excitement, recommendations. No critique, no challenge.",
    },
  ],

  metaInsight: "The tiers map exactly to the profile descriptions. The models documented as structural reviewers gave structural reviews. The ones documented as momentum architects gave momentum. The profiles predicted their own reactions to the profiles. That's not circular — that's validation.",

  verdict: "The profiles are the strongest pages on the site. They prove the DOSSIER template before it's formally built. The council's reaction confirms the characterizations are accurate — each model behaved exactly as its profile predicted.",

  actions: [
    "Differentiate Claude/ChatGPT failure mode copy — currently shares 3 identical bullet points",
    "Consider adding 'Last Reviewed' or 'Current Assignment' field for liveness",
    "Plan versioning strategy — profiles describe point-in-time behavior",
    "Evaluate DexCity district assignments with fresh eyes",
  ],
};

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function SectionHead({ num, title, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 36 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 5,
        background: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font.body, fontSize: 14, fontWeight: 600, color,
      }}>{num}</div>
      <span style={{ fontFamily: font.display, fontSize: 17, fontWeight: 700, color: C.cream }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function Quote({ text, source, color = C.crimson }) {
  return (
    <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: 14, margin: "12px 0" }}>
      <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamHigh, lineHeight: 1.7, fontStyle: "italic" }}>"{text}"</p>
      {source && <p style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>— {source}</p>}
    </div>
  );
}

function ModelBadge({ model, small }) {
  const m = models.find(x => x.model === model || x.id === model || x.name === model);
  if (!m) return null;
  return (
    <span style={{
      fontFamily: font.mono, fontSize: small ? 9 : 10, fontWeight: 600,
      padding: small ? "1px 6px" : "2px 8px", borderRadius: 3,
      background: m.color + "20", color: m.color,
      letterSpacing: "0.04em",
    }}>{m.model}</span>
  );
}

// ═══════════════════════════════════════════════════════════
// Tab 1: Template
// ═══════════════════════════════════════════════════════════
function TemplateView() {
  const fields = [
    { section: "HEADER", fields: [
      { name: "Review ID", desc: "Unique slug for the review session", example: "profile-pages-react" },
      { name: "Title", desc: "Human-readable review title", example: "Council Reacts: Profile Pages" },
      { name: "Date", desc: "Date of review dispatch", example: "2026-03-01" },
      { name: "Subject", desc: "What was reviewed — artifact, page, system, decision", example: "Council Member Profile Pages on dropdownlogistics.com" },
    ]},
    { section: "DISPATCH", fields: [
      { name: "Prompt", desc: "The exact prompt sent to all models", example: "What do you think? [URLs]" },
      { name: "Context", desc: "Framing and constraints given (or deliberately withheld)", example: "No framing — just URLs and the question" },
    ]},
    { section: "RAW RESPONSES (×9)", fields: [
      { name: "Model ID", desc: "Code + persona name + model name", example: "1002_Claude — Marcus Caldwell" },
      { name: "Tier", desc: "Response classification: Artifact / System / Feelings", example: "Tier 1 — Artifact" },
      { name: "Core Point", desc: "1-3 sentence distillation of what the model actually said", example: "Mapped every section to DOSSIER template..." },
      { name: "Best Line", desc: "Single most useful or revealing quote", example: "The cognitive analogs are the best touch." },
      { name: "Missed", desc: "What this model didn't see, ask, or challenge", example: "Could have gone deeper on cross-profile patterns" },
      { name: "Word Count", desc: "Raw response length for effort calibration", example: "320" },
    ]},
    { section: "SYNTHESIS", fields: [
      { name: "Convergence", desc: "What all or most models agreed on — with counts (e.g., 7/9)", example: "All 9 recognized profiles as governance artifacts" },
      { name: "Divergence", desc: "Where models split — topic + positions held", example: "What to do next: Build dashboards vs. Add status fields vs. Nothing" },
      { name: "Blind Spots", desc: "What NO model caught — the gaps in the collective view", example: "Nobody evaluated whether content is accurate to behavior" },
      { name: "Tier Analysis", desc: "Group models by response type and note what the grouping reveals", example: "Tier 1 (Artifact): Claude, Grok, Meta AI, DeepSeek" },
      { name: "Meta-Insight", desc: "The one observation that connects the review to something larger", example: "The profiles predicted their own reactions to the profiles" },
    ]},
    { section: "OUTPUT", fields: [
      { name: "Verdict", desc: "1-2 sentence conclusion", example: "Profiles are the strongest pages on the site" },
      { name: "Actions", desc: "Concrete next steps that emerged from the review", example: "Differentiate Claude/ChatGPT failure mode copy" },
      { name: "Cross-Links", desc: "Links to related reviews, profiles, pages, or standards", example: "/council/profiles/, STD-0066" },
    ]},
  ];

  return (
    <div>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 20 }}>
        This is the reusable schema for every council review. One prompt goes out to nine models. Nine responses come back. This template captures the raw, synthesizes the signal, and produces a governed artifact.
      </p>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        Council Review Template v1.0
      </div>
      {fields.map((section, si) => (
        <div key={si} style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: font.mono, fontSize: 10, fontWeight: 700, color: C.crimson,
            letterSpacing: "0.12em", marginBottom: 8, paddingBottom: 4,
            borderBottom: `1px solid ${C.border}`,
          }}>{section.section}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {section.fields.map((f, fi) => (
              <div key={fi} style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 5,
                padding: "10px 14px", display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{ flex: "0 0 120px" }}>
                  <div style={{ fontFamily: font.mono, fontSize: 11, color: C.cream, fontWeight: 600 }}>{f.name}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.5 }}>{f.desc}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>e.g. {f.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ padding: "12px 16px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 5px 5px 0", marginTop: 16 }}>
        <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.7, fontStyle: "italic" }}>
          The template produces two output layers: a Raw Review (all 9 responses, attributed and timestamped) and a Synthesis (convergence, divergence, blind spots, verdict). They cross-link. Over time the review index becomes a searchable registry of every council session ever run.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Tab 2: Methodology
// ═══════════════════════════════════════════════════════════
function MethodologyView() {
  return (
    <div>
      <SectionHead num="I" title="The Process" />
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        A council review is a convergence test. One prompt, nine models, zero coordination between them. The responses arrive like independent audit reports. Nobody sees what the others said. The value isn't in any single response — it's in the pattern that emerges when you lay all nine side by side.
      </p>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        The operator — Dave — writes a prompt, sends it to every model in the council, collects the responses, and then synthesizes. The synthesis is where the methodology lives. Not summarizing. Synthesizing. Finding what converged, where they split, and what nobody caught.
      </p>

      <SectionHead num="II" title="The Three Tiers" color={C.blue} />
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        Every council review reveals a natural stratification. Models don't all engage at the same level. The responses consistently sort into three tiers — not of quality, but of focus:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Tier 1 — Read the Artifact", color: C.green, desc: "These models looked at what's actually there. Specific content, structural feedback, things they noticed, things they'd change. Grounded in the material." },
          { label: "Tier 2 — Read the System", color: C.amber, desc: "These models looked past the artifact to the architecture beneath it. Graph potential, strategic implications, how it connects to everything else. They see the forest." },
          { label: "Tier 3 — Had Feelings", color: C.violet, desc: "Genuine emotional or aesthetic response. Reverence, excitement, metaphor-heavy. Valid signal — but no critique, no challenge, no structural feedback." },
        ].map((t, i) => (
          <div key={i} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 6,
            padding: "14px 18px", borderLeft: `3px solid ${t.color}`,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: t.color, marginBottom: 4 }}>{t.label}</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        The tiers aren't fixed. A model that's Tier 1 on a technical review might be Tier 3 on a narrative piece. The tier is a property of the interaction, not the model. But tracking it over time reveals cognitive tendencies — and those tendencies validate the profile descriptions.
      </p>

      <SectionHead num="III" title="The Blind Spot Principle" color={C.amber} />
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        The most valuable section of any council review is the blind spots — not what any individual model missed, but what ALL of them missed. Nine independent perspectives, and none of them caught it. That's where the real signal lives.
      </p>
      <Quote text="Most AI dashboards only expose output. You expose output absence." source="ChatGPT — Marcus Grey" color={C.crimson} />
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        The blind spots section is the reason the council is nine models instead of one. Not for coverage — for triangulation. If nine independent reviewers all miss the same thing, that gap is structural, not accidental. It reveals assumptions so deep they're invisible to every model simultaneously.
      </p>

      <SectionHead num="IV" title="Two-Layer Architecture" color={C.green} />
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8, marginBottom: 14 }}>
        Every council review produces two artifacts:
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <div style={{ flex: "1 1 240px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 6 }}>Layer 1 — Raw Review</div>
          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            All nine responses, unedited, attributed, timestamped. The evidence file. Template type: LEDGER with DOSSIER cards.
          </p>
        </div>
        <div style={{ flex: "1 1 240px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: C.crimson, marginBottom: 6 }}>Layer 2 — Synthesis</div>
          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            Convergence, divergence, blind spots, tier analysis, verdict, actions. The deliverable. Template type: CHRONICLE with CONSOLE widgets.
          </p>
        </div>
      </div>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.8 }}>
        They cross-link. The synthesis cites the raw. The raw links up to the synthesis. Over time, the review index becomes a LEDGER — a filterable registry of every council session ever run. A searchable institutional memory of how nine models saw every artifact, decision, and system that passed through the council.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Tab 3: Filled Review
// ═══════════════════════════════════════════════════════════
function ReviewView() {
  const [expandedModel, setExpandedModel] = useState(null);
  const r = review;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
          Council Review #{r.slug}
        </div>
        <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.cream, marginBottom: 4 }}>{r.title}</h2>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
          {r.date} · {r.subject} · 9 models · {r.responses.reduce((a, b) => a + b.wordCount, 0).toLocaleString()} words total
        </div>
      </div>

      {/* Prompt */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16, marginBottom: 20 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Dispatch Prompt</div>
        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamMid, marginBottom: 8 }}>{r.prompt}</div>
        <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{r.promptContext}</div>
      </div>

      {/* Tier Analysis */}
      <SectionHead num="I" title="Tier Analysis" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {r.tiers.map((tier, i) => (
          <div key={i} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 6,
            padding: "14px 18px", borderLeft: `3px solid ${tier.color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: tier.color }}>{tier.label}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {tier.members.map(m => <ModelBadge key={m} model={m} small />)}
              </div>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{tier.desc}</p>
          </div>
        ))}
      </div>
      <Quote text={r.metaInsight} source="Synthesis" color={C.amber} />

      {/* Model Responses */}
      <SectionHead num="II" title="Individual Responses" color={C.blue} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {r.responses.map((resp) => {
          const m = models.find(x => x.id === resp.id);
          const isOpen = expandedModel === resp.id;
          return (
            <div key={resp.id} style={{
              background: C.card, border: `1px solid ${isOpen ? m.color + "40" : C.border}`,
              borderRadius: 6, overflow: "hidden", transition: "border-color 0.2s",
            }}>
              <button onClick={() => setExpandedModel(isOpen ? null : resp.id)} style={{
                width: "100%", padding: "12px 16px", background: "transparent", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{m.code}</span>
                    <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream }}>{m.name}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: m.color }}>{m.model}</span>
                  </div>
                </div>
                <span style={{
                  fontFamily: font.mono, fontSize: 10, padding: "2px 7px", borderRadius: 3,
                  background: review.tiers.find(t => t.label.includes(resp.tierLabel))?.color + "20" || C.creamGhost,
                  color: review.tiers.find(t => t.label.includes(resp.tierLabel))?.color || C.creamDim,
                }}>{resp.tierLabel}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{resp.wordCount}w</span>
                <span style={{
                  fontFamily: font.mono, fontSize: 13, color: C.creamDim,
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s", display: "inline-block",
                }}>›</span>
              </button>
              <div style={{
                maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0,
                overflow: "hidden", transition: "all 0.3s ease",
              }}>
                <div style={{ padding: "0 16px 14px" }}>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Core Point</div>
                  <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, marginBottom: 10 }}>{resp.corePoint}</p>
                  <Quote text={resp.bestLine} source={m.name} color={m.color} />
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, marginTop: 8 }}>Missed</div>
                  <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{resp.missed}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Convergence */}
      <SectionHead num="III" title="Convergence" color={C.green} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.convergence.map((c, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px",
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 5,
          }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.green, flexShrink: 0, marginTop: 2 }}>✓</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Divergence */}
      <SectionHead num="IV" title="Divergence" color={C.amber} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {r.divergence.map((d, i) => (
          <div key={i} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 5, padding: "12px 16px",
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.amber, marginBottom: 4 }}>{d.topic}</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{d.positions}</p>
          </div>
        ))}
      </div>

      {/* Blind Spots */}
      <SectionHead num="V" title="Blind Spots — What Nobody Caught" color={C.crimson} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.blindSpots.map((b, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px",
            background: C.crimsonFaint, border: `1px solid ${C.crimson}20`, borderRadius: 5,
          }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, flexShrink: 0, marginTop: 2 }}>⊘</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Verdict + Actions */}
      <SectionHead num="VI" title="Verdict + Actions" color={C.cream} />
      <div style={{ padding: "14px 18px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 5px 5px 0", marginBottom: 16 }}>
        <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7 }}>{r.verdict}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.actions.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px",
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 5,
          }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, flexShrink: 0, marginTop: 2 }}>→</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function CouncilReviewSystem() {
  const [tab, setTab] = useState("review");

  const tabs = [
    { id: "template", label: "Template" },
    { id: "methodology", label: "Methodology" },
    { id: "review", label: "Review #1" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 56px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>
            DDL Council · Review System
          </p>
          <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 6 }}>
            Nine Models. One Prompt. Synthesized.
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, fontStyle: "italic" }}>
            The template, the methodology, and the first review.
          </p>
          <div style={{ height: 2, width: 40, background: C.crimson, margin: "16px auto 0", opacity: 0.5 }} />
        </div>

        {/* Tab Nav */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 12px",
              background: tab === t.id ? C.crimsonDim : C.creamGhost,
              border: `1px solid ${tab === t.id ? C.crimson : C.border}`,
              borderRadius: 5, cursor: "pointer", transition: "all 0.15s",
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 11, fontWeight: 600,
                color: tab === t.id ? C.cream : C.creamDim,
                letterSpacing: "0.06em",
              }}>{t.label}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "template" && <TemplateView />}
        {tab === "methodology" && <MethodologyView />}
        {tab === "review" && <ReviewView />}

        {/* Footer */}
        <div style={{ marginTop: 40 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet})`, borderRadius: 1, marginBottom: 12 }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Cottage — Humble surface. Cathedral underneath.
          </div>
        </div>
      </div>
    </div>
  );
}

