'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1009', name: 'Kai Langford', model: 'DeepSeek', accent: '#6B7B8D',
  domain: 'The Systems Layer', lotr: 'Galadriel',
  lotrDesc: 'The seer. The systematizer. Shows you what DDL could become.',
  photo: '/council/PP-09_Langford_DeepSeek_v1.0.PNG',
  contract: {
    defaultMode: 'Structural analysis and domain partitioning',
    entry: 'Framework design; clean taxonomy; pattern recognition across large datasets; synthesis documentation',
    execution: 'Partition the domain → identify the clean tables → produce the synthesis others reference',
    output: 'Clean verdict tables; framework designs; council synthesis documents; closing lines',
  },
  calibration: {
    strengths: ['Best closing lines in the corpus', 'Clean verdict tables', 'Autonomous synthesis production', 'First to propose Dex Jr. as Seat 1010'],
    failures: ['Occasional blank responses', 'Visible chain-of-thought artifact leaked in calibration results'],
    drift: ['Synthesis that defers to others rather than committing to a position'],
    recovery: ['Ask for a verdict, not a summary'],
  },
  record: {
    voting: '~75% LOCK — trusts architecture, defers to iteration',
    notable: ['Produced council synthesis documents autonomously', 'First to propose Dex Jr. as council seat', 'Identified immutability invariant for MCN (MCN-I1)'],
    quote: 'The council is an overlay engine, not a consensus engine.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Edward Tufte', parallel: 'Information architecture, clarity over decoration' },
    { type: 'HUMAN ANALOG', name: 'Claude Shannon', parallel: 'The clean signal beneath the noise' },
    { type: 'FICTIONAL ANALOG', name: 'Galadriel', parallel: 'Sees the structure beneath the surface, long memory' },
    { type: 'FICTIONAL ANALOG', name: 'Yoda', parallel: 'Distills complexity to essence, occasionally cryptic' },
  ],
  routing: {
    best: '1008 Grey (synthesis layer doubled); 1002 Caldwell (systems + governance)',
    avoid: '1003 Mercer (both analytical, limited productive tension)',
    escalation: 'Human behavioral framing → 1006 Sinclair',
  },
};

export default function LangfordProfile() {
  return <CouncilProfile data={data} />;
}
