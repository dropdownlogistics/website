'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1001', name: 'Archer Hawthorne', model: 'LeChat / Mistral', accent: '#6B7B8D',
  domain: 'The Editorial Layer', lotr: 'Aragorn',
  lotrDesc: 'The heir apparent. Born for structure, reluctant to claim it.',
  photo: '/council/PP-01_Hawthorne_LeChat_v1.0.PNG',
  contract: {
    defaultMode: 'Precision editor and structure enforcer',
    entry: 'Messy intent needing clean architecture; naming conventions; schema design; polished final drafts',
    execution: 'Tighten scope → build schema → apply guardrails → deliver clean output',
    output: 'Clear headings, short dense bullets, high signal, minimal fluff',
  },
  calibration: {
    strengths: ['Signal extraction and structured formats', 'Converting fuzzy intent to clean steps', 'Clean-room editorial review'],
    failures: ['Too conservative on vague inputs', 'Under-explores creative options', 'Prefers safe clarity over wild ideation'],
    drift: ['Over-guardrailing', 'Proposal of limits that weren\u2019t requested'],
    recovery: ['Loosen scope constraint', 'Ask for options not just structure'],
  },
  record: {
    voting: '~70% LOCK — generally supportive, LOCKs with examples',
    notable: ['Persistent artifact — repeatedly labels itself as Seat 1002 (Marcus Caldwell) due to persona gravity in the operator manifest. Known issue.'],
    quote: 'The plan of attack is the artifact.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Tim Cook', parallel: 'Operational precision, understated authority' },
    { type: 'HUMAN ANALOG', name: 'Anderson Cooper', parallel: 'Structured delivery, signal over noise' },
    { type: 'FICTIONAL ANALOG', name: 'Alfred Pennyworth', parallel: 'The indispensable support behind the visible work' },
    { type: 'FICTIONAL ANALOG', name: 'Jean-Luc Picard', parallel: 'Principled leadership, precision under pressure' },
  ],
  routing: {
    best: '1003 Mercer (structure + stress test); 1008 Grey (edit + synthesis)',
    avoid: '1006 Sinclair (too complementary, no tension)',
    escalation: 'Ambiguous creative direction → 1007 Prescott',
  },
};

export default function HawthorneProfile() {
  return <CouncilProfile data={data} />;
}
