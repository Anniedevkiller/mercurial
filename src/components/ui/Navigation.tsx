"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import { AudioPlayer } from "./AudioPlayer";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Athletes", path: "/athletes" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const { activeSection } = useTourState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="glass-nav px-6 md:px-24 py-5 flex items-center justify-between transition-all duration-500"
    >
      <Link href="/" className="group flex flex-col">
        <span className="font-playfair text-xl md:text-2xl tracking-[0.4em] uppercase font-black text-accent-blue transition-colors group-hover:text-accent-gold duration-500">
          Mercurial
        </span>
        <div className="h-[1px] w-0 group-hover:w-full bg-accent-gold transition-all duration-700 ease-in-out" />
      </Link>

      <div className="hidden md:flex items-center gap-12 lg:gap-16">
        <ul className="flex items-center gap-8 lg:gap-12">
          {["Home", "Athletes", "Services", "About", "Contact"].map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === (id === "home" ? "/" : "/" + id);
            
            return (
              <li key={link}>
                <a 
                  href={`#${id}`}
                  className={`font-bebas text-[11px] tracking-[0.4em] uppercase transition-all duration-500 block py-2 ${
                    isActive ? "text-accent-blue font-bold" : "text-foreground/50 hover:text-accent-blue"
                  }`}
                >
                  <span className="relative">
                    {link}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent-gold"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        
        <div className="h-4 w-[1px] bg-accent-gold/30" />
        
        <AudioPlayer />
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden text-accent-blue p-2 relative z-[110]"
      >
        <div className="w-6 h-[1.5px] bg-current mb-1.5" />
        <div className="w-6 h-[1.5px] bg-current" />
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#FBF9F4] z-[120] flex flex-col items-center justify-center space-y-12"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-accent-blue p-2"
            >
              <div className="w-6 h-[1.5px] bg-current rotate-45 translate-y-[1px]" />
              <div className="w-6 h-[1.5px] bg-current -rotate-45 -translate-y-[1px]" />
            </button>
            {["Home", "Athletes", "Services", "About", "Contact"].map((link) => {
              const id = link.toLowerCase();
              return (
                <a 
                  key={link}
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-playfair text-3xl uppercase tracking-widest text-accent-blue font-black hover:text-accent-gold transition-colors"
                >
                  {link}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
