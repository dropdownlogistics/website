import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)",
  green: "#58CC02", greenDim: "rgba(88,204,2,0.15)", greenDeep: "#4A9E6B",
  amber: "#FF9600", amberDim: "rgba(255,150,0,0.15)",
  blue: "#1CB0F6", blueDim: "rgba(28,176,246,0.15)",
  violet: "#8549BA", violetDim: "rgba(133,73,186,0.15)",
  rose: "#FF4B4B", roseDim: "rgba(255,75,75,0.15)",
  teal: "#2DCFCF", tealDim: "rgba(45,207,207,0.15)",
  diamond: "#A5D8FF", diamondDim: "rgba(165,216,255,0.15)",
};
const font = { display: "'Space Grotesk', system-ui, sans-serif", mono: "'JetBrains Mono', monospace", body: "'Source Serif 4', Georgia, serif" };

const achievements = [
  { name: "Quest Explorer", value: 750, progress: "10 of 10", tier: "max", isNew: true, color: C.amber },
  { name: "Cheerleader", value: 100, progress: "5 of 5", tier: "max", isNew: true, color: C.violet },
  { name: "Flawless Finisher", value: 100, progress: "5 of 5", tier: "max", isNew: false, color: C.amber },
  { name: "Legend", value: 250, progress: "10 of 10", tier: "max", isNew: false, color: C.blue },
  { name: "Sleepwalker", value: 200, progress: "10 of 10", tier: "max", isNew: false, color: C.violet },
  { name: "XP Olympian", value: "30K", progress: "10 of 10", tier: "max", isNew: false, color: C.amber },
  { name: "Mistake Mechanic", value: "1K", progress: "10 of 10", tier: "max", isNew: true, color: C.amber },
  { name: "Perfect Week", value: 10, progress: "4 of 9", tier: "progress", isNew: true, color: C.rose },
  { name: "Early Riser", value: 200, progress: "10 of 10", tier: "max", isNew: true, color: C.amber },
  { name: "League MVP", value: null, progress: null, tier: "max", isNew: false, color: C.green },
  { name: "Speed Racer", value: "5K", progress: "5 of 5", tier: "max", isNew: false, color: C.rose },
  { name: "Social Butterfly", value: null, progress: null, tier: "max", isNew: false, color: C.rose },
  { name: "Rarest Diamond", value: null, progress: null, tier: "max", isNew: false, color: C.diamond },
];

const records = [
  { label: "Longest Streak", value: "296", unit: "days", date: "Mar 31, 2024", color: C.amber },
  { label: "Highest League", value: "#1", unit: "Diamond", date: "Dec 11, 2023", color: C.diamond },
  { label: "Most XP in a Week", value: "14,648", unit: "XP", date: "Apr 30, 2023", color: C.amber },
  { label: "Perfect Lessons", value: "156", unit: "lessons", date: "Apr 30, 2023", color: C.green },
];

const duoQuotes = [
  { text: "Now I'm intimidated by YOU", context: "Diamond League â€” 8 weeks", color: C.blue },
  { text: "Whew, that streak won't quit", context: "152-day streak", color: C.amber },
  { text: "It takes time to get this good", context: "1,673 minutes learning", color: C.violet },
  { text: "You put in the work, and it shows", context: "55,775 XP earned", color: C.amber },
  { text: "A grandmaster in the making!", context: "1,134 Chess XP", color: C.teal },
  { text: "What CAN'T you do?", context: "4 courses studied", color: C.blue },
];

const courses = [
  { name: "Italian", flag: "ðŸ‡®ðŸ‡¹", score: 13, xp: null, primary: true, color: C.green },
  { name: "English", flag: "ðŸ‡ºðŸ‡¸", score: null, xp: null, primary: false, color: C.blue },
  { name: "Chess", flag: "â™Ÿï¸", score: null, xp: 1134, primary: false, color: C.teal },
  { name: "+1 More", flag: "ðŸ“š", score: null, xp: null, primary: false, color: C.creamDim },
];

