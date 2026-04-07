"use client";

import { motion } from "framer-motion";

const services = [
  { id: "01", title: "Athlete Representation", desc: "Comprehensive management guiding the careers of elite sports talent worldwide." },
  { id: "02", title: "Sponsorship & Endorsements", desc: "Securing lucrative deals and matching athletes with iconic premium brands." },
  { id: "03", title: "Contract Negotiation", desc: "Maximizing value, duration, and legacy across global sports franchises." },
  { id: "04", title: "International Placements", desc: "Facilitating seamless transitions to leading leagues and clubs around the globe." },
  { id: "05", title: "Media & Brand Partnerships", desc: "Commanding narratives with exclusive press alignments and media strategies." },
  { id: "06", title: "Career Management", desc: "Architecting generational success from draft day to post-retirement legacy." },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent pointer-events-none text-foreground flex flex-col items-center justify-start pt-32 pb-20 px-8 relative z-10 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/80 via-transparent to-transparent pointer-events-none opacity-50" />
      <div className="text-center mb-20 max-w-3xl px-4 pointer-events-auto">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark-blue mb-6 uppercase tracking-widest">Expertise</h1>
        <p className="font-inter text-dark-blue/70 tracking-wide text-lg">
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
            className="flex flex-col md:flex-row items-baseline gap-6 md:gap-12 border-b border-dark-blue/20 pb-12 hover:border-light-yellow transition-colors duration-500 group pointer-events-auto"
          >
            <span className="font-bebas text-5xl text-dark-blue/30 group-hover:text-light-yellow transition-colors duration-500">{svc.id}</span>
            <div className="flex-1">
              <h2 className="font-playfair text-3xl md:text-4xl text-dark-blue mb-4">{svc.title}</h2>
              <p className="font-inter text-dark-blue/70 text-lg leading-relaxed max-w-2xl">{svc.desc}</p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center overflow-hidden w-12 h-12">
               <motion.div 
                  className="w-full h-[2px] bg-light-yellow origin-left"
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
