import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

const services = [
  { title: "Athlete Representation", desc: "Managing careers, contracts, and long-term growth" },
  { title: "Contract Negotiation", desc: "Securing elite deals and maximizing athlete value" },
  { title: "Sponsorship & Partnerships", desc: "Connecting athletes with premium global brands" },
  { title: "Media & Branding", desc: "Building public image and storytelling presence" },
  { title: "Career Legacy Strategy", desc: "Positioning athletes for long-term influence" },
];

export default function ServicesScene() {
  const target = new THREE.Object3D();
  target.position.set(0, 0, 0);

  return (
    <group>
      <primitive object={target} />
      
      {/* Cream Exhibition Wall */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>

      {/* Gold Trim */}
      <mesh position={[0, -3.4, -7.9]}>
        <boxGeometry args={[100, 0.2, 0.1]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshStandardMaterial color="#0A0A0E" roughness={0.05} metalness={0.9} />
      </mesh>

      {/* Exhibition Panels */}
      <group position={[0, 1, -7.5]}>
        {services.map((svc, idx) => (
          <Float key={idx} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[(idx - 2) * 8, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[6, 8, 0.1]} />
                <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[5.6, 7.6]} />
                <meshStandardMaterial color="#05050A" />
              </mesh>
              <Html position={[0, 0, 0.1]} center transform occlude zIndexRange={[10, 0]}>
                <div className="w-64 text-center select-none pointer-events-none p-4">
                  <h3 className="font-playfair text-xl text-light-yellow mb-2 uppercase tracking-widest">{svc.title}</h3>
                  <div className="w-12 h-px bg-light-yellow/30 mx-auto mb-4" />
                  <p className="font-inter text-xs text-cream/70 leading-relaxed uppercase tracking-[0.2em]">{svc.desc}</p>
                </div>
              </Html>
            </group>
          </Float>
        ))}
      </group>

      <spotLight position={[-4, 8, 4]} angle={0.8} penumbra={1} intensity={6} color="#C19A6B" target={target} />
      <spotLight position={[4, 8, 4]} angle={0.8} penumbra={1} intensity={4} color="#FDFBF7" target={target} />
    </group>
  );
}
