"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:5000/api/admin/auth/login", {
=======
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/admin/auth/login`, {
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        toast({ title: "Admin Authenticated", description: "Welcome to the control center." });
        router.push("/admin/users");
      }
    } catch (err: any) {
      toast({
        title: "Access Denied",
        description: err.response?.data?.message || "Invalid admin credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shadow-2xl shadow-red-500/20 mb-4">
            <ShieldAlert className="w-9 h-9 text-white" />
          </div>
          <CardTitle className="text-2xl font-display font-bold text-white tracking-tight">
            ADMIN PORTAL
          </CardTitle>
          <p className="text-slate-400 font-body text-sm">
            Restricted access for system administrators
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs uppercase tracking-wider font-bold">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="admin@sentira.com"
                  className="bg-slate-950 border-slate-800 text-white pl-10 h-12 rounded-xl focus:ring-red-500/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs uppercase tracking-wider font-bold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-800 text-white pl-10 h-12 rounded-xl focus:ring-red-500/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold shadow-lg shadow-red-600/20 transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Authorize Access"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
