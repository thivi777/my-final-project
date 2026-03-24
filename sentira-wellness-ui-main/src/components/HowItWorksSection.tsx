"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Lightbulb, Timer, Heart, Target } from "lucide-react";
import styles from "./HowItWorksSection.module.scss";

const steps = [
  { number:"01", title:"Insightful Discovery",   description:"Begin each day with a quick, science-backed emotional check-in to map your mental landscape.",     icon:<Lightbulb className="w-5 h-5"/> },
  { number:"02", title:"Guided Resilience",       description:"Access a curated library of psychology-first activities tailored to your current emotional state.", icon:<Timer className="w-5 h-5"/> },
  { number:"03", title:"Collaborative Growth",    description:"Connect with our community and experts to share journeys and build lasting emotional strength.",    icon:<Heart className="w-5 h-5"/> },
  { number:"04", title:"Lasting Transformation",  description:"Monitor your long-term evolution and celebrate the small wins that lead to deep, lasting change.",  icon:<Target className="w-5 h-5"/> },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const pl = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.blob1}/><div className={styles.blob2}/>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.labelRow}>
            <div className={styles.labelLine}/><span className={styles.labelText}>The Sentira Method</span><div className={styles.labelLine}/>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className={styles.title}>Your path to <em>wellbeing.</em></motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2 }} className={styles.subtitle}>Science-backed, human-centered. Discover how we help you navigate your inner world.</motion.p>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <motion.div key={s.number} className={styles.step} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .7, delay: i * .12, ease: "easeOut" }}>
              <div className={styles.spine}><div className={styles.numberBox}><span className={styles.numberLabel}>{s.number}</span></div><div className={styles.line}/></div>
              <div className={styles.body}>
                <div className={styles.bgNumber}>{s.number}</div>
                <div className={styles.iconBox}>{s.icon}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
