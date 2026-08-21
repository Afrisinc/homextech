import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: "brand" | "signal" | "none";
  interactive?: boolean;
  as?: "div" | "article" | "li";
}

export function GlassCard({
  children,
  className,
  accent = "none",
  interactive = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "group relative overflow-hidden rounded-2xl glass",
        interactive &&
          "transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-white/15",
        className,
      )}
    >
      {accent !== "none" ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px opacity-70",
            accent === "brand"
              ? "bg-linear-to-r from-transparent via-brand to-transparent"
              : "bg-linear-to-r from-transparent via-signal to-transparent",
          )}
        />
      ) : null}
      {interactive ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            accent === "signal"
              ? "bg-[radial-gradient(420px_circle_at_50%_0%,rgba(42,163,224,0.12),transparent_70%)]"
              : "bg-[radial-gradient(420px_circle_at_50%_0%,rgba(140,198,63,0.12),transparent_70%)]",
          )}
        />
      ) : null}
      <div className="relative">{children}</div>
    </Tag>
  );
}

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "signal" | "neutral";
  className?: string;
}) {
  const tones = {
    brand: "border-brand/30 bg-brand/10 text-brand-100",
    signal: "border-signal/30 bg-signal/10 text-signal-300",
    neutral: "border-white/12 bg-white/[0.04] text-ink-muted",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
