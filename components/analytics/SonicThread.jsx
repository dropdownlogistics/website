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
// Soundtrack Card
// ═══════════════════════════════════════════════════════════
function SoundtrackCard({ title, medium, color, sonicDNA, keyArtists, emotionalFunction, listeningProfileLink, examples }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: C.card, border: `1px solid ${color}25`, borderRadius: 8, marginBottom: 10, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.4 }} />

      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.cream }}>{title}</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color, marginTop: 2 }}>{medium}</div>
          </div>
          <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>▸</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {sonicDNA.map(t => <Tag key={t} label={t} color={color} />)}
        </div>
      </div>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.border}` }}>
          {/* Key sonic contributors */}
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 14, marginBottom: 8 }}>
            Key Sonic Contributors
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
            {keyArtists.map(a => <Tag key={a} label={a} color={C.creamMid} />)}
          </div>

          {/* Soundtrack moments */}
          {examples.map((ex, i) => (
            <div key={i} style={{ padding: "10px 14px", marginBottom: 4, background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: font.display, fontSize: 12, fontWeight: 600, color }}>{ex.moment}</span>
                {ex.track && <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{ex.track}</span>}
              </div>
              <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{ex.desc}</div>
            </div>
          ))}

          {/* Emotional function */}
          <div style={{ marginTop: 12, padding: "10px 14px", background: color + "08", borderLeft: `2px solid ${color}`, borderRadius: "0 4px 4px 0" }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Sonic Function
            </div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{emotionalFunction}</div>
          </div>

          {/* Link to listening profile */}
          <div style={{ marginTop: 8, padding: "8px 14px", background: C.creamGhost, borderRadius: 4 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
              Apple Music Echo
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, lineHeight: 1.5 }}>{listeningProfileLink}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function SonicThread() {
  const [view, setView] = useState("media");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CONSOLE · The Sonic Thread
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 36, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          The Sonic Thread
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          The same listening profile runs through every media selection. 
          The soundtracks chose the operator before the operator chose the shows.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 4 }}>
          Cross-reference: <span style={{ color: C.crimson }}>Catnip Map</span> · <span style={{ color: C.amber }}>Sensory Diet</span> · <span style={{ color: C.amber }}>Callback Engine</span> · <span style={{ color: C.violet }}>DOSSIER</span>
        </div>
        <div style={{ height: 2, width: 48, background: C.violet, marginTop: 12, marginBottom: 28, opacity: 0.5 }} />

        {/* Pull quote */}
        <div style={{ borderLeft: `3px solid ${C.violet}`, padding: "14px 20px", background: C.violetDim, borderRadius: "0 6px 6px 0", marginBottom: 32 }}>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            ILLENIUM at 9,400 minutes is not an isolated data point. 
            The same sonic architecture -- structured emotional builds, acoustic intimacy, 
            cathartic resolution, pattern-dense instrumentation -- runs through the soundtracks 
            of every show, film, and game in the media diet. 
            The listening profile doesn't stop at the headphones. It selected the entire media library.
          </p>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 3, marginBottom: 28 }}>
          {[
            { id: "media", label: "By Media" },
            { id: "function", label: "By Sonic Function" },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              padding: "8px 16px", borderRadius: 5, border: `1px solid ${view === v.id ? C.violet : C.border}`,
              background: view === v.id ? C.violetDim : C.creamGhost, cursor: "pointer",
              fontFamily: font.mono, fontSize: 10, color: view === v.id ? C.violet : C.creamDim,
            }}>{v.label}</button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* BY MEDIA VIEW */}
        {/* ═══════════════════════════════════════════════ */}
        {view === "media" && (
          <div>
            {/* TV SECTION */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 5, background: C.amberDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 14, color: C.amber }}>📺</div>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Television</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <SoundtrackCard
              title="Scrubs"
              medium="TV · 2001-2010 · Music supervisor: Christa Miller"
              color={C.green}
              sonicDNA={["ACOUSTIC INTIMACY", "INDIE VULNERABILITY", "TONAL WHIPLASH SCORING", "LYRICAL PRECISION", "EMOTIONAL AMBUSH"]}
              keyArtists={["Colin Hay", "The Fray", "Joshua Radin", "Lazlo Bane", "Rhett Miller", "The Shins", "Guided by Voices", "Erasure"]}
              examples={[
                { moment: "Colin Hay -- the acoustic ghost",
                  track: "\"Overkill,\" \"Waiting for My Real Life to Begin,\" \"Beautiful World\"",
                  desc: "Colin Hay appears physically in the show as a wandering musician, then his songs score the emotional climaxes. The diegetic becomes non-diegetic. The music exists in the world and outside it simultaneously. Acoustic guitar, vulnerable male vocal, lyrics about waiting for things to make sense. For a brain with auditory response control at 82, the simplicity of the arrangement -- single voice, single instrument -- keeps the processing cost minimal while the lyrical content carries the emotional weight." },
                { moment: "The Fray -- \"How to Save a Life\"",
                  track: "S5E20 -- \"My Lunch\"",
                  desc: "The song scores Dr. Cox losing three patients. Piano-driven, building dynamic, lyrics about helplessness. The song became iconic because the show placed it at the exact moment the tonal whiplash architecture demanded total emotional surrender. Same build-to-resolution structure as melodic bass -- but acoustic, stripped, intimate." },
                { moment: "The musical placement philosophy",
                  track: "Christa Miller's curation approach",
                  desc: "Scrubs doesn't use music as underscore. It uses it as a parallel narrative -- the song comments on the scene, contradicts it, or completes the emotional information the dialogue can't carry. For a profile where Expressive communication (v=12) is a documented weakness, the soundtrack does the emotional articulation the characters -- and the viewer -- can't verbalize." },
              ]}
              emotionalFunction="Scrubs' soundtrack is an Expressive communication prosthetic. Acoustic intimacy, lyrical emotional precision, and a curation philosophy that uses music to say what the scene can't. For Sensation Avoiding at 50/75, the stripped arrangements keep the sensory cost low. For Internalizing at v=21, the lyrics externalize internal states. The same function as ILLENIUM's vocal features -- but at acoustic scale."
              listeningProfileLink="Colin Hay's sparse acoustic guitar → ILLENIUM vocal tracks (emotional articulation). The Fray's piano builds → melodic bass build-drop-resolve. Indie vulnerability → the pop-punk emotional register from the 2001-05 anchor window."
            />

            <SoundtrackCard
              title="Sons of Anarchy"
              medium="TV · 2008-2014 · Music supervisor: Bob Thiele Jr."
              color={C.amber}
              sonicDNA={["FOLK-ROCK GRAVITAS", "COVER CULTURE", "ACOUSTIC DARKNESS", "BLUEGRASS GRIT", "MONTAGE-AS-LITURGY"]}
              keyArtists={["The White Buffalo", "Katey Sagal", "The Forest Rangers", "Curtis Stigers", "Battleme", "Audra Mae"]}
              examples={[
                { moment: "The montage-as-liturgy structure",
                  track: "End-of-episode montages throughout series",
                  desc: "Every SOA episode ends with a 2-4 minute music montage that scores the consequences of the episode's events across multiple characters simultaneously. The music isn't background -- it's the binding agent. Folk-rock or acoustic cover, always with a gravitas that elevates street-level violence into something mythic. The montage structure is the build-drop-resolve of the episode arc." },
                { moment: "Cover songs as thematic commentary",
                  track: "\"Bohemian Rhapsody\" (Forest Rangers), \"To Sir With Love\" (Katey Sagal)",
                  desc: "SOA doesn't use original songs for its biggest moments -- it uses covers. Known songs recontextualized by the show's world. The recursion is musical: you know this melody, but the arrangement and the context transform it. Same pattern-recognition reward as the comedy callbacks -- familiar structure, new information." },
                { moment: "The White Buffalo as Jax's shadow voice",
                  track: "\"The Matador,\" \"Come Join the Murder\"",
                  desc: "The White Buffalo's baritone folk-rock scores Jax's internal state when the character can't or won't speak it. Acoustic guitar, deep male vocal, lyrics about inevitability and consequence. The same Expressive communication prosthetic as Scrubs' Colin Hay -- different genre, identical function." },
              ]}
              emotionalFunction="SOA's soundtrack treats every episode ending as a sacred closing ritual -- the montage-as-liturgy. Acoustic darkness, folk-rock gravitas, and cover songs that leverage the viewer's existing emotional association with the melody. The sound profile is dense enough to score violence as myth but structured enough to stay in the Sensation Avoiding comfort zone. Nothing sonically chaotic. Everything sonically heavy."
              listeningProfileLink="Folk-rock gravitas → the emotional weight register in ILLENIUM's vocal collaborations. Acoustic covers → temporal anchoring (known melody, new arrangement, same as rewatching). Montage scoring → build-to-resolution as episode-closing ritual."
            />

            <SoundtrackCard
              title="Friday Night Lights"
              medium="TV · 2006-2011 · Score: W.G. Snuffy Walden + Explosions in the Sky"
              color={C.blue}
              sonicDNA={["POST-ROCK AMBIENT", "GUITAR TREMOLO BUILDS", "WORDLESS CATHARSIS", "CINEMATIC SWELLS", "INSTRUMENTAL EMOTION"]}
              keyArtists={["Explosions in the Sky", "W.G. Snuffy Walden", "Daniel Lanois"]}
              examples={[
                { moment: "Explosions in the Sky -- the show's emotional infrastructure",
                  track: "\"Your Hand in Mine,\" \"First Breath After Coma\"",
                  desc: "Post-rock: no lyrics, guitar-driven, slow builds to cathartic crescendos. Explosions in the Sky doesn't tell you what to feel -- it architecturally constructs the feeling through dynamic shape. Quiet → building → swelling → release. The structure is identical to melodic bass minus the electronic production. Same build-drop-resolve, acoustic instrumentation." },
                { moment: "The wordless scoring",
                  track: "Throughout series -- game sequences, emotional climaxes",
                  desc: "FNL's signature emotional moments are scored almost entirely with instrumental music. No lyrics to decode. No vocal processing load on the mildly impaired auditory channel (IVA: 82). Pure dynamic shape -- the music provides emotional information through structure alone. Polyphia's instrumental approach, in post-rock form." },
                { moment: "The tremolo guitar as emotional grammar",
                  track: "Series-wide scoring technique",
                  desc: "The delayed, reverb-heavy tremolo guitar that defines the FNL sound creates a sonic texture that fills space without density -- unlike ILLENIUM's wall of sound, this is open, breathing, spatial. But it still displaces. The reverb fills the auditory field gently rather than overwhelmingly. Sensation Avoiding accommodation at lower intensity." },
              ]}
              emotionalFunction="FNL's soundtrack is the acoustic proof that the ILLENIUM connection isn't about genre -- it's about structure. Post-rock uses the same build-to-catharsis architecture as melodic bass. No lyrics means no auditory language processing load. The emotional information arrives through dynamic shape alone, which plays directly to the visual-dominant processing profile -- you feel it structurally, not verbally."
              listeningProfileLink="Explosions in the Sky's build-crescendo-resolve → ILLENIUM's build-drop-resolve. Instrumental-only → Polyphia's no-vocal approach. Tremolo guitar texture → the clean-tone harmonic content in Polyphia. Post-rock patience → melodic bass compressed into 4 minutes."
            />

            <SoundtrackCard
              title="The Wire"
              medium="TV · 2002-2008 · Music policy: diegetic only (with one exception per season)"
              color={C.ember}
              sonicDNA={["DIEGETIC ONLY", "SOURCE MUSIC AS WORLD-BUILDING", "TOM WAITS THEME COVERS", "SONIC REALISM", "ABSENCE AS AESTHETIC"]}
              keyArtists={["Tom Waits (theme)", "Various -- diegetic only", "The Blind Boys of Alabama"]}
              examples={[
                { moment: "The diegetic-only policy",
                  track: "No non-diegetic score in the series",
                  desc: "The Wire uses zero non-diegetic music. Every song exists in the show's world -- from a car radio, a jukebox, a character's headphones. The absence of a score is itself a sonic architecture. No emotional manipulation through music. The viewer must process emotional information without sonic guidance. This is the anti-Scrubs: the soundtrack refuses to do the Expressive work for you." },
                { moment: "The season-opening Tom Waits covers",
                  track: "\"Way Down in the Hole\" -- 5 different versions across 5 seasons",
                  desc: "Same song, five different artists, five different arrangements. The Blind Boys of Alabama. Steve Earle. The Neville Brothers. Each cover recontextualizes the same structure for the season's institutional focus. The recursion is the SOA cover principle applied to a single song across the entire series -- familiar structure, shifting context, pattern recognition across arrangements." },
                { moment: "The one exception per season",
                  track: "Non-diegetic music in each season finale's final montage",
                  desc: "Each season breaks its own rule exactly once -- a non-diegetic song over the closing montage. After 12 episodes of diegetic-only scoring, the sudden appearance of non-diegetic music hits with the force of Scrubs' tonal whiplash. The absence makes the presence devastating. The rule creates the exception's impact." },
              ]}
              emotionalFunction="The Wire's sonic architecture is governance-as-sound-design. The diegetic-only rule is a control standard. The single exception per season is a documented deviation with business justification. For a Conventional profile (75) who builds governance systems, The Wire's soundtrack is the most structurally principled sound design in television. The rule is the aesthetic. The exception proves the rule works."
              listeningProfileLink="Diegetic-only → the opposite of ILLENIUM's total-field saturation, but serving the same brain differently. The absence forces visual-channel processing (IVA visual: 107-110). Tom Waits covers → SOA's cover culture → temporal anchoring through familiar melody. Season-finale exception → the controlled catharsis at maximum impact because of the restraint that preceded it."
            />

            <SoundtrackCard
              title="Psych"
              medium="TV · 2006-2014 · The sleep show"
              color={C.blue}
              sonicDNA={["BRIGHT ACOUSTIC POP", "PREDICTABLE SCORING", "COMEDIC UNDERSCORE", "LOW THREAT", "KNOWN QUANTITY"]}
              keyArtists={["The Friendly Indians (theme)", "Boyz II Men (musical)", "Curt Smith"]}
              examples={[
                { moment: "\"I Know You Know\" -- the theme as regulation anchor",
                  track: "The Friendly Indians",
                  desc: "Bright, major-key, acoustic-driven theme song. The first sound of every episode is a known, pleasant, zero-threat auditory stimulus. For a show used as a sleep aid during detox and still used for insomnia, the theme song is the activation signal for the regulation state. Pavlovian auditory conditioning -- the melody means safety." },
                { moment: "The scoring as ambient predictability",
                  track: "Throughout series -- comedic underscore",
                  desc: "Psych's incidental music is the most predictable in the comedy catalog. Light, bouncy, never dissonant, never surprising. The sonic bed is specifically designed to never startle, never spike, never create auditory unpredictability. For Sensation Avoiding at 50/75 and a brain used as a sleep regulation tool, this is the sound design of safety." },
                { moment: "The musical episode -- maximum known quantity",
                  track: "\"Psych: The Musical\" (S7)",
                  desc: "When Psych does a musical episode, the songs are original but stylistically indistinguishable from the show's normal tone -- bright, playful, unthreatening. Even at maximum musical ambition, the show stays inside its sonic comfort zone. The musical episode is the show proving it will never break the auditory contract." },
              ]}
              emotionalFunction="Psych's soundtrack is the inverse of The Wire's. Where The Wire withholds music to force raw processing, Psych provides constant, predictable, low-threat sound to minimize processing entirely. This is the auditory regulation function at its purest -- the show that scores sleep. The sonic profile is the exact opposite of ILLENIUM in every parameter (bright vs. dark, sparse vs. dense, quiet vs. loud) but serves the same operator for the same reason: auditory predictability for an over-aroused brain."
              listeningProfileLink="Psych's predictability → ILLENIUM's structural predictability (build-drop-resolve is always the same). Bright acoustic → the pop-punk anchor window (same tonal register as Good Charlotte/New Found Glory). Zero-threat scoring → Sensation Avoiding accommodation at the lowest-energy end of the spectrum."
            />

            <SoundtrackCard
              title="Community"
              medium="TV · 2009-2015 · Composer: Ludwig Göransson"
              color={C.green}
              sonicDNA={["GENRE-SHIFTING SCORE", "PASTICHE PRECISION", "PARODY FIDELITY", "THEME VARIATIONS", "META-MUSICAL AWARENESS"]}
              keyArtists={["Ludwig Göransson", "Childish Gambino (Donald Glover)", "Ben Folds (cameo)"]}
              examples={[
                { moment: "Genre-accurate scoring for every themed episode",
                  track: "Western, sci-fi, horror, anime, documentary scores",
                  desc: "When Community does a Western episode, the score is an actual Western score. When it does horror, it's scored like horror. Ludwig Göransson composes genre-faithful music for each parody, which means the sonic experience shifts completely between episodes. The recursion isn't in the music itself -- it's in the viewer's recognition of the genre the music is invoking. Pattern recognition as sound design." },
                { moment: "The main theme variations",
                  track: "\"At Least It Was Here\" by The 88 -- multiple arrangements",
                  desc: "The theme song appears in different arrangements across the series -- acoustic, 8-bit, orchestral, a cappella -- mirroring The Wire's Tom Waits approach but comedically. Same melody, shifting context, the show using its own theme as a recursion device." },
              ]}
              emotionalFunction="Community's soundtrack is the musical equivalent of its genre-recursion comedy -- it asks the viewer to recognize sonic patterns across domains. The score is never just background; it's always commenting on what genre of show you're currently watching. For the Occipital Alpha creativity profile, this is pattern recognition through the auditory channel -- despite the mild auditory impairment, genre-recognition is processed more holistically than linguistically."
              listeningProfileLink="Genre pastiche → Polyphia's genre-defiant blending. Ludwig Göransson → went on to score Black Panther and The Mandalorian; Community was the laboratory. Theme variations → the Tom Waits / SOA cover principle."
            />

            {/* FILM SECTION */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 32 }}>
              <div style={{ width: 28, height: 28, borderRadius: 5, background: C.crimsonDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 14, color: C.crimson }}>🎬</div>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Film</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <SoundtrackCard
              title="Fast and Furious"
              medium="Film franchise · 2001-present"
              color={C.crimson}
              sonicDNA={["HIP-HOP / EDM HYBRID", "HIGH BPM ENERGY", "BASS-DRIVEN", "ERA-SPANNING", "ADRENALINE SCORING"]}
              keyArtists={["Ludacris", "T.I.", "Don Omar", "Wiz Khalifa & Charlie Puth", "Teriyaki Boyz", "Brian Tyler (score)"]}
              examples={[
                { moment: "The street-racing sonic palette",
                  track: "\"Act a Fool\" (Ludacris), \"Ride Out,\" franchise-wide",
                  desc: "Bass-heavy, high BPM, hip-hop-EDM hybrid. The racing sequences are scored like ILLENIUM shows -- driving rhythm, building energy, physical sonic impact. The franchise's musical DNA is the same activation-energy architecture as the listening profile, but through a hip-hop lens rather than melodic bass." },
                { moment: "\"See You Again\" -- the franchise's emotional peak",
                  track: "Wiz Khalifa & Charlie Puth · Furious 7",
                  desc: "Piano-driven, vocal-led, building to a chorus that resolves into loss acceptance. Paul Walker's tribute. The franchise that's 'ridiculous on purpose' deploys its most emotionally sincere moment through a song structure identical to ILLENIUM's vocal ballads -- piano build, emotional vocal, harmonic resolution. The absurdity permission structure drops for one song, and the sonic architecture carries the sincerity." },
                { moment: "T.I. as franchise sonic thread",
                  track: "T.I. appears across multiple films + is the only hip-hop artist in Apple Music top 20",
                  desc: "T.I. is in the Apple Music Replay top 20 -- the only hip-hop artist in a profile dominated by EDM and math rock. T.I. is also in the Fast and Furious franchise. The listening profile and the media preference share an actual artist. The thread is literal." },
              ]}
              emotionalFunction="F&F's soundtrack is the activation-energy function expressed through hip-hop and EDM -- high BPM, bass-driven, physically stimulating. The racing sequences are scored to provide the same external drive that ILLENIUM provides at 140-174 BPM. And when the franchise needs to land emotional sincerity, it uses the exact same piano-vocal-build structure as the listening profile's catharsis architecture."
              listeningProfileLink="T.I. appears in both the franchise and the Apple Music top 20 -- the only artist in the media diet who crosses from soundtrack to listening profile. Bass-heavy racing score → ILLENIUM's BPM activation. \"See You Again\" piano build → ILLENIUM vocal ballad structure."
            />

            <SoundtrackCard
              title="Lord of the Rings"
              medium="Film trilogy · 2001-2003 · Composer: Howard Shore"
              color={C.amber}
              sonicDNA={["LEITMOTIF ARCHITECTURE", "ORCHESTRAL BUILDS", "THEMATIC RECURSION", "CHORAL GRAVITAS", "FELLOWSHIP THEME"]}
              keyArtists={["Howard Shore", "Enya", "Annie Lennox", "Renée Fleming"]}
              examples={[
                { moment: "The leitmotif system",
                  track: "80+ identified themes across the trilogy",
                  desc: "Howard Shore's score assigns musical themes to characters, places, cultures, and concepts -- the Shire theme, the Fellowship theme, the Ring theme, Rohan's theme. Each theme is introduced, developed, inverted, and layered across three films. This is the most sophisticated callback architecture in the media diet. The music is a star schema -- dimensional themes joining on narrative keys." },
                { moment: "The Fellowship theme -- loyalty as melody",
                  track: "First heard in Rivendell, recurs across trilogy",
                  desc: "The Fellowship theme plays when the group is united and disappears when it fractures. Its return signals reunion. The melody is a loyalty barometer. For a profile where Socialization is the strongest domain, the Fellowship theme is the sonic representation of the media diet's core value -- chosen family, measured in music." },
                { moment: "Into the West -- the trilogy's harmonic resolution",
                  track: "Annie Lennox · Return of the King",
                  desc: "The trilogy's closing song is a gentle, Celtic-inflected ballad about departure and acceptance. After 9+ hours of orchestral escalation, the resolution is acoustic, intimate, quiet. Same principle as Scrubs -- the dynamic range matters. The catharsis lands because the restraint follows the intensity." },
              ]}
              emotionalFunction="LOTR's score is the most structurally complex sound design in the media diet -- 80+ leitmotifs functioning as a cross-referenced musical database. For the Occipital Alpha brain that connects dots and recognizes patterns, Shore's score is an auditory puzzle that rewards attention across 12 hours of film. The leitmotif system is dimensional modeling expressed as orchestration."
              listeningProfileLink="Leitmotif recursion → Arrested Development's long-arc callbacks, expressed musically. Orchestral builds → post-rock builds (Explosions in the Sky) → melodic bass builds (ILLENIUM). Fellowship theme → the chosen-family sonic signature. Into the West's acoustic resolution → Scrubs' Colin Hay, SOA's White Buffalo."
            />

            {/* GAMES SECTION */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 32 }}>
              <div style={{ width: 28, height: 28, borderRadius: 5, background: C.violetDim, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 14, color: C.violet }}>🎮</div>
              <span style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em", color: C.creamMid, textTransform: "uppercase" }}>Games</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <SoundtrackCard
              title="Final Fantasy VII"
              medium="Game · 1997 / 2020 Remake · Composer: Nobuo Uematsu"
              color={C.violet}
              sonicDNA={["ORCHESTRAL RPG SCORING", "LEITMOTIF SYSTEM", "EMOTIONAL THEME RECURSION", "BOSS BATTLE BUILDS", "AERITH'S THEME"]}
              keyArtists={["Nobuo Uematsu", "Masashi Hamauzu (Remake)"]}
              examples={[
                { moment: "Aerith's Theme -- the franchise's emotional anchor",
                  track: "Plays during the most iconic scene in RPG history",
                  desc: "A simple, descending melody that begins gentle and builds across its runtime. Introduced early, recurring throughout, culminating at the narrative's most devastating moment. The theme is a leitmotif that carries more emotional weight with each recurrence -- the same callback-as-emotional-accumulation architecture as Arrested Development, but the payoff is grief instead of comedy." },
                { moment: "One-Winged Angel -- boss battle as catharsis",
                  track: "Sephiroth's theme · Final boss",
                  desc: "Latin choral, orchestral, building to frenzy. The most intense musical moment in the game is also the most structured -- the choir, the orchestra, the relentless driving rhythm all build to a climax that functions identically to ILLENIUM's drops. Maximum sonic density, maximum emotional intensity, guaranteed resolution when the boss falls." },
                { moment: "The Remake's expanded score",
                  track: "Hamauzu's orchestral expansions of Uematsu's themes",
                  desc: "The Remake takes every theme from 1997 and gives it full orchestral treatment. The same melodies, expanded into new arrangements. The recursion spans 23 years -- the same temporal anchoring as the pop-punk window. You know these melodies from childhood. The Remake recontextualizes them in HD. Known structure, new resolution." },
              ]}
              emotionalFunction="FFVII's score is the oldest sonic anchor in the media diet -- melodies from age 11 that still carry emotional weight at 38. The leitmotif system parallels LOTR's. The boss battle builds parallel ILLENIUM's. Aerith's theme parallels Scrubs' emotional ambush. 'Inject into my veins' isn't hyperbole -- this is the longest-running auditory regulation relationship in the entire profile."
              listeningProfileLink="Aerith's Theme → the emotional resolution guarantee (ILLENIUM's harmonic resolution, SOA's montage liturgy). One-Winged Angel → ILLENIUM's maximum-density catharsis. Remake arrangements → the same temporal anchoring as pop-punk: known melody from the formative window, recontextualized."
            />

            <SoundtrackCard
              title="Skyrim / Red Dead / Witcher III"
              medium="Games · Open-world RPGs"
              color={C.green}
              sonicDNA={["AMBIENT EXPLORATION", "DYNAMIC SCORING", "ENVIRONMENTAL SOUNDSCAPE", "COMBAT ESCALATION", "WORLD-BUILDING THROUGH SOUND"]}
              keyArtists={["Jeremy Soule (Skyrim)", "Woody Jackson (RDR2)", "Marcin Przybyłek / Mikolai Stroinski (Witcher)"]}
              examples={[
                { moment: "Ambient exploration scoring",
                  track: "Skyrim's exploration themes, RDR2's riding music, Witcher's Kaer Morhen",
                  desc: "Open-world RPGs use ambient scoring that shifts dynamically with the player's context -- quiet during exploration, escalating during combat, resolving after threat passes. The player controls the emotional pacing by controlling movement. The music responds to behavior. For a profile where Sensation Avoiding is extreme, player-controlled scoring means the auditory environment is self-regulated in real time." },
                { moment: "RDR2's adaptive dynamic range",
                  track: "Riding across the map at sunset",
                  desc: "Red Dead 2's score is the most dynamic in the set -- it can be nearly silent for minutes, then layer in guitar, then add strings as the landscape shifts. The scoring breathes with the environment. This is the FNL post-rock approach applied to an interactive medium -- the player's pace determines the build." },
                { moment: "The Witcher's folk-combat contrast",
                  track: "Slavic folk → combat metal transitions",
                  desc: "Witcher III shifts from Slavic folk instrumentals during exploration to aggressive, percussion-driven combat scoring. The contrast is Scrubs' tonal whiplash applied to gameplay -- the dynamic range between states is the emotional architecture." },
              ]}
              emotionalFunction="Open-world RPG scoring is the only category where the listener controls the music's intensity through their own behavior. For a profile built on externalized systems and controlled environments, this is the ultimate auditory regulation architecture -- the soundtrack responds to the operator's decisions in real time."
              listeningProfileLink="Ambient exploration → the low-end of the Sensation Avoiding accommodation spectrum (Psych's predictability). Combat escalation → ILLENIUM's builds. Player-controlled pacing → the self-curated playlist architecture from the Apple Music data. The operator builds the sonic environment in real time."
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* BY SONIC FUNCTION VIEW */}
        {/* ═══════════════════════════════════════════════ */}
        {view === "function" && (
          <div>
            {[
              {
                fn: "Build → Resolve (Catharsis Architecture)",
                color: C.crimson,
                measurement: "Bipolar II · Internalizing v=21 · Sensation Avoiding 50/75",
                media: [
                  { title: "ILLENIUM", role: "Build-drop-resolve in 4 min" },
                  { title: "Explosions in the Sky / FNL", role: "Post-rock build-crescendo-resolve" },
                  { title: "LOTR (Shore)", role: "Orchestral build across hours" },
                  { title: "FFVII (One-Winged Angel)", role: "Boss battle as cathartic release" },
                  { title: "SOA montages", role: "Episode-closing build-resolve ritual" },
                  { title: "\"See You Again\" (F&F)", role: "Piano-vocal build to acceptance" },
                  { title: "Scrubs (The Fray)", role: "Acoustic build to emotional ambush" },
                ],
                desc: "The most prevalent sonic architecture across the entire media diet. Every category contains at least one build-to-resolve structure. The mechanism is identical regardless of genre -- tension accumulates through dynamic escalation and resolves through harmonic or structural completion. For Bipolar II cycling and clinically significant internalizing, the guarantee of resolution is the therapeutic function.",
              },
              {
                fn: "Acoustic Intimacy (Expressive Prosthetic)",
                color: C.green,
                measurement: "Expressive v=12 · ≤10% base rate · Auditory Response 82",
                media: [
                  { title: "Scrubs (Colin Hay)", role: "Single voice, single instrument, lyrical precision" },
                  { title: "SOA (White Buffalo)", role: "Baritone folk-rock, consequence lyrics" },
                  { title: "ILLENIUM vocal tracks", role: "Emotional lyrics over melodic bass" },
                  { title: "FFVII (Aerith's Theme)", role: "Melodic simplicity carrying grief" },
                  { title: "LOTR (Into the West)", role: "Celtic intimacy after orchestral intensity" },
                  { title: "Pop-punk vocals", role: "Direct, emotionally unambiguous lyrics" },
                ],
                desc: "Across the diet, the most emotionally loaded moments are scored with the simplest arrangements -- one voice, one instrument, direct lyrics. This is the Expressive communication prosthetic: music that articulates what the documented weakness (v=12, ≤10% base rate) makes harder to say. The low arrangement complexity also keeps the auditory processing cost minimal (IVA auditory: 82).",
              },
              {
                fn: "Sonic Density (Sensory Displacement)",
                color: C.violet,
                measurement: "Sensation Avoiding 50/75 · Over-aroused brain · Excessive High Beta",
                media: [
                  { title: "ILLENIUM", role: "Wall of sound, total auditory field coverage" },
                  { title: "30 Rock", role: "Joke-per-second as cognitive field saturation" },
                  { title: "F&F racing sequences", role: "Bass-driven, high BPM, physical impact" },
                  { title: "FFVII boss battles", role: "Choral + orchestral maximum density" },
                  { title: "Witcher III combat", role: "Percussion-driven intensity" },
                  { title: "Polyphia", role: "Interlocking complexity fills the pattern channel" },
                ],
                desc: "When the function is activation or displacement, the media selects maximum sonic density. The wall of sound replaces chaotic environmental input with controlled input. ILLENIUM fills the auditory field with EDM. LOTR fills it with orchestra. FFVII fills it with choir. The genre varies. The displacement function is constant.",
              },
              {
                fn: "Predictable Scoring (Regulation)",
                color: C.blue,
                measurement: "Sensation Avoiding 50/75 · Brown EF Focus T=74 · qEEG over-arousal",
                media: [
                  { title: "Psych", role: "Zero-threat, bright, never surprising" },
                  { title: "Open-world ambient", role: "Player-controlled pacing, gentle" },
                  { title: "Pop-punk catalog", role: "Known melodies from 2001-05" },
                  { title: "ILLENIUM on repeat", role: "9,400 min of known structure" },
                  { title: "Rewatch scoring", role: "Any show seen before = known soundtrack" },
                ],
                desc: "The regulation end of the spectrum. Known stimuli, known arrangements, zero novelty processing cost. Psych for sleep. Pop-punk for temporal anchoring. ILLENIUM at 9,400 minutes because the 9,401st minute is as predictable as the first. For a brain working harder than comfortable to absorb information, the familiar is not passive. It's strategic.",
              },
              {
                fn: "Pattern-Dense Instrumentation (Occipital Alpha)",
                color: C.ember,
                measurement: "Elevated Occipital Alpha · Creativity through pattern recognition",
                media: [
                  { title: "Polyphia", role: "Polyrhythmic interlocking, odd time signatures" },
                  { title: "LOTR leitmotifs", role: "80+ theme cross-references" },
                  { title: "Community genre scores", role: "Genre recognition as auditory puzzle" },
                  { title: "FFVII Remake", role: "Known themes expanded into new arrangements" },
                  { title: "Arrested Development", role: "Information density requiring reprocessing" },
                ],
                desc: "Music and media that reward the specific creativity pathway the qEEG identified -- pattern recognition and connecting dots. Not traditional artistic appreciation. Structural analysis as pleasure. The brain finds the hidden connection between two leitmotifs, two callbacks, two polyrhythmic layers, and the reward is the same creative satisfaction that drives DDL's dimensional modeling.",
              },
              {
                fn: "Absence as Architecture (Governance)",
                color: C.amber,
                measurement: "Conventional: 75 · Rule-based processing",
                media: [
                  { title: "The Wire", role: "Diegetic-only policy, exception = devastating" },
                  { title: "Seinfeld", role: "Bass interstitials as structural punctuation only" },
                  { title: "Always Sunny", role: "Minimal scoring, chaos-as-absence" },
                ],
                desc: "The Conventional profile also appreciates media where sound design follows a rule. The Wire's diegetic-only policy is a governance standard applied to scoring. Seinfeld's bass riff is structural punctuation, not emotion. The absence of a traditional score is itself a system decision -- and the operator who builds governance systems recognizes governance in sound design.",
              },
            ].map(cat => (
              <div key={cat.fn} style={{ background: C.card, border: `1px solid ${cat.color}25`, borderRadius: 8, padding: "18px 20px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cat.color, opacity: 0.4 }} />
                <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{cat.fn}</div>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: cat.color, marginBottom: 12 }}>{cat.measurement}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {cat.media.map((m, i) => (
                    <div key={m.title} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "6px 0", borderBottom: i < cat.media.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: cat.color, width: 160, flexShrink: 0 }}>{m.title}</span>
                      <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{m.role}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, marginTop: 12, padding: "10px 14px", background: cat.color + "08", borderLeft: `2px solid ${cat.color}`, borderRadius: "0 4px 4px 0" }}>
                  {cat.desc}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* CLOSING */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{
          marginTop: 32, borderLeft: `3px solid ${C.violet}`, padding: "16px 24px",
          background: C.violetDim, borderRadius: "0 6px 6px 0",
        }}>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              The sonic thread doesn't run alongside the media diet. It runs through it. 
              The same six functions -- catharsis architecture, expressive prosthetic, sensory displacement, 
              regulation, pattern feeding, and governance-as-absence -- appear in the soundtrack 
              of every show, film, and game the operator selects.
            </p>
            <p style={{ margin: 0 }}>
              ILLENIUM at 9,400 minutes is not a standalone preference. 
              It's the purest expression of a sonic architecture that selected Scrubs' Colin Hay, 
              SOA's montage liturgy, FNL's Explosions in the Sky, FFVII's Aerith's Theme, 
              and the fact that the only hip-hop artist in the Apple Music top 20 
              is the same one in the Fast and Furious franchise. 
              The thread was always there. The instruments just measured different sections of it.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.violet}, ${C.crimson}, ${C.amber}, ${C.green}, ${C.blue}, ${C.ember})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · CONSOLE · The Sonic Thread · 6 functions · 10 soundtracks · 1 listening profile
          </div>
        </div>
      </div>
    </div>
  );
}
