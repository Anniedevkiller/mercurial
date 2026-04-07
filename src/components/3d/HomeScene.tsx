"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tourStore, useTourState } from "@/lib/store";

export default function HomeScene() {
  const started = useTourState();

  const handleEnter = () => {
    tourStore.setStarted(true);
  };

  return (
    <div className="w-screen h-screen xl:w-full xl:h-full absolute inset-0 z-10 overflow-hidden flex items-center justify-center pointer-events-none">
      {/* Hero Content Overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 1.5, ease: "easeInOut" } }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none"
          >
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-yellow/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 mt-10 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[0.2em] xl:tracking-[0.3em] uppercase text-cream filter drop-shadow-2xl"
              >
                Mercurial
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-inter text-lg sm:text-2xl md:text-3xl tracking-[0.4em] font-light uppercase text-light-yellow"
                style={{ textShadow: "0 4px 20px rgba(193,154,107,0.3)" }}
              >
                Sports Imperial
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="font-playfair italic text-cream/70 text-lg sm:text-xl md:text-2xl tracking-wider mt-4"
              >
                Where champions become masterpieces
              </motion.p>
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              onClick={handleEnter}
              className="absolute bottom-24 pointer-events-auto px-10 py-5 border border-light-yellow/40 text-light-yellow font-inter uppercase tracking-[0.3em] text-sm sm:text-base hover:border-light-yellow transition-all duration-700 backdrop-blur-md bg-black/20 group animate-[pulse-slow_4s_infinite_ease-in-out] overflow-hidden rounded-sm flex items-center gap-4"
            >
              <div className="absolute inset-0 bg-light-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
              <span className="relative z-10 transition-transform group-hover:-translate-x-2 duration-500">Enter the Gallery</span>
              <ArrowRight className="w-5 h-5 relative z-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
