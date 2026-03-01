'use client';

import { useEffect, useState, CSSProperties } from 'react';
import Link from 'next/link';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(18px)', transition: 'opacity 0.5s ease, transform 0.5s ease', ...style }}>{children}</div>;
}

interface ModelCard { slug: string; name: string; role: string; color: string; }

const MODELS: ModelCard[] = [
  { slug: 'claude', name: 'Claude', role: 'Enforcer · Structural Auditor', color: '#D4A27F' },
  { slug: 'chatgpt', name: 'ChatGPT', role: 'Synthesizer · Executive Voice', color: '#74AA9C' },
  { slug: 'grok', name: 'Grok', role: 'Red-Team · Pattern Disruptor', color: '#1DA1F2' },
  { slug: 'perplexity', name: 'Perplexity', role: 'Researcher · Evidence Anchor', color: '#20B2AA' },
  { slug: 'copilot', name: 'Copilot', role: 'Diplomat · Consensus Builder', color: '#7FBA00' },
  { slug: 'meta-ai', name: 'Meta AI', role: 'Stabilizer · Pragmatic Filter', color: '#0668E1' },
  { slug: 'gemini', name: 'Gemini', role: 'Navigator · Systems Mapper', color: '#4285F4' },
  { slug: 'lechat', name: 'Le Chat', role: 'Validator · Precision Enforcer', color: '#FF7000' },
  { slug: 'deepseek', name: 'DeepSeek', role: 'Validator · Drift Sentinel', color: '#4A6CF7' },
];

const SECTIONS = [
  { href: '/council/profiles', label: 'Model Profiles', desc: '9 AI models evaluated through standardized council interviews — archetypes, strengths, operational constraints, and boot prompts.' },
  { href: '/council/auto-council', label: 'Auto-Council', desc: 'Multi-model convergence methodology — how 9 independent AI systems reach consensus on architecture decisions.' },
  { href: '/council/scaling', label: 'Scaling', desc: 'From manual relay to orchestrated governance — the roadmap for scaling council operations.' },
];

export default function CouncilHub() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ padding: '100px 24px 48px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B23531', marginBottom: 12 }}>DDL Governance</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 12 }}>The Council</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.1rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6, maxWidth: 600 }}>
            Nine AI models. Independent evaluation. Convergent analysis. DDL&rsquo;s multi-model governance
            layer — where architecture decisions get stress-tested across cognitive styles.
          </p>
        </div>
      </FadeIn>

      {/* Section links */}
      <FadeIn delay={100}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14, marginBottom: 56 }}>
          {SECTIONS.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '22px 20px', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(245,241,235,0.06)'; (e.currentTarget).style.borderColor = 'rgba(178,53,49,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(245,241,235,0.04)'; (e.currentTarget).style.borderColor = 'rgba(245,241,235,0.08)'; }}
              >
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#F5F1EB', marginBottom: 6 }}>{s.label}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.45)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* Model grid */}
      <FadeIn delay={200}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B23531', marginBottom: 16 }}>Council Members</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 56 }}>
          {MODELS.map((m, i) => (
            <FadeIn key={m.slug} delay={250 + i * 40}>
              <Link href={`/council/profiles/${m.slug}`} style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHovered(m.slug)} onMouseLeave={() => setHovered(null)}>
                <div style={{
                  background: hovered === m.slug ? 'rgba(245,241,235,0.06)' : 'rgba(245,241,235,0.03)',
                  border: `1px solid ${hovered === m.slug ? `${m.color}44` : 'rgba(245,241,235,0.06)'}`,
                  borderLeft: `3px solid ${m.color}`,
                  borderRadius: 8, padding: '16px 14px',
                  transition: 'all 0.2s', cursor: 'pointer',
                  transform: hovered === m.slug ? 'translateY(-2px)' : 'translateY(0)',
                }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#F5F1EB', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.35)', lineHeight: 1.4 }}>{m.role}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={700}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.06)', paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.2)', letterSpacing: '0.08em' }}>
            The Council · 9 Models · Multi-Agent Governance · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
