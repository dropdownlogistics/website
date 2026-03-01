'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE MAP OF 13J
// Excerpts 11–20 · The Functional Adult Illusion
// A geography of increasing isolation
// Preserved aesthetic: warm dark (#12100D), gold→crimson gradient
// ═══════════════════════════════════════════════════════════════

interface LocationData {
  id: string;
  excerpt: number;
  title: string;
  place: string;
  city: string;
  spatial: string;
  moment: string;
  told: string;
  truth: string;
  witnesses: string;
  isolation: number;
  isoLabel: string;
  color: string;
  glow: string;
  icon: string;
}

const LOCATIONS: LocationData[] = [
  { id: "campanile", excerpt: 11, title: "The Hill", place: "The Campanile, Mount Oread", city: "Lawrence, KS", spatial: "The tallest point in Kansas. Campus always slightly above you, always asking you to climb.", moment: "Graduation day. Walked through the Campanile with friends, started down the hill, felt the campus letting go. Ended at Louise\u2019s with $2.75 Boulevard Wheat schooners.", told: "I\u2019m pumped. I\u2019m ready.", truth: "I needed to grieve a chapter while it was still open.", witnesses: "Friends, family, the whole stadium", isolation: 0, isoLabel: "Fully social", color: "#D4A842", glow: "rgba(212,168,66,0.15)", icon: "\u25B2" },
  { id: "remington", excerpt: 12, title: "Tulsa", place: "The Remington Apartments", city: "Tulsa, OK", spatial: "Clean in that new-city way. Blank walls. That faint smell of someone else\u2019s paint.", moment: "Family convoy left. Silence showed up. Jeremy came down. Different kitchen, same routine. Drank and watched TV until work started. Woke up on concrete stairs outside the apartment, no keys.", told: "It\u2019s an extension of college. We\u2019re still free.", truth: "The specific silence after your family drives away. The room stops being a set. It becomes your life.", witnesses: "Roommate found him on the stairs", isolation: 1, isoLabel: "New city, old habits", color: "#C9A84C", glow: "rgba(201,168,76,0.12)", icon: "\u25FB" },
  { id: "jeremy", excerpt: 13, title: "The First Hiding", place: "Jeremy\u2019s Apartment, across from Memorial Stadium", city: "Lawrence, KS", spatial: "Below ground. Patio enclosed by earth. Stadium literally across the street.", moment: "Saturday morning. Only one awake. Poured drinks alone in the kitchen while everyone slept. Set a buzz before the game. Ended at hibachi, queasy from smells that usually felt alive. Monday alarm at 6:15 \u2014 first PTO day considered.", told: "I\u2019m managing the day. It\u2019s practical.", truth: "That was the first time it really looked like hiding, even if I didn\u2019t call it that.", witnesses: "Everyone asleep \u2014 first solo kitchen session", isolation: 3, isoLabel: "First hiding", color: "#C48B4C", glow: "rgba(196,139,76,0.12)", icon: "\u25E7" },
  { id: "liberty", excerpt: 14, title: "Liberty Tower, 13J", place: "Liberty Tower, 15th & Boulder, Unit 13J", city: "Tulsa, OK", spatial: "One bed, one bath, one giant sliding glass door. The balcony was where everything made sense.", moment: "First place that was truly his. Doorman, rooftop pool, balcony view. Adopted Cole the cat. The condo became pregame staging area \u2014 friends gathered here before going out.", told: "I\u2019ve arrived. Car and home without a cosigner. I have it together.", truth: "There\u2019s a line between freedom and danger you don\u2019t recognize until you\u2019ve crossed it. \u2018I can do whatever I want\u2019 starts to sound like permission.", witnesses: "Cole the cat. Always Cole.", isolation: 2, isoLabel: "Freedom as infrastructure", color: "#B89A5E", glow: "rgba(184,154,94,0.12)", icon: "\u25AE" },
  { id: "pregame", excerpt: 15, title: "Pre-game", place: "Liberty Tower kitchen \u2192 McNellie\u2019s \u2192 Arnie\u2019s", city: "Tulsa, OK", spatial: "Solo run-through in my own kitchen, city glowing through the sliding door like a backdrop.", moment: "May 2010. The ritual happened before anyone arrived. Cheap vodka, baseline set, smooth before the door opened. Then the circuit: McNellie\u2019s (white collar), Arnie\u2019s (blue collar). Walking downtown with the buzz and the warm air.", told: "I don\u2019t have a problem. I found the solution.", truth: "I liked having my baseline set before anyone arrived. I liked meeting the room already warmed up.", witnesses: "Alone in kitchen \u2192 friends arrive \u2192 group night out", isolation: 4, isoLabel: "Pre-drinking before the drinking", color: "#A8845A", glow: "rgba(168,132,90,0.12)", icon: "\u25C8" },
  { id: "train", excerpt: 16, title: "The Train Shot", place: "A bar near the train tracks", city: "Tulsa, OK", spatial: "Tracks close enough to hear the approach. Patrons cooked dinner out back like the place belonged to them.", moment: "October 2009. Met a woman he can\u2019t identify from memory. A train goes by, you take a shot. Sent a Facebook message the next day. Started a relationship on rails he didn\u2019t lay.", told: "It\u2019s just a night out. The train rule is fun. This is how people meet.", truth: "A reason you don\u2019t have to invent. Moving forward fast enough that I didn\u2019t ask where it was going.", witnesses: "Bar crowd \u2014 but he can\u2019t remember her face", isolation: 2, isoLabel: "Social drinking, memory gaps", color: "#9B7B5A", glow: "rgba(155,123,90,0.10)", icon: "\u2550" },
  { id: "cpa", excerpt: 17, title: "CPA", place: "Liberty Tower, 13J \u2014 couch, desk, kitchen", city: "Tulsa, OK", spatial: "Pass out on the couch with the game still running. Character standing in place, idle animation looping.", moment: "2010\u20132012. Company paying for CPA. Self-study plan that never materialized. Skyrim and Red Dead instead. Failed AUD with a 46. Passed with a 75 on the dot. Champagne shower on the balcony. \u2018Random\u2019 drug tests twice.", told: "I\u2019ve got time. I can pull it off without doing the work.", truth: "The kitchen was my favored geography because it made postponement feel productive.", witnesses: "Solo \u2014 games, couch, pour, repeat", isolation: 5, isoLabel: "Routine solitary drinking", color: "#8E6F55", glow: "rgba(142,111,85,0.10)", icon: "\u25C9" },
  { id: "kc-breakup", excerpt: 18, title: "KC / The Drive Back", place: "Parents\u2019 house \u2192 the car \u2192 Liberty Tower", city: "Kansas City \u2192 Tulsa", spatial: "Four hours in a car has a way of removing your exits.", moment: "Breakup at parents\u2019 house. Grabbed a bottle, polished it off alone. Drove her back to Tulsa, held it together until the door closed. Called dad. Parents drove down. Then she broke in a week later, sobbing on the bed. He took her back.", told: "We\u2019re leaving. I\u2019m fine. I\u2019m handling it.", truth: "I can be falling apart internally and still perform competence if there\u2019s a task in front of me.", witnesses: "Alone with a bottle. Called dad after.", isolation: 6, isoLabel: "Crisis drinking \u2014 solo, fast, desperate", color: "#7F6050", glow: "rgba(127,96,80,0.10)", icon: "\u25EC" },
  { id: "dewey", excerpt: 19, title: "The Dewey", place: "Highway \u2192 jail \u2192 unknown Kansas City neighborhood", city: "Kansas City, KS", spatial: "I don\u2019t know where that arrest happened. I couldn\u2019t get you there if you offered me a billion dollars.", moment: "August 2011. Polished off a liter of vodka on the drive up. Blew .182 and felt sober. Jumpsuit. Nurse said \u2018I\u2019m just glad you didn\u2019t hurt anyone else.\u2019 Bailed out at 4 AM on a credit card. Officer asked: \u2018Dewey?\u2019", told: "I was definitely buzzed, but I didn\u2019t feel that drunk. I felt capable.", truth: "I was three times the legal limit and didn\u2019t feel like it. That was a data point I couldn\u2019t smooth over.", witnesses: "Completely alone. A liter of vodka in a car.", isolation: 8, isoLabel: "Solo. Moving. A liter deep.", color: "#6B4D42", glow: "rgba(107,77,66,0.10)", icon: "\u2B25" },
  { id: "aftermath", excerpt: 20, title: "The Aftermath", place: "Parents\u2019 apartment \u2192 impound lot \u2192 DMV \u2192 Tulsa", city: "Kansas City \u2192 Tulsa", spatial: "Crushed beer cans on the passenger floor. Little metal shame receipts.", moment: "Lawyer said \u2018you were shockingly well put together for a .182.\u2019 Brother picked up a crushed can: \u2018Seriously?\u2019 DMV woman fake-restricted his license as a joke. Victim panel. Psych eval where he lied about blackouts. Monthly urine tests for a year.", told: "Bad, but survivable. I got caught, I got scared, I changed.", truth: "I got caught, I got scared, I adapted. And then I kept going.", witnesses: "Lawyer, brother, DMV clerk \u2014 but none saw the drinking", isolation: 7, isoLabel: "Aftermath alone. Consequences managed.", color: "#5C4038", glow: "rgba(92,64,56,0.10)", icon: "\u25FB" },
];

