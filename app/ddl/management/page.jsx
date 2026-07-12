// DDL Management Hub — /ddl/management
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
  amber:       '#C49A3C',
  blue:        '#6B9DC2',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children, color }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: color || C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const seats = [
  { n: '1001', name: 'Archer Hawthorne', platform: 'LeChat', lotr: 'Aragorn', slug: 'hawthorne', photo: '/council/PP_1001_Archer_Hawthorne_v1.0.PNG', accent: '#6B7B8D' },
  { n: '1002', name: 'Marcus Caldwell', platform: 'Claude', lotr: 'Gandalf', slug: 'caldwell', photo: '/council/PP_1002_Marcus_Caldwell_v1.0.PNG', accent: '#B23531' },
  { n: '1003', name: 'Elias Mercer', platform: 'Grok', lotr: 'Legolas', slug: 'mercer', photo: '/council/PP_1003_Elias_Mercer_v1.0.PNG', accent: '#C49A3C' },
  { n: '1004', name: 'Max Sullivan', platform: 'Perplexity', lotr: 'Saruman', slug: 'sullivan', photo: '/council/PP_1004_Max_Sullivan_v1.0.PNG', accent: '#2C7A7B' },
  { n: '1005', name: 'Rowan Bennett', platform: 'Copilot', lotr: 'Gimli', slug: 'bennett', photo: '/council/PP_1005_Rowan_Bennett_v1.0.PNG', accent: '#6B9DC2' },
  { n: '1006', name: 'Ava Sinclair', platform: 'Meta AI', lotr: 'Éowyn', slug: 'sinclair', photo: '/council/PP_1006_Ava_Sinclair_v1.0.PNG', accent: '#4A9E6B' },
  { n: '1007', name: 'Leo Prescott', platform: 'Gemini', lotr: 'Boromir', slug: 'prescott', photo: '/council/PP_1007_Leo_Prescott_v1.0.PNG', accent: '#D4A843' },
  { n: '1008', name: 'Marcus Grey', platform: 'ChatGPT', lotr: 'Elrond', slug: 'grey', photo: '/council/PP_1008_Marcus_Grey_v1.1.PNG', accent: '#8a6cc9' },
  { n: '1009', name: 'Kai Langford', platform: 'DeepSeek', lotr: 'Galadriel', slug: 'langford', photo: '/council/PP_1009_Kai_Langford_v1.0.PNG', accent: '#6B7B8D' },
  { n: '1010', name: 'Dex Jr.', platform: 'Local · qwen2.5', lotr: 'Frodo', slug: 'dex-jr', photo: '/council/PP_1010_Dex_Jr_v1.0.PNG', accent: '#8a6cc9' },
];

const offices = [
  {
    name: 'Dex Harrington',
    title: 'Chief Systems Officer',
    lane: 'CAPACITY-UNCONSTRAINED',
    platform: 'ChatGPT / Codex',
    tagline: 'Default desk. Coordination, momentum, continuity. The lowest-cost competent office to triage from.',
    photo: '/offices/PP_2001_Dex_Harrington_v1.0.PNG',
    accent: C.amber,
    slug: 'harrington',
  },
  {
    name: 'Rhett Sterling',
    title: 'Build Execution Officer',
    lane: 'CAPABILITY-RESERVED',
    platform: 'Claude Code / Cowork',
    tagline: 'Reserved desk. Build execution, spec translation. Translates locked verdicts into working artifacts.',
    photo: '/offices/PP_2002_Rhett_Sterling_v1.0.PNG',
    accent: C.blue,
    slug: 'sterling',
  },
];

