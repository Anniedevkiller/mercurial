import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

export default function AboutScene() {
  const target = new THREE.Object3D();
  target.position.set(0, 0, 0);

  return (
    <group>
      <primitive object={target} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0A0A0E" roughness={0.1} metalness={0.85} />
      </mesh>
      <mesh position={[0, 4, -8]}>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial color="#020204" />
      </mesh>
      <spotLight position={[0, 10, 6]} angle={1.1} penumbra={1} intensity={5} color="#C19A6B" target={target} />
      <Sparkles count={200} scale={15} size={2} speed={0.2} opacity={0.5} color="#C19A6B" position={[0, 3, 0]} />
    </group>
  );
}
