"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import type { FlowStep } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface FlowPipelineProps {
  steps: readonly FlowStep[];
  className?: string;
  accent?: "brand" | "signal";
  /** Two-column layout with description beside the label. */
  variant?: "rail" | "chips";
}

/**
 * Scroll-controlled process pipeline.
 * GSAP ScrollTrigger drives a single progress line; each step lights up as the
 * line passes it, which is cheaper than one observer per node.
 */
export function FlowPipeline({
  steps,
  className,
  accent = "brand",
  variant = "rail",
}: FlowPipelineProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root
        .querySelectorAll<HTMLElement>("[data-flow-step]")
        .forEach((el) => el.setAttribute("data-active", "true"));
      const line = root.querySelector<HTMLElement>("[data-flow-line]");
      if (line) line.style.transform = "scaleY(1)";
      return;
    }

    const ctx = gsap.context(() => {
      const line = root.querySelector<HTMLElement>("[data-flow-line]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-flow-step]", root);

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          },
        );
      }

      nodes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 78%",
          onEnter: () => node.setAttribute("data-active", "true"),
          onLeaveBack: () => node.setAttribute("data-active", "false"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [steps]);

  const accentText = accent === "brand" ? "text-brand" : "text-signal";
  const accentLine =
    accent === "brand"
      ? "from-brand via-brand to-signal"
      : "from-signal via-signal to-brand";

  if (variant === "chips") {
    return (
      <div
        ref={rootRef}
        className={cn("flex flex-wrap items-stretch gap-3", className)}
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            data-flow-step
            data-active="false"
            className="group relative flex-1 basis-52 rounded-xl border border-white/8 bg-white/[0.02] p-4 opacity-40 transition-all duration-700 data-[active=true]:border-white/15 data-[active=true]:bg-white/[0.05] data-[active=true]:opacity-100"
          >
            <span
              className={cn(
                "font-mono text-[0.625rem] tracking-[0.2em]",
                accentText,
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-medium text-ink">{step.label}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative pl-8 sm:pl-12", className)}>
      {/* Rail */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[11px] w-px bg-white/8"
      />
      <div
        aria-hidden
        data-flow-line
        className={cn(
          "absolute top-2 bottom-2 left-[11px] w-px origin-top bg-linear-to-b",
          accentLine,
        )}
        style={{ transform: "scaleY(0)" }}
      />

      <ol className="space-y-8 sm:space-y-10">
        {steps.map((step, index) => (
          <li
            key={step.id}
            data-flow-step
            data-active="false"
            className="group relative opacity-45 transition-all duration-700 ease-[var(--ease-out-expo)] data-[active=true]:opacity-100"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 -left-8 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-white/12 bg-base font-mono text-[0.5625rem] text-ink-faint transition-colors duration-500 sm:-left-12",
                "group-data-[active=true]:border-current group-data-[active=true]:bg-base",
                accentText,
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {step.label}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
