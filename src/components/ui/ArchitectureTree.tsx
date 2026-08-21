"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ArchitectureNode } from "@/types";

function NodeBox({
  node,
  depth,
  index,
}: {
  node: ArchitectureNode;
  depth: number;
  index: number;
}) {
  const tone =
    depth === 0
      ? "border-white/12 bg-white/[0.05]"
      : depth === 1
        ? "border-signal/30 bg-signal/[0.07]"
        : "border-brand/25 bg-brand/[0.05]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className={cn(
        "rounded-xl border px-4 py-3 text-center backdrop-blur-sm",
        tone,
      )}
    >
      <p className="text-sm font-medium tracking-tight text-ink">{node.label}</p>
      {node.detail ? (
        <p className="mt-1 font-mono text-[0.625rem] tracking-[0.1em] text-ink-faint uppercase">
          {node.detail}
        </p>
      ) : null}
    </motion.div>
  );
}

function Connector({ height = 22 }: { height?: number }) {
  return (
    <div
      aria-hidden
      className="mx-auto w-px bg-linear-to-b from-brand/50 to-signal/40"
      style={{ height }}
    />
  );
}

function Branch({ node, depth }: { node: ArchitectureNode; depth: number }) {
  const children = node.children ?? [];

  return (
    <div className="flex flex-col items-stretch">
      <div className="mx-auto w-full max-w-xs">
        <NodeBox node={node} depth={depth} index={depth} />
      </div>

      {children.length === 1 ? (
        <>
          <Connector />
          <Branch node={children[0]} depth={depth + 1} />
        </>
      ) : children.length > 1 ? (
        <>
          <Connector height={18} />
          <div
            aria-hidden
            className="mx-auto h-px w-[85%] bg-linear-to-r from-transparent via-white/15 to-transparent"
          />
          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3 lg:grid-cols-5">
            {children.map((child, i) => (
              <div key={child.id} className="flex flex-col">
                <div
                  aria-hidden
                  className="mx-auto mb-2 h-3 w-px bg-white/15"
                />
                <NodeBox node={child} depth={depth + 1} index={i} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ArchitectureTree({
  root,
  className,
}: {
  root: ArchitectureNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-blueprint opacity-40 mask-fade-edges"
      />
      <div className="relative">
        <Branch node={root} depth={0} />
      </div>
    </div>
  );
}
