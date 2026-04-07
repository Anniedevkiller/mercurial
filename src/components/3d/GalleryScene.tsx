"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Sparkles, Text, Float, Html } from "@react-three/drei";

export default function GalleryScene() {
  const galleryRef = useRef<THREE.Group>(null);

  return (
    <group ref={galleryRef} position={[0, -0.5, -5]}>
      {/* Warm Spotlight Lighting */}
      <spotLight position={[0, 5, 0]} angle={0.8} penumbra={1} intensity={20} color="#FCEBCC" castShadow />
      <ambientLight intensity={0.2} color="#0A1128" />

      {/* Floating Particles */}
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.3} color="#D4AF37" />

      {/* Background gallery walls */}
      <mesh position={[0, 3, -4]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0b0f1a" roughness={0.8} />
      </mesh>
      
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#030303" roughness={0.1} metalness={0.5} />
      </mesh>
      
      {/* Rhodes Piano Placeholder (Abstract representation) */}
      <group position={[0, 0.8, -1]} castShadow>
        {/* Main Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.4, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Keyboard area */}
        <mesh position={[0, 0.1, 0.2]}>
          <boxGeometry args={[2, 0.1, 0.3]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.9, -0.5, 0]}>
           <cylinderGeometry args={[0.05, 0.02, 1]} />
           <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>
        <mesh position={[0.9, -0.5, 0]}>
           <cylinderGeometry args={[0.05, 0.02, 1]} />
           <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>

        {/* Chrome Microphone abstract */}
        <mesh position={[0, 0.5, 0]}>
           <cylinderGeometry args={[0.02, 0.02, 0.6]} />
           <meshStandardMaterial color="#cccccc" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
           <sphereGeometry args={[0.08]} />
           <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} wireframe />
        </mesh>
      </group>
      
      {/* Interactive Candle Installation */}
      <group 
        position={[2.5, 0.4, -2]} 
        onClick={() => window.open("https://instagram.com", "_blank")} 
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      >
        {/* Plinth */}
        <mesh position={[0, -0.2, 0]}>
           <boxGeometry args={[0.6, 0.4, 0.6]} />
           <meshStandardMaterial color="#0A1128" />
        </mesh>
        {/* Candle */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.2]} />
          <meshStandardMaterial color="#FFFDE7" roughness={0.8} />
        </mesh>
        {/* Flame */}
        <Float speed={5} rotationIntensity={0.2}>
          <mesh position={[0, 0.25, 0]}>
            <coneGeometry args={[0.03, 0.1]} />
            <meshStandardMaterial color="#FF9800" emissive="#FF9800" emissiveIntensity={4} />
          </mesh>
        </Float>
        
        <Html position={[0, 0.5, 0]} center>
          <div className="bg-dark/80 text-ivory text-xs px-3 py-1.5 rounded border border-gold/40 shadow-lg whitespace-nowrap cursor-pointer transition-transform hover:scale-105 pointer-events-auto">
            <span className="font-playfair text-gold block text-sm">"Ma Lueur"</span>
            <span className="font-inter tracking-wide opacity-80 text-[10px]">Mellow Music by Kaowther</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
