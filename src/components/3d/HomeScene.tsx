"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tourStore, useTourState } from "@/lib/store";

export default function HomeScene() {
  const started = useTourState();

  const handleEnter = () => {
    tourStore.setStarted(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent relative z-10 px-8">
      <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 1.5, ease: "easeInOut" } }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none"
          >
            <div className="flex flex-col items-center gap-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h1 className="font-playfair text-7xl md:text-[8rem] lg:text-[10rem] tracking-tight text-foreground leading-[0.8] uppercase font-black">
                  Mercurial
                </h1>
                <h2 className="font-inter text-xl md:text-2xl tracking-[0.6em] uppercase text-foreground/40 font-light">
                  Sports Imperial
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="font-playfair italic text-foreground/60 text-xl md:text-2xl tracking-wider max-w-3xl"
              >
                &quot;Where champions become masterpieces&quot;
              </motion.p>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                onClick={handleEnter}
                className="pointer-events-auto px-12 py-6 bg-foreground text-background rounded-full font-inter uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform duration-500 flex items-center gap-4 group mt-12 shadow-2xl"
              >
                <span>Enter the Gallery</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
