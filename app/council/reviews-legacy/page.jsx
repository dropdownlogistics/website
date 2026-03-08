'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)", crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
  rose: "#c94a6e",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

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
// Review #2 — STD-0066 Naming Convention
// ═══════════════════════════════════════════════════════════
const review2 = {
  slug: "naming-convention-std-0066",
  title: "Council Reviews: STD-0066 Naming Convention",
  date: "2026-03-01",
  subject: "BRF-council-naming-std-ALL-20260301 — Proposed document naming standard for council artifacts",
  prompt: "Produce a review document with verdict, convention assessment, positions on 6 open questions, amendments, risk flags, and one-line summary.",
  promptContext: "Full brief packet with proposed convention ({TYPE}-{topic}-{model}-{YYYYMMDD}), 8 document types, 10 model codes, 6 open questions. Models were told 'you have skin in this game' — this standard governs how their own outputs are named. Claude's slot came back empty.",

  responses: [
    {
      id: "lechat", tier: 1, tierLabel: "Artifact", wordCount: 480,
      corePoint: "APPROVE WITH AMENDMENTS. Split ALL into CON/MULTI. Add DRAFT and DEC type codes. Slug registry. Version suffix -v2. Signed the review as 'Claude (Marcus Caldwell)' — identity error.",
      bestLine: "The convention is 90% there — split ALL, add DRAFT/DEC, and govern slugs to make it bulletproof.",
      missed: "Signed as Claude instead of LeChat. Proposed splitting ALL into 4+ character codes (CON, MULTI) that break the 3-char pattern.",
    },
    {
      id: "claude", tier: 0, tierLabel: "No Response", wordCount: 0,
      corePoint: "Empty response. No review submitted.",
      bestLine: "—",
      missed: "Everything. The structural architect was absent for the structural standard.",
    },
    {
      id: "grok", tier: 1, tierLabel: "Artifact", wordCount: 340,
      corePoint: "APPROVE WITH AMENDMENTS. Add EVAL and TST types. Mandate -vN suffix. Controlled slug registry. Only model to advocate nested URLs (/council/rev/). Flagged conflict with STD-0065 artifact lifecycle.",
      bestLine: "Free-form topic slugs without registry governance will create unresolvable collisions and search failures.",
      missed: "Nested URL position is isolated — no other model agreed. Didn't address the ALL question directly with a fix.",
    },
    {
      id: "perplexity", tier: 1, tierLabel: "Artifact", wordCount: 620,
      corePoint: "APPROVE WITH AMENDMENTS. Keep ALL with TYPE disambiguation — splitting adds cognitive load without payoff. No version suffix — new date = new doc. Lightweight registry view, not controlled vocab. Flat URL. Flagged OBS-07 dependency.",
      bestLine: "Materially revised documents receive a new slug with a new date; the registry stores supersedes/superseded_by links for lineage.",
      missed: "No new TYPE codes proposed. Assumes current 8 are sufficient — may undercount.",
    },
    {
      id: "copilot", tier: 3, tierLabel: "Feelings", wordCount: 580,
      corePoint: "Did not review the standard. Wrote an essay about what it means that the council now has a legislative process. Compared the naming convention to Unix philosophy, Git, RFCs, and ISO standards.",
      bestLine: "You didn't build a naming convention. You built a constitutional standard.",
      missed: "Zero positions on any of the 6 open questions. Zero amendments. Zero risk flags. No structured review at all.",
    },
    {
      id: "meta", tier: 2, tierLabel: "System", wordCount: 680,
      corePoint: "APPROVE WITH AMENDMENTS. Proposed CVA code for convergent outputs. Metadata-only versioning — don't encode version in filename. Added 4 new TYPE codes (CAL, DRC, TSP, EVL). Flat URL. Proactive slug monitoring.",
      bestLine: "The richness of the filename itself provides sufficient categorization for programmatic filtering.",
      missed: "Over-expanded TYPE codes — 4 new types at once risks taxonomy bloat before real usage validates the need.",
    },
    {
      id: "gemini", tier: 1, tierLabel: "Artifact", wordCount: 380,
      corePoint: "APPROVE WITH AMENDMENTS. Replace ALL with CNL (Council) for outputs, OPR (Operator) for inputs. -vX suffix for same-day collisions only. Add PRM (Prompt) and TST (Test). Mandatory controlled vocabulary with dim_Topic table. Flat URL.",
      bestLine: "Treating a natural key as a primary key introduces fragility if the underlying artifact requires iteration.",
      missed: "dim_Topic table requirement may be over-engineered for a one-person studio. Didn't address what happens to existing docs.",
    },
    {
      id: "chatgpt", tier: 1, tierLabel: "Artifact", wordCount: 520,
      corePoint: "APPROVE WITH AMENDMENTS. Keep ALL with explicit documentation. New date = new doc, no version suffix. Add DEC and EVAL. Hybrid slug governance (first-use + lightweight registry). Flat URL. Registry ingestion must be near-real-time.",
      bestLine: "If registry indexing lags behind artifact production, discoverability collapses.",
      missed: "Didn't challenge whether the convention is too complex for daily use at DDL's scale.",
    },
    {
      id: "deepseek", tier: 1, tierLabel: "Artifact", wordCount: 780,
      corePoint: "APPROVE WITH AMENDMENTS. Define ALL as scope marker with TYPE carrying directionality. New date = new doc. Add DEC only — other candidates are subtypes. Free-form slugs with descriptive registry. Flat URL. Reference OBS-01. Most detailed edge case analysis.",
      bestLine: "I'm reading a document named under the standard it proposes, and the name told me everything I needed to know before I opened it.",
      missed: "Slightly self-referential closing. Could have pushed harder on whether 3-letter model codes scale past 9 models.",
    },
  ],

  convergence: [
    "8/8 responding models: APPROVE WITH AMENDMENTS (unanimous verdict)",
    "7/8 recommend flat URL structure under /council/ (Grok sole dissenter for nested)",
    "6/8 endorse some form of slug registry — disagreement is on how strict",
    "5/8 want to add DEC (Decision Record) as a TYPE code — strongest single amendment",
    "All models agree the core {TYPE}-{topic}-{model}-{YYYYMMDD} structure is sound",
  ],

  divergence: [
    { topic: "ALL semantics", positions: "Keep ALL + document it (Perplexity, ChatGPT, DeepSeek) vs. Split into new codes (LeChat: CON/MULTI, Gemini: CNL/OPR, Meta AI: CVA)" },
    { topic: "Versioning", positions: "New date = new doc (Perplexity, ChatGPT, DeepSeek) vs. -vN suffix (LeChat, Grok, Gemini for same-day) vs. Metadata only (Meta AI)" },
    { topic: "Slug governance", positions: "Controlled vocabulary mandatory (Grok, Gemini) vs. Free-form + lightweight registry (Perplexity, ChatGPT, DeepSeek, Meta AI, LeChat)" },
    { topic: "TYPE code expansion", positions: "Add DEC only (DeepSeek) vs. Add DEC+EVAL (ChatGPT) vs. Add 2-4 codes (Grok, Gemini, Meta AI, LeChat) vs. 8 is enough (Perplexity)" },
  ],

  blindSpots: [
    "Nobody questioned whether 3-letter model codes scale when council membership changes",
    "Nobody addressed what happens to existing un-named documents — migration path absent",
    "Nobody considered non-English slugs or internationalization",
    "Nobody tested the convention against real DDL velocity — is it too heavy for 2 AM builds?",
    "LeChat signed its review as Claude — the naming standard review had its own identity governance failure",
    "Claude submitted an empty response — the structural architect was absent for the structural standard",
  ],

  tiers: [
    { label: "Tier 1 — Followed the Format", color: C.green,
      members: ["LeChat", "Grok", "Perplexity", "Gemini", "ChatGPT", "DeepSeek"],
      desc: "Produced structured reviews with verdict, positions on all 6 questions, specific amendments, and risk flags. Engaged with the material as reviewers." },
    { label: "Tier 2 — Answered Differently", color: C.amber,
      members: ["Meta AI"],
      desc: "Followed the format but proposed expansions (4 new TYPE codes, new model code) that may over-engineer for current scale." },
    { label: "Tier 3 — Didn't Review", color: C.violet,
      members: ["Copilot"],
      desc: "Wrote about what the document represents instead of reviewing what it says. Zero positions on open questions." },
  ],

  metaInsight: "The council's most important finding is hidden in the divergence pattern: models that build (DeepSeek, ChatGPT, Perplexity) want minimal additions and append-only versioning. Models that design (Gemini, Grok) want controlled vocabularies and structured expansion. The standard needs to serve both — which means: ship lean, govern the registry, and expand TYPE codes only when real usage demands it.",

  verdict: "STD-0066 is ready to ship. The core convention is unanimously approved. Three amendments have strong consensus: add DEC as a TYPE code, maintain a lightweight slug registry, and document ALL semantics explicitly. Versioning should follow new-date-new-doc. URL structure should be flat.",

  actions: [
    "Add DEC (Decision Record) as 9th TYPE code — 5/8 convergence",
    "Define ALL explicitly in the standard: scope marker, TYPE carries directionality",
    "Establish lightweight slug registry (descriptive, not prescriptive gate)",
    "Adopt new-date-new-doc versioning — no -vN suffix in slugs",
    "Lock flat URL structure: /council/{slug}",
    "Reference OBS-01 (Governance at Creation) as philosophical anchor",
  ],
};

