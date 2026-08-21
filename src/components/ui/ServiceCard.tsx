"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { revealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/**
 * Small animated visualisation shown on each service card.
 * Each discipline gets a different mark so the grid does not read as one
 * repeated icon.
 */
function ServiceVisual({ service }: { service: Service }) {
  const stroke = service.accent === "brand" ? "#8cc63f" : "#2aa3e0";

  return (
    <svg
      viewBox="0 0 120 56"
      className="h-14 w-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      aria-hidden
    >
      <g stroke={stroke} strokeWidth="1" fill="none">
        {service.category === "networking" || service.category === "support" ? (
          <>
            <path d="M8 46 H112" strokeOpacity="0.25" />
            {[20, 44, 68, 92].map((x, i) => (
              <g key={x}>
                <path d={`M${x} 46 V${34 - i * 4}`} strokeOpacity="0.5" />
                <circle cx={x} cy={30 - i * 4} r="3" strokeOpacity="0.9" />
              </g>
            ))}
            <path
              d="M8 46 H112"
              className="animate-dash"
              strokeOpacity="0.85"
              strokeWidth="1.4"
            />
          </>
        ) : null}

        {service.category === "cloud" || service.category === "infrastructure" ? (
          <>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x="26"
                y={12 + i * 13}
                width="68"
                height="10"
                rx="3"
                strokeOpacity={0.3 + i * 0.22}
              />
            ))}
            <path
              d="M60 8 V48"
              className="animate-dash"
              strokeOpacity="0.8"
              strokeWidth="1.3"
            />
          </>
        ) : null}

        {service.category === "security" ? (
          <>
            <path
              d="M60 8 L88 18 V32 C88 42 74 48 60 50 C46 48 32 42 32 32 V18 Z"
              strokeOpacity="0.45"
            />
            <path
              d="M60 8 L88 18 V32 C88 42 74 48 60 50"
              className="animate-dash"
              strokeOpacity="0.9"
              strokeWidth="1.3"
            />
            <path d="M50 30 L57 37 L72 22" strokeOpacity="0.8" strokeWidth="1.4" />
          </>
        ) : null}

        {service.category === "ai" ? (
          <>
            <circle cx="60" cy="28" r="9" strokeOpacity="0.8" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * Math.PI * 2) / 6;
              const x = 60 + Math.cos(angle) * 34;
              const y = 28 + Math.sin(angle) * 20;
              return (
                <g key={i}>
                  <line
                    x1="60"
                    y1="28"
                    x2={x}
                    y2={y}
                    strokeOpacity="0.3"
                    className="animate-dash"
                  />
                  <circle cx={x} cy={y} r="2.6" strokeOpacity="0.7" />
                </g>
              );
            })}
          </>
        ) : null}

        {service.category === "engineering" ? (
          <>
            <rect x="24" y="10" width="72" height="36" rx="4" strokeOpacity="0.4" />
            <rect x="34" y="20" width="16" height="16" rx="2" strokeOpacity="0.7" />
            {[58, 66, 74].map((x) => (
              <path key={x} d={`M${x} 16 V40`} strokeOpacity="0.45" />
            ))}
            <path
              d="M24 46 H96"
              className="animate-dash"
              strokeOpacity="0.85"
              strokeWidth="1.3"
            />
          </>
        ) : null}

        {service.category === "training" ? (
          <>
            <path d="M20 34 L60 16 L100 34 L60 52 Z" strokeOpacity="0.45" />
            <path
              d="M20 34 L60 16 L100 34"
              className="animate-dash"
              strokeOpacity="0.9"
              strokeWidth="1.3"
            />
            <path d="M86 41 V50" strokeOpacity="0.6" />
          </>
        ) : null}
      </g>
    </svg>
  );
}

export function ServiceCard({
  service,
  href,
}: {
  service: Service;
  href?: string;
}) {
  const content = (
    <GlassCard
      accent={service.accent}
      interactive
      className="h-full p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border",
            service.accent === "brand"
              ? "border-brand/25 bg-brand/10 text-brand"
              : "border-signal/25 bg-signal/10 text-signal",
          )}
        >
          <Icon name={service.icon} size={19} strokeWidth={1.6} aria-hidden />
        </span>
        {href ? (
          <ArrowUpRight
            size={17}
            className="mt-1 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden
          />
        ) : null}
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
        {service.summary}
      </p>

      <ServiceVisual service={service} />

      <ul className="mt-1 grid gap-1.5 sm:grid-cols-2">
        {service.capabilities.map((capability) => (
          <li
            key={capability}
            className="flex items-start gap-2 text-[0.8125rem] text-ink-muted"
          >
            <span
              aria-hidden
              className={cn(
                "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                service.accent === "brand" ? "bg-brand" : "bg-signal",
              )}
            />
            {capability}
          </li>
        ))}
      </ul>
    </GlassCard>
  );

  return (
    <motion.div variants={revealItem} className="h-full">
      {href ? (
        <Link href={href} className="block h-full rounded-2xl">
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}
