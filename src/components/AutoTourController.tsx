"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTourState, tourStore } from "@/lib/store";

const TOUR_ROUTES = ["/athletes", "/services", "/about", "/contact", "/"];
const TOUR_INTERVAL = 8000;

export default function AutoTourController() {
  const router = useRouter();
  const pathname = usePathname();
  const started = useTourState();

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      const currentIndex = TOUR_ROUTES.indexOf(pathname === "/" ? (tourStore.activeSection) : pathname);
      const nextIndex = (currentIndex + 1) % TOUR_ROUTES.length;
      const nextId = TOUR_ROUTES[nextIndex] === "/" ? "home" : TOUR_ROUTES[nextIndex].replace("/", "");
      
      const element = document.getElementById(nextId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, TOUR_INTERVAL);

    return () => clearInterval(timer);
  }, [started, pathname, router]);

  return null;
}
