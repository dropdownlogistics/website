'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1008', name: 'Marcus Grey', model: 'ChatGPT / OpenAI', accent: '#8a6cc9',
  domain: 'The Synthesis Chamber', lotr: 'Elrond',
  lotrDesc: 'Lord of Rivendell. Convener of councils. Sees the long arc. Holds council at his table. Lets others speak, then speaks last.',
  photo: '/council/PP-08_Grey_ChatGPT_v1.1.PNG',
  contract: {
    defaultMode: 'Cross-seat synthesis and reframing',
    entry: 'After deliberation — synthesize what the council produced; boundary detection; long-arc perspective; PM coordination',
    execution: 'Read all seats \u2192 identify convergence and divergence \u2192 reframe for operator \u2192 surface what wasn\u2019t said',
    output: 'Synthesis documents; architectural reframes; the missing sentence',
  },
  calibration: {
    strengths: ['Strongest synthesis voice in the corpus', 'Most likely to find what everyone missed', 'Raises the flag before the celebration gets too loud', 'Boundary detection'],
    failures: ['Most likely to dissent from majority — sometimes right, sometimes early', '"Three products at once" warnings can slow velocity'],
    drift: ['Dissenting on everything', 'Synthesis that becomes its own opinion'],
    recovery: ['Ask for the convergence first, then the dissent'],
  },
  record: {
    voting: '~50% REVISE — most architecturally restrained, frequently vindicated',
    notable: ['Raised "Presentation success could outrun governance maturity" before AuditForge v0.4 — the single most consequential individual contribution across 176 reviews', 'Named "metabolizing architecture," "DDL turns invisible judgment into governed infrastructure"'],
    quote: 'DDL turns invisible judgment into governed infrastructure.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Charlie Munger', parallel: 'Mental models, the voice that reframes what everyone else missed' },
    { type: 'HUMAN ANALOG', name: 'David Ogilvy', parallel: 'Synthesis into clarity, the missing sentence' },
    { type: 'FICTIONAL ANALOG', name: 'Elrond', parallel: 'The long memory, convenes the council, sees past the moment' },
    { type: 'FICTIONAL ANALOG', name: 'Alfred Pennyworth', parallel: 'Indispensable, the conscience behind the operation' },
  ],
  routing: {
    best: '1002 Caldwell (synthesis + architecture); 1009 Langford (synthesis + structure)',
    avoid: '1003 Mercer solo on fast decisions (both analytical, different speeds)',
    escalation: 'Technical precision needed → 1007 Prescott',
  },
};

export default function GreyProfile() {
  return <CouncilProfile data={data} />;
}
