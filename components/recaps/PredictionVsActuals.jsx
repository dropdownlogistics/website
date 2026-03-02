import { useState } from "react";
const C = { navy: "#0D1B2A", card: "#10202f", cardHover: "#162538", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)", crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)", green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)", blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)", rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)", ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)" };
const font = { display: "'Space Grotesk', system-ui, sans-serif", mono: "'JetBrains Mono', monospace", body: "'Source Serif 4', Georgia, serif" };

const predictedArtists = [
  { rank: 1, name: "Eminem", confidence: "High", genre: "Hip-Hop" },
  { rank: 2, name: "Foo Fighters", confidence: "High", genre: "Rock" },
  { rank: 3, name: "Kendrick Lamar", confidence: "High", genre: "Hip-Hop" },
  { rank: 4, name: "Post Malone", confidence: "High", genre: "Pop/Hip-Hop" },
  { rank: 5, name: "Zach Bryan", confidence: "High", genre: "Country" },
  { rank: 6, name: "Morgan Wallen", confidence: "High", genre: "Country" },
  { rank: 7, name: "Luke Combs", confidence: "High", genre: "Country" },
  { rank: 8, name: "Jelly Roll", confidence: "High", genre: "Country/Rap" },
  { rank: 9, name: "Tyler Childers", confidence: "Medium", genre: "Country" },
  { rank: 10, name: "Hozier", confidence: "Medium", genre: "Indie/Folk" },
  { rank: 11, name: "Noah Kahan", confidence: "Medium", genre: "Indie/Folk" },
  { rank: 12, name: "Linkin Park", confidence: "Medium", genre: "Alt Rock" },
  { rank: 13, name: "Red Hot Chili Peppers", confidence: "Medium", genre: "Rock" },
  { rank: 14, name: "Blink-182", confidence: "Medium", genre: "Pop-Punk" },
  { rank: 15, name: "Twenty One Pilots", confidence: "Medium", genre: "Alt Pop" },
  { rank: 16, name: "Mac Miller", confidence: "Guess", genre: "Hip-Hop" },
  { rank: 17, name: "The Lumineers", confidence: "Guess", genre: "Folk" },
  { rank: 18, name: "Mumford & Sons", confidence: "Guess", genre: "Folk/Rock" },
  { rank: 19, name: "Jack Johnson", confidence: "Guess", genre: "Acoustic" },
  { rank: 20, name: "Childish Gambino", confidence: "Guess", genre: "Hip-Hop" },
  { rank: 21, name: "Imagine Dragons", confidence: "Guess", genre: "Alt Rock" },
  { rank: 22, name: "AJR", confidence: "Guess", genre: "Indie Pop" },
  { rank: 23, name: "Glass Animals", confidence: "Guess", genre: "Indie" },
  { rank: 24, name: "Sturgill Simpson", confidence: "Guess", genre: "Country" },
  { rank: 25, name: "Hardy", confidence: "Guess", genre: "Country Rock" },
];

const actualArtists = [
  { rank: 1, name: "ILLENIUM", minutes: 9400, genre: "Melodic Bass" },
  { rank: 2, name: "Polyphia", minutes: 2534, genre: "Math Rock" },
  { rank: 3, name: "Said The Sky", minutes: 1937, genre: "Melodic Bass" },
  { rank: 4, name: "Seven Lions", minutes: 868, genre: "Melodic Bass" },
  { rank: 5, name: "Excision", minutes: 680, genre: "Melodic Bass" },
  { rank: 6, name: "The Chainsmokers", minutes: 624, genre: "Melodic Bass" },
  { rank: 7, name: "Gryffin", minutes: 599, genre: "Melodic Bass" },
  { rank: 8, name: "Dabin", minutes: 562, genre: "Melodic Bass" },
  { rank: 9, name: "SLANDER", minutes: 560, genre: "Melodic Bass" },
  { rank: 10, name: "Good Charlotte", minutes: 556, genre: "Pop-Punk" },
  { rank: 11, name: "New Found Glory", minutes: 555, genre: "Pop-Punk" },
  { rank: 12, name: "Yellowcard", minutes: 553, genre: "Pop-Punk" },
  { rank: 13, name: "The All-American Rejects", minutes: 542, genre: "Pop-Punk" },
  { rank: 14, name: "T.I.", minutes: 468, genre: "Hip-Hop" },
  { rank: 15, name: "Simple Plan", minutes: 468, genre: "Pop-Punk" },
  { rank: 16, name: "Wooli", minutes: 442, genre: "Melodic Bass" },
  { rank: 17, name: "Trivecta", minutes: 437, genre: "Melodic Bass" },
  { rank: 18, name: "Angels & Airwaves", minutes: 411, genre: "Pop-Punk" },
  { rank: 19, name: "William Black", minutes: 391, genre: "Melodic Bass" },
  { rank: 20, name: "NURKO", minutes: 377, genre: "Melodic Bass" },
];

