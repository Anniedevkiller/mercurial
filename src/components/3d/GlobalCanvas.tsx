"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Environment, Preload } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import ElevatorScene from "./ElevatorScene";
import GalleryScene from "./GalleryScene";
import ServicesScene from "./ServicesScene";
import AboutScene from "./AboutScene";

const ROOMS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
  "/": { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0] },
  "/athletes": { pos: [0, 0.5, -4], lookAt: [0, 0, -15] },
  "/services": { pos: [40, 0.5, -4], lookAt: [40, 0, -15] },
  "/about": { pos: [80, 0.5, -4], lookAt: [80, 0, -15] }
};

function CameraRig({ started }: { started: boolean }) {
  const pathname = usePathname();
  const currentRoom = ROOMS[pathname] || ROOMS["/"];

  useFrame((state) => {
    if (!started && pathname === "/") {
      const targetZ = 4.0;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.005);
      state.camera.lookAt(0, 1.5, 0);
    } else if (started) {
      const posTarget = new THREE.Vector3(...currentRoom.pos);
      const lookTarget = new THREE.Vector3(...currentRoom.lookAt);
      state.camera.position.lerp(posTarget, 0.03);
      
      const currentLookAt = new THREE.Vector3(0, 0, -1);
      currentLookAt.applyQuaternion(state.camera.quaternion);
      currentLookAt.add(state.camera.position);
      currentLookAt.lerp(lookTarget, 0.03);
      state.camera.lookAt(currentLookAt);
    }
  });

  return null;
}

function CandleFlicker({ position, color = "#C19A6B", intensity = 1.5 }: { position: [number, number, number], color?: string, intensity?: number }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = intensity + Math.sin(state.clock.elapsedTime * 10) * 0.3 + Math.random() * 0.1;
    }
  });
  return <pointLight ref={lightRef} position={position} color={color} distance={10} castShadow />;
}

function CursorSpotlight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene, mouse, viewport } = useThree();

  useEffect(() => {
    const target = targetRef.current;
    if (scene) scene.add(target);
    return () => { if (scene) scene.remove(target); };
  }, [scene]);

  useFrame(() => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      targetRef.current.position.set(x, y, -5);
      lightRef.current.target = targetRef.current;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 0.5, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 0.5 + 5, 0.1);
    }
  });

  return (
    <spotLight ref={lightRef} position={[0, 5, 5]} intensity={2} angle={0.4} penumbra={1} color="#ffffff" distance={20} />
  );
}

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
        <ElevatorScene started={started} />
        
        <group position={[0, -0.5, -15]}>
          <MemoGalleryScene />
        </group>
        <group position={[40, -0.5, -15]}>
          <MemoServicesScene />
        </group>
        <group position={[80, -0.5, -15]}>
          <MemoAboutScene />
        </group>

        <CandleFlicker position={[-5, 2, -2]} />
        <CandleFlicker position={[5, 2, -2]} />
        <CursorSpotlight />

        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} color="#FDFBF7" />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
