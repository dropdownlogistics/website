"use client";
import { useState, useCallback } from "react";

// ── MDN Extractor logic ──────────────────────────────────────────────
const CATEGORIES = {
  BLD:    { label: "Building Block",     color: "#22C55E", desc: "Durable shift in capability or understanding" },
  GOV:    { label: "Governance",         color: "#C49A3C", desc: "Boundary, disclaimer, or constraint" },
  OBS:    { label: "Process Observation",color: "#6B9DC2", desc: "Noticing how work is happening" },
  FEAR:   { label: "Fear Named",         color: "#B23531", desc: "Internal blocker surfaced" },
  META:   { label: "Meta / Recursive",   color: "#8a6cc9", desc: "Note about a note" },
  CAP:    { label: "Capture",            color: "#4A9E6B", desc: "Default — raw thought preserved" },
  FUTURE: { label: "Future",             color: "#F5F1EB", desc: "Time-locked note for later retrieval" },
};

function detectCategory(text) {
  const t = text.toLowerCase();
  if (t.includes("[future]") || t.includes("passcode") || t.includes("retrieve later")) return "FUTURE";
  if (t.includes("building block") || t.includes("[bld]") || t.includes("canon") || t.includes("ratif")) return "BLD";
  if (t.includes("[gov]") || t.includes("do not") || t.includes("disclai") || t.includes("boundary") || t.includes("patholog")) return "GOV";
  if (t.includes("afraid") || t.includes("fear") || t.includes("anxiety") || t.includes("worried") || t.includes("guilt") || t.includes("nervous")) return "FEAR";
  return "CAP";
}

function extractMDNs(text) {
  const results = [];
  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const mdnMatch = line.match(/^\*{0,8}(M+DN)\s*[\[\:\-–]\s*(.*)/i);
    if (mdnMatch) {
      const prefix = mdnMatch[1].toUpperCase();
      const depth = (prefix.match(/M/g) || []).length;
      let content = mdnMatch[2].trim();
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (!next || next.match(/^\*{0,8}M+DN\s*[\[\:\-–]/i) || next.startsWith("-----") || next.startsWith("#")) break;
        if (next.match(/^\*{4,}$/) || next.match(/^-{4,}$/)) { j++; break; }
        content += " " + next.replace(/\*+$/, "").trim();
        j++;
      }
      content = content.replace(/\*+$/, "").trim();
      if (content.length > 2) {
        results.push({ depth, content, cat: detectCategory(content), id: results.length });
      }
      i = j;
    } else { i++; }
  }
  return results;
}

function depthLabel(depth) { return "M".repeat(depth) + "DN"; }

