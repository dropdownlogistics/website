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
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════
const categories = [
  { name: "Lore Item", icon: "📜", desc: "Narrative/myth content about a system, era, or event", examples: "Era pages, origin stories, The Cleanest Day", color: C.crimson, template: "CHRONICLE" },
  { name: "Knowledge Item", icon: "🗺️", desc: "Technical/structural documentation", examples: "Methodology, star schema explanations", color: C.blue, template: "ATLAS" },
  { name: "Registry/Catalog", icon: "📋", desc: "Dense indexed collections", examples: "Systems registry, standards list", color: C.green, template: "LEDGER" },
  { name: "Profile", icon: "👤", desc: "Entity or model spotlight", examples: "Council profiles, operator profile", color: C.violet, template: "DOSSIER" },
  { name: "Dashboard/Analytics", icon: "📊", desc: "Data visualization and metrics", examples: "BlindSpot dashboards, DexDash", color: C.amber, template: "CONSOLE" },
  { name: "Release/Calendar", icon: "📅", desc: "Sequential publication tracking", examples: "Memoir release calendar, Substack schedule", color: C.crimson, template: "CHRONICLE" },
  { name: "Guide/How-To", icon: "🔧", desc: "Step-by-step instructional", examples: "LLM setup guide, integration docs", color: C.blue, template: "ATLAS" },
  { name: "Pitch/Showcase", icon: "🎯", desc: "Persuasive presentation of a product", examples: "BlindSpot landing, campaign pitch", color: C.amber, template: "CONSOLE" },
];

const convergenceRules = [
  { from: ["Lore Item", "Release/Calendar"], to: "CHRONICLE", reason: "Both are time-ordered narratives. Calendar adds episode grids and progress bars as variants.", color: C.crimson },
  { from: ["Knowledge Item", "Guide/How-To"], to: "ATLAS", reason: "Both are structured reference. Guides swap diagrams for numbered steps. Same sidebar + concept card bones.", color: C.blue },
  { from: ["Registry/Catalog"], to: "LEDGER", reason: "Standalone shape. Dense, filterable, sortable, badge-heavy. Nothing else shares this DNA.", color: C.green },
  { from: ["Profile"], to: "DOSSIER", reason: "Standalone shape. Hero name, stat block, narrative bio. Nine Council profiles guarantee volume.", color: C.violet },
  { from: ["Dashboard/Analytics", "Pitch/Showcase"], to: "CONSOLE", reason: "Same skeleton — KPI row, viz slot, data grid. Pitch variant swaps data for feature cards + CTA.", color: C.amber },
];

const codexAddition = {
  name: "CODEX",
  reason: "7 threads. 4 flagged FAQ/Q&A as a gap. Expandable sections, jump links, single column. Not Atlas (no sidebar), not Ledger (not filterable). Distinct disclosure-based shape.",
  color: C.ember,
  sources: ["Council Calibration FAQ", "Onboarding docs", "Troubleshooting guides", "Calibration references"],
};

const primitives = [
  { name: "Stat Row", templates: ["Console", "Chronicle", "Ledger", "Dossier"], threads: 7, desc: "Horizontal KPI blocks — large mono number + dim label" },
  { name: "Filter Bar", templates: ["Ledger", "Console"], threads: 5, desc: "Tag-based filters, search input, sort toggle" },
  { name: "Card Grid", templates: ["Ledger", "Console", "Atlas"], threads: 6, desc: "Responsive card grid with status coloring" },
  { name: "Tag/Badge", templates: ["All"], threads: 7, desc: "Color-coded pills — status, domain, type, tier" },
  { name: "Pull Quote", templates: ["Chronicle", "Dossier"], threads: 4, desc: "Left crimson border, serif italic, attribution" },
  { name: "Timeline Spine", templates: ["Chronicle", "Console"], threads: 5, desc: "Vertical/horizontal with phase markers and status dots" },
  { name: "Detail Overlay", templates: ["Ledger", "Dossier"], threads: 3, desc: "Modal/drawer rendering Dossier content inside Ledger" },
  { name: "Insight Callout", templates: ["Chronicle", "Atlas", "Codex"], threads: 6, desc: "Colored left-border box with label + prose" },
  { name: "Collapsible Section", templates: ["Dossier", "Atlas", "Codex"], threads: 5, desc: "Expand/collapse with rotation indicator" },
  { name: "Section Nav", templates: ["Atlas", "Codex", "Dossier"], threads: 4, desc: "Jump links, TOC rail, or step tracker" },
  { name: "Accent Footer", templates: ["All"], threads: 7, desc: "Gradient accent bar + cottage tagline. Universal." },
];

