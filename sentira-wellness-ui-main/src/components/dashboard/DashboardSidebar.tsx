"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Heart, 
  Target, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  ShieldCheck
} from "lucide-react";
import cx from "clsx";
import styles from "./DashboardSidebar.module.scss";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardSidebarProps {
  isAdmin?: boolean;
}

export default function DashboardSidebar({ isAdmin = false }: DashboardSidebarProps) {
  const pathname = usePathname();

  const userNav: NavItem[] = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Moods", href: "/dashboard/mood", icon: Heart },
    { label: "My Goals", href: "/dashboard/activities", icon: Target },
    { label: "Journal", href: "/dashboard/insights", icon: BookOpen },
    { label: "Reflections", href: "/dashboard/insights", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/profile", icon: Settings },
  ];

  const adminNav: NavItem[] = [
    { label: "Admin Home", href: "/admin", icon: ShieldCheck },
    { label: "Users", href: "/admin/users", icon: User },
    { label: "Broadcast", href: "/admin/broadcast", icon: MessageSquare },
    { label: "Admins", href: "/admin/admins", icon: ShieldCheck },
    { label: "Analytics", href: "/admin", icon: LayoutDashboard },
    { label: "Settings", href: "/admin", icon: Settings },
  ];

  const navItems = isAdmin ? adminNav : userNav;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>S</div>
          <span>Sentira</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cx(styles.navLink, { [styles.active]: isActive })}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && <div className={styles.indicator} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
