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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

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
    image: "/images/activity-breathing.jpg",
  },
  {
    icon: Wind,
    title: "4-7-8 Relaxation",
    duration: "5 min",
    category: "breathing",
    description: "A powerful technique to reduce anxiety and help you fall asleep faster.",
    image: "/images/sleep.jpg",
  },
  {
    icon: Brain,
    title: "Body Scan",
    duration: "10 min",
    category: "meditation",
    description: "Slowly scan through your body, releasing tension from head to toe.",
    image: "/images/activity-meditation.jpg",
    premium: true,
    audioUrl: "https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg"
  },
  {
    icon: Brain,
    title: "Loving Kindness",
    duration: "8 min",
    category: "meditation",
    description: "Send warmth and compassion to yourself and others through guided meditation.",
    image: "/images/meditation .jpg",
    audioUrl: "https://actions.google.com/sounds/v1/ambient/morning_forest.ogg"
  },
  {
    icon: Moon,
    title: "Relaxation Video",
    duration: "10 min",
    category: "meditation",
    description: "Watch calming visuals accompanied by soothing music to find center.",
    image: "/images/sleep2.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4",
    audioUrl: "https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg"
  },
  {
    icon: BookOpen,
    title: "Gratitude Journal",
    duration: "5 min",
    category: "journaling",
    description: "Write down 3 things you're grateful for today. Shift your perspective.",
    image: "/images/activity-journaling.jpg",
  },
  {
    icon: BookOpen,
    title: "Emotion Reflection",
    duration: "7 min",
    category: "journaling",
    description: "Explore what you're feeling and why. Gain clarity through writing.",
    image: "/images/journal.jpg",
  },
  {
    icon: Wind,
    title: "Sleep Prep",
    duration: "15 min",
    category: "breathing",
    description: "Multi-phase journey: Controlled breathing followed by deep-sleep audio.",
    image: "/images/sleep.jpg",
    premium: true,
    audioUrl: "https://actions.google.com/sounds/v1/weather/light_rain_on_leaves.ogg"
  },
  {
    icon: Music,
    title: "Relaxation Music",
    duration: "15 min",
    category: "meditation",
    label: "Relaxation Music",
    description: "Soothe your mind with calming ambient sounds designed for deep relaxation.",
    image: "/images/hero-1.jpg",
    premium: true,
    audioUrl: "https://actions.google.com/sounds/v1/ambient/ocean_waves.ogg"
  },
  {
    icon: Flower2,
    title: "Loving Music",
    duration: "10 min",
    category: "meditation",
    label: "Loving Music",
    description: "Connect with feelings of love and compassion through gentle melodic tones.",
    image: "/images/df62de4b52fcdde3bb5a8bc4c3b674df.jpg",
    premium: true,
    audioUrl: "https://actions.google.com/sounds/v1/hum/light_fan_white_noise.ogg"
  },
  {
    icon: Brain,
    title: "Meditation Guide",
    duration: "12 min",
    category: "meditation",
    label: "Guided Meditation",
    description: "A structured musical journey to help you maintain focus during your meditation.",
    image: "/images/9fff570c833e6e328ef6eb6719fdc2b9.jpg",
    premium: true,
    audioUrl: "https://actions.google.com/sounds/v1/water/lake_waves_lapping_shore.ogg"
  },
];

const quickActions = [
  { icon: Wind, label: "Quick Breathe", color: "bg-soft-green/20 text-soft-green" },
  { 
    icon: Music, 
    label: "Calm Sounds", 
    color: "bg-soft-blue/20 text-soft-blue",
    category: "meditation", // Treat as a meditation for player purposes
    audioUrl: "https://actions.google.com/sounds/v1/ambient/soft_wind_with_chimes.ogg"
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
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment_success");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const { data } = await axios.get(`${apiUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsPremium(data.data.isPremium);
      return data.data.isPremium;
    } catch (err) {
      console.error("Failed to fetch premium status:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();

    if (paymentSuccess === "true") {
      toast.success("Welcome to Sentira Plus! Your premium features are unlocking...", {
        duration: 5000,
        icon: "✨"
      });
      
      // Re-fetch every 2 seconds for 10 seconds to catch the webhook update
      let attempts = 0;
      const interval = setInterval(async () => {
        const premium = await fetchProfile();
        attempts++;
        if (premium || attempts > 5) {
          clearInterval(interval);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [paymentSuccess]);

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
            key={activeActivity.title || activeActivity.label}
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
