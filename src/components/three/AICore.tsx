"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";

import { BRAND, BRAND_BRIGHT, SIGNAL } from "@/components/three/palette";

interface AICoreProps {
  onSelect?: () => void;
  active?: boolean;
  dimmed?: boolean;
  light?: boolean;
  scale?: number;
}

/**
 * Central compute / AI core.
 * Layered geometry — solid inner mass, faceted shell, wireframe cage and two
 * orbital rings — so it reads as engineered rather than decorative.
 */
export function AICore({
  onSelect,
  active = false,
  dimmed = false,
  light = false,
  scale = 1,
}: AICoreProps) {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const cage = useRef<Mesh>(null);
  const ringA = useRef<Group>(null);
  const ringB = useRef<Group>(null);
  const innerMat = useRef<MeshStandardMaterial>(null);

  const detail = light ? 0 : 1;

  const opacity = useMemo(() => (dimmed ? 0.35 : 1), [dimmed]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.y += delta * 0.16;
      shell.current.rotation.x += delta * 0.06;
    }
    if (cage.current) {
      cage.current.rotation.y -= delta * 0.1;
      cage.current.rotation.z += delta * 0.04;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.35;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.28;
    if (group.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.018;
      group.current.scale.setScalar(scale * pulse * (active ? 1.06 : 1));
    }
    if (innerMat.current) {
      innerMat.current.emissiveIntensity =
        (active ? 2.6 : 1.6) + Math.sin(t * 2.2) * 0.35;
    }
  });

  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Inner mass */}
      <mesh>
        <icosahedronGeometry args={[0.3, detail + 1]} />
        <meshStandardMaterial
          ref={innerMat}
          color={BRAND_BRIGHT}
          emissive={BRAND}
          emissiveIntensity={1.8}
          roughness={0.25}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Faceted shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.56, detail]} />
        <meshStandardMaterial
          color="#16202c"
          emissive={SIGNAL}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.85}
          flatShading
          transparent
          opacity={0.42 * opacity}
        />
      </mesh>

      {/* Wireframe cage */}
      <mesh ref={cage}>
        <icosahedronGeometry args={[0.8, detail]} />
        <meshBasicMaterial
          color={BRAND}
          wireframe
          transparent
          opacity={0.34 * opacity}
        />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.02, 0.009, 8, light ? 48 : 96]} />
          <meshBasicMaterial color={SIGNAL} transparent opacity={0.7 * opacity} />
        </mesh>
      </group>
      <group ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[1.24, 0.006, 8, light ? 48 : 96]} />
          <meshBasicMaterial color={BRAND} transparent opacity={0.5 * opacity} />
        </mesh>
      </group>

      {/* Soft halo */}
      <mesh>
        <sphereGeometry args={[0.78, 20, 20]} />
        <meshBasicMaterial
          color={BRAND}
          transparent
          opacity={0.035 * opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
