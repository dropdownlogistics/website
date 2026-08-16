import { WINGS, productsByWing } from "@/lib/products";
import { notFound } from "next/navigation";

const C = {
  navy: "#0D1B2A", navyDeep: "#070F1C", card: "#10202f", cream: "#F5F1EB",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  border: "rgba(245,241,235,0.07)",
};
const font = {
  display: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};
const STATUS_COLOR = {
  live: "#22C55E", beta: "#6B9DC2", invite: "#C49A3C", waitlist: "#C49A3C",
  "case-study": "#6B7B8D", concept: "#6B7B8D",
};
const statusColor = (s) => STATUS_COLOR[s] || "#6B7B8D";
const productHref = (p) => p.url || (p.pages && p.pages[0]) || null;

export function generateStaticParams() {
  return WINGS.map((w) => ({ wing: w.id }));
}

export function generateMetadata({ params }) {
  const w = WINGS.find((x) => x.id === params.wing);
  return { title: w ? `${w.name} — Wing | Dropdown Logistics` : "Wing | Dropdown Logistics" };
}

export default function WingPage({ params }) {
  const wing = WINGS.find((w) => w.id === params.wing);
  if (!wing) notFound();
  const products = productsByWing(wing.id);
  const num = String(WINGS.indexOf(wing) + 1).padStart(2, "0");

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 80px" }}>
        <a href="/" style={{ fontFamily: font.mono, fontSize: 11, color: C.creamDim, textDecoration: "none", letterSpacing: "0.06em" }}>
          ← Dropdown Logistics
        </a>

        {/* Wing hero */}
        <div style={{ marginTop: 28, paddingBottom: 24, borderBottom: `2px solid ${wing.accent}` }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: wing.accent }}>
            Wing {num} · The Wings
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 40, fontWeight: 700, color: C.cream, margin: "8px 0 10px", letterSpacing: "-0.02em" }}>
            {wing.name}
          </h1>
          <p style={{ fontFamily: font.body, fontStyle: "italic", fontSize: 18, color: C.creamMid, lineHeight: 1.6, maxWidth: 620 }}>
            {wing.belief}
          </p>
        </div>

        {/* Products */}
        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {products.map((p) => {
            const href = productHref(p);
            const pending = p.publicationStatus !== "verified";
            const inner = (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18, color: C.cream }}>{p.name}</span>
                  <span style={{
                    fontFamily: font.mono, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: statusColor(p.status), padding: "2px 7px", borderRadius: 10, background: statusColor(p.status) + "1f",
                  }}>{pending ? "coming soon" : p.status}</span>
                </div>
                {p.tagline && (
                  <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, marginTop: 6, lineHeight: 1.6 }}>{p.tagline}</div>
                )}
                {p.counts && p.counts.length > 0 && (
                  <div style={{ marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {p.counts.map((c) => (
                      <span key={c.label} style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
                        <strong style={{ color: wing.accent }}>{c.value}</strong> {c.label}
                      </span>
                    ))}
                  </div>
                )}
                {href && !pending && (
                  <div style={{ marginTop: 10, fontFamily: font.mono, fontSize: 10, color: wing.accent, letterSpacing: "0.05em" }}>
                    {p.url ? "Visit ↗" : "View →"}
                  </div>
                )}
              </>
            );
            const boxStyle = {
              display: "block", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${wing.accent}`,
              borderRadius: 8, padding: "16px 18px", textDecoration: "none",
            };
            return href && !pending ? (
              <a key={p.id} href={href} target={p.url ? "_blank" : undefined} rel={p.url ? "noreferrer" : undefined} style={boxStyle}>{inner}</a>
            ) : (
              <div key={p.id} style={boxStyle}>{inner}</div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, fontFamily: font.mono, fontSize: 10, color: C.creamDim, textAlign: "center" }}>
          Product facts single-sourced from the DDL registry. Chaos → Structured → Automated.
        </div>
      </div>
    </div>
  );
}
