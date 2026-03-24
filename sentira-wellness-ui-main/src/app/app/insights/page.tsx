"use client";
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
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

const monthlyMood = [
  { week: "Week 1", avg: 6.5 },
  { week: "Week 2", avg: 7.2 },
  { week: "Week 3", avg: 6.8 },
  { week: "Week 4", avg: 8.1 },
];

const emotionBreakdown = [
  { name: "Happy", value: 35, color: "hsl(147, 22%, 65%)" },
  { name: "Calm", value: 25, color: "hsl(161, 93%, 30%)" },
  { name: "Neutral", value: 20, color: "hsl(210, 38%, 78%)" },
  { name: "Anxious", value: 12, color: "hsl(30, 30%, 85%)" },
  { name: "Sad", value: 8, color: "hsl(0, 0%, 63%)" },
];

const activityCompletion = [
  { activity: "Breathing", completed: 18, total: 21 },
  { activity: "Meditation", completed: 12, total: 21 },
  { activity: "Journaling", completed: 15, total: 21 },
  { activity: "Check-ins", completed: 20, total: 21 },
];

export default function InsightsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Insights & Analytics
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          Understand your emotional patterns and track your wellness progress.
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: TrendingUp,
            label: "Mood Trend",
            value: "+12%",
            sub: "vs last month",
            positive: true,
          },
          {
            icon: Calendar,
            label: "Active Days",
            value: "26/30",
            sub: "this month",
            positive: true,
          },
          {
            icon: Target,
            label: "Goal Streak",
            value: "7 days",
            sub: "current",
            positive: true,
          },
          {
            icon: Award,
            label: "Best Day",
            value: "Friday",
            sub: "highest mood",
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
                <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground">{s.label}</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1">{s.sub}</p>
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
              <CardTitle className="font-display text-lg">Monthly Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyMood}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontFamily: "Inter", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity completion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Activity Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={activityCompletion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="activity" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontFamily: "Inter", fontSize: "12px" }} />
                  <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="total" name="Target" fill="hsl(var(--border))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
