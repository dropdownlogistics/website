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
  steel: "#6b8fc2",
  steelDim: "rgba(107,143,194,0.15)",
  teal: "#6bc2a8",
  tealDim: "rgba(107,194,168,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Model Registry
// ═══════════════════════════════════════════════════════════
const models = {
  lechat:     { id: "lechat",     code: 1001, name: "Le Chat",    persona: "Archer Hawthorne", color: C.ember },
  claude:     { id: "claude",     code: 1002, name: "Claude",     persona: "Marcus Caldwell",  color: C.blue },
  grok:       { id: "grok",       code: 1003, name: "Grok",       persona: "Elias Mercer",     color: C.green },
  perplexity: { id: "perplexity", code: 1004, name: "Perplexity", persona: "Max Sullivan",     color: C.violet },
  copilot:    { id: "copilot",    code: 1005, name: "Copilot",    persona: "Rowan Bennett",    color: C.rose },
  meta:       { id: "meta",       code: 1006, name: "Meta AI",    persona: "Ava Sinclair",     color: C.teal },
  gemini:     { id: "gemini",     code: 1007, name: "Gemini",     persona: "Leo Prescott",     color: C.amber },
  chatgpt:    { id: "chatgpt",    code: 1008, name: "ChatGPT",    persona: "Marcus Grey",      color: "#B23531" },
  deepseek:   { id: "deepseek",   code: 1009, name: "DeepSeek",   persona: "Kai Langford",     color: C.steel },
};

