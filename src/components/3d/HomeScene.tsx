"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Info } from "lucide-react";
import { tourStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const previewCards = [
  { id: "athletes", title: "Masterpiece Athletes", icon: Star, desc: "Curating elite competitive legacies." },
  { id: "services", title: "Premium Services", icon: Shield, desc: "Bespoke strategy for world-class talent." },
  { id: "about", title: "The Imperial Way", icon: Info, desc: "Our philosophy of excellence." },
];

export default function HomeScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: e.clientX - 400,
          y: e.clientY - 400,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full">
      {/* Spotlight Backdrop */}
      <div 
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Brand & Editorial Input */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "expo.out" }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="font-bebas text-xs text-accent-gold uppercase block"
              >
                The Art of Performance
              </motion.span>
              <h1 className="text-foreground tracking-tighter leading-[0.85] uppercase">
                Mercurial <br/>
                <span className="text-accent-blue opacity-90 italic">Sports Imperial</span>
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="text-lg lg:text-2xl font-playfair italic max-w-lg leading-relaxed border-l-2 border-accent-gold/20 pl-8"
            >
              &quot;Where champions become masterpieces. Our agency transcends management—we curate the legacy of the world&apos;s sporting elite.&quot;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <button 
                onClick={() => tourStore.setStarted(true)}
                className="btn-premium group"
              >
                Enter the Gallery
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Framed Editorial Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: "expo.out" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="gold-frame w-[300px] h-[400px] md:w-[450px] md:h-[600px] animate-glimmer bg-accent-blue/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
              {/* This would be the 3D art piece or high-end image */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotateY: [0, 5, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-gold/10 flex items-center justify-center relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop" 
                  alt="Luxe Sports Portrait"
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-accent-blue/20 mix-blend-overlay pointer-events-none" />
              </motion.div>
            </div>
            
            {/* Background floating element */}
            <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-accent-gold/10 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </section>

      {/* Preview Cards Section */}
      <section className="section-padding bg-white/30 backdrop-blur-sm border-t border-accent-gold/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-4"
          >
            <h4 className="font-bebas text-xs tracking-[0.5em] text-accent-gold uppercase">Explore the Foundation</h4>
            <h2 className="text-accent-blue">The Imperial Collection</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {previewCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="card-gallery group p-12 space-y-8 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-accent-blue/5 border border-accent-gold/20 flex items-center justify-center text-accent-gold transition-colors group-hover:bg-accent-blue group-hover:text-white group-hover:border-transparent duration-500">
                  <card.icon size={24} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-accent-blue">{card.title}</h3>
                  <div className="w-12 h-[1px] bg-accent-gold mx-auto group-hover:w-20 transition-all duration-500" />
                  <p className="font-inter text-sm tracking-wide">{card.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-accent-gold font-bebas text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-bold underline">
                  Discover Now <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
