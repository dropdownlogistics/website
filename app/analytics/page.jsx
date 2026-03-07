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

function DashCard({ href, title, stat, statLabel, color, desc }) {
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
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: font.display, fontSize: 18, fontWeight: 600,
            color: color, marginBottom: 8,
          }}>{title}</div>
          <div style={{
            fontFamily: font.body, fontSize: 14, color: C.creamMid,
            lineHeight: 1.7,
          }}>{desc}</div>
        </div>
        {stat && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontFamily: font.mono, fontSize: 26, fontWeight: 700,
              color: color, lineHeight: 1,
            }}>{stat}</div>
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
              marginTop: 4,
            }}>{statLabel}</div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function AnalyticsLanding() {
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
        }}>DDL Analytics</div>
        <div style={{
          fontFamily: font.display, fontSize: 32, fontWeight: 700,
          color: C.cream, marginBottom: 12, letterSpacing: '-0.5px',
        }}>Analytics Dashboard</div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 620,
        }}>
          Data-driven analysis across writing, communication, and creative
          work. Every dashboard built from real data. Every finding traceable
          to source. If it generates data, DDL builds the system.
        </div>
      </div>

      {/* Primary Dashboards */}
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.creamDim, marginBottom: 14,
      }}>Communication &amp; Writing</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 12, marginBottom: 32,
      }}>
        <DashCard
          href="/analytics/grammarly"
          title="Grammarly Insights"
          stat="4.57M"
          statLabel="words"
          color={C.green}
          desc="47 weeks of writing analytics. Productivity, accuracy, vocabulary percentiles, and tone evolution."
        />
        <DashCard
          href="/analytics/tone"
          title="Tone Fingerprint"
          stat="87"
          statLabel="signature"
          color={C.blue}
          desc="Voice profile analysis. How Dave's writing tone compares to the average Grammarly user."
        />
      </div>

      {/* Communication Dashboards */}
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.creamDim, marginBottom: 14,
      }}>Communication Analytics</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 12, marginBottom: 32,
      }}>
        <DashCard
          href="/analytics/dexdash"
          title="DexDash"
          stat="86.3K"
          statLabel="messages"
          color={C.amber}
          desc="Communication analytics across 10 relationships. Hourly heatmaps, conversation depth, and pattern analysis."
        />
        <DashCard
          href="/analytics/callback-engine"
          title="Callback Engine"
          stat=""
          statLabel=""
          color={C.violet}
          desc="Pattern detection engine. Identifies recurring signals across communication data streams."
        />
      </div>

      {/* Creative & Behavioral */}
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.creamDim, marginBottom: 14,
      }}>Creative &amp; Behavioral</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 12, marginBottom: 32,
      }}>
        <DashCard
          href="/analytics/sonic-thread"
          title="Sonic Thread"
          stat=""
          statLabel=""
          color={C.crimson}
          desc="Audio pattern analytics. Listening habits mapped to emotional activation, BPM profiles, and genre evolution."
        />
        <DashCard
          href="/analytics/catnip-map"
          title="Catnip Map"
          stat=""
          statLabel=""
          color={C.green}
          desc="Behavioral analytics. What draws attention, what holds it, and what the patterns reveal about decision-making."
        />
        <DashCard
          href="/analytics/dimensional-map"
          title="Dimensional Map"
          stat=""
          statLabel=""
          color={C.blue}
          desc="Multi-dimensional analysis. Cross-domain signal mapping across behavioral and creative data."
        />
      </div>

      {/* Memoir Analytics */}
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.creamDim, marginBottom: 14,
      }}>Manuscript</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 12, marginBottom: 32,
      }}>
        <DashCard
          href="/analytics/memoir"
          title="Memoir Analysis"
          stat="52.6K"
          statLabel="words"
          color={C.violet}
          desc="Structural analysis of Little to Know Experience. 49 excerpts, narrative arcs, thematic clusters, character density, and findings."
        />
      </div>

      {/* Cross-links */}
      <div style={{
        paddingTop: 24, borderTop: `1px solid ${C.border}`,
        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
      }}>
        {[
          { href: '/blindspot', label: 'BlindSpot Hub', color: C.amber },
          { href: '/recaps', label: 'Year-End Recaps', color: C.amber },
          { href: '/mindframe/session', label: 'MindFrame Session', color: C.crimson },
        ].map((link, i) => (
          <Link key={i} href={link.href} style={{
            fontFamily: font.mono, fontSize: 11, color: C.creamDim,
            textDecoration: 'none', padding: '8px 14px',
            border: `1px solid ${C.border}`, borderRadius: 6,
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = link.color + '40'; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.creamDim; e.currentTarget.style.borderColor = C.border; }}
          >{link.label}</Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 32, fontFamily: font.body, fontSize: 14,
        fontStyle: 'italic', color: C.creamDim, textAlign: 'center',
      }}>
        Same engine. Different data.
      </div>
    </div>
  );
}
