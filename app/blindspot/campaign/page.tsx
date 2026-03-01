'use client';

import { useState } from 'react';
import Link from 'next/link';

const blindSpotFlags = [
  { icon: '⚠', label: 'Spotlight Imbalance', detail: 'Hillie 62% · Feliciano 38%. Two-player campaign with a 24-point spotlight gap. Feliciano is fading.', color: '#FFB300', bg: '#2E2200' },
  { icon: '🧵', label: 'Quest Thread Decay', detail: '3 quests stalled 4+ sessions. Threads don\'t die loud — they just stop getting mentioned. The engine tracks silence.', color: '#FF4D4D', bg: '#2E0E0E' },
  { icon: '🎲', label: 'Cold Dice: Feliciano', detail: 'd20 avg 8.7 over 12 sessions. Expected: 10.5. That\'s not bad luck — that\'s a statistically significant cold streak (p=0.04).', color: '#00E5FF', bg: '#002E33' },
  { icon: '🔥', label: 'Faction Heat Flat', detail: '4 of 7 factions showing zero heat change in 3+ sessions. Your world has factions — but they\'re not moving.', color: '#FF6B35', bg: '#2E1A0A' },
  { icon: '💰', label: 'Resource Burn Rate', detail: 'Gold and consumables declining faster than quest reward income. 3 sessions to insolvency at current rate.', color: '#B388FF', bg: '#1A0A33' },
];

const factions = [
  { name: 'Thieves Guild', heat: 72, trend: '↑', color: '#FF4D4D' },
  { name: 'Companions', heat: 45, trend: '—', color: '#FFB300' },
  { name: 'Dark Brotherhood', heat: 18, trend: '↓', color: '#7A786F' },
  { name: 'Imperial Legion', heat: 61, trend: '↑', color: '#FF6B35' },
  { name: 'Stormcloaks', heat: 33, trend: '—', color: '#7A786F' },
  { name: 'College of Winterhold', heat: 8, trend: '—', color: '#4A4840' },
  { name: 'Greybeards', heat: 52, trend: '↑', color: '#00E5FF' },
];

const quests = [
  { name: 'Blood on the Ice', status: 'active', sessions: 4, progress: 65, stalled: false },
  { name: 'The Forsworn Conspiracy', status: 'active', sessions: 2, progress: 30, stalled: false },
  { name: 'Dampened Spirits', status: 'stalled', sessions: 6, progress: 40, stalled: true },
  { name: 'The Golden Claw', status: 'complete', sessions: 3, progress: 100, stalled: false },
  { name: 'A Cornered Rat', status: 'stalled', sessions: 5, progress: 20, stalled: true },
  { name: 'Diplomatic Immunity', status: 'active', sessions: 1, progress: 10, stalled: false },
  { name: 'Bleak Falls Barrow', status: 'complete', sessions: 2, progress: 100, stalled: false },
  { name: 'The Way of the Voice', status: 'stalled', sessions: 4, progress: 55, stalled: true },
];

