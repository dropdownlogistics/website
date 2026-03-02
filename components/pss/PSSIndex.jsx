import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
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
// Strategy Entries — Seeded from actual DDL work
// ═══════════════════════════════════════════════════════════
const strategies = [
  {
    id: "PSS_0001",
    title: "Multi-Model Prediction Audit",
    outcome: "Accuracy comparison report with scoring, root cause analysis, and formal audit opinion",
    whenToUse: "When you want to test whether an AI model's inferences about a person/domain hold up against actual data",
    inputs: "Blind predictions from Model A, actual data from source, Model B as independent scorer",
    procedure: "1. Give Model A full context EXCEPT the target data. Ask for predictions with confidence tiers. 2. Reveal actual data to Model A — capture honest reaction. 3. Send predictions + actuals + reaction to Model B. 4. Model B scores accuracy, identifies root causes, issues formal verdict.",
    guardrails: "Don't let the predicting model see any actuals before committing predictions. Don't let the scoring model be the same context as the predictor. The subject must control the data flow between threads.",
    failureSignals: "Predictor hedges so broadly that predictions are unfalsifiable. Scorer is too generous with partial credit. Subject cherry-picks which data to reveal.",
    skillLevel: 4,
    domainTags: ["#audit", "#ai", "#validation", "#multi-model"],
    patternTags: ["+cross-thread", "+blind-test", "+adversarial"],
    toneTags: ["%analytical", "%governance", "%playful"],
    provenance: "Year-End Recap session, Thread A + B, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Council / Red Team Protocols",
  },
  {
    id: "PSS_0002",
    title: "Cross-Thread Data Shuttle",
    outcome: "Information transfer between isolated AI contexts with preserved fidelity",
    whenToUse: "When one thread has context/output that another thread needs, but they share no memory",
    inputs: "Output artifact from Thread A, receiving Thread B with its own context",
    procedure: "1. Generate the artifact in Thread A (predictions, analysis, code). 2. Export as structured document (markdown, TXT, or code block). 3. Paste into Thread B with clear framing: what it is, where it came from, what role Thread B plays. 4. Thread B processes without the original context — only what was shuttled.",
    guardrails: "Don't assume Thread B has any context from Thread A. Label everything explicitly. Don't editorialize when shuttling — deliver raw.",
    failureSignals: "Thread B misinterprets the artifact because framing was unclear. Data gets transformed during the shuttle (lossy transfer). Thread B tries to roleplay as Thread A.",
    skillLevel: 2,
    domainTags: ["#ai", "#workflow", "#coordination"],
    patternTags: ["+cross-thread", "+data-transfer"],
    toneTags: ["%precise"],
    provenance: "Year-End Recap session, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Working with Constraints",
  },
  {
    id: "PSS_0003",
    title: "Screenshot-to-Structured-Data Extraction",
    outcome: "Clean, ranked data tables from platform screenshot images",
    whenToUse: "When a platform provides year-end data as images (Apple Music Replay, PlayStation Wrap-Up, etc.) and you need structured data for analysis or visualization",
    inputs: "Screenshots of ranked lists, stats screens, or data summaries from any platform",
    procedure: "1. Upload screenshots with explicit instruction: 'Extract all data from these images into structured format.' 2. Request specific output format (ranked list with fields). 3. For compressed/truncated images, flag confidence levels on extracted values. 4. Cross-reference extracted data across multiple screenshots for consistency. 5. Build verification step: have the model read back its extraction for confirmation.",
    guardrails: "Don't assume OCR is perfect — always flag low-confidence extractions. Don't combine multiple screenshots without noting which data came from which image. Compressed screenshots (songs 50-84) will have lower accuracy.",
    failureSignals: "Model hallucinates data not visible in the image. Rankings get shuffled during extraction. Numeric values get rounded or approximated without flagging.",
    skillLevel: 2,
    domainTags: ["#data", "#extraction", "#analytics"],
    patternTags: ["+image-to-data", "+structured-output"],
    toneTags: ["%precise", "%methodical"],
    provenance: "Apple Music Replay extraction, 5 screenshots → 84 songs + 20 artists + 15 albums, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Data Cleanup & Structuring",
  },
  {
    id: "PSS_0004",
    title: "Design System Token Reuse",
    outcome: "Consistent visual identity across multiple independently-built pages",
    whenToUse: "When building multiple pages/components that need to look like they belong to the same site without a shared codebase",
    inputs: "A palette file or design token reference (colors, fonts, spacing, component patterns)",
    procedure: "1. Define tokens once in a reference file (palette.jsx or tokens.json). 2. Load the token file at the start of every build session. 3. Copy the token constants block into each new component. 4. Reference tokens by semantic name (C.crimson, C.card) never by hex value. 5. Maintain consistent component patterns (KPI cards, Section headers, Pull quotes) across pages.",
    guardrails: "Never hardcode a color — always use the token reference. Don't drift the component patterns between pages. If you add a new token, add it to the reference file.",
    failureSignals: "Pages use slightly different hex values for 'the same' color. Component spacing/border-radius drifts between builds. A new page 'feels different' despite using the same palette.",
    skillLevel: 2,
    domainTags: ["#design", "#frontend", "#governance"],
    patternTags: ["+design-system", "+token-reuse", "+consistency"],
    toneTags: ["%systematic"],
    provenance: "CottageHumble design system, DDL site builds, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Specification to Build",
  },
  {
    id: "PSS_0005",
    title: "Platform-Agnostic Data Normalization",
    outcome: "Unified cross-platform comparison from heterogeneous data sources",
    whenToUse: "When comparing engagement/behavior across platforms that report data in different formats, units, and granularity",
    inputs: "Data from 2+ platforms with different schemas (e.g., PlayStation hours vs Apple Music minutes vs YouTube channel counts)",
    procedure: "1. Extract each platform's data independently with its native units. 2. Identify comparable dimensions (time spent, concentration/dominance, count of entities). 3. Normalize where possible (minutes → hours) but don't force false equivalences. 4. For platforms that don't report a metric (YouTube doesn't disclose hours), note the gap explicitly. 5. Build the comparison around behavioral patterns, not raw numbers.",
    guardrails: "Don't invent data to fill gaps. Don't equate different metrics (1,001 channels ≠ 1,009 hours). Label 'hours not reported' rather than estimating. Let the behavioral insight carry the comparison, not the numbers.",
    failureSignals: "Forcing a bar chart where units aren't comparable. Estimating unreported metrics. Losing platform-specific context in the normalization.",
    skillLevel: 3,
    domainTags: ["#data", "#analytics", "#cross-platform"],
    patternTags: ["+normalization", "+comparison", "+multi-source"],
    toneTags: ["%analytical", "%honest"],
    provenance: "Annual Signal Report build, 4 platforms unified, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Data Cleanup & Structuring",
  },
  {
    id: "PSS_0006",
    title: "Template-Driven Page Generation",
    outcome: "Production-quality page matching a predefined template pattern from raw data",
    whenToUse: "When you have a named template (CONSOLE, ATLAS, LEDGER, DOSSIER, CHRONICLE, CODEX) and data to fill it",
    inputs: "Template name + pattern definition, raw data (structured or unstructured), design tokens",
    procedure: "1. Identify which template fits the content (CONSOLE = KPI + viz + grid, ATLAS = reference + sidebar, LEDGER = filterable registry). 2. Load design tokens. 3. Structure data into the template's expected slots (KPI row, primary viz, secondary grid, data table). 4. Build the page in one pass with all data embedded. 5. Add insights/analysis as callout components between data sections.",
    guardrails: "Don't mix template patterns — a CONSOLE shouldn't have a sidebar rail. Don't leave placeholder data. Every section should have real content or be cut.",
    failureSignals: "Template feels forced on the data. KPIs are meaningless vanity metrics. Analysis callouts are generic rather than insight-specific.",
    skillLevel: 3,
    domainTags: ["#design", "#frontend", "#systems"],
    patternTags: ["+template", "+page-gen", "+design-system"],
    toneTags: ["%systematic", "%governance"],
    provenance: "DDL site build sessions, 6 template types, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Specification to Build",
  },
  {
    id: "PSS_0007",
    title: "Compaction-Resilient Session Management",
    outcome: "Continuity across context window compactions without data loss",
    whenToUse: "When a long session triggers context compaction and you need to continue building without re-explaining everything",
    inputs: "Pre-compaction work product, compaction summary, reference to transcript file",
    procedure: "1. Front-load critical data (design tokens, extracted datasets, decisions) early in the session. 2. When compaction occurs, check the summary for what was preserved. 3. Reference the transcript file for details not in the summary. 4. Re-establish the working state with a brief confirmation rather than re-explaining. 5. Continue building from the last shipped artifact.",
    guardrails: "Don't re-extract data that was already processed — check the summary first. Don't assume the full conversation is accessible — read the transcript incrementally. Don't re-debate decisions that were already made.",
    failureSignals: "Model asks questions that were already answered pre-compaction. Duplicate work gets produced. Design tokens drift because they weren't in the summary.",
    skillLevel: 3,
    domainTags: ["#ai", "#workflow", "#session-mgmt"],
    patternTags: ["+compaction", "+continuity", "+long-session"],
    toneTags: ["%efficient"],
    provenance: "Year-End Recap session (4+ hours, 1 compaction), 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Working with Constraints",
  },
  {
    id: "PSS_0008",
    title: "Behavioral Pattern Extraction",
    outcome: "Cross-domain behavioral insights from quantitative data",
    whenToUse: "When raw usage data reveals patterns about the person's behavior that aren't obvious from any single metric",
    inputs: "Structured data across 2+ domains or platforms with enough depth to identify patterns",
    procedure: "1. Look for concentration/dominance patterns (what % does the top entity command?). 2. Look for repetition across platforms (same franchise, same behavior, same structure). 3. Look for tight clusters that suggest systematic behavior (5 pop-punk artists in a 14-minute range = playlist rotation). 4. Look for absence patterns (what's NOT in the data that demographics would predict?). 5. Name the pattern and write it as an insight callout.",
    guardrails: "Don't over-interpret single data points. Don't confuse correlation with causation. Don't psychoanalyze — describe behavior, not motivation. The subject knows their own 'why.'",
    failureSignals: "Insights are obvious restatements of the data. Patterns are forced rather than emergent. Analysis sounds like a horoscope.",
    skillLevel: 3,
    domainTags: ["#analytics", "#behavioral", "#insight"],
    patternTags: ["+pattern-extraction", "+cross-domain"],
    toneTags: ["%analytical", "%respectful"],
    provenance: "'Deep commitment, narrow focus' pattern identified across 4 platforms, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Data Cleanup & Structuring",
  },
  {
    id: "PSS_0009",
    title: "Audit Language as Narrative Frame",
    outcome: "Technical/analytical content presented with governance-grade credibility and dry humor",
    whenToUse: "When the subject is a CPA/auditor and the content benefits from audit terminology as both structure and tone",
    inputs: "Data analysis, comparison results, or evaluation that maps to audit concepts (findings, evidence, opinion)",
    procedure: "1. Map the content to audit phases (planning, fieldwork, reporting). 2. Use audit terminology accurately (material misstatement, adverse opinion, root cause, partial credit). 3. Structure findings with clear 'condition, criteria, cause, effect' patterns. 4. End with a formal opinion that's technically sound AND entertaining. 5. Let the audit frame carry humor without forcing jokes.",
    guardrails: "Don't misuse audit terms — 'adverse opinion' means something specific. Don't make it a parody. The humor comes from applying formal rigor to informal content, not from mocking the format. The subject knows when you're wrong about audit terms.",
    failureSignals: "Audit terms are used decoratively rather than accurately. The frame feels forced. It becomes a bit rather than a structure.",
    skillLevel: 4,
    domainTags: ["#audit", "#writing", "#narrative"],
    patternTags: ["+framing", "+tone", "+domain-specific"],
    toneTags: ["%governance", "%dry-humor", "%precise"],
    provenance: "Prediction vs Actuals page — formal adverse opinion on music predictions, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Tone Calibration",
  },
  {
    id: "PSS_0010",
    title: "Meme-as-Go-Signal",
    outcome: "Immediate build execution triggered by contextual meme/image",
    whenToUse: "When the operator drops a meme or image that clearly signals 'stop talking, start building'",
    inputs: "An image/meme with obvious intent (e.g., 'I'm still gonna send it')",
    procedure: "1. Read the signal. 2. Don't ask clarifying questions. 3. Don't summarize what you're about to do. 4. Build the thing. 5. Ship it.",
    guardrails: "Don't overthink it. Don't ask 'are you sure?' Don't write a project plan. The meme IS the project plan.",
    failureSignals: "You responded with a paragraph before building. You asked a clarifying question. You treated it as ambiguous when it wasn't.",
    skillLevel: 1,
    domainTags: ["#workflow", "#communication"],
    patternTags: ["+signal-reading", "+execution"],
    toneTags: ["%efficient", "%playful"],
    provenance: "'I'm still gonna send it' → immediate Annual Signal Report build, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Getting Unstuck",
  },
  {
    id: "PSS_0011",
    title: "Council Synthesis Protocol",
    outcome: "Convergent analysis from multiple independent AI models on the same input",
    whenToUse: "When a decision, analysis, or creative output benefits from diverse model perspectives without groupthink",
    inputs: "A defined prompt/input packet, access to 2+ AI models, a synthesis framework",
    procedure: "1. Define the input packet — same structured prompt for all models. 2. Run each model independently (no cross-pollination). 3. Collect outputs without editing. 4. Identify convergence points (where models agree without coordination). 5. Identify divergence points (unique insights from individual models). 6. Synthesize into a unified output that preserves both signal types.",
    guardrails: "Models must not see each other's outputs before responding. Don't average — synthesize. Convergence is signal; divergence is also signal (not noise). Attribution matters.",
    failureSignals: "Models are run sequentially and later ones are influenced by earlier outputs. Synthesis flattens unique insights. The final output is a lowest-common-denominator blend.",
    skillLevel: 4,
    domainTags: ["#ai", "#multi-model", "#decision"],
    patternTags: ["+council", "+convergence", "+synthesis"],
    toneTags: ["%analytical", "%governance"],
    provenance: "Nine-model council methodology, memoir foreword synthesis, Excelligence project",
    status: "Active",
    lastValidated: "2025-12",
    packet: "Council / Red Team Protocols",
  },
  {
    id: "PSS_0012",
    title: "Artifact Classification & Site Mapping",
    outcome: "Clear taxonomy of outputs mapped to templates, sections, and cross-references",
    whenToUse: "When a build session produces multiple artifacts and they need to be cataloged for a site or registry",
    inputs: "List of completed artifacts with enough context to classify each",
    procedure: "1. List all outputs from the session with filenames. 2. Match each to the appropriate template type (CONSOLE, ATLAS, LEDGER, etc.). 3. Assign a site section. 4. Write a one-line description. 5. Identify cross-references between artifacts. 6. Output as a structured table.",
    guardrails: "Don't force-fit a template — if it doesn't match, note it. Cross-references must be bidirectional. Don't create sections that only have one page unless it's intentional.",
    failureSignals: "Template assignment feels arbitrary. Cross-references are missing obvious connections. Descriptions are too vague to be useful in a registry.",
    skillLevel: 2,
    domainTags: ["#governance", "#systems", "#catalog"],
    patternTags: ["+classification", "+taxonomy", "+site-map"],
    toneTags: ["%systematic"],
    provenance: "End of Year-End Recap session — 3 pages classified, 2025-12",
    status: "Active",
    lastValidated: "2025-12-25",
    packet: "Specification to Build",
  },
];

