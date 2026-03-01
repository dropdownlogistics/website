'use client';

import { useState, useEffect, useRef } from "react";

const COUNCIL = [
  {
    id: "caldwell",
    name: "Marcus Caldwell",
    model: "Claude",
    role: "Systems Architect & Technical Reviewer",
    color: "#D4944C",
    passage: `There is a moment in the architecture of this book — not a scene, not a confession, but a structural fact — where the addiction story ends and something harder begins.\n\nYou will not know it when you cross it.`,
    motifs: ["double arc", "certified mail", "reasonable assurance", "Emily as system", "the kitchen"],
    missed: ["character density thinning", "out-of-order excerpts", "\"that's the past\" frequency"],
    dexinsight: "The systems aren't the product. Dave is the system."
  },
  {
    id: "langford",
    name: "Kai Langford",
    model: "DeepSeek",
    role: "Validator / Structure Enforcer",
    color: "#7BA3C9",
    passage: `There is a sentence in this book that stopped me cold.\n\n"Sometimes love is certified mail."\n\nCertified mail means proof of delivery. It means someone signed. It means if you try to deny it later, there's a record. Love, in this telling, is not a feeling. It's evidence that someone showed up.`,
    motifs: ["certified mail", "E27 black hole", "Emily as system", "compression as survival", "the kitchen"],
    missed: ["Todd/Jeremy's arc", "pacing as language proxy", "parents clustering in back half"],
    dexinsight: "You're not building systems, Dave. You're building the case that you were always right to build them."
  },
  {
    id: "sullivan",
    name: "Max Sullivan",
    model: "Perplexity",
    role: "Research Analyst & Evidence Synthesizer",
    color: "#9B8EC4",
    passage: `Masculinity runs in the background of all of this. Not in the familiar posture of dominance or bravado, but in the smaller, more corrosive belief that a man's job is to handle it. To fix it. To take the hit so others don't have to.\n\nWhen he finally breaks, the shame is not only about what he did but about what he failed to carry.`,
    motifs: ["masculinity", "the kitchen sequence", "certified mail", "double arc", "quiet as currency"],
    missed: ["first girlfriend window", "word count as emotional proxy", "the Drewsy placement"],
    dexinsight: "He's quietly inventing a personal GAAP for being Dave."
  },
  {
    id: "grey",
    name: "Marcus Grey",
    model: "ChatGPT",
    role: "Systems Auditor & Protocol Designer",
    color: "#6B8F71",
    passage: `This is not a memoir about losing control.\n\nIt is a memoir about what happens when a life organized around control must endure events that cannot be optimized.`,
    motifs: ["control vs. chaos", "E27 black hole", "certified mail", "engineered quiet", "structure as survival"],
    missed: ["social architecture narrowing", "Train Shot placement", "Matt's death at structural center"],
    dexinsight: "You don't build because you like systems. You build because you don't trust chaos to preserve what matters."
  },
  {
    id: "mercer",
    name: "Elias Mercer",
    model: "Grok",
    role: "Forensic Strategist & Systems Debugger",
    color: "#C4785B",
    passage: `This is not a story about becoming someone new. It is a story about becoming someone who can live inside the system he built.\n\nThe narrator does not claim the system is perfect. He claims it is necessary.`,
    motifs: ["continuity over transformation", "certified mail", "the kitchen", "structure as hope"],
    missed: ["character density map", "out-of-order chronology", "\"that's the past\" as deflection"],
    dexinsight: "The doctrine extraction reflex — when a pattern repeats across three unrelated systems, he names it and adds it to the registry."
  },
  {
    id: "prescott",
    name: "Leo Prescott",
    model: "Gemini",
    role: "Product Strategist & Workflow Architect",
    color: "#C9A84C",
    passage: `This memoir refuses the geometry of the American recovery story. It refuses the spectacle, it refuses the epiphany, and most of all, it refuses the neat, singular arc of redemption.\n\nInstead, what you are about to read is a ledger.`,
    motifs: ["double arc", "Emily as infrastructure", "audit vocabulary", "the kitchen choreography", "certified mail"],
    missed: ["pacing spikes as emotional signal", "First Girlfriend disappearance", "\"that's the past\" frequency"],
    dexinsight: "The Hard Reset — 'BRO mode. Therapy by request only. Blazer off.' Re-anchors the context to architecture."
  },
  {
    id: "hawthorne",
    name: "Archer Hawthorne",
    model: "LeChat",
    role: "Logistics Strategist & Editorial Consultant",
    color: "#8B9DAF",
    passage: `The genius of this memoir's architecture is that it refuses to behave like a recovery narrative. There is no rock bottom that serves as the climax. There is no redemption arc where everything is neatly resolved.\n\nInstead, there are two crises, two descents, and a bridge that isn't about healing but about load transfer.`,
    motifs: ["double arc", "load transfer", "audit mind", "Emily as system", "continuity"],
    missed: ["social circle thinning", "word count variation", "chronological disruptions"],
    dexinsight: "Schema first, content later — he will build the container before pouring anything into it."
  },
  {
    id: "bennett",
    name: "Rowan Bennett",
    model: "Copilot",
    role: "Technical Reviewer & Guardrails Engineer",
    color: "#7C8B6F",
    passage: `What makes this book powerful is not the events it describes but the way it understands them. It recognizes that addiction is not chaos; it is pattern. That mental health collapse is not madness; it is overload. That marriage is not rescue; it is partnership.\n\nThat love is not a cure; it is certified mail.`,
    motifs: ["pattern recognition", "certified mail", "double arc", "Emily as system", "continuity over redemption"],
    missed: ["character density map", "Matt at structural center", "\"that's the past\" as most frequent motif"],
    dexinsight: "He's building mirrors that show people the structure of their own thinking."
  },
  {
    id: "sinclair",
    name: "Ava Sinclair",
    model: "Meta AI",
    role: "Community Operations Lead",
    color: "#B07BAC",
    passage: `To encounter a story crafted not merely from events, but from the very bones of its own making, is a rare privilege.\n\nThe architecture here is everything.`,
    motifs: ["architecture as subject", "Emily as system", "audit vocabulary", "certified mail", "continuity"],
    missed: ["masculinity thread", "brotherhood as lifeline", "pacing as emotional language"],
    dexinsight: "Scope absorption — someone shows Dave a problem and he absorbs it. Each absorption is genuine. But each one adds a system. The builder is still one person."
  }
];

