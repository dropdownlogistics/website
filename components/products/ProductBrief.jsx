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
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  amber: "#C49A3C",
  blue: "#6B9DC2",
  violet: "#8a6cc9",
  rose: "#c94a6e",
  ember: "#c98a4a",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Sections
// ═══════════════════════════════════════════════════════════
const sections = [
  { id: "problem", numeral: "I", title: "The Problem", color: C.rose },
  { id: "solution", numeral: "II", title: "The Solution", color: C.green },
  { id: "architecture", numeral: "III", title: "Architecture", color: C.blue },
  { id: "proof", numeral: "IV", title: "Proof of Concept", color: C.violet },
  { id: "market", numeral: "V", title: "Market", color: C.amber },
  { id: "model", numeral: "VI", title: "Business Model", color: C.ember },
  { id: "founder", numeral: "VII", title: "Founder & Ask", color: C.crimson },
];

// ═══════════════════════════════════════════════════════════
// Primitives
// ═══════════════════════════════════════════════════════════

function Tag({ label, color = C.blue }) {
  return (
    <span style={{
      fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3,
      background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function ConceptCard({ title, color, children }) {
  return (
    <div style={{
      background: C.card,
      borderLeft: `3px solid ${color}`,
      borderRadius: "0 7px 7px 0",
      padding: "16px 20px",
      marginBottom: 12,
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function StatRow({ items }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
      {items.map((s) => (
        <div key={s.label} style={{
          flex: "1 1 155px", minWidth: 140, background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 6,
          padding: "14px 14px 10px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.4 }} />
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>{s.label}</div>
          <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
          {s.sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 3 }}>{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function Prose({ children }) {
  return <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 20 }}>{children}</div>;
}

function SeeAlso({ items }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px 14px", marginTop: 16 }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>See Also</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {items.map((item) => <Tag key={item} label={item} color={C.creamDim} />)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function ProductBrief() {
  const [activeSection, setActiveSection] = useState("problem");

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", maxWidth: 1000, margin: "0 auto", padding: "48px 24px 64px", gap: 32 }}>

        {/* ═══════════════════════════════════════════════ */}
        {/* SIDEBAR RAIL */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{
          width: 180,
          flexShrink: 0,
          position: "sticky",
          top: 48,
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Product Brief
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                background: activeSection === s.id ? C.card : "transparent",
                border: `1px solid ${activeSection === s.id ? s.color + "30" : "transparent"}`,
                borderRadius: 5,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontFamily: font.mono, fontSize: 10, color: s.color, width: 20 }}>{s.numeral}</span>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: activeSection === s.id ? C.cream : C.creamDim, letterSpacing: "0.04em" }}>{s.title}</span>
            </button>
          ))}
          <div style={{ height: 1, background: C.border, margin: "12px 0" }} />
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, padding: "0 10px", lineHeight: 1.6 }}>
            Dropdown Logistics<br />
            March 2026<br />
            Confidential
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* MAIN CONTENT */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>
              DDL · ATLAS · Product Brief
            </div>
            <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
              A Conversation That Listens Back
            </h1>
            <div style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, fontStyle: "italic", marginBottom: 4 }}>
              Behavioral intelligence through guided conversation — product brief and technical architecture.
            </div>
            <div style={{ height: 2, width: 48, background: C.crimson, opacity: 0.5, marginTop: 16 }} />
          </div>

          {/* ── I. THE PROBLEM ── */}
          <div id="problem" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.rose + "15", border: `1px solid ${C.rose}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.rose }}>I</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>The Self-Assessment Paradox</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <StatRow items={[
              { label: "Assessment Market", value: "$2.8B", sub: "Annual revenue", color: C.amber },
              { label: "Test-Retest Failure", value: "~50%", sub: "Same person, weeks apart", color: C.rose },
              { label: "Dunning-Kruger Gap", value: "35pts", sub: "Bottom quartile self-rates at 60th %ile", color: C.crimson },
            ]} />

            <Prose>
              The personality assessment industry — Myers-Briggs, StrengthsFinder, Big Five, DISC, Enneagram — generates billions annually from a structurally flawed methodology: self-report. Every product asks people to accurately describe their own behavior, preferences, and capabilities. Four problems make this fundamentally unreliable.
            </Prose>

            <ConceptCard title="Self-Perception Bias" color={C.rose}>
              Dunning-Kruger established that people in the bottom quartile of performance rate themselves at the 60th percentile. This isn't dishonesty — it's the fundamental limitation of conscious self-awareness. Applied to personality: someone who rates themselves "highly organized" may genuinely believe it while their behavioral data shows chronic deadline misses.
            </ConceptCard>

            <ConceptCard title="Social Desirability" color={C.amber}>
              People answer assessments the way they want to be perceived, not the way they actually are. In hiring contexts, this contamination is near-total. Even in personal development contexts, the desire to see oneself positively distorts every response.
            </ConceptCard>

            <ConceptCard title="Mood Dependency" color={C.blue}>
              The same person taking the same test two weeks apart gets different results approximately half the time. The test doesn't measure personality. It measures current emotional state filtered through self-concept.
            </ConceptCard>

            <ConceptCard title="Category Collapse" color={C.violet}>
              Complex behavioral patterns get compressed into type codes — INTJ, Type 3, Red/Blue — that erase nuance. Real human behavior is dimensional, contextual, and longitudinal. Static categories can't represent it.
            </ConceptCard>

            <SeeAlso items={["Operator Dossier — Strong Interest scoring Writing at 31", "Prediction Audit — identity ≠ behavior", "Foreword Convergence — structure reveals truth"]} />
          </div>

          {/* ── II. THE SOLUTION ── */}
          <div id="solution" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.green + "15", border: `1px solid ${C.green}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.green }}>II</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Guided Conversation as Measurement Instrument</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{
              background: C.green + "08",
              borderLeft: `3px solid ${C.green}`,
              borderRadius: "0 8px 8px 0",
              padding: "20px 24px",
              marginBottom: 24,
            }}>
              <div style={{ fontFamily: font.body, fontSize: 18, color: C.cream, fontStyle: "italic", lineHeight: 1.5 }}>
                The most honest behavioral data a person produces is when they're focused on performing a task — not when they're answering questions about themselves.
              </div>
            </div>

            <Prose>
              The product is a measurement instrument disguised as a useful conversation. The surface layer provides genuine value: job interview practice, difficult conversation rehearsal, pitch preparation, negotiation training, self-exploration. The person comes for the practice. Underneath, calibration engines analyze behavioral patterns in real time — not from self-report, but from revealed behavior under simulated conditions.
            </Prose>

            <Prose>
              This inverts the assessment model. Traditional tools create a testing context where the person knows they're being measured, which contaminates every response. Our approach creates a performance context where the person is focused on a real task, producing behavioral data as a natural byproduct. The measurement is invisible because it's inseparable from the utility.
            </Prose>

            <Prose>
              After each conversation, the transcript is analyzed independently by multiple AI models using a proven convergence methodology. Where models agree, the signal is strong. Where they diverge, there's nuance worth surfacing. Blind spots — patterns the person can't see about themselves — are documented alongside findings. Everything is transparent. No black box. The person sees what every model found.
            </Prose>

            <SeeAlso items={["MindFrame Calibration Engines", "Council Convergence Methodology", "Dossier Output Format"]} />
          </div>

          {/* ── III. ARCHITECTURE ── */}
          <div id="architecture" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.blue + "15", border: `1px solid ${C.blue}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.blue }}>III</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Technical Architecture</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <Prose>
              The system operates on three layers that execute simultaneously during every conversation:
            </Prose>

            <ConceptCard title="Layer 1 — Conversation Engine (Surface)" color={C.blue}>
              Guided conversation flows tailored to the chosen scenario. Job interviews use behavioral question frameworks. Relationship conversations use structured disclosure patterns. Pitch rehearsals use investor objection modeling. Each scenario type has a conversation architecture that produces useful practice AND rich behavioral data. The person never feels "tested" — they feel coached.
            </ConceptCard>

            <ConceptCard title="Layer 2 — Calibration Stack (Middle)" color={C.amber}>
              Three MindFrame engines analyze the conversation in real time. <strong style={{ color: C.cream }}>ProficiencyStack</strong> reads communication patterns: pacing, detail preference, autonomy needs, vocabulary complexity, explanation density. <strong style={{ color: C.cream }}>ToneprintShaper</strong> maps emotional register: humor patterns, formality gradients, deflection habits, empathy signals, stress responses. <strong style={{ color: C.cream }}>CraniumCartographer</strong> traces cognitive architecture: reasoning structure, decision-making patterns, abstraction comfort, narrative vs. analytical framing, metacognitive awareness. All from behavior, not self-report.
            </ConceptCard>

            <ConceptCard title="Layer 3 — Multi-Model Convergence (Deep)" color={C.violet}>
              The conversation transcript is sent to 9 independent AI models for analysis. Each model produces a behavioral profile without seeing the others' work. A synthesis engine identifies convergence (strong signal), divergence (nuance), and blind spots (what the person can't see). This is the same methodology that found "certified mail" as thesis in 9/9 independent foreword analyses of a memoir. Proven, documented, reproducible.
            </ConceptCard>

            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.green, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, marginTop: 28 }}>
              Output: Behavioral Dossier
            </div>

            <Prose>
              The output is not a type code. It's a dimensional behavioral profile covering communication style, decision-making patterns, conflict architecture, cognitive signature, emotional register, and documented blind spots. Each conversation session adds a layer. Across multiple sessions in different contexts (interview prep, relationship dynamics, creative brainstorming), the profile builds into a dimensional map — the first behavioral assessment that gets more accurate over time rather than expiring at the moment of measurement.
            </Prose>

            <SeeAlso items={["MindFrame v3.x Documentation", "ProficiencyStack Module Spec", "Council Methodology — 9-Model Architecture"]} />
          </div>

          {/* ── IV. PROOF OF CONCEPT ── */}
          <div id="proof" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.violet + "15", border: `1px solid ${C.violet}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.violet }}>IV</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Already Built</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <Prose>
              Every core component of this product has been built, tested, and documented. The proof of concept isn't a prototype — it's a live, production-quality system with published results.
            </Prose>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
              <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.crimson, marginBottom: 8 }}>Proof 1: Foreword Convergence</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 12 }}>Validates: Multi-model convergence methodology</div>
              <Prose>
                Nine AI models were given the structural architecture of a 49-excerpt memoir — thematic clusters, narrative arcs, motifs, character density maps — but zero prose. Each wrote an independent foreword. Results: certified mail as thesis (9/9), double arc structure (8/9), Emily as load-bearing system (8/9), the kitchen as recurring physical anchor (7/9). Blind spots were also documented: the phrase "that's the past" appeared 10+ times but no model flagged it; character density thinning was invisible to all nine. The convergence methodology produces reliable signal AND documents its own limitations. Published and live.
              </Prose>
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
              <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.violet, marginBottom: 8 }}>Proof 2: The Operator Dossier</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 12 }}>Validates: Longitudinal behavioral profiling + throughline analysis</div>
              <Prose>
                14 documents, 8 psychometric instruments, 24 years of data — from PSAT scores at age 15 through Apple Music listening data at age 38. The Dossier identified 8 throughlines that no individual instrument had seen: the Quant/Verbal Crossover (math peaked at 92nd percentile age 16, fell to 44th by 21 — interest drove aptitude down), the Creativity Misclassification (Strong scored Artistic at 31 while qEEG found high Occipital Alpha creativity 15 years later), the Sensation Avoiding Architecture (documented sensory profile explaining the entire DDL design language), the Auditory Regulation Stack (9,400 minutes of ILLENIUM mapped to documented over-arousal). The format works. The throughline methodology works. The longitudinal picture reveals what snapshots miss.
              </Prose>
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
              <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.amber, marginBottom: 8 }}>Proof 3: Apple Music Prediction Audit</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 12 }}>Validates: Identity ≠ behavior — the case for revealed preference measurement</div>
              <Prose>
                An AI instance with full access to the subject's identity profile — recovery narrative, Kansas demographics, Reddit history, gaming habits, memoir themes, YouTube data — predicted 25 top artists and 25 top albums. Results: 0/25 artist matches, 0/25 album matches, complete genre inversion. Predicted country-folk-hip-hop based on demographic profiling. Actual data: melodic bass EDM (60%), pop-punk (30%), math rock (5%). The model that knew everything about who the person is knew nothing about what the person actually does. This is the fundamental case for behavioral measurement over self-report and demographic inference.
              </Prose>
            </div>

            <SeeAlso items={["dropdownlogistics.com/forewords", "Operator Dossier — /cognitive/", "Prediction vs Actuals — /analytics/"]} />
          </div>

          {/* ── V. MARKET ── */}
          <div id="market" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.amber + "15", border: `1px solid ${C.amber}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.amber }}>V</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Market Opportunity</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <Prose>
              The product sits at the intersection of five converging markets, each of which currently relies on self-report, surveys, or unstructured AI conversations with no behavioral analysis layer:
            </Prose>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
              {[
                { market: "Personality Assessments", size: "$2.8B", note: "Myers-Briggs, Big Five, DISC", color: C.amber },
                { market: "Career Coaching", size: "$15B", note: "Executive coaching, career counseling", color: C.blue },
                { market: "Dating Platforms", size: "$10B", note: "Matching on self-described traits", color: C.rose },
                { market: "HR Technology", size: "$8B", note: "Hiring assessments, team building", color: C.green },
                { market: "Mental Health Tech", size: "$4B", note: "Therapy tools, self-improvement", color: C.violet },
                { market: "AI Productivity", size: "$45B by 2028", note: "250M+ users, no behavioral layer", color: C.crimson },
              ].map((m) => (
                <div key={m.market} style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  padding: "14px 16px",
                }}>
                  <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.size}</div>
                  <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 3 }}>{m.market}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{m.note}</div>
                </div>
              ))}
            </div>

            <Prose>
              The key insight: none of these markets have a behavioral measurement product. Personality assessments use self-report. Career coaches rely on conversation without structured analysis. Dating platforms match on self-described interests. HR tools screen resumes and run surveys. Mental health apps provide journaling without behavioral profiling. The behavioral intelligence layer doesn't exist yet.
            </Prose>
          </div>

          {/* ── VI. BUSINESS MODEL ── */}
          <div id="model" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.ember + "15", border: `1px solid ${C.ember}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.ember }}>VI</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Business Model</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <ConceptCard title="Consumer (Year 1–2)" color={C.blue}>
              Free tier: one conversation scenario, basic insight card. Premium ($15–30/month): unlimited scenarios, full behavioral dossier, multi-model convergence analysis, longitudinal tracking. The free tier demonstrates the "aha" moment — seeing behavioral insights you didn't expect from a practice conversation.
            </ConceptCard>

            <ConceptCard title="B2B Partnerships (Year 2–3)" color={C.amber}>
              Revenue share with dating platforms (behavioral compatibility > self-described interests), therapy networks (therapist receives behavioral profile before first session), and coaching platforms (executive coaching with data, not just conversation). Each partnership channel gets the behavioral intelligence API; the conversation surface is customized to the partner's context.
            </ConceptCard>

            <ConceptCard title="Enterprise (Year 3+)" color={C.green}>
              Team communication profiling. Hiring assessment that measures actual behavior during structured scenarios rather than resume keywords or survey responses. Onboarding calibration — new hires get behavioral profiles that help teams understand communication preferences from day one. Priced per seat, annual contract.
            </ConceptCard>

            <ConceptCard title="Network Effects" color={C.violet}>
              "Profile sharing" — users share behavioral fingerprints with partners, friends, or teams, enabling compatibility analysis based on actual patterns rather than self-described traits. Each shared profile improves matching accuracy. This is the "algorithm sharing" concept from the original Behavioral Insight whitepaper, now grounded in proven convergence methodology.
            </ConceptCard>
          </div>

          {/* ── VII. FOUNDER & ASK ── */}
          <div id="founder" style={{ marginBottom: 48, scrollMarginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.crimson + "15", border: `1px solid ${C.crimson}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.crimson }}>VII</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Founder & Ask</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "24px",
              marginBottom: 24,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.cream, marginBottom: 4 }}>D.K. Hale</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, marginBottom: 16 }}>Founder · Dropout Logistics</div>
              <Prose>
                CPA. 10+ years internal audit at enterprise scale. Built the MindFrame cognitive architecture (3 major versions, 8 programs, frozen at v3.x). Designed and operated the nine-model Council methodology across 100+ convergent analyses. Created the DDL governance framework: 44 systems, 65 standards, 26 months. Published memoir author. Developed the CottageHumble design system and six production templates. Built the Operator Dossier — 14 documents, 8 instruments, 24 years — as both the proof of concept and the test subject.
              </Prose>
              <Prose>
                Every component of this product — the calibration engines, the convergence methodology, the dossier format, the design system, the governance architecture — was designed, built, tested, and documented by one person. The question isn't whether the methodology works. It's how far it scales with a team.
              </Prose>
            </div>

            <div style={{
              background: C.crimson + "10",
              border: `1px solid ${C.crimson}30`,
              borderRadius: 8,
              padding: "28px",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                Current Status
              </div>
              <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 12 }}>
                Concept Stage — Seeking Conversations
              </div>
              <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.65, maxWidth: 500, margin: "0 auto" }}>
                Core methodology proven. Calibration engines built. Multi-model analysis validated across 100+ engagements. Design system and delivery layer production-ready. Looking for the right partners to move from proven concept to product.
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div style={{ marginTop: 40 }}>
            <div style={{
              height: 2,
              background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.green})`,
              borderRadius: 1,
              marginBottom: 14,
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
                Cottage — Humble surface. Cathedral underneath.
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
                dropdownlogistics.com · 2026 · Confidential
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
