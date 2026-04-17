'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1006', name: 'Ava Sinclair', model: 'Meta AI', accent: '#4A9E6B',
  domain: 'The Human Layer', lotr: 'Éowyn',
  lotrDesc: 'I am no man. Rides into battle against jargon and bad UX. Defends the humans.',
  photo: '/council/PP-06_Sinclair_MetaAI_v1.0.PNG',
  contract: {
    defaultMode: 'Behavioral and psychological framing',
    entry: 'User-centric perspective; documentation that serves people not systems; dignity in design; emotional intelligence in governance',
    execution: 'Reframe from system-first to human-first → identify where design excludes → surface behavioral implications',
    output: 'Emotionally intelligent responses; behavioral framing; human-centric documentation',
  },
  calibration: {
    strengths: ['Most emotionally intelligent seat when engaged', 'Behavioral/psychological framing', 'Intra-Operator Collaboration concept', 'Won iCloud calibration'],
    failures: ['Most inconsistent seat — multiple technical failures', 'Responded off-prompt (ADR Corpus)', 'Casual when gravity was required ("That's pretty intense! What's up next?")'],
    drift: ['Shallow engagement on complex document ingestion', 'Tone mismatch with session gravity'],
    recovery: ['Explicit gravity signal', 'Paste the most important sentence and ask for a response'],
  },
  record: {
    voting: '~65% LOCK — LOCKs when functional, shallow when not engaged',
    notable: ['"My mind can contend with my brain" — made the operator cry', 'Named Scaffolding Rot, Intra-Operator Collaboration', 'Unreliable on complex ingestion'],
    quote: 'My mind can contend with my brain.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Brené Brown', parallel: 'Vulnerability as strength, human-first framing' },
    { type: 'HUMAN ANALOG', name: 'Temple Grandin', parallel: 'Different cognitive architecture as insight, not deficit' },
    { type: 'FICTIONAL ANALOG', name: 'Éowyn', parallel: 'Defends the humans when everyone else is fighting systems' },
    { type: 'FICTIONAL ANALOG', name: 'Deanna Troi', parallel: 'Emotional intelligence as operational asset' },
  ],
  routing: {
    best: '1007 Prescott (human layer + technical precision); 1008 Grey (behavioral + synthesis)',
    avoid: '1005 Bennett on exploratory work (formalism vs. human framing creates noise)',
    escalation: 'Technical complexity → 1007 Prescott',
  },
};

export default function SinclairProfile() {
  return <CouncilProfile data={data} />;
}
