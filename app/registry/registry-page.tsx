'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

interface SystemEntry {
  id: string;
  name: string;
  domain: string;
  status: string;
  purpose: string;
  grain: string;
  insight: string;
  spawned: string;
}

interface StandardEntry {
  id: string;
  type: string;
  name: string;
  rule: string;
}

const systems: SystemEntry[] = [
  {id:"SYS-001",name:"Wedding Tracker",domain:"Personal / Events",status:"Archived",
    purpose:"Dave and Emily\u2019s wedding planning workbook. The first DDL system before DDL existed.",
    grain:"One row = one task \u00d7 vendor \u00d7 status \u00d7 owner",insight:"This is where it started. Not with a methodology \u2014 with a wedding. The dimensional thinking was already there: tasks as rows, vendors as dimensions, status as lifecycle. Dave didn\u2019t learn to build systems. He discovered he\u2019d been building them all along.",spawned:"Wedding planning workbook. The origin story."},
  {id:"SYS-002",name:"Hjerim (Skyrim Engine)",domain:"Gaming / Analytics",status:"Active",
    purpose:"Governed Skyrim playthrough engine with dimensional inventory, enchanting optimization, and build analytics.",
    grain:"One row = one item \u00d7 enchantment \u00d7 slot \u00d7 build phase",insight:"Dave doesn\u2019t play Skyrim. He audits it. The enchanting optimizer is a linear programming problem. The inventory is a star schema. The carry weight limit is OBS-35 before OBS-35 existed.",spawned:"Skyrim workbook. Enchanting matrix. Build optimization."},
  {id:"SYS-003",name:"Roommate Utility Split",domain:"Personal / Finance",status:"Archived (Pending Docs)",
    purpose:"Utility cost allocation system for shared living arrangement.",
    grain:"One row = one bill \u00d7 utility \u00d7 period \u00d7 occupant",insight:"The simplest DDL system. Still has a grain, still has dimensions, still has governance.",spawned:"Utility workbook."},
  {id:"SYS-004",name:"FIL Debt Amortization",domain:"Personal / Finance",status:"Archived (Pending Docs)",
    purpose:"Father-in-law debt repayment tracking and amortization schedule.",
    grain:"One row = one payment \u00d7 period \u00d7 principal \u00d7 interest",insight:"Financial governance applied to a family obligation. The math is simple. The governance is the point.",spawned:"Amortization schedule."},
  {id:"SYS-005",name:"Steam Library Analytics",domain:"Gaming / Analytics",status:"Active",
    purpose:"Steam game library analysis \u2014 spending patterns, playtime, genre distribution, backlog management.",
    grain:"One row = one game \u00d7 purchase date \u00d7 hours \u00d7 genre \u00d7 cost",insight:"Prototype for BlindSpot: Steam. The first time Dave applied audit analytics to entertainment spending.",spawned:"Steam analytics workbook. Genre analysis. Backlog metrics."},
  {id:"SYS-006",name:"March Madness Bracket Engine",domain:"Sports / Analytics",status:"Seasonal",
    purpose:"NCAA tournament bracket analysis with historical performance data and upset probability modeling.",
    grain:"One row = one game \u00d7 round \u00d7 seed matchup \u00d7 outcome",insight:"Bracket analysis as audit evidence evaluation. Every game is a test of a hypothesis about which seed wins.",spawned:"Bracket workbook. Historical seed performance."},
  {id:"SYS-007",name:"DexDash (AI Analytics)",domain:"AI / Analytics",status:"Active",
    purpose:"Dashboard tracking Dave\u2019s AI collaboration metrics \u2014 model usage, token counts, session patterns, productivity correlation.",
    grain:"One row = one session \u00d7 model \u00d7 token count \u00d7 task type \u00d7 outcome",insight:"Dave audits his own AI usage the same way he audits business processes. DexDash is the Assurance Map for the DexVerse.",spawned:"AI analytics dashboard. Model comparison."},
  {id:"SYS-008",name:"IntegrityOS",domain:"Governance / Framework",status:"Active (Pending Docs)",
    purpose:"Governance architecture framework for DDL systems. The operating system for operational integrity.",
    grain:"One row = one control \u00d7 domain \u00d7 enforcement level \u00d7 lifecycle",insight:"IntegrityOS is the governance theory. The Standards Registry is the governance practice. They converge at Excelligence.",spawned:"Framework specification. Control taxonomy."},
  {id:"SYS-009",name:"PTIS (Productive Time Intelligence)",domain:"Professional / Time Analytics",status:"Active",
    purpose:"Time intelligence system replacing basic time tracking with dimensional analytics for audit engagement management.",
    grain:"One row = one time entry \u00d7 engagement \u00d7 task type \u00d7 period \u00d7 auditor",insight:"PTIS exists because the existing time system borrowed consulting logic (OBS-32). Dave built the system that should have existed \u2014 one that measures productive time, not billable hours.",spawned:"Time analytics workbook. Dual reconciliation. Engagement analytics."},
  {id:"SYS-010",name:"Tea Protocol",domain:"Personal / Thermal Analytics",status:"Active (Daily)",
    purpose:"Governed tea preparation system with thermal gradient optimization, vessel-specific parameters, and steep timing.",
    grain:"One row = one steep \u00d7 tea type \u00d7 vessel \u00d7 water temp \u00d7 duration",insight:"The Tea Protocol is the proof that DDL methodology has nothing to do with Excel and everything to do with how Dave\u2019s brain works. He optimized a cup of tea the same way he\u2019d optimize an audit program.",spawned:"Tea protocol documentation. Vessel parameters. Thermal gradient specs."},
  {id:"SYS-011",name:"47-Step Daily Routine",domain:"Personal / Operations",status:"Active (Daily)",
    purpose:"Dave\u2019s complete daily operational protocol \u2014 47 steps across 13 phases with 6 optimizations for Emily.",
    grain:"One row = one step \u00d7 phase \u00d7 dependency \u00d7 time window \u00d7 constraint",insight:"The routine is the Protocol from the memoir, operationalized. 47 steps that turn a brain with ADHD and Bipolar II into a production system. Emily sleeps through Phase 2 \u2014 that constraint (OBS-35) shapes the entire morning sequence.",spawned:"Routine documentation. Phase definitions. Emily optimizations."},
  {id:"SYS-012",name:"Audit Coverage Model",domain:"Professional / Audit",status:"Active",
    purpose:"Audit universe coverage tracking \u2014 which processes have been audited, when, by whom, with what findings.",
    grain:"One row = one audit \u00d7 process \u00d7 period \u00d7 risk rating \u00d7 finding count",insight:"The predecessor to the Assurance Map. Coverage as a flat list. The dimensional upgrade to star schema (SYS-015) is the story of why flat lists fail at scale.",spawned:"Coverage workbook. Risk ratings. Finding tracker."},
  {id:"SYS-013",name:"Audit Performance Engine",domain:"Professional / Audit",status:"Active",
    purpose:"Individual auditor performance analytics \u2014 efficiency, finding rates, peer comparison, development tracking.",
    grain:"One row = one engagement \u00d7 auditor \u00d7 hours \u00d7 findings \u00d7 quality score",insight:"Dave built an engine to measure audit performance. The billable hours constraint (OBS-32) is visible in every row \u2014 the budget pressure that distorts the data it measures.",spawned:"Performance workbook. Peer comparison. Development tracker."},
  {id:"SYS-014",name:"CAE (Control Architecture Engine)",domain:"Professional / Audit Governance",status:"Design Complete",
    purpose:"Enterprise-grade control framework engine \u2014 mapping controls to risks to processes to organizational objectives.",
    grain:"One row = one control \u00d7 risk \u00d7 process \u00d7 objective \u00d7 testing status",insight:"CAE is the Assurance Map\u2019s governance layer. If the Assurance Map shows coverage, CAE shows why coverage matters \u2014 which controls protect which objectives.",spawned:"Control framework. MVP specification. 9 non-goals."},
  {id:"SYS-015",name:"Assurance Map Engine",domain:"Professional / Audit Analytics",status:"Active (POC Demonstrated)",
    purpose:"Star schema analytics engine transforming scattered audit evidence into enterprise-grade coverage intelligence with LOD-layered heatmaps.",
    grain:"One row = one fact event \u00d7 entity \u00d7 process \u00d7 period \u00d7 risk domain \u00d7 attribute",insight:"The system that solved a 6-year organizational problem in one POC. Keith couldn\u2019t build it. Not because he lacked skill \u2014 because the tool was wrong (OBS-32). Dave replaced the flat spreadsheet (counterfeit coverage \u2014 OBS-31) with a dimensional model. Brad Kastler saw the demo. 20,241 fact records. 56 governed variables. The architecture IS the argument.",spawned:"v1.5 workbook. 91 processes. Brad demo. 16 DDL standards observed."},
  {id:"SYS-016",name:"BTS (Behind the Scenes) Substack",domain:"Content / Publishing",status:"Active",
    purpose:"Weekly memoir-format Substack publication \u2014 personal narrative with analytical voice.",
    grain:"One row = one post \u00d7 topic \u00d7 publication date \u00d7 engagement metrics",insight:"The Substack is the public interface for the memoir engine (SYS-026). CottageHumble (PSS-0002) applied to personal publishing.",spawned:"Weekly posts. \u2018The Protocol.\u2019 \u2018The Cost of Billable Hours.\u2019 Audience growth."},
  {id:"SYS-017",name:"ACE (Artifact Continuity Engine)",domain:"Infrastructure / Artifact Governance",status:"Active",
    purpose:"Governed artifact custody and continuity system \u2014 ensuring every DDL artifact has provenance, version history, and lifecycle management.",
    grain:"One row = one artifact \u00d7 type \u00d7 version \u00d7 custody status \u00d7 last validated",insight:"ACE is the librarian. Every other DDL system produces artifacts. ACE tracks them. Without ACE, the portfolio is a pile of files. With ACE, it\u2019s a governed collection.",spawned:"Artifact taxonomy. Custody protocol. Version tracking."},
  {id:"SYS-018",name:"DDL Council",domain:"Infrastructure / AI Orchestration",status:"Active (200+ reviews)",
    purpose:"Nine-model convergent analysis framework for complex decisions. Write once, distribute to all, synthesize governed output.",
    grain:"One row = one review \u00d7 task \u00d7 model responses \u00d7 convergence score",insight:"The Council is Dave\u2019s audit committee for everything. Nine models with different architectures, different training data, different blind spots. When they converge, the answer is probably right. When they diverge, the divergence IS the finding.",spawned:"200+ reviews. 4.57M words. Model Assignment Protocol v1.0. Council methodology."},
  {id:"SYS-019",name:"DexVerse Knowledge Map",domain:"Infrastructure / Knowledge Graph",status:"Phase 1 Complete \u2014 Hardened",
    purpose:"Governed knowledge graph connecting all DDL artifacts, concepts, relationships, and gaps into a queryable dimensional model.",
    grain:"One artifact \u00d7 one chunk \u00d7 one cluster \u00d7 one gap per unresolved query",insight:"Phase 1 is the first DDL system where the governance layer was adversarially tested by another AI model before lock. Grey challenged 5 invariants. 13 tests proved them. The Knowledge Map is generating standards before it can generate embeddings.",spawned:"SQLite governance DB. Ingestion pipeline. CLI. 13 invariant tests. 3 REC candidates."},
  {id:"SYS-020",name:"DDL Council Orchestrator (AutoCouncil)",domain:"Infrastructure / AI Orchestration",status:"Day 2 Complete \u2014 Async Operational",
    purpose:"Automated council methodology \u2014 write prompt once, distribute to agents, collect responses, synthesize governed output. Parallel execution with error isolation.",
    grain:"One task = run_id \u00d7 agents \u00d7 turns \u00d7 micro-summaries \u00d7 primary document",insight:"Clayton\u2019s reference: $0.21 for a governance-grade SaaS business plan. Six agents, four turns. Dave looked at it and saw a star schema. Day 2: 8 agents with 0.5s delay complete in 1.01s wall time (4\u00d7 speedup). 7/7 test suite passing.",spawned:"Architecture spec. Unified LLM client (7 providers). 12 agent configs. Streamlit GUI."},
  {id:"SYS-021",name:"BlindSpot: Betting",domain:"Analytics / Sports",status:"Architecture Designed",
    purpose:"Sports betting analytics with fake money economy (10,000 BlindSpot units) \u2014 surfaces blind spots in pick-making before risking real capital.",
    grain:"One row = one pick \u00d7 sport \u00d7 bet type \u00d7 odds \u00d7 confidence \u00d7 outcome",insight:"BlindSpot doesn\u2019t help you win bets. It helps you see why you lose them. The fake economy removes the emotional stakes so the analytical signal is clean. OBS-08 applied to gambling.",spawned:"blindspot.html pitch page. Logo. Architecture spec."},
  {id:"SYS-022",name:"Excelligence",domain:"Infrastructure / Knowledge Governance",status:"Design Complete",
    purpose:"Governed pattern registry for Excel knowledge \u2014 bridging the gap between knowing a technique exists and knowing when to apply it.",
    grain:"One row = one pattern \u00d7 skill level \u00d7 domain \u00d7 complexity \u00d7 related patterns",insight:"Excelligence and PSS share DNA: both are governed knowledge registries with taxonomy, lifecycle, and searchability. The question for council: are these two systems or one system with two skins?",spawned:"Pattern registry spec. Taxonomy. Addendum validation checks."},
  {id:"SYS-023",name:"DDL Systems Registry",domain:"Infrastructure / Governance",status:"Active (v2.0)",
    purpose:"Master governed inventory of every DDL system. The single source of truth for what DDL has built, what it does, and how it connects.",
    grain:"One row = one system \u00d7 domain \u00d7 status \u00d7 grain statement",insight:"The Systems Registry is the moment DDL became self-aware. SYS-001 to SYS-022 is a 26-month arc from \u2018I need to plan a wedding\u2019 to \u2018I need to govern a knowledge graph.\u2019 The grain statement per system is the tell \u2014 Dave doesn\u2019t describe systems, he declares their dimensional structure.",spawned:"22 system records. 6 pending. Portfolio-level status view."},
  {id:"SYS-024",name:"DDL Standards Registry",domain:"Infrastructure / Meta-Governance",status:"Active (v2.0)",
    purpose:"Governed pattern library of recurring DDL standards. Four-tier promotion lifecycle from observation to enforceable build requirement.",
    grain:"One row = one standard \u00d7 classification \u00d7 lifecycle \u00d7 enforcement type",insight:"The most auditor thing Dave has ever built. A finding library for his own methodology. 40+ raw extractions collapsed to 30 OBS through documented merge decisions. \u2018Naming is the first act of governance\u2019 isn\u2019t a tagline. It\u2019s OBS-01 in five words.",spawned:"30 OBS. 3 PRO. 10 REC. 4 VEH. Dedup map. Gap resolution log."},
  {id:"SYS-025",name:"Graceful Beauty KC",domain:"DexVerse / Client Product",status:"Delivered",
    purpose:"Analytics engine for bridal beauty business \u2014 bookings, revenue, seasonal patterns with luxury editorial design.",
    grain:"One row = one booking \u00d7 client \u00d7 service \u00d7 date \u00d7 status",insight:"First DexVerse product for a client Dave has never met, through a referral chain. Same architecture \u2014 star schema, governed dimensions \u2014 skinned as luxury bridal editorial. Furthest from audit in the registry. Architecture underneath: identical.",spawned:"graceful_beauty.html. DexVerse product #8."},
  {id:"SYS-026",name:"BTS Memoir Engine",domain:"Content / Memoir",status:"Draft Complete \u2014 Edit Phase",
    purpose:"Complete narrative arc from first drink to present stability. 48 excerpts, ~50,000 words, five structural arcs.",
    grain:"One excerpt = one narrative unit \u00d7 period \u00d7 theme \u00d7 relationship",insight:"The memoir is written in star schema. Dave doesn\u2019t know this. The excerpts are fact rows. The themes are dimension tables. The whole book is a 48-row fact table about one man learning what quiet actually costs.",spawned:"48 excerpts. \u2018The Protocol.\u2019 \u2018The Cost of Billable Hours.\u2019 Full memoir draft."},
  {id:"SYS-027",name:"BlindSpot: Trading (Alex Engine)",domain:"Analytics / Finance",status:"Active",
    purpose:"Dimensional analytics for active trading \u2014 surfacing blind spots in decision-making that pen-and-paper can\u2019t reveal.",
    grain:"One row = one trade \u00d7 ticker \u00d7 date \u00d7 strategy \u00d7 market condition",insight:"Alex had 117% returns tracking on paper. Dave built a dimensional model that shows Alex what his own data was hiding. The gap detection IS the value. OBS-30 in the wild.",spawned:"Trading analytics engine. Alex engagement."},
  {id:"SYS-028",name:"Dex Jr. (Local LLM)",domain:"Infrastructure / Local AI",status:"Pre-Build \u2014 Stack Locked",
    purpose:"Local LLM inference engine on gaming rig. RTX 3070, Ollama, qwen2.5-coder:7b. 10th council member target.",
    grain:"One inference = one model \u00d7 one prompt \u00d7 one task \u00d7 one calibration status",insight:"Six months from concept to council-reviewed infrastructure plan. Every parameter changed except the intent. Build blocked by a dead TV panel \u2014 the right kind of blocker.",spawned:"Build spec. Calibration protocol. Father-in-law review."},
  {id:"SYS-029",name:"DDL Standard Workbook Template",domain:"Infrastructure / Excel",status:"Design Complete",
    purpose:"Reusable Excel template pre-wired with DDL infrastructure. The OS all future Excel systems boot from.",
    grain:"One workbook = one project instance \u00d7 domain-specific content",insight:"Every DDL workbook re-solves the same problems. The StdBook solves them once. OBS-20 applied to the build process itself.",spawned:"Architecture proposal. Macro specs. Tab structure."},
  {id:"SYS-030",name:"VetSchedule Engine",domain:"Veterinary / Analytics",status:"v1.0 Delivered",
    purpose:"Vet clinic scheduling analytics. Provider utilization, no-shows, wait times, revenue from existing data.",
    grain:"One row = one appointment \u00d7 provider \u00d7 type \u00d7 species \u00d7 room \u00d7 date",insight:"Nichole said \u2018Launch us both.\u2019 She saw a vet clinic. Dave saw a star schema. Same conversation.",spawned:"Working xlsx. 7,331 synthetic appts. HTML landing page."},
  {id:"SYS-031",name:"Drinks-O-System",domain:"Hospitality / Analytics",status:"v0.1 Delivered",
    purpose:"Cocktail intelligence engine. 127 recipes, pour cost/margin, creative gap analysis, ingredient network. IP security by architecture.",
    grain:"One row = one recipe \u00d7 spirit \u00d7 style \u00d7 season \u00d7 venue",insight:"Serge asked about security first. The answer was already in the architecture. Coded recipes \u2014 engine never sees the secret. OBS-36 was born here.",spawned:"Interactive dashboard. Marketing flyer. IP security docs."},
  {id:"SYS-032",name:"GrantTracker Engine",domain:"Nonprofit / Compliance",status:"v1.0 Delivered",
    purpose:"Grant compliance for low-cost spay/neuter clinics. Fund balances, expenditures, compliance deadlines.",
    grain:"One row = one expenditure \u00d7 grant \u00d7 expense category \u00d7 reporting period",insight:"Clinics are REQUIRED to track grants. Current state: binders, spreadsheets, someone\u2019s head. This engine replaces all three. Strongest product-market fit in the DexVerse.",spawned:"Working xlsx. HTML dashboard. Service model pitch."},
  {id:"SYS-033",name:"PayGuard",domain:"HR / Payroll Compliance",status:"Dashboard Delivered",
    purpose:"Benefits compliance engine. Duplicate deductions, 401k gaps, enrollment mismatches.",
    grain:"One row = one deduction \u00d7 employee \u00d7 benefit \u00d7 pay period",insight:"Sophia described an entire audit program in plain English without knowing the vocabulary. \u2018Am I thinking too large?\u2019 No.",spawned:"payguard.html dashboard."},
  {id:"SYS-034",name:"GetSum",domain:"Personal Finance / Analytics",status:"Dashboard Delivered",
    purpose:"Deterministic capital analysis. Every variance classified: Environmental, Execution, Structural. No motivational tone.",
    grain:"One row = one transaction \u00d7 category \u00d7 period \u00d7 variance type",insight:"The prompt spec reads like an audit program. Because it is one.",spawned:"getsum.html terminal dashboard."},
  {id:"SYS-035",name:"HeartBeat Engine",domain:"Org Intelligence",status:"Dashboard Delivered",
    purpose:"Organizational growth intelligence platform. Team health, engagement, structural patterns.",
    grain:"One row = one signal \u00d7 team \u00d7 period \u00d7 category",insight:"Clayton saw the engine pattern. Built Auto-Council in one day. HeartBeat is the product they designed together.",spawned:"heartbeat.html dashboard."},
  {id:"SYS-036",name:"Sprinkles & Co",domain:"Bakery / Brand Strategy",status:"Delivered",
    purpose:"Complete brand strategy for Emily\u2019s artisan bakery. DDL methodology applied to brand identity.",
    grain:"One brand element = one identity component \u00d7 audience \u00d7 channel",insight:"Same methodology that builds audit engines builds brand strategies. Dimensional thinking doesn\u2019t care about the domain.",spawned:"sprinkles.html brand strategy."},
  {id:"SYS-037",name:"Nomadic Notary Ink",domain:"Mobile Notary / Brand Strategy",status:"Delivered",
    purpose:"Brand strategy for Emily\u2019s mobile notary service. Same DDL decomposition, different domain.",
    grain:"One brand element = one identity component \u00d7 audience \u00d7 channel",insight:"Two brand strategies for two businesses, built the same night. The engine doesn\u2019t care if it\u2019s cupcakes or notarizations.",spawned:"nomadic_notary.html brand strategy."},
  {id:"SYS-038",name:"DDL Project Construction Flow",domain:"Methodology / Build Process",status:"Documented",
    purpose:"The formalized build methodology itself. Phase 0 (Intent) through Phase 7+. The methodology as a system.",
    grain:"One phase = one build stage \u00d7 inputs \u00d7 outputs \u00d7 failure modes",insight:"The only DDL system that documents HOW to build DDL systems. The methodology as a product.",spawned:"Construction Flow v1.0 document."},
  {id:"SYS-039",name:"Prompt Strategy System (PSS)",domain:"Methodology / AI Collaboration",status:"Active (v0.1)",
    purpose:"Strategy library preserving how Dave works with AI. Repeatable strategies, patterns, decision rules. Deterministic, portable.",
    grain:"One row = one strategy \u00d7 outcome \u00d7 skill level \u00d7 domain",insight:"PSS is ACE applied to methodology instead of artifacts. Same governance: append-first, provenance, no canon wars. Different grain: strategy entries instead of custody records.",spawned:"v0.1 workbook. 25 entries. 8 packets. Governance framework."},
  {id:"SYS-040",name:"BlindSpot: D&D Campaign",domain:"Gaming / Campaign Analytics",status:"Architecture Designed",
    purpose:"Governed campaign management with dimensional analytics for D&D 5e. Dice distributions, quest velocity, spotlight balance, faction heat.",
    grain:"Multiple fact tables at different grains: dice rolls, sessions, quests, NPCs, combat rounds",insight:"Fourth domain application of the same engine (audit, betting, Steam, campaign). The real innovation: the Logic Glossary becomes the contract between Excel engine and LLM. The AI reads the dictionary, not the formulas. OBS-34 was born here.",spawned:"Pitch page. Local LLM setup guide. DnD_DM_Dex v1.0 (14 files)."},
  {id:"SYS-041",name:"BlindSpot: Steam",domain:"Gaming Analytics",status:"Architecture Designed",
    purpose:"Entertainment spending analytics. $/hour efficiency, completion rates, backlog velocity, impulse flagging.",
    grain:"One row = one game \u00d7 cost \u00d7 hours \u00d7 genre \u00d7 purchase context",insight:"Sale purchases have 28% play rate vs 61% for full-price. You play what you pay for.",spawned:"blindspot_steam.html dashboard."},
  {id:"SYS-042",name:"BlindSpot: Projects",domain:"Project Analytics",status:"Architecture Designed",
    purpose:"Meeting intelligence. Action item velocity, topic recurrence, stalled item detection.",
    grain:"One row = one action item \u00d7 project \u00d7 owner \u00d7 call \u00d7 week",insight:"Same gap detection that finds cold dice in D&D finds stalled action items in project meetings. OBS-30 doesn\u2019t care about the domain.",spawned:"BlindSpot Projects mockup."},
  {id:"SYS-043",name:"MindFrame",domain:"AI / Persona Calibration",status:"v3.x Frozen",
    purpose:"Persona calibration framework. Level-based testing, profiling, verification. Foundation for Council methodology.",
    grain:"One persona = one calibration profile \u00d7 model \u00d7 use case \u00d7 version",insight:"MindFrame solved \u2018I can\u2019t find an AI that matches my style.\u2019 Same architecture, different domain.",spawned:"MindFrame v3.x. Level-based testing. Profiling system."},
  {id:"SYS-044",name:"DexOS",domain:"AI / Cognitive Operating System",status:"v3.0",
    purpose:"Multi-model cognitive operating system. The governance layer above all DDL systems.",
    grain:"One interaction = one model \u00d7 persona \u00d7 task \u00d7 governance level",insight:"DexOS is the reason Dave can coordinate 9 models without losing coherence. It\u2019s not a product. It\u2019s the operating system that produces the products.",spawned:"DexOS v3.0 spec. Model protocols. Governance tiers."},
];

