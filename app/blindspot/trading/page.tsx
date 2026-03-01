'use client';

import { useState } from 'react';
import Link from 'next/link';

const revealCards = [
  { title: 'Bet Type Edge', desc: 'ATS hits 62%. Moneylines bleed. The spread is your weapon — the data says so.', color: '#00D26A' },
  { title: 'Seed Matchup Patterns', desc: '5v12 upsets hit 35% since 2010. Your gut says chalk. The model says hold.', color: '#FFD43B' },
  { title: 'Bankroll Curve', desc: 'Your bankroll peaked in Round 2 and flatlined in the Sweet 16. The curve tells you when to press.', color: '#00E5FF' },
  { title: 'Round-by-Round Decay', desc: 'Win rate drops 18% per round after the first weekend. Everyone gets worse — how fast is the question.', color: '#FF4D4D' },
  { title: 'Win Size vs Loss Size', desc: 'Avg win: +142 units. Avg loss: -186 units. You win more often but lose bigger. That math catches up.', color: '#FFB300' },
  { title: 'Conference Bias', desc: 'You bet Big 12 at 71%. SEC at 44%. Conference loyalty isn\'t a strategy — it\'s a blind spot.', color: '#B388FF' },
];

const strategies = [
  { name: 'Strategy A: Momentum', color: '#00E5FF', pnl: '+$2,890', winRate: '68.2%', avgRatio: '2.3x', trades: 28, best: { ticker: 'NVDA', val: '+$1,840' }, worst: { ticker: 'TSLA', val: '-$620' } },
  { name: 'Strategy B: Mean Reversion', color: '#B388FF', pnl: '+$1,390', winRate: '57.1%', avgRatio: '1.8x', trades: 19, best: { ticker: 'AMD', val: '+$980' }, worst: { ticker: 'META', val: '-$440' } },
];

const recentTrades = [
  { date: '02/24', strategy: 'A', ticker: 'NVDA', dir: 'LONG', entry: '128.40', exit: '131.20', pnl: '+140', win: true },
  { date: '02/23', strategy: 'B', ticker: 'TSLA', dir: 'LONG', entry: '342.10', exit: '338.50', pnl: '-54', win: false },
  { date: '02/22', strategy: 'A', ticker: 'AAPL', dir: 'LONG', entry: '241.80', exit: '245.60', pnl: '+114', win: true },
  { date: '02/21', strategy: 'A', ticker: 'MSFT', dir: 'SHORT', entry: '418.90', exit: '412.30', pnl: '+198', win: true },
  { date: '02/20', strategy: 'B', ticker: 'GOOG', dir: 'LONG', entry: '176.40', exit: '174.10', pnl: '-69', win: false },
  { date: '02/19', strategy: 'A', ticker: 'META', dir: 'LONG', entry: '612.30', exit: '619.80', pnl: '+225', win: true },
  { date: '02/18', strategy: 'B', ticker: 'AMD', dir: 'LONG', entry: '162.50', exit: '168.90', pnl: '+192', win: true },
  { date: '02/17', strategy: 'A', ticker: 'AMZN', dir: 'SHORT', entry: '228.10', exit: '231.40', pnl: '-99', win: false },
];

