"use client";

import { useEffect, useRef } from "react";
import HomeScene from "@/components/3d/HomeScene";
import { AthletesSection } from "@/components/sections/AthletesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { tourStore } from "@/lib/store";

const SECTIONS = [
  { id: "home", path: "/", component: HomeScene },
  { id: "athletes", path: "/athletes", component: AthletesSection },
  { id: "services", path: "/services", component: ServicesSection },
  { id: "about", path: "/about", component: AboutSection },
  { id: "contact", path: "/contact", component: ContactSection },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = SECTIONS.find((s) => s.id === entry.target.id);
            if (section) {
              tourStore.setActiveSection(section.path);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="snap-container">
      {SECTIONS.map((Section) => (
        <section key={Section.id} id={Section.id} className="snap-section">
          <Section.component />
        </section>
      ))}
    </div>
  );
}
