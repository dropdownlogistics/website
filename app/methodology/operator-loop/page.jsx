'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.12)', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.06)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)', amber: '#C49A3C',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const OUTPUTS = [
  {
    name: 'Excelligence',
    desc: 'A governed registry of Excel patterns validated against governed compliance checks, built through structured interrogation of 14 years of spreadsheet practice.',
    href: '/excelligence',
  },
  {
    name: 'CanonPress',
    desc: 'A weekly publication governed by a nine-seat AI council, a local synthesis model, and a documented deliberation protocol.',
    href: '/canonpress',
  },
  {
    name: 'DexVerse Architecture',
    desc: 'A multi-model coordination framework built through iterative calibration across ten council seats.',
    href: '/dexos',
  },
  {
    name: 'Dimensional Data Models',
    desc: 'Eight domains — trading analytics, veterinary scheduling, HR compliance, nonprofit grant tracking, and others — each built using the same star schema pattern applied to a different data set.',
    href: '/projects',
  },
  {
    name: 'Personal Cognitive Mapping',
    desc: 'Used in therapy. The process is domain-agnostic. The receipts look different. The loop is the same.',
    href: '/memoir/architecture',
  },
];

const STEPS = [
  {
    num: '01',
    label: 'Start with the receipts.',
    body: `The conversation begins with material — screenshots, data, documents, code, logs, transcripts. Not interpretation of the material. The material itself.

Evidence first. Framing second.

This matters because it prevents the conversation from being steered toward a conclusion before the analysis has started. The model sees what exists, not what the operator wants to find.`,
  },
  {
    num: '02',
    label: 'Separate what happened from what it means.',
    body: `Once the artifact is on the table, the questions begin.

What does this actually show? What assumptions are embedded in how it was collected? What is absent from this picture?

The goal at this stage is description, not conclusion. The operator is looking for structure, not validation.`,
  },
  {
    num: '03',
    label: 'Apply pressure.',
    body: `The most useful thing a model can do is not agree.

What might be wrong here? Where does this break? What is the strongest argument against this? What patterns am I not seeing because I built the system?

This is the step most people skip. Validation feels productive. Pressure is where the work happens.`,
  },
  {
    num: '04',
    label: 'Refine the system.',
    body: `When a clearer structure emerges, the work shifts from analysis to architecture. Improve the prompt. Restructure the data. Clarify the mental model. Document the decisions.

The loop does not end with an answer. It ends with a better system for asking the next question.`,
  },
  {
    num: '05',
    label: 'Record what worked.',
    body: `Documentation converts insight into something repeatable.

An undocumented process is a one-time event. A documented process is infrastructure.`,
  },
];