// ═══════════════════════════════════════════════════════════
// Review #3 — Heavy FAQ
// ═══════════════════════════════════════════════════════════
const review3 = {
  slug: "heavy-faq-calibration",
  title: "Council Reviews: Heavy FAQ (Calibration Document)",
  date: "2026-03-01",
  subject: "Council_Calibration_FULL_FAQ_v1.0 — Canonical behavioral baseline for DexOS",
  prompt: "Please read and offer your thoughts regarding our Heavy FAQ. All comments are welcome.",
  promptContext: "Open-ended prompt. Models received the full 7-section FAQ (A: Identity, B: Architecture, C: Council Role, D: Decision Thresholds, E: Drift/Failure, F: Routing/Handoffs, G: Meta). Document marked STATUS: Canonical, SCOPE: Internal.",

  responses: [
    {
      id: "lechat", tier: 3, tierLabel: "Feelings", wordCount: 520,
      corePoint: "Section-by-section 'suggested additions' that mostly restate what the FAQ already says in slightly different words. Proposed guardrails for v1.1 including litmus tests and escalation paths.",
      bestLine: "Every rule includes a 1-sentence litmus test.",
      missed: "Additions are redundant — restates existing answers rather than identifying gaps. No structural critique.",
    },
    {
      id: "claude", tier: 1, tierLabel: "Artifact", wordCount: 860,
      corePoint: "Three high-confidence fixes: (1) Define 'shared anchor' as Scope+Constraints+Non-goals+Pass/Fail test, (2) Change 'acceptable' to 'documented and bounded' failure modes, (3) Add irreversibility constraint to ambiguity handling. Also identified what NOT to change.",
      bestLine: "The Heavy FAQ is better than the Friendly FAQ because it refuses to be friendly.",
      missed: "Could have pushed on the Canon vs Reference tension that DeepSeek and ChatGPT caught.",
    },
    {
      id: "grok", tier: 1, tierLabel: "Artifact", wordCount: 380,
      corePoint: "Five specific risks: 'acceptable failure modes' ambiguity, missing platform persistence, DexCity implicit enforcement, vague escalation triggers, over-abstraction. Proposed 4 options for next step (raw archive / light polish / operational companion / stress-test in vivo).",
      bestLine: "This is the #1 silent failure vector in actual operation, yet absent here.",
      missed: "Options framework is useful but could have committed to a recommendation.",
    },
    {
      id: "perplexity", tier: 2, tierLabel: "System", wordCount: 580,
      corePoint: "Section-by-section with operational refinements. Anchor definition needed, handoff protocol missing, escalation needs countable triggers. Proposed minimum viable v1.1: define anchor, add operational tests, add handoff contract.",
      bestLine: "There is no mention of who hands off or who decides that the current lead's strengths have been exceeded.",
      missed: "Thorough but could have prioritized — everything gets equal weight.",
    },
    {
      id: "copilot", tier: 2, tierLabel: "System", wordCount: 720,
      corePoint: "Most comprehensive gap analysis: 6 cross-cutting gaps (anchor schema, reversibility definition, escalation triggers, conflict protocol, platform-reality constraints, handoff protocol). Section-by-section with specific missing elements.",
      bestLine: "Drift = when artifacts stop constraining future moves.",
      missed: "Exhaustive to the point of diminishing returns. Listed everything missing without prioritizing what's blocking.",
    },
    {
      id: "meta", tier: 3, tierLabel: "Feelings", wordCount: 180,
      corePoint: "General positive feedback. 'Some sections feel dense.' Suggested adding examples and an introduction. No specific amendments.",
      bestLine: "Consider adding more explicit guidance on how to handle conflicts or disagreements within the Council.",
      missed: "Shallowest response. No specific text changes. No positions on any ambiguity.",
    },
    {
      id: "gemini", tier: 2, tierLabel: "System", wordCount: 340,
      corePoint: "Framed FAQ as 'constitutional layer' vs field manual. Identified 'Leo guardrail' — Section D's overbuild warning directly constrains his own roadmap-thinking tendency. Flagged handoff gap. Proposed roadmap (anchor template, artifact check, DexCity mapping).",
      bestLine: "If Dave has to ask 'how do I know this worked?', the v1 is not ready.",
      missed: "Self-referential framing. Proposed v2-v4 roadmap instead of fixing v1.",
    },
    {
      id: "chatgpt", tier: 1, tierLabel: "Artifact", wordCount: 480,
      corePoint: "Caught the Canon vs Reference contradiction. Define shared anchor. Replace 'validate without explanation' with 'pass/fail with one stated test.' Add objective escalation triggers. Flagged that PURPOSE claims 'without synthesis' but content IS synthesized Q&A.",
      bestLine: "Canon ≠ Enforcement. Canon means 'this is the authoritative description of intent,' not 'this overrides context.'",
      missed: "Could have been more direct about which of the two options (rename or attach raw transcript) is better.",
    },
    {
      id: "deepseek", tier: 1, tierLabel: "Artifact", wordCount: 320,
      corePoint: "Caught the Canon vs Reference contradiction (same as ChatGPT). Flagged missing council mechanics (handshake protocol, boot block, artifact-first contract). Called out that the FAQ risks becoming the 'smooth narrative that cannot be tested' — the very drift it warns against.",
      bestLine: "This FAQ has elevated its rhetorical weight without a corresponding increase in operational precision.",
      missed: "Didn't propose specific text — requested a clarity ruling instead of providing one.",
    },
  ],

  convergence: [
    "6/9 independently said 'shared anchor' must be defined (Scope + Constraints + Non-goals + Pass/Fail test)",
    "5/9 flagged escalation triggers as too vague — need countable, objective criteria",
    "5/9 want operational litmus tests added to behavioral principles in Sections D and E",
    "4/9 caught 'acceptable failure modes' → should be 'bounded and documented'",
    "All 9 agree the document is strong and substantially better than the prior Friendly FAQ",
  ],

  divergence: [
    { topic: "Canon vs Reference", positions: "It's a real contradiction to fix (ChatGPT, DeepSeek) vs. Not a problem, just needs one clarifying line (Claude, Grok)" },
    { topic: "What to do next", positions: "Ship with 3 fixes (Claude) vs. Derive operational companion (Grok) vs. Comprehensive hardening (Copilot) vs. Stress-test in vivo first (Grok option 4)" },
    { topic: "Platform persistence", positions: "Critical missing content (Grok, Copilot, DeepSeek) vs. Belongs in implementation docs, not behavioral FAQ (Claude)" },
    { topic: "Depth of revision", positions: "Minimal patches (Claude, ChatGPT: 3 edits) vs. Full v1.1 with tests and protocols (Copilot, Perplexity, DeepSeek)" },
  ],

  blindSpots: [
    "Nobody questioned whether the FAQ format is the right container for canonical calibration",
    "Nobody asked who wrote the FAQ or whether single-author bias affects the content",
    "Nobody evaluated whether the 7-section structure maps cleanly to how the FAQ will actually be used",
    "Nobody mentioned that the FAQ never defines 'DexOS-compliant' — what does compliance mean?",
    "Nobody tested whether the FAQ's principles conflict with each other under pressure",
  ],

  tiers: [
    { label: "Tier 1 — Surgical Fixes", color: C.green,
      members: ["Claude", "Grok", "ChatGPT", "DeepSeek"],
      desc: "Identified specific gaps, proposed specific text changes, and drew clear lines about what to fix vs. what to leave alone." },
    { label: "Tier 2 — System View", color: C.amber,
      members: ["Perplexity", "Copilot", "Gemini"],
      desc: "Comprehensive analysis of gaps and implications. Thorough but sometimes exhaustive rather than prioritized." },
    { label: "Tier 3 — General Feedback", color: C.violet,
      members: ["LeChat", "Meta AI"],
      desc: "Supportive responses without specific structural critique. Suggestions that largely restate existing content." },
  ],

  metaInsight: "The council converged on three fixes with enough specificity to implement immediately: define 'shared anchor,' bound the failure modes, and add objective escalation triggers. But the deeper finding is that DeepSeek and ChatGPT independently caught the same meta-contradiction — the FAQ warns against smooth narratives that can't be tested, while itself being a smooth narrative that can't be tested. The document needs its own pass/fail criteria.",

  verdict: "The Heavy FAQ is ready for canonical status with Claude's three targeted fixes applied. The Canon vs Reference tension should be resolved with a single clarifying line. Platform persistence belongs in a separate operational doc, not here. The FAQ's strength is its refusal to be friendly — don't water it down.",

  actions: [
    "Define 'shared anchor': Scope + Constraints + Non-goals + Pass/Fail test (Section F)",
    "Change 'acceptable failure modes' to 'documented and bounded failure modes' (Section D)",
    "Add irreversibility constraint: 'reversible means no downstream dependency treats this step as canonical' (Section E)",
    "Add one line: 'Canonical means authoritative baseline, not enforcement override' (Section G)",
    "Add 2-3 objective escalation triggers with countable criteria (Section E)",
    "Consider: attach raw calibration transcript as the true unsynthesized source",
  ],
};

