"use client";
/**
 * HeroSection.tsx — Sentira Wellness
 *
 * Background: two cinematic looping videos that crossfade
 *   - video 1: glowing golden energy figure (energy/body healing)
 *   - video 2: golden brain on a circuit chip (mind/AI wellness)
 *
 * Scroll effects:
 *   - Video layer: translateY upward (parallax) + subtle scale
 *   - Content: translateY downward slightly (counter-scroll pin feel)
 *   - Overlay deepens as user scrolls
 *
 * Place your two video files in /public/videos/:
 *   - energy-figure.mp4  (the glowing human figure clip)
 *   - brain-chip.mp4     (the golden brain + circuit chip clip)
 *
 * All styles → styles/HeroSection.module.scss
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.scss";
import BrainAnimation from "./BrainAnimation";
// ─── Scene data ───────────────────────────────────────────────────────────────
const SCENES = [
  {
    src:   "/video/energy-figure.mp4",
    tag:   "Body & Energy",
    title: "Restore Your Vital Energy",
  },
  {
    src:   "/video/energy-figure.mp4",
    tag:   "Mind & Balance",
    title: "Find Your Inner Calm",
  },
];

// Mood options
const MOODS = ["😔 Low", "😐 Okay", "🙂 Good", "😄 Great"];

// ─── Phase sequence timing ────────────────────────────────────────────────────
// 0 → mount
// 1 → bg video fades in          (150ms)
// 2 → eyebrow + letters          (700ms)
// 3 → sub + mood bar + CTAs     (1500ms)
// 4 → right card                 (2100ms)
// 5 → bottom bar                 (2700ms)

export default function HeroSection() {
  const [phase, setPhase]           = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [activeMood, setActiveMood] = useState(1);
  const heroRef                     = useRef<HTMLElement>(null);
  const videoRefs                   = useRef<(HTMLVideoElement | null)[]>([]);
  const cardVideoRef                = useRef<HTMLVideoElement | null>(null);
  const rafRef                      = useRef<number>(0);

  // ── Boot animation phases
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1),  150),
      setTimeout(() => setPhase(2),  700),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2100),
      setTimeout(() => setPhase(5), 2700),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // ── Auto-cycle scenes every 7 s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveScene(s => (s + 1) % SCENES.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  // ── Sync card preview video when scene changes
  useEffect(() => {
    if (cardVideoRef.current) {
      cardVideoRef.current.load();
      cardVideoRef.current.play().catch(() => {});
    }
  }, [activeScene]);

  // ── Scroll-driven parallax (rAF loop)
  const onScroll = useCallback(() => {
    if (!heroRef.current) return;
    const scrollY  = window.scrollY;
    const heroH    = heroRef.current.offsetHeight;
    // Progress 0→1 across the hero height
    const progress = Math.min(scrollY / heroH, 1);

    // Video layer: moves UP (parallax) + scales down slightly
    const videoWrap = heroRef.current.querySelector(`.${styles.videoWrap}`) as HTMLElement;
    if (videoWrap) {
      const ty = progress * -120;
      const sc = 1 + progress * 0.04;
      videoWrap.style.transform = `translateY(${ty}px) scale(${sc})`;
    }

    // Content: subtle counter-scroll (pin-ish feel)
    const content = heroRef.current.querySelector(`.${styles.content}`) as HTMLElement;
    if (content) {
      const ty = progress * 40;
      content.style.transform = `translateY(${ty}px)`;
    }

    // Overlay deepens on scroll
    const overlay = heroRef.current.querySelector(`.${styles.overlay}`) as HTMLElement;
    if (overlay) {
      overlay.style.opacity = String(1 + progress * 0.4);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  // ── Letter-by-letter helper
  const renderLetters = (
    text: string,
    baseDelay: number,
    extraClass: string
  ) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className={`${styles.letter} ${extraClass} ${phase >= 2 ? styles.visible : ""}`}
        style={{ animationDelay: `${baseDelay + i * 0.058}s` }}
      >
        {ch === " " ? " " : ch}
      </span>
    ));

  return (
    <section ref={heroRef} className={styles.hero} id="home">

      {/* ── Background image layer ── */}
      <div className={styles.imageWrap}>
        <Image
          src="/images/hero-wellness.jpg"
          alt="Wellness Background"
          fill
          className={styles.heroBg}
          priority
        />
      </div>

      {/* ── Decorative Symbol ── */}
      <div className={styles.symbolWrap}>
        <div className={styles.bgSymbol}>S</div>
      </div>

      {/* ── Overlay stack ── */}
      <div className={styles.overlay} />
      <div className={styles.tint}    />
      <div className={styles.grain}   />
      <div className={styles.vignette}/>
      <div className={styles.scanline}/>

      {/* ════ MAIN CONTENT ════ */}
      <div className={styles.content}>

        {/* ─── LEFT ────────────────────────────────────────── */}
        <div className={styles.left}>

          {/* Cinematic headline — each letter animates individually */}
          <div className={styles.title}>

            {/* Line 1: italic light */}
            <div className={styles.word}>
              {renderLetters("Your Mind.", 0, styles.htLight)}
            </div>

            {/* Line 2: bold */}
            <div className={styles.word}>
              {renderLetters("Your Peace.", 0.18, styles.htBold)}
            </div>

            {/* Line 3: animated gold shimmer — single-unit fade to avoid -webkit-text-fill-color conflict */}
            <div className={styles.word}>
              <span
                className={`${styles.htAccent} ${styles.htAccentAnim} ${phase >= 2 ? styles.visible : ""}`}
              >
                Your Power.
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className={`${styles.sub} ${phase >= 3 ? styles.visible : ""}`}>
            Unlock emotional clarity, silence the noise, and build unshakeable
            mental resilience — one mindful moment at a time.
          </p>


          {/* CTAs */}
          <div className={`${styles.ctas} ${phase >= 3 ? styles.visible : ""}`}>
            <Link href="/register" className={styles.ctaPrimary}>
              Get Started Free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#features" className={styles.ctaSecondary}>
              See How It Works
            </Link>
          </div>
        </div>

        {/* ─── RIGHT — animated brain ──────────────────────── */}
        <div className={`${styles.right} ${phase >= 4 ? styles.visible : ""}`}>
          <BrainAnimation />
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollMouse} />
      </div>

      {/* ── Bottom info bar ── */}
      <div className={`${styles.bar} ${phase >= 5 ? styles.visible : ""}`}>
        <div className={styles.barInner}>

          <div className={styles.barItem}>
            <div className={styles.barIcon}>🌐</div>
            <div>
              <div className={styles.barLabel}>Visit our website</div>
              <div className={styles.barValue}>www.sentira.app</div>
            </div>
          </div>

          <div className={styles.barSep} />

          <div className={styles.barItem}>
            <div className={styles.barIcon}>📧</div>
            <div>
              <div className={styles.barLabel}>For more info</div>
              <div className={styles.barValue}>hello@sentira.app</div>
            </div>
          </div>

          <div className={styles.barSep} />

          <div className={styles.barItem}>
            <div className={styles.barIcon}>📱</div>
            <div>
              <div className={styles.barLabel}>Download the app</div>
              <div className={styles.barValue}>iOS &amp; Android</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
