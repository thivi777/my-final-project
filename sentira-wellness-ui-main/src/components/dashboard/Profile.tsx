"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Edit2, Camera, Moon, Sun, Loader2, Crown } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Profile = () => {
  const [user, setUser]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme }   = useTheme();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  // Edit Profile States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const r = await axios.get(`${apiUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(r.data.data);
      setFormData({ name: r.data.data.name, email: r.data.data.email });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.put(`${apiUrl}/api/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Profile updated successfully! ✨");
      setIsEditModalOpen(false);
      fetchProfile();
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 for quick preview/upload
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        // Optimistically update UI
        setUser((prev: any) => ({ ...prev, avatar: base64String }));
        
        await axios.put(`${apiUrl}/api/users/profile`, { avatar: base64String }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Profile photo updated! 📸");
      } catch (err) {
        toast.error("Failed to upload photo. Please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  if(loading) return (
    <div className="flex h-64 items-center justify-center text-violet-500 font-medium">
      <Loader2 className="animate-spin mr-2" size={24} />
      Loading profile...
    </div>
  );

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-8 px-4"
      initial={{opacity: 0, y: 20}} 
      animate={{opacity: 1, y: 0}} 
      transition={{duration: 0.6, ease: "easeOut"}}
    >
      {/* Centered Minimalist Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative group mb-6 hover:cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-violet-100 flex items-center justify-center text-4xl text-violet-600 overflow-hidden shadow-2xl font-display font-medium transition-transform group-hover:scale-105">
            {user?.avatar ? <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" /> : <span>{user?.name?.[0]??"U"}</span>}
          </div>
          
          <input 
            type="file" 
            id="avatar-upload" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20 pointer-events-none">
            <Camera size={16} />
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white capitalize">{user?.name ?? "Your Name"}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 font-medium mb-6">
          <Mail size={14} />
          {user?.email ?? "your@email.com"}
        </p>

        <Button variant="outline" className="text-violet-600 border-violet-200 dark:border-violet-800/60 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/40 rounded-xl transition-all shadow-sm" onClick={() => setIsEditModalOpen(true)}>
          <Edit2 size={14} className="mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Account Status Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
            <Shield size={18} className="text-violet-500" />
            Account Status
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Member Since</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {mounted && user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "Mar 2026"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Current Plan</span>
              {user?.isPremium ? (
                <span className="font-bold flex items-center gap-1 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
                  <Crown size={14} /> Premium
                </span>
              ) : (
                <Link href="/dashboard/premium" className="font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 underline flex items-center gap-1">
                  Free (Upgrade)
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Preferences Array Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
          
          <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Preferences</h3>
            <p className="text-sm text-slate-500 mt-1">Manage your wellness app preferences and settings.</p>
          </div>

          <div className="p-2">
            <div 
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl cursor-pointer transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 fill-violet-600">
                  {mounted && theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-slate-500">Switch between light and dark themes</p>
                </div>
              </div>
              
              <div className={`w-12 h-6 rounded-full relative transition-colors bg-slate-200 dark:bg-violet-600`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${mounted && theme === "dark" ? "left-7" : "left-1"}`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl cursor-pointer transition-colors mt-2">
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Email Communications</p>
                  <p className="text-xs text-slate-500">Receive wellness tips and updates</p>
                </div>
              </div>
              
              <div className="w-12 h-6 rounded-full relative bg-violet-600">
                <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border shadow-2xl rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-violet-50">
                <h3 className="font-display text-xl font-bold text-slate-900">Update Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-body text-slate-700">Full Name</label>
                    <input 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 focus:ring-2 ring-violet-500 outline-none transition-all text-slate-900"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-body text-slate-700">Email Address</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 focus:ring-2 ring-violet-500 outline-none transition-all text-slate-900"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 rounded-xl h-12">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUpdating} className="flex-1 rounded-xl h-12 bg-violet-600 hover:bg-violet-700 text-white">
                    {isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function X({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

export default Profile;
