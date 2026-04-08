"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  UserPlus,
} from "lucide-react";
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
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import styles from "./AdminDashboard.module.scss";

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

const mockPayments = [
  { id: "sub_1A2b3C", amount: "$9.99", status: "Success", date: "2026-03-23", user: "user1@example.com" },
  { id: "sub_4D5e6F", amount: "$9.99", status: "Success", date: "2026-03-22", user: "user2@example.com" },
  { id: "sub_7G8h9I", amount: "$9.99", status: "Failed", date: "2026-03-22", user: "user4@example.com" },
  { id: "sub_0J1k2L", amount: "$99.99", status: "Success", date: "2026-03-21", user: "user5@example.com" },
  { id: "sub_3M4n5O", amount: "$9.99", status: "Success", date: "2026-03-20", user: "user6@example.com" },
];

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await axios.get(`${apiUrl}/api/users`, { 
          headers 
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">System Overview</h2>
        <p className="text-slate-500 font-body mt-1">Real-time analytics and platform performance metrics.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          label="Total Users" 
          value={stats?.totalUsers || 0} 
          icon={Users} 
          trend="+12%" 
          color="#6366f1" 
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
          color="#7c3aed" 
        />
      </div>

      <section className={styles.chartSection}>
        <h2 className="flex items-center gap-2">
          Mood Trend Analytics
          <span className="text-xs font-medium text-slate-500 px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50 ml-2">Weekly</span>
        </h2>
        <div className="h-[350px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodTrendsData}>
                 <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                 />
                 <YAxis 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10}
                 />
                 <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#f8fafc', fontWeight: '600' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                 />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* System Activity */}
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2>System Activity Logs</h2>
            <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50 transition-all uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className={styles.tableWrapper}>
             <table className={styles.table}>
                <thead>
                   <tr>
                      <th className="pl-6">Activity</th>
                      <th>Timestamp</th>
                      <th className="pr-6">User</th>
                   </tr>
                </thead>
                <tbody>
                   {recentActivity.map((ra, idx) => (
                      <tr key={idx}>
                         <td className="pl-6">
                            <div className={styles.activityInfo}>
                               <div className={styles.dot} />
                               <span className="font-semibold text-slate-200">{ra.activity}</span>
                            </div>
                         </td>
                         <td className="opacity-60 text-xs font-mono">{ra.timestamp}</td>
                         <td className="pr-6">
                            <span className="px-2 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-medium">
                              {ra.user}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </section>

        {/* Payment Statements */}
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2>Payment Statements</h2>
            <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50 transition-all uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className={styles.tableWrapper}>
             <table className={styles.table}>
                <thead>
                   <tr>
                      <th className="pl-6">Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="pr-6">User</th>
                   </tr>
                </thead>
                <tbody>
                   {mockPayments.map((pm, idx) => (
                      <tr key={idx}>
                         <td className="pl-6 font-semibold text-slate-200">{pm.amount}</td>
                         <td>
                            <span className={pm.status === "Success" ? "text-emerald-400 text-xs font-bold" : "text-rose-400 text-xs font-bold"}>
                              {pm.status}
                            </span>
                         </td>
                         <td className="opacity-60 text-xs font-mono">{pm.date}</td>
                         <td className="pr-6">
                            <span className="px-2 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-medium">
                              {pm.user}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </section>
      </div>
    </div>
  );
}
