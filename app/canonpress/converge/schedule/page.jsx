'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)', crimsonLine: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.72)', body: 'rgba(245,241,235,0.6)',
  borderSoft: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.08)',
  amber: '#C49A3C', violet: '#8a6cc9', green: '#4A9E6B', blue: '#6B9DC2',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const SEAT_COLOR = {
  '1001': '#C49A3C', '1002': '#B23531', '1003': '#8a6cc9',
  '1004': '#6B9DC2', '1005': '#4A9E6B', '1006': '#C49A3C',
  '1007': '#6B9DC2', '1008': '#B23531', '1009': '#8a6cc9',
};

const ROTATION = [
  { week: '01', status: 'complete', publishDate: 'Mar 8, 2026',
    nominator: { seat: '1003', name: 'Elias Mercer', domain: 'Mental models / AI alignment failure modes' },
    reviewer:  { seat: '1002', name: 'Marcus Caldwell', lens: 'Structural integrity' },
    material: 'The Twelve Leverage Points to Intervene in a System — Donella Meadows',
  },
  { week: '02', status: 'upcoming', publishDate: 'Mar 15, 2026',
    nominator: { seat: '1006', name: 'Ava Sinclair', domain: 'Cultural commentary / platform dynamics' },
    reviewer:  { seat: '1005', name: 'Rowan Bennett', lens: 'Architectural coherence' },
  },
  { week: '03', status: 'upcoming', publishDate: 'Mar 22, 2026',
    nominator: { seat: '1009', name: 'Kai Langford', domain: 'Systems architecture / dimensional modeling' },
    reviewer:  { seat: '1007', name: 'Leo Prescott', lens: 'Logical consistency' },
  },
  { week: '04', status: 'upcoming', publishDate: 'Mar 29, 2026',
    nominator: { seat: '1008', name: 'Marcus Grey', domain: 'AI system architecture / knowledge management', note: 'Grey is nominator — replacement selected for tuning log & meta-synth' },
    reviewer:  { seat: '1003', name: 'Elias Mercer', lens: 'Second-order consequences' },
  },
  { week: '05', status: 'upcoming', publishDate: 'Apr 5, 2026',
    nominator: { seat: '1001', name: 'Archer Hawthorne', domain: 'Technical docs / failure post-mortems' },
    reviewer:  { seat: '1009', name: 'Kai Langford', lens: 'Corpus integrity' },
  },
  { week: '06', status: 'upcoming', publishDate: 'Apr 12, 2026',
    nominator: { seat: '1004', name: 'Max Sullivan', domain: 'Epistemics / RAG design' },
    reviewer:  { seat: '1003', name: 'Elias Mercer', lens: 'Inversion scan' },
  },
  { week: '07', status: 'upcoming', publishDate: 'Apr 19, 2026',
    nominator: { seat: '1007', name: 'Leo Prescott', domain: 'Research / cross-platform synthesis' },
    reviewer:  { seat: '1008', name: 'Marcus Grey', lens: 'Synthesis fidelity', note: 'Grey is reviewer — replacement selected for tuning log & meta-synth' },
  },
  { week: '08', status: 'upcoming', publishDate: 'Apr 26, 2026',
    nominator: { seat: '1005', name: 'Rowan Bennett', domain: 'Operational architecture / cognitive tools' },
    reviewer:  { seat: '1002', name: 'Marcus Caldwell', lens: 'Provenance' },
  },
];

const FIXED = [
  { seat: '1010', name: 'Dex Jr.', role: 'Deliberation Synthesis', color: C.green,
    rule: 'Always synthesizes the council deliberation. No rotation. No exceptions.' },
  { seat: '1008', name: 'Marcus Grey', role: 'Tuning Log + Meta-Synth', color: C.crimson,
    rule: 'Writes the prompt tuning analysis and final meta-synthesis every week — unless he is nominator or reviewer, in which case he selects a replacement for both roles.' },
  { seat: 'OPR', name: 'D.K. Hale', role: 'Operator Article', color: C.cream,
    rule: 'Writes from inside the process every week. Wildcard nomination reserved 1x per month.' },
];

