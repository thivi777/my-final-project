"use client";
import { useState } from "react";
import { Smile, Meh, Frown, Angry, Heart, Zap, CloudRain, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const emotions = [
  { icon: Smile, label: "Happy", color: "bg-soft-green/20 text-soft-green" },
  { icon: Heart, label: "Grateful", color: "bg-primary/20 text-primary" },
  { icon: Sun, label: "Calm", color: "bg-accent text-accent-foreground" },
  { icon: Zap, label: "Energized", color: "bg-soft-blue/20 text-soft-blue" },
  { icon: Meh, label: "Neutral", color: "bg-muted/30 text-muted-foreground" },
  { icon: CloudRain, label: "Anxious", color: "bg-sand text-sand-foreground" },
  { icon: Frown, label: "Sad", color: "bg-soft-blue/30 text-soft-blue" },
  { icon: Angry, label: "Frustrated", color: "bg-destructive/15 text-destructive" },
];

const weeklyData = [
  { day: "Mon", score: 8 },
  { day: "Tue", score: 6 },
  { day: "Wed", score: 7 },
  { day: "Thu", score: 5 },
  { day: "Fri", score: 9 },
  { day: "Sat", score: 8 },
  { day: "Sun", score: 7 },
];

const recentEntries = [
  { date: "Today, 9:30 AM", emotion: "Happy", note: "Had a great morning walk 🌅" },
  { date: "Yesterday, 8:15 PM", emotion: "Calm", note: "Evening meditation was wonderful" },
  { date: "Yesterday, 12:00 PM", emotion: "Energized", note: "Productive work session" },
  { date: "Mar 5, 7:00 AM", emotion: "Grateful", note: "Beautiful sunrise, feeling blessed" },
];

export default function MoodPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleLog = () => {
    if (!selected) return;
    toast({
      title: "Mood logged! 🌿",
      description: `You're feeling ${selected}. Keep tracking your journey!`,
    });
    setSelected(null);
    setNote("");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Mood Tracker
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          How are you feeling right now? Select your emotion and add a note.
        </p>
      </motion.div>

      {/* Emotion picker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Select Your Emotion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {emotions.map((e) => (
                <button
                  key={e.label}
                  onClick={() => setSelected(e.label)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all cursor-pointer ${
                    e.color
                  } ${
                    selected === e.label
                      ? "ring-2 ring-primary scale-105 shadow-md"
                      : "hover:scale-105"
                  }`}
                >
                  <e.icon size={28} />
                  <span className="font-body text-[10px] font-medium">{e.label}</span>
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Add a note about how you're feeling... (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="font-body resize-none"
              rows={3}
            />

            <Button
              onClick={handleLog}
              disabled={!selected}
              className="rounded-full px-8 font-body font-semibold"
            >
              Log Mood
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">This Week's Mood</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fontFamily: "Inter", fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      fontFamily: "Inter",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent entries */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEntries.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 border border-border/30"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-sm font-semibold text-foreground">
                        {entry.emotion}
                      </span>
                      <span className="font-body text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground">{entry.note}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
