"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import ElevatorScene from "./ElevatorScene";
import { Environment, Preload, Sparkles, Cloud, Clouds } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";

function CinematicEffects({ started }: { started: boolean }) {
  // Inside CinematicEffects
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useThree();

  useEffect(() => {
    const target = targetRef.current;
    if (scene && !scene.children.includes(target)) {
      scene.add(target);
    }
    return () => {
      if (scene) scene.remove(target);
    }
  }, [scene]);

  useFrame((state) => {
    if (!started) {
      // Slight camera zoom and float
      const targetZ = 4.0;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.005);
      
      // Moving spotlight sweep
      if (spotlightRef.current) {
        spotlightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 4;
        targetRef.current.position.set(Math.sin(state.clock.elapsedTime * 0.3) * 2, 0, 0);
        spotlightRef.current.target = targetRef.current;
      }
    }
  });

  return (
    <>
      <spotLight ref={spotlightRef} position={[0, 4, 3]} intensity={4} angle={0.8} penumbra={1} color="#C19A6B" />
      {!started && (
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#C19A6B" opacity={0.15} position={[0, -1, 0]} speed={0.2} />
        </Clouds>
      )}
    </>
  );
}

export default function HomeScene() {
  const [started, setStarted] = useState(false);

  const handleEnter = () => {
    setStarted(true);
  };

  return (
    <div className="w-screen h-screen xl:w-full xl:h-full absolute inset-0 z-0 bg-background overflow-hidden flex items-center justify-center">
      
      {/* 3D Background & Elevator */}
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <ElevatorScene started={started} />
          {/* Subtle moving particles in the lobby */}
          {!started && <Sparkles count={300} scale={12} size={1.5} speed={0.4} opacity={0.6} color="#C19A6B" />}
          
          <CinematicEffects started={started} />

          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={2} color="#FDFBF7" />
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
              className="absolute bottom-24 pointer-events-auto px-10 py-5 border border-light-yellow/40 text-light-yellow font-inter uppercase tracking-[0.3em] text-sm sm:text-base hover:border-light-yellow transition-all duration-700 backdrop-blur-md bg-black/20 group animate-pulse-slow overflow-hidden rounded-sm flex items-center gap-4"
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
