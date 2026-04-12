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
      // Delay play slightly for smoother transition after "Enter the Gallery"
      const timeout = setTimeout(() => {
        audio.volume = 0.15;
        audio.play().then(() => setIsPlaying(true)).catch((e) => {
          console.log("Autoplay prevented:", e);
        });
      }, 500);
      return () => clearTimeout(timeout);
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
    <div className="flex items-center gap-4 group">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
        preload="none"
        muted={!started}
      />
      <div className="flex flex-col text-right">
        <span className="font-bebas text-[9px] tracking-[0.4em] text-accent-gold uppercase leading-tight">
          Experience
        </span>
        <span className="font-playfair italic text-[10px] text-foreground/40 leading-tight">
          {isPlaying ? "Luxury Ambient" : "Muted"}
        </span>
      </div>
      <button 
        onClick={toggle}
        className={`p-3 rounded-full border transition-all duration-700 ${
          isPlaying 
            ? "bg-accent-blue/5 border-accent-gold/40 text-accent-gold shadow-[0_0_20px_rgba(197,160,89,0.25)]" 
            : "border-foreground/10 text-foreground/30 hover:border-accent-gold/40 hover:text-accent-gold"
        }`}
        aria-label={isPlaying ? "Mute" : "Unmute"}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
}
