"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-transparent pointer-events-none">
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-left pointer-events-auto"
        >
          <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-4 uppercase tracking-tighter leading-none">
            Our <br/>
            Culture
          </h1>
          <div className="w-12 h-1 bg-accent mb-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="max-w-xl self-end text-right pointer-events-auto"
        >
          <p className="font-playfair italic text-2xl md:text-4xl text-foreground/80 leading-relaxed mb-6">
            &quot;Mercurial Sports Imperial is a luxury athlete representation house where talent is curated as legacy.&quot;
          </p>
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-foreground/40 leading-loose">
            We merge elite sports management with artistic expression, global exposure, and cultural storytelling.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
