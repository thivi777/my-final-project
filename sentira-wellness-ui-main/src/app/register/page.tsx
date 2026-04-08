"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import s from "@/components/auth/AuthSplitLayout.module.scss";

export default function RegisterPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const { toast } = useToast();
  const router    = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/auth/register`, { name, email, password });
      if (res.data.success) {
        localStorage.setItem("token",    res.data.data.token);
        localStorage.setItem("userName", res.data.data.user.name);
        toast({ title: "Welcome to Sentira! 🌿", description: "Let's personalize your experience..." });
        router.push("/onboarding");
      }
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.response?.data?.message || "Please try again later.", variant: "destructive" });
    }
  };

  return (
    <AuthSplitLayout mode="register">
      {/* Card heading */}
      <div className={s.formHeading}>
        <p>Register</p>
        <h2>Create account</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={s.fieldGroup}>
          {/* Name */}
          <div className={s.field}>
            <label className={s.label}>Full Name</label>
            <div className={s.inputWrap}>
              <input
                id="name"
                type="text"
                placeholder="How shall we call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={s.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className={s.field}>
            <label className={s.label}>Email Address</label>
            <div className={s.inputWrap}>
              <input
                id="email"
                type="email"
                placeholder="luke.ratajczyk@unikat.agency"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={s.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={s.field}>
            <label className={s.label}>Create Password</label>
            <div className={s.inputWrap}>
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className={`${s.input} ${s.inputWithToggle}`}
                required
              />
              <button type="button" className={s.eyeBtn} onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Action area */}
        <div className={s.submitActionArea}>
          <div className={s.helpText}>
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
          <div className={s.buttonRow}>
            <button type="submit" className={s.btnPrimary}>
              Register
            </button>
            <Link href="/login" className={s.btnSecondary}>
              Sign in
            </Link>
          </div>
        </div>
      </form>

      {/* Socials */}
      <div className={s.divider}><span>Or continue with</span></div>
      <div className={s.socialCircleRow}>
        <a href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/google`}>
          <button type="button" className={s.socialCircleBtn} aria-label="Google Login">
            <svg viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.806L1.24 17.35C3.198 21.302 7.27 24 12 24c2.923 0 5.62-.976 7.7-2.67l-3.66-3.317z"/>
              <path fill="#4A90E2" d="M19.98 12c0-.853-.1-1.666-.279-2.453H12v4.88h4.524c-.201 1.065-.805 1.942-1.644 2.502L18.498 20.3C20.627 18.32 22 15.424 22 12c0-1 0-1-.02-1z"/>
              <path fill="#FBBC05" d="M5.266 14.235A7.054 7.054 0 014.909 12c0-.782.148-1.536.41-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.35l4.029-3.115z"/>
            </svg>
          </button>
        </a>
        <a href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/apple`}>
          <button type="button" className={s.socialCircleBtn} aria-label="Apple Login">
            <svg viewBox="0 0 24 24" fill="#fff">
              <path d="M16.2 9.5c-.1-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.7-1.9-1.5-.2-3 1-3.8 1-1 0-2.2-1-3.4-1-1.6.1-3.2 1-4.1 2.5-1.8 3.2-.5 7.9 1.2 10.4.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.1-.8s1.8.8 3.1.8c1.3 0 2.2-1.3 3-2.5.9-1.4 1.3-2.7 1.3-2.8-.1-.1-2.2-.8-2.2-3.4zM12.9 5.5c.7-.8 1.1-1.9 1-3-.9.1-2.1.6-2.8 1.4-.6.7-1 1.8-1 2.9 1 0 2.1-.6 2.8-1.3z" />
            </svg>
          </button>
        </a>
      </div>
    </AuthSplitLayout>
  );
}
