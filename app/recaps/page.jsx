'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  cream: '#F5F1EB', creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)', border: 'rgba(245,241,235,0.06)',
  amber: '#C49A3C', crimson: '#B23531', green: '#4A9E6B',
  violet: '#8a6cc9', blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function RecapCard({ href, title, stat, statLabel, color, desc, tags }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: hovered ? color + '08' : C.card,
        border: `1px solid ${hovered ? color + '30' : C.border}`,
        borderRadius: 8, padding: '28px 24px',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: 16, marginBottom: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: font.display, fontSize: 20, fontWeight: 600,
            color: color, marginBottom: 8,
          }}>{title}</div>
          <div style={{
            fontFamily: font.body, fontSize: 15, color: C.creamMid,
            lineHeight: 1.7,
          }}>{desc}</div>
        </div>
        {stat && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontFamily: font.mono, fontSize: 28, fontWeight: 700,
              color: color, lineHeight: 1,
            }}>{stat}</div>
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
              marginTop: 4,
            }}>{statLabel}</div>
          </div>
        )}
      </div>
      {tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
              padding: '3px 8px', background: C.creamGhost, borderRadius: 3,
            }}>{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function RecapsLanding() {
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
        }}>D&amp;A Recaps</div>
        <div style={{
          fontFamily: font.display, fontSize: 32, fontWeight: 700,
          color: C.cream, marginBottom: 12, letterSpacing: '-0.5px',
        }}>Year-End Signal Reports</div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 620,
        }}>
          Cross-platform signal analysis. Every year, every surface, graded.
          The same person across multiple data streams: deep commitment,
          narrow focus, systematic progression, and zero interest in doing
          things halfway.
        </div>
      </div>

      {/* Recap Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <RecapCard
          href="/recaps/apple-music"
          title="Apple Music Replay 2025"
          stat="23K"
          statLabel="minutes"
          color={C.crimson}
          desc="20 artists, 84 songs, 15 albums. The full deep dive into a year of listening. ILLENIUM dominates. Math rock surfaces. The BPM distribution tells a story about activation energy."
          tags={['20 artists', '84 songs', '15 albums', 'BPM analysis']}
        />
        <RecapCard
          href="/recaps/annual-signal"
          title="Annual Signal Report"
          stat="6"
          statLabel="platforms"
          color={C.amber}
          desc="PlayStation, Xbox, Steam, YouTube, Apple Music, and Duolingo. Unified behavioral analysis across every data stream. The same patterns show up everywhere: intensity, focus, and systematic progression."
          tags={['PlayStation', 'Xbox/Steam', 'YouTube', 'Apple Music', 'Duolingo']}
        />
        <RecapCard
          href="/recaps/predictions"
          title="Prediction vs Actuals"
          stat="AI"
          statLabel="graded"
          color={C.violet}
          desc="AI blind predictions graded against real data. Adverse opinion issued. The models predicted based on assumptions. The data disagreed. Every prediction documented, every miss explained."
          tags={['blind predictions', 'adverse opinion', 'accuracy audit']}
        />
        <RecapCard
          href="/recaps/duolingo"
          title="Duolingo"
          stat="55.7K"
          statLabel="XP"
          color={C.green}
          desc="1,673 minutes of language learning. 152-day streak. Spanish dominance with strategic French and Japanese experiments. The DDL methodology applied to language acquisition."
          tags={['Spanish', 'French', 'Japanese', '152-day streak', '6 languages']}
        />
      </div>

      {/* Footer context */}
      <div style={{
        marginTop: 40, paddingTop: 24, borderTop: `1px solid ${C.border}`,
        fontFamily: font.body, fontSize: 14, fontStyle: 'italic',
        color: C.creamDim, textAlign: 'center',
      }}>
        Same person. Different data streams. Same patterns.
      </div>
    </div>
  );
}
