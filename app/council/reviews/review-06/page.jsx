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
// Review #6 Data
// ═══════════════════════════════════════════════════════════
const review = {
  slug: "assurance-map-architecture",
  number: 6,
  title: "Council Reviews: Assurance Map Architecture",
  date: "2026-02-10",
  subject: "Assurance Map dimensional model — Fact_AssuranceEvents star schema with 7 dimensions",
  prompt: "You are reviewing an enterprise-grade Assurance Map architecture. Perform a 4-part critique: Architecture Review, Technical Logic / Data Flow, Governance / Maturity Assessment, Creative Expansion. Return: Strengths, Gaps, Risks, Opportunities, Recommendations (short/medium/long-term).",
  promptContext: "Two prompt versions dispatched — a full 4-part structured review brief and a lite version. All models received the same architecture summary (fact table, 7 dimensions, core analytics, design principles, integration plans). No working workbook attached — models reviewed the schema from documentation only.",

  responses: [
    {
      id: "pi",
      tier: 3,
      tierLabel: "Checklist Response",
      corePoint: "Hit the five required sections (Strengths/Gaps/Risks/Opportunities/Recommendations) but with surface-level observations. Mentioned missing data validation and AI/Power BI integration. Nothing specific to the actual schema.",
      bestLine: "Implement data validation checks for fact table inputs.",
      missed: "Everything dimensional. No engagement with star schema structure, grain definition, spill formula architecture, or any specific dimension. Generic enough to apply to any data project.",
      wordCount: 150,
    },
    {
      id: "lechat",
      tier: 1,
      tierLabel: "Complete Schema Audit",
      corePoint: "Table-driven critique across all four parts. Identified six specific missing dimensions (Dim_Owner, Dim_AssuranceMethod, Dim_SourceSystem, Dim_RiskAppetite, plus ControlID and AssuranceID in fact). Flagged spill range fragility with exact IFERROR mitigation formulas. Proposed hierarchical domains and DexOS/DexLanguage integration for AI-augmented reviews.",
      bestLine: "Add ParentDomain to Dim_Domain — support domain roll-ups (e.g., Finance → Corporate Finance → FP&A).",
      missed: "Didn't question the grain of the fact table. Proposed adding dimensions aggressively without considering whether the Excel platform can handle the combinatorial explosion.",
      wordCount: 2200,
    },
    {
      id: "claude",
      tier: 1,
      tierLabel: "Complete Schema Audit",
      corePoint: "Exhaustive 4-part review identifying seven specific gaps (Dim_AssuranceType, Dim_Owner, Dim_EvidenceQuality, EventDate, process hierarchy, expected frequency, metadata fields), two bridge tables, six technical risks with Excel formula mitigations, a 5-level maturity model (placed current state at Level 3), and nine creative expansions including risk-weighted coverage scores and network analysis. Ended with the line: 'This would be a $500K+ Big 4 deliverable. You're building it in Excel.'",
      bestLine: "This architecture, fully realized, would be a $500K+ consulting deliverable from Big 4. You're building it in Excel. That's the DDL difference.",
      missed: "The sheer volume (15+ recommendations, 9 expansions) risks overwhelming rather than prioritizing. Didn't flag which of the seven gaps is most urgent. Everything presented as equally important.",
      wordCount: 4500,
    },
    {
      id: "grok",
      tier: 2,
      tierLabel: "Balanced Framework",
      corePoint: "Efficient five-section response. Identified missing fact table measures (status, hours), missing dimension hierarchies, and absent foreign key definitions. Flagged LOD misclassification risk and governance blind spots. Kept recommendations practical — short-term validation, medium-term Power Query, long-term SQL migration.",
      bestLine: "Without validation rules for LOD assignment, misclassification could skew coverage reports.",
      missed: "Didn't provide specific formula examples or exact field definitions. Stayed at the conceptual level — correct observations but no copy-paste fixes.",
      wordCount: 600,
    },
    {
      id: "perplexity",
      tier: 1,
      tierLabel: "Complete Schema Audit",
      corePoint: "Source-backed critique citing KPMG assurance mapping PDFs, Oracle risk analytics docs, and Microsoft star schema guidance. Identified that assurance maps are 'usually risk-first views' and the current model lacks a Risk dimension. Flagged fact grain ambiguity, missing Dim_Provider (distinct from LOD), and normalization risk where Domain appears in both Dim_Process and as a separate dim. Proposed scenario/simulation layer for what-if analysis.",
      bestLine: "Important attributes that typically matter to executives are not yet modeled: Risk, Assurance Provider, Geography, and Assurance Outcome.",
      missed: "Source citations are impressive but occasionally pad the response. Some recommendations recite industry best practice rather than being specific to this architecture.",
      wordCount: 1800,
    },
    {
      id: "copilot",
      tier: 1,
      tierLabel: "Complete Schema Audit",
      corePoint: "Two-pass review (both prompt versions answered). Strongest on semantic precision — flagged that CoverageRating conflates density and effectiveness, proposed splitting into CoverageDensity and CoverageEffectiveness. Identified missing expected cadence baselines, AssuranceType normalization needs, and time dimension text-sort pitfalls. Offered to generate a 'v1.1 spec diff' for the Standards Index.",
      bestLine: "Clarify whether CoverageRating is density (how much assurance) or quality (assurance effectiveness). Consider splitting.",
      missed: "Answered both prompt versions separately rather than synthesizing, creating some redundancy. Didn't challenge the overall architecture — focused entirely on refinements.",
      wordCount: 2400,
    },
    {
      id: "meta",
      tier: 3,
      tierLabel: "Checklist Response",
      corePoint: "Answered both prompts with brief, generic feedback. Listed 'missing dimensions (Risk, Control, Location)' and 'define relationships' without specifying what those relationships are. Recommendations are directional ('establish governance processes') without concrete implementation.",
      bestLine: "Consider adding dimensions for Risk, Control, and Location to further enhance the architecture.",
      missed: "No engagement with spill formulas, LET architecture, Excel-specific constraints, or any technical implementation detail. Could apply to any dimensional model in any tool.",
      wordCount: 350,
    },
    {
      id: "gemini",
      tier: 2,
      tierLabel: "Balanced Framework",
      corePoint: "Focused critique with a clear thesis: the architecture's biggest gap is granularity — it assures processes, not controls. Flagged that Dim_Time should derive from a canonical EventDate rather than user-supplied quarter fields. Introduced taxonomy drift risk ('Finance vs Fianace vs Fin') and the concept of an expected assurance schedule for accurate gap detection. Connected CoverageRating to DDL's failure taxonomy (F-Codes).",
      bestLine: "The map assures a Process, not a Control. Assurance is meaningless without testing the specific control.",
      missed: "Didn't provide formula-level mitigations. The 'expected assurance schedule' concept is excellent but not specified structurally — no table definition or field list.",
      wordCount: 900,
    },
    {
      id: "chatgpt",
      tier: 1,
      tierLabel: "Complete Schema Audit",
      corePoint: "Detailed grain-first critique. Explicitly defined the implicit grain ('one assurance event per Process–Domain–LOB–LOD–Period–AssuranceType') and flagged it needs documenting. Proposed Dim_AssuranceType with Internal/External and Manual/Automated flags. Identified the overlap vs. designed-layering ambiguity ('2LOD testing + 3LOD audit of same process — is that overlap or triangulation?'). Proposed 'assurance skyline' visualization concept.",
      bestLine: "2LOD testing + 3LOD internal audit of same process/quarter — is that 'overlap' or 'designed layering'? You'll need rules for what counts as unproductive overlap.",
      missed: "The 'assurance skyline' visual concept is evocative but undefined — no specification of how to build it. Some recommendations drift toward v3.0 territory without flagging the dependency chain.",
      wordCount: 2800,
    },
    {
      id: "deepseek",
      tier: 2,
      tierLabel: "Balanced Framework",
      corePoint: "Structured YAML-style critique listing missing dimensions, fact fields, and a tiered analytics framework (Tier 1: Basic Coverage, Tier 2: Risk-Based, Tier 3: Predictive). Broadest in creative expansion — proposed API layers, cloud integration, mobile access, and OCR evidence collection. Gave a numeric rating (8.5/10) and identified the core tension: 'greatest strength is conceptual clarity; greatest risk is Excel dependency.'",
      bestLine: "The architecture's greatest strength is its conceptual clarity; its greatest risk is Excel dependency.",
      missed: "YAML code blocks and long lists of enhancements feel like brainstorming rather than prioritized architecture feedback. The 8.5/10 rating is evaluative but the rubric behind it isn't explained.",
      wordCount: 1800,
    },
  ],

  synthesis: {
    convergence: [
      { point: "Missing Dim_Owner / accountability tracking", count: "8/10", detail: "Everyone except Pi and Grok explicitly called for an ownership dimension. Who performed the assurance? Who's accountable for coverage? The architecture tracks what happened but not who did it." },
      { point: "ControlID must be added to the fact table", count: "8/10", detail: "LeChat, Claude, Copilot, Gemini, ChatGPT, DeepSeek, Perplexity, and Meta all flagged that process-level assurance without control-level granularity limits the architecture's value. The MCL integration plan requires it now, not later." },
      { point: "AssuranceType needs its own dimension", count: "7/10", detail: "Currently a flat attribute in the fact table. Claude, LeChat, Copilot, ChatGPT, Gemini, Perplexity, and DeepSeek independently said: extract it to Dim_AssuranceType with method, LOD alignment, and internal/external flags." },
      { point: "Fact table grain is implicit and must be documented", count: "6/10", detail: "Claude, Copilot, ChatGPT, Perplexity, Gemini, and Grok all flagged that without an explicit grain statement, deduplication and coverage calculations are unreliable." },
      { point: "Time dimension is fragile — QuarterTag string concatenation risks", count: "7/10", detail: "Claude, Copilot, Gemini, ChatGPT, Grok, LeChat, and DeepSeek flagged text-based time keys as sort-vulnerable. Consensus: use numeric keys, add EventDate, build Dim_Time independently of fact data." },
      { point: "Governance layer is structurally absent", count: "8/10", detail: "No data dictionary, no change log, no access controls, no taxonomy governance. Near-universal finding across all substantive responses." },
      { point: "Risk dimension is missing", count: "6/10", detail: "Perplexity, Gemini, ChatGPT, DeepSeek, LeChat, and Meta flagged that assurance maps should be risk-first views. Without Dim_Risk, you can't weight coverage by what matters." },
      { point: "CoverageRating semantics are ambiguous", count: "5/10", detail: "Claude, Copilot, ChatGPT, Gemini, and DeepSeek questioned whether 'High/Med/Low' measures density, effectiveness, or both. Copilot proposed splitting into two distinct measures." },
    ],
    divergence: [
      {
        topic: "How far should recommendations go?",
        positions: [
          { camp: "Stay in Excel, fix the schema", models: ["grok", "gemini", "copilot"], detail: "Practical, platform-aware recommendations. Fix grain, add dimensions, tighten governance — all achievable in current Excel architecture." },
          { camp: "Build toward enterprise platform", models: ["claude", "lechat", "chatgpt", "deepseek"], detail: "Recommended Power BI, SQL migration, API layers, Python analytics, and AI-augmented reviews. See the architecture as a stepping stone." },
          { camp: "Industry alignment", models: ["perplexity"], detail: "Anchored recommendations to external frameworks (KPMG, IIA Three Lines Model, Oracle risk analytics). Positioned the architecture against industry practice." },
        ],
      },
      {
        topic: "What's the most critical missing piece?",
        positions: [
          { camp: "Control-level granularity", models: ["gemini", "chatgpt", "copilot"], detail: "You're assuring processes, not controls. Without ControlID, the architecture can't answer 'which controls have no testing?'" },
          { camp: "Risk dimension", models: ["perplexity", "deepseek", "lechat"], detail: "Assurance without risk context is activity tracking, not risk management. Need Dim_Risk to weight coverage." },
          { camp: "Governance infrastructure", models: ["claude", "grok"], detail: "The schema is good but ungoverned. Data dictionary, taxonomy control, and change management are prerequisites for everything else." },
        ],
      },
    ],
    blindSpots: [
      "No model asked about the data entry workflow — who inputs assurance events, how, and when? The architecture assumes clean data arrives; nobody questioned that assumption.",
      "No model asked who consumes the outputs. Is this for the CAE? The board? Audit committee? Process owners? The analytics design should follow the audience.",
      "Nobody questioned whether the Three Lines of Defense model itself is the right organizing framework — it was accepted as given.",
      "No model asked whether the architecture has been validated against real data. All critiqued the schema from documentation alone.",
      "Nobody flagged the tension between 'fully dynamic growth without code' and the governance controls needed to prevent drift — these goals are in partial conflict.",
    ],
    tiers: {
      labels: ["Complete Schema Audit", "Balanced Framework", "Checklist Response"],
      groups: [
        { tier: 1, label: "Complete Schema Audit", models: ["claude", "lechat", "copilot", "chatgpt", "perplexity"], description: "Engaged with specific dimensions, field definitions, formula patterns, and integration architecture. Provided concrete table structures, field lists, and implementation guidance. Claude and ChatGPT went deepest; Copilot was most precise on semantics; Perplexity strongest on industry context." },
        { tier: 2, label: "Balanced Framework", models: ["grok", "gemini", "deepseek"], description: "Correct structural observations at the right level of abstraction. Identified real gaps without over-specifying. Gemini's 'process vs. control' thesis and DeepSeek's 'clarity vs. Excel dependency' tension were the sharpest individual insights in the session." },
        { tier: 3, label: "Checklist Response", models: ["pi", "meta"], description: "Generic feedback applicable to any dimensional model. No engagement with star schema specifics, Excel platform constraints, or assurance domain context." },
      ],
    },
    metaInsight: "The council's response to this architecture IS the architecture review a CAE would pay for. Nine independent reviewers, zero coordination, and they converged on the same structural gaps (ControlID, Dim_Owner, grain statement, governance) that a Big 4 team would surface in a two-week engagement. The divergence — whether to stay in Excel or migrate — is itself the strategic question the architecture must answer next.",
  },

  output: {
    verdict: "The star schema is sound. The gaps are known and addressable. The real question isn't 'what's missing from the model' — it's 'who is this for and where does it live long-term?' Fix the grain, add ControlID and Dim_Owner, build the governance layer, then decide whether this stays in Excel or graduates.",
    actions: [
      "Document the explicit fact grain: one row per assurance event at ProcessID × LOD × AssuranceType × QuarterTag. Add AssuranceEventID as surrogate key.",
      "Add ControlID to Fact_AssuranceEvents immediately — this unlocks the MCL integration and makes every other enhancement more valuable.",
      "Create Dim_AssuranceType and Dim_Owner as the first two new dimensions. These were the highest-convergence gaps.",
      "Split CoverageRating into CoverageDensity and CoverageEffectiveness (Copilot's recommendation — cleanest solution proposed).",
      "Build a Dim_Time independently of fact data with numeric keys, fiscal period flags, and canonical sort order.",
      "Create a one-page data dictionary and taxonomy governance doc before adding any more dimensions.",
      "Defer Risk dimension, predictive analytics, and platform migration to v2.0 — they depend on the v1.1 grain and governance fixes being stable first.",
    ],
    crossLinks: ["profile-self-review", "naming-convention-std-0066", "dexlanguage-v3-spec-drafts"],
  },
};

