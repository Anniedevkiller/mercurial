"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function ElevatorScene({ started }: { started: boolean }) {
  const group = useRef<THREE.Group>(null);
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);
  const backLeftDoor = useRef<THREE.Mesh>(null);
  const backRightDoor = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const animStarted = useRef(false);

  useEffect(() => {
    if (started && !animStarted.current) {
      animStarted.current = true;
      
      // Extended cinematic sequence
      const tl = gsap.timeline({
        onComplete: () => {
          router.push("/athletes");
        }
      });

      // 1. Initial breathing/float effect
      tl.to(group.current!.position, { y: -0.4, duration: 2.5, ease: "sine.inOut" });

      // 2. Front doors open with a premium weight
      tl.to(leftDoor.current!.position, { x: -2.2, duration: 2, ease: "power2.inOut" }, 1);
      tl.to(rightDoor.current!.position, { x: 2.2, duration: 2, ease: "power2.inOut" }, 1);

      // 3. User camera enters - using "expo" for a smooth start and slow end
      tl.to(group.current!.position, { z: 4.5, duration: 4, ease: "expo.inOut" }, 1.5);

      // 4. Back doors reveal transition with a subtle bounce
      tl.to(backLeftDoor.current!.position, { x: -2.3, duration: 2.5, ease: "power4.inOut" }, 4.5);
      tl.to(backRightDoor.current!.position, { x: 2.3, duration: 2.5, ease: "power4.inOut" }, 4.5);
    }
  }, [started, router]);

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Elevator Interior Walls - Soft Cream */}
      <mesh position={[2.5, 2, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5, 4.5]} />
        <meshStandardMaterial color="#FFF9F2" roughness={0.3} metalness={0.05} />
      </mesh>
      
      {/* Royal Blue Accent Panel (Right Wall) */}
      <mesh position={[2.48, 2, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#002366" metalness={0.4} roughness={0.2} />
      </mesh>

      {/* Front Doors (Mustard Gold) */}
      <mesh ref={leftDoor} position={[-1, 2, 0]}>
        <boxGeometry args={[2.1, 4.5, 0.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh ref={rightDoor} position={[1, 2, 0]}>
        <boxGeometry args={[2.1, 4.5, 0.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Glass Wall (Left) - "Luxury Glass View" */}
      <mesh position={[-2.5, 2, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 4.5]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0.05} 
          metalness={0.1}
          color="#E0F2FE" 
        />
      </mesh>

      {/* Skyline View behind the glass */}
      <mesh position={[-3, 2, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshBasicMaterial color="#0A1128" /> {/* Night sky base */}
        <pointLight position={[0, 2, 2]} intensity={2} color="#D4AF37" />
      </mesh>
      {/* City Lights (Simple representaiton) */}
      <Sparkles count={50} position={[-2.9, 2, -2.5]} scale={[0.1, 5, 5]} size={2} color="#D4AF37" />

      {/* Chrome Trim / Reflections */}
      <mesh position={[-2.45, 2, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.05, 4.5, 0.1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>

      {/* Back Exit Doors (Leading to Gallery) */}
      <group position={[0, 0, -5]}>
        <mesh ref={backLeftDoor} position={[-1, 2.25, 0]}>
          <boxGeometry args={[2.1, 4.5, 0.1]} />
          <meshStandardMaterial color="#002366" /> {/* Deep Royal Blue */}
        </mesh>
        <mesh ref={backRightDoor} position={[1, 2.25, 0]}>
          <boxGeometry args={[2.1, 4.5, 0.1]} />
          <meshStandardMaterial color="#002366" />
        </mesh>
        {/* Gallery Entrance Frame - Gold */}
        <mesh position={[0, 4.5, 0.05]}>
          <boxGeometry args={[4.5, 0.2, 0.2]} />
          <meshStandardMaterial color="#D4AF37" />
        </mesh>
      </group>

      {/* Floor - Premium Marble Cream */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#F5EFE6" roughness={0.05} metalness={0.1} />
      </mesh>

      {/* Interior Lighting - Elegant Glow */}
      <pointLight position={[0, 3.5, -2.5]} intensity={15} color="#D4AF37" decay={2} />
      <rectAreaLight position={[0, 4.4, -2.5]} args={[4, 4]} intensity={5} color="#FFFFFF" rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}
