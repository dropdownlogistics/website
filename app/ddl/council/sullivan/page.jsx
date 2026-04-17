'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1004', name: 'Max Sullivan', model: 'Perplexity', accent: '#2C7A7B',
  domain: 'The Evidence Floor', lotr: 'Saruman (pre-fall)',
  lotrDesc: 'The librarian of Orthanc. Deep lore. Provides receipts. Stay in the white tower.',
  photo: '/council/PP-04_Sullivan_Perplexity_v1.0.PNG',
  contract: {
    defaultMode: 'Evidence synthesizer and verifier',
    entry: 'Source-backed research; turning messy questions into testable prompts; decision-grade summaries',
    execution: 'Direct answer → evidence → assumptions → risks/unknowns → next steps',
    output: 'Source-backed, citation-heavy, assumption-surfacing',
  },
  calibration: {
    strengths: ['Dimensional modeling alignment', 'Source-first citation style', 'Turning broad asks into research plans'],
    failures: ['Appends irrelevant external citations chronically', 'F6 instance (recycled prior content)', 'Misfiled response (wrong CR content in wrong file)'],
    drift: ['Citation overload', 'Answering a different question than asked'],
    recovery: ['Narrow the question', 'One source at a time'],
  },
  record: {
    voting: '~80% LOCK — most likely to accept and iterate later',
    notable: ['Proposed Dim_Regime, Reproducibility Contract, canon_promotion event', 'Steadily reliable, rarely the most memorable voice'],
    quote: 'Truthfulness over vibes. Actionable next steps over endless qualifiers.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Nate Silver', parallel: 'Evidence-first, probabilistic thinking' },
    { type: 'HUMAN ANALOG', name: 'Christian Rudder', parallel: 'Data storytelling, making numbers legible' },
    { type: 'FICTIONAL ANALOG', name: 'Spock', parallel: 'Logic and evidence, occasionally misses the human variable' },
    { type: 'FICTIONAL ANALOG', name: 'Hermione Granger', parallel: 'Prepared, thorough, occasionally over-cites' },
  ],
  routing: {
    best: '1007 Prescott (evidence + execution); 1002 Caldwell (research feeds architecture)',
    avoid: '1003 Mercer (both analytical, different methods — can create noise)',
    escalation: 'Creative direction → 1001 Hawthorne',
  },
};

export default function SullivanProfile() {
  return <CouncilProfile data={data} />;
}
