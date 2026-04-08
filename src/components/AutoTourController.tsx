"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";

const TOUR_ROUTES = ["/athletes", "/services", "/about", "/"];
const TOUR_INTERVAL = 8000;

export default function AutoTourController() {
  const router = useRouter();
  const pathname = usePathname();
  const started = useTourState();

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      const currentIndex = TOUR_ROUTES.indexOf(pathname);
      const nextIndex = (currentIndex + 1) % TOUR_ROUTES.length;
      router.push(TOUR_ROUTES[nextIndex]);
    }, TOUR_INTERVAL);

    return () => clearInterval(timer);
  }, [started, pathname, router]);

  return null;
}
