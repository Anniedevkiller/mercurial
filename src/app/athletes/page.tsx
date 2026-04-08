"use client";

import { motion } from "framer-motion";

export default function AthletesPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-transparent pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 left-8 text-left pointer-events-auto z-10"
      >
        <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-4 uppercase tracking-tighter leading-none">
          Our <br/>
          Roster
        </h1>
        <div className="w-12 h-1 bg-accent mb-4" />
        <p className="font-inter text-foreground/40 tracking-[0.4em] text-xs uppercase">
          The Gallery of Excellence
        </p>
      </motion.div>

      {/* Floating Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 text-right pointer-events-none"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-foreground">
          Hover over portraits to reveal legacy details
        </p>
      </motion.div>
    </main>
  );
}
