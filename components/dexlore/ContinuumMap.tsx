"use client";

import { useState } from "react";
import { timelineNodes } from "@/lib/dexlore-data";

const eraColors: Record<number, string> = {
  1: "#4a7cc9",
  2: "#c94a6e",
  3: "#5c9e7a",
  4: "#8a6cc9",
  5: "#c98a4a",
};

const NODE_SPACING = 120;
const SVG_PADDING = 60;
const STRUCTURAL_Y = 80;
const EMOTIONAL_Y = 180;
const BOTH_Y = 130;

export default function ContinuumMap() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalWidth = timelineNodes.length * NODE_SPACING + SVG_PADDING * 2;

  function getNodeY(lineage: string) {
    if (lineage === "structural") return STRUCTURAL_Y;
    if (lineage === "emotional") return EMOTIONAL_Y;
    return BOTH_Y;
  }

  function getNodeX(index: number) {
    return SVG_PADDING + index * NODE_SPACING;
  }

  // Build path data for the two flowing lines
  function buildLinePath(filter: "structural" | "emotional") {
    const relevant = timelineNodes
      .map((n, i) => ({ ...n, x: getNodeX(i) }))
      .filter((n) => n.lineage === filter || n.lineage === "both");

    if (relevant.length < 2) return "";

    const baseY = filter === "structural" ? STRUCTURAL_Y : EMOTIONAL_Y;
    const points = relevant.map((n) => ({
      x: n.x,
      y: n.lineage === "both" ? BOTH_Y : baseY,
    }));

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
      <div style={{ minWidth: `${totalWidth}px`, position: "relative" }}>
        {/* Legend */}
        <div className="flex items-center gap-8 mb-6 px-[60px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-[#B23531]/50" />
            <span
              className="text-[10px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              Structural Lineage
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-px"
              style={{ background: "#B23531", opacity: 0.25 }}
            />
            <span
              className="text-[10px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "#555565" }}
            >
              Emotional Lineage
            </span>
          </div>
        </div>

        <svg
          width={totalWidth}
          height={280}
          viewBox={`0 0 ${totalWidth} 280`}
          className="block"
        >
          {/* Era background bands */}
          {[1, 2, 3, 4, 5].map((era) => {
            const nodesInEra = timelineNodes
              .map((n, i) => ({ ...n, i }))
              .filter((n) => n.era === era);
            if (nodesInEra.length === 0) return null;
            const minX = getNodeX(nodesInEra[0].i) - NODE_SPACING / 2;
            const maxX =
              getNodeX(nodesInEra[nodesInEra.length - 1].i) + NODE_SPACING / 2;
            return (
              <rect
                key={era}
                x={minX}
                y={20}
                width={maxX - minX}
                height={240}
                fill={eraColors[era]}
                opacity={0.03}
                rx={4}
              />
            );
          })}

          {/* Structural line */}
          <path
            d={buildLinePath("structural")}
            fill="none"
            stroke="#B23531"
            strokeWidth={1.5}
            opacity={0.4}
            strokeLinecap="round"
          />

          {/* Emotional line */}
          <path
            d={buildLinePath("emotional")}
            fill="none"
            stroke="#B23531"
            strokeWidth={1}
            opacity={0.2}
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Nodes */}
          {timelineNodes.map((node, i) => {
            const x = getNodeX(i);
            const y = getNodeY(node.lineage);
            const color = eraColors[node.era];
            const isHovered = hoveredIndex === i;
            const r = node.major ? 7 : 5;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Glow on major nodes */}
                {node.major && (
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill={color}
                    opacity={isHovered ? 0.15 : 0.06}
                    className="transition-opacity duration-200"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? r + 2 : r}
                  fill={node.major ? color : "transparent"}
                  stroke={color}
                  strokeWidth={node.major ? 0 : 1.5}
                  opacity={isHovered ? 1 : 0.7}
                  className="transition-all duration-200"
                />

                {/* Year label */}
                <text
                  x={x}
                  y={250}
                  textAnchor="middle"
                  fill="#555565"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {node.year}
                </text>

                {/* Label below/above node */}
                <text
                  x={x}
                  y={y + (node.lineage === "structural" ? -16 : 22)}
                  textAnchor="middle"
                  fill={isHovered ? "#e8e6e3" : "#6a6a75"}
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.04em"
                  className="transition-colors duration-200"
                >
                  {node.label}
                </text>

                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={x - 120}
                      y={y > 150 ? y - 55 : y + 25}
                      width={240}
                      height={36}
                      rx={3}
                      fill="#161a22"
                      stroke={color}
                      strokeWidth={0.5}
                      opacity={0.95}
                    />
                    <text
                      x={x}
                      y={y > 150 ? y - 32 : y + 48}
                      textAnchor="middle"
                      fill="#a09a90"
                      fontSize={11}
                      fontFamily="var(--font-sans)"
                    >
                      {node.tooltip}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
