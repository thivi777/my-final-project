"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userName", response.data.data.name);

        const roles = response.data.data.role; // e.g. ["user", "admin"]
        
        if (roles && roles.includes("admin")) {
          sessionStorage.setItem("adminToken", response.data.token); // Keep adminToken consistent for admin pages
          toast({ title: "Admin Authenticated", description: "Redirecting to control center..." });
          router.push("/admin/users");
        } else {
          toast({ title: "Welcome back! 🌿", description: "Redirecting to your dashboard..." });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthSplitLayout
      mode="login"
      title="Welcome back to your inner world."
      subtitle="Continue your journey of self-discovery and emotional growth with our psychology-first insights."
    >
      <div className="space-y-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl text-foreground mb-3">Sign in</h2>
          <p className="font-sans text-muted-foreground font-light text-base">
            Enter your details to access your mental landscape.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="pl-12 h-14 bg-accent/20 border-black/5 focus:bg-background transition-all rounded-2xl text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                Password
              </Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline font-bold tracking-tight">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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

          <div className="flex items-center gap-3 ml-1">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(v) => setRemember(v as boolean)}
              className="w-5 h-5 rounded-md border-black/5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground font-light cursor-pointer select-none">
              Keep me signed in
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
            <span className="bg-background px-4 text-muted-foreground/40">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <a href="http://localhost:5000/api/auth/google" className="block">
            <Button type="button" variant="outline" className="w-full h-14 rounded-2xl border-black/5 hover:bg-black/5 hover:border-black/10 transition-all shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.806L1.24 17.35C3.198 21.302 7.27 24 12 24c2.923 0 5.62-.976 7.7-2.67l-3.66-3.317z"/><path fill="#4A90E2" d="M19.98 12c0-.853-.1-1.666-.279-2.453H12v4.88h4.524c-.201 1.065-.805 1.942-1.644 2.502L18.498 20.3C20.627 18.32 22 15.424 22 12c0-1 0-1-.02-1z"/><path fill="#FBBC05" d="M5.266 14.235A7.054 7.054 0 014.909 12c0-.782.148-1.536.41-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.35l4.029-3.115z"/></svg>
            </Button>
          </a>
          <a href="http://localhost:5000/api/auth/apple" className="block">
            <Button type="button" variant="outline" className="w-full h-14 rounded-2xl border-black/5 hover:bg-black/5 hover:border-black/10 transition-all shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.07 1.52-.054 2.106-.976 3.931-.976 1.812 0 2.35.976 3.96.948 1.642-.026 2.664-1.488 3.65-2.927 1.15-1.674 1.622-3.298 1.649-3.385-.035-.015-3.174-1.218-3.199-4.88-.021-3.056 2.493-4.526 2.607-4.597-1.428-2.091-3.633-2.378-4.42-2.427-1.745-.119-3.414 1.066-4.581 1.066z"/><path fill="currentColor" d="M15.542 3.896c.828-1 1.385-2.396 1.233-3.784-1.19.049-2.646.794-3.504 1.83-.763.905-1.434 2.338-1.251 3.693 1.343.104 2.693-.733 3.522-1.739z"/></svg>
            </Button>
          </a>
          <a href="http://localhost:5000/api/auth/facebook" className="block">
            <Button type="button" variant="outline" className="w-full h-14 rounded-2xl border-black/5 hover:bg-black/5 hover:border-black/10 transition-all shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1877F2]" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.398h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 3.398h-2.33v6.479C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </Button>
          </a>
        </div>

        <div className="lg:hidden text-center pt-6 border-t border-black/5">
          <p className="text-sm text-muted-foreground font-light">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