const MAX_ISO = 8;

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function IsolationMeter({ level, color, label }: { level: number; color: string; label: string }) {
  const pct = (level / MAX_ISO) * 100;
  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "#6B5F52", textTransform: "uppercase" }}>Isolation Index</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#A89B8C" }}>{level}/{MAX_ISO}</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "3px", overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${level > 5 ? '#9B111E' : color})`,
          borderRadius: "3px", transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: level > 5 ? `0 0 12px rgba(155,17,30,0.4)` : "none"
        }} />
      </div>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
        color: level > 5 ? "#C41426" : "#6B5F52", marginTop: "5px", fontStyle: "italic"
      }}>{label}</p>
    </div>
  );
}

function LocationCard({ loc, index }: { loc: LocationData; index: number }) {
  return (
    <div style={{ position: "relative", padding: "0 0 0 48px" }}>
      <div style={{
        position: "absolute", left: "18px", top: 0, bottom: 0, width: "2px",
        background: index < LOCATIONS.length - 1
          ? `linear-gradient(to bottom, ${loc.color}, ${LOCATIONS[index + 1]?.color || '#5C4038'})`
          : loc.color,
        opacity: 0.4
      }} />
      <div style={{
        position: "absolute", left: "10px", top: "28px",
        width: "18px", height: "18px", borderRadius: "50%",
        border: `2px solid ${loc.color}`, background: "#12100D",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "8px", color: loc.color, zIndex: 2,
        boxShadow: loc.isolation > 5 ? `0 0 12px rgba(155,17,30,0.3)` : `0 0 8px ${loc.glow}`
      }}>{loc.icon}</div>

      <FadeIn delay={0.05}>
        <div style={{
          background: "rgba(255,255,255,0.015)",
          border: `1px solid rgba(255,255,255,0.04)`,
          borderLeft: `3px solid ${loc.color}`,
          borderRadius: "0 8px 8px 0",
          padding: "32px 28px", marginBottom: "40px",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: "-20px", right: "-20px",
            width: "160px", height: "160px",
            background: `radial-gradient(circle, ${loc.glow} 0%, transparent 70%)`,
            pointerEvents: "none"
          }} />

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: loc.color, fontWeight: 500 }}>EXCERPT {loc.excerpt}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3D362F" }}>&middot;</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#6B5F52", letterSpacing: "1px" }}>{loc.city}</span>
            </div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, color: "#F0E6D6", lineHeight: 1.2, marginBottom: "2px" }}>{loc.title}</h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#8A7D6E", fontStyle: "italic" }}>{loc.place}</p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: "4px",
            padding: "14px 16px", marginBottom: "20px",
            borderLeft: `2px solid rgba(255,255,255,0.06)`
          }}>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#A89B8C", lineHeight: 1.7, fontStyle: "italic" }}>
              &ldquo;{loc.spatial}&rdquo;
            </p>
          </div>

          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#C4B5A0", lineHeight: 1.75, marginBottom: "24px" }}>{loc.moment}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div style={{ background: "rgba(212,168,66,0.04)", border: "1px solid rgba(212,168,66,0.1)", borderRadius: "6px", padding: "14px 16px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#D4A842", textTransform: "uppercase", marginBottom: "8px" }}>What he told himself</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#C4B5A0", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{loc.told}&rdquo;</p>
            </div>
            <div style={{ background: "rgba(155,17,30,0.04)", border: "1px solid rgba(155,17,30,0.1)", borderRadius: "6px", padding: "14px 16px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#C41426", textTransform: "uppercase", marginBottom: "8px" }}>What was actually happening</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#C4B5A0", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{loc.truth}&rdquo;</p>
            </div>
          </div>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6B5F52", marginBottom: "4px" }}>
            <span style={{ color: "#4A4139", marginRight: "8px" }}>&cir;</span>{loc.witnesses}
          </p>

          <IsolationMeter level={loc.isolation} color={loc.color} label={loc.isoLabel} />
        </div>
      </FadeIn>
    </div>
  );
}

