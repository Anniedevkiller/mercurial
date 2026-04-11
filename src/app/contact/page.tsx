"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-transparent pointer-events-none z-10">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 left-8 text-left pointer-events-auto z-10 max-w-xl p-12 bg-[#F8F4EC]/80 backdrop-blur-md border border-accent-gold/20"
      >
        <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase">Contact the Agency</span>
        <h1 className="font-playfair text-6xl md:text-8xl text-foreground mb-12 uppercase tracking-tighter leading-none font-black italic">
          Join the <br/>
          Roster
        </h1>
        
        <div className="space-y-10">
          <div className="flex items-center gap-6 group">
            <div className="p-4 bg-accent-blue text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase mb-1">Inquiries</p>
              <p className="font-playfair text-xl text-foreground">excellence@mercurial.com</p>
            </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="p-4 bg-accent-blue text-white">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase mb-1">Direct Line</p>
              <p className="font-playfair text-xl text-foreground">+1 (800) IMPERIAL</p>
            </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="p-4 bg-accent-blue text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase mb-1">The Gallery</p>
              <p className="font-playfair text-xl text-foreground">Fifth Avenue, New York</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 text-right pointer-events-none"
      >
        <p className="font-bebas text-[10px] uppercase tracking-[0.5em] text-accent-gold">
          Mercurial Sports Imperial &copy; 2026
        </p>
      </motion.div>
    </main>
  );
}
