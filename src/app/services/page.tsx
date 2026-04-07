"use client";

import { motion } from "framer-motion";

const services = [
  { id: "01", title: "Strategic Brand Management", desc: "Cultivating elite global identities through deliberate, long-term partnerships." },
  { id: "02", title: "Contract Negotiation", desc: "Maximizing value while securing career longevity and robust representation." },
  { id: "03", title: "Legacy & Wealth Structuring", desc: "Building generational foundations through sophisticated advisory networks." },
  { id: "04", title: "Media & Public Relations", desc: "Commanding the narrative with a global reach and exclusive press alignments." },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark text-foreground flex flex-col items-center justify-start pt-32 pb-20 px-8">
      <div className="text-center mb-20 max-w-3xl">
        <h1 className="font-playfair text-6xl text-gold mb-6 uppercase tracking-widest">Expertise</h1>
        <p className="font-inter text-ivory/70 tracking-wide text-lg">
          We redefine representation. Moving beyond the game, we architect 
          legacies for those who dominate the arena.
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col space-y-16">
        {services.map((svc, idx) => (
          <motion.div 
            key={svc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row items-baseline gap-6 md:gap-12 border-b border-gold/20 pb-12 hover:border-gold transition-colors duration-500 group"
          >
            <span className="font-bebas text-5xl text-gold/30 group-hover:text-gold transition-colors duration-500">{svc.id}</span>
            <div className="flex-1">
              <h2 className="font-playfair text-4xl text-ivory mb-4">{svc.title}</h2>
              <p className="font-inter text-ivory/70 text-lg leading-relaxed max-w-2xl">{svc.desc}</p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center overflow-hidden w-12 h-12">
               <motion.div 
                  className="w-full h-[1px] bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
               />
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