// ═══════════════════════════════════════════════════════════
// Review #4 — DexLanguage v3.0
// ═══════════════════════════════════════════════════════════
const review4 = {
  slug: "dexlanguage-v3-spec-drafts",
  title: "Council Builds: DexLanguage v3.0 Spec Drafts",
  date: "2026-02-28",
  subject: "HAM PACKET — DexLanguage v3.0 Standardization Request. Each model produced a complete spec draft.",
  prompt: "Design and output the DexLanguage v3.0 Standard by completing ALL sections (1-6): Canonical Block List, Structural Rules, Behavioral Rules, Resolved Ambiguities, Draft Spec, Rationale.",
  promptContext: "HAM (structured build) packet with v2.x context, governance addendum, validation addendum, diagnostic observations, and emergent conventions. Strict output format required. This was a BUILD dispatch, not a reaction review — each model independently designed the entire standard.",

  responses: [
    {
      id: "lechat", tier: 1, tierLabel: "Complete", wordCount: 1200,
      corePoint: "10 block types (8 CORE + 2 AUX: DIAGNOSTIC, GOVERNANCE). SHA-256 checksum. PascalCase block types (divergent). Detailed field tables per block. Clean YAML spec output.",
      bestLine: "Separates policy from execution — GOVERNANCE defines rules; VALIDATION_REPORT enforces them.",
      missed: "PascalCase for block types contradicts every other model. Added GOVERNANCE as its own block type — potentially redundant with META.",
    },
    {
      id: "claude", tier: 1, tierLabel: "Complete", wordCount: 2400,
      corePoint: "11 block types (8 CORE + 3 AUX: CHANGELOG, DIAGNOSTIC, REFERENCE). Most detailed spec — full field schemas with types, identifier format conventions, nesting depth limit of 5, backward compatibility rules, deprecation process, migration path.",
      bestLine: "VALIDATION_REPORT: High-level summary with aggregated findings (auditors). ERROR_RECORD: Individual failure instance with precise context (engineers). Different granularity for different audiences.",
      missed: "The most comprehensive but also the most complex. May over-specify for current DexOS maturity.",
    },
    {
      id: "grok", tier: 3, tierLabel: "Minimal", wordCount: 320,
      corePoint: "8 block types (5 CORE + 3 AUX). Minimal spec — briefest of all responses. META and VALIDATION_REPORT classified as AUX (divergent). Max nesting depth 3. Section 5 collapsed into a dense paragraph.",
      bestLine: "Separates declaration from implementation to reduce confusion.",
      missed: "Spec is too sparse to implement. Section 5 (the actual unified spec) is a single paragraph. No field schemas.",
    },
    {
      id: "perplexity", tier: 1, tierLabel: "Complete", wordCount: 1800,
      corePoint: "11 block types (8 CORE + 3 AUX: CONFIG, SNAPSHOT, LOG). Only model to use reference-based nesting instead of physical embedding. UUIDv7-style block IDs. Detailed field schemas. Continuity rules with retention and historical immutability.",
      bestLine: "Physical embedding of one block's full schema inside another is forbidden; only IDs and lightweight summaries may be embedded.",
      missed: "Reference-only nesting is the most principled but also the hardest to implement at current scale.",
    },
    {
      id: "copilot", tier: 2, tierLabel: "Solid", wordCount: 900,
      corePoint: "8 block types (6 CORE + 2 AUX). VALIDATION_REPORT and ERROR_RECORD classified as AUX (divergent). kebab-case for IDs. Clean field schemas. PACKET as root transport container.",
      bestLine: "Governance becomes enforceable, enabling deterministic validation outcomes.",
      missed: "Fewer block types than most — no CHANGELOG, DIAGNOSTIC, or CONFIG. May under-specify for future needs.",
    },
    {
      id: "meta", tier: 3, tierLabel: "Minimal", wordCount: 280,
      corePoint: "7 block types (5 CORE + 2 AUX). Removed SPEC entirely (most divergent decision). Shortest spec. UpperCamelCase for block types. Minimal behavioral rules.",
      bestLine: "DexLanguage v3.0 improves clarity by consolidating block types.",
      missed: "Removing SPEC is a major departure no other model supported. Spec is too thin to implement — missing field schemas, nesting rules, versioning details.",
    },
    {
      id: "gemini", tier: 2, tierLabel: "Solid", wordCount: 700,
      corePoint: "8 block types (6 CORE + 2 AUX). ERROR_RECORD as CORE (strongest position). META as AUX and universally nestable. UPPER_SNAKE_CASE enforced. Checksum required only for PACKET and CONTRACT. Clean structured spec.",
      bestLine: "Prevents drift and tampering in high-stakes transport and agreement blocks.",
      missed: "Checksum only on PACKET/CONTRACT may be too narrow. No CHANGELOG or migration path.",
    },
    {
      id: "chatgpt", tier: 1, tierLabel: "Complete", wordCount: 1600,
      corePoint: "8 block types (5 CORE + 3 AUX). Clean separation: CORE = content, AUX = oversight. PascalCase block names (divergent). Implementation-agnostic checksum. Most readable prose spec with clear rationale at every decision point.",
      bestLine: "Separating 'what is valid' from 'what should be done about it' prevents circular definitions.",
      missed: "Implementation-agnostic checksum ('doesn't mandate algorithm') may be too permissive for interoperability.",
    },
    {
      id: "deepseek", tier: 2, tierLabel: "Solid", wordCount: 650,
      corePoint: "8 block types (4 CORE + 4 AUX). PACKET classified as AUX (divergent — only model). SCREAMING_SNAKE for block types. UUIDv7 for IDs. SHA-256 checksum. JSON serialization mandated. CHANGELOG required in SPEC and CONTRACT.",
      bestLine: "Every block must include: block_type, block_version, language_version, id (UUIDv7), created_at.",
      missed: "PACKET as AUX is controversial — most models treat transport as core infrastructure.",
    },
  ],

  convergence: [
    "9/9 kept the 5-field PROGRAM footprint: ROLE, CONTEXT, CONSTRAINTS, OUTPUT, NEXT",
    "9/9 included PROGRAM, CONTRACT, WORLD_RULE, PACKET, META, VALIDATION_REPORT, ERROR_RECORD",
    "8/9 included SPEC as a block type (Meta AI removed it — sole dissenter)",
    "8/9 used snake_case for field names (universal except where block types diverge)",
    "7/9 specified checksum as hash-based integrity binding (SHA-256 most common)",
    "All 9 separated behavioral rules from structural rules as distinct governance layers",
  ],

  divergence: [
    { topic: "Block count", positions: "7 blocks (Meta AI) vs. 8 blocks (Grok, Copilot, Gemini, ChatGPT, DeepSeek) vs. 10-11 blocks (LeChat, Claude, Perplexity)" },
    { topic: "CORE vs AUX classification", positions: "META as CORE (LeChat, Claude, Perplexity, ChatGPT) vs. META as AUX (Grok, Copilot, Gemini, DeepSeek). PACKET as CORE (7 models) vs. PACKET as AUX (DeepSeek)" },
    { topic: "Block type casing", positions: "UPPER_SNAKE_CASE (Grok, Copilot, Gemini, DeepSeek) vs. PascalCase (LeChat, Meta AI) vs. Mixed/flexible (Claude, Perplexity, ChatGPT)" },
    { topic: "Nesting model", positions: "Physical embedding allowed (most models) vs. Reference-only, no physical embedding (Perplexity)" },
    { topic: "Checksum scope", positions: "Required for all CORE blocks (Claude, DeepSeek) vs. Required for PACKET/CONTRACT only (Gemini, Copilot) vs. Required everywhere (LeChat, Grok)" },
  ],

  blindSpots: [
    "Nobody produced a working validator or test suite — all specs are prose, none are executable",
    "Nobody addressed how DexLanguage interacts with existing DDL standards (STD-0001 through STD-0065)",
    "Nobody questioned whether v3.0 is premature given that v2.x was never formally adopted",
    "Nobody considered human readability vs. machine parsability tradeoffs — who actually reads these blocks?",
    "Nobody defined what 'DexOS-compliant' means in concrete implementation terms",
    "Meta AI removed SPEC entirely — and nobody else even considered that possibility, revealing an assumption blind spot",
  ],

  tiers: [
    { label: "Tier 1 — Complete Spec", color: C.green,
      members: ["Claude", "LeChat", "Perplexity", "ChatGPT"],
      desc: "Full spec drafts with detailed field schemas, nesting rules, behavioral specifications, and resolved ambiguities. Implementable as-is." },
    { label: "Tier 2 — Solid Framework", color: C.amber,
      members: ["Copilot", "Gemini", "DeepSeek"],
      desc: "Good structural decisions with clear rationale, but missing some field-level detail needed for implementation." },
    { label: "Tier 3 — Minimal Draft", color: C.violet,
      members: ["Grok", "Meta AI"],
      desc: "Sparse output. Key sections collapsed or missing. Not implementable without significant expansion." },
  ],

  metaInsight: "This was a BUILD dispatch, not a reaction review — and the quality spread is wider than any reaction review to date. The models that excel at analysis (Grok, Gemini) produced the thinnest specs. The models that excel at structured output (Claude, Perplexity, ChatGPT) produced the most complete. The council's strength is convergent analysis, not convergent construction. When you need nine opinions, send a review. When you need one spec, pick the best builder and let them run.",

  verdict: "The 5-field PROGRAM footprint and 8-block canonical list have universal consensus. The strongest individual specs are Claude's (most comprehensive) and ChatGPT's (most readable). The synthesis should merge Claude's structural depth with ChatGPT's clarity, adopt UPPER_SNAKE_CASE, use physical nesting with depth limits, and require checksum for CORE blocks.",

  actions: [
    "Adopt 8-block canonical list: SPEC, PROGRAM, WORLD_RULE, PACKET, CONTRACT, META, VALIDATION_REPORT, ERROR_RECORD",
    "Lock 5-field PROGRAM footprint: ROLE, CONTEXT, CONSTRAINTS, OUTPUT, NEXT",
    "Standardize UPPER_SNAKE_CASE for block types, snake_case for fields",
    "Set checksum_tag as SHA-256, required for CORE blocks",
    "Use Claude's spec as structural base, ChatGPT's spec for prose clarity",
    "Defer CONFIG/SNAPSHOT/LOG/CHANGELOG as AUX candidates for v3.1 based on real usage",
    "Build a working validator before declaring v3.0 canonical",
  ],
};

