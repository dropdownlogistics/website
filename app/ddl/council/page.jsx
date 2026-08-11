// DDL Council Hub — /ddl/council
// Rebuilt 2026-08-11 on the ratified table in ORG_DIRECTORY.md. A prior
// version of this page drew seat structure from _toolkit/_manuals/
// PROPOSAL_council-profiles.md — a labelled, unassigned PROPOSAL describing
// model-dispatch seats, not the council's actual structure. Corrected.
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
  copper:      '#C49A3C',
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

// Seat 1002 carries the accent as coordinator-by-practice (author of
// BRF-DDL-COUNCIL-001, the canonical council orientation brief) — role,
// not appointment. Seat 1010 is provisional; activation depends on the
// local LLM service running.
const seats = [
  { n: '1001', name: 'Archer Hawthorne', platform: 'LeChat / Mistral', lane: 'Clarity · artifact sharpness · precision cuts', status: 'ACTIVE', slug: 'hawthorne', photo: '/council/PP_1001_Archer_Hawthorne_v1.0.PNG', accent: C.steel },
  { n: '1002', name: 'Marcus Caldwell', platform: 'Claude (Anthropic)', lane: 'Authority · sequencing · assembly · gate review', status: 'ACTIVE', slug: 'caldwell', photo: '/council/PP_1002_Marcus_Caldwell_v1.0.PNG', accent: C.crimson, coordinator: true },
  { n: '1003', name: 'Elias Mercer', platform: 'Grok (xAI)', lane: 'Adversarial risk · hidden assumptions · source contamination', status: 'ACTIVE', slug: 'mercer', photo: '/council/PP_1003_Elias_Mercer_v1.0.PNG', accent: C.copper },
  { n: '1004', name: 'Max Sullivan', platform: 'Perplexity', lane: 'External coherence · source orientation · cold-reader intelligibility', status: 'ACTIVE', slug: 'sullivan', photo: '/council/PP_1004_Max_Sullivan_v1.0.PNG', accent: '#2C7A7B' },
  { n: '1005', name: 'Rowan Bennett', platform: 'Copilot (Microsoft)', lane: 'Operational safeguards · acceptance criteria', status: 'ACTIVE', slug: 'bennett', photo: '/council/PP_1005_Rowan_Bennett_v1.0.PNG', accent: '#6B9DC2' },
  { n: '1006', name: 'Ava Sinclair', platform: 'Meta AI', lane: 'Adoption · human workflow · sustainability', status: 'ACTIVE', slug: 'sinclair', photo: '/council/PP_1006_Ava_Sinclair_v1.0.PNG', accent: '#4A9E6B' },
  { n: '1007', name: 'Leo Prescott', platform: 'Gemini (Google)', lane: 'Crystallization · final-form pressure testing', status: 'ACTIVE', slug: 'prescott', photo: '/council/PP_1007_Leo_Prescott_v1.0.PNG', accent: C.copper },
  { n: '1008', name: 'Marcus Grey', platform: 'ChatGPT (OpenAI)', lane: 'Provenance · structure · synthesis boundaries', status: 'ACTIVE', slug: 'grey', photo: '/council/PP_1008_Marcus_Grey_v1.1.PNG', accent: '#8a6cc9' },
  { n: '1009', name: 'Kai Langford', platform: 'DeepSeek', lane: 'Grain · metadata · registry architecture', status: 'ACTIVE', slug: 'langford', photo: '/council/PP_1009_Kai_Langford_v1.0.PNG', accent: C.steel },
  { n: '1010', name: 'Dex Jr', platform: 'Local LLM (Reborn)', lane: 'Local inference seat — responds without external calls', status: 'PROVISIONAL', slug: 'dex-jr', photo: '/council/PP_1010_Dex_Jr_v1.0.PNG', accent: C.copper },
];

const verdicts = ['LOCK', 'REVISE', 'REJECT'];

