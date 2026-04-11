"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="section-padding min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 pt-12">
        {/* Left: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "expo.out" }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase">Contact the Agency</span>
            <h1 className="text-foreground">
              Join the <br/>
              <span className="italic text-accent-blue opacity-90">Roster</span>
            </h1>
            <div className="w-24 h-[1px] bg-accent-gold" />
          </div>

          <div className="space-y-10">
            {[
              { icon: Mail, label: "Inquiries", value: "excellence@mercurial.com" },
              { icon: Phone, label: "Direct Line", value: "+1 (800) IMPERIAL" },
              { icon: MapPin, label: "The Gallery", value: "Fifth Avenue, New York" },
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.2 }}
                className="flex items-center gap-8 group"
              >
                <div className="p-5 bg-accent-blue text-white rounded-full group-hover:bg-accent-gold transition-colors duration-500">
                  <item.icon size={20} />
                </div>
                <div className="space-y-1">
                  <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase">{item.label}</p>
                  <p className="font-playfair text-xl md:text-2xl text-foreground font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Premium Form Placeholder / Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative"
        >
          <div className="bg-white/40 backdrop-blur-xl border border-accent-gold/20 p-12 md:p-16 space-y-12 shadow-2xl">
            <h3 className="text-accent-blue">Secure Consult</h3>
            <div className="space-y-8">
              {[ "Full Name", "Email Address", "Project Inquiry" ].map((field) => (
                <div key={field} className="border-b border-accent-gold/30 pb-4">
                  <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase mb-2">{field}</p>
                  <div className="h-6 w-full" /> {/* input placeholder */}
                </div>
              ))}
            </div>
            <button className="btn-premium group w-full justify-center">
              Send Inquiry
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
          {/* Accent decoration */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </main>
  );
}
