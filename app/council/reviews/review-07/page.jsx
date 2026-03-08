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
  pi:         { id: "pi",         code: null, name: "Pi",         persona: "(retired)",        color: C.creamDim },
};

// ═══════════════════════════════════════════════════════════
// Review #7 Data
// ═══════════════════════════════════════════════════════════
const review = {
  slug: "dimensional-workbench-proposal",
  number: 7,
  title: "Council Reviews: DDL Dimensional Workbench Proposal",
  date: "2026-02-17",
  subject: "Proposal to generalize the Assurance Map architecture into a reusable dimensional workbench for any Excel-based analytics use case",
  prompt: "I'm working on a dimensional modeling 'workbench' concept and I'd like your critique. [Full proposal attached with architecture, layers, config model, tech assumptions, and 5 specific questions]",
  promptContext: "Each model received the full proposal — Admin/Config/Input/Engine/Output layer architecture, Config-Model mapping concept, Config-Views matrix definition, macro strategy, and target user profile. The prompt explicitly asked for blunt, opinionated, practical feedback across 5 dimensions: architectural traps, overbuilt features, adoption gaps, config simplification, and macro/scope opinions. Two prompt versions dispatched (full and lite).",

  responses: [
    {
      id: "pi",
      tier: 3,
      tierLabel: "Surface Bullets",
      corePoint: "Five one-line bullets covering complexity risk, defer macros, add user guides, use dropdowns for config, and formula-first. No engagement with the actual architecture or any specific proposal element.",
      bestLine: "Prioritize formulas for flexibility, but macros can enhance usability.",
      missed: "Everything. No engagement with Fact_Universal, Config-Model, layer architecture, grain problems, or any of the five specific questions asked. Could apply to any software proposal.",
      wordCount: 80,
    },
    {
      id: "lechat",
      tier: 2,
      tierLabel: "Exhaustive Design Review",
      corePoint: "Massive table-driven critique covering 10 architectural traps, 8 overbuilt features to cut, 10 missing adoption elements, config simplification to 3 required fields, and a one-sentence v1.0 summary. Proposed Dim_Universal (single table with DimType column) instead of auto-generated separate dims. Strong opinion: formula-only for v1.0, one profile (Assurance Map), defer everything else.",
      bestLine: "The DDL Dimensional Workbench v1.0 should be a single-profile, formula-driven, Excel-native tool that lets power users map 3 fields, auto-generate a Fact_Universal table, and explore pre-built matrices/dashboards.",
      missed: "The table-heavy format obscures prioritization — 10 traps all presented equally. Didn't challenge the fundamental premise of whether generalization is premature.",
      wordCount: 3200,
    },
    {
      id: "claude",
      tier: 1,
      tierLabel: "Challenged the Premise",
      corePoint: "Deepest architectural critique in the session. Identified four major traps: Config Complexity Death Spiral (users will abandon for pivot tables), Generic Fact Table Illusion (different data types have different grains), Matrix Explosion Problem (recreating pivot tables with more complexity), and Dashboard Overload. Core thesis: 'You're generalizing from N=1. Build N=3, then extract the pattern.' Recommended pausing the universal workbench entirely and building 2-3 profile-specific workbenches first.",
      bestLine: "Right now, you're generalizing from N=1. Build N=3, then extract the pattern. This is the DDL way: 'Preserve it' comes after 'Build it.'",
      missed: "The 'pause and build more examples' recommendation, while strategically sound, doesn't account for the fact that building three separate workbenches is itself a significant time investment. No acknowledgment of the sunk-cost efficiency of starting generic.",
      wordCount: 4200,
    },
    {
      id: "grok",
      tier: 2,
      tierLabel: "Efficient Design Review",
      corePoint: "Compact five-section response. Flagged config dependency hell (misconfigured fields cascade), spill fragility at scale, and the generic-vs-specific balance. Cut recommendations: defer Config-Views, dashboard, macros, and auto-dim generation. Missing: onboarding templates, error handling, performance guidance. Strong opinion: formula-pure for v1 to prove viability, profiles as user-saved configs in a 'Profile Library' sheet.",
      bestLine: "Don't bake profiles in; let users create/share them via a 'Profile Library' sheet — keeps core clean while enabling customization without forking the workbench.",
      missed: "The 'Profile Library' concept is interesting but not specified — how would users save, load, and share configs? The idea needs more architectural detail.",
      wordCount: 700,
    },
    {
      id: "perplexity",
      tier: 2,
      tierLabel: "Source-Backed Design Review",
      corePoint: "Identified grain mixing as a classic star-schema failure — 'Universal fact quietly becomes junk drawer fact.' Flagged semantic drift risk across optional dimensions. Proposed constrained v1.0: one primary entity, one date, up to three categoricals, one-two measures. Strong macro opinion: include a tiny, well-scoped macro builder for setup orchestration, but keep all logic in formulas. Defined the cleanest product positioning: 'a shockingly fast way for Excel power users to turn one decent flat table into a usable dimensional model without learning Power BI.'",
      bestLine: "A shockingly fast way for Excel power users to turn one decent flat table into a usable dimensional model + matrices without learning Power BI.",
      missed: "The suggested constraints are good but could still be too broad for v1.0. Didn't address what happens when users outgrow the workbench — no graduation path.",
      wordCount: 1200,
    },
    {
      id: "copilot",
      tier: 2,
      tierLabel: "Specification-Grade Review",
      corePoint: "Most operationally specific response. Proposed exact fixes for each trap: grain statement with primary key builder, canonical Dim_Time with fiscal attributes, cap at one primary + one secondary entity for v1.0, predefined dimension roles, Dim_Overrides table for hygiene, and one-active-measure policy. Three specific macros to ship: Build Fact, Rebuild Dims, Generate Custom Matrix. Offered to draft the actual formula scaffolds.",
      bestLine: "Insert a 'Sanitize' step (NAMECLEAN, TRIM, UPPER, controlled mapping) before dim generation; expose a Dim_Overrides table.",
      missed: "Specification-grade detail without stepping back to question whether the specification should exist yet. Accepted the premise fully — no strategic challenge.",
      wordCount: 1800,
    },
    {
      id: "meta",
      tier: 3,
      tierLabel: "Surface Bullets",
      corePoint: "Generic feedback about over-abstraction, tight coupling, missing documentation, and modular design. Recommendations are directional ('start with formula-only,' 'consider Power Query') without specific implementation guidance.",
      bestLine: "Focus on core functionality: Develop a solid, generic Workbench foundation before creating use-case-specific profiles.",
      missed: "No engagement with the actual config model, fact table structure, spill architecture, or any specific question asked in the prompt. Advice is sound but generic.",
      wordCount: 350,
    },
    {
      id: "gemini",
      tier: 2,
      tierLabel: "Framework-Level Review",
      corePoint: "Introduced the 'Three Pillars' simplification for config: Who/What/Where (Entity), When (Time), How Much (Measure). Proposed renaming Fact_Universal to Fact_Source_DDL to hide architectural complexity. Key opinion: 'Macros build the house; formulas live in it' — use macros for setup scaffolding only, keep all business logic in formulas. Defined the Workbench/Profile line clearly: workbench provides raw numbers (SUM/COUNT), profiles provide meaning (KPIs/Metrics).",
      bestLine: "Macros build the house; formulas live in it.",
      missed: "The Three Pillars simplification is elegant but doesn't address what happens when data doesn't fit the three-pillar model cleanly (multi-entity, multi-date, hierarchical). Didn't engage with the Excel platform limitations.",
      wordCount: 1000,
    },
    {
      id: "chatgpt",
      tier: 1,
      tierLabel: "Challenged the Premise",
      corePoint: "Five detailed architectural traps: hidden coupling between fact and dims, config mapping confusion (users think in columns not dimensions), spill brittleness when users sort/insert, one fact table won't fit all semantic models, and the 'generic matrix engine might overfit to your thinking style.' Strong overbuilt cuts: skip dashboard, skip macros, skip multi-entity. Clearest v1.0 scope definition: one mapping page, one fact builder, auto dims, one matrix engine. 'If you overbuild early, the system collapses under its own ambition.'",
      bestLine: "The generic matrix engine might overfit to your thinking style. You design in Process × Quarter × LOD matrices. A marketing lead wants Customer × Product × Month.",
      missed: "Identified the 'overfits to your thinking' problem but didn't propose how to validate whether other users would actually want this. No user research recommendation.",
      wordCount: 2000,
    },
    {
      id: "deepseek",
      tier: 1,
      tierLabel: "Challenged the Premise",
      corePoint: "Strongest strategic challenge. Proposed renaming to 'DDL Dimensional Starter' and targeting 'me, six months ago' as the real user. Core thesis: 'The brilliance of your Assurance Map isn't the generic capability — it's the specific, opinionated implementation. Don't abstract away that magic too soon.' Recommended shipping the Assurance Map as v1.0, adding a 'Customize This' section, gathering 2-3 real use cases, THEN building the workbench. Aligned with Claude's 'generalize from N=3' advice from a completely different angle.",
      bestLine: "The brilliance of your Assurance Map isn't the generic capability — it's the specific, opinionated implementation that works perfectly for one problem. Don't abstract away that magic too soon.",
      missed: "The 'me, six months ago' user definition is sharp but narrow. Didn't consider whether a wider audience exists or how to discover it. Also proposed a 3-question config that may be too simple for the Assurance Map's actual complexity.",
      wordCount: 1600,
    },
  ],

  synthesis: {
    convergence: [
      { point: "Config complexity is the #1 adoption killer", count: "9/10", detail: "Every substantive response identified Config-Model as the primary risk. Users will either get confused by dimensional mapping terminology, misconfigure fields with cascading errors, or abandon the tool for pivot tables." },
      { point: "v1.0 is overbuilt — cut dashboard, Config-Views, macros", count: "8/10", detail: "LeChat, Claude, Grok, Perplexity, Copilot, ChatGPT, DeepSeek, and Gemini all recommended cutting the generic dashboard, deferring matrix customization, and removing or minimizing macros for v1.0." },
      { point: "Need examples, templates, and sample data for adoption", count: "7/10", detail: "Nobody will use a blank generic tool. Ship with pre-loaded sample datasets, worked examples, and profile-specific configurations. Users learn by seeing patterns, not reading schemas." },
      { point: "Formula-only for v1.0 core logic", count: "7/10", detail: "LeChat, Claude, Grok, ChatGPT, DeepSeek, Gemini, and Copilot (who allowed 3 macros for orchestration only) agreed: no VBA in business logic. Macros add fragility, security warnings, and corporate IT friction." },
      { point: "Fact_Universal has a grain problem", count: "6/10", detail: "Claude, ChatGPT, Perplexity, Copilot, Gemini, and DeepSeek flagged that different data types have different grains — forcing transactions, snapshots, and event data into one schema creates ambiguity." },
      { point: "Validation and error handling are non-negotiable", count: "7/10", detail: "Without real-time feedback ('Column not found,' 'Measure contains text,' 'Grain has duplicates'), users can't debug their own configuration. Multiple models called this the biggest missing piece." },
      { point: "Reduce required config fields to 3", count: "6/10", detail: "LeChat, Gemini, DeepSeek, ChatGPT, Copilot, and Perplexity independently proposed reducing mandatory config to Entity + Time + Measure. Everything else optional with defaults." },
    ],
    divergence: [
      {
        topic: "Should you build the workbench at all right now?",
        positions: [
          { camp: "Pause — generalize from N=3, not N=1", models: ["claude", "deepseek"], detail: "Build 2-3 more specific workbenches (Transaction, Activity, Coverage), see what's actually common, THEN extract the generic engine. You're abstracting too early." },
          { camp: "Ship slim v1.0 with constraints", models: ["lechat", "copilot", "perplexity", "grok", "chatgpt", "gemini"], detail: "The concept is viable but the scope is wrong. Cut aggressively, ship with one profile and three required fields, prove the value, then expand." },
        ],
      },
      {
        topic: "Macros: zero, or a small orchestration panel?",
        positions: [
          { camp: "Zero macros in v1.0", models: ["claude", "chatgpt", "deepseek", "grok"], detail: "Macros add fragility, corporate IT friction, and security warnings. Pure formula proves the concept. Add macros in v1.5 if users demand them." },
          { camp: "Small macro panel for setup only", models: ["copilot", "perplexity", "gemini"], detail: "Three macros (Build Fact, Rebuild Dims, Generate Matrix) remove the scariest manual steps. Keep all logic in formulas — macros only orchestrate." },
          { camp: "Defer decision", models: ["lechat"], detail: "Formula-only for v1.0, but document the macro roadmap for v1.1 with clear 'what macros would do' specs." },
        ],
      },
      {
        topic: "One workbook or multiple profile-specific workbooks?",
        positions: [
          { camp: "Multiple workbooks, one per profile", models: ["claude"], detail: "DDL_Workbench_Transactions.xlsx, DDL_Workbench_Coverage.xlsx — each simpler, clearer, 90% pre-configured." },
          { camp: "One workbook, profiles as config presets", models: ["perplexity", "grok", "copilot", "gemini", "lechat"], detail: "Keep engine generic, ship profiles as saved Config-Model presets. User picks closest match, tweaks fields." },
          { camp: "One specific workbook, no profiles yet", models: ["chatgpt", "deepseek"], detail: "Ship the Assurance Map as v1.0. Add 'Customize This' guidance. Don't build profile infrastructure until needed." },
        ],
      },
    ],
    blindSpots: [
      "No model asked whether 'power Excel users who want dimensional modeling' is a real market segment or just Dave. Nobody proposed user research or validation interviews.",
      "Nobody discussed competitive alternatives — what existing Excel templates, add-ins, or frameworks already solve this problem? The proposal was critiqued in isolation.",
      "No model addressed the upgrade path — if a user builds a model on v1.0 and v1.1 changes the schema, how do they migrate? Versioning was discussed for the workbook but not for user data.",
      "Nobody questioned whether the Assurance Map's success proves generalizability. It succeeded because it solves a real problem Dave faces daily — that's not evidence that a generic tool will work for others.",
      "No model proposed a minimum viable demo — the smallest possible thing that proves the concept. Everyone jumped to architecture instead of prototyping strategy.",
    ],
    tiers: {
      labels: ["Challenged the Premise", "Refined the Design", "Surface Response"],
      groups: [
        { tier: 1, label: "Challenged the Premise", models: ["claude", "chatgpt", "deepseek"], description: "Didn't just critique the design — questioned whether the project should exist in its current form. Claude said 'generalize from N=3.' DeepSeek said 'don't abstract away the magic.' ChatGPT said 'the engine might overfit to your thinking.' These three changed the strategic question." },
        { tier: 2, label: "Refined the Design", models: ["lechat", "copilot", "perplexity", "grok", "gemini"], description: "Accepted the premise and provided excellent structural feedback within it. LeChat was most exhaustive, Copilot most specification-grade, Perplexity best-positioned, Gemini cleanest on simplification, Grok most efficient." },
        { tier: 3, label: "Surface Response", models: ["pi", "meta"], description: "Generic product feedback without engaging the proposal's architecture, config model, or any specific question asked." },
      ],
    },
    metaInsight: "Claude and DeepSeek arrived at the same strategic insight from opposite directions — and neither could have seen what the other said. Claude approached from architectural first principles ('you're generalizing from N=1'). DeepSeek approached from product instinct ('don't abstract away the magic'). The convergence of these two independently derived conclusions, without coordination, is the strongest signal in the entire session. The workbench question isn't 'what should v1.0 contain?' — it's 'have you earned the right to generalize yet?'",
  },

  output: {
    verdict: "Don't build the universal workbench. Build two more specific engines (Timesheet, Risk Dashboard) using the same dimensional principles. After three working examples, the common patterns will reveal themselves — and the generic workbench will design itself from evidence, not theory.",
    actions: [
      "Pause the DDL Dimensional Workbench as a standalone project. Rename the concept to 'DDL Dimensional Starter' (DeepSeek's suggestion) to reset scope expectations.",
      "Ship the Assurance Map engine as 'DDL Assurance Engine v1.0' with a 'How This Was Built' appendix documenting the dimensional patterns used.",
      "Build DDL Timesheet Engine v1.0 as the second example — different grain (hours per employee per week), different measures, same star schema philosophy.",
      "After two working engines, extract the common patterns: what's shared (Dim_Time generation, config mapping, matrix engine) vs. what's specific (KPIs, domain dims, business logic).",
      "If config simplification is needed, use the Three Pillars approach (Entity + Time + Measure) with profile presets — not a blank config sheet.",
      "Document the 'Workbench Graduation Criteria': what evidence (3+ working engines, 2+ non-Dave users, validated config UX) would justify building the generic tool.",
    ],
    crossLinks: ["assurance-map-architecture", "profile-self-review", "dexlanguage-v3-spec-drafts"],
  },
};