const standards: StandardEntry[] = [
  {id:"OBS-01",type:"OBS",name:"Governance at Creation",rule:"Build docs, naming, changelog alongside the first component. Governance is not retrofit."},
  {id:"OBS-02",type:"OBS",name:"Layered Separation Protocol",rule:"Data, Logic, Governance, Interface, and Integration must occupy distinct layers with no bleed between them."},
  {id:"OBS-03",type:"OBS",name:"Structural Resilience Bias",rule:"Choose architectures that survive partial failure over those optimized for ideal conditions."},
  {id:"OBS-04",type:"OBS",name:"Explicit Trace Mapping",rule:"Every output must trace back to its source through documented, auditable links."},
  {id:"OBS-05",type:"OBS",name:"Embedded Guardrail Enforcement",rule:"Constraints enforced structurally (validation, dropdowns, formulas) rather than by instruction or trust."},
  {id:"OBS-06",type:"OBS",name:"Pattern Lifecycle Stages",rule:"Every pattern, standard, and system must carry an explicit lifecycle status."},
  {id:"OBS-07",type:"OBS",name:"Instance vs. Invariant",rule:"Distinguish between a specific implementation (instance) and the underlying rule it demonstrates (invariant)."},
  {id:"OBS-08",type:"OBS",name:"Decontamination Principle",rule:"Separate raw input from governed output through a transformation layer that removes noise and contamination."},
  {id:"OBS-09",type:"OBS",name:"[Vacant \u2014 Reserved]",rule:"ID reserved for future assignment."},
  {id:"OBS-10",type:"OBS",name:"Composition Over Customization",rule:"Build from governed components rather than customizing monolithic structures."},
  {id:"OBS-11",type:"OBS",name:"Fixed Schema, Variable Content",rule:"The structure stays constant; only the data changes across instances."},
  {id:"OBS-12",type:"OBS",name:"Density Over Sprawl",rule:"Compress information into fewer, richer structures rather than spreading thin across many."},
  {id:"OBS-13",type:"OBS",name:"Controlled Write Layer Over Immutable Data",rule:"Source data is immutable. All modifications happen in a separate governed write layer."},
  {id:"OBS-14",type:"OBS",name:"Historical Anchoring",rule:"Preserve the original state alongside current state so changes can be measured against a fixed reference."},
  {id:"OBS-15",type:"OBS",name:"Execution Environment Declaration",rule:"Every system must declare its platform, version, and runtime constraints explicitly."},
  {id:"OBS-16",type:"OBS",name:"Intent Preservation Across Transforms",rule:"The original purpose survives every transformation, refactoring, and version change."},
  {id:"OBS-17",type:"OBS",name:"Reconciliation at Every Boundary",rule:"When data crosses a system boundary, reconcile totals on both sides before proceeding."},
  {id:"OBS-18",type:"OBS",name:"Graduated Complexity",rule:"Start simple. Add complexity only when the simpler version demonstrably fails."},
  {id:"OBS-19",type:"OBS",name:"Single Control Point",rule:"One parameter, one switch, one control surface drives all related behaviors."},
  {id:"OBS-20",type:"OBS",name:"Pre-Solved Decisions",rule:"Decisions that will always resolve the same way should be solved once and embedded as defaults."},
  {id:"OBS-21",type:"OBS",name:"Progressive Disclosure Architecture",rule:"Show the simplest surface first. Reveal depth only on demand."},
  {id:"OBS-22",type:"OBS",name:"Domain-Agnostic Pattern Application",rule:"The same structural pattern works across unrelated domains. Architecture doesn\u2019t care about content."},
  {id:"OBS-23",type:"OBS",name:"Involuntary Governance (Fingerprint)",rule:"Patterns Dave applies without conscious decision \u2014 involuntary expressions of how his brain structures information."},
  {id:"OBS-24",type:"OBS",name:"Audience-Surface Separation",rule:"The same data serves different audiences through different surfaces. Engine computes once; presentation varies."},
  {id:"OBS-25",type:"OBS",name:"Artifact-First Documentation",rule:"Every process produces a persistent artifact. If it wasn\u2019t documented, it didn\u2019t happen."},
  {id:"OBS-26",type:"OBS",name:"Compaction Without Loss",rule:"Reduce volume while preserving every essential signal. Compression, not truncation."},
  {id:"OBS-27",type:"OBS",name:"Adversarial Review Before Lock",rule:"Stress-test through adversarial challenge before finalizing. The council red team, not the council rubber stamp."},
  {id:"OBS-28",type:"OBS",name:"No Reverse Flow",rule:"Data flows in one direction. Downstream consumers read from upstream producers but never write back."},
  {id:"OBS-29",type:"OBS",name:"Non-Goals as Build Contract",rule:"Define what the system will NOT do before building. Non-goals prevent scope drift and set expectations."},
  {id:"OBS-30",type:"OBS",name:"Gap Detection as Primary Feature",rule:"The system\u2019s primary value is showing what\u2019s missing, not what\u2019s present. The blind spots ARE the feature."},
  {id:"OBS-31",type:"OBS",name:"Counterfeit Pattern Recognition",rule:"When solving for the wrong version of the right outcome, replace the counterfeit mechanism with a governed one."},
  {id:"OBS-32",type:"OBS",name:"Borrowed Logic Detection",rule:"When a constraint has been imported from a different context, evaluate it against the actual reality of its new environment."},
  {id:"OBS-33",type:"OBS",name:"Provenance Spine on Every Output",rule:"Every output carries who/when/what-run/what-source/what-confidence. Outputs without provenance are ungoverned."},
  {id:"OBS-34",type:"OBS",name:"Semantic Contract as AI Governance",rule:"The semantic layer (glossary, schema, taxonomy) IS the contract between data engine and AI interpreter."},
  {id:"OBS-35",type:"OBS",name:"Operational Constraint as Architecture Filter",rule:"Hard constraints eliminate bad options faster than analysis. Systems designed around constraints are more resilient."},
  {id:"OBS-36",type:"OBS",name:"IP Preservation by Architecture",rule:"Architecture protects IP structurally \u2014 the engine never needs to see the secret to provide value."},
  {id:"OBS-37",type:"OBS",name:"Synthetic Data as Proof of Concept",rule:"Ship with realistic synthetic data so the client reacts to a working product, not a spec."},
  {id:"PRO-01",type:"PRO",name:"OEMI-TABS (Operational Engine Model)",rule:"Every DDL system follows: Observe, Extract, Model, Implement \u2014 across Tabs, Architecture, Backend, Surface layers."},
  {id:"PRO-02",type:"PRO",name:"Star Schema as Default Architecture",rule:"Fact tables with dimension tables. Not optional. The default structural choice for any analytical system."},
  {id:"PRO-03",type:"PRO",name:"Reconciliation at Every Summary Surface",rule:"Every aggregation must visibly reconcile back to source. \u2018Out of Balance\u2019 is the first thing you see."},
  {id:"REC-01",type:"REC",name:"Cognitive Load Budgeting",rule:"Track mental effort as a finite resource. Allocate it deliberately."},
  {id:"REC-02",type:"REC",name:"Fractal Self-Similarity",rule:"The same patterns appear at every scale \u2014 cell, sheet, workbook, system, portfolio."},
  {id:"REC-03",type:"REC",name:"Silence as Signal",rule:"What\u2019s NOT said or NOT present carries information. The absence IS the data."},
  {id:"REC-04",type:"REC",name:"Convergence as Validation Signal",rule:"When independent sources agree without coordination, confidence increases."},
  {id:"REC-05",type:"REC",name:"Canonical Naming as Governance",rule:"Naming is the first act of governance. A thing named is a thing that can be tracked, versioned, and retired."},
  {id:"REC-06",type:"REC",name:"Build Sequence as Dependency Declaration",rule:"The order you build things declares their dependency structure."},
  {id:"REC-07",type:"REC",name:"Version Anchor in Every Output",rule:"Every exported artifact carries its version, date, and source system."},
  {id:"REC-08",type:"REC",name:"Self-Consuming Systems",rule:"Systems that govern themselves using their own standards."},
  {id:"REC-09",type:"REC",name:"Grief Architecture",rule:"Systems for processing loss have the same dimensional structure as systems for processing data."},
  {id:"REC-10",type:"REC",name:"Temporal Layering",rule:"Past, present, and future states as explicit dimensions rather than overwritten values."},
  {id:"REC-11",type:"REC",name:"Operational Proof as Epilogue",rule:"A system\u2019s running state is the proof. More compelling AFTER the narrative of how it was built."},
  {id:"REC-12",type:"REC",name:"Diagnostic Reframe (Not Broken, Uncalibrated)",rule:"Chronic dysfunction = calibration failure, not fundamental defect. The architecture may be sound."},
  {id:"REC-13",type:"REC",name:"Independent Architectural Review",rule:"Decisions gain confidence from review by party outside the build team with no shared vocabulary."},
  {id:"REC-14",type:"REC",name:"Trust Derivation from Execution Metadata",rule:"Trust tier computed from audit trail, not human judgment."},
  {id:"REC-15",type:"REC",name:"Invariant Test Harness as Governance Proof",rule:"Governance claims unverified until test harness proves constraints enforce, not just define."},
  {id:"REC-16",type:"REC",name:"State Lifecycle as Artifact Governance",rule:"Artifacts carry lifecycle status (Draft \u2192 Active \u2192 Frozen \u2192 Archived) constraining permitted operations."},
  {id:"REC-17",type:"REC",name:"Buffered Write with Explicit Flush",rule:"Live state accumulates in buffer; writes only on explicit trigger. Prevents partial writes."},
  {id:"REC-18",type:"REC",name:"Clean Failure Over Silent Acceptance",rule:"Invalid input fails loudly with human-readable message. The failure message IS the governance surface."},
  {id:"REC-19",type:"REC",name:"Schema-Level Over Application-Only Constraint",rule:"CHECK, ENUM, NOT NULL at schema level in addition to application enforcement. Defense in depth."},
  {id:"VEH-01",type:"VEH",name:"Excel as Governed Platform",rule:"Excel workbooks as the primary delivery vehicle for DDL analytical systems. Not a limitation \u2014 a choice."},
  {id:"VEH-02",type:"VEH",name:"HTML as Portfolio Surface",rule:"Single-file HTML applications as client-facing dashboards and pitch pages."},
  {id:"VEH-03",type:"VEH",name:"Word Documents as Registry Medium",rule:"Governed Word documents for registries, specifications, and formal records."},
  {id:"VEH-04",type:"VEH",name:"Substack as Publication Vehicle",rule:"Weekly Substack as the public-facing surface for BTS memoir content."},
  {id:"VEH-05",type:"VEH",name:"Certified Mail as Governance",rule:"\u2018Sometimes love is certified mail.\u2019 Emily\u2019s disability appeal \u2014 governance shows up as care."},
  {id:"VEH-06",type:"VEH",name:"DnD_DM_Dex v1.0",rule:"14-file governed campaign architecture. Data-generating runtime for BlindSpot: D&D analytics."},
];

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════

