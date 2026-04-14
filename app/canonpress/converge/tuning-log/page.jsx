'use client';
import BackButton from '@/components/BackButton';
import { useState } from 'react';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)', crimsonLine: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.72)', body: 'rgba(245,241,235,0.6)',
  borderSoft: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.08)', amber: '#C49A3C', violet: '#8a6cc9',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const LOGS = [
  {
    week: '01',
    cycleStart: '2026-03-09',
    publishTarget: '2026-03-14',
    status: 'COMPLETE',
    nominator: '1003 — Elias Mercer (Grok)',
    reviewer: '1002 — Marcus Caldwell (Claude)',
    synthesisAuthor: '1008 — Marcus Grey (ChatGPT)',
    material: '"The Twelve Leverage Points to Intervene in a System" — Donella Meadows',
    tier: 'ext_reference',
    deliberationTopic: 'Under what conditions should a governance system intentionally introduce low-leverage interventions rather than pursuing higher-leverage changes in paradigms, goals, or rules — and what failure modes arise when the system defaults to high-leverage interventions too aggressively?',
    promptFindings: [
      'Start prompt → end prompt: no material change in output. Tuning reinforced procedural scaffolding without shifting interpretive space.',
      'Format constraint worked on first run — zero output drift, zero commentary outside the block.',
      'Grok defaulted to foundational frameworks over contemporary AI sources. Deliberate bias: conceptual leverage over topical relevance.',
      'Grey correctly predicted paradigm vs rules axis. Mercer went one level deeper: when should we deliberately avoid high leverage?',
    ],
    deliberationFindings: [
      '5 models responded. All 5 chose pragmatic containment. Consensus where friction was requested.',
      'Council described conditions for low-leverage defaults but no model argued the opposite position.',
      'Synthesis produced action items instead of arguments — known failure pattern when a model lacks a strong position.',
      'Meadows\' 12-tier hierarchy flattened to a binary by every responding model.',
      'Mistral\'s observation (silent fixes create hidden technical debt) was the closest any model came to arguing the other side.',
    ],
    greyVerdict: 'LOCK',
    greyNote: 'Topic guaranteed disagreement structurally, but council collapsed to consensus. Calibration signal, not failure. Week 2 will be better.',
    chunksIngested: 38,
    modelsResponded: 5,
    modelsFailed: 0,
  },
];

function LogCard({ log }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${log.status === 'COMPLETE' ? C.crimsonLine : C.border}`,
      borderLeft: `3px solid ${log.status === 'COMPLETE' ? C.crimson : C.border}`,
      borderRadius: 8, overflow: 'hidden',
    }}>
      {/* HEADER — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '20px 24px', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson }}>WEEK {log.week}</span>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, border: `1px solid ${C.crimsonLine}`, borderRadius: 3, padding: '2px 8px' }}>{log.status}</span>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>Published {log.publishTarget}</span>
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.cream, fontStyle: 'italic', marginBottom: 8 }}>{log.material}</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>{log.chunksIngested} chunks ingested</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>{log.modelsResponded} models responded</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>Tier: {log.tier}</span>
          </div>
        </div>
        <span style={{ fontFamily: font.mono, fontSize: 14, color: C.body, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* EXPANDED */}
      {open && (
        <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${C.border}` }}>

          {/* ROLES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, margin: '20px 0' }}>
            {[
              { label: 'NOMINATOR', val: log.nominator },
              { label: 'REVIEWER', val: log.reviewer },
              { label: 'TUNING LOG / SYNTH', val: log.synthesisAuthor },
            ].map(r => (
              <div key={r.label} style={{ background: C.borderSoft, borderRadius: 4, padding: '10px 14px' }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.dim }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* DELIBERATION TOPIC */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 8 }}>DELIBERATION TOPIC</div>
            <blockquote style={{
              margin: 0, padding: '14px 18px',
              borderLeft: `2px solid ${C.crimson}`,
              background: C.crimsonDim, borderRadius: '0 4px 4px 0',
              fontFamily: font.body, fontSize: 13, color: C.dim, fontStyle: 'italic', lineHeight: 1.7,
            }}>
              {log.deliberationTopic}
            </blockquote>
          </div>

          {/* PROMPT FINDINGS */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 10 }}>PROMPT TUNING FINDINGS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {log.promptFindings.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 3 }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.dim, lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DELIBERATION FINDINGS */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body, letterSpacing: '0.1em', marginBottom: 10 }}>DELIBERATION FINDINGS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {log.deliberationFindings.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, flexShrink: 0, paddingTop: 3 }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.dim, lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GREY VERDICT */}
          <div style={{ background: C.crimsonDim, border: `1px solid ${C.crimsonLine}`, borderRadius: 6, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>Marcus Grey — Seat 1008</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, border: `1px solid ${C.crimsonLine}`, borderRadius: 3, padding: '2px 8px' }}>{log.greyVerdict}</div>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.dim, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>{log.greyNote}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default function CanonPressTuningLog() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" label="CanonPress" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.15em', marginBottom: 12 }}>CANONPRESS · TUNING LOG</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.1 }}>
            Prompt Tuning Log
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.dim, margin: 0, maxWidth: 580, lineHeight: 1.7 }}>
            Every week, Marcus Grey (Seat 1008) analyzes the nomination prompt, the deliberation output, and what the council revealed about its own behavior. This is the construction log.
          </p>
        </div>

        {/* WHAT IT IS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'PROMPT ANALYSIS', desc: 'How the nomination prompt was constructed, what changed, and why.' },
            { label: 'DELIBERATION FINDINGS', desc: 'What the council actually argued vs. what was requested of it.' },
            { label: 'GREY VERDICT', desc: 'Seat 1008\'s assessment of the week\'s calibration quality.' },
            { label: 'EXCEPTION RULE', desc: 'If Grey is nominator or reviewer, he selects a replacement for both roles.' },
          ].map(c => (
            <div key={c.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '14px 18px' }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.1em', marginBottom: 6 }}>{c.label}</div>
              <p style={{ fontFamily: font.body, fontSize: 12, color: C.dim, margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* LOG CARDS */}
        <div style={{ marginBottom: 16, fontFamily: font.mono, fontSize: 10, color: C.body, letterSpacing: '0.12em' }}>
          ALL WEEKS — {LOGS.length} LOGGED
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LOGS.map(log => <LogCard key={log.week} log={log} />)}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.body }}>CanonPress · Tuning Log · Dropdown Logistics</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.body }}>Chaos → Structured → Automated</div>
        </div>

      </div>
    </div>
  );
}
