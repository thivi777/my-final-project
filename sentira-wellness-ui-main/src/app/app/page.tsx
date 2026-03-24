"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Flame,
  CalendarCheck,
  Leaf,
  CheckCircle2,
  Circle,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const moodData = [
  { day: "Mon", mood: 7 },
  { day: "Tue", mood: 5 },
  { day: "Wed", mood: 8 },
  { day: "Thu", mood: 6 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 7 },
  { day: "Sun", mood: 8 },
];

const tasks = [
  { label: "Morning breathing exercise", done: true },
  { label: "Write 3 gratitude items", done: true },
  { label: "5-min guided meditation", done: false },
  { label: "Evening mood check-in", done: false },
];

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [affirmation, setAffirmation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, analyticsRes, affirmationRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/profile", { headers }),
          axios.get("http://localhost:5000/api/analytics/summary", { headers }),
          axios.get("http://localhost:5000/api/affirmations/random", { headers }),
        ]);

        setUser(profileRes.data.data);
        setAnalytics(analyticsRes.data.data);
        setAffirmation(affirmationRes.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-body text-muted-foreground animate-pulse">Nurturing your dashboard...</p>
        </div>
      </div>
    );
  }

  const moods = [
    { icon: Smile, label: "Happy", color: "bg-soft-green/20 text-soft-green border-soft-green/40", score: 9 },
    { icon: Meh, label: "Okay", color: "bg-soft-blue/20 text-soft-blue border-soft-blue/40", score: 6 },
    { icon: Frown, label: "Sad", color: "bg-sand text-sand-foreground border-sand-foreground/20", score: 3 },
  ];

  const handleMoodClick = async (label: string, score: number) => {
    setSelectedMood(label);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/mood-logs",
        { score, tags: [label.toLowerCase()] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh analytics to show the new data point
      const analyticsRes = await axios.get("http://localhost:5000/api/analytics/summary", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setAnalytics(analyticsRes.data.data);
    } catch (err) {
      console.error("Failed to log mood:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Good morning, {user?.name?.split(" ")[0] || "Friend"}! 🌿
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          Here's your wellness overview for today.
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: "Streak", value: `${analytics?.streakCount || 0} days`, accent: "text-destructive" },
          { icon: CalendarCheck, label: "Check-ins", value: (analytics?.totalMoodLogs || 0).toString(), accent: "text-primary" },
          { icon: TrendingUp, label: "Avg. Mood", value: `${analytics?.averageMood?.toFixed(1) || 0}/10`, accent: "text-soft-green" },
          { icon: Leaf, label: "Activities", value: (analytics?.completedActivities || 0).toString(), accent: "text-accent-foreground" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-accent ${stat.accent}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood check-in */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">How are you feeling?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => handleMoodClick(m.label, m.score)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      m.color
                    } ${
                      selectedMood === m.label
                        ? "ring-2 ring-primary scale-105"
                        : "border-transparent hover:scale-105"
                    }`}
                  >
                    <m.icon size={36} />
                    <span className="font-body text-sm font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
              {selectedMood && (
                <p className="font-body text-sm text-primary text-center mt-4 font-medium">
                  You selected: {selectedMood} ✓
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily reminder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                <Bell size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Daily Reminder
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  "{affirmation?.text || "Take a moment to pause, breathe, and check in with yourself. Your emotions matter. 🌿"}"
                </p>
                <span className="inline-block font-body text-xs text-primary font-medium">
                  Daily Wisdom
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg">Today's Wellness Tasks</CardTitle>
                <span className="font-body text-xs text-primary font-semibold">
                  {analytics?.activeGoals?.filter((g: any) => g.status === "Completed").length || 0}/
                  {analytics?.activeGoals?.length || 0} done
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress 
                value={analytics?.activeGoals?.length > 0 ? (analytics.activeGoals.filter((g: any) => g.status === "Completed").length / analytics.activeGoals.length) * 100 : 0} 
                className="h-2 bg-muted [&>div]:bg-primary" 
              />
              <div className="space-y-3">
                {analytics?.activeGoals?.length > 0 ? (
                  analytics.activeGoals.map((t: any) => (
                    <div key={t._id} className="flex items-center gap-3">
                      {t.status === "Completed" ? (
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                      ) : (
                        <Circle size={18} className="text-muted-foreground/40 shrink-0" />
                      )}
                      <span
                        className={`font-body text-sm ${
                          t.status === "Completed" ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="font-body text-sm text-muted-foreground italic">No active goals for today. Time to set some! 🌸</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly trend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">Weekly Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analytics?.moodTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fontFamily: "Inter", fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 12, fontFamily: "Inter", fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      fontFamily: "Inter",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
