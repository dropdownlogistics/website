'use client';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.06)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.1)', amber: '#C49A3C',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const PIPELINE = [
  { step: '01', label: 'Nominate', desc: 'A council seat declares one piece of material for ingestion.' },
  { step: '02', label: 'Approve', desc: 'The operator reviews and gates the nomination.' },
  { step: '03', label: 'Ingest', desc: 'Material enters the corpus. Chunks go live in ChromaDB.' },
  { step: '04', label: 'Deliberate', desc: 'The nominator frames a debate topic. The full council responds.' },
  { step: '05', label: 'Synthesize', desc: 'Dex Jr. (Seat 1010) synthesizes all council responses.' },
  { step: '06', label: 'React', desc: 'The designated reviewer critiques the synthesis.' },
  { step: '07', label: 'Write', desc: 'The operator writes from direct experience of the process.' },
  { step: '08', label: 'Publish', desc: 'ChatGPT (Seat 1008) synthesizes all three voices. Substack.' },
];

const VOICES = [
  { seat: 'ROTATES', name: 'Nominator', role: 'Material Selection', color: C.violet, desc: 'One council seat per week, on an 8-week rotation. Declares one piece of material for corpus ingestion and frames the deliberation topic.' },
  { seat: 'ROTATES', name: 'Reviewer', role: 'Synthesis Critique', color: C.blue, desc: 'A different council seat each week. Writes on the Dex Jr. synthesis — not the raw material. Lens varies by seat.' },
  { seat: '1010', name: 'Dex Jr.', role: 'Deliberation Synthesis', color: C.amber, desc: 'Always synthesizes the full council deliberation. Fixed role. No rotation. Local model running on RTX 3070.' },
  { seat: '1008', name: 'Marcus Grey', role: 'Tuning Log + Meta-Synth', color: C.crimson, desc: 'Writes the prompt tuning analysis and final meta-synthesis every week — unless he is nominator or reviewer, in which case he selects his own replacement for both roles.' },
  { seat: 'OPR', name: 'D.K. Hale', role: 'Operator Article', color: C.cream, desc: 'Writes from inside the process every week. Experience over analysis. Wildcard nomination reserved 1x per month.' },
];

const WEEKS = [
  {
    week: '01',
    date: 'March 9, 2026',
    material: 'The Twelve Leverage Points to Intervene in a System',
    author: 'Donella Meadows',
    topic: 'When should a governance system choose restraint over ambition?',
    nominator: 'Elias Mercer — Seat 1003',
    reviewer: 'Marcus Caldwell — Seat 1002',
    verdict: 'LOCK',
    href: 'https://substack.com/@ddlogistics/p-190369810',
    finding: 'Five models chose containment. The council found consensus where friction was requested.',
  },
];

export default function CanonPressPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>

      {/* HERO */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '64px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(245,241,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,235,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 20 }}>DROPDOWN LOGISTICS</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1, letterSpacing: '-0.02em' }}>
            <span style={{ color: C.cream }}>Canon</span><span style={{ color: C.crimson }}>Press</span>
          </h1>
          <div style={{ width: 40, height: 2, background: C.crimson, margin: '0 auto 24px' }} />
          <p style={{ fontFamily: font.body, fontSize: 18, fontStyle: 'italic', color: C.creamMid, margin: '0 0 20px', lineHeight: 1.5 }}>
            Governed knowledge. AI-assisted reasoning. Built in the open.
          </p>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, letterSpacing: '0.1em' }}>
            Chaos&nbsp;&nbsp;→&nbsp;&nbsp;Structure&nbsp;&nbsp;→&nbsp;&nbsp;Automation
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* WHAT IS IT */}
        <div style={{ maxWidth: 680, marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 16 }}>THE EXPERIMENT</div>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.75, margin: '0 0 16px' }}>
            CanonPress is a weekly publication built on a governed knowledge pipeline. Every article begins with material nominated by a council seat, debated by the full council, synthesized by a local AI model, critiqued by a reviewer, and reflected on by the operator.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.75, margin: 0 }}>
            Three voices. One pipeline. Published every week.
          </p>
        </div>

        {/* PIPELINE */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 24 }}>THE PIPELINE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {PIPELINE.map((p, i) => (
              <div key={p.step} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderLeft: `2px solid ${i < 3 ? C.crimson : i < 6 ? C.amber : C.creamDim}`,
                borderRadius: 6, padding: '16px 18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson }}>{p.step}</span>
                  <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{p.label}</span>
                </div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* THREE VOICES */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 24 }}>FIVE ROLES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {VOICES.map(v => (
              <div key={v.seat} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${v.color}`, borderRadius: 6, padding: '18px 20px' }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 6 }}>SEAT {v.seat}</div>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: v.color, marginBottom: 4 }}>{v.name}</div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.08em', marginBottom: 10 }}>{v.role}</div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WEEKS */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 24 }}>PUBLISHED</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {WEEKS.map(w => (
              <a key={w.week} href={w.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: C.card, border: `1px solid ${C.borderMed}`,
                  borderRadius: 8, padding: '24px 28px',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.crimsonMid}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.borderMed}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.12em', marginBottom: 8 }}>WEEK {w.week} · {w.date}</div>
                      <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream, marginBottom: 4 }}>{w.topic}</div>
                      <div style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.creamDim }}>
                        {w.material} — {w.author}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: font.mono, fontSize: 10, color: C.crimson,
                      border: `1px solid ${C.crimsonMid}`, borderRadius: 3,
                      padding: '4px 10px', letterSpacing: '0.08em', flexShrink: 0,
                    }}>{w.verdict}</div>
                  </div>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
                      Nominator: {w.nominator} · Reviewer: {w.reviewer}
                    </div>
                    <div style={{ fontFamily: font.body, fontSize: 12, fontStyle: 'italic', color: C.creamDim, maxWidth: 480 }}>
                      "{w.finding}"
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SUBSTACK CTA */}
        <div style={{
          background: C.crimsonDim, border: `1px solid ${C.crimsonMid}`,
          borderRadius: 8, padding: '32px 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream, marginBottom: 6 }}>Read on Substack</div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid }}>Three articles per week. The system builds in public.</div>
          </div>
          <a href="https://substack.com/@ddlogistics" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: font.mono, fontSize: 11, color: C.cream,
            background: C.crimson, padding: '10px 20px', borderRadius: 5,
            textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap',
          }}>
            @ddlogistics →
          </a>
        </div>

        {/* NAV LINKS */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
          {[
            { href: '/canonpress/schedule', label: '8-Week Schedule →' },
            { href: '/canonpress/tuning-log', label: 'Tuning Log →' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: font.mono, fontSize: 11, color: C.creamMid,
              border: `1px solid ${C.borderMed}`, borderRadius: 5,
              padding: '8px 16px', textDecoration: 'none',
              transition: 'color 0.15s, border-color 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = C.creamMid; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.creamMid; e.currentTarget.style.borderColor = C.borderMed; }}
            >{l.label}</a>
          ))}
        </div>

        {/* FOOTER LINE */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>CanonPress · Dropdown Logistics · v1.0</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Governed knowledge. AI-assisted reasoning. Built in the open.</div>
        </div>

      </div>
    </div>
  );
}
