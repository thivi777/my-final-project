"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import s from "./AuthSplitLayout.module.scss";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  mode: "login" | "register" | "forgot" | "reset";
  title?: string;
  subtitle?: string;
}

const PSYCHOLOGY_IMAGES = [
  "/images/activity-meditation.jpg",
  "/images/activity-breathing.jpg",
  "/images/activity-journaling.jpg",
];

const PSYCHOLOGY_QUOTES = [
  <>Nurture your mind,<br/>empower your soul</>,
  <>Find your balance,<br/>one breath at a time</>,
  <>A peaceful mind,<br/>a stronger you</>,
];

const AuthSplitLayout = ({ children, mode }: AuthSplitLayoutProps) => {
  const router = useRouter();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % PSYCHOLOGY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.root}>
      {/* Left Pane - Visual/Brand side */}
      <div className={s.leftPane}>
        <div className={s.carouselWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className={s.carouselImageContainer}
            >
              <Image
                src={PSYCHOLOGY_IMAGES[currentImgIndex]}
                alt="Psychology Wellness Background"
                fill
                priority
                className={s.carouselImage}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={s.leftTextContent}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentImgIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {PSYCHOLOGY_QUOTES[currentImgIndex]}
            </motion.h2>
          </AnimatePresence>
          <div className={s.dots}>
            {PSYCHOLOGY_IMAGES.map((_, idx) => (
              <span 
                key={idx} 
                className={`${s.dot} ${currentImgIndex === idx ? s.active : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane - Form side */}
      <div className={s.rightPane}>
        <div className={s.formSideInner}>
          
          <Link href="/" className={s.brandHeader} style={{ textDecoration: 'none' }}>
            <div className={s.brandLogoMark}>
              <Sparkles size={18} />
            </div>
            <span className={s.brandName}>sentira</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            key={mode}
            className={s.formContentWrapper}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
