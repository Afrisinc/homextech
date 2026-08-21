"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Box {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  tone: "brand" | "signal" | "neutral";
}

const W = 720;
const H = 560;
const BOX_H = 52;

const boxes: Box[] = [
  { id: "users", label: "Users", sub: "staff · branches · remote", x: 260, y: 12, w: 200, tone: "neutral" },
  { id: "firewall", label: "Firewall", sub: "policy · inspection", x: 260, y: 96, w: 200, tone: "signal" },
  { id: "lb", label: "Load balancer", sub: "session distribution", x: 260, y: 180, w: 200, tone: "signal" },
  { id: "app-a", label: "App server A", sub: "workload", x: 88, y: 272, w: 190, tone: "brand" },
  { id: "app-b", label: "App server B", sub: "workload", x: 442, y: 272, w: 190, tone: "brand" },
  { id: "db", label: "Database", sub: "replicated", x: 260, y: 364, w: 200, tone: "brand" },
  { id: "storage", label: "Storage", sub: "volumes · objects", x: 260, y: 440, w: 200, tone: "signal" },
  { id: "backup", label: "Backup", sub: "off-site · restore-tested", x: 260, y: 500, w: 200, tone: "brand" },
];

const paths: { id: string; d: string }[] = [
  { id: "u-f", d: `M360 ${12 + BOX_H} V96` },
  { id: "f-l", d: `M360 ${96 + BOX_H} V180` },
  { id: "l-a", d: `M360 ${180 + BOX_H} V252 H183 V272` },
  { id: "l-b", d: `M360 ${180 + BOX_H} V252 H537 V272` },
  { id: "a-db", d: `M183 ${272 + BOX_H} V344 H360 V364` },
  { id: "b-db", d: `M537 ${272 + BOX_H} V344 H360 V364` },
  { id: "db-st", d: `M360 ${364 + BOX_H} V440` },
  { id: "st-bk", d: `M360 ${440 + BOX_H} V500` },
];

const toneClass = {
  brand: { fill: "rgba(140,198,63,0.07)", stroke: "rgba(140,198,63,0.42)" },
  signal: { fill: "rgba(42,163,224,0.07)", stroke: "rgba(42,163,224,0.42)" },
  neutral: { fill: "rgba(255,255,255,0.045)", stroke: "rgba(255,255,255,0.18)" },
} as const;

export function CloudArchitectureDiagram({ className }: { className?: string }) {
  return (
    <figure className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H + BOX_H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Cloud architecture: users reach a firewall, then a load balancer, which distributes traffic to two application servers backed by a database, storage and off-site backup."
      >
        <defs>
          <linearGradient id="cad-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2aa3e0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8cc63f" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#cad-line)" strokeWidth="1.5">
          {paths.map((p) => (
            <path key={p.id} d={p.d} className="opacity-45" />
          ))}
        </g>
        <g fill="none" stroke="#8cc63f" strokeWidth="1.6" strokeLinecap="round">
          {paths.map((p, i) => (
            <path
              key={`${p.id}-flow`}
              d={p.d}
              className="animate-dash opacity-80"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </g>

        {boxes.map((box, i) => {
          const tone = toneClass[box.tone];
          return (
            <motion.g
              key={box.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={BOX_H}
                rx={12}
                fill={tone.fill}
                stroke={tone.stroke}
                strokeWidth="1"
              />
              <text
                x={box.x + box.w / 2}
                y={box.y + 22}
                textAnchor="middle"
                fill="#eef4fb"
                fontSize="14"
                fontWeight="500"
              >
                {box.label}
              </text>
              <text
                x={box.x + box.w / 2}
                y={box.y + 38}
                textAnchor="middle"
                fill="#7d8b9d"
                fontSize="9.5"
                letterSpacing="1.2"
                style={{ textTransform: "uppercase" }}
              >
                {box.sub}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </figure>
  );
}
