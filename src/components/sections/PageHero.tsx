import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-white/6 pt-36 pb-20 sm:pt-44 sm:pb-24",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_0%,rgba(20,32,44,0.9),rgba(4,7,11,1))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fine opacity-40 mask-fade-b"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand/8 blur-3xl"
      />

      <div className="relative container-xl">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-linear-to-r from-brand to-transparent"
              />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {lead}
            </div>
          </Reveal>
          {children ? (
            <Reveal delay={0.18}>
              <div className="mt-9">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
