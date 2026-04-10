'use client';

import { useState } from 'react';

const NODES = [
  {
    id: 'governance',
    label: 'Governance',
    brand: 'AuditForge',
    color: '#B23531',
    tracks: 'controls, risks, frameworks',
    removes: 'compliance ambiguity',
    generates: 'audit packages',
  },
  {
    id: 'signal',
    label: 'Signal',
    brand: 'BlindSpot',
    color: '#4A9E6B',
    tracks: 'bets, behavior, edge',
    removes: 'decision blindness',
    generates: 'visibility into performance',
  },
  {
    id: 'memory',
    label: 'Memory',
    brand: 'Knowledge Vault',
    color: '#2C7A7B',
    tracks: 'artifacts, corpus, retrieval',
    removes: 'context loss',
    generates: 'institutional recall',
  },
  {
    id: 'structure',
    label: 'Structure',
    brand: 'DDL Core',
    color: '#B23531',
    tracks: 'standards, schema, canon',
    removes: 'inconsistency',
    generates: 'consistent systems',
  },
  {
    id: 'relationships',
    label: 'Relationships',
    brand: 'Excelligence',
    color: '#D4A843',
    tracks: 'graph, edges, dependencies',
    removes: 'isolation',
    generates: 'connected knowledge',
  },
];

// 5 equally spaced positions around a 560x560 orbital, radius 220.
// Node boxes are 88x88, so each (x,y) is the top-left for an absolutely
// positioned element centered on the orbit ring.
const POSITIONS = [
  { x: 236, y: 16 },   // 0deg  (top)    Governance
  { x: 445, y: 168 },  // 72deg (UR)     Signal
  { x: 365, y: 414 },  // 144deg (LR)    Memory
  { x: 107, y: 414 },  // 216deg (LL)    Structure
  { x: 27,  y: 168 },  // 288deg (UL)    Relationships
];

