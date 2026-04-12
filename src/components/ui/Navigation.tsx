"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";
import { AudioPlayer } from "./AudioPlayer";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Athletes", path: "/athletes" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const { activeSection } = useTourState();

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

      {/* Mobile Menu Toggle (Simplified for Premium feel) */}
      <button className="md:hidden text-accent-blue p-2">
        <div className="w-6 h-[1.5px] bg-current mb-1.5" />
        <div className="w-6 h-[1.5px] bg-current" />
      </button>
    </motion.nav>
  );
}
