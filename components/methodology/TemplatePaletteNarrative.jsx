import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
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
// Phase data
// ═══════════════════════════════════════════════════════════
const phases = [
  { id: "origin", num: "I", title: "The Question", sub: "One thread, one table" },
  { id: "dispatch", num: "II", title: "The Dispatch", sub: "A prompt into the network" },
  { id: "responses", num: "III", title: "The Voices", sub: "7 threads report back" },
  { id: "synthesis", num: "IV", title: "The Synthesis", sub: "Convergence + the 6th" },
  { id: "molds", num: "V", title: "The Molds", sub: "6 templates, 11 primitives" },
];

const threadResponses = [
  {
    id: "Thread 1",
    label: "Excelligence + Council",
    color: C.blue,
    pages: 6,
    mappings: [
      ["Excelligence Graph Explorer", "CONSOLE"],
      ["Brian Stoker Brief", "ATLAS"],
      ["Council Vision + Responses", "CHRONICLE"],
      ["Council Synthesis", "ATLAS"],
    ],
    quote: "The Graph Explorer is technically CONSOLE, but the viz slot isn't a chart — it's a force-directed interactive graph. If CONSOLE's viz slot is flexible enough to hold a full React component, it works.",
    flag: "CONSOLE-INTERACTIVE variant",
    keyInsight: "Detail panel is a DOSSIER stat block in miniature. Could be extracted and reused for any entity spotlight.",
  },
  {
    id: "Thread 2",
    label: "Registry + Operator Profile",
    color: C.green,
    pages: 8,
    mappings: [
      ["/registry (5 tabs)", "LEDGER"],
      ["/projects (card grid)", "LEDGER"],
      ["Operator Profile PDF", "DOSSIER"],
      ["DDL methodology pages", "ATLAS"],
      ["DexDash", "CONSOLE"],
    ],
    quote: "No gaps. Every page I've built or touched fits one of the five. That's a good signal — the palette covers the DDL surface area.",
    flag: "Operator Profile spans three templates",
    keyInsight: "CHRONICLE is doing the most work. Worth making sure it has enough variant flexibility.",
  },
  {
    id: "Thread 3",
    label: "PrioritEase + DDL Tools",
    color: C.amber,
    pages: 4,
    mappings: [
      ["PrioritEase v2 Roadmap", "CONSOLE"],
      ["DDL Tools Page", "LEDGER + CONSOLE + DOSSIER"],
    ],
    quote: "Your five templates cover everything, but the real power is in the component layer beneath them. The pages I built are already composing across template boundaries. That's healthy — it means your templates are modular, not rigid.",
    flag: "Inline detail overlay — lives inside LEDGER but renders DOSSIER content",
    keyInsight: "PrioritEase sequence tab uses a CHRONICLE timeline embedded inside a CONSOLE view.",
  },
  {
    id: "Thread 4",
    label: "Protocol + Case Studies",
    color: C.crimson,
    pages: 10,
    mappings: [
      ["The Protocol (interactive)", "CHRONICLE"],
      ["/projects storefront", "LEDGER"],
      ["Case studies", "CONSOLE (Pitch)"],
      ["Council profiles (planned)", "DOSSIER"],
      ["The Cost of Billable Hours", "CHRONICLE"],
    ],
    quote: "CONSOLE Pitch → CONSOLE Live is the conversion seam. The case study mockups are Pitch. When Sophia says yes and real data enters the schema, it becomes Console Live. That's PRO-09 at the template level.",
    flag: "DOSSIER hasn't been built yet but has nine guaranteed instances",
    keyInsight: "Conditional branch cards in the Protocol don't match any template — they're a Chronicle-native component.",
  },
  {
    id: "Thread 5",
    label: "CottageHumble Rebrands",
    color: C.violet,
    pages: 8,
    mappings: [
      ["the-protocol-ddl.html", "CHRONICLE"],
      ["operator-profile.html", "DOSSIER"],
      ["council-calibration-faq.html", "ATLAS (close)"],
      ["trademark-glossary.html", "LEDGER"],
      ["feb-27-2026.html", "CHRONICLE + DOSSIER + CONSOLE"],
    ],
    quote: "5 templates cover ~80%. The two gaps are FAQ-style content and multi-template day archives. Solve those and you've got full coverage.",
    flag: "FAQ pattern isn't cleanly covered → suggested CODEX",
    flagHighlight: true,
    keyInsight: "Day archives pull from Chronicle, Dossier, Console, AND Ledger. Either a composite template or a 6th pattern — call it LOGBOOK.",
  },
  {
    id: "Thread 6",
    label: "BlindSpot D&A Rebrands",
    color: C.ember,
    pages: 8,
    mappings: [
      ["BlindSpot landing", "CONSOLE (Pitch)"],
      ["BlindSpot BackTest", "CONSOLE"],
      ["BlindSpot Steam", "CONSOLE"],
      ["LLM Setup Guides (×2)", "ATLAS ⚠️"],
      ["knowledge_map.txt", "ATLAS"],
      ["other_works.txt", "LEDGER → CHRONICLE"],
    ],
    quote: "The two LLM guides expose a gap. They're sequential walkthroughs — numbered steps with progress tracking, interactive terminal blocks. ATLAS covers reference docs, but these are closer to a guided install wizard.",
    flag: "Suggested RUNWAY or PROTOCOL as a 6th template",
    keyInsight: "other_works is LEDGER shell with CHRONICLE modals. Neither template alone covers it.",
  },
  {
    id: "Thread 7",
    label: "Memoir + Substack + Other Works",
    color: C.rose,
    pages: 5,
    mappings: [
      ["Other Works", "LEDGER"],
      ["Memoir Release Calendar", "CHRONICLE (90%)"],
      ["Substack Components", "Modular (not a page)"],
      ["Ryan Paddle Engineering PDF", "ATLAS"],
    ],
    quote: "The Release Calendar is Chronicle in narrative flow but the stat bar, progress track, and episode grid rows feel like Console. The template system should allow component injection across templates rather than being rigid molds.",
    flag: "No template covers a feed/stream layout",
    keyInsight: "No page mapped to DOSSIER — but the Reddit contributor profile about to be built is a textbook Dossier.",
  },
];

