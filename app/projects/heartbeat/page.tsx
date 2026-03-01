'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const C = { pulse: '#FF6B8A', teal: '#2BB5A4', blue: '#5B8DEF', green: '#00D97E', gold: '#F0C040', amber: '#FFB300', coral: '#FF6B6B', plum: '#B388FF', cyan: '#00D4E5' };

interface KpiData { label: string; value: string; sub: string; trend?: string; trendColor?: string; color: string; }
interface TeamRow { team: string; size: number; mood: string; moodColor: string; energy: string; energyColor: string; delta: string; deltaColor: string; participation: string; signal: string; signalColor: string; signalBg: string; }
interface RiskSignal { icon: string; iconColor: string; iconBg: string; text: string; }
interface TopicTag { count: number; label: string; color: string; bg: string; }
interface NudgeCard { name: string; rate: string; rateColor: string; pct: number; desc: string; }
interface MoodBar { height: string; color: string; }

const KPIS: KpiData[] = [
  { label: 'Avg Mood', value: '3.6', sub: 'of 5.0 · steady', trend: '— no change vs 7d avg', trendColor: 'rgba(245,241,235,0.3)', color: C.pulse },
  { label: 'Avg Energy', value: '3.2', sub: 'of 5.0', trend: '▼ 0.3 vs 7d avg', trendColor: C.coral, color: C.teal },
  { label: 'Participation', value: '73%', sub: '137 of 187 today', trend: '▲ above 60% target', trendColor: C.green, color: C.green },
  { label: 'At-Risk Flag', value: '12', sub: '3+ low-mood days in 14d', color: C.coral },
  { label: 'Nudges Delivered', value: '94', sub: 'today · 68% opened', color: C.blue },
  { label: 'Top Growth Theme', value: 'Stakeholder Comms', sub: 'mentioned 23x this week', color: C.plum },
];

const TEAMS: TeamRow[] = [
  { team: 'Product', size: 24, mood: '4.1', moodColor: C.green, energy: '3.8', energyColor: C.green, delta: '↑ 0.4', deltaColor: C.green, participation: '88%', signal: 'Thriving', signalColor: C.green, signalBg: 'rgba(0,217,126,0.1)' },
  { team: 'Engineering', size: 42, mood: '3.6', moodColor: '#F5F1EB', energy: '3.4', energyColor: '#F5F1EB', delta: '— 0.0', deltaColor: 'rgba(245,241,235,0.3)', participation: '76%', signal: 'Stable', signalColor: C.blue, signalBg: 'rgba(91,141,239,0.1)' },
  { team: 'Design', size: 12, mood: '3.8', moodColor: '#F5F1EB', energy: '3.5', energyColor: '#F5F1EB', delta: '↑ 0.2', deltaColor: C.green, participation: '83%', signal: 'Healthy', signalColor: C.green, signalBg: 'rgba(0,217,126,0.1)' },
  { team: 'Sales', size: 28, mood: '3.4', moodColor: '#F5F1EB', energy: '3.0', energyColor: '#F5F1EB', delta: '↓ 0.3', deltaColor: C.coral, participation: '71%', signal: 'Watch', signalColor: C.amber, signalBg: 'rgba(255,179,0,0.1)' },
  { team: 'Customer Success', size: 18, mood: '2.9', moodColor: C.amber, energy: '2.6', energyColor: C.amber, delta: '↓ 0.6', deltaColor: C.coral, participation: '67%', signal: 'At Risk', signalColor: C.coral, signalBg: 'rgba(255,107,107,0.1)' },
  { team: 'Support', size: 22, mood: '2.4', moodColor: C.coral, energy: '2.1', energyColor: C.coral, delta: '↓ 0.8', deltaColor: C.coral, participation: '59%', signal: 'Critical', signalColor: C.coral, signalBg: 'rgba(255,107,107,0.1)' },
  { team: 'Marketing', size: 16, mood: '3.5', moodColor: '#F5F1EB', energy: '3.2', energyColor: '#F5F1EB', delta: '— 0.1', deltaColor: 'rgba(245,241,235,0.3)', participation: '75%', signal: 'Stable', signalColor: C.blue, signalBg: 'rgba(91,141,239,0.1)' },
  { team: 'People Ops', size: 8, mood: '4.0', moodColor: C.green, energy: '3.9', energyColor: C.green, delta: '↑ 0.3', deltaColor: C.green, participation: '100%', signal: 'Thriving', signalColor: C.green, signalBg: 'rgba(0,217,126,0.1)' },
];