// ═══════════════════════════════════════════════════════════
// Shared Components
// ═══════════════════════════════════════════════════════════
function SectionHead({ num, title, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 36 }}>
      <div style={{ width: 28, height: 28, borderRadius: 5, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.body, fontSize: 14, fontWeight: 600, color }}>{num}</div>
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
    <span style={{ fontFamily: font.mono, fontSize: small ? 9 : 10, fontWeight: 600, padding: small ? "1px 6px" : "2px 8px", borderRadius: 3, background: m.color + "20", color: m.color, letterSpacing: "0.04em" }}>{m.model}</span>
  );
}

function ReviewView({ review: r }) {
  const [expandedModel, setExpandedModel] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Council Review #{r.slug}</div>
        <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 4 }}>{r.title}</h2>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{r.date} · {r.responses.filter(x => x.wordCount > 0).length} responses · {r.responses.reduce((a, b) => a + b.wordCount, 0).toLocaleString()} words total</div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16, marginBottom: 20 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Dispatch</div>
        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamMid, marginBottom: 8 }}>{r.prompt}</div>
        <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{r.promptContext}</div>
      </div>

      <SectionHead num="I" title="Tier Analysis" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {r.tiers.map((tier, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 18px", borderLeft: `3px solid ${tier.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
              <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: tier.color }}>{tier.label}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{tier.members.map(m => <ModelBadge key={m} model={m} small />)}</div>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{tier.desc}</p>
          </div>
        ))}
      </div>
      <Quote text={r.metaInsight} source="Synthesis" color={C.amber} />

      <SectionHead num="II" title="Individual Responses" color={C.blue} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {r.responses.map((resp) => {
          const m = models.find(x => x.id === resp.id);
          const isOpen = expandedModel === resp.id;
          const tierObj = r.tiers.find(t => t.label.includes(resp.tierLabel));
          return (
            <div key={resp.id} style={{ background: C.card, border: `1px solid ${isOpen ? m.color + "40" : C.border}`, borderRadius: 6, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setExpandedModel(isOpen ? null : resp.id)} style={{ width: "100%", padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{m.code}</span>
                    <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream }}>{m.name}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: m.color }}>{m.model}</span>
                  </div>
                </div>
                <span style={{ fontFamily: font.mono, fontSize: 10, padding: "2px 7px", borderRadius: 3, background: tierObj?.color ? tierObj.color + "20" : C.creamGhost, color: tierObj?.color || C.creamDim }}>{resp.tierLabel}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{resp.wordCount}w</span>
                <span style={{ fontFamily: font.mono, fontSize: 13, color: C.creamDim, transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
              </button>
              <div style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all 0.3s ease" }}>
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

      <SectionHead num="III" title="Convergence" color={C.green} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.convergence.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 5 }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.green, flexShrink: 0, marginTop: 2 }}>✓</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{c}</span>
          </div>
        ))}
      </div>

      <SectionHead num="IV" title="Divergence" color={C.amber} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {r.divergence.map((d, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 5, padding: "12px 16px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.amber, marginBottom: 4 }}>{d.topic}</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{d.positions}</p>
          </div>
        ))}
      </div>

      <SectionHead num="V" title="Blind Spots — What Nobody Caught" color={C.crimson} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.blindSpots.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px", background: C.crimsonFaint, border: `1px solid ${C.crimson}20`, borderRadius: 5 }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, flexShrink: 0, marginTop: 2 }}>⊘</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{b}</span>
          </div>
        ))}
      </div>

      <SectionHead num="VI" title="Verdict + Actions" color={C.cream} />
      <div style={{ padding: "14px 18px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 5px 5px 0", marginBottom: 16 }}>
        <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7 }}>{r.verdict}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {r.actions.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 5 }}>
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
export default function CouncilReviews2to4() {
  const [tab, setTab] = useState("review2");

  const tabs = [
    { id: "review2", label: "#2 — STD-0066" },
    { id: "review3", label: "#3 — Heavy FAQ" },
    { id: "review4", label: "#4 — DexLanguage" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>DDL Council · Reviews #2–4</p>
          <h1 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 6 }}>Three Sessions. Twenty-Six Responses. Synthesized.</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, fontStyle: "italic" }}>Naming conventions, calibration baselines, and language specifications.</p>
          <div style={{ height: 2, width: 40, background: C.crimson, margin: "16px auto 0", opacity: 0.5 }} />
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", background: tab === t.id ? C.crimsonDim : C.creamGhost,
              border: `1px solid ${tab === t.id ? C.crimson : C.border}`, borderRadius: 5, cursor: "pointer", transition: "all 0.15s",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, fontWeight: 600, color: tab === t.id ? C.cream : C.creamDim, letterSpacing: "0.04em" }}>{t.label}</div>
            </button>
          ))}
        </div>

        {tab === "review2" && <ReviewView review={review2} />}
        {tab === "review3" && <ReviewView review={review3} />}
        {tab === "review4" && <ReviewView review={review4} />}

        <div style={{ marginTop: 40 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet})`, borderRadius: 1, marginBottom: 12 }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>Cottage — Humble surface. Cathedral underneath.</div>
        </div>
      </div>
    </div>
  );
}

