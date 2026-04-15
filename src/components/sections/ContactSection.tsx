"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ContactSection() {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 relative z-10 pointer-events-auto bg-[#FAFAFA] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Heading and Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <h1 className="font-bebas text-[5rem] sm:text-[6rem] lg:text-[7rem] leading-[0.85] text-[#1A1A1A] uppercase tracking-normal">
            Fill Out The<br />Form To Get<br />Started.
          </h1>
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-accent-blue rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1518605368461-1e1e38ce8fba?q=80&w=1200&auto=format&fit=crop"
              alt="Soccer Player"
              fill
              className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            {/* Blue tint overlay to match the image requested */}
            <div className="absolute inset-0 bg-[#004aad]/30 mix-blend-multiply" />
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-[#F8F9FA] p-8 md:p-12 rounded-sm shadow-sm border border-black/5"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black flex gap-1 tracking-wide">First Name <span className="text-red-600">*</span></label>
              <input type="text" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black text-sm text-black" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black flex gap-1 tracking-wide">Last Name <span className="text-red-600">*</span></label>
              <input type="text" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black text-sm text-black" required />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black flex gap-1 tracking-wide">Email Address <span className="text-red-600">*</span></label>
              <input type="email" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black text-sm text-black" required />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black tracking-wide flex gap-1">Phone Number</label>
              <input type="tel" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black text-sm text-black" />
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-[11px] font-bold text-black tracking-wide flex gap-1">Video Link</label>
              <input type="url" placeholder="Link to player's video" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm text-black" />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black tracking-wide flex gap-1">Social Media Link</label>
              <input type="url" placeholder="Link to player's social" className="w-full bg-white border-none p-3.5 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm text-black" />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black flex gap-1 tracking-wide">Upload CV <span className="text-red-600">*</span></label>
              <div className="relative">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required />
                <div className="w-full bg-white border-none p-3.5 text-sm text-gray-400 flex items-center justify-between focus-within:ring-1 focus-within:ring-black">
                  <span>Upload player's CV</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="bg-[#EAB308] text-white font-bebas text-lg py-4 px-10 w-auto uppercase tracking-widest hover:bg-black transition-colors duration-300">
                Submit form
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
