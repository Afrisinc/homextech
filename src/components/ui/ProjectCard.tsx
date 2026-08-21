"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Badge, GlassCard } from "@/components/ui/GlassCard";
import { revealItem } from "@/components/ui/Reveal";
import type { Project } from "@/types";

/**
 * Project card with a reserved media slot.
 * When `project.image` is supplied it renders a real photograph; until then a
 * generated technical pattern keeps the grid consistent.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article variants={revealItem} className="h-full">
      <GlassCard interactive accent="signal" className="flex h-full flex-col">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-2xl border-b border-white/8 bg-surface">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <PlaceholderVisual seed={project.slug} label={project.category} />
          )}
          <span className="absolute top-3 left-3">
            <Badge tone="neutral">{project.status}</Badge>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-signal-300 uppercase">
            {project.category}
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
            {project.summary}
          </p>

          <ul className="mt-5 space-y-1.5">
            {project.scope.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[0.8125rem] text-ink-muted"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[0.6875rem] text-ink-faint"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function PlaceholderVisual({ seed, label }: { seed: string; label: string }) {
  // Deterministic pseudo-random layout so cards differ but stay stable.
  const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rows = 5;
  const cols = 9;

  return (
    <div className="relative h-full w-full">
      <div aria-hidden className="absolute inset-0 grid-blueprint opacity-60" />
      <svg
        viewBox="0 0 180 112"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g stroke="#2aa3e0" strokeOpacity="0.4" fill="none" strokeWidth="0.8">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const on = (hash + r * 7 + c * 13) % 5 < 2;
              if (!on) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={12 + c * 18}
                  y={12 + r * 18}
                  width="12"
                  height="12"
                  rx="2"
                  strokeOpacity={0.25 + ((hash + r + c) % 4) * 0.16}
                />
              );
            }),
          )}
        </g>
        <path
          d="M6 96 H174"
          stroke="#8cc63f"
          strokeOpacity="0.5"
          strokeWidth="1"
          className="animate-dash"
          fill="none"
        />
      </svg>
      <span className="absolute right-3 bottom-3 font-mono text-[0.5625rem] tracking-[0.2em] text-ink-faint uppercase">
        {label}
      </span>
    </div>
  );
}
