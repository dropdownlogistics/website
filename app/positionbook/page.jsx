'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  green:       '#4A9E6B',
  greenDim:    'rgba(74,158,107,0.12)',
  greenLine:   'rgba(74,158,107,0.35)',
  amber:       '#C49A3C',
  steel:       '#6B7B8D',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const PB_URL = 'https://positionbook.vercel.app';

const heroStats = [
  { n: '241',   t: 'trades analyzed' },
  { n: '2.31R', t: 'avg R-multiple' },
  { n: '100%',  t: 'evidence-based' },
];

const tickerItems = [
  'Win Rate 30.5%',
  'Avg R 2.31',
  '241 trades',
  'Top ticker SNDK +$266',
  'Strategies: ORB / MA Bounce / Swing',
];

const views = [
  { label: 'Position Log',       t: 'Every trade logged. The dataset that makes everything else possible.' },
  { label: 'KPI Dashboard',      t: 'Win rate, R-multiple, expectancy, drawdown.' },
  { label: 'Strategy Breakdown', t: 'Which strategies print. Which strategies bleed.' },
  { label: 'Equity Curve',       t: 'Your real performance over time. No cherry-picking.' },
  { label: 'Trade Card',         t: 'Ledger-powered. Every trade becomes a governed, portable record.' },
  { label: 'Invite Only',        t: 'Not open to the public. Built for verified collaborators.' },
];

export default function PositionBookWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.green, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          D&amp;A ANALYTICS &middot; TRADE INTELLIGENCE
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Position</span><span style={{ color: C.green }}>Book</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          You are not losing. You are not tracking.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          PositionBook logs every trade, surfaces every pattern, and shows you exactly where your edge is and where it is not. Signal. Structure. Edge.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.green}`, borderRadius: 8, padding: '22px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.4rem', color: C.cream, lineHeight: 1, marginBottom: 10, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.t}</div>
            </div>
          ))}
        </div>

        <a href={PB_URL} target="_blank" rel="noopener noreferrer"
           style={{ display: 'inline-block', background: C.green, color: C.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>
          Request Access &rarr;
        </a>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE SIGNAL */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE SIGNAL</SLabel>
          <SHead>Every trade. Every pattern.</SHead>
          <SBody>
            Most traders know their win rate. Nobody knows their late-session win rate on gap-up momentum plays after a two-loss streak. PositionBook does.
          </SBody>

          <div style={{ marginTop: 32, background: C.navy, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: '18px 22px', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            {tickerItems.map((item, i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: C.green, letterSpacing: '0.05em' }}>
                {item}
                {i < tickerItems.length - 1 ? <span style={{ color: C.steel, marginLeft: 24 }}>&middot;</span> : null}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — SIX VIEWS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>SIX VIEWS</SLabel>
        <SHead>The full picture.</SHead>
        <SBody>
          Six surfaces on one dataset. Log once; every view updates. Structure is what turns a trade history into an edge.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 24 }}>
          {views.map((v) => (
            <div key={v.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.green}`, borderRadius: 6, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 8 }}>{v.label}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.6 }}>{v.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — D&A ANALYTICS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>D&amp;A ANALYTICS</SLabel>
          <SHead>BlindSpot&rsquo;s sibling.</SHead>
          <SBody>
            BlindSpot is for sports bettors. PositionBook is for traders. Same methodology &mdash; log everything, find the pattern, remove the blind spot. D&amp;A Analytics builds both. The architecture doesn&rsquo;t change. The data does.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 24 }}>
            {[
              { name: 'BlindSpot',    href: '/blindspot',   t: 'Sports betting behavioral analytics.', color: '#22C55E' },
              { name: 'PositionBook', href: '/positionbook', t: 'Trade intelligence. You are here.',   color: C.green  },
            ].map((s) => (
              <Link key={s.name} href={s.href} style={{ display: 'block', background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${s.color}`, borderRadius: 8, padding: '20px 22px', textDecoration: 'none' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: C.cream, marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.body, lineHeight: 1.6 }}>{s.t}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — LEDGER INTEGRATION */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>LEDGER INTEGRATION</SLabel>
        <SHead>Every trade, portable.</SHead>
        <SBody>
          PositionBook connects to Ledger. Every trade becomes a verified record. The performance you log here travels with you &mdash; not locked inside a broker dashboard.
        </SBody>

        <Link href="/ledger"
              style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '12px 26px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.border}` }}>
          Learn about Ledger &rarr;
        </Link>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            PositionBook &middot; A D&amp;A Analytics Product &middot; Dropdown Logistics
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Signal. Structure. Edge.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={PB_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>
            positionbook.vercel.app &#x2197;
          </a>
          <Link href="/positionbook" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            /positionbook
          </Link>
          <Link href="/brand/positionbook" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            Brand Kit &rarr;
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
