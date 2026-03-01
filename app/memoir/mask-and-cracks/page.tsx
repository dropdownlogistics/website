'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE MASK & THE CRACKS
// Excerpts 11–20 · Act III — The Professional Mask
// Thread filtering + expandable timeline cards
// Aesthetic: ultra-dark (#08090d), bronze→amber→crimson progression
// ═══════════════════════════════════════════════════════════════

interface ExcerptCard {
  num: number; title: string; words: number; tone: 'glow' | 'routine' | 'crack';
  threads: string[]; arc: string; opening: string; keyLine: string;
  structural: string; tags: { label: string; threadColor?: string }[];
  badge?: { label: string; type: string };
}

const COLORS = {
  bg: '#08090d', card: '#0e1117', cardHover: '#141820',
  cream: '#e8e0d0', creamDim: '#b8b0a0',
  amber: '#d4913a', bronze: '#a67c52', crimson: '#b23531',
  crimsonGlow: '#d94044', teal: '#4a9e8e', rust: '#c45d3e',
  slate: '#5a6a7e', gold: '#d4a842',
};

const TONE_COLORS = { glow: COLORS.amber, routine: COLORS.bronze, crack: COLORS.crimsonGlow };

interface ThreadDef { label: string; color: string; excerpts: string; }
const THREADS: Record<string, ThreadDef> = {
  mask: { label: "The Professional Mask", color: COLORS.bronze, excerpts: "11, 12, 15, 17, 20" },
  kitchen: { label: "The Kitchen Sequence", color: COLORS.amber, excerpts: "13, 14, 15, 17" },
  geography: { label: "Geographic Escape", color: COLORS.teal, excerpts: "11, 12, 14, 15" },
  hiding: { label: "The Hiding System", color: COLORS.crimson, excerpts: "13, 17, 19, 20" },
  clock: { label: "The Clock", color: COLORS.rust, excerpts: "13, 16, 17, 18, 19, 20" },
};

