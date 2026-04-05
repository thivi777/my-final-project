"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import MoodLogger from "@/components/dashboard/MoodLogger";
import WellnessSuggestion from "@/components/dashboard/WellnessSuggestion";
import BreathingExercise from "@/components/dashboard/BreathingExercise";
import CBTJournal from "@/components/dashboard/CBTJournal";

export default function MoodPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [activeActivity, setActiveActivity] = useState<"breathing" | "journaling" | null>(null);
  const [lastLoggedMood, setLastLoggedMood] = useState<{score: number, label: string} | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/mood-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedLogs = res.data.data;
      setLogs(fetchedLogs);

      // Simple processing to get the last 7 days of averages
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const chartData: any = {};
      
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        chartData[d.toDateString()] = { day: days[d.getDay()], score: 0, count: 0 };
      }

      fetchedLogs.forEach((log: any) => {
        const d = new Date(log.createdAt).toDateString();
        if (chartData[d]) {
          chartData[d].score += log.moodScore;
          chartData[d].count += 1;
        }
      });

      const finalWeeklyData = Object.values(chartData).map((d: any) => ({
        day: d.day,
        score: d.count > 0 ? Number((d.score / d.count).toFixed(1)) : 0
      }));

      setWeeklyData(finalWeeklyData);
    } catch (err) {
      console.error("Failed to fetch mood logs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleMoodSaved = (score: number, label: string) => {
    fetchLogs();
    setLastLoggedMood({ score, label });
    
    // Automatic triggering based on score
    if (score <= 4) {
      // Very Bad/Bad: Automatic Breathing
      setTimeout(() => setActiveActivity("breathing"), 1000);
    } else if (score <= 6) {
      // Bad/Okay: Automatic Journaling
      setTimeout(() => setActiveActivity("journaling"), 1000);
    }
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center min-h-[50vh]">
         <div className="animate-pulse font-body text-primary">Loading your wellness journey...</div>
       </div>
     )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <WellnessSuggestion 
        isVisible={showSuggestion}
        onClose={() => setShowSuggestion(false)}
        moodLabel={lastLoggedMood?.label || "sad"}
        onStartActivity={(type) => {
          setShowSuggestion(false);
          setActiveActivity(type);
        }}
      />

      <AnimatePresence>
        {activeActivity === "breathing" && (
          <BreathingExercise onClose={() => setActiveActivity(null)} type="4-7-8" />
        )}
        {activeActivity === "journaling" && (
          <CBTJournal onClose={() => setActiveActivity(null)} />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Detailed Mood Tracker
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          How are you feeling right now? Select your emotion, add context, and track your emotional wellness.
        </p>
      </motion.div>

      {/* Mood Logger Component */}
      <MoodLogger onLogSaved={handleMoodSaved} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">Last 7 Days Trend</CardTitle>
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
              <CardTitle className="font-display text-lg">Your Recent Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {logs.length > 0 ? (
                logs.slice(0, 15).map((log: any) => (
                  <div
                    key={log._id}
                    className="flex flex-col gap-1 p-3 rounded-xl bg-accent/30 border border-border/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" title={'Score: ' + log.moodScore}>{log.moodEmoji || '🌱'}</span>
                        <div className="flex gap-1 flex-wrap">
                          {log.tags && log.tags.map((t: string) => (
                            <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-semibold uppercase">{t}</span>
                          ))}
                        </div>
                      </div>
                      <span className="font-body text-[10px] text-muted-foreground font-medium">
                        {new Date(log.createdAt).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {(log.note || log.trigger) && (
                      <div className="mt-2 space-y-1">
                        {log.trigger && <p className="font-body text-xs text-foreground font-medium"><span className="text-destructive/80">Trigger:</span> {log.trigger}</p>}
                        {log.note && <p className="font-body text-xs text-muted-foreground italic">"{log.note}"</p>}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="font-body text-sm text-muted-foreground text-center py-6">
                  No mood logs yet. Start tracking your journey above! 🌅
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
