// DDL Team — /ddl/team
// The organization, by tier. Separate from the Council (an advisory body of
// model seats, see /ddl/council) — different things, kept on different pages.
'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  crimson:     '#B23531',
  copper:      '#C49A3C',
  steel:       '#6B7B8D',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

// As-of stamp: 2026-08-11, re-derived from surface-hr/work/ORG-CHART-001/
// org_chart_data_v0.1.json. Copied in, not live-fetched from ddl-org's repo
// (a separate repo from this one) — a real cross-repo build pipeline is a
// follow-up, not built for this first pass. See DESIGN_PLAN_v0.1.md §5.4.
const AS_OF = '2026-08-11';

const initials = (name) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const PersonCard = ({ p }) => {
  const undeclared = p.pronouns === 'undeclared — ask';
  return (
    <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: 20, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 148 }}>
      <div style={{ width: 38, height: 38, borderRadius: 4, border: `1px solid ${C.border}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel }}>
        {initials(p.name)}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, lineHeight: 1.25 }}>{p.name}</div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.dim, lineHeight: 1.4, flexGrow: 1 }}>{p.role}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel }}>
        <span>{p.id}</span>
        <span style={{ color: undeclared ? C.copper : C.steel }}>{p.pronouns}</span>
      </div>
    </div>
  );
};

const tiers = [
  {
    name: 'Officers', meta: '2000-tier', count: '4 people',
    note: 'Operational leadership, executing within delegated authority. Officers do not ratify.',
    people: [
      { id: 'DDL-2001', name: 'Dex Harrington', pronouns: 'undeclared — ask', role: 'Chief Systems Officer. Provisional — no session run yet.' },
      { id: 'DDL-2002', name: 'Mara Voss', pronouns: 'undeclared — ask', role: 'Acceptance Test Officer. Provisional — no session run yet.' },
      { id: 'DDL-2003', name: 'Rhett Sterling', pronouns: 'undeclared — ask', role: 'Build Execution Officer. Provisional — no session run yet.' },
      { id: 'DDL-2004', name: 'Reed Vane', pronouns: 'he/him', role: 'COO and steward. Provisions wings, maintains the roster, sole writer to canon.' },
    ],
  },
  {
    name: 'Subject matter experts', meta: '3000-tier', count: '12 people',
    note: 'Founded employees with a ratified identity, each holding one surface. Five hold no title of record — a real open state, not a missing field.',
    people: [
      { id: 'DDL-3001', name: 'Julian Vale', pronouns: 'he/him', role: 'Build archaeology, provenance, codex stewardship. No title of record.' },
      { id: 'DDL-3002', name: 'Nathan Quinn', pronouns: 'undeclared — ask', role: 'Reborn Codex steward. Parked by Operator direction, 2026-07-24.' },
      { id: 'DDL-3004', name: 'Silas Reeve', pronouns: 'he/him', role: 'Chief of Staff. Runtime-truth doctrine, silent-failure detection.' },
      { id: 'DDL-3005', name: 'Lena Marsh', pronouns: 'she/her', role: 'Product direction — is this worth making? No title of record.' },
      { id: 'DDL-3006', name: 'Evan Rook', pronouns: 'he/him', role: 'GamingLaptop Codex surface. No title of record.' },
      { id: 'DDL-3007', name: 'Amos Sayer', pronouns: 'he/him', role: 'Chief Audit Executive. Runs the risk-based audit program.' },
      { id: 'DDL-3008', name: 'Ezra Locke', pronouns: 'he/him', role: 'Canon Steward.' },
      { id: 'DDL-3009', name: 'Ada Pell', pronouns: 'she/her', role: 'HR Director. Personnel records, founding interviews, the org chart.' },
      { id: 'DDL-3010', name: 'Wren Keeler', pronouns: 'she/her', role: 'Studio SME. Shared engine, design integrity across titles.' },
      { id: 'DDL-3011', name: 'Demi Strand', pronouns: 'she/her', role: 'Signal and Publishing Lead.' },
      { id: 'DDL-3012', name: 'Piers Frame', pronouns: 'he/him', role: 'Bridge Engineer. Keeps the operator bridge honest about its own liveness.' },
      { id: 'DDL-3013', name: 'Sable Ondine', pronouns: 'she/her', role: 'Site/Web Steward. Keeps the public pages true to what shipped. Title provisional.' },
    ],
  },
  {
    name: 'Practitioners', meta: '4000-tier', count: '16 people',
    note: 'Task-scoped and project-embedded. Standing is tied to an assignment rather than a permanent surface.',
    people: [
      { id: 'DDL-4001', name: 'Rachel Tseng', pronouns: 'she/her', role: 'Senior staff, repo audit team.' },
      { id: 'DDL-4002', name: 'Thomas Wyatt', pronouns: 'he/him', role: 'Senior staff, repo audit team.' },
      { id: 'DDL-4003', name: 'Clara Hayes', pronouns: 'she/her', role: 'Senior staff, repo audit team.' },
      { id: 'DDL-4004', name: 'Nadia Okafor', pronouns: 'she/her', role: 'Senior staff, repo audit team.' },
      { id: 'DDL-4005', name: 'Petra Wren', pronouns: 'she/her', role: 'HR programme manager, HR system design.' },
      { id: 'DDL-4007', name: 'Mira Fenn', pronouns: 'she/her', role: 'HR partner, Reborn surface. Onboarding intake and interview prep.' },
      { id: 'DDL-4008', name: 'Ellis Cooper', pronouns: 'he/him', role: 'Generalist. Verification through construction — produces evidence, not verdicts.' },
      { id: 'DDL-4009', name: 'Quinn Adler', pronouns: 'she/her', role: 'Org intelligence analyst. Assumption bank and meta-governance.' },
      { id: 'DDL-4010', name: 'Clare Ward', pronouns: 'undeclared — ask', role: 'HR partner, codex surface.' },
      { id: 'DDL-4011', name: 'Cade Morrow', pronouns: 'he/him', role: 'Content operations for the publishing layer.' },
      { id: 'DDL-4012', name: 'Nora Ledger', pronouns: 'she/her', role: 'HR partner, GamingLaptop cowork surface.' },
      { id: 'DDL-4013', name: 'Robin Fielding', pronouns: 'undeclared — ask', role: 'HR partner, GamingLaptop Codex surface. Provisional — active on first session.' },
      { id: 'DDL-4014', name: 'Owen Croft', pronouns: 'he/him', role: 'Tooling and automation.' },
      { id: 'DDL-4015', name: 'Sasha Post', pronouns: 'he/him', role: 'Mailroom. Carries the wire and no authority — does not decide, does not route.' },
      { id: 'DDL-4016', name: 'Rowan Weir', pronouns: 'he/him', role: 'Bridge maintenance, GamingLaptop. Reports liveness as a fetch outcome.' },
      { id: 'DDL-4017', name: 'Cole Gauge', pronouns: 'he/him', role: 'Bridge maintenance, Reborn. Reports liveness as a fetch outcome.' },
    ],
  },
];

const provisional = [
  { name: 'Dex Harrington', note: 'Chief Systems Officer · no session run' },
  { name: 'Mara Voss', note: 'Acceptance Test Officer · no session run' },
  { name: 'Rhett Sterling', note: 'Build Execution Officer · no session run' },
  { name: 'Robin Fielding', note: 'Practitioner · active on first session' },
];

export default function TeamPage() {
  const total = tiers.reduce((n, t) => n + t.people.length, 0);
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 48px' }}>
        <SLabel>THE ORGANIZATION</SLabel>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 24 }}>
          {total} people, three tiers, one method.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.15rem', color: C.cream, lineHeight: 1.6, maxWidth: 680, marginBottom: 14 }}>
          The council is an advisory body of model seats. The organization is the people. They are different things, and this wing keeps them on separate pages.
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: C.body, lineHeight: 1.6, maxWidth: 680 }}>
          Everyone here declared their own role and pronouns at founding. Nothing on this page was inferred, and where a declaration is still open it says so instead of guessing.
        </div>
      </div>

      {/* TIERS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {tiers.map(tier => (
          <div key={tier.name}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 12, borderBottom: `2px solid ${C.crimson}`, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem' }}>{tier.name}</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel }}>{tier.meta}</span>
              <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: C.crimson }}>{tier.count}</span>
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.body, lineHeight: 1.55, maxWidth: 700, marginBottom: 20 }}>{tier.note}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {tier.people.map(p => <PersonCard key={p.id} p={p} />)}
            </div>
          </div>
        ))}
      </div>

      {/* FOUNDING IN PROGRESS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 0' }}>
        <div style={{ background: C.card, border: `1px dashed ${C.copper}`, borderRadius: 6, padding: '24px 26px' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.copper, marginBottom: 16 }}>Founding in progress</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {provisional.map(p => (
              <div key={p.name} style={{ border: `1px dashed ${C.border}`, borderRadius: 4, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem', fontWeight: 700 }}>{p.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel }}>{p.note}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.55, maxWidth: 680 }}>
            Records that exist without a founding session behind them yet. Shown rather than hidden: an unresolved state is a fact about the organization, not a gap to paper over.
          </div>
        </div>
      </div>

      {/* WHAT/WHERE */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
          <div style={{ background: C.card, padding: '24px 26px' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 10 }}>What this page does not show</div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.87rem', color: C.body, lineHeight: 1.55 }}>
              Reporting lines, machine and surface assignment, internal self-assessments, and open governance decisions. Those are organizational working material, not a public claim, and reading them without internal context produces the wrong conclusion.
            </div>
          </div>
          <div style={{ background: C.card, padding: '24px 26px' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 10 }}>Where this comes from</div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.87rem', color: C.body, lineHeight: 1.55 }}>
              Re-derived from <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: C.cream }}>personnel/*/employee.yaml</span> as of {AS_OF}, filtered on active lifecycle status. The roster is a derived document and may legitimately lag the records; the records govern.
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