function IsolationArc() {
  const [ref, visible] = useInView(0.1);
  const pathData = LOCATIONS.map((l, i) => {
    const x = (i / (LOCATIONS.length - 1)) * 500;
    const y = 80 - (l.isolation / MAX_ISO) * 70;
    return { x, y };
  });
  const linePath = pathData.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = linePath + ` L500,80 L0,80 Z`;

  return (
    <div ref={ref} style={{ padding: "0 0 80px 48px", position: "relative" }}>
      <div style={{
        background: "rgba(155,17,30,0.04)", border: "1px solid rgba(155,17,30,0.1)",
        borderRadius: "8px", padding: "32px 28px",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "#C41426", textTransform: "uppercase", marginBottom: "20px" }}>
          The Isolation Arc &mdash; E11 to E20
        </p>

        <div style={{ marginBottom: "24px" }}>
          <svg width="100%" height="80" viewBox="0 0 500 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D4A842" />
                <stop offset="50%" stopColor="#A8845A" />
                <stop offset="100%" stopColor="#9B111E" />
              </linearGradient>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(155,17,30,0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#fillGrad)" style={{ opacity: visible ? 1 : 0, transition: "opacity 1.5s ease 0.3s" }} />
            <polyline points={pathData.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 600, strokeDashoffset: visible ? 0 : 600, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />
            {pathData.map((p, i) => (
              <circle key={LOCATIONS[i].id} cx={p.x} cy={p.y} r="4" fill={LOCATIONS[i].color} stroke="#12100D" strokeWidth="1.5"
                style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + i * 0.1}s` }} />
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4A4139", marginTop: "4px" }}>
            <span>E11 &middot; The Hill</span>
            <span>E19 &middot; The Dewey</span>
          </div>
        </div>

        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", color: "#A89B8C", lineHeight: 1.8 }}>
          The drinking doesn&apos;t escalate in volume during Excerpts 11&ndash;20. It escalates in isolation.
          Every excerpt moves the drinking one step further from witnesses. Hill with friends,
          pregame alone in someone else&apos;s kitchen, solo baseline-setting in his own kitchen,
          a liter of vodka alone on a highway. The geography tells the story the prose politely declines to narrate.
        </p>
      </div>
    </div>
  );
}

export default function MapOf13JPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{
      background: "#12100D", color: "#F0E6D6", minHeight: "100vh",
      overflowX: "hidden",
      opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease',
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        ::selection { background: rgba(155,17,30,0.4); color: #F0E6D6; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #12100D; }
        ::-webkit-scrollbar-thumb { background: #2A2520; border-radius: 3px; }
      `}</style>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "100px 24px 60px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 60%, rgba(212,168,66,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(155,17,30,0.03) 0%, transparent 50%)" }} />

        {/* Back nav */}
        <div style={{ position: "absolute", top: "100px", left: "24px", zIndex: 2 }}>
          <a href="/memoir" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1px",
            color: "#6B5F52", textDecoration: "none", transition: "color 0.2s ease",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A842')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B5F52')}
          >&larr; MEMOIR</a>
        </div>

        <div style={{ textAlign: "center", maxWidth: "680px", position: "relative", animation: "fadeUp 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#D4A842", textTransform: "uppercase", marginBottom: "28px" }}>
            Excerpts 11&ndash;20 &middot; The Functional Adult Illusion
          </p>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 400, color: "#F0E6D6", lineHeight: 1.1, marginBottom: "20px" }}>
            The Map of 13J
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", color: "#8A7D6E", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
            Ten excerpts. Ten places. The drinking doesn&apos;t get louder &mdash;
            it gets lonelier. A geography of increasing isolation, from
            the Campanile to an impound lot no one can find.
          </p>
          <div style={{ width: "50px", height: "1px", background: "#D4A842", margin: "40px auto 0", opacity: 0.5 }} />
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4A4139", marginTop: "16px", letterSpacing: "1px" }}>
            For <em style={{ fontFamily: "'Source Serif 4', serif", color: "#6B5F52" }}>Little to Know Experience</em> by Dave Kitchens
          </p>
        </div>

        <div style={{ position: "absolute", bottom: "40px", opacity: 0.3, animation: "bounce 2.5s ease-in-out infinite" }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8A7D6E" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="1.5" fill="#D4A842">
              <animate attributeName="cy" values="7;15;7" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </section>

      {/* Premise */}
      <section style={{ padding: "80px 24px 60px", maxWidth: "620px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#A89B8C" }}>
            Graduation through the DUI aftermath. Dave has the degree, the job, the condo,
            the girlfriend, the CPA pursuit. From the outside, a young professional building a life
            in a city that&apos;s starting to believe in itself.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", lineHeight: 1.8, color: "#6B5F52", marginTop: "24px" }}>
            Underneath: the kitchen ritual migrates. The hiding starts.
            Every consequence gets absorbed, rationalized, and filed
            under &ldquo;bad, but survivable.&rdquo;
          </p>
        </FadeIn>
      </section>

      {/* Timeline */}
      <section style={{ padding: "40px 24px 40px", maxWidth: "780px", margin: "0 auto" }}>
        {LOCATIONS.map((loc, i) => (
          <LocationCard key={loc.id} loc={loc} index={i} />
        ))}
        <IsolationArc />
      </section>

      {/* Closing */}
      <section style={{ padding: "80px 24px 120px", textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ width: "50px", height: "1px", background: "#9B111E", margin: "0 auto 40px", opacity: 0.5 }} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#8A7D6E", lineHeight: 1.8, marginBottom: "32px" }}>
            He had a doorman, a rooftop pool, a balcony, a cat, a CPA,
            and a girlfriend. He could walk to work.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#C4B5A0", lineHeight: 1.8, marginBottom: "48px" }}>
            He also couldn&apos;t name the intersection where his life
            almost ended. That&apos;s the gap these ten excerpts live inside.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "24px", color: "#F0E6D6", fontStyle: "italic", marginBottom: "12px" }}>
            &ldquo;I got caught, I got scared, I adapted.&rdquo;
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#6B5F52", fontStyle: "italic" }}>
            &ldquo;And then I kept going.&rdquo;
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
