"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import cx from "clsx";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendType?: "up" | "down";
  description?: string;
  color?: string;
}

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendType = "up", 
  description,
  color = "#c4895a" 
}: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div 
          className={styles.iconWrap}
          style={{ backgroundColor: `rgba(${color}, 0.1)`, color: color } as any}
        >
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cx(styles.trend, styles[trendType])}>
            {trendType === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.value}>{value}</h3>
        <p className={styles.label}>{label}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div 
        className={styles.glow} 
        style={{ background: `radial-gradient(circle at center, ${color}22 0%, transparent 70%)` } as any}
      />
    </div>
  );
}