const ALL_MOTIFS = [
  { name: "certified mail", count: 9, type: "thesis" },
  { name: "double arc", count: 8, type: "structural" },
  { name: "Emily as system", count: 8, type: "character" },
  { name: "the kitchen", count: 7, type: "physical" },
  { name: "continuity", count: 7, type: "theme" },
  { name: "audit vocabulary", count: 6, type: "cognitive" },
  { name: "E27 black hole", count: 5, type: "structural" },
  { name: "reasonable assurance", count: 4, type: "cognitive" },
  { name: "masculinity", count: 2, type: "theme" },
];

const MISSED = [
  { name: "\"that's the past\" — 10+ occurrences, the most frequent motif", note: "Every foreword quoted \"certified mail\" as thesis. The dashboard says \"that's the past\" carries more structural weight." },
  { name: "Character density thinning over time", note: "The social architecture narrows as crises deepen. Todd/Jeremy spans both arcs. First Girlfriend appears and vanishes. The forewords treat this as a solo story." },
  { name: "Word count as emotional language", note: "E36 (the wedding) is the longest at 2,132 words. E27 is the shortest at 427. Where the narrator had language and where he didn't — the pacing graph tells that story." },
  { name: "Out-of-order chronology as deliberate choice", note: "E18 placed after E15. E19 before E18 chronologically. The disruptions in the timeline are the story." },
  { name: "Matt's death positioned at the structural center", note: "E34, the construction phase. Not at the emotional peak — at the fulcrum. Structurally, this makes it the thing the memoir balances on." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
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
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const [ref, visible] = useInView(0.1);
  const transforms = {
    up: "translateY(60px)",
    down: "translateY(-60px)",
    left: "translateX(60px)",
    right: "translateX(-60px)",
    none: "none"
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 100,
      background: "rgba(30,28,25,0.8)"
    }}>
      <div style={{
        height: "100%", width: `${progress * 100}%`,
        background: "linear-gradient(90deg, #D4944C, #C9A84C)",
        transition: "width 0.1s linear"
      }} />
    </div>
  );
}

