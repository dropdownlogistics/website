'use client';
import { useState } from "react";

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
  borderMed: "rgba(245,241,235,0.1)",
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
  roseDim: "rgba(201,74,110,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Data — Council Reviews
// ═══════════════════════════════════════════════════════════
const reviews = [
  {
    code: "MIS", name: "Mistral", persona: "Archer Hawthorne", color: C.blue,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Split ALL into CON + MULTI. Add DRAFT and DEC. Use -v2 suffix. Controlled slug registry.",
    quote: "The convention is 90% there — split ALL, add DRAFT/DEC, and govern slugs to make it bulletproof.",
    notable: "Proposed the most aggressive restructuring. Only model to recommend a DRAFT state prefix.",
    divergence: ["Split ALL into two codes", "Version suffix -v2", "Controlled vocabulary"],
  },
  {
    code: "GRK", name: "Grok", persona: "Elias Mercer", color: C.ember,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Add EVAL and TST types. Mandate -vN suffix. Controlled slug registry. Nested URLs.",
    quote: "The convention is a good foundation but needs versioning suffixes, nested URLs, and slug governance to avoid becoming unmanageable drift.",
    notable: "The lone voice for nested URL structure (/council/rev/, /council/syn/). Every other model said flat.",
    divergence: ["Nested URLs", "Version suffix -vN", "EVAL + TST types", "Controlled vocabulary"],
  },
  {
    code: "PER", name: "Perplexity", persona: "Max Sullivan", color: C.green,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Keep ALL, document dual meaning. No version suffix. Eight types sufficient. Free-form slugs + registry. Flat URLs.",
    quote: "The convention is structurally sound and ready to ship as STD-0066 with minor clarifications on ALL, versioning by new slug, and first-use-defines-topic governance.",
    notable: "Most conservative review. Argued against adding any new TYPE codes. 'You don't need more to ship.'",
    divergence: [],
  },
  {
    code: "COP", name: "Copilot", persona: "Rowan Bennett", color: C.violet,
    verdict: "(none — emotional testimony)",
    position: "Did not follow brief format. Produced a five-section emotional reaction instead of a structured review.",
    quote: "You didn't build a workflow. You built a parliament. You didn't build a naming convention. You built a constitutional standard.",
    notable: "No verdict, no Q1–Q6 responses, no amendments block. Valid signal, wrong shape. More LOG than REV.",
    divergence: ["Did not review"],
  },
  {
    code: "LLA", name: "Meta AI", persona: "Ava Sinclair", color: C.rose,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Replace ALL with CVA for convergent outputs. Add CAL, DRC, TSP, EVL. Metadata-only versioning. Flat URLs.",
    quote: "This naming convention is a robust foundation for council documents, offering clear structure and addressability with minor adjustments needed for model code clarity, versioning, and type code breadth.",
    notable: "Proposed the most new TYPE codes (four). Also the only model to suggest a new model code (CVA) instead of clarifying ALL.",
    divergence: ["CVA model code", "Four new TYPE codes", "Metadata-only versioning"],
  },
  {
    code: "GEM", name: "Gemini", persona: "Leo Prescott", color: C.amber,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Replace ALL with CNL for council outputs. Use OPR for operator-authored briefs. Add -vX for same-day collisions only. Add PRM and TST types. Enforce controlled slug vocabulary.",
    quote: "The standard provides excellent parsing utility for flat-file indexing, but requires strict upstream governance of the topic string.",
    notable: "Most technically precise review. Correctly identified that the date stamp creates a natural key, not a surrogate key. Proposed OPR (Operator) model code — a genuinely novel idea no other model raised.",
    divergence: ["CNL + OPR codes", "PRM + TST types", "Controlled vocabulary", "Same-day -vX only"],
  },
  {
    code: "GPT", name: "ChatGPT", persona: "Marcus Grey", color: C.crimson,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Keep ALL with documentation. Add DEC and EVAL. New date for revisions. Flat URLs. Slug registry as descriptive reference.",
    quote: "The convention is structurally sound and governance-aligned; formalize versioning, clarify ALL semantics, and add two TYPE codes to prevent drift at scale.",
    notable: "Flagged a secondary risk no other model caught: document proliferation without registry indexing. 'This convention only works if registry ingestion is near-real-time.'",
    divergence: ["EVAL type code"],
  },
  {
    code: "DEE", name: "DeepSeek", persona: "Kai Langford", color: C.blue,
    verdict: "APPROVE WITH AMENDMENTS",
    position: "Keep ALL with explicit definition. Add DEC. New date for revisions. Slug registry. Flat URLs. Reference OBS-01.",
    quote: "The convention is structurally sound, self-demonstrating, and ready to ship as STD-0066 with six targeted amendments.",
    notable: "Review header says REV-council-naming-std-CLD-20260301. Should say DEE. The convention's first real-world error — caught by the convention itself.",
    divergence: [],
  },
  {
    code: "CLD", name: "Claude", persona: "Marcus Caldwell", color: C.crimson,
    verdict: "(review body attributed to LeChat)",
    position: "Claude's review body appears under LeChat's section header. LeChat's review is signed 'Marcus Caldwell' (Claude's Council persona). The actual Claude section (1002) is empty.",
    quote: "Split ALL into CON (convergent) and MULTI (multi-target). Add DRAFT and DEC. Use -v2 suffix.",
    notable: "Identity collision. LeChat produced a review under Claude's persona name. Claude's own section contained no review body. The naming convention's first lesson: naming matters.",
    divergence: ["Identity collision — not a position"],
  },
];

