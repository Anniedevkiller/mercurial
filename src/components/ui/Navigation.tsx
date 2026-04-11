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
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-8 md:py-10 flex items-center justify-between pointer-events-auto">
      <Link href="/" className="group flex flex-col">
        <span className="font-playfair text-xl md:text-2xl tracking-[0.3em] uppercase font-black text-accent-blue transition-colors group-hover:text-accent-gold duration-500">
          Mercurial
        </span>
        <div className="h-[2px] w-0 group-hover:w-full bg-accent-gold transition-all duration-700 ease-in-out" />
      </Link>

      <ul className="hidden md:flex items-center gap-10 lg:gap-14">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path} className="relative overflow-hidden group">
              <Link
                href={link.path}
                className={`font-bebas text-[11px] tracking-[0.4em] uppercase transition-all duration-500 block py-1 ${
                  isActive ? "text-accent-gold font-bold" : "text-foreground/50 hover:text-accent-blue"
                }`}
              >
                {link.name}
              </Link>
              {/* Animated Underline */}
              <motion.div 
                layoutId="nav-underline"
                className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent-gold ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"}`}
              />
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-6 lg:gap-10">
        <AudioPlayer />
      </div>
    </nav>
  );
}
