"use client";

import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="section-padding min-h-screen relative z-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "expo.out" }}
        className="max-w-4xl pt-12"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase">Bespoke Management</span>
        <h1 className="text-foreground mb-8">
          Strategic <br/>
          <span className="italic text-accent-blue opacity-90">Mastery</span>
        </h1>
        <div className="w-24 h-[1px] bg-accent-gold mb-10" />
        <p className="text-lg lg:text-xl font-playfair italic text-foreground/60 max-w-sm leading-relaxed border-l border-accent-gold/20 pl-6">
          Architecting elite careers through world-class negotiation, image curation, and global strategy.
        </p>
      </motion.div>
    </main>
  );
}