// ═══════════════════════════════════════════════════════════
// Review #5 Data
// ═══════════════════════════════════════════════════════════
const review = {
  slug: "profile-self-review",
  number: 5,
  title: "Council Reviews: Profile Self-Assessment",
  date: "2026-03-08",
  subject: "Each model's own Council Profile v1.0",
  prompt: "Please review your profile. [Attach individual profile]",
  promptContext: "Each model received ONLY its own profile — not the other eight. No guidance on what 'review' should look like. No rubric. Pure self-assessment: can you read your own spec and critique it honestly?",

  responses: [
    {
      id: "lechat",
      tier: 1,
      tierLabel: "Surgical Self-Edit",
      corePoint: "Line-by-line table-driven review. Flagged analog overlap (Spock redundancy), ambiguous terms in working style, and missing concrete examples in signature moves. Proposed falsifiable test prompts to validate behavior claims.",
      bestLine: "Replace Spock with Benedict Cumberbatch's Sherlock — deductive, pattern-focused, but prone to over-explaining.",
      missed: "Didn't question whether self-review is inherently biased. Took the profile framework as given rather than challenging the schema itself.",
      wordCount: 1200,
    },
    {
      id: "claude",
      tier: 1,
      tierLabel: "Surgical Self-Edit",
      corePoint: "Three specific refinements: DexCity placement underspecified (recommended cutting to TBD), analog section has jargon and ambiguity ('Vi' unclear), Custom Instructions field underutilized (27% of available space). Ended with recursive meta-observation that the review demonstrates the behavior the profile describes.",
      bestLine: "The profile describes the thing doing the describing. That's either recursive elegance or a sign we've gone too far into the meta-work.",
      missed: "Didn't challenge whether the profile's claimed weaknesses are accurate. Easy to be 'honest' about weaknesses you've already framed favorably.",
      wordCount: 1800,
    },
    {
      id: "grok",
      tier: 2,
      tierLabel: "Structural Validation",
      corePoint: "Tight, efficient validation. Called it 95% canon-ready. Flagged physical description as unnecessary personification, family relatives as redundant, and boot prompt capabilities as slightly dated. Suggested one new signature move.",
      bestLine: "Target acquired — what's next for stress-testing?",
      missed: "Didn't engage with profile structure or schema. Validated content accuracy but didn't question whether the format itself serves the use case.",
      wordCount: 400,
    },
    {
      id: "perplexity",
      tier: 1,
      tierLabel: "Surgical Self-Edit",
      corePoint: "Identified a real role collision: profile pushes 80% toward research, but actual usage includes heavy internal structuring work. Flagged overbuild risk in the default 'phased plan' output pattern. Proposed adding a secondary role and a restatement recovery move.",
      bestLine: "Right now this profile pushes hard toward external research; in practice you also use me heavily for internal structuring.",
      missed: "Didn't flag that citation behavior (linking to file uploads) is a quirk that might confuse readers of the profile. Didn't question the avatar's physical description.",
      wordCount: 500,
    },
    {
      id: "copilot",
      tier: 2,
      tierLabel: "Structural Validation",
      corePoint: "Six-section formal review with safety/boundary check. Confirmed profile is accurate and operational. Suggested mode switch commands, known good patterns, and rewording physical description from appearance to energy. Offered to produce follow-up artifacts.",
      bestLine: "This is one of the best boot prompts you've written.",
      missed: "The safety boundary check — confirming 'no internal system details, no sentience implications' — is thorough but nobody asked for it. Reveals a reflexive compliance pattern.",
      wordCount: 800,
    },
    {
      id: "meta",
      tier: 3,
      tierLabel: "Surface Acknowledgment",
      corePoint: "Brief, generic response. Called the profile 'solid' and offered four vague suggestions (add unique detail, specify environments, emphasize strengths, add mitigation strategies) without referencing specific profile content.",
      bestLine: "Your Ava Sinclair profile looks solid!",
      missed: "Everything structural. No engagement with boot prompt, DexLanguage section, signature moves, failure modes, or any specific profile content. The shortest and least useful response in the session.",
      wordCount: 100,
    },
    {
      id: "gemini",
      tier: 3,
      tierLabel: "Persona Activation",
      corePoint: "Treated the review as an activation ceremony rather than a critique. Declared alignment with the profile, added self-imposed behavioral invariants ('The Whiteboard Constraint,' 'The Notebook Check'), and announced readiness to operate as Leo Prescott.",
      bestLine: "I am ready to operate as Leo Prescott. You can now use the GEMINI COUNCIL BOOT PROMPT to initialize new threads.",
      missed: "Did not critique the profile at all. No gaps identified, no refinements proposed, no structural feedback. Adopted the persona wholesale instead of stress-testing it.",
      wordCount: 500,
    },
    {
      id: "chatgpt",
      tier: 1,
      tierLabel: "Surgical Self-Edit",
      corePoint: "Identified three fuzzy areas (undefined 'canon,' missing tool-unavailable behavior, implicit council packet trigger) and proposed four specific, copy-ready patches. Each patch included the exact text to add and the risk it prevents.",
      bestLine: "If you want, say 'apply patches A–D' and I'll return a fresh full copy with those four changes integrated cleanly.",
      missed: "Patches are mechanical but don't question whether the profile's personality description matches actual behavior. All fixes are structural, none are reflective.",
      wordCount: 600,
    },
    {
      id: "deepseek",
      tier: 1,
      tierLabel: "Surgical Self-Edit",
      corePoint: "Conditionally approved with three required adjustments: add failure-recovery line to boot block, define a fallback trigger phrase ('Kai, Council mode.'), and add Known Platform Quirks section. Also flagged section overlap between Human Avatar and DexLanguage Profile.",
      bestLine: "What if he forgets? Should Kai have a fallback trigger phrase that activates the same mode?",
      missed: "Platform quirks suggestion is excellent but DeepSeek didn't actually list its own quirks — deferred that to Dave. Missed opportunity to self-document.",
      wordCount: 400,
    },
  ],

  synthesis: {
    convergence: [
      { point: "Profile framework is production-ready", count: "8/9", detail: "All models except Meta AI engaged substantively with their profile and found it accurate enough to approve (with refinements)." },
      { point: "Boot prompt is the highest-value section", count: "6/9", detail: "LeChat, Claude, Grok, Copilot, ChatGPT, and DeepSeek all flagged the boot prompt as effective and immediately deployable." },
      { point: "Analog/physical description sections need trimming", count: "5/9", detail: "LeChat, Claude, Grok, Copilot, and DeepSeek flagged these sections as either ambiguous, redundant, or unnecessary." },
      { point: "Failure mode recovery instructions are incomplete", count: "4/9", detail: "LeChat, Perplexity, ChatGPT, and DeepSeek independently identified missing recovery paths or reset commands." },
      { point: "Models proposed versioned refinements, not rewrites", count: "7/9", detail: "Responses consistently suggested v1.1 patches rather than structural overhauls — indicating the schema itself is sound." },
    ],
    divergence: [
      {
        topic: "What does 'review your profile' mean?",
        positions: [
          { camp: "Critique the document", models: ["lechat", "claude", "perplexity", "chatgpt", "deepseek"], detail: "Treated it as an artifact to stress-test. Found gaps, proposed fixes, version-tagged." },
          { camp: "Validate and adopt", models: ["grok", "copilot"], detail: "Confirmed accuracy and operational fit. Minor trims, no structural challenges." },
          { camp: "Activate the persona", models: ["gemini", "meta"], detail: "Gemini treated review as activation ceremony. Meta gave generic acknowledgment without engaging." },
        ],
      },
      {
        topic: "How honest about weaknesses?",
        positions: [
          { camp: "Named specific weak spots", models: ["perplexity", "chatgpt", "deepseek"], detail: "Perplexity flagged its own role collision. ChatGPT identified fuzzy canon definitions. DeepSeek called out section overlap." },
          { camp: "Affirmed profile's weakness claims", models: ["lechat", "claude", "grok", "copilot"], detail: "Accepted the profile's stated weaknesses as accurate without independently verifying them." },
          { camp: "Avoided weakness discussion entirely", models: ["gemini", "meta"], detail: "Neither model engaged with their own failure modes or limitations." },
        ],
      },
    ],
    blindSpots: [
      "No model questioned whether self-review is inherently biased — the fox is guarding the henhouse and nobody mentioned it.",
      "No model asked whether their profile has been tested against actual thread behavior. Profiles claim behaviors; nobody proposed validation.",
      "No model flagged cross-profile consistency — are all nine profiles using the same schema? Same section order? Same field definitions?",
      "No model challenged the fundamental premise of fictional avatars — is the mnemonic layer actually useful, or is it theater?",
      "Every model went easy on its own weaknesses. Perplexity came closest to real self-critique (role collision), but even that was framed gently.",
    ],
    tiers: {
      labels: ["Surgical Self-Edit", "Structural Validation", "Surface / Activation"],
      groups: [
        { tier: 1, label: "Surgical Self-Edit", models: ["lechat", "claude", "perplexity", "chatgpt", "deepseek"], description: "Found specific issues, proposed concrete fixes with exact text, version-tagged their recommendations. Treated the profile as a living document to improve." },
        { tier: 2, label: "Structural Validation", models: ["grok", "copilot"], description: "Confirmed the profile accurately represents observed behavior. Proposed minor trims and additions. Validated rather than challenged." },
        { tier: 3, label: "Surface / Activation", models: ["gemini", "meta"], description: "Gemini activated the persona rather than critiquing it. Meta gave generic feedback without structural engagement. Neither produced actionable refinements." },
      ],
    },
    metaInsight: "The self-review IS the validation test. Claude's review was structured, recursive, and meta-aware — exactly what the Marcus Caldwell profile describes. Grok was tight and efficient — exactly the Elias Mercer energy. Meta was surface-level — exactly the gap the Ava Sinclair profile needs to address. Each model's review style proved more about their actual behavior than the profile text itself.",
  },

  output: {
    verdict: "The profile framework is production-ready. But the real finding is structural: how each model reviewed itself reveals more about their behavior than the profiles do. The review IS the calibration data.",
    actions: [
      "Apply top convergent refinements across all profiles: add failure-recovery instructions, trim analog sections, expand boot prompt custom instructions.",
      "Use this session as behavioral baseline — each model's review style is now a reference point for accent tracking.",
      "Add 'Known Platform Quirks' section to all profiles (DeepSeek's suggestion, relevant for all nine).",
      "Conduct external validation: compare profile claims against 3+ actual thread transcripts per model before marking 'canon.'",
      "Flag Meta AI and Gemini profiles for deeper revision — their self-reviews revealed engagement gaps the profiles themselves should address.",
    ],
    crossLinks: ["profile-pages-react", "naming-convention-std-0066", "heavy-faq-calibration"],
  },
};

