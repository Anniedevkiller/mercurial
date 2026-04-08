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
        THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.4, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.4, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0.5, 0.1);
      } else {
        THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Gold Frame */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[4.2, 5.2, 0.2]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[3.8, 4.8]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>

      <Image 
        url={athlete.img} 
        alt={athlete.name}
        position={[0, 0, 0.06]} 
        scale={[3.4, 4.4]} 
        zoom={hovered ? 1.1 : 1}
        grayscale={hovered ? 0 : 1} 
        transparent
      />

      {hovered && (
        <Html position={[0, -3.2, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-white/95 border-l-4 border-l-accent p-6 w-80 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-r-lg">
            <h3 className="font-playfair text-2xl text-foreground mb-1 tracking-wide uppercase">{athlete.name}</h3>
            <p className="font-inter text-xs text-foreground/40 tracking-widest mb-4 uppercase">{athlete.sport}</p>
            <div className="space-y-2 font-inter text-sm border-t border-foreground/5 pt-4">
              <p className="text-foreground/70 flex justify-between uppercase text-[10px] tracking-thinner">
                <span>Achievement</span> 
                <span className="font-medium text-foreground">{athlete.stats}</span>
              </p>
            </div>
          </div>
        </Html>
      )}
      
      <SpotLight position={[0, 5, 4]} angle={0.5} penumbra={0.8} intensity={hovered ? 4 : 2} color="#ffffff" distance={12} castShadow />
    </group>
  );
}

export default function GalleryScene() {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#ffffff" />

      {/* Cream Walls */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, -3.4, -7.9]}>
        <boxGeometry args={[100, 0.2, 0.1]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>

      {/* Light Marble Floor */}
      <mesh position={[0, -3.5, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 40]} />
        <meshPhysicalMaterial color="#E8E4D9" roughness={0.05} metalness={0.1} clearcoat={1} />
      </mesh>

      <group position={[0, 1, -2]}>
        {athletes.map((athlete, idx) => (
          <group key={athlete.id} position={[(idx - 1.5) * 5.5, 0, -Math.abs(idx - 1.5) * 0.5]} rotation={[0, (idx - 1.5) * -0.05, 0]}>
            <PortraitFrame athlete={athlete} position={[0, 0, 0]} />
          </group>
        ))}
      </group>
      
      <Sparkles count={200} scale={30} size={2} speed={0.1} opacity={0.4} color="#C19A6B" />
    </group>
  );
}