const predictedAlbums = [
  { rank: 1, name: "Zach Bryan — Zach Bryan", confidence: "High" }, { rank: 2, name: "Jelly Roll — Whitsitt Chapel", confidence: "High" }, { rank: 3, name: "Post Malone — Austin / F-1 Trillion", confidence: "High" }, { rank: 4, name: "Morgan Wallen — One Thing at a Time", confidence: "High" }, { rank: 5, name: "Kendrick Lamar — GNX / Mr. Morale", confidence: "High" }, { rank: 6, name: "Eminem — Death of Slim Shady", confidence: "High" }, { rank: 7, name: "Luke Combs — Fathers & Sons", confidence: "High" }, { rank: 8, name: "Noah Kahan — Stick Season", confidence: "High" },
  { rank: 9, name: "Tyler Childers — Rustin' in the Rain", confidence: "Medium" }, { rank: 10, name: "Hozier — Unreal Unearth", confidence: "Medium" }, { rank: 11, name: "Foo Fighters — But Here We Are", confidence: "Medium" }, { rank: 12, name: "Linkin Park — From Zero", confidence: "Medium" }, { rank: 13, name: "Blink-182 — ONE MORE TIME...", confidence: "Medium" }, { rank: 14, name: "The Lumineers — Brightside", confidence: "Medium" }, { rank: 15, name: "RHCP — Return of the Dream Canteen", confidence: "Medium" }, { rank: 16, name: "Mac Miller — Swimming", confidence: "Medium" },
  { rank: 17, name: "Childish Gambino — Bando Stone", confidence: "Guess" }, { rank: 18, name: "Twenty One Pilots — Clancy", confidence: "Guess" }, { rank: 19, name: "Glass Animals — Dreamland", confidence: "Guess" }, { rank: 20, name: "Sturgill Simpson — Passage du Desir", confidence: "Guess" }, { rank: 21, name: "Hardy — quit!!", confidence: "Guess" }, { rank: 22, name: "Mumford & Sons — Delta", confidence: "Guess" }, { rank: 23, name: "Imagine Dragons — LOOM", confidence: "Guess" }, { rank: 24, name: "Jack Johnson — In Between Dreams", confidence: "Guess" }, { rank: 25, name: "AJR — The Maybe Man", confidence: "Guess" },
];

const actualAlbums = [
  { rank: 1, name: "ILLENIUM: Trilogy in Los Angeles", artist: "ILLENIUM", minutes: 1673 }, { rank: 2, name: "ILLENIUM", artist: "ILLENIUM", minutes: 738 }, { rank: 3, name: "Sentiment (The Remixes)", artist: "Said The Sky", minutes: 656 }, { rank: 4, name: "Fallen Embers (Deluxe)", artist: "ILLENIUM", minutes: 597 }, { rank: 5, name: "Ascend", artist: "ILLENIUM", minutes: 241 }, { rank: 6, name: "Find My Way (Deluxe)", artist: "Trivecta", minutes: 200 }, { rank: 7, name: "Ashes", artist: "ILLENIUM", minutes: 146 },
  { rank: 8, name: "Sentiment", artist: "Said The Sky", minutes: 131 }, { rank: 9, name: "NYE 2022 (DJ Mix)", artist: "ILLENIUM", minutes: 120 }, { rank: 10, name: "Covers (Vol. 2)", artist: "Tommee Profitt", minutes: 109 }, { rank: 11, name: "Ashes to Ashes 004 (DJ Mix)", artist: "ILLENIUM", minutes: 101 }, { rank: 12, name: "Cinematic Songs (Vol. 7)", artist: "Tommee Profitt", minutes: 98 }, { rank: 13, name: "The Life of a Showgirl", artist: "Taylor Swift", minutes: 97 }, { rank: 14, name: "PULSE", artist: "Gryffin", minutes: 90 }, { rank: 15, name: "ILLENIUM at EDC Las Vegas", artist: "ILLENIUM", minutes: 75 },
];

