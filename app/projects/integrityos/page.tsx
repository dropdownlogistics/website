'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const CRIMSON = '#9B1B3C';
const CRIMSON_LIGHT = '#B82248';
const GOLD = '#D4A853';

interface FitRow { partnerLabel: string; partnerValue: string; iosValue: string; }
interface Deliverable { title: string; desc: string; }

const FIT_ROWS: FitRow[] = [
  { partnerLabel: 'Payment Platform', partnerValue: 'Real-Time Adjudication', iosValue: 'Decision Memory Capture' },
  { partnerLabel: 'Payment Platform', partnerValue: 'Provider Attestation', iosValue: 'Override Pattern Detection' },
  { partnerLabel: 'Payment Platform', partnerValue: 'Post-Payment Validation', iosValue: 'Audit-Ready Lineage' },
];

const DELIVERABLES: Deliverable[] = [
  { title: 'Instant approval reconstruction', desc: 'for any claim decision — who approved, on what basis, what followed' },
  { title: 'Override pattern detection', desc: 'across providers, payers, and programs — anomalies surface before audits' },
  { title: 'Audit-ready lineage', desc: 'that satisfies CMS, commercial payers, and self-insured employers' },
  { title: 'Compounding decision memory', desc: '— the system gets smarter about where risk concentrates over time' },
];

export default function IntegrityOSPage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      {/* HERO */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Governance Architecture</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Integrity<span style={{ color: CRIMSON_LIGHT }}>OS</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Governance infrastructure for real-time healthcare payments — turning every adjudication,
            attestation, and validation event into a queryable, auditable decision record.
          </p>
        </div>
      </FadeIn>

      {/* HERO STATEMENT */}
      <FadeIn delay={200}>
        <div style={{ background: `linear-gradient(135deg, ${CRIMSON} 0%, #7A1230 100%)`, borderRadius: 4, padding: '36px 40px', marginBottom: 56, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: '100%', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.12))' }} />
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', lineHeight: 1.55, color: '#F5F1EB', position: 'relative', zIndex: 1 }}>
            Modern payment platforms modernize the pipes. <strong style={{ fontWeight: 700 }}>IntegrityOS provides the governance memory layer on top.</strong> Every
            adjudication, attestation, and validation event becomes a queryable, auditable decision record — making
            real-time payments both fast <em>and</em> defensible.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={300}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 8 }}>The Innovation</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>
              Real-time eligibility, instant adjudication, 24–72 hour provider payment. Prior authorization replaced
              by post-payment validation. Claims processed in minutes, not months.
            </p>
          </div>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: CRIMSON_LIGHT, marginBottom: 8 }}>The Governance Gap</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>
              Post-payment validation only works if you can prove the oversight is real, patterned, and defensible.
              Decision history is scattered across systems, reconstructed manually during audits, and vulnerable to drift.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* ARCHITECTURE FIT */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: CRIMSON_LIGHT, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            Where IntegrityOS Fits
            <span style={{ flex: 1, height: 1, background: `${CRIMSON}44` }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {FIT_ROWS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center' }}>
                <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.06)', borderLeft: `3px solid ${GOLD}`, borderRadius: 4, padding: '18px 20px', textAlign: 'center' as const }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 6 }}>{row.partnerLabel}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#F5F1EB' }}>{row.partnerValue}</div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: 'rgba(245,241,235,0.2)' }}>→</span>
                <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.06)', borderLeft: `3px solid ${CRIMSON}`, borderRadius: 4, padding: '18px 20px', textAlign: 'center' as const }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 6 }}>IntegrityOS</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#F5F1EB' }}>{row.iosValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* DELIVERABLES */}
      <FadeIn delay={500}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: CRIMSON_LIGHT, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            What It Delivers
            <span style={{ flex: 1, height: 1, background: `${CRIMSON}44` }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {DELIVERABLES.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 20px', background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.04)', borderRadius: 4 }}>
                <div style={{ width: 6, height: 6, minWidth: 6, background: CRIMSON, borderRadius: '50%', marginTop: 7 }} />
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.88rem', lineHeight: 1.55, color: 'rgba(245,241,235,0.6)' }}>
                  <strong style={{ color: '#F5F1EB', fontWeight: 500 }}>{d.title}</strong> {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* BOTTOM LINE */}
      <FadeIn delay={600}>
        <div style={{ borderTop: `1px solid ${CRIMSON}44`, paddingTop: 28, marginBottom: 56 }}>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(245,241,235,0.55)' }}>
            <strong style={{ color: '#F5F1EB' }}>Real-time payment platforms eliminate the 45–90 day payment delay.</strong> IntegrityOS
            eliminates the governance ambiguity that follows. Together, they make real-time healthcare payments both
            fast and defensible.
          </p>
        </div>
      </FadeIn>

      {/* WATERMARK + FOOTER */}
      <FadeIn delay={700}>
        <div style={{ textAlign: 'center' as const, marginBottom: 24 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.12)' }}>
            Chaos → Structured → Automated
          </p>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            IntegrityOS · Governance Infrastructure for Real-Time Healthcare Payments · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
