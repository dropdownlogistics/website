import type { Era } from "@/lib/dexlore-data";
import Link from "next/link";

const eraColors: Record<string, string> = {
  i: "#4a7cc9",
  ii: "#c94a6e",
  iii: "#5c9e7a",
  iv: "#8a6cc9",
  v: "#c98a4a",
};

export default function EraLayout({ era, nextEra }: { era: Era; nextEra?: Era }) {
  const accentColor = eraColors[era.slug] || "var(--crimson)";

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14" }}>
      {/* Era Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-[700px] mx-auto">
          {/* Era Numeral */}
          <div
            className="text-[8rem] leading-none font-serif tracking-tight mb-4 select-none"
            style={{
              fontFamily: "var(--font-serif)",
              color: accentColor,
              opacity: 0.15,
            }}
          >
            {era.numeral}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-serif tracking-tight mb-3"
            style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
          >
            {era.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#8a8a95] leading-relaxed mb-6">
            {era.subtitle}
          </p>

          {/* Date Range */}
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
          >
            {era.dateRange}
          </p>

          {/* Crimson Divider */}
          <div
            className="mt-10 h-px w-24"
            style={{ background: accentColor, opacity: 0.5 }}
          />
        </div>
      </header>

      {/* Summary */}
      <section className="px-6 pb-16">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[17px] text-[#a09a90] leading-[1.85] tracking-[0.01em]">
            {era.summary}
          </p>
        </div>
      </section>

      {/* Key Moments */}
      <section className="px-6 pb-20">
        <div className="max-w-[700px] mx-auto">
          <h2
            className="text-xs tracking-[0.2em] uppercase mb-10"
            style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
          >
            Key Moments
          </h2>

          <div className="space-y-10">
            {era.moments.map((moment, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div
                  className="absolute left-0 top-[7px] w-2.5 h-2.5 rounded-full"
                  style={{
                    background: accentColor,
                    opacity: 0.6,
                    boxShadow: `0 0 8px ${accentColor}33`,
                  }}
                />

                <h3
                  className="text-lg font-serif mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
                >
                  {moment.title}
                </h3>
                <p className="text-[15px] text-[#8a8a95] leading-[1.8]">
                  {moment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="px-6 pb-20">
        <div className="max-w-[700px] mx-auto">
          <blockquote className="relative py-8">
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: accentColor, opacity: 0.3 }}
            />
            <p
              className="text-2xl md:text-3xl font-serif italic pl-8 leading-snug"
              style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
            >
              &ldquo;{era.pullQuote}&rdquo;
            </p>
            {era.pullQuoteAttribution && (
              <cite
                className="block text-xs tracking-[0.15em] uppercase mt-4 pl-8 not-italic"
                style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
              >
                — {era.pullQuoteAttribution}
              </cite>
            )}
          </blockquote>
        </div>
      </section>

      {/* Transition */}
      <section className="px-6 pb-24">
        <div className="max-w-[700px] mx-auto">
          <div className="border-t border-white/[0.06] pt-10">
            <p className="text-base italic text-[#6a6a75] leading-relaxed mb-8">
              {era.transitionLine}
            </p>

            {nextEra && (
              <Link
                href={`/dexlore/era/${nextEra.slug}`}
                className="inline-flex items-center gap-3 group/link"
              >
                <span
                  className="text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover/link:text-[#e8e6e3]"
                  style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
                >
                  Continue to Era {nextEra.numeral}
                </span>
                <span
                  className="text-lg transition-transform duration-200 group-hover/link:translate-x-1"
                  style={{ color: accentColor }}
                >
                  →
                </span>
              </Link>
            )}

            {!nextEra && (
              <Link
                href="/dexlore"
                className="inline-flex items-center gap-3 group/link"
              >
                <span
                  className="text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover/link:text-[#e8e6e3]"
                  style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
                >
                  Return to the Lore Hub
                </span>
                <span
                  className="text-lg transition-transform duration-200 group-hover/link:translate-x-1"
                  style={{ color: accentColor }}
                >
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