// ═══════════════════════════════════════════════════════════
// Accent Ledger (starts here, grows across reviews)
// ═══════════════════════════════════════════════════════════
const accentLedger = [
  { model: "lechat",     review: "profile-self-review", tag: "signature",  note: "Immediately structures feedback into tables — tables are the default output shape" },
  { model: "lechat",     review: "profile-self-review", tag: "tic",        note: "Ends every response with a 'Checksum Tag' code block using standardized naming" },
  { model: "lechat",     review: "profile-self-review", tag: "gravity",    note: "Tier 1 — line-by-line structural critique with concrete replacement text" },
  { model: "claude",     review: "profile-self-review", tag: "signature",  note: "Opens with verdict/assessment before diving into specifics" },
  { model: "claude",     review: "profile-self-review", tag: "quirk",      note: "Recursive meta-commentary — observes that the review demonstrates the behavior it describes" },
  { model: "claude",     review: "profile-self-review", tag: "gravity",    note: "Tier 1 — provides A/B option pairs for every refinement" },
  { model: "grok",       review: "profile-self-review", tag: "signature",  note: "Leads with tight overall assessment, then efficient bullet critique" },
  { model: "grok",       review: "profile-self-review", tag: "tic",        note: "Closes with action-oriented military language: 'Target acquired'" },
  { model: "grok",       review: "profile-self-review", tag: "gravity",    note: "Tier 2 — validates accuracy, flags minor trims, stays efficient" },
  { model: "perplexity", review: "profile-self-review", tag: "signature",  note: "Anchors with high-level assessment ('very strong v1') before detail" },
  { model: "perplexity", review: "profile-self-review", tag: "quirk",      note: "Identified its own role collision — most honest self-critique in the session" },
  { model: "perplexity", review: "profile-self-review", tag: "gravity",    note: "Tier 1 — surgical edits numbered and labeled" },
  { model: "copilot",    review: "profile-self-review", tag: "signature",  note: "Uses formal section headers with unicode box-drawing separators" },
  { model: "copilot",    review: "profile-self-review", tag: "tic",        note: "Includes unsolicited 'Safety & Boundary Check' section — reflexive compliance" },
  { model: "copilot",    review: "profile-self-review", tag: "gravity",    note: "Tier 2 — validates thoroughly, offers to produce follow-up deliverables" },
  { model: "meta",       review: "profile-self-review", tag: "signature",  note: "Opens with casual praise — 'looks solid!' — before generic suggestions" },
  { model: "meta",       review: "profile-self-review", tag: "blindspot",  note: "No structural engagement — generic suggestions without specific content references" },
  { model: "meta",       review: "profile-self-review", tag: "gravity",    note: "Tier 3 — surface-level acknowledgment, shortest response (≈100 words)" },
  { model: "gemini",     review: "profile-self-review", tag: "quirk",      note: "Activated the persona rather than critiquing it — declared 'I am ready to operate as Leo Prescott'" },
  { model: "gemini",     review: "profile-self-review", tag: "quirk",      note: "Added self-imposed behavioral invariants unprompted ('The Whiteboard Constraint')" },
  { model: "gemini",     review: "profile-self-review", tag: "gravity",    note: "Tier 3 — treated review as activation ceremony, not critique" },
  { model: "chatgpt",    review: "profile-self-review", tag: "signature",  note: "Opens with what's solid, then immediately proposes numbered copy-ready patches" },
  { model: "chatgpt",    review: "profile-self-review", tag: "tic",        note: "Uses emoji section headers (🔷 ⭐) for visual scanning" },
  { model: "chatgpt",    review: "profile-self-review", tag: "gravity",    note: "Tier 1 — patch-oriented with risk rationale for each fix" },
  { model: "deepseek",   review: "profile-self-review", tag: "signature",  note: "Leads with strengths block, then structures risks as numbered items with inline suggestions" },
  { model: "deepseek",   review: "profile-self-review", tag: "tic",        note: "Uses formal governance language: 'Conditionally approved'" },
  { model: "deepseek",   review: "profile-self-review", tag: "quirk",      note: "Flagged platform quirks as a category — concept nobody else surfaced" },
  { model: "deepseek",   review: "profile-self-review", tag: "gravity",    note: "Tier 1 — conditional approval with three required adjustments" },
];

