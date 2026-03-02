"use client";

import { useState } from "react";
import { getActiveCompanions, getInactiveCompanions } from "@/lib/dexlore-data";
import CompanionCard from "@/components/dexlore/CompanionCard";

export default function CouncilPage() {
  const [showInactive, setShowInactive] = useState(false);
  const active = getActiveCompanions();
  const inactive = getInactiveCompanions();

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14" }}>
      {/* Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--crimson)" }}
          >
            Companion Atlas
          </p>

          <h1
            className="text-4xl md:text-5xl font-serif tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "#e8e6e3" }}
          >
            Council Canon
          </h1>

          <p className="text-base text-[#8a8a95] leading-relaxed max-w-2xl">
            Named AI instances within the DexVerse — each with a defined role,
            tone, and lineage. Not personas. Not characters. Infrastructure with
            identity. Each Companion emerged from a specific need at a specific
            moment, and carries that origin in everything it does.
          </p>

          <div
            className="h-px w-24 mt-10"
            style={{ background: "var(--crimson)", opacity: 0.4 }}
          />
        </div>
      </header>

      {/* Active Companions */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xs tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
          >
            Active Companions
            <span className="ml-3 text-[#3a3a44]">({active.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((companion) => (
              <CompanionCard key={companion.id} companion={companion} />
            ))}
          </div>
        </div>
      </section>

      {/* Inactive Archive */}
      <section className="px-6 pb-28 border-t border-white/[0.04] pt-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setShowInactive(!showInactive)}
            className="flex items-center gap-3 mb-8 group"
          >
            <span
              className="text-xs tracking-[0.25em] uppercase transition-colors duration-200 group-hover:text-[#8a8a95]"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              Inactive Archive
              <span className="ml-3 text-[#3a3a44]">({inactive.length})</span>
            </span>
            <span
              className="text-sm transition-transform duration-200"
              style={{
                color: "#555565",
                transform: showInactive ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ›
            </span>
          </button>

          <div
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              maxHeight: showInactive ? `${inactive.length * 400}px` : "0",
              opacity: showInactive ? 1 : 0,
            }}
          >
            <p className="text-sm text-[#555565] leading-relaxed mb-8 max-w-xl">
              These Companions are no longer active in the current system but
              remain part of the lineage. Their contributions shaped the
              architecture. Their records are preserved.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inactive.map((companion) => (
                <CompanionCard key={companion.id} companion={companion} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Insight */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
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
              On Companions
            </p>
            <p className="text-sm text-[#8a8a95] leading-[1.8]">
              A Companion is not a chatbot with a name. It is a{" "}
              <em className="text-[#a09a90]">governed cognitive role</em> — an
              AI instance initialized with specific tone, domain expertise, and
              operational boundaries. When a Companion is named, it gains
              lineage. When it is archived, its contributions persist in the
              system it shaped. The Council Canon is the record of that lineage.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