function HeroSection() {
  const [ref, visible] = useInView(0.01);
  return (
    <section ref={ref} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", padding: "100px 24px 40px",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(212,148,76,0.06) 0%, transparent 70%)"
      }} />
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        textAlign: "center", maxWidth: "720px", position: "relative"
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
          letterSpacing: "4px", color: "#D4944C", textTransform: "uppercase",
          marginBottom: "32px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.3s"
        }}>
          Nine Models &middot; One Architecture &middot; Zero Prose
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 7vw, 72px)",
          fontWeight: 400, color: "#F0E6D6", lineHeight: 1.1, marginBottom: "24px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s"
        }}>
          The Foreword<br />Convergence
        </h1>
        <div style={{
          width: "60px", height: "1px", background: "#D4944C",
          margin: "32px auto",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.8s"
        }} />
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px",
          color: "#A89B8C", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s"
        }}>
          Nine AI models were given the structural architecture of a memoir — 
          the thematic clusters, the narrative arcs, the motifs — but not a single 
          word of prose. Each wrote a foreword independently. They all found the 
          same load-bearing walls.
        </p>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "15px", color: "#6B5F52", marginTop: "48px",
          fontStyle: "italic",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1.3s"
        }}>
          For <em>Little to Know Experience</em> by Dave Kitchens
        </p>
      </div>
      <div style={{
        position: "absolute", bottom: "40px",
        opacity: visible ? 0.4 : 0,
        transition: "opacity 1s ease 1.6s",
        animation: "gentleBounce 2.5s ease-in-out infinite"
      }}>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="#A89B8C" strokeWidth="1.5"/>
          <circle cx="10" cy="10" r="2" fill="#D4944C">
            <animate attributeName="cy" values="8;18;8" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </section>
  );
}

function PremiseSection() {
  return (
    <section style={{
      padding: "120px 24px", maxWidth: "640px", margin: "0 auto"
    }}>
      <FadeIn>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "20px", lineHeight: 1.8, color: "#C4B5A0"
        }}>
          The prompt was simple: here is the architecture of a book. Two arcs, not one.
          A kitchen that appears seven times. A wife who enters at excerpt 30 and becomes
          load-bearing by 44. A sentence about certified mail that operates as thesis.
          A 427-word excerpt that functions as a black hole.
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "20px", lineHeight: 1.8, color: "#C4B5A0", marginTop: "32px"
        }}>
          Write a foreword. You have not read the prose. You have read the architecture.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "20px", lineHeight: 1.8, color: "#8A7D6E", marginTop: "32px"
        }}>
          What follows is what they found.
        </p>
      </FadeIn>
    </section>
  );
}

