"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-transparent pointer-events-none z-10">
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-left pointer-events-auto mt-20"
        >
          <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-3 block uppercase">The Philosophy</span>
          <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-6 uppercase tracking-tighter leading-[0.85] font-black italic">
            Agency <br/>
            Culture
          </h1>
          <div className="w-24 h-[1px] bg-accent-gold mb-6" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="max-w-2xl self-end text-right pointer-events-auto bg-[#F8F4EC]/40 backdrop-blur-md p-10 border-r-2 border-accent-gold"
        >
          <p className="font-playfair italic text-3xl md:text-5xl text-foreground leading-tight mb-8">
            &quot;Mercurial Sports Imperial is a luxury house where talent is curated as <span className="text-accent-blue not-italic font-black">LEGACY</span>.&quot;
          </p>
          <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-foreground/60 leading-loose max-w-md ml-auto">
            Merging elite management with cinematic storytelling to position athletes at the center of global culture.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