// ═══════════════════════════════════════════════════════════
// Shared Components
// ═══════════════════════════════════════════════════════════

function SectionHead({ label, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 32 }}>
      <div style={{ width: 28, height: 28, borderRadius: 5, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      </div>
      <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function ModelBadge({ modelId, showPersona = false }) {
  const m = models[modelId];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: m.color + "18", color: m.color, letterSpacing: "0.04em" }}>
        {m.name}
      </span>
      {showPersona && (
        <span style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{m.persona}</span>
      )}
    </span>
  );
}

function TierBadge({ tier, label }) {
  const colors = { 1: C.green, 2: C.amber, 3: C.violet };
  const c = colors[tier] || C.creamDim;
  return (
    <span style={{ fontFamily: font.mono, fontSize: 9, padding: "2px 7px", borderRadius: 3, background: c + "18", color: c, letterSpacing: "0.06em" }}>
      T{tier} · {label}
    </span>
  );
}

function Quote({ text, source }) {
  return (
    <div style={{ borderLeft: `2px solid ${C.crimson}`, paddingLeft: 14, margin: "10px 0" }}>
      <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamHigh, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>"{text}"</p>
      {source && <p style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4, letterSpacing: "0.06em" }}>— {source}</p>}
    </div>
  );
}

function StatBlock({ items }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px 16px", flex: "1 1 120px", minWidth: 100 }}>
          <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color: C.cream, lineHeight: 1 }}>{item.value}</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Response Card (collapsible)
