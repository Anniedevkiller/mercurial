"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tourStore, useTourState } from "@/lib/store";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeScene() {
  const started = useTourState();
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlight1Ref = useRef<HTMLDivElement>(null);
  const spotlight2Ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    tourStore.setStarted(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(spotlight1Ref.current, {
        x: xPos * 1.5,
        y: yPos * 1.5,
        duration: 2,
        ease: "power2.out"
      });
      gsap.to(spotlight2Ref.current, {
        x: -xPos,
        y: -yPos,
        duration: 2.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center bg-transparent z-10 px-4 md:px-12 lg:px-24 overflow-hidden pointer-events-none">
      {/* Background Motion Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Spotlight Beams with mouse parallax */}
        <div ref={spotlight1Ref} className="absolute -top-1/2 -left-1/4 w-full h-[200%] bg-gradient-to-b from-accent-gold/15 to-transparent blur-[120px] origin-top opacity-60" />
        <div ref={spotlight2Ref} className="absolute -top-1/2 -right-1/4 w-full h-[200%] bg-gradient-to-b from-accent-blue/5 to-transparent blur-[150px] origin-top opacity-40" />

        {/* Floating Dust Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: 0 
              }}
              animate={{ 
                y: [null, "-40px", "40px"],
                opacity: [0, 0.4, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 7 + Math.random() * 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-accent-gold/20 rounded-full blur-[2px]"
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!started && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              y: -40,
              filter: "blur(10px)", 
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="relative flex flex-col items-center justify-center text-center w-full max-w-7xl pt-20"
          >
            <div className="flex flex-col items-center gap-12 md:gap-20 w-full">
              {/* Main Title Group */}
              <div className="space-y-0 text-shadow-lux">
                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ y: "110%", skewY: 5 }}
                    animate={{ y: 0, skewY: 0 }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-playfair text-[clamp(3.5rem,10vw,7.5rem)] text-foreground tracking-tighter"
                  >
                    Mercurial
                  </motion.h1>
                </div>
                <div className="overflow-hidden -mt-2 md:-mt-6">
                  <motion.h2 
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-playfair text-[clamp(1.2rem,3.5vw,2.8rem)] text-accent-blue tracking-[0.4em] md:tracking-[0.6em] font-medium"
                  >
                    Sports Imperial
                  </motion.h2>
                </div>
              </div>

              {/* Subheading with elegant line */}
              <div className="flex flex-col items-center gap-6 max-w-3xl">
                <motion.div 
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                   className="h-[1px] bg-accent-gold/30 w-24 md:w-40"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="font-playfair italic text-foreground/70 text-base md:text-2xl lg:text-3xl px-8"
                >
                  &quot;Where champions become masterpieces&quot;
                </motion.p>
              </div>

              {/* Action Area */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.8 }}
                className="pt-2 md:pt-4"
              >
                <button 
                  onClick={handleEnter}
                  className="pointer-events-auto group relative px-10 py-5 md:px-16 md:py-7 bg-accent-blue text-white overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,26,77,0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-4 font-bebas tracking-[0.3em] text-xs md:text-sm uppercase font-bold">
                    Enter the Gallery <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-accent-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]" />
                </button>
              </motion.div>
            </div>

            {/* Bottom Accent */}
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 3, delay: 0.5, ease: [0.87, 0, 0.13, 1] }}
               className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
