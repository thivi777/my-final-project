"use client";
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ActivitiesSection />
      <DashboardPreview />
      <PricingSection />
      <Footer />
    </div>
  );
}