export default function BlindSpotTrading() {
  const [activeTab, setActiveTab] = useState<'betting' | 'backtest'>('betting');

  return (
    <div style={{ background: '#0A0A0C', color: '#D4D2CD', minHeight: '100vh', paddingTop: 60, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        .bs-reveal:hover { border-color: #2A2A30 !important; transform: translateY(-2px); }
        .bs-kpi:hover { border-color: #2A2A30 !important; transform: translateY(-1px); }
        .bs-tab { cursor: pointer; transition: all 0.3s; }
        .bs-tab:hover { color: #FFD43B !important; }
        .bs-row:hover { background: rgba(0,229,255,0.02) !important; }
      `}</style>

      {/* BREADCRUMB NAV */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 28px 0', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>
        <Link href="/blindspot" style={{ color: '#4A4840', textDecoration: 'none' }}>BlindSpot</Link>
        <span style={{ color: '#3E3D38' }}>/</span>
        <span style={{ color: '#FFD43B' }}>Trading</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '48px 32px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,210,106,0.06) 0%, rgba(255,212,59,0.04) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#00D26A', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, position: 'relative', zIndex: 1 }}>
          Selection Sunday · March 16
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.15, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          Blind<span style={{ color: '#FFD43B' }}>Spot</span> Trading
        </h1>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: '#FFD43B', marginBottom: 16, position: 'relative', zIndex: 1 }}>
          Find your edge. Find your blind spots. Same engine.
        </p>
        <p style={{ fontSize: '0.92rem', color: '#7A786F', maxWidth: 560, margin: '0 auto', fontWeight: 300, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Built for a trader who returned 117% over 16.5 months from a notebook. The data was always there — it just needed structure. BlindSpot puts your trades into fact tables and shows you what the notebook can&rsquo;t.
        </p>
      </section>

      {/* TAB SWITCHER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 0, borderBottom: '1px solid #1E1E24' }}>
        {(['betting', 'backtest'] as const).map(tab => (
          <div key={tab} className="bs-tab" onClick={() => setActiveTab(tab)} style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '12px 20px',
            color: activeTab === tab ? '#FFD43B' : '#4A4840',
            borderBottom: activeTab === tab ? '2px solid #FFD43B' : '2px solid transparent',
          }}>
            {tab === 'betting' ? '🏀 March Madness' : '📊 Strategy Backtesting'}
          </div>
        ))}
      </div>

      {/* ═══ BETTING TAB ═══ */}
      {activeTab === 'betting' && (
        <div>
          {/* KPIs */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840' }}>
                <span style={{ color: '#FFD43B' }}>Tournament</span> · March Madness 2026
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840' }}>fake economy · 10,000 units</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
              {[
                { label: 'Starting Bankroll', val: '10,000', color: '#FFD43B', sub: 'BlindSpot units' },
                { label: 'Teams', val: '68', color: '#00E5FF', sub: 'First Four → Final' },
                { label: 'Games', val: '67', color: '#D4D2CD', sub: 'total matchups' },
                { label: 'Bet Types', val: '3', color: '#00D26A', sub: 'ATS · ML · O/U' },
                { label: 'Win Rate Target', val: '55%+', color: '#FFB300', sub: 'breakeven is ~52.4%' },
                { label: 'Real Money', val: '$0', color: '#00D26A', sub: 'stress test only' },
              ].map(k => (
                <div key={k.label} className="bs-kpi" style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '16px 14px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: k.color }} />
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 }}>{k.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.4rem', fontWeight: 700, color: k.color }}>{k.val}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 3 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* REVEAL CARDS */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 32px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840', marginBottom: 14 }}>
              <span style={{ color: '#FFD43B' }}>What</span> · BlindSpot Reveals
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
              {revealCards.map(r => (
                <div key={r.title} className="bs-reveal" style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '20px 18px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', borderLeft: `3px solid ${r.color}` }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 6 }}>{r.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#7A786F', fontWeight: 300, lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px 40px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#FFD43B', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textAlign: 'center', marginBottom: 8 }}>How It Works</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', textAlign: 'center', marginBottom: 24 }}>Three steps. No real money.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { num: '01', title: 'Set Bankroll', desc: 'Start with 10,000 BlindSpot units. Fake economy. Real math. Track every unit like it costs you.' },
                { num: '02', title: 'Pick Games', desc: 'ATS, moneyline, or over/under — 67 games, your call. The engine tracks your logic, not just your results.' },
                { num: '03', title: 'Learn', desc: 'After 67 games, see where your edge lives and where it bleeds. Bet type, seed matchup, round, conference — all sliceable.' },
              ].map(s => (
                <div key={s.num} style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '24px 18px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#00E5FF', letterSpacing: '0.1em', marginBottom: 10 }}>{s.num}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#7A786F', fontWeight: 300, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ BACKTEST TAB ═══ */}
      {activeTab === 'backtest' && (
        <div>
          {/* BACKTEST KPIs */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840' }}>
                <span style={{ color: '#00E5FF' }}>Backtest</span> · Strategy Comparison
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840' }}>47 trades · two strategies</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
              {[
                { label: 'Total P&L', val: '+$4,280', color: '#00D26A', sub: 'combined both strategies' },
                { label: 'Win Rate', val: '63.8%', color: '#00E5FF', sub: '30 of 47 trades' },
                { label: 'Avg Win/Loss', val: '2.1x', color: '#FFD43B', sub: 'risk-reward ratio' },
                { label: 'Best Trade', val: '+$1,840', color: '#00D26A', sub: 'NVDA · Strategy A' },
                { label: 'Worst Trade', val: '-$620', color: '#FF4D4D', sub: 'TSLA · Strategy B' },
              ].map(k => (
                <div key={k.label} className="bs-kpi" style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '16px 14px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: k.color }} />
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 }}>{k.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.4rem', fontWeight: 700, color: k.color }}>{k.val}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 3 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STRATEGY COMPARISON */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840', marginBottom: 14 }}>
              <span style={{ color: '#00E5FF' }}>Strategy</span> · Head-to-Head
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {strategies.map(s => (
                <div key={s.name} style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '24px 20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color }} />
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: s.color, marginBottom: 12 }}>{s.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Total P&L', val: s.pnl },
                      { label: 'Win Rate', val: s.winRate },
                      { label: 'Avg Win/Loss', val: s.avgRatio },
                      { label: 'Trades', val: String(s.trades) },
                    ].map(m => (
                      <div key={m.label} style={{ padding: 8, background: '#0A0A0C', borderRadius: 4 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.48rem', color: '#4A4840', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{m.label}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.9rem', fontWeight: 600, color: s.color }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <div style={{ flex: 1, padding: 8, background: '#0A2E18', borderRadius: 4 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.48rem', color: '#4A4840', textTransform: 'uppercase' as const }}>Best</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#00D26A' }}>{s.best.ticker} {s.best.val}</div>
                    </div>
                    <div style={{ flex: 1, padding: 8, background: '#2E0E0E', borderRadius: 4 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.48rem', color: '#4A4840', textTransform: 'uppercase' as const }}>Worst</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#FF4D4D' }}>{s.worst.ticker} {s.worst.val}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT TRADES TABLE */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 32px' }}>
            <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
                Recent Trades
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr>
                      {['Date', 'Strategy', 'Ticker', 'Direction', 'Entry', 'Exit', 'P&L'].map(h => (
                        <th key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4A4840', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1A1A22' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((t, i) => (
                      <tr key={i} className="bs-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{t.date}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: t.strategy === 'A' ? '#00E5FF' : '#B388FF' }}>{t.strategy}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#D4D2CD', fontWeight: 600 }}>{t.ticker}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{t.dir}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem' }}>{t.entry}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem' }}>{t.exit}</td>
                        <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600, color: t.win ? '#00D26A' : '#FF4D4D' }}>{t.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* PITCH BANNER */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 32px' }}>
            <div style={{ background: '#16161A', border: '1px solid #1A1A22', borderRadius: 8, padding: '32px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #00E5FF, #B388FF)' }} />
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', marginBottom: 12 }}>What if your backtest data looked like this?</div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: '#7A786F', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                You&rsquo;re already tracking trades. BlindSpot structures them into fact tables and shows you which strategy actually works, which tickers burn you, and where the risk-reward ratio inverts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px 32px 36px', borderTop: '1px solid #1E1E24', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840' }}>BlindSpot · Trading & Betting</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 6, opacity: 0.5 }}>same engine · different data · moneyball for your portfolio</div>
        <div style={{ marginTop: 12 }}>
          <Link href="/blindspot" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#FFD43B', textDecoration: 'none' }}>← Back to BlindSpot</Link>
        </div>
      </div>
    </div>
  );
}
