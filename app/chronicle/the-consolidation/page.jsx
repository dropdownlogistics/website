'use client';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.3)', creamGhost: 'rgba(245,241,235,0.06)',
  border: 'rgba(245,241,235,0.06)', borderMed: 'rgba(245,241,235,0.12)',
  amber: '#C49A3C', violet: '#8a6cc9', green: '#4A9E6B',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const acts = [
  {
    num: 'ACT I',
    title: 'The Dig',
    color: C.amber,
    body: 'Screenshots of what the notes actually look like. GPT-3.5 emoji headers next to PowerShell dedup functions. Half-finished proposals that became live systems six months later without anyone noticing the lineage. A repo path in a note that points to a repo you forgot existed.',
    pulls: [
      '"Wait — this is the same system. I just built it again."',
      '"DexKit v3.0 / folder 5 / DexScripture"',
    ],
  },
  {
    num: 'ACT II',
    title: 'The Finds',
    color: C.violet,
    body: 'Working tools buried in scratch notes. Early versions of systems that evolved beyond recognition. Ideas that were paused, not abandoned — and the difference matters. The moment you realize DexKit v3.0 folder 5 (DexScripture) is the ancestor of the CottageHumble footer tagline.',
    pulls: [
      '"Paused is not the same as abandoned."',
      '"Humble surface. Cathedral underneath." — found in a scratch note, 2023.',
    ],
  },
  {
    num: 'ACT III',
    title: 'The Pattern',
    color: C.green,
    body: 'What consolidation reveals about how you actually work. Capture is prolific. Refinement is selective. The gap between them is where things get lost. The nine buckets are not categories invented today — they are categories that were always there, just never named.',
    pulls: [
      '"The archive doesn\'t need organization. It needs inventory control."',
      '"The categories were always there."',
    ],
  },
];

const stats = [
  { value: '1M+', label: 'Characters of notes' },
  { value: '14+', label: 'Capture buckets' },
  { value: '7', label: 'DexKit versions' },
  { value: '3', label: 'MindFrame generations' },
];

function PullQuote({ text, color }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color}`,
      paddingLeft: 20,
      margin: '24px 0',
      background: `${color}08`,
      padding: '14px 20px',
      borderRadius: '0 6px 6px 0',
    }}>
      <div style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.cream, lineHeight: 1.65 }}>{text}</div>
    </div>
  );
}

function TimelineAct({ act, index }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 56, position: 'relative' }}>
      {/* spine dot */}
      <div style={{ width: 80, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: act.color, boxShadow: `0 0 16px ${act.color}60`, flexShrink: 0 }} />
        {index < acts.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, marginTop: 8 }} />}
      </div>
      {/* content */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: act.color, letterSpacing: '0.18em', marginBottom: 6 }}>{act.num}</div>
        <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.cream, margin: '0 0 16px', lineHeight: 1.2 }}>{act.title}</h2>
        <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.85, margin: '0 0 20px' }}>{act.body}</p>
        {act.pulls.map((p, i) => <PullQuote key={i} text={p} color={act.color} />)}
      </div>
    </div>
  );
}

export default function TheConsolidation() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* BREADCRUMB */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 48 }}>
          CHRONICLE · DDL · THE OPERATOR
        </div>

        {/* HERO */}
        <div style={{ marginBottom: 56 }}>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 54px)', fontWeight: 700, color: C.cream, margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            The Consolidation
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 18, color: C.creamMid, lineHeight: 1.8, maxWidth: 620, margin: 0 }}>
            The episode where the operator stops building forward and digs backward. A million characters of notes across 14+ buckets, seven DexKit versions, three MindFrame generations, and an archive that predates the methodology it now lives inside.
          </p>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginBottom: 64 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: C.card, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.crimson, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* OPENING */}
        <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Opening</div>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.85, margin: '0 0 20px' }}>
            Why now. 67 routes live, the site is real, and the foundation underneath is held together by memory. The consolidation is not organization.
          </p>
          <PullQuote text='"It\'s inventory control for intellectual property you forgot you owned."' color={C.crimson} />
        </div>

        {/* ACTS TIMELINE */}
        <div style={{ position: 'relative', marginBottom: 64 }}>
          {/* full spine line */}
          <div style={{ position: 'absolute', left: 39, top: 0, bottom: 0, width: 1, background: C.border }} />
          {acts.map((act, i) => <TimelineAct key={i} act={act} index={i} />)}
        </div>

        {/* CLOSING */}
        <div style={{ background: C.card, border: `1px solid ${C.borderMed}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: 8, padding: '28px 32px', marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.15em', marginBottom: 16 }}>CLOSING · THE REGISTRY PROPOSAL</div>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, lineHeight: 1.85, margin: '0 0 16px' }}>
            This is the last manual pass. After this, capture has a pipeline. The consolidation is proof the pipeline was always needed — and evidence of everything it will protect going forward.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamDim, lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
            The nine buckets are not categories invented today. They are categories that were always there, waiting for someone patient enough to name them.
          </p>
        </div>

        {/* TAGLINE */}
        <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.crimson}, transparent)`, marginBottom: 40 }} />
          <div style={{ fontFamily: font.body, fontSize: 22, fontStyle: 'italic', color: C.cream, lineHeight: 1.5 }}>
            "He didn't organize his notes.
          </div>
          <div style={{ fontFamily: font.body, fontSize: 22, fontStyle: 'italic', color: C.cream, lineHeight: 1.5, marginBottom: 32 }}>
            He audited them."
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.12em' }}>D.K. HALE · THE CONSOLIDATION</div>
        </div>

        {/* FOOTER */}
        <div style={{ paddingTop: 32, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.08em' }}>DDL · CHRONICLE · The Consolidation</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
        </div>

      </div>
    </div>
  );
}
