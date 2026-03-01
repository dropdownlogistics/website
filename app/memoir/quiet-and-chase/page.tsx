'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE QUIET & THE CHASE
// Excerpts 1–10 · Acts I & II
// Thread filtering + expandable timeline cards
// Aesthetic: ultra-dark (#08090d), gold→amber→copper progression
// ═══════════════════════════════════════════════════════════════

interface ExcerptCard {
  num: number; title: string; words: number; tone: 'innocence' | 'discovery' | 'pattern';
  threads: string[]; arc: string; opening: string; keyLine: string;
  structural: string; tags: { label: string; threadColor?: string }[];
  badge?: { label: string; type: string };
  actBreak?: { label: string; desc: string; color: string };
}

const COLORS = {
  bg: '#08090d', card: '#0e1117', cardHover: '#141820',
  cream: '#e8e0d0', creamDim: '#b8b0a0',
  gold: '#c9a84c', amber: '#d4913a', copper: '#b87333',
  teal: '#4a9e8e', blue: '#5b8fb9', slate: '#5a6a7e',
};

const TONE_COLORS = { innocence: COLORS.gold, discovery: COLORS.amber, pattern: COLORS.copper };

interface ThreadDef { label: string; color: string; excerpts: string; }
const THREADS: Record<string, ThreadDef> = {
  quiet: { label: "The Quiet", color: COLORS.gold, excerpts: "1, 2, 3, 6, 7" },
  kitchen: { label: "The Kitchen Sequence", color: COLORS.amber, excerpts: "1, 6, 7, 8, 10" },
  experiment: { label: "The Experiment", color: COLORS.teal, excerpts: "2, 3, 4, 5" },
  permission: { label: "Social Permission", color: COLORS.blue, excerpts: "4, 5, 7, 8, 10" },
  math: { label: "The Math", color: COLORS.copper, excerpts: "1, 3, 4, 6, 9, 10" },
};

