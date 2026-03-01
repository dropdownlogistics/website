'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE FALSE SUMMIT
// Excerpts 31–40 · Sobriety Holds, Everything Else Breaks
// Dual-line tension visualization + excerpt deep dives
// Preserved aesthetic: warm dark (#12100D)
// ═══════════════════════════════════════════════════════════════

interface MeterData { level: number; note: string; }
interface ReflexData { type: string; note: string; }
interface ThreadInfo { label: string; color: string; }

interface ExcerptData {
  id: number; title: string; subtitle: string;
  place: string; sobriety: MeterData; instability: MeterData;
  reflex: ReflexData | null; moment: string; told: string; truth: string;
  thread: string; color: string; emotionalPeak: string;
  structural?: string;
}

const EXCERPTS: ExcerptData[] = [
  { id: 31, title: "The Road", subtitle: "And the Month the World Stopped", place: "Airports \u2192 Houston \u2192 Kansas City", sobriety: { level: 8, note: "Two-year anniversary. Sobriety as foundation." }, instability: { level: 2, note: "Travel work is good. Emily is supportive. Money is real." }, reflex: null, moment: "Hourly consulting. Points. Excel as survival language. Sunday goodbyes at the airport. Then COVID empties the terminals, kills the client, kills the company. Emily\u2019s hospital won\u2019t give her PPE. They don\u2019t collapse \u2014 they get closer.", told: "The money and the momentum were too good to pass up.", truth: "When travel died, the work died with it. My company never had consistent work again.", thread: "stability", color: "#3B82F6", emotionalPeak: "The airports thinning out. Whole rows empty. The simulation glitching." },
  { id: 32, title: "Quarterly SOX Reporting", subtitle: "The Proposal", place: "Mondo Condo \u2192 D&D table", sobriety: { level: 9, note: "Sober enough to scheme. Clear enough to plan a heist." }, instability: { level: 1, note: "COVID is the backdrop but the relationship is the foreground." }, reflex: null, moment: "Proposed during a D&D campaign. Group chat named \u2018Quarterly SOX Reporting\u2019 to hide the plan. Bought her a Mac Mini to keep her off his computer. D20 ring box, 3D printed. She said yes the moment he stood up.", told: "How do you propose during COVID without it feeling like giving up?", truth: "For the first time since the world stopped, I felt something simple and clean: forward.", thread: "emily", color: "#E879A0", emotionalPeak: "Emily said the moment it clicked wasn\u2019t when he spoke \u2014 it was when he started moving." },
  { id: 33, title: "Mondo Condo", subtitle: "Austin, F&F, and Getting Fired", place: "Monrovia house \u2192 tax firm \u2192 partner\u2019s office", sobriety: { level: 7, note: "Old pathways light up. He hears the pitch. Doesn\u2019t take it." }, instability: { level: 6, note: "Hired for a job that didn\u2019t exist. Fired for not enjoying the replacement." }, reflex: { type: "refused", note: "\u201CFor a split second, my mind reached for a drink. Not a bender. Just the old familiar fantasy: one shortcut to quiet.\u201D" }, moment: "Three-floor house with Austin and Emily. Chiminea on the patio. Took a tax job that was supposed to be consulting. It wasn\u2019t. Identity dissonance. Got called into a partner\u2019s office before he could quit. \u2018This isn\u2019t a fit.\u2019", told: "Like the shoe had already dropped and this was the clean part where you pick it up.", truth: "Embarrassment doesn\u2019t care about facts. It\u2019s your body keeping score even when your brain is arguing the grading rubric.", thread: "career", color: "#F59E0B", emotionalPeak: "The room was already staged. The people in it were props, not participants." },
  { id: 34, title: "Loose Ends", subtitle: "Matt", place: "Driveway \u2192 car \u2192 nowhere he can name", sobriety: { level: 10, note: "The memoir\u2019s proof of concept. He doesn\u2019t drink. Matt is the reason." }, instability: { level: 10, note: "Best friend dies. No warning. No goodbye. A jacket was the last conversation." }, reflex: { type: "refused", note: "\u201CWheels turned toward the liquor store. Grief as a hall pass. Pain as a reason. Then something else rose up. Matt. He would have wanted me alive.\u201D" }, moment: "Shoveling snow. Text from Matt\u2019s wife. \u2018He might not make it.\u2019 Booked a flight. Couldn\u2019t get out that day. \u2018We lost him.\u2019 Kept driving. Didn\u2019t pull over. The last thing they talked about was a jacket. Old Navy. Matt was a cheapskate.", told: "Is this a joke? Not as in funny. As in: this cannot be real.", truth: "I lost a brother. And I still have his contact in my phone.", thread: "grief", color: "#9B111E", emotionalPeak: "\u201CWhy did he have to go? I was the alcoholic.\u201D", structural: "The emotional peak of the entire memoir. The one crisis Dave didn\u2019t cause." },
  { id: 35, title: "Benched", subtitle: "The Pool and the Startup", place: "Mondo Condo pool \u2192 rural hospital books", sobriety: { level: 8, note: "Stable. Not panicking. A new kind of okay." }, instability: { level: 5, note: "Unemployed again. Money leaving, not arriving. Then a mess that needs him." }, reflex: null, moment: "On the bench at Stinnett. Two months of nothing. Pool. Walks. Reading. Summer as sabbatical. Then the startup: untangle bank accounts from the previous CFO. Archaeology, not accounting. Offered the controller job. Took it. Should\u2019ve read the warning on the wall.", told: "I could get used to this. It felt like freedom.", truth: "Time, real unstructured time, always comes with a bill.", thread: "career", color: "#F59E0B", emotionalPeak: "The pool stopped feeling like a vibe and started feeling like a delay." },
  { id: 36, title: "Our People", subtitle: "The Wedding", place: "Lodge near La Cygne, KS", sobriety: { level: 9, note: "Alcohol was there. It wasn\u2019t the plot. Coffee and bagels during photos." }, instability: { level: 0, note: "The day holds. Everyone shows up. Nothing breaks that matters." }, reflex: null, moment: "November 13, 2021. Sixteen months after the proposal. First look at a gazebo. His little brother, chain and all, with a tear in his eye. A wasp assassinated by the wedding planner. Sparkler exit. Bundtinis on the bed. Quiet. The exhale.", told: "We weren\u2019t throwing a party anymore.", truth: "We were married. And for once in my life, I didn\u2019t try to outrun the moment.", thread: "emily", color: "#E879A0", emotionalPeak: "Same smile. Different universe.", structural: "The longest excerpt in the manuscript. 2,132 words. Where the narrator had the most language." },
  { id: 37, title: "Material Weakness", subtitle: "The Hospital Startup", place: "Laguna Beach \u2192 the fog", sobriety: { level: 7, note: "Old reflex offers the shortcut. Sobriety gives him clarity instead." }, instability: { level: 8, note: "Payroll stops. The company is a fog machine. Nobody gets paid." }, reflex: { type: "refused", note: "\u201CMy brain still offers me the shortcut. The warm silence. The off switch. But sobriety gave me something better than numb. It gave me clarity.\u201D" }, moment: "Honeymoon in Laguna Beach. Then the inbox. Controller of a startup that\u2019s quietly dying. By April: \u2018Are we going to make payroll?\u2019 Uncertainty as a control system. Fog machine with precision. They found each other in the mess. Still haven\u2019t been paid.", told: "Give me a pile of mismatched bank activity and I\u2019ll give you a system.", truth: "By April, we stopped getting paid. To this day, we still haven\u2019t been paid.", thread: "career", color: "#F59E0B", emotionalPeak: "It wasn\u2019t one lie. It was all of us realizing we had been isolated on purpose." },
  { id: 38, title: "Going Concern", subtitle: "Divine Intervention", place: "The pool \u2192 Kendra\u2019s phone call", sobriety: { level: 8, note: "Not the drinking instinct. The escape hatch instinct." }, instability: { level: 6, note: "Unemployed again. Took a job he didn\u2019t want. Manager made it worse." }, reflex: null, moment: "Another job. Another bad manager. Every task rerouted through control. Then the phone rang at the pool. Kendra. CBIZ acquired Stinnett. Full-time role. Senior associate. It felt like divine intervention.", told: "Once I got moving again, the gaps wouldn\u2019t matter.", truth: "Wrong again.", thread: "career", color: "#F59E0B", emotionalPeak: "Like the universe had finally looped back around and handed me the correct door." },
  { id: 39, title: "To The Moon", subtitle: "Data Analytics", place: "Remote \u2192 the fun part of the building", sobriety: { level: 8, note: "Building is relief. Focus. How his brain goes quiet without the trade." }, instability: { level: 2, note: "Right role. Good manager. Raise on the same day as promotion. Runway." }, reflex: null, moment: "Remote work as health supplement. Boring project, then a difficult client. Manager calls: \u2018You did great today.\u2019 First win in a long time. Data analytics role opens. Same day: raise. Getting paid to build video games.", told: "This was the one that was going to stick.", truth: "At least, that\u2019s what I thought.", thread: "career", color: "#3B82F6", emotionalPeak: "It wasn\u2019t the praise that mattered. It was the confirmation. I still knew how to do this." },
  { id: 40, title: "Whiplash", subtitle: "The Partner\u2019s Baby", place: "Tampa conference \u2192 the inbox \u2192 the floor moving", sobriety: { level: 6, note: "Sobriety holds \u2014 but the brain is speeding up. Something new is building." }, instability: { level: 9, note: "Reprimand at a conference. Control disguised as management. Hours pulled. 75% billable." }, reflex: null, moment: "Alteryx conference in Tampa. Reprimand in the inbox before the suitcase hit the floor. The partner\u2019s spreadsheet was his baby \u2014 Dave improving it looked like calling it ugly. Senior manager told the partner she couldn\u2019t control him. The woman who mentored him. The one he invited to his wedding. Hours dried up. 75% billable. And inside: thoughts speeding up, sleep getting weird, decisions feeling consequence-free.", told: "I was not about to make a career-limiting move in Tampa.", truth: "My thoughts sped up. My sleep got weird. And I started making decisions like the consequences were optional.", thread: "acceleration", color: "#8B5CF6", emotionalPeak: "The senior manager wasn\u2019t a stranger. She was a person who had mentored me. It doesn\u2019t make sense now.", structural: "The fulcrum. Where the second crisis begins. The brain that survived addiction is now running without a governor." },
];