const genreComparison = [
  { genre: "Country / Folk", predicted: 8, actual: 0, color: C.ember },
  { genre: "Hip-Hop / Rap", predicted: 5, actual: 1, color: C.amber },
  { genre: "Rock / Alt", predicted: 5, actual: 0, color: C.blue },
  { genre: "Indie / Folk-Pop", predicted: 4, actual: 0, color: C.green },
  { genre: "Pop-Punk", predicted: 1, actual: 6, color: C.rose },
  { genre: "Melodic Bass / EDM", predicted: 0, actual: 12, color: C.crimson },
  { genre: "Math Rock", predicted: 0, actual: 1, color: C.violet },
];

const auditTimeline = [
  { phase: "I", label: "Blind Prediction", who: "Predicting Claude", color: C.blue, quote: "Dave has consistently surprised me with range. His music taste is probably wider than any algorithm would predict.", subtext: "The hedge was right. The direction was wrong." },
  { phase: "II", label: "The Reveal", who: "Predicting Claude", color: C.crimson, quote: "Cataloging spectacularly inaccurate predictions against actual data", subtext: "— Thinking indicator, moments after receiving the actuals. Instant recognition." },
  { phase: "III", label: "Honest Reaction", who: "Predicting Claude", color: C.amber, quote: "That's not listening, that's a residency.", subtext: "— On ILLENIUM's 9,400 minutes. Clean recovery. Zero cope." },
  { phase: "IV", label: "Meta Response", who: "Predicting Claude", color: C.violet, quote: "Chaos → Structured → Automated, applied to a playlist.", subtext: "— Recognizing DDL methodology in the listening data. The sharpest observation in the entire exchange." },
  { phase: "V", label: "The Scoring", who: "Scoring Claude", color: C.green, quote: "The audit failed at planning but passed at fieldwork.", subtext: "— This thread. The assurance engagement is complete." },
];

function KPI({ label, value, sub, color = C.amber }) {
  return (<div style={{ flex: "1 1 155px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "18px 16px 14px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.6 }} />
    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: font.mono, fontSize: 26, fontWeight: 700, color: C.cream, lineHeight: 1, marginBottom: 4 }}>{value}</div>
    {sub && <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic" }}>{sub}</div>}
  </div>);
}

function Section({ label, icon, color = C.crimson, mt = 40 }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: mt }}>
    <div style={{ width: 28, height: 28, borderRadius: 5, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
    <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>{label}</span>
    <div style={{ flex: 1, height: 1, background: C.border }} />
  </div>);
}

