"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import { METAL, METAL_DARK } from "@/components/three/palette";

/** Bullet camera on a wall bracket, sweeping slowly through its field of view. */
export function CCTVNode({
  color,
  light = false,
}: {
  color: string;
  light?: boolean;
}) {
  const head = useRef<Group>(null);
  const seg = light ? 10 : 20;

  useFrame((state) => {
    if (head.current) {
      head.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.5;
    }
  });

  return (
    <group>
      {/* Bracket */}
      <mesh position={[0, 0.28, -0.1]}>
        <cylinderGeometry args={[0.055, 0.055, 0.22, seg]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.4, -0.1]}>
        <boxGeometry args={[0.24, 0.05, 0.24]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.42} roughness={0.5} />
      </mesh>

      <group ref={head} position={[0, 0.12, -0.1]}>
        {/* Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
          <cylinderGeometry args={[0.12, 0.12, 0.42, seg]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.42} roughness={0.4} />
        </mesh>
        {/* Lens hood */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.39]}>
          <cylinderGeometry args={[0.13, 0.11, 0.08, seg]} />
          <meshStandardMaterial color="#0a0f16" roughness={0.9} />
        </mesh>
        {/* Lens */}
        <mesh position={[0, 0, 0.44]}>
          <sphereGeometry args={[0.075, seg, seg]} />
          <meshStandardMaterial
            color="#050a10"
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.42}
          />
        </mesh>
        {/* Field of view cone */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.86]}>
          <coneGeometry args={[0.3, 0.8, light ? 12 : 24, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.07}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