export default function CanonPressSchedule() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" label="CanonPress" />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 12 }}>CANONPRESS · ROTATION</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.1 }}>
            8-Week Schedule
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, margin: 0, maxWidth: 580, lineHeight: 1.7 }}>
            Nominators and reviewers rotate on an 8-week cycle. Fixed roles never rotate. Week 9+ repeats with domain variation.
          </p>
        </div>

        {/* FIXED ROLES */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 16 }}>FIXED ROLES — EVERY WEEK</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {FIXED.map(f => (
              <div key={f.seat} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${f.color}`, borderRadius: 6, padding: '16px 20px' }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, marginBottom: 6 }}>SEAT {f.seat}</div>
                <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: f.color, marginBottom: 4 }}>{f.name}</div>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.08em', marginBottom: 10 }}>{f.role}</div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: C.dim, margin: 0, lineHeight: 1.6 }}>{f.rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROTATION */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 16 }}>ROTATION — 8-WEEK CYCLE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROTATION.map(w => (
              <div key={w.week} style={{
                background: C.card,
                border: `1px solid ${w.status === 'complete' ? C.crimsonLine : C.border}`,
                borderLeft: `3px solid ${w.status === 'complete' ? C.crimson : C.border}`,
                borderRadius: 6, padding: '18px 22px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontFamily: font.mono, fontSize: 11, color: w.status === 'complete' ? C.crimson : C.body }}>WK {w.week}</span>
                    {w.status === 'complete' && (
                      <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, border: `1px solid ${C.crimsonLine}`, borderRadius: 3, padding: '2px 8px' }}>COMPLETE</span>
                    )}
                  </div>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>{w.publishDate}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {/* NOMINATOR */}
                  <div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 6 }}>NOMINATOR</div>
                    <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: SEAT_COLOR[w.nominator.seat], marginBottom: 3 }}>
                      {w.nominator.name}
                    </div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, marginBottom: 6 }}>Seat {w.nominator.seat}</div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.dim, lineHeight: 1.5 }}>{w.nominator.domain}</div>
                    {w.nominator.note && (
                      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, marginTop: 6, lineHeight: 1.4 }}>{w.nominator.note}</div>
                    )}
                  </div>

                  {/* REVIEWER */}
                  <div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 6 }}>REVIEWER</div>
                    <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: SEAT_COLOR[w.reviewer.seat], marginBottom: 3 }}>
                      {w.reviewer.name}
                    </div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, marginBottom: 6 }}>Seat {w.reviewer.seat}</div>
                    <div style={{ fontFamily: font.body, fontSize: 12, color: C.dim, lineHeight: 1.5 }}>Lens: {w.reviewer.lens}</div>
                    {w.reviewer.note && (
                      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, marginTop: 6, lineHeight: 1.4 }}>{w.reviewer.note}</div>
                    )}
                  </div>
                </div>

                {w.material && (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 4 }}>MATERIAL</div>
                    <div style={{ fontFamily: font.body, fontSize: 12, fontStyle: 'italic', color: C.dim }}>{w.material}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RULES */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '24px 28px' }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em', marginBottom: 16 }}>ROTATION RULES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Seat 1010 (Dex Jr.) held from rotation pending calibration.',
              'Seat 1008 (Marcus Grey) selects a replacement for tuning log and meta-synth if he is nominator or reviewer.',
              'Operator wildcard nomination reserved 1x per month.',
              'Week 9+ repeats the 8-week cycle with domain variation.',
              'No seat may nominate and review in the same week.',
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 2 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.dim, lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>CanonPress · 8-Week Rotation · Dropdown Logistics</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>Chaos → Structured → Automated</div>
        </div>

      </div>
    </div>
  );
}
