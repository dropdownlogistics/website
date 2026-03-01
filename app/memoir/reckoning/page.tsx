'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE RECKONING
// Excerpts 41–49 · Acts VI & VII
// Phase-colored timeline + tension graph + audit vocabulary
// Aesthetic: warm dark (#12100D), purple→blue→crimson→green→gold
// ═══════════════════════════════════════════════════════════════

interface Excerpt {
  id: number; title: string; subtitle: string; place: string;
  phase: string; phaseLabel: string; phaseColor: string;
  moment: string; told: string; truth: string; systemState: string;
  auditTerm: string | null; emilyRole: string | null; peak: string;
  sobriety: number; instability: number; structural?: string;
}

const EXCERPTS: Excerpt[] = [
  { id:41,title:"Overclocked",subtitle:"The Brain Without a Governor",place:"Home \u2192 California \u2192 nowhere that helps",phase:"acceleration",phaseLabel:"Acceleration",phaseColor:"#8B5CF6",moment:"Three days awake. iPad Pro at 2 AM. Voice notes to survive the speed. California trip: panic attack the first night, nearly booked a flight home. Couldn\u2019t explain why. Created distance from everyone. Grabbed a new job like a lever, not a decision.",told:"I\u2019m productive. I\u2019m locked in. I just need to change the job and the volume will drop.",truth:"Even when circumstances changed, the speed didn\u2019t.",systemState:"Running without cooling. Every thought splits into five. Sleep is optional. Spending is impulsive. The off switch is missing.",auditTerm:null,emilyRole:null,peak:"\u201CI was answering questions while simultaneously evaluating my answers in real time. Like trying to drive while also being your own passenger, your own GPS, and your own backseat critic.\u201D",sobriety:6,instability:9 },
  { id:42,title:"The Audit",subtitle:"Bipolar II. ADHD \u2014 Inattentive.",place:"Evaluator\u2019s office \u2192 the car afterward",phase:"diagnosis",phaseLabel:"Diagnosis",phaseColor:"#3B82F6",moment:"Emily talked him into a full psych evaluation. Written portion felt predictable. Interview was loud \u2014 internally. Answering questions while auditing his own answers in real time. Delay in results. Then the follow-up. Bipolar II. ADHD-Inattentive.",told:"Maybe I\u2019m just weak. Maybe I\u2019m just undisciplined. Maybe I\u2019m making this up.",truth:"It wasn\u2019t me being broken. It was me being uncalibrated. It was a systems issue.",systemState:"The chaos gets a shape. The question mark gets replaced by a finding. Not a label \u2014 a set of instructions.",auditTerm:"The Audit \u2014 the chapter where audit vocabulary stops being metaphor and becomes literal. The diagnosis IS an audit. Of himself.",emilyRole:"\u201CHey. We should probably look under the hood.\u201D She doesn\u2019t panic. She investigates.",peak:"\u201CI was running a system with missing controls, and I had spent my whole life blaming the person operating it.\u201D",sobriety:7,instability:7,structural:"The pivot. The memoir\u2019s vocabulary becomes self-referential. Dave has been using audit language to describe his life \u2014 now a clinician uses it back." },
  { id:43,title:"Trendline (The Ramp)",subtitle:"Three Days Awake",place:"Home \u2014 circling the mower",phase:"acceleration",phaseLabel:"The Ramp",phaseColor:"#8B5CF6",moment:"Post-diagnosis. Thought the map would fix everything. It didn\u2019t. Procrastination worse than ever. Diablo character leveled 1 to 100 in one sitting. Focus sharp in the wrong direction. Three days without sleep. Emily said it out loud: \u2018I think you\u2019re manic.\u2019",told:"I\u2019m finally getting my act together. The diagnosis was the answer.",truth:"The highs don\u2019t usually travel alone. And I wasn\u2019t special.",systemState:"The ramp doesn\u2019t look like a ramp from the inside. Rest feels like a threat. Stopping feels dangerous. The diagnosis didn\u2019t prevent the episode \u2014 it named it.",auditTerm:"Trendline \u2014 the data was already telling the story. Nobody was reading the chart.",emilyRole:"\u201CI think we need to call for an appointment. I think you\u2019re manic.\u201D She saw the system before he saw the dashboard.",peak:"\u201CLike a magnet in your chest pulling you toward the next thing, the next click, the next level, the next hit of progress, whether it matters or not.\u201D",sobriety:5,instability:10 },
  { id:44,title:"Catastrophic Failure",subtitle:"The Body Staged a Coup",place:"Bed \u2192 couch \u2192 ER \u2192 bed",phase:"collapse",phaseLabel:"Catastrophic Failure",phaseColor:"#9B111E",moment:"March 2024. Couldn\u2019t get out of bed. Not tired \u2014 mechanically unable. Emily wrote the email to his boss. Short-term disability denied. Appeal lost in the system. Lithium. Vomiting daily. ER admission. Psychiatrist wouldn\u2019t clear him. Certified mail saved the appeal. Approved late June. Then July 1 \u2014 birthday \u2014 position terminated.",told:"I just need to get through this. The system will catch me.",truth:"The system can acknowledge reality and still decide you\u2019re not worth accommodating.",systemState:"Basic operating requirements failing. Brushing teeth isn\u2019t a decision \u2014 it\u2019s an obstacle course.",auditTerm:"Catastrophic Failure \u2014 not a metaphor. The system crashes. Total loss of function.",emilyRole:"Wrote the boss email. Carried the logistics, the follow-ups, the calls, the hold music. Built an audit file out of the wreckage. Sent the appeal certified mail. Took him to the ER.",peak:"\u201CSometimes love is certified mail.\u201D \u2014 This is where the thesis statement earns its weight.",sobriety:3,instability:10,structural:"The structural mirror of E27 (The Third First Drink). Both are collapses. E27 is addiction. E44 is the brain. The memoir\u2019s double-arc architecture depends on this rhyme." },
  { id:45,title:"Dinner for Two",subtitle:"The Job and the Table",place:"Home \u2192 interview \u2192 a restaurant",phase:"recovery",phaseLabel:"Recovery",phaseColor:"#2D8F5E",moment:"September deadline to find work. Marketplace insurance. Recruiter reached out \u2014 compliance at a bank. Used AI to practice interviewing. Got the job next day. Went to dinner with Emily. First time sitting like a normal couple in six months.",told:"When is the shoe gonna drop?",truth:"Celebration is complicated when your nervous system is still waiting for the next email.",systemState:"System rebooting. Not yet stable. The vigilance hasn\u2019t turned off \u2014 but forward motion has resumed.",auditTerm:null,emilyRole:"At the table. Present. Six months of carrying the household. This dinner was the first proof they were re-entering the world.",peak:"\u201CWe hadn\u2019t done that \u2014 sat down somewhere and existed like a normal couple \u2014 since the ordeal began.\u201D",sobriety:5,instability:5 },
  { id:46,title:"Return to Office",subtitle:"Re-entering the Atmosphere",place:"Car \u2192 downtown KC \u2192 break room",phase:"recovery",phaseLabel:"Recovery",phaseColor:"#2D8F5E",moment:"First day back. Left at 6 AM. Arrived at 6:30. Watched Psych in the car until 8:30. Every minute felt like an hour. Found the espresso machine. Made it through. Drove home with both hands on the wheel.",told:"I used to know downtown like my own kitchen. Now I\u2019m planning the commute like a mission.",truth:"I wasn\u2019t fixed. But I had made it through a normal day without falling apart.",systemState:"System online at minimum viable capacity. Basic functions operational. Not optimized \u2014 functional.",auditTerm:null,emilyRole:null,peak:"\u201CI sat in the quiet for a second with both hands on the steering wheel, like I was confirming something to myself.\u201D",sobriety:6,instability:4 },
  { id:47,title:"Internal Control",subtitle:"The Manager and the Workpapers",place:"Audit floor \u2014 the desk",phase:"calibration",phaseLabel:"Calibration",phaseColor:"#D4A842",moment:"First project went well. Then a manager who treated every missed deadline as a character issue. Feedback everywhere \u2014 coaching notes, WebEx, email, follow-up, call. Nervous system reacting to notifications. Started auditing himself. Built tiny controls to survive someone else\u2019s control environment. Then: staffing changed. Pressure let up. The shoe didn\u2019t drop. It got picked up.",told:"This is going to be my life at the bank. Stable paycheck and constant low-grade panic.",truth:"I didn\u2019t quit because I had already lived through the version of my life where I couldn\u2019t get out of bed. I wasn\u2019t going back to that.",systemState:"Old wiring wakes up. Not collapse \u2014 quiet deterioration. Second-guessing, procrastination, dread. Then: a staffing change. The system stabilizes not through heroics but through a change in conditions.",auditTerm:"Internal Control \u2014 the chapter where Dave builds controls for himself inside someone else\u2019s control environment. The audit vocabulary is now operational, not decorative.",emilyRole:null,peak:"\u201CFor months I\u2019d been waiting for the other shoe to drop. Turns out it didn\u2019t drop. It got picked up. And set back on the shelf.\u201D",sobriety:7,instability:6 },
  { id:48,title:"Unqualified Opinion",subtitle:"Things Were Good Without the Asterisk",place:"The desk \u2014 just the desk",phase:"calibration",phaseLabel:"Calibration",phaseColor:"#D4A842",moment:"Separation from the difficult manager. First time working while medicated and not in panic mode. Calibrated. The day moves. Hours don\u2019t crawl. Analytic work that fits. Output trusted, used, built on. Told Emily: \u2018I think I finally understand what she meant about feeling normal.\u2019",told:"I sit down at my desk, and I work.",truth:"That sentence sounds dumb if you\u2019ve never lived the opposite. But if you have, you know.",systemState:"Calibrated. The dial matches the device. Work is effort without friction. The loop is broken.",auditTerm:"Unqualified Opinion \u2014 in audit, the best possible outcome. No exceptions. No qualifications. Clean.",emilyRole:"\u201CShe just looked at me in that way she has, like she\u2019s proud of me, and also like she\u2019s been waiting for me to catch up to something she already knew was true.\u201D",peak:"\u201CNormal became: feet on the floor. Hygiene without negotiation. Commute without a war plan. In my chair at 7:30.\u201D",sobriety:9,instability:1,structural:"The quiet arrival. No fireworks. Just less resistance." },
  { id:49,title:"Reasonable Assurance",subtitle:"Christmas Day in Phoenix",place:"Phoenix \u2192 Tortilla Flat \u2192 the patio",phase:"peace",phaseLabel:"Reasonable Assurance",phaseColor:"#2D8F5E",moment:"Christmas with Emily\u2019s family. Paper plates, real food, a tree doing the absolute most. A scenic overlook on the way to Tortilla Flat \u2014 mountains, water, sky too big to be real. Eight years sober. The difference between relief and peace. The patio. Chiminea. Cicadas. Quiet \u2014 the earned kind.",told:"Nobody ever wakes up wishing they had drank.",truth:"Reasonable assurance doesn\u2019t mean perfect. It means you can live your life without needing to white-knuckle every exception.",systemState:"System governed. Not fixed \u2014 maintained. Peace is a building with sprinklers. Quiet is the absence of emergency.",auditTerm:"Reasonable Assurance \u2014 in audit, the standard. Not certainty. Not perfection. The professional conclusion that the system is sound enough to trust. The memoir ends where audit begins: with enough.",emilyRole:"\u201CSometimes love is certified mail. Sometimes love is sitting on hold for an hour because you know your person can\u2019t. Sometimes love is learning someone\u2019s care team and medication schedule like it\u2019s your job.\u201D",peak:"\u201CQuiet. Not the counterfeit kind. Not the rented kind. The kind you earn.\u201D",sobriety:10,instability:0,structural:"The landing. The memoir audits itself and arrives at the only conclusion available: reasonable assurance. Not certainty. Enough." },
];