const EXCERPTS: ExcerptCard[] = [
  { num: 1, title: "Perspective", words: 1438, tone: "innocence", threads: ["quiet","kitchen","math"], arc: "Framing device \u00b7 The loud mind \u00b7 Summer night \u00b7 McCormick\u2019s ritual", opening: "The first stretch of time where I could function without fighting myself happened quietly.", keyLine: "I didn\u2019t drink because I was trying to destroy my life. I drank because it made me feel like I could live it.", structural: "The thesis statement of the entire memoir. Opens in present-tense sobriety, then spirals backward to the loud mind, the summer lake, the sister asking \u201Cwhy are you drinking?\u201D Contains the first appearance of the McCormick\u2019s kitchen ritual (freezer \u2192 counter \u2192 pour) that will recur across all seven acts. The frame device means the reader already knows Dave survives\u2014the question is how.", tags: [{label:"the quiet",threadColor:COLORS.gold},{label:"kitchen sequence",threadColor:COLORS.amber},{label:"the math",threadColor:COLORS.copper},{label:"sister"},{label:"refrigerator hum"},{label:"frame device"}], badge: {label:"FRAME",type:"frame"}, actBreak: {label:"Act I \u2014 The Foundation",desc:"Before the first drink",color:COLORS.gold} },
  { num: 2, title: "Lake Night", words: 1923, tone: "innocence", threads: ["quiet","experiment"], arc: "Thorndale \u00b7 Warm Guinness \u00b7 J\u00e4ger \u00b7 Austin \u00b7 The absence of argument", opening: "Once high school was over, there was nothing left to protect, so I wanted to see what \u201Cdrunk\u201D really felt like.", keyLine: "The absence of argument.", structural: "The longest excerpt in this batch and the purest piece of sensory writing in the manuscript. The warm Guinness rejected, the J\u00e4ger accepted\u2014the body itself choosing the tool. The Austin confession scene is the first time Dave speaks unfiltered, and the fact that it\u2019s safe is what makes alcohol sticky. The \u201Cabsence of argument\u201D is the thesis of Act I\u2014not pleasure, relief.", tags: [{label:"the quiet",threadColor:COLORS.gold},{label:"experiment",threadColor:COLORS.teal},{label:"Thorndale"},{label:"Austin"},{label:"stars"},{label:"Emporia"}], badge: {label:"ORIGIN",type:"origin"} },
  { num: 3, title: "The Coming Storm", words: 1580, tone: "innocence", threads: ["quiet","experiment","math"], arc: "Country pond \u00b7 Southern Comfort \u00b7 Thunderstorm \u00b7 Stuck truck \u00b7 The hangover deal", opening: "It wasn\u2019t long after Thorndale.", keyLine: "The terms felt acceptable.", structural: "The first cost-benefit analysis. The storm is both literal and structural\u2014the first time nature forces consequences into the frame. The Ford Ranger stuck in mud is the first \u201Cadult witness\u201D moment (the host\u2019s dad with the tow strap). The closing line\u2014\u201Cthe terms felt acceptable\u201D\u2014is the most dangerous sentence in the foundation. It\u2019s the moment the math begins.", tags: [{label:"the quiet",threadColor:COLORS.gold},{label:"experiment",threadColor:COLORS.teal},{label:"the math",threadColor:COLORS.copper},{label:"Southern Comfort"},{label:"storm"},{label:"stuck truck"},{label:"chores"}] },
  { num: 4, title: "3 South", words: 1573, tone: "discovery", threads: ["experiment","permission","math"], arc: "McCollum dorms \u00b7 12 shots in 15 minutes \u00b7 Failed quiz \u00b7 Survival as proof", opening: "Freshman year, fall semester, McCollum dorms, 3 South.", keyLine: "I learned my limits existed. I did not learn to respect them.", structural: "The most structurally important excerpt in Act I. Contains the first blackout, the first academic consequence (Accounting 200 quiz), and the birth of the most dangerous mental trick: survival as evidence of safety. The 12-shots-in-15-minutes detail establishes Dave\u2019s sprint-not-sip relationship with alcohol. The blue Powerade detail is sensory memory at its most embodied\u2014he still can\u2019t drink it.", tags: [{label:"experiment",threadColor:COLORS.teal},{label:"permission",threadColor:COLORS.blue},{label:"the math",threadColor:COLORS.copper},{label:"McCollum"},{label:"blackout"},{label:"Powerade"},{label:"Accounting 200"}], badge: {label:"THESIS",type:"thesis"} },
  { num: 5, title: "Drink Drink Drink", words: 1078, tone: "discovery", threads: ["experiment","permission"], arc: "Keg in a luggage cart \u00b7 RA freeze-frame \u00b7 Permission as infrastructure", opening: "It was probably a month or two after the Wednesday-night J\u00e4ger incident.", keyLine: "I played a role in getting a keg to the people. That mattered to me more than the beer did.", structural: "The comedy excerpt. The keg-in-a-luggage-cart heist and the RA freeze-frame are the manuscript\u2019s funniest set pieces. But the structural function is darker: the RA\u2019s little smile is the first time authority endorses the behavior. \u201CI felt allowed\u201D is the operative line\u2014not rebellious, allowed. The involvement-as-intoxication theme previews the systems-builder identity that will define Dave\u2019s career.", tags: [{label:"experiment",threadColor:COLORS.teal},{label:"permission",threadColor:COLORS.blue},{label:"keg heist"},{label:"RA"},{label:"involvement"}] },
  { num: 6, title: "The Dance", words: 1406, tone: "discovery", threads: ["quiet","kitchen","math"], arc: "Garage conversion \u00b7 Productive drunk \u00b7 Drag coefficient \u00b7 Filed as useful", opening: "Sophomore year, my brother and I had a house.", keyLine: "It was that the drag coefficient disappeared.", structural: "The addiction\u2019s most seductive argument. The garage conversion is the first time Dave builds something while drinking, and the satisfaction of creation obscures the mechanism. \u201CWhat kind of problem helps you build a bedroom out of a garage?\u201D is the rhetorical question the addiction uses to defend itself for the next decade. The \u201Cdrag coefficient\u201D metaphor will become the key to understanding the ADHD diagnosis in Act VI.", tags: [{label:"the quiet",threadColor:COLORS.gold},{label:"kitchen sequence",threadColor:COLORS.amber},{label:"the math",threadColor:COLORS.copper},{label:"garage"},{label:"projector"},{label:"productivity"},{label:"KU flag"}], badge: {label:"KEY",type:"thesis"}, actBreak: {label:"Act II \u2014 The Discovery",desc:"Alcohol as solution, ritual begins",color:COLORS.amber} },
  { num: 7, title: "The Rhythm", words: 869, tone: "pattern", threads: ["quiet","kitchen","permission"], arc: "Manual transmission \u00b7 Shot glass choreography \u00b7 The comfort before the drink", opening: "At the beginning, it had reasons.", keyLine: "The comfort started before the alcohol did.", structural: "The kitchen sequence fully articulated. Freezer \u2192 cold air \u2192 grab \u2192 pivot \u2192 cabinet \u2192 clink \u2192 pour. The \u201Cmanual transmission\u201D metaphor nails the muscle memory, and the revelation that relief begins at setup, not consumption, is structurally critical. This is where the addiction stops being about the substance and starts being about the choreography. The row of shot glasses as \u201Cpunctuation\u201D is the image that will recur through every kitchen in the memoir.", tags: [{label:"the quiet",threadColor:COLORS.gold},{label:"kitchen sequence",threadColor:COLORS.amber},{label:"permission",threadColor:COLORS.blue},{label:"manual transmission"},{label:"shot glasses"},{label:"choreography"}], badge: {label:"RITUAL",type:"thesis"} },
  { num: 8, title: "Loneliness or Freedom?", words: 751, tone: "pattern", threads: ["kitchen","permission"], arc: "Empty house \u00b7 Drinking alone \u00b7 Drunk texts \u00b7 Delete as cleanup", opening: "The house didn\u2019t change. The audience did.", keyLine: "The only problem was the pattern didn\u2019t care what I called it.", structural: "The pivot between social drinking and solitary drinking. The roommates leave and the audience disappears, but the kitchen stays the same. The drunk-text-and-delete ritual is the first information management system Dave builds\u2014controlling the narrative by erasing evidence. \u201CLoneliness or Freedom?\u201D as a title forces the reader to hold both truths simultaneously.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"permission",threadColor:COLORS.blue},{label:"alone"},{label:"drunk texts"},{label:"delete"}] },
  { num: 9, title: "GMAT", words: 763, tone: "pattern", threads: ["math"], arc: "No studying \u00b7 610 score \u00b7 Matt\u2019s roast \u00b7 Winging it as identity", opening: "The GMAT lived in my head for months like a notification I couldn\u2019t swipe away.", keyLine: "I could wing it. I could survive. I could get what I wanted without doing the work. That was the lesson I took from it. Not the one I should have.", structural: "The ADHD excerpt before anyone knows it\u2019s about ADHD. \u201CTasks I couldn\u2019t start, even when I wanted the outcome badly\u201D is the first clean description of executive dysfunction in the manuscript. Matt\u2019s hyena laugh appears for the first time\u2014the same laugh that will haunt Excerpt 34. The 610 score becomes proof that brute-force survival works, which trains the worst possible belief system for the next decade.", tags: [{label:"the math",threadColor:COLORS.copper},{label:"GMAT"},{label:"Matt"},{label:"procrastination"},{label:"ADHD preview"}] },
  { num: 10, title: "21", words: 902, tone: "pattern", threads: ["kitchen","permission","math"], arc: "Quinton\u2019s \u00b7 Prairie Fire \u00b7 Kristen \u00b7 Dragged to bed \u00b7 Smartest Guys in the Room", opening: "I turned twenty-one in Lawrence, which meant the night had a built-in storyline.", keyLine: "Yeah. This is fine.", structural: "The Act II closer. The pregame math begins in the kitchen (\u201Csame as always\u201D), which means the ritual is now load-bearing infrastructure. Prairie Fire shot from Kristen is the comedy beat. Being dragged to bed is the first physical collapse, normalized instantly. The final scene\u2014watching a documentary about Enron in a dark classroom, hungover, thinking \u201Cthis is fine\u201D\u2014is the structural mirror for the entire memoir: watching a disaster while living inside one.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"permission",threadColor:COLORS.blue},{label:"the math",threadColor:COLORS.copper},{label:"Quinton\u2019s"},{label:"Kristen"},{label:"Prairie Fire"},{label:"Enron"}] },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Card({ ex, activeThread }: { ex: ExcerptCard; activeThread: string | null }) {
  const [ref, visible] = useInView(0.12);
  const [expanded, setExpanded] = useState(false);
  const toneColor = TONE_COLORS[ex.tone];
  const dimmed = activeThread && !ex.threads.includes(activeThread);
  const highlighted = activeThread && ex.threads.includes(activeThread);
  const highlightColor = highlighted && activeThread ? THREADS[activeThread]?.color : null;

  const badgeColors: Record<string, string> = { frame: COLORS.gold, origin: COLORS.teal, thesis: COLORS.amber };

  return (
    <>
      {ex.actBreak && (
        <div style={{ position: "relative", paddingLeft: "80px", marginBottom: "48px", marginTop: "16px" }}>
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)", marginBottom: "12px" }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: ex.actBreak.color }}>{ex.actBreak.label}</div>
          <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: COLORS.creamDim, marginTop: "4px" }}>{ex.actBreak.desc}</div>
        </div>
      )}
      <div ref={ref} style={{
        position: "relative", paddingLeft: "80px", marginBottom: "64px",
        opacity: dimmed ? 0.15 : (visible ? 1 : 0),
        transform: visible ? "none" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div style={{
          position: "absolute", left: "33px", top: "8px", width: "15px", height: "15px",
          borderRadius: "50%", border: `2px solid ${toneColor}`, background: COLORS.bg, zIndex: 2,
          transition: "all 0.3s ease",
        }} />
        <div onClick={() => setExpanded(!expanded)} style={{
          background: expanded ? COLORS.cardHover : COLORS.card,
          border: `1px solid ${highlightColor ? `${highlightColor}33` : 'rgba(255,255,255,0.04)'}`,
          borderRadius: "8px", overflow: "hidden", cursor: "pointer",
          transition: "all 0.3s ease",
        }}>
          <div style={{ padding: "24px 28px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", color: toneColor }}>EXCERPT {ex.num}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.05em" }}>{ex.words.toLocaleString()} words</span>
              {ex.badge && (
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "3px", color: badgeColors[ex.badge.type] || COLORS.amber, border: `1px solid ${badgeColors[ex.badge.type] || COLORS.amber}55` }}>{ex.badge.label}</span>
              )}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: COLORS.cream, lineHeight: 1.2, marginBottom: "8px" }}>{ex.title}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "12px" }}>{ex.arc}</div>
            <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: COLORS.creamDim, lineHeight: 1.6, borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "16px" }}>{ex.opening}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "12px", opacity: expanded ? 0.4 : 1, transition: "opacity 0.3s" }}>{expanded ? '\u2191 tap to collapse' : '\u2193 tap to expand'}</div>
          </div>
          <div style={{ maxHeight: expanded ? "800px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
            <div style={{ padding: "0 28px 28px" }}>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "20px 0" }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "10px" }}>Key Line</div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.2rem", fontStyle: "italic", color: COLORS.cream, lineHeight: 1.5, marginBottom: "8px" }}>&ldquo;{ex.keyLine}&rdquo;</div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "20px 0" }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "10px" }}>Structural Note</div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: COLORS.creamDim, lineHeight: 1.6 }}>{ex.structural}</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "16px" }}>
                {ex.tags.map(t => (
                  <span key={t.label} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: COLORS.slate, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: "3px", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "4px" }}>
                    {t.threadColor && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.threadColor, display: "inline-block" }} />}
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function QuietAndChasePage() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const toggleThread = (thread: string) => {
    setActiveThread(prev => prev === thread ? null : thread);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.cream, minHeight: "100vh", overflowX: "hidden", opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <style>{`
        @keyframes breathe { 0%,100% { opacity:0.3; transform:translateY(0); } 50% { opacity:1; transform:translateY(4px); } }
        ::selection { background: ${COLORS.amber}; color: ${COLORS.bg}; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:${COLORS.bg}; } ::-webkit-scrollbar-thumb { background:#2A2520; border-radius:3px; }
        @media (max-width:640px) { .tl-card { padding-left:52px !important; } }
      `}</style>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px 80px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(212,145,58,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(74,158,142,0.03) 0%, transparent 60%)`, pointerEvents: "none" }} />

        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px", color: COLORS.slate, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = COLORS.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = COLORS.slate)}
          >&larr; MEMOIR</a>
        </div>

        <div style={{ position: "relative", maxWidth: "680px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "32px" }}>Little to Know Experience &middot; Excerpts 1&ndash;10</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05, color: COLORS.cream, marginBottom: "16px" }}>
            The Quiet <span style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber}, ${COLORS.copper})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>&amp;</span><br />The Chase
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.3rem", fontStyle: "italic", color: COLORS.creamDim, maxWidth: "540px", lineHeight: 1.5, marginBottom: "48px", margin: "0 auto 48px" }}>Before the first drink and after it. The summer the humming stopped, the year the ritual began, and the math that made it all feel reasonable.</p>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center", marginBottom: "60px" }}>
            {[{n:"10",l:"Excerpts"},{n:"14.8K",l:"Words"},{n:"2",l:"Acts"},{n:"5",l:"Threads"}].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.8rem", fontWeight: 500, color: COLORS.cream, display: "block" }}>{s.n}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.slate }}>{s.l}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: COLORS.slate, letterSpacing: "0.2em", animation: "breathe 3s ease-in-out infinite" }}>&darr; click threads to trace &middot; click cards to expand &darr;</div>
        </div>
      </section>

      {/* Thread pills */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "24px" }}>Thematic Threads</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {Object.entries(THREADS).map(([key, t]) => (
            <div key={key} onClick={() => toggleThread(key)} style={{
              background: activeThread === key ? COLORS.cardHover : COLORS.card,
              border: `1px solid ${activeThread === key ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)'}`,
              borderRadius: "6px", padding: "14px 18px", cursor: "pointer",
              transition: "all 0.3s ease", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "3px", height: "100%", background: t.color }} />
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: COLORS.cream, marginBottom: "4px" }}>{t.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.05em" }}>{t.excerpts}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px 120px", position: "relative" }}>
        <div style={{ position: "absolute", left: "40px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, ${COLORS.gold} 0%, ${COLORS.amber} 40%, ${COLORS.copper} 70%, ${COLORS.amber} 100%)`, opacity: 0.3 }} />
        {EXCERPTS.map(ex => (<Card key={ex.num} ex={ex} activeThread={activeThread} />))}
      </section>

      {/* Footer */}
      <section style={{ textAlign: "center", padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "1.3rem", color: COLORS.cream, marginBottom: "20px", lineHeight: 1.5 }}>From &ldquo;the inside of my head got dimmer&rdquo;<br />to &ldquo;yeah, this is fine.&rdquo;</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em" }}>LITTLE TO KNOW EXPERIENCE &middot; EXCERPTS 1&ndash;10</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "6px" }}>Canonical v2.0 &middot; Dave Kitchens + Claude (Opus) &middot; March 2026</p>
      </section>
    </div>
  );
}
