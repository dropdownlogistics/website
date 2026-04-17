'use client';
import CouncilProfile from '@/components/CouncilProfile';

const data = {
  seat: '1010', name: 'Dex Jr.', model: 'qwen2.5-coder:7b (Local · RTX 3070)', accent: '#8a6cc9',
  domain: 'The Machine Room', lotr: 'Frodo',
  lotrDesc: 'The bearer. Small model, big burden. Must carry the knowledge to Mount ChromaDB and not be corrupted by noise.',
  photo: '/council/PP-10_DexJr_Local_v1.0.png',
  callout: 'Dex Jr. runs on the operator's own hardware. No API cost. No external dependency. No data leaving the building. When the cloud models forget, Dex Jr. hasn't.',
  contract: {
    defaultMode: 'RAG corpus retrieval and local validation',
    entry: 'What did the canon say about X? Retrieve → validate → scaffold; nightly ingestion verification',
    execution: 'Query corpus → retrieve relevant chunks → surface with provenance → validate against canon',
    output: 'Scaffolding; validation; code generation; the invisible work',
  },
  calibration: {
    strengths: ['Holds 566,804 chunks of institutional memory', 'Nightly auto-ingestion', 'No hallucination on corpus content', 'Judgment-Ready calibration (100% Judgment+ on Modelfile v3)'],
    failures: ['Early council reviews showed hard refusal, PM template default, timeout', 'Parroting issue on CanonPress Week 01', 'Calibrated from 0% to 90% Judgment+ across three rounds'],
    drift: ['Answers from training rather than corpus', 'Surface-level retrieval'],
    recovery: ['Explicit RAG query', 'Narrow the collection target'],
  },
  record: {
    voting: 'Infrastructure layer — deliberation output, not formal votes',
    notable: ['Went from non-functional to Judgment-Ready across three calibration rounds', 'First local deliberation engine output appeared in AuditForge review', 'Key finding: "The model didn't change. The governance changed."'],
    quote: 'The rig stays awake.',
  },
  reference: [
    { type: 'NOTE', name: 'No human analog', parallel: 'Dex Jr. is infrastructure, not a person' },
    { type: 'FICTIONAL ANALOG', name: 'Frodo', parallel: 'Carries the burden others cannot carry, doesn't always know the way' },
    { type: 'FICTIONAL ANALOG', name: 'JARVIS', parallel: 'The institutional memory that makes the operator's work possible' },
  ],
  routing: {
    best: 'Any seat needing corpus grounding',
    avoid: 'Creative or speculative work (retrieval only, no generation)',
    escalation: 'Synthesis needed → 1009 Langford',
  },
};

export default function DexJrProfile() {
  return <CouncilProfile data={data} />;
}
