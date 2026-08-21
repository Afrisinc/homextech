"use client";

import { METAL, METAL_DARK } from "@/components/three/palette";

/** Rack-mount switch: chassis, port bank and status LEDs. */
export function NetworkNode({
  color,
  light = false,
}: {
  color: string;
  light?: boolean;
}) {
  const ports = light ? 6 : 12;

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.02, 0.2, 0.44]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.45} metalness={0.42} />
      </mesh>

      <group position={[0, -0.02, 0.225]}>
        {Array.from({ length: ports }).map((_, i) => {
          const x = -0.44 + (i * 0.88) / (ports - 1);
          return (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.045, 0.06, 0.02]} />
              <meshStandardMaterial color="#0a0f16" roughness={0.9} />
            </mesh>
          );
        })}
      </group>

      <group position={[0, 0.06, 0.228]}>
        {Array.from({ length: ports }).map((_, i) => {
          const x = -0.44 + (i * 0.88) / (ports - 1);
          return (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.02, 0.016, 0.008]} />
              <meshBasicMaterial color={i % 3 === 0 ? "#dbe6f2" : color} />
            </mesh>
          );
        })}
      </group>

      {/* Mounting ears */}
      <mesh position={[-0.56, 0, 0]}>
        <boxGeometry args={[0.1, 0.18, 0.02]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.35} />
      </mesh>
      <mesh position={[0.56, 0, 0]}>
        <boxGeometry args={[0.1, 0.18, 0.02]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.35} />
      </mesh>
    </group>
  );
}
