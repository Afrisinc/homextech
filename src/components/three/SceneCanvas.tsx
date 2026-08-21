"use client";

import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { TechnologyScene } from "@/components/three/TechnologyScene";
import { WebGLFallback } from "@/components/three/WebGLFallback";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import type { NodeKind } from "@/types";

interface SceneCanvasProps {
  stage: number;
  selected: NodeKind | "core" | null;
  onSelect: (id: NodeKind | "core" | null) => void;
  className?: string;
}

/**
 * Canvas host for the hero scene.
 *
 * Responsibilities kept here rather than in the scene itself:
 *  - device-pixel-ratio ceiling (mobile gets a lower cap)
 *  - pausing the frame loop when the canvas is scrolled out of view
 *  - WebGL capability detection and 2D fallback
 *  - Suspense boundary so the page never blocks on the 3D bundle
 */
export function SceneCanvas({
  stage,
  selected,
  onSelect,
  className,
}: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLSupport();

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (webgl === "unsupported") {
    return (
      <div ref={containerRef} className={className}>
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {webgl === "supported" ? (
        <Canvas
          dpr={[1, isMobile ? 1.4 : 1.85]}
          frameloop={inView ? "always" : "never"}
          camera={{ position: [0, 0, 7.4], fov: 42, near: 0.1, far: 60 }}
          gl={{
            antialias: !isMobile,
            powerPreference: "high-performance",
            alpha: true,
          }}
          onPointerMissed={() => onSelect(null)}
          style={{ touchAction: "pan-y" }}
        >
          <Suspense fallback={null}>
            <TechnologyScene
              stage={stage}
              selected={selected}
              onSelect={onSelect}
              light={isMobile}
              reducedMotion={reducedMotion}
            />
            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      ) : null}
    </div>
  );
}

export default SceneCanvas;
