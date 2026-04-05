"use client";

import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";
import s from "./MoodLogger.module.scss";

// Predefined mood options mapped to scores (1-10)
const MOOD_OPTIONS = [
  { emoji: "😢", label: "Very Bad", score: 2 },
  { emoji: "🙁", label: "Bad", score: 4 },
  { emoji: "😐", label: "Okay", score: 6 },
  { emoji: "🙂", label: "Good", score: 8 },
  { emoji: "😄", label: "Great", score: 10 },
];

const PRESET_TAGS = ["Work", "Family", "Health", "Social", "Finance", "Sleep", "Exercise"];

interface MoodLoggerProps {
  onLogSaved?: (score: number, label: string) => void;
}

export default function MoodLogger({ onLogSaved }: MoodLoggerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [trigger, setTrigger] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) {
      toast({ title: "Please select a mood", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const moodData = MOOD_OPTIONS[selectedMood];
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      await axios.post(
        `${apiUrl}/api/mood-logs`,
        {
          moodScore: moodData.score,
          moodEmoji: moodData.emoji,
          tags: selectedTags,
          trigger: trigger || undefined,
          note: note || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Mood logged successfully! 🌿",
        description: "Your emotional state has been securely saved.",
      });

      // Reset form
      setSelectedMood(null);
      setSelectedTags([]);
      setTrigger("");
      setNote("");

      // Trigger re-fetch and automatic activities in parent component if provided
      if (onLogSaved) onLogSaved(moodData.score, moodData.label);
    } catch (err: any) {
      toast({
        title: "Failed to save mood log",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.moodLogger}>
      <div className={s.header}>
        <h3>How are you feeling right now?</h3>
        <p>Log your current emotion to track your wellness journey.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={s.emojiSelector}>
          {MOOD_OPTIONS.map((mood, idx) => (
            <button
              key={mood.score}
              type="button"
              className={`${s.emojiBtn} ${selectedMood === idx ? s.selected : ""}`}
              onClick={() => setSelectedMood(idx)}
            >
              <span className={s.emoji}>{mood.emoji}</span>
              <span className={s.label}>{mood.label}</span>
            </button>
          ))}
        </div>

        <div className={s.formFields}>
          <div className={s.field}>
            <label>What's affecting your mood? (Select tags)</label>
            <div className={s.tagsContainer}>
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${s.tag} ${selectedTags.includes(tag) ? s.selected : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={s.field}>
            <label>Specific Trigger (Optional)</label>
            <input
              type="text"
              className={s.input}
              placeholder="e.g. Big presentation, Argument with friend"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
            />
          </div>

          <div className={s.field}>
            <label>Notes / Journal (Optional)</label>
            <textarea
              className={s.textarea}
              placeholder="Jot down a few thoughts about how you're feeling..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <button type="submit" className={s.submitBtn} disabled={isSubmitting || selectedMood === null}>
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
          {isSubmitting ? "Saving Log..." : "Save Mood Log"}
        </button>
      </form>
    </div>
  );
}
