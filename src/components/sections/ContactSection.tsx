"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Footer } from "../ui/Footer";

export function ContactSection() {
  return (
    <div className="h-full w-full flex flex-col relative z-10 overflow-y-auto">
      <div className="section-padding flex-grow flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 pt-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <span className="font-bebas text-xs tracking-[0.6em] text-accent-gold mb-4 block uppercase font-bold">Contact the Agency</span>
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-accent-gold/20 p-12 md:p-16 space-y-12 shadow-2xl">
              <h3 className="text-accent-blue">Secure Consult</h3>
              <div className="space-y-8">
                {[ "Full Name", "Email Address", "Project Inquiry" ].map((field) => (
                  <div key={field} className="border-b border-accent-gold/30 pb-4">
                    <p className="font-bebas text-[10px] tracking-widest text-accent-gold uppercase mb-2">{field}</p>
                    <div className="h-6 w-full" />
                  </div>
                ))}
              </div>
              <button className="btn-premium group w-full justify-center">
                Send Inquiry
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
