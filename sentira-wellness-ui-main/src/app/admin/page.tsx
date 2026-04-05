"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { 
  Users, 
  Activity, 
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  UserCheck,
  History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
=======
import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  UserPlus,
} from "lucide-react";
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import axios from "axios";
<<<<<<< HEAD
=======
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import styles from "./AdminDashboard.module.scss";
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)

// Mock data for the chart as per wireframe inspiration
const moodTrendsData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 280 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 320 },
  { name: "Sun", value: 480 },
];

const recentActivity = [
  { activity: "User Login", timestamp: "2026-03-23 07:10:00 AM", user: "user1@example.com" },
  { activity: "Mood Logged", timestamp: "2026-03-23 07:12:15 AM", user: "user2@example.com" },
  { activity: "Activity Started", timestamp: "2026-03-23 07:15:20 AM", user: "user1@example.com" },
  { activity: "Profile Updated", timestamp: "2026-03-23 07:18:45 AM", user: "admin@sentira.io" },
  { activity: "New Goal Set", timestamp: "2026-03-23 07:22:10 AM", user: "user3@example.com" },
];

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
<<<<<<< HEAD
        const response = await axios.get("http://localhost:5000/api/users", { 
          headers: { Authorization: `Bearer ${token}` } 
=======
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/users`, { 
          headers 
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
        });
        
        const users = response.data.data || [];
        setStats({
          totalUsers: users.length,
          activeUsers: Math.floor(users.length * 0.7), // Mocked for now
          newUsers: Math.floor(users.length * 0.15)  // Mocked for now
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
<<<<<<< HEAD
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-display font-bold text-white tracking-tight">Admin Dashboard</h2>
           <p className="text-slate-500 font-body mt-1">Global platform performance and user activity metrics.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors">Export Report</button>
           <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-red-600/20 transition-colors">Manage Users</button>
        </div>
      </div>

      {/* User Statistics Row */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
           <Users size={14} />
           User Statistics
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, trend: "+12%" },
            { label: "Active Users", value: stats?.activeUsers || 0, icon: UserCheck, trend: "+5%" },
            { label: "New Users This Month", value: stats?.newUsers || 0, icon: UserPlus, trend: "+18%" },
          ].map((s, i) => (
            <Card key={i} className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-600/10 text-red-500 rounded-xl group-hover:scale-110 transition-transform">
                    <s.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} />
                    {s.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                  <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                    {loading ? "..." : s.value.toLocaleString()}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mood Trends Chart Row */}
      <section>
         <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <TrendingUp size={14} />
            Mood Trends Charts
         </div>
         <Card className="bg-slate-900 border-slate-800 shadow-xl p-8">
=======
    <div className={styles.adminLayout}>
      <DashboardSidebar isAdmin={true} />
      
      <div className={styles.mainWrapper}>
        <DashboardHeader userName="Admin" />
        
        <main className={styles.content}>
          <div className={styles.statsGrid}>
            <StatCard 
              label="Total Users" 
              value={stats?.totalUsers || 0} 
              icon={Users} 
              trend="+12%" 
              color="#c4895a" 
            />
            <StatCard 
              label="Active Users" 
              value={stats?.activeUsers || 0} 
              icon={UserCheck} 
              trend="+5%" 
              color="#10b981" 
            />
            <StatCard 
              label="New Users" 
              value={stats?.newUsers || 0} 
              icon={UserPlus} 
              trend="+18%" 
              color="#3b82f6" 
            />
          </div>

          <section className={styles.chartSection}>
            <h2>Mood Trend Analytics</h2>
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodTrendsData}>
                     <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
<<<<<<< HEAD
                           <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                           <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                     <XAxis 
                        dataKey="name" 
                        stroke="#475569" 
=======
                           <stop offset="5%" stopColor="#c4895a" stopOpacity={0.3} />
                           <stop offset="95%" stopColor="#c4895a" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                     <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.3)" 
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                     />
                     <YAxis 
<<<<<<< HEAD
                        stroke="#475569" 
=======
                        stroke="rgba(255,255,255,0.3)" 
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                     />
                     <Tooltip 
<<<<<<< HEAD
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
=======
                        contentStyle={{ backgroundColor: 'rgba(3, 30, 25, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                        itemStyle={{ color: '#fff' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="value" 
<<<<<<< HEAD
                        stroke="#dc2626" 
=======
                        stroke="#c4895a" 
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
<<<<<<< HEAD
         </Card>
      </section>

      {/* System Activity Summary Table Row */}
      <section>
         <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <History size={14} />
            System Activity Summaries
         </div>
         <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-800/50 border-b border-slate-800">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Activity</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">User</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                     {recentActivity.map((ra, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                           <td className="px-6 py-4">
                              <span className="flex items-center gap-2 text-sm font-medium text-white">
                                 <div className="w-2 h-2 rounded-full bg-red-500" />
                                 {ra.activity}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-400 font-mono italic">{ra.timestamp}</td>
                           <td className="px-6 py-4 text-sm text-slate-300 font-bold">{ra.user}</td>
=======
          </section>

          <section className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h2>System Activity Logs</h2>
              <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Export CSV</button>
            </div>
            <div className={styles.tableWrapper}>
               <table className={styles.table}>
                  <thead>
                     <tr>
                        <th>Activity</th>
                        <th>Timestamp</th>
                        <th>User</th>
                     </tr>
                  </thead>
                  <tbody>
                     {recentActivity.map((ra, idx) => (
                        <tr key={idx}>
                           <td>
                              <div className={styles.activityInfo}>
                                 <div className={styles.dot} />
                                 {ra.activity}
                              </div>
                           </td>
                           <td className="italic opacity-50">{ra.timestamp}</td>
                           <td className="font-bold opacity-80">{ra.user}</td>
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
<<<<<<< HEAD
            <div className="p-4 bg-slate-800/20 border-t border-slate-800 text-center">
               <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">View All Logs</button>
            </div>
         </Card>
      </section>
=======
          </section>
        </main>
      </div>

      <div className={styles.auroraBg}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
    </div>
  );
}
