"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Athletes", path: "/athletes" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 sm:p-10 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-4">
        <Link href="/" className="font-playfair font-bold text-2xl tracking-widest text-light-yellow uppercase">
          Mercurial
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        <div className="flex gap-8 items-center bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-light-yellow/10">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-inter font-semibold text-sm tracking-widest uppercase transition-colors hover:text-light-yellow ${
                pathname === link.path ? "text-light-yellow" : "text-white/70"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="h-[1px] bg-light-yellow mt-1 opacity-70"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
        <AudioPlayer />
      </div>

      {/* Mobile Toggle & Audio */}
      <div className="md:hidden pointer-events-auto flex items-center gap-4">
        <AudioPlayer />
        <button onClick={() => setIsOpen(!isOpen)} className="text-light-yellow pr-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-dark-blue/95 backdrop-blur-xl border border-light-yellow/20 rounded-xl p-8 flex flex-col gap-6 pointer-events-auto shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-inter font-semibold text-xl tracking-widest uppercase transition-colors hover:text-light-yellow ${
                  pathname === link.path ? "text-light-yellow" : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