// ── Styles ───────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "#0D1B2A",
    color: "#F5F1EB",
    fontFamily: "'Source Serif 4', Georgia, serif",
  },
  inner: { maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" },

  // Nav
  nav: {
    padding: "16px 24px",
    borderBottom: "1px solid rgba(245,241,235,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  navBack: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: "#6B7B8D",
    textDecoration: "none",
    letterSpacing: "0.06em",
  },
  navBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#8a6cc9",
    background: "rgba(138,108,201,0.1)",
    border: "1px solid rgba(138,108,201,0.25)",
    padding: "3px 10px",
    borderRadius: 100,
    letterSpacing: "0.06em",
  },

  // Hero
  hero: { padding: "64px 0 48px" },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#8a6cc9",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  eyebrowLine: { width: 24, height: 1, background: "#8a6cc9" },
  heroTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1.0,
    marginBottom: 6,
  },
  heroSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: "#6B7B8D",
    letterSpacing: "0.08em",
    marginBottom: 28,
  },
  heroDesc: {
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "rgba(245,241,235,0.7)",
    maxWidth: 620,
  },

  // Section
  section: { marginBottom: 56 },
  sectionNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#8a6cc9",
    letterSpacing: "0.12em",
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    marginBottom: 14,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(245,241,235,0.06)",
  },
  body: {
    fontSize: "0.95rem",
    lineHeight: 1.85,
    color: "rgba(245,241,235,0.7)",
    marginBottom: 16,
  },

  // MDN tag display
  tagRow: { display: "flex", flexDirection: "column", gap: 10, margin: "20px 0" },
  tagLine: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    padding: "12px 16px",
    background: "#10202f",
    border: "1px solid rgba(245,241,235,0.06)",
    borderRadius: 6,
  },
  tag: (color) => ({
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color,
    background: color + "22",
    padding: "3px 10px",
    borderRadius: 4,
    fontWeight: 700,
    letterSpacing: "0.06em",
    flexShrink: 0,
    whiteSpace: "nowrap",
  }),
  tagDesc: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: "rgba(245,241,235,0.45)",
    lineHeight: 1.6,
    paddingTop: 2,
  },

  // Pull quote
  pullQuote: {
    borderLeft: "3px solid #8a6cc9",
    paddingLeft: 20,
    margin: "28px 0",
    fontStyle: "italic",
    fontSize: "1rem",
    color: "rgba(245,241,235,0.6)",
    lineHeight: 1.8,
  },

  // Lifecycle steps
  lifecycleSteps: { display: "flex", flexDirection: "column", gap: 2, margin: "20px 0" },
  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "14px 18px",
    background: "#10202f",
    border: "1px solid rgba(245,241,235,0.05)",
  },
  stepNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#8a6cc9",
    background: "rgba(138,108,201,0.12)",
    border: "1px solid rgba(138,108,201,0.2)",
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepText: { fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(245,241,235,0.7)" },
  stepTitle: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 3, color: "#F5F1EB" },

  // Category grid
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 10,
    margin: "20px 0",
  },
  catCard: (color) => ({
    background: "#10202f",
    border: `1px solid ${color}33`,
    borderTop: `2px solid ${color}`,
    borderRadius: 6,
    padding: "12px 14px",
  }),
  catLabel: (color) => ({
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color,
    fontWeight: 700,
    letterSpacing: "0.06em",
    marginBottom: 4,
  }),
  catDesc: {
    fontFamily: "'Source Serif 4', serif",
    fontSize: "0.78rem",
    color: "rgba(245,241,235,0.5)",
    lineHeight: 1.5,
  },

  // Divider
  divider: { height: 1, background: "rgba(245,241,235,0.06)", margin: "48px 0" },

  // Tool section
  toolHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 8,
  },
  toolTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  toolBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#C49A3C",
    background: "#C49A3C22",
    padding: "2px 8px",
    borderRadius: 4,
  },
  toolDesc: { color: "rgba(245,241,235,0.6)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 20 },
  textarea: {
    width: "100%",
    height: 160,
    background: "#10202f",
    border: "1px solid rgba(245,241,235,0.1)",
    borderRadius: 8,
    color: "#F5F1EB",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    padding: 14,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: 1.6,
    marginBottom: 12,
  },
  btnPrimary: (active) => ({
    background: active ? "#B23531" : "#B2353155",
    color: "#F5F1EB",
    border: "none",
    borderRadius: 6,
    padding: "10px 22px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 700,
    cursor: active ? "pointer" : "not-allowed",
    letterSpacing: 1,
  }),
  btnSecondary: (color = "#F5F1EB") => ({
    background: "#10202f",
    color,
    border: `1px solid ${color}33`,
    borderRadius: 6,
    padding: "10px 22px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    cursor: "pointer",
  }),
  filterBtn: (active, color) => ({
    background: active ? color + "33" : "transparent",
    color: active ? color : color + "88",
    border: `1px solid ${color}${active ? "77" : "33"}`,
    borderRadius: 4,
    padding: "4px 10px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    cursor: "pointer",
  }),
  mdnCard: (cat, depth) => ({
    marginLeft: (depth - 1) * 20,
    background: "#10202f",
    border: `1px solid ${cat.color}33`,
    borderLeft: `3px solid ${cat.color}`,
    borderRadius: 6,
    padding: "12px 16px",
    marginBottom: 10,
  }),

  // Footer
  footer: {
    marginTop: 48,
    paddingTop: 20,
    borderTop: "1px solid rgba(245,241,235,0.06)",
    display: "flex",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "rgba(245,241,235,0.2)",
  },
};

