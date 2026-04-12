"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Environment, Preload } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import dynamic from "next/dynamic";

import ElevatorScene from "./ElevatorScene";
import GalleryScene from "./GalleryScene";
import ServicesScene from "./ServicesScene";
import AboutScene from "./AboutScene";

const ROOMS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
  "/": { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0] },
  "/athletes": { pos: [0, 1.5, -10], lookAt: [0, 1.2, -25] },
  "/services": { pos: [25, 1.5, -10], lookAt: [25, 1.2, -25] },
  "/about": { pos: [50, 1.5, -10], lookAt: [50, 1.2, -25] },
  "/contact": { pos: [75, 1.5, -10], lookAt: [75, 1.2, -25] }
};

function CameraRig({ started }: { started: boolean }) {
  const pathname = usePathname();
  const currentRoom = ROOMS[pathname] || ROOMS["/"];

  useFrame((state) => {
    if (!started && pathname === "/") {
      const targetZ = 4.5;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.005);
      state.camera.lookAt(0, 1.5, 0);
    } else if (started) {
      const posTarget = new THREE.Vector3(...currentRoom.pos);
      const lookTarget = new THREE.Vector3(...currentRoom.lookAt);

      // When tour starts on Home page, move camera INTO the elevator
      const finalPos = (pathname === "/" && started) ? new THREE.Vector3(0, 1.5, -1) : posTarget;
      const finalLook = (pathname === "/" && started) ? new THREE.Vector3(0, 1.5, -10) : lookTarget;

      // During the very initial transition from Home to /athletes, we want a specific speed
      const lerpSpeed = pathname === "/" ? 0.01 : 0.03;
      
      state.camera.position.lerp(finalPos, lerpSpeed);
      
      const currentLookAt = new THREE.Vector3(0, 0, -1);
      currentLookAt.applyQuaternion(state.camera.quaternion);
      currentLookAt.add(state.camera.position);
      currentLookAt.lerp(finalLook, lerpSpeed);
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
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 0.4, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 0.4 + 5, 0.1);
    }
  });

  return (
    <spotLight 
      ref={lightRef} 
      position={[0, 8, 8]} 
      intensity={1.5} 
      angle={0.3} 
      penumbra={1} 
      color="#D4AF37" /* Gold Spotlight */
      distance={25} 
      castShadow 
    />
  );
}

const MemoGalleryScene = React.memo(GalleryScene);
const MemoServicesScene = React.memo(ServicesScene);
const MemoAboutScene = React.memo(AboutScene);

export default function GlobalCanvas() {
  const started = useTourState();
  
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig started={started} />
          <ElevatorScene started={started} />
          
          <group position={[0, -0.5, -25]}>
            <MemoGalleryScene />
          </group>
          <group position={[25, -0.5, -25]}>
            <MemoServicesScene />
          </group>
          <group position={[50, -0.5, -25]}>
            <MemoAboutScene />
          </group>
  
          <CursorSpotlight />
  
          <Environment preset="apartment" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} color="#F8F4EC" castShadow />
        </Suspense>
      </Canvas>
    </div>
  );
}
