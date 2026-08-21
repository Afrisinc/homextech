"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";

import { METAL, METAL_DARK } from "@/components/three/palette";

/** GPU card with two spinning fans. */
export function GpuNode({ color, light = false }: { color: string; light?: boolean }) {
  const fans = useRef<Group>(null);
  const seg = light ? 10 : 18;

  useFrame((_, delta) => {
    if (fans.current) fans.current.rotation.z -= delta * 4.2;
  });

  return (
    <group rotation={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.94, 0.34, 0.12]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.42} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.86, 0.06, 0.1]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.3} />
      </mesh>
      <group ref={fans} position={[0, 0, 0.065]}>
        {[-0.22, 0.22].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <torusGeometry args={[0.12, 0.014, 6, seg]} />
              <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.4} />
            </mesh>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
                <boxGeometry args={[0.11, 0.022, 0.008]} />
                <meshStandardMaterial
                  color="#26333f"
                  metalness={0.42}
                  roughness={0.5}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <mesh position={[0, 0.19, 0.062]}>
        <boxGeometry args={[0.5, 0.022, 0.005]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/** Stacked database platters. */
export function DatabaseNode({ color, light = false }: { color: string; light?: boolean }) {
  const seg = light ? 16 : 32;
  return (
    <group>
      {[0.26, 0, -0.26].map((y, i) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.34, 0.34, 0.16, seg]} />
            <meshStandardMaterial
              color={METAL_DARK}
              metalness={0.42}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, 0.085, 0]}>
            <cylinderGeometry args={[0.345, 0.345, 0.012, seg]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={i === 0 ? 0.85 : 0.45}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Firewall: a layered barrier of offset bricks. */
export function FirewallNode({ color }: { color: string; light?: boolean }) {
  const rows = 4;
  const cols = 4;
  return (
    <group>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const offset = r % 2 === 0 ? 0 : 0.09;
          const x = -0.27 + c * 0.18 + offset;
          const y = 0.27 - r * 0.18;
          return (
            <mesh key={`${r}-${c}`} position={[x, y, 0]}>
              <boxGeometry args={[0.16, 0.15, 0.09]} />
              <meshStandardMaterial
                color={METAL_DARK}
                emissive={color}
                emissiveIntensity={0.16}
                metalness={0.42}
                roughness={0.45}
              />
            </mesh>
          );
        }),
      )}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[0.86, 0.78]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Wireless access point emitting expanding rings. */
export function WifiNode({ color, light = false }: { color: string; light?: boolean }) {
  const rings = useRef<Group>(null);
  const seg = light ? 20 : 40;

  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((child, i) => {
      const phase = (t * 0.55 + i * 0.33) % 1;
      child.scale.setScalar(0.3 + phase * 1.5);
      const material = (child as Mesh).material as MeshBasicMaterial | undefined;
      if (material) material.opacity = 0.5 * (1 - phase);
    });
  });

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.08, seg]} />
        <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.03, seg]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <group ref={rings} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <ringGeometry args={[0.26, 0.29, seg]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Storage array: a shelf of drive carriers. */
export function StorageNode({ color }: { color: string; light?: boolean }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.9, 0.44, 0.4]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.42} roughness={0.42} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <group
            key={i}
            position={[-0.3 + col * 0.2, 0.1 - row * 0.2, 0.205]}
          >
            <mesh>
              <boxGeometry args={[0.17, 0.16, 0.02]} />
              <meshStandardMaterial color={METAL} metalness={0.42} roughness={0.3} />
            </mesh>
            <mesh position={[-0.055, 0, 0.014]}>
              <boxGeometry args={[0.02, 0.02, 0.006]} />
              <meshBasicMaterial color={i % 3 === 0 ? "#dbe6f2" : color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/** Motherboard: PCB with chips, socket and traces. */
export function MotherboardNode({ color }: { color: string; light?: boolean }) {
  return (
    <group rotation={[-0.9, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.92, 0.02, 0.78]} />
        <meshStandardMaterial color="#12251c" roughness={0.75} metalness={0.2} />
      </mesh>
      {/* CPU socket */}
      <mesh position={[-0.12, 0.03, -0.08]}>
        <boxGeometry args={[0.26, 0.045, 0.26]} />
        <meshStandardMaterial color="#2a3644" metalness={0.42} roughness={0.28} />
      </mesh>
      <mesh position={[-0.12, 0.056, -0.08]}>
        <boxGeometry args={[0.19, 0.012, 0.19]} />
        <meshStandardMaterial
          color="#c9d6e4"
          metalness={0.42}
          roughness={0.18}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* RAM slots */}
      {[0.16, 0.24, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.03, -0.02]}>
          <boxGeometry args={[0.035, 0.04, 0.5]} />
          <meshStandardMaterial color="#1d2b38" metalness={0.42} roughness={0.5} />
        </mesh>
      ))}
      {/* Capacitors */}
      {[
        [-0.36, 0.16],
        [-0.3, 0.24],
        [-0.38, 0.3],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 10]} />
          <meshStandardMaterial color="#3a4655" metalness={0.42} roughness={0.35} />
        </mesh>
      ))}
      {/* Trace glow */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.76]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
