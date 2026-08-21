"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

import { clamp } from "@/lib/utils";

export interface StageTarget {
  position: [number, number, number];
  look: [number, number, number];
}

/** Camera positions for each scroll-storytelling stage. */
export const stageTargets: StageTarget[] = [
  { position: [0, 0, 7.4], look: [0, 0, 0] },
  { position: [-2.1, 0.4, 7.9], look: [-1.1, 0.1, 0] },
  { position: [2.1, 0.5, 7.9], look: [1.1, 0.1, 0] },
  { position: [0, 2.4, 8.4], look: [0, 1.6, 0] },
  { position: [-2.4, 1.5, 7.6], look: [-1.2, 1.0, 0] },
  { position: [2.5, -1.3, 7.4], look: [1.3, -0.9, 0] },
  { position: [0, -2.4, 8.8], look: [0, -2.0, 0] },
];

interface CameraRigProps {
  stage: number;
  parallax?: boolean;
  intensity?: number;
}

/**
 * Drives the camera from two inputs: the current scroll stage (coarse framing)
 * and pointer position (subtle parallax). All easing happens on the GPU frame
 * loop rather than through React state.
 */
export function CameraRig({
  stage,
  parallax = true,
  intensity = 1,
}: CameraRigProps) {
  const { camera, pointer } = useThree();
  // Scratch vectors live in refs: they are mutated every frame, which is
  // exactly what memoised render values must never be.
  const desiredRef = useRef<Vector3>(null);
  const lookAtRef = useRef<Vector3>(null);
  const currentLookRef = useRef<Vector3>(null);

  desiredRef.current ??= new Vector3();
  lookAtRef.current ??= new Vector3();
  currentLookRef.current ??= new Vector3(0, 0, 0);

  useFrame((_, delta) => {
    const desired = desiredRef.current;
    const lookAt = lookAtRef.current;
    const currentLook = currentLookRef.current;
    if (!desired || !lookAt || !currentLook) return;

    const target = stageTargets[clamp(stage, 0, stageTargets.length - 1)];
    const ease = Math.min(delta * 1.9, 1);

    desired.set(...target.position);
    if (parallax) {
      desired.x += pointer.x * 0.85 * intensity;
      desired.y += pointer.y * 0.5 * intensity;
    }

    camera.position.lerp(desired, ease);

    lookAt.set(...target.look);
    currentLook.lerp(lookAt, ease);
    camera.lookAt(currentLook);
  });

  return null;
}
