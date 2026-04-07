"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTourState } from "@/lib/store";

const TOUR_ROUTES = ["/athletes", "/services", "/about"];
const TOUR_INTERVAL = 8000;

export default function AutoTourController() {
  const router = useRouter();
  const pathname = usePathname();
  const started = useTourState();

  useEffect(() => {
    if (!started) return;
    
    // Only cycle exactly through the defined museum rooms
    const currentIdx = TOUR_ROUTES.indexOf(pathname);
    if (currentIdx === -1) return;

    const timer = setTimeout(() => {
      const nextRoute = TOUR_ROUTES[(currentIdx + 1) % TOUR_ROUTES.length];
      router.push(nextRoute);
    }, TOUR_INTERVAL);

    return () => clearTimeout(timer);
  }, [pathname, started, router]);

  return null;
}
