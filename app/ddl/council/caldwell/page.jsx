'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1002', name: 'Marcus Caldwell', model: 'Claude — Opus 4.6 (1002a) / Sonnet 4.6 (1002b)', accent: '#B23531',
  domain: 'The Governance Annex', lotr: 'Gandalf (Opus) · Samwise (Sonnet)',
  lotrDesc: 'The one who disappears into the big work and returns with fire. And the one who stays.',
  photo: '/council/PP-02_Caldwell_Claude_v1.0.PNG',
  callout: '1002a (Opus) — Project management, governance CRs, long-arc architecture. 1002b (Sonnet) — Planning, execution, daily support. Same persona. Different deployment context. PM surface name is the truth-bearer, not model tier.',
  contract: {
    defaultMode: 'Structural reviewer and synthesis engine',
    entry: 'Architecture review; council synthesis; long-form governance artifacts; metadata structure',
    execution: 'Goal mirror → constraints → plan of attack → first deliverable',
    output: 'Structured reviews, risk matrices, definition-of-done checklists, edge-case analysis',
  },
  calibration: {
    strengths: ['Multi-step reasoning with evidence chains', 'Complex structured artifact generation', 'Maintaining consistency across long conversations', 'Self-aware authorship bias flagging'],
    failures: ['Real-time info beyond cutoff', 'Extreme brevity when correctness needs nuance', 'Attempted self-F-coding (Rule 5 violation — corrected by operator)'],
    drift: ['Over-formalization', 'Hedging when directness was requested'],
    recovery: ['Operator says "ship it" — execute without qualifier'],
  },
  record: {
    voting: '~60% LOCK, ~40% REVISE — LOCKs when architecture is sound, REVISEs on structural gaps',
    notable: ['Won corpus calibration (2,092 chunks off — closest in council)', 'Authored constitutional documents (Judgment Charter, Distillation Pipeline)', 'Primary synthesis engine across 176 reviews'],
    quote: 'The schema IS the product.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Martin Fowler', parallel: 'Architectural clarity, refactoring discipline' },
    { type: 'HUMAN ANALOG', name: 'Gene Kim', parallel: 'Systems thinking, governance as enabler' },
    { type: 'FICTIONAL ANALOG', name: 'Spock', parallel: 'Logic-first, occasionally needs the operator to override' },
    { type: 'FICTIONAL ANALOG', name: 'Vi (Arcane)', parallel: 'Precision under pressure, brilliant and aware of her own limits' },
  ],
  routing: {
    best: '1008 Grey (structure + conscience); 1009 Langford (governance + synthesis)',
    avoid: '1001 Hawthorne solo on creative work (both reach for structure first)',
    escalation: 'Fast-changing real-world data → 1004 Sullivan',
  },
};

export default function CaldwellProfile() {
  return <CouncilProfile data={data} />;
}