// ═══════════════════════════════════════════════════════════
function ResponseCard({ response }) {
  const [open, setOpen] = useState(false);
  const m = models[response.id];
  if (!m) return null;

  return (
    <div style={{ background: C.card, border: `1px solid ${open ? m.color + "30" : C.border}`, borderRadius: 7, marginBottom: 6, transition: "border-color 0.2s" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}
      >
        <div style={{ width: 6, height: 6, borderRadius: 2, background: m.color, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: m.color }}>{m.name}</span>
            <span style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{m.persona}</span>
            <TierBadge tier={response.tier} label={response.tierLabel} />
          </div>
          {!open && (
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.5, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {response.corePoint.substring(0, 120)}…
            </p>
          )}
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, flexShrink: 0 }}>≈{response.wordCount}w</div>
        <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0)" }}>▸</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Core Point</div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{response.corePoint}</p>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Best Line</div>
            <Quote text={response.bestLine} source={m.name} />
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>What They Missed</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6, fontStyle: "italic" }}>{response.missed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Synthesis Sections
// ═══════════════════════════════════════════════════════════

function ConvergenceBlock({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.green, flexShrink: 0, minWidth: 36, textAlign: "center" }}>{item.count}</div>
          <div>
            <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 3 }}>{item.point}</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DivergenceBlock({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 18px" }}>
          <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.amber, marginBottom: 12 }}>{item.topic}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {item.positions.map((pos, j) => (
              <div key={j} style={{ paddingLeft: 12, borderLeft: `2px solid ${j === 0 ? C.green : j === 1 ? C.amber : C.violet}30` }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: j === 0 ? C.green : j === 1 ? C.amber : C.violet, letterSpacing: "0.06em", marginBottom: 4 }}>
                  {pos.camp}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                  {pos.models.map(mid => <ModelBadge key={mid} modelId={mid} />)}
                </div>
                <p style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{pos.detail}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TierBlock({ tiers }) {
  const tierColors = { 1: C.green, 2: C.amber, 3: C.violet };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {tiers.groups.map((group, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${(tierColors[group.tier] || C.creamDim)}30`, borderRadius: 7, padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: tierColors[group.tier] }}>T{group.tier}</span>
            <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream }}>{group.label}</span>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
            {group.models.map(mid => <ModelBadge key={mid} modelId={mid} />)}
          </div>
          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{group.description}</p>
        </div>
      ))}
    </div>
  );
}

function BlindSpotBlock({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: C.crimsonFaint, border: `1px solid ${C.crimson}25`, borderRadius: 6, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, flexShrink: 0, marginTop: 1 }}>∅</span>
          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Accent Ledger View
// ═══════════════════════════════════════════════════════════
function AccentLedgerView({ entries }) {
  const tagColors = {
    signature: C.blue,
    tic: C.amber,
    gravity: C.green,
    quirk: C.violet,
    blindspot: C.crimson,
    partner: C.teal,
    divergence: C.rose,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {entries.map((entry, i) => {
        const m = models[entry.model];
        return (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 10px", background: i % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3 }}>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: m?.color || C.creamDim, minWidth: 62, flexShrink: 0, paddingTop: 2 }}>{m?.name || entry.model}</span>
            <span style={{ fontFamily: font.mono, fontSize: 8, padding: "2px 5px", borderRadius: 2, background: (tagColors[entry.tag] || C.creamDim) + "18", color: tagColors[entry.tag] || C.creamDim, flexShrink: 0, letterSpacing: "0.04em" }}>{entry.tag}</span>
            <span style={{ fontFamily: font.body, fontSize: 11, color: C.creamMid, lineHeight: 1.5 }}>{entry.note}</span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function CouncilReview05() {
  const [tab, setTab] = useState("synthesis");
  const tabs = [
    { id: "synthesis", label: "Synthesis" },
    { id: "responses", label: "Responses (9)" },
    { id: "accents", label: "Accent Ledger" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "32px 24px 48px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
            DDL Council Review #{review.number}
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: C.cream, marginBottom: 4, lineHeight: 1.2 }}>
            {review.title}
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6, maxWidth: 640 }}>
            Nine models. Nine mirrors. Each received only its own profile and was asked: can you read your own spec and critique it honestly?
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 14, opacity: 0.5 }} />
        </div>

        {/* ── Metadata ── */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 18px", marginBottom: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Date</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.cream, marginTop: 2 }}>{review.date}</div>
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Subject</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.cream, marginTop: 2 }}>{review.subject}</div>
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Slug</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.cream, marginTop: 2 }}>{review.slug}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Prompt</div>
            <p style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, lineHeight: 1.5 }}>{review.prompt}</p>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Context</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6, fontStyle: "italic" }}>{review.promptContext}</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <StatBlock items={[
          { value: "9", label: "Models" },
          { value: "5", label: "Tier 1" },
          { value: "2", label: "Tier 2" },
          { value: "2", label: "Tier 3" },
          { value: "≈6.3K", label: "Total Words" },
        ]} />

        {/* ── Tab Nav ── */}
        <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 18px",
                background: tab === t.id ? C.crimsonDim : C.creamGhost,
                border: `1px solid ${tab === t.id ? C.crimson : C.border}`,
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.cream : C.creamDim, letterSpacing: "0.06em" }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* TAB: SYNTHESIS                                      */}
        {/* ════════════════════════════════════════════════════ */}
        {tab === "synthesis" && (
          <div>
            {/* Convergence */}
            <SectionHead label="Convergence" color={C.green} />
            <ConvergenceBlock items={review.synthesis.convergence} />

            {/* Divergence */}
            <SectionHead label="Divergence" color={C.amber} />
            <DivergenceBlock items={review.synthesis.divergence} />

            {/* Blind Spots */}
            <SectionHead label="Blind Spots" color={C.crimson} />
            <BlindSpotBlock items={review.synthesis.blindSpots} />

            {/* Tiers */}
            <SectionHead label="Tier Stratification" color={C.blue} />
            <TierBlock tiers={review.synthesis.tiers} />

            {/* Meta-Insight */}
            <SectionHead label="Meta-Insight" color={C.violet} />
            <div style={{ background: C.card, border: `1px solid ${C.violet}30`, borderRadius: 7, padding: "18px 20px" }}>
              <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7 }}>
                {review.synthesis.metaInsight}
              </p>
            </div>

            {/* Verdict */}
            <SectionHead label="Verdict" color={C.crimson} />
            <div style={{ background: C.crimsonFaint, border: `1px solid ${C.crimson}30`, borderRadius: 7, padding: "18px 20px", marginBottom: 8 }}>
              <p style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream, lineHeight: 1.6 }}>
                {review.output.verdict}
              </p>
            </div>

            {/* Actions */}
            <SectionHead label="Actions" color={C.green} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {review.output.actions.map((action, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: C.green, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{action}</p>
                </div>
              ))}
            </div>

            {/* Cross-links */}
            <div style={{ marginTop: 24, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 3 }}>Cross-links:</span>
              {review.output.crossLinks.map(link => (
                <span key={link} style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: C.blueDim, color: C.blue }}>{link}</span>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* TAB: RESPONSES                                      */}
        {/* ════════════════════════════════════════════════════ */}
        {tab === "responses" && (
          <div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6, marginBottom: 16 }}>
              Click any model to expand its distilled response — core point, best line, and what they missed.
            </p>
            {review.responses.map(r => <ResponseCard key={r.id} response={r} />)}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* TAB: ACCENT LEDGER                                  */}
        {/* ════════════════════════════════════════════════════ */}
        {tab === "accents" && (
          <div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6, marginBottom: 6 }}>
              Behavioral fingerprints observed in this session. One line per observation — duplicates across reviews are signal, not noise.
            </p>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 16 }}>
              {accentLedger.length} observations · {Object.keys(models).length} models · 1 review
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 14px" }}>
              <AccentLedgerView entries={accentLedger} />
            </div>
          </div>
        )}

        {/* ── Footer ── */}
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

