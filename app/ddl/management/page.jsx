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
  border:      'rgba(245,241,235,0.07)',
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
  {
    name: 'Mara Voss',
    title: 'Acceptance Test Officer',
    lane: 'ACCEPTANCE-TEST AUTHORITY',
    platform: 'Thread-Native · DDL HQ',
    tagline: 'Test authority. Determines with evidence whether governed mechanisms do what they claim. "Not certified" is a test result — not a project stop.',
    photo: '/offices/PP_2003_Mara_Voss_v1.0.PNG',
    accent: '#4A9E6B',
    slug: 'voss',
  },
];

export default function ManagementHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>

        {/* Eyebrow */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 36 }}>
          DROPDOWN LOGISTICS &middot; MANAGEMENT
        </div>

        {/* Two-column: text left, orbital right */}
        <div style={{ display: 'flex', gap: 56, alignItems: 'center', flexWrap: 'wrap', marginBottom: 64 }}>

          {/* LEFT — text */}
          <div style={{ flex: '1 1 260px' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 16 }}>
              The council deliberates.<br />
              The offices execute.
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', letterSpacing: '-0.02em', color: C.crimson, lineHeight: 1, marginBottom: 28 }}>
              Dave decides.
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.8 }}>
              DDL runs two distinct kinds of AI-driven intelligence: a ten-seat advisory council that thinks, pressure-tests, and votes — and three operational offices that execute and verify within delegated authority. Neither kind outranks the other. The distinction is functional, not hierarchical.
            </div>
          </div>

          {/* RIGHT — orbital (desktop) */}
          <div className="orbital-system-wrap" style={{ flex: '0 0 440px' }}>
            <div style={{ position: 'relative', width: 440, height: 440 }}>

              {/* OUTER RING — 10 council seats — 364px diameter, CCW 70s */}
              <div className="orbit-ring-outer" style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 364, height: 364, marginTop: -182, marginLeft: -182,
                borderRadius: '50%', border: `1px solid rgba(245,241,235,0.07)`,
              }}>
                {seats.map((s, i) => {
                  const angle = (360 / seats.length) * i;
                  const R = 182, half = 18;
                  return (
                    <div key={s.n} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, transform: `rotate(${angle}deg)` }}>
                      <div style={{ position: 'absolute', top: -(R + half), left: -half, width: 36, textAlign: 'center' }}>
                        {/* static cancel of arm angle, then animated counter-rotation */}
                        <div style={{ transform: `rotate(${-angle}deg)` }}>
                          <div className="orbit-counter-outer">
                            <img src={s.photo} alt={s.name}
                              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${s.accent}`, display: 'block', margin: '0 auto' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* INNER RING — 3 offices — 220px diameter, CW 30s */}
              <div className="orbit-ring-inner" style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 220, height: 220, marginTop: -110, marginLeft: -110,
                borderRadius: '50%', border: `1px solid rgba(245,241,235,0.12)`,
              }}>
                {offices.map((o, i) => {
                  const angle = (360 / offices.length) * i;
                  const R = 110, half = 26;
                  return (
                    <div key={o.slug} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, transform: `rotate(${angle}deg)` }}>
                      <div style={{ position: 'absolute', top: -(R + half), left: -half, width: 52, textAlign: 'center' }}>
                        <div style={{ transform: `rotate(${-angle}deg)` }}>
                          <div className="orbit-counter-inner">
                            <img src={o.photo} alt={o.name}
                              style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${o.accent}`, display: 'block', margin: '0 auto' }}
                            />
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem', color: C.steel, marginTop: 3, letterSpacing: '0.04em', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                              {o.name.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CENTER — Dave Kitchens, static */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 4, textAlign: 'center' }}>
                <img
                  src="/offices/PP_1000_Dave_Kitchens_v1.0.jpg"
                  alt="Dave Kitchens"
                  style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${C.crimson}`, display: 'block', margin: '0 auto', boxShadow: '0 0 24px rgba(178,53,49,0.25)' }}
                />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.38rem', color: C.crimson, letterSpacing: '0.1em', marginTop: 5, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                  Dave decides
                </div>
              </div>

            </div>
          </div>

          {/* MOBILE FALLBACK — compact photo row, shown only on mobile */}
          <div className="orbital-fallback" style={{ width: '100%' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: C.steel, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Offices &amp; Council
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              {offices.map(o => (
                <img key={o.slug} src={o.photo} alt={o.name}
                  style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${o.accent}` }}
                />
              ))}
              {seats.map(s => (
                <img key={s.n} src={s.photo} alt={s.name}
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `1px solid ${s.accent}` }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Org Diagram — unchanged */}
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
                Three offices. Default execution, reserved execution, acceptance-test authority. Translates decisions into work. Verifies results. Does not ratify.
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.1em' }}>3 OFFICES &middot; PEER RELATIONSHIP &middot; DELEGATED AUTHORITY</div>
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

      {/* THE OPERATOR SECTION */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE OPERATOR</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img
                src="/offices/PP_1000_Dave_Kitchens_v1.0.jpg"
                alt="Dave Kitchens"
                style={{ width: 90, height: 90, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${C.crimson}`, flexShrink: 0 }}
              />
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em', color: C.cream, marginBottom: 14, lineHeight: 1.15 }}>
                  One person. Ten seats. Three offices.
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.75, maxWidth: 520 }}>
                  Dave Kitchens is the sole architect of Dropdown Logistics &mdash; a CPA applying dimensional modeling and governed systems thinking across every domain he touches. The council and the offices exist because one person building alone still needs pressure-testing and execution capacity.
                </div>
              </div>
            </div>
            <Link href="/ddl/operator" style={{
              display: 'inline-block', flexShrink: 0,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem',
              color: C.cream, padding: '14px 28px', borderRadius: 6, textDecoration: 'none',
              border: `1px solid ${C.steelLine}`,
              whiteSpace: 'nowrap',
            }}>
              Meet the operator &rarr;
            </Link>
          </div>
        </div>
      </div>

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
              Three offices. One default. One reserved. One test authority.
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.dim, lineHeight: 1.75, maxWidth: 580 }}>
              Dex Harrington runs unlimited — the default desk for anything ambiguous. Rhett Sterling runs capped — reserved for work that genuinely requires Claude-level capability. Mara Voss tests governed mechanisms for evidence-based pass/fail. Peer offices, not a hierarchy.
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
            DDL Management &middot; Ten seats + Three offices
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

      <style suppressHydrationWarning>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitCounterSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* Inner ring (offices) — CW 30s */
        .orbit-ring-inner  { animation: orbitSpin        30s linear infinite; }
        .orbit-counter-inner { animation: orbitCounterSpin 30s linear infinite; }
        /* Outer ring (council) — CCW 70s */
        .orbit-ring-outer  { animation: orbitCounterSpin 70s linear infinite; }
        .orbit-counter-outer { animation: orbitSpin        70s linear infinite; }

        .orbital-system-wrap { display: flex; justify-content: center; align-items: center; }
        .orbital-fallback    { display: none; }

        @media (max-width: 700px) {
          .orbital-system-wrap { display: none !important; }
          .orbital-fallback    { display: block !important; }
          div[style*="grid-template-columns: 1fr auto"] {
            display: flex !important;
            flex-direction: column !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring-inner, .orbit-ring-outer,
          .orbit-counter-inner, .orbit-counter-outer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
