'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', navyDeep: '#070F1C', card: '#10202f',
  cream: '#F5F1EB', creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)', border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531', amber: '#C49A3C', violet: '#8a6cc9',
  green: '#4A9E6B', blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!started) return;
    const steps = 60; const inc = end / steps; let cur = 0;
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= end) { setCount(end); clearInterval(iv); } else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(iv);
  }, [started, end, duration]);
  return <>{count}{suffix}</>;
}

function GovCard({ color, icon, title, stat, desc, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: hovered ? color + '08' : C.card,
        border: `1px solid ${hovered ? color + '30' : C.border}`,
        borderRadius: 8, padding: '24px 20px',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.cream }}>{title}</span>
      </div>
      <div style={{
        fontFamily: font.display, fontSize: 28, fontWeight: 700,
        color: color, marginBottom: 8,
      }}>
        {typeof stat === 'number' ? <Counter end={stat} /> : stat}
      </div>
      <div style={{
        fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.6,
      }}>{desc}</div>
    </Link>
  );
}

function CouncilSeat({ seat, name, persona, color }) {
  return (
    <Link href={seat === '1010' ? '/council/1010' : `/council/profiles/${name.toLowerCase()}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 6,
        border: `1px solid ${C.border}`,
        textDecoration: 'none', transition: 'all 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.amber + '40'}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
    >
      <div style={{
        fontFamily: font.mono, fontSize: 11, color: C.amber,
        minWidth: 36,
      }}>{seat}</div>
      <div>
        <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 500, color: C.cream }}>{persona}</div>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{name}</div>
      </div>
    </Link>
  );
}

export default function BackEnd() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto', padding: '60px 24px 100px',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: 'all 0.6s ease',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.amber, marginBottom: 12,
        }}>
          The Back Door
        </div>
        <div style={{
          fontFamily: font.display, fontSize: 32, fontWeight: 700,
          color: C.cream, marginBottom: 12, letterSpacing: '-0.5px',
        }}>
          How the Cathedral is Built
        </div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 640,
        }}>
          Everything on this site is governed. Every page has a type. Every
          type has a template. Every template follows a standard. Every
          standard is reviewed by nine AI models. This is what that
          architecture looks like.
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12, marginBottom: 48,
      }}>
        <GovCard color={C.crimson} icon="&#x1F4CB;" title="Standards" stat={65}
          desc="Codified rules governing operations, architecture, and output quality."
          href="/standards" />
        <GovCard color={C.amber} icon="&#x2699;" title="Systems" stat={44}
          desc="Registered systems built and maintained under DDL methodology."
          href="/systems" />
        <GovCard color={C.violet} icon="&#x1F4D1;" title="Content Types" stat={20}
          desc="Document types across 7 categories with governed templates."
          href="/registry" />
        <GovCard color={C.green} icon="&#x1F50D;" title="RAG Chunks" stat={320934}
          desc="Searchable knowledge chunks in Dex Jr.'s local vector database."
          href="/council/1010" />
      </div>

      {/* The Council */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>The Council</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 20, maxWidth: 560,
        }}>
          Nine cloud models plus one local model independently review
          every major artifact. No model sees another's response.
          The operator decides. The models advise.
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 8,
        }}>
          <CouncilSeat seat="1001" name="lechat" persona="Archer Hawthorne" />
          <CouncilSeat seat="1002" name="claude" persona="Marcus Caldwell" />
          <CouncilSeat seat="1003" name="grok" persona="Elias Mercer" />
          <CouncilSeat seat="1004" name="perplexity" persona="Max Sullivan" />
          <CouncilSeat seat="1005" name="copilot" persona="Rowan Bennett" />
          <CouncilSeat seat="1006" name="meta-ai" persona="Ava Sinclair" />
          <CouncilSeat seat="1007" name="gemini" persona="Leo Prescott" />
          <CouncilSeat seat="1008" name="chatgpt" persona="Marcus Grey" />
          <CouncilSeat seat="1009" name="deepseek" persona="Kai Langford" />
          <CouncilSeat seat="1010" name="dex-jr" persona="Dexcell (Local)" />
        </div>
      </div>

      {/* The Methodology */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>The Methodology</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 24, maxWidth: 560,
        }}>
          One loop applied everywhere. The domain changes. The
          architecture doesn't.
        </div>
        <div style={{
          display: 'flex', gap: 0, alignItems: 'stretch',
          flexWrap: 'wrap',
        }}>
          {[
            { phase: 'Chaos', color: C.crimson, desc: 'Collect raw inputs. No judgment, just capture.' },
            { phase: 'Structured', color: C.amber, desc: 'Find the grain. Define facts, dimensions, measures.' },
            { phase: 'Automated', color: C.green, desc: 'Make it repeatable. Systems run while you sleep.' },
          ].map((p, i) => (
            <div key={i} style={{
              flex: '1 1 200px', padding: '20px 24px',
              background: C.card, borderTop: `3px solid ${p.color}`,
              borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
            }}>
              <div style={{
                fontFamily: font.display, fontSize: 18, fontWeight: 600,
                color: p.color, marginBottom: 8,
              }}>{p.phase}</div>
              <div style={{
                fontFamily: font.body, fontSize: 14, color: C.creamDim,
                lineHeight: 1.6,
              }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* The Manifest */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>The Manifest</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 20, maxWidth: 560,
        }}>
          Every AI that works on this site reads the same operating
          document. It defines the design system, the wing architecture,
          the content types, and the rules of engagement.
        </div>
        <Link href="/llms.txt" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: font.mono, fontSize: 12, color: C.amber,
          textDecoration: 'none', padding: '10px 20px',
          background: C.amber + '10', border: `1px solid ${C.amber}25`,
          borderRadius: 6, transition: 'all 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.amber + '50'}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.amber + '25'}
        >
          Read llms.txt (v1.2)
        </Link>
      </div>

      {/* Local AI */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>Local AI Infrastructure</div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, marginBottom: 20, maxWidth: 560,
        }}>
          A gaming rig in the basement runs the local AI layer.
          All processing happens on-device. No data leaves the machine.
        </div>
        <div style={{
          background: '#0a1018', border: `1px solid ${C.border}`,
          borderRadius: 8, overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px', background: C.card,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            <span style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, marginLeft: 8 }}>dex-jr</span>
          </div>
          <pre style={{
            margin: 0, padding: 20, fontFamily: font.mono, fontSize: 12,
            lineHeight: 1.8, color: C.creamMid, overflowX: 'auto',
          }}>{`Hardware:     RTX 3070 / 32GB RAM / Ryzen 12-core
Models:       8 installed (Ollama)
Primary:      qwen2.5-coder:7b @ 87 tok/sec
Reasoning:    deepseek-r1:8b
Vision:       gemma3:4b
Embeddings:   nomic-embed-text (768 dim)
RAG:          ChromaDB / 320,934 chunks
AutoCouncil:  v3.0 (hybrid local+cloud)
Auto-Sweep:   nightly 3 AM ingestion
Judgment:     90% on CR-LLMS-011 (60 questions)
Cost:         $0`}</pre>
        </div>
      </div>

      {/* Explore */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
        paddingTop: 24, borderTop: `1px solid ${C.border}`,
      }}>
        {[
          { href: '/council', label: 'Council Hub' },
          { href: '/council/profiles', label: 'All Profiles' },
          { href: '/council/1010', label: 'Seat 1010' },
          { href: '/excelligence', label: 'Excelligence' },
          { href: '/methodology', label: 'Methodology' },
          { href: '/framework/pss', label: 'PSS' },
          { href: '/mindframe', label: 'MindFrame' },
        ].map((link, i) => (
          <Link key={i} href={link.href} style={{
            fontFamily: font.mono, fontSize: 11, color: C.creamDim,
            textDecoration: 'none', padding: '6px 14px',
            border: `1px solid ${C.border}`, borderRadius: 4,
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = C.amber + '30'; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.creamDim; e.currentTarget.style.borderColor = C.border; }}
          >{link.label}</Link>
        ))}
      </div>
    </div>
  );
}
