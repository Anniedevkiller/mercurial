"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Attempt autoplay, catch if blocked
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        if (!isPlaying) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="pointer-events-auto flex items-center justify-center">
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_aa8ed52093.mp3?filename=smooth-jazz-piano-12-16629.mp3" 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={toggleMute}
        className="w-10 h-10 rounded-full border border-light-yellow/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-light-yellow hover:bg-light-yellow/20 hover:scale-105 transition-all duration-300"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
