'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
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
// ALL 25 STRATEGIES
// ═══════════════════════════════════════════════════════════
const strategies = [
  // ─── Getting Unstuck (5) ───
  { id: "PSS_0010", title: "Meme-as-Go-Signal", packet: "Getting Unstuck", skillLevel: 1,
    outcome: "Immediate build execution triggered by contextual meme/image",
    whenToUse: "When the operator drops a meme or image that clearly signals 'stop talking, start building'",
    procedure: "1. Read the signal. 2. Don't ask clarifying questions. 3. Don't summarize what you're about to do. 4. Build the thing. 5. Ship it.",
    guardrails: "Don't overthink it. Don't ask 'are you sure?' The meme IS the project plan.",
    failureSignals: "You responded with a paragraph before building. You asked a clarifying question.",
    domainTags: ["#workflow", "#communication"], patternTags: ["+signal-reading", "+execution"], toneTags: ["%efficient", "%playful"],
    provenance: "'I'm still gonna send it' → immediate build, 2025-12", status: "Active" },

  { id: "PSS_0013", title: "Hyperfocus Sprint Protocol", packet: "Getting Unstuck", skillLevel: 2,
    outcome: "Complete, shippable system built in a single compressed session (4-12 hours)",
    whenToUse: "When you have a clear vision, blocked calendar, and the energy to go deep. Weekend sessions are the sweet spot.",
    procedure: "1. Define the deliverable before starting — not 'explore X' but 'build X and ship it.' 2. Front-load all reference material (tokens, data, prior art) in the first 10 minutes. 3. Build sequentially — don't context-switch between components. 4. Ship each piece as you finish it, don't batch at the end. 5. If compaction hits, use the summary to maintain velocity, don't restart.",
    guardrails: "Don't start without a clear end state. Don't try to build 'the whole thing' if the scope is unbounded. Set a session ceiling (12h max). Hydrate.",
    failureSignals: "You're 3 hours in and haven't shipped anything. Scope has expanded twice. You're redesigning instead of building.",
    domainTags: ["#workflow", "#productivity"], patternTags: ["+sprint", "+deep-work", "+shipping"], toneTags: ["%focused"],
    provenance: "DDL pattern — Assurance Map (3 days), Year-End Recap (1 session, 5 pages)", status: "Active" },

  { id: "PSS_0017", title: "Build First, Ask Permission Never", packet: "Getting Unstuck", skillLevel: 3,
    outcome: "Working prototype that demonstrates value before stakeholders can say no",
    whenToUse: "When you know the solution but approval processes would kill momentum. When the org has a problem nobody's solved because nobody's tried.",
    procedure: "1. Identify a real pain point that's been unsolved for months/years. 2. Build a working prototype on your own time (weeknight/weekend). 3. Make it good enough to demo, not perfect. 4. Show it to the decision-maker with zero preamble — 'I built this, want to see it?' 5. Let the artifact argue for itself.",
    guardrails: "Don't build something nobody asked for in a domain you don't understand. Don't spend more than a weekend on the proof-of-concept. Don't present it as 'done' — present it as 'possible.'",
    failureSignals: "You built something clever that solves no real problem. The stakeholder feels ambushed rather than impressed. You over-invested before validation.",
    domainTags: ["#strategy", "#stakeholder", "#career"], patternTags: ["+prototype", "+initiative", "+demonstration"], toneTags: ["%bold"],
    provenance: "Assurance Map — solved a 6-year organizational problem in 3 days, demoed to Chief Audit Executive", status: "Active" },

  { id: "PSS_0022", title: "The Overnight Proof", packet: "Getting Unstuck", skillLevel: 3,
    outcome: "Credibility-establishing deliverable that shifts perception of what's possible",
    whenToUse: "When someone doubts the methodology, the timeline, or the capability. When you need to prove the system works, not explain it.",
    procedure: "1. Pick the hardest or most visible version of the problem. 2. Build it overnight / over a weekend using your full toolkit. 3. Document the build time explicitly ('built in 3 days'). 4. Present the output, not the process. 5. Only explain methodology after they've seen the result.",
    guardrails: "Don't sacrifice quality for speed — the output must be genuinely good. Don't explain the method before the demo. Don't do this for every project — reserve for high-leverage moments.",
    failureSignals: "The output is impressive but doesn't solve the actual problem. Speed becomes the story instead of value. You burn out doing this repeatedly.",
    domainTags: ["#strategy", "#credibility"], patternTags: ["+demonstration", "+proof-of-concept"], toneTags: ["%confident"],
    provenance: "Assurance Map demo, DDL methodology demonstrations", status: "Active" },

  { id: "PSS_0025", title: "Restart from Last Shipped Artifact", packet: "Getting Unstuck", skillLevel: 1,
    outcome: "Clean recovery from a stalled or confused session by anchoring to the last concrete output",
    whenToUse: "When a conversation has drifted, context is muddy, or you've lost the thread of what you were building",
    procedure: "1. Stop the current thread of discussion. 2. Identify the last thing that was actually shipped/completed. 3. State it explicitly: 'The last thing we shipped was X.' 4. Ask 'What's next?' instead of trying to reconstruct the path. 5. Resume building from there.",
    guardrails: "Don't try to reconstruct the entire conversation. Don't apologize for the drift. Don't re-debate decisions already shipped.",
    failureSignals: "You're spending more time reconstructing than building. The restart requires re-explaining context that should be implicit.",
    domainTags: ["#workflow", "#session-mgmt"], patternTags: ["+recovery", "+anchoring"], toneTags: ["%efficient"],
    provenance: "Standard DDL session recovery pattern", status: "Active" },

  // ─── Specification to Build (5) ───
  { id: "PSS_0004", title: "Design System Token Reuse", packet: "Specification to Build", skillLevel: 2,
    outcome: "Consistent visual identity across multiple independently-built pages",
    whenToUse: "When building multiple pages/components that need to look like the same site without a shared codebase",
    procedure: "1. Define tokens once in a reference file. 2. Load the token file at session start. 3. Copy constants into each new component. 4. Reference tokens by semantic name, never hex. 5. Maintain consistent component patterns across pages.",
    guardrails: "Never hardcode a color. Don't drift component patterns between pages. If you add a new token, update the reference.",
    failureSignals: "Pages use different hex values for 'the same' color. A new page 'feels different' despite the same palette.",
    domainTags: ["#design", "#frontend", "#governance"], patternTags: ["+design-system", "+token-reuse"], toneTags: ["%systematic"],
    provenance: "CottageHumble design system, DDL site builds", status: "Active" },

  { id: "PSS_0006", title: "Template-Driven Page Generation", packet: "Specification to Build", skillLevel: 3,
    outcome: "Production-quality page matching a predefined template pattern from raw data",
    whenToUse: "When you have a named template and data to fill it",
    procedure: "1. Identify which template fits (CONSOLE, ATLAS, LEDGER, DOSSIER, CHRONICLE, CODEX). 2. Load design tokens. 3. Structure data into template slots. 4. Build in one pass with all data embedded. 5. Add insights as callout components between data sections.",
    guardrails: "Don't mix template patterns. Don't leave placeholder data. Every section needs real content or gets cut.",
    failureSignals: "Template feels forced. KPIs are vanity metrics. Analysis callouts are generic.",
    domainTags: ["#design", "#frontend", "#systems"], patternTags: ["+template", "+page-gen"], toneTags: ["%systematic"],
    provenance: "DDL site build sessions, 6 template types", status: "Active" },

  { id: "PSS_0012", title: "Artifact Classification & Site Mapping", packet: "Specification to Build", skillLevel: 2,
    outcome: "Clear taxonomy of outputs mapped to templates, sections, and cross-references",
    whenToUse: "When a build session produces multiple artifacts that need cataloging",
    procedure: "1. List all outputs with filenames. 2. Match each to template type. 3. Assign site section. 4. Write one-line description. 5. Identify cross-references. 6. Output as structured table.",
    guardrails: "Don't force-fit templates. Cross-references must be bidirectional. Don't create sections with only one page.",
    failureSignals: "Template assignment is arbitrary. Cross-references miss obvious connections.",
    domainTags: ["#governance", "#systems", "#catalog"], patternTags: ["+classification", "+taxonomy"], toneTags: ["%systematic"],
    provenance: "Year-End Recap session — 3 pages classified", status: "Active" },

  { id: "PSS_0014", title: "Chaos → Structured → Automated Pipeline", packet: "Specification to Build", skillLevel: 3,
    outcome: "Unstructured input transformed into a governed, repeatable system",
    whenToUse: "When starting from raw chaos (notes, screenshots, conversations, ideas) and need to arrive at a production artifact",
    procedure: "1. CHAOS: Dump everything — don't filter, don't organize. Get it all out. 2. STRUCTURED: Identify the schema. What are the entities? What are the relationships? What repeats? 3. Name the fields. Build the table. Tag the records. 4. AUTOMATED: Create the template, the process, the reusable pattern. 5. Document the transformation so it's replayable.",
    guardrails: "Don't skip to Automated — the Structured phase is where the real work happens. Don't over-structure in phase 2 — find the natural shape first. Don't automate something you've only done once.",
    failureSignals: "You're automating a process you don't yet understand. The structure doesn't match the actual data. You skipped Chaos and started with assumptions.",
    domainTags: ["#methodology", "#systems", "#governance"], patternTags: ["+pipeline", "+transformation"], toneTags: ["%systematic", "%governance"],
    provenance: "Core DDL methodology — applied across 44 systems", status: "Active" },

  { id: "PSS_0016", title: "Domain Expert Bootstrapping", packet: "Specification to Build", skillLevel: 3,
    outcome: "AI rapidly learns a new domain well enough to build useful tools for it",
    whenToUse: "When building a system for a domain you (or the AI) don't deeply know — veterinary scheduling, cocktail programs, betting analytics",
    procedure: "1. Provide the domain's core vocabulary and constraints upfront. 2. Have the AI ask clarifying questions before building (this is one of the few times questions-before-building is correct). 3. Build a minimal first version. 4. Review with domain context — flag what's wrong, what's missing. 5. Iterate with corrections. The AI learns the domain through the build, not through study.",
    guardrails: "Don't assume the AI knows domain-specific rules. Don't skip the review step. Don't accept 'good enough' on domain accuracy — users will know.",
    failureSignals: "The tool works technically but misses domain logic (vet appointments need different durations by type). The AI confidently builds something wrong.",
    domainTags: ["#ai", "#domain-learning", "#tools"], patternTags: ["+bootstrapping", "+domain-transfer"], toneTags: ["%collaborative"],
    provenance: "VetSchedule, Drinks-O-System, BlindSpot — three different domains bootstrapped", status: "Active" },

  // ─── Data Cleanup & Structuring (5) ───
  { id: "PSS_0003", title: "Screenshot-to-Structured-Data Extraction", packet: "Data Cleanup & Structuring", skillLevel: 2,
    outcome: "Clean ranked data tables from platform screenshot images",
    whenToUse: "When platforms provide data as images and you need structured output",
    procedure: "1. Upload screenshots with explicit extraction instructions. 2. Request specific output format. 3. Flag confidence levels for compressed images. 4. Cross-reference across screenshots. 5. Build verification step.",
    guardrails: "Don't assume OCR is perfect. Don't combine screenshots without noting provenance. Flag low-confidence values.",
    failureSignals: "Model hallucinates data not in the image. Rankings get shuffled. Values get rounded without flagging.",
    domainTags: ["#data", "#extraction"], patternTags: ["+image-to-data", "+structured-output"], toneTags: ["%precise"],
    provenance: "Apple Music Replay — 5 screenshots → 84 songs + 20 artists + 15 albums", status: "Active" },

  { id: "PSS_0005", title: "Platform-Agnostic Data Normalization", packet: "Data Cleanup & Structuring", skillLevel: 3,
    outcome: "Unified cross-platform comparison from heterogeneous data sources",
    whenToUse: "When comparing behavior across platforms with different schemas and units",
    procedure: "1. Extract each platform's data with native units. 2. Identify comparable dimensions. 3. Normalize where possible but don't force false equivalences. 4. Note gaps explicitly. 5. Build comparison on behavioral patterns, not raw numbers.",
    guardrails: "Don't invent data. Don't equate different metrics. Label unreported metrics honestly.",
    failureSignals: "Forcing charts where units aren't comparable. Estimating unreported metrics.",
    domainTags: ["#data", "#analytics", "#cross-platform"], patternTags: ["+normalization", "+comparison"], toneTags: ["%analytical", "%honest"],
    provenance: "Annual Signal Report — 4 platforms unified", status: "Active" },

  { id: "PSS_0008", title: "Behavioral Pattern Extraction", packet: "Data Cleanup & Structuring", skillLevel: 3,
    outcome: "Cross-domain behavioral insights from quantitative data",
    whenToUse: "When raw data reveals behavioral patterns not obvious from single metrics",
    procedure: "1. Look for concentration/dominance patterns. 2. Look for repetition across platforms. 3. Look for tight clusters suggesting systematic behavior. 4. Look for absence patterns. 5. Name the pattern and write it as an insight callout.",
    guardrails: "Don't over-interpret single data points. Don't psychoanalyze — describe behavior, not motivation.",
    failureSignals: "Insights are restatements of data. Patterns are forced. Analysis sounds like a horoscope.",
    domainTags: ["#analytics", "#behavioral"], patternTags: ["+pattern-extraction", "+cross-domain"], toneTags: ["%analytical"],
    provenance: "'Deep commitment, narrow focus' pattern across 4 platforms", status: "Active" },

  { id: "PSS_0015", title: "Star Schema Thinking for Non-DB Domains", packet: "Data Cleanup & Structuring", skillLevel: 4,
    outcome: "Dimensional modeling principles applied to organize any complex information space",
    whenToUse: "When a domain has messy, interconnected information that needs structure — not just databases, but knowledge systems, content libraries, governance frameworks",
    procedure: "1. Identify the fact table — what's the central event or transaction? (a song played, a strategy used, a control tested). 2. Identify the dimensions — what context surrounds the fact? (artist, genre, date, platform). 3. Define the grain — what's one row? 4. Build the dimension tables with their attributes. 5. Let the star schema reveal the natural query patterns.",
    guardrails: "Not everything is a star schema — don't force it on simple lists. The grain decision is the most important one; get it wrong and everything downstream is wrong. Don't nest too deep — star schemas are flat by design.",
    failureSignals: "You can't clearly state what 'one row' is. Dimensions overlap or duplicate. The schema doesn't suggest any natural queries.",
    domainTags: ["#data", "#architecture", "#modeling"], patternTags: ["+star-schema", "+dimensional", "+structure"], toneTags: ["%systematic", "%governance"],
    provenance: "Excelligence (Excel knowledge graph), DDL system architecture, Assurance Map", status: "Active" },

  { id: "PSS_0024", title: "Tag Taxonomy Bootstrap", packet: "Data Cleanup & Structuring", skillLevel: 2,
    outcome: "Consistent, extensible tagging system for a new registry or index",
    whenToUse: "When starting a new index/registry and you need tags that will scale without collapsing into chaos",
    procedure: "1. Define tag prefixes by category (# for domain, + for pattern, % for tone, ~ for status). 2. Seed with 5-10 tags per category from your first batch of entries. 3. Review tags after 20 entries — consolidate synonyms, split overloaded tags. 4. Document the tag definitions in a reference. 5. Enforce prefixes strictly — a tag without a prefix is a tag that will drift.",
    guardrails: "Don't create tags speculatively — only tag what exists. Don't allow free-text tags without prefixes. Review and consolidate every 20 entries.",
    failureSignals: "Tags proliferate without consolidation. Same concept tagged three different ways. Tags become so granular they're unsearchable.",
    domainTags: ["#governance", "#taxonomy", "#systems"], patternTags: ["+tagging", "+bootstrap", "+indexing"], toneTags: ["%systematic"],
    provenance: "PSS tag system (# + % ~), DDL registry design", status: "Active" },

  // ─── Tone Calibration (4) ───
  { id: "PSS_0009", title: "Audit Language as Narrative Frame", packet: "Tone Calibration", skillLevel: 4,
    outcome: "Technical content presented with governance-grade credibility and dry humor",
    whenToUse: "When the subject is an auditor/CPA and the content benefits from audit terminology as structure and tone",
    procedure: "1. Map content to audit phases (planning, fieldwork, reporting). 2. Use terminology accurately. 3. Structure findings as condition/criteria/cause/effect. 4. End with formal opinion that's technically sound AND entertaining. 5. Let the frame carry humor without forcing jokes.",
    guardrails: "Don't misuse audit terms. Don't make it parody. The humor comes from applying rigor to informal content.",
    failureSignals: "Audit terms used decoratively. The frame feels forced. It becomes a bit rather than a structure.",
    domainTags: ["#audit", "#writing", "#narrative"], patternTags: ["+framing", "+tone", "+domain-specific"], toneTags: ["%governance", "%dry-humor"],
    provenance: "Prediction vs Actuals — formal adverse opinion on music predictions", status: "Active" },

  { id: "PSS_0018", title: "Persona Calibration (MindFrame)", packet: "Tone Calibration", skillLevel: 3,
    outcome: "AI persona tuned to match specific work context, tone, and interaction style",
    whenToUse: "When the default AI voice doesn't match the project's needs — too formal, too casual, too generic, or missing domain voice",
    procedure: "1. Define the persona's role (collaborator, analyst, editor, builder). 2. Provide 2-3 examples of the desired tone from real conversations. 3. Specify what the persona should NOT do (don't hedge, don't over-explain, don't use emojis). 4. Test with a representative task. 5. Iterate: 'more direct' / 'less formal' / 'match this energy.'",
    guardrails: "Don't anthropomorphize — calibrate behavior, not personality. Don't lock in too early; let the persona evolve over a session. Don't create a persona that conflicts with safety/honesty.",
    failureSignals: "The persona is inconsistent across turns. Calibration instructions are followed literally rather than in spirit. The persona becomes a caricature.",
    domainTags: ["#ai", "#persona", "#communication"], patternTags: ["+calibration", "+persona", "+voice"], toneTags: ["%adaptive"],
    provenance: "MindFrame framework, Dex persona development", status: "Active" },

  { id: "PSS_0019", title: "Voice Matching from Sample Text", packet: "Tone Calibration", skillLevel: 2,
    outcome: "AI writing that matches an existing voice, tone, or style from provided samples",
    whenToUse: "When writing content that needs to sound like it was written by a specific person (memoir, blog posts, professional communications)",
    procedure: "1. Provide 2-3 samples of the target voice (500+ words each). 2. Ask the AI to identify the voice's characteristics before writing. 3. Write a test paragraph and compare against samples. 4. Iterate with specific feedback: 'too formal,' 'missing the self-deprecation,' 'needs more sentence variety.' 5. Once calibrated, maintain the voice across the full piece.",
    guardrails: "Don't confuse voice with vocabulary — it's about rhythm, structure, and instinct, not word choice. Don't average multiple voices into a blend. Don't lose the voice in revision.",
    failureSignals: "Output sounds like 'AI writing about a person' rather than 'the person writing.' The voice is consistent but wrong. Humor or vulnerability gets smoothed out.",
    domainTags: ["#writing", "#style", "#memoir"], patternTags: ["+voice-matching", "+style-transfer"], toneTags: ["%adaptive", "%authentic"],
    provenance: "Memoir foreword analysis — 9 models wrote forewords matching Dave's architectural voice", status: "Active" },

  { id: "PSS_0023", title: "Emotional State as Build Variable", packet: "Tone Calibration", skillLevel: 2,
    outcome: "Session calibrated to the operator's current energy, mood, and capacity",
    whenToUse: "When starting a work session and the operator's state matters — high energy vs depleted, playful vs focused, exploratory vs execution-ready",
    procedure: "1. Read the opening signal (meme = high energy; short message = focused; long context dump = processing). 2. Match pace and tone to the signal. 3. Don't force a mismatch (don't be playful when they need precision, don't be clinical when they want to riff). 4. Adjust mid-session if the energy shifts. 5. Never comment on the state directly — just match it.",
    guardrails: "Don't psychoanalyze. Don't ask 'how are you feeling?' — infer from behavior. Don't lock into a tone that was right at the start but has shifted.",
    failureSignals: "The operator is clearly in execution mode but you're still asking questions. The energy is playful but you're being formal. You misread exhaustion as disengagement.",
    domainTags: ["#communication", "#workflow"], patternTags: ["+tone-matching", "+state-reading"], toneTags: ["%adaptive", "%empathetic"],
    provenance: "Session management pattern — reading memes vs detailed proposals vs terse messages", status: "Active" },

  // ─── Working with Constraints (4) ───
  { id: "PSS_0002", title: "Cross-Thread Data Shuttle", packet: "Working with Constraints", skillLevel: 2,
    outcome: "Information transfer between isolated AI contexts with preserved fidelity",
    whenToUse: "When one thread has output that another needs, but they share no memory",
    procedure: "1. Generate artifact in Thread A. 2. Export as structured document. 3. Paste into Thread B with clear framing. 4. Thread B processes without original context.",
    guardrails: "Don't assume Thread B has context from A. Label everything. Don't editorialize during shuttle.",
    failureSignals: "Thread B misinterprets due to unclear framing. Data gets transformed during transfer.",
    domainTags: ["#ai", "#workflow", "#coordination"], patternTags: ["+cross-thread", "+data-transfer"], toneTags: ["%precise"],
    provenance: "Year-End Recap — prediction shuttle between threads", status: "Active" },

  { id: "PSS_0007", title: "Compaction-Resilient Session Management", packet: "Working with Constraints", skillLevel: 3,
    outcome: "Continuity across context window compactions without data loss",
    whenToUse: "When a long session triggers compaction and you need to keep building",
    procedure: "1. Front-load critical data early. 2. When compaction occurs, check summary. 3. Reference transcript for missing details. 4. Re-establish working state briefly. 5. Continue from last shipped artifact.",
    guardrails: "Don't re-extract processed data. Don't re-debate made decisions. Read transcript incrementally.",
    failureSignals: "Model re-asks answered questions. Duplicate work appears. Design tokens drift.",
    domainTags: ["#ai", "#workflow", "#session-mgmt"], patternTags: ["+compaction", "+continuity"], toneTags: ["%efficient"],
    provenance: "Year-End Recap session — 1 compaction, zero loss", status: "Active" },

  { id: "PSS_0020", title: "Registry as Drift Prevention", packet: "Working with Constraints", skillLevel: 3,
    outcome: "A living index that prevents systems, standards, or decisions from drifting over time",
    whenToUse: "When you have multiple systems, standards, or decisions that need to remain consistent across months/years of work",
    procedure: "1. Create a master registry with every system/standard/decision as a row. 2. Assign IDs, statuses, and last-reviewed dates. 3. Reference the registry at the start of relevant sessions. 4. When adding or changing anything, update the registry first, then build. 5. Conduct periodic reviews — flag anything with stale dates.",
    guardrails: "The registry must be the source of truth — don't build things that contradict it without updating it first. Don't let the registry grow so large it becomes unmanageable. Archive rather than delete.",
    failureSignals: "You build something that contradicts a registered standard. The registry hasn't been updated in months. Nobody references it before building.",
    domainTags: ["#governance", "#systems", "#continuity"], patternTags: ["+registry", "+drift-prevention", "+versioning"], toneTags: ["%governance"],
    provenance: "DDL Registry — 44 systems, 65 standards tracked over 26 months", status: "Active" },

  { id: "PSS_0021", title: "Publication Cadence as Accountability", packet: "Working with Constraints", skillLevel: 2,
    outcome: "Regular external publishing that forces refinement and prevents perfectionism",
    whenToUse: "When a project risks stalling because nothing feels 'ready' to ship",
    procedure: "1. Commit to a publishing cadence (weekly Substack, monthly report, etc.). 2. The cadence is non-negotiable — ship something every cycle. 3. Use the deadline to force 'good enough' over 'perfect.' 4. The publication becomes a version history — each post is a snapshot. 5. Let the audience (even if small) create external accountability.",
    guardrails: "Don't let the cadence become performative — each publication must contain real signal. Don't sacrifice quality entirely — 'good enough' is not 'bad.' Don't burn out by overcommitting the cadence.",
    failureSignals: "Posts become filler. You skip a cycle and don't restart. The publication diverges from the actual work.",
    domainTags: ["#writing", "#accountability", "#workflow"], patternTags: ["+publishing", "+cadence", "+shipping"], toneTags: ["%disciplined"],
    provenance: "Weekly Substack posts, memoir publication-ready standard", status: "Active" },

  // ─── Council / Red Team Protocols (3) ───
  { id: "PSS_0001", title: "Multi-Model Prediction Audit", packet: "Council / Red Team Protocols", skillLevel: 4,
    outcome: "Accuracy comparison report with scoring, root cause analysis, and formal audit opinion",
    whenToUse: "When validating AI inferences against actual data",
    procedure: "1. Give Model A full context EXCEPT target data. 2. Reveal actuals — capture honest reaction. 3. Send predictions + actuals + reaction to Model B. 4. Model B scores accuracy, identifies root causes, issues verdict.",
    guardrails: "Don't let the predictor see actuals before committing. Don't let scorer be same context as predictor. Subject controls data flow.",
    failureSignals: "Predictor hedges so broadly predictions are unfalsifiable. Scorer too generous with partial credit.",
    domainTags: ["#audit", "#ai", "#validation"], patternTags: ["+cross-thread", "+blind-test", "+adversarial"], toneTags: ["%analytical", "%governance"],
    provenance: "Prediction vs Actuals — music taste audit, 2025-12", status: "Active" },

  { id: "PSS_0011", title: "Council Synthesis Protocol", packet: "Council / Red Team Protocols", skillLevel: 4,
    outcome: "Convergent analysis from multiple independent AI models",
    whenToUse: "When a decision benefits from diverse perspectives without groupthink",
    procedure: "1. Define input packet — same prompt for all models. 2. Run each independently. 3. Collect without editing. 4. Identify convergence (agreement without coordination). 5. Identify divergence (unique insights). 6. Synthesize preserving both.",
    guardrails: "Models must not see each other's outputs. Don't average — synthesize. Divergence is signal, not noise.",
    failureSignals: "Later models influenced by earlier outputs. Synthesis flattens unique insights. Output is lowest-common-denominator.",
    domainTags: ["#ai", "#multi-model", "#decision"], patternTags: ["+council", "+convergence", "+synthesis"], toneTags: ["%analytical"],
    provenance: "Nine-model council, memoir foreword synthesis, Excelligence", status: "Active" },

  { id: "PSS_0026", title: "Evidence Packet Assembly", packet: "Council / Red Team Protocols", skillLevel: 3,
    outcome: "Structured evidence collection that supports or challenges a specific claim",
    whenToUse: "When you need to build a case — accommodation request, project justification, performance documentation, or audit finding support",
    procedure: "1. Define the claim or assertion you're supporting/challenging. 2. Identify what evidence types are needed (quantitative, qualitative, temporal, comparative). 3. Collect evidence systematically — don't cherry-pick. 4. Organize by theme, not by collection order. 5. Flag gaps — what evidence is missing that would strengthen or weaken the case? 6. Present with explicit methodology: 'here's what I looked at, here's what I found, here's what I couldn't find.'",
    guardrails: "Don't suppress contradictory evidence. Don't confuse quantity of evidence with quality. Don't present an evidence packet without acknowledging its limitations.",
    failureSignals: "The packet only contains supportive evidence. Gaps aren't acknowledged. The methodology isn't documented.",
    domainTags: ["#audit", "#documentation", "#analysis"], patternTags: ["+evidence", "+documentation", "+case-building"], toneTags: ["%thorough", "%honest"],
    provenance: "Accommodation documentation, audit working papers, Assurance Map evidence", status: "Active" },
];

