"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Html, Image, useCursor, SpotLight } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const athletes = [
  { id: 1, name: "Marcus 'The Flash' Thorne", sport: "Basketball", stats: "28.5 PPG / 5 MVP", rep: "Exclusive Brand", img: "/athletes/athlete_1.jpg" },
  { id: 2, name: "Elena Silva", sport: "Tennis", stats: "12 Grand Slams", rep: "Global Image", img: "/athletes/athlete_2.jpg" },
  { id: 3, name: "Julian Rossi", sport: "Formula 1", stats: "4x World Champion", rep: "Team Negotiations", img: "/athletes/athlete_3.jpg" },
  { id: 4, name: "Sarah Jenkins", sport: "Track & Field", stats: "Olympic Gold Medalist", rep: "Commercial Strategy", img: "/athletes/athlete_4.jpg" },
];

function PortraitFrame({ athlete, position }: { athlete: typeof athletes[0], position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, "pointer", "auto");
  
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      if (hovered) {
        // Tilt towards mouse
        THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.5, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0.5, 0.1);
      } else {
        // Reset
        THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Gold Frame Outer */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[4.2, 5.2, 0.2]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gold Frame Inner Mat (Cream) */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[3.8, 4.8]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>

      {/* Portrait Image */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image 
        url={athlete.img} 
        position={[0, 0, 0.06]} 
        scale={[3.4, 4.4]} 
        zoom={hovered ? 1.1 : 1}
        grayscale={hovered ? 0.2 : 1} 
        transparent
      />

      {/* Frame Glass */}
      <mesh position={[0, 0, 0.1]} castShadow>
        <planeGeometry args={[4, 5]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.1} transmission={0.9} thickness={0.5} transparent opacity={0.3} />
      </mesh>

      {hovered && (
        <Html position={[0, -3.2, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-dark-blue/95 border border-light-yellow border-t-4 border-t-light-yellow px-8 py-6 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-playfair text-2xl text-cream mb-2 tracking-wide uppercase">{athlete.name}</h3>
            <p className="font-bebas text-xl text-light-yellow tracking-widest mb-4 opacity-90">{athlete.sport}</p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-light-yellow/50 to-transparent mb-4" />
            <div className="space-y-3 font-inter text-sm">
              <p className="text-cream/90 flex justify-between">
                <span className="text-light-yellow/70 uppercase text-xs tracking-widest">Achv Target</span> 
                <span className="font-medium">{athlete.stats}</span>
              </p>
              <p className="text-cream/90 flex justify-between">
                <span className="text-light-yellow/70 uppercase text-xs tracking-widest">Focus Level</span> 
                <span className="font-medium text-right">{athlete.rep}</span>
              </p>
            </div>
          </div>
        </Html>
      )}
      
      {/* Individual Spotlight for the frame */}
      <SpotLight position={[0, 5, 4]} angle={0.5} penumbra={0.8} intensity={hovered ? 4 : 2} color={hovered ? "#ffffff" : "#C19A6B"} distance={12} castShadow />
    </group>
  );
}

export default function GalleryScene() {
  
  return (
    <group position={[0, -0.5, 0]}>
      <ambientLight intensity={0.4} color="#FDFBF7" />
      <directionalLight position={[0, 10, 5]} intensity={0.8} color="#C19A6B" castShadow />

      {/* Floating dust particles */}
      <Sparkles count={400} scale={30} size={2} speed={0.2} opacity={0.3} color="#C19A6B" />

      {/* Museum Room Walls - Deep Royal Blue / Dark Navy */}
      <mesh position={[0, 5, -5]} receiveShadow>
        <planeGeometry args={[60, 20]} />
        <meshStandardMaterial color="#020408" roughness={0.8} />
      </mesh>

      {/* Gallery Floor - Cream/Black with Reflections */}
      <mesh position={[0, -3.5, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 30]} />
        <meshPhysicalMaterial 
          color="#040A18" 
          roughness={0.1} 
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <group position={[0, 1, -2]}>
        {athletes.map((athlete, idx) => {
          // Spread along X
          const xPos = (idx - 1.5) * 5.5; 
          const zPos = Math.abs(idx - 1.5) * 0.5; // Slight arc backward at edges
          const yRot = (idx - 1.5) * -0.05; // very slight rotation inward
          return (
            <group key={athlete.id} position={[xPos, 0, -zPos]} rotation={[0, yRot, 0]}>
              <PortraitFrame athlete={athlete} position={[0, 0, 0]} />
            </group>
          );
        })}
      </group>
    </group>
  );
}
