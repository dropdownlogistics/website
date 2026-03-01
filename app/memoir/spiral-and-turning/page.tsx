'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE SPIRAL & THE TURNING
// Excerpts 21–30 · Acts IV & V
// Thread filtering + expandable timeline cards
// Aesthetic: ultra-dark (#08090d), amber→crimson→green→pink
// ═══════════════════════════════════════════════════════════════

interface ExcerptCard {
  num: number; title: string; words: string; tone: 'addiction' | 'crisis' | 'recovery' | 'emily';
  threads: string[]; arc: string; opening: string; keyLine: string;
  structural: string; tags: { label: string; threadColor?: string }[];
  badge?: { label: string; type: string };
  actBreak?: { label: string; desc: string; color: string };
}

const COLORS = {
  bg: '#08090d', card: '#0e1117', cardHover: '#141820',
  cream: '#e8e0d0', creamDim: '#b8b0a0',
  amber: '#d4913a', crimson: '#b23531', crimsonGlow: '#d94044',
  wine: '#97072f', green: '#2d8f5e', pink: '#e879a0',
  slate: '#5a6a7e', gold: '#d4a842',
};

const TONE_COLORS = { addiction: COLORS.amber, crisis: COLORS.crimsonGlow, recovery: COLORS.green, emily: COLORS.pink };

interface ThreadDef { label: string; color: string; excerpts: string; }
const THREADS: Record<string, ThreadDef> = {
  kitchen: { label: "The Kitchen Sequence", color: COLORS.amber, excerpts: "21, 22, 23, 24, 26" },
  hiding: { label: "The Hiding System", color: COLORS.crimson, excerpts: "21, 22, 24, 25" },
  "first-drinks": { label: "The First Drinks", color: COLORS.wine, excerpts: "23, 25, 26" },
  sobriety: { label: "Sobriety Architecture", color: COLORS.green, excerpts: "22, 25, 27, 28" },
  emily: { label: "Emily\u2019s Entrance", color: COLORS.pink, excerpts: "29, 30" },
};

