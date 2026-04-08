"use client";

import { Float, Text } from "@react-three/drei";

export default function AboutScene() {
  return (
    <group>
      {/* Cream Hall */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.5} />
      </mesh>

      {/* Floating Brand Monument */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 1, -6]}>
          <Text
            font="/fonts/PlayfairDisplay-Bold.ttf"
            fontSize={0.8}
            color="#1A1A1A"
            maxWidth={15}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            WHERE SPORT MEETS CULTURE
          </Text>
          
          <mesh position={[0, -1.2, -0.1]}>
            <boxGeometry args={[10, 0.05, 0.2]} />
            <meshStandardMaterial color="#C19A6B" />
          </mesh>
        </group>
      </Float>

      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={6} color="#ffffff" castShadow />
    </group>
  );
}
