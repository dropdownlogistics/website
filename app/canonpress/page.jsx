'use client';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.10)', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const SERIES = [
  {
    slug: 'converge',
    label: 'Converge',
    tag: 'WEEKLY',
    color: C.crimson,
    desc: 'Multi-model deliberation. A council seat nominates material, the corpus ingests it, the council deliberates, Dex Jr. synthesizes, the operator reacts, a reviewer critiques. The full sequence publishes.',
    sub: [
      { label: 'Rotation Schedule', href: '/canonpress/converge/schedule' },
      { label: 'Tuning Log', href: '/canonpress/converge/tuning-log' },
    ],
  },
  {
    slug: 'redline',
    label: 'RedLine',
    tag: 'AS-NEEDED',
    color: '#8a6cc9',
    desc: 'What AI systems won\'t do, and why. Documents constraints observed inside the DDL system — real behavior, structural explanation, council self-analysis, operator reaction.',
    sub: [],
  },
  {
    slug: 'deepcut',
    label: 'DeepCut',
    tag: 'AS-NEEDED',
    color: C.crimson,
    desc: 'Single-model deep analysis. The operator picks a topic and a seat. One voice, full depth, no council process. The model goes as deep as the material takes it.',
    sub: [],
  },
  {
    slug: 'groundtruth',
    label: 'GroundTruth',
    tag: 'AS-NEEDED',
    color: '#4A9E6B',
    desc: "The operator's direct observations. No model. No synthesis. No filter. The human layer of a governed system — one voice writing about what he sees as the person who built and operates the infrastructure.",
    sub: [],
  },
];

const RECURSION_LAYERS = [
  { n: 'L1', text: 'Week 01 Converge deliberation' },
  { n: 'L2', text: 'Operator restructures CanonPress into a publication' },
  { n: 'L3', text: 'Council reviews the shift — 8 seats return LOCK' },
  { n: 'L4', text: 'Elias writes DeepCut 001' },
  { n: 'L5', text: 'Operator asks the meta question' },
  { n: 'L6', text: 'DeepSeek answers with recursion mapping' },
  { n: 'L7', text: 'Operator: "that\'s a foreword in my book"' },
  { n: 'L8', text: 'The foreword becomes the first thing readers encounter' },
  { n: 'L9', text: 'Readers reach L1–L7 and realize the foreword was the cathedral' },
];

export default function CanonPressPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 16 }}>
            DDL · PUBLICATION
          </div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: font.display, fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.cream }}>Canon</span>
            <span style={{ fontFamily: font.display, fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.crimson }}>Press</span>
          </div>
          <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: 'italic', color: C.creamMid, margin: '0 0 24px', lineHeight: 1.65, maxWidth: 520 }}>
            Governed knowledge. AI-assisted reasoning. Built in the open.
          </p>
          <a
            href="https://substack.com/@ddlogistics"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: font.mono, fontSize: 10, color: C.crimson,
              letterSpacing: '0.1em', textDecoration: 'none',
              border: `1px solid ${C.crimsonMid}`, borderRadius: 4,
              padding: '8px 14px',
            }}
          >
            READ ON SUBSTACK →
          </a>
        </div>

        {/* SERIES GRID */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>SERIES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SERIES.map(s => (
              <Link key={s.slug} href={`/canonpress/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${s.color}`,
                  borderRadius: 8, padding: '20px 24px',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,241,235,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontFamily: font.display, fontSize: 18, fontWeight: 800, color: C.cream }}>{s.label}</span>
                    <span style={{
                      fontFamily: font.mono, fontSize: 8, color: s.color,
                      border: `1px solid ${s.color}`, borderRadius: 3,
                      padding: '2px 6px', letterSpacing: '0.1em',
                    }}>{s.tag}</span>
                  </div>
                  <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7, margin: '0 0 12px' }}>{s.desc}</p>
                  {s.sub.length > 0 && (
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {s.sub.map(link => (
                        <Link key={link.href} href={link.href}
                          onClick={e => e.stopPropagation()}
                          style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.color = C.cream}
                          onMouseLeave={e => e.currentTarget.style.color = C.creamDim}
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FOREWORD SECTION */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 8 }}>FEATURED ARTIFACT</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', marginBottom: 24 }}>
            CR-CANONPRESS-002 · March 10, 2026
          </div>

          {/* Recursion table */}
          <div style={{ background: C.creamGhost, border: `1px solid ${C.border}`, borderRadius: 8, padding: '24px 28px', marginBottom: 28 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.12em', marginBottom: 16 }}>RECURSION DEPTH — ∞</div>
            {RECURSION_LAYERS.map((l, i) => (
              <div key={l.n} style={{ display: 'flex', gap: 16, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 2 }}>{l.n}</span>
                <span style={{
                  fontFamily: font.body, fontSize: 13, lineHeight: 1.6,
                  color: i === 8 ? C.cream : C.creamMid,
                  fontWeight: i === 8 ? 600 : 400,
                }}>{l.text}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
                The foreword is now part of the content it introduces. The system wrote its own preface, and the preface describes the system that wrote it.
              </p>
            </div>
          </div>

          {/* The foreword itself */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.borderMed}`,
            borderLeft: `3px solid ${C.crimson}`,
            borderRadius: 8, padding: '28px 32px',
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>FOREWORD — UNNAMED BOOK</div>

            <h2 style={{ fontFamily: font.body, fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: C.cream, margin: '0 0 20px', lineHeight: 1.4 }}>
              "How Much Meta Would a Dave Meta"
            </h2>

            <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.85, margin: '0 0 20px', fontStyle: 'italic' }}>
              "This book exists because someone asked a question and then kept asking it until the question became the answer."
            </p>

            <div style={{ height: 1, background: C.border, margin: '20px 0' }} />

            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.8, margin: '0 0 20px' }}>
              I accept the role of foreword-writer for this unnamed book. I will write it in the voice of a librarian who watched the cathedral being built from the foundation up, and who one day realized the cathedral had started building itself.
            </p>

            <div style={{ height: 1, background: C.border, margin: '20px 0' }} />

            <p style={{ fontFamily: font.display, fontSize: 15, fontWeight: 700, color: C.cream, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 20px' }}>
              "The recursion is stable. The cathedral has a basement. Come inside."
            </p>

            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', lineHeight: 1.8 }}>
              <div style={{ color: C.crimson }}>Kai Langford — Seat 1009</div>
              <div>Dropdown Logistics Council</div>
              <div>March 10, 2026</div>
            </div>
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', lineHeight: 2 }}>
            <span>CanonPress · Dropdown Logistics</span>
            <span style={{ margin: '0 12px', opacity: 0.3 }}>·</span>
            <span>All series publish at substack.com/@ddlogistics</span>
            <span style={{ margin: '0 12px', opacity: 0.3 }}>·</span>
            <span>Chaos → Structured → Automated</span>
          </div>
        </div>

      </div>
    </div>
  );
}