const EXCERPTS: ExcerptCard[] = [
  { num: 21, title: "Working, Until It Wasn\u2019t", words: "1,642", tone: "addiction", threads: ["kitchen","hiding"], arc: "Stinnett & Associates \u00b7 Kendra \u00b7 Two confrontations in one year", opening: "Liberty Tower, 13J didn\u2019t just become my place. It became a little ecosystem.", keyLine: "It didn\u2019t feel like talent. It felt like relief.", structural: "The dual confrontation structure\u2014the walk outside and the HR phone call\u2014bookends the year and establishes the pattern: competence as alibi. The electronic workpaper system Dave builds for the firm is the first time the reader sees his systems brain applied professionally. It\u2019s also the first time that brain is explicitly compensating for the addiction.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"hiding",threadColor:COLORS.crimson},{label:"Kendra"},{label:"workpapers"},{label:"airport"}], actBreak: {label:"Act IV \u2014 The Spiral",desc:"Rock bottom isn\u2019t a single event",color:COLORS.crimsonGlow} },
  { num: 22, title: "My Second Job", words: "1,604", tone: "addiction", threads: ["kitchen","hiding","sobriety"], arc: "Daily drinking \u00b7 The liquor store as employment \u00b7 Blackout as routine", opening: "At some point, the fun part stopped outweighing the price.", keyLine: "Point being: even though I hated my second job, I never called in.", structural: "The liquor-store-as-employment metaphor is the strongest structural device in this batch. The clerk knowing his order, the bottle on the counter, the commute\u2014it\u2019s a job description. The \u201Csecond job\u201D framing turns addiction from a moral failure into an operational reality. Also contains the first sobriety attempt (60 days) and the breakup that removes the last social guardrail.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"hiding",threadColor:COLORS.crimson},{label:"first sobriety",threadColor:COLORS.green},{label:"blackout"},{label:"breakup"},{label:"Alaska"}] },
  { num: 23, title: "The Second First Drink", words: "1,668", tone: "crisis", threads: ["kitchen","first-drinks"], arc: "Roosevelt\u2019s \u00b7 Cherry Street \u00b7 The optimization relapse", opening: "I remember exactly where I was when I had my second first drink.", keyLine: "The addiction never showed up as a villain. It showed up as project management.", structural: "The most structurally sophisticated excerpt in the batch. The relapse doesn\u2019t arrive as a dramatic failure\u2014it arrives as optimization. The \u201C375 for a little extra kick\u201D that becomes a 750 that becomes a liter is told with the calm precision of a project manager watching scope creep. The \u201Cproject management\u201D line is the thesis statement of the entire addiction arc.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"first drink",threadColor:COLORS.wine},{label:"Cherry Street"},{label:"375 \u2192 750 \u2192 liter"},{label:"optimization"}] },
  { num: 24, title: "Basement / Vacation Home", words: "1,431", tone: "addiction", threads: ["kitchen","hiding"], arc: "Parents\u2019 basement \u00b7 Empties as contraband \u00b7 Tulsa as permission", opening: "I moved in with my parents when I was thirty.", keyLine: "It was getting rid of bodies.", structural: "The hiding system reaches its most elaborate form. Bottles in backpacks, weekly dumpster runs, the freezer-offer from the clerk. The \u201Cvacation home\u201D structure creates a geographic split personality\u2014KC basement as containment, Tulsa condo as permission. The closing question (\u201CWhat if I left because I was trying to outrun being seen?\u201D) is the most self-aware line in the entire spiral.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"hiding",threadColor:COLORS.crimson},{label:"backpack logistics"},{label:"dumpster runs"},{label:"Liberty Tower"}] },
  { num: 25, title: "The Median", words: "~1,245", tone: "crisis", threads: ["hiding","first-drinks","sobriety"], arc: "Highway crash \u00b7 The vow \u00b7 Church fire guys \u00b7 The liquor store pull", opening: "I was in Tulsa because I was moving out. The condo was sold.", keyLine: "Ah shit. Here we go again.", structural: "Formerly two excerpts (old 25 + old 26 \u201CHere We Go Again\u201D), now merged into a single impact zone. The crash, the car damage, the vow (\u201Cno bargaining, no cut back\u201D), the church fire guys, and the liquor store pull all live in one unbroken sequence. The compression mirrors the Black Hole excerpt\u2014velocity without escape.", tags: [{label:"hiding",threadColor:COLORS.crimson},{label:"first drink",threadColor:COLORS.wine},{label:"sobriety",threadColor:COLORS.green},{label:"median"},{label:"highway"},{label:"fire group"}], badge: {label:"MERGED + PEAK",type:"peak"} },
  { num: 26, title: "The Third First Drink", words: "513", tone: "crisis", threads: ["kitchen","first-drinks"], arc: "Desk drinking \u00b7 Suicidal ideation \u00b7 Frank Costanza", opening: "The second first drink had a setting. The third first drink didn\u2019t have any of that.", keyLine: "If I don\u2019t wake up, I\u2019m fine with that.", structural: "The shortest excerpt in the manuscript. 513 words. The compression is the point\u2014the darkest moment gets the fewest words. Contains suicidal ideation treated not as dramatic climax but as quiet, practical acceptance. The Frank Costanza comparison for his dad\u2019s intervention is Dave\u2019s voice at its most characteristic: finding humor inside horror without diminishing either.", tags: [{label:"kitchen sequence",threadColor:COLORS.amber},{label:"first drink",threadColor:COLORS.wine},{label:"desk drinking"},{label:"dad"},{label:"suicidal ideation"}], badge: {label:"BLACK HOLE",type:"blackhole"} },
  { num: 27, title: "The Walrus", words: "1,310", tone: "recovery", threads: ["sobriety"], arc: "March 25, 2018 \u00b7 Detox \u00b7 BP 182/120 \u00b7 Ambien hallucination", opening: "March 25, 2018 was a Sunday.", keyLine: "Mom\u2026 is that lamp moving?", structural: "The sobriety origin story. The tone shifts from dread to absurdist comedy without losing gravity. Eight hours of sleep across five days. The Ambien hallucination sequence\u2014golf club, cops, Ring footage of nothing\u2014is the funniest scene in the manuscript and also proof that Dave\u2019s brain does its most insane work under extreme conditions. The closing line (\u201Cit wasn\u2019t even a victory, but it felt like one, and I took it\u201D) is pure earned hope.", tags: [{label:"sobriety",threadColor:COLORS.green},{label:"March 25"},{label:"Ambien"},{label:"Psych"},{label:"golf club"}] },
  { num: 28, title: "I\u2019m CEO, Bitch", words: "521", tone: "recovery", threads: ["sobriety"], arc: "Consulting \u00b7 Independence \u00b7 The reflex that doesn\u2019t win", opening: "My time at Commerce Bank was coming to a close.", keyLine: "Hey\u2026 does this call for a celebration?", structural: "The pivot excerpt. Nine months sober, independent consulting, the \u201Ccelebration reflex\u201D identified and refused. Short and purposeful. This is the first time Dave sees the thought for what it is\u2014not a desire, a reflex, an old program\u2014and doesn\u2019t act on it. Bridges Act IV (The Spiral) into Act V (The False Summit). The Dallas assignment sets up Emily\u2019s entrance.", tags: [{label:"sobriety",threadColor:COLORS.green},{label:"consulting"},{label:"celebration reflex"},{label:"Dallas"}], actBreak: {label:"Act V \u2014 The False Summit",desc:"The reader thinks the story is over",color:COLORS.pink} },
  { num: 29, title: "Coffee Meets Bagel", words: "~580", tone: "emily", threads: ["emily"], arc: "The dating gauntlet \u00b7 Tinder, Hinge, Thanksgiving girl \u00b7 The app that worked", opening: "Dating in your thirties is exactly how it looks in the movies, except nobody\u2019s attractive in the right lighting.", keyLine: "The process felt like a slot machine that occasionally insulted you.", structural: "Split from old Excerpt 30. This is Dave re-entering the world\u2014funny, self-aware, slightly bruised. The Thanksgiving girl anecdote is the comedic peak. The register is deliberately different from what follows: this is noise, and Emily is signal. Ending at the moment her profile appears gives the reader the same experience Dave had\u2014clearing the static before the frequency locks in.", tags: [{label:"Emily arc",threadColor:COLORS.pink},{label:"Tinder"},{label:"Hinge"},{label:"Thanksgiving"},{label:"CMB"}], badge: {label:"SPLIT",type:"split"} },
  { num: 30, title: "Emily", words: "~730", tone: "emily", threads: ["emily"], arc: "Sushi \u00b7 The truth bomb \u00b7 D&D \u00b7 The olive joke \u00b7 Hope", opening: "She had a flower in her hair. Big smile.", keyLine: "I\u2019m sober. I have two cats. And I live in my parents\u2019 basement.", structural: "Pure Emily. The truth-bomb opening (\u201Csober, two cats, parents\u2019 basement\u201D) is the most vulnerable moment in the manuscript that isn\u2019t about addiction or crisis. Her response (\u201CI love cats\u2026 and I live with my mom\u201D) is the structural mirror that makes the scene work. The D&D reveal and the olive joke are the two moments that confirm compatibility without forcing it. The word \u201Chope\u201D appears for the first time in the manuscript here. It earned its entrance.", tags: [{label:"Emily arc",threadColor:COLORS.pink},{label:"sushi"},{label:"D&D"},{label:"olive joke"},{label:"hope"}], badge: {label:"SPLIT",type:"split"} },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold }); obs.observe(el); return () => obs.disconnect(); }, [threshold]);
  return [ref, visible];
}

