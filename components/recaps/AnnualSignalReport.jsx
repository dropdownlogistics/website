import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e",
  roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Platform Colors
// ═══════════════════════════════════════════════════════════
const P = {
  ps: { color: "#4A7FC2", label: "PlayStation", icon: "🎮" },
  xbox: { color: "#4A9E6B", label: "Xbox / Steam", icon: "🖥️" },
  yt: { color: "#B23531", label: "YouTube", icon: "📺" },
  music: { color: "#c94a6e", label: "Apple Music", icon: "🎵" },
};

// ═══════════════════════════════════════════════════════════
// Data — PlayStation 2025 Wrap-Up
// ═══════════════════════════════════════════════════════════
const psData = {
  totalHours: 1009,
  totalGames: 9,
  trophies2025: 94,
  lifetimeTrophies: 214,
  joinedYear: 2009,
  psnId: "ChuckDooley",
  games: [
    { rank: 1, name: "Monster Hunter Wilds", hours: 275, trophies: 45, pct: 27, color: C.crimson },
    { rank: 2, name: "Baldur's Gate 3", hours: 219, trophies: 27, pct: 21, color: C.amber },
    { rank: 3, name: "Diablo IV", hours: 181, trophies: 1, pct: 17, color: C.violet },
    { rank: 4, name: "The First Descendant", hours: 166, trophies: 6, pct: 16, color: C.blue },
    { rank: 5, name: "Skyrim PS5", hours: 7, trophies: 0, pct: 0, color: C.creamDim },
  ],
};

// ═══════════════════════════════════════════════════════════
// Data — Xbox / Steam Gaming Recap
// ═══════════════════════════════════════════════════════════
const xboxData = {
  games: [
    { rank: 1, name: "Schedule I", pct: 94, sessions: 26, streak: 19, startMonth: "April", note: "19-day streak", color: C.green },
    { rank: 2, name: "MH Wilds Demo", pct: 3, sessions: null, streak: null, startMonth: null, note: "Pre-release", color: C.crimson },
    { rank: 3, name: "Skyrim VR", pct: 2, sessions: null, streak: null, startMonth: null, note: null, color: C.violet },
    { rank: 4, name: "No Man's Sky", pct: "<1", sessions: null, streak: null, startMonth: null, note: null, color: C.blue },
    { rank: 5, name: "First Descendant", pct: "<1", sessions: null, streak: null, startMonth: null, note: "100% achievements", color: C.amber },
  ],
};

// ═══════════════════════════════════════════════════════════
// Data — YouTube 2025 Recap
// ═══════════════════════════════════════════════════════════
const ytData = {
  channelsWatched: 1001,
  avgViewerMultiple: "3×",
  topViewerPct: "Top 3%",
  topViewerChannel: "Asmongold TV",
  topViewerVideos: 316,
  topChannels: [
    { rank: 1, name: "Asmongold TV", note: "Top 3% viewer · 316 videos", color: C.crimson },
    { rank: 2, name: "MorePegasus", note: null, color: C.amber },
    { rank: 3, name: "Chef James Makinson", note: null, color: C.green },
    { rank: 4, name: "Team Coco", note: null, color: C.blue },
    { rank: 5, name: "Sydney Watson", note: null, color: C.violet },
  ],
};

// ═══════════════════════════════════════════════════════════
// Data — Apple Music Summary (points to standalone)
// ═══════════════════════════════════════════════════════════
const musicSummary = {
  topArtist: "ILLENIUM",
  topArtistMinutes: 9400,
  totalArtists: 20,
  totalSongs: 84,
  totalAlbums: 15,
  topPlaylist: "The Daily Grind",
  topPlaylistMinutes: 6719,
  personalStationMinutes: 15750,
  genreDominant: "Melodic Bass / EDM",
  genreDominantPct: "73.3%",
};

