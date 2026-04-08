"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTourState } from "@/lib/store";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const started = useTourState();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && started) {
      audio.volume = 0.15;
      audio.play().then(() => setIsPlaying(true)).catch((e) => {
        console.log("Autoplay prevented:", e);
      });
    }
  }, [started]);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src="/audio/jazz.mp3" loop />
      <button 
        onClick={toggle}
        className="p-2 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors text-foreground/60"
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <span className="font-bebas text-xs tracking-widest text-foreground/30 uppercase">
        {isPlaying ? "On" : "Off"}
      </span >
    </div>
  );
}
