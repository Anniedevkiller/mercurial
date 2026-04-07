"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Sparkles, OrbitControls, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function GalleryScene() {
  const globeRef = useRef<THREE.Group>(null);
  
  // Generate random coordinate nodes for the globe
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const phi = Math.acos(-1 + (2 * Math.random()));
      const theta = Math.sqrt(40 * Math.PI) * phi;
      const radius = 1.6;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ];
    });
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[0, -0.5, -4]}>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        autoRotate={false}
      />
      
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#FFD700" />

      {/* Floating Particles */}
      <Sparkles count={150} scale={10} size={1.5} speed={0.3} opacity={0.5} color="#0B192C" />

      {/* Background Environment Base */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#F5F5F5" roughness={1} />
      </mesh>

      {/* Main Interactive Globe */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={globeRef} position={[0, 1.5, 0]}>
          {/* Inner Solid Globe */}
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial color="#0B192C" roughness={0.7} metalness={0.2} />
          </mesh>
          
          {/* Outer Wireframe Globe */}
          <mesh scale={1.01}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#FFD700" wireframe transparent opacity={0.3} />
          </mesh>

          {/* Node Points representing Athletes/Locations */}
          {nodes.map((pos, idx) => (
            <mesh key={idx} position={[pos[0], pos[1], pos[2]]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#FFD700" />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