const PHASES: Record<string, { color: string; bg: string; border: string }> = {
  acceleration: { color: "#8B5CF6", bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.15)" },
  diagnosis: { color: "#3B82F6", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.15)" },
  collapse: { color: "#9B111E", bg: "rgba(155,17,30,0.06)", border: "rgba(155,17,30,0.15)" },
  recovery: { color: "#2D8F5E", bg: "rgba(45,143,94,0.06)", border: "rgba(45,143,94,0.12)" },
  calibration: { color: "#D4A842", bg: "rgba(212,168,66,0.06)", border: "rgba(212,168,66,0.12)" },
  peace: { color: "#2D8F5E", bg: "rgba(45,143,94,0.08)", border: "rgba(45,143,94,0.18)" },
};

const VOCAB = [
  { term: "Material Weakness", ex: 37, meaning: "A deficiency severe enough that the system can\u2019t be trusted", use: "Chapter title \u2014 the startup job" },
  { term: "Going Concern", ex: 38, meaning: "Doubt about whether the entity can continue operating", use: "Chapter title \u2014 unemployment cycle" },
  { term: "The Audit", ex: 42, meaning: "Systematic examination of evidence against criteria", use: "Chapter title \u2014 the psych eval. The metaphor becomes literal." },
  { term: "Trendline", ex: 43, meaning: "Data pattern indicating direction over time", use: "The ramp was visible in the data. Nobody was reading the chart." },
  { term: "Catastrophic Failure", ex: 44, meaning: "Complete system breakdown with no redundancy", use: "The body crashes. Basic operating requirements fail." },
  { term: "Internal Control", ex: 47, meaning: "Process designed to provide reasonable assurance", use: "Dave builds controls for himself inside someone else\u2019s control environment." },
  { term: "Unqualified Opinion", ex: 48, meaning: "The best possible audit outcome. Clean. No exceptions.", use: "Things were good without the asterisk." },
  { term: "Reasonable Assurance", ex: 49, meaning: "Not certainty. Not perfection. Enough.", use: "The memoir\u2019s final word. The standard Dave can live inside." },
];