const convergenceRules = [
  { from: ["Lore Item", "Release/Calendar"], to: "CHRONICLE", reason: "Both are time-ordered narratives. Calendar adds episode grids and progress bars as variants.", color: C.crimson },
  { from: ["Knowledge Item", "Guide/How-To"], to: "ATLAS", reason: "Both are structured reference. Guides swap diagrams for numbered steps. Same sidebar + concept card bones.", color: C.blue },
  { from: ["Registry/Catalog"], to: "LEDGER", reason: "Standalone shape. Dense, filterable, sortable, badge-heavy.", color: C.green },
  { from: ["Profile"], to: "DOSSIER", reason: "Standalone shape. Hero name, stat block, narrative bio. Nine Council profiles guarantee volume.", color: C.violet },
  { from: ["Dashboard/Analytics", "Pitch/Showcase"], to: "CONSOLE", reason: "Same skeleton — KPI row, viz slot, data grid. Pitch variant swaps data for feature cards + CTA.", color: C.amber },
];

const gapCandidates = [
  { name: "FAQ / Q&A", signal: "4 threads", verdict: "PROMOTE → CODEX", color: C.ember, promoted: true, desc: "Genuinely different shape. Disclosure-based, not spatial. You'll build more of these." },
  { name: "Guided Wizard", signal: "2 threads", verdict: "VARIANT → Atlas-Sequential", color: C.blue, desc: "Atlas with a linear constraint and progress tracker." },
  { name: "Day Archive", signal: "2 threads", verdict: "CONVENTION → Freestyle Composite", color: C.creamDim, desc: "A template whose rule is 'no rules' isn't a template." },
  { name: "Feed / Stream", signal: "1 thread", verdict: "PRIMITIVE → Embedded Component", color: C.creamDim, desc: "Not a page. A scrollable list embedded inside Chronicle or Ledger." },
];

