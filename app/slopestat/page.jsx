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
  amber:       '#C49A3C',
  amberDim:    'rgba(196,154,60,0.12)',
  amberLine:   'rgba(196,154,60,0.35)',
  green:       '#4A9E6B',
  greenLine:   'rgba(74,158,107,0.35)',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SS_SIGNUP = 'https://slopestat.vercel.app/sign-up';
const SS_URL    = 'https://slopestat.vercel.app';

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children, style }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const heroStats = [
  { n: '3',        t: 'Verification Tiers' },
  { n: '4',        t: 'Boards (sample quiver)' },
  { n: '64.9 mph', t: 'Peak Speed (sample)' },
];

const steps = [
  { n: '01', label: 'Add your quiver',        t: 'Make, model, length, flex. One entry per board. Takes under a minute.' },
  { n: '02', label: 'Log your sessions',      t: 'Date, mountain, peak speed, conditions, board used. Manual today, GPS later.' },
  { n: '03', label: 'Your card builds itself', t: 'Every session stacks. Your quiver, your mountains, your speeds — one shareable card.' },
];

const tiers = [
  {
    label: 'SELF-REPORTED',
    accent: C.steel,
    accentLine: C.steelLine,
    t: 'Memory, eyeball, best guess. The starting line.',
    tag: null,
  },
  {
    label: 'HIGH CONFIDENCE',
    accent: C.amber,
    accentLine: C.amberLine,
    t: 'Strava screenshot, lift ticket, a buddy who saw it. Declared, corroborated.',
    tag: null,
  },
  {
    label: 'GPS VERIFIED',
    accent: C.green,
    accentLine: C.greenLine,
    t: 'Direct device integration. Device-signed speeds. Reserved for V2.',
    tag: 'Coming V2',
  },
];

const siblings = [
  {
    name: 'BlindSpot',
    href: '/blindspot',
    tag: 'D\u0026A ANALYTICS \u00b7 LIVE',
    t: 'Sports betting analytics. Pattern recognition for the other side of the equation.',
  },
  {
    name: 'PositionBook',
    href: '/positionbook',
    tag: 'D\u0026A ANALYTICS \u00b7 INVITE ONLY',
    t: 'Trading analytics. Every position logged, every exit tagged.',
  },
];

export default function SlopeStatWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.amber, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          D&amp;A ANALYTICS &middot; RIDER CARD
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Slope</span><span style={{ color: C.amber }}>Stat</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Your rides. Your boards. Your card.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          SlopeStat builds your Rider Card &mdash; a verified, shareable record of every session on the mountain. Log your boards, log your sessions, and let the card build itself.
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
          <a href={SS_SIGNUP} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: C.amber, color: C.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.01em' }}>
            Get Your Rider Card &rarr;
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: 8, padding: '24px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.2rem', color: C.cream, lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — HOW IT WORKS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THREE STEPS</SLabel>
          <SHead>That&rsquo;s it.</SHead>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
            {steps.map((s) => (
              <div key={s.n} style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: 8, padding: '26px 24px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.amber, letterSpacing: '0.1em', marginBottom: 12 }}>{s.n}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 10 }}>{s.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.65 }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — VERIFICATION TIERS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>VERIFICATION</SLabel>
        <SHead>Three tiers. Honest about each.</SHead>
        <SBody>
          Your speed claims carry a tier. It&rsquo;s not a gate &mdash; it&rsquo;s context.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
          {tiers.map((tier) => (
            <div key={tier.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${tier.accent}`, borderRadius: 8, padding: '26px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: tier.accent, letterSpacing: '0.04em' }}>
                  {tier.label}
                </div>
                {tier.tag && (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: tier.accent, letterSpacing: '0.16em', border: `1px solid ${tier.accentLine}`, padding: '3px 8px', borderRadius: 3, whiteSpace: 'nowrap' }}>
                    {tier.tag}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.dim, lineHeight: 1.65 }}>{tier.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — SIBLING PRODUCTS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>D&amp;A ANALYTICS</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 8 }}>
            {siblings.map((s) => (
              <Link key={s.href} href={s.href} style={{
                display: 'block', background: C.navy, border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: '26px 26px', textDecoration: 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: C.cream }}>{s.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.green, letterSpacing: '0.16em' }}>{s.tag}</div>
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.body, lineHeight: 1.65, marginBottom: 12 }}>{s.t}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.green, letterSpacing: '0.08em' }}>
                  See {s.name} &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE PHILOSOPHY</SLabel>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${C.amber}`, paddingLeft: 22, marginTop: 12, marginBottom: 32, maxWidth: 760 }}>
          &ldquo;Your data. Your card. Portable.&rdquo;
        </div>

        <SBody>
          SlopeStat doesn&rsquo;t lock your history behind a paywall or a platform. Your sessions, your boards, your card &mdash; yours to keep, yours to share. No social graph required. No feed to feed. The card is the point.
        </SBody>

        <a href={SS_URL} target="_blank" rel="noopener noreferrer"
           style={{ display: 'inline-block', background: 'transparent', color: C.amber, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.amberLine}` }}>
          Open your card &rarr;
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            SlopeStat &middot; A D&amp;A Analytics Product &middot; Dropdown Logistics
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Your rides. Your boards. Your card.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={SS_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.amber, textDecoration: 'none', letterSpacing: '0.05em' }}>
            slopestat.vercel.app &#x2197;
          </a>
          <Link href="/brand/slopestat" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            Brand Kit &rarr;
          </Link>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
