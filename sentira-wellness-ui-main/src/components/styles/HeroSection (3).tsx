"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.scss";

type Scene = {
  id: string;
  bgPoster: string;
  position?: string; // e.g. "center top", "center center", "50% 30%"
};

const defaultScenes: Scene[] = [
  { id:"s1", bgPoster:"/images/hero-1.jpg", position:"center center" },
  { id:"s2", bgPoster:"/images/hero-2.jpg", position:"center center" },
  { id:"s3", bgPoster:"/images/hero-3.jpg", position:"center center" },
  { id:"s4", bgPoster:"/images/hero-4.jpg", position:"center center" },
  { id:"s5", bgPoster:"/images/hero-5.jpg", position:"center top"    },
  { id:"s6", bgPoster:"/images/hero-6.jpg", position:"center center" },
];

type Props = {
  scenes?: Scene[];
  slideDuration?: number;
};

export default function HeroSection({ scenes = defaultScenes, slideDuration = 4500 }: Props) {
  const [curIdx,   setCurIdx]   = useState(0);
  const [nextIdx,  setNextIdx]  = useState<number | null>(null);
  const [sliding,  setSliding]  = useState(false);
  const [blurring, setBlurring] = useState(false);
  const [progress, setProgress] = useState(0);

  const curRef  = useRef(0);
  const startTs = useRef<number | null>(null);
  const rafRef  = useRef<number | null>(null);
  const busy    = useRef(false);

  const goTo = useCallback((next: number) => {
    if (busy.current || next === curRef.current) return;
    busy.current = true;

    setNextIdx(next);
    setSliding(false);
    setBlurring(true);

    setTimeout(() => setSliding(true), 30);

    setTimeout(() => {
      curRef.current = next;
      setCurIdx(next);
      setSliding(false);
      setBlurring(false);
      setNextIdx(null);
      startTs.current = null;
      setProgress(0);
      busy.current = false;
    }, 1050);
  }, []);

  useEffect(() => {
    const tick = (ts: number) => {
      if (!startTs.current) startTs.current = ts;
      const elapsed = ts - startTs.current;
      setProgress(Math.min((elapsed / slideDuration) * 100, 100));
      if (elapsed >= slideDuration) {
        goTo((curRef.current + 1) % scenes.length);
        startTs.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.hero} aria-label="Sentira Wellness hero">

      {/* ── Current background image ── */}
      <img
        key={scenes[curIdx].id}
        src={scenes[curIdx].bgPoster}
        alt=""
        aria-hidden="true"
        className={`${styles.bgImg} ${blurring ? styles.bgImgBlurring : styles.bgImgActive}`}
        style={{ objectPosition: scenes[curIdx].position ?? "center center" }}
      />

      {/* ── Incoming panel — diagonal slide from right ── */}
      {nextIdx !== null && (
        <div className={`${styles.panel} ${sliding ? styles.panelSliding : ""}`}>
          <img
            src={scenes[nextIdx].bgPoster}
            alt=""
            aria-hidden="true"
            className={styles.panelImg}
            style={{ objectPosition: scenes[nextIdx].position ?? "center center" }}
          />
          <div className={styles.panelEdge} />
        </div>
      )}

      {/* ── Gradient overlay ── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Static content — never changes ── */}
      <div className={styles.content}>
        <span className={styles.kicker}>Sentira Wellness</span>
        <h1 className={styles.title}>
          Understand Your Emotions.<br />
          Transform Your Life.
        </h1>
        <p className={styles.body}>
          Track your emotions, reduce stress, and build lasting mental habits
          — one mindful moment at a time.
        </p>
        <div className={styles.ctas}>
          <Link href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
            Start Your Journey
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button className={`${styles.btn} ${styles.btnGhost}`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6.5 5.5 10 8l-3.5 2.5V5.5Z" fill="currentColor"/>
            </svg>
            Learn More
          </button>
        </div>
      </div>

      <p className={styles.watermark} aria-hidden="true">Sentira Wellness</p>

      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

    </section>
  );
}