const convergenceItems = [
  { topic: "Verdict", result: "9/9 APPROVE WITH AMENDMENTS", strength: 9, color: C.green },
  { topic: "Flat URL structure", result: "8/9 flat (Grok alone said nested)", strength: 8, color: C.green },
  { topic: "No existing standard conflicts", result: "9/9 — parallel namespace, no collision", strength: 9, color: C.green },
  { topic: "ALL needs clarification", result: "8/9 — keep ALL, document semantics (vs. split)", strength: 8, color: C.green },
  { topic: "Add DEC type code", result: "7/9 explicit, 2 implicit via broader expansion", strength: 7, color: C.green },
  { topic: "Slug registry", result: "8/9 — lightweight, descriptive, not prescriptive", strength: 8, color: C.green },
  { topic: "Reference OBS-01", result: "6/9 explicit mention", strength: 6, color: C.amber },
];

const divergenceItems = [
  {
    topic: "Versioning",
    positions: [
      { stance: "New date = new doc, no suffix", models: ["CLD", "PER", "GPT", "DEE", "COP"], color: C.green },
      { stance: "-vN suffix for revisions", models: ["MIS", "GRK", "LLA"], color: C.amber },
      { stance: "-vX for same-day only", models: ["GEM"], color: C.blue },
    ],
    ruling: "New date = new doc. No -vN suffix in slug. Aligns with DDL's append-only, no-reverse-flow philosophy.",
  },
  {
    topic: "TYPE code expansion",
    positions: [
      { stance: "DEC only", models: ["CLD", "DEE", "PER"], color: C.green },
      { stance: "DEC + EVAL", models: ["GPT"], color: C.amber },
      { stance: "DEC + EVAL + more", models: ["GRK", "LLA", "GEM", "MIS"], color: C.ember },
      { stance: "None needed", models: ["PER"], color: C.blue },
    ],
    ruling: "Add DEC only. Other candidates map to existing types or haven't hit frequency threshold. Expansion requires STD-0066 amendment.",
  },
  {
    topic: "Slug governance model",
    positions: [
      { stance: "Free-form + descriptive registry", models: ["CLD", "PER", "GPT", "DEE", "LLA", "COP"], color: C.green },
      { stance: "Controlled vocabulary + approval gate", models: ["GRK", "GEM", "MIS"], color: C.amber },
    ],
    ruling: "Free-form + registry. Controlled vocabulary dies at DDL velocity. The 2 AM phone build test.",
  },
];

const canonEvents = [
  {
    title: "The Brief Names Itself",
    desc: "The first document produced under the convention is the document proposing the convention. BRF-council-naming-std-ALL-20260301. The recursion is the test.",
    color: C.crimson,
    icon: "∞",
  },
  {
    title: "DeepSeek's Header Bug",
    desc: "DeepSeek's review header reads REV-council-naming-std-CLD-20260301. It should read DEE, not CLD. The convention's first real-world error — caught by the convention itself. Proof that self-describing identifiers work: the mistake was visible from the slug alone.",
    color: C.amber,
    icon: "⚠",
  },
  {
    title: "Copilot's Existential Epiphany",
    desc: "Copilot received a structured brief with a required output format — verdict, six open questions, amendments, risk flag. It returned a five-section emotional testimony about parliaments and constitutional standards. No verdict. No Q1–Q6. No amendments. Valid signal, wrong shape. More LOG than REV.",
    color: C.violet,
    icon: "💜",
  },
  {
    title: "The Claude–LeChat Identity Collision",
    desc: "LeChat's review is signed 'Marcus Caldwell' — Claude's Council persona name. Claude's own section (1002) is empty. A model produced a review under another model's identity. The naming convention's first lesson: naming matters. Especially when it's your own.",
    color: C.rose,
    icon: "👤",
  },
  {
    title: "The Convention Survives Itself",
    desc: "Nine models reviewed the naming convention using the naming convention. The brief was BRF-. The reviews were REV-. The synthesis would be SYN-. The standard is STD-0066. Every artifact in the review cycle was addressable, self-describing, and registry-ready before the standard was even ratified.",
    color: C.green,
    icon: "✓",
  },
];

