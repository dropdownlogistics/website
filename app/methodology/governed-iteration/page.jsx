'use client';

const C = {
  bg: '#0A0A0C',
  card: '#0f1419',
  crimson: '#B23531',
  crimsonDim: 'rgba(178,53,49,0.15)',
  cream: '#E8E6E3',
  creamMid: 'rgba(232,230,227,0.55)',
  creamDim: 'rgba(232,230,227,0.3)',
  creamGhost: 'rgba(232,230,227,0.06)',
  border: 'rgba(232,230,227,0.07)',
  borderMed: 'rgba(232,230,227,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const versions = [
  {
    version: 'v1 → v2',
    trigger: 'Six clinical boundary misfires on non-clinical questions',
    finding: 'The "I don\'t know" fallback didn\'t exist. No honest exit for uncertainty — the model applied the wrong template instead.',
    fix: 'Added the fallback. Defined the exit condition explicitly.',
    result: 'v2 deployed.',
  },
  {
    version: 'v2 → v3',
    trigger: 'Sixty questions across three calibration rounds. Round 2 scored 60% Judgment+.',
    finding: 'Ten specific failure modes identified in scoring data. Governance blocks existed but didn\'t cover enough surface area.',
    fix: 'Ten new governance blocks written — each one targeted at a specific failure mode.',
    result: 'v3 achieved 90% Judgment+. Deployed.',
  },
  {
    version: 'v3 → v4',
    trigger: 'Retrieval pipeline worked. Dex Jr. found the right documents.',
    finding: 'Instead of synthesizing content, defaulted to project management template. Governance blocks controlled exam behavior — not open-ended synthesis.',
    fix: 'Behavioral layer rewritten. Synthesis posture defined explicitly.',
    result: 'v4 deployed.',
  },
];

const domains = [
  'The Modelfile (governance constitution)',
  'The standards registry (STD- documents)',
  'The site architecture (routes, components, nav)',
  'The council methodology (seats, protocols, reviews)',
  'The corpus (ingestion rules, weighting, tiers)',
  "The operator's own processes",
];

export default function GovernedIteration() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* BREADCRUMB */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 40 }}>
          DDL · CODEX · METHODOLOGY
        </div>

        {/* TITLE */}
        <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: C.cream, margin: '0 0 12px', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          Governed Iteration
        </h1>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 48 }}>
          DDL-CODEX-001 · Canon Philosophy
        </div>

        {/* PULL QUOTE */}
        <div style={{ borderLeft: `3px solid ${C.crimson}`, paddingLeft: 24, marginBottom: 56, background: C.crimsonDim, padding: '20px 24px', borderRadius: '0 6px 6px 0' }}>
          <div style={{ fontFamily: font.body, fontSize: 20, fontStyle: 'italic', color: C.cream, lineHeight: 1.6, marginBottom: 12 }}>
            "I want to rewrite it constantly. But only when necessary. Those two things are not opposed."
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.12em' }}>
            D.K. HALE · OPERATOR
          </div>
        </div>

        {/* THESIS */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.85, margin: '0 0 20px' }}>
            Governed Iteration is the principle that systems should always be ready for improvement but should only change when evidence demands it. The desire to improve is constant. The act of changing is governed.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.85, margin: 0 }}>
            This is not conservatism. It is not "if it ain't broke don't fix it." The system is always under review. The operator is always watching for the signal. But the deployment of change requires documented justification — a finding, a misfire, a calibration result, a council review.
          </p>
        </div>

        {/* SECTION HEADER */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
          Evidence from the Modelfile Arc
        </div>

        {/* TIMELINE */}
        <div style={{ position: 'relative', marginBottom: 64 }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: 52, top: 0, bottom: 0, width: 1, background: C.border }} />

          {versions.map((v, i) => (
            <div key={i} style={{ display: 'flex', gap: 0, marginBottom: i < versions.length - 1 ? 48 : 0, position: 'relative' }}>
              {/* version pill */}
              <div style={{ width: 104, flexShrink: 0, paddingTop: 2 }}>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, background: C.crimsonDim, padding: '4px 8px', borderRadius: 4, display: 'inline-block', letterSpacing: '0.04em', position: 'relative', zIndex: 1 }}>
                  {v.version}
                </div>
              </div>

              {/* content */}
              <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 24px' }}>
                {[
                  { label: 'TRIGGER', value: v.trigger },
                  { label: 'FINDING', value: v.finding },
                  { label: 'FIX', value: v.fix },
                  { label: 'RESULT', value: v.result },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: row.label === 'RESULT' ? 0 : 14 }}>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 4 }}>{row.label}</div>
                    <div style={{ fontFamily: font.body, fontSize: 14, color: row.label === 'RESULT' ? C.crimson : C.creamMid, lineHeight: 1.6, fontStyle: row.label === 'RESULT' ? 'italic' : 'normal' }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EACH VERSION HAD */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '24px 28px', marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>EACH VERSION HAD</div>
          {[
            'A documented finding (CR- review or calibration)',
            'A specific failure mode identified',
            'A targeted fix designed for that failure mode',
            'A before/after comparison',
            'Council ratification',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < 4 ? 10 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.crimson, flexShrink: 0, marginTop: 7 }} />
              <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6 }}>{item}</div>
            </div>
          ))}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontFamily: font.body, fontSize: 14, color: C.creamDim, fontStyle: 'italic', lineHeight: 1.7 }}>
            No version changed because someone felt like improving it. Every version changed because the data said it should.
          </div>
        </div>

        {/* THE PRINCIPLE */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
          The Principle
        </div>
        <p style={{ fontFamily: font.body, fontSize: 17, color: C.creamMid, lineHeight: 1.85, marginBottom: 24 }}>
          Constant readiness to change is not the same as constant change. The system is always under review. The bar for deployment is evidence, not impulse.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, letterSpacing: '0.08em', marginBottom: 8 }}>This applies to:</div>
        <div style={{ marginBottom: 56 }}>
          {domains.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, marginTop: 4 }}>→</div>
              <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>

        {/* CANON TERM */}
        <div style={{ background: C.crimsonDim, border: `1px solid rgba(178,53,49,0.25)`, borderRadius: 8, padding: '24px 28px', marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.15em', marginBottom: 12 }}>CANON TERM · DDL GLOSSARY</div>
          <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream, marginBottom: 8 }}>GovernedIteration™</div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>
            Constant readiness to change governed by evidence-based deployment. The desire to improve is the engine. The evidence requirement is the governor. Both run at all times.
          </div>
        </div>

        {/* CLOSING */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.crimson}, transparent)`, marginBottom: 40 }} />
          <div style={{ fontFamily: font.body, fontSize: 20, fontStyle: 'italic', color: C.cream, lineHeight: 1.7, marginBottom: 8 }}>
            The desire to improve is the engine.
          </div>
          <div style={{ fontFamily: font.body, fontSize: 20, fontStyle: 'italic', color: C.cream, lineHeight: 1.7, marginBottom: 32 }}>
            The evidence requirement is the governor.
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.1em' }}>
            Both run at all times.
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ paddingTop: 40, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.08em' }}>DDL · CODEX · Governed Iteration</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
        </div>

      </div>
    </div>
  );
}
