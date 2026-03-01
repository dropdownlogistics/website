'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE READING ROOM
// Immersive Excerpt Reader · Little to Know Experience
// Excerpt Seven — The Rhythm
// Preserved aesthetic: warm dark (#141210), Source Serif 4 body
// ═══════════════════════════════════════════════════════════════

interface ExcerptMeta {
  num: number;
  title: string;
  words: number;
  arc: string;
  arcColor: string;
  tags: string[];
  position: string;
  prev: { num: number; title: string };
  next: { num: number; title: string };
  bts: BTSData;
}

interface BTSData {
  title: string;
  notes: string[];
  motifs: string[];
  structural: string;
}

const EXCERPT: ExcerptMeta = {
  num: 7,
  title: "The Rhythm",
  words: 987,
  arc: "Arc 1 — Addiction",
  arcColor: "#D4944C",
  tags: ["ritual", "choreography", "kitchen"],
  position: "Excerpt 7 of 49",
  prev: { num: 6, title: "The Dance" },
  next: { num: 8, title: "Loneliness or Freedom?" },
  bts: {
    title: "Behind the Scenes — E7",
    notes: [
      "This is where the kitchen sequence crystallizes. The choreography described here — freezer, counter, pour — recurs across seven excerpts spanning ten years. It starts as college fun, becomes ritual, goes covert, goes solo, and finally collapses into raw pulls from the bottle.",
      "At 987 words, this is one of the shorter excerpts in Arc 1. The compression is deliberate — the ritual doesn\u2019t need explanation. It needs to be felt.",
      "The \u2018manual transmission\u2019 metaphor wasn\u2019t planned. It arrived in draft and stayed because it\u2019s the only analogy that captures what muscle memory feels like when it\u2019s working against you.",
      "Nine AI models independently identified the kitchen sequence as a core structural motif. All nine cited it without being told to look for it. The choreography is load-bearing.",
    ],
    motifs: ["kitchen choreography", "freezer-counter-pour", "manual transmission", "the line of glasses", "comfort before the alcohol"],
    structural: "E7 functions as the naming ceremony for a pattern that\u2019s been building since E2. The ritual gets its own excerpt because it has become its own character.",
  },
};

const PARAGRAPHS: string[] = [
  `At the beginning, it had reasons.`,
  `It was a weekend, so we drank. There was a game, so we drank. Somebody was coming over, so we drank. The reasons weren\u2019t even really excuses, they were just the language you used to name what everyone was already doing. Alcohol wasn\u2019t the event, it was the accessory. A tone setter. Something to hold. Something to do with your hands while you talked.`,
  `And there were always people around then.`,
  `That mattered to me more than I would have admitted at the time. Drinking alone still had a stigma in my head, even before I had any framework for why. Like there was some invisible rulebook that said: if you\u2019re drinking with people, it\u2019s normal. If you\u2019re drinking alone, it\u2019s a sign. So as long as there were other bodies in the room, I could tell myself I was fine.`,
  `If no one wanted to drink, I could usually convince them.`,
  `I didn\u2019t think of that as coercion. I thought of it as enthusiasm. Selling the vibe. Making the night fun. But it meant the presence of \u201Cother people\u201D wasn\u2019t always a neutral fact. Sometimes it was something I engineered, because it kept the story intact: I\u2019m not drinking alone, so I don\u2019t have a problem.`,
  `I wouldn\u2019t have used the word problem then. I\u2019m just telling you the shape of the logic.`,
  `The drinking itself started to develop a shape too.`,
  `Not the kind of ritual you see in movies, where someone pours slowly and stares into the glass like they\u2019re haunted. This was simpler. Quieter. More practical. It was a kitchen routine that got practiced enough times that it stopped feeling like a choice.`,
  `By then I could do it without looking, like a dance I didn\u2019t remember learning.`,
  `The freezer would open and the cold air would push out into the room for a second. Bottles lined up inside, waiting. I\u2019d reach in, grab what we needed, and pivot on my heel toward the cabinet like my body already knew the route. Shot glasses clinked as they came down, that thin little sound that always felt sharper than it should have. Set them on the counter. Pour. Caps back on. Chaser ready. Everything arranged in a way that made the next step inevitable.`,
  `It was manual transmission.`,
  `Hands and feet doing their thing, brain barely involved. Once you\u2019ve driven a stick enough times, you stop thinking about shifting. You feel the moment for it and you move. You don\u2019t narrate it. You don\u2019t decide it. You just do it.`,
  `That\u2019s what the sequence became.`,
  `And the weird part, the part that took me a long time to understand because it didn\u2019t feel dramatic, was that the comfort started before the alcohol did.`,
  `The relief wasn\u2019t only the first burn down the throat. It was the predictability. The sense that the night was being handled. That we were moving into a mode where the edges would soften, conversation would get easier, the internal friction would drop. Even if nobody said anything profound, even if nothing \u201Chappened,\u201D the act of setting it up made the evening feel like it had a track to run on.`,
  `We\u2019d line up the glasses.`,
  `That image is burned in my head more than any particular story from those nights. A row of little circles on a counter, clear and expectant, like punctuation. Like a sentence about to start. The glasses didn\u2019t just hold vodka. They held the promise that the next hour would be easier to live inside.`,
  `We\u2019d take them, reset, pour again when it made sense. Sometimes it was three at a time, sometimes it was whatever the rhythm wanted, but the number wasn\u2019t the point. The point was that it had become a rhythm.`,
  `And as long as there were other people laughing in the background, as long as it was a weekend or a game or a reason that sounded normal, I didn\u2019t have to look too hard at what the rhythm was doing.`,
  `I just watched the line of glasses and felt the night click into gear.`,
];

