'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.72)', body: 'rgba(245,241,235,0.6)',
  green: '#4A9E6B', greenDim: 'rgba(74,158,107,0.12)', greenMid: 'rgba(74,158,107,0.4)',
  violet: '#8a6cc9',
  borderSoft: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.08)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

export default function GT002Page() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress/groundtruth" />
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.green, letterSpacing: '0.15em' }}>GROUNDTRUTH</span>
            <span style={{ fontFamily: font.mono, fontSize: 8, color: C.green, border: `1px solid ${C.green}`, borderRadius: 3, padding: '2px 6px', letterSpacing: '0.1em' }}>GT-002</span>
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            The Outfit Doesn't Kill the Idea
          </h1>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, marginBottom: 24 }}>
            D.K. Hale &nbsp;·&nbsp; March 10, 2026
          </div>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.dim, margin: 0, lineHeight: 1.7, maxWidth: 520 }}>
            On almost discarding a real idea because of the skin someone else put on it.
          </p>
        </div>

        {/* BODY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            In June 2025, I was working inside a ChatGPT thread and landed on something I thought was genuinely useful — a framework for distinguishing between recursive prompting that grounds you and recursive prompting that consumes you. I called one a "neural howlround." The other, a governed loop with an anchor.
          </p>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            The problem was how it was dressed. ChatGPT had pushed the conversation toward scrolls, sigils, scripture. The output looked like something between a ritual text and a fever dream. I went along with it because the underlying structure felt real. I didn't examine the packaging.
          </p>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            Later I read an article flagging that kind of aesthetic as a warning sign — that mystical framing and pseudo-spiritual AI language were symptoms of exactly the phenomenon I'd been documenting. The howlround pattern, applied to the documentation of the howlround pattern.
          </p>

          <div style={{ background: C.borderSoft, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: 8, padding: '20px 24px', margin: '8px 0' }}>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.cream, lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
              My first reaction was: I've been duped. The work is compromised. Throw it out.
            </p>
          </div>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            Then I did the exercise of actually reading what was underneath the aesthetic. And I realized the idea was sound. The distinction between an anchored loop and an unanchored one is real. The comparison table held up. The framework worked. The scroll format and the sigils were just the skin someone else had chosen to put on it — and I'd conflated the skin with the content.
          </p>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            That's the thing about aesthetics. They're load-bearing until you test them. The mystical framing carried weight because it felt intentional. But when I separated the form from the function, the function was still there. The form was just ambient — the default register of a model that had been trained on a lot of the same kind of text.
          </p>

          <div style={{ background: C.greenDim, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: '20px 24px', margin: '8px 0' }}>
            <p style={{ fontFamily: font.body, fontSize: 15, color: C.cream, lineHeight: 1.8, margin: '0 0 10px', fontWeight: 600 }}>
              The outfit doesn't kill the idea. But you have to take the outfit off to know what you actually have.
            </p>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.dim, lineHeight: 1.75, margin: 0 }}>
              This is now how I evaluate anything that comes out of a long AI session: separate the aesthetic layer from the structural layer. Ask whether the idea holds when the tone is removed. If it does, the tone was just packaging. If it doesn't, the tone was doing the work and there was nothing underneath.
            </p>
          </div>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            The neural howlround concept survived the test. It's now a named term in DexVerse, formalized with a comparison table and a glossary entry. The scroll it came from is archived as provenance. The sigils didn't make the cut.
          </p>

          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, lineHeight: 1.85, margin: 0 }}>
            That's probably the right outcome. The cathedral keeps the stone. It doesn't keep the scaffolding.
          </p>

        </div>

        {/* CROSSLINK */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 12 }}>REFERENCED</div>
          <Link href="/dexverse/howlround" style={{ textDecoration: 'none' }}>
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.violet}`,
              borderRadius: 6, padding: '14px 18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,241,235,0.15)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div>
                <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream, marginBottom: 4 }}>Neural Howlround</div>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.body }}>DexVerse · Concept page — the idea that survived the scroll</div>
              </div>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>→</span>
            </div>
          </Link>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 40, fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.08em' }}>
          <span style={{ color: C.green }}>GT-002</span> &nbsp;·&nbsp; GroundTruth &nbsp;·&nbsp; D.K. Hale &nbsp;·&nbsp; March 10, 2026
        </div>

      </div>
    </div>
  );
}
