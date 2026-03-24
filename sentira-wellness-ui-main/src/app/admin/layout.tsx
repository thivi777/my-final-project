"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: ShieldCheck, label: "Admin Management", href: "/admin/admins" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (!mounted) return null;

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-200">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white tracking-tight">Admin Console</h1>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Sentira Core</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-xl font-body text-sm font-semibold transition-all group",
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                  {item.label}
                </div>
                {isActive && <ChevronRight size={16} className="text-white/50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold text-slate-500 hover:bg-red-600/10 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            Exit System
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-10">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium tracking-wide text-sm uppercase">Admin Room</span>
            <ChevronRight size={14} className="text-slate-700" />
            <span className="text-white font-bold tracking-wide text-sm uppercase">
               {adminNav.find(n => n.href === pathname)?.label || "Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-white">System Admin</span>
              <span className="text-[10px] text-slate-500 font-medium">Root Access</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-red-500 font-bold shadow-inner">
              SA
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-auto overflow-x-hidden relative">
          {/* Subtle background glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
