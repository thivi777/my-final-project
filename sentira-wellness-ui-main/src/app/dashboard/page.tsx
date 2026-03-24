"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Calendar as CalIcon, 
  MessageSquare, 
  Settings, 
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Bell,
  Heart,
  Target
} from "lucide-react";
import styles from "./Dashboard.module.scss";

import axios from "axios";

const UserDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [moodRes, goalRes, journalRes] = await Promise.all([
          axios.get("http://localhost:5000/api/mood-logs", { headers }),
          axios.get("http://localhost:5000/api/goals", { headers }),
          axios.get("http://localhost:5000/api/journals", { headers }),
        ]);

        if (moodRes.data.success) setMoodLogs(moodRes.data.data || []);
        if (goalRes.data.success) setGoals(goalRes.data.data || []);
        if (journalRes.data.success) setJournals(journalRes.data.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Smartech</div>
        
        <div className={styles.profileCard}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" 
            alt="Avatar" 
            className={styles.avatar} 
          />
          <div className={styles.profileInfo}>
            <div className={styles.name}>{typeof window !== 'undefined' ? localStorage.getItem("userName") || "User" : "User"}</div>
            <div className={styles.role}>Explorer</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {[
            { label: "Dashboard", icon: LayoutDashboard },
            { label: "My Moods", icon: Heart },
            { label: "My Goals", icon: Target },
            { label: "Journal", icon: BookOpen },
            { label: "Reflections", icon: MessageSquare },
            { label: "Setting", icon: Settings },
          ].map((item: any) => (
            <div 
              key={item.label} 
              className={`${styles.navItem} ${activeTab === item.label ? styles.active : ""}`}
              onClick={() => setActiveTab(item.label)}
            >
              <item.icon size={18} />
              {item.label}
            </div>
          ))}
        </nav>

        <div className={styles.logout} onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>
          <LogOut size={18} />
          <span>Log out</span>
        </div>
      </aside>

      {/* Main Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.greeting}>HELLO, {(typeof window !== 'undefined' ? localStorage.getItem("userName") : "")?.toUpperCase() || "USER"}!</h1>
          
          <div className="flex items-center gap-6">
            <div className={styles.searchBar}>
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="search insights..." />
            </div>
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
               </div>
               <div className="w-8 h-8 rounded-full bg-gray-200" />
               <MoreVertical size={20} className="text-gray-400" />
            </div>
          </div>
        </header>

        <div className={styles.grid}>
          {/* Recent Moods */}
          <div className={styles.glassCard}>
              <div className="flex items-center justify-between mb-4">
                  <h3 className={styles.cardTitle}>Recent Mood Insights</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase cursor-pointer hover:text-gray-600">See more ›</span>
              </div>
              <div className={styles.teacherList}>
                  {moodLogs.length > 0 ? (
                    moodLogs.slice(0, 3).map((log, i) => (
                      <div key={log._id || i} className={styles.teacherItem}>
                        <div className={styles.info}>
                            <div className="text-2xl mr-3">{log.moodEmoji || '✨'}</div>
                            <div>
                                <div className={styles.name}>{log.note ? (log.note.length > 20 ? log.note.slice(0, 20) + '...' : log.note) : `Score: ${log.moodScore}/10`}</div>
                                <div className={styles.role}>{new Date(log.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className={styles.msgBtn}>
                            <MessageSquare size={14} className="text-gray-600" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-400 text-xs font-medium italic">
                      No moods logged yet today.
                    </div>
                  )}
              </div>
          </div>

          {/* Recent Journals */}
          <div className={styles.glassCard}>
              <div className="flex items-center justify-between mb-4">
                  <h3 className={styles.cardTitle}>Recent Reflections</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase cursor-pointer hover:text-gray-600">See more ›</span>
              </div>
              <div className={styles.events}>
                  {journals.length > 0 ? (
                    journals.slice(0, 2).map((journal, i) => (
                      <div key={journal._id || i} className={styles.eventItem}>
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-3">
                          <BookOpen size={20} className="text-purple-400" />
                        </div>
                        <div className={styles.eventInfo}>
                            <div className="font-bold text-sm text-gray-800 truncate w-32">{journal.title}</div>
                            <div className={styles.eDate}>{new Date(journal.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-400 text-xs font-medium italic">
                      No journal entries found.
                    </div>
                  )}
              </div>
          </div>

          {/* Active Goals Section */}
          <div className={styles.glassCardFull}>
              <h3 className={styles.cardTitle}>Active Wellness Goals</h3>
              <div className={styles.calendarWidget}>
                <div className="calendar">
                    <div className={styles.calHeader}>
                      <ChevronLeft size={16} className="text-gray-400" />
                      <span>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                    <div className={styles.days}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                          <div key={d} className={styles.dayLabel}>{d}</div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => (
                          <div 
                            key={i} 
                            className={`${styles.day} ${i + 1 === new Date().getDate() ? styles.active : ""}`}
                          >
                            {i + 1}
                          </div>
                      ))}
                    </div>
                </div>
                <div className={styles.scheduleList}>
                    {goals.length > 0 ? (
                      goals.slice(0, 3).map((goal, i) => (
                        <div key={goal._id || i} className={styles.schedItem}>
                          <div className={styles.time}>{new Date(goal.createdAt).getDate()}</div>
                          <div className={styles.detail}>
                              <div className={styles.sName}>{goal.title}</div>
                              <div className={styles.sNum}>{goal.description.slice(0, 20)}...</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-400 text-xs font-medium italic">
                        No active goals currently set.
                      </div>
                    )}
                </div>
              </div>
          </div>

          <div className={styles.rightSide}>
             {[
               { label: "Mental Clarity", val: "60%", color: "#FF7E8B" },
               { label: "Goal Progress", val: "90%", color: "#7BD3EA" },
               { label: "Consistency", val: "75%", color: "#FFD93D" },
             ].map((s) => (
               <div key={s.label} className={styles.statWidget}>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div 
                    className={styles.progressRing} 
                    style={{ borderTopColor: s.color } as any}
                  >
                    {s.val}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
