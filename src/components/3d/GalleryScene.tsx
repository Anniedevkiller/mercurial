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
        THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0.8, 0.1);
      } else {
        THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
        THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Heavy Luxury Gold Frame */}
      <mesh position={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[4.4, 5.4, 0.3]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Inner Profile Bevel */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[4.1, 5.1, 0.1]} />
        <meshStandardMaterial color="#B8860B" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[3.8, 4.8]} />
        <meshStandardMaterial color="#F8F4EC" roughness={1} />
      </mesh>

      <Image 
        url={athlete.img} 
        position={[0, 0, 0.11]} 
        scale={[3.6, 4.6]} 
        zoom={hovered ? 1.05 : 1}
        grayscale={hovered ? 0 : 0.5}
        transparent
      />

      {/* Decorative Gold Corners or Lines */}
      <mesh position={[1.9, 2.4, 0.16]}>
        <boxGeometry args={[0.3, 0.02, 0.05]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {hovered && (
        <Html position={[0, -3.5, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-[#F8F4EC] border-2 border-[#D4AF37] p-8 w-96 shadow-[0_30px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-700">
            <div className="flex flex-col items-center text-center">
              <span className="font-bebas text-xs tracking-[0.5em] text-[#D4AF37] mb-2 uppercase">Champion Profile</span>
              <h3 className="font-playfair text-3xl text-[#0A1128] mb-2 uppercase tracking-tight font-black">{athlete.name}</h3>
              <div className="w-16 h-[1px] bg-[#D4AF37] mb-6" />
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="text-left">
                  <p className="font-bebas text-[10px] tracking-widest text-[#002366] mb-1 uppercase">Discipline</p>
                  <p className="font-inter text-sm font-bold text-[#0A1128] uppercase">{athlete.sport}</p>
                </div>
                <div className="text-right">
                  <p className="font-bebas text-[10px] tracking-widest text-[#002366] mb-1 uppercase">Accolades</p>
                  <p className="font-inter text-sm font-bold text-[#0A1128] uppercase">{athlete.stats}</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 w-full font-playfair italic text-foreground/40 text-xs">
                &quot;{athlete.rep}&quot;
              </div>
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 10, 5]} intensity={0.8} color="#FFF9F2" />

      {/* Luxury Cream Walls with Royal Blue Accent Panel */}
      <group position={[0, 5, -10]}>
        <mesh receiveShadow>
          <planeGeometry args={[100, 25]} />
          <meshStandardMaterial color="#F8F4EC" roughness={0.8} />
        </mesh>
        {/* Royal Blue Top Panel */}
        <mesh position={[0, 11, 0.1]}>
          <planeGeometry args={[100, 4]} />
          <meshStandardMaterial color="#002366" metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Mustard Gold Trim */}
        <mesh position={[0, 9, 0.2]}>
          <boxGeometry args={[100, 0.3, 0.1]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>
      </group>
      
      {/* Floor Molding - Gold */}
      <mesh position={[0, -3.4, -9.9]}>
        <boxGeometry args={[100, 0.4, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} />
      </mesh>

      {/* Premium Marble Floor */}
      <mesh position={[0, -3.5, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 60]} />
        <meshPhysicalMaterial 
          color="#FFF9F2" 
          roughness={0.02} 
          metalness={0.05} 
          clearcoat={1} 
          reflectivity={1}
        />
      </mesh>

      <group position={[0, 1, -2]}>
        {athletes.map((athlete, idx) => (
          <group key={athlete.id} position={[(idx - 1.5) * 6.5, 0, -Math.abs(idx - 1.5) * 1.5]} rotation={[0, (idx - 1.5) * -0.15, 0]}>
            <PortraitFrame athlete={athlete} position={[0, 0, 0]} />
          </group>
        ))}
      </group>
      
      <Sparkles count={250} scale={40} size={2} speed={0.5} opacity={0.4} color="#C5A059" />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#FFFFFF" />
    </group>
  );
}
