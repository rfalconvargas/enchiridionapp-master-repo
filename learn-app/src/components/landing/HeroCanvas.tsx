"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Crystal() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
      ref.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.25) * 0.2;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[1, 0.32, 160, 24]} />
        <meshStandardMaterial
          color="#bdeede"
          emissive="#20c7c9"
          emissiveIntensity={0.28}
          metalness={0.2}
          roughness={0.45}
        />
      </mesh>
      <mesh scale={1.02}>
        <torusKnotGeometry args={[1, 0.32, 80, 16]} />
        <meshBasicMaterial color="#8fdc7e" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Small on-brand 3D flourish for the landing hero. Client-only: gated behind a
 * mount flag so three never renders during SSR.
 */
export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Subtle on-brand placeholder until the WebGL canvas mounts (avoids an empty
  // box on first paint).
  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-24 w-24 animate-pulse rounded-full border border-ds-primary/30 bg-ds-primary/5" />
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={2} />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#5bcbc4" />
      <Crystal />
    </Canvas>
  );
}
