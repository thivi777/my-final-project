"use client";
/**
 * BrainAnimation.tsx
 * Purple glowing brain image with CSS float/glow/particles animations.
 */

import React from "react";
import Image from "next/image";
import styles from "./BrainAnimation.module.scss";

export default function BrainAnimation() {
  return (
    <div className={styles.brainWrap}>
      {/* Ambient glow rings */}
      <div className={styles.ring1} />
      <div className={styles.ring2} />
      <div className={styles.ring3} />

      {/* Floating neural spark particles */}
      <div className={styles.particles}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      {/* Main brain image with float animation */}
      <div className={styles.imageWrap}>
        <Image
          src="/images/brain-hero.png"
          alt="AI Brain - Sentira Wellness"
          width={420}
          height={420}
          className={styles.brainImage}
          priority
        />
      </div>

      {/* Floating stat chips */}
      <div className={`${styles.chip} ${styles.chip1}`}>
        <span className={styles.chipIcon}>🧠</span>
        <span className={styles.chipText}>AI Wellness</span>
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <span className={styles.chipIcon}>✨</span>
        <span className={styles.chipText}>98% Calm</span>
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <span className={styles.chipIcon}>💜</span>
        <span className={styles.chipText}>10k+ Users</span>
      </div>
    </div>
  );
}
