"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Globe, 
  Coffee, 
  RefreshCw, 
  Lightbulb, 
  Star, 
  AlertCircle, 
  Medal, 
  BarChart, 
  PartyPopper, 
  Zap, 
  BatteryLow, 
  Timer, 
  Bell, 
  RotateCcw, 
  Waves, 
  Target, 
  MessageSquare, 
  Handshake, 
  Palette, 
  Gamepad2, 
  Calendar, 
  Anchor,
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Heart,
  MailCheck,
  UserPlus,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

type TText    = { id: string; type: "text";    icon: React.ReactNode; q: string; sub: string; placeholder: string; label: string };
type TOptions = { id: string; type: "options"; icon: React.ReactNode; q: string; sub: string; options: { i: string; t: string }[] };
type TMulti   = { id: string; type: "multi";   icon: React.ReactNode; q: string; sub: string; options: { i: string; t: string }[] };
type TScale   = { id: string; type: "scale";   icon: React.ReactNode; q: string; sub: string; min: number; max: number };
type Question = TText | TOptions | TMulti | TScale;
interface StepDef { label: string; icon: React.ReactNode; questions: Question[] }

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: StepDef[] = [
  {
    label: "About you",
    icon: <User className="w-4 h-4" />,
    questions: [
      {
        id: "name", type: "text", icon: <User className="w-5 h-5" />,
        q: "How can I call you?",
        sub: "We'll use this to personalise every interaction.",
        placeholder: "e.g. Alex", label: "Your name or nickname",
      },
      {
        id: "email_verify", type: "text", icon: <MailCheck className="w-5 h-5" />,
        q: "Let's quickly verify your email",
        sub: "We've sent a 6-digit code to your inbox. Please enter it below.",
        placeholder: "e.g. 123456", label: "Verification Code",
      },
      {
        id: "age", type: "options", icon: <UserPlus className="w-5 h-5" />,
        q: "How old are you?",
        sub: "This helps us tailor our wellness suggestions.",
        options: [
          { i: "👶", t: "Under 18" },
          { i: "🧒", t: "18 - 24" },
          { i: "🧑", t: "25 - 34" },
          { i: "🧔", t: "35 - 44" },
          { i: "👴", t: "45 - 54" },
          { i: "👵", t: "55+" },
        ],
      },
      {
        id: "work", type: "options", icon: <Briefcase className="w-5 h-5" />,
        q: "What is your primary occupation?",
        sub: "Work environment plays a big role in wellness.",
        options: [
          { i: "💼", t: "Professional / Corporate" },
          { i: "🎓", t: "Student / Academic" },
          { i: "🎨", t: "Creative / Freelance" },
          { i: "🏥", t: "Healthcare / Essential" },
          { i: "🛠️", t: "Technical / Trade" },
          { i: "🌍", t: "Other" },
        ],
      },
      {
        id: "morning_start", type: "options", icon: <Coffee className="w-5 h-5" />,
        q: "How do you usually start your day?",
        sub: "This helps us understand your natural rhythm.",
        options: [
          { i: "📱", t: "Check my phone first thing" },
          { i: "☕", t: "Quiet coffee or tea" },
          { i: "🏃", t: "Exercise or movement" },
          { i: "📓", t: "Journal or meditate" },
          { i: "⚡", t: "Straight into work" },
        ],
      },
    ],
  },
  {
    label: "Goals",
    icon: <Target className="w-4 h-4" />,
    questions: [
      {
        id: "top_priority", type: "options", icon: <Star className="w-5 h-5" />,
        q: "What's your top wellness priority right now?",
        sub: "Pick the one that matters most to you today.",
        options: [
          { i: "😴", t: "Better sleep" },
          { i: "🧘", t: "Less stress" },
          { i: "💪", t: "More energy" },
          { i: "🧠", t: "Mental clarity" },
          { i: "❤️", t: "Emotional balance" },
        ],
      },
      {
        id: "stress_area", type: "options", icon: <AlertCircle className="w-5 h-5" />,
        q: "Which area of life feels most stressful?",
        sub: "Identifying this helps us focus your plan.",
        options: [
          { i: "💼", t: "Work or career" },
          { i: "👨‍👩‍👧", t: "Relationships or family" },
          { i: "💰", t: "Finances" },
          { i: "🏥", t: "Health or body" },
          { i: "🔮", t: "Future uncertainty" },
        ],
      },
      {
        id: "small_win", type: "text", icon: <Medal className="w-5 h-5" />,
        q: "What's one small win that would make you happy this week?",
        sub: "Even tiny wins build real momentum.",
        placeholder: "e.g. Go to bed before midnight", label: "Your small win",
      },
      {
        id: "goal_style", type: "options", icon: <BarChart className="w-5 h-5" />,
        q: "Do you prefer measurable goals or reflective goals?",
        sub: "Both work — it's about what resonates with you.",
        options: [
          { i: "📈", t: "Measurable goals — stats & numbers" },
          { i: "🪞", t: "Reflective goals — feelings & growth" },
          { i: "⚖️", t: "A balance of both" },
        ],
      },
      {
        id: "celebrate", type: "options", icon: <PartyPopper className="w-5 h-5" />,
        q: "How do you want to celebrate progress?",
        sub: "Celebrating matters — let's make it meaningful.",
        options: [
          { i: "🏆", t: "Badges and achievements" },
          { i: "📊", t: "Seeing my stats grow" },
          { i: "📓", t: "A personal reflection note" },
          { i: "🔔", t: "A motivational message" },
          { i: "🤫", t: "Quietly — I prefer no fanfare" },
        ],
      },
    ],
  },
  {
    label: "Mindset",
    icon: <Waves className="w-4 h-4" />,
    questions: [
      {
        id: "unplanned_reaction", type: "options", icon: <Waves className="w-5 h-5" />,
        q: "How do you usually react when things don't go as planned?",
        sub: "No right or wrong — just helps us understand you.",
        options: [
          { i: "😤", t: "Get frustrated then reset" },
          { i: "😶", t: "Go quiet and withdraw" },
          { i: "🔍", t: "Analyse what went wrong" },
          { i: "🌀", t: "Feel overwhelmed for a while" },
          { i: "🤷", t: "Adapt and move on quickly" },
        ],
      },
      {
        id: "motivation_type", type: "options", icon: <Medal className="w-5 h-5" />,
        q: "What motivates you most?",
        sub: "We'll lean into this style throughout your journey.",
        options: [
          { i: "💬", t: "Encouragement — kind words & support" },
          { i: "📊", t: "Stats — tracking progress with numbers" },
          { i: "🪞", t: "Reflection — journaling & self-awareness" },
        ],
      },
      {
        id: "daily_feel_word", type: "text", icon: <MessageSquare className="w-5 h-5" />,
        q: "What's one word that describes how you want to feel every day?",
        sub: "This becomes your personal wellness intention.",
        placeholder: "e.g. Calm, Focused, Alive…", label: "Your intention word",
      },
      {
        id: "reminder_tone", type: "options", icon: <Target className="w-5 h-5" />,
        q: "Do you prefer gentle reminders or playful challenges?",
        sub: "We'll match our communication style to yours.",
        options: [
          { i: "🌸", t: "Gentle — soft and encouraging" },
          { i: "🎮", t: "Playful — fun micro-challenges" },
          { i: "⚖️", t: "A mix depending on my mood" },
        ],
      },
      {
        id: "struggling_support", type: "options", icon: <Handshake className="w-5 h-5" />,
        q: "How do you want us to support you when you're struggling?",
        sub: "We'll respect whatever feels right for you.",
        options: [
          { i: "🫂", t: "Compassionate check-ins" },
          { i: "📋", t: "A simple action to take right now" },
          { i: "🧘", t: "A breathing or grounding exercise" },
          { i: "🤫", t: "Give me space — I'll reach out when ready" },
        ],
      },
    ],
  },
  {
    label: "Your Style",
    icon: <Palette className="w-4 h-4" />,
    questions: [
      {
        id: "tone_pref", type: "options", icon: <Palette className="w-5 h-5" />,
        q: "What tone of voice feels most supportive to you?",
        sub: "We'll write every message in this voice.",
        options: [
          { i: "😊", t: "Friendly — warm and conversational" },
          { i: "💼", t: "Professional — clear and structured" },
          { i: "🎉", t: "Playful — light-hearted and fun" },
          { i: "🌿", t: "Reflective — calm and thoughtful" },
        ],
      },
      {
        id: "gamification", type: "options", icon: <Gamepad2 className="w-5 h-5" />,
        q: "Do you enjoy streaks and gamification, or prefer calm guidance?",
        sub: "Both approaches work — it's about what keeps you engaged.",
        options: [
          { i: "🏆", t: "Streaks & gamification — I love a challenge" },
          { i: "🌿", t: "Calm guidance — no pressure, just progress" },
          { i: "⚖️", t: "A balance of both" },
        ],
      },
      {
        id: "notification_content", type: "options", icon: <Bell className="w-5 h-5" />,
        q: "What would you like in your notifications?",
        sub: "We'll personalise every nudge to your preference.",
        options: [
          { i: "✨", t: "Inspirational quotes" },
          { i: "💡", t: "Practical tips" },
          { i: "🧘", t: "Short exercises" },
          { i: "🔀", t: "A mix of all three" },
        ],
      },
      {
        id: "checkin_frequency", type: "options", icon: <Calendar className="w-5 h-5" />,
        q: "How often should we check in with you?",
        sub: "You can always change this later in settings.",
        options: [
          { i: "📆", t: "Daily" },
          { i: "2️⃣", t: "Twice daily" },
          { i: "💼", t: "Weekdays only" },
          { i: "🔀", t: "Let me decide each day" },
        ],
      },
      {
        id: "personal_anchor", type: "text", icon: <Anchor className="w-5 h-5" />,
        q: "What's one personal anchor we can echo back to you?",
        sub: "A word, phrase, or symbol we'll weave into your reminders.",
        placeholder: "e.g. 'Keep going', a mantra, or an emoji…", label: "Your personal anchor",
      },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [curStep, setCurStep]   = useState(0);
  const [curQ, setCurQ]         = useState(0);
  const [answers, setAnswers]   = useState<Record<string, unknown>>({});
  const [finished, setFinished] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const step      = STEPS[curStep];
  const q         = step.questions[curQ];
  const totalQ    = STEPS.reduce((a, s) => a + s.questions.length, 0);
  const globalQ   = STEPS.slice(0, curStep).reduce((a, s) => a + s.questions.length, 0) + curQ;
  const progressPct = ((globalQ + 1) / totalQ) * 100;

  function setAns(id: string, val: unknown) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  function isAnswered(): boolean {
    const val = answers[q.id];
    if (q.type === "text")  return typeof val === "string" && val.trim().length > 0;
    if (q.type === "multi") return val instanceof Set && (val as Set<number>).size > 0;
    return val !== undefined && val !== null;
  }

  const handleFinished = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      
      const wellnessScore = 75; 

      const formattedAnswers = Object.entries(answers).map(([key, val]) => ({
        question: key,
        answer: String(val)
      }));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.post(
        `${apiUrl}/api/responses`,
        {
          answers: formattedAnswers,
          wellnessScore,
          type: "onboarding"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFinished(true);
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err: any) {
      console.error("Failed to save onboarding responses:", err);
      setError(err.response?.data?.message || "Failed to save your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function tryNext() {
    if (!isAnswered()) return;

    if (q.id === "email_verify") {
      try {
        setIsSubmitting(true);
        setError(null);
        const token = localStorage.getItem("token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        await axios.post(
          `${apiUrl}/api/auth/verify-email`,
          { code: answers["email_verify"] },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Invalid verification code");
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
    }

    if (curQ < step.questions.length - 1) {
      setCurQ(curQ + 1);
    } else if (curStep < STEPS.length - 1) {
      setCurStep(curStep + 1);
      setCurQ(0);
    } else {
      handleFinished();
    }
  }

  function handleBack() {
    if (curQ > 0) {
      setCurQ(curQ - 1);
    } else if (curStep > 0) {
      const prevStep = STEPS[curStep - 1];
      setCurStep(curStep - 1);
      setCurQ(prevStep.questions.length - 1);
    }
  }

  const isLastQ = curQ === step.questions.length - 1 && curStep === STEPS.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 bg-background max-w-[1440px] mx-auto shadow-2xl"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent) / 0.03) 100%)" }}
    >
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-30 blur-3xl bg-purple-300" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] rounded-full opacity-20 blur-3xl bg-teal-300" />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full opacity-20 blur-3xl bg-pink-300" />

      <div className="w-full max-w-lg relative z-10 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm border border-white/50">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Step {curStep + 1} of {STEPS.length}</h3>
                <p className="text-xs text-slate-500 font-medium">{step.label}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-purple-600">{Math.round(progressPct)}%</span>
            </div>
          </div>
          
          <div className="relative h-2.5 w-full bg-white/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/40 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-teal-400 to-pink-500 rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                i < curStep ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200" :
                i === curStep ? "bg-white border-purple-600 text-purple-600 shadow-xl shadow-purple-100 scale-110" :
                "bg-white/50 border-white text-slate-400 backdrop-blur-md"
              )}>
                {i < curStep ? <Check className="w-5 h-5" /> : s.icon}
              </div>
              <span className={cn(
                "hidden sm:block text-[10px] font-bold uppercase tracking-tighter transition-all",
                i <= curStep ? "text-purple-700 opacity-100" : "text-slate-400 opacity-50"
              )}>{s.label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/60 shadow-2xl text-center space-y-8"
              style={{ boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.15)" }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-teal-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-purple-200">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  You&apos;re all set, {String(answers["name"] || "there")}!
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your personalised wellness plan is ready. <br/>
                  Your journey starts now.
                </p>
              </div>
              <div className="p-6 bg-white/40 rounded-3xl border border-white shadow-sm italic text-slate-500 text-sm">
                &ldquo;Each step you take is a win for your future self.&rdquo;
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-600 font-bold animate-pulse">
                <Sparkles className="w-5 h-5" />
                <span>Redirecting to your dashboard...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${curStep}-${curQ}`}
              initial={{ opacity: 0, x: 20, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, rotateY: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white shadow-2xl relative overflow-hidden"
              style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="absolute -top-10 -right-10 opacity-[0.03] scale-[4] rotate-12 text-slate-900 pointer-events-none">
                {q.icon}
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-4 text-center">
                  <div className="inline-flex p-4 rounded-[1.5rem] bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl shadow-purple-200 mb-2">
                    {q.icon}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                      {q.q}
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base max-w-[85%] mx-auto">
                      {q.sub}
                    </p>
                  </div>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {q.type === "text" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">{q.label}</label>
                      <Input
                        autoFocus
                        placeholder={q.placeholder}
                        value={String(answers[q.id] ?? "")}
                        onChange={(e) => setAns(q.id, e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && tryNext()}
                        className="h-16 rounded-2xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-purple-500 focus:ring-purple-200 text-lg font-medium transition-all px-6 shadow-sm"
                      />
                      {q.id === "email_verify" && (
                        <div className="pt-3 text-center">
                          <button 
                            className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition" 
                            onClick={async () => {
                              try {
                                setIsSubmitting(true);
                                setError(null);
                                const token = localStorage.getItem("token");
                                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
                                await axios.post(
                                  `${apiUrl}/api/auth/resend-verification`,
                                  {},
                                  { headers: { Authorization: `Bearer ${token}` } }
                                );
                                alert("Verification code resent successfully!");
                              } catch (err: any) {
                                setError(err.response?.data?.message || "Failed to resend code");
                              } finally {
                                setIsSubmitting(false);
                              }
                            }}
                          >
                            Didn't receive it? Resend code
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {q.type === "options" && (
                    <div className="grid grid-cols-1 gap-3">
                      {q.options.map((o, i) => {
                        const sel = answers[q.id] === i;
                        return (
                          <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            key={i}
                            onClick={() => setAns(q.id, i)}
                            className={cn(
                              "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left group relative",
                              sel 
                                ? "border-purple-500 bg-purple-50/50 shadow-md shadow-purple-100" 
                                : "border-slate-100 bg-white/40 hover:border-purple-200 hover:bg-white/60"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all",
                              sel ? "bg-purple-500 shadow-lg text-white" : "bg-slate-100 text-slate-600 group-hover:bg-purple-100"
                            )}>
                              {o.i || <Check className={cn("w-5 h-5", sel ? "opacity-100" : "opacity-0")} />}
                            </div>
                            <span className={cn(
                              "flex-1 font-semibold text-base",
                              sel ? "text-purple-900" : "text-slate-600 group-hover:text-slate-900"
                            )}>{o.t}</span>
                            {sel && (
                              <motion.div layoutId="active-opt" className="absolute right-5">
                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-200">
                                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                                </div>
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === "scale" && (
                     <div className="flex flex-wrap gap-3 justify-center">
                       {Array.from({ length: q.max - q.min + 1 }, (_, k) => q.min + k).map((v) => {
                         const sel = answers[q.id] === v;
                         return (
                           <motion.button
                             whileHover={{ scale: 1.1, translateY: -4 }}
                             whileTap={{ scale: 0.9 }}
                             key={v}
                             onClick={() => setAns(q.id, v)}
                             className={cn(
                               "w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-xl transition-all",
                               sel 
                                 ? "border-purple-500 bg-purple-500 text-white shadow-xl shadow-purple-200" 
                                 : "border-slate-100 bg-white/40 text-slate-400 hover:border-purple-300 hover:text-purple-600"
                             )}
                           >
                             {v}
                           </motion.button>
                         );
                       })}
                     </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                  {(curQ > 0 || curStep > 0) && (
                    <Button 
                      variant="ghost" 
                      onClick={handleBack}
                      className="h-14 px-6 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all font-bold"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={tryNext}
                    disabled={!isAnswered()}
                    className={cn(
                      "flex-1 h-14 rounded-2xl text-base font-bold shadow-xl transition-all gap-2",
                      isAnswered() && !isSubmitting
                        ? "bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white shadow-purple-200" 
                        : "bg-slate-100 text-slate-300 border-none shadow-none cursor-not-allowed opacity-50"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <>
                        {isLastQ ? "Complete Setup" : "Continue"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                  Que {globalQ + 1} of {totalQ}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .backdrop-blur-2xl {
          backdrop-filter: blur(40px) saturate(180%);
        }
      `}</style>
    </div>
  );
}
