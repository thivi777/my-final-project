"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface PremiumModalProps {
  onClose: () => void;
}

export default function PremiumModal({ onClose }: PremiumModalProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const { data } = await axios.post(
        `${apiUrl}/api/subscriptions/create-checkout-session`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to start checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-teal-900 rounded-[2.5rem] max-w-md w-full p-8 text-white overflow-hidden shadow-2xl shadow-teal-900/40 border border-white/10"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full -ml-20 -mb-20 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100/10 text-amber-200 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-amber-200/20 mx-auto">
              <Crown size={14} /> Sentira Plus
            </div>
            <h2 className="text-3xl font-bold font-display leading-tight">Unlock Premium</h2>
            <p className="text-teal-100/70 text-sm font-body px-4">
              Get unlimited access to all meditations, music, and advanced CBT wellness tools.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold font-display">$9.99</span>
              <span className="text-teal-300 font-body">/month</span>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <div className="space-y-4">
              {["Unlimited Sessions", "Advanced CBT Tools", "Custom Habit Triggers", "Offline Access"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center">
                    <Check size={12} className="text-teal-200" />
                  </div>
                  <span className="font-body text-sm text-teal-50/80">{item}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-white hover:bg-teal-50 text-teal-900 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "Upgrade to Premium"}
            </Button>
            <p className="text-center text-[10px] text-teal-400 font-body uppercase tracking-wider">
              Secure payment with Stripe. Cancel anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
