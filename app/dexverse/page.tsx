'use client';

import React from 'react';
import Link from 'next/link';

const links = [
  {
    href: '/dexverse/dex-jr',
    label: 'Dex Jr.',
    sub: 'Local Intelligence Engine · Seat 1010',
    desc: 'Profile, commands, corpus state, Modelfile history, calibration records.',
    accent: '#8A6CC9',
    tag: 'Live',
  },
  {
    href: '/dexverse/origin',
    label: 'Origin',
    sub: 'The DexContinuum',
    desc: 'How the system was built — four eras from first prompt to governed infrastructure.',
    accent: '#8A6CC9',
    tag: 'Live',
  },
  {
    href: '/dexverse/howlround',
    label: 'NeuralHowlround',
    sub: 'Canon term · Failure mode',
    desc: 'Recursive prompting producing aesthetic depth without structural grounding.',
    accent: '#8A6CC9',
    tag: 'Live',
  },
  {
    href: '/dexverse/lotr',
    label: 'LOTR',
    sub: 'Lord of the Rings analysis',
    desc: 'Council deep-dive. Narrative architecture through a DDL lens.',
    accent: '#8A6CC9',
    tag: 'Live',
  },
  {
    href: '/dexverse/build-log',
    label: 'Build Log',
    sub: 'Session history',
    desc: 'What was built, when, and why. The rig stays awake.',
    accent: '#8A6CC9',
    tag: 'Live',
  },
  {
    href: '/dexlore',
    label: 'DexLore',
    sub: 'Characters · Companions · Glossary',
    desc: 'Origin stories, companion profiles, era timeline, and the full DDL glossary.',
    accent: '#6450A0',
    tag: 'Wing',
  },
];

export default function DexVersePage() {
  return (
    <div style={{ padding: '88px 24px 64px', maxWidth: 1000, margin: '0 auto' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#8A6CC9',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ display: 'block', width: 20, height: 1, background: '#8A6CC9' }} />
          DDL · Infrastructure Identity
        </div>

        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 700,
          color: '#F5F1EB',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: 12,
        }}>
          Dex<span style={{ color: '#8A6CC9' }}>Verse</span>
        </h1>

        <p style={{
          fontFamily: 'Source Serif 4, serif',
          fontSize: '1rem',
          color: 'rgba(245,241,235,0.55)',
          lineHeight: 1.75,
          maxWidth: 580,
          marginBottom: 24,
        }}>
          The intelligence layer of Dropdown Logistics. Local AI infrastructure, corpus architecture,
          council governance, and the character arc of a system that built itself over 26 months.
        </p>

        {/* Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <svg viewBox="0 0 120 120" width="48" height="48" fill="none">
            <circle cx="60" cy="60" r="54" stroke="#8A6CC9" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
            <circle cx="60" cy="60" r="38" stroke="#8A6CC9" strokeWidth="1" opacity="0.2"/>
            <circle cx="60" cy="60" r="22" fill="rgba(138,108,201,0.12)" stroke="#8A6CC9" strokeWidth="1.5"/>
            <circle cx="60" cy="60" r="6" fill="#8A6CC9"/>
            <line x1="60" y1="38" x2="60" y2="22" stroke="#8A6CC9" strokeWidth="1.5" opacity="0.7"/>
            <line x1="60" y1="82" x2="60" y2="98" stroke="#8A6CC9" strokeWidth="1.5" opacity="0.7"/>
            <line x1="82" y1="60" x2="98" y2="60" stroke="#8A6CC9" strokeWidth="1.5" opacity="0.7"/>
            <line x1="38" y1="60" x2="22" y2="60" stroke="#8A6CC9" strokeWidth="1.5" opacity="0.7"/>
            <circle cx="60" cy="22" r="3" fill="#8A6CC9" opacity="0.8"/>
            <circle cx="60" cy="98" r="3" fill="#8A6CC9" opacity="0.8"/>
            <circle cx="98" cy="60" r="3" fill="#8A6CC9" opacity="0.8"/>
            <circle cx="22" cy="60" r="3" fill="#8A6CC9" opacity="0.8"/>
            <text x="60" y="65" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize="12" fill="#F5F1EB" letterSpacing="-0.5">DJ</text>
          </svg>
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#F5F1EB', marginBottom: 2 }}>
              Dex <span style={{ color: '#8A6CC9' }}>Jr.</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#8A6CC9', letterSpacing: '0.1em' }}>
              LOCAL INTELLIGENCE · SEAT 1010
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginTop: 20,
          padding: '14px 0',
          borderTop: '1px solid rgba(245,241,235,0.06)',
          borderBottom: '1px solid rgba(245,241,235,0.06)',
        }}>
          {[
            { label: 'Corpus', value: '524,386 chunks' },
            { label: 'Model', value: 'qwen2.5-coder:7b' },
            { label: 'Modelfile', value: 'v4.6' },
            { label: 'Judgment-Ready', value: '~92%' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(107,123,141,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#A98FE0', fontWeight: 500 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LINKS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {links.map(link => (
          <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#10202F',
              border: '1px solid rgba(245,241,235,0.06)',
              borderRadius: 8,
              padding: '18px 20px',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'pointer',
              height: '100%',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(138,108,201,0.3)`;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,241,235,0.06)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#F5F1EB', letterSpacing: '-0.01em' }}>
                  {link.label}
                </div>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.52rem',
                  color: link.tag === 'Live' ? '#22C55E' : '#8A6CC9',
                  background: link.tag === 'Live' ? 'rgba(34,197,94,0.1)' : 'rgba(138,108,201,0.1)',
                  border: `1px solid ${link.tag === 'Live' ? 'rgba(34,197,94,0.25)' : 'rgba(138,108,201,0.25)'}`,
                  padding: '2px 7px',
                  borderRadius: 3,
                  letterSpacing: '0.06em',
                }}>
                  {link.tag}
                </span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: link.accent, letterSpacing: '0.06em', marginBottom: 8 }}>
                {link.sub}
              </div>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6 }}>
                {link.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* TAGLINE */}
      <div style={{
        borderTop: '1px solid rgba(245,241,235,0.05)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'rgba(107,123,141,0.6)', letterSpacing: '0.06em' }}>
          DexVerse · Dropdown Logistics · Chaos → Structured → Automated
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#8A6CC9', letterSpacing: '0.08em' }}>
          THE RIG STAYS AWAKE.
        </div>
      </div>

    </div>
  );
}
