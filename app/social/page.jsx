'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)", crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B", amber: "#C49A3C", blue: "#6B9DC2",
  violet: "#8a6cc9", rose: "#c94a6e", ember: "#c98a4a",
};
const font = { display: "'Space Grotesk', system-ui, sans-serif", mono: "'JetBrains Mono', monospace", body: "'Source Serif 4', Georgia, serif" };

const platforms = [
  {
    name: "X (Twitter)", handle: "@DD_Logistics", url: "https://x.com/DD_Logistics",
    color: C.cream, icon: "𝕏",
    bio: "Building audit-grade systems. Chaos → Structured → Automated.",
    activity: "Updates, builds, methodology threads",
  },
  {
    name: "LinkedIn", handle: "DropDownLogistics", url: "https://www.linkedin.com/company/dropdownlogistics/",
    color: "#0A66C2", icon: "in",
    bio: "Company page — governance-grade systems, AI collaboration, professional network.",
    activity: "Professional updates, methodology, career",
  },
  {
    name: "YouTube", handle: "@DropDownLogistics", url: "https://www.youtube.com/@DropDownLogistics",
    color: "#FF0000", icon: "▶",
    bio: "Home of the YouTube Classroom — teaching thinking like storytelling.",
    activity: "Educational content, system demos, AI collaboration",
  },
  {
    name: "Instagram", handle: "@dropdownlogistics", url: "https://www.instagram.com/dropdownlogistics/",
    color: "#E1306C", icon: "◎",
    bio: "Audit-grade systems, visual builds, behind the methodology.",
    activity: "Visual content, build highlights",
  },
  {
    name: "TikTok", handle: "@dropdownlogistics", url: "https://www.tiktok.com/@dropdownlogistics",
    color: "#00F2EA", icon: "♪",
    bio: "Short-form builds, AI collaboration clips, system sparks.",
    activity: "Short-form content, concept sparks",
  },
  {
    name: "Twitch", handle: "ddlogistics", url: "https://www.twitch.tv/ddlogistics",
    color: "#9146FF", icon: "⬡",
    bio: "Live builds, gaming sessions, and systems in real time.",
    activity: "Live streaming",
  },
  {
    name: "Discord", handle: "chuckdooley", url: null,
    color: "#5865F2", icon: "⌘",
    bio: "Data analytics, video games, and data analytics about video games.",
    activity: "Community, gaming, conversation",
  },
  {
    name: "Substack", handle: "Little to Know Experience", url: "https://dfrictionated.substack.com",
    color: "#FF6719", icon: "✎",
    bio: "The memoir. Weekly posts from 21 years of recovery, discovery, and building.",
    activity: "Weekly memoir excerpts, essays",
  },
];

