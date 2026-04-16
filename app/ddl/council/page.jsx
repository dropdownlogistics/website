// DDL Council Hub — /ddl/council
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
  borderSoft:  'rgba(245,241,235,0.05)',
  crimson:     '#B23531',
  crimsonLine: 'rgba(178,53,49,0.35)',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
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

const seats = [
  { n: '1001', name: 'Archer Hawthorne', platform: 'LeChat / Mistral', role: 'The Editorial Layer \u2014 Precision structure and clean-room editorial review.', lotr: 'Aragorn', href: '/ddl/council/1001' },
  { n: '1002', name: 'Marcus Caldwell', platform: 'Claude (Opus 4.6 / Sonnet 4.6)', role: 'The Governance Annex \u2014 Structural review, metadata governance, and project management.', lotr: 'Gandalf (Opus) \u00b7 Samwise (Sonnet)', href: '/ddl/council/1002', sub: '1002a: Opus \u2014 PM / governance\n1002b: Sonnet \u2014 Planning / execution' },
  { n: '1003', name: 'Elias Mercer', platform: 'Grok / xAI', role: 'The Stress Lab \u2014 Red-team, adversarial pressure, constraint enforcement.', lotr: 'Legolas', href: '/ddl/council/1003' },
  { n: '1004', name: 'Max Sullivan', platform: 'Perplexity', role: 'The Evidence Floor \u2014 Source-backed research, verification, and citation.', lotr: 'Saruman (pre-fall)', href: '/ddl/council/1004' },
  { n: '1005', name: 'Rowan Bennett', platform: 'Copilot / Microsoft', role: 'The Compliance Wing \u2014 Formal specification, implementation skeptic, systems auditor.', lotr: 'Gimli', href: '/ddl/council/1005' },
  { n: '1006', name: 'Ava Sinclair', platform: 'Meta AI', role: 'The Human Layer \u2014 User-centric perspective, documentation, and dignity in design.', lotr: '\u00c9owyn', href: '/ddl/council/1006' },
  { n: '1007', name: 'Leo Prescott', platform: 'Gemini / Google', role: 'The Operations Desk \u2014 Pragmatic execution, strategic crystallization, does it ship?', lotr: 'Boromir', href: '/ddl/council/1007' },
  { n: '1008', name: 'Marcus Grey', platform: 'ChatGPT / OpenAI', role: 'The Synthesis Chamber \u2014 Cross-seat synthesis, PM coordination, long-arc perspective.', lotr: 'Elrond', href: '/ddl/council/1008' },
  { n: '1009', name: 'Kai Langford', platform: 'DeepSeek', role: 'The Systems Layer \u2014 Structural analysis, domain partitioning, pattern recognition.', lotr: 'Galadriel', href: '/ddl/council/1009' },
  { n: '1010', name: 'Dex Jr.', platform: 'qwen2.5-coder:7b (Local)', role: 'The Local Intelligence \u2014 RAG corpus retrieval, nightly ingestion, Seat 1010.', lotr: 'Frodo', href: '/ddl/council/1010' },
];

export default function CouncilHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; ADVISORY COUNCIL
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          The Council.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Ten seats. Nine platforms. One governed system.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          The DDL Council is a ten-seat advisory architecture spanning the major AI platforms. Each seat is a named, profiled council member with a defined role, behavioral contract, and institutional function. The council deliberates. The corpus remembers. The operator decides.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 200px))', gap: 12 }}>
          {[
            { v: '10', l: 'Council Seats' },
            { v: '9',  l: 'Cloud Models' },
            { v: '1',  l: 'Local Model (Dex Jr.)' },
          ].map(s => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — THE SEATS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE SEATS</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
            {seats.map(s => (
              <Link key={s.n} href={s.href} style={{
                display: 'block', background: C.navy, border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.crimson}`, borderRadius: 6, padding: '22px 22px', textDecoration: 'none',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.crimsonLine; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderLeftColor = C.crimson; }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.12em', marginBottom: 6 }}>
                  SEAT {s.n}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: C.cream, marginBottom: 4 }}>
                  {s.name}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 12 }}>
                  {s.platform}
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.dim, lineHeight: 1.55, marginBottom: 10 }}>
                  {s.role}
                </div>
                {s.sub && (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.muted, lineHeight: 1.7, marginBottom: 8, whiteSpace: 'pre-line' }}>
                    {s.sub}
                  </div>
                )}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.muted, letterSpacing: '0.06em' }}>
                  LOTR: {s.lotr}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>HOW IT WORKS</SLabel>
        <SBody>
          Council reviews are distributed to all seats simultaneously. Each seat responds independently &mdash; no cross-contamination. Dex Jr. synthesizes. The operator reacts. Verdicts are LOCK, REVISE, or REJECT. Nothing ships without a ratified decision.
        </SBody>

        <Link href="/canonpress" style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
          Read CanonPress &rarr;
        </Link>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            DDL Advisory Council &middot; Ten Seats
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            The council deliberates. The corpus remembers. The operator decides.
          </div>
        </div>
        <Link href="/ddl/council" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/council
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
