"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Graceful fallback shown when the real .glb is missing or fails to load.
 * A slowly rotating faceted teal crystal — keeps the viewport alive and on-brand.
 */
export function PlaceholderModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current && autoRotate) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color="#a6e7d3"
          emissive="#20c7c9"
          emissiveIntensity={0.25}
          metalness={0.1}
          roughness={0.5}
          flatShading
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.32, 0]} />
        <meshBasicMaterial color="#8fdc7e" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
