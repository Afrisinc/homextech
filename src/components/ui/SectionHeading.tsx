import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-px w-8 bg-linear-to-r from-brand to-transparent"
            />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <Tag
          className={cn(
            "font-semibold text-ink",
            Tag === "h1"
              ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
              : "text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <div className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            {lead}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        !bleed && "container-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}
