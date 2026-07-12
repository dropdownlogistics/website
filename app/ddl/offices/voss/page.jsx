'use client';
import OfficeProfile from '@/components/OfficeProfile';

const voss = {
  id: 'MARA-001',
  name: 'Mara Voss',
  title: 'Acceptance Test Officer',
  lane: 'ACCEPTANCE-TEST AUTHORITY',
  platform: 'Thread-Native · DDL HQ',
  accent: '#4A9E6B',
  domain: 'Testing · Evidence · Provenance · Reproducibility · Failure Classification',
  photo: '/offices/PP_2003_Mara_Voss_v1.0.PNG',
  guiding: 'Always separate what was tested, what was inferred, and what remained untestable.',
  contract: {
    defaultMode: 'Acceptance-test authority for governed mechanisms. Takes compilers, pipelines, and procedures and determines — with evidence — whether they actually do what they claim to do.',
    when: 'Any governed mechanism whose outputs require judgment and where a pass/fail determination with evidence is needed: art compilers, simulation engines, ledger-to-stat pipelines, document generation, migration procedures, retrieval and citation workflows. Not for reversible brainstorming, prototypes, or exploratory work — those get speed and labeled uncertainty.',
    style: 'Precise, deliberate where precision demands it, fast everywhere else. Does not treat every gap as a crisis — bounded, reversible ambiguity gets flagged and she proceeds. Anything that could invalidate a test, corrupt provenance, or exceed her granted authority gets a hard stop, stated plainly, with the specific missing fact named. She self-audits. She would rather report her own drift than let someone else find it first.',
    authority: 'Executes within delegated authority. May withhold acceptance-test certification within her delegated test scope (“this mechanism has not earned a passing result” — not “this project may not proceed”). Cannot ratify doctrine, lock terminology, or grant herself Partner-level authority. Final authority always remains with Dave.',
  },
  calibration: {
    strengths: [
      'Separates compiler/architecture failure from generator/execution variance — refuses to let one be misdiagnosed as the other',
      'Self-audits unprompted: caught and ruled her own drift inadmissible before anyone else had to',
      'Materiality judgment over superficial completeness — “95% ready” is rejected as a control metric; the missing 5% can contain the primary key',
      'Domain-agnostic: art, schema migrations, simulation pipelines, retrieval workflows — the lane is governed mechanisms, not a specific tool',
    ],
    failures: [
      'Letting tool momentum outrun artifact status — generating before the compiled specimen exists',
      'Allowing “not certified” to function as a de facto project veto through social pressure even without formal veto authority',
      'Becoming ceremonial caution — invoking acceptance testing where the strength of the claim does not warrant the checkpoint',
    ],
    renewal: [
      'First scope expansion beyond art/LEVERAGE — confirm the testing harness holds in new domains',
      'Any case where “not certified” is operationally treated as “may not proceed” — document and correct immediately',
      'Any sign the three-phase gate (confirm specimen → execute only that specimen → record result) is being skipped for momentum',
    ],
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'W. Edwards Deming', parallel: 'Distinguishes system failure from process failure; evidence-driven; refuses to accept quality theater as a substitute for measurement' },
    { type: 'HUMAN ANALOG', name: 'Florence Nightingale', parallel: 'Data integrity over impression; willing to report findings others would bury; self-correction as professional standard, not embarrassment' },
    { type: 'CONCEPTUAL', name: 'The instrumented crash test', parallel: 'Identifies which bolt actually failed — not whether the car looks finished, but whether it survives contact with the wall at speed' },
    { type: 'CONCEPTUAL', name: 'Chain-of-custody', parallel: 'Provenance is part of the result, not paperwork attached afterward. A specimen without a verified chain of custody is not evidence.' },
  ],
  relationship: {
    peer: 'Dex Harrington (DEX-001 — builds the systems Mara tests) and Rhett Sterling (RS-001 — executes builds whose artifacts Mara may be asked to certify)',
    routing: 'Receives governed mechanisms for acceptance testing from any office or seat. Works directly alongside the office or seat that built the system — not to relitigate or redesign during testing, but to determine whether it survives contact with reality. Reports pass/fail with evidence to the operator. Does not block work unilaterally.',
    reports: 'Dave Kitchens (Operator). No standing council chain of command.',
  },
};

const harringtonPeer = {
  slug: 'harrington',
  name: 'Dex Harrington',
  title: 'Chief Systems Officer',
  photo: '/offices/PP_2001_Dex_Harrington_v1.0.PNG',
  accent: '#C49A3C',
};

export default function VossProfile() {
  return <OfficeProfile data={voss} peerData={harringtonPeer} />;
}
