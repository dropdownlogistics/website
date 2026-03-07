'use client';
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
// Primitives
// ═══════════════════════════════════════════════════════════
function Tag({ label, color = C.blue }) {
  return (
    <span style={{
      fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3,
      background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function KPI({ label, value, sub, color = C.cream }) {
  return (
    <div style={{
      flex: "1 1 150px", minWidth: 135, background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 6,
      padding: "16px 14px 12px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.5 }} />
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Mapping Row — connects a sonic trait to a measurement
// ═══════════════════════════════════════════════════════════
function MappingRow({ sonic, measurement, instrument, score, mechanism, accentColor }) {
  return (
    <div style={{
      display: "flex", gap: 0, marginBottom: 2, minHeight: 72,
    }}>
      {/* Sonic trait (left) */}
      <div style={{
        flex: "1 1 40%", padding: "12px 14px",
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: "6px 0 0 6px", borderRight: "none",
      }}>
        <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{sonic}</div>
      </div>

      {/* Bridge arrow */}
      <div style={{
        width: 36, display: "flex", alignItems: "center", justifyContent: "center",
        background: accentColor + "12", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      }}>
        <span style={{ fontFamily: font.mono, fontSize: 14, color: accentColor }}>→</span>
      </div>

      {/* Measurement (right) */}
      <div style={{
        flex: "1 1 60%", padding: "12px 14px",
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: "0 6px 6px 0", borderLeft: "none",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
          <span style={{ fontFamily: font.display, fontSize: 13, fontWeight: 600, color: accentColor }}>{measurement}</span>
          <span style={{ fontFamily: font.mono, fontSize: 10, color: accentColor }}>{score}</span>
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 4 }}>{instrument}</div>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.5 }}>{mechanism}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Waveform Visualization (CSS-only abstract representation)
// ═══════════════════════════════════════════════════════════
function WaveformViz({ type, color }) {
  // Melodic bass: build → peak → resolve pattern
  // Math rock: complex, irregular, interlocking
  const melodicBass = [12, 18, 25, 32, 40, 50, 62, 75, 88, 95, 100, 85, 60, 40, 30, 22, 16, 14, 15, 20, 28, 38, 50, 65, 80, 92, 100, 78, 50, 32, 20, 15];
  const mathRock = [45, 72, 30, 85, 55, 90, 28, 68, 95, 35, 78, 42, 88, 50, 70, 25, 82, 60, 38, 92, 48, 75, 32, 86, 55, 40, 95, 62, 30, 80, 45, 70];

  const data = type === "melodic" ? melodicBass : mathRock;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 40 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${v}%`, background: color,
          borderRadius: "2px 2px 0 0", opacity: 0.4 + (v / 200),
          transition: "height 0.3s",
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Artist Profile Card
// ═══════════════════════════════════════════════════════════
function ArtistProfile({ name, genre, minutes, hours, songs, topSong, color, waveType, traits }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${color}30`,
      borderRadius: 8, padding: "20px", marginBottom: 16,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.6 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.cream }}>{name}</div>
          <div style={{ fontFamily: font.mono, fontSize: 11, color, marginTop: 2 }}>{genre}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{hours}h</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{minutes.toLocaleString()} minutes · {songs} in top 84</div>
        </div>
      </div>

      {/* Waveform */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, marginBottom: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Sonic Signature
        </div>
        <WaveformViz type={waveType} color={color} />
      </div>

      {/* Sonic traits */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {traits.map(t => <Tag key={t} label={t} color={color} />)}
      </div>

      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
        Top track: <span style={{ color: C.cream }}>{topSong}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function CatnipMap() {
  const [focus, setFocus] = useState("both");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Template tag */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · Catnip Map
        </div>

        {/* Header */}
        <h1 style={{
          fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic",
          color: C.cream, margin: "0 0 6px 0", lineHeight: 1.2,
        }}>
          Why These Two
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          Mapping ILLENIUM and Polyphia to the psychometric architecture.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · <span style={{ color: C.amber }}>CONSOLE: Dimensional Map</span> · <span style={{ color: C.blue }}>MindFrame</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* KPI Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          <KPI label="ILLENIUM" value="9,400" sub="156.7 hours · 43.8% of total" color={C.crimson} />
          <KPI label="Polyphia" value="2,534" sub="42.2 hours · #2 artist" color={C.violet} />
          <KPI label="Combined" value="11,934" sub="55.6% of all tracked artist time" color={C.amber} />
          <KPI label="Mappable Connections" value="12" sub="Across 5 instruments" color={C.creamMid} />
        </div>

        {/* Pull Quote */}
        <div style={{
          borderLeft: `3px solid ${C.amber}`, padding: "14px 20px",
          background: C.amberDim, borderRadius: "0 6px 6px 0", marginBottom: 40,
        }}>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            Two artists. One provides structured catharsis for an over-aroused system. 
            The other feeds pattern recognition into a brain that scored creativity through the wrong instrument. 
            Neither is background music. Both are functional architecture.
          </p>
        </div>

        {/* Focus Toggle */}
        <div style={{ display: "flex", gap: 3, marginBottom: 28 }}>
          {[
            { id: "both", label: "Both Artists" },
            { id: "illenium", label: "ILLENIUM", color: C.crimson },
            { id: "polyphia", label: "Polyphia", color: C.violet },
          ].map(v => (
            <button key={v.id} onClick={() => setFocus(v.id)} style={{
              padding: "8px 16px", borderRadius: 5,
              border: `1px solid ${focus === v.id ? (v.color || C.amber) : C.border}`,
              background: focus === v.id ? (v.color || C.amber) + "20" : C.creamGhost,
              cursor: "pointer", fontFamily: font.mono, fontSize: 10,
              color: focus === v.id ? (v.color || C.amber) : C.creamDim,
              letterSpacing: "0.06em",
            }}>{v.label}</button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* ARTIST PROFILES */}
        {/* ═══════════════════════════════════════════════ */}
        {(focus === "both" || focus === "illenium") && (
          <ArtistProfile
            name="ILLENIUM"
            genre="Melodic Bass / Emotional EDM"
            minutes={9400}
            hours="156.7"
            songs="33"
            topSong="Blame Myself (ft. Chandler Leighton)"
            color={C.crimson}
            waveType="melodic"
            traits={[
              "STRUCTURED BUILDS",
              "PREDICTABLE ARC",
              "HARMONIC RESOLUTION",
              "SONIC DENSITY",
              "EMOTIONAL CATHARSIS",
              "LAYERED TEXTURES",
              "BPM 140-174",
            ]}
          />
        )}

        {(focus === "both" || focus === "polyphia") && (
          <ArtistProfile
            name="Polyphia"
            genre="Progressive / Math Rock"
            minutes={2534}
            hours="42.2"
            songs="14"
            topSong="Ego Death (ft. Steve Vai)"
            color={C.violet}
            waveType="math"
            traits={[
              "ODD TIME SIGNATURES",
              "POLYRHYTHMIC",
              "TECHNICALLY COMPLEX",
              "STRUCTURALLY PRECISE",
              "INSTRUMENTAL (NO LYRICS)",
              "INTERLOCKING PARTS",
              "GENRE-DEFIANT",
            ]}
          />
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* THE MAP — ILLENIUM */}
        {/* ═══════════════════════════════════════════════ */}
        {(focus === "both" || focus === "illenium") && (
          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 5, background: C.crimsonDim,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.crimson,
              }}>I</div>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>
                ILLENIUM → Measurement Map
              </span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <MappingRow
              sonic="Structured builds with predictable arc (build → tension → drop → resolve)"
              measurement="Sensation Avoiding"
              instrument="Adolescent/Adult Sensory Profile · 2023"
              score="50/75 · Much More Than Most"
              mechanism="Predictable sonic structure reduces the processing cost of unpredictable stimuli. The build-drop-resolve arc is a known quantity — the brain can anticipate what comes next, which is the opposite of environmental chaos."
              accentColor={C.crimson}
            />

            <MappingRow
              sonic="Dense, layered sonic wall — fills the entire auditory field"
              measurement="Over-aroused brain state"
              instrument="qEEG Neurofeedback Baseline · 2020"
              score="Excessive High Beta · Parietal"
              mechanism="For an over-aroused system, controlled sonic density displaces uncontrolled environmental noise. The wall of sound doesn't add stimulation — it replaces chaotic stimulation with structured stimulation. Net effect: regulation, not excitation."
              accentColor={C.crimson}
            />

            <MappingRow
              sonic="Emotional catharsis cycle — tension builds to release"
              measurement="Bipolar II cycling pattern"
              instrument="Psych Eval (Sharpe) · 2023"
              score="F31.81 · Anxiety → exhaustion → depression"
              mechanism="The build-drop-resolve mirrors the affective cycle but completes it in 4 minutes instead of weeks. Reliable micro-catharsis. The emotional payoff is compressed, predictable, and repeatable — externalized mood regulation via sonic architecture."
              accentColor={C.crimson}
            />

            <MappingRow
              sonic="Harmonic resolution — dissonance always resolves to consonance"
              measurement="Internalizing Behavior"
              instrument="Vineland-3 Maladaptive · 2023"
              score="v=21 · Clinically Significant"
              mechanism="Clinically significant internalizing means distress turns inward. Music that guarantees resolution provides a counter-narrative to rumination: things that feel unresolved will resolve. The harmonic promise is the opposite of the anxious loop."
              accentColor={C.crimson}
            />

            <MappingRow
              sonic="BPM 140-174 — high energy, physical drive"
              measurement="Activation deficit"
              instrument="Brown EF/A Scales · 2023"
              score="T=70 · 95th %ile dysfunction"
              mechanism="Activation — organizing, prioritizing, getting started — is markedly atypical. High-BPM music with driving rhythm provides external activation energy. The tempo does the work the executive function system struggles to initiate."
              accentColor={C.crimson}
            />

            <MappingRow
              sonic="Vocal features with emotional lyrics (Blame Myself, Nightlight, Shivering)"
              measurement="Expressive communication weakness"
              instrument="Vineland-3 Communication · 2023"
              score="v=12 · ≤10% base rate"
              mechanism="Expressive output is a documented weakness. Vocal EDM externalizes emotional content the operator processes better through listening than generating. The lyrics articulate what the Expressive deficit makes harder to say."
              accentColor={C.crimson}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* THE MAP — POLYPHIA */}
        {/* ═══════════════════════════════════════════════ */}
        {(focus === "both" || focus === "polyphia") && (
          <div style={{ marginTop: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 5, background: C.violetDim,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.violet,
              }}>P</div>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>
                Polyphia → Measurement Map
              </span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <MappingRow
              sonic="Odd time signatures and polyrhythmic interlocking"
              measurement="High creativity via Occipital Alpha"
              instrument="qEEG Neurofeedback Baseline · 2020"
              score="Elevated Alpha · Occipital lobe"
              mechanism="Creativity manifesting through pattern recognition and connecting dots rather than traditional artistic expression. Math rock is pattern recognition as music — the same neural pathway, different substrate. Polyphia is auditory dimensional modeling."
              accentColor={C.violet}
            />

            <MappingRow
              sonic="Technically complex but structurally precise"
              measurement="Conventional theme dominance"
              instrument="Strong Interest Inventory · 2005"
              score="C=75 · High Interest"
              mechanism="The Conventional profile craves structure and order. Polyphia is technically chaotic on the surface but architecturally precise underneath — complex patterns within a governed framework. Cottage on top, cathedral underneath. The music mirrors the methodology."
              accentColor={C.violet}
            />

            <MappingRow
              sonic="Instrumental — no lyrics, no vocal processing required"
              measurement="Auditory response control deficit"
              instrument="IVA Continuous Performance Test · 2023"
              score="Auditory: 82 · Mild Impairment"
              mechanism="Auditory response control is mildly impaired. Vocal music requires the brain to simultaneously process melody, rhythm, and linguistic content through the weakest channel. Instrumental music eliminates the language-processing load entirely — pure pattern, no decode overhead."
              accentColor={C.violet}
            />

            <MappingRow
              sonic="Genre-defiant — blends prog, hip-hop, classical guitar, math rock"
              measurement="Computer Activities: Very High / Programmer: Dissimilar"
              instrument="Strong Interest Inventory · 2005"
              score="Computer: VH · Programmer: 19"
              mechanism="The Strong said: you love computers but not like programmers do. Polyphia says: this is technically virtuosic but not like traditional prog. Same pattern — high engagement with a domain, expressed through an unexpected channel. The interest-expression gap is the same shape."
              accentColor={C.violet}
            />

            <MappingRow
              sonic="Mathematical precision — quantifiable complexity"
              measurement="Math aptitude (dormant)"
              instrument="PSAT → GMAT trajectory"
              score="92nd %ile (age 16) → 44th (age 21)"
              mechanism="Math aptitude peaked at 92 and followed disinterest downward. But the capacity didn't disappear — it migrated. Star schemas, dimensional models, governance architectures. Polyphia feeds the same mathematical cognition through rhythm that the transcript stopped feeding through coursework."
              accentColor={C.violet}
            />

            <MappingRow
              sonic="Clean tone, high-frequency harmonic content"
              measurement="Sensory Sensitivity"
              instrument="Adolescent/Adult Sensory Profile · 2023"
              score="38/75 · Similar to Most"
              mechanism="Sensory Sensitivity is in normal range (unlike Sensation Avoiding, which is extreme). Clean guitar tones with precise harmonic content sit in the sensitivity sweet spot — complex enough to engage pattern recognition without the distortion or compression that triggers avoidance."
              accentColor={C.violet}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* CONVERGENCE — WHY BOTH */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 5, background: C.amberDim,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.amber,
            }}>∩</div>
            <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>
              Convergence — Why Both, Not Either
            </span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "24px 20px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, marginBottom: 24 }}>
              {/* ILLENIUM side */}
              <div style={{ padding: "16px", background: C.crimsonFaint, borderRadius: "6px 0 0 6px" }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>ILLENIUM Serves</div>
                {[
                  "Emotional regulation",
                  "Sensory displacement",
                  "Activation energy",
                  "Catharsis compression",
                  "Expressive proxy",
                ].map(s => (
                  <div key={s} style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, padding: "3px 0" }}>· {s}</div>
                ))}
              </div>

              {/* Bridge */}
              <div style={{
                width: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: C.creamGhost,
              }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, writingMode: "vertical-lr", letterSpacing: "0.2em" }}>
                  SHARED
                </div>
              </div>

              {/* Polyphia side */}
              <div style={{ padding: "16px", background: C.violetDim, borderRadius: "0 6px 6px 0" }}>
                <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Polyphia Serves</div>
                {[
                  "Pattern recognition",
                  "Mathematical cognition",
                  "Auditory load reduction",
                  "Structural precision",
                  "Creativity pathway",
                ].map(s => (
                  <div key={s} style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, padding: "3px 0" }}>· {s}</div>
                ))}
              </div>
            </div>

            {/* Shared traits */}
            <div style={{
              padding: "14px 16px", background: C.amberDim,
              borderLeft: `3px solid ${C.amber}`, borderRadius: "0 6px 6px 0",
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                What Both Provide
              </div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                Both are structurally dense — they fill the auditory field and leave no room for environmental intrusion (Sensation Avoiding: 50/75). 
                Both are architecturally governed — complex underneath, coherent on top (Conventional: 75, highest theme). 
                Both reward sustained attention — the opposite of what the Brown EF/A says is hardest (Focus: T=74, 98th %ile dysfunction). 
                And both are consumed through a curated, self-built listening architecture — playlists, stations, controlled environments — 
                because the operator doesn't passively receive stimuli. He builds systems for them.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* MEASUREMENT INDEX */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Instruments Referenced
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px" }}>
            {[
              { instrument: "PSAT/NMSQT", dates: "2001–2002", used: "Math aptitude trajectory", color: C.blue },
              { instrument: "Strong Interest Inventory", dates: "2005", used: "Conventional theme, Computer Activities, interest-expression gap", color: C.amber },
              { instrument: "Neurofeedback Baseline (qEEG)", dates: "2020", used: "Over-arousal, Occipital Alpha creativity, auditory processing", color: C.ember },
              { instrument: "Psych Evaluation (Sharpe)", dates: "2023", used: "Bipolar II, Brown EF/A, IVA split, Vineland, Sensory Profile", color: C.rose },
              { instrument: "Apple Music Replay", dates: "2025", used: "Behavioral listening data — the self-selected signal", color: C.violet },
            ].map((r, i) => (
              <div key={r.instrument} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                flexWrap: "wrap", gap: 6,
              }}>
                <div>
                  <span style={{ fontFamily: font.body, fontSize: 13, color: C.cream }}>{r.instrument}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginLeft: 8 }}>{r.dates}</span>
                </div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: r.color }}>{r.used}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2, borderRadius: 1, marginBottom: 12,
            background: `linear-gradient(90deg, ${C.crimson}, ${C.violet}, ${C.amber})`,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CONSOLE · Catnip Map · 12 connections across 5 instruments
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              dropdownlogistics.com · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