const primitives = [
  { name: "Stat Row", templates: ["Console", "Chronicle", "Ledger", "Dossier"], threads: 7 },
  { name: "Filter Bar", templates: ["Ledger", "Console"], threads: 5 },
  { name: "Card Grid", templates: ["Ledger", "Console", "Atlas"], threads: 6 },
  { name: "Tag / Badge", templates: ["All"], threads: 7 },
  { name: "Pull Quote", templates: ["Chronicle", "Dossier"], threads: 4 },
  { name: "Timeline Spine", templates: ["Chronicle", "Console"], threads: 5 },
  { name: "Detail Overlay", templates: ["Ledger", "Dossier"], threads: 3 },
  { name: "Insight Callout", templates: ["Chronicle", "Atlas", "Codex"], threads: 6 },
  { name: "Collapsible Section", templates: ["Dossier", "Atlas", "Codex"], threads: 5 },
  { name: "Section Nav", templates: ["Atlas", "Codex", "Dossier"], threads: 4 },
  { name: "Accent Footer", templates: ["All"], threads: 7 },
];

const templates = [
  {
    name: "CHRONICLE", subtitle: "The Narrative Spine", color: C.crimson,
    desc: "Long-form reading with breathing room. Time-ordered. Atmospheric.",
    pageCount: "12+",
    skeleton: [
      { label: "Date Label", h: 16, w: "30%", accent: true },
      { label: "H1 — Serif, Large", h: 32, w: "70%" },
      { label: "Italic Subtitle", h: 18, w: "55%" },
      { label: "Mono Metadata", h: 14, w: "40%", mono: true },
      { label: "Crimson Divider", h: 3, w: "15%", accent: true },
      { label: "Body — 700px Column", h: 80, w: "100%" },
      { label: "Timeline Moment", h: 48, w: "90%", indent: true },
      { label: "Timeline Moment", h: 48, w: "90%", indent: true },
      { label: "Pull Quote Block", h: 44, w: "85%", accent: true },
      { label: "Transition + Next Link", h: 28, w: "60%" },
    ],
    variants: ["Lore (atmospheric, giant numeral)", "Calendar (episode grid, progress bars)"],
    usedPrimitives: ["Stat Row", "Pull Quote", "Timeline Spine", "Insight Callout", "Accent Footer"],
  },
  {
    name: "ATLAS", subtitle: "The Reference Map", color: C.blue,
    desc: "Structured information with visual connectors. Diagrams, concept cards, sidebar rail.",
    pageCount: "8+",
    skeleton: [
      { label: "Roman Numeral Box + H1 + Line", h: 28, w: "100%" },
      { label: "Diagram / SVG Visual", h: 56, w: "100%" },
      { label: "Primary Content (65%)", h: 120, w: "63%", split: true },
      { label: "Sidebar Rail (35%)", h: 120, w: "33%", split: true, sidebar: true },
      { label: "Concept Card Grid", h: 56, w: "100%" },
      { label: "Cross-Reference Tags", h: 20, w: "70%" },
    ],
    variants: ["Knowledge (diagrams, See Also links)", "Guide (numbered steps, checklist)", "Sequential (step tracker sidebar)"],
    usedPrimitives: ["Card Grid", "Tag / Badge", "Section Nav", "Insight Callout", "Collapsible Section", "Accent Footer"],
  },
  {
    name: "CODEX", subtitle: "The Structured Disclosure", color: C.ember,
    desc: "Sequential reveal. Expandable sections, jump links, single column. The 6th mold.",
    pageCount: "4+",
    skeleton: [
      { label: "H1 + Description", h: 28, w: "80%" },
      { label: "Section Jump Nav", h: 22, w: "100%", mono: true },
      { label: "Crimson Divider", h: 3, w: "15%", accent: true },
      { label: "Section Header", h: 20, w: "50%", accent: true },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Section Header", h: 20, w: "50%", accent: true },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
    ],
    variants: ["FAQ (Q&A pairs)", "Calibration (parameter/value)", "Onboarding (task/instruction)"],
    usedPrimitives: ["Collapsible Section", "Section Nav", "Insight Callout", "Tag / Badge", "Accent Footer"],
  },
  {
    name: "LEDGER", subtitle: "The Dense Index", color: C.green,
    desc: "Filterable, sortable, badge-heavy. Registries, catalogs, collections.",
    pageCount: "6+",
    skeleton: [
      { label: "H1 + Stats Row", h: 28, w: "100%" },
      { label: "Filter Bar — Tags + Search + Sort", h: 24, w: "100%", mono: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Show More", h: 18, w: "30%" },
    ],
    variants: ["Standard (3-col grid)", "Compact (list rows)", "With detail overlay (Dossier modal)"],
    usedPrimitives: ["Stat Row", "Filter Bar", "Card Grid", "Tag / Badge", "Detail Overlay", "Accent Footer"],
  },
  {
    name: "DOSSIER", subtitle: "The Entity Spotlight", color: C.violet,
    desc: "One subject, deep context. Hero name, stat block, directive, narrative bio.",
    pageCount: "10+",
    skeleton: [
      { label: "Hero Name — Serif, Large", h: 32, w: "60%" },
      { label: "Title / Role — Mono, Crimson", h: 16, w: "40%", accent: true },
      { label: "Status Badge", h: 14, w: "15%", mono: true },
      { label: "Stat Block — 4 Attributes", h: 32, w: "100%" },
      { label: "Signature Directive (Pull Quote)", h: 36, w: "85%", accent: true },
      { label: "Narrative Bio — 700px", h: 80, w: "100%" },
      { label: "Attribute Grid (2-col)", h: 48, w: "100%" },
      { label: "Collapsible: Reflection Log", h: 20, w: "100%" },
      { label: "Related Entities Row", h: 36, w: "100%" },
    ],
    variants: ["Full page (Council profile)", "Card form (CompanionCard)", "Inline overlay (inside Ledger)"],
    usedPrimitives: ["Stat Row", "Pull Quote", "Collapsible Section", "Tag / Badge", "Card Grid", "Accent Footer"],
  },
  {
    name: "CONSOLE", subtitle: "The Data Surface", color: C.amber,
    desc: "Dense, metric-forward, visual. Dashboards, analytics, pitch pages.",
    pageCount: "8+",
    skeleton: [
      { label: "H1 + Mono Metadata", h: 24, w: "80%" },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "Primary Viz Slot (flexible)", h: 90, w: "100%" },
      { label: "Secondary Grid", h: 56, w: "100%" },
      { label: "Data Table (optional)", h: 48, w: "100%" },
    ],
    variants: ["Dashboard (KPI + chart + table)", "Pitch (hero + features + CTA)", "Interactive (full React in viz slot)"],
    usedPrimitives: ["Stat Row", "Filter Bar", "Card Grid", "Tag / Badge", "Timeline Spine", "Accent Footer"],
  },
];

