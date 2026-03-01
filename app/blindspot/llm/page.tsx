'use client';

import { useState } from 'react';
import Link from 'next/link';

const models = [
  {
    role: 'Primary · Parsing + Briefs', name: 'Llama 3.1 8B', spec: 'Meta · Q4 quantization · Instruct-tuned',
    color: '#00E5FF', type: 'primary' as const,
    stats: [{ label: 'VRAM', val: '~5 GB' }, { label: 'Speed', val: '~25 t/s' }, { label: 'Download', val: '4.7 GB' }, { label: 'Context', val: '128K' }],
    tags: ['structured output', 'CSV parsing', 'brief generation'],
    why: 'Best balance of speed and capability at 8B parameters. Fits cleanly in 8GB VRAM with room for OS overhead. Strong at following structured output schemas — critical for parsing transcripts into CSV and generating briefs from dashboard data.',
    install: 'ollama pull llama3.1:8b',
  },
  {
    role: 'Secondary · Convergent Analysis', name: 'Mistral 7B', spec: 'Mistral AI · Q4 quantization · Instruct v0.3',
    color: '#B388FF', type: 'secondary' as const,
    stats: [{ label: 'VRAM', val: '~4.5 GB' }, { label: 'Speed', val: '~30 t/s' }, { label: 'Download', val: '4.1 GB' }, { label: 'Context', val: '32K' }],
    tags: ['second opinion', 'reasoning', 'comparison'],
    why: "Different architecture than Llama — different reasoning patterns, different blind spots. That's the point. Run the same prompt through both models: where they agree = high confidence. Where they diverge = your judgment call.",
    install: 'ollama pull mistral:7b',
  },
  {
    role: 'Compact · Fast Parsing', name: 'Phi-3.5 Mini', spec: 'Microsoft · 3.8B parameters · Long context',
    color: '#FFD43B', type: 'compact' as const,
    stats: [{ label: 'VRAM', val: '~2.5 GB' }, { label: 'Speed', val: '~45 t/s' }, { label: 'Download', val: '2.2 GB' }, { label: 'Context', val: '128K' }],
    tags: ['fast extraction', 'long documents', 'lightweight'],
    why: "When you need speed over depth. Transcript parsing, data extraction, simple CSV conversion — tasks where the model just needs to follow a schema, not reason deeply. Nearly 2× faster than the 8B models.",
    install: 'ollama pull phi3.5:3.8b-mini',
  },
];

const hardwareMatrix = [
  { gpu: 'RTX 4090', vram: '24 GB', m8b: 'Full', m7b: 'Full', m3b: 'Full', dual: 'Both in VRAM', speed: '~50+ t/s', good: true },
  { gpu: 'RTX 4070 Ti', vram: '12 GB', m8b: 'Full', m7b: 'Full', m3b: 'Full', dual: 'Swap required', speed: '~35 t/s', good: true },
  { gpu: 'RTX 3070', vram: '8 GB', m8b: 'Full', m7b: 'Full', m3b: 'Full', dual: 'Swap required', speed: '~25 t/s', good: true },
  { gpu: 'RTX 3060', vram: '12 GB', m8b: 'Full', m7b: 'Full', m3b: 'Full', dual: 'Swap required', speed: '~20 t/s', good: true },
  { gpu: 'GTX 1660', vram: '6 GB', m8b: 'Tight', m7b: 'Full', m3b: 'Full', dual: 'No', speed: '~12 t/s', good: false },
  { gpu: 'CPU Only', vram: '—', m8b: '8GB+ RAM', m7b: '8GB+ RAM', m3b: '4GB+ RAM', dual: 'Slow', speed: '~3-5 t/s', good: false },
  { gpu: 'Apple M1/M2/M3', vram: 'Shared', m8b: 'Full', m7b: 'Full', m3b: 'Full', dual: 'Unified memory', speed: '~20-40 t/s', good: true },
];

