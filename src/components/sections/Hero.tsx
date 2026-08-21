"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MousePointerClick } from "lucide-react";
import { useCallback, useState } from "react";

import { stageCopy } from "@/components/three/TechnologyScene";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { ButtonLink } from "@/components/ui/Button";
import { coreSpec, sceneNodes } from "@/data/sceneNodes";
import { useScrollStage } from "@/hooks/useScrollStage";
import { cn } from "@/lib/utils";
import type { NodeKind } from "@/types";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-24 w-24 rounded-full border border-brand/25">
          <div className="h-full w-full animate-pulse-ring rounded-full bg-brand/10" />
        </div>
      </div>
    ),
  },
);

const STAGES = stageCopy.length;

export function Hero() {
  const { ref, stage } = useScrollStage(STAGES);
  const [selected, setSelected] = useState<NodeKind | "core" | null>(null);

  const handleSelect = useCallback((id: NodeKind | "core" | null) => {
    setSelected(id);
  }, []);

  const detail =
    selected === "core"
      ? {
          label: coreSpec.label,
          headline: coreSpec.headline,
          points: coreSpec.points as readonly string[],
          href: coreSpec.href,
        }
      : selected
        ? (() => {
            const node = sceneNodes.find((item) => item.id === selected);
            return node
              ? {
                  label: node.label,
                  headline: node.headline,
                  points: node.points,
                  href: node.href,
                }
              : null;
          })()
        : null;

  return (
    <section
      ref={ref}
      aria-label="OfficeHomeTechX technology ecosystem"
      className="relative"
      style={{ height: `${STAGES * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop — photograph (z-0) + atmospheric treatment (z-10) */}
        <HeroBackground />

        <SceneCanvas
          stage={stage}
          selected={selected}
          onSelect={handleSelect}
          className="absolute inset-0 z-30"
        />

        {/* Readability scrims — sit above the scene so type always holds up.
            The copy column changes shape per breakpoint, so the scrim does too. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[35] bg-[linear-gradient(to_top,rgba(4,7,11,0.9)_0%,rgba(4,7,11,0.72)_45%,rgba(4,7,11,0.28)_78%,transparent_100%)] sm:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[35] hidden bg-[linear-gradient(to_right,rgba(4,7,11,0.86)_0%,rgba(4,7,11,0.5)_46%,rgba(4,7,11,0.14)_78%,transparent_100%)] sm:block lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[35] hidden bg-[linear-gradient(to_right,rgba(4,7,11,0.88)_0%,rgba(4,7,11,0.4)_40%,transparent_68%)] lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-56 bg-linear-to-t from-void/80 to-transparent"
        />

        <div className="pointer-events-none relative z-40 flex h-full items-end pb-14 sm:items-center sm:pb-0">
          <div className="container-xl w-full">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                {detail ? (
                  <motion.div
                    key={`detail-${selected}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto rounded-2xl glass-strong p-6 sm:p-7"
                  >
                    <p className="eyebrow">{detail.label}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {detail.headline}
                    </h2>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {detail.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-ink-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {detail.href ? (
                        <ButtonLink href={detail.href} size="sm">
                          Explore
                          <ArrowUpRight size={15} />
                        </ButtonLink>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="text-xs text-ink-faint underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : stage === 0 ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="eyebrow mb-5 flex items-center gap-3">
                      <span
                        aria-hidden
                        className="inline-block h-px w-8 bg-linear-to-r from-brand to-transparent"
                      />
                      {"OfficeHomeTechX Ltd"}
                    </p>
                    <h1 className="text-[2.6rem] leading-[1.03] font-semibold tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
                      Building Africa&apos;s
                      <br />
                      <span className="text-gradient-brand">
                        technology infrastructure
                      </span>
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
                      We design, deploy and maintain the networks, servers,
                      cloud, surveillance and AI systems organisations depend on
                      — and we train the engineers who keep them running.
                    </p>

                    <div className="pointer-events-auto mt-9 flex flex-wrap gap-3">
                      <ButtonLink href="/infrastructure" size="lg">
                        Explore our infrastructure
                        <ArrowRight size={16} />
                      </ButtonLink>
                      <ButtonLink
                        href="/training"
                        variant="outline"
                        size="lg"
                      >
                        Start training
                      </ButtonLink>
                      <ButtonLink
                        href="/contact/consultation"
                        variant="ghost"
                        size="lg"
                      >
                        Request a consultation
                      </ButtonLink>
                    </div>

                    <p className="mt-8 hidden items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-faint uppercase lg:flex">
                      <MousePointerClick size={13} className="text-brand" />
                      Select any component to inspect it · scroll to build the
                      system
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`stage-${stage}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="eyebrow mb-4">
                      Stage {String(stage + 1).padStart(2, "0")} /{" "}
                      {String(STAGES).padStart(2, "0")}
                    </p>
                    <h2 className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                      {stageCopy[stage].title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
                      {stageCopy[stage].body}
                    </p>
                    {stage === STAGES - 1 ? (
                      <p className="mt-8 font-mono text-sm tracking-[0.14em] text-brand-300 uppercase">
                        We build it. We secure it.
                        <br />
                        We maintain it. We teach it.
                      </p>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stage indicator */}
        <div
          aria-hidden
          className="absolute top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
        >
          {stageCopy.map((item, index) => (
            <span
              key={item.title}
              className={cn(
                "h-6 w-px rounded-full transition-all duration-500",
                index === stage ? "bg-brand" : "bg-white/15",
              )}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