// ═══════════════════════════════════════════════════════════
// Filter helpers
// ═══════════════════════════════════════════════════════════
const allDomains = [...new Set(strategies.flatMap(s => s.domainTags))].sort();
const allPatterns = [...new Set(strategies.flatMap(s => s.patternTags))].sort();
const allPackets = [...new Set(strategies.map(s => s.packet))].sort();
const skillColors = { 0: C.creamDim, 1: C.green, 2: C.blue, 3: C.amber, 4: C.crimson };
const statusColors = { Active: C.green, Draft: C.amber, Deprecated: C.creamDim };

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function PSSLedger() {
  const [expanded, setExpanded] = useState(null);
  const [filterPacket, setFilterPacket] = useState("All");
  const [filterSkill, setFilterSkill] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = strategies.filter(s => {
    if (filterPacket !== "All" && s.packet !== filterPacket) return false;
    if (filterSkill !== "All" && s.skillLevel !== parseInt(filterSkill)) return false;
    if (searchTerm && !`${s.title} ${s.outcome} ${s.domainTags.join(" ")} ${s.patternTags.join(" ")}`.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "0 0 48px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* Hero */}
      <div style={{ padding: "40px 24px 32px", background: `linear-gradient(180deg, ${C.green}10 0%, transparent 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>DDL · LEDGER · STRATEGY INDEX</div>
          <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>Prompt Strategy System</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, maxWidth: 600, fontStyle: "italic" }}>
            {strategies.length} strategies indexed. Extracted from real DDL build sessions — not hypothetical, not placeholder.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* KPI Row */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
          {[
            { label: "Total Strategies", value: strategies.length, color: C.green },
            { label: "Active", value: strategies.filter(s => s.status === "Active").length, color: C.green },
            { label: "Packets Covered", value: allPackets.length, color: C.amber },
            { label: "Avg Skill Level", value: (strategies.reduce((a, s) => a + s.skillLevel, 0) / strategies.length).toFixed(1), color: C.blue },
          ].map(k => (
            <div key={k.label} style={{ flex: "1 1 140px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 14px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.color, opacity: 0.6 }} />
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.cream }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{
          display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20, padding: "14px 16px",
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, alignItems: "center",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Filter</div>

          {/* Search */}
          <input
            type="text" placeholder="Search strategies..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 180px", padding: "6px 10px", background: C.navy, border: `1px solid ${C.borderMed}`,
              borderRadius: 4, fontFamily: font.mono, fontSize: 10, color: C.cream, outline: "none",
            }}
          />

          {/* Packet filter */}
          <select value={filterPacket} onChange={e => setFilterPacket(e.target.value)}
            style={{ padding: "6px 8px", background: C.navy, border: `1px solid ${C.borderMed}`, borderRadius: 4, fontFamily: font.mono, fontSize: 10, color: C.cream, outline: "none" }}>
            <option value="All">All Packets</option>
            {allPackets.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          {/* Skill filter */}
          <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)}
            style={{ padding: "6px 8px", background: C.navy, border: `1px solid ${C.borderMed}`, borderRadius: 4, fontFamily: font.mono, fontSize: 10, color: C.cream, outline: "none" }}>
            <option value="All">All Levels</option>
            {[0,1,2,3,4].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>

          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{filtered.length} of {strategies.length}</div>
        </div>

        {/* Strategy List */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map(s => {
            const isOpen = expanded === s.id;
            return (
              <div key={s.id} style={{
                background: C.card, border: `1px solid ${isOpen ? C.blue + "40" : C.border}`,
                borderRadius: 7, overflow: "hidden", transition: "border-color 0.15s",
              }}>
                {/* Row header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                    cursor: "pointer", userSelect: "none",
                  }}
                >
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, width: 65, flexShrink: 0 }}>{s.id}</span>
                  <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, flex: 1 }}>{s.title}</span>
                  <span style={{
                    fontFamily: font.mono, fontSize: 8, padding: "2px 6px", borderRadius: 3,
                    background: (skillColors[s.skillLevel] || C.creamDim) + "18",
                    color: skillColors[s.skillLevel] || C.creamDim,
                  }}>L{s.skillLevel}</span>
                  <span style={{
                    fontFamily: font.mono, fontSize: 8, padding: "2px 6px", borderRadius: 3,
                    background: (statusColors[s.status] || C.creamDim) + "18",
                    color: statusColors[s.status] || C.creamDim,
                  }}>~{s.status}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▸</span>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
                    {/* Tags row */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "10px 0 12px" }}>
                      {s.domainTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2, background: C.violetDim, color: C.violet }}>{t}</span>)}
                      {s.patternTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2, background: C.amberDim, color: C.amber }}>{t}</span>)}
                      {s.toneTags.map(t => <span key={t} style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2, background: C.roseDim, color: C.rose }}>{t}</span>)}
                      <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2, background: C.greenDim, color: C.green }}>{s.packet}</span>
                    </div>

                    {/* Fields */}
                    {[
                      { label: "Outcome", value: s.outcome },
                      { label: "When to Use", value: s.whenToUse },
                      { label: "Inputs", value: s.inputs },
                      { label: "Procedure", value: s.procedure },
                      { label: "Guardrails", value: s.guardrails },
                      { label: "Failure Signals", value: s.failureSignals },
                    ].map(f => (
                      <div key={f.label} style={{ marginBottom: 12 }}>
                        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{f.value}</div>
                      </div>
                    ))}

                    {/* Footer metadata */}
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                      <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Provenance: <span style={{ color: C.creamMid }}>{s.provenance}</span></span>
                      <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Validated: <span style={{ color: C.creamMid }}>{s.lastValidated}</span></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Packet Distribution */}
        <div style={{
          marginTop: 32, display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 5, background: C.amber + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📦</div>
          <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Packet Distribution</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
          {allPackets.map(p => {
            const count = strategies.filter(s => s.packet === p).length;
            const packetColors = {
              "Council / Red Team Protocols": C.rose,
              "Working with Constraints": C.blue,
              "Data Cleanup & Structuring": C.amber,
              "Specification to Build": C.green,
              "Tone Calibration": C.violet,
              "Getting Unstuck": C.crimson,
            };
            const pc = packetColors[p] || C.creamDim;
            return (
              <div key={p} onClick={() => setFilterPacket(filterPacket === p ? "All" : p)} style={{
                background: C.card, border: `1px solid ${filterPacket === p ? pc + "60" : C.border}`,
                borderRadius: 7, padding: "12px 14px", cursor: "pointer", transition: "border-color 0.15s",
              }}>
                <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color: pc, marginBottom: 2 }}>{count}</div>
                <div style={{ fontFamily: font.display, fontSize: 11, fontWeight: 600, color: C.cream }}>{p}</div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
