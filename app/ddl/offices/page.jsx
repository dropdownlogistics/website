// DDL Offices Hub — /ddl/offices
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
  amber:       '#C49A3C',
  blue:        '#6B9DC2',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children, color }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: color || C.steel, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const offices = [
  {
    id: 'DEX-001',
    name: 'Dex Harrington',
    title: 'Chief Systems Officer',
    lane: 'CAPACITY-UNCONSTRAINED DEFAULT EXECUTION',
    platform: 'ChatGPT / Codex',
    role: 'Coordination · Momentum · Continuity · Session Hygiene',
    tagline: 'Default first desk for ambiguous operational work. Not because Dex owns everything — because Dex is the lowest-cost competent office to triage from.',
    photo: '/offices/PP_2001_Dex_Harrington_v1.0.PNG',
    accent: C.amber,
    slug: 'harrington',
  },
  {
    id: 'RS-001',
    name: 'Rhett Sterling',
    title: 'Build Execution Officer',
    lane: 'CAPABILITY-RESERVED EXECUTION',
    platform: 'Claude Code / Cowork (Anthropic)',
    role: 'Schema · Repo Execution · Build Translation · Compliance',
    tagline: 'Reserved for work that genuinely requires Claude-level reasoning capability. Translates locked council verdicts into deterministic build output — without changing meaning.',
    photo: '/offices/PP_2002_Rhett_Sterling_v1.0.PNG',
    accent: C.blue,
    slug: 'sterling',
  },
  {
    id: 'MARA-001',
    name: 'Mara Voss',
    title: 'Acceptance Test Officer',
    lane: 'ACCEPTANCE-TEST AUTHORITY',
    platform: 'Thread-Native · DDL HQ',
    role: 'Testing · Evidence · Provenance · Reproducibility · Failure Classification',
    tagline: 'Takes governed mechanisms and determines — with evidence — whether they actually do what they claim to do. Separates compiler failure from generator variance. Never launders exploration into evidence.',
    photo: '/offices/PP_2003_Mara_Voss_v1.0.PNG',
    accent: '#4A9E6B',
    slug: 'voss',
  },
];

export default function OfficesHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl/management" label="management" />

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.amber, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; OPERATIONAL OFFICES
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          The Offices.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Three offices. One default. One reserved. One test authority.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          Offices execute within delegated authority. They do not vote on decisions, do not ratify doctrine, and are not council seats. The distinctions between them are functional — capacity-unconstrained default execution, capability-reserved execution, and acceptance-test authority — not a status hierarchy.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 200px))', gap: 12 }}>
          {[
            { v: '3', l: 'Operational Offices' },
            { v: '1', l: 'Default Desk (Dex)' },
            { v: '1', l: 'Reserved Desk (Sterling)' },
            { v: '1', l: 'Test Authority (Mara)' },
          ].map(s => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* THE OFFICES */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={C.amber}>THE OFFICES</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 24 }}>
            {offices.map(o => (
              <Link key={o.slug} href={`/ddl/offices/${o.slug}`} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                background: C.navy, border: `1px solid ${C.border}`,
                borderTop: `2px solid ${o.accent}`, borderRadius: 6, padding: '24px 20px', textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = o.accent + '60'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderTopColor = o.accent; e.currentTarget.style.transform = 'none'; }}
              >
                <img
                  src={o.photo}
                  alt={o.name}
                  style={{ width: 100, height: 100, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${o.accent}`, flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: o.accent, letterSpacing: '0.12em', marginBottom: 4 }}>
                    {o.lane}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, marginBottom: 3 }}>
                    {o.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 8 }}>
                    {o.title} &middot; {o.platform}
                  </div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.dim, lineHeight: 1.5, marginBottom: 8 }}>
                    {o.tagline}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: o.accent, letterSpacing: '0.04em' }}>
                    View profile &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>HOW OFFICES WORK</SLabel>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: 680, marginBottom: 28 }}>
          Ambiguous work defaults to Dex &mdash; the lowest-cost competent office to triage from. Dex carries what he can and explicitly flags what needs Rhett&rsquo;s reserved capability. Transfer to the reserved desk requires operator authorization or a pre-existing locked routing trigger. Mara tests governed mechanisms on request and reports pass/fail with evidence &mdash; her non-certification is a test result, not a project stop.
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, borderRadius: 6, padding: '18px 22px', maxWidth: 680, marginBottom: 28 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.amber, letterSpacing: '0.1em', marginBottom: 8 }}>PRACTICAL RULE</div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.65 }}>
            When in doubt, work goes to Dex. Dex either carries it, or flags that it needs Rhett&rsquo;s reserved capability and states the cost. When a governed mechanism needs evidence-based pass/fail certification, it goes to Mara. &ldquo;Not certified&rdquo; means the evidence isn&rsquo;t there &mdash; not that the project stops. Dave decides what happens next.
          </div>
        </div>
        <Link href="/ddl/management" style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
          Management overview &rarr;
        </Link>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            DDL Operational Offices &middot; Three Desks
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Offices execute within delegated authority. Dave decides.
          </div>
        </div>
        <Link href="/ddl/offices" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/offices
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
