"use client";

import React, { useState } from "react";
import { Check, Loader2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ScrollReveal from '@/components/shared/ScrollReveal';
import styles from "./PricingSection.module.scss";

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "LKR">("USD");
  const router = useRouter();

  // Price IDs from environment variables
  const PRICE_IDS = {
    USD: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_USD || "price_USD_PLACEHOLDER",
    LKR: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_LKR || "price_LKR_PLACEHOLDER"
  };

  const handleUpgrade = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.info("Please register or login to upgrade to Premium.");
      router.push("/register");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const { data } = await axios.post(
        `${apiUrl}/api/subscriptions/create-checkout-session`,
        { priceId: PRICE_IDS[currency] },
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

  const plans = [
    {
      title: "Free",
      price: currency === "USD" ? "$0" : "Rs. 0",
      desc: "Perfect for starting your wellness journey.",
      features: [
        "Basic Mood Tracking",
        "Daily Check-ins",
        "Limited Meditation Library",
        "Standard Insights"
      ],
      buttonText: "Get Started",
      featured: false,
      onAction: () => router.push("/register")
    },
    {
      title: "Sentira Plus",
      price: currency === "USD" ? "$9.99" : "Rs. 3,000",
      desc: "Unlock the full potential of your mind.",
      features: [
        "Unlimited Meditation Sessions",
        "Advanced Sleep Prep Sequences",
        "Priority Expert Support",
        "Early Access to New Features",
        "Advanced CBT Tools",
        "Custom Habit Triggers"
      ],
      buttonText: "Upgrade to Plus",
      featured: true,
      onAction: handleUpgrade
    }
  ];

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.wrapper}>
        <ScrollReveal className={styles.header}>
          <div className={styles.labelRow}>
            <div className={styles.labelLine} />
            <span className={styles.labelText}>Pricing Plans</span>
            <div className={styles.labelLine} />
          </div>
          <h2 className={styles.title}>
            Choose Your <em>Journey</em>
          </h2>
          <p className={styles.description}>
            Invest in your mental clarity and emotional resilience with our flexible plans designed for every stage of wellness.
          </p>
        </ScrollReveal>

        {/* Currency Toggle */}
        <div className={styles.currencyToggle}>
          <span className={`${styles.label} ${currency === "USD" ? styles.active : ""}`}>USD</span>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={currency === "LKR"} 
              onChange={() => setCurrency(currency === "USD" ? "LKR" : "USD")}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={`${styles.label} ${currency === "LKR" ? styles.active : ""}`}>LKR</span>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.title} delay={i * 0.1}>
              <div className={`${styles.card} ${plan.featured ? styles.featured : ""}`}>
                {plan.featured && (
                  <div className={styles.tag}>
                    <Crown size={12} className="inline mr-1" /> Best Value
                  </div>
                )}
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <div className={styles.price}>
                  {plan.price}<span>/month</span>
                </div>
                <p className={styles.cardDesc}>{plan.desc}</p>
                
                <div className={styles.features}>
                  {plan.features.map((feature) => (
                    <div key={feature} className={styles.featureItem}>
                      <div className={styles.featureIcon}>
                        <Check size={12} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={plan.onAction}
                  disabled={loading && plan.featured}
                  className={`${styles.button} ${plan.featured ? "bg-white text-slate-900 hover:bg-slate-100" : ""}`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {loading && plan.featured ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
