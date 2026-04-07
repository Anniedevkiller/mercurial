"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import ElevatorScene from "./ElevatorScene";
import { Environment, Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "@react-three/drei";

export default function HomeScene() {
  const [started, setStarted] = useState(false);

  const handleEnter = () => {
    setStarted(true);
  };

  return (
    <div className="w-screen h-screen xl:w-full xl:h-full absolute inset-0 z-0 bg-background overflow-hidden flex items-center justify-center">
      
      {/* 3D Background & Elevator */}
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <ElevatorScene started={started} />
          {/* Subtle moving particles in the lobby */}
          {!started && <Sparkles count={300} scale={12} size={1.5} speed={0.4} opacity={0.6} color="#C19A6B" />}
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={2} color="#FDFBF7" />
          <spotLight position={[0, 4, 3]} intensity={4} angle={0.5} penumbra={1} color="#C19A6B" />
          <Preload all />
        </Suspense>
      </Canvas>

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
            <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/80 via-transparent to-black/95 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-yellow/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 mt-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase text-cream filter drop-shadow-2xl"
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
                className="font-playfair italic text-cream/70 text-lg sm:text-xl tracking-wider mt-4"
              >
                Where champions become masterpieces
              </motion.p>
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              onClick={handleEnter}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(193,154,107,0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="absolute bottom-32 pointer-events-auto px-8 py-4 border border-light-yellow/40 text-light-yellow font-inter uppercase tracking-[0.3em] text-sm sm:text-base hover:border-light-yellow transition-all duration-700 backdrop-blur-md bg-black/20 group"
            >
              Enter the Gallery
              <div className="absolute inset-0 bg-light-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md pointer-events-none" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