export default function DuolingoRecap() {
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const maxedCount = achievements.filter(a => a.tier === "max").length;
  const newCount = achievements.filter(a => a.isNew).length;
  const displayAchievements = showAllAchievements ? achievements : achievements.slice(0, 9);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* Hero */}
      <div style={{
        padding: "40px 24px 32px",
        background: `linear-gradient(180deg, ${C.green}15 0%, transparent 70%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
            DDL Â· CONSOLE Â· YEAR-END RECAPS
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
            <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1.15 }}>Duolingo</h1>
            <span style={{
              fontFamily: font.mono, fontSize: 9, padding: "3px 10px", borderRadius: 12,
              background: C.green + "20", color: C.green, border: `1px solid ${C.green}40`,
            }}>Top 2% Globally</span>
          </div>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6, fontStyle: "italic" }}>
            Goal Crusher. Diamond League competitor. 4 courses, 1,673 minutes, and a 152-day streak.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 24px 48px" }}>

        {/* â•â•â• KPI Strip â•â•â• */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Total XP", value: "55,775", color: C.amber, sub: "Top 2% of all learners" },
            { label: "Minutes", value: "1,673", color: C.violet, sub: "â‰ˆ 27.9 hours" },
            { label: "Streak (2025)", value: "152", color: C.amber, sub: "days consecutive" },
            { label: "Italian Score", value: "13", color: C.green, sub: "Primary language" },
            { label: "Diamond League", value: "8", color: C.blue, sub: "weeks competing" },
            { label: "Chess XP", value: "1,134", color: C.teal, sub: "Side quest" },
          ].map(k => (
            <div key={k.label} style={{
              flex: "1 1 120px", background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 7, padding: "16px 14px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.color, opacity: 0.6 }} />
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.cream }}>{k.value}</div>
              {k.sub && <div style={{ fontFamily: font.body, fontSize: 9, color: C.creamDim, fontStyle: "italic", marginTop: 2 }}>{k.sub}</div>}
            </div>
          ))}
        </div>

        {/* â•â•â• Duo Quotes â•â•â• */}
        <div style={{ marginTop: 24, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
          Duo Said It Best
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
          {duoQuotes.map((q, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "14px", borderLeft: `3px solid ${q.color}`,
            }}>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamHigh, fontStyle: "italic", lineHeight: 1.5, marginBottom: 6 }}>
                "{q.text}"
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: q.color }}>{q.context}</div>
            </div>
          ))}
        </div>

        {/* â•â•â• Courses â•â•â• */}
        <div style={{ marginTop: 28, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
          Courses Studied
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {courses.map(c => (
            <div key={c.name} style={{
              flex: "1 1 140px", background: C.card, border: `1px solid ${c.primary ? c.color + "40" : C.border}`,
              borderRadius: 7, padding: "16px", textAlign: "center",
              ...(c.primary ? { boxShadow: `0 0 20px ${c.color}10` } : {}),
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{c.flag}</div>
              <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{c.name}</div>
              {c.score !== null && (
                <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: c.color }}>Score: {c.score}</div>
              )}
              {c.xp !== null && (
                <div style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 600, color: c.color }}>{c.xp.toLocaleString()} XP</div>
              )}
              {c.primary && (
                <div style={{ fontFamily: font.mono, fontSize: 7, marginTop: 6, padding: "1px 6px", borderRadius: 3, background: c.color + "18", color: c.color, display: "inline-block" }}>PRIMARY</div>
              )}
            </div>
          ))}
        </div>

        {/* â•â•â• Personal Records â•â•â• */}
        <div style={{ marginTop: 28, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
          All-Time Personal Records
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {records.map(r => (
            <div key={r.label} style={{
              flex: "1 1 160px", background: C.card, border: `1px solid ${r.color}20`,
              borderRadius: 7, padding: "16px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: r.color, opacity: 0.4 }} />
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{r.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: r.color }}>{r.value}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{r.unit}</span>
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>{r.date}</div>
            </div>
          ))}
        </div>

        {/* Record vs 2025 comparison */}
        <div style={{ marginTop: 12, padding: "12px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7 }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Record vs 2025</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 2 }}>Streak</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamMid }}>
                <span style={{ color: C.amber, fontWeight: 600 }}>296</span> all-time vs <span style={{ color: C.green, fontWeight: 600 }}>152</span> in 2025
                <span style={{ color: C.creamDim }}> (51%)</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 2 }}>Best XP Week</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamMid }}>
                <span style={{ color: C.amber, fontWeight: 600 }}>14,648</span> all-time
                <span style={{ color: C.creamDim }}> (Apr 2023)</span>
              </div>
            </div>
          </div>
        </div>

        {/* â•â•â• Achievements â•â•â• */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Awards & Achievements
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 6px", borderRadius: 3, background: C.greenDim, color: C.green }}>{maxedCount} maxed</span>
            <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 6px", borderRadius: 3, background: C.roseDim, color: C.rose }}>{newCount} new</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {displayAchievements.map(a => (
            <div key={a.name} style={{
              background: C.card, border: `1px solid ${a.isNew ? a.color + "30" : C.border}`,
              borderRadius: 7, padding: "12px", position: "relative", overflow: "hidden",
            }}>
              {a.isNew && (
                <div style={{ position: "absolute", top: 6, right: 6, fontFamily: font.mono, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: C.roseDim, color: C.rose }}>NEW</div>
              )}
              <div style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{a.name}</div>
              {a.value && (
                <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: a.color, marginBottom: 2 }}>{a.value}</div>
              )}
              {a.progress ? (
                <div style={{ fontFamily: font.mono, fontSize: 9, color: a.tier === "max" ? C.green : C.creamDim }}>
                  {a.progress} {a.tier === "max" ? "âœ“" : ""}
                </div>
              ) : (
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green }}>Earned âœ“</div>
              )}
            </div>
          ))}
        </div>
        {!showAllAchievements && achievements.length > 9 && (
          <button onClick={() => setShowAllAchievements(true)} style={{
            marginTop: 8, padding: "6px 16px", background: C.card, border: `1px solid ${C.borderMed}`,
            borderRadius: 5, cursor: "pointer", fontFamily: font.mono, fontSize: 10, color: C.creamMid,
          }}>Show All {achievements.length} Achievements</button>
        )}

        {/* â•â•â• Behavioral Insight â•â•â• */}
        <div style={{ marginTop: 28 }}>
          <div style={{
            padding: "18px 20px", background: C.green + "08", border: `1px solid ${C.green}25`,
            borderRadius: 9, borderLeft: `3px solid ${C.green}`,
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Behavioral Pattern</div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7, marginBottom: 10 }}>
              The same "deep commitment, narrow focus" pattern from the gaming data shows up here. Italian is the primary course, but the Chess XP (1,134) reveals a second lane running in parallel â€” the same structure as ILLENIUM dominating the music data while pop-punk runs underneath. One deep obsession with a secondary interest that doesn't compete for the top spot.
            </div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>
              The 152-day streak in 2025 is 51% of the all-time 296-day record, suggesting the streak broke and restarted this year. The April 2023 peak (14,648 XP in one week, 156 perfect lessons) was the high-intensity phase. 2025 is the sustained, moderate phase â€” less explosive but more consistent. The system settled into maintenance mode. The DDL methodology, applied to language learning.
            </div>
          </div>
        </div>

        {/* â•â•â• Cross-Platform Note â•â•â• */}
        <div style={{
          marginTop: 16, padding: "14px 18px",
          borderLeft: `3px solid ${C.amber}`, background: C.amber + "06",
          borderRadius: "0 7px 7px 0",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Cross-Platform Note</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            This is the 6th platform in the 2025 Signal Report. PlayStation (1,009 hrs), Xbox/Steam, YouTube (1,001 channels), Apple Music (23,013 min), and now Duolingo (1,673 min, 55,775 XP). The same person across six data streams: deep commitment, narrow focus, systematic progression, and zero interest in doing things halfway.
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.green}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.teal})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics Â· Cottage â€” Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com Â· 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