const RISKS: RiskSignal[] = [
  { icon: '!', iconColor: C.coral, iconBg: 'rgba(255,107,107,0.1)', text: 'Support — Critical: 10-day declining trend. Mood 2.4, energy 2.1. Participation dropping. 6 of 22 employees flagged at-risk. Top blocker: "ticket volume + unclear escalation"' },
  { icon: '!', iconColor: C.coral, iconBg: 'rgba(255,107,107,0.1)', text: 'Customer Success — Declining: Mood dropped 0.6 in 7 days. 4 of 18 flagged at-risk. Recurring theme: "handoffs from Sales are incomplete"' },
  { icon: '⚠', iconColor: C.amber, iconBg: 'rgba(255,179,0,0.1)', text: 'Sales — Watch: Energy declining, participation slipping. 3 employees mention "unclear quota changes" in free text. Correlated with recent comp plan update.' },
  { icon: '→', iconColor: C.teal, iconBg: 'rgba(43,181,164,0.1)', text: 'Cross-team signal: "process friction" mentioned by 18 employees across 5 teams this week. Highest density in CS + Support. Likely systemic, not team-specific.' },
];

const TOPICS: TopicTag[] = [
  { count: 23, label: 'Stakeholder communication', color: C.plum, bg: 'rgba(179,136,255,0.1)' },
  { count: 19, label: 'Process documentation', color: C.pulse, bg: 'rgba(255,107,138,0.1)' },
  { count: 17, label: 'Prioritization', color: C.blue, bg: 'rgba(91,141,239,0.1)' },
  { count: 14, label: 'Cross-team handoffs', color: C.teal, bg: 'rgba(43,181,164,0.1)' },
  { count: 12, label: 'Product knowledge', color: C.green, bg: 'rgba(0,217,126,0.1)' },
  { count: 11, label: 'Client discovery', color: C.amber, bg: 'rgba(255,179,0,0.1)' },
  { count: 9, label: 'Escalation handling', color: C.coral, bg: 'rgba(255,107,107,0.1)' },
  { count: 8, label: 'Async communication', color: C.cyan, bg: 'rgba(0,212,229,0.1)' },
];

const NUDGES: NudgeCard[] = [
  { name: 'Stakeholder Comms Playbook', rate: '78% opened', rateColor: C.green, pct: 78, desc: 'Correlated with +0.4 mood shift in recipients over 5 days' },
  { name: 'Escalation Tier 2 SOP', rate: '72% opened', rateColor: C.green, pct: 72, desc: 'Support team — most requested doc. 3 employees saved it.' },
  { name: 'Sales-to-CS Handoff Template', rate: '45% opened', rateColor: C.amber, pct: 45, desc: 'Delivered to CS but low adoption — may need redesign or manager push' },
  { name: 'Q1 Prioritization Framework', rate: '22% opened', rateColor: C.coral, pct: 22, desc: 'Low engagement despite high topic mentions — content may not match need' },
];

const MOOD_BARS: MoodBar[] = [
  { height: '68%', color: C.pulse }, { height: '72%', color: C.pulse }, { height: '70%', color: C.pulse },
  { height: '66%', color: C.teal }, { height: '64%', color: C.teal }, { height: '60%', color: C.teal },
  { height: '55%', color: C.coral }, { height: '50%', color: C.coral }, { height: '52%', color: C.coral },
  { height: '58%', color: C.coral }, { height: '56%', color: C.coral }, { height: '62%', color: C.pulse },
  { height: '64%', color: C.pulse }, { height: '60%', color: C.teal }, { height: '62%', color: C.teal },
  { height: '66%', color: C.pulse }, { height: '68%', color: C.pulse }, { height: '72%', color: C.pulse },
  { height: '70%', color: C.pulse }, { height: '68%', color: C.teal }, { height: '66%', color: C.teal },
  { height: '70%', color: C.pulse }, { height: '72%', color: C.pulse }, { height: '72%', color: C.pulse },
];

