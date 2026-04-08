"use client";

import { Html, Float } from "@react-three/drei";

const services = [
  { title: "Athlete Representation", desc: "Managing careers, contracts, and long-term growth" },
  { title: "Contract Negotiation", desc: "Securing elite deals and maximizing athlete value" },
  { title: "Sponsorship & Partnerships", desc: "Connecting athletes with premium global brands" },
  { title: "Media & Branding", desc: "Building public image and storytelling presence" },
  { title: "Career Legacy Strategy", desc: "Positioning athletes for long-term influence" },
];

export default function ServicesScene() {
  return (
    <group>
      {/* Cream Walls */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
      </mesh>

      <mesh position={[0, -3.4, -7.9]}>
        <boxGeometry args={[100, 0.2, 0.1]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>

      {/* Light Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.5} />
      </mesh>

      {/* Exhibition Panels */}
      <group position={[0, 1, -7.5]}>
        {services.map((svc, idx) => (
          <Float key={idx} speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[(idx - 2) * 8, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[6, 8, 0.1]} />
                <meshStandardMaterial color="#ffffff" metalness={0.05} roughness={0.1} />
              </mesh>
              <Html position={[0, 0, 0.1]} center transform occlude zIndexRange={[10, 0]}>
                <div className="w-64 text-center select-none pointer-events-none p-6 bg-white/10 backdrop-blur-sm border border-foreground/5 rounded-xl">
                  <h3 className="font-playfair text-xl text-foreground mb-4 uppercase tracking-[0.2em] font-semibold">{svc.title}</h3>
                  <p className="font-inter text-[10px] text-foreground/40 leading-relaxed uppercase tracking-widest">{svc.desc}</p>
                </div>
              </Html>
            </group>
          </Float>
        ))}
      </group>

      <spotLight position={[-10, 15, 10]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" castShadow />
      <spotLight position={[10, 15, 10]} angle={0.5} penumbra={1} intensity={3} color="#C19A6B" />
    </group>
  );
}
