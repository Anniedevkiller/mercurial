"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Athletes", path: "/athletes" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 sm:p-10 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="font-playfair font-bold text-2xl tracking-widest text-gold uppercase">
          Mercurial
        </Link>
      </div>
      
      <div className="flex gap-8 pointer-events-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`font-inter text-sm tracking-wider uppercase transition-colors hover:text-gold ${
              pathname === link.path ? "text-gold" : "text-ivory"
            }`}
          >
            {link.name}
            {pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="h-[1px] bg-gold mt-1"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
