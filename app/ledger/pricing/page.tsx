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
  amber:     '#C49A3C',
  amberDim:  'rgba(196,154,60,0.12)',
  amberLine: 'rgba(196,154,60,0.35)',
  steel:     '#6B7B8D',
};

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>{children}</div>
);
const SHead = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>{children}</div>
);
const SBody = ({ children, max = 680 }: { children: React.ReactNode; max?: number }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>{children}</div>
);

const tiers = [
  { name: 'Free Forever',            tag: 'The card. Always.',                        bullets: ['Verified Ledger card','AuditForge-generated badge','Shareable profile link','Snapshot export (PDF)'] },
  { name: 'Individual Standalone',   tag: 'Your credential. Without a firm account.', bullets: ['Everything in Free Forever','Independent from any firm','Self-reported entries with clear labeling','Manual verification request flow'] },
  { name: 'Firm',                    tag: 'Your brand. On every card your auditors carry.', bullets: ['Everything in Individual','Firm logo and branding on all cards','Centralized roster management','Card issuance controls'] },
  { name: 'Card Analytics',          tag: 'See how your credential travels.',         bullets: ['Everything in Firm','View impressions, shares, and profile visits','Understand which credentials get attention'] },
  { name: 'Portfolio Export',        tag: 'The full record. Yours to keep.',          bullets: ['Everything in Card Analytics','Full data export in structured format','Audit-ready credential package'] },
  { name: 'Cross-Firm Portability',  tag: 'The card travels when the auditor does.',  bullets: ['Everything in Portfolio Export','Cards remain valid across firm changes','Cryptographic verification layer','The moat.'], moat: true },
];

export default function LedgerPricing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ledger" label="ledger" />

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 64px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.amber, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 24 }}>
          LEDGER &middot; PRICING
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 22 }}>
          Free where it spreads. <span style={{ color: C.amber }}>Paid where it compounds.</span>
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.2rem', color: C.cream, lineHeight: 1.55, maxWidth: 680 }}>
          The card ships free. The moat is portability.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* TIERS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px' }}>
        <SLabel>SIX TIERS</SLabel>
        <SHead>The card. And everything that compounds around it.</SHead>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 32 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{ background: C.card, border: `1px solid ${t.moat ? C.amberLine : C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: 8, padding: '24px 22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: C.cream, marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.88rem', color: C.amber, lineHeight: 1.5, marginBottom: 20 }}>{t.tag}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: C.amber, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', paddingTop: 3 }}>&#9632;</span>
                    <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW TO ENGAGE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px' }}>
          <SLabel>HOW TO ENGAGE</SLabel>
          <SHead>Early access, by conversation.</SHead>
          <SBody>
            Ledger is in active development. Cards are being issued to AuditForge users first. If you&rsquo;re building a firm deployment or want early access to the portability layer, reach out.
          </SBody>
          <a href="mailto:hello@dropdownlogistics.com" style={{ display: 'inline-block', background: C.amber, color: C.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none' }}>
            hello@dropdownlogistics.com &rarr;
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Link href="/ledger" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.amber, textDecoration: 'none', letterSpacing: '0.05em' }}>
          &larr; /ledger
        </Link>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.2em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
