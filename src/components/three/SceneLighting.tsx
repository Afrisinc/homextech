"use client";

import { BRAND, SIGNAL } from "@/components/three/palette";

/**
 * Lighting rig for the technology ecosystem.
 * Deliberately restrained: one key light, one cool fill, and two brand-coloured
 * accents so materials read as engineered hardware rather than neon.
 */
export function SceneLighting({ light = false }: { light?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#8fa6bd" />
      <hemisphereLight args={["#cfe8ff", "#050a10", 0.45]} />

      <directionalLight
        position={[5, 7, 6]}
        intensity={1.35}
        color="#ffffff"
      />
      <directionalLight
        position={[-6, -2, -4]}
        intensity={0.4}
        color={SIGNAL}
      />

      {!light ? (
        <>
          <pointLight position={[0, 0, 2.6]} intensity={9} distance={11} color={BRAND} />
          <pointLight position={[-4.5, 2.5, 3]} intensity={5} distance={12} color={SIGNAL} />
          <pointLight position={[4.5, -2.5, 3]} intensity={4} distance={12} color={BRAND} />
        </>
      ) : (
        <pointLight position={[0, 0, 3]} intensity={7} distance={10} color={BRAND} />
      )}
    </>
  );
}
