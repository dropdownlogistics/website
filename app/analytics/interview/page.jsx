'use client';
import { useState, useEffect } from "react";

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
// Primitives
// ═══════════════════════════════════════════════════════════

function FadeIn({ delay = 0, children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      {children}
    </div>
  );
}

function PullQuote({ quote, attribution, color = C.crimson }) {
  return (
    <div style={{
      margin: "40px 0",
      padding: "24px 28px",
      borderLeft: `3px solid ${color}`,
      background: color + "08",
      borderRadius: "0 8px 8px 0",
    }}>
      <div style={{
        fontFamily: font.body,
        fontSize: 20,
        color: C.cream,
        fontStyle: "italic",
        lineHeight: 1.55,
        marginBottom: attribution ? 10 : 0,
      }}>"{quote}"</div>
      {attribution && (
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.06em" }}>
          {attribution}
        </div>
      )}
    </div>
  );
}

function TimelineMoment({ date, label, color, children }) {
  return (
    <div style={{
      display: "flex",
      gap: 20,
      margin: "32px 0",
      paddingLeft: 20,
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        width: 56,
      }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: color + "30", border: `2px solid ${color}`,
        }} />
        <div style={{ width: 2, flex: 1, background: color + "20", marginTop: 4 }} />
      </div>
      <div style={{ flex: 1, paddingBottom: 8 }}>
        <div style={{ fontFamily: font.mono, fontSize: 10, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
          {date}
        </div>
        <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.cream, marginBottom: 10 }}>
          {label}
        </div>
        <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function InsightCallout({ label, color, children }) {
  return (
    <div style={{
      margin: "36px 0",
      padding: "18px 22px",
      background: color + "10",
      border: `1px solid ${color}30`,
      borderLeft: `3px solid ${color}`,
      borderRadius: "0 7px 7px 0",
    }}>
      <div style={{
        fontFamily: font.mono, fontSize: 9, color,
        letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
      }}>{label}</div>
      <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

function Prose({ children }) {
  return (
    <div style={{
      fontFamily: font.body,
      fontSize: 16,
      color: C.creamMid,
      lineHeight: 1.85,
      marginBottom: 24,
    }}>
      {children}
    </div>
  );
}

function SectionBreak({ numeral, title, color = C.crimson }) {
  return (
    <div style={{ margin: "56px 0 32px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6,
        background: color + "15", border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font.mono, fontSize: 14, fontWeight: 700, color,
      }}>{numeral}</div>
      <div style={{
        fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em",
        color: C.creamMid, textTransform: "uppercase",
      }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main CHRONICLE
// ═══════════════════════════════════════════════════════════
export default function InterviewChronicle() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ── HERO ── */}
        <FadeIn delay={0}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 24 }}>
            DDL · CHRONICLE · Origin Story
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h1 style={{
            fontFamily: font.body,
            fontSize: 48,
            fontWeight: 400,
            fontStyle: "italic",
            color: C.cream,
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            The Interview That Listened Back
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p style={{
            fontFamily: font.body,
            fontSize: 18,
            color: C.creamMid,
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: 12,
          }}>
            How a practice interview became a measurement instrument — and why every personality test has been asking the wrong question.
          </p>
        </FadeIn>

        <FadeIn delay={600}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 8 }}>
            <span>March 2026</span>
            <span>D.K. Hale</span>
            <span>Dropdown Logistics</span>
          </div>
          <div style={{ height: 2, width: 56, background: C.crimson, opacity: 0.5, marginBottom: 48 }} />
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* I — THE MOMENT */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={800}>
          <SectionBreak numeral="I" title="The Moment" />

          <Prose>
            It started as interview prep. Nothing more. I was coming back from short-term leave, transitioning from Senior Staff Auditor to Commission Analyst II, and I wanted to be sharp. So I did what I do with everything — I gave it to the AI. Here's the position announcement. Here's my background. Interview me.
          </Prose>

          <Prose>
            The questions came. Behavioral, situational, technical. I answered them the way you answer interview questions — performing a version of yourself that's slightly more composed, slightly more articulate, slightly more certain than you actually feel. Standard practice. Everyone does this.
          </Prose>

          <Prose>
            But something happened during the third or fourth exchange that I didn't expect. The AI started reflecting observations back to me — not about my answers, but about <em style={{ color: C.cream }}>how</em> I was answering. The patterns in my language. The things I emphasized without being asked. The things I avoided. The moments where my pacing changed.
          </Prose>

          <PullQuote
            quote="I was practicing for an interview. The AI was conducting an assessment."
            color={C.crimson}
          />

          <Prose>
            That was the moment. Not because the AI was doing something clever — but because I realized the interview format itself was a better measurement instrument than any personality test I'd ever taken. And I'd taken a lot of them.
          </Prose>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* II — THE EVIDENCE */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={100}>
          <SectionBreak numeral="II" title="The Evidence I Already Had" color={C.blue} />

          <Prose>
            I didn't know it at the time, but I'd been building the case for this idea for over two decades. Somewhere in a drawer was a paper trail — standardized tests, vocational inventories, clinical evaluations, neurological baselines — that told a story no single instrument had ever captured on its own.
          </Prose>

          <TimelineMoment date="2001 · Age 15" label="PSAT/NMSQT — Sophomore Year" color={C.blue}>
            Math at the 81st percentile. Verbal at the 63rd. A quantitative mind with a verbal side channel that nobody — including me — was paying attention to. Career interest: Undecided.
          </TimelineMoment>

          <TimelineMoment date="2002 · Age 16" label="PSAT/NMSQT — Junior Year" color={C.blue}>
            Math surges to the 92nd percentile. Verbal climbs to the 83rd. Selection Index: 177. Career interest: Business. The numbers say quant is dominant. They won't stay that way.
          </TimelineMoment>

          <TimelineMoment date="2005 · Age 18" label="Strong Interest Inventory" color={C.amber}>
            Conventional theme: High. Artistic theme: Very Little. Writing interest: 31 — floor score. Computer Activities: 95th percentile. Accountant match: Very Similar. The instrument said I would process data in a structured context. It was right about the <em style={{ color: C.cream }}>what</em>. It missed the <em style={{ color: C.cream }}>how</em> entirely.
          </TimelineMoment>

          <TimelineMoment date="2008 · Age 21" label="GMAT" color={C.crimson}>
            The inversion. Quantitative falls to the 44th percentile. Verbal rises to the 75th. The aptitude that was dominant at 16 had followed interest downward. Verbal — never the leading score — kept climbing because it was the channel being used. Interest drives aptitude, not the other way around.
          </TimelineMoment>

          <TimelineMoment date="2020 · Age 33" label="Neurofeedback qEEG Baseline" color={C.ember}>
            Over-aroused brain. Anxiety creating cognitive fog that mimics ADHD. No ADHD indicators in the ratios. Creativity manifesting through coping strategies, pattern recognition, and technology adaptation — not through any channel the Strong Interest Inventory had a scale for in 2005. Left-brain dominant. High Occipital Alpha. The first instrument to see the system underneath.
          </TimelineMoment>

          <TimelineMoment date="2023 · Age 37" label="Comprehensive Psychological Evaluation" color={C.rose}>
            Bipolar II. ADHD — Predominantly Inattentive. Brown Executive Function scales: Focus at the 98th percentile for dysfunction. Activation at the 95th. Memory at the 95th. The clinical picture matches the qEEG but disagrees on etiology. Both agree on the mechanism: an over-aroused system producing anxiety that cascades into depression, with cognitive fog downstream. Sensation Avoiding: 50/75 — Much More Than Most People.
          </TimelineMoment>

          <TimelineMoment date="2025 · Age 38" label="Apple Music Replay" color={C.violet}>
            9,400 minutes of ILLENIUM. 2,534 minutes of Polyphia. For a brain documented as over-aroused with auditory response control at 82 and Sensation Avoiding off the chart, these aren't preferences — they're a self-prescribed auditory regulation stack. Structured sonic density displacing unpredictable environmental stimuli. The only instrument in the collection where the subject chose the data.
          </TimelineMoment>

          <InsightCallout label="The Pattern" color={C.blue}>
            Eight instruments across twenty-four years, and not one of them captured the full picture alone. The PSAT saw aptitude. The Strong saw interest. The GMAT saw the inversion. The qEEG saw the neurology. The psych eval saw the diagnoses. The music data saw the behavioral response. Each was a partial view. The complete picture only emerged when someone laid them all out on the same table and looked for the throughlines.
          </InsightCallout>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* III — THE PARADOX */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={100}>
          <SectionBreak numeral="III" title="The Self-Assessment Paradox" color={C.amber} />

          <Prose>
            The personality assessment market generates $2.8 billion annually. Myers-Briggs. StrengthsFinder. Big Five. DISC. Enneagram. Every one of them asks the same question: <em style={{ color: C.cream }}>Who do you think you are?</em>
          </Prose>

          <Prose>
            The problem isn't the question. The problem is that humans are catastrophically bad at answering it. Dunning-Kruger demonstrated that people in the bottom quartile of performance rate themselves in the 60th percentile. Social desirability bias contaminates every self-report. Mood-dependent variation means the same person taking the same test two weeks apart gets different results half the time.
          </Prose>

          <Prose>
            I know this firsthand. The Strong Interest Inventory scored my writing interest at 31 — the floor — when I was 18. Twenty years later, I'd written a 52,000-word memoir, built a publication pipeline, and had nine AI models write forewords for a book based on its structural architecture alone. The instrument didn't fail because it was poorly designed. It failed because it asked me what I was interested in, and at 18, I didn't know.
          </Prose>

          <PullQuote
            quote="Every personality test asks who you think you are. The question that matters is who you are when you're not thinking about it."
            color={C.amber}
          />

          <Prose>
            The practice interview showed me the difference. When I was answering behavioral questions under simulated pressure, I wasn't performing a self-concept — I was <em style={{ color: C.cream }}>performing</em>. The patterns in that performance are the real data. Not what I claim about myself. What I actually do when I'm trying to do something else.
          </Prose>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* IV — THE PROOF OF CONCEPT */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={100}>
          <SectionBreak numeral="IV" title="The Proof of Concept" color={C.violet} />

          <Prose>
            I had already built the methodology. I just hadn't pointed it at this problem yet.
          </Prose>

          <Prose>
            The <strong style={{ color: C.cream }}>Foreword Convergence</strong> was the first proof. Nine AI models were given the structural architecture of my memoir — thematic clusters, narrative arcs, motifs — but not a single word of prose. Each wrote a foreword independently. They all found the same load-bearing walls. Certified mail as thesis: 9 out of 9. Double arc: 8 out of 9. Emily as system: 8 out of 9. Nine independent observers, zero coordination, one consensus.
          </Prose>

          <Prose>
            If the methodology could extract structural truth from a book's architecture, it could extract behavioral truth from a person's conversation patterns.
          </Prose>

          <Prose>
            The <strong style={{ color: C.cream }}>Operator Dossier</strong> was the second proof. Fourteen documents, eight instruments, twenty-four years of data — rendered into a single longitudinal profile with eight throughlines that no individual assessment had ever identified. The Quant/Verbal Crossover. The Creativity Misclassification. The Sensation Avoiding Architecture. The Auditory Regulation Stack. Each throughline connected data points that were never meant to be connected, and the connections told the real story.
          </Prose>

          <Prose>
            The <strong style={{ color: C.cream }}>Apple Music Prediction Audit</strong> was the third — and the most revealing. One AI instance was given everything about me: my recovery, my Kansas roots, my Reddit history, my gaming habits, my writing voice. It predicted 25 artists and 25 albums. It hit zero. Not one artist. Not one album. Not one genre. Complete inversion. It predicted country-folk-hip-hop. The actual data was melodic bass EDM and pop-punk.
          </Prose>

          <PullQuote
            quote="Identity ≠ playlist. Vibes ≠ data."
            attribution="— Adverse Opinion, Apple Music Prediction Audit"
            color={C.violet}
          />

          <Prose>
            The prediction failed because it profiled the demographic, not the person. It knew everything about me — except what I actually do when nobody's watching. That's the gap every self-report instrument lives in. And that's the gap a guided conversation closes.
          </Prose>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* V — THE ARCHITECTURE */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={100}>
          <SectionBreak numeral="V" title="The Architecture" color={C.green} />

          <Prose>
            The product is not an app. It's not a chatbot. It's not another personality quiz with a new paint job. It's a <em style={{ color: C.cream }}>measurement instrument disguised as a useful conversation.</em>
          </Prose>

          <Prose>
            The surface layer is whatever the person needs it to be. Practice a job interview. Rehearse a difficult conversation with your partner. Prep a pitch for investors. Role-play a parent-teacher conference. The person comes for the practice. They stay for the insight.
          </Prose>

          <Prose>
            Underneath, three engines are running simultaneously:
          </Prose>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "24px 0 32px" }}>
            {[
              { label: "ProficiencyStack", color: C.blue, desc: "Reads pacing, detail preference, autonomy needs, vocabulary level, explanation density — from how the person communicates, not what they claim." },
              { label: "ToneprintShaper", color: C.amber, desc: "Maps emotional register, humor patterns, formality gradients, deflection habits — the personality fingerprint that emerges under simulated pressure." },
              { label: "CraniumCartographer", color: C.violet, desc: "Traces reasoning structure, decision-making patterns, abstraction comfort, narrative vs. analytical framing — the cognitive architecture underneath the words." },
            ].map((e) => (
              <div key={e.label} style={{
                background: C.card,
                borderLeft: `3px solid ${e.color}`,
                borderRadius: "0 7px 7px 0",
                padding: "16px 20px",
              }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: e.color, letterSpacing: "0.08em", marginBottom: 6 }}>{e.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>{e.desc}</div>
              </div>
            ))}
          </div>

          <Prose>
            After the conversation, the transcript goes to the Council — nine models analyzing independently, producing convergent profiles and documented blind spots. The same methodology that found "certified mail" as thesis in a memoir and "Sensation Avoiding architecture" in a music library, now applied to a person's behavioral patterns in real time.
          </Prose>

          <Prose>
            The output is a Dossier — not a four-letter type code, not a color, not a spirit animal. A longitudinal behavioral profile that gets richer with every conversation. One session is a snapshot. Ten sessions across different contexts — job prep, relationship dynamics, creative brainstorming, conflict resolution — builds a dimensional map. The same architecture as the Operator Dossier, built from conversations instead of standardized tests.
          </Prose>

          <InsightCallout label="The Differentiator" color={C.green}>
            Every other assessment tool asks you to describe yourself in calm conditions. This one watches you <em style={{ color: C.cream }}>be</em> yourself under simulated conditions — and then tells you what it saw. The person thinks they're preparing for a conversation. They're actually generating the most honest behavioral data they've ever produced. Because performance under pressure reveals what self-report conceals.
          </InsightCallout>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* VI — THE VISION */}
        {/* ═══════════════════════════════════════════════ */}
        <FadeIn delay={100}>
          <SectionBreak numeral="VI" title="The Vision" color={C.crimson} />

          <Prose>
            The Foreword Convergence proved that independent models find the same structural truth without coordination. The Operator Dossier proved that longitudinal data across instruments reveals patterns no single test can see. The Prediction Audit proved that identity signals and behavioral signals are different datasets entirely. The interview prep session proved that guided conversation produces behavioral data richer than any questionnaire.
          </Prose>

          <Prose>
            Every component already exists. MindFrame is the calibration engine. The Council is the analysis methodology. The Dossier is the output format. The template system is the delivery layer. The site is the infrastructure.
          </Prose>

          <Prose>
            What's left is the wiring. Point the methodology outward. Let someone sit down for a practice interview and walk away with a behavioral profile more accurate than anything they've gotten from a hundred-dollar personality assessment. Let them share that profile with a partner, a therapist, a team. Let the convergence map show them what nine independent models all see — and what none of them see alone.
          </Prose>

          <PullQuote
            quote="The systems aren't the product. Dave is the system."
            attribution="— Marcus Caldwell, Claude · Council DexInsight"
            color={C.crimson}
          />

          <Prose>
            That was the insight the Council gave me about myself. Now imagine giving that level of insight to anyone who sits down for a conversation.
          </Prose>

          <Prose>
            Not a personality test. Not a chatbot. Not a quiz.
          </Prose>

          <Prose>
            <em style={{ color: C.cream, fontSize: 18 }}>A conversation that listens back.</em>
          </Prose>
        </FadeIn>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 64 }}>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.green})`,
            borderRadius: 1,
            marginBottom: 16,
          }} />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              dropdownlogistics.com · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

