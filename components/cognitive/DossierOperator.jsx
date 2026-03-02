import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e",
  roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Collapsible Section Primitive
// ═══════════════════════════════════════════════════════════
function Collapsible({ title, color = C.creamDim, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 11,
            color,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▸
        </span>
        <span style={{ fontFamily: font.mono, fontSize: 11, color, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {title}
        </span>
      </button>
      {open && <div style={{ paddingBottom: 20, paddingLeft: 4 }}>{children}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Stat Card
// ═══════════════════════════════════════════════════════════
function StatCard({ label, value, sub, color = C.cream }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: "14px 16px",
        flex: "1 1 140px",
        minWidth: 130,
      }}
    >
      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Score Row (for instrument breakdowns)
// ═══════════════════════════════════════════════════════════
function ScoreRow({ label, value, max, percentile, color = C.blue, annotation }) {
  const pct = max ? (value / max) * 100 : percentile || 0;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
        <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid }}>{label}</span>
        <span style={{ fontFamily: font.mono, fontSize: 12, color }}>
          {value}{max ? `/${max}` : ""}{percentile ? ` · ${percentile}%ile` : ""}
        </span>
      </div>
      <div style={{ height: 4, background: C.creamGhost, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 2, transition: "width 0.4s" }} />
      </div>
      {annotation && (
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 2, fontStyle: "italic" }}>{annotation}</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Tag Badge
// ═══════════════════════════════════════════════════════════
function Tag({ label, color = C.blue }) {
  return (
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 9,
        padding: "3px 8px",
        borderRadius: 3,
        background: color + "18",
        color,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// Measurement Domain Card
// ═══════════════════════════════════════════════════════════
function DomainCard({ title, date, age, instrument, color, children }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.cream }}>{title}</div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 2 }}>{instrument}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color }}>{date}</div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Age {age}</div>
        </div>
      </div>
      <div style={{ height: 1, background: color + "30", marginBottom: 16 }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Throughline Card (for pattern analysis)
// ═══════════════════════════════════════════════════════════
function Throughline({ title, color, children }) {
  return (
    <div
      style={{
        background: C.card,
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 6px 6px 0",
        padding: "16px 20px",
        marginBottom: 12,
      }}
    >
      <div style={{ fontFamily: font.mono, fontSize: 10, color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Strong Interest Radar (CSS-only visualization)
// ═══════════════════════════════════════════════════════════
function StrongRadar() {
  const themes = [
    { code: "C", label: "Conventional", score: 75, level: "High", color: C.amber },
    { code: "E", label: "Enterprising", score: 40, level: "Average", color: C.green },
    { code: "S", label: "Social", score: 45, level: "Average", color: C.blue },
    { code: "R", label: "Realistic", score: 44, level: "Little", color: C.creamDim },
    { code: "I", label: "Investigative", score: 40, level: "Little", color: C.creamDim },
    { code: "A", label: "Artistic", score: 31, level: "Very Little", color: C.creamDim },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      {themes.map((t) => (
        <div key={t.code} style={{ flex: "1 1 120px", minWidth: 100 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
            <span style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: t.color }}>{t.code}</span>
            <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{t.label}</span>
          </div>
          <div style={{ height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden", marginBottom: 2 }}>
            <div style={{ height: "100%", width: `${t.score}%`, background: t.color, borderRadius: 3 }} />
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: t.color }}>{t.level}</div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Brown EF/A Visualization
// ═══════════════════════════════════════════════════════════
function BrownEFA() {
  const domains = [
    { label: "Activation", t: 70, pct: 95, cls: "Markedly atypical" },
    { label: "Focus", t: 74, pct: 98, cls: "Markedly atypical" },
    { label: "Effort", t: 68, pct: 93, cls: "Moderately atypical" },
    { label: "Emotion", t: 60, pct: 82, cls: "Moderately atypical" },
    { label: "Memory", t: 70, pct: 95, cls: "Markedly atypical" },
    { label: "Action", t: 66, pct: 91, cls: "Moderately atypical" },
  ];
  const getColor = (t) => t >= 70 ? C.crimson : t >= 60 ? C.amber : C.green;
  return (
    <div>
      {domains.map((d) => (
        <div key={d.label} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid }}>{d.label}</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{d.cls}</span>
              <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 600, color: getColor(d.t) }}>T={d.t}</span>
            </div>
          </div>
          <div style={{ height: 5, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${d.pct}%`, background: getColor(d.t), borderRadius: 3, opacity: 0.7 }} />
          </div>
        </div>
      ))}
      <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, marginTop: 12 }}>
        Total Composite: T=70 · 95th %ile · Markedly Atypical
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main DOSSIER Component
// ═══════════════════════════════════════════════════════════
export default function DossierOperator() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* ── TEMPLATE TAG ── */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · DOSSIER · The Operator
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: font.body,
              fontSize: 44,
              fontWeight: 400,
              fontStyle: "italic",
              color: C.cream,
              lineHeight: 1.1,
              margin: "0 0 8px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Dave Kitchens
          </h1>
          <div style={{ fontFamily: font.mono, fontSize: 13, color: C.crimson, letterSpacing: "0.08em", marginBottom: 12 }}>
            D.K. Hale · CPA · Founder, Dropdown Logistics
          </div>

          {/* Status badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            <Tag label="THEME CODE: CES" color={C.amber} />
            <Tag label="BIPOLAR II" color={C.rose} />
            <Tag label="ADHD-PI" color={C.rose} />
            <Tag label="SOBER SINCE 2018" color={C.green} />
            <Tag label="14 DOCUMENTS · 8 INSTRUMENTS · 24 YEARS" color={C.violet} />
          </div>

          {/* Crimson divider */}
          <div style={{ height: 2, width: 56, background: C.crimson, opacity: 0.5 }} />
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* PRIMARY STAT BLOCK */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          <StatCard label="GMAT Total" value="650" sub="82nd percentile · 2008" color={C.blue} />
          <StatCard label="Strong #1 Match" value="CPA" sub="Very Similar · 2005" color={C.amber} />
          <StatCard label="Brown EF Composite" value="T=70" sub="95th %ile dysfunction · 2023" color={C.crimson} />
          <StatCard label="Undergrad GPA" value="3.35" sub="BS Business · KU 2008" color={C.green} />
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SIGNATURE DIRECTIVE — PULL QUOTE */}
        {/* ═══════════════════════════════════════════════ */}
        <div
          style={{
            borderLeft: `3px solid ${C.crimson}`,
            padding: "16px 24px",
            marginBottom: 40,
            background: C.crimsonFaint,
            borderRadius: "0 6px 6px 0",
          }}
        >
          <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.6, margin: 0 }}>
            The instruments measured aptitude, interest, personality, neurology, and behavior across twenty-four years. 
            Every one of them was correct. None of them told the whole story. The life that followed was the reconciliation.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION: MEASUREMENT TIMELINE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
          I · Measurement Domains
        </div>

        {/* ── APTITUDE: PSAT 2001 ── */}
        <DomainCard title="Standardized Aptitude — Sophomore Baseline" date="2001" age="15" instrument="PSAT/NMSQT · School Code 170923" color={C.blue}>
          <ScoreRow label="Verbal" value={49} max={80} percentile={63} color={C.blue} annotation="SAT range: 450–530" />
          <ScoreRow label="Math" value={56} max={80} percentile={81} color={C.green} annotation="SAT range: 520–620" />
          <ScoreRow label="Writing Skills" value={54} max={80} percentile={76} color={C.amber} annotation="SAT range: 500–630" />
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <Tag label="Selection Index: 159" color={C.creamDim} />
            <Tag label="67th Percentile" color={C.creamDim} />
            <Tag label="Career: Undecided" color={C.creamDim} />
          </div>
        </DomainCard>

        {/* ── APTITUDE: PSAT 2002 ── */}
        <DomainCard title="Standardized Aptitude — Junior Year" date="2002" age="16" instrument="PSAT/NMSQT · School Code 170923" color={C.blue}>
          <ScoreRow label="Verbal" value={59} max={80} percentile={83} color={C.blue} annotation="+10 from prior year · SAT range: 550–650" />
          <ScoreRow label="Math" value={65} max={80} percentile={92} color={C.green} annotation="+9 from prior year · SAT range: 610–700 · Top decile" />
          <ScoreRow label="Writing Skills" value={53} max={80} percentile={64} color={C.amber} annotation="-1 from prior year · Essentially flat" />
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <Tag label="Selection Index: 177" color={C.blue} />
            <Tag label="85th Percentile" color={C.blue} />
            <Tag label="Major: Business" color={C.amber} />
            <Tag label="Career: Business/Admin" color={C.amber} />
          </div>
        </DomainCard>

        {/* ── VOCATIONAL: STRONG ── */}
        <DomainCard title="Vocational Interest Profile" date="2/19/2005" age="18" instrument="Strong Interest Inventory · College Edition · ID: 6201373" color={C.amber}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            General Occupational Themes
          </div>
          <StrongRadar />

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
            Top Basic Interest Scales
          </div>
          <ScoreRow label="Computer Activities (C)" value={0} percentile={95} color={C.amber} annotation="Very High Interest — highest single scale" />
          <ScoreRow label="Religious Activities (S)" value={63} max={75} color={C.violet} annotation="High Interest — 63" />
          <ScoreRow label="Athletics (R)" value={61} max={75} color={C.green} annotation="Average Interest — 61" />
          <ScoreRow label="Organizational Mgmt. (E)" value={57} max={75} color={C.green} annotation="High Interest — 57" />
          <ScoreRow label="Mathematics (I)" value={51} max={75} color={C.blue} annotation="Average Interest — sole Investigative survivor" />

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
            Top Occupational Matches
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {["Accountant (VS)", "Bookkeeper (VS)", "Banker (VS)", "Credit Manager (VS)", "Nursing Home Admin (VS)", "Housekeeping Supr. (VS)", "Life Insurance Agent (S)", "Business Ed. Teacher (S)", "Small Business Owner (S)", "HR Director (S)"].map((o) => (
              <Tag key={o} label={o} color={o.includes("VS") ? C.amber : C.creamDim} />
            ))}
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
            Floor Scores — Artistic Domain
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              { label: "Writing", score: 31 },
              { label: "Art", score: 33 },
              { label: "Applied Arts", score: 31 },
              { label: "Overall Artistic", score: 31 },
            ].map((a) => (
              <div key={a.label} style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim }}>
                {a.label}: <span style={{ color: C.rose }}>{a.score}</span>
                <span style={{ fontSize: 9, marginLeft: 3 }}>VL</span>
              </div>
            ))}
          </div>
        </DomainCard>

        {/* ── APTITUDE: GMAT ── */}
        <DomainCard title="Graduate Admissions — The Inversion" date="4/25/2008" age="21" instrument="GMAT · Unofficial Score Report" color={C.blue}>
          <ScoreRow label="Verbal" value={0} percentile={75} color={C.blue} annotation="Up from PSAT 83rd %ile — verbal kept climbing" />
          <ScoreRow label="Quantitative" value={35} max={60} percentile={44} color={C.crimson} annotation="Down from PSAT 92nd %ile — the inversion" />
          <ScoreRow label="Total" value={650} max={800} percentile={82} color={C.green} />
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <Tag label="Sent to: KU Graduate School of Business" color={C.blue} />
            <Tag label="Masters in Accounting & Information Systems" color={C.amber} />
          </div>
        </DomainCard>

        {/* ── ACADEMIC: TRANSCRIPT ── */}
        <DomainCard title="Academic Record" date="2004–2009" age="18–23" instrument="University of Kansas · Official Transcript" color={C.green}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <StatCard label="BS Business" value="3.35" sub="Conferred 5/18/2008" color={C.green} />
            <StatCard label="Master of Acctg" value="3.69" sub="Conferred 5/17/2009" color={C.green} />
            <StatCard label="Total Hours" value="141" sub="111 UG + 30 GR" color={C.creamMid} />
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Notable Coursework
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
            {[
              { course: "Fraud Examination / Forensic Acctg", grade: "A" },
              { course: "Systems Analysis and Design", grade: "A" },
              { course: "Business Computer Networking", grade: "A" },
              { course: "Legal Aspects of Management", grade: "A" },
              { course: "Foundations of Technical Writing", grade: "A" },
              { course: "Advanced Taxation", grade: "A" },
              { course: "IT Project Management", grade: "B" },
              { course: "Information Security", grade: "B" },
              { course: "Business Policy and Strategy", grade: "A" },
              { course: "Advanced Accounting Problems", grade: "A-" },
              { course: "Basketball", grade: "A, A" },
              { course: "Bowling", grade: "A" },
            ].map((c) => (
              <div key={c.course} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{c.course}</span>
                <span style={{ fontFamily: font.mono, fontSize: 12, color: c.grade.startsWith("A") ? C.green : C.creamDim }}>{c.grade}</span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 16, lineHeight: 1.6 }}>
            Transfer credits from Johnson County Community College. Degrees: Bachelor of Science in Business (2008), Master of Accounting (2009).
            Graduate coursework peaks in accounting/IS integration — the exact intersection of the Strong's two highest interest domains.
          </div>
        </DomainCard>

        {/* ── NEUROLOGICAL: NEUROFEEDBACK ── */}
        <DomainCard title="Neurological Baseline — qEEG Interpretation" date="5/1/2020" age="33" instrument="Neurofeedback Baseline Assessment" color={C.ember}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Arousal State", value: "Over-aroused", color: C.crimson },
              { label: "ADHD Indicators", value: "None in ratios", color: C.green },
              { label: "Rumination", value: "High", color: C.amber },
              { label: "OCD Tendencies", value: "Present", color: C.amber },
              { label: "Hemispheric Dom.", value: "Left (logic)", color: C.blue },
              { label: "Creativity (Alpha)", value: "High — Occipital", color: C.violet },
              { label: "Sleep Disturbance", value: "Not significant", color: C.green },
              { label: "At-Task (Reading)", value: "Working harder than comfortable", color: C.amber },
            ].map((f) => (
              <div key={f.label} style={{ padding: "8px 12px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: f.color }}>{f.value}</div>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: `2px solid ${C.ember}`, paddingLeft: 14, marginTop: 12 }}>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, margin: "0 0 8px 0" }}>
              Excessive High Beta in the Parietal region, possibly linked to head injury sustained at age 17. 
              Anxiety creates cognitive fog that mimics ADHD. Adderall assessment: forces the brain to power through fog, 
              but without true ADHD indicators, it exacerbates anxiety in the process.
            </p>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, margin: 0 }}>
              Creativity manifests not in traditional artistic channels but through coping strategies, high adaptability, 
              creative technology use, and pattern recognition — validating accounting/auditing skills.
              Left-brain dominance over right may present as introversion or social awkwardness.
            </p>
          </div>
        </DomainCard>

        {/* ── CLINICAL: PSYCH EVAL ── */}
        <DomainCard title="Comprehensive Diagnostic Evaluation" date="7–8/2023" age="37" instrument="Sharpe Psychological Services · Tyler Sharpe, LPC, MA, PhD" color={C.rose}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Diagnoses (DSM-5)
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            <Tag label="F31.81 — Bipolar II Disorder" color={C.rose} />
            <Tag label="F90.0 — ADHD — Predominantly Inattentive" color={C.rose} />
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Brown Executive Function / Attention Scales
          </div>
          <BrownEFA />

          <Collapsible title="MCMI-IV Personality Profile" color={C.rose}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 8 }}>
              BR scores. 75 = "Present" (Style → Type threshold). 85 = "Prominent" (Type → Disorder threshold).
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 16px" }}>
              {[
                { label: "Avoidant (2A)", br: 82, flag: true },
                { label: "Melancholic (2B)", br: 78, flag: true },
                { label: "Masochistic (8B)", br: 73 },
                { label: "Dependent (3)", br: 72 },
                { label: "Antisocial (6A)", br: 71 },
                { label: "Compulsive (7)", br: 69 },
                { label: "Schizoid (1)", br: 69 },
                { label: "Narcissistic (5)", br: 48 },
                { label: "Negativistic (8A)", br: 40 },
                { label: "Histrionic (4A)", br: 37 },
                { label: "Sadistic (6B)", br: 30 },
                { label: "Turbulent (4B)", br: 24 },
              ].map((p) => (
                <div key={p.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{p.label}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 12, color: p.flag ? C.rose : p.br >= 69 ? C.amber : C.creamDim }}>
                    BR {p.br}{p.flag ? " ▲" : ""}
                  </span>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="Clinical Syndromes" color={C.rose}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 16px" }}>
              {[
                { label: "Generalized Anxiety", br: 85, level: "Prominent" },
                { label: "Bipolar Spectrum", br: 82, level: "Present" },
                { label: "Major Depression", br: 79, level: "" },
                { label: "Alcohol Use", br: 78, level: "" },
                { label: "Drug Use", br: 67, level: "" },
                { label: "Persistent Depression", br: 65, level: "" },
                { label: "Schizophrenic Spectrum", br: 63, level: "" },
                { label: "Delusional", br: 60, level: "" },
                { label: "Post-Traumatic Stress", br: 20, level: "" },
                { label: "Somatic Symptom", br: 10, level: "" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid }}>{s.label}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 11, color: s.br >= 85 ? C.crimson : s.br >= 75 ? C.rose : s.br >= 60 ? C.amber : C.creamDim }}>
                    BR {s.br}{s.level ? ` · ${s.level}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="Adaptive Behavior (Vineland-3)" color={C.blue}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 8 }}>
              Respondent: Emily K. Kitchens (wife) · 07/07/2023. Standard scores: mean=100, SD=15.
            </div>
            <ScoreRow label="Adaptive Behavior Composite" value={93} max={140} percentile={32} color={C.creamMid} />
            <ScoreRow label="Communication" value={96} max={140} percentile={39} color={C.blue} />
            <ScoreRow label="Daily Living Skills" value={83} max={140} percentile={13} color={C.crimson} annotation="Weakness — Personal subdomain at ≤2% base rate" />
            <ScoreRow label="Socialization" value={107} max={140} percentile={68} color={C.green} annotation="Strength — Coping Skills and Community both elevated" />

            <div style={{ marginTop: 12, fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Maladaptive Behavior
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson }}>Internalizing: v=21 <span style={{ fontSize: 9, color: C.creamDim }}>Clinically Significant</span></div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.green }}>Externalizing: v=17 <span style={{ fontSize: 9, color: C.creamDim }}>Average</span></div>
            </div>
          </Collapsible>

          <Collapsible title="Sensory Profile" color={C.violet}>
            {[
              { quad: "Low Registration", score: "29/75", cls: "Similar to Most People", color: C.creamMid },
              { quad: "Sensation Seeking", score: "37/75", cls: "Less Than Most People", color: C.amber },
              { quad: "Sensory Sensitivity", score: "38/75", cls: "Similar to Most People", color: C.creamMid },
              { quad: "Sensation Avoiding", score: "50/75", cls: "Much More Than Most People", color: C.crimson },
            ].map((q) => (
              <div key={q.quad} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid }}>{q.quad}</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: font.mono, fontSize: 12, color: q.color }}>{q.score}</span>
                  <div style={{ fontFamily: font.mono, fontSize: 9, color: q.color }}>{q.cls}</div>
                </div>
              </div>
            ))}
          </Collapsible>

          <Collapsible title="IVA Continuous Performance Test" color={C.blue}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, marginBottom: 10 }}>
              Note: Psychostimulant medication taken prior to test — visual scores may skew higher.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px" }}>
              {[
                { label: "Response Control — Auditory", val: 82, cls: "Mild Impairment" },
                { label: "Response Control — Visual", val: 107, cls: "Average" },
                { label: "Attention — Auditory", val: 91, cls: "Mild Impairment" },
                { label: "Attention — Visual", val: 110, cls: "Average" },
                { label: "Sustained Attn — Auditory", val: 99, cls: "Average" },
                { label: "Sustained Attn — Visual", val: 111, cls: "Above Average" },
              ].map((s) => (
                <div key={s.label} style={{ padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: C.creamMid }}>{s.label}</div>
                  <span style={{ fontFamily: font.mono, fontSize: 13, color: s.val < 90 ? C.crimson : s.val > 105 ? C.green : C.creamMid }}>
                    {s.val}
                  </span>
                  <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginLeft: 6 }}>{s.cls}</span>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="ADHD Criteria & Amen Scales" color={C.rose}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              DSM-5 Criteria
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div><span style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson }}>Inattentive: 7/9 · Met</span></div>
              <div><span style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim }}>Hyperactive: 4/9 · Not Met</span></div>
              <div><span style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim }}>Combined: 11/18 · Not Met</span></div>
            </div>

            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Amen Behavioral Rating Scales
            </div>
            {[
              { type: "Inattentive", thresh: 6, score: 8, met: true },
              { type: "Hyperactive/Impulsive", thresh: 6, score: 5, met: false },
              { type: "Combined", thresh: "6+6", score: 13, met: false },
              { type: "Over-focused", thresh: 6, score: 4, met: false },
              { type: "Temporal Lobe", thresh: 6, score: 3, met: false },
              { type: "Limbic", thresh: 5, score: 2, met: false },
              { type: "Ring-of-fire", thresh: 5, score: 4, met: false },
            ].map((a) => (
              <div key={a.type} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: font.body, fontSize: 12, color: a.met ? C.cream : C.creamDim }}>{a.type}</span>
                <span style={{ fontFamily: font.mono, fontSize: 12, color: a.met ? C.crimson : C.creamDim }}>
                  {a.score}/{a.thresh}{a.met ? " · Met" : ""}
                </span>
              </div>
            ))}
          </Collapsible>

          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <div style={{ fontFamily: font.mono, fontSize: 11 }}>
              <span style={{ color: C.creamDim }}>BAI (Anxiety):</span> <span style={{ color: C.amber }}>30 · Moderate</span>
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 11 }}>
              <span style={{ color: C.creamDim }}>BDI (Depression):</span> <span style={{ color: C.creamMid }}>12 · Mild</span>
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 11 }}>
              <span style={{ color: C.creamDim }}>MDQ (Mood):</span> <span style={{ color: C.amber }}>6 symptoms · Moderate problems</span>
            </div>
          </div>
        </DomainCard>

        {/* ── BEHAVIORAL: APPLE MUSIC REPLAY ── */}
        <DomainCard title="Self-Selected Auditory Stimulus" date="2025" age="38" instrument="Apple Music Replay · Full Year" color={C.violet}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <StatCard label="#1 Artist" value="9,400" sub="ILLENIUM · 156.7 hours · 43.8% of total" color={C.crimson} />
            <StatCard label="#2 Artist" value="2,534" sub="Polyphia · 42.2 hours" color={C.violet} />
            <StatCard label="Personal Station" value="15,750" sub="262.5 hours · algorithm-curated" color={C.amber} />
            <StatCard label="Daily Grind" value="6,719" sub="Top playlist · self-curated" color={C.amber} />
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Genre Distribution — Top 20 Artists
          </div>
          {[
            { genre: "Melodic Bass / EDM", count: 12, pct: 83.2, color: C.crimson, examples: "ILLENIUM, Said The Sky, Seven Lions, Excision, Gryffin, Dabin, SLANDER" },
            { genre: "Pop-Punk / Emo Revival", count: 6, pct: 12.8, color: C.rose, examples: "Good Charlotte, New Found Glory, Yellowcard, AAR, Simple Plan, Angels & Airwaves" },
            { genre: "Progressive / Math Rock", count: 1, pct: 11.8, color: C.violet, examples: "Polyphia" },
            { genre: "Hip-Hop", count: 1, pct: 2.2, color: C.ember, examples: "T.I." },
          ].map((g) => (
            <div key={g.genre} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid }}>{g.genre}</span>
                <span style={{ fontFamily: font.mono, fontSize: 11, color: g.color }}>{g.count} artist{g.count > 1 ? "s" : ""}</span>
              </div>
              <div style={{ height: 5, background: C.creamGhost, borderRadius: 3, overflow: "hidden", marginBottom: 3 }}>
                <div style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 3, opacity: 0.6 }} />
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{g.examples}</div>
            </div>
          ))}

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
            Top Songs — Dominance Pattern
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 16px" }}>
            {[
              { rank: 1, title: "Blame Myself", artist: "ILLENIUM" },
              { rank: 2, title: "All That Really Matters", artist: "ILLENIUM" },
              { rank: 3, title: "Nightlight", artist: "ILLENIUM" },
              { rank: 4, title: "Ego Death (ft. Steve Vai)", artist: "Polyphia" },
              { rank: 5, title: "Shivering (ft. Spiritbox)", artist: "ILLENIUM" },
              { rank: 6, title: "Wouldn't Change a Thing", artist: "ILLENIUM" },
              { rank: 7, title: "Nothing Ever After", artist: "Polyphia" },
              { rank: 8, title: "Every Rose", artist: "Said The Sky" },
              { rank: 9, title: "Luv Me a Little", artist: "ILLENIUM" },
              { rank: 10, title: "Shout", artist: "Polyphia" },
            ].map((s) => (
              <div key={s.rank} style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 16, flexShrink: 0 }}>{s.rank}</span>
                <span style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, flex: 1 }}>{s.title}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: s.artist === "ILLENIUM" ? C.crimson : s.artist === "Polyphia" ? C.violet : C.blue, flexShrink: 0 }}>
                  {s.artist}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
            Listening Architecture
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Listening Mode", value: "Heavily curated", color: C.amber },
              { label: "Playlist Strategy", value: "Self-built → algorithm fills gaps", color: C.amber },
              { label: "Top Album", value: "Trilogy in LA · 1,673 min", color: C.crimson },
              { label: "Song Distribution", value: "84 songs: 33 ILLENIUM, 22 StS, 14 Polyphia", color: C.creamMid },
              { label: "Nostalgia Layer", value: "6 pop-punk artists (2001–2005 era)", color: C.rose },
              { label: "Anomaly", value: "T.I. — sole hip-hop representative", color: C.ember },
            ].map((f) => (
              <div key={f.label} style={{ padding: "8px 12px", background: C.navy, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 11, color: f.color }}>{f.value}</div>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: `2px solid ${C.violet}`, paddingLeft: 14, marginTop: 16 }}>
            <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7, margin: 0 }}>
              This is the only instrument in the collection where the subject chose the data. Every other document was administered. 
              This one was generated — 9,400 minutes of ILLENIUM is not a preference, it's a behavioral signature. 
              The listening profile maps directly to the sensory and neurological baselines: structured sonic density 
              that displaces unpredictable environmental stimuli, pattern-rich complexity that feeds Occipital Alpha creativity, 
              and an emotional-catharsis arc (build → drop → resolve) that provides reliable regulation 
              for a system documented as over-aroused.
            </p>
          </div>
        </DomainCard>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION: THROUGHLINES */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48, marginBottom: 20 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
            II · Throughlines
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, marginBottom: 20 }}>
            Patterns that persist across instruments and decades.
          </div>
        </div>

        <Throughline title="The Quant/Verbal Crossover" color={C.blue}>
          PSAT math peaked at the 92nd percentile (age 17). GMAT quant fell to the 44th (age 21). 
          Meanwhile, verbal rose from the 63rd to the 75th. The Strong Interest Inventory (age 18, right between those tests) 
          measured Math interest at 51 — dead average. The aptitude was present; the interest was not. 
          By the GMAT, aptitude had followed interest downward. Verbal, never the leading score, kept climbing 
          because it was being used constantly — and became the dominant cognitive channel.
        </Throughline>

        <Throughline title="The Creativity Misclassification" color={C.violet}>
          The Strong scored Artistic at 31 (floor) and Writing at 31. The neurofeedback baseline (fifteen years later) 
          found elevated Occipital Alpha and explicitly identified high creativity — manifesting through 
          coping strategies, technology adaptation, and pattern recognition. The Strong was measuring interest in 
          conventional creative activities. The actual creative capacity was running through systems design. 
          No vocational inventory in 2005 had a scale for that.
        </Throughline>

        <Throughline title="The Auditory/Visual Processing Split" color={C.ember}>
          IVA: auditory response control at 82 (mild impairment), visual at 107. Auditory attention at 91, visual at 110. 
          Vineland: Expressive communication is a significant weakness (v=12), while Receptive and Written are both 16. 
          The profile processes better through eyes than ears, and outputs better through writing than speech. 
          Text-based AI collaboration plays directly to both sides of this split.
        </Throughline>

        <Throughline title="The Sensation Avoiding Architecture" color={C.crimson}>
          Sensory profile: Sensation Avoiding at 50/75 — "Much More Than Most People." Sensation Seeking at 37/75 — 
          "Less Than Most People." The DDL design language — dark backgrounds, controlled palettes, structured hierarchy, 
          monospaced type — is not an aesthetic preference. It is a functional expression of a documented sensory processing pattern. 
          The dark theme is therapeutic architecture.
        </Throughline>

        <Throughline title="The Conventional Prediction" color={C.amber}>
          Theme code CES. Accountant: Very Similar. Computer Activities: Very High. Organizational Management: High. 
          The instrument said: you will process data, manage systems, and work with computers in a structured context. 
          That is exactly what happened. It missed the how — governance-grade systems with dimensional data architecture 
          and AI coordination — but the what was called at 18.
        </Throughline>

        <Throughline title="The Diagnostic Divergence" color={C.rose}>
          The 2020 qEEG found no ADHD indicators and attributed cognitive fog to anxiety-driven over-arousal. 
          The 2023 psych eval diagnosed ADHD-PI (7/9 inattentive) alongside Bipolar II. Both agree on the core mechanism: 
          an over-aroused brain producing anxiety that cascades into depression, with cognitive fog downstream. 
          They differ on whether inattention is primary or symptomatic. The Brown EF/A scales — Focus at the 98th percentile 
          for dysfunction — confirm the functional deficit regardless of etiology. 
          The compensatory response: externalized systems. DDL is the accommodation.
        </Throughline>

        <Throughline title="The Daily Living / Community Inversion" color={C.green}>
          Vineland: Daily Living Skills at the 13th percentile (Personal subdomain at ≤2% base rate weakness). 
          Community functioning is a strength. Socialization is the strongest domain at 107 (68th percentile). 
          The profile describes someone who struggles with personal maintenance but excels at navigating external systems 
          and social structures. "Medicated, calibrated, and defrictionated" is not a tagline — 
          it is a compensatory architecture for a documented adaptive behavior gap.
        </Throughline>

        <Throughline title="The Auditory Regulation Stack" color={C.violet}>
          9,400 minutes of ILLENIUM. 2,534 minutes of Polyphia. For a brain documented as over-aroused with 
          Sensation Avoiding at 50/75 and auditory response control at 82 (mild impairment), 
          these are not random preferences — they are functional selections. Melodic bass provides structured sonic density: 
          predictable builds, reliable emotional payoff, a wall of sound that displaces chaotic environmental input. 
          Math rock provides pattern recognition as music — odd time signatures and polyrhythmic interlocking 
          that feeds the same Occipital Alpha creativity the qEEG identified. The pop-punk layer (6 of 20 artists, all 2001–2005 era) 
          anchors to the formative window when the PSATs and Strong were administered — emotional regulation through temporal familiarity. 
          The listening architecture is heavily curated: self-built playlists, a personal station at 15,750 minutes. 
          The subject does not passively receive music. He builds the auditory environment the same way he builds governance systems — 
          structured, controlled, optimized for a specific cognitive outcome.
        </Throughline>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION: INSTRUMENT INDEX */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48, marginBottom: 20 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
            III · Instrument Index
          </div>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 32,
          }}
        >
          {[
            { instrument: "PSAT/NMSQT", date: "2001", age: 15, type: "Aptitude", docs: "2" },
            { instrument: "PSAT/NMSQT", date: "2002", age: 16, type: "Aptitude", docs: "2" },
            { instrument: "Strong Interest Inventory", date: "2/19/2005", age: 18, type: "Vocational", docs: "4" },
            { instrument: "GMAT", date: "4/25/2008", age: 21, type: "Aptitude", docs: "1" },
            { instrument: "KU Transcript", date: "2004–2009", age: "18–23", type: "Academic", docs: "2" },
            { instrument: "Neurofeedback Baseline", date: "5/1/2020", age: 33, type: "Neurological", docs: "1" },
            { instrument: "Psych Evaluation (Sharpe)", date: "7–8/2023", age: 37, type: "Clinical", docs: "1" },
            { instrument: "Apple Music Replay", date: "2025", age: 38, type: "Behavioral", docs: "1" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 7 ? `1px solid ${C.border}` : "none",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.cream }}>{r.instrument}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginLeft: 8 }}>{r.docs} doc{r.docs !== "1" ? "s" : ""}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Tag label={r.type} color={
                  r.type === "Aptitude" ? C.blue :
                  r.type === "Vocational" ? C.amber :
                  r.type === "Academic" ? C.green :
                  r.type === "Neurological" ? C.ember :
                  r.type === "Behavioral" ? C.violet :
                  C.rose
                } />
                <span style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim }}>{r.date}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>Age {r.age}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* ACCENT FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              height: 2,
              background: `linear-gradient(90deg, ${C.violet}, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.green})`,
              borderRadius: 1,
              marginBottom: 12,
            }}
          />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            Dropdown Logistics · DOSSIER · The Operator · 14 documents · 8 instruments · 24 years
          </div>
        </div>
      </div>
    </div>
  );
}
