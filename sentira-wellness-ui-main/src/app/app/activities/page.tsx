"use client";
import { useState } from "react";
import Image from "next/image";
import { Wind, Brain, BookOpen, Music, Flower2, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import breathingImg from "@/assets/activity-breathing.jpg";
import meditationImg from "@/assets/activity-meditation.jpg";
import journalingImg from "@/assets/activity-journaling.jpg";

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
    image: breathingImg,
  },
  {
    icon: Wind,
    title: "4-7-8 Relaxation",
    duration: "5 min",
    category: "breathing",
    description: "A powerful technique to reduce anxiety and help you fall asleep faster.",
    image: breathingImg,
  },
  {
    icon: Brain,
    title: "Body Scan",
    duration: "10 min",
    category: "meditation",
    description: "Slowly scan through your body, releasing tension from head to toe.",
    image: meditationImg,
  },
  {
    icon: Brain,
    title: "Loving Kindness",
    duration: "8 min",
    category: "meditation",
    description: "Send warmth and compassion to yourself and others through guided meditation.",
    image: meditationImg,
  },
  {
    icon: BookOpen,
    title: "Gratitude Journal",
    duration: "5 min",
    category: "journaling",
    description: "Write down 3 things you're grateful for today. Shift your perspective.",
    image: journalingImg,
  },
  {
    icon: BookOpen,
    title: "Emotion Reflection",
    duration: "7 min",
    category: "journaling",
    description: "Explore what you're feeling and why. Gain clarity through writing.",
    image: journalingImg,
  },
];

const quickActions = [
  { icon: Wind, label: "Quick Breathe", color: "bg-soft-green/20 text-soft-green" },
  { icon: Music, label: "Calm Sounds", color: "bg-soft-blue/20 text-soft-blue" },
  { icon: Flower2, label: "Mindful Pause", color: "bg-primary/15 text-primary" },
  { icon: Moon, label: "Sleep Prep", color: "bg-sand text-sand-foreground" },
];

export default function ActivitiesPage() {
  const [tab, setTab] = useState("all");
  const { toast } = useToast();

  const filtered = tab === "all" ? activities : activities.filter((a) => a.category === tab);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
            onClick={() =>
              toast({ title: `Starting ${qa.label}...`, description: "Feature coming soon!" })
            }
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
                      variant="outline"
                      className="w-full rounded-full font-body text-sm"
                      onClick={() =>
                        toast({
                          title: `Starting ${a.title} 🌿`,
                          description: "Activity will be available soon!",
                        })
                      }
                    >
                      Start Activity
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
