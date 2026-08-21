"use client";

import { useMemo } from "react";

import { METAL, METAL_DARK } from "@/components/three/palette";

/** Rack chassis with individually lit 1U units. */
export function ServerRack({
  color,
  light = false,
}: {
  color: string;
  light?: boolean;
}) {
  const units = useMemo(() => (light ? 3 : 5), [light]);

  return (
    <group>
      <mesh castShadow={false}>
        <boxGeometry args={[0.62, 0.9, 0.46]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.55} metalness={0.42} />
      </mesh>

      {Array.from({ length: units }).map((_, i) => {
        const y = 0.34 - (i * 0.68) / (units - 1);
        return (
          <group key={i} position={[0, y, 0.235]}>
            <mesh>
              <boxGeometry args={[0.56, 0.11, 0.03]} />
              <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.42} />
            </mesh>
            <mesh position={[-0.21, 0, 0.022]}>
              <boxGeometry args={[0.035, 0.035, 0.01]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <mesh position={[-0.15, 0, 0.022]}>
              <boxGeometry args={[0.02, 0.02, 0.01]} />
              <meshBasicMaterial color="#dbe6f2" />
            </mesh>
          </group>
        );
      })}

      {/* Vent slots */}
      <mesh position={[0, -0.48, 0]}>
        <boxGeometry args={[0.66, 0.02, 0.5]} />
        <meshStandardMaterial color={METAL} roughness={0.6} metalness={0.42} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.66, 0.02, 0.5]} />
        <meshStandardMaterial color={METAL} roughness={0.6} metalness={0.42} />
      </mesh>
    </group>
  );
}
