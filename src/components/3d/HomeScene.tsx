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
    <div className="w-screen h-screen xl:w-full xl:h-full absolute inset-0 z-0 bg-background overflow-hidden">
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
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-dark-blue mix-blend-exclusion">
        <h1 className="font-playfair text-4xl sm:text-6xl tracking-widest text-center px-4">
            Mercurial
          <br />
          <span className="text-xl sm:text-3xl font-inter tracking-[0.3em] font-semibold uppercase mt-4 block text-light-yellow">Sports Imperial</span>
        </h1>
      </div>

      <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md px-4"
          >
            <motion.button 
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-10 py-3 sm:py-4 border-2 border-dark-blue text-dark-blue font-playfair uppercase tracking-widest text-base sm:text-xl font-bold hover:bg-dark-blue hover:text-white transition-colors duration-500 rounded-lg"
            >
              Enter Experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
