import { Smile, Meh, Frown, Bell, CheckCircle2, Circle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import ScrollReveal from '@/components/shared/ScrollReveal';

const moodData = [
  {day:"Mon",mood:7},{day:"Tue",mood:5},{day:"Wed",mood:8},
  {day:"Thu",mood:6},{day:"Fri",mood:9},{day:"Sat",mood:7},{day:"Sun",mood:8},
];
const tasks = [
  {label:"Morning breathing exercise",done:true},
  {label:"Write 3 gratitude items",done:true},
  {label:"5-min guided meditation",done:false},
  {label:"Evening mood check-in",done:false},
];

import styles from "./DashboardPreview.module.scss";

const DashboardPreview = () => (
  <section id="about" className={styles.section}>
    <div className={styles.blob1} />
    <div className={styles.blob2} />
    <div className={styles.container}>
      <ScrollReveal className={styles.header}>
        <div className={styles.labelRow}>
          <div className={styles.labelLine} />
          <span className={styles.labelText}>Your Dashboard</span>
          <div className={styles.labelLine} />
        </div>
        <h2 className={styles.title}>A Mirror to <em>Your Mind</em></h2>
        <p className={styles.subtitle}>Our psychology-first approach helps you recognize patterns, process emotions, and build mental resilience.</p>
      </ScrollReveal>
      <div className={styles.grid}>
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Today's Check-in</div>
            <h3 className={styles.cardTitle}>Emotional Check-in</h3>
            <div className={styles.moods}>
              {[{ icon: Smile, l: "Expansive", on: true }, { icon: Meh, l: "Balanced", on: false }, { icon: Frown, l: "Constrained", on: false }].map(m => (
                <button key={m.l} className={`${styles.moodBtn} ${m.on ? styles.active : ""}`}>
                  <m.icon size={26} className={styles.moodIcon} />
                  <span className={styles.moodLabel}>{m.l}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={.1}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Daily Wisdom</div>
            <h3 className={styles.cardTitle}>Cognitive Insight</h3>
            <div className={styles.insightRow}>
              <div className={styles.insightIcon}><Bell size={18} /></div>
              <p className={styles.quote}>"Notice the thought without becoming the thought. Observe its shape, then let it drift like a cloud."</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={.15}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Progress</div>
            <h3 className={styles.cardTitle}>Micro-Habits</h3>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
              <span className={styles.progressPct}>50%</span>
            </div>
            <div className={styles.tasks}>
              {tasks.map(t => (
                <div key={t.label} className={styles.task}>
                  {t.done ? (
                    <CheckCircle2 size={15} className="text-primary shrink-0" />
                  ) : (
                    <Circle size={15} className="text-muted-foreground/30 shrink-0" />
                  )}
                  <span className={`${styles.taskText} ${t.done ? styles.done : ""}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={.2}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>This Week</div>
            <h3 className={styles.cardTitle}>Neuro-Trend Analysis</h3>
            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: 'Inter', fill: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.1em' }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis domain={[0, 10]} hide />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-charcoal)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'Inter', fontSize: '12px', color: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }} />
                  <Area type="monotone" dataKey="mood" stroke="var(--color-primary)" strokeWidth={1.5} fillOpacity={1} fill="url(#tg)" dot={{ r: 3, fill: 'var(--color-primary)', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#FFFFFF', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default DashboardPreview;
