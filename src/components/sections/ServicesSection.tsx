"use client";

import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 relative z-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase font-bold">Bespoke Management</span>
        <h1 className="text-foreground mb-8">
          Strategic <br/>
          <span className="italic text-accent-blue opacity-90">Mastery</span>
        </h1>
        <div className="w-24 h-[1px] bg-accent-gold mb-10" />
        <p className="text-lg lg:text-xl font-playfair italic text-foreground/60 max-w-sm leading-relaxed border-l border-accent-gold/20 pl-6">
          Architecting elite careers through world-class negotiation, image curation, and global strategy.
        </p>
      </motion.div>
    </div>
  );
}
