"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

/** Cloud mass built from overlapping spheres, with a data plane beneath it. */
export function CloudNode({
  color,
  light = false,
}: {
  color: string;
  light?: boolean;
}) {
  const plane = useRef<Group>(null);
  const seg = light ? 12 : 22;

  useFrame((_, delta) => {
    if (plane.current) plane.current.rotation.y += delta * 0.4;
  });

  return (
    <group>
      <group>
        {[
          [0, 0, 0, 0.3],
          [-0.32, -0.06, 0.04, 0.22],
          [0.3, -0.05, -0.03, 0.24],
          [-0.14, 0.16, -0.05, 0.2],
          [0.14, 0.14, 0.05, 0.18],
        ].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[r, seg, seg]} />
            <meshStandardMaterial
              color="#1a2634"
              emissive={color}
              emissiveIntensity={0.22}
              roughness={0.35}
              metalness={0.4}
              transparent
              opacity={0.92}
            />
          </mesh>
        ))}
      </group>

      <group ref={plane} position={[0, -0.34, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.34, 0.4, light ? 24 : 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}
