"use client";
<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";

export default function HomePage() {
=======
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ActivitiesSection from '@/components/landing/ActivitiesSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/landing/PricingSection';

export default function HomePage() {
  const router = useRouter();

  // No auto-redirect; let user click Login to go to their dashboard
  useEffect(() => {
    // Optional: Pre-check if token is valid without redirecting
  }, []);

>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ActivitiesSection />
      <DashboardPreview />
<<<<<<< HEAD
=======
      <PricingSection />
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
      <Footer />
    </div>
  );
}

