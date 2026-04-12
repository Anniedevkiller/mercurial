"use client";
import { useState, useEffect } from 'react';

type Listener = (v: boolean) => void;

class TourStore {
  started = false;
  autoTourActive = false;
  activeSection = "/";
  listeners = new Set<Listener>();

  setStarted(v: boolean) {
    this.started = v;
    this.notify();
  }

  setAutoTour(v: boolean) {
    this.autoTourActive = v;
    this.notify();
  }

  setActiveSection(v: string) {
    this.activeSection = v;
    this.notify();
  }

  notify() {
    this.listeners.forEach(l => l(this.started));
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => { this.listeners.delete(l); };
  }
}

export const tourStore = new TourStore();

export function useTourState() {
  const [started, setStarted] = useState(tourStore.started);
  const [activeSection, setActiveSection] = useState(tourStore.activeSection);

  useEffect(() => {
    const unsub = tourStore.subscribe(() => {
      setStarted(tourStore.started);
      setActiveSection(tourStore.activeSection);
    });
    return unsub;
  }, []);

  return { started, activeSection };
}
