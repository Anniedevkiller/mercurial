"use client";

import { Float, Text } from "@react-three/drei";

export default function AboutScene() {
  return (
    <group>
      {/* Luxury Hall */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#F8F4EC" roughness={0.8} />
      </mesh>

      <mesh position={[0, -3.4, -7.9]}>
        <boxGeometry args={[100, 0.4, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshPhysicalMaterial color="#FFF9F2" roughness={0.02} metalness={0.05} clearcoat={1} />
      </mesh>

      {/* Floating Brand Monument */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 1, -6]}>
          <Text
            fontSize={0.9}
            color="#0A1128"
            maxWidth={15}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.2}
          >
            WHERE CHAMPIONS BECOME MASTERPIECES
          </Text>
          
          <mesh position={[0, -1.5, -0.1]}>
            <boxGeometry args={[12, 0.1, 0.2]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} />
          </mesh>
        </group>
      </Float>

      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={6} color="#ffffff" castShadow />
    </group>
  );
}
