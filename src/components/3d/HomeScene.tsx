"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import ElevatorScene from "./ElevatorScene";
import GalleryScene from "./GalleryScene";
import { Environment, Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeScene() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  return (
    <div className="w-screen h-screen absolute inset-0 z-0 bg-dark">
      {/* Hidden audio element, mock url or local path. Assuming a jazz.mp3 in public folder later. */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_aa8ed52093.mp3?filename=smooth-jazz-piano-12-16629.mp3" loop />
      
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ElevatorScene started={started} />
          <GalleryScene />
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-white mix-blend-difference">
        <h1 className="font-playfair text-6xl tracking-widest text-center">
            Mercurial
          <br />
          <span className="text-3xl font-inter tracking-[0.3em] opacity-80 uppercase mt-4 block">Sports Imperial</span>
        </h1>
      </div>

      <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-dark/80 backdrop-blur-sm"
          >
            <motion.button 
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-gold/50 text-gold font-playfair uppercase tracking-widest text-lg hover:bg-gold hover:text-dark transition-colors duration-500"
            >
              Enter Experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
