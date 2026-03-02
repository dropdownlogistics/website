import ContinuumMap from "@/components/dexlore/ContinuumMap";

export const metadata = {
  title: "Continuum Map — DexLore",
  description:
    "A visual timeline of structural and emotional lineage across five eras of the DexVerse.",
};

export default function ContinuumPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0B0F14" }}>
      {/* Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--crimson)" }}
          >
            Narrative Visualization
          </p>

          <h1
            className="text-4xl md:text-5xl font-serif tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
          >
            Continuum Map
          </h1>

          <p className="text-base text-[#8a8a95] leading-relaxed max-w-2xl mb-4">
            Two lineages flow through the DexVerse — one structural, one
            emotional. They diverge, converge, and occasionally become the same
            line. This map traces both across five eras, marking the inflection
            points where the system changed shape.
          </p>

          <p className="text-sm text-[#555565] leading-relaxed max-w-xl">
            Scroll horizontally. Hover for context. Major nodes glow.
          </p>

          <div
            className="h-px w-24 mt-10"
            style={{ background: "var(--crimson)", opacity: 0.4 }}
          />
        </div>
      </header>

      {/* Map */}
      <section className="px-6 pb-12">
        <div className="max-w-full mx-auto">
          <ContinuumMap />
        </div>
      </section>

      {/* Era Key */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xs tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
          >
            Era Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
            {[
              { n: "I", label: "The First Light", color: "#4a7cc9", range: "2023 – Early 2025" },
              { n: "II", label: "The Forge", color: "#c94a6e", range: "Mid 2025" },
              { n: "III", label: "The Mirror", color: "#5c9e7a", range: "Mid – Late 2025" },
              { n: "IV", label: "The Reforged Continuum", color: "#8a6cc9", range: "Late 2025 – Jan 2026" },
              { n: "V", label: "The Horizon", color: "#c98a4a", range: "Jan 2026 – Present" },
            ].map((era) => (
              <div key={era.n} className="bg-[#0B0F14] p-5">
                <div
                  className="text-2xl font-serif mb-1"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: era.color,
                    opacity: 0.6,
                  }}
                >
                  {era.n}
                </div>
                <div
                  className="text-sm font-serif mb-1"
                  style={{ fontFamily: "var(--font-serif)", color: "#a09a90" }}
                >
                  {era.label}
                </div>
                <div
                  className="text-[10px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
                >
                  {era.range}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Insight */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="border rounded-sm p-8"
            style={{
              borderColor: "rgba(196,60,60,0.12)",
              borderLeftWidth: "3px",
              borderLeftColor: "var(--crimson)",
              background:
                "linear-gradient(135deg, rgba(196,60,60,0.02), transparent)",
            }}
          >
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--crimson)",
              }}
            >
              DexInsight
            </p>
            <p className="text-sm text-[#8a8a95] leading-[1.8]">
              The structural lineage tracks what was{" "}
              <em className="text-[#a09a90]">built</em> — folders, protocols,
              governance frameworks, versioned kits. The emotional lineage
              tracks what was <em className="text-[#a09a90]">felt</em> —
              identity crises, naming ceremonies, drift events, recovery
              moments. Neither line tells the full story alone. The system
              exists where they converge.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