const EXCERPTS: ExcerptCard[] = [
  { num: 11, title: "The Hill", words: 1155, tone: "glow", threads: ["mask","geography"], arc: "Graduation \u00b7 Campanile \u00b7 Louise\u2019s schooners \u00b7 The last drink with the old life", opening: "KU sits on a hill, which sounds like nothing until you\u2019ve walked it enough times that it becomes a reference point for everything else.", keyLine: "A last drink with the old life, before the next one started walking toward me.", structural: "The most openly sentimental excerpt in the manuscript. Walking down from the Campanile is the structural opposite of every climb that follows. The Boulevard Wheat schooner at Louise\u2019s is described as a \u201Cseal,\u201D not a celebration\u2014the drinking is already ceremonial rather than social. The closing image of mourning a chapter while it\u2019s still open previews every geographic escape to come.", tags: [{label:"mask",threadColor:COLORS.bronze},{label:"geography",threadColor:COLORS.teal},{label:"KU"},{label:"Campanile"},{label:"Louise\u2019s"},{label:"Boulevard Wheat"}], badge: {label:"TRANSITION",type:"transition"} },
  { num: 12, title: "Tulsa", words: 1273, tone: "glow", threads: ["mask","geography"], arc: "U-Haul convoy \u00b7 The Remington \u00b7 Trainee cohort \u00b7 Concrete stairs", opening: "We moved me to Tulsa in a U-Haul.", keyLine: "You can keep the rituals, but you can\u2019t keep the timing. Eventually the calendar starts fighting back.", structural: "The first geographic reset. The convoy leaving creates the silence that will define every new apartment. \u201CDifferent kitchen, same routine\u201D is the structural thesis of Act III. The concrete stairs scene\u2014waking up outside his own apartment with no keys\u2014is the first consequence that gets normalized. The Office quote (\u201Cthe good old days\u201D) is Dave letting the reader feel the nostalgia while he can\u2019t.", tags: [{label:"mask",threadColor:COLORS.bronze},{label:"geography",threadColor:COLORS.teal},{label:"Tulsa"},{label:"ONEOK"},{label:"concrete stairs"},{label:"Jeremy"}] },
  { num: 13, title: "The First Hiding", words: 1764, tone: "routine", threads: ["kitchen","hiding","clock"], arc: "Lawrence return \u00b7 Solo pregame \u00b7 Hibachi nausea \u00b7 Monday fear", opening: "I was in Lawrence on Thursday night.", keyLine: "Heaven forbid I\u2019m sober for a game.", structural: "The title says it all. Saturday morning, everyone asleep, Dave in the kitchen alone\u2014the first time the drinking is explicitly covert. The slideshow memory (\u201Cnot a continuous film, images\u201D) is a new narrative mode that will recur through every blackout. The hibachi nausea is the body\u2019s first rebellion. The Monday morning fear\u2014\u201Cwhat if they know?\u201D\u2014creates the template for the next five years of professional anxiety.", tags: [{label:"kitchen",threadColor:COLORS.amber},{label:"hiding",threadColor:COLORS.crimson},{label:"clock",threadColor:COLORS.rust},{label:"Lawrence"},{label:"KU football"},{label:"hibachi"},{label:"PTO"}], badge: {label:"FIRST HIDING",type:"warning"} },
  { num: 14, title: "Liberty Tower, 13J", words: 1384, tone: "routine", threads: ["kitchen","geography"], arc: "First solo place \u00b7 Faux leather couch \u00b7 Cole \u00b7 Balcony view \u00b7 Freedom as danger", opening: "Liberty Tower was the first place that was mine in a way I hadn\u2019t experienced yet.", keyLine: "There\u2019s a line between freedom and danger that you don\u2019t recognize until you\u2019ve crossed it.", structural: "The setting that will anchor the next decade. 13J is described with the precision of a staging area\u2014because that\u2019s what it becomes. Cole the cat is the first evidence of Dave building family on his own terms. The balcony as observation post. The faux leather couch as flag planted in adulthood. The closing line about freedom and danger is the Act III thesis statement. Cole staying for sixteen years is the excerpt\u2019s emotional anchor.", tags: [{label:"kitchen",threadColor:COLORS.amber},{label:"geography",threadColor:COLORS.teal},{label:"Liberty Tower"},{label:"Cole"},{label:"balcony"},{label:"15th & Boulder"}] },
  { num: 15, title: "Pre-game", words: 1141, tone: "routine", threads: ["mask","kitchen","geography"], arc: "Solo pregame \u00b7 Tulsa downtown \u00b7 McNellie\u2019s \u00b7 Arnie\u2019s \u00b7 Walking as identity", opening: "May 2010. Tulsa was doing that thing it does when it wants you to forgive it for being hot.", keyLine: "I didn\u2019t have a problem, it felt like I found the solution.", structural: "The peak of the professional mask. Everything is working: the job, the condo, the walking grid, the social circuit. The solo pregame is now standard operating procedure\u2014\u201Cmy baseline set before anyone arrived.\u201D The closing line (\u201CI found the solution\u201D) is structurally identical to Excerpt 1\u2019s thesis but inverted\u2014here it\u2019s the addiction speaking with Dave\u2019s voice.", tags: [{label:"mask",threadColor:COLORS.bronze},{label:"kitchen",threadColor:COLORS.amber},{label:"geography",threadColor:COLORS.teal},{label:"McNellie\u2019s"},{label:"Arnie\u2019s"},{label:"walking"},{label:"pregame"}] },
  { num: 16, title: "October 2009 (The Train Shot)", words: 862, tone: "routine", threads: ["clock"], arc: "Bar with train tracks \u00b7 Train shot rule \u00b7 Facebook sleuthing \u00b7 Relationship starts on rails", opening: "We met at a bar. Of course we did.", keyLine: "A rule you can follow. A reason you don\u2019t have to invent.", structural: "Intentionally placed out of chronological order\u2014the relationship backstory arrives only when the reader needs it. The train shot rule is the perfect metaphor: an external system that provides permission to drink without personal responsibility. \u201COn rails I didn\u2019t lay\u201D describes both the relationship and the addiction. The girlfriend becomes the last social cover\u2014drinking \u201Ctogether\u201D makes it invisible.", tags: [{label:"clock",threadColor:COLORS.rust},{label:"girlfriend"},{label:"train shot"},{label:"Facebook"}] },
  { num: 17, title: "CPA", words: 1833, tone: "crack", threads: ["mask","kitchen","hiding","clock"], arc: "FAR \u00b7 AUD 46 \u00b7 75 on the dot \u00b7 Champagne shower \u00b7 Drug tests \u00b7 \u201CDo I have a problem?\u201D", opening: "2010 to 2012 is the stretch where everything should have been getting better.", keyLine: "Do I have a problem?", structural: "The longest excerpt in this batch and the structural centerpiece of Act III. The CPA exam mirrors the GMAT\u2014same avoidance, higher stakes. AUD at 46 is the first real failure that can\u2019t be absorbed. 75 on the dot is survival so narrow it should be a warning. The champagne shower is celebration as performance. \u201CRandom\u201D drug tests twice. The closing question\u2014\u201Cdo I have a problem?\u201D\u2014is asked for the first time and immediately buried.", tags: [{label:"mask",threadColor:COLORS.bronze},{label:"kitchen",threadColor:COLORS.amber},{label:"hiding",threadColor:COLORS.crimson},{label:"clock",threadColor:COLORS.rust},{label:"CPA"},{label:"AUD 46"},{label:"75 exact"},{label:"Skyrim"}], badge: {label:"CRISIS",type:"crisis"} },
  { num: 18, title: "KC / The Drive Back (First Breakup)", words: 1244, tone: "crack", threads: ["clock"], arc: "NCAA tournament \u00b7 Parents\u2019 house \u00b7 Money \u00b7 Swimfan moment", opening: "It didn\u2019t happen in Tulsa.", keyLine: "My friends told me to change my locks. I didn\u2019t.", structural: "The breakup-and-return cycle that defines the relationship. The four-hour drive is a narrative pressure cooker. Dad driving to Tulsa on a random Friday is the family showing up theme that will pay off at the wedding. \u201CChange your locks\u201D / \u201CI didn\u2019t\u201D is the most efficient foreshadowing in the manuscript. The Swimfan scene\u2014her sobbing on his bed at 3 AM\u2014sets up the co-dependent loop that won\u2019t break until Alaska.", tags: [{label:"clock",threadColor:COLORS.rust},{label:"breakup"},{label:"Dad"},{label:"Swimfan"},{label:"locks"}] },
  { num: 19, title: "August 2011 (The Dewey)", words: 1703, tone: "crack", threads: ["hiding","clock"], arc: "Liter on the highway \u00b7 .182 \u00b7 Jail \u00b7 The nurse\u2019s line \u00b7 \u201CDewey?\u201D", opening: "August 2011, I drove to Kansas City for the weekend because my parents were moving into their new house and I wanted to be there.", keyLine: "I\u2019m just glad you didn\u2019t hurt anyone else.", structural: "The first legal consequence. The liter of vodka on the highway is the most dangerous single act in the manuscript. The .182 BAC while feeling sober is the data point that can\u2019t be rationalized. The nurse\u2019s line (\u201Canyone else\u201D) is the sentence that assigns Dave villain status for the first time. The \u201CDewey?\u201D exchange in the cop car is dark comedy that lands like a slap. The $1,800 bail on a credit card is consequence as transaction.", tags: [{label:"hiding",threadColor:COLORS.crimson},{label:"clock",threadColor:COLORS.rust},{label:"DUI"},{label:".182"},{label:"nurse"},{label:"jail"},{label:"Dewey"}], badge: {label:"DUI",type:"crisis"} },
  { num: 20, title: "The Aftermath", words: 1741, tone: "crack", threads: ["mask","hiding","clock"], arc: "Lawyer \u00b7 Dash-cam DVD \u00b7 Crushed cans \u00b7 DMV prank \u00b7 Diversion \u00b7 Adaptation", opening: "The day after the DUI felt like a glitch.", keyLine: "I got caught, I got scared, I adapted. And then I kept going.", structural: "The Act III closer. The lawyer\u2019s observation (\u201Cshockingly well put together for a .182\u201D) is concern disguised as fact\u2014Dave hears it as a compliment first. The dash-cam DVD he\u2019s never watched is the perfect symbol: evidence of who he was that he refuses to see. The DMV clerk\u2019s prank is the funniest moment in the darkest stretch. The victim panel is the first time consequences have real faces. The final line\u2014\u201CI adapted\u201D\u2014is the most honest sentence in the manuscript.", tags: [{label:"mask",threadColor:COLORS.bronze},{label:"hiding",threadColor:COLORS.crimson},{label:"clock",threadColor:COLORS.rust},{label:"dash-cam DVD"},{label:"diversion"},{label:"victim panel"},{label:"lampshade"},{label:"DMV"}] },
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

  const badgeColors: Record<string, string> = { transition: COLORS.amber, warning: COLORS.rust, crisis: COLORS.crimsonGlow };

  return (
    <div ref={ref} style={{
      position: "relative", paddingLeft: "80px", marginBottom: "64px",
      opacity: dimmed ? 0.15 : (visible ? 1 : 0),
      transform: visible ? "none" : "translateY(30px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{
        position: "absolute", left: "33px", top: "8px", width: "15px", height: "15px",
        borderRadius: "50%", border: `2px solid ${toneColor}`, background: COLORS.bg, zIndex: 2,
      }} />
      <div onClick={() => setExpanded(!expanded)} style={{
        background: expanded ? COLORS.cardHover : COLORS.card,
        border: `1px solid ${highlightColor ? `${highlightColor}33` : 'rgba(255,255,255,0.04)'}`,
        borderRadius: "8px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease",
      }}>
        <div style={{ padding: "24px 28px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", color: toneColor }}>EXCERPT {ex.num}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.05em" }}>{ex.words.toLocaleString()} words</span>
            {ex.badge && (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "3px", color: badgeColors[ex.badge.type] || COLORS.rust, border: `1px solid ${badgeColors[ex.badge.type] || COLORS.rust}55` }}>{ex.badge.label}</span>
            )}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: COLORS.cream, lineHeight: 1.2, marginBottom: "8px" }}>{ex.title}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "12px" }}>{ex.arc}</div>
          <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: COLORS.creamDim, lineHeight: 1.6, borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "16px" }}>{ex.opening}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "12px", opacity: expanded ? 0.4 : 1 }}>{expanded ? '\u2191 tap to collapse' : '\u2193 tap to expand'}</div>
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
  );
}

