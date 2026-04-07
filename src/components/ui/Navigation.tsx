"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Athletes", path: "/athletes" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 p-6 sm:px-10 sm:py-6 flex justify-between items-center transition-all duration-700 pointer-events-none ${
        scrolled ? "bg-dark-blue/80 backdrop-blur-xl border-b border-light-yellow/10 py-4 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-4">
        <Link href="/" className="font-playfair font-bold text-2xl tracking-widest text-light-yellow uppercase relative group">
          Mercurial
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-light-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        <div className={`flex gap-8 items-center rounded-full border transition-all duration-700 px-8 py-3 ${scrolled ? 'border-transparent' : 'bg-black/20 backdrop-blur-md border-light-yellow/10'}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative font-inter font-semibold text-sm tracking-widest uppercase transition-colors duration-500 group overflow-hidden ${
                pathname === link.path ? "text-light-yellow" : "text-cream/70 hover:text-light-yellow"
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {pathname === link.path ? (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-light-yellow opacity-80"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : (
                <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-light-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-50" />
              )}
            </Link>
          ))}
        </div>
        <AudioPlayer />
      </div>

      {/* Mobile Toggle & Audio */}
      <div className="md:hidden pointer-events-auto flex items-center gap-4">
        <AudioPlayer />
        <button onClick={() => setIsOpen(!isOpen)} className="text-light-yellow pr-2 hover:scale-110 transition-transform duration-300">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-20 left-4 right-4 bg-dark-blue/95 backdrop-blur-3xl border border-light-yellow/20 rounded-xl p-8 flex flex-col gap-6 pointer-events-auto shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`relative font-inter font-semibold text-xl tracking-widest uppercase transition-colors group ${
                  pathname === link.path ? "text-light-yellow" : "text-white/80 hover:text-light-yellow"
                }`}
              >
                {link.name}
                <span className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-light-yellow transition-opacity duration-300 ${pathname === link.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
