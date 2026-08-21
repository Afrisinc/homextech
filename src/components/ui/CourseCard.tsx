"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Badge, GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { revealItem } from "@/components/ui/Reveal";
import type { TrainingProgram } from "@/types";

const levelTone = {
  Foundation: "brand",
  Intermediate: "signal",
  Advanced: "neutral",
} as const;

export function CourseCard({ program }: { program: TrainingProgram }) {
  return (
    <motion.article variants={revealItem} id={program.slug} className="h-full">
      <GlassCard interactive accent="brand" className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
            <Icon name={program.icon} size={19} strokeWidth={1.6} aria-hidden />
          </span>
          <Badge tone={levelTone[program.level]}>{program.level}</Badge>
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
          {program.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
          {program.summary}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
              What you learn
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {program.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 text-[0.8125rem] text-ink-muted"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
              Practical work
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {program.practical.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[0.6875rem] text-ink-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-ink-faint uppercase">
            <Clock size={12} aria-hidden />
            {program.durationLabel}
          </span>
          <ButtonLink
            href={`/contact?service=Training&program=${program.slug}`}
            size="sm"
            variant="outline"
          >
            Request training
          </ButtonLink>
        </div>
      </GlassCard>
    </motion.article>
  );
}
