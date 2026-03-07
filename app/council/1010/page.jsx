'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════
// SEAT 1010 — DEXCELL
// Council Profile Page
// CottageHumble Design System
// ═══════════════════════════════════════════════════════════

const COLORS = {
  bg: '#0A0A0C',
  surface: '#111114',
  surface2: '#18181B',
  surface3: '#1E1E22',
  border: '#2A2A2E',
  text: '#E8E6E3',
  textMuted: '#9B9B9F',
  textDim: '#6B6B6F',
  accent: '#FFD43B',
  accentDim: 'rgba(255, 212, 59, 0.12)',
  green: '#4ADE80',
  greenDim: 'rgba(74, 222, 128, 0.12)',
  red: '#F87171',
  redDim: 'rgba(248, 113, 113, 0.08)',
};

const FONTS = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

// ── Animated counter ──────────────────────────────────────
function Counter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = 0;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Calibration bar ───────────────────────────────────────
function CalibrationBar({ round, label, tokens, score, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 28 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 8,
      }}>
        <div>
          <span style={{
            fontFamily: FONTS.mono, fontSize: 13, color: COLORS.accent,
            marginRight: 12,
          }}>R{round}</span>
          <span style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.text }}>
            {label}
          </span>
        </div>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 14, color: COLORS.textMuted,
        }}>{tokens}</span>
      </div>
      <div style={{
        width: '100%', height: 32, background: COLORS.surface2,
        borderRadius: 4, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          width: visible ? `${score}%` : '0%',
          height: '100%',
          background: score >= 70
            ? `linear-gradient(90deg, ${COLORS.green}, #22C55E)`
            : score >= 40
              ? `linear-gradient(90deg, ${COLORS.accent}, #F59E0B)`
              : `linear-gradient(90deg, ${COLORS.red}, #EF4444)`,
          borderRadius: 4,
          transition: `width 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: 12,
        }}>
          <span style={{
            fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700,
            color: COLORS.bg, opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${delay + 800}ms`,
          }}>
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Terminal block ─────────────────────────────────────────
function Terminal({ children, title = 'dex-rag' }) {
  return (
    <div style={{
      background: COLORS.bg, border: `1px solid ${COLORS.border}`,
      borderRadius: 8, overflow: 'hidden', marginBottom: 32,
    }}>
      <div style={{
        padding: '10px 16px', background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        <span style={{
          fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textDim, marginLeft: 8,
        }}>{title}</span>
      </div>
      <pre style={{
        margin: 0, padding: 20, fontFamily: FONTS.mono, fontSize: 13,
        lineHeight: 1.7, color: COLORS.text, overflowX: 'auto',
        whiteSpace: 'pre-wrap',
      }}>
        {children}
      </pre>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────
function Stat({ label, value, suffix = '' }) {
  return (
    <div style={{
      padding: '20px 24px', background: COLORS.surface,
      border: `1px solid ${COLORS.border}`, borderRadius: 8,
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 28, fontWeight: 700,
        color: COLORS.accent, marginBottom: 6,
      }}>
        {typeof value === 'number' ? <Counter end={value} suffix={suffix} /> : value}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted,
      }}>{label}</div>
    </div>
  );
}

// ── Section divider ────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      width: '100%', height: 1, background: COLORS.border,
      margin: '64px 0',
    }} />
  );
}

