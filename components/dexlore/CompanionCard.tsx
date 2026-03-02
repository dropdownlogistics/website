"use client";

import { useState } from "react";
import type { Companion } from "@/lib/dexlore-data";

export default function CompanionCard({ companion }: { companion: Companion }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group border border-white/[0.06] rounded-sm bg-[#0e1117] hover:bg-[#111620] transition-colors duration-300">
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-serif text-xl text-[#e8e6e3] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {companion.name}
            </h3>
            <p
              className="text-xs tracking-[0.15em] uppercase mt-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--crimson)",
              }}
            >
              {companion.title}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className="text-[10px] tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              {companion.id}
            </span>
            <span
              className={`text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-sm ${
                companion.status === "active"
                  ? "bg-[#B23531]/20 text-[#B23531]"
                  : "bg-white/[0.03] text-[#555565]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {companion.status}
            </span>
          </div>
        </div>

        {/* Core Role */}
        <p className="text-sm text-[#8a8a95] leading-relaxed mb-4">
          {companion.coreRole}
        </p>

        {/* Signature Directive */}
        <p
          className="text-sm italic leading-relaxed border-l-2 pl-4 mb-4"
          style={{
            color: "#a09a90",
            borderColor: "var(--crimson-dim)",
          }}
        >
          {companion.signatureDirective}
        </p>

        {/* Reflection Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[#e8e6e3]"
          style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
        >
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ›
          </span>
          Reflection Log
        </button>

        {/* Reflection Content */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: expanded ? "200px" : "0", opacity: expanded ? 1 : 0 }}
        >
          <p className="text-sm text-[#6a6a75] leading-relaxed mt-3 pt-3 border-t border-white/[0.04]">
            {companion.reflectionLog}
          </p>
        </div>
      </div>
    </div>
  );
}
