'use client';

import Link from 'next/link';

const domains = [
  {
    key: 'trading',
    badge: 'Trading & Betting',
    name: 'BlindSpot Trading',
    desc: 'Strategy backtesting, bet tracking, and performance analytics. Built for a trader who returned 117% from a notebook — now structured so you can see where the edge actually lives.',
    metrics: [
      { label: 'Strategies', val: 'A / B' },
      { label: 'Bet Types', val: 'ATS · ML · O/U' },
      { label: 'Economy', val: '10K units' },
    ],
    tags: ['backtesting', 'March Madness', 'strategy comparison', 'bankroll tracking'],
    href: '/blindspot/trading',
    accentColor: '#00D26A',
    dimColor: '#0A2E18',
    glowColor: 'rgba(0,210,106,0.06)',
  },
  {
    key: 'campaign',
    badge: '⚔ D&D Campaign Intelligence',
    name: 'BlindSpot Campaign',
    desc: "Your campaign is generating data — rolls, quest threads, spotlight balance, faction heat. You're just not reading it. BlindSpot tracks everything and shows you what you're missing before session 6 kills it.",
    metrics: [
      { label: 'Tracked', val: '347 rolls' },
      { label: 'Quests', val: '12 active' },
      { label: 'Briefs', val: 'LLM-gen' },
    ],
    tags: ['dice analytics', 'spotlight balance', 'quest velocity', 'faction heat'],
    href: '/blindspot/campaign',
    accentColor: '#FF6B35',
    dimColor: '#2E1A0A',
    glowColor: 'rgba(255,107,53,0.06)',
  },
  {
    key: 'steam',
    badge: '🎮 Steam Library Analytics',
    name: 'BlindSpot Steam',
    desc: "247 games. $3,847 spent. 42% unplayed. Your Steam library is a dataset — with genre bias, impulse patterns, and a backlog that grows faster than you play. See where your money actually goes.",
    metrics: [
      { label: 'Library', val: '247 games' },
      { label: 'Blended $/hr', val: '$1.35' },
      { label: 'Unplayed', val: '42%' },
    ],
    tags: ['$/hour efficiency', 'genre analysis', 'purchase decisions', 'backlog priority'],
    href: '/blindspot/steam',
    accentColor: '#66C0F4',
    dimColor: 'rgba(102,192,244,0.1)',
    glowColor: 'rgba(102,192,244,0.06)',
  },
  {
    key: 'llm',
    badge: '⚡ Local LLM Integration',
    name: 'BlindSpot × LLM',
    desc: "The engine builds the data. The model reads it. Local GPU inference via Ollama — intelligence briefs, transcript parsing, convergent analysis from multiple models. Zero cloud. Zero API costs. Your hardware.",
    metrics: [
      { label: 'Runtime', val: 'Ollama' },
      { label: 'Models', val: '3 loaded' },
      { label: 'Cost', val: '$0 / ∞' },
    ],
    tags: ['GPU inference', 'convergent analysis', 'governed prompts', 'privacy-first'],
    href: '/blindspot/llm',
    accentColor: '#00E5FF',
    dimColor: '#002E33',
    glowColor: 'rgba(0,229,255,0.06)',
  },
];

const archLayers = [
  { label: 'Data Sources', boxes: [
    { text: 'trade logs', color: '#00D26A' }, { text: 'session transcripts', color: '#FF6B35' },
    { text: 'Steam API', color: '#66C0F4' }, { text: 'CSV imports', color: '#8A8880' }, { text: 'manual entry', color: '#8A8880' },
  ]},
  { label: 'Fact Tables', boxes: [
    { text: 'Fact_Trades', color: '#00D26A' }, { text: 'Fact_Rolls', color: '#FF6B35' },
    { text: 'Fact_Quests', color: '#FF6B35' }, { text: 'Fact_Games', color: '#66C0F4' }, { text: 'Fact_Purchases', color: '#66C0F4' },
  ]},
  { label: 'Dimensions', boxes: [
    { text: 'Dim_Strategy', color: '#00D26A' }, { text: 'Dim_Ticker', color: '#00D26A' },
    { text: 'Dim_PC', color: '#FF6B35' }, { text: 'Dim_Faction', color: '#FF6B35' },
    { text: 'Dim_Genre', color: '#66C0F4' }, { text: 'Dim_Game', color: '#66C0F4' }, { text: 'Dim_Date', color: '#8A8880' },
  ]},
  { label: 'Intelligence', boxes: [
    { text: 'LLM parsing', color: '#00E5FF' }, { text: 'convergent analysis', color: '#B388FF' },
    { text: 'intelligence briefs', color: '#FFD43B' }, { text: 'governed prompts', color: '#8A8880' },
  ]},
  { label: 'Output', boxes: [
    { text: 'dashboards', color: '#FFD43B' }, { text: 'blind spot flags', color: '#FFD43B' },
    { text: 'decision engines', color: '#FFD43B' }, { text: 'pre-session briefs', color: '#FFD43B' },
  ]},
];

