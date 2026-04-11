"use client";

import { motion } from "framer-motion";

export default function AthletesPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-transparent pointer-events-none z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 left-8 text-left pointer-events-auto z-10"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-3 block uppercase">The Collection</span>
        <h1 className="font-playfair text-4xl md:text-8xl text-foreground mb-6 uppercase tracking-tighter leading-[0.85] font-black italic">
          Masterpiece <br/>
          Athletes
        </h1>
        <div className="w-24 h-[1px] bg-accent-gold mb-6" />
        <p className="font-inter text-foreground/60 tracking-[0.4em] text-[10px] uppercase max-w-xs leading-relaxed">
          Curating the world&apos;s most elite competitive legacies.
        </p>
      </motion.div>

      {/* Floating Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 text-right pointer-events-none"
      >
        <p className="font-bebas text-[10px] uppercase tracking-[0.6em] text-accent-gold bg-[#F8F4EC]/50 backdrop-blur-sm px-4 py-2 border border-accent-gold/20">
          Illuminate portraits to reveal legacy
        </p>
      </motion.div>
    </main>
  );
}
