"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { AICore } from "@/components/three/AICore";
import { Particles } from "@/components/three/Particles";
import { SceneLighting } from "@/components/three/SceneLighting";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

/**
 * Compact single-object canvas used on secondary pages.
 * Deliberately much lighter than the hero scene: one mesh group, no
 * connections, no interaction handlers.
 */
export function CoreShowcase({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {webgl === "supported" ? (
        <Canvas
          dpr={[1, isMobile ? 1.3 : 1.7]}
          frameloop={inView && !reducedMotion ? "always" : "demand"}
          camera={{ position: [0, 0, 4.6], fov: 45 }}
          gl={{ antialias: !isMobile, alpha: true }}
        >
          <Suspense fallback={null}>
            <SceneLighting light />
            <Particles count={200} light={isMobile} />
            <AICore light={isMobile} scale={1.25} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

export default CoreShowcase;
