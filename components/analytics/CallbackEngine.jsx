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

// ═══════════════════════════════════════════════════════════
// Show Card — each comedy's recursive architecture
// ═══════════════════════════════════════════════════════════
function ShowCard({ name, color, subtitle, recursionType, density, replayValue, techniques, examples, measurement }) {
  const [open, setOpen] = useState(false);

  const densityBars = { LOW: 1, MEDIUM: 2, HIGH: 3, EXTREME: 4 };
  const replayBars = { LOW: 1, MEDIUM: 2, HIGH: 3, ESSENTIAL: 4 };

  return (
    <div style={{
      background: C.card, border: `1px solid ${color}25`, borderRadius: 8,
      marginBottom: 10, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.4 }} />

      {/* Header — always visible */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "16px 20px", cursor: "pointer", userSelect: "none" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream }}>{name}</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color, marginTop: 2 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>Density</div>
              <div style={{ display: "flex", gap: 2, justifyContent: "flex-end", marginTop: 2 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: 12, height: 6, borderRadius: 2, background: i <= densityBars[density] ? color : C.creamGhost, opacity: i <= densityBars[density] ? 0.7 : 1 }} />
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>Replay</div>
              <div style={{ display: "flex", gap: 2, justifyContent: "flex-end", marginTop: 2 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: 12, height: 6, borderRadius: 2, background: i <= replayBars[replayValue] ? C.amber : C.creamGhost, opacity: i <= replayBars[replayValue] ? 0.7 : 1 }} />
                ))}
              </div>
            </div>
            <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>▸</span>
          </div>
        </div>

        {/* Recursion type + technique tags */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Tag label={recursionType} color={color} />
          {techniques.map(t => <Tag key={t} label={t} color={C.creamDim} />)}
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.border}` }}>
          {/* Examples */}
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 14, marginBottom: 8 }}>
            Recursive Architecture
          </div>
          {examples.map((ex, i) => (
            <div key={i} style={{
              padding: "10px 14px", marginBottom: 4,
              background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color, marginBottom: 4 }}>{ex.name}</div>
              <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{ex.desc}</div>
              {ex.span && (
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>
                  Recursion span: <span style={{ color }}>{ex.span}</span>
                </div>
              )}
            </div>
          ))}

          {/* Measurement connection */}
          <div style={{
            marginTop: 12, padding: "10px 14px",
            borderLeft: `2px solid ${color}`, background: color + "08",
            borderRadius: "0 4px 4px 0",
          }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Why This Lands
            </div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{measurement}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function CallbackEngine() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · The Callback Engine
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          The Callback Engine
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          Nine comedies. Nine different recursion architectures. 
          Every one rewards the same brain.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.amber }}>CONSOLE: Sensory Diet</span> · <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · <span style={{ color: C.amber }}>CONSOLE: Dimensional Map</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* Pull Quote */}
        <div style={{ borderLeft: `3px solid ${C.ember}`, padding: "14px 20px", background: C.emberDim, borderRadius: "0 6px 6px 0", marginBottom: 32 }}>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            Recursive humor is pattern recognition with a dopamine reward. 
            A callback says: you were paying attention, and here's proof that it mattered. 
            For a brain with Occipital Alpha creativity that manifests through connecting dots, 
            every landed callback is a micro-hit of the exact cognitive activity 
            the neurofeedback documented as the primary creative pathway.
          </p>
        </div>

        {/* Recursion Taxonomy */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 28, height: 28, borderRadius: 5, background: C.amberDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.amber }}>T</div>
          <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Recursion Taxonomy — By Show</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SHOW CARDS */}
        {/* ═══════════════════════════════════════════════ */}

        <ShowCard
          name="Arrested Development"
          color={C.amber}
          subtitle="The Architecture of Foreshadowing"
          recursionType="LONG-ARC CALLBACK"
          density="EXTREME"
          replayValue="ESSENTIAL"
          techniques={["FORESHADOWING", "VISUAL PUNS", "BACKGROUND GAGS", "NARRATOR IRONY", "CROSS-SEASON SETUP"]}
          examples={[
            { name: "The literal setup-payoff",
              desc: "Buster loses his hand to a loose seal after two seasons of the show placing seal-related imagery, hand-loss foreshadowing, and a character literally named Lucille in his storyline. The joke begins in S1 and detonates in S2. A single punchline has a two-year fuse.",
              span: "S1E01 → S2E14 (36+ episodes)" },
            { name: "Background information density",
              desc: "The Bluth family banana stand has $250,000 lining its walls. 'There's always money in the banana stand' is said as a joke, repeated as a running gag, and revealed as literal truth. First viewing: funny line. Third viewing: the information was always there.",
              span: "S1E01 → S1E02 → S3E13" },
            { name: "The narrator as unreliable architecture",
              desc: "Ron Howard narrates with information the characters don't have, creating a three-layer system: what the character knows, what the viewer knows, and what the narrator reveals is actually true. Each rewatch recalibrates which layer you're processing.",
              span: "Continuous — every episode" },
            { name: "Maeby's wedding to George Michael",
              desc: "A background gag in S1 has the two fake-married for charity. This is referenced, forgotten, revived, and has legal consequences across three seasons. The show treats its own throwaway jokes as binding governance documents.",
              span: "S1 → S3 (runs entire series)" },
          ]}
          measurement="This is the show that most directly feeds the Occipital Alpha pattern-recognition pathway. The information density is so high that it functions like Polyphia — technically complex, structurally precise, and impossible to fully process in a single pass. Each rewatch reveals connections that were architecturally present but cognitively invisible. For a brain that the qEEG documented as creative through 'connecting dots,' Arrested Development is a dot-connecting engine disguised as a sitcom."
        />

        <ShowCard
          name="Community"
          color={C.green}
          subtitle="The Meta-Recursive Engine"
          recursionType="GENRE RECURSION"
          density="HIGH"
          replayValue="HIGH"
          techniques={["META-COMMENTARY", "GENRE PARODY", "FOURTH-WALL ADJACENCY", "TROPE DECONSTRUCTION", "SELF-AWARE CALLBACKS"]}
          examples={[
            { name: "The genre episodes as recursive commentary",
              desc: "Paintball episodes, the claymation Christmas, the documentary episode, the GI Joe episode — each one parodies a genre while simultaneously advancing character arcs using the genre's rules. The humor is recursive: funny because it's a parody, funnier because the characters know it feels like a genre, funniest because the emotional beats still land despite the meta-framing.",
              span: "Each episode is self-contained recursion" },
            { name: "Abed as the recursion engine",
              desc: "Abed sees the show he's in. He references tropes as they happen. He predicts narrative structure. He's a character who has pattern-recognized his own existence into a framework — and the show lets him be right. Abed is what happens when you put the qEEG creativity profile inside a sitcom.",
              span: "Series-long" },
            { name: "The Darkest Timeline",
              desc: "A probability exercise becomes a running mythology. The show creates an alternate version of itself, then lets that alternate version influence the primary timeline. The callback structure isn't linear — it's branching. Multiple recursion paths running in parallel.",
              span: "S3E04 → referenced through S6" },
            { name: "Six seasons and a movie",
              desc: "A throwaway Abed line becomes the show's meta-thesis, then becomes an actual fan campaign, then becomes the show's legacy. A callback that escaped the text and became real. The recursion jumped mediums.",
              span: "S2E10 → real life → the actual movie" },
          ]}
          measurement="Community's recursion operates on genre awareness — it assumes the viewer has internalized narrative structures well enough to recognize them being deployed, deconstructed, and reconstructed simultaneously. This is the Strong's Computer Activities: Very High expressed through media literacy instead of Excel. The pattern recognition isn't just 'I saw this before' — it's 'I see the architecture of what I'm seeing, and the show sees that I see it.' Meta-recursion for a brain that builds systems about systems."
        />

        <ShowCard
          name="30 Rock"
          color={C.rose}
          subtitle="The Density Cannon"
          recursionType="VELOCITY DENSITY"
          density="EXTREME"
          replayValue="ESSENTIAL"
          techniques={["JOKE-PER-SECOND DENSITY", "CUTAWAY CALLBACKS", "BACKGROUND TEXT", "RAPID-FIRE REFERENCES", "NESTED THROWAWAY LINES"]}
          examples={[
            { name: "The three-jokes-per-second pace",
              desc: "30 Rock fires at a rate that makes single-viewing comprehension structurally impossible. A scene will contain a dialogue joke, a visual gag, a background detail, and a callback to an earlier episode simultaneously. The show is designed to be incomplete on first watch — not as a flaw, but as architecture.",
              span: "Every scene" },
            { name: "Recurring micro-callbacks",
              desc: "Jenna's increasingly absurd past. Kenneth's implied immortality. Tracy's entourage names. Dr. Spaceman's medical advice. Each is a running thread that fires briefly, disappears, and returns in a different context. The viewer builds a database of callback targets and the show queries it at random.",
              span: "Series-long, non-sequential" },
            { name: "The network-show-within-a-show recursion",
              desc: "TGS is a show about making a show, and the show about making the show is itself a show about making shows (NBC). The recursion nests three deep — and occasionally four when real NBC executives appear as themselves commenting on the fictional show about the fictional show.",
              span: "Structural — the premise is recursive" },
          ]}
          measurement="30 Rock's density is the comedy equivalent of ILLENIUM's sonic wall — it fills the entire cognitive field. There's no bandwidth left for environmental intrusion because the joke-per-second rate maxes out the processing pipeline. For a brain that the qEEG documented as working harder than comfortable to absorb information, 30 Rock is paradoxically comfortable because it demands everything and therefore displaces everything else. Rewatch is essential not just for enjoyment but because the Brown EF/A Focus deficit (T=74) means first-pass capture rate is structurally incomplete."
        />

        <ShowCard
          name="Seinfeld"
          color={C.blue}
          subtitle="The Structural Callback"
          recursionType="CONVERGENT PLOTTING"
          density="MEDIUM"
          replayValue="HIGH"
          techniques={["MULTI-THREAD CONVERGENCE", "NOTHING AS STRUCTURE", "RULE DISCOVERY", "SOCIAL AXIOM EXTRACTION", "EPISODE-INTERNAL RECURSION"]}
          examples={[
            { name: "The A/B/C plot convergence",
              desc: "Seinfeld's signature: three or four seemingly unrelated storylines that converge in the final minutes. George's lie intersects with Kramer's scheme intersects with Elaine's workplace problem. The architecture is dimensional modeling — separate fact tables joined on a shared key that only becomes visible at resolution.",
              span: "Each episode (self-contained)" },
            { name: "The social axiom extraction",
              desc: "Double-dipping. Close-talking. Re-gifting. Man hands. Seinfeld's lasting contribution isn't jokes — it's the identification and naming of social governance patterns that everyone recognized but nobody had codified. The show is a social systems audit.",
              span: "Entered the language permanently" },
            { name: "The nothing premise as structural discipline",
              desc: "'A show about nothing' is actually a show about structure itself — about finding the pattern in the patternless. Every episode proves that mundane interaction has architecture if you look closely enough. Nothing is the raw material. Structure is the product.",
              span: "Conceptual — the premise" },
          ]}
          measurement="Seinfeld is the Conventional profile's comedy. It finds structure in unstructured social space. It names and codifies invisible rules. It converges independent threads into shared resolution. For a CES operator who builds governance systems from chaos — Chaos → Structured → Automated — Seinfeld is the comedic version of the DDL methodology. The convergent plot structure is a star schema with a punchline."
        />

        <ShowCard
          name="Curb Your Enthusiasm"
          color={C.amber}
          subtitle="The Social Rule Exposer"
          recursionType="NORM VIOLATION CASCADE"
          density="MEDIUM"
          replayValue="MEDIUM"
          techniques={["SOCIAL CONTRACT VIOLATION", "ESCALATION CASCADE", "IMPROVISED CALLBACKS", "NORM EXPOSURE", "CRINGE AS PATTERN REVEAL"]}
          examples={[
            { name: "The violation cascade",
              desc: "Larry identifies a social norm, violates it for rational reasons, and the violation cascades through his social network. Each consequence reveals another hidden norm. The recursion isn't in the dialogue — it's in the social architecture being exposed layer by layer.",
              span: "Each episode" },
            { name: "The rational actor in irrational systems",
              desc: "Larry is always technically correct. The humor comes from the gap between logical reasoning and social expectation. He applies Conventional-profile logic to social situations that don't run on logic. He's auditing social governance and finding the controls don't match the policy.",
              span: "Series-long character architecture" },
            { name: "The 'pretty, pretty, pretty good' era",
              desc: "The first five seasons: Larry as a man genuinely confused by social rules he can see but can't follow. The observation is compassionate. The later seasons shift to intentional provocation — the distinction between 'I see the rule and can't follow it' and 'I see the rule and refuse to follow it.' That shift changes the recursion type from recognition to confrontation.",
              span: "S1–S5 vs S6+" },
          ]}
          measurement="Early Curb is the most direct comedy expression of the Avoidant personality pattern (MCMI-IV BR 82). Larry wants to participate in social systems but keeps tripping over rules he can see but can't navigate smoothly. The cringe is the gap between recognition and execution — the same gap between knowing what the Brown EF/A measures and being able to do it. The preference for early seasons maps to the distinction: the deficit-as-comedy is recognizable, the deficit-as-weapon isn't."
        />

        <ShowCard
          name="Always Sunny in Philadelphia"
          color={C.crimson}
          subtitle="The Dark Mirror Callback"
          recursionType="ANTI-GROWTH RECURSION"
          density="HIGH"
          replayValue="HIGH"
          techniques={["CHARACTER REGRESSION", "DARK-MIRROR CALLBACKS", "SCHEMA REPETITION", "CONSEQUENCE IMMUNITY", "GROUP DELUSION ARCHITECTURE"]}
          examples={[
            { name: "The anti-growth arc",
              desc: "Most sitcoms use callbacks to show character development. Always Sunny uses them to prove the opposite — these people learn nothing, ever. A callback in S12 to a S3 behavior isn't growth, it's evidence of pathological stasis. The recursion is a diagnostic tool.",
              span: "Series-long regression" },
            { name: "The scheme recursion",
              desc: "The Gang's schemes repeat the same structural pattern: identify opportunity → wildly miscalculate → escalate beyond control → blame each other → reset. The architecture never changes. The specifics do. It's the same governance failure with different inputs — a control deficiency that never gets remediated.",
              span: "Every episode" },
            { name: "The group delusion stack",
              desc: "Each character has a distorted self-image that the others reinforce. Dennis is a golden god. Mac is tough. Dee is funny. Charlie is a genius. The callbacks aren't to events — they're to delusions. The show builds a shared reality that's internally consistent and externally insane.",
              span: "Series-long" },
          ]}
          measurement="Always Sunny is the comedy of systems that refuse to improve — the anti-DDL. For someone who builds compensatory systems specifically because the internal architecture has documented deficits, watching characters who have the same deficits and refuse to build anything is both horrifying and funny. It's the control group. The show proves by negative example why the governance architecture matters."
        />

        <ShowCard
          name="The Office"
          color={C.blue}
          subtitle="The Institutional Comedy of Errors"
          recursionType="CHARACTER-ARC CALLBACK"
          density="MEDIUM"
          replayValue="HIGH"
          techniques={["CHARACTER CONSISTENCY CALLBACKS", "DOCUMENTARY AWARENESS", "CRINGE ARCHITECTURE", "SLOW-BURN ARCS", "INSTITUTIONAL ABSURDITY"]}
          examples={[
            { name: "The documentary framing as recursion device",
              desc: "Characters look at the camera. They give talking-head interviews that contradict what just happened. The documentary frame creates a recursion layer: the event, the character's awareness of being watched during the event, and the character's reinterpretation of the event in interview. Three versions of reality, all visible simultaneously.",
              span: "Every episode — structural" },
            { name: "Michael Scott's competence callbacks",
              desc: "Michael is terrible at management in documented, consistent, specific ways — and then occasionally reveals genuine emotional intelligence that reframes every prior failure. The callbacks aren't to jokes — they're to your own assessment of the character. The show recurses on your judgment.",
              span: "S1 → S7 (entire Michael era)" },
            { name: "The slow-burn relationship arcs",
              desc: "Jim and Pam, Dwight and Angela, Andy and Erin — each uses callbacks to micro-moments across seasons. A glance in S2 pays off in S5. The emotional architecture runs on the same long-fuse principle as Arrested Development, but the payoff is affective instead of comedic.",
              span: "Multi-season" },
          ]}
          measurement="The Office is institutional dysfunction comedy — a workplace where the governance system (regional manager, HR, corporate) consistently fails to produce the outcomes it's designed for. For an internal auditor who documents control deficiencies professionally, the humor is occupational. Michael Scott is a control environment with no controls. The documentary frame adds a meta-governance layer — the camera is the audit function, always present, never intervening."
        />

        <ShowCard
          name="Scrubs"
          color={C.green}
          subtitle="The Tonal Whiplash Engine"
          recursionType="TONAL RECURSION"
          density="MEDIUM"
          replayValue="HIGH"
          techniques={["FANTASY SEQUENCE CALLBACKS", "TONAL SHIFT", "JD NARRATION RECURSION", "JANITOR CONTINUITY", "EMOTIONAL AMBUSH"]}
          examples={[
            { name: "The fantasy-to-reality recursion",
              desc: "JD's daydream sequences start as pure comedy — absurd, disconnected, playful. Then the show starts using the same visual language for emotional gut-punches. A fantasy sequence in S3 might be funny. An identically structured one in S5 might make you cry. The recursion is in the format — the show trains you to expect comedy from a visual grammar and then repurposes that grammar for grief.",
              span: "Series-long format training" },
            { name: "The Janitor's long game",
              desc: "The Janitor's antagonism of JD is a running callback engine — each encounter references and escalates prior encounters. But the recursion has a hidden structure: the Janitor is the most observant character in the show. His callbacks prove he's been paying attention to everything, and the comedy is that nobody else noticed.",
              span: "S1 → S8" },
            { name: "The tonal whiplash as structural principle",
              desc: "Scrubs will run a slapstick comedy sequence and cut directly to a patient dying — in the same scene, sometimes in the same shot. The recursion isn't jokes referencing jokes. It's the show teaching you that comedy and grief use the same emotional architecture, then proving it by switching between them without transition.",
              span: "Series-long" },
          ]}
          measurement="Scrubs' tonal recursion maps directly to the Bipolar II cycling pattern. The show's signature move — comedy to devastation in a single cut — mirrors the affective shift the psych eval documented. But Scrubs controls the transition. The shift is authored, not experienced. For someone whose mood cycling is a documented clinical feature, watching a show that performs the same tonal architecture deliberately and resolves it within 22 minutes is the same controlled catharsis mechanism as ILLENIUM's build-drop-resolve."
        />

        <ShowCard
          name="Parks and Recreation"
          color={C.amber}
          subtitle="The Competence Payoff"
          recursionType="CHARACTER-GROWTH CALLBACK"
          density="MEDIUM"
          replayValue="HIGH"
          techniques={["GROWTH-ARC CALLBACKS", "CATCHPHRASE EVOLUTION", "INSTITUTIONAL OPTIMISM", "ENSEMBLE CONSISTENCY", "COMPETENCE AS PUNCHLINE"]}
          examples={[
            { name: "The competence-as-comedy inversion",
              desc: "Leslie Knope is aggressively, absurdly competent. The humor isn't that she fails — it's that she succeeds so hard it becomes funny. Binders, presentations, sub-committees, governance structures for waffle consumption. The comedy is Conventional-profile intensity played at max volume.",
              span: "Series-long" },
            { name: "Character growth as callback engine",
              desc: "April's emotional walls. Andy's accidental wisdom. Ben's nerd confidence. Ron's hidden softness. Each character has a growth arc that uses early-season behavior as callback material for late-season payoff. The recursion rewards loyalty — you had to be there in S2 to feel the weight of S6.",
              span: "Multi-season arcs" },
            { name: "The institutional optimism",
              desc: "Government works in Pawnee. Not well, not efficiently, but it works because people care. The show's thesis is that governance systems staffed by people who give a damn can actually produce outcomes. This is the opposite of Always Sunny — the control environment has controls, and they function.",
              span: "Series-long thesis" },
          ]}
          measurement="Parks and Rec is the aspirational comedy in the set — the one where the governance system works because the operator cares enough to make it work. Leslie Knope is the DDL methodology as a character: she builds systems, documents everything, creates governance structures for trivial problems, and achieves outcomes through sheer systematic commitment. For someone with 44 systems and 65 standards, this isn't just funny. It's validating. The competence is the joke, and the joke is that competence is beautiful."
        />

        {/* ═══════════════════════════════════════════════ */}
        {/* THE RECURSION SPECTRUM */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 28, borderRadius: 5, background: C.amberDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 12, fontWeight: 700, color: C.amber }}>Σ</div>
            <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>The Recursion Spectrum</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Recursion Type → Processing Pathway
            </div>

            {[
              { show: "Arrested Dev", type: "Long-arc callback", pathway: "Occipital Alpha — connecting dots across time", color: C.amber },
              { show: "Community", type: "Genre recursion", pathway: "Occipital Alpha — recognizing structural patterns across domains", color: C.green },
              { show: "30 Rock", type: "Velocity density", pathway: "Sensory displacement — fills cognitive field completely", color: C.rose },
              { show: "Seinfeld", type: "Convergent plotting", pathway: "Conventional profile — finding structure in nothing", color: C.blue },
              { show: "Curb", type: "Norm violation cascade", pathway: "Avoidant pattern — social rule recognition gap", color: C.amber },
              { show: "Always Sunny", type: "Anti-growth recursion", pathway: "Control deficiency — the uncompensated comparison", color: C.crimson },
              { show: "The Office", type: "Character-arc callback", pathway: "Institutional audit — governance without controls", color: C.blue },
              { show: "Scrubs", type: "Tonal recursion", pathway: "Bipolar II — controlled affective cycling", color: C.green },
              { show: "Parks & Rec", type: "Growth callback", pathway: "CES validation — competence as beauty", color: C.amber },
            ].map((r, i) => (
              <div key={r.show} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
                borderBottom: i < 8 ? `1px solid ${C.border}` : "none",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: r.color, width: 100 }}>{r.show}</span>
                <Tag label={r.type} color={r.color} />
                <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, flex: 1, marginLeft: 8 }}>{r.pathway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* CLOSING INSIGHT */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{
          marginTop: 32, borderLeft: `3px solid ${C.amber}`, padding: "16px 24px",
          background: C.amberDim, borderRadius: "0 6px 6px 0",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            The Unified Recursion Architecture
          </div>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              Nine comedies, nine recursion types, one cognitive profile. Every show in this set rewards 
              a different facet of the same brain architecture: Arrested Development feeds long-range pattern recognition. 
              Community feeds genre-structure awareness. 30 Rock feeds the need for total cognitive saturation. 
              Seinfeld feeds the Conventional drive to find structure in chaos. Curb exposes the social rules 
              the Avoidant pattern can see but can't smoothly follow. Always Sunny is the control group that proves 
              why compensatory systems matter. The Office is a professional audit of institutional dysfunction. 
              Scrubs is controlled tonal cycling. Parks and Rec is the aspirational endstate.
            </p>
            <p style={{ margin: 0 }}>
              The common thread: every show requires and rewards rewatching. 
              Not because the content changes — because the viewer's pattern-recognition depth increases with each pass. 
              The rewatch is a calibration cycle. Same input, higher-resolution output. 
              That's not how most people watch television. It's how an Occipital Alpha brain 
              with a Conventional profile and a Sensation Avoiding architecture consumes comedy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.amber}, ${C.green}, ${C.rose}, ${C.blue}, ${C.crimson})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · CONSOLE · The Callback Engine · 9 shows · 9 recursion types · 1 brain
          </div>
        </div>
      </div>
    </div>
  );
}