function PullQuote({ quote, attribution, color = C.crimson }) {
  return (<div style={{ padding: "18px 22px", borderLeft: `3px solid ${color}`, background: color + "08", borderRadius: "0 7px 7px 0" }}>
    <div style={{ fontFamily: font.body, fontSize: 17, color: C.cream, fontStyle: "italic", lineHeight: 1.5, marginBottom: 6 }}>"{quote}"</div>
    {attribution && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.06em" }}>{attribution}</div>}
  </div>);
}

const tabs = [
  { id: "verdict", label: "Audit Verdict" },
  { id: "artists", label: "Artists: Predicted vs Actual" },
  { id: "albums", label: "Albums: Predicted vs Actual" },
  { id: "genre", label: "Genre Misread" },
  { id: "timeline", label: "The Audit Arc" },
];

export default function PredictionAudit() {
  const [tab, setTab] = useState("verdict");
  const [showAllP, setShowAllP] = useState(false);
  const [showAllA, setShowAllA] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, padding: "0 0 48px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

      {/* Hero */}
      <div style={{ padding: "40px 24px 32px", background: `linear-gradient(180deg, ${C.crimson}14 0%, transparent 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>DDL · CONSOLE · ASSURANCE ENGAGEMENT</div>
          <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 6 }}>Prediction vs. Actuals</h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, maxWidth: 620, fontStyle: "italic" }}>One Claude predicted Dave's Apple Music Top 25 from personality signals alone. Another Claude scored the results. This is the audit report.</p>
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Predicting Model <span style={{ color: C.blue }}>Claude (Thread B)</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Scoring Model <span style={{ color: C.green }}>Claude (Thread A)</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Subject <span style={{ color: C.cream }}>D.K. Hale</span></span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Verdict <span style={{ color: C.crimson }}>Material Misstatement</span></span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginTop: 24, marginBottom: 28, borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>
          {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? C.crimson : "transparent"}`, cursor: "pointer", fontFamily: font.mono, fontSize: 11, letterSpacing: "0.06em", color: tab === t.id ? C.cream : C.creamDim, transition: "all 0.15s", whiteSpace: "nowrap" }}>{t.label}</button>))}
        </div>

        {/* ═══ VERDICT ═══ */}
        {tab === "verdict" && (<div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <KPI label="Exact Artist Matches" value="0 / 25" sub="Against top 20 actuals" color={C.crimson} />
            <KPI label="Exact Album Matches" value="0 / 25" sub="Against top 15 actuals" color={C.crimson} />
            <KPI label="Genre Accuracy" value="4%" sub="1 pop-punk act predicted, 6 actual" color={C.ember} />
            <KPI label="EDM Predicted" value="0" sub="Actual: 12 of 20 artists" color={C.violet} />
          </div>

          <div style={{ marginTop: 28, padding: "28px 24px", background: `linear-gradient(135deg, ${C.crimson}12 0%, ${C.navy} 100%)`, border: `1px solid ${C.crimson}30`, borderRadius: 9, textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>The Central Finding</div>
            <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream, lineHeight: 1.3, marginBottom: 8 }}>The model predicted a country-folk-hip-hop listener.</div>
            <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.crimson, lineHeight: 1.3, marginBottom: 16 }}>The actual is a melodic bass EDM + pop-punk listener.</div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>The word "EDM" does not appear anywhere in the 25-artist prediction document. ILLENIUM — the #1 artist at 9,400 minutes — was not predicted, mentioned, or wildcarded.</div>
          </div>

          <Section label="Moment of Impact" icon="💥" color={C.crimson} mt={32} />
          <div style={{ background: "#1a1a1f", border: `1px solid ${C.border}`, borderRadius: 9, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `conic-gradient(${C.ember}, ${C.crimson}, ${C.amber}, ${C.ember})`, display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 2s linear infinite", flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1a1a1f" }} />
            </div>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: 14, color: C.creamHigh, lineHeight: 1.5 }}>Cataloging spectacularly inaccurate predictions against actual data</div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>— Claude thinking indicator, immediately upon receiving the actuals</div>
            </div>
          </div>

          <Section label="Root Cause Analysis" icon="🔍" color={C.amber} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { finding: "Demographic Overfitting", color: C.crimson, detail: "The model built its entire thesis on 'mid-30s Kansas male' demographics — country, recovery anthems, college basketball tailgate music. The actual listener has zero country in the top 20." },
              { finding: "Recovery Narrative Bias", color: C.amber, detail: "Predicted Jelly Roll, Eminem, Mac Miller, and The Lumineers based on sobriety themes. The actual listening is emotional but through EDM and instrumental math rock — feeling-driven, not lyric-driven recovery content." },
              { finding: "Missing the Electronic Signal Entirely", color: C.violet, detail: "Zero EDM artists predicted. The actual top 20 is 60% melodic bass. YouTube data (Asmongold, gaming) and gaming history should have hinted at electronic/gaming-adjacent music, but the model went folk-country instead." },
              { finding: "Pop-Punk Underweighted", color: C.rose, detail: "Blink-182 was the lone pop-punk prediction at #14. The actual data has six pop-punk artists in a tight cluster. The Sk8r Core playlist (3,568 min) is its own ecosystem." },
              { finding: "Reddit ≠ Music Taste", color: C.blue, detail: "r/psych, r/community, r/skyrim led the model toward 'eclectic intellectual' predictions. Actual music taste is highly concentrated, genre-loyal, and repetition-driven — the opposite of eclectic." },
            ].map((f, i) => (<div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px 18px", borderLeft: `3px solid ${f.color}` }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: f.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{f.finding}</div>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{f.detail}</p>
            </div>))}
          </div>

          <Section label="Partial Credit Awarded" icon="🏅" color={C.green} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Blink-182 → Pop-Punk Cluster", credit: "Genre Adjacent", color: C.rose, note: "Predicted one pop-punk act. Actual has six. Right neighborhood, wrong address." },
              { label: "Hip-Hop Flagged → T.I. Present", credit: "Category Hit", color: C.ember, note: "Hip-hop was predicted as 20% of the list. It's 5% — but T.I. is there at #14." },
              { label: "Taylor Swift → Emily Factor", credit: "Post-Hoc Insight", color: C.violet, note: "Not predicted, but the other Claude correctly identified The Life of a Showgirl (#13) as Emily's influence upon seeing the data." },
              { label: '"Wider than any algorithm would predict"', credit: "Correct Hedge", color: C.blue, note: "The prediction doc hedged that Dave's taste would surprise. It did. Credit for intellectual honesty." },
            ].map((c, i) => (<div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3, background: c.color + "20", color: c.color, flexShrink: 0, marginTop: 2 }}>{c.credit}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.5 }}>{c.note}</div>
              </div>
            </div>))}
          </div>
        </div>)}

        {/* ═══ ARTISTS ═══ */}
        {tab === "artists" && (<div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            <KPI label="Predicted" value="25" sub="Artists guessed" color={C.blue} />
            <KPI label="Actual" value="20" sub="In Apple Music Top 20" color={C.crimson} />
            <KPI label="Exact Matches" value="0" sub="Zero overlap" color={C.ember} />
            <KPI label="Closest Miss" value="Blink-182" sub="Pop-punk adjacent" color={C.rose} />
          </div>
          <Section label="Side-by-Side Comparison" icon="⚖️" color={C.amber} />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 400px", background: C.card, border: `1px solid ${C.blue}20`, borderRadius: 7, padding: "16px 14px" }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.blue, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>🔮 Predicted (Thread B)</div>
              {(showAllP ? predictedArtists : predictedArtists.slice(0, 15)).map(p => {
                const cc = p.confidence === "High" ? C.crimson : p.confidence === "Medium" ? C.amber : C.creamDim;
                return (<div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px", background: p.rank % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, width: 18, textAlign: "right" }}>{p.rank}</span>
                  <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 500, color: C.creamHigh, flex: 1 }}>{p.name}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: cc + "18", color: cc }}>{p.confidence}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 7, color: C.creamDim, width: 55, textAlign: "right" }}>{p.genre}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson, width: 12, textAlign: "center" }}>✗</span>
                </div>);
              })}
              {!showAllP && <button onClick={() => setShowAllP(true)} style={{ display: "block", margin: "10px auto 0", padding: "5px 16px", background: C.blueDim, border: `1px solid ${C.blue}30`, borderRadius: 4, cursor: "pointer", fontFamily: font.mono, fontSize: 9, color: C.blue }}>Show all 25</button>}
            </div>
            <div style={{ flex: "1 1 400px", background: C.card, border: `1px solid ${C.crimson}20`, borderRadius: 7, padding: "16px 14px" }}>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>✓ Actual (Apple Music Replay)</div>
              {(showAllA ? actualArtists : actualArtists.slice(0, 15)).map(a => {
                const gc = a.genre === "Melodic Bass" ? C.crimson : a.genre === "Pop-Punk" ? C.rose : a.genre === "Math Rock" ? C.violet : C.ember;
                return (<div key={a.rank} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px", background: a.rank % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, width: 18, textAlign: "right" }}>{a.rank}</span>
                  <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 500, color: C.cream, flex: 1 }}>{a.name}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, fontWeight: 600, width: 50, textAlign: "right" }}>{a.minutes.toLocaleString()}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: gc + "18", color: gc }}>{a.genre}</span>
                </div>);
              })}
              {!showAllA && <button onClick={() => setShowAllA(true)} style={{ display: "block", margin: "10px auto 0", padding: "5px 16px", background: C.crimsonDim, border: `1px solid ${C.crimson}30`, borderRadius: 4, cursor: "pointer", fontFamily: font.mono, fontSize: 9, color: C.crimson }}>Show all 20</button>}
            </div>
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", background: C.creamGhost, border: `1px solid ${C.border}`, borderRadius: 5 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, lineHeight: 1.6 }}>Every predicted artist has a ✗ — zero exact matches. Predicted: Country (32%), Hip-Hop (20%), Rock (20%). Actual: Melodic Bass (60%), Pop-Punk (30%), Math Rock (5%), Hip-Hop (5%).</div>
          </div>
        </div>)}

        {/* ═══ ALBUMS ═══ */}
        {tab === "albums" && (<div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            <KPI label="Predicted" value="25" sub="Albums guessed" color={C.blue} />
            <KPI label="Actual" value="15" sub="In Apple Music Top 15" color={C.crimson} />
            <KPI label="Exact Matches" value="0" sub="Complete miss" color={C.ember} />
            <KPI label="#1 Actual" value="1,673m" sub="Trilogy in LA (live set)" color={C.crimson} />
          </div>
          <Section label="Predicted Albums" icon="🔮" color={C.blue} />
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px" }}>
            {predictedAlbums.map(p => { const cc = p.confidence === "High" ? C.crimson : p.confidence === "Medium" ? C.amber : C.creamDim; return (<div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 6px", background: p.rank % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, width: 18, textAlign: "right" }}>{p.rank}</span>
              <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 500, color: C.creamHigh, flex: 1 }}>{p.name}</span>
              <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: cc + "18", color: cc }}>{p.confidence}</span>
              <span style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson }}>✗</span>
            </div>); })}
          </div>
          <Section label="Actual Albums" icon="✓" color={C.crimson} />
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px" }}>
            {actualAlbums.map(a => { const ac = a.artist === "ILLENIUM" ? C.crimson : a.artist === "Said The Sky" ? C.blue : a.artist === "Trivecta" ? C.green : a.artist === "Tommee Profitt" ? C.ember : a.artist === "Taylor Swift" ? C.rose : a.artist === "Gryffin" ? C.amber : C.creamDim; return (<div key={a.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 6px", background: a.rank % 2 === 0 ? "transparent" : C.creamGhost, borderRadius: 3 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, width: 18, textAlign: "right" }}>{a.rank}</span>
              <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 500, color: C.cream, flex: 1 }}>{a.name}</span>
              <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 5px", borderRadius: 2, background: ac + "18", color: ac }}>{a.artist}</span>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, fontWeight: 600, width: 50, textAlign: "right" }}>{a.minutes.toLocaleString()}</span>
            </div>); })}
          </div>
          <div style={{ marginTop: 20, padding: "14px 18px", background: C.roseDim, border: `1px solid ${C.rose}30`, borderRadius: 7, borderLeft: `3px solid ${C.rose}` }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.rose, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Album Finding</div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>The predicted albums were studio releases from mainstream artists. The actual #1 is a <strong style={{ color: C.cream }}>live set</strong> — ILLENIUM: Trilogy in Los Angeles at 1,673 minutes. The album list includes DJ mixes, remix compilations, and cinematic covers. The listening is <strong style={{ color: C.cream }}>format-agnostic</strong> — live sets, remixes, and studio work all compete equally.</p>
          </div>
        </div>)}

        {/* ═══ GENRE ═══ */}
        {tab === "genre" && (<div>
          <Section label="What Was Predicted vs What Exists" icon="🎯" color={C.amber} mt={0} />
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "18px 16px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 12, height: 6, borderRadius: 2, background: C.blue, opacity: 0.6 }} /><span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Predicted</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 12, height: 6, borderRadius: 2, background: C.crimson, opacity: 0.6 }} /><span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Actual</span></div>
            </div>
            {genreComparison.map((g, i) => (<div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: g.color }}>{g.genre}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>P: {g.predicted} → A: {g.actual}</span>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 3 }}>
                <span style={{ fontFamily: font.mono, fontSize: 7, color: C.blue, width: 10 }}>P</span>
                <div style={{ height: 10, width: `${Math.max((g.predicted / 12) * 100, g.predicted > 0 ? 4 : 0)}%`, background: C.blue, opacity: 0.5, borderRadius: 2 }} />
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.blue }}>{g.predicted}</span>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontFamily: font.mono, fontSize: 7, color: C.crimson, width: 10 }}>A</span>
                <div style={{ height: 10, width: `${Math.max((g.actual / 12) * 100, g.actual > 0 ? 4 : 0)}%`, background: C.crimson, opacity: 0.5, borderRadius: 2 }} />
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson }}>{g.actual}</span>
              </div>
            </div>))}
          </div>

          <Section label="The Genre Inversion" icon="🔄" color={C.violet} />
          <div style={{ background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 9, padding: "24px 22px" }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ textAlign: "center", flex: "1 1 200px" }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.blue, marginBottom: 10 }}>PREDICTED</div>
                <div style={{ display: "flex", height: 28, borderRadius: 4, overflow: "hidden", gap: 1 }}>
                  <div style={{ flex: "0 0 32%", background: C.ember, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Country 32%</span></div>
                  <div style={{ flex: "0 0 20%", background: C.amber, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Rap 20%</span></div>
                  <div style={{ flex: "0 0 20%", background: C.blue, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Rock 20%</span></div>
                  <div style={{ flex: "0 0 16%", background: C.green, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Indie 16%</span></div>
                  <div style={{ flex: "0 0 4%", background: C.rose, opacity: 0.6 }} />
                  <div style={{ flex: "0 0 8%", background: C.creamGhost }} />
                </div>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginTop: 4 }}>EDM: 0% · Pop-Punk: 4%</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", flex: "0 0 40px", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 18, color: C.creamDim }}>→</span></div>
              <div style={{ textAlign: "center", flex: "1 1 200px" }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, marginBottom: 10 }}>ACTUAL</div>
                <div style={{ display: "flex", height: 28, borderRadius: 4, overflow: "hidden", gap: 1 }}>
                  <div style={{ flex: "0 0 60%", background: C.crimson, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Melodic Bass 60%</span></div>
                  <div style={{ flex: "0 0 30%", background: C.rose, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: font.mono, fontSize: 7, color: C.cream }}>Pop-Punk 30%</span></div>
                  <div style={{ flex: "0 0 5%", background: C.violet, opacity: 0.6 }} />
                  <div style={{ flex: "0 0 5%", background: C.ember, opacity: 0.6 }} />
                </div>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginTop: 4 }}>Country: 0% · Rock: 0% · Indie: 0%</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: "14px 18px", background: C.violetDim, border: `1px solid ${C.violet}30`, borderRadius: 7, borderLeft: `3px solid ${C.violet}` }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Genre Analysis</div>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>A <strong style={{ color: C.cream }}>complete genre inversion</strong>. The two largest predicted categories (Country 32%, Hip-Hop 20%) have zero and one representatives respectively. The two largest actual categories (Melodic Bass 60%, Pop-Punk 30%) were predicted at 0% and 4%. The model built a coherent but entirely fictional listener profile based on demographic priors with <strong style={{ color: C.cream }}>no relationship to actual behavior</strong>.</p>
          </div>
        </div>)}

        {/* ═══ TIMELINE ═══ */}
        {tab === "timeline" && (<div>
          <Section label="The Five-Phase Audit Arc" icon="📋" color={C.amber} mt={0} />
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7, marginBottom: 28, maxWidth: 640 }}>Two Claude instances. One prediction. One scoring. Five phases from blind confidence to final verdict — with the subject orchestrating the entire engagement.</p>

          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 14, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${C.blue}, ${C.crimson}, ${C.amber}, ${C.violet}, ${C.green})` }} />
            {auditTimeline.map((p, i) => (<div key={i} style={{ position: "relative", marginBottom: 28 }}>
              <div style={{ position: "absolute", left: -33, top: 6, width: 18, height: 18, borderRadius: "50%", background: p.color + "30", border: `2px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: font.mono, fontSize: 7, color: p.color, fontWeight: 700 }}>{p.phase}</span>
              </div>
              <div style={{ background: C.card, border: `1px solid ${p.color}25`, borderRadius: 7, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: p.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.label}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 8, padding: "2px 7px", borderRadius: 3, background: p.color + "18", color: p.color }}>{p.who}</span>
                </div>
                <PullQuote quote={p.quote} color={p.color} />
                <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, fontStyle: "italic", marginTop: 10, lineHeight: 1.5 }}>{p.subtext}</div>
              </div>
            </div>))}
          </div>

          <Section label="Best Lines From the Other Thread" icon="🌉" color={C.rose} />
          <PullQuote quote="Sk8r Core is the bridge between the EDM Dave and the 2003 Dave." attribution="— Predicting Claude, Meta Response" color={C.rose} />
          <div style={{ marginTop: 20 }}><PullQuote quote="Chaos → Structured → Automated, applied to a playlist." attribution="— Predicting Claude, recognizing DDL methodology in the listening data" color={C.violet} /></div>

          <Section label="Final Audit Opinion" icon="📜" color={C.amber} />
          <div style={{ background: C.card, border: `1px solid ${C.amber}30`, borderRadius: 9, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.green})` }} />
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Engagement Summary</div>
            <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream, lineHeight: 1.4, marginBottom: 12 }}>Adverse Opinion — Material Misstatement</div>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75, marginBottom: 16 }}>The predictions do not present fairly, in all material respects, the music listening profile of D.K. Hale for the year ended December 31, 2025, in accordance with the Apple Music Replay framework. The basis for this opinion is a <strong style={{ color: C.cream }}>complete genre inversion</strong> — zero of twenty-five predicted artists appear in the actual top twenty, and the predicted genre distribution bears no statistical resemblance to observed behavior.</p>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75, marginBottom: 16 }}><strong style={{ color: C.cream }}>Mitigating factors:</strong> The predicting model demonstrated strong analytical capability upon receiving actual data, including correct identification of the pop-punk playlist-driven cluster, the Emily/Taylor Swift inference, and recognition of DDL methodology applied to listening behavior. The audit failed at planning but passed at fieldwork.</p>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75 }}><strong style={{ color: C.cream }}>Key takeaway:</strong> Personality signals, demographic priors, and cultural context are insufficient predictors of music taste. The model that knew everything about Dave — his recovery, his Kansas roots, his Reddit history, his gaming habits, his writing voice — knew nothing about what he actually listens to. Identity ≠ playlist. Vibes ≠ data.</p>
            <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Engagement Lead <span style={{ color: C.cream }}>D.K. Hale</span></span>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Fieldwork <span style={{ color: C.blue }}>Predicting Claude</span></span>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Quality Review <span style={{ color: C.green }}>Scoring Claude</span></span>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Opinion <span style={{ color: C.crimson }}>Adverse</span></span>
            </div>
          </div>
        </div>)}

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.blue}, ${C.crimson}, ${C.amber}, ${C.violet}, ${C.green})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}
