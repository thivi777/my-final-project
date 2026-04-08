"use client";

import React from "react";
import styles from "../AdminDashboard.module.scss";

// Re-integrated recent activity array with expanded values for large table
const recentActivity = [
  { activity: "User Login", timestamp: "2026-03-23 07:10:00 AM", user: "user1@example.com", ip: "192.168.1.100" },
  { activity: "Mood Logged", timestamp: "2026-03-23 07:12:15 AM", user: "user2@example.com", ip: "10.0.0.12" },
  { activity: "Activity Started", timestamp: "2026-03-23 07:15:20 AM", user: "user1@example.com", ip: "192.168.1.100" },
  { activity: "Profile Updated", timestamp: "2026-03-23 07:18:45 AM", user: "admin@sentira.io", ip: "172.16.254.1" },
  { activity: "New Goal Set", timestamp: "2026-03-23 07:22:10 AM", user: "user3@example.com", ip: "10.0.0.44" },
  { activity: "Failed Login Attempt", timestamp: "2026-03-23 08:05:12 AM", user: "unknown@example.com", ip: "142.250.72.206" },
  { activity: "Subscription Upgraded", timestamp: "2026-03-23 09:12:05 AM", user: "user5@example.com", ip: "192.168.1.205" },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">System Activity Logs</h2>
        <p className="text-slate-500 font-body mt-1">Full chronological audit of all platform interactions.</p>
      </div>

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2>Complete Access Log</h2>
        </div>
        <div className={styles.tableWrapper}>
           <table className={styles.table}>
              <thead>
                 <tr>
                    <th className="pl-6">Activity Component</th>
                    <th>Timestamp</th>
                    <th>User Identity</th>
                    <th className="pr-6">IP Source</th>
                 </tr>
              </thead>
              <tbody>
                 {recentActivity.map((ra, idx) => (
                    <tr key={idx}>
                       <td className="pl-6">
                          <div className={styles.activityInfo}>
                             <div className={ra.activity.includes("Failed") ? "w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" : styles.dot} />
                             <span className="font-semibold text-slate-200">{ra.activity}</span>
                          </div>
                       </td>
                       <td className="opacity-60 text-xs font-mono">{ra.timestamp}</td>
                       <td>
                          <span className="px-2 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-medium">
                            {ra.user}
                          </span>
                       </td>
                       <td className="pr-6 opacity-50 font-mono text-xs">{ra.ip}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>
    </div>
  );
}
