"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast({ title: "Passwords match", description: "Please ensure both passwords are identical.", variant: "destructive" });
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await axios.put(`${apiUrl}/api/auth/reset-password/${token}`, {
        password,
      });

      if (response.data.message) {
        toast({ title: "Success! 🔒", description: "Your password has been reset. Please login with your new credentials." });
        router.push("/login");
      }
    } catch (err: any) {
      toast({
        title: "Reset failed",
        description: err.response?.data?.message || "Invalid or expired token.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      mode="login"
      title="Secure your account."
      subtitle="Set a strong new password to protect your mental journey and personal data."
    >
      <div className="space-y-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl text-foreground mb-3">Reset Password</h2>
          <p className="font-sans text-muted-foreground font-light text-base">
            Create a new password that you haven't used before.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">
              New Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 h-14 bg-accent/20 border-black/5 focus:bg-background transition-all rounded-2xl text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">
              Confirm New Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-12 pr-12 h-14 bg-accent/20 border-black/5 focus:bg-background transition-all rounded-2xl text-base"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
          >
            {loading ? "Resetting..." : "Reset Password"}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