const THREADS: Record<string, ThreadInfo> = {
  stability: { label: "Stability", color: "#3B82F6" },
  emily: { label: "Emily", color: "#E879A0" },
  career: { label: "Career", color: "#F59E0B" },
  grief: { label: "Grief", color: "#9B111E" },
  acceleration: { label: "Acceleration", color: "#8B5CF6" },
};

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, vis] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(36px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function TensionGraph() {
  const [ref, vis] = useInView(0.1);
  const W = 520, H = 140, PAD = 30;
  const n = EXCERPTS.length;
  const pts = (key: 'sobriety' | 'instability') => EXCERPTS.map((e, i) => ({
    x: PAD + (i / (n - 1)) * (W - PAD * 2),
    y: PAD + (1 - e[key].level / 10) * (H - PAD * 2),
  }));
  const sob = pts("sobriety");
  const inst = pts("instability");
  const line = (arr: { x: number; y: number }[]) => arr.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = (arr: { x: number; y: number }[]) => line(arr) + ` L${arr[arr.length - 1].x},${H - PAD} L${arr[0].x},${H - PAD} Z`;

  return (
    <div ref={ref} style={{ margin: "0 auto 60px", maxWidth: "560px" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ opacity: vis ? 1 : 0, transition: "opacity 1s ease 0.2s" }}>
        <defs>
          <linearGradient id="sobFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(45,143,94,0.12)" /><stop offset="100%" stopColor="transparent" /></linearGradient>
          <linearGradient id="instFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(155,17,30,0.1)" /><stop offset="100%" stopColor="transparent" /></linearGradient>
        </defs>
        {[0, 2.5, 5, 7.5, 10].map(v => {
          const y = PAD + (1 - v / 10) * (H - PAD * 2);
          return <line key={v} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />;
        })}
        <path d={area(sob)} fill="url(#sobFill)" style={{ opacity: vis ? 1 : 0, transition: "opacity 1.2s ease 0.4s" }} />
        <path d={area(inst)} fill="url(#instFill)" style={{ opacity: vis ? 1 : 0, transition: "opacity 1.2s ease 0.5s" }} />
        <path d={line(sob)} fill="none" stroke="#2D8F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 800, strokeDashoffset: vis ? 0 : 800, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
        <path d={line(inst)} fill="none" stroke="#9B111E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 800, strokeDashoffset: vis ? 0 : 800, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.5s" }} />
        {sob.map((p, i) => (<circle key={`s${i}`} cx={p.x} cy={p.y} r="3" fill="#2D8F5E" stroke="#12100D" strokeWidth="1.5" style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.08}s` }} />))}
        {inst.map((p, i) => (<circle key={`i${i}`} cx={p.x} cy={p.y} r="3" fill="#9B111E" stroke="#12100D" strokeWidth="1.5" style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.7 + i * 0.08}s` }} />))}
        <line x1={sob[3].x} y1={PAD - 5} x2={sob[3].x} y2={H - PAD + 5} stroke="rgba(155,17,30,0.25)" strokeWidth="1" strokeDasharray="3,3" />
        <line x1={sob[9].x} y1={PAD - 5} x2={sob[9].x} y2={H - PAD + 5} stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="3,3" />
        {EXCERPTS.map((e, i) => (<text key={e.id} x={PAD + (i / (n - 1)) * (W - PAD * 2)} y={H - 4} textAnchor="middle" fill="#4A4139" fontSize="8" fontFamily="'JetBrains Mono', monospace">{e.id}</text>))}
      </svg>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "8px" }}>
        {[{ label: "Sobriety", color: "#2D8F5E" }, { label: "Instability", color: "#9B111E" }].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "16px", height: "3px", background: l.color, borderRadius: "2px" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#6B5F52" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReflexBadge({ reflex }: { reflex: ReflexData | null }) {
  if (!reflex) return null;
  return (
    <div style={{ background: "rgba(155,17,30,0.06)", border: "1px solid rgba(155,17,30,0.15)", borderRadius: "6px", padding: "14px 16px", marginTop: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2D8F5E", boxShadow: "0 0 6px rgba(45,143,94,0.4)" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#2D8F5E", textTransform: "uppercase", fontWeight: 500 }}>Reflex &mdash; Refused</span>
      </div>
      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#A89B8C", lineHeight: 1.7, fontStyle: "italic" }}>{reflex.note}</p>
    </div>
  );
}

