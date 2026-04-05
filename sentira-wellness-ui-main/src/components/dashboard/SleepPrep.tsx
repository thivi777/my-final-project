"use client";

import { useState } from "react";
import BreathingExercise from "./BreathingExercise";
import MeditationPlayer from "./MeditationPlayer";
import { motion, AnimatePresence } from "framer-motion";

interface SleepPrepProps {
  onClose: () => void;
}

export default function SleepPrep({ onClose }: SleepPrepProps) {
  const [phase, setPhase] = useState<"breathing" | "meditation">("breathing");

  return (
    <div className="fixed inset-0 z-50">
      <AnimatePresence mode="wait">
        {phase === "breathing" ? (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <div className="absolute top-10 w-full text-center z-[60] px-6">
              <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20">
                Phase 1: Body Relaxation
              </span>
            </div>
            <BreathingExercise 
              onClose={onClose} 
              type="4-7-8" 
              maxCycles={2} // Shortened for demo/flow
              onComplete={() => setPhase("meditation")} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="meditation"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full"
          >
            <div className="absolute top-10 w-full text-center z-[60] px-6">
              <span className="bg-soft-blue/20 text-soft-blue px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-soft-blue/20">
                Phase 2: Deep Sleep Drift
              </span>
            </div>
            <MeditationPlayer 
              onClose={onClose} 
              title="Sleep Drift Meditation" 
              audioUrl="https://assets.mixkit.co/music/preview/mixkit-night-forest-651.mp3"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
