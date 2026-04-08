"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MeditationPlayerProps {
  onClose: () => void;
  title: string;
  label?: string;
  audioUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export default function MeditationPlayer({ onClose, title, label = "Guided Meditation", audioUrl, imageUrl, videoUrl }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback audio if none provided (relaxing default track)
  const source = audioUrl || "https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Force reload when source changes
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [source]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const onMetadataLoaded = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 15);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-6"
    >
      <div className="absolute top-6 right-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white/50 hover:text-white hover:bg-white/10">
          <X size={24} />
        </Button>
      </div>

      <div className="max-w-md w-full space-y-10 text-center">
        {/* Cover Art Area */}
        <div className="relative group">
          <motion.div 
            animate={{ 
              rotate: isPlaying ? [0, 360] : 0,
              scale: isPlaying ? [1, 1.05, 1] : 1 
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-64 h-64 mx-auto rounded-full border-2 border-primary/20 p-2 relative"
          >
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-white/5">
              {videoUrl ? (
                <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
              ) : imageUrl ? (
                <img src={imageUrl} alt="Meditation" className="w-full h-full object-cover opacity-60" />
              ) : (
                <Music className="text-primary/40" size={64} />
              )}
              {/* Overlay Glow */}
              <div className="absolute inset-0 bg-radial-gradient from-primary/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
          
          <div className="absolute -top-4 -right-4 bg-primary/20 text-primary p-3 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Title & Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            <span>{label}</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">{title}</h2>
          <p className="text-slate-400 font-body text-sm italic">Find your inner stillness.</p>
        </div>

        {/* Audio Engine */}
        <audio 
          ref={audioRef} 
          src={source} 
          onTimeUpdate={onTimeUpdate} 
          onLoadedMetadata={onMetadataLoaded}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Slider 
              value={[progress]} 
              max={100} 
              step={0.1}
              onValueChange={(val) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = (val[0] / 100) * audioRef.current.duration;
                }
              }}
              className="[&>span]:bg-primary h-1.5"
            />
            <div className="flex justify-between text-[10px] font-medium text-slate-500 font-mono">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-white">
            <button onClick={skipBackward} className="text-white/40 hover:text-white transition-colors">
              <SkipBack size={28} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={skipForward} className="text-white/40 hover:text-white transition-colors">
              <SkipForward size={28} />
            </button>
          </div>

          <div className="flex items-center gap-4 px-12">
            <Volume2 size={16} className="text-slate-500" />
            <Slider defaultValue={[80]} max={100} className="h-1" onValueChange={(val) => {
              if (audioRef.current) audioRef.current.volume = val[0] / 100;
            }} />
          </div>
        </div>

        <p className="text-[10px] text-slate-600 font-body">
          Headphones recommended for spatial audio immersion.
        </p>
      </div>
    </motion.div>
  );
}