function getStatusClass(s: string): string {
  const lower = s.toLowerCase();
  if (lower.includes('active') || lower.includes('v3') || lower.includes('phase 1') || lower.includes('day 2')) return 'status-active';
  if (lower.includes('delivered') || lower.includes('draft complete') || lower.includes('documented')) return 'status-delivered';
  if (lower.includes('design') || lower.includes('architecture') || lower.includes('seasonal')) return 'status-design';
  return 'status-prebuild';
}

const TYPE_LABELS: Record<string, string> = {
  OBS: 'Observed Standard',
  PRO: 'Promoted Standard (Enforceable)',
  REC: 'Watchlist Candidate',
  VEH: 'Vehicle',
};

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

export default function RegistryPage() {
  const [activeTab, setActiveTab] = useState('systems');
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [modalData, setModalData] = useState<any>(null);
  const [modalType, setModalType] = useState<'system' | 'standard'>('system');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const domains = useMemo(() => {
    const d = Array.from(new Set(systems.map(s => s.domain.split(' / ')[0]))).sort();
    return ['All', ...d];
  }, []);

  const filteredSystems = useMemo(() => {
    return systems.filter(s => {
      const matchesSearch = !search || [s.id, s.name, s.domain, s.purpose, s.status].some(f => f.toLowerCase().includes(search.toLowerCase()));
      const matchesDomain = domainFilter === 'All' || s.domain.includes(domainFilter);
      return matchesSearch && matchesDomain;
    });
  }, [search, domainFilter]);

  const filteredStandards = useCallback((type: string) => {
    return standards.filter(s => {
      const matchesType = s.type === type;
      const matchesSearch = !search || [s.id, s.name, s.rule].some(f => f.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [search]);

  const openSysModal = (id: string) => {
    const s = systems.find(x => x.id === id);
    if (s) { setModalData(s); setModalType('system'); }
  };

  const openStdModal = (id: string) => {
    const s = standards.find(x => x.id === id);
    if (s) { setModalData(s); setModalType('standard'); }
  };

  const closeModal = () => setModalData(null);

  const tabs = [
    { id: 'systems', label: 'Systems', count: 44 },
    { id: 'obs', label: 'OBS', count: 37 },
    { id: 'pro', label: 'PRO', count: 3 },
    { id: 'rec', label: 'REC', count: 19 },
    { id: 'veh', label: 'VEH', count: 6 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap');

        .registry-root {
          background: #141F33;
          color: #F5F4F2;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }
        .registry-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(151,7,47,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 1s ease forwards; }
        .fade-up-1 { animation-delay: 0.2s; }
        .fade-up-2 { animation-delay: 0.5s; }
        .fade-up-3 { animation-delay: 0.8s; }
        .fade-up-4 { animation-delay: 1.1s; }
        .fade-up-5 { animation-delay: 1.4s; }

        .hero-logo {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 6px;
          text-transform: uppercase;
          position: relative; z-index: 1;
        }
        .hero-logo span { color: #B23531; }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(48px, 8vw, 96px);
          line-height: 1;
          text-align: center;
          position: relative; z-index: 1;
        }
        .hero-sub {
          font-size: 18px; color: #8A8E94;
          position: relative; z-index: 1;
          text-align: center;
        }
        .hero-counts {
          display: flex; gap: 40px;
          position: relative; z-index: 1;
        }
        .count-num {
          font-family: 'DM Serif Display', serif;
          font-size: 42px; color: #B23531;
          text-align: center;
        }
        .count-label {
          font-size: 11px; letter-spacing: 3px;
          text-transform: uppercase; color: #8A8E94;
          text-align: center;
        }
        .hero-tagline {
          font-size: 13px; letter-spacing: 4px; color: #97072F;
          position: relative; z-index: 1;
        }
        .scroll-hint {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          z-index: 1;
        }
        .scroll-hint::after {
          content: '';
          display: block; width: 1px; height: 40px;
          background: linear-gradient(to bottom, #B23531, transparent);
          margin: 8px auto 0;
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { height: 40px; opacity: 0.5; }
          50% { height: 60px; opacity: 1; }
        }

        .reg-nav {
          position: sticky; top: 60px; z-index: 90;
          background: rgba(20,31,51,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(178,53,49,0.2);
          padding: 0 40px;
          display: flex; align-items: center; height: 56px; gap: 8px;
          overflow-x: auto;
        }
        .reg-nav-brand {
          font-size: 11px; font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; margin-right: 40px; white-space: nowrap;
        }
        .reg-nav-brand span { color: #B23531; }
        .reg-tab {
          padding: 16px 20px; font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; color: #8A8E94;
          border: none; background: none;
          border-bottom: 2px solid transparent;
          transition: all 0.3s; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .reg-tab:hover { color: #F5F4F2; }
        .reg-tab.active { color: #F5F4F2; border-bottom-color: #B23531; }

        .reg-search {
          margin-left: auto;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 8px 16px; color: #F5F4F2;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; width: 240px; outline: none;
          transition: all 0.3s;
        }
        .reg-search:focus {
          border-color: #B23531;
          background: rgba(255,255,255,0.08);
          width: 320px;
        }
        .reg-search::placeholder { color: #8A8E94; }

        .section-area {
          padding: 60px 40px 120px;
          max-width: 1400px; margin: 0 auto;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 36px; margin-bottom: 8px;
        }
        .section-count {
          font-size: 13px; color: #8A8E94; letter-spacing: 2px;
          margin-bottom: 32px;
        }

        .filters {
          display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap;
        }
        .filter-btn {
          padding: 6px 16px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: #8A8E94;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 1px;
          cursor: pointer; transition: all 0.3s;
        }
        .filter-btn:hover { border-color: #B23531; color: #F5F4F2; }
        .filter-btn.active { background: #B23531; border-color: #B23531; color: #FFF; }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }
        @media (max-width: 500px) { .card-grid { grid-template-columns: 1fr; } }

        .card {
          background: rgba(245,244,242,0.03);
          border: 1px solid rgba(178,53,49,0.15);
          border-radius: 12px; padding: 28px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #B23531, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .card:hover {
          border-color: rgba(178,53,49,0.4);
          transform: translateY(-2px);
          background: rgba(245,244,242,0.05);
        }
        .card:hover::before { opacity: 1; }

        .card-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #B23531;
          letter-spacing: 2px; margin-bottom: 8px;
        }
        .card-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; margin-bottom: 12px; line-height: 1.3;
        }
        .card-domain {
          font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; color: #8A8E94; margin-bottom: 12px;
        }
        .card-desc {
          font-size: 14px; color: rgba(245,244,242,0.7);
          line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-status {
          display: inline-block; margin-top: 16px;
          padding: 4px 12px; border-radius: 12px;
          font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; font-weight: 500;
        }
        .status-active { background: rgba(46,125,50,0.15); color: #66BB6A; border: 1px solid rgba(46,125,50,0.3); }
        .status-delivered { background: rgba(178,53,49,0.15); color: #E57373; border: 1px solid rgba(178,53,49,0.3); }
        .status-design { background: rgba(255,183,77,0.15); color: #FFB74D; border: 1px solid rgba(255,183,77,0.3); }
        .status-prebuild { background: rgba(138,142,148,0.15); color: #8A8E94; border: 1px solid rgba(138,142,148,0.3); }

        .std-type {
          display: inline-block; padding: 3px 10px; border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 500; letter-spacing: 1px;
        }
        .type-obs { background: rgba(178,53,49,0.2); color: #E57373; }
        .type-pro { background: rgba(46,125,50,0.2); color: #66BB6A; }
        .type-rec { background: rgba(255,183,77,0.2); color: #FFB74D; }
        .type-veh { background: rgba(100,181,246,0.2); color: #64B5F6; }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(9,15,56,0.85);
          backdrop-filter: blur(12px);
          z-index: 200; overflow-y: auto; padding: 60px 40px;
        }
        .modal {
          max-width: 800px; margin: 0 auto;
          background: rgba(20,31,51,0.95);
          border: 1px solid rgba(178,53,49,0.15);
          border-radius: 16px; padding: 48px;
          position: relative;
          animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-close {
          position: absolute; top: 20px; right: 24px;
          background: none; border: none; color: #8A8E94;
          font-size: 24px; cursor: pointer;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .modal-close:hover { color: #F5F4F2; background: rgba(255,255,255,0.05); }
        .modal-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; color: #B23531;
          letter-spacing: 3px; margin-bottom: 8px;
        }
        .modal-name {
          font-family: 'DM Serif Display', serif;
          font-size: 32px; margin-bottom: 8px; line-height: 1.2;
        }
        .modal-meta {
          font-size: 12px; color: #8A8E94;
          letter-spacing: 1px; margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .modal-field { margin-bottom: 20px; }
        .modal-label {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #B23531; margin-bottom: 6px; font-weight: 700;
        }
        .modal-value {
          font-size: 15px; line-height: 1.7;
          color: rgba(245,244,242,0.85);
        }
        .modal-insight {
          font-style: italic; color: #97072F;
          border-left: 2px solid #97072F;
          padding-left: 16px; margin: 4px 0;
          font-size: 15px; line-height: 1.7;
          filter: brightness(1.4);
        }
      `}</style>

      <div className="registry-root" style={{ paddingTop: '60px' }}>
        {/* HERO */}
        <div className="hero-section">
          <div className={`hero-logo fade-up fade-up-1`} style={{ marginBottom: 60 }}>
            DROP DOWN <span>LOGISTICS</span>
          </div>
          <h1 className={`hero-title fade-up fade-up-2`}>Registry v2.1</h1>
          <p className={`hero-sub fade-up fade-up-3`} style={{ marginTop: 24, letterSpacing: 1 }}>
            The governed inventory of everything DDL has built, observed, and formalized.
          </p>
          <div className={`hero-counts fade-up fade-up-4`} style={{ marginTop: 60 }}>
            <div><div className="count-num">44</div><div className="count-label">Systems</div></div>
            <div><div className="count-num">37</div><div className="count-label">OBS</div></div>
            <div><div className="count-num">3</div><div className="count-label">PRO</div></div>
            <div><div className="count-num">19</div><div className="count-label">REC</div></div>
            <div><div className="count-num">6</div><div className="count-label">VEH</div></div>
          </div>
          <div className={`hero-tagline fade-up fade-up-5`} style={{ marginTop: 80 }}>
            CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
          </div>
          <div className="scroll-hint fade-up fade-up-5" />
        </div>

        {/* NAV */}
        <div className="reg-nav">
          <div className="reg-nav-brand">DDL <span>REGISTRY</span></div>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`reg-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(t.id); setDomainFilter('All'); }}
            >
              {t.label}
            </button>
          ))}
          <input
            className="reg-search"
            type="text"
            placeholder="Search registry..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* SYSTEMS TAB */}
        {activeTab === 'systems' && (
          <div className="section-area">
            <h2 className="section-title">Systems Registry</h2>
            <div className="section-count">44 systems documented across 15+ domains</div>
            <div className="filters">
              {domains.map(d => (
                <button
                  key={d}
                  className={`filter-btn ${domainFilter === d ? 'active' : ''}`}
                  onClick={() => setDomainFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="card-grid">
              {filteredSystems.map(s => (
                <div key={s.id} className="card" onClick={() => openSysModal(s.id)}>
                  <div className="card-id">{s.id}</div>
                  <div className="card-name">{s.name}</div>
                  <div className="card-domain">{s.domain}</div>
                  <div className="card-desc">{s.purpose}</div>
                  <div className={`card-status ${getStatusClass(s.status)}`}>{s.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STANDARDS TABS */}
        {['obs', 'pro', 'rec', 'veh'].includes(activeTab) && (
          <div className="section-area">
            <h2 className="section-title">
              {activeTab === 'obs' ? 'Observed Standards' :
               activeTab === 'pro' ? 'Promoted Standards' :
               activeTab === 'rec' ? 'REC Watchlist' : 'Vehicles'}
            </h2>
            <div className="section-count">
              {activeTab === 'obs' ? '37 standards extracted from operational evidence' :
               activeTab === 'pro' ? '3 enforceable build requirements' :
               activeTab === 'rec' ? '19 candidates awaiting promotion evidence' :
               '6 governed delivery mechanisms'}
            </div>
            <div className="card-grid">
              {filteredStandards(activeTab.toUpperCase()).map(s => (
                <div key={s.id} className="card" onClick={() => openStdModal(s.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span className={`std-type type-${s.type.toLowerCase()}`}>{s.type}</span>
                    <span className="card-id" style={{ margin: 0 }}>{s.id}</span>
                  </div>
                  <div className="card-name">{s.name}</div>
                  <div className="card-desc">{s.rule}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL */}
        {modalData && (
          <div className="modal-overlay" onClick={e => { if ((e.target as HTMLElement).className.includes('modal-overlay')) closeModal(); }}>
            <div className="modal">
              <button className="modal-close" onClick={closeModal}>&times;</button>
              {modalType === 'system' ? (
                <>
                  <div className="modal-id">{modalData.id}</div>
                  <div className="modal-name">{modalData.name}</div>
                  <div className="modal-meta">{modalData.domain} &middot; {modalData.status}</div>
                  <div className="modal-field"><div className="modal-label">PURPOSE</div><div className="modal-value">{modalData.purpose}</div></div>
                  <div className="modal-field"><div className="modal-label">GRAIN</div><div className="modal-value">{modalData.grain}</div></div>
                  <div className="modal-field"><div className="modal-label">DEXINSIGHT</div><div className="modal-insight">{modalData.insight}</div></div>
                  <div className="modal-field"><div className="modal-label">SPAWNED</div><div className="modal-value">{modalData.spawned}</div></div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span className={`std-type type-${modalData.type.toLowerCase()}`} style={{ fontSize: 12, padding: '4px 14px' }}>{modalData.type}</span>
                    <div className="modal-id" style={{ margin: 0 }}>{modalData.id}</div>
                  </div>
                  <div className="modal-name">{modalData.name}</div>
                  <div className="modal-meta">{TYPE_LABELS[modalData.type] || modalData.type}</div>
                  <div className="modal-field">
                    <div className="modal-label">{modalData.type === 'VEH' ? 'DESCRIPTION' : 'CORE RULE'}</div>
                    <div className="modal-value">{modalData.rule}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
