'use client';

import { useState, useMemo } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const WEEKS: Array<{date: string; tones: Record<string, number>}> = [
{date:"3/17",tones:{Assertive:33,Confused:33,Skeptical:33}},
{date:"3/24",tones:{Formal:25,Admiring:17,Assertive:17,Curious:17,Confident:8,Cooperative:8,Joyful:8}},
{date:"4/1",tones:{Confident:26,Direct:16,Assertive:15,Formal:13,Friendly:8,Curious:6,Disapproving:3}},
{date:"4/7",tones:{Confident:26,Direct:26,Formal:18,Curious:8,Informative:8,Assertive:6,Appreciative:3}},
{date:"4/14",tones:{Direct:22,Confident:21,Formal:17,Objective:12,Assertive:7,Appreciative:6,Curious:2}},
{date:"4/21",tones:{Confident:30,Direct:15,Formal:13,Curious:12,Assertive:8,Informative:7,Appreciative:5}},
{date:"4/28",tones:{Confident:27,Direct:21,Assertive:10,Formal:8,Curious:8,Informative:7,Appreciative:5}},
{date:"5/5",tones:{Confident:26,Direct:24,Formal:13,Curious:7,Informative:6,Informal:5,Assertive:3}},
{date:"5/12",tones:{Confident:24,Formal:17,Direct:14,Informative:10,Assertive:8,Curious:5,Appreciative:5}},
{date:"5/26",tones:{Confident:27,Direct:22,Inspirational:12,Appreciative:8,Assertive:5,Curious:5,Cooperative:3}},
{date:"6/2",tones:{Confident:23,Informal:13,Appreciative:10,Formal:10,Joyful:10,Assertive:7,Friendly:7}},
{date:"6/9",tones:{Formal:18,Confident:16,Direct:12,Assertive:9,Informal:9,Curious:8,Appreciative:6}},
{date:"6/16",tones:{Formal:18,Confident:17,Direct:16,Informative:12,Assertive:11,Informal:4,Objective:4}},
{date:"6/23",tones:{Informative:23,Confident:19,Direct:19,Formal:16,Assertive:7,Curious:7,Informal:4}},
{date:"6/30",tones:{Confident:22,Formal:14,Direct:12,Assertive:8,Optimistic:8,Informative:6,Neutral:6}},
{date:"7/7",tones:{Formal:26,Confident:16,Assertive:14,Informative:13,Direct:11,Objective:5,Inspirational:4}},
{date:"7/14",tones:{Confident:28,Formal:23,Direct:18,Informative:10,Objective:7,Appreciative:4,Assertive:3}},
{date:"7/21",tones:{Confident:22,Formal:22,Informative:22,Assertive:9,Direct:9,Neutral:6,Skeptical:6}},
{date:"7/28",tones:{Formal:28,Confident:14,Informative:14,Direct:12,Objective:9,Assertive:8,Skeptical:3}},
{date:"8/4",tones:{Formal:30,Informative:14,Objective:13,Confident:11,Assertive:9,Direct:7,Neutral:5}},
{date:"8/11",tones:{Formal:20,Direct:17,Informative:15,Confident:12,Assertive:11,Confused:6,Objective:6}},
{date:"8/18",tones:{Formal:25,Confident:22,Informative:22,Appreciative:9,Assertive:6,Direct:6,Curious:3}},
{date:"8/25",tones:{Informative:28,Confident:22,Direct:17,Formal:11,Skeptical:11,Assertive:6,Informal:6}},
{date:"9/2",tones:{Confident:38,Direct:19,Appreciative:14,Informative:14,Curious:10,Neutral:5}},
{date:"9/8",tones:{Formal:28,Confident:22,Informative:15,Direct:14,Assertive:4,Appreciative:3,Curious:3}},
{date:"9/15",tones:{Confident:26,Formal:21,Objective:18,Neutral:8,Informal:5,Informative:5,Appreciative:3}},
{date:"9/22",tones:{Formal:21,Confident:18,Informative:9,Appreciative:7,Cooperative:7,Curious:7,Direct:7}},
{date:"9/29",tones:{Formal:22,Direct:17,Informative:13,Confident:9,Assertive:6,Curious:6,Appreciative:6}},
{date:"10/6",tones:{Formal:22,Confident:20,Direct:15,Informative:7,Appreciative:6,Assertive:6,Objective:6}},
{date:"10/13",tones:{Confident:20,Formal:17,Informative:12,Appreciative:10,Direct:10,Assertive:7,Curious:4}},
{date:"10/22",tones:{Confident:25,Direct:18,Appreciative:14,Informative:9,Formal:6,Assertive:5,Curious:4}},
{date:"10/27",tones:{Informative:20,Confident:18,Direct:12,Formal:9,Appreciative:7,Assertive:7,Neutral:7}},
{date:"11/3",tones:{Confident:27,Formal:18,Direct:14,Assertive:12,Appreciative:10,Neutral:8,Informative:3}},
{date:"11/10",tones:{Confident:22,Direct:19,Formal:14,Informative:13,Assertive:12,Informal:7,Appreciative:6}},
{date:"11/17",tones:{Direct:22,Confident:20,Informative:18,Appreciative:10,Informal:10,Assertive:5,Formal:5}},
{date:"11/24",tones:{Confident:23,Informative:18,Direct:16,Formal:15,Appreciative:9,Curious:5,Assertive:4}},
{date:"12/8",tones:{Informative:23,Confident:22,Direct:20,Formal:8,Assertive:6,Curious:5,Appreciative:3}},
{date:"12/15",tones:{Confident:24,Informative:16,Direct:15,Curious:9,Informal:8,Appreciative:5,Formal:5}},
{date:"12/22",tones:{Confident:21,Direct:17,Informative:17,Formal:13,Assertive:7,Informal:7,Appreciative:5}},
{date:"1/12",tones:{Confident:25,Informative:17,Direct:16,Assertive:8,Formal:7,Informal:6,Appreciative:6}},
{date:"1/19",tones:{Confident:22,Informative:22,Formal:15,Direct:14,Assertive:10,Informal:3,Objective:3}},
{date:"1/26",tones:{Formal:27,Confident:18,Informative:16,Direct:12,Objective:7,Appreciative:6,Assertive:6}},
{date:"2/2",tones:{Confident:22,Formal:22,Informative:16,Direct:13,Appreciative:7,Informal:6,Assertive:3}},
{date:"2/9",tones:{Formal:22,Confident:20,Informative:19,Direct:17,Objective:8,Informal:4,Appreciative:3}},
];

