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
// Scenarios
// ═══════════════════════════════════════════════════════════
const scenarios = [
  {
    id: "interview",
    icon: "💼",
    label: "Job Interview",
    short: "Practice for a role",
    exchange: [
      { role: "ai", text: "Tell me about a time you had to push back on a decision you disagreed with." },
      { role: "user", text: "At my last role, my manager wanted to skip the reconciliation step on a quarterly close. I understood the time pressure, but I knew from experience that skipping it would create downstream issues. So I pulled together a quick comparison showing the two times we'd skipped it before and the cleanup hours that followed. He agreed to keep it." },
      { role: "ai", text: "Interesting. You led with empathy for the time pressure before presenting evidence. That's a pattern — you tend to validate the other person's position before introducing your counter. Let's explore that." },
    ],
    insights: [
      { label: "Communication Pattern", value: "Validate-then-redirect", color: C.blue },
      { label: "Conflict Style", value: "Evidence-based, non-confrontational", color: C.green },
      { label: "Decision Framing", value: "Historical precedent over theoretical risk", color: C.amber },
      { label: "Blind Spot", value: "May over-accommodate before asserting", color: C.rose },
    ],
  },
  {
    id: "relationship",
    icon: "💬",
    label: "Difficult Conversation",
    short: "Navigate a hard talk",
    exchange: [
      { role: "ai", text: "Walk me through what you want to say. What's the core thing that needs to come across?" },
      { role: "user", text: "I need to tell my partner that the way they handle finances is stressing me out. But I don't want it to feel like an attack. I want them to know I'm not blaming them — I just need us to have a system." },
      { role: "ai", text: "You framed this as needing a system, not needing them to change. That's telling — you instinctively externalize the problem into a structural solution rather than a personal one. That protects the relationship, but it might also avoid the emotional core. What are you actually feeling?" },
    ],
    insights: [
      { label: "Conflict Approach", value: "Structural displacement — externalizes into systems", color: C.violet },
      { label: "Protection Pattern", value: "Shields partner from blame at own expense", color: C.blue },
      { label: "Emotional Access", value: "Analytical framing may bypass feeling layer", color: C.amber },
      { label: "Strength", value: "Natural de-escalation through shared problem framing", color: C.green },
    ],
  },
  {
    id: "pitch",
    icon: "🎯",
    label: "Pitch Rehearsal",
    short: "Sharpen your pitch",
    exchange: [
      { role: "ai", text: "Give me the 60-second version. What is it, who is it for, and why now?" },
      { role: "user", text: "We're building a platform that replaces personality tests with real behavioral data. Instead of asking people who they think they are, we measure who they actually are during guided conversations. The assessment market is $2.8 billion and every product in it relies on self-report, which fails half the time." },
      { role: "ai", text: "You led with the mechanism, not the outcome. An investor hears 'replaces personality tests' and thinks incremental. What if you led with the insight — that the most honest data a person produces is when they're focused on something else entirely?" },
    ],
    insights: [
      { label: "Pitch Pattern", value: "Mechanism-first, outcome-second", color: C.amber },
      { label: "Confidence Signal", value: "Strong on technical framing, lighter on vision", color: C.blue },
      { label: "Persuasion Style", value: "Logical build, not emotional hook", color: C.violet },
      { label: "Coaching Note", value: "Lead with the insight, not the infrastructure", color: C.green },
    ],
  },
  {
    id: "therapy",
    icon: "🧠",
    label: "Self-Discovery",
    short: "Understand yourself better",
    exchange: [
      { role: "ai", text: "What's something you're good at that you don't get credit for?" },
      { role: "user", text: "I'm really good at seeing how things connect — like patterns across totally different domains. But it's hard to explain to people because by the time I see the connection, I've already moved on to building something with it." },
      { role: "ai", text: "You just described the connection between the ability and the invisibility in the same breath — you move so fast from insight to execution that others never see the insight happen. That speed is a strength and a blind spot. The work is visible. The thinking isn't." },
    ],
    insights: [
      { label: "Cognitive Signature", value: "Rapid pattern-to-execution pipeline", color: C.violet },
      { label: "Recognition Gap", value: "Thinking is invisible — only outputs are seen", color: C.amber },
      { label: "Communication Style", value: "Abstract-to-concrete in a single move", color: C.blue },
      { label: "Growth Edge", value: "Slowing down to show the reasoning, not just the result", color: C.green },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// FAQ Data
// ═══════════════════════════════════════════════════════════
const faq = [
  {
    q: "How is this different from a personality test?",
    a: "Personality tests ask you to describe yourself. We watch you be yourself. When you're focused on practicing an interview or rehearsing a conversation, the patterns in how you communicate — your pacing, your framing, your instincts — are more honest than any self-report. We analyze those patterns, not your answers to abstract questions.",
  },
  {
    q: "What kind of conversations can I practice?",
    a: "Anything with stakes. Job interviews, difficult conversations with a partner or family member, pitch rehearsals, salary negotiations, performance reviews, college admissions interviews, client presentations, therapy-adjacent self-exploration. The conversation is real practice. The behavioral profile is a bonus.",
  },
  {
    q: "How does the multi-model analysis work?",
    a: "Your conversation transcript is analyzed independently by multiple AI models — each looking for patterns the others might miss. Where they converge, the signal is strong. Where they diverge, there's nuance worth exploring. You see everything: what every model found, where they agreed, and what they missed. No black box.",
  },
  {
    q: "Is my data private?",
    a: "Your conversations are yours. Nothing is shared, sold, or used to train models. You control what's stored and what's deleted. The analysis runs on your data and returns to you. Period.",
  },
  {
    q: "What do I actually get?",
    a: "After each session, you get a behavioral profile covering communication patterns, decision-making style, conflict approach, emotional register, and cognitive signature. Over time, sessions across different contexts build a dimensional map — a longitudinal picture of who you are that gets richer with every conversation.",
  },
  {
    q: "How is this different from just talking to ChatGPT?",
    a: "A general AI conversation is open-ended and unstructured. This is a guided experience built on a calibration engine — the conversation has structure, the analysis has methodology, and the output has a format designed to surface insights you wouldn't get from freeform chat. Think of it as the difference between journaling and a clinical assessment. Both are valuable. Only one is a measurement instrument.",
  },
];

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function ScenarioCard({ scenario, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: "1 1 140px",
        minWidth: 130,
        background: isActive ? C.card : "transparent",
        border: `1px solid ${isActive ? C.crimson + "60" : C.border}`,
        borderRadius: 8,
        padding: "16px 14px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.25s",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>{scenario.icon}</div>
      <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: isActive ? C.cream : C.creamMid, marginBottom: 4 }}>
        {scenario.label}
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{scenario.short}</div>
    </button>
  );
}

function ChatBubble({ role, text }) {
  const isAI = role === "ai";
  return (
    <div style={{
      display: "flex",
      justifyContent: isAI ? "flex-start" : "flex-end",
      marginBottom: 12,
    }}>
      <div style={{
        maxWidth: "82%",
        background: isAI ? C.card : C.crimson + "18",
        border: `1px solid ${isAI ? C.borderMed : C.crimson + "30"}`,
        borderRadius: isAI ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
        padding: "12px 16px",
      }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: isAI ? C.blue : C.crimson, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          {isAI ? "AI" : "You"}
        </div>
        <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>{text}</div>
      </div>
    </div>
  );
}

function InsightTag({ label, value, color }) {
  return (
    <div style={{
      background: color + "10",
      border: `1px solid ${color}25`,
      borderRadius: 6,
      padding: "10px 14px",
      flex: "1 1 200px",
      minWidth: 180,
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color }}>{value}</div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span style={{ fontFamily: font.body, fontSize: 16, color: C.cream, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          fontFamily: font.mono,
          fontSize: 18,
          color: C.creamDim,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          flexShrink: 0,
        }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, paddingRight: 40 }}>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.75 }}>{a}</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function LandingPage() {
  const [activeScenario, setActiveScenario] = useState("interview");
  const scenario = scenarios.find((s) => s.id === activeScenario);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ═══════════════════════════════════════════════ */}
        {/* HERO */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 24 }}>
            Behavioral Intelligence
          </div>

          <h1 style={{
            fontFamily: font.body,
            fontSize: 52,
            fontWeight: 400,
            fontStyle: "italic",
            color: C.cream,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            A Conversation<br />That Listens Back
          </h1>

          <p style={{
            fontFamily: font.body,
            fontSize: 18,
            color: C.creamMid,
            lineHeight: 1.65,
            maxWidth: 560,
            margin: "0 auto 32px",
          }}>
            Practice any high-stakes conversation. Get a behavioral profile more honest than any personality test — because you weren't trying to describe yourself. You were trying to <em style={{ color: C.cream }}>perform</em>.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              fontFamily: font.mono,
              fontSize: 12,
              padding: "12px 28px",
              background: C.crimson,
              color: C.cream,
              borderRadius: 6,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}>
              Join the Waitlist
            </div>
            <div style={{
              fontFamily: font.mono,
              fontSize: 12,
              padding: "12px 28px",
              background: "transparent",
              color: C.creamMid,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}>
              See How It Works ↓
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* HOW IT WORKS — 3 Steps */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { num: "01", label: "Have a Conversation", desc: "Practice a job interview, rehearse a difficult talk, prep a pitch — whatever you need.", color: C.blue },
              { num: "02", label: "We Analyze the Patterns", desc: "Multiple AI models independently analyze how you communicate — not what you say, but how you say it.", color: C.amber },
              { num: "03", label: "See Who You Are", desc: "Get a behavioral profile showing your communication style, decision patterns, blind spots, and strengths.", color: C.green },
            ].map((s) => (
              <div key={s.num} style={{
                flex: "1 1 220px",
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "24px 20px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.4 }} />
                <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: s.color, opacity: 0.3, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* INTERACTIVE DEMO — Scenario Picker */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "60px 24px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>
              Try a Scenario
            </div>
            <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, textAlign: "center", marginBottom: 24 }}>
              What would you practice?
            </h2>

            {/* Scenario tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {scenarios.map((s) => (
                <ScenarioCard
                  key={s.id}
                  scenario={s}
                  isActive={s.id === activeScenario}
                  onClick={() => setActiveScenario(s.id)}
                />
              ))}
            </div>

            {/* Chat preview */}
            <div style={{
              background: C.navy,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "24px 20px",
              marginBottom: 24,
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                Sample Exchange · {scenario.label}
              </div>
              {scenario.exchange.map((msg, i) => (
                <ChatBubble key={i} role={msg.role} text={msg.text} />
              ))}
            </div>

            {/* Insight preview */}
            <div style={{
              background: C.navy,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "20px",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                What We'd See · Sample Insights
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {scenario.insights.map((ins, i) => (
                  <InsightTag key={i} label={ins.label} value={ins.value} color={ins.color} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* THE DIFFERENCE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.rose, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>
            The Problem With Personality Tests
          </div>
          <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, textAlign: "center", marginBottom: 32 }}>
            They ask the wrong question
          </h2>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {/* Old way */}
            <div style={{
              flex: "1 1 300px",
              background: C.card,
              border: `1px solid ${C.rose}20`,
              borderRadius: 8,
              padding: "24px 20px",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.rose, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                Traditional Assessments
              </div>
              <div style={{ fontFamily: font.body, fontSize: 20, fontStyle: "italic", color: C.cream, marginBottom: 16, lineHeight: 1.4 }}>
                "Who do you think you are?"
              </div>
              {["Self-report bias contaminates every answer", "50% test-retest failure rate", "Mood-dependent results", "Measures self-concept, not behavior", "Static snapshot that expires"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 12, color: C.rose, flexShrink: 0, marginTop: 2 }}>✕</span>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* New way */}
            <div style={{
              flex: "1 1 300px",
              background: C.card,
              border: `1px solid ${C.green}20`,
              borderRadius: 8,
              padding: "24px 20px",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.green, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                Behavioral Intelligence
              </div>
              <div style={{ fontFamily: font.body, fontSize: 20, fontStyle: "italic", color: C.cream, marginBottom: 16, lineHeight: 1.4 }}>
                "Who are you when you're not thinking about it?"
              </div>
              {["Measures revealed behavior, not self-report", "Multiple models verify every finding", "Context-rich — different conversations, different data", "Behavioral patterns under simulated pressure", "Longitudinal — builds over time across sessions"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 12, color: C.green, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* FAQ — CODEX section */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "60px 24px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.ember, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
              Questions
            </div>
            <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, marginBottom: 24 }}>
              How it works
            </h2>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {faq.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* CTA */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{
            fontFamily: font.body,
            fontSize: 32,
            fontWeight: 400,
            fontStyle: "italic",
            color: C.cream,
            marginBottom: 16,
            lineHeight: 1.2,
          }}>
            Ready to hear what your<br />conversations say about you?
          </h2>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, marginBottom: 28 }}>
            Early access opening soon. Join the waitlist and be first to try it.
          </p>
          <div style={{
            display: "inline-block",
            fontFamily: font.mono,
            fontSize: 13,
            padding: "14px 36px",
            background: C.crimson,
            color: C.cream,
            borderRadius: 6,
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}>
            Join the Waitlist
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 40px" }}>
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
              Dropdown Logistics · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
