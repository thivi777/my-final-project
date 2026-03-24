"use client";

import { useState, useEffect } from "react";
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
  { icon: LayoutDashboard, label: "Dashboard", href: "/app" },
  { icon: SmilePlus, label: "Mood Tracker", href: "/app/mood" },
  { icon: Leaf, label: "Activities", href: "/app/activities" },
  { icon: BarChart3, label: "Insights", href: "/app/insights" },
  { icon: User, label: "Profile", href: "/app/profile" },
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
          const response = await fetch("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
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
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-display text-xl font-bold text-foreground tracking-tight">
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
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 lg:px-8">
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