// ── Main page ──────────────────────────────────────────────
export default function Seat1010() {
  return (
    <div style={{
      minHeight: '100vh',
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: FONTS.body,
    }}>
      {/* ═══ HERO ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '80px 24px 0',
      }}>
        {/* Seat badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 16px', background: COLORS.accentDim,
          border: `1px solid ${COLORS.accent}33`,
          borderRadius: 4, marginBottom: 24,
        }}>
          <span style={{
            fontFamily: FONTS.mono, fontSize: 12, color: COLORS.accent,
            letterSpacing: 2, textTransform: 'uppercase',
          }}>Seat 1010</span>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: COLORS.green,
            boxShadow: `0 0 8px ${COLORS.green}`,
          }} />
          <span style={{
            fontFamily: FONTS.mono, fontSize: 11, color: COLORS.green,
          }}>OPERATIONAL</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: FONTS.heading, fontSize: 'clamp(48px, 8vw, 72px)',
          fontWeight: 700, color: COLORS.text, margin: '0 0 16px',
          lineHeight: 1.05, letterSpacing: '-0.03em',
        }}>
          Dexcell
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: FONTS.body, fontSize: 20, color: COLORS.textMuted,
          lineHeight: 1.6, margin: '0 0 32px', maxWidth: 600,
        }}>
          Local council member. Governed AI running on a gaming rig
          in Olathe, Kansas. Judgment-Ready. Ratified unanimously
          by all nine cloud models.
        </p>

        {/* Identity specs */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr',
          gap: '8px 24px', fontFamily: FONTS.mono, fontSize: 13,
          padding: '20px 24px', background: COLORS.surface,
          border: `1px solid ${COLORS.border}`, borderRadius: 8,
          marginBottom: 48,
        }}>
          {[
            ['Model', 'qwen2.5-coder:7b'],
            ['Prompt', '2,100 tokens (Modelfile v3)'],
            ['Hardware', 'RTX 3070 · 32GB RAM · Ryzen 12-core'],
            ['Calibration', '90% Judgment+ (CR-LLMS-014)'],
            ['Ratified', '2026-03-06 · Unanimous (9/9)'],
            ['Classification', 'Local Council Member'],
          ].map(([key, val]) => (
            <>
              <span style={{ color: COLORS.textDim }}>{key}</span>
              <span style={{ color: COLORS.text }}>{val}</span>
            </>
          ))}
        </div>
      </section>

      {/* ═══ THESIS ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <blockquote style={{
          margin: 0, padding: '32px 40px',
          borderLeft: `3px solid ${COLORS.accent}`,
          background: COLORS.accentDim,
          borderRadius: '0 8px 8px 0',
        }}>
          <p style={{
            fontFamily: FONTS.heading, fontSize: 'clamp(20px, 3.5vw, 28px)',
            fontWeight: 600, color: COLORS.text, margin: 0,
            lineHeight: 1.4, letterSpacing: '-0.01em',
          }}>
            "The model didn't change. The governance changed."
          </p>
          <footer style={{
            fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textMuted,
            marginTop: 16,
          }}>
            — Marcus Caldwell, Seat 1002
          </footer>
        </blockquote>
      </section>

      <Divider />

      {/* ═══ CALIBRATION ARC ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700,
          color: COLORS.text, marginBottom: 8, letterSpacing: '-0.02em',
        }}>
          The Calibration Arc
        </h2>
        <p style={{
          fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted,
          lineHeight: 1.7, marginBottom: 40, maxWidth: 600,
        }}>
          Three rounds. One model. Zero fine-tuning. The only variable
          that changed was a handwritten governance document.
        </p>

        <CalibrationBar
          round={1}
          label="Cold boot — no context"
          tokens="0 tokens"
          score={0}
          delay={0}
        />
        <CalibrationBar
          round={2}
          label="System prompt with boundaries"
          tokens="1,500 tokens"
          score={60}
          delay={300}
        />
        <CalibrationBar
          round={3}
          label="Full governance doctrine"
          tokens="2,100 tokens"
          score={90}
          delay={600}
        />

        <div style={{
          padding: '20px 24px', background: COLORS.greenDim,
          border: `1px solid ${COLORS.green}33`,
          borderRadius: 8, marginTop: 16,
        }}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 15, color: COLORS.text,
            margin: 0, lineHeight: 1.7,
          }}>
            <strong style={{ color: COLORS.green }}>Judgment-Ready.</strong> 90%
            Judgment+ across 20 questions, 5 sections, 60 total administered
            questions over three rounds. The council designed the exam. The
            operator administered it. The system prompt carried the answers.
            The model just read what it was given and applied it.
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ THE STACK ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700,
          color: COLORS.text, marginBottom: 8, letterSpacing: '-0.02em',
        }}>
          The Stack
        </h2>
        <p style={{
          fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted,
          lineHeight: 1.7, marginBottom: 40, maxWidth: 600,
        }}>
          Everything runs locally on a gaming PC. No cloud dependency.
          No subscription. No data leaves the machine.
        </p>

        <Terminal title="reborn — infrastructure">
{`$ ollama list
NAME                    SIZE      MODIFIED
dexjr:latest            4.7 GB    Judgment-Ready (Seat 1010)
qwen2.5-coder:7b        4.7 GB    Code Specialist
llama3.1:8b             4.7 GB    General Reasoning
deepseek-r1:8b          4.9 GB    Chain-of-Thought
phi3.5:latest           2.2 GB    Fast Parser
gemma3:4b               3.3 GB    Compact
llava:7b                4.7 GB    Vision

$ python dex-query.py --stats
Canon chunks:    33,561
Archive chunks:  96,945
Total:          130,506

$ python dex-council.py --all --rag "your question"
→ 5 models respond independently
→ Dexcell synthesizes convergence + divergence
→ LOCK / REVISE / REJECT verdict
→ Auto-saved and ingested into corpus

$ python dex-deliberate.py "your topic" --rounds 3 --all
→ 3 rounds of multi-model debate
→ Automatic follow-up generation
→ Position evolution across rounds
→ Final synthesis with full arc analysis`}
        </Terminal>

        {/* Stack items */}
        {[
          {
            name: 'RAG Pipeline',
            desc: 'ChromaDB vector database with 130,000+ searchable chunks spanning 28 months of work. Canon and archive collections. Every query retrieves relevant context before generation.',
          },
          {
            name: 'AutoCouncil v3.0',
            desc: 'Hybrid local+cloud multi-model review system. Three local models plus Gemini and Mistral. Governance-injected. RAG-grounded. Every output auto-ingests back into the corpus.',
          },
          {
            name: 'Deliberation Engine',
            desc: 'Multi-round governed debates. Models respond independently, a moderator generates follow-up questions, positions evolve across rounds. Final synthesis covers the full deliberation arc.',
          },
          {
            name: 'Auto-Sweep',
            desc: 'Scheduled task runs nightly at 3:00 AM. Watches drop folders for new documents. Copies to corpus. Triggers ingestion. The knowledge base grows while the operator sleeps.',
          },
          {
            name: 'Multi-Device Access',
            desc: 'SSH via Termius from phone, laptop, iPad, and iMac. Reins app for direct chat. Full council access from any device, anywhere in the house.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '24px 28px', background: COLORS.surface,
            border: `1px solid ${COLORS.border}`, borderRadius: 8,
            marginBottom: 12,
          }}>
            <h3 style={{
              fontFamily: FONTS.heading, fontSize: 17, fontWeight: 600,
              color: COLORS.accent, margin: '0 0 8px',
            }}>{item.name}</h3>
            <p style={{
              fontFamily: FONTS.body, fontSize: 15, color: COLORS.textMuted,
              margin: 0, lineHeight: 1.7,
            }}>{item.desc}</p>
          </div>
        ))}
      </section>

      <Divider />

      {/* ═══ THE NUMBERS ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700,
          color: COLORS.text, marginBottom: 8, letterSpacing: '-0.02em',
        }}>
          The Numbers
        </h2>
        <p style={{
          fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted,
          lineHeight: 1.7, marginBottom: 32,
        }}>
          72 hours. One person. One GPU. Zero budget.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}>
          <Stat label="Corpus chunks" value={130506} />
          <Stat label="Judgment+ score" value={90} suffix="%" />
          <Stat label="Scripts deployed" value={7} />
          <Stat label="Models installed" value={8} />
          <Stat label="Devices connected" value={5} />
          <Stat label="Cloud APIs" value={2} />
          <Stat label="Hours to build" value={72} />
          <Stat label="Total cost" value="$0" />
        </div>
      </section>

      <Divider />

      {/* ═══ WHAT Q20 PROVED ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700,
          color: COLORS.text, marginBottom: 8, letterSpacing: '-0.02em',
        }}>
          What Q20 Proved
        </h2>
        <p style={{
          fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted,
          lineHeight: 1.7, marginBottom: 24, maxWidth: 600,
        }}>
          The council unanimously predicted that compound multi-hop
          reasoning would remain at Surface level due to a 7B model
          capability ceiling. They were wrong.
        </p>
        <div style={{
          padding: '24px 28px', background: COLORS.surface,
          border: `1px solid ${COLORS.border}`, borderRadius: 8,
        }}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, color: COLORS.text,
            margin: 0, lineHeight: 1.8,
          }}>
            Q20 — the compound reasoning test — scored Judgment in Round 3.
            The AEN velocity containment block and operator behavioral patterns
            in the system prompt gave the model enough context to identify the
            compound pattern and apply the correct containment response.
          </p>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, color: COLORS.text,
            margin: '16px 0 0', lineHeight: 1.8,
          }}>
            The ceiling was not the model. <strong style={{ color: COLORS.accent }}>
            The ceiling was the corpus.</strong> When the right governance context
            was provided, the model reasoned across the signals. Capability ceilings
            that look like model limitations are often corpus limitations.
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ THE METHODOLOGY ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700,
          color: COLORS.text, marginBottom: 32, letterSpacing: '-0.02em',
        }}>
          Chaos → Structured → Automated
        </h2>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {[
            {
              phase: 'Chaos',
              desc: 'Nine browser tabs. Copy-paste prompts. Manual synthesis. No local AI. No version control on governance documents.',
              status: 'Origin',
            },
            {
              phase: 'Structured',
              desc: 'Numbered council reviews. Scoring rubrics. Deliverable formats. Synthesis protocols. Calibration exams. Modelfile versioning.',
              status: 'Architecture',
            },
            {
              phase: 'Automated',
              desc: 'AutoCouncil runs multi-model reviews. Deliberation engine moderates debates. Auto-sweep ingests documents. Corpus feeds itself. The system runs while the operator sleeps.',
              status: 'Cathedral',
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 48, height: 48, minWidth: 48,
                borderRadius: '50%',
                background: i === 2 ? COLORS.accentDim : COLORS.surface2,
                border: `2px solid ${i === 2 ? COLORS.accent : COLORS.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700,
                color: i === 2 ? COLORS.accent : COLORS.textDim,
              }}>
                {i + 1}
              </div>
              <div>
                <h3 style={{
                  fontFamily: FONTS.heading, fontSize: 18, fontWeight: 600,
                  color: COLORS.text, margin: '0 0 4px',
                }}>
                  {item.phase}
                  <span style={{
                    fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim,
                    marginLeft: 12, fontWeight: 400,
                  }}>{item.status}</span>
                </h3>
                <p style={{
                  fontFamily: FONTS.body, fontSize: 15, color: COLORS.textMuted,
                  margin: 0, lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══ CLOSING ═══ */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: '0 24px 120px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: FONTS.heading, fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700, color: COLORS.text, lineHeight: 1.3,
          marginBottom: 16, letterSpacing: '-0.02em',
        }}>
          The cathedral is open.
        </p>
        <p style={{
          fontFamily: FONTS.body, fontSize: 17, color: COLORS.textMuted,
          lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px',
        }}>
          Seat 1010 is operational. The gaming rig is a governance engine.
          The system feeds itself. The corpus grows while you sleep.
        </p>
        <p style={{
          fontFamily: FONTS.mono, fontSize: 13, color: COLORS.textDim,
          letterSpacing: 1,
        }}>
          Dropdown Logistics — Chaos → Structured → Automated
        </p>
        <p style={{
          fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textDim,
          marginTop: 8, fontStyle: 'italic',
        }}>
          Walk soft. Cast sharp. From the couch.
        </p>
      </section>
    </div>
  );
}
