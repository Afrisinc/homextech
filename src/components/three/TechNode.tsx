"use client";

import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import type { Group } from "three";

import { accentColor } from "@/components/three/palette";
import type { SceneNodeSpec } from "@/types";

interface TechNodeProps {
  spec: SceneNodeSpec;
  children: ReactNode;
  active: boolean;
  dimmed: boolean;
  light: boolean;
  showLabel: boolean;
  /** Progressive scroll reveal — hidden nodes scale down and stop rendering. */
  revealed?: boolean;
  onSelect: (id: SceneNodeSpec["id"]) => void;
}

/**
 * Shared wrapper for every hardware representation in the scene.
 * Owns float motion, hover and selection state, the ground halo and the
 * HTML label, so the individual geometry components stay purely visual.
 */
export function TechNode({
  spec,
  children,
  active,
  dimmed,
  light,
  showLabel,
  revealed = true,
  onSelect,
}: TechNodeProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(revealed);
  const color = accentColor(spec.accent);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = !revealed ? 0.001 : active ? 1.16 : hovered ? 1.1 : 1;
    const current = group.current.scale.x;
    const next = current + (target - current) * Math.min(delta * 4.2, 1);
    group.current.scale.setScalar(next);
    const shouldRender = next > 0.02;
    if (shouldRender !== visible) setVisible(shouldRender);
  });

  const handleOver = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group position={spec.position}>
      <Float
        speed={light ? 0 : 1.1}
        rotationIntensity={light ? 0 : 0.16}
        floatIntensity={light ? 0 : 0.42}
        floatingRange={[-0.06, 0.06]}
      >
        <group
          ref={group}
          visible={visible}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(spec.id);
          }}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          {children}

          {/* Interaction target — keeps small geometry easy to click */}
          <mesh visible={false}>
            <sphereGeometry args={[0.72, 8, 8]} />
            <meshBasicMaterial />
          </mesh>

          {/* Halo */}
          <mesh
            position={[0, -0.52, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            visible={active || hovered}
          >
            <ringGeometry args={[0.5, 0.56, 40]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={active ? 0.75 : 0.4}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Float>

      {showLabel && visible ? (
        <Html
          center
          position={[0, -0.88, 0]}
          distanceFactor={5.5}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span
            className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap uppercase backdrop-blur-sm transition-opacity duration-500"
            style={{
              opacity: dimmed ? 0.25 : active || hovered ? 1 : 0.7,
              borderColor: `${color}55`,
              color,
              background: "rgba(4,7,11,0.7)",
            }}
          >
            {spec.label}
          </span>
        </Html>
      ) : null}
    </group>
  );
}
