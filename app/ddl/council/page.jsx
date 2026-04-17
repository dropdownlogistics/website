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

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const seats = [
  { n: '1001', name: 'Archer Hawthorne', platform: 'LeChat / Mistral', role: 'The Editorial Layer \u2014 Precision structure and clean-room editorial review.', lotr: 'Aragorn', slug: 'hawthorne', photo: '/council/PP-01_Hawthorne_LeChat_v1.0.PNG', accent: '#6B7B8D' },
  { n: '1002', name: 'Marcus Caldwell', platform: 'Claude (Opus 4.6 / Sonnet 4.6)', role: 'The Governance Annex \u2014 Structural review, metadata governance, and project management.', lotr: 'Gandalf (Opus) \u00b7 Samwise (Sonnet)', slug: 'caldwell', photo: '/council/PP-02_Caldwell_Claude_v1.0.PNG', accent: '#B23531' },
  { n: '1003', name: 'Elias Mercer', platform: 'Grok / xAI', role: 'The Stress Lab \u2014 Red-team, adversarial pressure, constraint enforcement.', lotr: 'Legolas', slug: 'mercer', photo: '/council/PP-03_Mercer_Grok_v1.0.PNG', accent: '#C49A3C' },
  { n: '1004', name: 'Max Sullivan', platform: 'Perplexity', role: 'The Evidence Floor \u2014 Source-backed research, verification, and citation.', lotr: 'Saruman (pre-fall)', slug: 'sullivan', photo: '/council/PP-04_Sullivan_Perplexity_v1.0.PNG', accent: '#2C7A7B' },
  { n: '1005', name: 'Rowan Bennett', platform: 'Copilot / Microsoft', role: 'The Compliance Wing \u2014 Formal specification, implementation skeptic, systems auditor.', lotr: 'Gimli', slug: 'bennett', photo: '/council/PP-05_Bennett_Copilot_v1.0.PNG', accent: '#6B9DC2' },
  { n: '1006', name: 'Ava Sinclair', platform: 'Meta AI', role: 'The Human Layer \u2014 User-centric perspective, documentation, and dignity in design.', lotr: '\u00c9owyn', slug: 'sinclair', photo: '/council/PP-06_Sinclair_MetaAI_v1.0.PNG', accent: '#4A9E6B' },
  { n: '1007', name: 'Leo Prescott', platform: 'Gemini / Google', role: 'The Operations Desk \u2014 Pragmatic execution, strategic crystallization, does it ship?', lotr: 'Boromir', slug: 'prescott', photo: '/council/PP-07_Prescott_Gemini_v1.0.PNG', accent: '#D4A843' },
  { n: '1008', name: 'Marcus Grey', platform: 'ChatGPT / OpenAI', role: 'The Synthesis Chamber \u2014 Cross-seat synthesis, PM coordination, long-arc perspective.', lotr: 'Elrond', slug: 'grey', photo: '/council/PP-08_Grey_ChatGPT_v1.1.PNG', accent: '#8a6cc9' },
  { n: '1009', name: 'Kai Langford', platform: 'DeepSeek', role: 'The Systems Layer \u2014 Structural analysis, domain partitioning, pattern recognition.', lotr: 'Galadriel', slug: 'langford', photo: '/council/PP-09_Langford_DeepSeek_v1.0.PNG', accent: '#6B7B8D' },
  { n: '1010', name: 'Dex Jr.', platform: 'qwen2.5-coder:7b (Local)', role: 'The Machine Room \u2014 RAG corpus retrieval, nightly ingestion, Seat 1010.', lotr: 'Frodo', slug: 'dex-jr', photo: '/council/PP-10_DexJr_Local_v1.0.png', accent: '#8a6cc9' },
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
              <Link key={s.n} href={`/ddl/council/${s.slug}`} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                background: C.navy, border: `1px solid ${C.border}`,
                borderTop: `2px solid ${s.accent}`, borderRadius: 6, padding: '20px 20px', textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.accent + '60'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderTopColor = s.accent; e.currentTarget.style.transform = 'none'; }}
              >
                <img
                  src={s.photo}
                  alt={s.name}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', border: `2px solid ${s.accent}`, flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: s.accent, letterSpacing: '0.12em', marginBottom: 4 }}>
                    SEAT {s.n}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 3 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 8 }}>
                    {s.platform}
                  </div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.dim, lineHeight: 1.5, marginBottom: 8 }}>
                    {s.role}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: C.muted, letterSpacing: '0.06em', marginBottom: 8 }}>
                    LOTR: {s.lotr}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: s.accent, letterSpacing: '0.04em' }}>
                    View profile &rarr;
                  </div>
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