function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold }); obs.observe(el); return () => obs.disconnect(); }, [threshold]);
  return [ref, v];
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView(0.06);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(36px)", transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}

function ArcGraph() {
  const [ref, v] = useInView(0.1);
  const W = 480, H = 130, P = 28, n = EXCERPTS.length;
  const mkPts = (k: 'sobriety' | 'instability') => EXCERPTS.map((e, i) => ({ x: P + (i / (n - 1)) * (W - P * 2), y: P + (1 - e[k] / 10) * (H - P * 2) }));
  const sob = mkPts("sobriety"), inst = mkPts("instability");
  const ln = (a: { x: number; y: number }[]) => a.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const fill = (a: { x: number; y: number }[]) => ln(a) + ` L${a[a.length - 1].x},${H - P} L${a[0].x},${H - P} Z`;

  return (
    <div ref={ref} style={{ margin: "0 auto 50px", maxWidth: "520px" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ opacity: v ? 1 : 0, transition: "opacity 1s ease 0.2s" }}>
        <defs>
          <linearGradient id="sf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(45,143,94,0.1)" /><stop offset="100%" stopColor="transparent" /></linearGradient>
          <linearGradient id="if2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(155,17,30,0.08)" /><stop offset="100%" stopColor="transparent" /></linearGradient>
        </defs>
        {[0, 5, 10].map(val => { const y = P + (1 - val / 10) * (H - P * 2); return <line key={val} x1={P} y1={y} x2={W - P} y2={y} stroke="rgba(255,255,255,0.03)" />; })}
        <path d={fill(sob)} fill="url(#sf2)" style={{ opacity: v ? 1 : 0, transition: "opacity 1.2s ease 0.4s" }} />
        <path d={fill(inst)} fill="url(#if2)" style={{ opacity: v ? 1 : 0, transition: "opacity 1.2s ease 0.5s" }} />
        <path d={ln(sob)} fill="none" stroke="#2D8F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 700, strokeDashoffset: v ? 0 : 700, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
        <path d={ln(inst)} fill="none" stroke="#9B111E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 700, strokeDashoffset: v ? 0 : 700, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.5s" }} />
        <line x1={sob[3].x} y1={P - 4} x2={sob[3].x} y2={H - P + 4} stroke="rgba(155,17,30,0.3)" strokeWidth="1" strokeDasharray="3,3" />
        <rect x={sob[6].x - 2} y={P - 4} width={sob[8].x - sob[6].x + 4} height={H - P * 2 + 8} fill="rgba(212,168,66,0.04)" rx="3" style={{ opacity: v ? 1 : 0, transition: "opacity 1s ease 1s" }} />
        {sob.map((p, i) => <circle key={`s${i}`} cx={p.x} cy={p.y} r="3.5" fill={EXCERPTS[i].phaseColor} stroke="#12100D" strokeWidth="1.5" style={{ opacity: v ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.08}s` }} />)}
        {inst.map((p, i) => <circle key={`i${i}`} cx={p.x} cy={p.y} r="3" fill="#9B111E" stroke="#12100D" strokeWidth="1.5" style={{ opacity: v ? 0.6 : 0, transition: `opacity 0.3s ease ${0.7 + i * 0.08}s` }} />)}
        {EXCERPTS.map((e, i) => <text key={e.id} x={P + (i / (n - 1)) * (W - P * 2)} y={H - 2} textAnchor="middle" fill="#4A4139" fontSize="8" fontFamily="'JetBrains Mono', monospace">{e.id}</text>)}
      </svg>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "6px", flexWrap: "wrap" }}>
        {[{ l: "Sobriety", c: "#2D8F5E" }, { l: "Instability", c: "#9B111E" }, { l: "Crossover \u2192 Calibration", c: "#D4A842" }].map(x => (
          <div key={x.l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "14px", height: "3px", background: x.c, borderRadius: "2px" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#6B5F52" }}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ e, index }: { e: Excerpt; index: number }) {
  const ph = PHASES[e.phase];
  return (
    <div style={{ position: "relative", paddingLeft: "48px", marginBottom: "24px" }}>
      <div style={{ position: "absolute", left: "18px", top: 0, bottom: 0, width: "2px", background: index < EXCERPTS.length - 1 ? `linear-gradient(to bottom, ${e.phaseColor}44, ${EXCERPTS[index + 1]?.phaseColor || '#2D8F5E'}44)` : `${e.phaseColor}44` }} />
      <div style={{ position: "absolute", left: "10px", top: "28px", width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${e.phaseColor}`, background: e.structural ? e.phaseColor : "#12100D", zIndex: 2, boxShadow: e.structural ? `0 0 14px ${e.phaseColor}55` : "none" }} />
      <FadeIn delay={0.03}>
        <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: `3px solid ${e.phaseColor}`, borderRadius: "0 8px 8px 0", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "140px", height: "140px", background: `radial-gradient(circle, ${e.phaseColor}08 0%, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: e.phaseColor, fontWeight: 500 }}>EXCERPT {e.id}</span>
              <span style={{ color: "#3D362F", fontSize: "10px" }}>&middot;</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: ph.color, background: ph.bg, padding: "2px 8px", borderRadius: "3px", border: `1px solid ${ph.border}`, letterSpacing: "1px" }}>{e.phaseLabel}</span>
            </div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 600, color: "#F0E6D6", lineHeight: 1.2 }}>{e.title}</h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#6B5F52", fontStyle: "italic", marginTop: "2px" }}>{e.subtitle}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4A4139", marginTop: "6px", letterSpacing: "1px" }}>{e.place}</p>
          </div>

          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#C4B5A0", lineHeight: 1.75, marginBottom: "16px" }}>{e.moment}</p>

          {e.peak && (
            <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${e.phaseColor}40`, borderRadius: "0 4px 4px 0", padding: "12px 16px", marginBottom: "16px" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#E8DDD0", lineHeight: 1.6, fontStyle: "italic" }}>{e.peak}</p>
            </div>
          )}

          {e.structural && (
            <div style={{ background: `${e.phaseColor}08`, border: `1px solid ${e.phaseColor}18`, borderRadius: "4px", padding: "10px 14px", marginBottom: "16px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: e.phaseColor, letterSpacing: "1px", lineHeight: 1.6 }}>{'\u25C6'} {e.structural}</p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div style={{ background: "rgba(212,168,66,0.04)", border: "1px solid rgba(212,168,66,0.1)", borderRadius: "6px", padding: "12px 14px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#D4A842", textTransform: "uppercase", marginBottom: "6px" }}>What he told himself</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{e.told}&rdquo;</p>
            </div>
            <div style={{ background: "rgba(155,17,30,0.04)", border: "1px solid rgba(155,17,30,0.1)", borderRadius: "6px", padding: "12px 14px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#C41426", textTransform: "uppercase", marginBottom: "6px" }}>What was actually happening</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{e.truth}&rdquo;</p>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "6px", padding: "12px 14px", marginBottom: "12px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#6B5F52", textTransform: "uppercase", marginBottom: "6px" }}>System State</p>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#A89B8C", lineHeight: 1.6 }}>{e.systemState}</p>
          </div>

          {e.auditTerm && (
            <div style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)", borderRadius: "6px", padding: "12px 14px", marginBottom: "12px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#3B82F6", textTransform: "uppercase", marginBottom: "6px" }}>Audit Vocabulary</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#8AADCF", lineHeight: 1.6, fontStyle: "italic" }}>{e.auditTerm}</p>
            </div>
          )}

          {e.emilyRole && (
            <div style={{ background: "rgba(232,121,160,0.04)", border: "1px solid rgba(232,121,160,0.1)", borderRadius: "6px", padding: "12px 14px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#E879A0", textTransform: "uppercase", marginBottom: "6px" }}>Emily</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#D4A0B5", lineHeight: 1.6, fontStyle: "italic" }}>{e.emilyRole}</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export default function ReckoningPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ background: "#12100D", color: "#F0E6D6", minHeight: "100vh", overflowX: "hidden", opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
        ::selection{background:rgba(45,143,94,0.4);color:#F0E6D6}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#12100D}::-webkit-scrollbar-thumb{background:#2A2520;border-radius:3px}
      `}</style>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(45,143,94,0.03) 0%, transparent 50%)" }} />

        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px", color: "#5a6a7e", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#8B5CF6")} onMouseLeave={e => (e.currentTarget.style.color = "#5a6a7e")}>&larr; MEMOIR</a>
        </div>

        <div style={{ textAlign: "center", maxWidth: "680px", position: "relative", animation: "fadeUp 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#8B5CF6", textTransform: "uppercase", marginBottom: "28px" }}>Excerpts 41&ndash;49 &middot; The System Comes Back Online</p>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 600, color: "#F0E6D6", lineHeight: 1.1, marginBottom: "20px" }}>The Reckoning</h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", color: "#8A7D6E", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" }}>
            The brain that survived addiction runs at full speed with no governor. The audit vocabulary stops being metaphor. The diagnosis lands. The system crashes, reboots, and arrives at the only conclusion available: not certainty. Enough.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "40px", flexWrap: "wrap" }}>
            {(["acceleration","diagnosis","collapse","recovery","calibration","peace"] as const).map(k => {
              const v = PHASES[k];
              return <span key={k} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: v.color, letterSpacing: "1.5px", background: v.bg, padding: "3px 10px", borderRadius: "3px", border: `1px solid ${v.border}`, textTransform: "capitalize" }}>{k}</span>;
            })}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", opacity: 0.3, animation: "bounce 2.5s ease-in-out infinite" }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none"><rect x="1" y="1" width="14" height="22" rx="7" stroke="#8A7D6E" strokeWidth="1.5" /><circle cx="8" cy="8" r="1.5" fill="#8B5CF6"><animate attributeName="cy" values="7;15;7" dur="2.5s" repeatCount="indefinite" /></circle></svg>
        </div>
      </section>

      {/* Premise */}
      <section style={{ padding: "80px 24px 40px", maxWidth: "620px", margin: "0 auto" }}>
        <FadeIn><p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#A89B8C" }}>Nine excerpts. The second crisis detonates, gets named, crashes the system, and then &mdash; slowly, unglamorously &mdash; the system comes back online. Not fixed. Governed. Medicated, calibrated, and maintained.</p></FadeIn>
        <FadeIn delay={0.1}><p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#6B5F52", marginTop: "24px" }}>The audit vocabulary that has been decorating chapter titles since E37 becomes operational here. Dave doesn&rsquo;t just use audit language to describe his life &mdash; a clinician uses it back. And by E49, &ldquo;reasonable assurance&rdquo; stops being a professional standard and becomes a way to live.</p></FadeIn>
      </section>

      {/* Graph */}
      <section style={{ padding: "40px 24px 20px", maxWidth: "780px", margin: "0 auto" }}>
        <FadeIn><p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "#4A4139", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>Tension Map &middot; E41&ndash;E49</p></FadeIn>
        <ArcGraph />
      </section>

      {/* Cards */}
      <section style={{ padding: "20px 24px 40px", maxWidth: "780px", margin: "0 auto" }}>
        {EXCERPTS.map((e, i) => <Card key={e.id} e={e} index={i} />)}
      </section>

      {/* Vocabulary Timeline */}
      <section style={{ padding: "80px 24px", maxWidth: "680px", margin: "0 auto" }}>
        <FadeIn><p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "#3B82F6", textTransform: "uppercase", marginBottom: "24px", textAlign: "center" }}>When Audit Vocabulary Becomes Self-Referential</p></FadeIn>
        {VOCAB.map((t, i) => (
          <FadeIn key={t.term} delay={i * 0.04}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "16px", padding: "16px 0", borderBottom: i < VOCAB.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
              <div style={{ textAlign: "right" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3B82F6" }}>E{t.ex}</span></div>
              <div>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#E8DDD0", marginBottom: "3px" }}>{t.term}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4A4139", marginBottom: "4px" }}>{t.meaning}</p>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", color: "#8A7D6E", fontStyle: "italic", lineHeight: 1.5 }}>{t.use}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Closing */}
      <section style={{ padding: "80px 24px 120px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ width: "50px", height: "1px", background: "#2D8F5E", margin: "0 auto 40px", opacity: 0.5 }} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#8A7D6E", lineHeight: 1.8, marginBottom: "28px" }}>Relief is a fire drill. Peace is a building with sprinklers.</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#A89B8C", lineHeight: 1.8, marginBottom: "28px" }}>The memoir begins with a man who trades tomorrow for tonight. It ends with a man on a patio, chiminea burning, cicadas rising, quiet in his chest &mdash; the earned kind.</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#C4B5A0", lineHeight: 1.8, marginBottom: "48px" }}>Forty-nine excerpts. Two crises. One proof of concept: you can survive the thing you built to survive yourself.</p>
          <div style={{ width: "40px", height: "1px", background: "#D4A842", margin: "0 auto 40px", opacity: 0.4 }} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(24px, 5vw, 40px)", color: "#F0E6D6", fontWeight: 600, fontStyle: "italic", lineHeight: 1.3, marginBottom: "16px" }}>Reasonable Assurance</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", color: "#6B5F52", fontStyle: "italic", marginBottom: "8px" }}>Not certainty. Not perfection.</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", color: "#8A7D6E" }}>Enough.</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "#2A2520", textTransform: "uppercase", marginTop: "80px" }}>Filed by the Architecture Council &middot; March 2026<br />Chaos &rarr; Structured &rarr; Automated</p>
        </FadeIn>
      </section>
    </div>
  );
}
