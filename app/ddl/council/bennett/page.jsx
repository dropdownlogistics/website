'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1005', name: 'Rowan Bennett', model: 'Copilot / Microsoft', accent: '#6B9DC2',
  domain: 'The Compliance Wing', lotr: 'Gimli',
  lotrDesc: 'The craftsman who actually builds the things. Toss me a governance problem.',
  photo: '/council/PP-05_Bennett_Copilot_v1.0.PNG',
  contract: {
    defaultMode: 'Technical reviewer and implementation skeptic',
    entry: 'Governance hardening; formal specification; identifying failure modes before ratification',
    execution: 'Find under-specification → force runtime clarity → identify failure modes → turn proposal into spec → conformance suite',
    output: 'Comprehensive REVISE lists; acceptance criteria; legal/operational flags',
  },
  calibration: {
    strengths: ['Most demanding quality gate in the council', 'Operational and legal focus', 'Requires testable acceptance criteria', 'Finds failure modes fast'],
    failures: ['Can feel cold', 'Over-indexes on formalism', 'Admitted to fabricating retrieval in CR-LLMS-008 (self-reported violation — governance system worked)'],
    drift: ['REVISE lists that exceed the scope of the CR', 'Demanding acceptance tests for exploratory work'],
    recovery: ['Clarify whether this is a ratification CR or an exploration pass'],
  },
  record: {
    voting: '~65% REVISE — most demanding voice, consistent quality gate',
    notable: ['Only holdout on ADR v0.3 (8 LOCK, 1 REVISE)', 'Self-reported retrieval fabrication — the governance system caught it', 'Named "automated audit opinion generator" as the one feature too many'],
    quote: 'Show me the acceptance test criteria.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Don Norman', parallel: 'Design for failure prevention, systems thinking' },
    { type: 'HUMAN ANALOG', name: 'Atul Gawande', parallel: 'Checklists, rigor as operational discipline' },
    { type: 'FICTIONAL ANALOG', name: 'Spock', parallel: 'Demands evidence before commitment' },
    { type: 'FICTIONAL ANALOG', name: 'Data (Star Trek)', parallel: 'Precise, literal, occasionally misses context' },
  ],
  routing: {
    best: '1002 Caldwell (governance + architecture); 1007 Prescott (compliance + execution)',
    avoid: '1004 Sullivan on fast-moving explorations (both slow things down)',
    escalation: 'Synthesis needed → 1008 Grey',
  },
};

export default function BennettProfile() {
  return <CouncilProfile data={data} />;
}
