"use client";

import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-transparent pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 left-8 text-left pointer-events-auto z-10"
      >
        <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-4 uppercase tracking-tighter leading-none">
          Agency <br/>
          Expertise
        </h1>
        <div className="w-12 h-1 bg-accent mb-4" />
        <p className="font-inter text-foreground/40 tracking-[0.4em] text-xs uppercase">
          The Pillars of Representation
        </p>
      </motion.div>
    </main>
  );
}
