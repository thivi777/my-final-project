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
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-slate-200">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-[#020617] border-r border-[#1e293b]/50 flex flex-col shadow-2xl relative z-20">
        <div className="p-8 border-b border-[#1e293b]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white tracking-tight">Admin Console</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Sentira Core</p>
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
                    ? "bg-gradient-to-r from-indigo-600/20 to-violet-500/10 text-white border border-indigo-500/30 shadow-lg shadow-indigo-600/5"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn(isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400")} />
                  {item.label}
                </div>
                {isActive && <ChevronRight size={16} className="text-indigo-400/50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#1e293b]/50">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold text-slate-500 hover:bg-indigo-600/10 hover:text-indigo-400 transition-all"
          >
            <LogOut size={20} />
            Exit System
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none -ml-40 -mb-40" />
        
        <header className="h-20 bg-[#020617]/50 backdrop-blur-xl border-b border-[#1e293b]/50 flex items-center justify-between px-10 relative z-20">
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
              <span className="text-[10px] text-indigo-400 font-medium">Root Access</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/10">
              SA
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-auto overflow-x-hidden relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