export default function MaskAndCracksPage() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.cream, minHeight: "100vh", overflowX: "hidden", opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <style>{`
        @keyframes breathe { 0%,100% { opacity:0.3; transform:translateY(0); } 50% { opacity:1; transform:translateY(4px); } }
        ::selection { background: ${COLORS.bronze}; color: ${COLORS.cream}; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:${COLORS.bg}; } ::-webkit-scrollbar-thumb { background:#2A2520; border-radius:3px; }
      `}</style>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px 80px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 25% 75%, rgba(212,145,58,0.06) 0%, transparent 50%), radial-gradient(ellipse at 75% 25%, rgba(166,124,82,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(178,53,49,0.04) 0%, transparent 60%)`, pointerEvents: "none" }} />

        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px", color: COLORS.slate, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = COLORS.bronze)}
            onMouseLeave={e => (e.currentTarget.style.color = COLORS.slate)}
          >&larr; MEMOIR</a>
        </div>

        <div style={{ position: "relative", maxWidth: "680px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.slate, marginBottom: "32px" }}>Little to Know Experience &middot; Excerpts 11&ndash;20</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05, color: COLORS.cream, marginBottom: "16px" }}>
            The Mask <span style={{ background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.bronze}, ${COLORS.crimson})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>&amp;</span><br />The Cracks
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.3rem", fontStyle: "italic", color: COLORS.creamDim, maxWidth: "540px", lineHeight: 1.5, margin: "0 auto 48px" }}>Graduation to DUI aftermath. The decade where competence was the alibi and geography was the escape plan.</p>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center", marginBottom: "60px" }}>
            {[{n:"10",l:"Excerpts"},{n:"16.1K",l:"Words"},{n:"1",l:"Act"},{n:"5",l:"Threads"}].map(s => (
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
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bronze, marginBottom: "24px" }}>Thematic Threads</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {Object.entries(THREADS).map(([key, t]) => (
            <div key={key} onClick={() => setActiveThread(prev => prev === key ? null : key)} style={{
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
        <div style={{ position: "absolute", left: "40px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, ${COLORS.amber} 0%, ${COLORS.bronze} 40%, ${COLORS.crimson} 80%, ${COLORS.crimsonGlow} 100%)`, opacity: 0.3 }} />

        {/* Act divider */}
        <div style={{ position: "relative", paddingLeft: "80px", marginBottom: "48px", marginTop: "16px" }}>
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)", marginBottom: "12px" }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bronze }}>Act III &mdash; The Professional Mask</div>
          <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: COLORS.creamDim, marginTop: "4px" }}>Hiding inside professionalism</div>
        </div>

        {EXCERPTS.map(ex => (<Card key={ex.num} ex={ex} activeThread={activeThread} />))}
      </section>

      {/* Footer */}
      <section style={{ textAlign: "center", padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "1.3rem", color: COLORS.cream, marginBottom: "20px", lineHeight: 1.5 }}>From &ldquo;a last drink with the old life&rdquo;<br />to &ldquo;I got caught. I got scared. I adapted.&rdquo;</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em" }}>LITTLE TO KNOW EXPERIENCE &middot; EXCERPTS 11&ndash;20</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.slate, letterSpacing: "0.1em", marginTop: "6px" }}>Canonical v2.0 &middot; Dave Kitchens + Claude (Opus) &middot; March 2026</p>
      </section>
    </div>
  );
}