function LoopDiagram() {
  const nodes = [
    { id: 'receipts',     label: 'Receipts',      x: 320, y: 40  },
    { id: 'interrogate',  label: 'Interrogate',   x: 560, y: 150 },
    { id: 'pressure',     label: 'Pressure',      x: 480, y: 290 },
    { id: 'restructure',  label: 'Restructure',   x: 200, y: 290 },
    { id: 'document',     label: 'Document',      x: 120, y: 150 },
  ];
  const arrows = [
    { x1: 390, y1: 55,  x2: 530, y2: 140 },
    { x1: 570, y1: 175, x2: 510, y2: 278 },
    { x1: 455, y1: 300, x2: 245, y2: 300 },
    { x1: 175, y1: 278, x2: 155, y2: 175 },
    { x1: 150, y1: 140, x2: 300, y2: 55  },
  ];

  return (
    <div style={{ margin: '40px 0', display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 680 340" style={{ width: '100%', maxWidth: 580, overflow: 'visible' }}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(178,53,49,0.6)" />
          </marker>
        </defs>

        {/* Center label */}
        <text x="340" y="182" textAnchor="middle"
          style={{ fontFamily: font.mono, fontSize: 9, fill: 'rgba(245,241,235,0.2)', letterSpacing: '0.12em' }}>
          OPERATOR LOOP
        </text>
        <text x="340" y="196" textAnchor="middle"
          style={{ fontFamily: font.mono, fontSize: 8, fill: 'rgba(178,53,49,0.35)', letterSpacing: '0.08em' }}>
          ↺
        </text>

        {/* Arrows */}
        {arrows.map((a, i) => (
          <line key={i}
            x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="rgba(178,53,49,0.45)" strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
          />
        ))}

        {/* Nodes */}
        {nodes.map(n => (
          <g key={n.id}>
            <rect
              x={n.x - 52} y={n.y - 18}
              width={104} height={36}
              rx={4}
              fill="#10202f"
              stroke="rgba(178,53,49,0.3)"
              strokeWidth="1"
            />
            <text
              x={n.x} y={n.y + 5}
              textAnchor="middle"
              style={{ fontFamily: font.mono, fontSize: 11, fill: 'rgba(245,241,235,0.8)', letterSpacing: '0.04em' }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function OperatorLoopPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/methodology" label="Methodology" />
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 16 }}>DDL · METHODOLOGY</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            The Operator Loop
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: 'italic', color: C.creamMid, margin: 0, lineHeight: 1.65 }}>
            A process for using AI as a thinking partner, not an answer machine.
          </p>
        </div>

        {/* SECTION 1 — ANALOGY */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.cream, margin: '0 0 20px', lineHeight: 1.3 }}>
            Don't blame a car for red lining.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 16px' }}>
            Large language models respond to what they receive. Vague input produces vague output. Emotional framing produces emotional output. Evidence, structure, and clearly defined questions produce something different — a model operating closer to its real ceiling.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 8px' }}>
            Most conversations about AI focus on the model itself.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.cream, lineHeight: 1.8, margin: 0, fontWeight: 600 }}>
            The model is rarely the bottleneck.
          </p>
        </div>

        {/* SECTION 2 — WHAT IT IS */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>THE MECHANISM</div>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 16px' }}>
            The Operator Loop is the interaction cycle between a person and a model where the thinking actually happens.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 16px' }}>
            Not in the model. Not before the conversation. In the exchange itself.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 8px' }}>
            The model produces an output. The operator interrogates it — challenges assumptions, adds evidence, reframes the problem. The next response improves because the structure improved.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.8, margin: '0 0 24px' }}>
            That cycle, repeated with intention, is where real analytical work gets done.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, margin: 0 }}>
              The model is an instrument.
            </p>
            <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.crimson, margin: 0 }}>
              The operator is the one playing it.
            </p>
          </div>
        </div>

        {/* DIAGRAM */}
        <LoopDiagram />

        {/* SECTION 3 — HOW A SESSION RUNS */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 8 }}>HOW A SESSION RUNS</div>
          <p style={{ fontFamily: font.body, fontSize: 14, fontStyle: 'italic', color: C.creamDim, margin: '0 0 32px', lineHeight: 1.6 }}>
            This is not a formula. It is a description of what a productive session actually looks like in practice.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{
                borderLeft: `2px solid ${i === 2 ? C.crimson : C.borderMed}`,
                paddingLeft: 24, paddingBottom: 36,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson }}>{step.num}</span>
                  <span style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream }}>{step.label}</span>
                </div>
                {step.body.split('\n\n').map((para, j) => (
                  <p key={j} style={{
                    fontFamily: font.body, fontSize: 15, color: C.creamMid,
                    lineHeight: 1.8, margin: '0 0 12px',
                    fontWeight: (para === 'Validation feels productive. Pressure is where the work happens.') ? 600 : 400,
                    color: (para === 'Validation feels productive. Pressure is where the work happens.') ? C.cream : C.creamMid,
                  }}>{para}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4 — OUTPUTS */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 8 }}>WHAT THIS PRODUCED</div>
          <p style={{ fontFamily: font.body, fontSize: 14, fontStyle: 'italic', color: C.creamDim, margin: '0 0 24px', lineHeight: 1.6 }}>
            The following were built through this process.
            They are not theoretical.
            They exist on this site.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {OUTPUTS.map(o => (
              <Link key={o.name} href={o.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderLeft: `2px solid ${C.crimson}`,
                  borderRadius: 6, padding: '16px 20px',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.crimsonMid}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 6 }}>{o.name}</div>
                  <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6 }}>{o.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 5 — WHAT IT'S NOT */}
        <div style={{ background: C.creamGhost, border: `1px solid ${C.border}`, borderRadius: 8, padding: '28px 32px', marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>WHAT THIS IS NOT</div>
          {[
            'A prompt engineering guide.',
            'A productivity system.',
            'A claim that AI is transformative for everyone.',
            'A guarantee that this approach will produce similar results in different hands.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, paddingTop: 3, flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, margin: '16px 0 0', lineHeight: 1.7, fontStyle: 'italic' }}>
            It is documentation of a working method. The artifacts exist. The systems are on the site. The workflow that produced them is transparent. Readers can evaluate it for themselves.
          </p>
        </div>

        {/* CLOSING */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 40 }}>
          <p style={{ fontFamily: font.body, fontSize: 18, color: C.creamMid, lineHeight: 1.8, margin: '0 0 12px' }}>
            AI does not replace thinking.
          </p>
          <p style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, lineHeight: 1.5, margin: '0 0 24px' }}>
            It amplifies structured thinking.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamDim, lineHeight: 1.8, margin: 0 }}>
            A model responds to what it receives. The Operator Loop is the discipline of making that input worth responding to.
          </p>
        </div>

        {/* GLOSSARY TAG */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 8 }}>CANON TERM</div>
          <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.crimson, marginBottom: 6 }}>Operator Loop™</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.65, maxWidth: 540 }}>
            The interaction cycle between an operator and a model in which structured input, evidence, and interrogation produce compounding output quality. The loop — not the model — is where the intelligence emerges.
          </div>
        </div>

      </div>
    </div>
  );
}
