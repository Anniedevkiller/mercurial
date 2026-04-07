"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ElevatorScene({ started }: { started?: boolean }) {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const elevatorGroupRef = useRef<THREE.Group>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!started) return;

    // Delay slightly, then open doors
    const timer = setTimeout(() => {
      setOpened(true);
      if (leftDoorRef.current && rightDoorRef.current) {
        gsap.to(leftDoorRef.current.position, {
          x: -2.5,
          duration: 3,
          ease: "power2.inOut",
        });
        gsap.to(rightDoorRef.current.position, {
          x: 2.5,
          duration: 3,
          ease: "power2.inOut",
        });
      }
      
      // Move elevator forward a bit or move the camera
      if (elevatorGroupRef.current) {
         gsap.to(elevatorGroupRef.current.position, {
           z: 2,
           duration: 4,
           ease: "power1.inOut"
         });
         gsap.to(elevatorGroupRef.current.scale, {
           x: 1.2,
           y: 1.2,
           duration: 4,
         });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [started]);

  return (
    <group ref={elevatorGroupRef} position={[0, 0, 3]}>
      {/* Elevator Interior Walls (Left & Right inside) */}
      <mesh position={[-2, 1.5, 1]} rotation={[0, Math.PI / 2, 0]}>
         <planeGeometry args={[4, 5]} />
         <meshStandardMaterial color="#0A1128" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2, 1.5, 1]} rotation={[0, -Math.PI / 2, 0]}>
         <planeGeometry args={[4, 5]} />
         <meshStandardMaterial color="#0A1128" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Skyline glass view (Behind user initially) */}
      <mesh position={[0, 1.5, 3]} rotation={[0, Math.PI, 0]}>
         <planeGeometry args={[4, 5]} />
         <meshStandardMaterial color="#050505" opacity={0.6} transparent />
      </mesh>
      {/* City lights behind glass */}
      <group position={[0, 1.5, 4]}>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 5
            ]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* Doors (In front of user, parting to reveal gallery) */}
      <mesh ref={leftDoorRef} position={[-0.75, 1.5, -0.5]}>
        <boxGeometry args={[1.5, 3.5, 0.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      
      <mesh ref={rightDoorRef} position={[0.75, 1.5, -0.5]}>
        <boxGeometry args={[1.5, 3.5, 0.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -0.25, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}
