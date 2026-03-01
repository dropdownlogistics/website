'use client';

import { useState } from 'react';
import Link from 'next/link';

const topValue = [
  { game: 'Stardew Valley', hours: 842, cost: 14.99, perHour: 0.02, genre: 'Sandbox/Sim' },
  { game: 'Terraria', hours: 614, cost: 9.99, perHour: 0.02, genre: 'Sandbox/Sim' },
  { game: 'Factorio', hours: 387, cost: 30.00, perHour: 0.08, genre: 'Sandbox/Sim' },
  { game: 'Divinity: Original Sin 2', hours: 312, cost: 44.99, perHour: 0.14, genre: 'RPG' },
  { game: 'Rimworld', hours: 298, cost: 34.99, perHour: 0.12, genre: 'Sandbox/Sim' },
];

const worstValue = [
  { game: 'Cyberpunk 2077', hours: 0.4, cost: 59.99, perHour: 149.98, genre: 'RPG' },
  { game: 'Total War: Warhammer III', hours: 0.8, cost: 59.99, perHour: 74.99, genre: 'Strategy' },
  { game: 'Baldur\'s Gate 3', hours: 2.1, cost: 59.99, perHour: 28.57, genre: 'RPG' },
  { game: 'Civilization VI', hours: 3.2, cost: 59.99, perHour: 18.75, genre: 'Strategy' },
  { game: 'Elden Ring', hours: 4.8, cost: 59.99, perHour: 12.50, genre: 'RPG' },
];

const genreAnalysis = [
  { genre: 'Sandbox/Sim', owned: 42, played: 33, engage: '78%', avgCost: '$0.08', status: 'CORE', color: '#00D26A' },
  { genre: 'RPG', owned: 68, played: 13, engage: '19%', avgCost: '$7.26', status: 'BLIND SPOT', color: '#FF4D4D' },
  { genre: 'Strategy', owned: 28, played: 4, engage: '14%', avgCost: '$12.33', status: 'BLIND SPOT', color: '#FF4D4D' },
  { genre: 'Action', owned: 45, played: 22, engage: '49%', avgCost: '$1.84', status: 'MIXED', color: '#FFB300' },
  { genre: 'Indie', owned: 38, played: 24, engage: '63%', avgCost: '$0.42', status: 'STRONG', color: '#00D26A' },
  { genre: 'Multiplayer', owned: 26, played: 8, engage: '31%', avgCost: '$4.12', status: 'WEAK', color: '#FFB300' },
];

const backlogQueue = [
  { game: 'Hades', reason: 'Genre match (action-roguelike), high Metacritic, $0 additional cost', priority: 1 },
  { game: 'Disco Elysium', reason: 'Narrative RPG — test if RPG blind spot is genre or time commitment', priority: 2 },
  { game: 'Slay the Spire', reason: 'Card-based sandbox loop — closest to core genre preference', priority: 3 },
  { game: 'Hollow Knight', reason: 'Metroidvania crossover with exploration sandbox mechanics', priority: 4 },
  { game: 'Subnautica', reason: 'Survival sandbox — direct core genre hit, already owned', priority: 5 },
];

