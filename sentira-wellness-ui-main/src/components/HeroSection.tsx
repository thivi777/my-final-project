"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "clsx";
import { Globe, Mail, PhoneCall } from "lucide-react";
import heroMeditation from "@/assets/hero-meditation.png";
import styles from "./HeroSection.module.scss";

/*
  HeroSection — Reference-matched layout
  ────────────────────────────────────────────────────────
  Inspired by: 5P Healing Medicine poster
  • Geometric bg shapes (circles, rotated squares, triangles)
  • Dot-grid texture
  • Dashed badge pill at top
  • Mixed-weight headline  (light / ExtraBold / ExtraBold+colour)
  • Centre image with pill-top container
  • Floating cards: partner text card, heart bubble, streak, rating
  • Dark teal bottom info bar with 3 items
  ────────────────────────────────────────────────────────
  Colours: 100% original Sentira teal + gold (UNCHANGED)
*/

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero} id="home">

      {/* ── Geometric background ── */}
      <div className={styles.bgShapes}>
        <div className={styles.dotGrid}    />
        <div className={styles.shape1}     />
        <div className={styles.shape2}     />
        <div className={styles.shape3}     />
        <div className={styles.shape4}     />
        <div className={styles.triTopRight}   />
        <div className={styles.triBottomLeft} />
      </div>

      {/* ── Main grid ── */}
      <div className={styles.inner}>

        {/* ════ LEFT ════ */}
        <div className={cx(styles.left, { [styles.visible]: mounted })}>

          {/* Dashed badge pill */}
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <span className={styles.badgeText}>Sentira Wellness · Est. 2024</span>
          </div>

          {/* Mixed-weight big headline */}
          <div className={styles.headline}>
            <span className={styles.headLine1}>Feel</span>
            <span className={styles.headLine2}>Better,</span>
            <span className={styles.headLine3}>Every Day.</span>
          </div>

          {/* Subtitle */}
          <p className={styles.sub}>
            Track your emotions, reduce stress, and build lasting mental habits
            with personalised daily check-ins and guided exercises.
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link href="/register" className={styles.btnMain}>
              Get Started Free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#features" className={styles.btnSecondary}>
              See How It Works
            </Link>
          </div>

          {/* Mini stats row */}
          <div className={styles.miniStats}>
            {[
              { val: "50K+",  label: "Active Users"    },
              null,
              { val: "4.9★",  label: "App Rating"      },
              null,
              { val: "92%",   label: "Feel Better"     },
            ].map((item, i) =>
              item === null
                ? <div key={i} className={styles.miniDivider} />
                : (
                  <div key={item.label} className={styles.miniStat}>
                    <span className={styles.miniStatVal}>{item.val}</span>
                    <span className={styles.miniStatLabel}>{item.label}</span>
                  </div>
                )
            )}
          </div>
        </div>

        {/* ════ RIGHT ════ */}
        <div className={cx(styles.right, { [styles.visible]: mounted })}>

          {/* Floating card — partner text (top-right, dark teal) */}
          <div className={cx(styles.floatCard, styles.cardPartner)}>
            <div className={styles.cardPartnerDots}>
              <span /><span /><span />
            </div>
            <div className={styles.cardPartnerText}>
              Your<br />Whole-Body<br />Care Partner
            </div>
          </div>

          {/* Main image */}
          <div className={styles.imageWrap}>
            <Image
              src={heroMeditation}
              alt="Sentira wellness"
              fill
              className={styles.heroImage}
              sizes="(max-width: 960px) 300px, 380px"
              priority
            />
          </div>

          {/* Floating card — heart bubble (left) */}
          <div className={cx(styles.floatCard, styles.cardHeart)}>
            <div className={styles.heartIcon}>💚</div>
            <div className={styles.heartText}>
              Daily Check-in
              <span>2 min · Every morning</span>
            </div>
          </div>

          {/* Floating card — streak (bottom-left) */}
          <div className={cx(styles.floatCard, styles.cardStreak)}>
            <div className={styles.streakIcon}>🔥</div>
            <div>
              <div className={styles.streakVal}>7 Day Streak</div>
              <div className={styles.streakLabel}>Keep going!</div>
            </div>
          </div>

          {/* Floating card — rating (bottom-right) */}
          <div className={cx(styles.floatCard, styles.cardRating)}>
            <div>
              <div className={styles.stars}>★★★★★</div>
              <div className={styles.ratingVal}>4.9 <span className={styles.ratingLabel}>/ 5.0</span></div>
              <div className={styles.ratingLabel}>App Store</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom info bar ── */}
      <div className={styles.infoBar}>
        <div className={styles.infoBarInner}>

          <div className={styles.infoBarItem}>
            <div className={styles.infoBarIconWrap}>🌐</div>
            <div>
              <div className={styles.infoBarLabel}>Visit our website</div>
              <div className={styles.infoBarValue}>www.sentira.app</div>
            </div>
          </div>

          <div className={styles.infoBarDivider} />

          <div className={styles.infoBarItem}>
            <div className={styles.infoBarIconWrap}>📧</div>
            <div>
              <div className={styles.infoBarLabel}>For more info</div>
              <div className={styles.infoBarValue}>hello@sentira.app</div>
            </div>
          </div>

          <div className={styles.infoBarDivider} />

          <div className={styles.infoBarItem}>
            <div className={styles.infoBarIconWrap}>📱</div>
            <div>
              <div className={styles.infoBarLabel}>Download app</div>
              <div className={styles.infoBarValue}>iOS &amp; Android</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
