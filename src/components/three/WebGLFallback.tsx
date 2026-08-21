"use client";

import { sceneEdges, sceneNodes } from "@/data/sceneNodes";

const SCALE = 46;
const CX = 300;
const CY = 300;

const points = new Map<string, { x: number; y: number }>([
  ["core", { x: CX, y: CY }],
  ...sceneNodes.map(
    (node) =>
      [
        node.id,
        { x: CX + node.position[0] * SCALE, y: CY - node.position[1] * SCALE },
      ] as const,
  ),
]);

/**
 * 2D fallback shown when WebGL is unavailable or blocked.
 * Same topology, same information — no canvas required.
 */
export function WebGLFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <svg
        viewBox="0 0 600 600"
        className="h-full max-h-[640px] w-full max-w-[640px]"
        role="img"
        aria-label="Diagram of the OfficeHomeTechX technology ecosystem: cloud, firewall, database, network, server, CCTV, Wi-Fi, GPU, storage, devices and board repair connected to a central AI compute core."
      >
        <defs>
          <radialGradient id="fb-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#b6e86a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#8cc63f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8cc63f" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="#2aa3e0" strokeOpacity="0.28" strokeWidth="1">
          {sceneEdges.map(([from, to], i) => {
            const a = points.get(from);
            const b = points.get(to);
            if (!a || !b) return null;
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            );
          })}
        </g>

        <circle cx={CX} cy={CY} r="72" fill="url(#fb-core)" />
        <circle
          cx={CX}
          cy={CY}
          r="26"
          fill="#0b1119"
          stroke="#8cc63f"
          strokeWidth="1.5"
        />
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fill="#b6e86a"
          fontSize="10"
          letterSpacing="1.5"
        >
          CORE
        </text>

        {sceneNodes.map((node) => {
          const p = points.get(node.id)!;
          const color = node.accent === "brand" ? "#8cc63f" : "#2aa3e0";
          return (
            <g key={node.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r="20"
                fill="#0b1119"
                stroke={color}
                strokeOpacity="0.55"
                strokeWidth="1.2"
              />
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                fill={color}
                fontSize="8"
                letterSpacing="0.8"
              >
                {node.short}
              </text>
              <text
                x={p.x}
                y={p.y + 33}
                textAnchor="middle"
                fill="#7d8b9d"
                fontSize="8.5"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
