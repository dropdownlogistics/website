'use client';

import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart, Legend } from "recharts";

const RAW = [
{ date: "3/17", words: 294, alerts: 5, unique: 157, prodPct: 27, accPct: 40, vocabPct: 26, cumulative: null, tones: { Assertive: 33, Confused: 33, Skeptical: 33 } },
{ date: "3/24", words: 17167, alerts: 43, unique: 920, prodPct: 80, accPct: 91, vocabPct: 61, cumulative: 17461, tones: { Formal: 25, Admiring: 17, Assertive: 17, Curious: 17, Confident: 8, Cooperative: 8, Joyful: 8 } },
{ date: "4/1", words: 128551, alerts: 134, unique: 1412, prodPct: 95, accPct: 97, vocabPct: 71, cumulative: 146012, tones: { Confident: 26, Direct: 16, Assertive: 15, Formal: 13, Friendly: 8, Curious: 6, Disapproving: 3 } },
{ date: "4/7", words: 110751, alerts: 132, unique: 2130, prodPct: 95, accPct: 97, vocabPct: 82, cumulative: 256763, tones: { Confident: 26, Direct: 26, Formal: 18, Curious: 8, Informative: 8, Assertive: 6, Appreciative: 3 } },
{ date: "4/14", words: 369531, alerts: 343, unique: 3669, prodPct: 98, accPct: 98, vocabPct: 92, cumulative: 626294, tones: { Direct: 22, Confident: 21, Formal: 17, Objective: 12, Assertive: 7, Appreciative: 6, Curious: 2 } },
{ date: "4/21", words: 94903, alerts: 245, unique: 2781, prodPct: 94, accPct: 91, vocabPct: 88, cumulative: 721197, tones: { Confident: 30, Direct: 15, Formal: 13, Curious: 12, Assertive: 8, Informative: 7, Appreciative: 5 } },
{ date: "4/28", words: 816182, alerts: 494, unique: 3967, prodPct: 99, accPct: 99, vocabPct: 93, cumulative: 1537379, tones: { Confident: 27, Direct: 21, Assertive: 10, Formal: 8, Curious: 8, Informative: 7, Appreciative: 5 } },
{ date: "5/5", words: 135473, alerts: 359, unique: 4067, prodPct: 96, accPct: 91, vocabPct: 93, cumulative: 1672852, tones: { Confident: 26, Direct: 24, Formal: 13, Curious: 7, Informative: 6, Informal: 5, Assertive: 3 } },
{ date: "5/12", words: 166948, alerts: 302, unique: 5153, prodPct: 96, accPct: 95, vocabPct: 96, cumulative: 1839800, tones: { Confident: 24, Formal: 17, Direct: 14, Informative: 10, Assertive: 8, Curious: 5, Appreciative: 5 } },
{ date: "5/26", words: 53358, alerts: 123, unique: 1753, prodPct: 91, accPct: 93, vocabPct: 78, cumulative: 2145131, tones: { Confident: 27, Direct: 22, Inspirational: 12, Appreciative: 8, Assertive: 5, Curious: 5, Cooperative: 3 } },
{ date: "6/2", words: 2027, alerts: 21, unique: 611, prodPct: 55, accPct: 58, vocabPct: 54, cumulative: 2147158, tones: { Confident: 23, Informal: 13, Appreciative: 10, Formal: 10, Joyful: 10, Assertive: 7, Friendly: 7 } },
{ date: "6/9", words: 9717, alerts: 147, unique: 1940, prodPct: 76, accPct: 44, vocabPct: 81, cumulative: 2156875, tones: { Formal: 18, Confident: 16, Direct: 12, Assertive: 9, Informal: 9, Curious: 8, Appreciative: 6 } },
{ date: "6/16", words: 12095, alerts: 67, unique: 1278, prodPct: 79, accPct: 76, vocabPct: 71, cumulative: 2168970, tones: { Formal: 18, Confident: 17, Direct: 16, Informative: 12, Assertive: 11, Informal: 4, Objective: 4 } },
{ date: "6/23", words: 25476, alerts: 192, unique: 1648, prodPct: 86, accPct: 66, vocabPct: 77, cumulative: 2194446, tones: { Informative: 23, Confident: 19, Direct: 19, Formal: 16, Assertive: 7, Curious: 7, Informal: 4 } },
{ date: "6/30", words: 52471, alerts: 131, unique: 2362, prodPct: 91, accPct: 90, vocabPct: 85, cumulative: 2246917, tones: { Confident: 22, Formal: 14, Direct: 12, Assertive: 8, Optimistic: 8, Informative: 6, Neutral: 6 } },
{ date: "7/7", words: 29480, alerts: 121, unique: 2671, prodPct: 88, accPct: 82, vocabPct: 88, cumulative: 2276397, tones: { Formal: 26, Confident: 16, Assertive: 14, Informative: 13, Direct: 11, Objective: 5, Inspirational: 4 } },
{ date: "7/14", words: 48933, alerts: 114, unique: 2952, prodPct: 91, accPct: 91, vocabPct: 89, cumulative: 2325330, tones: { Confident: 28, Formal: 23, Direct: 18, Informative: 10, Objective: 7, Appreciative: 4, Assertive: 3 } },
{ date: "7/21", words: 11169, alerts: 27, unique: 1145, prodPct: 78, accPct: 91, vocabPct: 69, cumulative: 2336499, tones: { Confident: 22, Formal: 22, Informative: 22, Assertive: 9, Direct: 9, Neutral: 6, Skeptical: 6 } },
{ date: "7/28", words: 34028, alerts: 145, unique: 2122, prodPct: 88, accPct: 81, vocabPct: 83, cumulative: 2370527, tones: { Formal: 28, Confident: 14, Informative: 14, Direct: 12, Objective: 9, Assertive: 8, Skeptical: 3 } },
{ date: "8/4", words: 53680, alerts: 195, unique: 2342, prodPct: 91, accPct: 84, vocabPct: 85, cumulative: 2424207, tones: { Formal: 30, Informative: 14, Objective: 13, Confident: 11, Assertive: 9, Direct: 7, Neutral: 5 } },
{ date: "8/11", words: 9627, alerts: 49, unique: 2009, prodPct: 77, accPct: 77, vocabPct: 82, cumulative: 2433834, tones: { Formal: 20, Direct: 17, Informative: 15, Confident: 12, Assertive: 11, Confused: 6, Objective: 6 } },
{ date: "8/18", words: 12620, alerts: 53, unique: 1428, prodPct: 80, accPct: 77, vocabPct: 75, cumulative: 2446454, tones: { Formal: 25, Confident: 22, Informative: 22, Appreciative: 9, Assertive: 6, Direct: 6, Curious: 3 } },
{ date: "8/25", words: 11557, alerts: 17, unique: 626, prodPct: 79, accPct: 92, vocabPct: 55, cumulative: 2458011, tones: { Informative: 28, Confident: 22, Direct: 17, Formal: 11, Skeptical: 11, Assertive: 6, Informal: 6 } },
{ date: "9/2", words: 9411, alerts: 26, unique: 1157, prodPct: 76, accPct: 84, vocabPct: 68, cumulative: 2467422, tones: { Confident: 38, Direct: 19, Appreciative: 14, Informative: 14, Curious: 10, Neutral: 5 } },
{ date: "9/8", words: 45810, alerts: 88, unique: 2267, prodPct: 91, accPct: 89, vocabPct: 84, cumulative: 2513232, tones: { Formal: 28, Confident: 22, Informative: 15, Direct: 14, Assertive: 4, Appreciative: 3, Curious: 3 } },
{ date: "9/15", words: 9121, alerts: 12, unique: 1148, prodPct: 73, accPct: 91, vocabPct: 65, cumulative: 2522353, tones: { Confident: 26, Formal: 21, Objective: 18, Neutral: 8, Informal: 5, Informative: 5, Appreciative: 3 } },
{ date: "9/22", words: 18121, alerts: 103, unique: 2285, prodPct: 81, accPct: 68, vocabPct: 82, cumulative: 2540474, tones: { Formal: 21, Confident: 18, Informative: 9, Appreciative: 7, Cooperative: 7, Curious: 7, Direct: 7 } },
{ date: "9/29", words: 16601, alerts: 62, unique: 1954, prodPct: 80, accPct: 77, vocabPct: 78, cumulative: 2557075, tones: { Formal: 22, Direct: 17, Informative: 13, Confident: 9, Assertive: 6, Curious: 6, Appreciative: 6 } },
{ date: "10/6", words: 39925, alerts: 152, unique: 2959, prodPct: 89, accPct: 77, vocabPct: 87, cumulative: 2597000, tones: { Formal: 22, Confident: 20, Direct: 15, Informative: 7, Appreciative: 6, Assertive: 6, Objective: 6 } },
{ date: "10/13", words: 173014, alerts: 139, unique: 4302, prodPct: 96, accPct: 94, vocabPct: 93, cumulative: 2770014, tones: { Confident: 20, Formal: 17, Informative: 12, Appreciative: 10, Direct: 10, Assertive: 7, Curious: 4 } },
{ date: "10/22", words: 24162, alerts: 35, unique: 1307, prodPct: 84, accPct: 90, vocabPct: 68, cumulative: 2794176, tones: { Confident: 25, Direct: 18, Appreciative: 14, Informative: 9, Formal: 6, Assertive: 5, Curious: 4 } },
{ date: "10/27", words: 21851, alerts: 51, unique: 2231, prodPct: 83, accPct: 83, vocabPct: 81, cumulative: 2816027, tones: { Informative: 20, Confident: 18, Direct: 12, Formal: 9, Appreciative: 7, Assertive: 7, Neutral: 7 } },
{ date: "11/3", words: 26204, alerts: 62, unique: 2122, prodPct: 85, accPct: 84, vocabPct: 79, cumulative: 2842231, tones: { Confident: 27, Formal: 18, Direct: 14, Assertive: 12, Appreciative: 10, Neutral: 8, Informative: 3 } },
{ date: "11/10", words: 17881, alerts: 60, unique: 2333, prodPct: 80, accPct: 77, vocabPct: 81, cumulative: 2860112, tones: { Confident: 22, Direct: 19, Formal: 14, Informative: 13, Assertive: 12, Informal: 7, Appreciative: 6 } },
{ date: "11/17", words: 10882, alerts: 77, unique: 2403, prodPct: 74, accPct: 58, vocabPct: 82, cumulative: 2870994, tones: { Direct: 22, Confident: 20, Informative: 18, Appreciative: 10, Informal: 10, Assertive: 5, Formal: 5 } },
{ date: "11/24", words: 58906, alerts: 125, unique: 3226, prodPct: 91, accPct: 85, vocabPct: 88, cumulative: 2929900, tones: { Confident: 23, Informative: 18, Direct: 16, Formal: 15, Appreciative: 9, Curious: 5, Assertive: 4 } },
{ date: "12/2", words: 1, alerts: 0, unique: 1, prodPct: 9, accPct: 99, vocabPct: 10, cumulative: 2929901, tones: {} },
{ date: "12/8", words: 31915, alerts: 108, unique: 2068, prodPct: 85, accPct: 77, vocabPct: 78, cumulative: 2961816, tones: { Informative: 23, Confident: 22, Direct: 20, Formal: 8, Assertive: 6, Curious: 5, Appreciative: 3 } },
{ date: "12/15", words: 94978, alerts: 224, unique: 3694, prodPct: 93, accPct: 82, vocabPct: 91, cumulative: 3056794, tones: { Confident: 24, Informative: 16, Direct: 15, Curious: 9, Informal: 8, Appreciative: 5, Formal: 5 } },
{ date: "12/22", words: 98074, alerts: 97, unique: 3226, prodPct: 94, accPct: 92, vocabPct: 90, cumulative: 3154868, tones: { Confident: 21, Direct: 17, Informative: 17, Formal: 13, Assertive: 7, Informal: 7, Appreciative: 5 } },
{ date: "12/29", words: 0, alerts: 0, unique: 0, prodPct: 0, accPct: 0, vocabPct: 0, cumulative: 3154868, tones: {} },
{ date: "1/5", words: 0, alerts: 0, unique: 0, prodPct: 0, accPct: 0, vocabPct: 0, cumulative: 3154868, tones: {} },
{ date: "1/12", words: 135701, alerts: 205, unique: 5013, prodPct: 96, accPct: 89, vocabPct: 95, cumulative: 3290569, tones: { Confident: 25, Informative: 17, Direct: 16, Assertive: 8, Formal: 7, Informal: 6, Appreciative: 6 } },
{ date: "1/19", words: 490379, alerts: 276, unique: 6057, prodPct: 98, accPct: 94, vocabPct: 97, cumulative: 3780948, tones: { Confident: 22, Informative: 22, Formal: 15, Direct: 14, Assertive: 10, Informal: 3, Objective: 3 } },
{ date: "1/26", words: 353698, alerts: 189, unique: 4054, prodPct: 98, accPct: 94, vocabPct: 92, cumulative: 4134646, tones: { Formal: 27, Confident: 18, Informative: 16, Direct: 12, Objective: 7, Appreciative: 6, Assertive: 6 } },
{ date: "2/2", words: 150533, alerts: 139, unique: 2720, prodPct: 95, accPct: 91, vocabPct: 83, cumulative: 4285179, tones: { Confident: 22, Formal: 22, Informative: 16, Direct: 13, Appreciative: 7, Informal: 6, Assertive: 3 } },
{ date: "2/9", words: 285105, alerts: 175, unique: 7908, prodPct: 97, accPct: 93, vocabPct: 97, cumulative: 4570284, tones: { Formal: 22, Confident: 20, Informative: 19, Direct: 17, Objective: 8, Informal: 4, Appreciative: 3 } },
];