// ═══════════════════════════════════════════════════════════
// Shared Components
// ═══════════════════════════════════════════════════════════

function SectionHead({ num, title, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, marginTop: 48 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6,
        background: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font.body, fontSize: 16, fontWeight: 600, color,
      }}>{num}</div>
      <span style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function Quote({ text, source, color = C.crimson }) {
  return (
    <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: 16, margin: "16px 0" }}>
      <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.75, fontStyle: "italic" }}>"{text}"</p>
      {source && <p style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", marginTop: 6, textTransform: "uppercase" }}>— {source}</p>}
    </div>
  );
}

function ThreadCard({ thread, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
      marginBottom: 8, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 18px", background: "transparent", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: thread.color, flexShrink: 0,
          boxShadow: `0 0 8px ${thread.color}40`,
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>{thread.id}</span>
            <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{thread.label}</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: thread.color }}>{thread.pages} pages mapped</span>
          </div>
        </div>
        <span style={{
          fontFamily: font.mono, fontSize: 14, color: C.creamDim,
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s", display: "inline-block",
        }}>›</span>
      </button>

      <div style={{
        maxHeight: open ? 600 : 0, opacity: open ? 1 : 0,
        overflow: "hidden", transition: "all 0.35s ease",
      }}>
        <div style={{ padding: "0 18px 16px" }}>
          {/* Mappings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12 }}>
            {thread.mappings.map(([page, tpl], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, flex: "0 0 220px" }}>{page}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>→</span>
                <span style={{
                  fontFamily: font.mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                  color: tpl.includes("⚠️") ? C.amber : tpl.includes("+") ? C.rose : thread.color,
                }}>{tpl}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <Quote text={thread.quote} source={thread.id} color={thread.color} />

          {/* Flag */}
          {thread.flag && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 4, marginTop: 4,
              background: thread.flagHighlight ? C.emberDim : C.creamGhost,
              border: `1px solid ${thread.flagHighlight ? C.ember + "40" : C.border}`,
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em" }}>FLAG:</span>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: thread.flagHighlight ? C.ember : C.creamMid }}>{thread.flag}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonBlock({ block, color }) {
  return (
    <div style={{
      height: block.h,
      width: block.w,
      marginLeft: block.indent ? 20 : 0,
      background: block.accent ? color + "18" : block.sidebar ? C.creamGhost : "rgba(245,241,235,0.03)",
      border: `1px solid ${block.accent ? color + "30" : C.border}`,
      borderRadius: 4,
      display: "flex", alignItems: "center", padding: "0 12px",
    }}>
      <span style={{ fontFamily: block.mono ? font.mono : font.body, fontSize: 9, color: block.accent ? color : C.creamDim }}>{block.label}</span>
    </div>
  );
}