const EMPHASIS_PARAGRAPHS = [0, 4, 6, 9, 11, 13, 16, 20];
const PULLQUOTE_INDEX = 17;

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | HTMLParagraphElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | HTMLParagraphElement | null>(null);
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

function Paragraph({ text, index, isEmphasis, isPullquote }: {
  text: string;
  index: number;
  isEmphasis: boolean;
  isPullquote: boolean;
}) {
  const [ref, visible] = useInView(0.1);

  if (isPullquote) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          margin: "56px 0",
          padding: "0 0 0 28px",
          borderLeft: "2px solid rgba(178,53,49,0.4)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(22px, 3.5vw, 28px)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#E8DDD0",
          lineHeight: 1.6,
        }}>
          {text}
        </p>
      </div>
    );
  }

  return (
    <p
      ref={ref as React.RefObject<HTMLParagraphElement>}
      style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: isEmphasis ? "clamp(19px, 2.8vw, 22px)" : "clamp(17px, 2.5vw, 20px)",
        fontWeight: isEmphasis ? 500 : 400,
        color: isEmphasis ? "#E8DDD0" : "#B8ADA0",
        lineHeight: 1.85,
        marginBottom: isEmphasis ? "20px" : "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s`,
      }}
    >
      {text}
    </p>
  );
}

function BTSDrawer({ open, onClose, bts }: { open: boolean; onClose: () => void; bts: BTSData }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(10,8,6,0.7)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
          zIndex: 90,
        }}
      />
      <div style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0,
        width: "min(420px, 85vw)",
        background: "#151210",
        borderLeft: "1px solid rgba(212,148,76,0.08)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 100,
        overflowY: "auto",
        padding: "48px 32px",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "none", border: "none", cursor: "pointer",
            color: "#6B5F52", fontSize: "18px", fontFamily: "'Source Serif 4', serif",
          }}
        >
          &#10005;
        </button>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
          letterSpacing: "3px", color: "#D4944C",
          textTransform: "uppercase", marginBottom: "24px"
        }}>
          Behind the Scenes
        </p>

        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "24px", fontWeight: 400, color: "#F0E6D6",
          marginBottom: "32px"
        }}>
          {bts.title}
        </h3>

        {bts.notes.map((note, i) => (
          <p key={i} style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "15px", color: "#A89B8C", lineHeight: 1.7,
            marginBottom: "20px"
          }}>
            {note}
          </p>
        ))}

        <div style={{ marginTop: "40px" }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
            letterSpacing: "3px", color: "#6B5F52",
            textTransform: "uppercase", marginBottom: "12px"
          }}>
            Motifs
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {bts.motifs.map(m => (
              <span key={m} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                letterSpacing: "1px", color: "#A89B8C",
                background: "rgba(212,148,76,0.06)",
                padding: "4px 10px", borderRadius: "2px",
                border: "1px solid rgba(212,148,76,0.08)"
              }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
            letterSpacing: "3px", color: "#6B5F52",
            textTransform: "uppercase", marginBottom: "12px"
          }}>
            Structural Note
          </p>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "14px", color: "#8A7D6E", lineHeight: 1.7,
            fontStyle: "italic"
          }}>
            {bts.structural}
          </p>
        </div>
      </div>
    </>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 80,
      background: "rgba(20,18,14,0.8)"
    }}>
      <div style={{
        height: "100%",
        width: `${progress * 100}%`,
        background: "linear-gradient(90deg, rgba(178,53,49,0.6), rgba(178,53,49,0.3))",
        transition: "width 0.1s linear"
      }} />
    </div>
  );
}

