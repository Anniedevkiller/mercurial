"use client";

import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-transparent pointer-events-none z-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 left-8 text-left pointer-events-auto z-10"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-3 block uppercase">Strategic Value</span>
        <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-6 uppercase tracking-tighter leading-[0.85] font-black italic">
          Executive <br/>
          Expertise
        </h1>
        <div className="w-24 h-[1px] bg-accent-gold mb-6" />
        <p className="font-inter text-foreground/60 tracking-[0.4em] text-[10px] uppercase max-w-xs leading-relaxed">
          The fundamental pillars of world-class athlete curation and global reach.
        </p>
      </motion.div>
    </main>
  );
}