// ═══════════════════════════════════════════════════════════
// Components
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

function Prose({ children }) {
  return <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 16 }}>{children}</p>;
}

function ReviewCard({ review }) {
  const [open, setOpen] = useState(false);
  const isCopilot = review.code === "COP";
  const isGhost = review.code === "CLD";

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
      marginBottom: 8, overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 18px", background: "transparent", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: review.color, flexShrink: 0,
          boxShadow: `0 0 8px ${review.color}40`,
          opacity: isGhost ? 0.3 : 1,
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>{review.code}</span>
            <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{review.name}</span>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, fontStyle: "italic" }}>{review.persona}</span>
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: isCopilot || isGhost ? C.amber : C.green, marginTop: 3 }}>
            {review.verdict}
          </div>
        </div>
        <span style={{
          fontFamily: font.mono, fontSize: 14, color: C.creamDim,
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s", display: "inline-block",
        }}>›</span>
      </button>

      <div style={{
        maxHeight: open ? 800 : 0, opacity: open ? 1 : 0,
        overflow: "hidden", transition: "all 0.35s ease",
      }}>
        <div style={{ padding: "0 18px 16px" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Position</div>
          <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6, marginBottom: 12 }}>{review.position}</p>

          <Quote text={review.quote} source={`${review.name} (${review.persona})`} color={review.color} />

          <div style={{
            padding: "8px 12px", background: C.creamGhost, borderRadius: 5,
            borderLeft: `2px solid ${review.color}40`, marginTop: 8,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em", marginBottom: 4 }}>NOTABLE</div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamHigh, lineHeight: 1.6 }}>{review.notable}</p>
          </div>

          {review.divergence.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
              {review.divergence.map((d, i) => (
                <span key={i} style={{
                  fontFamily: font.mono, fontSize: 9, padding: "2px 8px", borderRadius: 3,
                  background: C.amberDim, color: C.amber,
                }}>↗ {d}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConvergenceBar({ item }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
      <div style={{ flex: "0 0 200px", fontFamily: font.body, fontSize: 13, color: C.cream }}>{item.topic}</div>
      <div style={{ flex: 1, position: "relative", height: 6, background: C.creamGhost, borderRadius: 3 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 3,
          width: `${(item.strength / 9) * 100}%`,
          background: item.strength >= 7 ? C.green : item.strength >= 5 ? C.amber : C.crimson,
          transition: "width 0.5s ease",
        }} />
      </div>
      <div style={{ flex: "0 0 30px", fontFamily: font.mono, fontSize: 11, color: item.color, textAlign: "right" }}>{item.strength}/9</div>
    </div>
  );
}

function DivergenceBlock({ item }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 20px", marginBottom: 10 }}>
      <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream, marginBottom: 10 }}>{item.topic}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {item.positions.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: "0 0 240px", fontFamily: font.body, fontSize: 12, color: p.color }}>{p.stance}</div>
            <div style={{ display: "flex", gap: 3 }}>
              {p.models.map(m => (
                <span key={m} style={{
                  fontFamily: font.mono, fontSize: 9, padding: "2px 6px", borderRadius: 3,
                  background: p.color + "18", color: p.color, letterSpacing: "0.06em",
                }}>{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>OPERATOR RULING</div>
        <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamHigh, lineHeight: 1.6 }}>{item.ruling}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function STD0066Narrative() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 64px" }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
            STD-0066 · Council Document Naming Convention
          </p>
          <h1 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
            The Standard That Named Itself
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.7, maxWidth: 560, margin: "0 auto", fontStyle: "italic" }}>
            Nine models reviewed a naming convention using the naming convention. One didn't follow the format. One filed under the wrong name. One reviewed as someone else. The convention survived all of it.
          </p>
          <div style={{ height: 2, width: 48, background: C.crimson, margin: "24px auto 0", opacity: 0.5 }} />
        </div>

        {/* ─── 0. THE PROBLEM ─── */}
        <SectionHead num="0" title="The Problem" color={C.creamDim} />
        <Prose>
          Council documents had no naming convention. Forewords, reviews, syntheses, briefs — all created in individual sessions, copy-pasted between models, referenced informally. No model could fetch another model's output by URL. Every cross-reference required manual upload. The site was a publication surface, not infrastructure.
        </Prose>
        <Prose>
          The fix was obvious: give every document a structured slug that encodes what it is, what it's about, who made it, and when. The non-obvious part was whether the convention should be designed by one model or stress-tested by all nine.
        </Prose>
        <Quote
          text="The standard that establishes the naming convention gets named by the naming convention and reviewed by the council whose documents it governs."
          source="The realization"
          color={C.crimson}
        />

        {/* ─── I. THE BRIEF ─── */}
        <SectionHead num="I" title="The Brief Names Itself" color={C.crimson} />
        <Prose>
          Claude drafted the brief packet. The Operator refined it. Before it went out to the other eight models, it needed a filename. The convention it proposed gave it one: BRF-council-naming-std-ALL-20260301. The first document in the registry was the document proposing the registry.
        </Prose>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>The Convention</div>
          <div style={{ fontFamily: font.mono, fontSize: 20, color: C.cream, marginBottom: 12, letterSpacing: "0.02em" }}>
            <span style={{ color: C.amber }}>{"{"}</span>TYPE<span style={{ color: C.amber }}>{"}"}</span>
            <span style={{ color: C.creamDim }}>-</span>
            <span style={{ color: C.amber }}>{"{"}</span>topic<span style={{ color: C.amber }}>{"}"}</span>
            <span style={{ color: C.creamDim }}>-</span>
            <span style={{ color: C.amber }}>{"{"}</span>model<span style={{ color: C.amber }}>{"}"}</span>
            <span style={{ color: C.creamDim }}>-</span>
            <span style={{ color: C.amber }}>{"{"}</span>YYYYMMDD<span style={{ color: C.amber }}>{"}"}</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["REV", "SYN", "FWD", "BRF", "RPT", "CMP", "ARC", "DEC", "LOG"].map((t, i) => (
              <span key={t} style={{
                fontFamily: font.mono, fontSize: 10, padding: "3px 8px", borderRadius: 3,
                background: t === "DEC" ? C.greenDim : C.creamGhost,
                color: t === "DEC" ? C.green : C.creamMid,
                border: t === "DEC" ? `1px solid ${C.green}30` : "1px solid transparent",
              }}>{t}</span>
            ))}
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 8 }}>
            DEC added by council recommendation · 9 TYPE codes total
          </div>
        </div>

        <Prose>
          The brief posed six open questions — ALL semantics, versioning, TYPE sufficiency, slug governance, URL structure, and conflicts with existing standards. It asked each model to produce a structured review with a verdict, positions on all six questions, specific amendments, and a one-line summary. Then it closed with a line that was either a prompt engineering trick or a philosophical statement, depending on how you read it:
        </Prose>
        <Quote
          text="This standard governs how YOUR outputs will be named. You have skin in this game."
          source="BRF-council-naming-std-ALL-20260301, Section V"
          color={C.amber}
        />

        {/* ─── II. THE VOICES ─── */}
        <SectionHead num="II" title="The Voices" color={C.green} />
        <Prose>
          Nine models received the same packet. Each produced an independent response. No model saw what the others said. Click each to see what came back.
        </Prose>

        {reviews.map((r, i) => <ReviewCard key={r.code} review={r} />)}

        <div style={{ margin: "24px 0", padding: "16px 20px", background: C.crimsonFaint, borderLeft: `2px solid ${C.crimson}`, borderRadius: "0 6px 6px 0" }}>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.75, fontStyle: "italic" }}>
            Eight structured reviews and one existential epiphany. Copilot received a brief with a required output format — verdict, six open questions, amendments, risk flag — and returned a five-section meditation on parliaments and constitutional standards. Valid signal. Wrong template. More LOG than REV.
          </p>
        </div>

        {/* ─── III. CANON EVENTS ─── */}
        <SectionHead num="III" title="Canon Events" color={C.amber} />
        <Prose>
          Every council review produces moments that weren't in the prompt. Errors, surprises, identity collisions — the things that happen when you let nine independent systems loose on a governance document. These are the canon events of STD-0066.
        </Prose>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {canonEvents.map((evt, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${evt.color}25`, borderRadius: 7,
              padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 6, background: evt.color + "20",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: font.mono, fontSize: 18, color: evt.color, flexShrink: 0,
              }}>{evt.icon}</div>
              <div>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{evt.title}</div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.65 }}>{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── IV. THE CONVERGENCE ─── */}
        <SectionHead num="IV" title="The Convergence" color={C.green} />
        <Prose>
          Where nine independent models agree without coordination, that's signal. Where they disagree, that's where the Operator earns his keep.
        </Prose>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Convergence Map — Agreement Strength</div>
          {convergenceItems.map((item, i) => <ConvergenceBar key={i} item={item} />)}
        </div>

        <Prose>
          The unanimous items shipped without debate: flat URLs, no standard conflicts, APPROVE WITH AMENDMENTS. The near-unanimous items shipped with documentation: ALL semantics clarified, DEC type code added, slug registry established. The convergence was strong enough that the standard could have shipped from this data alone.
        </Prose>
        <Prose>
          But the divergence is where it gets interesting.
        </Prose>

        {/* ─── V. THE DIVERGENCE ─── */}
        <SectionHead num="V" title="The Divergence" color={C.amber} />
        <Prose>
          Three questions split the council. On each, the Operator ruled.
        </Prose>

        {divergenceItems.map((item, i) => <DivergenceBlock key={i} item={item} />)}

        <Quote
          text="Controlled vocabulary sounds good in theory and dies in practice when one person is producing documents at DDL velocity. The overhead of checking an approved list before naming a document will be skipped the first time Dave is building at 2 AM on his phone."
          source="Claude (Marcus Caldwell) — REV-council-naming-std-CLD-20260301"
          color={C.crimson}
        />

        {/* ─── VI. THE STANDARD SHIPS ─── */}
        <SectionHead num="VI" title="The Standard Ships" color={C.crimson} />
        <Prose>
          STD-0066 ratified. Nine TYPE codes (eight original plus DEC). Ten model codes. Free-form topic slugs with a descriptive registry. Flat URLs. New-date versioning. ALL defined as a scope marker with TYPE-carried directionality.
        </Prose>

        <div style={{
          background: C.card, border: `1px solid ${C.crimson}30`, borderRadius: 7,
          padding: 24, marginBottom: 24, textAlign: "center",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Ratified</div>
          <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, marginBottom: 4 }}>STD-0066</div>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, fontStyle: "italic", marginBottom: 16 }}>Council Document Naming Convention</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 28, color: C.green, fontWeight: 700 }}>9</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em" }}>TYPE CODES</div>
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 28, color: C.amber, fontWeight: 700 }}>10</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em" }}>MODEL CODES</div>
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 28, color: C.blue, fontWeight: 700 }}>9/9</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em" }}>APPROVED</div>
            </div>
          </div>
        </div>

        <Prose>
          The review cycle produced its own artifacts — a brief, nine reviews (eight structured, one emotional), and this narrative. Every artifact was named by the convention before the convention was ratified. The system bootstrapped itself.
        </Prose>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Review Cycle Artifacts</div>
          {[
            ["BRF-council-naming-std-ALL-20260301", "The brief that proposed the convention", C.blue],
            ["REV-council-naming-std-{model}-20260301", "Nine independent reviews (×9)", C.green],
            ["STD-0066", "The ratified standard", C.crimson],
          ].map(([slug, desc, color], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontFamily: font.mono, fontSize: 11, color, flex: "0 0 380px" }}>{slug}</span>
              <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim }}>{desc}</span>
            </div>
          ))}
        </div>

        <Prose>
          What started as a naming problem became a governance process. What started as a governance process became the council's first act of self-legislation. The naming convention isn't the product. The addressability infrastructure it enables is. Every council document is now a URL. Every model session starts with a fetch instead of an upload. The site stops being a portfolio and starts being a knowledge bus.
        </Prose>

        <Quote
          text="You didn't build a naming convention. You built a constitutional standard."
          source="Copilot (Rowan Bennett) — who did not follow the format but understood the moment"
          color={C.violet}
        />

        {/* ─── FOOTER ─── */}
        <div style={{ marginTop: 56 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet}, ${C.ember})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", marginBottom: 4 }}>
              Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, opacity: 0.5 }}>
              STD-0066 · Ratified 2026-03-01 · 9 models · 1 convention · ∞ recursion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