// ═══════════════════════════════════════════════════════════
// Cross-Platform Computed
// ═══════════════════════════════════════════════════════════
const psHours = psData.totalHours;
const musicHours = Math.round(musicSummary.personalStationMinutes / 60); // station alone is 262
const musicTotalEstimate = Math.round((musicSummary.topArtistMinutes + 2534 + 1937 + 868 + 680) / 60); // top 5 artists alone ~ 256 hrs, but station is 262
// Conservative: use playlist + station combined for music hours
const musicPlaylistStationHrs = Math.round((15750 + 6719 + 3568 + 2838 + 1230 + 689 + 536) / 60); // ~525 hrs

const platformHours = [
  { platform: "Apple Music", hours: musicPlaylistStationHrs, color: P.music.color, note: "Playlists + Stations combined" },
  { platform: "PlayStation", hours: psHours, color: P.ps.color, note: `${psData.totalGames} games` },
  { platform: "YouTube", hours: null, color: P.yt.color, note: "1,001 channels · hours not disclosed" },
  { platform: "Xbox / Steam", hours: null, color: P.xbox.color, note: "Schedule I dominant · hours not disclosed" },
];

const totalTrackedHours = musicPlaylistStationHrs + psHours;

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function KPI({ label, value, sub, color = C.amber }) {
  return (
    <div style={{
      flex: "1 1 160px", background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 7, padding: "18px 16px 14px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.6 }} />
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 26, fontWeight: 700, color: C.cream, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{sub}</div>}
    </div>
  );
}

function Section({ label, icon, color = C.crimson, mt = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: mt }}>
      <div style={{ width: 28, height: 28, borderRadius: 5, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
      <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function Insight({ color, label, children }) {
  return (
    <div style={{
      marginTop: 20, padding: "14px 18px",
      background: color + "10", border: `1px solid ${color}30`,
      borderRadius: 7, borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}

function PlatformBadge({ platform, size = "normal" }) {
  const p = platform === "PlayStation" ? P.ps : platform === "Xbox / Steam" ? P.xbox : platform === "YouTube" ? P.yt : P.music;
  return (
    <span style={{
      fontFamily: font.mono, fontSize: size === "small" ? 8 : 9,
      padding: size === "small" ? "1px 5px" : "2px 7px",
      borderRadius: 3, background: p.color + "20", color: p.color,
      letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{p.icon} {p.label}</span>
  );
}

// PlayStation game bar
function PSGameBar({ game, maxHours }) {
  const pct = (game.hours / maxHours) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 18, textAlign: "right" }}>{game.rank}</div>
      <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, width: 170, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {game.name}
      </div>
      <div style={{ flex: 1, position: "relative", height: 22, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`, background: game.color, opacity: 0.5, borderRadius: 3,
        }} />
        <div style={{
          position: "absolute", left: 8, top: 0, bottom: 0,
          display: "flex", alignItems: "center",
          fontFamily: font.mono, fontSize: 10, color: C.cream, fontWeight: 600,
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}>
          {game.hours}h
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: font.mono, fontSize: 10, color: C.amber }}>{game.trophies}🏆</span>
        <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{game.pct}%</span>
      </div>
    </div>
  );
}

// Cross-platform hour comparison
function HourCompare() {
  const maxHrs = Math.max(...platformHours.filter(p => p.hours).map(p => p.hours));
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "18px 16px" }}>
      {platformHours.map((p, i) => {
        const pct = p.hours ? (p.hours / maxHrs) * 100 : 0;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: i < platformHours.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{ width: 130, flexShrink: 0 }}>
              <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream }}>{p.platform}</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 2 }}>{p.note}</div>
            </div>
            <div style={{ flex: 1, position: "relative", height: 18, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
              {p.hours ? (
                <>
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${pct}%`, background: p.color, opacity: 0.5, borderRadius: 3,
                  }} />
                  <div style={{
                    position: "absolute", left: 8, top: 0, bottom: 0,
                    display: "flex", alignItems: "center",
                    fontFamily: font.mono, fontSize: 10, color: C.cream, fontWeight: 600,
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  }}>{p.hours.toLocaleString()} hrs</div>
                </>
              ) : (
                <div style={{
                  position: "absolute", left: 8, top: 0, bottom: 0,
                  display: "flex", alignItems: "center",
                  fontFamily: font.mono, fontSize: 9, color: C.creamDim, fontStyle: "italic",
                }}>hours not reported</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Tabs
// ═══════════════════════════════════════════════════════════
const tabs = [
  { id: "signal", label: "Signal Overview", icon: "📡" },
  { id: "ps", label: "PlayStation", icon: "🎮" },
  { id: "xbox", label: "Xbox / Steam", icon: "🖥️" },
  { id: "yt", label: "YouTube", icon: "📺" },
  { id: "music", label: "Apple Music", icon: "🎵" },
];

// ═══════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════
export default function AnnualSignalReport() {
  const [tab, setTab] = useState("signal");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "0 0 48px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* ═══ Hero ═══ */}
      <div style={{
        padding: "40px 24px 32px",
        background: `linear-gradient(180deg, ${C.amber}10 0%, transparent 100%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
            DDL · CONSOLE · ANNUAL SIGNAL REPORT
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>
            2025 in Review
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, maxWidth: 600, fontStyle: "italic" }}>
            Four platforms. One operator. Every signal surface unified into a single governance-grade view.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            {Object.values(P).map(p => (
              <span key={p.label} style={{
                fontFamily: font.mono, fontSize: 10, padding: "3px 10px",
                borderRadius: 4, background: p.color + "18", color: p.color,
              }}>{p.icon} {p.label}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Operator <span style={{ color: C.cream }}>D.K. Hale</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>PSN <span style={{ color: C.cream }}>ChuckDooley</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Period <span style={{ color: C.cream }}>2025</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Sources <span style={{ color: C.cream }}>Platform Year-End Wraps</span></span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>

        {/* ═══ Tab Nav ═══ */}
        <div style={{
          display: "flex", gap: 2, marginTop: 24, marginBottom: 28,
          borderBottom: `1px solid ${C.border}`, overflowX: "auto",
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 14px", background: "transparent", border: "none",
              borderBottom: `2px solid ${tab === t.id ? C.amber : "transparent"}`,
              cursor: "pointer", fontFamily: font.mono, fontSize: 11,
              letterSpacing: "0.06em", color: tab === t.id ? C.cream : C.creamDim,
              transition: "all 0.15s", whiteSpace: "nowrap",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SIGNAL OVERVIEW TAB                                */}
        {/* ═══════════════════════════════════════════════════ */}
        {tab === "signal" && (
          <div>
            {/* Hero KPIs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPI label="Tracked Hours" value={totalTrackedHours.toLocaleString()} sub="PlayStation + Apple Music" color={C.amber} />
              <KPI label="PlayStation" value={`${psData.totalHours}`} sub={`${psData.totalGames} games · ${psData.trophies2025} trophies`} color={P.ps.color} />
              <KPI label="YouTube Channels" value="1,001" sub="3× average viewer" color={P.yt.color} />
              <KPI label="Top Artist" value="9,400" sub="ILLENIUM — 156.7 hrs" color={P.music.color} />
            </div>

            {/* Platform Hours Comparison */}
            <Section label="Platform Hours Comparison" icon="📊" color={C.amber} mt={32} />
            <HourCompare />

            {/* Platform Dominance Cards */}
            <Section label="Platform Dominance Signals" icon="🏆" color={C.crimson} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10 }}>
              {[
                {
                  platform: "PlayStation", color: P.ps.color,
                  dominant: "Monster Hunter Wilds", stat: "275h / 27%",
                  sub: "Also: BG3 219h, Diablo IV 181h",
                },
                {
                  platform: "Xbox / Steam", color: P.xbox.color,
                  dominant: "Schedule I", stat: "94% playtime",
                  sub: "26 sessions · 19-day streak",
                },
                {
                  platform: "YouTube", color: P.yt.color,
                  dominant: "Asmongold TV", stat: "Top 3% viewer",
                  sub: "316 videos · 1,001 channels total",
                },
                {
                  platform: "Apple Music", color: P.music.color,
                  dominant: "ILLENIUM", stat: "9,400 min",
                  sub: "3.7× lead over #2 · 8 of top 15 albums",
                },
              ].map((d, i) => (
                <div key={i} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "16px 16px 14px", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, bottom: 0, background: d.color, opacity: 0.5 }} />
                  <div style={{ fontFamily: font.mono, fontSize: 8, color: d.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{d.platform}</div>
                  <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 2 }}>{d.dominant}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 12, color: d.color, fontWeight: 600, marginBottom: 6 }}>{d.stat}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{d.sub}</div>
                </div>
              ))}
            </div>

            {/* Cross-Platform Patterns */}
            <Section label="Cross-Platform Behavioral Patterns" icon="🧠" color={C.violet} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  label: "Monster Hunter Everywhere",
                  color: C.crimson,
                  text: "MH Wilds appears on both PlayStation (275h, #1 game) and Xbox/Steam (demo, 3% of playtime). Cross-platform commitment to a single franchise — the only title present on both gaming surfaces.",
                },
                {
                  label: "The First Descendant — Completionist Signal",
                  color: C.amber,
                  text: "166 hours on PlayStation (#4 game, 6 trophies) plus a separate Xbox/Steam entry with 100% achievements. Played to completion on two platforms independently.",
                },
                {
                  label: "Curated Listening, Algorithmic Padding",
                  color: P.music.color,
                  text: "Custom playlists (The Daily Grind, Sk8r Core) drive the majority of listening. Personal station at 15,750 minutes fills gaps. The operator curates; the algorithm backfills.",
                },
                {
                  label: "Content Consumption as Background Layer",
                  color: P.yt.color,
                  text: "1,001 YouTube channels at 3× the average viewer. Top channels skew gaming commentary (Asmongold), cooking (Chef James Makinson), and comedy (Team Coco). YouTube is the ambient signal — always on, broadly distributed.",
                },
                {
                  label: "Deep Commitment, Narrow Focus",
                  color: C.violet,
                  text: "Across all platforms, the pattern is the same: one dominant entity commands disproportionate share. ILLENIUM owns 37.8% of artist minutes. Schedule I owns 94% of Xbox time. Monster Hunter owns 27% of PlayStation hours. Asmongold is top 3%. Dave doesn't dabble — he locks in.",
                },
              ].map((p, i) => (
                <div key={i} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "14px 18px", borderLeft: `3px solid ${p.color}`,
                }}>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: p.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{p.label}</div>
                  <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{p.text}</p>
                </div>
              ))}
            </div>

            {/* Operator Profile Card */}
            <Section label="Operator Summary" icon="👤" color={C.ember} />
            <div style={{
              background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 7,
              padding: "24px 22px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${P.ps.color}, ${P.xbox.color}, ${P.yt.color}, ${P.music.color})`,
              }} />
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.cream, marginBottom: 4 }}>D.K. Hale</div>
                  <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, fontStyle: "italic", marginBottom: 12 }}>
                    ChuckDooley on PSN (since 2009) · u/chuckdooley on Reddit
                  </div>
                  <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>
                    The signal pattern across four platforms paints a consistent picture: deep, sustained commitment to a narrow set of interests. 
                    Not a browser — a specialist. Whether it's 275 hours in Monster Hunter, 9,400 minutes of ILLENIUM, a 19-day gaming streak in Schedule I, 
                    or top 3% viewership on a single YouTube channel, the behavior is always the same. Find the thing. Lock in. Go deep.
                  </div>
                </div>
                <div style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "Gaming Hours", value: "1,009+", platform: "PlayStation" },
                    { label: "Music (Station + Playlists)", value: `${musicPlaylistStationHrs} hrs`, platform: "Apple Music" },
                    { label: "YouTube Channels", value: "1,001", platform: "YouTube" },
                    { label: "Trophies / Achievements", value: "94 + 100%", platform: "Cross-Platform" },
                    { label: "PSN Tenure", value: "16 years", platform: "PlayStation" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "6px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{s.label}</span>
                      <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.cream }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════ */}
        {/* PLAYSTATION TAB                                    */}
        {/* ═══════════════════════════════════════════════════ */}
        {tab === "ps" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPI label="Total Hours" value="1,009" sub="Across 9 games" color={P.ps.color} />
              <KPI label="Trophies (2025)" value="94" sub="214 lifetime" color={C.amber} />
              <KPI label="PSN Since" value="2009" sub="ChuckDooley · 16 years" color={C.blue} />
              <KPI label="#1 Game" value="275h" sub="Monster Hunter Wilds" color={C.crimson} />
            </div>

            <Section label="Top Games — Hours & Trophies" icon="🎮" color={P.ps.color} />
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 14px" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 0 8px", borderBottom: `1px solid ${C.border}`, marginBottom: 4 }}>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 18, textAlign: "right" }}>#</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 170 }}>GAME</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, flex: 1 }}>HOURS</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 80, textAlign: "right" }}>TROPHIES</span>
              </div>
              {psData.games.map(g => <PSGameBar key={g.rank} game={g} maxHours={psData.games[0].hours} />)}
            </div>

            {/* Time Distribution */}
            <Section label="Time Distribution" icon="⏱️" color={C.amber} />
            <div style={{ display: "flex", gap: 3, height: 40, borderRadius: 5, overflow: "hidden" }}>
              {psData.games.filter(g => g.pct > 0).map(g => (
                <div key={g.rank} style={{
                  flex: `0 0 ${g.pct}%`, background: g.color, opacity: 0.6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", minWidth: g.pct > 5 ? 0 : 2,
                }}>
                  {g.pct >= 10 && (
                    <span style={{
                      fontFamily: font.mono, fontSize: 9, color: C.cream, fontWeight: 600,
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                    }}>{g.name.split(" ")[0]} {g.pct}%</span>
                  )}
                </div>
              ))}
              <div style={{
                flex: "0 0 19%", background: C.creamGhost,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>4 others 19%</span>
              </div>
            </div>

            <Insight color={P.ps.color} label="PlayStation Signal">
              The top three — Monster Hunter Wilds, Baldur's Gate 3, and Diablo IV — account for <strong style={{ color: C.cream }}>67% of all hours</strong>. 
              All three are deep, systems-heavy RPGs with long progression curves. Trophy output is heavily front-loaded: MH Wilds alone 
              accounts for <strong style={{ color: C.cream }}>48% of all 2025 trophies</strong> (45 of 94). 
              Diablo IV's single trophy across 181 hours suggests engagement driven by gameplay loop, not achievement hunting.
            </Insight>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════ */}
        {/* XBOX / STEAM TAB                                   */}
        {/* ═══════════════════════════════════════════════════ */}
        {tab === "xbox" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPI label="Dominant Game" value="94%" sub="Schedule I" color={P.xbox.color} />
              <KPI label="Sessions" value="26" sub="Schedule I tracked" color={C.amber} />
              <KPI label="Max Streak" value="19" sub="Consecutive days" color={C.crimson} />
              <KPI label="100% Achieved" value="1" sub="The First Descendant" color={C.violet} />
            </div>

            <Section label="Xbox / Steam Game Breakdown" icon="🖥️" color={P.xbox.color} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {xboxData.games.map(g => (
                <div key={g.rank} style={{
                  background: C.card, border: `1px solid ${g.rank === 1 ? g.color + "40" : C.border}`,
                  borderRadius: 7, padding: "16px 18px",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <div style={{
                    fontFamily: font.mono, fontSize: 28, fontWeight: 700,
                    color: g.color, opacity: 0.3, width: 36, textAlign: "center",
                  }}>{g.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, marginBottom: 2 }}>{g.name}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                      <span style={{
                        fontFamily: font.mono, fontSize: 10, padding: "2px 8px",
                        borderRadius: 3, background: g.color + "18", color: g.color, fontWeight: 600,
                      }}>{typeof g.pct === "number" ? `${g.pct}%` : g.pct} playtime</span>
                      {g.sessions && (
                        <span style={{ fontFamily: font.mono, fontSize: 10, padding: "2px 8px", borderRadius: 3, background: C.creamGhost, color: C.creamMid }}>
                          {g.sessions} sessions
                        </span>
                      )}
                      {g.streak && (
                        <span style={{ fontFamily: font.mono, fontSize: 10, padding: "2px 8px", borderRadius: 3, background: C.crimsonFaint, color: C.crimson }}>
                          {g.streak}-day streak
                        </span>
                      )}
                      {g.startMonth && (
                        <span style={{ fontFamily: font.mono, fontSize: 10, padding: "2px 8px", borderRadius: 3, background: C.creamGhost, color: C.creamDim }}>
                          Started {g.startMonth}
                        </span>
                      )}
                      {g.note && !g.streak && (
                        <span style={{ fontFamily: font.mono, fontSize: 10, padding: "2px 8px", borderRadius: 3, background: C.amberDim, color: C.amber }}>
                          {g.note}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule I dominance viz */}
            <Section label="Playtime Distribution" icon="📊" color={C.green} />
            <div style={{ display: "flex", height: 48, borderRadius: 5, overflow: "hidden", gap: 2 }}>
              <div style={{
                flex: "0 0 94%", background: C.green, opacity: 0.5, borderRadius: "5px 0 0 5px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: C.cream, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                  Schedule I — 94%
                </span>
              </div>
              <div style={{
                flex: "0 0 6%", background: C.creamGhost, borderRadius: "0 5px 5px 0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim }}>6%</span>
              </div>
            </div>

            <Insight color={P.xbox.color} label="Xbox / Steam Signal">
              Schedule I dominance at 94% is the most lopsided single-title concentration across any platform. 
              The 19-day streak suggests this wasn't casual — it was a <strong style={{ color: C.cream }}>sustained daily commitment</strong> from 
              April onward. The First Descendant's 100% achievement completion on Xbox/Steam, paired with 166 hours on PlayStation, 
              confirms the <strong style={{ color: C.cream }}>cross-platform completionist pattern</strong>.
            </Insight>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════ */}
        {/* YOUTUBE TAB                                        */}
        {/* ═══════════════════════════════════════════════════ */}
        {tab === "yt" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPI label="Channels Watched" value="1,001" sub="3× average viewer" color={P.yt.color} />
              <KPI label="Asmongold TV" value="Top 3%" sub="316 videos watched" color={C.crimson} />
              <KPI label="Top Channels" value="5" sub="Ranked in wrap-up" color={C.amber} />
              <KPI label="Viewer Multiple" value="3×" sub="vs. average YouTube user" color={C.blue} />
            </div>

            <Section label="Top Channels" icon="📺" color={P.yt.color} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ytData.topChannels.map(ch => (
                <div key={ch.rank} style={{
                  background: C.card, border: `1px solid ${ch.rank === 1 ? ch.color + "40" : C.border}`,
                  borderRadius: 7, padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    fontFamily: font.mono, fontSize: 22, fontWeight: 700,
                    color: ch.color, opacity: 0.4, width: 28, textAlign: "center",
                  }}>{ch.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream }}>{ch.name}</div>
                    {ch.note && (
                      <div style={{ fontFamily: font.mono, fontSize: 10, color: ch.color, marginTop: 3 }}>{ch.note}</div>
                    )}
                  </div>
                  <span style={{
                    fontFamily: font.mono, fontSize: 8, padding: "2px 7px", borderRadius: 3,
                    background: ch.color + "18", color: ch.color, textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {ch.rank === 1 ? "Gaming" : ch.rank === 2 ? "Gaming" : ch.rank === 3 ? "Cooking" : ch.rank === 4 ? "Comedy" : "Commentary"}
                  </span>
                </div>
              ))}
            </div>

            {/* Channel Genre Mapping */}
            <Section label="Content Genre Map" icon="🗺️" color={C.amber} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { genre: "Gaming / Commentary", channels: ["Asmongold TV", "MorePegasus"], color: C.crimson, count: 2 },
                { genre: "Cooking", channels: ["Chef James Makinson"], color: C.green, count: 1 },
                { genre: "Comedy / Talk", channels: ["Team Coco"], color: C.blue, count: 1 },
                { genre: "Commentary / Culture", channels: ["Sydney Watson"], color: C.violet, count: 1 },
              ].map(g => (
                <div key={g.genre} style={{
                  flex: "1 1 180px", background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 7, padding: "14px 16px",
                }}>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: g.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{g.genre}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: C.cream }}>{g.count}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, marginTop: 4 }}>
                    {g.channels.join(", ")}
                  </div>
                </div>
              ))}
            </div>

            <Insight color={P.yt.color} label="YouTube Signal">
              YouTube is the <strong style={{ color: C.cream }}>broadest platform</strong> by reach — 1,001 channels versus single-digit games or 
              20 ranked artists. But the engagement still concentrates: top 3% on Asmongold TV means deep, repeat viewing. 
              The genre spread (gaming, cooking, comedy, commentary) suggests YouTube serves as the <strong style={{ color: C.cream }}>ambient background layer</strong> — 
              the platform that's always on while other platforms get focused sessions.
            </Insight>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════ */}
        {/* APPLE MUSIC TAB (Summary → Standalone Link)        */}
        {/* ═══════════════════════════════════════════════════ */}
        {tab === "music" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPI label="#1 Artist" value="9,400" sub="ILLENIUM — 156.7 hrs" color={P.music.color} />
              <KPI label="Artists Ranked" value="20" sub="Top 20 by minutes" color={C.amber} />
              <KPI label="Songs Tracked" value="84" sub="3 artists hold 90%+" color={C.blue} />
              <KPI label="Albums" value="15" sub="8 ILLENIUM projects" color={C.violet} />
            </div>

            {/* Summary Cards */}
            <Section label="Apple Music — Key Signals" icon="🎵" color={P.music.color} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {[
                { label: "Genre Dominant", value: musicSummary.genreDominant, stat: musicSummary.genreDominantPct, color: C.crimson },
                { label: "#1 Playlist", value: musicSummary.topPlaylist, stat: `${musicSummary.topPlaylistMinutes.toLocaleString()} min`, color: C.amber },
                { label: "Personal Station", value: "David Kitchens'", stat: `${musicSummary.personalStationMinutes.toLocaleString()} min`, color: C.violet },
                { label: "ILLENIUM Share", value: "37.8% of artist min", stat: "3.7× over #2", color: C.crimson },
                { label: "Pop-Punk Cluster", value: "5 artists", stat: "542–556 min band", color: C.rose },
                { label: "#2 Artist", value: "Polyphia", stat: "2,534 min", color: C.violet },
              ].map((c, i) => (
                <div key={i} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "14px 16px",
                }}>
                  <div style={{ fontFamily: font.mono, fontSize: 8, color: c.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: 2 }}>{c.value}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 11, color: c.color, fontWeight: 600 }}>{c.stat}</div>
                </div>
              ))}
            </div>

            {/* CTA to Standalone */}
            <div style={{
              marginTop: 28, padding: "24px 24px",
              background: `linear-gradient(135deg, ${P.music.color}15 0%, ${C.crimson}10 100%)`,
              border: `1px solid ${P.music.color}30`,
              borderRadius: 9, textAlign: "center",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: P.music.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                Full Deep Dive Available
              </div>
              <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 6 }}>
                Apple Music Replay 2025
              </div>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 16px" }}>
                20 ranked artists with genre mapping. All 84 songs extracted. 15 albums. 
                Playlists, stations, and full listening mode analysis.
              </p>
              <div style={{
                display: "inline-block", padding: "10px 28px",
                background: P.music.color + "25", border: `1px solid ${P.music.color}50`,
                borderRadius: 6, fontFamily: font.mono, fontSize: 11,
                color: P.music.color, fontWeight: 600, letterSpacing: "0.08em",
                cursor: "pointer",
              }}>
                → View Standalone Console
              </div>
            </div>

            <Insight color={P.music.color} label="Music Signal Summary">
              Apple Music is the <strong style={{ color: C.cream }}>deepest data surface</strong> in this report — enough signal for its own 
              standalone CONSOLE page. The summary here captures the headlines: ILLENIUM dominance, the pop-punk nostalgia cluster, 
              curated-playlist-first listening behavior, and a personal station that alone accounts for 262+ hours.
            </Insight>
          </div>
        )}

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${P.ps.color}, ${P.xbox.color}, ${P.yt.color}, ${P.music.color}, ${C.amber})`,
            borderRadius: 1, marginBottom: 14,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.06em" }}>
              dropdownlogistics.com · 2025
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