const SCHEMA_LINES = [
  { kw: 'CREATE TABLE', obj: 'Fact_CheckIns', rest: '(' },
  { obj: 'checkin_id', type: 'INT', ref: 'PRIMARY KEY' },
  { obj: 'employee_id', type: 'INT', ref: 'REFERENCES Dim_Employee' },
  { obj: 'team_id', type: 'INT', ref: 'REFERENCES Dim_Team' },
  { obj: 'period_id', type: 'INT', ref: 'REFERENCES Dim_Period' },
  { obj: 'topic_id', type: 'INT', ref: 'REFERENCES Dim_Topic' },
  { obj: 'skill_id', type: 'INT', ref: 'REFERENCES Dim_Skill' },
  { obj: 'mood_score', type: 'INT', cmt: '-- 1-5' },
  { obj: 'energy_score', type: 'INT', cmt: '-- 1-5' },
  { obj: 'growth_focus', type: 'TEXT', cmt: '-- free text response' },
  { obj: 'nudge_delivered', type: 'BOOLEAN' },
  { obj: 'nudge_opened', type: 'BOOLEAN' },
  { obj: 'sentiment_class', type: 'VARCHAR(15)', cmt: '-- positive | neutral | stressed | blocked' },
];

export default function HeartBeatPage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Analytics Engine</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            <span style={{ color: C.pulse }}>Heart</span><span style={{ color: C.teal }}>Beat</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Organizational growth intelligence — a daily two-question check-in that surfaces mood trends, energy drift,
            burnout risk, growth themes, and nudge effectiveness across every team in real time.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'Annual engagement surveys arrive 12 months late. Managers detect burnout by turnover, not signal. Growth conversations happen quarterly at best. No system connects how people feel to what they need to grow — in real time.' },
            { label: 'Approach', text: 'DDL\'s check-in engine: every daily response becomes a fact row with employee, team, period, topic, and skill dimensions. Two questions. 45 seconds. The pattern recognition engine handles the rest — surfacing risk, themes, and resource nudges.' },
            { label: 'Deliverable', text: 'Org intelligence dashboard — mood/energy pulse chart, team heatmap with signal badges, burnout risk radar, growth theme clusters, nudge effectiveness tracking, daily check-in UX preview, and full star schema architecture.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* KPIs */}
      <FadeIn delay={300}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.pulse, marginBottom: 16 }}>♥ Organization Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '16px 14px', borderTop: `2px solid ${kpi.color}` }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', marginBottom: 5 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: kpi.label === 'Top Growth Theme' ? '0.9rem' : '1.3rem', fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)', marginTop: 3 }}>{kpi.sub}</div>
                {kpi.trend && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: kpi.trendColor, marginTop: 3, fontWeight: 500 }}>{kpi.trend}</div>}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 30-DAY MOOD CHART */}
      <FadeIn delay={350}>
        <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: 20, marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 14 }}><span style={{ color: C.pulse }}>♥</span> 30-Day Mood Pulse</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100, marginBottom: 8 }}>
            {MOOD_BARS.map((bar, i) => (
              <div key={i} style={{ flex: 1, height: bar.height, borderRadius: '3px 3px 0 0', background: `linear-gradient(to top, ${bar.color}22, ${bar.color})`, minWidth: 0 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem' }}>
            {[{ label: 'Positive (3.5+)', c: C.pulse }, { label: 'Neutral (2.5–3.4)', c: C.teal }, { label: 'Low (<2.5)', c: C.coral }].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(245,241,235,0.4)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: l.c, display: 'inline-block' }} /> {l.label}
              </span>
            ))}
          </div>
          <div style={{ textAlign: 'center' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.25)', marginTop: 8 }}>⚠ Mid-period dip correlates with Q1 planning sprint · recovered within 5 days</div>
        </div>
      </FadeIn>

      {/* TEAM HEATMAP */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.pulse, marginBottom: 16 }}>♥ Team Heartbeat — This Week</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', minWidth: 700 }}>
                <thead>
                  <tr>{['Team', 'Size', 'Mood', 'Energy', 'Δ 7d', 'Part.', 'Signal'].map(h => (
                    <th key={h} style={{ fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.3)', padding: '8px 12px', textAlign: 'left' as const, borderBottom: '1px solid rgba(245,241,235,0.06)' }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {TEAMS.map((t, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '9px 12px', color: '#F5F1EB', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.team}</td>
                      <td style={{ padding: '9px 12px', color: 'rgba(245,241,235,0.4)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.size}</td>
                      <td style={{ padding: '9px 12px', color: t.moodColor, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.mood}</td>
                      <td style={{ padding: '9px 12px', color: t.energyColor, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.energy}</td>
                      <td style={{ padding: '9px 12px', color: t.deltaColor, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.delta}</td>
                      <td style={{ padding: '9px 12px', color: 'rgba(245,241,235,0.5)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t.participation}</td>
                      <td style={{ padding: '9px 12px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 3, fontSize: '0.52rem', fontWeight: 600, background: t.signalBg, color: t.signalColor }}>{t.signal}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* RISK SIGNALS */}
      <FadeIn delay={500}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.coral, marginBottom: 16 }}>⚠ Risk & Burnout Radar</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '14px' }}>
            {RISKS.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < RISKS.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: r.iconBg, color: r.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{r.icon}</div>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.78rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* TOPICS + NUDGES */}
      <FadeIn delay={600}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '18px 16px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: C.plum, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 14 }}>🎯 Growth Focus — Top Themes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {TOPICS.map((t, i) => (
                <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(245,241,235,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(245,241,235,0.5)' }}>
                  <span style={{ fontSize: '0.52rem', fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: t.bg, color: t.color }}>{t.count}</span>{t.label}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: '18px 16px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: C.teal, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 14 }}>📚 Nudge Effectiveness</div>
            {NUDGES.map((n, i) => (
              <div key={i} style={{ background: 'rgba(21,21,32,0.8)', border: '1px solid rgba(245,241,235,0.04)', borderRadius: 10, padding: 14, marginBottom: i < NUDGES.length - 1 ? 10 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, color: '#F5F1EB' }}>{n.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', fontWeight: 600, color: n.rateColor }}>{n.rate}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(10,10,16,0.8)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ width: `${n.pct}%`, height: '100%', background: n.rateColor, borderRadius: 3 }} />
                </div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.65rem', color: 'rgba(245,241,235,0.3)' }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* SCHEMA */}
      <FadeIn delay={700}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.pulse, marginBottom: 16 }}>Architecture · Star Schema</div>
          <div style={{ background: 'rgba(15,15,24,0.6)', border: '1px solid rgba(245,241,235,0.06)', borderRadius: 10, padding: 20 }}>
            <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', lineHeight: 1.8, color: 'rgba(245,241,235,0.45)', whiteSpace: 'pre-wrap' as const, margin: 0 }}>
{SCHEMA_LINES.map(l => {
  if (l.kw) return <span key="create"><span style={{ color: C.cyan, fontWeight: 600 }}>{l.kw}</span> <span style={{ color: C.green }}>{l.obj}</span> {l.rest}{'\n'}</span>;
  const pad = '  ';
  return <span key={l.obj}>{pad}<span style={{ color: C.green }}>{l.obj}</span>  <span style={{ color: C.gold }}>{l.type}</span>  {l.ref ? <span style={{ color: C.amber }}>{l.ref}</span> : ''}{l.cmt ? <span style={{ color: 'rgba(245,241,235,0.2)' }}> {l.cmt}</span> : ''}{'\n'}</span>;
})}
<span style={{ color: 'rgba(245,241,235,0.2)' }}>{'-- The daily two-question check-in IS the fact table\n-- Every response = one row in Fact_CheckIns\n-- Every nudge = a measurable outcome tied back to the row'}</span>
            </pre>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={800}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            HeartBeat Engine · v0.1 · Organizational Growth Intelligence · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