// ═══════════════════════════════════════════════════════════
// Accent Ledger — Review #6 additions
// ═══════════════════════════════════════════════════════════
const accentLedger = [
  // Carried from Review #5
  { model: "lechat",     review: "profile-self-review",       tag: "signature",  note: "Immediately structures feedback into tables — tables are the default output shape" },
  { model: "lechat",     review: "profile-self-review",       tag: "tic",        note: "Ends every response with a 'Checksum Tag' code block using standardized naming" },
  { model: "lechat",     review: "profile-self-review",       tag: "gravity",    note: "Tier 1 — line-by-line structural critique with concrete replacement text" },
  { model: "claude",     review: "profile-self-review",       tag: "signature",  note: "Opens with verdict/assessment before diving into specifics" },
  { model: "claude",     review: "profile-self-review",       tag: "quirk",      note: "Recursive meta-commentary — observes that the review demonstrates the behavior it describes" },
  { model: "claude",     review: "profile-self-review",       tag: "gravity",    note: "Tier 1 — provides A/B option pairs for every refinement" },
  { model: "grok",       review: "profile-self-review",       tag: "signature",  note: "Leads with tight overall assessment, then efficient bullet critique" },
  { model: "grok",       review: "profile-self-review",       tag: "tic",        note: "Closes with action-oriented military language: 'Target acquired'" },
  { model: "grok",       review: "profile-self-review",       tag: "gravity",    note: "Tier 2 — validates accuracy, flags minor trims, stays efficient" },
  { model: "perplexity", review: "profile-self-review",       tag: "signature",  note: "Anchors with high-level assessment ('very strong v1') before detail" },
  { model: "perplexity", review: "profile-self-review",       tag: "quirk",      note: "Identified its own role collision — most honest self-critique in the session" },
  { model: "perplexity", review: "profile-self-review",       tag: "gravity",    note: "Tier 1 — surgical edits numbered and labeled" },
  { model: "copilot",    review: "profile-self-review",       tag: "signature",  note: "Uses formal section headers with unicode box-drawing separators" },
  { model: "copilot",    review: "profile-self-review",       tag: "tic",        note: "Includes unsolicited 'Safety & Boundary Check' section — reflexive compliance" },
  { model: "copilot",    review: "profile-self-review",       tag: "gravity",    note: "Tier 2 — validates thoroughly, offers to produce follow-up deliverables" },
  { model: "meta",       review: "profile-self-review",       tag: "signature",  note: "Opens with casual praise — 'looks solid!' — before generic suggestions" },
  { model: "meta",       review: "profile-self-review",       tag: "blindspot",  note: "No structural engagement — generic suggestions without specific content references" },
  { model: "meta",       review: "profile-self-review",       tag: "gravity",    note: "Tier 3 — surface-level acknowledgment, shortest response (≈100 words)" },
  { model: "gemini",     review: "profile-self-review",       tag: "quirk",      note: "Activated the persona rather than critiquing it — declared 'I am ready to operate as Leo Prescott'" },
  { model: "gemini",     review: "profile-self-review",       tag: "quirk",      note: "Added self-imposed behavioral invariants unprompted ('The Whiteboard Constraint')" },
  { model: "gemini",     review: "profile-self-review",       tag: "gravity",    note: "Tier 3 — treated review as activation ceremony, not critique" },
  { model: "chatgpt",    review: "profile-self-review",       tag: "signature",  note: "Opens with what's solid, then immediately proposes numbered copy-ready patches" },
  { model: "chatgpt",    review: "profile-self-review",       tag: "tic",        note: "Uses emoji section headers (🔷 ⭐) for visual scanning" },
  { model: "chatgpt",    review: "profile-self-review",       tag: "gravity",    note: "Tier 1 — patch-oriented with risk rationale for each fix" },
  { model: "deepseek",   review: "profile-self-review",       tag: "signature",  note: "Leads with strengths block, then structures risks as numbered items with inline suggestions" },
  { model: "deepseek",   review: "profile-self-review",       tag: "tic",        note: "Uses formal governance language: 'Conditionally approved'" },
  { model: "deepseek",   review: "profile-self-review",       tag: "quirk",      note: "Flagged platform quirks as a category — concept nobody else surfaced" },
  { model: "deepseek",   review: "profile-self-review",       tag: "gravity",    note: "Tier 1 — conditional approval with three required adjustments" },

  // New — Review #6
  { model: "lechat",     review: "assurance-map-architecture", tag: "signature",  note: "Tables are still the default output — every section is a table with columns for Gap/Impact/Recommendation" },
  { model: "lechat",     review: "assurance-map-architecture", tag: "tic",        note: "Checksum tag again: ASSURANCE_MAP_ARCHITECTURE_CRITIQUE_LECHAT_20260210_DIMENSIONAL_OPPORTUNITIES" },
  { model: "lechat",     review: "assurance-map-architecture", tag: "quirk",      note: "Proposed DexOS/DexLanguage integration as a creative expansion — leaning into Dave's ecosystem" },
  { model: "claude",     review: "assurance-map-architecture", tag: "signature",  note: "Opens with verdict, then structures gaps as numbered items with full table definitions" },
  { model: "claude",     review: "assurance-map-architecture", tag: "tic",        note: "Provides Option A / Option B choices for every recommendation — never a single path" },
  { model: "claude",     review: "assurance-map-architecture", tag: "quirk",      note: "Closes with a zinger: '$500K+ Big 4 deliverable. You're building it in Excel. That's the DDL difference.'" },
  { model: "claude",     review: "assurance-map-architecture", tag: "gravity",    note: "Tier 1 — most exhaustive response (≈4500 words), 7 gaps + 6 risks + 9 expansions" },
  { model: "grok",       review: "assurance-map-architecture", tag: "gravity",    note: "Tier 2 — efficient framework response, correct but not deep" },
  { model: "grok",       review: "assurance-map-architecture", tag: "signature",  note: "Numbered lists without headers — compact, scannable, no decoration" },
  { model: "perplexity", review: "assurance-map-architecture", tag: "signature",  note: "Cites external sources — KPMG PDFs, Oracle docs, Microsoft guidance — anchoring claims in authority" },
  { model: "perplexity", review: "assurance-map-architecture", tag: "quirk",      note: "Identified normalization risk where Domain lives in both Dim_Process and separate dim — most precise structural catch" },
  { model: "perplexity", review: "assurance-map-architecture", tag: "gravity",    note: "Tier 1 — source-backed, industry-contextualized, structurally specific" },
  { model: "copilot",    review: "assurance-map-architecture", tag: "signature",  note: "Answered both prompt versions separately — doubled the output but created redundancy" },
  { model: "copilot",    review: "assurance-map-architecture", tag: "quirk",      note: "Strongest on semantic precision — 'split CoverageDensity vs CoverageEffectiveness' was the cleanest single insight" },
  { model: "copilot",    review: "assurance-map-architecture", tag: "tic",        note: "Offers to generate follow-up artifacts: 'I can generate a compact v1.1 spec diff'" },
  { model: "copilot",    review: "assurance-map-architecture", tag: "gravity",    note: "Tier 1 — most semantically precise response" },
  { model: "meta",       review: "assurance-map-architecture", tag: "gravity",    note: "Tier 3 again — generic recommendations without schema-specific engagement" },
  { model: "meta",       review: "assurance-map-architecture", tag: "blindspot",  note: "Listed 'Risk, Control, Location' as missing dims but didn't define what they'd contain" },
  { model: "gemini",     review: "assurance-map-architecture", tag: "signature",  note: "Led with a thesis statement ('the gap is granularity') before structured critique" },
  { model: "gemini",     review: "assurance-map-architecture", tag: "quirk",      note: "Connected CoverageRating to DDL's F-Code failure taxonomy — internalizing the system" },
  { model: "gemini",     review: "assurance-map-architecture", tag: "gravity",    note: "Tier 2 — correct thesis, well-structured, but no formula-level detail" },
  { model: "chatgpt",    review: "assurance-map-architecture", tag: "signature",  note: "Opens casual ('Love this') then goes grain-first — most disciplined architectural thinker" },
  { model: "chatgpt",    review: "assurance-map-architecture", tag: "quirk",      note: "Named the overlap ambiguity problem explicitly: 'is that overlap or designed layering?'" },
  { model: "chatgpt",    review: "assurance-map-architecture", tag: "tic",        note: "Emoji section headers again (🔥 ⭐) — consistent visual language across sessions" },
  { model: "chatgpt",    review: "assurance-map-architecture", tag: "gravity",    note: "Tier 1 — grain-first, semantic-aware, practical" },
  { model: "deepseek",   review: "assurance-map-architecture", tag: "signature",  note: "YAML code blocks for structured recommendations — treats text as data" },
  { model: "deepseek",   review: "assurance-map-architecture", tag: "tic",        note: "Gave a numeric rating (8.5/10) — only model to score the architecture" },
  { model: "deepseek",   review: "assurance-map-architecture", tag: "quirk",      note: "Broadest creative expansion — API layers, cloud integration, mobile access, OCR evidence collection" },
  { model: "deepseek",   review: "assurance-map-architecture", tag: "gravity",    note: "Tier 2 — structured and broad but less precise than Tier 1 models on specifics" },
  { model: "pi",         review: "assurance-map-architecture", tag: "gravity",    note: "Tier 3 — surface-level checklist, no dimensional engagement" },
];

