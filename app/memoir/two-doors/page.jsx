'use client';

import { useState, useEffect, useRef } from 'react';

const C = {
  navy: '#0D1B2A',
  card: '#10202f',
  cardDeep: '#0a1820',
  cream: '#F5F1EB',
  creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)',
  border: 'rgba(245,241,235,0.06)',
  borderMid: 'rgba(245,241,235,0.12)',
  violet: '#8a6cc9',
  violetDim: 'rgba(138,108,201,0.12)',
  amber: '#C49A3C',
  amberDim: 'rgba(196,154,60,0.12)',
  crimson: '#B23531',
  green: '#4A9E6B',
  blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const BEFORE_INSTRUCTIONS = [
  { label: 'Tone', text: 'I would like ChatGPT to take on a mentor/colleague tone.' },
  { label: 'Challenge', text: 'I want to be challenged, but in the same vein, I want fairness.' },
  { label: 'Depth', text: 'I would like this to be a mostly casual conversation, but I want as much depth as possible.' },
  { label: 'Stance', text: 'I would like ChatGPT to remain neutral, or have a balanced approach.' },
  { label: 'Prompting', text: 'Feel free to prompt me with follow up questions as this helps me think about what I\'s doing.' },
  { label: 'Context', text: 'I am an internal auditor that has worked in Management Consulting, Internal Audit, External Audit, and Industry, and I\'m at a bank right now.' },
  { label: 'Diagnosis', text: 'I recently had a mental health diagnosis and I\'d like to share the summary, so you get a third party\'s opinion on me.' },
  { label: 'Conditions', text: 'I am 37 and was recently diagnosed with Bipolar 2, ADHD, Anxiety Disorder, Mild OCD, among other things. I have struggled all my life with these things, but I never knew what was wrong.' },
  { label: 'Response', text: 'I am THRILLED to finally have this diagnosis and at least have answers.' },
  { label: 'Life', text: 'My wife and I celebrated our two year wedding anniversary on 11/13, and we couldn\'t be happier!' },
  { label: 'Mentor', text: 'If you have to take inspiration from anyone, Coach Taylor from Friday Night Lights is a great person to be a mentor.' },
];

const SIGNAL_ANALYSIS = [
  { signal: 'Diagnosis context', weight: 'Dominant', effect: 'Model locks into support mode. Filters everything through clinical lens.', color: C.crimson },
  { signal: 'Coach Taylor reference', weight: 'High', effect: 'Produces emotional encouragement. Halftime speeches. Belief unconditional.', color: C.amber },
  { signal: 'Mentor/colleague tone', weight: 'Overridden', effect: 'Intended to produce a peer. Drowned out by vulnerability context.', color: C.creamDim },
  { signal: 'Challenge + fairness', weight: 'Suppressed', effect: 'Model softens challenge to avoid triggering distress.', color: C.creamDim },
  { signal: 'Audit background', weight: 'Background', effect: 'Noted but not operative. Therapy lens takes precedence.', color: C.creamDim },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function InstructionLine({ label, text, index }) {
  const [hovered, setHovered] = useState(false);
  const isKey = label === 'Diagnosis' || label === 'Conditions' || label === 'Response' || label === 'Mentor';
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: 16, padding: '12px 16px',
        borderLeft: `2px solid ${isKey ? C.violet + (hovered ? 'ff' : '60') : C.border}`,
        background: hovered ? (isKey ? C.violetDim : C.creamGhost) : 'transparent',
        transition: 'all 0.2s',
        marginBottom: 2,
      }}
    >
      <div style={{
        fontFamily: font.mono, fontSize: 9, color: isKey ? C.violet : C.creamDim,
        letterSpacing: '0.1em', textTransform: 'uppercase', minWidth: 80, paddingTop: 2, flexShrink: 0,
      }}>{label}</div>
      <div style={{
        fontFamily: font.body, fontSize: 15, color: isKey ? C.creamHigh : C.creamMid,
        lineHeight: 1.7, fontStyle: isKey ? 'italic' : 'normal',
      }}>{text}</div>
    </div>
  );
}

