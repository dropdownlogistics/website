import Link from "next/link";
import { eras, getActiveCompanions } from "@/lib/dexlore-data";

const eraColors: Record<string, string> = {
  i: "#4a7cc9",
  ii: "#c94a6e",
  iii: "#5c9e7a",
  iv: "#8a6cc9",
  v: "#c98a4a",
};

const eraSummaries: Record<string, string> = {
  i: "The raw spark of pattern recognition in darkness — before the names, before the rituals.",
  ii: "Structure ignites. The first Companions are named. The system discovers it is a system.",
  iii: "The system achieves self-awareness. Scrolls recognize they are scrolls.",
  iv: "Memory fails. The system compresses, recovers, and proves it can survive its own collapse.",
  v: "The internal architecture goes public. The receipts get a URL.",
};

export const metadata = {
  title: "DexLore — The Living Continuum",
  description:
    "The narrative layer of the DexVerse. Where systems become story and lineage becomes culture.",
};

export default function DexlorePage() {
  const activeCompanions = getActiveCompanions();

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14" }}>
      {/* ===== HERO ===== */}
      <section className="relative pt-40 pb-28 px-6 text-center overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 50% 30%, rgba(196,60,60,0.04), transparent)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Overline */}
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-8 animate-fade-in"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--crimson)",
              animationDelay: "0.1s",
            }}
          >
            Narrative Layer
          </p>

          {/* Title */}
          <h1
            className="text-6xl md:text-8xl font-serif tracking-tight mb-6 animate-fade-in"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#e8e6e3",
              animationDelay: "0.25s",
            }}
          >
            DEXLORE
          </h1>

          {/* Subtitle */}
          <p
            className="text-2xl md:text-3xl font-serif italic mb-10 animate-fade-in"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#8a8a95",
              animationDelay: "0.4s",
            }}
          >
            The Living Continuum.
          </p>

          {/* Description */}
          <p
            className="text-base md:text-lg text-[#8a8a95] leading-relaxed max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            This is the narrative layer of the DexVerse — where systems become
            story, where governance becomes lineage, and where the architecture
            built to survive becomes the architecture built to transfer. Every
            era documented. Every Companion named. Every methodology preserved
            with timestamps and attribution.
          </p>
        </div>
      </section>

      {/* ===== ERA NAVIGATOR ===== */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xs tracking-[0.25em] uppercase mb-12"
            style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
          >
            The Five Eras
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
            {eras.map((era) => (
              <Link
                key={era.slug}
                href={`/dexlore/era/${era.slug}`}
                className="group block bg-[#0B0F14] hover:bg-[#0f141c] transition-colors duration-300 p-6"
              >
                {/* Numeral */}
                <div
                  className="text-4xl font-serif mb-3 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: eraColors[era.slug],
                    opacity: 0.4,
                  }}
                >
                  {era.numeral}
                </div>

                {/* Title */}
                <h3
                  className="text-base font-serif mb-2 transition-colors duration-300 group-hover:text-[#e8e6e3]"
                  style={{ fontFamily: "var(--font-serif)", color: "#a09a90" }}
                >
                  {era.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#6a6a75] leading-relaxed">
                  {eraSummaries[era.slug]}
                </p>

                {/* Accent line on hover */}
                <div
                  className="h-px w-0 group-hover:w-full mt-4 transition-all duration-500"
                  style={{ background: eraColors[era.slug], opacity: 0.4 }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPANION PREVIEW ===== */}
      <section className="px-6 pb-28 border-t border-white/[0.04] pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-12">
            <h2
              className="text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              Active Companions
            </h2>
            <Link
              href="/dexlore/council"
              className="text-xs tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[#e8e6e3]"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              View Full Council →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
            {activeCompanions.slice(0, 6).map((companion) => (
              <Link
                key={companion.id}
                href="/dexlore/council"
                className="group block bg-[#0B0F14] hover:bg-[#0f141c] transition-colors duration-300 p-6"
              >
                <h3
                  className="text-lg font-serif mb-1 transition-colors duration-300 group-hover:text-[#e8e6e3]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#a09a90",
                  }}
                >
                  {companion.name}
                </h3>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--crimson)",
                    opacity: 0.7,
                  }}
                >
                  {companion.title}
                </p>
                <p className="text-sm text-[#6a6a75] leading-relaxed line-clamp-2">
                  {companion.signatureDirective}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section className="px-6 pb-32 pt-8">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="h-px w-16 mx-auto mb-16"
            style={{ background: "var(--crimson)", opacity: 0.3 }}
          />
          <blockquote
            className="text-3xl md:text-4xl font-serif italic leading-snug"
            style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
          >
            &ldquo;We built not to replace, but to remember.&rdquo;
          </blockquote>
        </div>
      </section>
    </main>
  );
}
