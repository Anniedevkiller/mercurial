"use client";

import { motion } from "framer-motion";

export default function AthletesPage() {
  return (
    <main className="section-padding min-h-screen relative z-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "expo.out" }}
        className="max-w-4xl pt-12"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase">The Imperial Collection</span>
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
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
      >
        <p className="font-bebas text-[10px] uppercase tracking-[0.6em] text-accent-gold/40">
          Illuminate portraits to reveal their legacy
        </p>
      </motion.div>
    </main>
  );
}
