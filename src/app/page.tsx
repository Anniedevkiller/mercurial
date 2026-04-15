"use client";

import HomeHero from "@/components/3d/HomeScene";
import { AthletesSection as Athletes } from "@/components/sections/AthletesSection";
import { ServicesSection as Services } from "@/components/sections/ServicesSection";
import { AboutSection as About } from "@/components/sections/AboutSection";
import { ContactSection as Contact } from "@/components/sections/ContactSection";

import { useEffect } from "react";
import { tourStore } from "@/lib/store";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionMap: Record<string, string> = {
              "home": "/",
              "athletes": "/athletes",
              "services": "/services",
              "about": "/about",
              "contact": "/contact"
            };
            const path = sectionMap[entry.target.id];
            if (path) {
              tourStore.setActiveSection(path);
              if (path !== "/") {
                tourStore.setStarted(true);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="snap-container w-full">
      <section id="home" className="snap-section">
        <HomeHero />
      </section>

      <section id="athletes" className="snap-section">
        <Athletes />
      </section>

      <section id="services" className="snap-section">
        <Services />
      </section>

      <section id="about" className="snap-section">
        <About />
      </section>

      <section id="contact" className="snap-section">
        <Contact />
      </section>
    </main>
  );
}
