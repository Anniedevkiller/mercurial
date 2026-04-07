"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
      <div className="pointer-events-auto">
        <Link href="/" className="font-playfair font-bold text-2xl tracking-widest text-dark-blue uppercase">
          Mercurial
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 pointer-events-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`font-inter font-semibold text-sm tracking-wider uppercase transition-colors hover:text-light-yellow ${
              pathname === link.path ? "text-light-yellow" : "text-dark-blue/80"
            }`}
          >
            {link.name}
            {pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="h-[2px] bg-light-yellow mt-1"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden pointer-events-auto">
        <button onClick={() => setIsOpen(!isOpen)} className="text-dark-blue pr-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-grey/20 rounded-xl p-6 flex flex-col gap-6 pointer-events-auto shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-inter font-semibold text-lg tracking-wider uppercase transition-colors hover:text-light-yellow ${
                  pathname === link.path ? "text-light-yellow" : "text-dark-blue"
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