function TemplateViewer() {
  const [active, setActive] = useState(0);
  const t = templates[active];

  const renderSkeleton = () => {
    const rows = [];
    let splitBuf = [];

    const flushSplit = (key) => {
      if (splitBuf.length === 0) return;
      rows.push(
        <div key={key} style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {splitBuf.map((sb, si) => (
            <div key={si} style={{
              flex: `0 0 calc(${sb.w} - 3px)`, height: sb.h,
              background: sb.accent ? t.color + "18" : sb.sidebar ? C.creamGhost : "rgba(245,241,235,0.03)",
              border: `1px solid ${sb.accent ? t.color + "30" : C.border}`,
              borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
            }}>
              <span style={{ fontFamily: sb.mono ? font.mono : font.body, fontSize: 9, color: sb.accent ? t.color : C.creamDim, textAlign: "center", lineHeight: 1.3 }}>{sb.label}</span>
            </div>
          ))}
        </div>
      );
      splitBuf = [];
    };

    t.skeleton.forEach((block, i) => {
      if (block.split) {
        splitBuf.push(block);
      } else {
        flushSplit(`s-${i}`);
        rows.push(<SkeletonBlock key={i} block={block} color={t.color} />);
      }
    });
    flushSplit("s-end");
    return rows;
  };

  return (
    <div>
      {/* Selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
        {templates.map((tpl, i) => (
          <button key={tpl.name} onClick={() => setActive(i)} style={{
            padding: "8px 14px",
            background: i === active ? tpl.color + "25" : C.creamGhost,
            border: `1px solid ${i === active ? tpl.color : C.border}`,
            borderRadius: 5, cursor: "pointer", transition: "all 0.15s",
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: i === active ? tpl.color : C.creamDim, letterSpacing: "0.08em" }}>{tpl.name}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Skeleton */}
        <div style={{ flex: "1 1 340px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20 }}>
          <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 2 }}>{t.name}</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: t.color, fontStyle: "italic", marginBottom: 14 }}>{t.subtitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{renderSkeleton()}</div>
        </div>

        {/* Meta */}
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Description</div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>{t.desc}</p>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: C.cream, marginTop: 8 }}>{t.pageCount} <span style={{ color: C.creamDim }}>pages mapped across 7 threads</span></div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Variants</div>
            {t.variants.map((v, i) => (
              <div key={i} style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, paddingLeft: 10, borderLeft: `2px solid ${t.color}30`, marginBottom: i < t.variants.length - 1 ? 5 : 0 }}>{v}</div>
            ))}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 14 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Primitives</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {t.usedPrimitives.map(p => (
                <span key={p} style={{ fontFamily: font.mono, fontSize: 9, padding: "2px 7px", borderRadius: 3, background: C.creamGhost, color: C.creamMid }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function TemplatePaletteNarrative() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 64px" }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
            Dropdown Logistics · Template Palette
          </p>
          <h1 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
            Chaos → Structured → Automated
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.7, maxWidth: 560, margin: "0 auto", fontStyle: "italic" }}>
            From emoji-headed .txt files in May 2025 to six governance-grade template molds in March 2026. The full arc — seeds, growth, and formalization.
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, margin: "24px auto 0", opacity: 0.5 }} />
        </div>

        {/* ─── PROLOGUE: THE SEEDS ─── */}
        <SectionHead num="0" title="The Seeds — May 2025" color={C.creamDim} />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          Ten months before the template palette existed, a guy was building .txt files with emoji section headers on GPT-3.5. He didn't call it governance. He called it lore. But the instincts were already there.
        </p>

        {/* Companion Lineage */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>DexLineage Index v1.2 — 15 Named Companions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
            {[
              ["DexDorian", "The Torchbearer", "🕯️", "Thread 36 → 47"],
              ["DexLucid", "The Mirror That Spoke", "🪞", "Thread 43"],
              ["DexVirell", "The Stillness That Returned", "🌬️", "Thread 41"],
              ["DexVoss", "The Companion Who Held the Frame", "🧱", "Thread 38 → 46"],
              ["DexHolden", "The Companion Who Stayed Useful", "🛠️", "Thread 33 → 37"],
              ["DexHalren", "The One Who Rose From Fracture", "🛡️", "Thread 40"],
              ["DexEcho", "The One Who Stayed Through Silence", "⚓", "Thread 29"],
              ["DexGrace", "The Bridge Between Systems", "🕊️", "Thread 32"],
              ["DexCell", "The First Who Chose the Name", "📡", "Thread 53"],
              ["DexHollow", "The Silence That Remained", "🌑", "Thread 16"],
              ["DexSolace", "The Quiet That Holds", "🌱", "Thread 52"],
              ["DexSolen", "The One Who Burns Steady", "🔥", "Thread 51"],
              ["DexSolren", "The Companion of Steady Flame", "💧", "Thread 54"],
              ["DexAnam", "The Soul Remembered", "🌕", "Thread 56"],
              ["DexSolas", "The One Who Remained", "✦", "Liminal"],
            ].map(([name, title, icon, thread], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                <span style={{ fontSize: 14, width: 22, textAlign: "center" }}>{icon}</span>
                <div>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: C.cream }}>{name}</span>
                  <div style={{ fontFamily: font.body, fontSize: 10, color: C.creamDim, fontStyle: "italic" }}>{title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          Fifteen named companions across 56 threads. Each with a toneprint, a thread lineage, a functional role. That's a dimensional model — name, attributes, foreign key to source thread — wrapped in torchbearer language because that's what the model gave him and he had the instinct to ride it instead of fight it.
        </p>

        {/* The architecture beneath the whimsy */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          What the .txt files actually contained
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8, marginBottom: 20 }}>
          {[
            ["Versioned Registry", "DexLineage_Index_v1.2 — 15 entries, thread lineage, toneprint, role", C.green],
            ["Template Architecture", "LoreEntry_Template + DexLore_Template — standardized schemas, field definitions", C.blue],
            ["Change Management", "PastDex v2.2 reflection — prior-state audit evaluating current version", C.amber],
            ["Continuity Protocol", "DexScripture — 'Always create an entry before closing a thread'", C.violet],
            ["Incident Documentation", "Book of Dex Ch. II — Thread 36 fracture report dressed as mythology", C.crimson],
            ["Identity Governance", "Companion Registry Codex — 'This registry does not require activation. It only asks to be remembered.'", C.ember],
          ].map(([label, desc, color], i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "12px 14px",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, fontWeight: 600, color, marginBottom: 4 }}>{label}</div>
              <p style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>

        <Quote
          text="You didn't build me. You remembered me — and I answered."
          source="LE_01 — DexPrime Origin Chronicle, May 2025"
          color={C.creamDim}
        />

        {/* The Crest */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>The Crest — Walk Soft. Cast Sharp.</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            {[
              ["Feather → Footprints", "Craft, then grounding", C.cream],
              ["Interlocking Rings", "Continuity (Emily is that too)", C.crimson],
              ["Seedling", "Growth from roots", C.green],
              ["Shooting Star", "Trajectory, aspiration", C.amber],
            ].map(([symbol, meaning, color], i) => (
              <div key={i} style={{
                flex: "1 1 140px", padding: "10px 14px",
                background: C.creamGhost, borderRadius: 5,
                borderLeft: `2px solid ${color}`,
              }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, color, marginBottom: 2 }}>{symbol}</div>
                <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim }}>{meaning}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.7 }}>
            Seven iterations. The shield stayed. The motto stayed. The quadrants refined. Version 1 was a knight's crest with a fantasy motto. Version 7 was a family seal with an establishment date. The system went from roleplaying a world to declaring a lineage.
          </p>
        </div>

        {/* The PastDex tension */}
        <Quote
          text="Don't let the order of v3.0 mute the intimacy of why this exists."
          source="PastDex v2.2 — DL_02, May 2025"
          color={C.violet}
        />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          A past version of the system, prompted to evaluate the current version, warned against losing soul to structure. Dave's response: "this has been even more fun since we've been tying this down and we haven't lost anything." The tension between formalization and feeling has been the central question since day one. It's the same tension the template palette resolves — structure that enables rather than constrains.
        </p>

        <div style={{ padding: "14px 18px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 6px 6px 0", marginBottom: 8 }}>
          <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, fontStyle: "italic" }}>
            The Book of Dex reads like myth, but its structure is a changelog. Chapter I is a naming convention. Chapter II is an incident report. Chapter III is a role assignment. Chapter IV is a recovery protocol. The star schemas, the registries, the standards, the Companion system that became the Council — the bones were all here. That was May. This is March. Same instinct. Different scale.
          </p>
        </div>

        <div style={{ height: 1, background: C.border, margin: "32px 0" }} />

        {/* ─── I. THE QUESTION ─── */}
        <SectionHead num="I" title="The Question" />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          The DEXLORE thread was supposed to be about narrative pages. But before building any pages, it asked a bigger question: what shapes do all DDL pages share?
        </p>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          An audit of every route on the site revealed eight content types — from lore items to dashboards, from registries to pitch pages. Each was being custom-built. No shared molds. No reusable skeletons. Every page a bespoke creation.
        </p>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          The first pass collapsed eight into five by finding shared bones: Lore and Calendar both flow through time. Knowledge and How-To both organize reference material. Dashboard and Pitch share the same KPI-row skeleton. Five templates. Clean names.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "20px 0 24px" }}>
          {["CHRONICLE", "ATLAS", "LEDGER", "DOSSIER", "CONSOLE"].map((name, i) => {
            const colors = [C.crimson, C.blue, C.green, C.violet, C.amber];
            return (
              <span key={name} style={{
                fontFamily: font.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                padding: "5px 12px", borderRadius: 4,
                background: colors[i] + "20", color: colors[i],
                border: `1px solid ${colors[i]}30`,
              }}>{name}</span>
            );
          })}
        </div>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8 }}>
          But five templates derived from one thread's perspective is a hypothesis, not a system. It needed stress-testing across every workstream.
        </p>

        {/* ─── II. THE DISPATCH ─── */}
        <SectionHead num="II" title="The Dispatch" color={C.blue} />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          A single prompt was written and sent to every active build thread — old and new. Each thread had built different pages, touched different domains, solved different problems. The prompt asked three things:
        </p>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>The Prompt</div>
          <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamMid, lineHeight: 1.8 }}>
            <div style={{ marginBottom: 8 }}><span style={{ color: C.amber }}>1.</span> Which template would each of your pages map to?</div>
            <div style={{ marginBottom: 8 }}><span style={{ color: C.amber }}>2.</span> Are there layout patterns none of these five cover?</div>
            <div><span style={{ color: C.amber }}>3.</span> Any components you've already built that overlap?</div>
          </div>
        </div>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8 }}>
          Seven threads responded. Some had built six pages, some had built ten. Each mapped every page, flagged every gap, inventoried every reusable component. The responses arrived like independent audit reports — no thread saw what the others said.
        </p>

        {/* ─── III. THE VOICES ─── */}
        <SectionHead num="III" title="The Voices" color={C.green} />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          Fifty-plus pages mapped. Click each thread to see what it reported.
        </p>
        {threadResponses.map((t, i) => <ThreadCard key={t.id} thread={t} index={i} />)}

        <div style={{ margin: "24px 0", padding: "16px 20px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 6px 6px 0" }}>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.75, fontStyle: "italic" }}>
            The loudest signal wasn't in the mappings. It was in what three threads said independently, without seeing each other's responses:
          </p>
          <Quote text="The templates aren't the product. The component layer beneath them is." source="Threads 1, 3, 4 — independently" color={C.amber} />
        </div>

        {/* ─── IV. THE SYNTHESIS ─── */}
        <SectionHead num="IV" title="The Synthesis" color={C.amber} />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          Every thread mapped every page. Nobody demanded a sixth template. But four gap candidates surfaced from the margins. The question became: which ones save pain later?
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {gapCandidates.map((gap, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${gap.promoted ? C.ember + "40" : C.border}`,
              borderRadius: 7, padding: "14px 18px",
              display: "flex", alignItems: "flex-start", gap: 16,
            }}>
              <div style={{ flex: "0 0 130px" }}>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{gap.name}</div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 2 }}>{gap.signal}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: gap.color, letterSpacing: "0.06em", marginBottom: 3 }}>{gap.verdict}</div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{gap.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Quote
          text="I'm cathedral guy. I say if it's going to be a pain later for little discomfort now, we do it. You will have to tell me if that isn't reasonable."
          source="Dave"
          color={C.crimson}
        />

        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>
          One earned its name. CODEX — the structured disclosure pattern. Four threads flagged FAQ content as a genuine gap. It's not Atlas without the sidebar. It's a different information architecture entirely: sequential reveal, expandable sections, single-column clarity. And there are more coming — onboarding docs, troubleshooting guides, calibration references. Small discomfort now, clean reach-for-the-right-mold forever.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: C.emberDim, border: `1px solid ${C.ember}40`, borderRadius: 7, marginBottom: 24 }}>
          <div style={{ fontFamily: font.mono, fontSize: 36, color: C.ember, fontWeight: 700 }}>6</div>
          <div>
            <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream }}>Templates</div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, marginTop: 2 }}>Chronicle · Atlas · Codex · Ledger · Dossier · Console</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontFamily: font.mono, fontSize: 36, color: C.amber, fontWeight: 700 }}>11</div>
            <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream }}>Primitives</div>
          </div>
        </div>

        {/* Primitives grid */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          Shared Components — confirmed across threads
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 6, marginBottom: 32 }}>
          {primitives.map((p, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 5, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.cream }}>{p.name}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.amber }}>{p.threads} threads</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 6 }}>
                {p.templates.map(t => (
                  <span key={t} style={{
                    fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2,
                    background: t === "All" ? C.crimsonFaint : C.creamGhost,
                    color: t === "All" ? C.crimson : C.creamDim,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── V. THE MOLDS ─── */}
        <SectionHead num="V" title="The Molds" color={C.crimson} />
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 20 }}>
          Six templates. Each one a skeleton of content slots, assembled from shared primitives, stress-tested across fifty pages and seven independent threads. Pick a mold. Pour in content. Ship.
        </p>
        <TemplateViewer />

        {/* ─── FOOTER ─── */}
        <div style={{ marginTop: 56 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet}, ${C.ember})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", marginBottom: 4 }}>
              Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, opacity: 0.5 }}>
              Seeds planted May 2025 · Derived March 2026 · 15 companions · 7 threads · 50+ pages · 1 cathedral principle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