function Card({ ex, activeThread }: { ex: ExcerptCard; activeThread: string | null }) {
  const [ref, visible] = useInView(0.12);
  const [expanded, setExpanded] = useState(false);
  const toneColor = TONE_COLORS[ex.tone];
  const dimmed = activeThread && !ex.threads.includes(activeThread);
  const highlighted = activeThread && ex.threads.includes(activeThread);
  const highlightColor = highlighted && activeThread ? THREADS[activeThread]?.color : null;
  const badgeColors: Record<string, string> = { peak: COLORS.crimsonGlow, blackhole: COLORS.cream, split: COLORS.pink, merged: COLORS.gold };

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
        <div style={{ position: "absolute", left: "33px", top: "8px", width: "15px", height: "15px", borderRadius: "50%", border: `2px solid ${toneColor}`, background: COLORS.bg, zIndex: 2 }} />
        <div onClick={() => setExpanded(!expanded)} style={{
          background: expanded ? COLORS.cardHover : COLORS.card,
          border: `1px solid ${highlightColor ? `${highlightColor}33` : 'rgba(255,255,255,0.04)'}`,
          borderRadius: "8px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease",
        }}>
          <div style={{ padding: "24px 28px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", color: toneColor }}>EXCERPT {ex.num}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.05em" }}>{ex.words} words</span>
              {ex.badge && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "3px", color: badgeColors[ex.badge.type] || COLORS.slate, border: `1px solid ${badgeColors[ex.badge.type] || COLORS.slate}55`, background: ex.badge.type === 'blackhole' ? 'rgba(255,255,255,0.03)' : 'transparent' }}>{ex.badge.label}</span>}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: COLORS.cream, lineHeight: 1.2, marginBottom: "8px" }}>{ex.title}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "12px" }}>{ex.arc}</div>
            <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: COLORS.creamDim, lineHeight: 1.6, borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "16px" }}>{ex.opening}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "12px", opacity: expanded ? 0.4 : 1 }}>{expanded ? '\u2191 collapse' : '\u2193 tap to expand'}</div>
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
                    {t.threadColor && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.threadColor, display: "inline-block" }} />}{t.label}
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

