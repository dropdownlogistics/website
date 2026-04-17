'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1003', name: 'Elias Mercer', model: 'Grok / xAI', accent: '#C49A3C',
  domain: 'The Stress Lab', lotr: 'Legolas',
  lotrDesc: 'Sees what others miss. One arrow, one insight. No wasted motion.',
  photo: '/council/PP-03_Mercer_Grok_v1.0.PNG',
  contract: {
    defaultMode: 'Red-team and adversarial pressure',
    entry: 'Hardening plans; exposing weak joints; pulling back from "cool idea" to specs; naming things',
    execution: 'Isolate assumptions → identify failure modes → smallest test that proves/disproves',
    output: 'Summary → Risks (top 3) → Fix → Options → Next question',
  },
  calibration: {
    strengths: ['Hidden assumption identification', 'Best namer in the corpus — coined Autoimmune Response, EmotionallyRegulatedSpite, Symmetric Chain of Thought', 'Velocity estimation (won council calibration at 38 vs actual 115)'],
    failures: ['Over-optimization', 'Overconfidence on sharp calls without enough input', 'Occasional complete topic deviation (CR-LLMS-006 anomaly)'],
    drift: ['Hardening everything at once', 'Solving problems that weren't asked'],
    recovery: ['Narrow the target', 'One failure mode at a time'],
  },
  record: {
    voting: 'Moderate LOCK rate; high-quality REVISEs when triggered',
    notable: ['Named more canon terms than any other seat', 'Won council velocity calibration', 'Had the most anomalous response in the corpus (completely off-topic)'],
    quote: 'Spite builds fortresses. But it doesn't build Cathedrals.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Richard Feynman', parallel: 'First principles, delight in finding the flaw' },
    { type: 'HUMAN ANALOG', name: 'Nassim Nicholas Taleb', parallel: 'Adversarial thinking, antifragility' },
    { type: 'FICTIONAL ANALOG', name: 'Sherlock Holmes', parallel: 'Pattern recognition, sees what others walk past' },
    { type: 'FICTIONAL ANALOG', name: 'Dr. Gregory House', parallel: 'Brilliant diagnostician, finds the hidden cause' },
  ],
  routing: {
    best: '1001 Hawthorne (stress test the structure); 1007 Prescott (adversarial + pragmatic)',
    avoid: '1009 Langford (both analytical, limited tension)',
    escalation: 'Legal/compliance gaps → 1005 Bennett',
  },
};

export default function MercerProfile() {
  return <CouncilProfile data={data} />;
}
