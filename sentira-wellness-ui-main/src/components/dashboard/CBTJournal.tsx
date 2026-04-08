"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Brain, CheckCircle2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { cn } from "@/lib/utils";
import { BookOpen, MessageCircle, Quote } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CBTJournalProps {
  onClose: () => void;
}

export default function CBTJournal({ onClose }: CBTJournalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello. I am Sentira. I'm here to listen without judgment. How are you feeling right now, and what's on your mind?"
    }
  ]);
  const [journalMode, setJournalMode] = useState<"diary">("diary");
  const [diaryContent, setDiaryContent] = useState("");
  const [reflection, setReflection] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleEndSession = async () => {
    setIsFinished(true);
    
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      let finalContent = diaryContent;

      await axios.post(`${apiUrl}/api/journals`, {
        title: `Diary Entry - ${new Date().toLocaleDateString()}`,
        content: finalContent,
        mood: "Calm",
        aiReflection: reflection || undefined
      }, { headers: { Authorization: `Bearer ${token}` } });

      await axios.post(`${apiUrl}/api/activities`, {
        type: "Diary Entry",
        duration: 5,
        status: "Completed",
        notes: `Completed private diary entry.`
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error("Failed to save session:", err);
    }
  };

  const handleGetReflection = async () => {
    if (!diaryContent.trim() || isLoading) return;
    setIsLoading(true);
    setReflection(null);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      
      const res = await axios.post(`${apiUrl}/api/ai/journal-reflection`, {
        content: diaryContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReflection(res.data.data.message);
    } catch (err) {
      console.error("Reflection failed:", err);
      setReflection("I've read your words, and I'm holding space for you. My reflection system is resting right now, but your feelings are completely valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      
      const res = await axios.post(`${apiUrl}/api/ai/journal-chat`, {
        message: userMessage,
        history: newMessages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const aiResponse = res.data.data.message;
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);

    } catch (err) {
      console.error("AI Chat failed:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having a little trouble connecting right now. Take a deep breath, and let's try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-6"
    >
      <div className="absolute top-6 right-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white/50 hover:text-white hover:bg-white/10 rounded-full">
          <X size={24} />
        </Button>
      </div>

      <div className="max-w-2xl w-full h-[85vh] bg-slate-900/50 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-md">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-gradient-to-r from-purple-500/10 to-teal-500/10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Private Diary</h2>
            <p className="text-sm text-white/50 mt-1">Write your thoughts freely. Sentira will reflect when you finish.</p>
          </div>
          {!isFinished && (
            <Button 
              variant="outline" 
              onClick={handleEndSession}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium"
            >
              Finish Entry
            </Button>
          )}
        </div>

        {/* Content Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
        >
          <AnimatePresence mode="wait">

              <motion.div
                key="diary-mode"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col space-y-6"
              >
                {!reflection ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold mb-2 px-2">
                       <Quote className="w-4 h-4" />
                       How are you today? Write freely...
                    </div>
                    <Textarea 
                      placeholder="Write your thoughts here. Sentira is listening and will reflect once you're done..."
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      disabled={isFinished}
                      className="flex-1 min-h-[300px] bg-white/5 border-white/10 text-white p-6 rounded-3xl focus:border-purple-500 focus:ring-purple-500/20 transition-all text-lg leading-relaxed resize-none"
                    />
                    {!isFinished && (
                      <Button 
                        onClick={handleGetReflection}
                        disabled={!diaryContent.trim() || isLoading}
                        className="h-14 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white rounded-2xl font-bold shadow-xl shadow-purple-900/20 gap-2 overflow-hidden group"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sentira is reflecting...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                            Get Sentira&apos;s Reflection
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-1 px-4 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                      Sentira&apos;s Reflection
                    </div>
                    <div className="p-8 bg-white/10 border border-white/5 rounded-[2rem] text-slate-100 text-lg leading-relaxed relative overflow-hidden backdrop-blur-3xl">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={48} className="text-purple-400 italic" />
                      </div>
                      {reflection}
                    </div>
                    {!isFinished && (
                      <div className="flex gap-4">
                         <Button 
                           variant="ghost" 
                           onClick={() => setReflection(null)}
                           className="flex-1 text-slate-400 hover:text-white hover:bg-white/5"
                         >
                           Keep Writing
                         </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
          </AnimatePresence>

          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 bg-teal-500/10 border border-teal-500/20 rounded-3xl text-center space-y-4"
            >
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-teal-500/20">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Session Completed</h3>
                <p className="text-slate-400 text-sm">You&apos;ve taken a great step for your mental health today.</p>
              </div>
              <Button onClick={onClose} className="w-full bg-teal-500 hover:bg-teal-400 text-white h-12 rounded-xl font-bold">
                Return to Dashboard
              </Button>
            </motion.div>
          )}
        </div>

        {!isFinished && !reflection && (
          <div className="p-4 border-t border-white/10 bg-slate-900/80 text-center">
             <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
              Private Diary Mode • Write as much as you need
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </motion.div>
  );
}
