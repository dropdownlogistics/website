'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  border:      'rgba(245,241,235,0.08)',
  crimson:     '#B23531',
  crimsonDim:  'rgba(178,53,49,0.12)',
  crimsonLine: 'rgba(178,53,49,0.35)',
  steel:       '#6B7B8D',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>{children}</div>
);
const SHead = ({ children }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>{children}</div>
);
const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>{children}</div>
);

const tiers = [
  { name: 'Starter', tag: 'One module. Full depth.',
    bullets: ['One WorkBench module of your choice','Full analytics dashboard for that module','Ledger card export','Bring Your Data (SOFT tier connectors)'],
    ideal: 'Teams starting with HR, Time, or Controls' },
  { name: 'Growth', tag: 'The stack you actually need.',
    bullets: ['Up to five modules','Cross-module analytics (shared measures work across all active modules)','Configurable measures (STD-WB-MEASURE-001)','HARD tier connectors (QuickBooks, Gusto, Stripe)'],
    ideal: 'Professional services firms of 5-20 people' },
  { name: 'Enterprise', tag: 'The full operating system.',
    bullets: ['All 17 modules (as they ship)','Natural Language Query (when available)','Custom module development','Dedicated substrate support','API access'],
    ideal: 'Firms that want to run their entire operation on one governed substrate' },
];

export default function WorkBenchPricing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/workbench" label="workbench" />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 64px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 24 }}>
          WORKBENCH &middot; PRICING
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 22 }}>
          Start with one module. <span style={{ color: C.crimson }}>Add the rest when you need them.</span>
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.2rem', color: C.cream, lineHeight: 1.55, maxWidth: 680 }}>
          You&rsquo;re not buying a suite. You&rsquo;re building a stack.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* PHILOSOPHY */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 24px' }}>
          <SLabel>HOW IT WORKS</SLabel>
          <SHead>Per-module. Substrate-shared.</SHead>
          <SBody>
            WorkBench modules are priced individually. You pay for what you use. Every module runs on the same substrate &mdash; so anything you add connects to everything you already have. No integration tax. No forced bundles.
          </SBody>
        </div>
      </div>

      {/* TIERS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px' }}>
        <SLabel>THREE TIERS</SLabel>
        <SHead>One. Five. All seventeen.</SHead>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 32 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 8, padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: C.cream, marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.92rem', color: C.crimson, lineHeight: 1.5, marginBottom: 24 }}>{t.tag}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                {t.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: C.crimson, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', paddingTop: 4 }}>&#9632;</span>
                    <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.15em', marginBottom: 6, textTransform: 'uppercase' }}>Ideal for</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.55 }}>{t.ideal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px' }}>
          <SLabel>HOW TO ENGAGE</SLabel>
          <SHead>First cohort forming now.</SHead>
          <SBody>
            WorkBench is in active development. HR &amp; People is the first ratified module. If you want to be in the first cohort or discuss an Enterprise deployment, reach out.
          </SBody>
          <a href="mailto:hello@dropdownlogistics.com" style={{ display: 'inline-block', background: C.crimson, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none' }}>
            hello@dropdownlogistics.com &rarr;
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Link href="/workbench" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimson, textDecoration: 'none', letterSpacing: '0.05em' }}>
          &larr; /workbench
        </Link>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.2em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
