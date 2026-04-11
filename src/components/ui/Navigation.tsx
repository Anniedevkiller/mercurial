"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <nav className="glass-nav px-8 md:px-16 py-6 flex items-center justify-between">
      <Link href="/" className="group flex flex-col">
        <span className="font-playfair text-2xl tracking-[0.3em] uppercase font-black text-accent-blue transition-colors group-hover:text-accent-gold duration-500">
          Mercurial
        </span>
        <div className="h-[2px] w-0 group-hover:w-full bg-accent-gold transition-all duration-700 ease-in-out" />
      </Link>

      <div className="hidden md:flex items-center space-x-12 lg:space-x-20">
        <ul className="flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path} className="relative group">
                <Link
                  href={link.path}
                  className={`font-bebas text-[12px] tracking-[0.4em] uppercase transition-all duration-500 block py-1 ${
                    isActive ? "text-accent-blue font-bold" : "text-foreground/40 hover:text-accent-blue"
                  }`}
                >
                  {link.name}
                </Link>
                {/* Gold Underline */}
                <motion.div 
                   className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-gold transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </li>
            );
          })}
        </ul>
        
        <div className="h-4 w-[1px] bg-accent-gold/20" />
        
        <AudioPlayer />
      </div>

      {/* Mobile Placeholder or simply omitted for mobile as requested focus is premium polish */}
    </nav>
  );
}