export default function SocialHub() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fade-card{animation:fadeUp 0.5s ease both}
${platforms.map((_, i) => `.fade-d${i}{animation-delay:${i * 0.07}s}`).join("\n")}
`}</style>

      {/* ═══ Hero ═══ */}
      <div style={{
        padding: "56px 24px 48px", textAlign: "center",
        background: `radial-gradient(ellipse at 50% 0%, ${C.crimson}12 0%, transparent 60%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>
            DROP DOWN LOGISTICS
          </div>

          {/* DDL Mark */}
          <div style={{
            width: 72, height: 72, borderRadius: 14, margin: "0 auto 20px",
            background: `linear-gradient(135deg, ${C.crimson}30, ${C.navy})`,
            border: `2px solid ${C.crimson}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: font.display, fontSize: 26, fontWeight: 700, color: C.cream,
            letterSpacing: "0.05em",
          }}>
            DDL
          </div>

          <h1 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream, lineHeight: 1.1, marginBottom: 10 }}>
            Find Us Everywhere
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.7, fontStyle: "italic", maxWidth: 480, margin: "0 auto" }}>
            One-person operations studio building governance-grade systems through AI collaboration. Chaos → Structured → Automated.
          </p>

          {/* Quick stat strip */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { value: "44", label: "Systems" },
              { value: "65", label: "Standards" },
              { value: "26+", label: "Months" },
              { value: "$12/yr", label: "Site Cost" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: C.crimson }}>{s.value}</div>
                <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Platform Cards ═══ */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px 48px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {platforms.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const hasLink = !!p.url;
            const Wrapper = hasLink ? "a" : "div";
            const wrapperProps = hasLink ? {
              href: p.url, target: "_blank", rel: "noopener noreferrer",
              style: { textDecoration: "none", color: "inherit" },
            } : {};

            return (
              <Wrapper key={p.name} {...wrapperProps}>
                <div
                  className={`fade-card fade-d${i}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: isHovered ? C.cardHover : C.card,
                    border: `1px solid ${isHovered ? p.color + "40" : C.border}`,
                    borderRadius: 9, padding: "18px 20px",
                    display: "flex", gap: 16, alignItems: "flex-start",
                    cursor: hasLink ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    transform: isHovered ? "translateY(-1px)" : "none",
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: p.color + "18", border: `1px solid ${p.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: font.display, fontSize: 20, fontWeight: 700, color: p.color,
                    transition: "background 0.2s",
                    ...(isHovered ? { background: p.color + "28" } : {}),
                  }}>
                    {p.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 700, color: C.cream }}>{p.name}</span>
                      {hasLink && (
                        <span style={{ fontFamily: font.mono, fontSize: 9, color: isHovered ? p.color : C.creamDim, transition: "color 0.2s" }}>↗</span>
                      )}
                    </div>
                    <div style={{ fontFamily: font.mono, fontSize: 11, color: p.color, marginBottom: 6 }}>{p.handle}</div>
                    <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6, marginBottom: 6 }}>{p.bio}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{p.activity}</div>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* ═══ Website CTA ═══ */}
        <div style={{
          marginTop: 32, padding: "24px", textAlign: "center",
          background: `linear-gradient(135deg, ${C.crimson}10, ${C.amber}06)`,
          border: `1px solid ${C.crimson}20`, borderRadius: 9,
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Home Base</div>
          <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, marginBottom: 6 }}>dropdownlogistics.com</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, fontStyle: "italic", marginBottom: 16 }}>
            44 systems. 65 standards. 26 months of building. One $12 domain.
          </div>
          <a href="https://dropdownlogistics.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", padding: "10px 28px",
            background: C.crimson, color: C.cream, borderRadius: 6,
            fontFamily: font.mono, fontSize: 11, fontWeight: 600,
            textDecoration: "none", letterSpacing: "0.05em",
          }}>
            Visit the Site →
          </a>
        </div>

        {/* ═══ About Block ═══ */}
        <div style={{ marginTop: 28, padding: "20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 52, height: 52, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, ${C.crimson}20, ${C.amber}15)`,
              border: `1px solid ${C.crimson}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: font.mono, fontSize: 20, color: C.crimson,
            }}>DK</div>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 700, color: C.cream, marginBottom: 3 }}>Dave Kitchens</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, marginBottom: 8 }}>Founder · Architect · Operator</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
                CPA turned systems builder. 10+ years internal audit. I build governance-grade tools using dimensional modeling, Excel architecture, and AI collaboration — then I document everything. The site, the memoir, the systems registry, the design system: all artifacts of the same methodology.
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {["CPA", "Internal Audit", "Excel/VBA", "AI Collaboration", "Dimensional Modeling", "8 Years Sober"].map(t => (
                  <span key={t} style={{ fontFamily: font.mono, fontSize: 8, padding: "2px 7px", borderRadius: 3, background: C.creamGhost, color: C.creamDim, border: `1px solid ${C.border}` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ AI Collaboration Statement ═══ */}
        <div style={{
          marginTop: 16, padding: "16px 20px",
          borderLeft: `3px solid ${C.amber}`, background: C.amber + "06",
          borderRadius: "0 7px 7px 0",
        }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>On AI Collaboration</div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>
            I work with AI models as collaborators, not shortcuts. Nine models across a structured council methodology. Every system, every page, every strategy — documented, governed, and transparent. The AI collaboration isn't hidden. It's the methodology.
          </div>
        </div>

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green}, ${C.violet}, ${C.rose})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Cottage — Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

