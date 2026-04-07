"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function ElevatorScene({ started }: { started?: boolean }) {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const elevatorGroupRef = useRef<THREE.Group>(null);
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const lightsData = useMemo(() => Array.from({ length: 80 }).map(() => ({
     x: (Math.random() - 0.5) * 2,
     y: (Math.random() - 0.5) * 20,
     z: (Math.random() - 0.5) * 10,
     h: 0.2 + Math.random(),
     intensity: Math.random() * 2 + 1
  })), []);

  // Skyline motion
  const skylineGroupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (skylineGroupRef.current && started && !opened) {
      // Simulate elevator vertical move by moving the skyline down slowly
      skylineGroupRef.current.position.y -= 0.01;
    }
  });

  useEffect(() => {
    if (!started) return;

    // Delay slightly to simulate 'descending' or 'ascending' before opening
    const timer = setTimeout(() => {
      setOpened(true);
      if (leftDoorRef.current && rightDoorRef.current) {
        gsap.to(leftDoorRef.current.position, {
          x: -1.5,
          duration: 3,
          ease: "power2.inOut",
        });
        gsap.to(rightDoorRef.current.position, {
          x: 1.5,
          duration: 3,
          ease: "power2.inOut",
        });
      }
      
      // Move elevator forward a bit or move the camera to enter the gallery
      if (elevatorGroupRef.current) {
         gsap.to(elevatorGroupRef.current.position, {
           z: 4,
           duration: 4,
           ease: "power1.inOut",
           onComplete: () => {
             // Upon reaching destination, push to gallery page
             router.push('/athletes');
           }
         });
         gsap.to(elevatorGroupRef.current.scale, {
           x: 1.1,
           y: 1.1,
           duration: 4,
         });
      }
    }, 2000); // 2 second ride

    return () => clearTimeout(timer);
  }, [started, router]);

  return (
    <group ref={elevatorGroupRef} position={[0, 0, 3]}>
      {/* Elevator Interior Walls */}
      {/* Left Wall - Transparent Glass showing skyline */}
      <mesh position={[-2, 1.5, 1]} rotation={[0, Math.PI / 2, 0]}>
         <planeGeometry args={[5, 5]} />
         <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            transparent 
            roughness={0.1} 
            ior={1.5}
            thickness={0.5}
         />
      </mesh>
      
      {/* City lights behind glass */}
      <group position={[-3, 0, 1]} ref={skylineGroupRef}>
        {lightsData.map((data, i) => (
          <mesh 
            key={i} 
            position={[data.x, data.y, data.z]}
          >
            <boxGeometry args={[0.05, data.h, 0.05]} />
            <meshStandardMaterial color="#C19A6B" emissive="#C19A6B" emissiveIntensity={data.intensity} />
          </mesh>
        ))}
      </group>

      {/* Right Wall - Solid Metallic/Cream */}
      <mesh position={[2, 1.5, 1]} rotation={[0, -Math.PI / 2, 0]}>
         <planeGeometry args={[5, 5]} />
         <meshStandardMaterial color="#FDFBF7" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Back Wall - Solid Metallic/Cream */}
      <mesh position={[0, 1.5, 3]} rotation={[0, Math.PI, 0]}>
         <planeGeometry args={[4, 5]} />
         <meshStandardMaterial color="#040A18" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Doors (In front of user, parting to reveal gallery) */}
      <mesh ref={leftDoorRef} position={[-0.75, 1.5, -0.5]}>
        <boxGeometry args={[1.5, 3.5, 0.05]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.9} roughness={0.2} />
      </mesh>
      
      <mesh ref={rightDoorRef} position={[0.75, 1.5, -0.5]}>
        <boxGeometry args={[1.5, 3.5, 0.05]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.25, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#020408" metalness={0.9} roughness={0.5} />
      </mesh>
      {/* Small lift spotlight */}
      <spotLight position={[0, 3, 1]} intensity={0.5} color="#C19A6B" angle={0.8} penumbra={1} castShadow />

      {/* Floor */}
      <mesh position={[0, -0.25, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#020408" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}
