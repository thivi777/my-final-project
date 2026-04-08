"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Smile, Meh, Frown, Sparkles, Activity, CheckCircle2, Circle, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import WellnessSuggestion from "@/components/dashboard/WellnessSuggestion";
import BreathingExercise from "@/components/dashboard/BreathingExercise";
import CBTJournal from "@/components/dashboard/CBTJournal";

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [activeActivity, setActiveActivity] = useState<"breathing" | "journaling" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { window.location.href = "/login"; return; }
        const headers = { Authorization: `Bearer ${token}` };
        const [profileRes, analyticsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/profile", { headers }),
          axios.get("http://localhost:5000/api/analytics/summary", { headers })
        ]);
        setUser(profileRes.data.data);
        setAnalytics(analyticsRes.data.data);
        if (profileRes.data.data.role?.includes("admin")) window.location.href = "/admin/users";
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMoodClick = async (label: string, score: number) => {
    setSelectedMood(label);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.post(
        `${apiUrl}/api/mood-logs`,
        { moodScore: score, moodEmoji: label === "Happy" ? "😄" : label === "Okay" ? "😐" : "😢", tags: [label.toLowerCase()] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const analyticsRes = await axios.get(`${apiUrl}/api/analytics/summary`, { headers: { Authorization: `Bearer ${token}` } });
      setAnalytics(analyticsRes.data.data);
      if (score <= 4) setTimeout(() => setActiveActivity("breathing"), 800);
      else if (score <= 6) setTimeout(() => setActiveActivity("journaling"), 800);
    } catch (err) { console.error("Failed to log mood:", err); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#5b3d8a] border-t-transparent rounded-full animate-spin" />
          <p style={{ color: "#5b3d8a", fontStyle: "italic", fontWeight: 500 }}>Nurturing your dashboard...</p>
        </div>
      </div>
    );
  }

  const moodTrends = analytics?.moodTrends?.length > 0 ? analytics.moodTrends : [
    { day: "Mon", mood: 6 }, { day: "Tue", mood: 8 }, { day: "Wed", mood: 5 },
    { day: "Thu", mood: 7 }, { day: "Fri", mood: 9 }, { day: "Sat", mood: 8 }, { day: "Sun", mood: 10 },
  ];
  const latestMood = moodTrends[moodTrends.length - 1]?.mood ?? 0;
  const prevMood = moodTrends[moodTrends.length - 2]?.mood ?? latestMood;
  const moodDelta = latestMood - prevMood;

  // Mock radar stats based on the Digcy reference image style
  const radarData = [
    { subject: "Sleep Quality", A: 85, fullMark: 100 },
    { subject: "Physical Activity", A: 65, fullMark: 100 },
    { subject: "Social Connection", A: 80, fullMark: 100 },
    { subject: "Mindfulness", A: 90, fullMark: 100 },
    { subject: "Mood Stability", A: 75, fullMark: 100 },
  ];

  const goals = analytics?.activeGoals || [];
  const completedGoals = goals.filter((g: any) => g.status === "Completed");

  return (
    <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 1rem" }}>
      <WellnessSuggestion
        isVisible={showSuggestion} onClose={() => setShowSuggestion(false)}
        moodLabel={selectedMood || "sad"}
        onStartActivity={(type) => { setShowSuggestion(false); setActiveActivity(type); }}
      />
      <AnimatePresence>
        {activeActivity === "breathing" && <BreathingExercise onClose={() => setActiveActivity(null)} type="4-7-8" />}
        {activeActivity === "journaling" && <CBTJournal onClose={() => setActiveActivity(null)} />}
      </AnimatePresence>

      {/* ── Greeting Header ── */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 300, color: "#1A1626", margin: 0, fontFamily: "Outfit, sans-serif" }}>
          Hello, <span style={{ fontWeight: 500 }}>{user?.name?.split(" ")[0] || "Sara"}</span> 👋 <br/>
          <span style={{ fontSize: "2rem", color: "#6b7280" }}>How are you feeling today?</span>
        </h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Quick stats floating up top */}
          <div style={{ background: "#f8f9fc", padding: "1rem" , borderRadius: "20px", display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: "140px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Stress Level</p>
            <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700, color: "#1A1626" }}>18<span style={{ fontSize: "1rem", color: "#9ca3af" }}>/32</span></p>
          </div>
          <div style={{ background: "#f8f9fc", padding: "1rem" , borderRadius: "20px", display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: "140px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Focus Power</p>
            <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700, color: "#1A1626" }}>42<span style={{ fontSize: "1rem", color: "#9ca3af" }}> mins</span></p>
          </div>
        </div>
      </motion.div>

      {/* ── Top Level Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        
        {/* Health Improvement Area Chart (Mindo style) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: "#fff", borderRadius: "28px", padding: "1.8rem 2rem", boxShadow: "0 10px 40px rgba(91,61,138,0.06)", border: "1px solid rgba(155,127,212,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1A1626", margin: 0 }}>Health Improvement</h2>
              <p style={{ fontSize: "0.85rem", color: "#8B89A3", margin: "0.2rem 0 0" }}>This week</p>
            </div>
            <div style={{ background: "#f8f9fc", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 500, color: "#4b5563" }}>
              Week ⌄
            </div>
          </div>
          
          <div style={{ height: 220, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodTrends} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b7fd4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9b7fd4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }} dy={10} />
                <YAxis hide domain={[0, 10]} />
                <RechartsTooltip 
                  contentStyle={{ background: "#1A1626", border: "none", borderRadius: "12px", color: "#fff", fontSize: "0.8rem" }}
                  itemStyle={{ color: "#fff" }} cursor={{ stroke: "rgba(155,127,212,0.2)", strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mood Statistics & Radar Chart (Digcy style) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          style={{ background: "#fff", borderRadius: "28px", padding: "1.8rem 2rem", boxShadow: "0 10px 40px rgba(91,61,138,0.06)", border: "1px solid rgba(155,127,212,0.1)", display: "flex", flexDirection: "column" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1A1626", margin: 0 }}>Mood statistics</h2>
            <div style={{ background: "#f8f9fc", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "0.3rem 0.8rem", fontSize: "0.75rem", fontWeight: 600, color: "#4b5563" }}>Today ⌄</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "0 1rem" }}>
            <span style={{ fontSize: "3.5rem", fontWeight: 700, color: "#1A1626", letterSpacing: "-0.04em" }}>{latestMood * 10}%</span>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.2rem" }}>😃</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4b5563" }}>Happy</span>
            </div>
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1626", margin: "0 0 1rem" }}>Overall score</h3>
          <div style={{ flex: 1, position: "relative", minHeight: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 500 }} />
                <Radar name="Wellness" dataKey="A" stroke="#f472b6" fill="#c4b0e8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Level Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.5rem" }}>

        {/* Today's Activity (Digcy Style clean list) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          style={{ background: "#fff", borderRadius: "28px", padding: "1.8rem 2rem", boxShadow: "0 10px 40px rgba(91,61,138,0.06)", border: "1px solid rgba(155,127,212,0.1)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#1A1626", margin: 0 }}>Today's activity</h2>
            <Link href="/dashboard/activities" style={{ fontSize: "0.8rem", color: "#6b7280", textDecoration: "none" }}>Sort ⌄</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {[
              { id: 1, icon: Sparkles, name: "Morning Guided Meditation", time: "21 mins", clock: "7:12 AM", color: "#f59e0b", bg: "#fef3c7" },
              { id: 2, icon: Activity, name: "Deep Breathing Session", time: "15 mins", clock: "10:30 AM", color: "#ec4899", bg: "#fce7f3" },
              { id: 3, icon: CheckCircle2, name: "Journaling: Gratitude", time: "30 mins", clock: "1:45 PM", color: "#8b5cf6", bg: "#ede9fe" }
            ].map(act => (
              <div key={act.id} style={{ display: "flex", alignItems: "center", padding: "1rem", borderRadius: "16px", background: "#f8f9fc", transition: "all 0.2s" }}>
                <div style={{ width: 44, height: 44, borderRadius: "12px", background: act.bg, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "1rem" }}>
                  <act.icon size={22} color={act.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#1A1626" }}>{act.name}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 500 }}>{act.time}</span>
                  <span style={{ fontSize: "0.8rem", color: "#1A1626", fontWeight: 600 }}>{act.clock}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mental Health Gradient Bar & Check-in */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          style={{ background: "#fff", borderRadius: "28px", padding: "1.8rem 2rem", boxShadow: "0 10px 40px rgba(91,61,138,0.06)", border: "1px solid rgba(155,127,212,0.1)", display: "flex", flexDirection: "column" }}>
          
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#1A1626", margin: "0 0 1rem" }}>Mental Health</h2>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.4rem" }}>
            <span>Low</span><span>Balanced</span><span>High</span>
          </div>
          {/* Digcy-style gradient bar */}
          <div style={{ height: "24px", borderRadius: "99px", background: "linear-gradient(90deg, #a855f7 0%, #fcd34d 50%, #f43f5e 100%)", position: "relative", marginBottom: "2rem" }}>
            <div style={{ position: "absolute", left: "65%", top: "-3px", width: "8px", height: "30px", background: "#fff", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}></div>
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1626", margin: "0 0 1rem" }}>Current Feeling</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", flex: 1 }}>
            {[
              { icon: Smile, label: "Happy", score: 9, color: "#34d399", bg: "#d1fae5" },
              { icon: Meh, label: "Okay", score: 6, color: "#9b7fd4", bg: "#ede9fe" },
              { icon: Frown, label: "Sad", score: 3, color: "#f87171", bg: "#fee2e2" },
            ].map((m) => (
              <button key={m.label} onClick={() => handleMoodClick(m.label, m.score)}
                style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 1rem",
                  borderRadius: "16px", border: `2px solid ${selectedMood === m.label ? m.color : "transparent"}`,
                  background: selectedMood === m.label ? m.bg : "#f8f9fc", cursor: "pointer", transition: "all 0.2s",
                  textAlign: "left" }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <m.icon size={20} color={m.color} />
                </div>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1A1626" }}>{m.label}</span>
                {selectedMood === m.label && <CheckCircle2 size={18} color={m.color} style={{ marginLeft: "auto" }} />}
              </button>
            ))}
          </div>

        </motion.div>

      </div>
    </div>
  );
}

