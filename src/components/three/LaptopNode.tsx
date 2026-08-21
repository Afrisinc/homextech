"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

import { METAL, METAL_DARK } from "@/components/three/palette";

/** Open laptop with a diagnostic screen glow — the service side of the business. */
export function LaptopNode({
  color,
  light = false,
}: {
  color: string;
  light?: boolean;
}) {
  const screenMat = useRef<MeshStandardMaterial>(null);
  const scan = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (screenMat.current) {
      screenMat.current.emissiveIntensity = 0.75 + Math.sin(t * 1.8) * 0.2;
    }
    if (scan.current && !light) {
      scan.current.position.y = ((t * 0.18) % 0.34) - 0.17;
    }
  });

  return (
    <group rotation={[-0.12, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -0.16, 0.14]}>
        <boxGeometry args={[0.78, 0.028, 0.5]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.32} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, -0.144, 0.24]}>
        <boxGeometry args={[0.2, 0.004, 0.13]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.6} />
      </mesh>

      {/* Screen */}
      <group position={[0, -0.15, -0.1]} rotation={[-1.18, 0, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.78, 0.46, 0.022]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.42} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, 0.014]}>
          <planeGeometry args={[0.7, 0.39]} />
          <meshStandardMaterial
            ref={screenMat}
            color="#08131c"
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.25}
          />
        </mesh>
        {!light ? (
          <mesh ref={scan} position={[0, 0.2, 0.016]}>
            <planeGeometry args={[0.68, 0.02]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.35}
              depthWrite={false}
            />
          </mesh>
        ) : null}
      </group>
    </group>
  );
}
