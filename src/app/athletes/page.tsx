"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const athletes = [
  { name: "Marcus 'The Flash' Thorne", sport: "Basketball", stats: "28.5 PPG / 5 MVP", rep: "Exclusive Brand & Contract Representation", img: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=2000&auto=format&fit=crop" },
  { name: "Elena Silva", sport: "Tennis", stats: "12 Grand Slams / World No. 1", rep: "Global Image & Sponsorships", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop" },
  { name: "Julian Rossi", sport: "Formula 1", stats: "4x World Champion", rep: "Team Negotiations & Endorsements", img: "https://images.unsplash.com/photo-1541252870104-1b07223b207d?q=80&w=2000&auto=format&fit=crop" },
  { name: "Sarah Jenkins", sport: "Track & Field", stats: "Olympic Gold Medalist / 100m", rep: "Commercial Strategy & PR", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000&auto=format&fit=crop" },
];

function PortraitCard({ athlete }: { athlete: typeof athletes[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-sm aspect-[3/4] mx-auto rounded-md cursor-pointer border-2 border-transparent hover:border-light-yellow/50 transition-colors duration-500 overflow-hidden group shadow-xl shadow-dark-blue/5"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale-[100%] group-hover:grayscale-[20%] group-hover:scale-105"
        style={{ backgroundImage: `url(${athlete.img})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent opacity-90" />
      
      <div 
        className="absolute bottom-0 left-0 p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="font-playfair text-2xl text-dark-blue mb-1">{athlete.name}</h3>
        <p className="font-bebas text-xl text-dark-blue/80 tracking-wider mb-3">{athlete.sport}</p>
        <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="font-inter text-sm text-dark-blue/80"><span className="text-light-yellow uppercase text-xs tracking-widest font-semibold">Stats:</span> {athlete.stats}</p>
          <p className="font-inter text-sm text-dark-blue/80"><span className="text-light-yellow uppercase text-xs tracking-widest font-semibold">Rep:</span> {athlete.rep}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AthletesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start pt-32 pb-20 px-8">
      <div className="text-center mb-16 px-4">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark-blue mb-6 uppercase tracking-widest">Our Roster</h1>
        <p className="font-inter text-dark-blue/70 max-w-2xl mx-auto tracking-wide text-lg">
          Representing the pinnacle of athletic achievement. 
          A gallery of movement, power, and prestige.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl px-4" style={{ perspective: 1000 }}>
        {athletes.map((athlete, idx) => (
          <PortraitCard key={idx} athlete={athlete} />
        ))}
      </div>
    </main>
  );
}
