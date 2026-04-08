"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Wind, 
  Brain, 
  BookOpen, 
  Music, 
  Flower2, 
  Moon,
  Lock 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import BreathingExercise from "@/components/dashboard/BreathingExercise";
import CBTJournal from "@/components/dashboard/CBTJournal";
import MeditationPlayer from "@/components/dashboard/MeditationPlayer";
import SleepPrep from "@/components/dashboard/SleepPrep";

import axios from "axios";

const categories = [
  { key: "all", label: "All" },
  { key: "breathing", label: "Breathing" },
  { key: "meditation", label: "Meditation" },
  { key: "journaling", label: "Journaling" },
];

const activities = [
  {
    icon: Wind,
    title: "Box Breathing",
    duration: "4 min",
    category: "breathing",
    description: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat to calm your nervous system.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Wind,
    title: "4-7-8 Relaxation",
    duration: "5 min",
    category: "breathing",
    description: "A powerful technique to reduce anxiety and help you fall asleep faster.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Brain,
    title: "Body Scan",
    duration: "10 min",
    category: "meditation",
    description: "Slowly scan through your body, releasing tension from head to toe.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    premium: true,
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-soft-ambient-166.mp3"
  },
  {
    icon: Brain,
    title: "Loving Kindness",
    duration: "8 min",
    category: "meditation",
    description: "Send warmth and compassion to yourself and others through guided meditation.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
  },
  {
    icon: Moon,
    title: "Relaxation Video",
    duration: "10 min",
    category: "meditation",
    description: "Watch calming visuals accompanied by soothing music to find center.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
  },
  {
    icon: BookOpen,
    title: "Gratitude Journal",
    duration: "5 min",
    category: "journaling",
    description: "Write down 3 things you're grateful for today. Shift your perspective.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: BookOpen,
    title: "Emotion Reflection",
    duration: "7 min",
    category: "journaling",
    description: "Explore what you're feeling and why. Gain clarity through writing.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Wind,
    title: "Sleep Prep",
    duration: "15 min",
    category: "breathing",
    description: "Multi-phase journey: Controlled breathing followed by deep-sleep audio.",
    image: "https://images.unsplash.com/photo-1543264421-2e6b22eb0ee7?auto=format&fit=crop&w=800&q=80",
    premium: true,
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-night-forest-651.mp3"
  },
  {
    icon: Music,
    title: "Relaxation Music",
    duration: "15 min",
    category: "meditation",
    label: "Relaxation Music",
    description: "Soothe your mind with calming ambient sounds designed for deep relaxation.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-delicate-piano-49.mp3"
  },
  {
    icon: Flower2,
    title: "Loving Music",
    duration: "10 min",
    category: "meditation",
    label: "Loving Music",
    description: "Connect with feelings of love and compassion through gentle melodic tones.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-sun-and-ocean-585.mp3"
  },
  {
    icon: Brain,
    title: "Meditation Guide",
    duration: "12 min",
    category: "meditation",
    label: "Guided Meditation",
    description: "A structured musical journey to help you maintain focus during your meditation.",
    image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-meditation-vibe-149.mp3"
  },
];

const quickActions = [
  { icon: Wind, label: "Quick Breathe", color: "bg-soft-green/20 text-soft-green" },
  { 
    icon: Music, 
    label: "Calm Sounds", 
    color: "bg-soft-blue/20 text-soft-blue",
    category: "meditation", // Treat as a meditation for player purposes
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
  },
  { icon: Flower2, label: "Mindful Pause", color: "bg-primary/15 text-primary" },
  { 
    icon: Moon, 
    label: "Sleep Prep", 
    color: "bg-sand text-sand-foreground",
    title: "Sleep Prep" 
  },
];

export default function ActivitiesPage() {
  const [tab, setTab] = useState("all");
  const [activeActivity, setActiveActivity] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const { data } = await axios.get(`${apiUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsPremium(data.data.isPremium);
      } catch (err) {
        console.error("Failed to fetch premium status:", err);
      }
    };
    fetchProfile();
  }, []);

  const filtered = tab === "all" ? activities : activities.filter((a) => a.category === tab);

  const handleMeditationComplete = async (title: string) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.post(`${apiUrl}/api/activities`, {
        type: "Meditation",
        duration: 8,
        status: "Completed",
        notes: `${title} session completed.`
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error("Failed to save activity:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AnimatePresence>
        {activeActivity?.title === "4-7-8 Relaxation" && (
          <BreathingExercise onClose={() => setActiveActivity(null)} type="4-7-8" />
        )}
        {activeActivity?.title === "Box Breathing" && (
          <BreathingExercise onClose={() => setActiveActivity(null)} type="box" />
        )}
        {activeActivity?.title === "Emotion Reflection" && (
          <CBTJournal onClose={() => setActiveActivity(null)} />
        )}
        {activeActivity?.category === "meditation" && (
          <MeditationPlayer 
            onClose={() => {
              handleMeditationComplete(activeActivity.title || activeActivity.label);
              setActiveActivity(null);
            }} 
            title={activeActivity.title || activeActivity.label}
            label={activeActivity.label}
            audioUrl={activeActivity.audioUrl}
            videoUrl={activeActivity.videoUrl}
          />
        )}
        {activeActivity?.title === "Sleep Prep" && (
          <SleepPrep onClose={() => setActiveActivity(null)} />
        )}
        {activeActivity?.label === "Quick Breathe" && (
          <BreathingExercise onClose={() => setActiveActivity(null)} type="4-7-8" />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Wellness Activities
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          Choose an activity to nurture your mind and body.
        </p>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {quickActions.map((qa) => (
          <button
            key={qa.label}
            onClick={() => setActiveActivity(qa)}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer ${qa.color}`}
          >
            <qa.icon size={22} />
            <span className="font-body text-sm font-medium">{qa.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-accent/50">
          {categories.map((c) => (
            <TabsTrigger key={c.key} value={c.key} className="font-body">
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-body text-xs font-medium text-foreground">
                        {a.duration}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <a.icon size={18} className="text-primary" />
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {a.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {a.description}
                    </p>
                    <Button
                      variant={a.premium && !isPremium ? "secondary" : "outline"}
                      className="w-full rounded-full font-body text-sm gap-2"
                      onClick={() => {
                        if (a.premium && !isPremium) {
                          router.push("/dashboard/premium");
                        } else {
                          setActiveActivity(a);
                        }
                      }}
                    >
                      {a.premium && !isPremium && <Lock size={14} />}
                      {a.premium && !isPremium ? "Unlock Premium" : "Start Activity"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
