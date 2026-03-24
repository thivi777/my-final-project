"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setSubmitted(true);
        setResetToken(response.data.resetToken);
        toast({ 
          title: "Reset link generated", 
          description: "For this demo, check the server console for the reset token." 
        });
      }
    } catch (err: any) {
      toast({
        title: "Request failed",
        description: err.response?.data?.message || "Please check the email address.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      mode="login"
      title="Recover your journey."
      subtitle="Don't worry, everyone loses their way sometimes. We'll help you find your way back to your mental landscape."
    >
      <div className="space-y-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl text-foreground mb-3">Forgot Password</h2>
          <p className="font-sans text-muted-foreground font-light text-base">
            {submitted 
              ? "We've generated a reset token for you." 
              : "Enter your email to receive a password reset link."}
          </p>
        </motion.div>

        {!submitted ? (
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
                  className="pl-12 h-14 bg-accent/20 border-black/5 focus:bg-background transition-all rounded-2xl text-base"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </form>
        ) : (
          <div className="space-y-8 text-center py-10 bg-accent/10 rounded-[2.5rem] border border-black/5">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="space-y-2 px-8">
              <h3 className="text-xl font-bold text-foreground">Token Generated</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Since this is a development environment, the reset token has been printed to the **Backend Server Console**, but you can also use the link below to test the reset flow directly:
              </p>
              <div className="mt-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
                <Link 
                  href={`/reset-password/${resetToken}`} 
                  className="text-sm text-primary font-bold hover:underline break-all"
                >
                  Click here to Test Password Reset Link
                </Link>
              </div>
            </div>
            <Link href="/login" className="inline-block text-sm text-primary font-bold hover:underline">
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </AuthSplitLayout>
  );
}