const TONE_COLORS: Record<string, string> = {
  Confident: "#10b981", Direct: "#3b82f6", Formal: "#6366f1", Informative: "#f59e0b",
  Assertive: "#ef4444", Appreciative: "#ec4899", Curious: "#8b5cf6", Informal: "#14b8a6",
  Objective: "#64748b", Neutral: "#94a3b8", Cooperative: "#06b6d4", Skeptical: "#f97316",
  Friendly: "#22c55e", Joyful: "#fbbf24", Admiring: "#a855f7", Inspirational: "#e879f9",
  Optimistic: "#84cc16", Disapproving: "#dc2626", Confused: "#fb923c", Empathetic: "#f472b6",
  Encouraging: "#4ade80", Accusatory: "#b91c1c", Regretful: "#9ca3af", Sad: "#78716c",
  Apologetic: "#a1a1aa",
};

const fmt = (n: number) => n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? (n / 1000).toFixed(0) + "K" : n.toString();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#e0e0e0" }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#fff" }}>Week of {label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#aaa" }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: p.color }}>{typeof p.value === "number" && p.value > 999 ? fmt(p.value) : p.value}{p.unit === "%" ? "%" : ""}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, color, icon }: { label: string; value: string; sub?: string; color: string; icon: string }) => (
  <div style={{
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    borderRadius: 12, padding: "20px 24px", border: "1px solid #2a2a4a",
    position: "relative", overflow: "hidden", minWidth: 0,
  }}>
    <div style={{ position: "absolute", top: -10, right: -10, fontSize: 64, opacity: 0.06, color }}>{icon}</div>
    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#8892b0", marginBottom: 8, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "#5a6a8a", marginTop: 6 }}>{sub}</div>}
  </div>
);

const TabBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} style={{
    background: active ? "linear-gradient(135deg, #0f766e, #14b8a6)" : "transparent",
    color: active ? "#fff" : "#8892b0", border: active ? "none" : "1px solid #2a2a4a",
    borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s",
  }}>{children}</button>
);

export default function GrammarlyPage() {
  const [tab, setTab] = useState("overview");
  const [hoveredTone, setHoveredTone] = useState<string | null>(null);

  const activeWeeks = RAW.filter(w => w.words > 10);
  const totalWords = RAW[RAW.length - 1].cumulative;
  const avgWords = Math.round(activeWeeks.reduce((s, w) => s + w.words, 0) / activeWeeks.length);
  const peakWeek = RAW.reduce((a, b) => a.words > b.words ? a : b);
  const avgAccuracy = Math.round(activeWeeks.reduce((s, w) => s + w.accPct, 0) / activeWeeks.length);
  const avgVocab = Math.round(activeWeeks.reduce((s, w) => s + w.vocabPct, 0) / activeWeeks.length);

  const toneAgg = useMemo(() => {
    const counts: Record<string, number> = {};
    activeWeeks.forEach(w => {
      Object.entries(w.tones).forEach(([t, v]) => {
        counts[t] = (counts[t] || 0) + v;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  const topTones = ["Confident", "Direct", "Formal", "Informative", "Assertive"];
  const toneOverTime = RAW.map(w => {
    const obj: Record<string, any> = { date: w.date };
    topTones.forEach(t => { obj[t] = (w.tones as any)[t] || 0; });
    return obj;
  });

  const monthlyData = useMemo(() => {
    const months: Record<string, { words: number; alerts: number; weeks: number; accSum: number }> = {};
    RAW.forEach(w => {
      const [m] = w.date.split("/");
      const monthKey = parseInt(m) <= 2 ? `2026-${m.padStart(2, "0")}` : `2025-${m.padStart(2, "0")}`;
      if (!months[monthKey]) months[monthKey] = { words: 0, alerts: 0, weeks: 0, accSum: 0 };
      months[monthKey].words += w.words;
      months[monthKey].alerts += w.alerts;
      months[monthKey].weeks++;
      months[monthKey].accSum += w.accPct;
    });
    const labels: Record<string, string> = { "2025-03": "Mar", "2025-04": "Apr", "2025-05": "May", "2025-06": "Jun", "2025-07": "Jul", "2025-08": "Aug", "2025-09": "Sep", "2025-10": "Oct", "2025-11": "Nov", "2025-12": "Dec", "2026-01": "Jan", "2026-02": "Feb" };
    return Object.entries(months).sort().map(([k, v]) => ({
      month: labels[k] || k, words: v.words, alerts: v.alerts, avgAcc: Math.round(v.accSum / v.weeks),
    }));
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: "linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
      color: "#e6edf3", minHeight: "100vh", padding: "100px 24px 32px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&display=swap');`}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#14b8a6", fontWeight: 700, marginBottom: 8 }}>Writing Analytics</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #e6edf3, #8892b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Grammarly Insights
            </h1>
            <div style={{ color: "#5a6a8a", fontSize: 14, marginTop: 4 }}>Mar 9, 2025 — Feb 9, 2026 · 47 weeks tracked</div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 42, fontWeight: 800, color: "#14b8a6", lineHeight: 1 }}>
            4.57<span style={{ fontSize: 20, color: "#5a6a8a" }}>M</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard label="Total Words" value={fmt(totalWords!)} sub="words analyzed" color="#14b8a6" icon="✦" />
          <StatCard label="Avg / Week" value={fmt(avgWords)} sub="active weeks only" color="#3b82f6" icon="◆" />
          <StatCard label="Peak Week" value={fmt(peakWeek.words)} sub={`Week of ${peakWeek.date}`} color="#f59e0b" icon="▲" />
          <StatCard label="Avg Accuracy" value={`${avgAccuracy}%`} sub="percentile vs users" color="#10b981" icon="●" />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {([["overview", "Overview"], ["productivity", "Productivity"], ["tones", "Tone Evolution"], ["percentiles", "Percentiles"]] as const).map(([id, label]) => (
            <TabBtn key={id} active={tab === id} onClick={() => setTab(id)}>{label}</TabBtn>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>Monthly Output</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="month" stroke="#5a6a8a" fontSize={12} />
                  <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="words" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Words" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>Cumulative Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={RAW.filter(w => w.cumulative)}>
                  <defs>
                    <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="date" stroke="#5a6a8a" fontSize={11} />
                  <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cumulative" stroke="#14b8a6" fill="url(#cumGrad)" strokeWidth={2} name="Total Words" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>Dominant Tones (All Time)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {toneAgg.slice(0, 7).map(([tone, val]) => {
                  const max = toneAgg[0][1];
                  return (
                    <div key={tone} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 100, fontSize: 13, color: "#8892b0", fontWeight: 500, flexShrink: 0 }}>{tone}</div>
                      <div style={{ flex: 1, height: 24, background: "#0d1117", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${((val as number) / (max as number)) * 100}%`,
                          background: `linear-gradient(90deg, ${TONE_COLORS[tone] || "#14b8a6"}88, ${TONE_COLORS[tone] || "#14b8a6"})`,
                          borderRadius: 6, transition: "width 0.5s",
                          display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{val}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === "productivity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Weekly Words Analyzed</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={RAW}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={2} />
                  <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="words" name="Words" radius={[3, 3, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Unique Words / Week</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={RAW}>
                    <defs>
                      <linearGradient id="vocGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={4} />
                    <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="unique" stroke="#8b5cf6" fill="url(#vocGrad)" strokeWidth={2} name="Unique Words" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Alerts / Week</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={RAW}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={4} />
                    <YAxis stroke="#5a6a8a" fontSize={11} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="alerts" fill="#f59e0b" name="Alerts" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {tab === "tones" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Top 5 Tones Over Time</h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={toneOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={3} />
                  <YAxis stroke="#5a6a8a" fontSize={11} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {topTones.map(t => (
                    <Area key={t} type="monotone" dataKey={t} stackId="1"
                      stroke={TONE_COLORS[t]} fill={TONE_COLORS[t] + "44"}
                      strokeWidth={hoveredTone === t ? 3 : 1.5}
                      fillOpacity={hoveredTone && hoveredTone !== t ? 0.1 : 0.4}
                      name={t}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Tone Trajectory: Confident vs Formal</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={toneOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={3} />
                  <YAxis stroke="#5a6a8a" fontSize={11} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="Confident" stroke="#10b981" strokeWidth={2.5} dot={false} name="Confident" />
                  <Line type="monotone" dataKey="Formal" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Formal" />
                  <Line type="monotone" dataKey="Assertive" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="5 5" name="Assertive" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 12, color: "#5a6a8a", marginTop: 12 }}>
                Notice: Assertive dropped from 33% (Week 1) to ~3-6% as Confident and Formal became your signature tones.
              </div>
            </div>
          </div>
        )}

        {tab === "percentiles" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Percentile Rankings Over Time</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={RAW.filter(w => w.prodPct > 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="date" stroke="#5a6a8a" fontSize={10} interval={3} />
                  <YAxis stroke="#5a6a8a" fontSize={11} domain={[0, 100]} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="prodPct" stroke="#14b8a6" strokeWidth={2} dot={false} name="Productivity" />
                  <Line type="monotone" dataKey="accPct" stroke="#f59e0b" strokeWidth={2} dot={false} name="Accuracy" />
                  <Line type="monotone" dataKey="vocabPct" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Vocabulary" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { label: "Productivity", avg: Math.round(activeWeeks.reduce((s, w) => s + w.prodPct, 0) / activeWeeks.length), color: "#14b8a6", peak: Math.max(...activeWeeks.map(w => w.prodPct)) },
                { label: "Accuracy", avg: avgAccuracy, color: "#f59e0b", peak: Math.max(...activeWeeks.map(w => w.accPct)) },
                { label: "Vocabulary", avg: avgVocab, color: "#8b5cf6", peak: Math.max(...activeWeeks.map(w => w.vocabPct)) },
              ].map(s => (
                <div key={s.label} style={{ background: "#1a1a2e", borderRadius: 12, padding: 20, border: "1px solid #2a2a4a", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#8892b0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 12px" }}>
                    <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2a2a4a" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={s.color} strokeWidth="3" strokeDasharray={`${s.avg}, 100`} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 22, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: s.color }}>
                      {s.avg}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#5a6a8a" }}>Avg percentile · Peak: {s.peak}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 40, padding: "20px 0", borderTop: "1px solid #2a2a4a", color: "#3a4a6a", fontSize: 12 }}>
          Built from 47 weeks of Grammarly Insights · Mar 2025 – Feb 2026 · Dave @ DDL
        </div>
      </div>
    </div>
  );
}
