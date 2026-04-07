"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Environment, Preload, Sparkles, Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import ElevatorScene from "./ElevatorScene";
import GalleryScene from "./GalleryScene";
import ServicesScene from "./ServicesScene";
import AboutScene from "./AboutScene";

const ROOMS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
  "/": { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0] },         // Outside lift looking at doors
  "/athletes": { pos: [0, 0.5, -4], lookAt: [0, 0, -15] },// Through lift, looking at frames
  "/services": { pos: [40, 0.5, -4], lookAt: [40, 0, -15] },
  "/about": { pos: [80, 0.5, -4], lookAt: [80, 0, -15] }
};

function CameraRig({ started }: { started: boolean }) {
  const pathname = usePathname();
  const currentRoom = ROOMS[pathname] || ROOMS["/"];

  useFrame((state, delta) => {
    // If not started, useCinematic effects (slow drifting)
    if (!started && pathname === "/") {
      const targetZ = 4.0;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.005);
      state.camera.lookAt(0, 1.5, 0);
    } else if (started) {
      // If started, smoothly interpolate to the current room's target position and lookAt.
      // GSAP handles the initial elevator push, so we only override if not mid-GSAP.
      // Easiest seamless way: standard lerp to the room after elevator sequence
      const posTarget = new THREE.Vector3(...currentRoom.pos);
      const lookTarget = new THREE.Vector3(...currentRoom.lookAt);

      state.camera.position.lerp(posTarget, 0.03);
      
      // Interpolate lookAt smoothly
      const currentLookAt = new THREE.Vector3(0, 0, -1);
      currentLookAt.applyQuaternion(state.camera.quaternion);
      currentLookAt.add(state.camera.position);
      currentLookAt.lerp(lookTarget, 0.03);
      state.camera.lookAt(currentLookAt);
    }
  });

  return null;
}

function CinematicEffects({ started }: { started: boolean }) {
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useThree();

  useEffect(() => {
    const target = targetRef.current;
    if (scene && !scene.children.includes(target)) scene.add(target);
    return () => { if (scene) scene.remove(target); };
  }, [scene]);

  useFrame((state) => {
    if (!started && spotlightRef.current) {
      spotlightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 4;
      targetRef.current.position.set(Math.sin(state.clock.elapsedTime * 0.3) * 2, 0, 0);
      spotlightRef.current.target = targetRef.current;
    }
  });

  return (
    <>
      <spotLight ref={spotlightRef} position={[0, 4, 3]} intensity={4} angle={0.8} penumbra={1} color="#C19A6B" />
      {!started && (
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#C19A6B" opacity={0.15} position={[0, -1, 0]} speed={0.2} />
        </Clouds>
      )}
    </>
  );
}

// Fixed imports at top

const MemoGalleryScene = React.memo(GalleryScene);
const MemoServicesScene = React.memo(ServicesScene);
const MemoAboutScene = React.memo(AboutScene);

export default function GlobalCanvas() {
  const started = useTourState();
  
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Suspense fallback={null}>
        <CameraRig started={started} />
        
        {/* Core Geometry Groups */}
        <ElevatorScene started={started} />
        
        {/* Gallery floor is behind elevator (-15 z) */}
        <group position={[0, -0.5, -15]}>
          <MemoGalleryScene />
        </group>
        
        {/* Services floor is at right (+40 x) */}
        <group position={[40, -0.5, -15]}>
          <MemoServicesScene />
        </group>
        
        {/* About floor is further right (+80 x) */}
        <group position={[80, -0.5, -15]}>
          <MemoAboutScene />
        </group>

        {/* Global FX & Lighting */}
        {!started && <Sparkles count={300} scale={12} size={1.5} speed={0.4} opacity={0.6} color="#C19A6B" />}
        <CinematicEffects started={started} />

        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} color="#FDFBF7" />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