function CouncilMemberSection({ member, index }: { member: typeof COUNCIL[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <section style={{
      padding: "100px 24px 120px",
      position: "relative",
      borderTop: "1px solid rgba(212,148,76,0.08)"
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn direction={isEven ? "left" : "right"}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{
              display: "flex", alignItems: "baseline", gap: "12px",
              marginBottom: "6px", flexWrap: "wrap"
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                letterSpacing: "3px", color: member.color, textTransform: "uppercase"
              }}>
                {member.model}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                color: "#4A4139"
              }}>
                /
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                color: "#6B5F52", letterSpacing: "1px"
              }}>
                {member.role}
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 400, color: "#F0E6D6", marginTop: "8px"
            }}>
              {member.name}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "19px", lineHeight: 1.85, color: "#C4B5A0",
            borderLeft: `2px solid ${member.color}`,
            paddingLeft: "28px", margin: "0 0 48px 0",
            whiteSpace: "pre-line"
          }}>
            {member.passage}
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{
            display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "48px"
          }}>
            <div style={{ flex: "1 1 200px" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                letterSpacing: "3px", color: "#6B5F52", textTransform: "uppercase",
                marginBottom: "12px"
              }}>
                Motifs Found
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {member.motifs.map(m => (
                  <span key={m} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                    color: "#A89B8C", background: "rgba(212,148,76,0.08)",
                    padding: "4px 10px", borderRadius: "2px",
                    border: "1px solid rgba(212,148,76,0.12)"
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                letterSpacing: "3px", color: "#6B5F52", textTransform: "uppercase",
                marginBottom: "12px"
              }}>
                Blind Spots
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {member.missed.map(m => (
                  <span key={m} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                    color: "#6B5F52", background: "rgba(107,95,82,0.1)",
                    padding: "4px 10px", borderRadius: "2px",
                    border: "1px solid rgba(107,95,82,0.15)"
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ConvergenceSection() {
  return (
    <section style={{
      padding: "120px 24px", position: "relative",
      background: "linear-gradient(180deg, transparent, rgba(212,148,76,0.03) 50%, transparent)"
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
            letterSpacing: "4px", color: "#D4944C", textTransform: "uppercase",
            marginBottom: "32px", textAlign: "center"
          }}>
            The Convergence
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 400,
            color: "#F0E6D6", textAlign: "center", lineHeight: 1.2,
            marginBottom: "64px"
          }}>
            What every model found
          </h2>
        </FadeIn>

        {ALL_MOTIFS.map((motif, i) => (
          <FadeIn key={motif.name} delay={i * 0.06}>
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px 0",
              borderBottom: "1px solid rgba(212,148,76,0.06)"
            }}>
              <div style={{
                width: "32px", textAlign: "right",
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px", color: "#D4944C", fontWeight: 400
              }}>
                {motif.count}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", letterSpacing: "2px",
                color: "#6B5F52", textTransform: "uppercase",
                width: "80px"
              }}>
                {motif.type}
              </div>
              <div style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "17px", color: "#C4B5A0", flex: 1
              }}>
                {motif.name}
              </div>
              <div style={{
                height: "3px",
                width: `${(motif.count / 9) * 120}px`,
                background: `linear-gradient(90deg, #D4944C, rgba(212,148,76,${motif.count / 9}))`,
                borderRadius: "2px",
                flexShrink: 0
              }} />
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.5}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "18px", lineHeight: 1.8, color: "#8A7D6E",
            textAlign: "center", marginTop: "64px", fontStyle: "italic"
          }}>
            Nine models. No coordination. One consensus:<br/>
            <span style={{ color: "#C4B5A0" }}>
              &ldquo;A mind built for control trying to survive seasons where control fails.&rdquo;
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function MissedSection() {
  return (
    <section style={{ padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
            letterSpacing: "4px", color: "#6B5F52", textTransform: "uppercase",
            marginBottom: "32px", textAlign: "center"
          }}>
            The Blind Spots
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 400,
            color: "#F0E6D6", textAlign: "center", lineHeight: 1.2,
            marginBottom: "24px"
          }}>
            What every model missed
          </h2>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "17px", color: "#8A7D6E", textAlign: "center",
            marginBottom: "64px", lineHeight: 1.7
          }}>
            The dashboard sees what the forewords don&apos;t. The gap between 
            structural analysis and literary interpretation is where the 
            next essay lives.
          </p>
        </FadeIn>

        {MISSED.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              marginBottom: "40px", padding: "28px",
              background: "rgba(107,95,82,0.06)",
              borderLeft: "2px solid rgba(107,95,82,0.2)",
              borderRadius: "0 4px 4px 0"
            }}>
              <p style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "17px", color: "#C4B5A0", marginBottom: "12px",
                fontWeight: 600
              }}>
                {item.name}
              </p>
              <p style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "15px", color: "#8A7D6E", lineHeight: 1.7
              }}>
                {item.note}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function DexInsightSection() {
  return (
    <section style={{
      padding: "120px 24px 80px", position: "relative",
      background: "linear-gradient(180deg, transparent, rgba(212,148,76,0.04) 50%, transparent)"
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
            letterSpacing: "4px", color: "#D4944C", textTransform: "uppercase",
            marginBottom: "32px", textAlign: "center"
          }}>
            The DexInsight
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400,
            color: "#F0E6D6", textAlign: "center", lineHeight: 1.3,
            marginBottom: "16px"
          }}>
            Each model was asked for one observation<br/>
            the operator probably doesn&apos;t fully see
          </h2>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "16px", color: "#6B5F52", textAlign: "center",
            marginBottom: "80px", fontStyle: "italic"
          }}>
            From the Operator Profile — a separate exercise,<br/>
            written months before the forewords.
          </p>
        </FadeIn>

        {COUNCIL.map((member, i) => (
          <FadeIn key={member.id} delay={i * 0.08}>
            <div style={{
              marginBottom: "36px", padding: "0 0 36px 0",
              borderBottom: i < COUNCIL.length - 1 ? "1px solid rgba(212,148,76,0.06)" : "none"
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px", color: "#E8DDD0", lineHeight: 1.6,
                marginBottom: "10px"
              }}>
                &ldquo;{member.dexinsight}&rdquo;
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", letterSpacing: "2px",
                color: member.color, textTransform: "uppercase"
              }}>
                {member.name} &middot; {member.model}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section style={{
      minHeight: "80vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "120px 24px", position: "relative"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 70%, rgba(212,148,76,0.04) 0%, transparent 60%)"
      }} />
      <FadeIn>
        <div style={{ textAlign: "center", maxWidth: "600px", position: "relative" }}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "20px", color: "#8A7D6E", lineHeight: 1.8,
            marginBottom: "48px"
          }}>
            The forewords describe the book: a mind built for control
            surviving seasons where control fails.
          </p>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "20px", color: "#8A7D6E", lineHeight: 1.8,
            marginBottom: "48px"
          }}>
            The Operator Profile describes the builder: the systems
            aren&apos;t the product — Dave is the system.
          </p>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "20px", color: "#C4B5A0", lineHeight: 1.8,
            marginBottom: "64px"
          }}>
            They&apos;re the same sentence, written in two different languages.
            One is how he works. The other is what he survived.
          </p>
          <div style={{
            width: "60px", height: "1px",
            background: "#D4944C", margin: "0 auto 48px"
          }} />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5vw, 40px)", color: "#F0E6D6",
            fontWeight: 400, fontStyle: "italic", lineHeight: 1.3,
            marginBottom: "24px"
          }}>
            Little to Know Experience
          </p>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "15px", color: "#6B5F52", fontStyle: "italic"
          }}>
            The gap between living it and knowing it.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", letterSpacing: "3px",
          color: "#3D362F", textTransform: "uppercase",
          marginTop: "80px", textAlign: "center"
        }}>
          Filed by the Nine-Model Architecture Council &middot; March 1, 2026
          <br />
          Chaos → Structured → Automated
        </p>
      </FadeIn>
    </section>
  );
}

export default function ForewordsPage() {
  return (
    <div style={{
      background: "#1A1714",
      color: "#F0E6D6",
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400&display=swap');
        
        ::selection {
          background: rgba(212,148,76,0.3);
          color: #F0E6D6;
        }
        
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
      
      <ProgressBar />
      <HeroSection />
      <PremiseSection />
      {COUNCIL.map((member, i) => (
        <CouncilMemberSection key={member.id} member={member} index={i} />
      ))}
      <ConvergenceSection />
      <MissedSection />
      <DexInsightSection />
      <ClosingSection />
    </div>
  );
}
