"use client";

import React from "react";
import { Search, Bell, Menu, User } from "lucide-react";
import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn}>
          <Menu size={24} />
        </button>
        <div className={styles.greeting}>
          <h1>Welcome back, <span>{userName}</span></h1>
          <p>Let's check in with your wellness today.</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search insights..." />
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn}>
            <Bell size={20} />
            <span className={styles.badge} />
          </button>
          
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
