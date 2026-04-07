"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GalleryScene from "@/components/3d/GalleryScene";
import { Environment, Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function AthletesPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
      {/* 3D Museum Canvas */}
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <GalleryScene />
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Title Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-28 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4"
      >
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-cream mb-2 uppercase tracking-[0.3em] filter drop-shadow-lg">
          Our Roster
        </h1>
        <p className="font-inter text-light-yellow/80 tracking-widest text-sm uppercase blur-[0.5px]">
          The Museum of Greatness
        </p>
      </motion.div>

      {/* Fade In Overlay (creates a smooth transition from elevator out to the gallery) */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-50 bg-background pointer-events-none"
      />
    </main>
  );
}
