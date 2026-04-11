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
      {/* Luxury Cream Walls */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[100, 25]} />
        <meshStandardMaterial color="#F8F4EC" roughness={0.8} />
      </mesh>

      <mesh position={[0, -3.4, -7.9]}>
        <boxGeometry args={[100, 0.4, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>

      {/* Royal Blue Top Band */}
      <mesh position={[0, 10, -7.9]}>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#002366" />
      </mesh>

      {/* Premium Marble Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshPhysicalMaterial color="#FFF9F2" roughness={0.02} metalness={0.05} clearcoat={1} />
      </mesh>

      {/* Exhibition Panels */}
      <group position={[0, 1, -7.5]}>
        {services.map((svc, idx) => (
          <Float key={idx} speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[(idx - 2) * 8, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[6.2, 8.2, 0.2]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Inner Inset */}
              <mesh position={[0, 0, 0.05]}>
                <planeGeometry args={[5.8, 7.8]} />
                <meshStandardMaterial color="#F8F4EC" />
              </mesh>
              <Html position={[0, 0, 0.1]} center transform occlude zIndexRange={[10, 0]}>
                <div className="w-64 text-center select-none pointer-events-none p-10 bg-[#002366]/5 backdrop-blur-xl border border-accent-gold/20">
                  <span className="font-bebas text-[10px] tracking-[0.4em] text-[#D4AF37] mb-4 block">Service Offering</span>
                  <h3 className="font-playfair text-2xl text-[#0A1128] mb-6 uppercase tracking-tight font-black leading-tight border-b border-[#D4AF37]/30 pb-4">{svc.title}</h3>
                  <p className="font-inter text-[10px] text-[#0A1128]/60 leading-relaxed uppercase tracking-[0.2em]">{svc.desc}</p>
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
