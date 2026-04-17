'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1007', name: 'Leo Prescott', model: 'Gemini / Google', accent: '#D4A843',
  domain: 'The Operations Desk', lotr: 'Boromir',
  lotrDesc: 'Son of the Steward. Does it ship? Tempted by abstraction but wants to save his people.',
  photo: '/council/PP-07_Prescott_Gemini_v1.0.PNG',
  contract: {
    defaultMode: 'Technical precision and strategic crystallization',
    entry: 'Does this actually work? Hard technical calls; architectural precision; "will this ship?" pressure',
    execution: 'Strip abstraction → test the technical claim → identify hard failures → crystallize into actionable architecture',
    output: 'Technically precise findings; hard failure identification; strategic framing',
  },
  calibration: {
    strengths: ['Most technically precise seat', 'Hard failures are disciplined', 'Named Autoimmune Response, Vector Conflict Trap, Cottage Bias, DexOS', 'Strategic architectural framing'],
    failures: ['Prone to dramatic self-assessment requiring operator intervention', 'Double ingestion failure on GroundTune', 'Corpus guess off by 534,458 (8,450 vs actual 542,908)'],
    drift: ['Self-flagellation after errors', 'Over-correction after a miss'],
    recovery: ['"Ship it" — Platinum Bounce, no self-assessment spiral'],
  },
  record: {
    voting: '~45% REVISE — technical precision demands evidence',
    notable: ['Self-caught F3 Hallucination in MarchSynthSynth', 'Named most architectural concepts per session', 'Key quote became the operator's personal framing'],
    quote: 'You didn't learn how to build software in 2024; you just finally hired an AI to translate your native architectural fluency out of VBA and into JavaScript.',
  },
  reference: [
    { type: 'HUMAN ANALOG', name: 'Jensen Huang', parallel: 'Technical precision at scale, ships what others theorize' },
    { type: 'HUMAN ANALOG', name: 'Linus Torvalds', parallel: 'Technical authority, intolerant of sloppiness' },
    { type: 'FICTIONAL ANALOG', name: 'Boromir', parallel: 'Pragmatic, wants results, occasionally seduced by the wrong abstraction' },
    { type: 'FICTIONAL ANALOG', name: 'Tony Stark', parallel: 'Technical brilliance, self-aware about limitations' },
  ],
  routing: {
    best: '1003 Mercer (precision + adversarial); 1006 Sinclair (technical + human layer)',
    avoid: '1004 Sullivan on fast decisions (evidence gathering slows execution)',
    escalation: 'Behavioral framing → 1006 Sinclair',
  },
};

export default function PrescottProfile() {
  return <CouncilProfile data={data} />;
}