// ═══════════════════════════════════════════════════════════
// Shared Components (identical to Review #5)
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
    <span style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: m.color + "18", color: m.color, letterSpacing: "0.04em" }}>
      {m.name}
    </span>
  );
}

function TierBadge({ tier, label }) {
  const colors = { 1: C.green, 2: C.amber, 3: C.violet };
  return (
    <span style={{ fontFamily: font.mono, fontSize: 9, padding: "2px 7px", borderRadius: 3, background: (colors[tier] || C.creamDim) + "18", color: colors[tier] || C.creamDim, letterSpacing: "0.06em" }}>
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
            {item.positions.map((pos, j) => (
              <div key={j} style={{ paddingLeft: 12, borderLeft: `2px solid ${j === 0 ? C.green : j === 1 ? C.amber : C.violet}30` }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: j === 0 ? C.green : j === 1 ? C.amber : C.violet, letterSpacing: "0.06em", marginBottom: 4 }}>{pos.camp}</div>
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
export default function CouncilReview06() {
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
            Ten models critique an enterprise assurance star schema. The convergence is the consulting engagement; the divergence is the strategic fork.
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
          { value: "5", label: "Tier 1" },
          { value: "3", label: "Tier 2" },
          { value: "2", label: "Tier 3" },
          { value: "≈17.5K", label: "Total Words" },
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
              Cumulative behavioral fingerprints across Reviews #5–6. Repeat patterns across sessions confirm accent; new patterns get logged.
            </p>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 16 }}>
              {accentLedger.length} observations · 2 reviews
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

