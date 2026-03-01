'use client';

import { useEffect, useState, CSSProperties } from 'react';
import Link from 'next/link';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(18px)', transition: 'opacity 0.5s ease, transform 0.5s ease', ...style }}>{children}</div>;
}

interface Chapter { slug: string; title: string; desc: string; accent: string; }

const CHAPTERS: Chapter[] = [
  { slug: 'dashboard', title: 'Dashboard', desc: 'The analytical control room — metrics, patterns, and structural overview of the full manuscript.', accent: '#2BB5A4' },
  { slug: 'architecture', title: 'Architecture', desc: 'How the memoir was built — narrative engineering, braid structure, and the systems behind the story.', accent: '#5B8DEF' },
  { slug: 'braid', title: 'The Braid', desc: 'Time, theme, and tension woven together — the structural logic of how chapters interlock.', accent: '#B388FF' },
  { slug: 'reading-room', title: 'Reading Room', desc: 'Selected excerpts — the prose itself, presented in its intended reading order.', accent: '#F0C040' },
  { slug: 'map-of-13j', title: 'Map of 13J', desc: 'The apartment where it all happened — a spatial map of memory, breakdown, and recovery.', accent: '#FF6B8A' },
  { slug: 'mask-and-cracks', title: 'Mask & Cracks', desc: 'The performance of being fine — and the moments the performance failed.', accent: '#E05A47' },
  { slug: 'quiet-and-chase', title: 'Quiet & Chase', desc: 'The two engines of the book — the silence alcohol provided and the urgency that replaced it.', accent: '#00D4E5' },
  { slug: 'false-summit', title: 'False Summit', desc: 'Every time it looked like the top — and wasn\'t. The pattern of almost-recovery.', accent: '#FFB300' },
  { slug: 'reckoning', title: 'Reckoning', desc: 'The moment the math stopped working — when the cost of the counterfeit exceeded the cost of the real.', accent: '#FF6B6B' },
  { slug: 'spiral-and-turning', title: 'Spiral & Turning', desc: 'The descent and the pivot — where breakdown becomes the beginning of architecture.', accent: '#00D97E' },
];

const META_PAGES = [
  { href: '/memoir/the-protocol', label: 'The Protocol', desc: 'How the memoir was governed — voice specs, risk registers, and publishing operations.' },
];

export default function MemoirHub() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ padding: '100px 24px 48px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B23531', marginBottom: 12 }}>DDL Story</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 12 }}>
            Little to Know <span style={{ color: 'rgba(245,241,235,0.35)' }}>Experience</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.1rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6, maxWidth: 600 }}>
            A memoir about the silence alcohol provided, the architecture that replaced it, and the
            reasonable assurance that life doesn&rsquo;t require a governor to hold together.
          </p>
        </div>
      </FadeIn>

      {/* Meta pages */}
      <FadeIn delay={100}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
          {META_PAGES.map(m => (
            <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '18px 20px', transition: 'all 0.2s', cursor: 'pointer', maxWidth: 360 }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = 'rgba(178,53,49,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(245,241,235,0.08)'; }}
              >
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#F5F1EB', marginBottom: 4 }}>{m.label}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.4)', lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* Chapters */}
      <FadeIn delay={200}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B23531', marginBottom: 16 }}>Chapters & Analysis</div>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {CHAPTERS.map((ch, i) => (
          <FadeIn key={ch.slug} delay={250 + i * 50}>
            <Link href={`/memoir/${ch.slug}`} style={{ textDecoration: 'none', display: 'block' }}
              onMouseEnter={() => setHovered(ch.slug)} onMouseLeave={() => setHovered(null)}>
              <div style={{
                background: hovered === ch.slug ? 'rgba(245,241,235,0.06)' : 'rgba(245,241,235,0.03)',
                border: `1px solid ${hovered === ch.slug ? `${ch.accent}44` : 'rgba(245,241,235,0.06)'}`,
                borderLeft: `3px solid ${ch.accent}`,
                borderRadius: 8, padding: '20px 18px',
                transition: 'all 0.2s', cursor: 'pointer',
                transform: hovered === ch.slug ? 'translateY(-2px)' : 'translateY(0)',
                minHeight: 100,
              }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: '#F5F1EB', marginBottom: 6 }}>{ch.title}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.45)', lineHeight: 1.55 }}>{ch.desc}</p>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: hovered === ch.slug ? ch.accent : 'rgba(245,241,235,0.15)', marginTop: 10, transition: 'color 0.2s' }}>Read →</div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={800}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.06)', marginTop: 48, paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.2)', letterSpacing: '0.08em' }}>
            Little to Know Experience · 52,595 words · 50 excerpts · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
