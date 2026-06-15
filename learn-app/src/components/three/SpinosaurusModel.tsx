"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center, Html } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_MODEL_URL = "/models/spinosaurus.glb";

interface Props {
  /** GLB to load; defaults to the bundled Spinosaurus model. */
  url?: string;
  autoRotate?: boolean;
  /** Hotspot annotations to render when Labels mode is on. */
  hotspots?: { label: string; position: [number, number, number] }[];
  showLabels?: boolean;
  /** Uniform scale multiplier (driven by the Scale rail control). */
  scale?: number;
}

export function SpinosaurusModel({
  url = DEFAULT_MODEL_URL,
  autoRotate = true,
  hotspots = [],
  showLabels = false,
  scale = 1,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Clone so material tweaks don't mutate the cached source scene, and compute
  // an auto-fit scale so any model (whatever its native units) fills the frame.
  const { model, fitScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.roughness = 0.55;
          child.material.metalness = 0.1;
        }
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const TARGET = 3.4; // world units the longest axis should span
    return { model: clone, fitScale: TARGET / maxDim };
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={fitScale * scale} />
        {showLabels &&
          hotspots.map((h) => (
            <Html
              key={h.label}
              position={h.position}
              center
              distanceFactor={8}
              zIndexRange={[10, 0]}
            >
              <div className="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-ds-primary/40 bg-ds-bg/85 px-2.5 py-1 text-[11px] font-medium text-ds-accent backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-ds-primary" />
                {h.label}
              </div>
            </Html>
          ))}
      </Center>
    </group>
  );
}

useGLTF.preload(DEFAULT_MODEL_URL);