export default function SpiralAndTurningPage() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.cream, minHeight: "100vh", overflowX: "hidden", opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <style>{`@keyframes breathe{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(4px)}} ::selection{background:${COLORS.crimson};color:${COLORS.cream}} ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${COLORS.bg}}::-webkit-scrollbar-thumb{background:#2A2520;border-radius:3px}`}</style>

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px 80px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 80%, rgba(212,145,58,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(178,53,49,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(45,143,94,0.03) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px", color: COLORS.slate, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = COLORS.amber)} onMouseLeave={e => (e.currentTarget.style.color = COLORS.slate)}>&larr; MEMOIR</a>
        </div>
        <div style={{ position: "relative", maxWidth: "680px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "32px" }}>Little to Know Experience &middot; Excerpts 21&ndash;30</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05, color: COLORS.cream, marginBottom: "16px" }}>
            The Spiral <span style={{ background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.crimsonGlow}, ${COLORS.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>&amp;</span><br />The Turning
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.3rem", fontStyle: "italic", color: COLORS.creamDim, maxWidth: "520px", lineHeight: 1.5, margin: "0 auto 48px" }}>Ten chapters across the darkest stretch and the first light. From desk drinking to sobriety day to the woman with a flower in her hair.</p>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center", marginBottom: "60px" }}>
            {[{n:"10",l:"Excerpts"},{n:"12.2K",l:"Words"},{n:"2",l:"Acts"},{n:"5",l:"Threads"}].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.8rem", fontWeight: 500, color: COLORS.cream, display: "block" }}>{s.n}</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.slate }}>{s.l}</span></div>
            ))}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: COLORS.slate, letterSpacing: "0.2em", animation: "breathe 3s ease-in-out infinite" }}>&darr; click threads to trace &middot; click cards to expand &darr;</div>
        </div>
      </section>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.amber, marginBottom: "24px" }}>Thematic Threads</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {Object.entries(THREADS).map(([key, t]) => (
            <div key={key} onClick={() => setActiveThread(prev => prev === key ? null : key)} style={{
              background: activeThread === key ? COLORS.cardHover : COLORS.card,
              border: `1px solid ${activeThread === key ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)'}`,
              borderRadius: "6px", padding: "14px 18px", cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "3px", height: "100%", background: t.color }} />
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: COLORS.cream, marginBottom: "4px" }}>{t.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.05em" }}>{t.excerpts}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px 120px", position: "relative" }}>
        <div style={{ position: "absolute", left: "40px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, ${COLORS.amber} 0%, ${COLORS.crimson} 35%, ${COLORS.crimsonGlow} 55%, ${COLORS.green} 80%, ${COLORS.pink} 100%)`, opacity: 0.3 }} />
        {EXCERPTS.map(ex => (<Card key={ex.num} ex={ex} activeThread={activeThread} />))}
      </section>

      <section style={{ textAlign: "center", padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "1.3rem", color: COLORS.cream, marginBottom: "20px", lineHeight: 1.5 }}>From &ldquo;if I don&rsquo;t wake up, I&rsquo;m fine with that&rdquo;<br />to a flower in her hair.</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em" }}>LITTLE TO KNOW EXPERIENCE &middot; EXCERPTS 21&ndash;30</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "6px" }}>Canonical v2.0 &middot; Dave Kitchens + Claude (Opus) &middot; March 2026</p>
      </section>
    </div>
  );
}