const templates = [
  {
    name: "CHRONICLE",
    subtitle: "The Narrative Spine",
    color: C.crimson,
    desc: "Long-form reading with breathing room. Time-ordered. Atmospheric.",
    categories: ["Lore Item", "Release/Calendar"],
    pageCount: "12+",
    skeleton: [
      { label: "Date Label", h: 16, w: "30%", accent: true },
      { label: "H1 — Serif, Large", h: 32, w: "70%" },
      { label: "Italic Subtitle", h: 18, w: "55%" },
      { label: "Mono Metadata", h: 14, w: "40%", mono: true },
      { label: "Crimson Divider", h: 2, w: "15%", accent: true },
      { label: "Body — 700px Column", h: 80, w: "100%" },
      { label: "Timeline Moment", h: 48, w: "90%", indent: true },
      { label: "Timeline Moment", h: 48, w: "90%", indent: true },
      { label: "Pull Quote Block", h: 44, w: "85%", accent: true },
      { label: "Transition + Next Link", h: 28, w: "60%" },
    ],
    variants: ["Lore (atmospheric, giant numeral)", "Calendar (episode grid, progress bars)"],
    primitiveNames: ["Stat Row", "Pull Quote", "Timeline Spine", "Insight Callout", "Accent Footer"],
  },
  {
    name: "ATLAS",
    subtitle: "The Reference Map",
    color: C.blue,
    desc: "Structured information with visual connectors. Diagrams, concept cards, sidebar rail.",
    categories: ["Knowledge Item", "Guide/How-To"],
    pageCount: "8+",
    skeleton: [
      { label: "Roman Numeral Box + H1 + Line", h: 28, w: "100%" },
      { label: "Diagram / SVG Visual", h: 60, w: "100%" },
      { label: "Primary Content (65%)", h: 120, w: "63%", split: true },
      { label: "Sidebar Rail (35%)", h: 120, w: "33%", split: true, sidebar: true },
      { label: "Concept Card Grid", h: 56, w: "100%" },
      { label: "Cross-Reference Tags", h: 20, w: "70%" },
    ],
    variants: ["Knowledge (diagrams, See Also links)", "Guide (numbered steps, checklist)"],
    primitiveNames: ["Card Grid", "Tag/Badge", "Section Nav", "Insight Callout", "Collapsible Section", "Accent Footer"],
  },
  {
    name: "CODEX",
    subtitle: "The Structured Disclosure",
    color: C.ember,
    desc: "Sequential reveal. Expandable sections, jump links, single column. FAQ, calibration, onboarding.",
    categories: ["FAQ/Q&A (new)"],
    pageCount: "4+",
    skeleton: [
      { label: "H1 + Description", h: 28, w: "80%" },
      { label: "Section Jump Nav", h: 22, w: "100%", mono: true },
      { label: "Crimson Divider", h: 2, w: "15%", accent: true },
      { label: "Section Header", h: 20, w: "50%", accent: true },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Section Header", h: 20, w: "50%", accent: true },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
      { label: "Expandable Q/A Pair", h: 36, w: "100%" },
    ],
    variants: ["FAQ (question/answer pairs)", "Calibration (parameter/value pairs)", "Onboarding (task/instruction pairs)"],
    primitiveNames: ["Collapsible Section", "Section Nav", "Insight Callout", "Tag/Badge", "Accent Footer"],
  },
  {
    name: "LEDGER",
    subtitle: "The Dense Index",
    color: C.green,
    desc: "Filterable, sortable, badge-heavy. Registries, catalogs, collections.",
    categories: ["Registry/Catalog"],
    pageCount: "6+",
    skeleton: [
      { label: "H1 + Stats Row (count, categories, updated)", h: 28, w: "100%" },
      { label: "Filter Bar — Tags + Search + Sort", h: 24, w: "100%", mono: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Card", h: 44, w: "31%", split: true },
      { label: "Show More / Pagination", h: 18, w: "30%" },
    ],
    variants: ["Standard (3-col grid)", "Compact (list rows)", "With detail overlay (Dossier modal)"],
    primitiveNames: ["Stat Row", "Filter Bar", "Card Grid", "Tag/Badge", "Detail Overlay", "Accent Footer"],
  },
  {
    name: "DOSSIER",
    subtitle: "The Entity Spotlight",
    color: C.violet,
    desc: "One subject, deep context. Hero name, stat block, directive, narrative bio.",
    categories: ["Profile"],
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
    primitiveNames: ["Stat Row", "Pull Quote", "Collapsible Section", "Tag/Badge", "Card Grid", "Accent Footer"],
  },
  {
    name: "CONSOLE",
    subtitle: "The Data Surface",
    color: C.amber,
    desc: "Dense, metric-forward, visual. Dashboards, analytics, pitch pages.",
    categories: ["Dashboard/Analytics", "Pitch/Showcase"],
    pageCount: "8+",
    skeleton: [
      { label: "H1 + Mono Metadata (updated, source, version)", h: 24, w: "80%" },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "KPI", h: 38, w: "23%", split: true },
      { label: "Primary Viz Slot (flexible)", h: 90, w: "100%" },
      { label: "Secondary Grid — Breakdowns", h: 56, w: "100%" },
      { label: "Data Table (optional)", h: 48, w: "100%" },
    ],
    variants: ["Dashboard (KPI + chart + table)", "Pitch (hero hook + feature cards + CTA)", "Interactive (full React component in viz slot)"],
    primitiveNames: ["Stat Row", "Filter Bar", "Card Grid", "Tag/Badge", "Timeline Spine", "Accent Footer"],
  },
];