// ── Page ─────────────────────────────────────────────────────────────
export default function MDNPage() {
  const [input, setInput] = useState("");
  const [mdns, setMdns] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [extracted, setExtracted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExtract = useCallback(() => {
    setMdns(extractMDNs(input));
    setExtracted(true);
    setFilter("ALL");
  }, [input]);

  const handleCategoryChange = useCallback((id, newCat) => {
    setMdns(prev => prev.map(m => m.id === id ? { ...m, cat: newCat } : m));
  }, []);

  const filtered = filter === "ALL" ? mdns : mdns.filter(m => m.cat === filter);
  const counts = Object.fromEntries(Object.keys(CATEGORIES).map(k => [k, mdns.filter(m => m.cat === k).length]));

  const exportTxt = () => {
    const lines = ["# MDN EXTRACT", `# ${new Date().toLocaleString()}`, ""];
    Object.entries(CATEGORIES).forEach(([k, v]) => {
      const group = mdns.filter(m => m.cat === k);
      if (!group.length) return;
      lines.push(`## ${v.label} (${group.length})`);
      group.forEach(m => lines.push(`*${depthLabel(m.depth)}: ${m.content}`));
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `MDN-Extract-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(mdns.map(m => `[${depthLabel(m.depth)}/${m.cat}] ${m.content}`).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <a href="/dexverse" style={S.navBack}>← DexVerse</a>
        <span style={S.navBadge}>EMP v0.3 · CANONIZED 2026-03-20</span>
      </nav>

      <div style={S.inner}>

        {/* Hero */}
        <div style={S.hero}>
          <div style={S.eyebrow}>
            <div style={S.eyebrowLine}></div>
            DDL Protocol · PRO-DDL-MDN-001
          </div>
          <h1 style={S.heroTitle}>MDN</h1>
          <div style={S.heroSub}>Meta Dave Note · Working memory · Not permanent record</div>
          <p style={S.heroDesc}>
            A real-time annotation embedded in conversation. The thing that holds a thought in external memory until it becomes internal memory. Not a note-taking system. A cognitive exhaust capture layer.
          </p>
        </div>

        {/* 01 — What it is */}
        <div style={S.section}>
          <div style={S.sectionNum}>01</div>
          <div style={S.sectionTitle}>What an MDN is</div>
          <p style={S.body}>
            MDN stands for Meta Dave Note. The name is deliberately personal. It is not a framework. It is not a methodology you adopt. It is a specific operator's working memory made legible during active construction.
          </p>
          <p style={S.body}>
            The purpose is simple: capture the thought now, without derailing the work. The corpus gets the signal. You get to keep moving. When the thought becomes internalized — when the scaffolding is no longer needed — the MDN stops appearing. The corpus keeps the record. The operator keeps the understanding.
          </p>
          <div style={S.pullQuote}>
            "Working memory, not permanent record. Some scaffold. Some stay. The operator decides."
          </div>
        </div>

        {/* 02 — Format */}
        <div style={S.section}>
          <div style={S.sectionNum}>02</div>
          <div style={S.sectionTitle}>How the format works</div>
          <p style={S.body}>
            The format is minimal by design. A prefix, a colon, the thought. M-count indicates nesting depth — each additional M means a thought within a thought.
          </p>
          <div style={S.tagRow}>
            {[
              { tag: "*MDN:", color: "#8a6cc9", desc: "Primary observation. The thought itself." },
              { tag: "*MMDN:", color: "#6B9DC2", desc: "Meta observation. A note about the note." },
              { tag: "*MMMDN:", color: "#C49A3C", desc: "Meta-meta layer. A thought about the note about the note." },
              { tag: "*MMMMDN:", color: "#4A9E6B", desc: "Each additional M = one more level of nesting. It goes as deep as needed." },
            ].map(({ tag, color, desc }) => (
              <div key={tag} style={S.tagLine}>
                <span style={S.tag(color)}>{tag}</span>
                <span style={S.tagDesc}>{desc}</span>
              </div>
            ))}
          </div>
          <p style={S.body}>
            Claude's UI may render the asterisks as bold or italic. That's fine. The <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8a6cc9", fontSize: 12 }}>*MDN:</code> tag is distinctive enough to serve as an identifier regardless of how it renders.
          </p>
          <p style={S.body}>
            Dex Jr. sweeps for <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8a6cc9", fontSize: 12 }}>*MDN:</code> automatically at corpus ingestion. The operator does not need to manage them.
          </p>
        </div>

        {/* 03 — Lifecycle */}
        <div style={S.section}>
          <div style={S.sectionNum}>03</div>
          <div style={S.sectionTitle}>The lifecycle</div>
          <p style={S.body}>
            MDNs are not permanent. They exist until they are no longer needed. Internalization is the exit condition.
          </p>
          <div style={S.lifecycleSteps}>
            {[
              { n: "1", title: "Thought appears during active work", text: "Something needs to be captured but the work shouldn't stop. The MDN holds the thought externally." },
              { n: "2", title: "The corpus receives it", text: "Dex Jr. sweeps the session and ingests the MDN with full context. It is now retrievable and queryable." },
              { n: "3", title: "The operator works with it", text: "Some MDNs scaffold future work. Some name a pattern. Some surface a blocker. Some just capture. All of them are valid." },
              { n: "4", title: "Internalization", text: "The thought becomes internal knowledge. The MDN stops appearing. The scaffolding comes down. The structure it built stays standing." },
            ].map(({ n, title, text }) => (
              <div key={n} style={{ ...S.step, borderRadius: n === "1" ? "6px 6px 0 0" : n === "4" ? "0 0 6px 6px" : 0 }}>
                <div style={S.stepNum}>{n}</div>
                <div>
                  <div style={S.stepTitle}>{title}</div>
                  <div style={S.stepText}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 04 — Origin */}
        <div style={S.section}>
          <div style={S.sectionNum}>04</div>
          <div style={S.sectionTitle}>How it emerged</div>
          <p style={S.body}>
            The system was not designed. It emerged. The behavior existed before the format had a name. The operator was already leaving annotations in conversation — thoughts that were too important to lose, not important enough to stop for.
          </p>
          <p style={S.body}>
            Naming it made it retrievable. It did not create it. The pattern was already there. The protocol is the recognition, not the invention.
          </p>
          <div style={S.pullQuote}>
            "I didn't invent this. I just noticed it. Naming it so I can use it."
          </div>
          <p style={S.body}>
            The format stabilized through use, not through design. The operator used it until it worked, then noticed what they were actually doing. The protocol wrote itself.
          </p>
        </div>

        {/* 05 — Categories */}
        <div style={S.section}>
          <div style={S.sectionNum}>05</div>
          <div style={S.sectionTitle}>Categories</div>
          <p style={S.body}>
            The extractor auto-assigns categories based on content. They can be adjusted manually. Categories are for routing — they tell the corpus what kind of signal this is.
          </p>
          <div style={S.catGrid}>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <div key={k} style={S.catCard(v.color)}>
                <div style={S.catLabel(v.color)}>{k}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, marginBottom: 4, color: "#F5F1EB" }}>{v.label}</div>
                <div style={S.catDesc}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={S.divider}></div>

        {/* Tool */}
        <div style={{ marginBottom: 48 }}>
          <div style={S.toolHeader}>
            <h2 style={S.toolTitle}>MDN Extractor</h2>
            <span style={S.toolBadge}>PRO-DDL-MDN-001</span>
          </div>
          <p style={S.toolDesc}>
            Paste any document — council review, session log, conversation transcript. The extractor pulls every <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a6cc9" }}>*MDN:</code> and its variants, auto-categorizes, and lets you sort and export before routing to the corpus.
          </p>

          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste a document containing *MDN: notes..."
            style={S.textarea}
          />

          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            <button onClick={handleExtract} disabled={!input.trim()} style={S.btnPrimary(!!input.trim())}>
              EXTRACT MDNs
            </button>
            {extracted && mdns.length > 0 && (
              <>
                <button onClick={copyAll} style={S.btnSecondary(copied ? "#22C55E" : "#F5F1EB")}>
                  {copied ? "COPIED ✓" : "COPY ALL"}
                </button>
                <button onClick={exportTxt} style={S.btnSecondary("#C49A3C")}>
                  EXPORT .TXT
                </button>
              </>
            )}
          </div>

          {extracted && (
            <>
              {mdns.length === 0 ? (
                <div style={{ background: "#10202f", border: "1px solid rgba(245,241,235,0.08)", borderRadius: 8, padding: 40, textAlign: "center", color: "rgba(245,241,235,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                  No MDNs found. Make sure they use *MDN:, *MMDN:, etc.
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ color: "rgba(245,241,235,0.3)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                      {mdns.length} extracted →
                    </span>
                    <button onClick={() => setFilter("ALL")} style={S.filterBtn(filter === "ALL", "#F5F1EB")}>
                      ALL ({mdns.length})
                    </button>
                    {Object.entries(CATEGORIES).map(([k, v]) => counts[k] > 0 && (
                      <button key={k} onClick={() => setFilter(k)} style={S.filterBtn(filter === k, v.color)}>
                        {k} ({counts[k]})
                      </button>
                    ))}
                  </div>
                  <div>
                    {filtered.map(mdn => {
                      const cat = CATEGORIES[mdn.cat];
                      return (
                        <div key={mdn.id} style={S.mdnCard(cat, mdn.depth)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                            <span style={S.tag(cat.color)}>*{depthLabel(mdn.depth)}:</span>
                            <select value={mdn.cat} onChange={e => handleCategoryChange(mdn.id, e.target.value)} style={{
                              background: "#0D1B2A", border: `1px solid ${cat.color}55`,
                              color: cat.color, fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10, padding: "2px 6px", borderRadius: 4, cursor: "pointer",
                            }}>
                              {Object.entries(CATEGORIES).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                              ))}
                            </select>
                          </div>
                          <p style={{ margin: 0, color: "#F5F1EB", fontSize: 13, lineHeight: 1.7 }}>{mdn.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {!extracted && (
            <div style={{ background: "#10202f", border: "1px solid rgba(245,241,235,0.06)", borderRadius: 8, padding: 20 }}>
              <p style={{ margin: "0 0 14px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "rgba(245,241,235,0.3)", letterSpacing: 1 }}>
                CATEGORY LEGEND
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ ...S.tag(v.color), fontSize: 10 }}>{k}</span>
                    <span style={{ fontSize: 12, color: "rgba(245,241,235,0.5)", lineHeight: 1.4 }}>{v.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <span style={S.footerText}>Dropdown Logistics — Chaos → Structured → Automated</span>
          <span style={{ ...S.footerText, color: "rgba(245,241,235,0.15)" }}>DexJr eats at 3am</span>
        </div>

      </div>
    </div>
  );
}