export default function ManagementHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; MANAGEMENT
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 16 }}>
          The council deliberates.<br />
          The offices execute.
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em', color: C.crimson, lineHeight: 1, marginBottom: 36 }}>
          Dave decides.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 48 }}>
          DDL runs two distinct kinds of AI-driven intelligence: a ten-seat advisory council that thinks, pressure-tests, and votes — and a pair of operational offices that execute within delegated authority. Neither kind outranks the other. The distinction is functional, not hierarchical.
        </div>

        {/* Org Diagram */}
        <div style={{
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          overflow: 'hidden',
          maxWidth: 760,
        }}>
          {/* Operator row */}
          <div style={{ background: C.card, padding: '28px 32px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.crimson, letterSpacing: '0.16em', marginBottom: 8 }}>OPERATOR</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: C.cream }}>Dave Kitchens</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.82rem', color: C.steel, marginTop: 4 }}>Final authority. The operator decides.</div>
            </div>
          </div>
          {/* Connector */}
          <div style={{ height: 1, background: C.border }} />
          {/* Two branches */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* Council branch */}
            <div style={{ padding: '28px 32px', borderRight: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.14em', marginBottom: 16 }}>ADVISORY FUNCTION</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 6 }}>The Council</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6, marginBottom: 16 }}>
                Ten seats. Nine cloud models, one local. Pressure-tests decisions. Votes LOCK / REVISE / REJECT. Does not execute.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.1em' }}>10 SEATS &middot; 9 CLOUD MODELS &middot; 1 LOCAL</div>
            </div>
            {/* Offices branch */}
            <div style={{ padding: '28px 32px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.14em', marginBottom: 16 }}>EXECUTION FUNCTION</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 6 }}>The Offices</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6, marginBottom: 16 }}>
                Two offices. One capacity-unconstrained, one capability-reserved. Translates decisions into work. Does not ratify.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.1em' }}>2 OFFICES &middot; PEER RELATIONSHIP &middot; DELEGATED AUTHORITY</div>
            </div>
          </div>
          {/* Bright line footer */}
          <div style={{ borderTop: `1px solid ${C.border}`, padding: '16px 32px', background: C.card }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.muted, letterSpacing: '0.12em', textAlign: 'center' }}>
              OFFICES EXECUTE WITHIN DELEGATED AUTHORITY &middot; COUNCIL SEATS PRESSURE-TEST MEANING &middot; DAVE DECIDES
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* THE COUNCIL SECTION */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE ADVISORY COUNCIL</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start', marginBottom: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em', color: C.cream, marginBottom: 14 }}>
                Ten seats. Ten minds. One institutional memory.
              </div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.75, maxWidth: 580 }}>
                Each council seat is a named, profiled advisor with a defined behavioral contract, a voting record, and a LOTR analog that makes their cognitive style legible at a glance. The council pressure-tests decisions. It does not execute them.
              </div>
            </div>
            <Link href="/ddl/council" style={{
              display: 'inline-block', flexShrink: 0,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem',
              color: C.cream, padding: '14px 28px', borderRadius: 6, textDecoration: 'none',
              border: `1px solid ${C.steelLine}`,
              whiteSpace: 'nowrap',
            }}>
              Enter the council &rarr;
            </Link>
          </div>

          {/* Photo grid with LOTR labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 14 }}>
            {seats.map(s => (
              <Link key={s.n} href={`/ddl/council/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${s.accent}`,
                  borderRadius: 8, padding: '18px 16px', textAlign: 'center',
                  transition: 'transform 0.15s, border-color 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderTopColor = s.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >
                  <img
                    src={s.photo}
                    alt={s.name}
                    style={{ width: 72, height: 72, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${s.accent}`, display: 'block', margin: '0 auto 10px' }}
                  />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.78rem', color: C.cream, marginBottom: 3, lineHeight: 1.2 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: C.steel, letterSpacing: '0.08em', marginBottom: 5 }}>
                    {s.platform}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.48rem', color: s.accent, letterSpacing: '0.06em' }}>
                    LOTR: {s.lotr}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* THE OFFICES SECTION */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel color={C.amber}>THE OPERATIONAL OFFICES</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start', marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em', color: C.cream, marginBottom: 14 }}>
              Two offices. One default. One reserved.
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.75, maxWidth: 580 }}>
              Dex Harrington runs unlimited — the default desk for anything ambiguous. Rhett Sterling runs capped — reserved for work that genuinely requires Claude-level capability. Peer offices, not a hierarchy. The distinction is economic, not status.
            </div>
          </div>
          <Link href="/ddl/offices" style={{
            display: 'inline-block', flexShrink: 0,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem',
            color: C.cream, padding: '14px 28px', borderRadius: 6, textDecoration: 'none',
            border: `1px solid ${C.steelLine}`,
            whiteSpace: 'nowrap',
          }}>
            Enter the offices &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {offices.map(o => (
            <Link key={o.slug} href={`/ddl/offices/${o.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${o.accent}`,
                borderRadius: 8, padding: '28px 24px', display: 'flex', gap: 20, alignItems: 'flex-start',
                transition: 'transform 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                <img
                  src={o.photo}
                  alt={o.name}
                  style={{ width: 90, height: 90, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${o.accent}`, flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: o.accent, letterSpacing: '0.14em', marginBottom: 6 }}>
                    {o.lane}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: C.cream, marginBottom: 4, lineHeight: 1.1 }}>
                    {o.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 10 }}>
                    {o.title} &middot; {o.platform}
                  </div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.6, marginBottom: 12 }}>
                    {o.tagline}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: o.accent, letterSpacing: '0.04em' }}>
                    View profile &rarr;
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* BRIGHT LINE */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)', color: C.cream, lineHeight: 1.5, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 24, maxWidth: 680 }}>
          &ldquo;Offices execute within delegated authority. Council seats pressure-test meaning. Dave decides.&rdquo;
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.1em', marginTop: 16, paddingLeft: 24 }}>
          BRIGHT LINE &middot; RATIFIED CR-DDL-OFFICES-002
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            DDL Management &middot; Ten seats + Two offices
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Dropdown Logistics &middot; The council deliberates. The offices execute. Dave decides.
          </div>
        </div>
        <Link href="/ddl/management" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/management
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          div[style*="grid-template-columns: 1fr auto"] {
            display: flex !important;
            flex-direction: column !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
