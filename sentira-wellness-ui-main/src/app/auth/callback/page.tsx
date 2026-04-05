"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const name = searchParams.get("name");
      const isNew = searchParams.get("isNew");

      if (token) {
        localStorage.setItem("token", token);
        if (name) {
          localStorage.setItem("userName", decodeURIComponent(name));
        }

        try {
          // Fetch user profile to check roles
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const { data } = await axios.get(`${apiUrl}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (data.success) {
            const user = data.data;
            const roles = user.role;
            
            if (roles?.includes("admin")) {
              localStorage.setItem("adminToken", token);
              toast({ title: "Admin Authenticated 🛡️", description: "Welcome to the control center." });
              router.push("/admin/users");
              return;
            }

            // Check if user was just created via OAuth OR hasn't completed onboarding yet
            if (isNew === "true" || !user.onboardingCompleted) {
              toast({ title: "Welcome! 🌿", description: "Let's personalize your experience..." });
              router.push("/onboarding");
            } else {
              toast({ title: "Welcome back! ✨", description: "Loading your dashboard..." });
              router.push("/dashboard");
            }
          }
        } catch (err) {
          console.error("Callback check failed:", err);
          toast({ 
            title: "Authentication failed", 
            description: "Unable to retrieve your profile. Please try again.", 
            variant: "destructive" 
          });
          router.push("/login");
        }
      } else {
        toast({
          title: "Authentication failed",
          description: "No token received from backend.",
          variant: "destructive",
        });
        router.push("/login");
      }
    };

    handleCallback();
  }, [router, searchParams, toast]);

  return (
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-purple-600 font-medium animate-pulse">Completing authentication...</p>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-600 font-medium animate-pulse">Loading...</p>
        </div>
      }>
        <CallbackInner />
      </Suspense>
    </div>
  );
}