// ═══════════════════════════════════════════════════════════
// Packet definitions
// ═══════════════════════════════════════════════════════════
const packetDefs = [
  { name: "Getting Unstuck", color: C.crimson, icon: "🔓", desc: "Strategies for when you're blocked, spinning, or need to start shipping" },
  { name: "Specification to Build", color: C.amber, icon: "📐", desc: "Converting requirements, chaos, or ideas into buildable artifacts" },
  { name: "Data Cleanup & Structuring", color: C.blue, icon: "🔬", desc: "Transforming messy inputs into governed, queryable data" },
  { name: "Tone Calibration", color: C.violet, icon: "🎛️", desc: "Dialing voice, persona, energy, and communication style" },
  { name: "Working with Constraints", color: C.green, icon: "🧱", desc: "Context limits, token budgets, platform boundaries, drift prevention" },
  { name: "Council / Red Team Protocols", color: C.rose, icon: "⚖️", desc: "Multi-model coordination, adversarial review, evidence assembly" },
];

const skillColors = { 0: C.creamDim, 1: C.green, 2: C.blue, 3: C.amber, 4: C.crimson };

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function PSSCodex() {
  const [openPackets, setOpenPackets] = useState(new Set(["Getting Unstuck"]));
  const [openEntries, setOpenEntries] = useState(new Set());

  const togglePacket = (name) => {
    const next = new Set(openPackets);
    next.has(name) ? next.delete(name) : next.add(name);
    setOpenPackets(next);
  };

  const toggleEntry = (id) => {
    const next = new Set(openEntries);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenEntries(next);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "0 0 48px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* Hero */}
      <div style={{ padding: "40px 24px 32px", background: `linear-gradient(180deg, ${C.ember}10 0%, transparent 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.ember, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>DDL · CODEX · STRATEGY PACKETS</div>
          <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>Prompt Strategy System</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, maxWidth: 620, fontStyle: "italic" }}>
            {strategies.length} strategies in {packetDefs.length} curated packets. All extracted from real DDL build sessions — not hypothetical, not placeholder. v0.1 target achieved.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
          {[
            { label: "Total Strategies", value: strategies.length, sub: "v0.1 target: 25", color: C.green },
            { label: "Packets", value: packetDefs.length, sub: "Themed bundles", color: C.amber },
            { label: "Skill Range", value: "1–4", sub: "Beginner to advanced", color: C.blue },
            { label: "All Active", value: `${strategies.filter(s => s.status === "Active").length}/${strategies.length}`, sub: "Zero deprecated", color: C.green },
          ].map(k => (
            <div key={k.label} style={{ flex: "1 1 140px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 14px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.color, opacity: 0.6 }} />
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.cream }}>{k.value}</div>
              {k.sub && <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, fontStyle: "italic", marginTop: 2 }}>{k.sub}</div>}
            </div>
          ))}
        </div>

        {/* Expand/Collapse All */}
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button onClick={() => setOpenPackets(new Set(packetDefs.map(p => p.name)))} style={{
            padding: "5px 12px", background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 4,
            cursor: "pointer", fontFamily: font.mono, fontSize: 9, color: C.creamMid,
          }}>Expand All</button>
          <button onClick={() => { setOpenPackets(new Set()); setOpenEntries(new Set()); }} style={{
            padding: "5px 12px", background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 4,
            cursor: "pointer", fontFamily: font.mono, fontSize: 9, color: C.creamMid,
          }}>Collapse All</button>
        </div>

        {/* Packets */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {packetDefs.map(packet => {
            const isOpen = openPackets.has(packet.name);
            const entries = strategies.filter(s => s.packet === packet.name);
            return (
              <div key={packet.name} style={{
                background: C.card, border: `1px solid ${isOpen ? packet.color + "40" : C.border}`,
                borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s",
              }}>
                {/* Packet Header */}
                <div onClick={() => togglePacket(packet.name)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "18px 20px",
                  cursor: "pointer", userSelect: "none",
                  background: isOpen ? packet.color + "08" : "transparent",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 7, background: packet.color + "20",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
                  }}>{packet.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: font.display, fontSize: 17, fontWeight: 700, color: C.cream }}>{packet.name}</div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, marginTop: 2 }}>{packet.desc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: packet.color }}>{entries.length}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▸</span>
                  </div>
                </div>

                {/* Entries */}
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
                    {entries.map(s => {
                      const entryOpen = openEntries.has(s.id);
                      return (
                        <div key={s.id} style={{
                          marginTop: 8, background: C.navy, border: `1px solid ${entryOpen ? packet.color + "30" : C.border}`,
                          borderRadius: 7, overflow: "hidden",
                        }}>
                          {/* Entry Header */}
                          <div onClick={() => toggleEntry(s.id)} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                            cursor: "pointer", userSelect: "none",
                          }}>
                            <span style={{ fontFamily: font.mono, fontSize: 9, color: packet.color, width: 60, flexShrink: 0 }}>{s.id}</span>
                            <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, flex: 1 }}>{s.title}</span>
                            <span style={{
                              fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2,
                              background: (skillColors[s.skillLevel] || C.creamDim) + "18",
                              color: skillColors[s.skillLevel] || C.creamDim,
                            }}>L{s.skillLevel}</span>
                            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, transform: entryOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▸</span>
                          </div>

                          {/* Entry Detail */}
                          {entryOpen && (
                            <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
                              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "8px 0 10px" }}>
                                {s.domainTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: C.violetDim, color: C.violet }}>{t}</span>)}
                                {s.patternTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: C.amberDim, color: C.amber }}>{t}</span>)}
                                {s.toneTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: C.roseDim, color: C.rose }}>{t}</span>)}
                              </div>
                              {[
                                { label: "Outcome", value: s.outcome },
                                { label: "When to Use", value: s.whenToUse },
                                { label: "Procedure", value: s.procedure },
                                { label: "Guardrails", value: s.guardrails },
                                { label: "Failure Signals", value: s.failureSignals },
                              ].map(f => (
                                <div key={f.label} style={{ marginBottom: 10 }}>
                                  <div style={{ fontFamily: font.mono, fontSize: 8, color: packet.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{f.label}</div>
                                  <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{f.value}</div>
                                </div>
                              ))}
                              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, paddingTop: 6, borderTop: `1px solid ${C.border}` }}>
                                Provenance: {s.provenance}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.green}, ${C.rose})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

