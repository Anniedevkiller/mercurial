"use client";

import { motion } from "framer-motion";

export function AthletesSection() {
  return (
    <div className="section-padding h-full w-full flex items-center relative z-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl pt-12"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase font-bold">The Imperial Collection</span>
        <h1 className="text-foreground mb-8">
          Masterpiece <br/>
          <span className="italic text-accent-blue opacity-90">Athletes</span>
        </h1>
        <div className="w-24 h-[1px] bg-accent-gold mb-10" />
        <p className="text-lg lg:text-xl font-playfair italic text-foreground/60 max-w-sm leading-relaxed border-l border-accent-gold/20 pl-6">
          Curating the world&apos;s most elite competitive legacies. Every portrait tells a story of unparalleled excellence.
        </p>
      </motion.div>

      {/* Floating Instructions Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
      >
        <p className="font-bebas text-[10px] uppercase tracking-[0.6em] text-accent-gold/40">
          Illuminate portraits to reveal their legacy
        </p>
      </motion.div>
    </div>
  );
}
