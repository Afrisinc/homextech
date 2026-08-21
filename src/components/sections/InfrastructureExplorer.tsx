"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { ArchitectureTree } from "@/components/ui/ArchitectureTree";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { blueprints } from "@/data/infrastructure";
import { cn } from "@/lib/utils";

/**
 * Interactive reference-architecture explorer.
 * Visitors switch between deployment sizes and see the same design language
 * applied at each scale.
 */
export function InfrastructureExplorer({
  heading = true,
}: {
  heading?: boolean;
}) {
  const [active, setActive] = useState(blueprints[0].id);
  const current = blueprints.find((b) => b.id === active) ?? blueprints[0];

  return (
    <Section id="architectures">
      {heading ? (
        <SectionHeading
          eyebrow="Reference architectures"
          title="What a well-built network actually looks like"
          lead="Three worked examples at different scales. The principles do not change — only the size of the equipment and the number of failure domains."
        />
      ) : null}

      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Reference architectures">
        {blueprints.map((blueprint) => {
          const isActive = blueprint.id === active;
          return (
            <button
              key={blueprint.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`blueprint-${blueprint.id}`}
              id={`tab-${blueprint.id}`}
              onClick={() => setActive(blueprint.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "border-brand/45 bg-brand/12 text-brand-100"
                  : "border-white/10 bg-white/[0.02] text-ink-muted hover:border-white/20 hover:text-ink",
              )}
            >
              {blueprint.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.5fr]">
        <GlassCard className="p-7">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
            {current.audience}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            {current.name}
          </h3>
          <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
            {current.summary}
          </p>
          <ul className="mt-7 space-y-3 border-t border-white/6 pt-6">
            {current.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal"
                />
                {note}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="overflow-hidden p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`blueprint-${current.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${current.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArchitectureTree root={current.root} />
            </motion.div>
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  );
}
