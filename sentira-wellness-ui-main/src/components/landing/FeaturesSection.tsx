// FeaturesSection.tsx
import { Heart, CalendarCheck, Leaf, BarChart3 } from "lucide-react";
import ScrollReveal from '@/components/shared/ScrollReveal';
import styles from "./FeaturesSection.module.scss";

const features = [
  { icon:Heart,         number:"01", title:"Mood Tracking",         description:"Log your emotions daily and discover patterns that impact your wellbeing over time." },
  { icon:CalendarCheck, number:"02", title:"Daily Check-ins",       description:"Quick guided check-ins to reflect on how you're feeling — morning, afternoon, evening." },
  { icon:Leaf,          number:"03", title:"Relaxation Activities", description:"Curated breathing exercises, meditations, and calming activities tailored to your mood." },
  { icon:BarChart3,     number:"04", title:"Emotional Insights",    description:"Visualize your emotional journey with beautiful charts and actionable recommendations." },
];

const FeaturesSection = () => (
  <section id="features" className={styles.section}>
    <div className={styles.wrapper}>
      <ScrollReveal>
        <div className={styles.header}>
          <div>
            <div className={styles.labelRow}>
              <div className={styles.labelLine}/>
              <span className={styles.labelText}>Core Features</span>
            </div>
            <h2 className={styles.title}>
              Designed for<br/><em>Your Mind</em>
            </h2>
          </div>
          <p className={styles.description}>
            Everything you need to understand, manage, and nurture your emotional health — built on science, crafted with care.
          </p>
        </div>
      </ScrollReveal>
      <div className={styles.grid}>
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <div className={styles.card}>
              <div className={styles.number}>{f.number}</div>
              <div className={styles.iconWrap}>
                <f.icon size={20} className={styles.icon}/>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