// ═══════════════════════════════════════════════════════════
// Phases
// ═══════════════════════════════════════════════════════════
const phases = [
  { id: "chaos", label: "I", title: "Chaos", subtitle: "8 Content Types" },
  { id: "convergence", label: "II", title: "Structured", subtitle: "The Convergence" },
  { id: "codex", label: "III", title: "The 6th", subtitle: "CODEX Emerges" },
  { id: "primitives", label: "IV", title: "Primitives", subtitle: "Shared Components" },
  { id: "templates", label: "V", title: "Automated", subtitle: "6 Molds" },
];

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function PhaseNav({ active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 32 }}>
      {phases.map((p, i) => {
        const isActive = p.id === active;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              flex: 1,
              padding: "12px 8px",
              background: isActive ? C.crimsonDim : C.creamGhost,
              border: `1px solid ${isActive ? C.crimson : C.border}`,
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: font.mono, fontSize: 10, color: isActive ? C.crimson : C.creamDim, letterSpacing: "0.15em", marginBottom: 2 }}>
              {p.label}
            </div>
            <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: isActive ? C.cream : C.creamMid }}>
              {p.title}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: isActive ? C.creamMid : C.creamDim, marginTop: 1 }}>
              {p.subtitle}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SectionLabel({ text, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ width: 28, height: 28, borderRadius: 5, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      </div>
      <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

// ─── Phase: Chaos ───
function PhaseChaos() {
  return (
    <div>
      <SectionLabel text="The Surface — 8 Content Categories" />
      <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75, marginBottom: 24, maxWidth: 640 }}>
        Every page on the site falls into a content type. Before templates existed, each page was a custom build. Eight categories emerged from auditing every route.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 7,
              padding: "16px 18px",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{cat.name}</span>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6, marginBottom: 8 }}>{cat.desc}</p>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: cat.color, letterSpacing: "0.04em" }}>{cat.examples}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: "14px 18px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 6px 6px 0" }}>
        <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, fontStyle: "italic" }}>
          Eight types. Each one getting custom-built per page. This is the chaos phase — functional, but not transferable. The question: how many of these are actually different shapes?
        </p>
      </div>
    </div>
  );
}

// ─── Phase: Convergence ───
function PhaseConvergence() {
  return (
    <div>
      <SectionLabel text="The Collapse — 8 → 5" color={C.blue} />
      <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75, marginBottom: 24, maxWidth: 640 }}>
        Sent the palette to 7 active build threads. Asked each: which template fits your pages? The responses revealed shared bones beneath different skin.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {convergenceRules.map((rule, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
            {/* From */}
            <div style={{ flex: "0 0 180px" }}>
              {rule.from.map((f) => (
                <div key={f} style={{ fontFamily: font.display, fontSize: 13, color: C.creamHigh, marginBottom: 2 }}>{f}</div>
              ))}
            </div>
            {/* Arrow */}
            <div style={{ fontFamily: font.mono, fontSize: 18, color: rule.color, flex: "0 0 32px", textAlign: "center", paddingTop: 2 }}>→</div>
            {/* To */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: rule.color, letterSpacing: "0.08em", marginBottom: 4 }}>{rule.to}</div>
              <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{rule.reason}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: "14px 18px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 6px 6px 0" }}>
        <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, fontStyle: "italic" }}>
          Five templates. Every thread mapped every page. Nobody said "I need a 6th." But four threads flagged something that didn't fit cleanly...
        </p>
      </div>
    </div>
  );
}

