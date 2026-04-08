"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  SmilePlus,
  Leaf,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: SmilePlus, label: "Mood Tracker", href: "/dashboard/mood" },
  { icon: Leaf, label: "Activities", href: "/dashboard/activities" },
  { icon: BarChart3, label: "Insights", href: "/dashboard/insights" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const { data } = await axios.get(`${apiUrl}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
            setUser(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user in layout:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0",
          "bg-[#2e1a5e] border-r border-[#4a2d8a]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-[#4a2d8a]">
          <Link href="/" className="font-display text-xl font-bold text-[#f7f4ff] tracking-tight">
            🌿 Sentira
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#9b7fd4]/25 text-[#e8d8ff] border-l-2 border-[#9b7fd4]"
                    : "text-[#c4b0e8]/60 hover:bg-[#9b7fd4]/15 hover:text-[#f7f4ff]"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#4a2d8a]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium text-[#c4b0e8]/50 hover:bg-[#9b7fd4]/15 hover:text-[#ff9090] transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-[rgba(155,127,212,0.12)] bg-white flex items-center justify-between px-6 lg:px-8">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <span className="font-body text-sm font-medium text-foreground hidden sm:block">
              {user?.name || "Guest User"}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};


export default AppLayout;
