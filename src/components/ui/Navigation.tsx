"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "Athletes", path: "/athletes" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-8 flex items-center justify-between pointer-events-auto">
      <Link href="/" className="font-playfair text-2xl tracking-[0.2em] uppercase font-bold text-foreground">
        Mercurial
      </Link>

      <ul className="hidden md:flex items-center gap-12">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`font-inter text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                  isActive ? "text-foreground font-bold" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
