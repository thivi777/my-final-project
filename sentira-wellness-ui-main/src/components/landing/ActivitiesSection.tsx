"use client";
import { Wind, Brain, BookOpen, PieChart } from "lucide-react";
import Image from "next/image";
import ScrollReveal from '@/components/shared/ScrollReveal';
const activities = [
  {
    icon: Wind,
    title: "Breathing Exercises",
    subtitle: "Calm your nervous system",
    image: "/images/activity-breathing.jpg",
  },
  {
    icon: Brain,
    title: "Meditation",
    subtitle: "Find inner peace",
    image: "/images/hero-1.jpg",
  },
  {
    icon: BookOpen,
    title: "Journaling",
    subtitle: "Express your thoughts",
    image: "/images/activity-journaling.jpg",
  },
  {
    icon: PieChart,
    title: "Emotional Analytics",
    subtitle: "Understand your patterns",
    image: "/images/activity-analytics.jpg",
  },
];

const ActivitiesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
            Wellness Activities
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Explore activities designed to support your emotional balance every day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer hover:scale-[1.03] transition-transform duration-300">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <a.icon size={32} className="mb-3 text-primary-foreground opacity-90" />
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">{a.title}</h3>
                  <p className="font-body text-sm text-primary-foreground/80">{a.subtitle}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
