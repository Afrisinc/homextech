"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

import { AICore } from "@/components/three/AICore";
import { CameraRig } from "@/components/three/CameraRig";
import { CCTVNode } from "@/components/three/CCTVNode";
import { CloudNode } from "@/components/three/CloudNode";
import { Connections } from "@/components/three/Connections";
import {
  DatabaseNode,
  FirewallNode,
  GpuNode,
  MotherboardNode,
  StorageNode,
  WifiNode,
} from "@/components/three/HardwareNodes";
import { LaptopNode } from "@/components/three/LaptopNode";
import { NetworkNode } from "@/components/three/NetworkNode";
import { Particles } from "@/components/three/Particles";
import { SceneLighting } from "@/components/three/SceneLighting";
import { ServerRack } from "@/components/three/ServerRack";
import { TechNode } from "@/components/three/TechNode";
import { accentColor } from "@/components/three/palette";
import { sceneNodes } from "@/data/sceneNodes";
import type { NodeKind } from "@/types";

/** Cumulative reveal order for the seven scroll stages. */
export const stageReveals: NodeKind[][] = [
  ["network", "server"],
  ["cctv", "wifi"],
  ["database", "storage"],
  ["cloud"],
  ["firewall"],
  ["gpu"],
  ["laptop", "motherboard"],
];

export const stageCopy = [
  {
    title: "The compute core",
    body: "Everything starts with compute. Processing, storage and intelligence sit at the centre of the system.",
  },
  {
    title: "Network infrastructure",
    body: "Switching, routing, wireless and structured cabling connect every device to that core — with segmentation from day one.",
  },
  {
    title: "Servers connect",
    body: "Virtualization, databases and file services move onto managed hardware instead of scattered desktops.",
  },
  {
    title: "Cloud infrastructure",
    body: "Private and hybrid cloud extend the platform, with storage and backup designed alongside it.",
  },
  {
    title: "Security surrounds it",
    body: "Firewalls, segmentation, endpoint protection and monitoring wrap the infrastructure rather than bolt on afterwards.",
  },
  {
    title: "AI and GPU compute",
    body: "GPU infrastructure runs inference, computer vision and automation workloads on premises where data must stay local.",
  },
  {
    title: "Engineers and training",
    body: "Devices get repaired, systems get maintained, and people get trained to run what has been built.",
  },
];

function NodeGeometry({
  id,
  color,
  light,
}: {
  id: NodeKind;
  color: string;
  light: boolean;
}) {
  switch (id) {
    case "server":
      return <ServerRack color={color} light={light} />;
    case "network":
      return <NetworkNode color={color} light={light} />;
    case "cloud":
      return <CloudNode color={color} light={light} />;
    case "cctv":
      return <CCTVNode color={color} light={light} />;
    case "laptop":
      return <LaptopNode color={color} light={light} />;
    case "gpu":
      return <GpuNode color={color} light={light} />;
    case "database":
      return <DatabaseNode color={color} light={light} />;
    case "firewall":
      return <FirewallNode color={color} light={light} />;
    case "wifi":
      return <WifiNode color={color} light={light} />;
    case "storage":
      return <StorageNode color={color} light={light} />;
    case "motherboard":
      return <MotherboardNode color={color} light={light} />;
    default:
      return null;
  }
}

interface TechnologySceneProps {
  stage: number;
  selected: NodeKind | "core" | null;
  onSelect: (id: NodeKind | "core" | null) => void;
  light?: boolean;
  reducedMotion?: boolean;
}

export function TechnologyScene({
  stage,
  selected,
  onSelect,
  light = false,
  reducedMotion = false,
}: TechnologySceneProps) {
  const system = useRef<Group>(null);

  const revealed = useMemo(() => {
    const set = new Set<NodeKind>();
    for (let i = 0; i <= stage && i < stageReveals.length; i += 1) {
      stageReveals[i].forEach((id) => set.add(id));
    }
    return set;
  }, [stage]);

  useFrame((state) => {
    if (!system.current || reducedMotion) return;
    // A slow oscillating drift rather than a full turn: the ecosystem stays
    // readable as a diagram while never feeling static.
    const t = state.clock.elapsedTime;
    const amplitude = selected ? 0.07 : 0.26;
    system.current.rotation.y = Math.sin(t * 0.16) * amplitude;
    system.current.rotation.x = Math.sin(t * 0.11) * amplitude * 0.28;
  });

  return (
    <>
      <SceneLighting light={light} />
      <CameraRig
        stage={stage}
        parallax={!reducedMotion}
        intensity={light ? 0.4 : 1}
      />

      <Particles light={light} />

      {/* On wide viewports the ecosystem sits right of centre so the headline
          column never competes with the geometry. */}
      <group
        ref={system}
        position={[light ? 0 : 1.7, 0.1, 0]}
        scale={light ? 1 : 0.92}
      >
        <AICore
          active={selected === "core"}
          dimmed={selected !== null && selected !== "core"}
          light={light}
          onSelect={() => onSelect(selected === "core" ? null : "core")}
        />

        <Connections selected={selected} light={light} revealed={revealed} />

        {sceneNodes.map((spec) => (
          <TechNode
            key={spec.id}
            spec={spec}
            active={selected === spec.id}
            dimmed={selected !== null && selected !== spec.id}
            light={light}
            showLabel={!light}
            revealed={revealed.has(spec.id)}
            onSelect={(id) => onSelect(selected === id ? null : id)}
          >
            <NodeGeometry
              id={spec.id}
              color={accentColor(spec.accent)}
              light={light}
            />
          </TechNode>
        ))}
      </group>
    </>
  );
}