export default function BlindSpotCampaign() {
  const [showBrief, setShowBrief] = useState(false);

  return (
    <div style={{ background: '#0A0A0C', color: '#D4D2CD', minHeight: '100vh', paddingTop: 60, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .bs-kpi:hover { border-color: #2A2A30 !important; transform: translateY(-1px); }
        .bs-flag:hover { background: rgba(255,255,255,0.01) !important; }
        .bs-quest-row:hover { background: rgba(255,107,53,0.02) !important; }
        @keyframes bsBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 28px 0', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>
        <Link href="/blindspot" style={{ color: '#4A4840', textDecoration: 'none' }}>BlindSpot</Link>
        <span style={{ color: '#3E3D38' }}>/</span>
        <span style={{ color: '#FF6B35' }}>Campaign</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '48px 32px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, rgba(255,212,59,0.03) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#FF6B35', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, position: 'relative', zIndex: 1 }}>
          ⚔ Ash, Snow & Steel
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.15, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          Blind<span style={{ color: '#FFD43B' }}>Spot</span> <span style={{ color: '#FF6B35' }}>Campaign</span>
        </h1>
        <p style={{ fontSize: '0.92rem', color: '#7A786F', maxWidth: 580, margin: '0 auto', fontWeight: 300, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Your campaign dies in session 6. Not from bad storytelling — from lost quest threads, forgotten NPCs, spotlight imbalance, and dice you swore were cursed. BlindSpot tracks everything the DM screen can&rsquo;t.
        </p>
      </section>

      {/* LIVE STATE BLOCK */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B35', animation: 'bsBlink 1.5s step-end infinite' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#FF6B35', fontWeight: 600 }}>LIVE STATE</span>
          </div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#7A786F' }}>Session 12 · Scene 3 · Riften Ratway · Combat</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', marginLeft: 'auto' }}>2 PCs · 12 sessions · 347 rolls</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
          {[
            { label: 'Sessions', val: '12', color: '#FF6B35', sub: 'campaign total' },
            { label: 'Total Rolls', val: '347', color: '#FFD43B', sub: 'd20 + all dice' },
            { label: 'Quest Completion', val: '67%', color: '#00D26A', sub: '8 of 12 active' },
            { label: 'Stalled Quests', val: '3', color: '#FF4D4D', sub: '4+ sessions no progress' },
            { label: 'Spotlight: Hillie', val: '62%', color: '#B388FF', sub: 'Warlock L3' },
            { label: 'Spotlight: Feliciano', val: '38%', color: '#FFB300', sub: 'Paladin L3 · d20 avg 8.7' },
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

      {/* BLIND SPOT FLAGS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4A4840', marginBottom: 14 }}>
          <span style={{ color: '#FF6B35' }}>Blind Spot</span> · Flags
        </div>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          {blindSpotFlags.map((f, i) => (
            <div key={i} className="bs-flag" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 18px', borderBottom: i < blindSpotFlags.length - 1 ? '1px solid #1A1A22' : 'none', transition: 'background 0.2s' }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, background: f.bg, color: f.color }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600, color: f.color, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: '0.76rem', color: '#7A786F', lineHeight: 1.5 }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO COLUMN: FACTION HEAT + QUEST TRACKER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* FACTION HEAT MAP */}
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            Faction Heat Map
          </div>
          {factions.map((f, i) => (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < factions.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: '#D4D2CD', width: 150, flexShrink: 0 }}>{f.name}</div>
              <div style={{ flex: 1, height: 6, background: '#1A1A22', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${f.heat}%`, height: '100%', background: f.color, borderRadius: 3, transition: 'width 0.5s' }} />
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: f.color, width: 30, textAlign: 'right' as const }}>{f.heat}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#4A4840', width: 16, textAlign: 'center' as const }}>{f.trend}</div>
            </div>
          ))}
        </div>

        {/* QUEST TRACKER */}
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            Quest Tracker
          </div>
          {quests.map((q, i) => (
            <div key={q.name} className="bs-quest-row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderBottom: i < quests.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none', transition: 'background 0.2s' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#D4D2CD', flex: 1 }}>{q.name}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600,
                padding: '2px 7px', borderRadius: 3, letterSpacing: '0.04em',
                ...(q.status === 'complete' ? { background: '#0A2E18', color: '#00D26A' } :
                    q.stalled ? { background: '#2E0E0E', color: '#FF4D4D' } :
                    { background: '#002E33', color: '#00E5FF' }),
              }}>{q.status.toUpperCase()}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', width: 60, textAlign: 'right' as const }}>{q.sessions} sess</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRE-SESSION BRIEF (expandable) */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 32px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#4A4840', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
              Pre-Session Intelligence Brief
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px', borderRadius: 3, border: '1px solid #002E33', color: '#00E5FF' }}>LLM-GENERATED</span>
          </div>
          <div onClick={() => setShowBrief(!showBrief)} style={{ padding: '12px 18px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#FF6B35', cursor: 'pointer' }}>
            {showBrief ? '▾ hide brief' : '▸ show Session 13 prep brief'}
          </div>
          {showBrief && (
            <div style={{ padding: '0 18px 18px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F', lineHeight: 1.8 }}>
              <div style={{ color: '#FF6B35', fontWeight: 600, marginBottom: 8 }}>SESSION 13 · PRE-SESSION BRIEF</div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#FFB300' }}>⚠ PRIORITY:</span> Feliciano spotlight deficit at 38%. Consider opening with a Paladin-specific encounter or roleplay hook to rebalance.
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#FF4D4D' }}>🧵 STALLED THREADS:</span> &quot;Dampened Spirits&quot; (6 sessions stalled), &quot;A Cornered Rat&quot; (5 sessions), &quot;The Way of the Voice&quot; (4 sessions). Recommend: resolve or explicitly close at least one. Dead threads create narrative weight.
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#00E5FF' }}>🎲 DICE NOTE:</span> Feliciano&rsquo;s d20 avg 8.7 over 12 sessions. If cold streak continues, consider narrative compensation — let competence come from roleplay, not rolls.
              </div>
              <div>
                <span style={{ color: '#00D26A' }}>✓ MOMENTUM:</span> Thieves Guild heat rising (+14 last 3 sessions). Imperial Legion engagement strong. Lean into these active faction threads.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PITCH */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 40px' }}>
        <div style={{ background: '#16161A', border: '1px solid #1A1A22', borderRadius: 8, padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FF6B35, #FFD43B)' }} />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', marginBottom: 16 }}>Moneyball for your campaign.</h2>
          <p style={{ color: '#7A786F', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300 }}>
            Every roll, every quest thread, every faction interaction, every spotlight minute — it&rsquo;s all data. BlindSpot structures it so you can DM with the full picture, not just the last session&rsquo;s memory. <span style={{ color: '#FF6B35' }}>The engine doesn&rsquo;t care that it&rsquo;s D&D.</span> It cares that there are facts, dimensions, and patterns.
          </p>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#4A4840', marginTop: 24 }}>— Dave · same engine · different data</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px 32px 36px', borderTop: '1px solid #1E1E24', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#4A4840' }}>BlindSpot · Campaign Intelligence</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#4A4840', marginTop: 6, opacity: 0.5 }}>same engine · different data · your campaign generates data — read it</div>
        <div style={{ marginTop: 12 }}>
          <Link href="/blindspot" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#FFD43B', textDecoration: 'none' }}>← Back to BlindSpot</Link>
        </div>
      </div>
    </div>
  );
}
