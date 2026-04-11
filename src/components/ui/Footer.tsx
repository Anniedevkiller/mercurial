"use client";

import Link from "next/link";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent-gold/20 pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="font-playfair text-3xl tracking-[0.3em] uppercase font-black text-accent-blue">
              Mercurial
            </Link>
            <p className="font-playfair italic text-lg lg:text-xl text-foreground/60 max-w-sm">
              &quot;Where champions become masterpieces. Curating the legacy of sports elite.&quot;
            </p>
            <div className="flex items-center gap-6 text-accent-blue">
              <a href="#" className="hover:text-accent-gold transition-colors duration-500"><Instagram size={20} /></a>
              <a href="mailto:info@mercurialsports.com" className="hover:text-accent-gold transition-colors duration-500"><Mail size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-bebas text-xs tracking-[0.5em] text-accent-gold uppercase">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "Athletes", "Services", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`} className="group flex items-center gap-2 font-inter text-sm text-foreground/50 hover:text-accent-blue transition-all duration-300">
                    <span className="uppercase tracking-widest">{link}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="font-bebas text-xs tracking-[0.5em] text-accent-gold uppercase">Inquiries</h4>
            <div className="space-y-4 font-inter text-sm text-foreground/60 tracking-wider">
              <p>LONDON OFFICE</p>
              <p>MUSEUM DISTRICT, UK</p>
              <br/>
              <a href="mailto:curator@mercurial.com" className="text-accent-blue font-bold gold-underline">curator@mercurial.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-accent-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-bebas text-[10px] tracking-[0.5em] text-foreground/30 uppercase">
            © 2024 MERCURIAL SPORTS IMPERIAL — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8 font-bebas text-[9px] tracking-[0.5em] text-foreground/30 uppercase">
            <a href="#" className="hover:text-accent-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
