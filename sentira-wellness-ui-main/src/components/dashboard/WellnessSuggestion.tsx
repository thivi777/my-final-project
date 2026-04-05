"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wind, BookOpen, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WellnessSuggestionProps {
  isVisible: boolean;
  onClose: () => void;
  onStartActivity: (type: "breathing" | "journaling") => void;
  moodLabel: string;
}

export default function WellnessSuggestion({ 
  isVisible, 
  onClose, 
  onStartActivity,
  moodLabel 
}: WellnessSuggestionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-card/60 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-primary font-medium text-sm bg-primary/10 px-3 py-1 rounded-full">
                <Sparkles size={14} />
                <span>Wellness Assistant</span>
              </div>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-bold text-foreground">
                Rough moment? We're here. 🌿
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                It looks like you're feeling a bit <span className="text-foreground font-semibold uppercase text-xs tracking-wider">{moodLabel}</span>. Sometimes a quick reset can help shift your perspective.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              <Button 
                onClick={() => onStartActivity("breathing")}
                className="w-full bg-soft-green hover:bg-soft-green/90 text-soft-green-foreground justify-between group h-12 rounded-2xl"
              >
                <span className="flex items-center gap-2">
                  <Wind size={18} />
                  Calm your breath (4-7-8)
                </span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </Button>
              
              <Button 
                onClick={() => onStartActivity("journaling")}
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5 text-primary justify-between group h-12 rounded-2xl"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={18} />
                  Reframing Journal
                </span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </Button>
            </div>
            
            <p className="text-[10px] text-center text-muted-foreground italic">
              Takes less than 5 minutes to feel better.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
