'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function BlindSpotHub() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --navy:#0D1B2A;--card:#10202f;--cream:#F5F1EB;
          --amber:#C49A3C;--amber-dim:rgba(196,154,60,0.12);--amber-border:rgba(196,154,60,0.25);
          --green:#22C55E;--green-dim:rgba(34,197,94,0.1);--green-border:rgba(34,197,94,0.25);
          --steel:#6B7B8D;--slate:#4A5568;
          --border:rgba(245,241,235,0.06);
        }
        body{font-family:'Space Grotesk',sans-serif;background:var(--navy);color:var(--cream);min-height:100vh}
        a{color:inherit;text-decoration:none}
        .divider{border:none;border-top:1px solid var(--border);max-width:900px;margin:0 auto}
        @media(max-width:768px){
          .modules-grid{grid-template-columns:1fr !important}
          .hero-ctas{flex-direction:column}
          .hero-ctas a{text-align:center;justify-content:center}
        }
      `}</style>

      <BackButton />

      {/* ── HERO — blindspot.bet ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 64px' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, background: 'var(--card)', borderRadius: 8, border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--green)', letterSpacing: '0.15em' }}>
            D&amp;A ANALYTICS &middot; BLINDSPOT
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
          Sports betting analytics.<br />
          <span style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--green)' }}>Finally.</span>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--green)', lineHeight: 1.8, maxWidth: 580, marginBottom: 20, padding: 20, background: 'var(--card)', border: '1px solid var(--green-border)', borderRadius: 8, borderLeft: '3px solid var(--green)' }}>
          signal &#x2192; structure &#x2192; edge<br />
          Track every bet. Reveal every pattern. Inform every decision with live context.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>
          The house doesn&rsquo;t have better odds. It has better data. blindspot.bet is the data layer built for the other side of that equation.
        </div>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://blindspot.bet" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--green)', color: 'var(--navy)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            blindspot.bet &#x2197;
          </a>
          <Link href="/blindspot/betting" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--steel)', padding: '12px 20px', borderRadius: 6, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Full Product Page &#x2192;
          </Link>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--slate)', marginTop: 16 }}>
          EARLY ACCESS OPEN &middot; SCHEMA IN PROGRESS &middot; FIRST BUILD SHIPS SOON
        </div>
      </div>

      <div className="divider" />

      {/* ── OTHER MODULES ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--amber)', letterSpacing: '0.2em', marginBottom: 28 }}>
          MORE FROM BLINDSPOT
        </div>

        <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {[
            { label: 'Trading', tag: 'Live', href: '/blindspot/trading', desc: 'Trading dashboard. Daily setups, exits, and market context from Alex.' },
            { label: 'Steam', tag: 'Analytics', href: '/blindspot/steam', desc: 'Steam library analytics. Playtime patterns, game catalog, behavioral splits.' },
            { label: 'Campaign', tag: 'Analytics', href: '/blindspot/campaign', desc: 'D&D campaign analytics. Session data, encounter outcomes, party performance.' },
            { label: 'Backtest', tag: 'Historical', href: '/blindspot/backtest', desc: 'Historical validation engine. Test strategies against past data.' },
            { label: 'LLM Setup', tag: 'Guide', href: '/blindspot/llm', desc: 'Local LLM setup guide. Hardware, models, Ollama, ChromaDB.' },
          ].map((m, i) => (
            <Link key={i} href={m.href} style={{
              display: 'block', background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '20px 20px 18px', textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amber-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>{m.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--amber)', background: 'var(--amber-dim)', padding: '3px 7px', borderRadius: 3, letterSpacing: '0.08em' }}>{m.tag}</div>
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.8rem', color: 'rgba(245,241,235,0.4)', lineHeight: 1.6 }}>{m.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', maxWidth: 900, margin: '0 auto', padding: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--steel)' }}>
          BLINDSPOT &middot; D&amp;A ANALYTICS &middot; DROPDOWN LOGISTICS
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--slate)' }}>
          Chaos &#x2192; Structured &#x2192; Automated
        </div>
      </div>
    </>
  );
}
