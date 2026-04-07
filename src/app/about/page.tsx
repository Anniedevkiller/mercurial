"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent pointer-events-none text-foreground flex flex-col items-center justify-start pt-32 pb-20 px-8 overflow-hidden relative">
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-dark-blue/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-light-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full z-10 text-center mb-20 px-4 pointer-events-auto mt-[40vh] md:mt-[30vh]">
        <h1 className="font-playfair text-3xl md:text-5xl text-dark-blue mb-8 tracking-widest leading-relax italic">
          &quot;Mercurial Sports Imperial is a premium sports representation agency where champions are curated like masterpieces.&quot;
        </h1>
        <p className="font-inter text-dark-blue/80 text-xl max-w-2xl mx-auto leading-relaxed border-t border-dark-blue/20 pt-6">
          <strong className="block text-dark-blue mb-2 font-bebas tracking-[0.2em] text-2xl">Mission</strong>
          To redefine the intersection of elite athletics and cultural influence, establishing lifelong legacies for the exceptional few.<br/><br/>
          <strong className="block text-dark-blue mb-2 font-bebas tracking-[0.2em] text-2xl">Vision</strong>
          To serve as the global pinnacle of bespoke career representation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl w-full z-10 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full border border-dark-blue/30 flex items-center justify-center text-dark-blue mb-2 hover:bg-dark-blue hover:text-white transition-colors duration-500">
            <MapPin size={24} />
          </div>
          <h3 className="font-playfair text-2xl text-dark-blue">The Gallery</h3>
          <p className="font-inter text-dark-blue/70">
            One Imperial Plaza<br/>London, UK W1J 7BR
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full border border-dark-blue/30 flex items-center justify-center text-dark-blue mb-2 hover:bg-dark-blue hover:text-white transition-colors duration-500">
            <Mail size={24} />
          </div>
          <h3 className="font-playfair text-2xl text-dark-blue">Direct Inquiries</h3>
          <p className="font-inter text-dark-blue/70">
            executive@mercurial.io<br/>press@mercurial.io
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full border border-dark-blue/30 flex items-center justify-center text-dark-blue mb-2 hover:bg-dark-blue hover:text-white transition-colors duration-500">
            <Phone size={24} />
          </div>
          <h3 className="font-playfair text-2xl text-dark-blue">Private Line</h3>
          <p className="font-inter text-dark-blue/70">
            +44 (0) 20 7946 0842<br/>By Appointment Only
          </p>
        </motion.div>
      </div>
    </main>
  );
}
