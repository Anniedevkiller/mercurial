"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start pt-32 pb-20 px-8 overflow-hidden relative">
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-dark-blue/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-light-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full z-10 text-center mb-24 px-4">
        <h1 className="font-playfair text-5xl md:text-7xl text-light-yellow mb-8 uppercase tracking-widest leading-tight">
          Where Sport<br/><span className="text-dark-blue">Meets</span> Culture
        </h1>
        <p className="font-inter text-dark-blue/80 text-xl max-w-2xl mx-auto leading-relaxed">
          Mercurial Sports Imperial operates at the intersection of elite athletics, 
          high fashion, and cultural influence. We represent those who redefine the game.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl w-full z-10">
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
