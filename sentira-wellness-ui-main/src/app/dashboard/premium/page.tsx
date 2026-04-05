"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Shield, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const { data } = await axios.post(
        `${apiUrl}/api/subscriptions/create-checkout-session`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error("Failed to start checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, text: "Unlimited Meditation Sessions", desc: "Access our entire library of premium audio guides." },
    { icon: Star, text: "Advanced Sleep Prep", desc: "Exclusive multi-phase sequences for deep rest." },
    { icon: Shield, text: "Priority Support", desc: "Get help from wellness experts within 24 hours." },
    { icon: Crown, text: "Early Access", desc: "Try new features and activities before anyone else." },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase border border-amber-200"
        >
          <Crown size={16} /> Sentira Plus
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
          Unlock the Full <span className="text-teal-600">Sentira</span> Experience
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-body text-lg">
          Take your wellness journey to the next level with advanced tools, deeper insights, and unlimited meditation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Features List */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white border rounded-3xl space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <f.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-slate-800">{f.text}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-teal-900 rounded-[2.5rem] p-10 text-white overflow-hidden shadow-2xl shadow-teal-900/40"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full -ml-20 -mb-20 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-teal-200">Personal Plan</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold font-display">$9.99</span>
                <span className="text-teal-300 font-body">/month</span>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="space-y-4">
                {["Everything in Free", "Advanced CBT Tools", "Custom Habit Triggers", "Offline Access"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center">
                      <Check size={12} className="text-teal-200" />
                    </div>
                    <span className="font-body text-teal-50/80">{item}</span>
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
              <p className="text-center text-xs text-teal-400 font-body">
                Secure payment with Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
