"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll progress across a target element and maps it to a discrete
 * "stage" index. Used to drive the hero scroll-storytelling sequence without
 * re-rendering the 3D scene on every scroll event.
 */
export function useScrollStage(stageCount: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        progressRef.current = 0;
        setStage(0);
        return;
      }
      const raw = -rect.top / total;
      const progress = Math.min(Math.max(raw, 0), 1);
      progressRef.current = progress;
      const next = Math.min(
        stageCount - 1,
        Math.floor(progress * stageCount + 0.0001),
      );
      setStage((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stageCount]);

  return { ref, stage, progressRef };
}
