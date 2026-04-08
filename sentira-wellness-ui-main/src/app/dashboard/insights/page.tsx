"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// Mappings
const MOOD_COLORS: Record<string, string> = {
  "Great": "hsl(147, 50%, 47%)",  // Green
  "Good": "hsl(147, 22%, 65%)",   // Soft Green
  "Okay": "hsl(210, 38%, 78%)",   // Blue/Gray
  "Bad": "hsl(30, 30%, 85%)",     // Sand
  "Very Bad": "hsl(0, 50%, 63%)", // Coral Red
};

export default function InsightsPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  
  // Chart Data States
  const [monthlyMood, setMonthlyMood] = useState<any[]>([]);
  const [emotionBreakdown, setEmotionBreakdown] = useState<any[]>([]);
  const [activityCompletion, setActivityCompletion] = useState<any[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        // Fetch parallel data from MERN backend
        const [analyticsRes, logsRes] = await Promise.all([
          axios.get(`${apiUrl}/api/analytics/summary`, { headers }),
          axios.get(`${apiUrl}/api/mood-logs`, { headers })
        ]);

        const dbSummary = analyticsRes.data.data;
        const dbLogs = logsRes.data.data;

        setSummary(dbSummary);

        // 1. Map Monthly Mood Trend (from dbSummary.moodTrends)
        const mappedMood = (dbSummary.moodTrends || []).map((t: any) => ({
          date: new Date(t._id).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          avg: Number(t.avgMood.toFixed(1))
        }));
        setMonthlyMood(mappedMood);

        // 2. Map Emotion Breakdown from raw logs
        const emotionCount: Record<string, number> = {
          "Great": 0, "Good": 0, "Okay": 0, "Bad": 0, "Very Bad": 0
        };
        dbLogs.forEach((log: any) => {
          if (log.moodScore >= 9) emotionCount["Great"]++;
          else if (log.moodScore >= 7) emotionCount["Good"]++;
          else if (log.moodScore >= 5) emotionCount["Okay"]++;
          else if (log.moodScore >= 3) emotionCount["Bad"]++;
          else emotionCount["Very Bad"]++;
        });

        const mappedEmotions = Object.keys(emotionCount)
          .filter(k => emotionCount[k] > 0)
          .map(key => ({
            name: key,
            value: emotionCount[key],
            color: MOOD_COLORS[key] || "hsl(210, 38%, 78%)"
          }));
        setEmotionBreakdown(mappedEmotions);

        // 3. Map Activity/Goal Progress
        const mappedActivities = (dbSummary.goalProgress || []).map((g: any) => ({
          activity: g._id,
          count: g.count
        }));
        setActivityCompletion(mappedActivities);

      } catch (err) {
        console.error("Failed to load insights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
         <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
         <p className="font-body text-slate-500 animate-pulse">Running advanced analytics engine...</p>
      </div>
    );
  }

  // Derived Stats
  const totalLogs = summary?.moodTrends?.length || 0;
  const recentAvg = monthlyMood.length > 0 ? monthlyMood[monthlyMood.length - 1].avg : 0;
  const oldAvg = monthlyMood.length > 1 ? monthlyMood[monthlyMood.length - 2].avg : recentAvg;
  const moodDiff = recentAvg - oldAvg;

  const percentageChange = oldAvg > 0 ? ((recentAvg - oldAvg) / oldAvg) * 100 : 0;
  const isImproved = percentageChange > 0;
  const bannerSentence = isImproved 
    ? `Your mood has improved by ${percentageChange.toFixed(0)}% this week! Keep it up! 🚀`
    : percentageChange < 0 
      ? `Your mood decreased by ${Math.abs(percentageChange).toFixed(0)}% this week. Be gentle with yourself. 🌿`
      : `Your mood is perfectly consistent this week. Steady progress! ⭐`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Insights & Analytics
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          Understand your emotional patterns and track your wellness progress.
        </p>
      </motion.div>

      {/* Mood Percentage Banner */}
      {monthlyMood.length > 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className={`p-4 rounded-xl border ${isImproved ? 'bg-soft-green/10 border-soft-green/30 text-soft-green' : 'bg-primary/10 border-primary/30 text-primary'} flex items-center gap-3 mb-2`}>
            {isImproved ? <TrendingUp size={24} /> : <TrendingUp size={24} className={percentageChange < 0 ? "rotate-45" : ""} />}
            <span className="font-display font-semibold sm:text-lg">{bannerSentence}</span>
          </div>
        </motion.div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: TrendingUp,
            label: "Mood Trend",
            value: moodDiff > 0 ? `+${moodDiff.toFixed(1)}` : moodDiff.toFixed(1),
            sub: "vs previous log",
            positive: moodDiff >= 0,
          },
          {
            icon: Calendar,
            label: "Check-in Days",
            value: totalLogs.toString(),
            sub: "unique days",
            positive: true,
          },
          {
            icon: Target,
            label: "Goal Progress",
            value: (summary?.goalProgress?.reduce((acc: number, cur: any) => acc + cur.count, 0) || 0).toString(),
            sub: "total active items",
            positive: true,
          },
          {
            icon: Award,
            label: "Top Trigger",
            value: summary?.commonTriggers?.[0]?._id || "None",
            sub: "most frequent event",
            positive: true,
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <s.icon size={18} className="text-primary" />
                  {s.positive ? (
                    <ArrowUpRight size={16} className="text-soft-green" />
                  ) : (
                    <ArrowDownRight size={16} className="text-destructive" />
                  )}
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground truncate">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground">{s.label}</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1 truncate">{s.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly mood trend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">Your Mood Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyMood.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={monthlyMood}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontFamily: "Inter", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[240px] text-slate-400 text-sm">Not enough data to graph timeline.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Emotion breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display text-lg">Emotion Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {emotionBreakdown.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={emotionBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {emotionBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontFamily: "Inter", fontSize: "12px" }} />
                    <Legend
                      formatter={(value) => (
                        <span className="font-body text-xs text-foreground">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[240px] text-slate-400 text-sm">Log some moods to see your breakdown!</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Goal completion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Wellness Goal Status</CardTitle>
            </CardHeader>
            <CardContent>
              {activityCompletion.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={activityCompletion}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="activity" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontFamily: "Inter", fontSize: "12px" }} />
                    <Bar dataKey="count" name="Total Goals" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[220px] text-slate-400 text-sm">No goal data available yet.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