export default function ReadingRoomPage() {
  const [btsOpen, setBtsOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let lastY = 0;
    const handler = () => {
      const y = window.scrollY;
      setHeaderVisible(y < 100 || y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{
      background: "#141210",
      color: "#E8DDD0",
      minHeight: "100vh",
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::selection { background: rgba(178,53,49,0.3); color: #F0E6D6; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #141210; }
        ::-webkit-scrollbar-thumb { background: #2A2520; border-radius: 2px; }
      `}</style>

      <ReadingProgress />

      {/* Floating header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0,
        padding: "16px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "linear-gradient(180deg, rgba(20,18,16,0.95) 0%, transparent 100%)",
        zIndex: 50,
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "none" : "translateY(-100%)",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/memoir" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
            letterSpacing: "2px", color: "#4A4139", textDecoration: 'none',
            textTransform: "uppercase", transition: 'color 0.2s ease',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4944C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4A4139')}
          >
            &larr; MEMOIR
          </a>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px",
            letterSpacing: "2px", color: "#4A4139", textTransform: "uppercase"
          }}>
            E{EXCERPT.num} &middot; {EXCERPT.title}
          </span>
        </div>
        <button
          onClick={() => setBtsOpen(true)}
          style={{
            background: "none", border: "1px solid rgba(212,148,76,0.15)",
            borderRadius: "3px", padding: "6px 14px", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
            letterSpacing: "2px", color: "#6B5F52", textTransform: "uppercase",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,148,76,0.3)"; e.currentTarget.style.color = "#A89B8C"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,148,76,0.15)"; e.currentTarget.style.color = "#6B5F52"; }}
        >
          BTS
        </button>
      </header>

      {/* Title section */}
      <section style={{
        minHeight: "80vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "140px 24px 80px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px",
          letterSpacing: "4px", color: EXCERPT.arcColor,
          textTransform: "uppercase", marginBottom: "24px",
          opacity: 0, animation: "fadeIn 1s ease 0.2s forwards"
        }}>
          Excerpt Seven
        </p>
        <h1 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(40px, 8vw, 72px)",
          fontWeight: 300, color: "#F0E6D6",
          lineHeight: 1.05, marginBottom: "20px",
          letterSpacing: "-0.02em",
          opacity: 0, animation: "fadeIn 1s ease 0.5s forwards"
        }}>
          The Rhythm
        </h1>
        <div style={{
          width: "40px", height: "1px",
          background: "rgba(178,53,49,0.4)",
          margin: "0 auto",
          opacity: 0, animation: "fadeIn 1s ease 0.8s forwards"
        }} />
      </section>

      {/* The prose */}
      <article style={{
        maxWidth: "620px",
        margin: "0 auto",
        padding: "0 24px 120px",
      }}>
        {PARAGRAPHS.map((text, i) => (
          <Paragraph
            key={i}
            text={text}
            index={i}
            isEmphasis={EMPHASIS_PARAGRAPHS.includes(i)}
            isPullquote={i === PULLQUOTE_INDEX}
          />
        ))}
      </article>

      {/* Navigation footer */}
      <footer style={{
        maxWidth: "620px",
        margin: "0 auto",
        padding: "0 24px 80px",
      }}>
        <div style={{
          borderTop: "1px solid rgba(212,148,76,0.06)",
          paddingTop: "40px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
              letterSpacing: "2px", color: "#4A4139",
              textTransform: "uppercase", marginBottom: "4px"
            }}>
              Previous
            </p>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "16px", color: "#8A7D6E", cursor: "pointer",
            }}>
              &larr; E{EXCERPT.prev.num} &middot; {EXCERPT.prev.title}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px",
              letterSpacing: "2px", color: "#4A4139",
              textTransform: "uppercase", marginBottom: "4px"
            }}>
              Next
            </p>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "16px", color: "#8A7D6E", cursor: "pointer",
            }}>
              E{EXCERPT.next.num} &middot; {EXCERPT.next.title} &rarr;
            </p>
          </div>
        </div>

        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "16px", color: "#4A4139",
            fontStyle: "italic", marginBottom: "8px"
          }}>
            &ldquo;The gap between living it and knowing it.&rdquo;
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
            letterSpacing: "3px", color: "#2A2520",
            textTransform: "uppercase"
          }}>
            Little to Know Experience &middot; Dave Kitchens
          </p>
        </div>
      </footer>

      <BTSDrawer open={btsOpen} onClose={() => setBtsOpen(false)} bts={EXCERPT.bts} />
    </div>
  );
}
