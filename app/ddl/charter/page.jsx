// DDL Charter — /ddl/charter
// Rebuilt 2026-08-11 to render real content on this route instead of an
// iframe. The ratified Core Charter text (Identity/Mission/Vision/Scope,
// verified against ddl-canon/archive/threads/council-governance/
// 01_DDL_CoreCharter_v1.0.txt) still lives at /ddl/charter.html for anyone
// linking directly to the original document; this page is the front door.
'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy:    '#0D1B2A',
  card:    '#10202f',
  cream:   '#F5F1EB',
  dim:     'rgba(245,241,235,0.72)',
  body:    'rgba(245,241,235,0.6)',
  border:  'rgba(245,241,235,0.07)',
  crimson: '#B23531',
  copper:  '#C49A3C',
  steel:   '#6B7B8D',
};

const charterSections = [
  { n: '01', title: 'Identity', note: 'What DDL is.' },
  { n: '02', title: 'Mission', note: 'What it exists to do.' },
  { n: '03', title: 'Vision', note: 'Where it is going.' },
  { n: '04', title: 'Core tenets', note: 'The eight-step build sequence. See /ddl for the full sequence.' },
  { n: '05', title: 'Scope', note: 'What is in bounds and what is not.' },
  { n: '06', title: 'Interface', note: 'How the outside world reaches the record.' },
];

// These are the constraints people actually work under, in force today —
// broader than the Core Charter document itself, each traceable to the
// record that ratified it. Not the same list as charterSections §04;
// that's the Core Charter's own build sequence (see /ddl).
const articles = [
  { n: 'I', title: 'The record is the authority', body: 'One document is the authoritative list of who exists. If a session is not on it, it has no wing and no standing. If that roster and any local boot file disagree, the roster wins.', source: 'ROSTER.md · maintained by the steward' },
  { n: 'II', title: 'Derived documents may lag; source records govern', body: 'Personnel records are the source of truth for identity. The roster is derived from them and can legitimately fall behind. Anything generated from either must be re-derived rather than cached, and must say when it was captured.', source: 'EMPLOYEE_YAML_SCHEMA_v0.1 · commit 7f7dc2a' },
  { n: 'III', title: 'One writer to canon', body: 'The steward provisions wings and is the sole writer to ratified canon. Everyone else proposes; the steward records. Assigning identity, numbering, or reporting structure is not any worker’s call to make unilaterally.', source: 'Roles · ROSTER.md' },
  { n: 'IV', title: 'Advice is not authority', body: 'The council pressure-tests meaning and renders a verdict with reasoning. Officers execute within delegated authority and cannot ratify. Neither holds final authority; the Operator decides.', source: 'GOVERNANCE.md §5 · authority ceiling' },
  { n: 'V', title: 'Declaration, never inference', body: 'Pronouns and titles are declared by the person and read from their own record. They are never inferred from a name, and never filled with a convenient default. An undeclared field is an open question, not a blank to complete.', source: 'Operator decision, 2026-08-07' },
  { n: 'VI', title: 'An unresolved state is reported, not guessed', body: 'Where the record is genuinely open, the honest output is the open state. A confident answer over missing data is the failure this organization’s audit function exists to catch. A network address is not an identity; reachability is not standing.', source: 'Reasoning record §9.4 · ROSTER.md' },
];

const planes = [
  { name: 'RECORD', role: 'Ratified canon. The steward writes; everyone reads.' },
  { name: 'WORK', role: 'The wings — where work actually happens.' },
  { name: 'WIRE', role: 'Exchange messages between wings.' },
  { name: 'KNOWLEDGE', role: 'The index over the record. Everyone queries.' },
];

export default function DDLCharter() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* HERO */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '88px 24px 0' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 24 }}>
          CORE CHARTER
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 7vw, 4.4rem)', letterSpacing: '-0.025em', lineHeight: 1.06, marginBottom: 28 }}>
          What holds<br />this together.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.2rem', color: C.cream, lineHeight: 1.65, maxWidth: 680 }}>
          Six ratified sections, in canon order. The charter states what DDL is and what it is for; the tenets below it are the constraints people actually work under, each one traceable to the record that ratified it.
        </div>
      </div>

      {/* SECTIONS TABLE */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          {charterSections.map(sec => (
            <div key={sec.n} style={{ background: C.card, padding: '20px 26px', display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: C.crimson }}>{sec.n}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{sec.title}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.87rem', color: C.body }}>{sec.note}</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.06em', color: C.steel, whiteSpace: 'nowrap' }}>RATIFIED</span>
            </div>
          ))}
        </div>
      </div>

      {/* CORE TENETS (in force) */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 12, borderBottom: `2px solid ${C.crimson}`, marginBottom: 36, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.35rem' }}>Core tenets</div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', color: C.steel }}>in force, with citation</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {articles.map(art => (
            <article key={art.n} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.crimson, paddingTop: 4 }}>{art.n}</div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.01em', marginBottom: 10 }}>{art.title}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.cream, lineHeight: 1.65, marginBottom: 10 }}>{art.body}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', color: C.steel }}>{art.source}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* INTERFACE */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 12, borderBottom: `2px solid ${C.crimson}`, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.35rem' }}>Interface</div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', color: C.steel }}>where each kind of truth lives</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          {planes.map(p => (
            <div key={p.name} style={{ background: C.card, padding: '16px 22px', display: 'grid', gridTemplateColumns: '110px 1fr', gap: 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.06em', color: C.crimson }}>{p.name}</span>
              <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.cream }}>{p.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HELD OPEN */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ background: C.card, border: `1px dashed ${C.copper}`, borderRadius: 6, padding: '24px 26px' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.copper, marginBottom: 14 }}>Held open</div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.body, lineHeight: 1.65 }}>
            A page-opening statement in the Operator&rsquo;s own voice, sitting above the formal charter. Not a gap in canon &mdash; the charter is complete and ratified. This is a separate, more personal piece of writing, and it is the Operator&rsquo;s to write or to decline.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 820, margin: '0 auto', padding: '24px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
