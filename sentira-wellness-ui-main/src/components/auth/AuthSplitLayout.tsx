"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import authBg from "@/assets/auth-bg.png";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  mode: "login" | "register";
  title: string;
  subtitle: string;
}

const AuthSplitLayout = ({ children, mode, title, subtitle }: AuthSplitLayoutProps) => {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background font-sans overflow-hidden">
      {/* Left Side: Visual & Brand with Mesh Gradient */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#faf9f6]">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-emerald-200/20 rounded-full blur-[80px]" 
          />
        </div>

        {/* Brand Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-black/5 text-foreground/80 hover:bg-white/60 transition-all">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              Sentira Intelligence
            </span>
            <h1 className="font-serif text-5xl xl:text-7xl text-foreground leading-[1.1] mb-8">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
              {subtitle}
            </p>
            
            <div className="pt-10 border-t border-black/5">
              <p className="text-muted-foreground/60 mb-4 text-[10px] uppercase tracking-[0.2em] font-bold">
                {isLogin ? "Already a member?" : "New to Sentira?"}
              </p>
              <Link 
                href={isLogin ? "/register" : "/login"}
                className="inline-flex items-center gap-3 text-primary font-serif text-3xl hover:gap-5 transition-all group"
              >
                {isLogin ? "Create account" : "Join the circle"}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          
          <div className="text-black/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            SENTIRA WELLNESS • ARCHIVE 2024
          </div>
        </div>
      </div>

      {/* Right Side: Form with Glassmorphism container */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-background relative overflow-y-auto">
        {/* Floating background shapes for mobile */}
        <div className="lg:hidden absolute inset-0 z-0 overflow-hidden opacity-20 blur-3xl">
           <div className="absolute top-0 left-0 w-full h-full bg-primary/20" />
        </div>

        <div className="w-full max-w-sm relative z-10">
          <div className="mb-10 lg:hidden">
            <Link href="/" className="text-primary font-medium inline-flex items-center gap-2">
               <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
