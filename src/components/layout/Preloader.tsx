"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { LogoMark } from "@/components/ui/Logo";

const SEQUENCE = [
  "INITIALIZING SYSTEM",
  "CONNECTING NETWORK",
  "LOADING INFRASTRUCTURE",
  "STARTING AI CORE",
  "SYSTEM ONLINE",
];

const STEP_MS = 260;

/**
 * Short infrastructure start-up sequence.
 * Runs once per browser session and never blocks interaction for longer than
 * the sequence itself; it also exits immediately under reduced-motion.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("ohx-boot") === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) return;

    try {
      window.sessionStorage.setItem("ohx-boot", "1");
    } catch {
      /* storage unavailable — the sequence simply runs again next time */
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    // Scheduled rather than set synchronously so the first paint is never
    // blocked by an extra render pass.
    timers.push(setTimeout(() => setVisible(true), 0));
    SEQUENCE.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(index), index * STEP_MS));
    });
    timers.push(
      setTimeout(() => setVisible(false), SEQUENCE.length * STEP_MS + 380),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          aria-hidden
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-fine opacity-40 mask-fade-edges"
          />
          <div className="relative flex w-full max-w-xs flex-col items-center px-6">
            <LogoMark className="h-14 w-14" />

            <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-linear-to-r from-brand to-signal"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((step + 1) / SEQUENCE.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <p className="mt-4 font-mono text-[0.625rem] tracking-[0.28em] text-brand-300 uppercase">
              {SEQUENCE[step]}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