// ─── Phase: Codex ───
function PhaseCodex() {
  const gaps = [
    { name: "FAQ / Q&A", signal: "4 threads flagged", verdict: "PROMOTE → CODEX", verdictColor: C.ember, desc: "Genuinely different shape. Disclosure-based, not spatial. You'll build more of these." },
    { name: "Guided Wizard", signal: "2 threads flagged", verdict: "VARIANT → Atlas-Sequential", verdictColor: C.blue, desc: "Atlas with a linear constraint. Two pages exist. Sidebar becomes step tracker." },
    { name: "Day Archive", signal: "2 threads flagged", verdict: "CONVENTION → Freestyle Composite", verdictColor: C.creamDim, desc: "A template whose rule is 'no rules' isn't a template. Assemble from primitives." },
    { name: "Feed / Stream", signal: "1 thread flagged", verdict: "PRIMITIVE → Embedded Component", verdictColor: C.creamDim, desc: "Not a page. A scrollable compact list that gets embedded inside Chronicle or Ledger." },
  ];
  return (
    <div>
      <SectionLabel text="The 6th Mold — CODEX Emerges" color={C.ember} />
      <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75, marginBottom: 24, maxWidth: 640 }}>
        Four gap candidates surfaced. The cathedral question: which ones save pain later? One earned its name. Three didn't.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {gaps.map((gap, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${i === 0 ? C.ember + "40" : C.border}`, borderRadius: 7, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: "0 0 140px" }}>
              <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 3 }}>{gap.name}</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{gap.signal}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: gap.verdictColor, letterSpacing: "0.06em", marginBottom: 4 }}>{gap.verdict}</div>
              <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{gap.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: C.emberDim, border: `1px solid ${C.ember}40`, borderRadius: 7 }}>
        <div style={{ fontFamily: font.mono, fontSize: 28, color: C.ember, fontWeight: 700 }}>6</div>
        <div>
          <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>Final count: 6 templates, 11 shared primitives</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, marginTop: 2 }}>Chronicle · Atlas · Codex · Ledger · Dossier · Console</div>
        </div>
      </div>
    </div>
  );
}

