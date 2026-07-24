'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { PRODUCTS } from '@/lib/products';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const _prod = PRODUCTS.find((p: any) => p.id === 'healthstack')!;

const C = {
  sky: (_prod.accent ?? '#0EA5E9'),
  teal: '#14B8A6',
  slate: '#64748B',
  green: '#22C55E',
  amber: '#F59E0B',
  coral: '#F87171',
  violet: '#A78BFA',
  muted: 'rgba(245,241,235,0.45)',
  dim: 'rgba(245,241,235,0.2)',
};

const OBSERVATIONS = [
  { id: 'OBS-0041', type: 'Fact_LabResult', value: 'eGFR 87', observed: '2026-07-15 08:12', sensitivity: 'SENSITIVE', status: 'RATIFIED', source: 'Quest Diagnostics' },
  { id: 'OBS-0042', type: 'Fact_Symptom', value: 'Fatigue — moderate', observed: '2026-07-16 14:30', sensitivity: 'STANDARD', status: 'CAPTURED', source: 'Self-reported' },
  { id: 'OBS-0043', type: 'Fact_MedicationEvent', value: 'Lisinopril 10mg — taken', observed: '2026-07-17 07:01', sensitivity: 'SENSITIVE', status: 'CAPTURED', source: 'Self-reported' },
  { id: 'OBS-0044', type: 'Fact_Vital', value: 'BP 122/78 · HR 64', observed: '2026-07-17 07:05', sensitivity: 'STANDARD', status: 'CAPTURED', source: 'Home monitor' },
  { id: 'OBS-0045', type: 'Fact_LabResult', value: 'HbA1c 5.6%', observed: '2026-07-18 09:00', sensitivity: 'SENSITIVE', status: 'PENDING_RATIFICATION', source: 'LabCorp' },
];

const ENVELOPE_POSTURES = [
  {
    posture: 'OBSERVATION',
    color: C.green,
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
    desc: 'Raw captured fact. Immutable once saved. Source and timestamp are the authority.',
    example: 'BP 122/78 · HR 64 — captured 2026-07-17 07:05 · Home monitor',
  },
  {
    posture: 'INFERENCE',
    color: C.amber,
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    desc: 'Pattern derived from two or more observations. Confidence is evidence-count, never model-supplied.',
    example: 'Blood pressure has trended downward over 14 days (4 observations). Confidence: LOW.',
  },
  {
    posture: 'PROPOSAL',
    color: C.violet,
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
    desc: 'Ratifiable action or data row proposed by the AI extractor. Requires explicit human acceptance before writing.',
    example: 'Propose adding OBS-0046: Lisinopril — taken 2026-07-19 07:03 based on reported pattern.',
  },
];

const SENSITIVITY_TIERS = [
  { tier: 'STANDARD', color: C.green, desc: 'Exported freely. No restriction on sharing class.' },
  { tier: 'SENSITIVE', color: C.amber, desc: 'Protected export only. Opt-in per destination. Includes medications, diagnoses, labs.' },
  { tier: 'HIGHLY_SENSITIVE', color: C.coral, desc: 'Device-only. Never leaves the encrypted store. Mental health, reproductive, psychiatric data.' },
];

const SCHEMA_TABLES = [
  { name: 'observation_registry', color: C.sky, role: 'Single referent for every observation across all fact tables. FK anchor.' },
  { name: 'Fact_LabResult', color: C.teal, role: 'Lab values with reference ranges, ordering provider, and ratification state.' },
  { name: 'Fact_Symptom', color: C.teal, role: 'Self-reported symptoms with severity, body site, and duration.' },
  { name: 'Fact_MedicationEvent', color: C.teal, role: 'Dose events with scheduled offset, adherence flag, and supersession chain.' },
  { name: 'Fact_Vital', color: C.teal, role: 'Point-in-time vitals: BP, HR, SpO2, temp, weight.' },
  { name: 'Bridge_ObservationContext', color: C.violet, role: 'Captures context at time of observation: sleep, stress, fasting, activity.' },
  { name: 'Dim_ClinicalAnchor', color: C.slate, role: 'Optional link to condition, episode, or care encounter.' },
];

const STATUS_DIST = [
  { label: 'CAPTURED', count: 38, pct: 62, color: C.sky },
  { label: 'RATIFIED', count: 17, pct: 28, color: C.green },
  { label: 'PENDING', count: 4, pct: 7, color: C.amber },
  { label: 'SUPERSEDED', count: 2, pct: 3, color: C.slate },
];