const checklistItems = [
  { text: 'Install Ollama runtime', detail: '~2 min', defaultChecked: true },
  { text: 'Verify GPU detection', detail: 'ollama list', defaultChecked: true },
  { text: 'Pull primary model (8B)', detail: '~5 min download', defaultChecked: true },
  { text: 'Pull secondary model (7B)', detail: '~4 min download', defaultChecked: false },
  { text: 'Run smoke test', detail: 'structured output', defaultChecked: false },
  { text: 'Create prompt templates', detail: 'parse + brief', defaultChecked: false },
  { text: 'First real inference run', detail: 'engine data → brief', defaultChecked: false },
  { text: 'Convergent analysis run', detail: 'dual-model compare', defaultChecked: false },
];

export default function BlindSpotLLM() {
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [checklist, setChecklist] = useState(checklistItems.map(c => c.defaultChecked));

  const toggleCheck = (i: number) => {
    const updated = [...checklist];
    updated[i] = !updated[i];
    setChecklist(updated);
  };

  return (
    <div style={{ background: '#08080C', color: '#D4D2CD', minHeight: '100vh', paddingTop: 60, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .bs-kpi:hover { border-color: #222230 !important; transform: translateY(-1px); }
        .bs-model:hover { border-color: #222230 !important; transform: translateY(-2px); }
        .bs-check:hover { background: rgba(255,255,255,0.01) !important; }
        .bs-row:hover { background: rgba(0,229,255,0.02) !important; }
        @keyframes bsBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 28px 0', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>
        <Link href="/blindspot" style={{ color: '#4A4840', textDecoration: 'none' }}>BlindSpot</Link>
        <span style={{ color: '#3E3D38' }}>/</span>
        <span style={{ color: '#00E5FF' }}>LLM</span>
      </div>

      {/* HERO */}
      <section style={{ padding: '48px 32px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(179,136,255,0.04) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#00E5FF', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, border: '1px solid #002E33', display: 'inline-block', padding: '5px 14px', borderRadius: 20, position: 'relative', zIndex: 1 }}>
          ⚡ Local Inference Layer
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.15, marginBottom: 12, position: 'relative', zIndex: 1 }}>
          Blind<span style={{ color: '#FFD43B' }}>Spot</span> <span style={{ color: '#00E5FF' }}>× LLM</span>
        </h1>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem', color: '#00E5FF', marginBottom: 16, position: 'relative', zIndex: 1 }}>
          Your data. Your hardware. Your models.
        </div>
        <p style={{ fontSize: '0.95rem', color: '#7A786F', maxWidth: 580, margin: '0 auto', fontWeight: 300, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Every BlindSpot engine generates structured data. The LLM layer reads that data and tells you what it means — pre-session briefs, pattern interpretation, convergent analysis. Runs on your GPU. Zero cloud. Zero API costs.
        </p>
      </section>

      {/* NAV BAR */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 20px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: '0.9rem' }}>
              <span style={{ color: '#D4D2CD' }}>Blind</span><span style={{ color: '#FFD43B' }}>Spot</span><span style={{ color: '#3E3D38', fontWeight: 400 }}> · llm</span>
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', padding: '3px 8px', borderRadius: 3, border: '1px solid #00E5FF', color: '#00E5FF' }}>⚡ LOCAL INFERENCE</span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#3E3D38' }}>
            <span><span style={{ color: '#00D26A' }}>●</span> ollama running</span>
            <span>gpu: detected</span>
            <span>models: 3 loaded</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
          {[
            { label: 'Runtime', val: 'Ollama', color: '#00E5FF', sub: 'local · no cloud' },
            { label: 'Inference Speed', val: '~25', color: '#00D26A', sub: 'tokens/sec · GPU' },
            { label: 'Models Loaded', val: '3', color: '#B388FF', sub: 'primary · secondary · compact' },
            { label: 'API Cost', val: '$0', color: '#FFD43B', sub: 'forever · your hardware' },
            { label: 'Privacy', val: '100%', color: '#00D26A', sub: 'nothing leaves your machine' },
          ].map(k => (
            <div key={k.label} className="bs-kpi" style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '16px 14px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: k.color }} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', color: '#3E3D38', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 }}>{k.label}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.4rem', fontWeight: 700, color: k.color }}>{k.val}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#3E3D38', marginTop: 3 }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PIPELINE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #00E5FF, #B388FF, #FFD43B)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' as const }}>
            {[
              { icon: '📊', name: 'Engine Data', desc: 'Fact tables, dimensions' },
              { icon: '📝', name: 'Prompt Template', desc: 'Governed schema, rules' },
              { icon: '🧠', name: 'Local LLM', desc: 'GPU-accelerated inference' },
              { icon: '📋', name: 'Intelligence Brief', desc: 'Flags, recommendations' },
              { icon: '🎯', name: 'Action', desc: 'You decide. Model interprets.' },
            ].map((s, i) => (
              <span key={s.name} style={{ display: 'contents' }}>
                {i > 0 && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.2rem', color: '#3E3D38', opacity: 0.4, padding: '0 4px' }}>→</span>}
                <div style={{ textAlign: 'center', padding: '16px 14px', flex: 1, minWidth: 110 }}>
                  <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 8 }}>{s.icon}</span>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#3E3D38', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MODEL ROSTER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#3E3D38', marginBottom: 14 }}>
          <span style={{ color: '#00E5FF' }}>Model</span> · Roster
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {models.map((m, i) => (
            <div key={m.name} className="bs-model" onClick={() => setExpandedModel(expandedModel === i ? null : i)} style={{
              background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, padding: '20px 18px',
              position: 'relative', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: m.color }} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: m.color, marginBottom: 8 }}>{m.role}</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#3E3D38', marginBottom: 12 }}>{m.spec}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {m.stats.map(s => (
                  <div key={s.label} style={{ padding: 8, background: '#08080C', borderRadius: 4 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.48rem', color: '#3E3D38', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem', fontWeight: 600, color: s.label === 'Speed' ? '#00D26A' : s.label === 'VRAM' ? m.color : '#D4D2CD' }}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, marginTop: 10 }}>
                {m.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px', borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid #1A1A22', color: '#3E3D38' }}>{t}</span>
                ))}
              </div>
              {expandedModel === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1A1A22', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#7A786F', lineHeight: 1.7 }}>
                  <strong style={{ color: m.color }}>Why this model:</strong> {m.why}<br /><br />
                  <span style={{ color: '#3E3D38' }}>Install: <span style={{ color: '#D4D2CD' }}>{m.install}</span></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONVERGENT ANALYSIS DEMO */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #1A1A22' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#3E3D38' }}>
              <span style={{ color: '#00E5FF' }}>Convergent</span> · Analysis Demo
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px', borderRadius: 3, border: '1px solid #002E33', color: '#00E5FF' }}>DEMO</span>
          </div>
          <div style={{ padding: '4px 18px 2px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#3E3D38' }}>
            Prompt: &quot;Analyze this week&rsquo;s trading performance and flag blind spots&quot;
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0 }}>
            {/* Llama */}
            <div style={{ padding: 18 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#00E5FF', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5FF', display: 'inline-block' }} /> Llama 3.1 8B
              </div>
              {['Win rate dropped from 68% to 52% on Thursday-Friday trades.', 'Avg loss size increased 40% this week. Stop discipline may be slipping.', '3 of 4 losses were momentum plays. Mean reversion outperformed.'].map((f, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRadius: 6, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', lineHeight: 1.6, color: '#7A786F', background: 'rgba(0,229,255,0.04)', borderLeft: '2px solid rgba(0,229,255,0.2)' }}>
                  <strong style={{ color: '#00E5FF' }}>Flag {i + 1}:</strong> {f}
                </div>
              ))}
            </div>
            {/* Divider */}
            <div style={{ width: 1, background: '#1A1A22', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#3E3D38', background: '#0E0E14', padding: '8px 4px', letterSpacing: '0.1em' }}>VS</span>
            </div>
            {/* Mistral */}
            <div style={{ padding: 18 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#B388FF', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B388FF', display: 'inline-block' }} /> Mistral 7B
              </div>
              {['Late-week performance degradation. Thu-Fri win rate 50% vs Mon-Wed 71%.', 'Loss magnitude expanding — risk/reward ratio inverted on 2 trades.', 'Sector concentration: 80% of trades in tech. Diversification blind spot.'].map((f, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRadius: 6, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', lineHeight: 1.6, color: '#7A786F', background: 'rgba(179,136,255,0.04)', borderLeft: '2px solid rgba(179,136,255,0.2)' }}>
                  <strong style={{ color: '#B388FF' }}>Flag {i + 1}:</strong> {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid #1A1A22', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0A2E18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>✓</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#7A786F', lineHeight: 1.5 }}>
              <strong style={{ color: '#00D26A' }}>Convergence:</strong> Both flag late-week decay and loss magnitude expansion. <strong style={{ color: '#00D26A' }}>High confidence signals.</strong> Mistral uniquely catches sector concentration — a blind spot the primary model missed.
            </div>
          </div>
        </div>
      </div>

      {/* TERMINAL */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#060810', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', lineHeight: 1.8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderBottom: '1px solid #1A1A22', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F56' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27C93F' }} />
            <span style={{ fontSize: '0.55rem', color: '#3E3D38', marginLeft: 8, letterSpacing: '0.05em' }}>blindspot · inference session</span>
          </div>
          <div onClick={() => setShowTerminal(!showTerminal)} style={{ padding: '10px 18px', color: '#00E5FF', fontSize: '0.65rem', cursor: 'pointer' }}>
            {showTerminal ? '▾ hide session transcript' : '▸ show session transcript'}
          </div>
          {showTerminal && (
            <div style={{ padding: '0 18px 16px' }}>
              <span style={{ color: '#3E3D38' }}># Step 1: Pull your data from the BlindSpot engine</span><br />
              <span style={{ color: '#00D26A' }}>$</span> cat dashboard_export.csv | head -5<br />
              <span style={{ color: '#7A786F' }}>date,strategy,ticker,direction,entry,exit,pnl,win</span><br />
              <span style={{ color: '#7A786F' }}>2026-02-24,momentum,NVDA,long,128.40,131.20,+140,1</span><br /><br />
              <span style={{ color: '#3E3D38' }}># Step 2: Feed it to your local model</span><br />
              <span style={{ color: '#00D26A' }}>$</span> cat prompts/weekly_brief.txt dashboard_export.csv | ollama run llama3.1:8b<br /><br />
              <span style={{ color: '#00E5FF' }}>WEEKLY INTELLIGENCE BRIEF — Feb 17-24, 2026</span><br />
              <span style={{ color: '#7A786F' }}>PERFORMANCE: +$486 net · 8 trades · 62.5% win rate</span><br />
              <span style={{ color: '#FFB300' }}>⚠ FLAG: Late-week decay — Thu/Fri win rate 40% vs Mon-Wed 80%</span><br />
              <span style={{ color: '#00D26A' }}>✓ STRENGTH: Entry timing improved — avg hold 1.2 days vs 2.1</span><br /><br />
              <span style={{ color: '#3E3D38' }}># Step 3: Run same data through second model for convergence</span><br />
              <span style={{ color: '#00D26A' }}>$</span> cat prompts/weekly_brief.txt dashboard_export.csv | ollama run mistral:7b<br />
              <span style={{ color: '#3E3D38' }}># Total time: ~45 seconds. Total cost: $0.</span><br />
              <span style={{ color: '#00D26A' }}>$</span> <span style={{ animation: 'bsBlink 1.2s step-end infinite' }}>_</span>
            </div>
          )}
        </div>
      </div>

      {/* HARDWARE COMPATIBILITY */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px' }}>
        <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#3E3D38', letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '10px 14px', borderBottom: '1px solid #1A1A22' }}>
            Hardware · Compatibility Matrix
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['GPU', 'VRAM', '8B', '7B', '3.8B', 'Dual Model', 'Speed'].map(h => (
                    <th key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#3E3D38', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1A1A22' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hardwareMatrix.map(r => (
                  <tr key={r.gpu} className="bs-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600 }}>{r.gpu}</td>
                    <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#7A786F' }}>{r.vram}</td>
                    <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: r.m8b === 'Full' ? '#0A2E18' : r.m8b === 'Tight' ? '#2E2200' : '#002E33', color: r.m8b === 'Full' ? '#00D26A' : '#FFB300' }}>{r.m8b}</span></td>
                    <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: r.m7b === 'Full' ? '#0A2E18' : '#2E2200', color: r.m7b === 'Full' ? '#00D26A' : '#FFB300' }}>{r.m7b}</span></td>
                    <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: '#0A2E18', color: '#00D26A' }}>{r.m3b}</span></td>
                    <td style={{ padding: '9px 12px' }}><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: r.dual === 'Both in VRAM' || r.dual === 'Unified memory' ? '#0A2E18' : r.dual === 'No' || r.dual === 'Slow' ? '#2E0E0E' : '#2E2200', color: r.dual === 'Both in VRAM' || r.dual === 'Unified memory' ? '#00D26A' : r.dual === 'No' || r.dual === 'Slow' ? '#FF4D4D' : '#FFB300' }}>{r.dual}</span></td>
                    <td style={{ padding: '9px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: r.good ? '#00D26A' : r.speed.includes('12') ? '#FFB300' : '#FF4D4D' }}>{r.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CHECKLIST + ARCHITECTURE */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* CHECKLIST */}
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#3E3D38', marginBottom: 10 }}>
            <span style={{ color: '#00E5FF' }}>Setup</span> · Readiness
          </div>
          <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
            {checklistItems.map((c, i) => (
              <div key={i} className="bs-check" onClick={() => toggleCheck(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < checklistItems.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${checklist[i] ? '#00D26A' : '#222230'}`, background: checklist[i] ? '#0A2E18' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#00D26A', flexShrink: 0, transition: 'all 0.3s' }}>
                  {checklist[i] ? '✓' : ''}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: checklist[i] ? '#7A786F' : '#D4D2CD', textDecoration: checklist[i] ? 'line-through' : 'none', textDecorationColor: '#3E3D38', flex: 1 }}>{c.text}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#3E3D38' }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHITECTURE FLAGS */}
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#3E3D38', marginBottom: 10 }}>
            <span style={{ color: '#00E5FF' }}>Architecture</span> · Principles
          </div>
          <div style={{ background: '#0E0E14', border: '1px solid #1A1A22', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { text: 'The LLM interprets. It doesn\'t compute.', detail: 'Numbers come from the engine. The model reads them.', color: '#00E5FF' },
              { text: 'Convergent > singular.', detail: 'Two models agreeing = signal. Divergence = judgment call.', color: '#B388FF' },
              { text: 'Prompt templates are the contract.', detail: 'Structure > intelligence.', color: '#FFD43B' },
              { text: 'Local means sovereign.', detail: 'Privacy isn\'t a feature. It\'s the architecture.', color: '#00D26A' },
              { text: 'Models are swappable.', detail: 'The engine doesn\'t care which model reads the data.', color: '#FFB300' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 18px', borderBottom: i < 4 ? '1px solid #1A1A22' : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', flexShrink: 0, background: `${f.color}15`, color: f.color }}>→</div>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600, color: '#D4D2CD', marginBottom: 2 }}>{f.text}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#7A786F' }}>{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px 32px 36px', borderTop: '1px solid #1A1A22', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: '#3E3D38' }}>BlindSpot · Local LLM Integration v1.0</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: '#3E3D38', marginTop: 6, opacity: 0.5 }}>ollama · gpu-accelerated · zero cloud · governed prompts</div>
        <div style={{ marginTop: 12 }}>
          <Link href="/blindspot" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: '#FFD43B', textDecoration: 'none' }}>← Back to BlindSpot</Link>
        </div>
      </div>
    </div>
  );
}