// ─── Phase: Primitives ───
function PhasePrimitives() {
  return (
    <div>
      <SectionLabel text="The Component Layer — Shared Primitives" color={C.green} />
      <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75, marginBottom: 24, maxWidth: 640 }}>
        Seven threads said it independently: the templates aren't the product. The shared components beneath them are. Pages compose across template boundaries. These primitives are the real building blocks.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {primitives.map((p, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: "0 0 120px" }}>
              <div style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: C.cream }}>{p.name}</div>
            </div>
            <div style={{ flex: "0 0 20px", fontFamily: font.mono, fontSize: 10, color: C.amber, textAlign: "center" }}>{p.threads}</div>
            <div style={{ flex: 1, fontFamily: font.body, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{ flex: "0 0 200px", display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-end" }}>
              {p.templates.map((t) => {
                const tpl = templates.find(tp => tp.name === t.toUpperCase()) || { color: C.creamDim };
                const isAll = t === "All";
                return (
                  <span key={t} style={{
                    fontFamily: font.mono,
                    fontSize: 8,
                    letterSpacing: "0.06em",
                    padding: "2px 6px",
                    borderRadius: 3,
                    background: isAll ? C.crimsonFaint : (tpl.color || C.creamDim) + "18",
                    color: isAll ? C.crimson : (tpl.color || C.creamDim),
                  }}>
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, fontFamily: font.mono, fontSize: 10, color: C.creamDim, textAlign: "center", letterSpacing: "0.06em" }}>
        Number = threads that independently confirmed the component exists
      </div>
    </div>
  );
}

// ─── Phase: Templates ───
function PhaseTemplates() {
  const [active, setActive] = useState(0);
  const t = templates[active];

  return (
    <div>
      <SectionLabel text="The 6 Molds — Template Skeletons" color={C.amber} />
      {/* Template selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {templates.map((tpl, i) => (
          <button
            key={tpl.name}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 14px",
              background: i === active ? tpl.color + "25" : C.creamGhost,
              border: `1px solid ${i === active ? tpl.color : C.border}`,
              borderRadius: 5,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 700, color: i === active ? tpl.color : C.creamDim, letterSpacing: "0.08em" }}>{tpl.name}</div>
          </button>
        ))}
      </div>

      {/* Template detail */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Left: skeleton */}
        <div style={{ flex: "1 1 340px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20 }}>
          <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 2 }}>{t.name}</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: t.color, fontStyle: "italic", marginBottom: 12 }}>{t.subtitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(() => {
              let inSplit = false;
              const rows = [];
              let splitGroup = [];

              t.skeleton.forEach((block, i) => {
                if (block.split) {
                  splitGroup.push(block);
                } else {
                  if (splitGroup.length > 0) {
                    rows.push(
                      <div key={`split-${i}`} style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {splitGroup.map((sb, si) => (
                          <div
                            key={si}
                            style={{
                              flex: `0 0 calc(${sb.w} - 3px)`,
                              height: sb.h,
                              background: sb.accent ? t.color + "18" : sb.sidebar ? C.creamGhost : "rgba(245,241,235,0.03)",
                              border: `1px solid ${sb.accent ? t.color + "30" : C.border}`,
                              borderRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0 8px",
                            }}
                          >
                            <span style={{ fontFamily: sb.mono ? font.mono : font.body, fontSize: 9, color: sb.accent ? t.color : C.creamDim, textAlign: "center", lineHeight: 1.3 }}>{sb.label}</span>
                          </div>
                        ))}
                      </div>
                    );
                    splitGroup = [];
                  }
                  splitGroup = [];
                  if (block.split) {
                    splitGroup.push(block);
                  } else {
                    rows.push(
                      <div
                        key={i}
                        style={{
                          height: block.h,
                          width: block.w,
                          marginLeft: block.indent ? 20 : 0,
                          background: block.accent ? t.color + "18" : "rgba(245,241,235,0.03)",
                          border: `1px solid ${block.accent ? t.color + "30" : C.border}`,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          padding: "0 12px",
                        }}
                      >
                        <span style={{ fontFamily: block.mono ? font.mono : font.body, fontSize: 9, color: block.accent ? t.color : C.creamDim }}>{block.label}</span>
                      </div>
                    );
                  }
                }
              });
              // flush remaining split
              if (splitGroup.length > 0) {
                rows.push(
                  <div key="split-end" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {splitGroup.map((sb, si) => (
                      <div
                        key={si}
                        style={{
                          flex: `0 0 calc(${sb.w} - 3px)`,
                          height: sb.h,
                          background: sb.accent ? t.color + "18" : sb.sidebar ? C.creamGhost : "rgba(245,241,235,0.03)",
                          border: `1px solid ${sb.accent ? t.color + "30" : C.border}`,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 8px",
                        }}
                      >
                        <span style={{ fontFamily: sb.mono ? font.mono : font.body, fontSize: 9, color: sb.accent ? t.color : C.creamDim, textAlign: "center", lineHeight: 1.3 }}>{sb.label}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return rows;
            })()}
          </div>
        </div>

        {/* Right: metadata */}
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Description</div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>{t.desc}</p>
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Categories Served</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {t.categories.map(c => (
                <span key={c} style={{ fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3, background: t.color + "18", color: t.color }}>{c}</span>
              ))}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: C.cream, marginTop: 10 }}>{t.pageCount} <span style={{ color: C.creamDim }}>pages mapped</span></div>
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Variants</div>
            {t.variants.map((v, i) => (
              <div key={i} style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, paddingLeft: 10, borderLeft: `2px solid ${t.color}30`, marginBottom: i < t.variants.length - 1 ? 6 : 0 }}>{v}</div>
            ))}
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Primitives Used</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {t.primitiveNames.map(p => (
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
// Main App
// ═══════════════════════════════════════════════════════════
export default function TemplatePalette() {
  const [phase, setPhase] = useState("chaos");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "32px 24px 48px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>
            DDL Template Palette
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, marginBottom: 4, lineHeight: 1.2 }}>
            Chaos → Structured → Automated
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6 }}>
            How 8 content types became 6 reusable molds. Derived from 7 threads, 50+ pages, and the cathedral principle.
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 16, opacity: 0.5 }} />
        </div>

        {/* Phase Nav */}
        <PhaseNav active={phase} onSelect={setPhase} />

        {/* Phase Content */}
        <div style={{ minHeight: 400 }}>
          {phase === "chaos" && <PhaseChaos />}
          {phase === "convergence" && <PhaseConvergence />}
          {phase === "codex" && <PhaseCodex />}
          {phase === "primitives" && <PhasePrimitives />}
          {phase === "templates" && <PhaseTemplates />}
        </div>

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