// ═══════════════════════════════════════════════════════════
// Accent Ledger — Full cumulative through Review #7
// ═══════════════════════════════════════════════════════════
const accentLedger = [
  // ── Review #5 ──
  { model: "lechat",     review: "profile-self-review",          tag: "signature",  note: "Immediately structures feedback into tables — tables are the default output shape" },
  { model: "lechat",     review: "profile-self-review",          tag: "tic",        note: "Ends every response with a 'Checksum Tag' code block using standardized naming" },
  { model: "lechat",     review: "profile-self-review",          tag: "gravity",    note: "Tier 1 — line-by-line structural critique with concrete replacement text" },
  { model: "claude",     review: "profile-self-review",          tag: "signature",  note: "Opens with verdict/assessment before diving into specifics" },
  { model: "claude",     review: "profile-self-review",          tag: "quirk",      note: "Recursive meta-commentary — observes that the review demonstrates the behavior it describes" },
  { model: "claude",     review: "profile-self-review",          tag: "gravity",    note: "Tier 1 — provides A/B option pairs for every refinement" },
  { model: "grok",       review: "profile-self-review",          tag: "signature",  note: "Leads with tight overall assessment, then efficient bullet critique" },
  { model: "grok",       review: "profile-self-review",          tag: "tic",        note: "Closes with action-oriented military language: 'Target acquired'" },
  { model: "grok",       review: "profile-self-review",          tag: "gravity",    note: "Tier 2 — validates accuracy, flags minor trims, stays efficient" },
  { model: "perplexity", review: "profile-self-review",          tag: "signature",  note: "Anchors with high-level assessment ('very strong v1') before detail" },
  { model: "perplexity", review: "profile-self-review",          tag: "quirk",      note: "Identified its own role collision — most honest self-critique in the session" },
  { model: "perplexity", review: "profile-self-review",          tag: "gravity",    note: "Tier 1 — surgical edits numbered and labeled" },
  { model: "copilot",    review: "profile-self-review",          tag: "signature",  note: "Uses formal section headers with unicode box-drawing separators" },
  { model: "copilot",    review: "profile-self-review",          tag: "tic",        note: "Includes unsolicited 'Safety & Boundary Check' section — reflexive compliance" },
  { model: "copilot",    review: "profile-self-review",          tag: "gravity",    note: "Tier 2 — validates thoroughly, offers to produce follow-up deliverables" },
  { model: "meta",       review: "profile-self-review",          tag: "signature",  note: "Opens with casual praise — 'looks solid!' — before generic suggestions" },
  { model: "meta",       review: "profile-self-review",          tag: "blindspot",  note: "No structural engagement — generic suggestions without specific content references" },
  { model: "meta",       review: "profile-self-review",          tag: "gravity",    note: "Tier 3 — surface-level acknowledgment, shortest response (≈100 words)" },
  { model: "gemini",     review: "profile-self-review",          tag: "quirk",      note: "Activated the persona rather than critiquing it — declared 'I am ready to operate as Leo Prescott'" },
  { model: "gemini",     review: "profile-self-review",          tag: "quirk",      note: "Added self-imposed behavioral invariants unprompted ('The Whiteboard Constraint')" },
  { model: "gemini",     review: "profile-self-review",          tag: "gravity",    note: "Tier 3 — treated review as activation ceremony, not critique" },
  { model: "chatgpt",    review: "profile-self-review",          tag: "signature",  note: "Opens with what's solid, then immediately proposes numbered copy-ready patches" },
  { model: "chatgpt",    review: "profile-self-review",          tag: "tic",        note: "Uses emoji section headers (🔷 ⭐) for visual scanning" },
  { model: "chatgpt",    review: "profile-self-review",          tag: "gravity",    note: "Tier 1 — patch-oriented with risk rationale for each fix" },
  { model: "deepseek",   review: "profile-self-review",          tag: "signature",  note: "Leads with strengths block, then structures risks as numbered items with inline suggestions" },
  { model: "deepseek",   review: "profile-self-review",          tag: "tic",        note: "Uses formal governance language: 'Conditionally approved'" },
  { model: "deepseek",   review: "profile-self-review",          tag: "quirk",      note: "Flagged platform quirks as a category — concept nobody else surfaced" },
  { model: "deepseek",   review: "profile-self-review",          tag: "gravity",    note: "Tier 1 — conditional approval with three required adjustments" },

  // ── Review #6 ──
  { model: "lechat",     review: "assurance-map-architecture",   tag: "signature",  note: "Tables are still the default output — every section is a table with columns for Gap/Impact/Recommendation" },
  { model: "lechat",     review: "assurance-map-architecture",   tag: "tic",        note: "Checksum tag again: ASSURANCE_MAP_ARCHITECTURE_CRITIQUE_LECHAT_20260210_DIMENSIONAL_OPPORTUNITIES" },
  { model: "lechat",     review: "assurance-map-architecture",   tag: "quirk",      note: "Proposed DexOS/DexLanguage integration as a creative expansion — leaning into Dave's ecosystem" },
  { model: "claude",     review: "assurance-map-architecture",   tag: "signature",  note: "Opens with verdict, then structures gaps as numbered items with full table definitions" },
  { model: "claude",     review: "assurance-map-architecture",   tag: "tic",        note: "Provides Option A / Option B choices for every recommendation — never a single path" },
  { model: "claude",     review: "assurance-map-architecture",   tag: "quirk",      note: "Closes with a zinger: '$500K+ Big 4 deliverable. You're building it in Excel. That's the DDL difference.'" },
  { model: "claude",     review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 1 — most exhaustive response (≈4500 words), 7 gaps + 6 risks + 9 expansions" },
  { model: "grok",       review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 2 — efficient framework response, correct but not deep" },
  { model: "grok",       review: "assurance-map-architecture",   tag: "signature",  note: "Numbered lists without headers — compact, scannable, no decoration" },
  { model: "perplexity", review: "assurance-map-architecture",   tag: "signature",  note: "Cites external sources — KPMG PDFs, Oracle docs, Microsoft guidance — anchoring claims in authority" },
  { model: "perplexity", review: "assurance-map-architecture",   tag: "quirk",      note: "Identified normalization risk where Domain lives in both Dim_Process and separate dim — most precise structural catch" },
  { model: "perplexity", review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 1 — source-backed, industry-contextualized, structurally specific" },
  { model: "copilot",    review: "assurance-map-architecture",   tag: "signature",  note: "Answered both prompt versions separately — doubled the output but created redundancy" },
  { model: "copilot",    review: "assurance-map-architecture",   tag: "quirk",      note: "Strongest on semantic precision — 'split CoverageDensity vs CoverageEffectiveness' was the cleanest single insight" },
  { model: "copilot",    review: "assurance-map-architecture",   tag: "tic",        note: "Offers to generate follow-up artifacts: 'I can generate a compact v1.1 spec diff'" },
  { model: "copilot",    review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 1 — most semantically precise response" },
  { model: "meta",       review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 3 again — generic recommendations without schema-specific engagement" },
  { model: "meta",       review: "assurance-map-architecture",   tag: "blindspot",  note: "Listed 'Risk, Control, Location' as missing dims but didn't define what they'd contain" },
  { model: "gemini",     review: "assurance-map-architecture",   tag: "signature",  note: "Led with a thesis statement ('the gap is granularity') before structured critique" },
  { model: "gemini",     review: "assurance-map-architecture",   tag: "quirk",      note: "Connected CoverageRating to DDL's F-Code failure taxonomy — internalizing the system" },
  { model: "gemini",     review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 2 — correct thesis, well-structured, but no formula-level detail" },
  { model: "chatgpt",    review: "assurance-map-architecture",   tag: "signature",  note: "Opens casual ('Love this') then goes grain-first — most disciplined architectural thinker" },
  { model: "chatgpt",    review: "assurance-map-architecture",   tag: "quirk",      note: "Named the overlap ambiguity problem explicitly: 'is that overlap or designed layering?'" },
  { model: "chatgpt",    review: "assurance-map-architecture",   tag: "tic",        note: "Emoji section headers again (🔥 ⭐) — consistent visual language across sessions" },
  { model: "chatgpt",    review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 1 — grain-first, semantic-aware, practical" },
  { model: "deepseek",   review: "assurance-map-architecture",   tag: "signature",  note: "YAML code blocks for structured recommendations — treats text as data" },
  { model: "deepseek",   review: "assurance-map-architecture",   tag: "tic",        note: "Gave a numeric rating (8.5/10) — only model to score the architecture" },
  { model: "deepseek",   review: "assurance-map-architecture",   tag: "quirk",      note: "Broadest creative expansion — API layers, cloud integration, mobile access, OCR evidence collection" },
  { model: "deepseek",   review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 2 — structured and broad but less precise than Tier 1 models on specifics" },
  { model: "pi",         review: "assurance-map-architecture",   tag: "gravity",    note: "Tier 3 — surface-level checklist, no dimensional engagement" },

  // ── Review #7 (NEW) ──
  { model: "lechat",     review: "dimensional-workbench-proposal", tag: "signature",  note: "Tables remain the default — 10 traps, 8 overbuilt features, 10 missing elements all in table format" },
  { model: "lechat",     review: "dimensional-workbench-proposal", tag: "tic",        note: "Checksum tag again: DDL_WORKBENCH_CRITIQUE_LECHAT_20260217_MINIMAL_VIABLE_FOCUS" },
  { model: "lechat",     review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 2 — exhaustive but didn't challenge the premise; refined within the proposed framework" },
  { model: "claude",     review: "dimensional-workbench-proposal", tag: "signature",  note: "Opens with 'Immediate Reaction' — simultaneous praise and warning before structured critique" },
  { model: "claude",     review: "dimensional-workbench-proposal", tag: "quirk",      note: "'Generalizing from N=1' — coined the sharpest strategic framing in the session" },
  { model: "claude",     review: "dimensional-workbench-proposal", tag: "tic",        note: "Option A / Option B pattern again — every decision gets two paths with tradeoffs" },
  { model: "claude",     review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 1 — challenged the premise, recommended pausing the entire project" },
  { model: "grok",       review: "dimensional-workbench-proposal", tag: "signature",  note: "Compact numbered lists — five sections, each answered in 2-4 bullets" },
  { model: "grok",       review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 2 — efficient, correct, no excess. Consistent across all three reviews" },
  { model: "grok",       review: "dimensional-workbench-proposal", tag: "quirk",      note: "Proposed 'Profile Library' as a user-managed config sharing system — novel concept" },
  { model: "perplexity", review: "dimensional-workbench-proposal", tag: "signature",  note: "Opens with validation ('You're not crazy') before structured critique with source citations" },
  { model: "perplexity", review: "dimensional-workbench-proposal", tag: "quirk",      note: "Best product positioning line in the session: 'shockingly fast way to turn a flat table into a dimensional model'" },
  { model: "perplexity", review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 2 — practical, source-backed, well-scoped" },
  { model: "copilot",    review: "dimensional-workbench-proposal", tag: "signature",  note: "Specification-grade detail — proposed Dim_Overrides, EventID builder, MeasureRole enforcement" },
  { model: "copilot",    review: "dimensional-workbench-proposal", tag: "tic",        note: "Offers to produce follow-up artifacts again: 'I can draft the grain statement and formula scaffolds'" },
  { model: "copilot",    review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 2 — most operationally specific, accepted premise fully" },
  { model: "meta",       review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 3 for third consecutive review — generic product feedback pattern confirmed" },
  { model: "meta",       review: "dimensional-workbench-proposal", tag: "blindspot",  note: "Advised 'focus on core functionality' without defining what 'core' means in this context" },
  { model: "gemini",     review: "dimensional-workbench-proposal", tag: "signature",  note: "Led with thesis: 'solution factory' concept, then Three Pillars simplification" },
  { model: "gemini",     review: "dimensional-workbench-proposal", tag: "quirk",      note: "'Macros build the house; formulas live in it' — memorable and precise" },
  { model: "gemini",     review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 2 — framework-level, clean separation of concerns" },
  { model: "chatgpt",    review: "dimensional-workbench-proposal", tag: "signature",  note: "Opens with 'OS-Mode, tight, technical' — self-declares operating mode before content" },
  { model: "chatgpt",    review: "dimensional-workbench-proposal", tag: "quirk",      note: "'The generic matrix engine might overfit to your thinking style' — challenged Dave's perspective directly" },
  { model: "chatgpt",    review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 1 — challenged premise, identified five architectural traps with UX depth" },
  { model: "deepseek",   review: "dimensional-workbench-proposal", tag: "signature",  note: "YAML code blocks again for structured proposals — consistent across all three reviews" },
  { model: "deepseek",   review: "dimensional-workbench-proposal", tag: "quirk",      note: "'Target me, six months ago' — sharpest user definition in the session" },
  { model: "deepseek",   review: "dimensional-workbench-proposal", tag: "quirk",      note: "Proposed renaming to 'DDL Dimensional Starter' — naming as strategic reframe" },
  { model: "deepseek",   review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 1 — challenged premise with 'don't abstract away the magic too soon'" },
  { model: "deepseek",   review: "dimensional-workbench-proposal", tag: "partner",    note: "Converged with Claude independently — both said 'don't generalize from one example' from different angles" },
  { model: "claude",     review: "dimensional-workbench-proposal", tag: "partner",    note: "Converged with DeepSeek independently — both said 'build more examples first' from different angles" },
  { model: "pi",         review: "dimensional-workbench-proposal", tag: "gravity",    note: "Tier 3 — five generic bullets, no engagement with proposal specifics" },
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

function ModelBadge({ modelId }) {
  const m = models[modelId];
  if (!m) return null;
  return (
    <span style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: m.color + "18", color: m.color, letterSpacing: "0.04em" }}>{m.name}</span>
  );
}

function TierBadge({ tier, label }) {
  const colors = { 1: C.green, 2: C.amber, 3: C.violet };
  return (
    <span style={{ fontFamily: font.mono, fontSize: 9, padding: "2px 7px", borderRadius: 3, background: (colors[tier] || C.creamDim) + "18", color: colors[tier] || C.creamDim, letterSpacing: "0.06em" }}>T{tier} · {label}</span>
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

function ResponseCard({ response }) {
  const [open, setOpen] = useState(false);
  const m = models[response.id];
  if (!m) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${open ? m.color + "30" : C.border}`, borderRadius: 7, marginBottom: 6, transition: "border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
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

function ConvergenceBlock({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.green, flexShrink: 0, minWidth: 40, textAlign: "center" }}>{item.count}</div>
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
            {item.positions.map((pos, j) => {
              const posColors = [C.green, C.amber, C.violet];
              return (
                <div key={j} style={{ paddingLeft: 12, borderLeft: `2px solid ${posColors[j % 3]}30` }}>
                  <div style={{ fontFamily: font.mono, fontSize: 10, color: posColors[j % 3], letterSpacing: "0.06em", marginBottom: 4 }}>{pos.camp}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                    {pos.models.map(mid => <ModelBadge key={mid} modelId={mid} />)}
                  </div>
                  <p style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{pos.detail}</p>
                </div>
              );
            })}
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

function AccentLedgerView({ entries }) {
  const tagColors = { signature: C.blue, tic: C.amber, gravity: C.green, quirk: C.violet, blindspot: C.crimson, partner: C.teal, divergence: C.rose };
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
export default function CouncilReview07() {
  const [tab, setTab] = useState("synthesis");
  const tabs = [
    { id: "synthesis", label: "Synthesis" },
    { id: "responses", label: "Responses (10)" },
    { id: "accents", label: "Accent Ledger" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "32px 24px 48px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
            DDL Council Review #{review.number}
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: C.cream, marginBottom: 4, lineHeight: 1.2 }}>
            {review.title}
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6, maxWidth: 640 }}>
            Should you build the tool, or build more things with it first? Ten models answer the question nobody asked.
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 14, opacity: 0.5 }} />
        </div>

        {/* Metadata */}
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

        <StatBlock items={[
          { value: "10", label: "Models" },
          { value: "3", label: "Tier 1" },
          { value: "5", label: "Tier 2" },
          { value: "2", label: "Tier 3" },
          { value: "≈15.2K", label: "Total Words" },
        ]} />

        {/* Tab Nav */}
        <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 18px",
              background: tab === t.id ? C.crimsonDim : C.creamGhost,
              border: `1px solid ${tab === t.id ? C.crimson : C.border}`,
              borderRadius: 6, cursor: "pointer", transition: "all 0.15s",
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.cream : C.creamDim, letterSpacing: "0.06em" }}>{t.label}</span>
            </button>
          ))}
        </div>

        {tab === "synthesis" && (
          <div>
            <SectionHead label="Convergence" color={C.green} />
            <ConvergenceBlock items={review.synthesis.convergence} />
            <SectionHead label="Divergence" color={C.amber} />
            <DivergenceBlock items={review.synthesis.divergence} />
            <SectionHead label="Blind Spots" color={C.crimson} />
            <BlindSpotBlock items={review.synthesis.blindSpots} />
            <SectionHead label="Tier Stratification" color={C.blue} />
            <TierBlock tiers={review.synthesis.tiers} />
            <SectionHead label="Meta-Insight" color={C.violet} />
            <div style={{ background: C.card, border: `1px solid ${C.violet}30`, borderRadius: 7, padding: "18px 20px" }}>
              <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7 }}>{review.synthesis.metaInsight}</p>
            </div>
            <SectionHead label="Verdict" color={C.crimson} />
            <div style={{ background: C.crimsonFaint, border: `1px solid ${C.crimson}30`, borderRadius: 7, padding: "18px 20px", marginBottom: 8 }}>
              <p style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream, lineHeight: 1.6 }}>{review.output.verdict}</p>
            </div>
            <SectionHead label="Actions" color={C.green} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {review.output.actions.map((action, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: C.green, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{action}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 3 }}>Cross-links:</span>
              {review.output.crossLinks.map(link => (
                <span key={link} style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: C.blueDim, color: C.blue }}>{link}</span>
              ))}
            </div>
          </div>
        )}

        {tab === "responses" && (
          <div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6, marginBottom: 16 }}>
              Click any model to expand. Pi (retired, non-registry) included for completeness.
            </p>
            {review.responses.map(r => <ResponseCard key={r.id} response={r} />)}
          </div>
        )}

        {tab === "accents" && (
          <div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6, marginBottom: 6 }}>
              Cumulative behavioral fingerprints across Reviews #5–7. Three sessions of data — patterns are now confirmed or emerging.
            </p>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 16 }}>
              {accentLedger.length} observations · 3 reviews
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 14px" }}>
              <AccentLedgerView entries={accentLedger} />
            </div>
          </div>
        )}

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

