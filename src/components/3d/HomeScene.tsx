"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { tourStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function HomeScene() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    <div className="w-full px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
      {/* Background Ambience */}
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Brand & Editorial (3/5) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-3 space-y-12"
        >
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="font-bebas text-[11px] text-accent-gold uppercase block tracking-[0.6em] font-bold"
            >
              The Art of Performance
            </motion.span>
            <h1 className="text-foreground tracking-tight leading-[0.9] uppercase flex flex-col">
              <span className="block">Mercurial</span>
              <span className="text-accent-blue italic opacity-95">Sports Imperial</span>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg lg:text-2xl font-playfair italic max-w-xl leading-relaxed border-l-[1px] border-accent-gold/30 pl-10"
          >
            &quot;Where champions become masterpieces. Our agency transcends management—we curate the legacy of the elite.&quot;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              onClick={() => {
                tourStore.setStarted(true);
              }}
              className="group relative inline-flex items-center gap-6 px-10 py-5 bg-[#FBF9F4] border border-accent-gold rounded-full text-accent-blue font-playfair uppercase tracking-[0.2em] text-xs font-bold transition-all duration-700 hover:shadow-[0_20px_40px_rgba(197,160,89,0.25)] hover:-translate-y-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter the Gallery
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-accent-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Luxury Visual Panel (2/5) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="lg:col-span-2 relative hidden lg:flex justify-center"
        >
          <div className="relative w-full aspect-[4/5] max-w-[400px]">
            <div className="absolute inset-0 royal-blue-wall rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="gold-decor top-8 left-8 right-8 bottom-8 border-accent-gold/20" />
              <div className="gold-decor top-4 left-4 right-4 bottom-4 border-accent-gold/10" />
              
              <div className="absolute inset-16 flex items-center justify-center">
                <div className="relative w-full h-full border-[10px] border-[#FBF9F4] shadow-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" 
                    alt="Luxe Sports Portrait"
                    fill
                    className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-accent-blue/40 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
