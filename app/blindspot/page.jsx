'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function BlindSpotHub() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --navy:#0D1B2A;--card:#10202f;--cream:#F5F1EB;
          --dim:rgba(245,241,235,0.72);--body:rgba(245,241,235,0.6);
          --green:#4A9E6B;--green-dim:rgba(74,158,107,0.12);--green-border:rgba(74,158,107,0.35);
          --amber:#C49A3C;--amber-dim:rgba(196,154,60,0.12);--amber-border:rgba(196,154,60,0.25);
          --red:#B23531;
          --steel:#6B7B8D;--slate:#4A5568;
          --border:rgba(245,241,235,0.08);
        }
        body{font-family:'Source Serif 4',Georgia,serif;background:var(--navy);color:var(--cream);min-height:100vh}
        a{color:inherit;text-decoration:none}
        .divider{border:none;border-top:1px solid var(--border);max-width:960px;margin:0 auto}
        @media(max-width:768px){
          .modules-grid{grid-template-columns:1fr !important}
          .hero-ctas{flex-direction:column}
          .hero-ctas a{text-align:center;justify-content:center}
        }
      `}</style>

      <BackButton />

      {/* HERO */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 64px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--green)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          D&amp;A ANALYTICS &middot; SPORTS BETTING INTELLIGENCE
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 5.6vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
          You&rsquo;re not losing.<br />
          <span style={{ color: 'var(--green)' }}>You&rsquo;re not seeing.</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--cream)', lineHeight: 1.55, maxWidth: 640, marginBottom: 22 }}>
          signal &rarr; structure &rarr; edge
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: 'var(--dim)', lineHeight: 1.8, maxWidth: 620, marginBottom: 36 }}>
          blindspot.bet tracks every bet, surfaces every pattern, and shows you exactly where your edge is &mdash; and where it isn&rsquo;t. The house doesn&rsquo;t have better odds. It has better data.
        </div>

        <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="https://blindspot.bet" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--green)', color: 'var(--navy)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Visit blindspot.bet &rarr;
          </a>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.08em' }}>
            FREE BETA &middot; FREE TIER FOR LIFE
          </span>
        </div>
      </div>

      {/* STAT TILES */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { n: '84%',   t: 'of bettors have never tracked a single bet' },
            { n: '+6.2%', t: 'avg ROI improvement after 90 days' },
            { n: '12',    t: 'behavioral patterns that predict long-run losses' },
            { n: '$0',    t: 'cost to identify your blind spots' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderTop: '2px solid var(--green)', borderRadius: 8, padding: '24px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.2rem', color: 'var(--cream)', lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.55 }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* WHAT WE TRACK */}
      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: 'var(--green)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
            WHAT WE TRACK
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>
            Your data. <span style={{ color: 'var(--green)' }}>Fully visible.</span>
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: 'var(--dim)', lineHeight: 1.75, maxWidth: 680, marginBottom: 32 }}>
            Six surfaces. One dataset. Every surface is a different way to look at your own bets until the pattern you couldn&rsquo;t see before becomes obvious.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              { label: 'Bet Log',            t: 'Log every bet. Build the dataset.' },
              { label: 'ROI by Everything',  t: 'By sport, league, bet type, time of day, line movement.' },
              { label: 'Tilt Detection',     t: 'Behavioral patterns that predict your worst sessions.' },
              { label: 'Cash-Out Tracker',   t: 'Know exactly what early exits cost you.' },
              { label: 'Live Lines',         t: 'Real-time line movement in context.' },
              { label: 'Parlay Analysis',    t: 'Where parlays help and where they hurt.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--navy)', border: '1px solid var(--border)', borderLeft: '2px solid var(--green)', borderRadius: 6, padding: '18px 20px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--cream)', marginBottom: 8 }}>{f.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.6 }}>{f.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DASHBOARD PREVIEW */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: 'var(--green)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
          DASHBOARD PREVIEW
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>
          What it looks like to <span style={{ color: 'var(--green)' }}>see clearly.</span>
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: 'var(--dim)', lineHeight: 1.75, maxWidth: 640, marginBottom: 32 }}>
          Three numbers from a live beta account. A profitable season. A sharp win rate. One uncomfortable pattern nobody asked for &mdash; but everyone has.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {[
            { label: 'Season ROI',    value: '+4.8%',  t: 'up +1.2% vs last month',        color: 'var(--green)' },
            { label: 'Win Rate',      value: '54.3%',  t: 'break-even: 52.4%',             color: 'var(--green)' },
            { label: 'Blind Spot',    value: '-8.2%',  t: 'late-night ROI after 11pm',     color: 'var(--red)'   },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderTop: `3px solid ${s.color}`, borderRadius: 8, padding: '24px 22px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: 'var(--steel)', letterSpacing: '0.15em', marginBottom: 10 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.4rem', color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.value}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.55, fontStyle: 'italic' }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* MORE FROM BLINDSPOT */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          MORE FROM BLINDSPOT
        </div>
        <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {[
            { label: 'Trading',   tag: 'Live',       href: '/blindspot/trading',  desc: 'Trading dashboard. Daily setups, exits, and market context from Alex.' },
            { label: 'Steam',     tag: 'Analytics',  href: '/blindspot/steam',    desc: 'Steam library analytics. Playtime patterns, game catalog, behavioral splits.' },
            { label: 'Campaign',  tag: 'Analytics',  href: '/blindspot/campaign', desc: 'D&D campaign analytics. Session data, encounter outcomes, party performance.' },
            { label: 'Backtest',  tag: 'Historical', href: '/blindspot/backtest', desc: 'Historical validation engine. Test strategies against past data.' },
            { label: 'LLM Setup', tag: 'Guide',      href: '/blindspot/llm',      desc: 'Local LLM setup guide. Hardware, models, Ollama, ChromaDB.' },
          ].map((m, i) => (
            <Link key={i} href={m.href} style={{
              display: 'block', background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '20px 20px 18px', textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amber-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--cream)' }}>{m.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: 'var(--amber)', background: 'var(--amber-dim)', padding: '3px 8px', borderRadius: 3, letterSpacing: '0.1em' }}>{m.tag}</div>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--body)', lineHeight: 1.6 }}>{m.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid var(--border)', maxWidth: 960, margin: '0 auto', padding: '28px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--cream)', marginBottom: 4 }}>
            BlindSpot &middot; A D&amp;A Analytics Product &middot; Dropdown Logistics
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--body)' }}>
            signal &rarr; structure &rarr; edge
          </div>
        </div>
        <a href="https://blindspot.bet" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.05em' }}>
          blindspot.bet &#x2197;
        </a>
      </div>
    </>
  );
}