function DualMeter({ sobriety, instability }: { sobriety: MeterData; instability: MeterData }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
      {[
        { label: "Sobriety", data: sobriety, color: "#2D8F5E", bg: "rgba(45,143,94,0.06)", border: "rgba(45,143,94,0.12)" },
        { label: "Instability", data: instability, color: "#9B111E", bg: "rgba(155,17,30,0.06)", border: "rgba(155,17,30,0.12)" },
      ].map(m => (
        <div key={m.label} style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: "6px", padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: m.color, textTransform: "uppercase" }}>{m.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: m.color, fontWeight: 500 }}>{m.data.level}/10</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${m.data.level * 10}%`, background: m.color, borderRadius: "2px", transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "12px", color: "#6B5F52", marginTop: "6px", lineHeight: 1.5, fontStyle: "italic" }}>{m.data.note}</p>
        </div>
      ))}
    </div>
  );
}

function ExcerptCard({ e, index }: { e: ExcerptData; index: number }) {
  const threadInfo = THREADS[e.thread];
  return (
    <div style={{ position: "relative", paddingLeft: "48px", marginBottom: "24px" }}>
      <div style={{
        position: "absolute", left: "18px", top: 0, bottom: 0, width: "2px",
        background: index < EXCERPTS.length - 1 ? `linear-gradient(to bottom, ${e.color}44, ${EXCERPTS[index + 1]?.color || '#8B5CF6'}44)` : `${e.color}44`
      }} />
      <div style={{
        position: "absolute", left: "10px", top: "28px", width: "18px", height: "18px", borderRadius: "50%",
        border: `2px solid ${e.color}`, background: e.structural ? e.color : "#12100D", zIndex: 2,
        boxShadow: e.structural ? `0 0 14px ${e.color}55` : "none"
      }} />

      <FadeIn delay={0.03}>
        <div style={{
          background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
          borderLeft: `3px solid ${e.color}`, borderRadius: "0 8px 8px 0",
          padding: "28px 24px", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "140px", height: "140px", background: `radial-gradient(circle, ${e.color}08 0%, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ marginBottom: "16px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: e.color, fontWeight: 500 }}>EXCERPT {e.id}</span>
              <span style={{ color: "#3D362F", fontSize: "10px" }}>&middot;</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: threadInfo.color, letterSpacing: "1px", background: `${threadInfo.color}12`, padding: "2px 8px", borderRadius: "3px", border: `1px solid ${threadInfo.color}20` }}>{threadInfo.label}</span>
            </div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 600, color: "#F0E6D6", lineHeight: 1.2 }}>{e.title}</h2>
            {e.subtitle && <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#6B5F52", fontStyle: "italic", marginTop: "2px" }}>{e.subtitle}</p>}
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4A4139", marginTop: "6px", letterSpacing: "1px" }}>{e.place}</p>
          </div>

          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#C4B5A0", lineHeight: 1.75, marginBottom: "16px" }}>{e.moment}</p>

          {e.emotionalPeak && (
            <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${e.color}40`, borderRadius: "0 4px 4px 0", padding: "12px 16px", marginBottom: "16px" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#E8DDD0", lineHeight: 1.6, fontStyle: "italic" }}>{e.emotionalPeak}</p>
            </div>
          )}

          {e.structural && (
            <div style={{ background: `${e.color}08`, border: `1px solid ${e.color}18`, borderRadius: "4px", padding: "10px 14px", marginBottom: "16px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: e.color, letterSpacing: "1px", lineHeight: 1.6 }}>&diams; {e.structural}</p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "4px" }}>
            <div style={{ background: "rgba(212,168,66,0.04)", border: "1px solid rgba(212,168,66,0.1)", borderRadius: "6px", padding: "12px 14px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#D4A842", textTransform: "uppercase", marginBottom: "6px" }}>What he told himself</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{e.told}&rdquo;</p>
            </div>
            <div style={{ background: "rgba(155,17,30,0.04)", border: "1px solid rgba(155,17,30,0.1)", borderRadius: "6px", padding: "12px 14px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#C41426", textTransform: "uppercase", marginBottom: "6px" }}>What was actually happening</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{e.truth}&rdquo;</p>
            </div>
          </div>

          <DualMeter sobriety={e.sobriety} instability={e.instability} />
          <ReflexBadge reflex={e.reflex} />
        </div>
      </FadeIn>
    </div>
  );
}

export default function FalseSummitPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{
      background: "#12100D", color: "#F0E6D6", minHeight: "100vh", overflowX: "hidden",
      opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease',
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
        ::selection { background:rgba(155,17,30,0.4); color:#F0E6D6; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#12100D; }
        ::-webkit-scrollbar-thumb { background:#2A2520; border-radius:3px; }
      `}</style>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "100px 24px 60px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(45,143,94,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(155,17,30,0.03) 0%, transparent 50%)" }} />

        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px", color: "#6B5F52", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2D8F5E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B5F52')}
          >&larr; MEMOIR</a>
        </div>

        <div style={{ textAlign: "center", maxWidth: "680px", position: "relative", animation: "fadeUp 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#2D8F5E", textTransform: "uppercase", marginBottom: "28px" }}>
            Excerpts 31&ndash;40 &middot; Sobriety Holds, Everything Else Breaks
          </p>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 400, color: "#F0E6D6", lineHeight: 1.1, marginBottom: "20px" }}>
            The False Summit
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", color: "#8A7D6E", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" }}>
            The reader thinks the story resolved. Emily, the wedding, sobriety as proof of concept.
            Then the floor drops &mdash; not into relapse, but into something nobody saw coming.
            The brain that survived addiction starts running without a governor.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "40px", flexWrap: "wrap" }}>
            {Object.values(THREADS).map(t => (
              <span key={t.label} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: t.color, letterSpacing: "1.5px", background: `${t.color}10`, padding: "4px 12px", borderRadius: "3px", border: `1px solid ${t.color}20` }}>{t.label}</span>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "40px", opacity: 0.3, animation: "bounce 2.5s ease-in-out infinite" }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8A7D6E" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="1.5" fill="#2D8F5E">
              <animate attributeName="cy" values="7;15;7" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* Premise */}
      <section style={{ padding: "80px 24px 40px", maxWidth: "620px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#A89B8C" }}>
            Two parallel lines run through these ten excerpts. The sobriety line holds &mdash; that&apos;s the proof,
            that&apos;s what makes the memoir structurally unusual. The instability line keeps spiking:
            COVID, job loss, Matt&apos;s death, payroll failure, workplace betrayal.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#6B5F52", marginTop: "24px" }}>
            Three times the old reflex shows up. Three times it gets turned away.
            But by Excerpt 40, something new is building &mdash;
            and it doesn&apos;t have a name yet.
          </p>
        </FadeIn>
      </section>

      {/* Tension Graph */}
      <section style={{ padding: "40px 24px 20px", maxWidth: "780px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "#4A4139", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>Tension Map &middot; E31&ndash;E40</p>
        </FadeIn>
        <TensionGraph />
      </section>

      {/* Cards */}
      <section style={{ padding: "20px 24px 40px", maxWidth: "780px", margin: "0 auto" }}>
        {EXCERPTS.map((e, i) => (<ExcerptCard key={e.id} e={e} index={i} />))}
      </section>

      {/* Closing */}
      <section style={{ padding: "80px 24px 120px", textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ width: "50px", height: "1px", background: "#8B5CF6", margin: "0 auto 40px", opacity: 0.5 }} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#8A7D6E", lineHeight: 1.8, marginBottom: "32px" }}>
            Most memoirs have one crisis arc. This one has two.
            The first is addiction. The reader expects it.
            The second is the brain running at full speed with no containment.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#C4B5A0", lineHeight: 1.8, marginBottom: "48px" }}>
            The sobriety holds. That&apos;s the point.
            That&apos;s what makes the second collapse so disorienting &mdash;
            and so structurally necessary.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "24px", color: "#F0E6D6", fontStyle: "italic", marginBottom: "12px" }}>
            &ldquo;My thoughts sped up. My sleep got weird.&rdquo;
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#6B5F52", fontStyle: "italic" }}>
            &ldquo;And I started making decisions like the consequences were optional.&rdquo;
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "#2A2520", textTransform: "uppercase", marginTop: "80px" }}>
            Filed by the Architecture Council &middot; March 2026<br />Chaos &rarr; Structured &rarr; Automated
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
