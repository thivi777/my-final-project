"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Info, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface BreathingExerciseProps {
  onClose: () => void;
  onComplete?: () => void;
  type?: "4-7-8" | "box";
  maxCycles?: number;
}

export default function BreathingExercise({ 
  onClose, 
  onComplete,
  type = "4-7-8", 
  maxCycles = 4 
}: BreathingExerciseProps) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "ready">("ready");
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const speak = (text: string) => {
    if (isMuted || typeof window === "undefined" || !window.speechSynthesis) return;
    // Cancel existing speech to prevent overlapping
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6; // Much slower for relaxation
    utterance.pitch = 0.9; // Slightly lower pitch for a calmer tone
    window.speechSynthesis.speak(utterance);
  };

  // 4-7-8 Timing (seconds)
  const timings = {
    inhale: 4,
    hold: 7,
    exhale: 8,
  };

  useEffect(() => {
    if (cycle === maxCycles) {
      // Auto-save completion
      const saveActivity = async () => {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          await axios.post(`${apiUrl}/api/activities`, {
            type: "Deep Breathing",
            duration: 5,
            status: "Completed",
            notes: `${type} session completed.`
          }, { headers: { Authorization: `Bearer ${token}` } });
          
          if (onComplete) onComplete();
        } catch (err) {
          console.error("Failed to save activity:", err);
          if (onComplete) onComplete();
        }
      };
      saveActivity();
    }
  }, [cycle, maxCycles]);

  useEffect(() => {
    if (phase === "ready") return;

    let duration = timings[phase as keyof typeof timings];
    let start = Date.now();
    
    const interval = setInterval(() => {
      let elapsed = (Date.now() - start) / 1000;
      let p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);
        if (phase === "inhale") setPhase("hold");
        else if (phase === "hold") setPhase("exhale");
        else {
          setPhase("inhale");
          setCycle((c) => c + 1);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  const startExercise = () => {
    setPhase("inhale");
    setCycle(1);
  };

  const currentLabel = {
    ready: "Find a comfortable position",
    inhale: "Inhale slowly...",
    hold: "Pause and focus...",
    exhale: "Exhale fully...",
  }[phase];

  useEffect(() => {
    if (phase === "inhale") speak("Breathe in slowly");
    else if (phase === "hold") speak("Pause and focus");
    else if (phase === "exhale") speak("Exhale fully");
  }, [phase, isMuted]);

  useEffect(() => {
    // Stop speech when component unmounts
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl"
    >
      {/* Background Music */}
      {!isMuted && phase !== "ready" && (
        <audio 
          autoPlay 
          loop 
          src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3" 
          ref={(audio) => { if (audio) audio.volume = 0.3; }}
        />
      )}

      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMuted(!isMuted)} 
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-full"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-full"
        >
          <X size={24} />
        </Button>
      </div>

      <div className="max-w-md w-full px-6 text-center space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">
            {type === "4-7-8" ? "4-7-8 Relaxation" : "Box Breathing"}
          </h2>
          <p className="text-teal-400 font-medium tracking-wide uppercase text-xs">
            Cycle {cycle || 0} • {currentLabel}
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center h-64">
          {/* Background Pulse */}
          <AnimatePresence>
            {phase !== "ready" && (
              <motion.div
                key="pulse"
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{ 
                  scale: phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 0.8,
                  opacity: phase === "exhale" ? 0.1 : 0.3
                }}
                transition={{ duration: phase === "hold" ? 0 : timings[phase as keyof typeof timings], ease: "linear" }}
                className="absolute w-40 h-40 rounded-full bg-teal-500/20 blur-3xl"
              />
            )}
          </AnimatePresence>

          {/* Main Circle */}
          <motion.div
            animate={{
              scale: phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 0.9,
            }}
            transition={{ 
              duration: phase === "hold" ? 0 : timings[phase as keyof typeof timings], 
              ease: "easeInOut" 
            }}
            className="w-48 h-48 rounded-full border-2 border-teal-500 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-teal-500/10" />
            
            {/* Liquid Fill Effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-teal-500/30"
              initial={{ height: "0%" }}
              animate={{ 
                height: phase === "inhale" ? "100%" : phase === "hold" ? "100%" : "0%"
              }}
              transition={{ duration: timings[phase as keyof typeof timings], ease: "linear" }}
            />

            <Wind className="text-teal-400 relative z-10 w-12 h-12" />
          </motion.div>
        </div>

        <div className="space-y-6">
          {phase === "ready" ? (
            <Button 
              onClick={startExercise} 
              size="lg" 
              className="w-full bg-teal-600 hover:bg-teal-500 text-white rounded-full h-14 text-lg font-medium shadow-xl shadow-teal-900/20"
            >
              Begin Session
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-teal-500" 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-white/40 text-sm font-body">Focus on your breath. Keep your shoulders relaxed.</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white/5 rounded-2xl p-4 flex gap-3 text-left border border-white/10">
          <Info className="text-teal-500 shrink-0 mt-0.5" size={18} />
          <p className="text-white/60 text-xs leading-relaxed">
            The 4-7-8 technique is a biological hacking method that forces the nervous system into a state of calm by controlling the carbon dioxide levels in the blood.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
