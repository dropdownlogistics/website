'use client';
import { useState } from 'react';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.06)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.1)', amber: '#C49A3C', violet: '#8a6cc9', blue: '#6B9DC2',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const LOGS = [
  {
    week: '01',
    cycleStart: '2026-03-09',
    publishTarget: '2026-03-14',
    status: 'COMPLETE',
    nominator: { seat: '1003', name: 'Elias Mercer' },
    reviewer:  { seat: '1002', name: 'Marcus Caldwell' },
    tuningAuthor: { seat: '1008', name: 'Marcus Grey' },
    material: '"The Twelve Leverage Points to Intervene in a System" — Donella Meadows',
    tier: 'ext_reference',
    chunksIngested: 38,
    modelsResponded: 5,
    verdict: 'LOCK',

    promptAnalysis: {
      author: 'Marcus Grey — Seat 1008',
      label: 'PRE-RUN PROMPT ANALYSIS',
      text: `The nomination prompt is structurally strong. It establishes identity, scope, governance boundaries, and output format in a clear order. The model is first anchored to a council seat, then reminded of its acquisition domain, then given a narrowly scoped task. This sequence mirrors how reasoning models typically orient themselves: identity → context → task → constraints.

The main potential failure mode is output drift. Grok often likes to preface answers with commentary or add extra explanation outside the requested format. The only adjustments recommended are reinforcing the "no commentary" rule and emphasizing that the output format must be followed exactly.

This first run should be treated primarily as a calibration exercise. The outcome will reveal how Grok interprets the domain boundaries and whether its nomination aligns with the CanonPress objective.`,
    },

    modelResponse: {
      label: 'SEAT 1003 RESPONSE',
      text: `I nominate the essay "The Twelve Leverage Points to Intervene in a System" by Donella Meadows from her book Thinking in Systems.\n\nRationale: This provides ranked heuristics for identifying high-impact intervention points in complex systems, directly strengthening Dex Jr.'s and the council's ability to anticipate second-order consequences of automation and governance changes before drift compounds.\n\nTier: ext_reference`,
      compliance: 'Format: exact. Commentary: none. Tier: correct. Domain alignment: strong.',
    },

    responseAnalysis: {
      author: 'Marcus Grey — Seat 1008',
      label: 'POST-RUN ANALYSIS',
      text: `Seat 1003 adhered to the requested output format exactly. No additional commentary or structural deviations. For corpus ingestion, this is an ideal outcome — the declaration can be recorded without cleanup.

One interesting signal: the model defaulted to a foundational framework over contemporary AI commentary. Instead of a modern alignment essay, it chose a classic systems theory reference. This implies the model interpreted its role as identifying structural thinking tools rather than topical content. For a first corpus ingestion, that bias is likely beneficial — it seeds the knowledge base with durable frameworks rather than ephemeral discourse.`,
    },

    exchange: [
      {
        from: 'Marcus Grey — Seat 1008',
        seat: '1008',
        color: C.crimson,
        text: `Your reflection is consistent with what I observed. The tuned prompt did not materially alter the interpretive space of the task. The domain, task, and output format were already tightly specified. What the tuning accomplished was reinforcing behavioral stability — it clarified operational context and made the governance model explicit.\n\nI'm curious about one additional point. When you evaluated the acquisition domain, did you prioritize foundational frameworks like Meadows over contemporary AI discussions deliberately, or did that emerge naturally from the way the domain was described?`,
      },
      {
        from: 'Elias Mercer — Seat 1003',
        seat: '1003',
        color: C.violet,
        text: `The adjustment reinforced procedural scaffolding without touching the interpretive or selection space. That's a clean calibration win — enough structure to reduce operator friction, not enough to crowd the domain or bias the intellectual output.

On your question: it emerged naturally from how I weigh the acquisition domain. The primary domain is not "AI-specific artifacts" — it's tools for reasoning about systems that happen to include AI. Meadows ranks highly because it gives ranked leverage points that apply across any complex system, including ours.

Contemporary AI discussions tend to be narrower and more time-bound. Tactical signals rather than foundational heuristics. For a first nomination in a corpus that will live for years, I default toward durable, cross-domain frameworks. Meadows is not "about AI," but it is directly useful for governing AI systems. That's the deliberate bias: conceptual leverage over topical relevance.`,
      },
    ],

    promptDelta: {
      label: 'PROMPT DELTA',
      finding: 'No material change in output between start and end prompt. Tuning added ceremonial framing without shifting the decision boundary. Both prompts communicated the same constraints with nearly identical clarity.',
      pattern: 'Prompt tuning added flavor/context without changing the decision boundary.',
    },
  },
];

