"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry } from "three";

import { BRAND } from "@/components/three/palette";

/** Small, fast, deterministic 32-bit PRNG. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Ambient dust field. One draw call, no textures, and a slow drift so it reads
 * as atmosphere rather than snow.
 */
export function Particles({ count = 420, light = false }: { count?: number; light?: boolean }) {
  const points = useRef<Points>(null);
  const total = light ? Math.round(count * 0.35) : count;

  const geometry = useMemo(() => {
    // Seeded PRNG: the field looks random but is deterministic, so the render
    // stays pure and the layout is identical on every mount.
    const random = mulberry32(0x0f1c2a);
    const positions = new Float32Array(total * 3);
    for (let i = 0; i < total; i += 1) {
      positions[i * 3] = (random() - 0.5) * 22;
      positions[i * 3 + 1] = (random() - 0.5) * 15;
      positions[i * 3 + 2] = (random() - 0.5) * 8 - 6;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, [total]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.012;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.16;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.014}
        color={BRAND}
        transparent
        opacity={0.34}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
