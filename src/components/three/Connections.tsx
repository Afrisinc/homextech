"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, InstancedMesh, Object3D, Vector3 } from "three";

import { BRAND, SIGNAL } from "@/components/three/palette";
import { sceneEdges, sceneNodes } from "@/data/sceneNodes";
import type { NodeKind } from "@/types";

const CORE = new Vector3(0, 0, 0);

function usePositions() {
  return useMemo(() => {
    const map = new Map<string, Vector3>();
    map.set("core", CORE.clone());
    sceneNodes.forEach((node) => map.set(node.id, new Vector3(...node.position)));
    return map;
  }, []);
}

interface ConnectionsProps {
  selected: NodeKind | "core" | null;
  light: boolean;
  /** Only edges between revealed nodes are drawn during the scroll sequence. */
  revealed: Set<NodeKind>;
}

/**
 * Animated data paths between the technologies.
 * Static geometry is drawn once with drei's `Line`; the moving packets are a
 * single InstancedMesh so the whole system costs one extra draw call.
 */
export function Connections({ selected, light, revealed }: ConnectionsProps) {
  const positions = usePositions();
  const packets = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const brand = useMemo(() => new Color(BRAND), []);
  const signal = useMemo(() => new Color(SIGNAL), []);

  const edges = useMemo(() => {
    const isLive = (id: NodeKind | "core") =>
      id === "core" || revealed.has(id);

    return sceneEdges
      .filter(([from, to]) => isLive(from) && isLive(to))
      .map(([from, to]) => {
        const a = positions.get(from);
        const b = positions.get(to);
        if (!a || !b) return null;
        return { from, to, a, b };
      })
      .filter(
        (
          edge,
        ): edge is {
          from: NodeKind | "core";
          to: NodeKind | "core";
          a: Vector3;
          b: Vector3;
        } => edge !== null,
      );
  }, [positions, revealed]);

  const packetCount = Math.max(
    1,
    light ? edges.length : edges.length * 2,
  );

  useFrame((state) => {
    const mesh = packets.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    if (edges.length === 0) return;

    for (let i = 0; i < packetCount; i += 1) {
      const edge = edges[i % edges.length];
      const lane = Math.floor(i / edges.length);
      const speed = 0.22 + ((i * 37) % 11) * 0.012;
      const offset = ((i * 13) % 17) / 17 + lane * 0.5;
      const p = (t * speed + offset) % 1;

      dummy.position.lerpVectors(edge.a, edge.b, p);
      const fade = Math.sin(p * Math.PI);
      dummy.scale.setScalar(0.014 + fade * 0.014);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, i % 2 === 0 ? brand : signal);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      {edges.map((edge, index) => {
        const touched =
          selected !== null && (edge.from === selected || edge.to === selected);
        return (
          <Line
            key={`${edge.from}-${edge.to}-${index}`}
            points={[edge.a, edge.b]}
            color={index % 2 === 0 ? BRAND : SIGNAL}
            lineWidth={touched ? 1.6 : 1}
            transparent
            opacity={
              selected === null ? 0.22 : touched ? 0.65 : 0.08
            }
            depthWrite={false}
          />
        );
      })}

      <instancedMesh
        key={packetCount}
        ref={packets}
        args={[undefined, undefined, packetCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, light ? 5 : 8, light ? 5 : 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