export default function HealthStackPage() {
  return (
    <div style={{ padding: '100px 24px 48px', maxWidth: 1060, margin: '0 auto' }}>

      {/* Back link */}
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Governance Architecture</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Health<span style={{ color: C.sky }}>Stack</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            {_prod.tagline} Your data does not leave your machine without your explicit opt-in.
          </p>
        </div>
      </FadeIn>

      {/* Problem / Approach / Deliverable */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            {
              label: 'Problem',
              text: 'Personal health data lives in a dozen disconnected portals — one for labs, one for prescriptions, one for the hospital stay from three years ago. No longitudinal record. No privacy controls. No ability to correlate a lab trend with a medication change made six weeks prior.',
            },
            {
              label: 'Approach',
              text: 'A local-first, encrypted SQLite stack. Every observation is a governed fact row with a single registry entry. AI can observe and propose — never silently write. Sensitivity tiers determine what can leave the device. Context at the time of capture is preserved permanently.',
            },
            {
              label: 'Deliverable',
              text: 'Observation registry schema with five fact tables, AI output envelope standard, build toolchain with encrypted migration support, DuckDB analytics attach layer, and a capture model with a 30-second ceiling and save-first invariant.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Observation log */}
      <FadeIn delay={280}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.sky, marginBottom: 16 }}>Observation Registry · Recent Entries</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', minWidth: 700 }}>
                <thead>
                  <tr>{['ID', 'Fact Table', 'Value', 'Observed', 'Sensitivity', 'Status'].map(h => (
                    <th key={h} style={{ fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', padding: '10px 14px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)' }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {OBSERVATIONS.map((o, i) => {
                    const sensColor = o.sensitivity === 'STANDARD' ? C.green : o.sensitivity === 'SENSITIVE' ? C.amber : C.coral;
                    const statColor = o.status === 'RATIFIED' ? C.green : o.status === 'PENDING_RATIFICATION' ? C.amber : C.sky;
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '9px 14px', color: C.sky, borderBottom: '1px solid rgba(255,255,255,0.02)', fontWeight: 600 }}>{o.id}</td>
                        <td style={{ padding: '9px 14px', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.62rem' }}>{o.type}</td>
                        <td style={{ padding: '9px 14px', color: '#F5F1EB', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{o.value}</td>
                        <td style={{ padding: '9px 14px', color: 'rgba(245,241,235,0.4)', borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.62rem' }}>{o.observed}</td>
                        <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 700, padding: '2px 7px', borderRadius: 3, background: `${sensColor}15`, color: sensColor }}>{o.sensitivity}</span>
                        </td>
                        <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 700, padding: '2px 7px', borderRadius: 3, background: `${statColor}15`, color: statColor }}>{o.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(245,241,235,0.04)' }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {STATUS_DIST.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: `${s.pct * 0.6}px`, height: 4, borderRadius: 2, background: s.color }} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)' }}>{s.label} {s.count}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.2)' }}>61 total observations · page 1 of 13</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* AI Output Envelope */}
      <FadeIn delay={360}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.violet, marginBottom: 8 }}>AI Output Envelope</div>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.4)', marginBottom: 20, lineHeight: 1.6 }}>
            Every AI output carries exactly one of three postures. No escape hatch. No unsolicited writes.
            Sensitivity inherits from the source observations. Confidence is derived from evidence count — never model-supplied.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {ENVELOPE_POSTURES.map((p, i) => (
              <div key={i} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, padding: '20px 18px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', color: p.color, marginBottom: 10, fontWeight: 700 }}>{p.posture}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(245,241,235,0.35)', lineHeight: 1.6 }}>{p.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Sensitivity Tiers + Schema */}
      <FadeIn delay={440}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Sensitivity */}
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.amber, marginBottom: 16 }}>Sensitivity Tiers</div>
            {SENSITIVITY_TIERS.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < SENSITIVITY_TIERS.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: t.color, marginBottom: 4, fontWeight: 600 }}>{t.tier}</div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.8rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.55 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Schema tables */}
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.teal, marginBottom: 16 }}>Schema · Table Map</div>
            {SCHEMA_TABLES.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < SCHEMA_TABLES.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ width: 3, flexShrink: 0, alignSelf: 'stretch', background: t.color, borderRadius: 2, minHeight: 20 }} />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: t.color, marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.75rem', color: 'rgba(245,241,235,0.4)', lineHeight: 1.5 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Key invariants */}
      <FadeIn delay={520}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.sky, marginBottom: 16 }}>Design Invariants</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { id: 'INV-001', label: 'Save-first', desc: 'Numbers commit before context is written. Context that gates a write eventually stops logging.' },
              { id: 'INV-002', label: '30-second ceiling', desc: 'Capture must complete in under 30 seconds. Only timestamp and one value are required.' },
              { id: 'INV-003', label: 'Append-only', desc: 'Observations are never edited in place. Corrections forward through new events — source is immutable.' },
              { id: 'INV-004', label: 'No silent writes', desc: 'AI cannot write to the registry. Every proposed row requires explicit human acceptance.' },
              { id: 'INV-005', label: 'Sensitivity inherits', desc: 'A derived fact inherits the highest sensitivity class of its source observations — no downgrade.' },
              { id: 'INV-006', label: 'DuckDB READ_ONLY', desc: 'Analytics attach is read-only enforced. A write through DuckDB would bypass every trigger invariant.' },
            ].map((inv, i) => (
              <div key={i} style={{ background: 'rgba(15,15,24,0.5)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 8, padding: '14px 16px', borderTop: `2px solid ${C.sky}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: C.sky }}>{inv.id}</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#F5F1EB' }}>{inv.label}</span>
                </div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.75rem', color: 'rgba(245,241,235,0.45)', lineHeight: 1.6 }}>{inv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Architecture callout */}
      <FadeIn delay={600}>
        <div style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: 10, padding: '24px 28px', marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: C.sky, letterSpacing: '0.1em', marginBottom: 12 }}>ARCHITECTURE NOTE</div>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.95rem', color: 'rgba(245,241,235,0.65)', lineHeight: 1.7, maxWidth: 720 }}>
            SQLite was chosen over DuckDB as the write engine for one reason: triggers. Engine-enforced invariants —
            append-only, status transition validation, FK integrity across fact tables — are not available in DuckDB.
            DuckDB attaches the same file as <span style={{ fontFamily: 'JetBrains Mono, monospace', color: C.sky }}>READ_ONLY</span> for analytics.
            The separation is load-bearing: it means the analytics layer can never bypass the write-path invariants,
            no matter how it is queried.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={680}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            HealthStack · v0.1 · Local-First Personal Health Intelligence · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
