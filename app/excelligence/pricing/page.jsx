'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:      '#0D1B2A',
  card:      '#10202f',
  cream:     '#F5F1EB',
  dim:       'rgba(245,241,235,0.72)',
  body:      'rgba(245,241,235,0.6)',
  border:    'rgba(245,241,235,0.08)',
  gold:      '#D4A843',
  goldDim:   'rgba(212,168,67,0.12)',
  goldLine:  'rgba(212,168,67,0.35)',
  steel:     '#6B7B8D',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>{children}</div>
);
const SHead = ({ children }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>{children}</div>
);
const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>{children}</div>
);

const tiers = [
  { name: 'Explorer', tag: 'The full graph. One user.',
    bullets: ['Full registry access (105 entries, 228 edges)','Learning paths and progression tracking','Anti-pattern scanner','GridTactics access'],
    ideal: 'Individual Excel practitioners' },
  { name: 'Team', tag: 'The graph. For your analysts.',
    bullets: ['Everything in Explorer','Up to 10 seats','Team progress dashboard','Shared learning path assignments','Aggregate skill gap analysis'],
    ideal: 'Finance and audit teams' },
  { name: 'Enterprise', tag: 'The graph. Embedded in your workflow.',
    bullets: ['Everything in Team','Unlimited seats','Custom entry types for org-specific patterns','API access for workbook scanning integration','Dedicated onboarding session'],
    ideal: 'Large finance organizations' },
];

export default function ExcelligencePricing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/excelligence" label="excelligence" />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 64px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.gold, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 24 }}>
          EXCELLIGENCE &middot; PRICING
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 22 }}>
          The graph. <span style={{ color: C.gold }}>For your team.</span>
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.2rem', color: C.cream, lineHeight: 1.55, maxWidth: 680 }}>
          105 entries. 228 edges. Governed and searchable.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px' }}>
        <SLabel>THREE TIERS</SLabel>
        <SHead>One user, one team, one organization.</SHead>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 32 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.gold}`, borderRadius: 8, padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: C.cream, marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.92rem', color: C.gold, lineHeight: 1.5, marginBottom: 24 }}>{t.tag}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                {t.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', paddingTop: 4 }}>&#9632;</span>
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
          <SHead>Live and searchable. Team tiers on request.</SHead>
          <SBody>
            Excelligence is live and searchable. Team and Enterprise tiers are being built now. If you want early access or want to discuss a team deployment, reach out.
          </SBody>
          <a href="mailto:hello@dropdownlogistics.com" style={{ display: 'inline-block', background: C.gold, color: C.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none' }}>
            hello@dropdownlogistics.com &rarr;
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Link href="/excelligence" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.gold, textDecoration: 'none', letterSpacing: '0.05em' }}>
          &larr; /excelligence
        </Link>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.2em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