const tickerItems = [
  { domain: 'Trading', color: '#00D26A', q: '"Am I better against the spread or on moneylines?"', a: 'ATS: 62% · ML: 48%' },
  { domain: 'Trading', color: '#00D26A', q: '"Which strategy is actually making me money?"', a: 'A: +$2,890 · B: +$1,390' },
  { domain: 'Campaign', color: '#FF6B35', q: '"Is the spotlight balanced or is someone fading?"', a: '62/38 split · flag raised' },
  { domain: 'Campaign', color: '#FF6B35', q: '"Are the dice actually cursed?"', a: 'avg 8.7 · p=0.04 · yes' },
  { domain: 'Steam', color: '#66C0F4', q: '"Should I buy Civilization VII?"', a: '82% chance unplayed · HOLD' },
  { domain: 'Steam', color: '#66C0F4', q: '"Where is my money actually going?"', a: 'RPGs: $682 · 19% played' },
  { domain: 'LLM', color: '#00E5FF', q: '"Do both models agree on this flag?"', a: 'converge: yes · high confidence' },
  { domain: 'Any', color: '#FFD43B', q: '"What am I missing?"', a: "that's the whole point" },
];

export default function BlindSpotHub() {
  return (
    <div style={{ background: '#0A0A0C', color: '#E8E6E3', minHeight: '100vh', paddingTop: 60, fontFamily: "'IBM Plex Sans', 'Source Serif 4', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .bs-domain-card:hover { border-color: #2A2A30 !important; transform: translateY(-4px); }
        .bs-domain-card:hover .bs-glow { opacity: 1 !important; }
        .bs-domain-card:hover .bs-arrow { transform: translateX(4px); }
        .bs-arch-box:hover { border-color: #2A2A30 !important; background: #16161A !important; }
        .bs-step:hover { border-color: #2A2A30 !important; transform: translateY(-2px); }
        @keyframes bsBreathe { 0%,100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 0.8; transform: translateY(4px); } }
        @keyframes bsFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '80px 32px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 900, height: 900, background: 'radial-gradient(circle, rgba(255,212,59,0.06) 0%, rgba(0,229,255,0.05) 30%, rgba(179,136,255,0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,212,59,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,212,59,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px', opacity: 0.5, pointerEvents: 'none',
        }} />

        <div style={{ width: 100, height: 100, margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 100, height: 100, borderRadius: 20, background: 'linear-gradient(135deg, #1A1A2E 0%, #0A0A12 60%)',
            border: '1px solid #2A2A30', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(255,212,59,0.08)',
          }}>
            <div style={{ position: 'absolute', top: -15, left: -15, width: 65, height: 65, background: 'radial-gradient(circle, rgba(255,212,59,0.3) 0%, transparent 70%)' }} />
            <span style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 54, fontWeight: 700,
              background: 'linear-gradient(135deg, #F5F0E0 0%, #F5F0E0 48%, #2A2A3E 52%, #2A2A3E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1,
            }}>B</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.8rem, 7vw, 4.2rem)', lineHeight: 1.1, marginBottom: 20, position: 'relative', zIndex: 1, animation: 'bsFadeUp 0.7s 0.1s ease both' }}>
          Blind<span style={{ color: '#FFD43B' }}>Spot</span>
        </h1>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.88rem', color: '#D4A853', marginBottom: 24, position: 'relative', zIndex: 1, letterSpacing: '0.02em', animation: 'bsFadeUp 0.7s 0.2s ease both' }}>
          Find your blind spots before they cost you.
        </div>
        <p style={{ fontSize: '1.08rem', color: '#8A8880', maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, position: 'relative', zIndex: 1, lineHeight: 1.7, animation: 'bsFadeUp 0.7s 0.3s ease both' }}>
          You&rsquo;re already doing the hard part — tracking the data, making the calls, running the numbers. BlindSpot structures what you&rsquo;ve built, finds the patterns you can&rsquo;t see from inside, and shows you exactly where your edge lives and where it doesn&rsquo;t.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#4A4840', position: 'relative', zIndex: 1, flexWrap: 'wrap', marginBottom: 48, animation: 'bsFadeUp 0.7s 0.4s ease both' }}>
          {['Your Data', 'Fact Tables', 'Dimensions', 'Dashboard', 'Blind Spots'].map((node, i) => (
            <span key={node} style={{ display: 'contents' }}>
              {i > 0 && <span style={{ opacity: 0.3 }}>→</span>}
              <span style={{ padding: '6px 14px', borderRadius: 5, border: '1px solid #1E1E24', background: '#111114', color: '#8A8880' }}>{node}</span>
            </span>
          ))}
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#4A4840', letterSpacing: '0.15em', position: 'relative', zIndex: 1, animation: 'bsBreathe 3s ease-in-out infinite' }}>
          ↓ the data changes · the engine doesn&rsquo;t care ↓
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 48px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        {[
          { val: '4', label: 'Domains' }, { val: '1', label: 'Architecture' },
          { val: '0', label: 'Lines of Production Code' }, { val: '$0', label: 'API Costs' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.8rem', fontWeight: 700, color: '#FFD43B', display: 'block' }}>{s.val}</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ═══ DOMAIN CARDS ═══ */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#FFD43B', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Domains</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.6rem' }}>Same engine. Different data.</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#4A4840', marginTop: 8 }}>Each BlindSpot module uses identical architecture — star schema, fact tables, dimensional slicing.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
          {domains.map(d => (
            <Link key={d.key} href={d.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="bs-domain-card" style={{
                background: '#111114', border: '1px solid #1E1E24', borderRadius: 10,
                overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'all 0.4s ease',
              }}>
                <div className="bs-glow" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
                  opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none',
                  background: `radial-gradient(ellipse at 50% 0%, ${d.glowColor} 0%, transparent 60%)`,
                }} />
                <div style={{ height: 2, width: '100%', background: `linear-gradient(90deg, ${d.accentColor}, ${d.dimColor})` }} />
                <div style={{ padding: '28px 24px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'inline-block', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '3px 10px', borderRadius: 3, marginBottom: 14,
                    background: d.dimColor, color: d.accentColor,
                  }}>{d.badge}</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.35rem', color: '#E8E6E3', marginBottom: 8 }}>{d.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#8A8880', fontWeight: 300, lineHeight: 1.6, marginBottom: 16 }}>{d.desc}</div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, marginBottom: 16 }}>
                    {d.metrics.map(m => (
                      <div key={m.label} style={{ textAlign: 'center', padding: '10px 12px', background: '#0A0A0C', borderRadius: 6, border: '1px solid rgba(255,255,255,0.03)', flex: 1, minWidth: 80 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.45rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.95rem', fontWeight: 600, color: d.accentColor }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const, marginBottom: 16 }}>
                    {d.tags.map(t => (
                      <span key={t} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', padding: '3px 8px', borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)', color: '#4A4840' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #1E1E24', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem' }}>
                    <span style={{ color: '#8A8880' }}>Explore →</span>
                    <span className="bs-arrow" style={{ fontSize: '1rem', color: d.accentColor, transition: 'transform 0.3s' }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ ARCHITECTURE DIAGRAM ═══ */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#FFD43B', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Architecture</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.6rem', marginBottom: 8 }}>One engine. Every domain.</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#4A4840' }}>Star schema → fact tables → dimension tables → dashboard → blind spots</div>
        </div>

        <div style={{ background: '#111114', border: '1px solid #1E1E24', borderRadius: 10, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FFD43B, #00D26A, #FF6B35, #66C0F4, #00E5FF)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {archLayers.map((layer) => (
              <div key={layer.label} style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ width: 120, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', letterSpacing: '0.08em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>
                  {layer.label}
                </div>
                <div style={{ flex: 1, borderLeft: '2px solid #1E1E24', padding: '14px 0 14px 20px' }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {layer.boxes.map(box => (
                      <div key={box.text} className="bs-arch-box" style={{
                        padding: '8px 14px', borderRadius: 5, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                        border: `1px solid ${box.color === '#8A8880' ? '#1E1E24' : box.color + '33'}`,
                        background: '#0A0A0C', color: box.color, transition: 'all 0.3s',
                      }}>{box.text}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#4A4840', lineHeight: 1.7 }}>
            <strong style={{ color: '#FFD43B' }}>The data changes. The engine doesn&rsquo;t care.</strong><br />Same star schema. Same dimensional slicing. Same pipeline. Different domain.
          </div>
        </div>
      </section>

      {/* ═══ QUESTIONS TICKER ═══ */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{ background: '#111114', border: '1px solid #1E1E24', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #1E1E24', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840' }}>
              <span style={{ color: '#FFD43B' }}>Questions</span> · BlindSpot Answers
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840' }}>across all domains</div>
          </div>
          {tickerItems.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, width: 70, flexShrink: 0, textAlign: 'right' as const, color: t.color }}>{t.domain}</div>
              <div style={{ width: 1, height: 20, background: '#1E1E24', flexShrink: 0 }} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#8A8880' }}>{t.q}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#4A4840', marginLeft: 'auto', flexShrink: 0 }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PITCH ═══ */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 32px 48px' }}>
        <div style={{ background: '#16161A', border: '1px solid #1E1E24', borderRadius: 10, padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FFD43B, #00D26A, #FF6B35, #66C0F4, #00E5FF, #B388FF)' }} />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', marginBottom: 20 }}>The notebook can&rsquo;t slice.</h2>
          <p style={{ color: '#8A8880', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 14, fontWeight: 300 }}>
            You&rsquo;ve been tracking things — trades in a spreadsheet, sessions in your head, purchases on impulse. <span style={{ color: '#E8E6E3', fontWeight: 400 }}>You&rsquo;re already doing the work.</span> But the format you&rsquo;re using can&rsquo;t show you what you&rsquo;re missing.
          </p>
          <p style={{ color: '#8A8880', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 14, fontWeight: 300 }}>
            BlindSpot takes the data you already have and structures it so you can cut it by dimension — by strategy, by genre, by PC, by time period. <span style={{ color: '#FFD43B' }}>Same architecture every time. Fact tables. Dimension tables. Dashboards. Flags.</span>
          </p>
          <p style={{ color: '#8A8880', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 14, fontWeight: 300 }}>
            The engine was built for <span style={{ color: '#E8E6E3', fontWeight: 400 }}>enterprise audit coverage analysis</span>. Turns out it works for anything with structured data and decisions that have consequences. <span style={{ color: '#00D26A' }}>The data changes. The engine doesn&rsquo;t care.</span>
          </p>
          <p style={{ color: '#8A8880', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 14, fontWeight: 300 }}>
            BlindSpot doesn&rsquo;t tell you what to do. <span style={{ color: '#E8E6E3', fontWeight: 400 }}>It shows you what you can&rsquo;t see from inside.</span> The rest is your call.
          </p>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#4A4840', marginTop: 28 }}>— Dave Kitchens</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840', marginTop: 4, opacity: 0.6 }}>Dropdown Logistics · same engine · different data</div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div style={{ textAlign: 'center', padding: '24px 32px 36px', borderTop: '1px solid #1E1E24', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840' }}>BlindSpot · find your blind spots before they cost you</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 6, opacity: 0.5 }}>built with the same engine that doesn&rsquo;t care where the data comes from</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Trading', href: '/blindspot/trading' },
            { label: 'Campaign', href: '/blindspot/campaign' },
            { label: 'Steam', href: '/blindspot/steam' },
            { label: 'LLM', href: '/blindspot/llm' },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', textDecoration: 'none' }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