export default function BlindSpotSteam() {
  const [showDecision, setShowDecision] = useState(false);

  return (
    <div style={{ background: '#0A0A0C', color: '#D4D2CD', minHeight: '100vh', paddingTop: 60, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .bs-kpi:hover { border-color: #2A2A30 !important; transform: translateY(-1px); }
        .bs-row:hover { background: rgba(102,192,244,0.02) !important; }
        .bs-flag:hover { background: rgba(255,255,255,0.01) !important; }
      `}</style>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 28px 0', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>
        <Link href="/blindspot" style={{ color: '#4A4840', textDecoration: 'none' }}>BlindSpot</Link>
        <span style={{ color: '#3E3D38' }}>/</span>
        <span style={{ color: '#66C0F4' }}>Steam</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '48px 32px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(102,192,244,0.06) 0%, rgba(27,40,56,0.04) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#66C0F4', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, position: 'relative', zIndex: 1 }}>
          🎮 Connected · Steam Account
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.15, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          Blind<span style={{ color: '#FFD43B' }}>Spot</span> <span style={{ color: '#66C0F4' }}>Steam</span>
        </h1>
        <p style={{ fontSize: '0.92rem', color: '#7A786F', maxWidth: 560, margin: '0 auto', fontWeight: 300, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Your Steam library is a dataset. 247 games, $3,847 spent, 42% unplayed. BlindSpot structures your purchasing habits, genre bias, and backlog velocity so you can see where your money actually goes.
        </p>
      </section>

      {/* KPIs */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
          {[
            { label: 'Library', val: '247', color: '#66C0F4', sub: 'games owned' },
            { label: 'Lifetime Spent', val: '$3,847', color: '#FFD43B', sub: 'total purchase cost' },
            { label: 'Total Hours', val: '2,841', color: '#D4D2CD', sub: 'across all games' },
            { label: 'Blended $/hr', val: '$1.35', color: '#00D26A', sub: 'vs $2.10 industry avg' },
            { label: 'Unplayed', val: '42%', color: '#FF4D4D', sub: '104 games · $1,240 value' },
            { label: 'Completion Rate', val: '31%', color: '#FFB300', sub: 'of games played' },
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

      {/* TOP VALUE + WORST VALUE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* TOP VALUE */}
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            🏆 Top Value · Best $/hr
          </div>
          {topValue.map((g, i) => (
            <div key={g.game} className="bs-row" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: i < topValue.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none', transition: 'background 0.2s' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#D4D2CD', flex: 1 }}>{g.game}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#7A786F' }}>{g.hours}h</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#00D26A', fontWeight: 600, width: 60, textAlign: 'right' as const }}>${g.perHour}/hr</div>
            </div>
          ))}
        </div>

        {/* WORST VALUE */}
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            💸 Worst Value · Highest $/hr
          </div>
          {worstValue.map((g, i) => (
            <div key={g.game} className="bs-row" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: i < worstValue.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none', transition: 'background 0.2s' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#D4D2CD', flex: 1 }}>{g.game}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#7A786F' }}>{g.hours}h</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#FF4D4D', fontWeight: 600, width: 75, textAlign: 'right' as const }}>${g.perHour.toFixed(2)}/hr</div>
            </div>
          ))}
        </div>
      </div>

      {/* GENRE ANALYSIS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840', marginBottom: 14 }}>
          <span style={{ color: '#66C0F4' }}>Genre</span> · Analysis
        </div>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Genre', 'Owned', 'Played', 'Engage %', 'Avg $/hr', 'Status'].map(h => (
                  <th key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4A4840', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1A1A22' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {genreAnalysis.map(g => (
                <tr key={g.genre} className="bs-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600 }}>{g.genre}</td>
                  <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{g.owned}</td>
                  <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{g.played}</td>
                  <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: g.color }}>{g.engage}</td>
                  <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{g.avgCost}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600,
                      padding: '2px 7px', borderRadius: 3, letterSpacing: '0.04em',
                      background: g.status === 'CORE' || g.status === 'STRONG' ? '#0A2E18' : g.status === 'BLIND SPOT' ? '#2E0E0E' : '#2E2200',
                      color: g.color,
                    }}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRE-PURCHASE DECISION ENGINE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #1A1A22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840' }}>
              <span style={{ color: '#FFD43B' }}>Decision</span> · Pre-Purchase Engine
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px', borderRadius: 3, border: '1px solid #2A2210', color: '#FFD43B' }}>DEMO</span>
          </div>
          <div onClick={() => setShowDecision(!showDecision)} style={{ padding: '12px 18px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#66C0F4', cursor: 'pointer' }}>
            {showDecision ? '▾ hide' : '▸ "Should I buy Civilization VII?"'}
          </div>
          {showDecision && (
            <div style={{ padding: '0 18px 20px' }}>
              <div style={{ background: '#0A0A0C', border: '1px solid #1A1A22', borderRadius: 6, padding: '20px 18px' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#FFD43B', fontWeight: 600, marginBottom: 12 }}>CIVILIZATION VII · $59.99</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'Unplayed Probability', val: '82%', color: '#FF4D4D' },
                    { label: 'Genre Engage Rate', val: '14%', color: '#FF4D4D' },
                    { label: 'Strategy Games Owned', val: '28', color: '#7A786F' },
                    { label: 'Strategy Games Played', val: '4', color: '#FFB300' },
                  ].map(m => (
                    <div key={m.label} style={{ padding: 10, background: '#0E0E14', borderRadius: 4 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.48rem', color: '#4A4840', textTransform: 'uppercase' as const, marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.9rem', fontWeight: 600, color: m.color }}>{m.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', padding: '12px 14px', background: '#2E0E0E', borderRadius: 4, borderLeft: '3px solid #FF4D4D' }}>
                  <span style={{ color: '#FF4D4D', fontWeight: 600 }}>RECOMMENDATION: 30-DAY HOLD</span>
                  <div style={{ color: '#7A786F', marginTop: 4, fontSize: '0.68rem', lineHeight: 1.6 }}>
                    Play 3 existing strategy games first (Civ VI: 3.2 hrs, Total War: 0.8 hrs, Europa Universalis: 1.1 hrs). If you exceed 10 hours combined, revisit this purchase. Your strategy genre engage rate suggests this will sit unplayed.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BACKLOG PRIORITY QUEUE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 32px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840', marginBottom: 14 }}>
          <span style={{ color: '#66C0F4' }}>Backlog</span> · Priority Queue
        </div>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          {backlogQueue.map((g, i) => (
            <div key={g.game} className="bs-flag" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 18px', borderBottom: i < backlogQueue.length - 1 ? '1px solid #1A1A22' : 'none', transition: 'background 0.2s' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#66C0F4', width: 24, textAlign: 'center' as const, flexShrink: 0 }}>#{g.priority}</div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', fontWeight: 600, color: '#D4D2CD', marginBottom: 3 }}>{g.game}</div>
                <div style={{ fontSize: '0.72rem', color: '#7A786F', lineHeight: 1.5 }}>{g.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px 32px 36px', borderTop: '1px solid #1E1E24', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840' }}>BlindSpot · Steam Library Analytics</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 6, opacity: 0.5 }}>same engine · different data · your library is a dataset</div>
        <div style={{ marginTop: 12 }}>
          <Link href="/blindspot" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#FFD43B', textDecoration: 'none' }}>← Back to BlindSpot</Link>
        </div>
      </div>
    </div>
  );
}