export default function SystemStackPage() {
  const [active, setActive] = useState(() => new Set());

  const toggle = (id) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allActive = active.size === NODES.length;

  return (
    <>
      <style>{`
        @keyframes ss-fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ss-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ss-nodePop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ss-ringSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ss-ringSpinReverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes ss-stampGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(178,53,49,0.35)); }
          50%      { filter: drop-shadow(0 0 22px rgba(178,53,49,0.65)); }
        }
        @keyframes ss-badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,158,107,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(74,158,107,0); }
        }

        .ss-root {
          min-height: 100vh;
          background: #0D1B2A;
          color: #F5F1EB;
          font-family: 'Source Serif 4', Georgia, serif;
          position: relative;
          overflow-x: hidden;
        }
        .ss-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(178,53,49,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(178,53,49,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        /* HERO */
        .ss-hero {
          position: relative;
          padding: 56px 24px 24px;
          text-align: center;
          animation: ss-fadeUp 0.7s ease 0.1s both;
        }
        .ss-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: rgba(178,53,49,0.85);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .ss-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 5vw, 4rem);
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 14px;
        }
        .ss-title span { color: #B23531; }
        .ss-subtext {
          font-family: 'Source Serif 4', serif;
          font-style: italic;
          font-size: 1.02rem;
          color: rgba(245,241,235,0.6);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* ORBITAL */
        .ss-orbital-wrap {
          position: relative;
          margin: 32px auto 0;
          width: 560px;
          height: 560px;
          animation: ss-fadeIn 0.9s ease 0.35s both;
        }
        .ss-ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(245,241,235,0.05);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .ss-ring-static-1 { width: 320px; height: 320px; }
        .ss-ring-static-2 { width: 440px; height: 440px; border-color: rgba(245,241,235,0.04); }
        .ss-ring-spin {
          width: 480px; height: 480px;
          border: 1px solid transparent;
          border-top-color: rgba(178,53,49,0.22);
          border-right-color: rgba(178,53,49,0.10);
          animation: ss-ringSpin 18s linear infinite;
        }
        .ss-ring-spin-outer {
          width: 540px; height: 540px;
          border: 1px solid transparent;
          border-bottom-color: rgba(178,53,49,0.14);
          border-left-color: rgba(178,53,49,0.07);
          animation: ss-ringSpinReverse 28s linear infinite;
        }

        /* STAMP */
        .ss-stamp {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 132px;
          height: 132px;
          border-radius: 50%;
          background: #0D1B2A;
          border: 2px solid #B23531;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: ss-stampGlow 4s ease-in-out infinite;
          z-index: 4;
        }
        .ss-stamp::before {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 1px dashed rgba(178,53,49,0.5);
        }
        .ss-stamp-mark {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 2.5rem;
          color: #F5F1EB;
          letter-spacing: -0.06em;
          line-height: 1;
        }
        .ss-stamp-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.48rem;
          color: rgba(245,241,235,0.55);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* NODES */
        .ss-node {
          position: absolute;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #10202f;
          border: 1.5px solid rgba(245,241,235,0.09);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          opacity: 0;
          animation: ss-nodePop 0.5s ease forwards;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
        }
        .ss-node:hover {
          transform: scale(1.06);
        }
        .ss-node.active {
          box-shadow: 0 0 24px rgba(var(--node-rgb), 0.35);
          transform: scale(1.04);
        }
        .ss-node-label {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: -0.01em;
          color: #F5F1EB;
          margin-bottom: 4px;
        }
        .ss-node-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .ss-node-brand {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.52rem;
          color: rgba(245,241,235,0.4);
          letter-spacing: 0.06em;
          white-space: nowrap;
          pointer-events: none;
        }
        .ss-node.active .ss-node-brand {
          color: rgba(245,241,235,0.75);
        }

        /* DETAIL CARDS */
        .ss-cards {
          max-width: 1100px;
          margin: 56px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
        }
        .ss-card {
          background: #10202f;
          border: 1px solid rgba(245,241,235,0.06);
          border-radius: 10px;
          padding: 22px 22px 20px;
          position: relative;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.15s;
          overflow: hidden;
        }
        .ss-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--card-color);
          opacity: 0.35;
          transition: opacity 0.25s;
        }
        .ss-card:hover {
          border-color: var(--card-color);
          transform: translateY(-2px);
        }
        .ss-card.active::before { opacity: 1; }
        .ss-card.active {
          border-color: var(--card-color);
        }
        .ss-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .ss-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
        }
        .ss-card-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.48rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          background: rgba(245,241,235,0.04);
          color: rgba(245,241,235,0.4);
          border: 1px solid rgba(245,241,235,0.08);
        }
        .ss-card.active .ss-card-status {
          background: rgba(var(--card-rgb), 0.12);
          color: var(--card-color);
          border-color: rgba(var(--card-rgb), 0.35);
        }
        .ss-card-brand {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          color: var(--card-color);
          letter-spacing: 0.06em;
          margin-bottom: 14px;
        }
        .ss-card-detail {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
          margin-top: 0;
        }
        .ss-card.active .ss-card-detail {
          max-height: 260px;
          opacity: 1;
          margin-top: 6px;
        }
        .ss-card-row {
          display: grid;
          grid-template-columns: 78px 1fr;
          gap: 10px;
          padding: 8px 0;
          border-top: 1px solid rgba(245,241,235,0.05);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          line-height: 1.5;
        }
        .ss-card-row:first-child { border-top: none; }
        .ss-card-row-label {
          color: rgba(245,241,235,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.52rem;
          padding-top: 2px;
        }
        .ss-card-row-value {
          color: rgba(245,241,235,0.82);
          font-family: 'Source Serif 4', serif;
          font-style: italic;
          font-size: 0.78rem;
        }

        /* BADGE */
        .ss-badge-wrap {
          display: flex;
          justify-content: center;
          margin: 48px auto 0;
          min-height: 60px;
        }
        .ss-badge {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 28px;
          background: rgba(74,158,107,0.08);
          border: 1px solid rgba(74,158,107,0.5);
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: #4A9E6B;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          animation: ss-fadeUp 0.5s ease both, ss-badgePulse 2.4s ease-in-out 0.6s infinite;
        }
        .ss-badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #4A9E6B;
          box-shadow: 0 0 12px rgba(74,158,107,0.9);
        }

        /* BOTTOM LINE */
        .ss-bottom {
          max-width: 780px;
          margin: 64px auto 0;
          padding: 48px 24px 80px;
          text-align: center;
          border-top: 1px solid rgba(245,241,235,0.06);
        }
        .ss-bottom-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          color: rgba(178,53,49,0.7);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin: 48px 0 18px;
        }
        .ss-bottom-line {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          font-size: clamp(1.15rem, 2.4vw, 1.55rem);
          line-height: 1.4;
          color: #F5F1EB;
          letter-spacing: -0.01em;
        }
        .ss-bottom-line em {
          font-style: normal;
          color: #B23531;
        }

        /* MOBILE: keep the 560px layout box so absolute node positions
           stay correct, then scale the whole orbital down and collapse
           the resulting vertical whitespace with negative margin. */
        @media (max-width: 720px) {
          .ss-orbital-wrap {
            transform: scale(0.6);
            transform-origin: center center;
            margin: -112px auto;
          }
          .ss-hero { padding: 40px 20px 8px; }
          .ss-cards { margin-top: 24px; }
        }
        @media (max-width: 420px) {
          .ss-orbital-wrap {
            transform: scale(0.5);
            margin: -140px auto;
          }
        }
      `}</style>

      <div className="ss-root">
        <div className="ss-grid-bg" />

        {/* HERO */}
        <section className="ss-hero">
          <div className="ss-eyebrow">Five domains · One deterministic system</div>
          <h1 className="ss-title">
            The System <span>Stack</span>
          </h1>
          <p className="ss-subtext">
            Each domain below runs on governed structure. Together, they eliminate guesswork.
          </p>

          {/* ORBITAL */}
          <div className="ss-orbital-wrap">
            <div className="ss-ring ss-ring-static-1" />
            <div className="ss-ring ss-ring-static-2" />
            <div className="ss-ring ss-ring-spin" />
            <div className="ss-ring ss-ring-spin-outer" />

            <div className="ss-stamp">
              <span className="ss-stamp-mark">DD</span>
              <span className="ss-stamp-sub">System Core</span>
            </div>

            {NODES.map((node, i) => {
              const pos = POSITIONS[i];
              const isActive = active.has(node.id);
              const rgb = hexToRgb(node.color);
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => toggle(node.id)}
                  className={`ss-node ${isActive ? 'active' : ''}`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    animationDelay: `${0.55 + i * 0.12}s`,
                    borderColor: isActive ? node.color : 'rgba(245,241,235,0.09)',
                    ['--node-rgb']: rgb,
                  }}
                  aria-pressed={isActive}
                  aria-label={`${node.label} — ${node.brand}`}
                >
                  <span className="ss-node-label">{node.label}</span>
                  <span
                    className="ss-node-dot"
                    style={{
                      background: node.color,
                      boxShadow: isActive ? `0 0 10px ${node.color}` : 'none',
                    }}
                  />
                  <span className="ss-node-brand">{node.brand}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* BADGE — only when all 5 active */}
        <div className="ss-badge-wrap">
          {allActive && (
            <div className="ss-badge" role="status">
              <span className="ss-badge-dot" />
              System State: Deterministic
            </div>
          )}
        </div>

        {/* DETAIL CARDS */}
        <div className="ss-cards">
          {NODES.map((node) => {
            const isActive = active.has(node.id);
            const rgb = hexToRgb(node.color);
            return (
              <div
                key={node.id}
                onClick={() => toggle(node.id)}
                className={`ss-card ${isActive ? 'active' : ''}`}
                style={{ ['--card-color']: node.color, ['--card-rgb']: rgb }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(node.id);
                  }
                }}
              >
                <div className="ss-card-header">
                  <div className="ss-card-title">{node.label}</div>
                  <div className="ss-card-status">
                    {isActive ? 'Active' : 'Tap to expand'}
                  </div>
                </div>
                <div className="ss-card-brand">{node.brand}</div>

                <div className="ss-card-detail">
                  <div className="ss-card-row">
                    <div className="ss-card-row-label">Tracks</div>
                    <div className="ss-card-row-value">{node.tracks}</div>
                  </div>
                  <div className="ss-card-row">
                    <div className="ss-card-row-label">Removes</div>
                    <div className="ss-card-row-value">{node.removes}</div>
                  </div>
                  <div className="ss-card-row">
                    <div className="ss-card-row-label">Generates</div>
                    <div className="ss-card-row-value">{node.generates}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM LINE */}
        <div className="ss-bottom">
          <div className="ss-bottom-eyebrow">The Point</div>
          <p className="ss-bottom-line">
            This isn{"\u2019"}t AI assistance. This is a system where{' '}
            <em>AI has nothing left to guess.</em>
          </p>
        </div>
      </div>
    </>
  );
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