const BASELINE: Record<string, number> = {
Confident:12,Direct:8,Formal:10,Informative:8,Assertive:6,Appreciative:10,Curious:8,Informal:12,Friendly:10,Neutral:8,Cooperative:5,Joyful:5,Optimistic:4,Objective:3,Skeptical:2,Confused:2,Inspirational:2,Admiring:2,Empathetic:2,Encouraging:2,Disapproving:1,Accusatory:1,Regretful:1,Sad:1,Apologetic:1,
};

const TONE_COLORS: Record<string, string> = {
Confident:"#10b981",Direct:"#3b82f6",Formal:"#6366f1",Informative:"#f59e0b",Assertive:"#ef4444",Appreciative:"#ec4899",Curious:"#8b5cf6",Informal:"#14b8a6",Objective:"#64748b",Neutral:"#94a3b8",Cooperative:"#06b6d4",Skeptical:"#f97316",Friendly:"#22c55e",Joyful:"#fbbf24",Admiring:"#a855f7",Inspirational:"#e879f9",Optimistic:"#84cc16",Disapproving:"#dc2626",Confused:"#fb923c",
};

const CORE_TONES = ["Confident","Direct","Formal","Informative","Assertive","Appreciative","Curious","Objective"];

export default function ToneFingerprintPage() {
  const [phase, setPhase] = useState("all");

  const phaseWeeks = useMemo(() => {
    if (phase === "early") return WEEKS.slice(0, 8);
    if (phase === "mid") return WEEKS.slice(8, 22);
    if (phase === "late") return WEEKS.slice(22);
    return WEEKS;
  }, [phase]);

  const daveProfile = useMemo(() => {
    const sums: Record<string, number> = {};
    phaseWeeks.forEach(w => {
      Object.entries(w.tones).forEach(([t, v]) => {
        sums[t] = (sums[t] || 0) + v;
      });
    });
    const result: Record<string, number> = {};
    Object.keys(sums).forEach(t => { result[t] = Math.round((sums[t] / phaseWeeks.length) * 10) / 10; });
    return result;
  }, [phaseWeeks]);

  const radarData = CORE_TONES.map(t => ({ tone: t, Dave: daveProfile[t] || 0, Average: BASELINE[t] || 0 }));

  const deviationData = CORE_TONES.map(t => ({
    tone: t, deviation: Math.round(((daveProfile[t] || 0) - (BASELINE[t] || 0)) * 10) / 10,
    dave: daveProfile[t] || 0, baseline: BASELINE[t] || 0,
  })).sort((a, b) => b.deviation - a.deviation);

  const allToneComparison = useMemo(() => {
    return Object.entries(daveProfile)
      .map(([t, v]) => ({ tone: t, dave: v, baseline: BASELINE[t] || 2, delta: Math.round((v - (BASELINE[t] || 2)) * 10) / 10 }))
      .sort((a, b) => b.dave - a.dave)
      .slice(0, 12);
  }, [daveProfile]);

  const signatureStrength = useMemo(() => {
    let totalDeviation = 0;
    CORE_TONES.forEach(t => { totalDeviation += Math.abs((daveProfile[t] || 0) - (BASELINE[t] || 0)); });
    return Math.min(100, Math.round(totalDeviation * 1.5));
  }, [daveProfile]);

  const consistencyScore = useMemo(() => {
    const topTones = ["Confident", "Direct", "Formal"];
    let totalVariance = 0;
    topTones.forEach(t => {
      const values = phaseWeeks.map(w => w.tones[t] || 0);
      const mean = values.reduce((s, v) => s + v, 0) / values.length;
      const variance = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length;
      totalVariance += Math.sqrt(variance);
    });
    return Math.max(0, Math.min(100, Math.round(100 - totalVariance * 2)));
  }, [phaseWeeks]);

  const evolutionData = useMemo(() => {
    const phases = [
      { label: "Weeks 1-4", weeks: WEEKS.slice(0, 4) },
      { label: "Weeks 5-12", weeks: WEEKS.slice(4, 12) },
      { label: "Weeks 13-22", weeks: WEEKS.slice(12, 22) },
      { label: "Weeks 23-34", weeks: WEEKS.slice(22, 34) },
      { label: "Weeks 35-44", weeks: WEEKS.slice(34) },
    ];
    return phases.map(p => {
      const avg: Record<string, any> = { phase: p.label };
      CORE_TONES.forEach(t => {
        const vals = p.weeks.map(w => w.tones[t] || 0);
        avg[t] = Math.round(vals.reduce((s, v) => s + v, 0) / p.weeks.length);
      });
      return avg;
    });
  }, []);

  const PhaseBtn = ({ id, label }: { id: string; label: string }) => (
    <button onClick={() => setPhase(id)} style={{
      background: phase === id ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
      color: phase === id ? "#fff" : "#8892b0", border: phase === id ? "none" : "1px solid #2a2a4a",
      borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
    }}>{label}</button>
  );

  const topToneEntry = Object.entries(daveProfile).sort((a, b) => b[1] - a[1])[0];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: "linear-gradient(180deg, #0d1117 0%, #0f0f1a 50%, #0d1117 100%)",
      color: "#e6edf3", minHeight: "100vh", padding: "100px 24px 32px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&family=Playfair+Display:wght@700;800&display=swap');`}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 4, color: "#8b5cf6", fontWeight: 700, marginBottom: 12 }}>Writing Voice Analysis</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #e6edf3 0%, #8b5cf6 50%, #6366f1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Your Tone Fingerprint
          </h1>
          <div style={{ color: "#5a6a8a", fontSize: 14, marginTop: 8 }}>
            How your writing voice compares to the average Grammarly user — and how it evolved over 44 active weeks
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Signature Strength", value: signatureStrength, desc: "How distinct your voice is", color: "#8b5cf6", suffix: "/100", isNum: true },
            { label: "Voice Consistency", value: consistencyScore, desc: "How stable your top tones are", color: "#10b981", suffix: "/100", isNum: true },
            { label: "Dominant Tone", value: topToneEntry?.[0] || "—", desc: `${Math.round(topToneEntry?.[1] || 0)}% avg presence`, color: "#f59e0b", suffix: "", isNum: false },
          ].map((s, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 14, padding: 24,
              border: "1px solid #2a2a4a", textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#8892b0", fontWeight: 600, marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontSize: s.isNum ? 38 : 28, fontWeight: 800, color: s.color, fontFamily: s.isNum ? "'JetBrains Mono', monospace" : "'Playfair Display', serif", lineHeight: 1 }}>
                {s.value}<span style={{ fontSize: 16, color: "#5a6a8a" }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: 11, color: "#5a6a8a", marginTop: 8 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <PhaseBtn id="all" label="All Time" />
          <PhaseBtn id="early" label="Early (Mar–Apr)" />
          <PhaseBtn id="mid" label="Mid (May–Aug)" />
          <PhaseBtn id="late" label="Late (Sep–Feb)" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 24, border: "1px solid #2a2a4a" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>Voice Profile</h3>
            <div style={{ fontSize: 12, color: "#5a6a8a", marginBottom: 12 }}>Your tone shape vs average user</div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#2a2a4a" />
                <PolarAngleAxis dataKey="tone" tick={{ fill: "#8892b0", fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fill: "#5a6a8a", fontSize: 10 }} domain={[0, 30]} />
                <Radar name="You" dataKey="Dave" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Average" dataKey="Average" stroke="#5a6a8a" fill="#5a6a8a" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 24, border: "1px solid #2a2a4a" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>Deviation from Average</h3>
            <div style={{ fontSize: 12, color: "#5a6a8a", marginBottom: 12 }}>How far you diverge on each tone</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviationData} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" horizontal={false} />
                <XAxis type="number" stroke="#5a6a8a" fontSize={11} domain={[-10, 20]} tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v}%`} />
                <YAxis type="category" dataKey="tone" stroke="#5a6a8a" fontSize={12} width={90} />
                <Tooltip content={({ active, payload }: any) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#e0e0e0" }}>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{d.tone}</div>
                      <div>You: <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{d.dave}%</span></div>
                      <div>Average: <span style={{ color: "#5a6a8a" }}>{d.baseline}%</span></div>
                      <div>Delta: <span style={{ color: d.deviation > 0 ? "#10b981" : "#ef4444", fontWeight: 600 }}>{d.deviation > 0 ? "+" : ""}{d.deviation}%</span></div>
                    </div>
                  );
                }} />
                <Bar dataKey="deviation" radius={[0, 4, 4, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 24, border: "1px solid #2a2a4a", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Complete Tone Comparison</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {allToneComparison.map(({ tone, dave, baseline, delta }) => (
              <div key={tone} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 90, fontSize: 13, color: "#8892b0", fontWeight: 500, flexShrink: 0 }}>{tone}</div>
                <div style={{ flex: 1, position: "relative", height: 28 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "#0d1117", borderRadius: 6 }} />
                  <div style={{ position: "absolute", top: -2, left: `${Math.min(baseline * 2.5, 95)}%`, width: 2, height: 32, background: "#5a6a8a", borderRadius: 1, zIndex: 2 }} />
                  <div style={{ position: "absolute", top: 3, left: 0, height: 22, width: `${Math.min(dave * 2.5, 95)}%`, background: `linear-gradient(90deg, ${TONE_COLORS[tone] || "#8b5cf6"}66, ${TONE_COLORS[tone] || "#8b5cf6"})`, borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <div style={{ width: 80, display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TONE_COLORS[tone] || "#8b5cf6", fontFamily: "'JetBrains Mono', monospace" }}>{dave}%</span>
                  <span style={{ fontSize: 11, color: delta > 0 ? "#10b981" : delta < 0 ? "#ef4444" : "#5a6a8a", fontWeight: 600 }}>{delta > 0 ? "+" : ""}{delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 24, border: "1px solid #2a2a4a", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>Voice Evolution by Phase</h3>
          <div style={{ fontSize: 12, color: "#5a6a8a", marginBottom: 16 }}>How your tone mix shifted across five phases</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evolutionData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="phase" stroke="#5a6a8a" fontSize={11} />
              <YAxis stroke="#5a6a8a" fontSize={11} unit="%" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {CORE_TONES.slice(0, 5).map(t => (
                <Bar key={t} dataKey={t} stackId="a" fill={TONE_COLORS[t]} name={t} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "Your Writing DNA", color: "#8b5cf6", body: "Your top-3 tone signature — Confident, Formal, Direct — accounts for ~55% of your detected voice. This is an unusually focused profile." },
            { title: "The Auditor's Voice", color: "#10b981", body: "Your elevated Formal + Objective + Informative scores read like a professional who communicates with precision and authority." },
            { title: "What's Missing", color: "#f59e0b", body: "You're significantly below average in Informal (-8%), Friendly (-8%), and Joyful (-4%). This isn't a weakness — it's a signature." },
            { title: "The Confidence Arc", color: "#3b82f6", body: "Confident appeared in 43 of 44 active weeks and never dropped below 8%. It peaked at 38% in early September." },
          ].map((card, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 14,
              padding: 24, border: "1px solid #2a2a4a", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: card.color, borderRadius: "4px 0 0 4px" }} />
              <h4 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: card.color }}>{card.title}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "#8892b0", lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid #2a2a4a", color: "#3a4a6a", fontSize: 12 }}>
          Tone Fingerprint Analysis · 44 active weeks · Grammarly Insights data · Mar 2025 – Feb 2026
        </div>
      </div>
    </div>
  );
}