const notes = [
  { title: 'Coordinator by practice', body: 'Seat 1002 authored BRF-DDL-COUNCIL-001, the canonical council orientation brief, and functions informally as the council’s internal coordinator. The role is practice, not appointment.' },
  { title: 'A seat is a role, not a model', body: 'The model is the platform; the seat is the lane. A session answering a review answers as the seat, and the reasoning is recorded against the seat number.' },
  { title: 'Retirement is permanent', body: 'When a seat retires it takes an -R suffix and its number is retired with the model. Numbers are never reissued, so the record stays unambiguous.' },
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
          Ten seats,<br />no final authority.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 760, marginBottom: 28 }}>
          Nine permanent seats plus a local one. Each seat is a distinct AI platform holding a specific analytical lane, and a session answering a review does so as that seat: the model is the platform, the seat is the role.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 760, lineHeight: 1.8, marginBottom: 40 }}>
          The council pressure-tests meaning and returns a verdict with reasoning. It does not execute work and holds no final authority. The Operator decides.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 200px))', gap: 12 }}>
          {[
            { v: '9', l: 'Permanent seats' },
            { v: '1', l: 'Local seat (Provisional)' },
            { v: '1012', l: 'Next available seat' },
          ].map(s => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — VERDICTS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px 0' }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.crimson}`, borderRadius: 6, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {verdicts.map(v => (
              <span key={v} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.08em', border: `1px solid ${C.steelLine}`, borderRadius: 4, padding: '9px 14px', color: C.cream }}>{v}</span>
            ))}
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.body, lineHeight: 1.55, maxWidth: 560 }}>
            The three verdicts a seat may render, always with reasoning attached. A verdict is an input to the Operator&rsquo;s decision, not the decision.
          </div>
        </div>
      </div>

      {/* SECTION 3 — THE SEATS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginTop: 48 }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.7rem' }}>The seats</div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel }}>nine permanent &middot; one local</span>
            <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel }}>STD-0066</span>
          </div>

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
                  style={{ width: 84, height: 84, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${s.accent}`, flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: s.accent, letterSpacing: '0.12em' }}>SEAT {s.n}</span>
                    {s.status === 'PROVISIONAL' && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: C.copper, letterSpacing: '0.08em', border: `1px solid ${C.copper}`, borderRadius: 3, padding: '1px 5px' }}>PROVISIONAL</span>
                    )}
                    {s.coordinator && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: C.crimson, letterSpacing: '0.08em' }}>COORDINATOR</span>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 3 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 8 }}>
                    {s.platform}
                  </div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.dim, lineHeight: 1.5, marginBottom: 8 }}>
                    {s.lane}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: s.accent, letterSpacing: '0.04em' }}>
                    View profile &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}`, marginTop: 40 }}>
            {notes.map(n => (
              <div key={n.title} style={{ background: '#0F1D2A', padding: '24px 26px' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', marginBottom: 10 }}>{n.title}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.55 }}>{n.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 40px' }}>
        <SLabel>HOW IT WORKS</SLabel>
        <SBody>
          Council reviews are distributed to all seats simultaneously. Each seat responds independently &mdash; no cross-contamination. Dex Jr synthesizes. The Operator reacts. Verdicts are LOCK, REVISE, or REJECT. Nothing ships without a ratified decision.
        </SBody>

        <Link href="/canonpress" style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
          Read CanonPress &rarr;
        </Link>
      </div>

      {/* SEAT 1011-R / NEXT AVAILABLE */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', color: C.steel, flexWrap: 'wrap' }}>
          <span>SEAT 1011-R &middot; CONNOR &middot; RETIRED 2026</span>
          <span style={{ color: C.muted }}>&middot;</span>
          <span>NEXT AVAILABLE SEAT &middot; 1012</span>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, borderTop: `1px solid ${C.border}` }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            DDL Advisory Council &middot; Ten Seats
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            The council pressure-tests meaning. The Operator decides.
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
