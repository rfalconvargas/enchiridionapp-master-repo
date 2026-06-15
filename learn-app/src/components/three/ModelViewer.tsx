"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { SpinosaurusModel } from "./SpinosaurusModel";
import { PlaceholderModel } from "./PlaceholderModel";
import { ModelErrorBoundary } from "./ModelErrorBoundary";

const DEFAULT_CAMERA: [number, number, number] = [5, 3, 8.5];

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-ds-primary/30 border-t-ds-primary" />
        <span className="text-[11px] uppercase tracking-wider text-ds-faint">
          Loading model
        </span>
      </div>
    </Html>
  );
}

/** Recenters the camera + controls whenever `resetSignal` changes. */
function CameraRig({
  controls,
  resetSignal,
}: {
  controls: React.RefObject<OrbitControlsImpl | null>;
  resetSignal: number;
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...DEFAULT_CAMERA);
    camera.lookAt(0, 0, 0);
    controls.current?.target.set(0, 0, 0);
    controls.current?.update();
  }, [resetSignal, camera, controls]);
  return null;
}

interface ModelViewerProps {
  modelUrl: string;
  autoRotate: boolean;
  showLabels: boolean;
  hotspots: { label: string; position: [number, number, number] }[];
  scale: number;
  resetSignal: number;
}

export default function ModelViewer({
  modelUrl,
  autoRotate,
  showLabels,
  hotspots,
  scale,
  resetSignal,
}: ModelViewerProps) {
  const controls = useRef<OrbitControlsImpl | null>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: DEFAULT_CAMERA, fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        // Transparent — the CSS .ench-stage gradient shows behind the scene.
        gl.setClearColor(new THREE.Color("#ffffff"), 0);
      }}
    >
      <hemisphereLight intensity={0.9} groundColor="#d7f0ea" color="#ffffff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.7} color="#5bcbc4" />

      <Suspense fallback={<Loader />}>
        <ModelErrorBoundary fallback={<PlaceholderModel autoRotate={autoRotate} />}>
          <SpinosaurusModel
            url={modelUrl}
            autoRotate={autoRotate}
            showLabels={showLabels}
            hotspots={hotspots}
            scale={scale}
          />
        </ModelErrorBoundary>
      </Suspense>

      <Grid
        position={[0, -1.6, 0]}
        args={[24, 24]}
        cellSize={0.6}
        cellColor="#c4ece2"
        sectionSize={3}
        sectionColor="#5bcbc4"
        fadeDistance={26}
        fadeStrength={1.5}
        infiniteGrid
      />

      <OrbitControls
        ref={controls}
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 1.9}
        enableDamping
        dampingFactor={0.08}
      />
      <CameraRig controls={controls} resetSignal={resetSignal} />
    </Canvas>
  );
}
