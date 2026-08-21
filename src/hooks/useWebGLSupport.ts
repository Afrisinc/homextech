"use client";

import { useEffect, useState } from "react";

export type WebGLStatus = "checking" | "supported" | "unsupported";

/**
 * Detects WebGL availability once on mount so the hero can fall back to a
 * polished 2D visualisation instead of rendering a broken canvas.
 */
export function useWebGLSupport(): WebGLStatus {
  const [status, setStatus] = useState<WebGLStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    const check = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ??
          canvas.getContext("webgl") ??
          canvas.getContext("experimental-webgl");
        if (!cancelled) setStatus(gl ? "supported" : "unsupported");
      } catch {
        if (!cancelled) setStatus("unsupported");
      }
    };

    // Defer one frame so the check never blocks first paint.
    const id = window.requestAnimationFrame(check);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, []);

  return status;
}
