"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Environment, Preload } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import dynamic from "next/dynamic";

import ElevatorScene from "./ElevatorScene";
const GalleryScene = React.lazy(() => import("./GalleryScene"));
const ServicesScene = React.lazy(() => import("./ServicesScene"));
const AboutScene = React.lazy(() => import("./AboutScene"));

const ROOMS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
  "/": { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0] },
  "/athletes": { pos: [0, 1.5, -8], lookAt: [0, 1.5, -25] },
  "/services": { pos: [120, 1.5, -8], lookAt: [120, 1.5, -25] },
  "/about": { pos: [240, 1.5, -8], lookAt: [240, 1.5, -25] },
  "/contact": { pos: [360, 1.5, -8], lookAt: [360, 1.5, -25] }
};

function CameraRig({ started, activeSection }: { started: boolean, activeSection: string }) {
  const currentRoom = ROOMS[activeSection] || ROOMS["/"];
  const { viewport } = useThree();

  useFrame((state, delta) => {
    // Dynamic Responsive FOV based on screen width/aspect
    const aspect = viewport.width / viewport.height;
    // Base FOV is 45 for desktop. Tablet (aspect ~1) gets 60. Phone (aspect ~0.5) gets 75.
    const targetFov = aspect < 0.8 ? 75 : (aspect < 1.2 ? 60 : 45);
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 2);
    camera.updateProjectionMatrix();
    if (!started && activeSection === "/") {
      const targetZ = 4.5;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.005);
      state.camera.lookAt(0, 1.5, 0);
    } else if (started) {
      const posTarget = new THREE.Vector3(...currentRoom.pos);
      const lookTarget = new THREE.Vector3(...currentRoom.lookAt);

      // When tour starts on Home page, move camera INTO the elevator
      const finalPos = (activeSection === "/" && started) ? new THREE.Vector3(0, 1.5, -3) : posTarget;
      const finalLook = (activeSection === "/" && started) ? new THREE.Vector3(0, 1.5, -15) : lookTarget;

      // During the very initial transition from Home to /athletes, we want a punchy fast speed
      const lerpSpeed = (activeSection === "/" && started) ? 0.06 : 0.04;
      
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

// Dynamic Imports wrapped in React.lazy above no longer need React.memo wrapping manually since lazy handles chunks

export default function GlobalCanvas() {
  const { started, activeSection } = useTourState();
  
  return (
    <div className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-[1.5s] ease-in-out ${started ? "opacity-100" : "opacity-0"}`}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig started={started} activeSection={activeSection} />
          <ElevatorScene started={started} />
          
          <Suspense fallback={null}>
            <group position={[0, -0.5, -25]}>
              <GalleryScene />
            </group>
          </Suspense>
          <Suspense fallback={null}>
            <group position={[120, -0.5, -25]}>
              <ServicesScene />
            </group>
          </Suspense>
          <Suspense fallback={null}>
            <group position={[240, -0.5, -25]}>
              <AboutScene />
            </group>
          </Suspense>
  
          <CursorSpotlight />
  
          <Suspense fallback={null}>
            <Environment preset="apartment" resolution={256} />
          </Suspense>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} color="#F8F4EC" castShadow />
        </Suspense>
      </Canvas>
    </div>
  );
}