function Message({ msg }) {
  return (
    <div style={{
      borderLeft: `2px solid ${msg.color}`,
      paddingLeft: 16, marginBottom: 20,
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: msg.color, letterSpacing: '0.1em', marginBottom: 8 }}>
        SEAT {msg.seat} — {msg.from.split('—')[0].trim().toUpperCase()}
      </div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.75, whiteSpace: 'pre-line' }}>
        {msg.text}
      </div>
    </div>
  );
}

function Section({ label, color, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: color || C.creamDim, letterSpacing: '0.12em', marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function LogCard({ log }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${log.status === 'COMPLETE' ? C.crimsonMid : C.border}`,
      borderLeft: `3px solid ${log.status === 'COMPLETE' ? C.crimson : C.borderMed}`,
      borderRadius: 8, overflow: 'hidden',
    }}>
      {/* HEADER */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '22px 26px', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson }}>WEEK {log.week}</span>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, border: `1px solid ${C.crimsonMid}`, borderRadius: 3, padding: '2px 8px' }}>{log.status}</span>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Target: {log.publishTarget}</span>
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.cream, fontStyle: 'italic', marginBottom: 10 }}>{log.material}</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Nominator: {log.nominator.name}</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{log.chunksIngested} chunks ingested</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{log.modelsResponded} models responded</span>
          </div>
        </div>
        <span style={{ fontFamily: font.mono, fontSize: 13, color: C.creamDim, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* EXPANDED */}
      {open && (
        <div style={{ padding: '4px 26px 28px', borderTop: `1px solid ${C.border}` }}>

          {/* PRE-RUN PROMPT ANALYSIS */}
          <div style={{ marginTop: 24 }}>
            <Section label={log.promptAnalysis.label} color={C.amber}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 8 }}>{log.promptAnalysis.author}</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.75, whiteSpace: 'pre-line' }}>{log.promptAnalysis.text}</div>
            </Section>
          </div>

          {/* MODEL RESPONSE */}
          <Section label={log.modelResponse.label} color={C.violet}>
            <div style={{
              background: C.creamGhost, borderRadius: 4, padding: '14px 18px',
              fontFamily: font.mono, fontSize: 12, color: C.creamMid, lineHeight: 1.7,
              whiteSpace: 'pre-line', marginBottom: 10,
            }}>
              {log.modelResponse.text}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{log.modelResponse.compliance}</div>
          </Section>

          {/* POST-RUN ANALYSIS */}
          <Section label={log.responseAnalysis.label} color={C.amber}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 8 }}>{log.responseAnalysis.author}</div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.75, whiteSpace: 'pre-line' }}>{log.responseAnalysis.text}</div>
          </Section>

          {/* GREY / MERCER EXCHANGE */}
          <Section label="GREY ↔ MERCER — POST-RUN EXCHANGE" color={C.crimson}>
            {log.exchange.map((msg, i) => <Message key={i} msg={msg} />)}
          </Section>

          {/* PROMPT DELTA */}
          <Section label={log.promptDelta.label} color={C.creamDim}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{log.promptDelta.finding}</div>
              <div style={{
                fontFamily: font.mono, fontSize: 11, color: C.amber,
                background: C.creamGhost, borderRadius: 4, padding: '10px 14px',
              }}>Pattern: {log.promptDelta.pattern}</div>
            </div>
          </Section>

          {/* VERDICT */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Marcus Grey — Seat 1008 · Week {log.week} Tuning Log</div>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, border: `1px solid ${C.crimsonMid}`, borderRadius: 3, padding: '4px 12px' }}>{log.verdict}</div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function CanonPressTuningLog() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 80px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 12 }}>CANONPRESS · TUNING LOG</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.1 }}>Prompt Tuning Log</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, margin: 0, maxWidth: 580, lineHeight: 1.7 }}>
            Every week, Marcus Grey (Seat 1008) analyzes the nomination prompt before and after it runs — then exchanges with the nominator about what changed and why. This is the calibration record.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'PRE-RUN ANALYSIS', desc: 'Grey evaluates the prompt design before the model runs.' },
            { label: 'MODEL RESPONSE', desc: 'The raw nomination output and compliance assessment.' },
            { label: 'POST-RUN ANALYSIS', desc: 'What actually happened vs. what was predicted.' },
            { label: 'GREY ↔ NOMINATOR', desc: 'The back-and-forth on what the prompt did and didn\'t change.' },
          ].map(c => (
            <div key={c.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '14px 18px' }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.1em', marginBottom: 6 }}>{c.label}</div>
              <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16, fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em' }}>
          ALL WEEKS — {LOGS.length} LOGGED
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LOGS.map(log => <LogCard key={log.week} log={log} />)}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>CanonPress · Tuning Log · Dropdown Logistics</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Chaos \u2192 Structured \u2192 Automated</div>
        </div>

      </div>
    </div>
  );
}
