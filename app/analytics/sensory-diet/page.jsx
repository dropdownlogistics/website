'use client'

import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)", ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function Tag({ label, color = C.blue }) {
  return (<span style={{ fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3, background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{label}</span>);
}

function KPI({ label, value, sub, color = C.cream }) {
  return (
    <div style={{ flex: "1 1 150px", minWidth: 135, background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px 14px 12px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.5 }} />
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Pattern Card — cross-media pattern that maps to a measurement
// ═══════════════════════════════════════════════════════════
function PatternCard({ pattern, measurement, score, instrument, examples, color }) {
  return (
    <div style={{ background: C.card, borderLeft: `3px solid ${color}`, borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: C.cream }}>{pattern}</div>
        <div style={{ fontFamily: font.mono, fontSize: 10, color }}>{score}</div>
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 4 }}>
        {measurement} · {instrument}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {examples.map(e => <Tag key={e.label} label={e.label} color={e.color} />)}
      </div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6 }}>{examples[0]?.desc}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Media Category Block
// ═══════════════════════════════════════════════════════════
function MediaCategory({ icon, label, color, items, patterns }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${color}30`, borderRadius: 8, padding: "20px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.5 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {items.map(i => <Tag key={i} label={i} color={color} />)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {patterns.map(p => <Tag key={p} label={p} color={C.creamDim} />)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function SensoryDiet() {
  const [view, setView] = useState("patterns");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · The Sensory Diet
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          The Sensory Diet
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          Four media categories. One measurement stack. The self-selected stimulus profile 
          mapped to the psychometric architecture.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.crimson }}>Catnip Map</span> · <span style={{ color: C.amber }}>SOA</span> · <span style={{ color: C.crimson }}>F&F</span> · <span style={{ color: C.violet }}>DOSSIER</span> · <span style={{ color: C.amber }}>Dimensional Map</span> · <span style={{ color: C.blue }}>MindFrame</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* KPI Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          <KPI label="Media Categories" value="4" sub="Music · TV · Film · Games" color={C.amber} />
          <KPI label="Cross-Media Patterns" value="7" sub="Recurring across all categories" color={C.green} />
          <KPI label="Instruments Activated" value="5" sub="PSAT · Strong · qEEG · Sharpe · Replay" color={C.rose} />
          <KPI label="Sleep Show" value="Psych" sub="Detox → insomnia → still" color={C.blue} />
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 3, marginBottom: 28 }}>
          {[
            { id: "inventory", label: "Media Inventory" },
            { id: "patterns", label: "Cross-Media Patterns" },
            { id: "functions", label: "Functional Analysis" },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              padding: "8px 16px", borderRadius: 5, border: `1px solid ${view === v.id ? C.amber : C.border}`,
              background: view === v.id ? C.amberDim : C.creamGhost, cursor: "pointer",
              fontFamily: font.mono, fontSize: 10, color: view === v.id ? C.amber : C.creamDim,
            }}>{v.label}</button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* INVENTORY VIEW */}
        {/* ═══════════════════════════════════════════════ */}
        {view === "inventory" && (
          <div>
            <MediaCategory icon="🎵" label="Music" color={C.crimson}
              items={["ILLENIUM", "Polyphia", "Said The Sky", "Seven Lions", "Excision", "Good Charlotte", "New Found Glory", "Yellowcard", "AAR", "T.I."]}
              patterns={["SONIC DENSITY", "PATTERN RECOGNITION", "EMOTIONAL CATHARSIS", "TEMPORAL ANCHORING", "CURATED NOT PASSIVE"]}
            />
            <MediaCategory icon="📺" label="Television" color={C.amber}
              items={["Psych ★", "Sons of Anarchy", "Friday Night Lights", "SVU", "The Wire", "Paradise", "Dark Matter", "Black Mirror", "Parenthood",
                "Arrested Development", "Community", "The Office", "30 Rock", "Always Sunny", "Seinfeld", "Curb", "Scrubs", "Parks and Rec"]}
              patterns={["GOVERNANCE SYSTEMS", "PATTERN-DENSE COMEDY", "INSTITUTIONAL ANALYSIS", "CHOSEN FAMILY", "REWATCH REGULATION"]}
            />
            <MediaCategory icon="🎬" label="Film" color={C.crimson}
              items={["Fast and Furious ★", "Lord of the Rings", "Friday Night Lights"]}
              patterns={["CHOSEN FAMILY", "LOYALTY UNDER PRESSURE", "EARNED BELONGING", "ABSURDITY AS SINCERITY SHIELD"]}
            />
            <MediaCategory icon="🎮" label="Games" color={C.violet}
              items={["Monster Hunter", "Diablo IV", "BG3", "DOS2", "Skyrim", "RDR I & II", "Witcher III", "FFVII ★", "Schedule I", "No Man's Sky",
                "SimCity ※", "Red Alert ※", "RollerCoaster Tycoon ※", "Stanley Parable △"]}
              patterns={["SYSTEMS OPERATION", "LOADOUT OPTIMIZATION", "COLLABORATIVE TACTICS", "IDENTITY RECONSTRUCTION", "MANAGEMENT NOSTALGIA"]}
            />
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 8, display: "flex", gap: 16 }}>
              <span>★ = anchor title</span><span>※ = missed / nostalgic</span><span>△ = trying out</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* CROSS-MEDIA PATTERNS VIEW */}
        {/* ═══════════════════════════════════════════════ */}
        {view === "patterns" && (
          <div>
            <PatternCard
              pattern="Governance Systems as Entertainment"
              measurement="Conventional Theme · Organizational Management"
              score="C=75 · Org Mgmt=57"
              instrument="Strong Interest Inventory · 2005"
              color={C.amber}
              examples={[
                { label: "SOA: Chapel & Bylaws", color: C.amber, desc: "Across all four categories, the operator selects media with visible governance architecture. SOA has the Chapel and Bylaws. The Wire examines institutional systems per season. F&F has a crew with defined roles. BG3 and DOS2 have party management with diplomatic consequences. SimCity and RCT are pure governance simulation. Even the comedies — Arrested Development's corporate satire, Parks and Rec's municipal government, The Office's institutional dysfunction — are governance-adjacent. The Conventional profile doesn't just work in structured systems. It relaxes in them." },
                { label: "Wire: Institutional layers", color: C.amber },
                { label: "F&F: Role-based crew", color: C.crimson },
                { label: "BG3/DOS2: Party diplomacy", color: C.violet },
                { label: "SimCity/RCT: Pure governance", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Chosen Family Over Given Family"
              measurement="Socialization — Strongest Vineland Domain"
              score="107 · 68th %ile"
              instrument="Vineland-3 · 2023"
              color={C.green}
              examples={[
                { label: "F&F: The family", color: C.crimson, desc: "The single most persistent theme across every category. F&F is the thesis statement. SOA: the club. LOTR: the fellowship. FNL: the team. Community: the study group. Parks and Rec: the department. Monster Hunter / Diablo / BG3: the co-op party. Scrubs: the hospital crew. Even Psych — Shawn and Gus's partnership is a two-person chosen family. For a profile where Socialization is the strongest domain and Community is an elevated strength, media about chosen belonging isn't aspirational. It's homecoming." },
                { label: "SOA: The club", color: C.amber },
                { label: "LOTR: The fellowship", color: C.crimson },
                { label: "Community: Study group", color: C.amber },
                { label: "Co-op games: The party", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Pattern Recognition as Pleasure"
              measurement="Occipital Alpha · Creativity Through Connecting Dots"
              score="Elevated Alpha · Occipital"
              instrument="qEEG Neurofeedback · 2020"
              color={C.ember}
              examples={[
                { label: "Arrested Dev: Season-spanning callbacks", color: C.amber, desc: "The comedy selections are a pattern-density gradient. Arrested Development has jokes that set up across seasons. Community is genre-recursive and meta-layered. 30 Rock fires at a density that requires rewatching. Seinfeld finds structure in nothing. Curb exposes unwritten social rules. Polyphia is pattern recognition as music. BG3 is pattern recognition as combat. The qEEG found creativity through pattern recognition and connecting dots. The entire media diet feeds that exact pathway." },
                { label: "Community: Meta-recursive", color: C.amber },
                { label: "30 Rock: Rewatch density", color: C.amber },
                { label: "Polyphia: Polyrhythmic", color: C.violet },
                { label: "BG3: Tactical patterns", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Rewatch / Replay as Regulation"
              measurement="Sensation Avoiding · Over-aroused Brain"
              score="50/75 · Excessive High Beta"
              instrument="Sensory Profile + qEEG · 2023/2020"
              color={C.crimson}
              examples={[
                { label: "Psych: Sleep show since detox", color: C.blue, desc: "Psych for insomnia. ILLENIUM at 9,400 minutes. Pop-punk from 2001. Comedy rewatches. For a brain documented as working harder than comfortable to absorb information and Sensation Avoiding at 50/75, familiar stimuli have lower processing cost. Rewatching isn't passive — it's energy conservation. Known content fills the auditory/visual field with predictable stimuli, displacing unpredictable environmental input. The rewatch pattern is the same architecture as the ILLENIUM pattern: controlled sensory displacement." },
                { label: "ILLENIUM: 9,400 min repeat", color: C.crimson },
                { label: "Pop-punk: 2001 era anchors", color: C.rose },
                { label: "Skyrim: Known world re-entry", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Controlled Catharsis"
              measurement="Bipolar II · Internalizing Behavior"
              score="F31.81 · v=21 Clinically Significant"
              instrument="Psych Eval · 2023"
              color={C.rose}
              examples={[
                { label: "ILLENIUM: Build → drop → resolve", color: C.crimson, desc: "Media that guarantees emotional payoff inside a controlled structure. ILLENIUM's build-drop-resolve. F&F's betrayal-separation-reunion. FNL's Friday night game as weekly emotional cycle. FFVII's identity reconstruction arc. For a profile with clinically significant internalizing behavior and Bipolar II cycling, media that compresses the affective cycle into a predictable, completable arc provides micro-catharsis. The emotional payoff is reliable. The resolution is guaranteed. That's not entertainment. That's mood regulation." },
                { label: "F&F: Betrayal → reunion", color: C.crimson },
                { label: "FNL: Weekly game cycle", color: C.amber },
                { label: "FFVII: Identity resolution", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Systems as Playgrounds"
              measurement="Computer Activities: Very High · CES Theme"
              score="Computer: VH · C=75"
              instrument="Strong Interest Inventory · 2005"
              color={C.violet}
              examples={[
                { label: "Skyrim: Open-world system operation", color: C.violet, desc: "The game selections are systems playgrounds. SimCity, RCT, Red Alert — pure management systems (the ones he misses). Monster Hunter, Diablo IV — loadout optimization, build architecture. BG3, DOS2 — tactical systems with cooperative execution and governance consequences. Skyrim, Witcher III — open-world systems to get lost inside. Schedule I — a management sim of a domain with lived experience. The Strong said Computer Activities: Very High. The games confirm it — the operator doesn't play games, he operates them." },
                { label: "SimCity/RCT: Management sims", color: C.violet },
                { label: "BG3/DOS2: Tactical governance", color: C.violet },
                { label: "Schedule I: Domain modeling", color: C.violet },
                { label: "Monster Hunter: Build optimization", color: C.violet },
              ]}
            />

            <PatternCard
              pattern="Identity Architecture"
              measurement="Diagnostic Journey · MindFrame"
              score="Diagnosis at 37 → System at 38"
              instrument="Psych Eval → DDL Methodology"
              color={C.blue}
              examples={[
                { label: "FFVII: Reconstructed identity", color: C.violet, desc: "FFVII: a protagonist who discovers his memories aren't real and must reconstruct his identity from fragments. Dark Matter: what if you were someone else? Black Mirror: what happens when you see the system? Stanley Parable: what if you could see the rails? For someone who went through a diagnostic process at 37 that reframed cognitive patterns from character flaws to systems issues, these aren't speculative fiction. They're recognition. The measurement arc is an identity reconstruction narrative. The media diet echoes it." },
                { label: "Dark Matter: Alternate identity", color: C.amber },
                { label: "Black Mirror: System awareness", color: C.amber },
                { label: "Stanley Parable: Seeing the rails", color: C.amber },
              ]}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* FUNCTIONAL ANALYSIS VIEW */}
        {/* ═══════════════════════════════════════════════ */}
        {view === "functions" && (
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              What Each Category Serves
            </div>

            {[
              {
                category: "Music", color: C.crimson, icon: "🎵",
                functions: [
                  { fn: "Sensory displacement", mech: "Sonic density fills auditory field, displaces chaotic environmental input", score: "Sensation Avoiding: 50/75" },
                  { fn: "Activation energy", mech: "BPM 140-174 provides external drive for an Activation-impaired system", score: "Brown Activation: T=70" },
                  { fn: "Pattern feeding", mech: "Math rock provides auditory dimensional modeling for Occipital Alpha", score: "qEEG: High Alpha" },
                  { fn: "Emotional regulation", mech: "Build-drop-resolve compresses affective cycle to 4 minutes", score: "Bipolar II: F31.81" },
                ],
              },
              {
                category: "Television", color: C.amber, icon: "📺",
                functions: [
                  { fn: "Sleep regulation", mech: "Psych as auditory predictability for insomnia — known content, zero processing cost", score: "Over-aroused brain" },
                  { fn: "Governance modeling", mech: "SOA, Wire, procedurals — institutional systems as relaxation", score: "Conventional: 75" },
                  { fn: "Pattern recreation", mech: "Dense comedies reward pattern recognition and rewatch", score: "Occipital Alpha" },
                  { fn: "Social modeling", mech: "Chosen family narratives reinforce strongest adaptive domain", score: "Socialization: 107" },
                ],
              },
              {
                category: "Film", color: C.crimson, icon: "🎬",
                functions: [
                  { fn: "Sincerity access", mech: "F&F's absurdity creates sensory buffer for emotional vulnerability", score: "Sensation Avoiding: 50/75" },
                  { fn: "Loyalty validation", mech: "Chosen family thesis across all three core films", score: "Community: v=17" },
                  { fn: "Catharsis compression", mech: "Betrayal-reunion arc provides guaranteed emotional resolution", score: "Internalizing: v=21" },
                ],
              },
              {
                category: "Games", color: C.violet, icon: "🎮",
                functions: [
                  { fn: "Systems operation", mech: "Management sims, build optimization, tactical governance", score: "Computer: Very High" },
                  { fn: "Collaborative execution", mech: "Co-op games provide structured social interaction with defined roles", score: "Org Mgmt: 57" },
                  { fn: "Identity exploration", mech: "RPGs with character creation and narrative consequence", score: "Diagnostic journey" },
                  { fn: "Domain reprocessing", mech: "Schedule I — management sim of a domain with lived experience, safe distance", score: "Sober since 2018" },
                ],
              },
            ].map(cat => (
              <div key={cat.category} style={{ background: C.card, border: `1px solid ${cat.color}30`, borderRadius: 8, padding: "16px 20px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cat.color, opacity: 0.4 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 16 }}>{cat.icon}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: cat.color, letterSpacing: "0.08em" }}>{cat.category}</span>
                </div>
                {cat.functions.map(f => (
                  <div key={f.fn} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.border}`, alignItems: "baseline" }}>
                    <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, flex: "0 0 160px" }}>{f.fn}</span>
                    <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, flex: 1, lineHeight: 1.5 }}>{f.mech}</span>
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: cat.color, flex: "0 0 140px", textAlign: "right" }}>{f.score}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Bottom insight */}
            <div style={{ borderLeft: `3px solid ${C.amber}`, padding: "14px 20px", background: C.amberDim, borderRadius: "0 6px 6px 0", marginTop: 24 }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
                The Unified Function
              </div>
              <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
                <p style={{ margin: "0 0 12px 0" }}>
                  The entire media diet is a sensory regulation system. Music manages arousal and activation. 
                  Television manages sleep, pattern hunger, and social modeling. Film manages emotional vulnerability 
                  through controlled catharsis. Games manage the systems-operation drive and collaborative social need.
                </p>
                <p style={{ margin: 0 }}>
                  None of this is random. Every selection maps to a documented measurement. 
                  The operator who builds governance-grade systems for his cognitive architecture 
                  also builds — unconsciously, through selection pressure — a governance-grade media diet. 
                  The methodology is the same. The medium is different. The operator is consistent.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.violet}, ${C.green}, ${C.blue})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CONSOLE · The Sensory Diet · 4 categories · 7 patterns · 5 instruments
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

