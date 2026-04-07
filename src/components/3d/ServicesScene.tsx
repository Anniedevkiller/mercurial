import { SpotLight } from "@react-three/drei";
import * as THREE from "three";

export default function ServicesScene() {
  const target = new THREE.Object3D();
  target.position.set(0, 0, 0);

  return (
    <group>
      <primitive object={target} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0A0A0E" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[0, 4, -8]}>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial color="#05050A" />
      </mesh>
      <spotLight position={[-4, 8, 4]} angle={0.8} penumbra={1} intensity={6} color="#C19A6B" target={target} />
      <spotLight position={[4, 8, 4]} angle={0.8} penumbra={1} intensity={4} color="#FDFBF7" target={target} />
    </group>
  );
}
