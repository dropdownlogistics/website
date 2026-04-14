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
  crimson:     '#B23531',
  crimsonLine: 'rgba(178,53,49,0.35)',
  steel:       '#6B7B8D',
};

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }: { children: React.ReactNode; max?: number }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const LEDGER_URL = 'https://ledger-card.vercel.app';

const demoStats = [
  { n: '4',    t: 'Engagements' },
  { n: '212',  t: 'Controls' },
  { n: '789h', t: 'Logged' },
  { n: '9',    t: 'Domains' },
  { n: 'SOX / COSO / NIST CSF / IIA', t: 'Frameworks', wide: true },
];

const badges = [
  { icon: '\u2705', label: 'AuditForge Verified',    t: 'Generated directly from the audit system of record.' },
  { icon: '\ud83d\udd17', label: 'Third-Party Connected', t: 'TeamMate / Pentana / AuditBoard / Workiva.' },
  { icon: '\u270f\ufe0f', label: 'Self-Reported',    t: 'Operator-attested. Clearly labeled.' },
];

const flywheel = [
  { n: '1', t: 'Firm adopts AuditForge.' },
  { n: '2', t: 'Auditors get Ledger cards free.' },
  { n: '3', t: 'Auditors share cards during job searches.' },
  { n: '4', t: 'Auditors change firms \u2014 cards travel with them.' },
  { n: '5', t: 'Portability becomes the paid layer.' },
];

const tiers = [
  { head: 'Free Forever',           t: 'The card. Always.' },
  { head: 'Individual Standalone',  t: 'Without a firm account.' },
  { head: 'Firm Branding',          t: 'Firm logo on every card.' },
  { head: 'Card Analytics',         t: 'See how your cards perform.' },
  { head: 'Portfolio Export',       t: 'Full credential export.' },
  { head: 'Cross-Firm Portability', t: 'The paid layer. The moat.' },
];

const verticals = [
  { name: 'Audit Card',  status: 'BUILDING', color: C.crimson },
  { name: 'Drinksum\u00e9', status: 'SHIPPED',  color: C.green },
  { name: 'Deal Card',   status: 'QUEUED',   color: C.amber },
  { name: 'Case Card',   status: 'QUEUED',   color: C.amber },
];

export default function LedgerWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.amber, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; VERIFIED PROFESSIONAL IDENTITY
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Ledger</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          LinkedIn is self-reported. This is verified.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          Ledger is the verified credential layer for professional work. Every card is a receipt. Every receipt is governed. It&rsquo;s a receiptsume.
        </div>

        <a href={LEDGER_URL} target="_blank" rel="noopener noreferrer"
           style={{ display: 'inline-block', background: C.crimson, color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', padding: '14px 30px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.01em' }}>
          Visit Ledger &rarr;
        </a>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE CREDENTIAL */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE CREDENTIAL</SLabel>
          <SHead>Your work, verified.</SHead>
          <SBody>
            A Ledger card is a snapshot of verified professional activity. Not a resume. Not a profile. A governed record with source-linked badges.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 16, marginBottom: 40 }}>
            {demoStats.map((s, i) => (
              <div key={i} style={{ gridColumn: s.wide ? '1 / -1' : undefined, background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: 8, padding: '22px 22px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: s.wide ? '1rem' : '2.2rem', color: C.cream, lineHeight: 1.1, marginBottom: 10, letterSpacing: s.wide ? '0.05em' : '-0.02em' }}>{s.n}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.t}</div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            THREE BADGE TYPES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {badges.map((b) => (
              <div key={b.label} style={{ background: C.navy, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.amber}`, borderRadius: 6, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: '1.05rem' }}>{b.icon}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: C.cream }}>{b.label}</span>
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.6 }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE MOAT */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE MOAT</SLabel>
        <SHead>The badge is the business.</SHead>
        <SBody>
          The auditor becomes the distribution channel. Zero sales-impression cost. Every shared card is an impression AuditForge didn&rsquo;t have to pay for.
        </SBody>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, borderTop: `1px solid ${C.border}` }}>
          {flywheel.map((s) => (
            <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 20, padding: '18px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: C.amber, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.65 }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — BUSINESS MODEL */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>BUSINESS MODEL</SLabel>
          <SHead>Free where it spreads. Paid where it compounds.</SHead>
          <SBody>
            The card ships free forever. The moat is portability, branding, and analytics &mdash; the layers that compound once the card is already in circulation.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 24 }}>
            {tiers.map((t) => (
              <div key={t.head} style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: 8, padding: '22px 22px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: C.cream, marginBottom: 10 }}>{t.head}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.body, lineHeight: 1.6 }}>{t.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — PLATFORM EXPANSION */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>PLATFORM EXPANSION</SLabel>
        <SHead>Audit is the first vertical.</SHead>
        <SBody>
          The card architecture is vertical-agnostic. Audit ships first because that&rsquo;s where AuditForge already captures the governed record. The same pattern extends to any profession with verifiable work.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 24 }}>
          {verticals.map((v) => (
            <div key={v.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${v.color}`, borderRadius: 6, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream }}>{v.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: v.color, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>{v.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6 — CLOSING */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3.6vw, 2.4rem)', color: C.cream, lineHeight: 1.4, maxWidth: 720, borderLeft: `2px solid ${C.amber}`, paddingLeft: 22, marginBottom: 28 }}>
            &ldquo;The data is already there. The card is a read view.&rdquo;
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, lineHeight: 1.75, maxWidth: 620 }}>
            Ledger does not create the work. It surfaces it.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            Ledger &middot; A Dropdown Logistics Product
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            It&rsquo;s a receiptsume.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={LEDGER_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.amber, textDecoration: 'none', letterSpacing: '0.05em' }}>
            ledger-card.vercel.app &#x2197;
          </a>
          <Link href="/ledger" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
            /ledger
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