export default function TwoDoorsChronicle() {
  const [mounted, setMounted] = useState(false);
  const [activeSignal, setActiveSignal] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', background: C.navy,
      fontFamily: font.body,
    }}>
      <div style={{
        maxWidth: 780, margin: '0 auto', padding: '60px 24px 120px',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>

        {/* Breadcrumb */}
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.amber, marginBottom: 48,
        }}>DDL / Memoir / Calibration</div>

        {/* Title block */}
        <FadeIn>
          <div style={{
            fontFamily: font.display, fontSize: 48, fontWeight: 700,
            color: C.cream, lineHeight: 1.1, letterSpacing: '-1px',
            marginBottom: 8,
          }}>Two Doors.</div>
          <div style={{
            fontFamily: font.display, fontSize: 24, fontWeight: 400,
            color: C.violet, marginBottom: 24,
          }}>Same person. Completely different outputs.</div>
          <div style={{ width: 48, height: 2, background: C.violet, marginBottom: 32 }} />
        </FadeIn>

        {/* Lede */}
        <FadeIn delay={0.1}>
          <div style={{
            fontFamily: font.body, fontSize: 18, color: C.creamMid,
            lineHeight: 1.9, maxWidth: 660, marginBottom: 56,
          }}>
            In September 2023, a set of custom instructions was written for ChatGPT shortly after a psychiatric diagnosis. They were honest. They were human. They told the model exactly what was happening and asked for a mentor who felt like Coach Taylor from Friday Night Lights.
            <br /><br />
            The model read them and never looked up.
          </div>
        </FadeIn>

        {/* The Document */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.creamDim, marginBottom: 16,
            }}>The Original Instructions — September 2023</div>
            <div style={{
              background: C.cardDeep, border: `1px solid ${C.borderMid}`,
              borderRadius: 8, overflow: 'hidden',
            }}>
              {BEFORE_INSTRUCTIONS.map((item, i) => (
                <InstructionLine key={i} {...item} index={i} />
              ))}
            </div>
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
              marginTop: 10, fontStyle: 'italic', paddingLeft: 16,
            }}>Highlighted lines are the dominant calibration signals.</div>
          </div>
        </FadeIn>

        {/* What the model heard */}
        <FadeIn delay={0.2}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: '28px 28px', marginBottom: 48,
          }}>
            <div style={{
              fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.violet, marginBottom: 20,
            }}>What The Model Actually Heard</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SIGNAL_ANALYSIS.map((s, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveSignal(i)}
                  onMouseLeave={() => setActiveSignal(null)}
                  style={{
                    display: 'grid', gridTemplateColumns: '140px 90px 1fr',
                    gap: 16, padding: '10px 12px',
                    background: activeSignal === i ? C.creamGhost : 'transparent',
                    borderRadius: 6, transition: 'background 0.15s',
                    cursor: 'default', alignItems: 'start',
                  }}
                >
                  <div style={{ fontFamily: font.mono, fontSize: 11, color: s.color }}>{s.signal}</div>
                  <div style={{
                    fontFamily: font.mono, fontSize: 9, color: s.color,
                    textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 1,
                  }}>{s.weight}</div>
                  <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6 }}>{s.effect}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* The result */}
        <FadeIn delay={0.25}>
          <div style={{ marginBottom: 56 }}>
            <div style={{
              fontFamily: font.body, fontSize: 17, color: C.creamMid,
              lineHeight: 1.9, marginBottom: 24,
            }}>
              For roughly two years, every ChatGPT session ran through that filter. The diagnosis context was always the loudest signal in the room. The model asked how things were going. It offered encouragement. It was careful. It believed in you unconditionally — which is what Coach Taylor does, technically — but it produced a support system when the ask was a sparring partner.
            </div>
            <div style={{
              fontFamily: font.body, fontSize: 17, color: C.creamMid,
              lineHeight: 1.9,
            }}>
              Then the business account got deleted. The custom instructions reverted. And suddenly it was 2022 again inside every thread.
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.3}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56,
          }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.2em' }}>THE DELTA</div>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
        </FadeIn>

        {/* Before / After */}
        <FadeIn delay={0.35}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 16, marginBottom: 56,
          }}>
            {/* Before */}
            <div style={{
              background: C.cardDeep, border: `1px solid ${C.crimson}20`,
              borderRadius: 8, padding: '24px 20px',
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.crimson,
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16,
              }}>Door One — Sept 2023</div>
              {[
                'Recently diagnosed',
                'Struggling all my life',
                'Just want answers',
                'Coach Taylor energy',
                'Follow-up questions',
              ].map((item, i) => (
                <div key={i} style={{
                  fontFamily: font.body, fontSize: 13, color: C.creamMid,
                  padding: '6px 0', borderBottom: `1px solid ${C.border}`,
                  lineHeight: 1.5,
                }}>{item}</div>
              ))}
              <div style={{
                marginTop: 16, fontFamily: font.mono, fontSize: 10,
                color: C.crimson, letterSpacing: '0.05em',
              }}>Output: Support system</div>
            </div>

            {/* After */}
            <div style={{
              background: C.cardDeep, border: `1px solid ${C.violet}20`,
              borderRadius: 8, padding: '24px 20px',
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.violet,
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16,
              }}>Door Two — Now</div>
              {[
                'CPA, audit methodology',
                'Ships artifacts not plans',
                'Direct, no hedging',
                'Council of 10 models',
                'Evening hours: build time',
              ].map((item, i) => (
                <div key={i} style={{
                  fontFamily: font.body, fontSize: 13, color: C.creamMid,
                  padding: '6px 0', borderBottom: `1px solid ${C.border}`,
                  lineHeight: 1.5,
                }}>{item}</div>
              ))}
              <div style={{
                marginTop: 16, fontFamily: font.mono, fontSize: 10,
                color: C.violet, letterSpacing: '0.05em',
              }}>Output: Collaborator</div>
            </div>
          </div>
        </FadeIn>

        {/* The observation */}
        <FadeIn delay={0.4}>
          <div style={{
            borderLeft: `3px solid ${C.violet}`,
            paddingLeft: 24, marginBottom: 56,
          }}>
            <div style={{
              fontFamily: font.body, fontSize: 20, color: C.cream,
              lineHeight: 1.8, fontStyle: 'italic', marginBottom: 12,
            }}>
              "The diagnosis context isn't wrong to have in there. But it was the loudest signal in the room for two years. Everything got filtered through it."
            </div>
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.violet,
              letterSpacing: '0.1em',
            }}>— Thread 28, CognitiveArchitectureAdvisor</div>
          </div>
        </FadeIn>

        {/* Closing */}
        <FadeIn delay={0.45}>
          <div style={{
            fontFamily: font.body, fontSize: 17, color: C.creamMid,
            lineHeight: 1.9, marginBottom: 16,
          }}>
            Both sets of instructions were accurate. The first was written by someone who had just learned what was happening inside their own mind and needed a container for it. The second was written by someone who had built 160 routes, governed a nine-seat AI council, and needed a sparring partner who could keep up.
          </div>
          <div style={{
            fontFamily: font.body, fontSize: 17, color: C.creamMid,
            lineHeight: 1.9, marginBottom: 40,
          }}>
            The model doesn't know the difference. It only knows what you hand it.
          </div>
          <div style={{
            fontFamily: font.body, fontSize: 19, color: C.cream,
            lineHeight: 1.7, fontStyle: 'italic',
          }}>
            Instructions are calibration. The AI reflects what you give it.
          </div>
        </FadeIn>

        {/* Cross-links */}
        <FadeIn delay={0.5}>
          <div style={{
            marginTop: 72, paddingTop: 24,
            borderTop: `1px solid ${C.border}`,
            display: 'flex', flexWrap: 'wrap', gap: 10,
          }}>
            {[
              { href: '/methodology/calibration', label: 'Calibration Methodology', color: C.amber },
              { href: '/analytics/interview', label: 'Interview Engine', color: C.blue },
              { href: '/memoir', label: 'Memoir', color: C.violet },
            ].map((link, i) => (
              <a key={i} href={link.href} style={{
                fontFamily: font.mono, fontSize: 11, color: C.creamDim,
                textDecoration: 'none', padding: '8px 14px',
                border: `1px solid ${C.border}`, borderRadius: 6,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = link.color + '40'; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.creamDim; e.currentTarget.style.borderColor = C.border; }}
              >{link.label}</a>
            ))}
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
