"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function ElevatorScene({ started }: { started: boolean }) {
  const group = useRef<THREE.Group>(null);
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const animStarted = useRef(false);

  const [skylinePoints] = useState(() => 
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 30 - 15,
      y: Math.random() * 10 - 5
    }))
  );

  useEffect(() => {
    if (started && !animStarted.current) {
      animStarted.current = true;
      
      // Sequence: Open doors -> Push camera -> Route push
      const tl = gsap.timeline({
        onComplete: () => {
          router.push("/athletes");
        }
      });

      tl.to(leftDoor.current!.position, { x: -2.5, duration: 2, ease: "power2.inOut" }, 0.5);
      tl.to(rightDoor.current!.position, { x: 2.5, duration: 2, ease: "power2.inOut" }, 0.5);
    }
  }, [started, router]);

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Front Doors - Nature Inspired (Light Wood/Beige) */}
      <mesh ref={leftDoor} position={[-1, 2, 0]}>
        <boxGeometry args={[2, 4.5, 0.1]} />
        <meshStandardMaterial color="#E8E4D9" metalness={0.1} roughness={0.5} />
      </mesh>
      <mesh ref={rightDoor} position={[1, 2, 0]}>
        <boxGeometry args={[2, 4.5, 0.1]} />
        <meshStandardMaterial color="#E8E4D9" metalness={0.1} roughness={0.5} />
      </mesh>

      {/* Frame Gold Trim */}
      <mesh position={[-2.05, 2, 0]}>
        <boxGeometry args={[0.1, 4.5, 0.2]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>
      <mesh position={[2.05, 2, 0]}>
        <boxGeometry args={[0.1, 4.5, 0.2]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>
      <mesh position={[0, 4.25, 0]}>
        <boxGeometry args={[4.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>

      {/* Glass Wall (Left) */}
      <mesh position={[-2.5, 2, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 4.5]} />
        <meshPhysicalMaterial transparent opacity={0.3} transmission={0.9} thickness={0.5} roughness={0.1} color="#ffffff" />
      </mesh>

      {/* Moving Skyline Background (Behind Glass) */}
      <group position={[-15, 2, -10]} rotation={[0, Math.PI / 2, 0]}>
         <mesh>
           <planeGeometry args={[40, 20]} />
           <meshBasicMaterial color="#E0F2FE" />
         </mesh>
         {/* Simple Light Blobs for "City" lights in nature mode */}
         <group position={[0, 0, 0.1]}>
           {skylinePoints.map((point, i) => (
             <mesh key={i} position={[point.x, point.y, 0]}>
               <sphereGeometry args={[0.1, 8, 8]} />
               <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
             </mesh>
           ))}
         </group>
      </group>

      {/* Floor - Light Marble */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -2.5]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#F5F5F1" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Interior Walls */}
      <mesh position={[2.5, 2, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5, 4.5]} />
        <meshStandardMaterial color="#E8E4D9" />
      </mesh>
      <mesh position={[0, 2, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[5, 4.5]} />
        <meshStandardMaterial color="#E8E4D9" />
      </mesh>
    </group>
  );
}
