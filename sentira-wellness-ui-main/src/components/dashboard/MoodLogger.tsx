"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2, Send, Bot, User, ArrowLeft } from "lucide-react";
import s from "./MoodLogger.module.scss";

// Predefined mood options mapped to scores (1-10)
const MOOD_OPTIONS = [
  { emoji: "😢", label: "Very Bad", score: 2 },
  { emoji: "🙁", label: "Bad", score: 4 },
  { emoji: "😐", label: "Okay", score: 6 },
  { emoji: "🙂", label: "Good", score: 8 },
  { emoji: "😄", label: "Great", score: 10 },
];

const PRESET_TAGS = ["Work", "Family", "Health", "Social", "Finance", "Sleep", "Exercise"];

interface MoodLoggerProps {
  onLogSaved?: (score: number, label: string) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function MoodLogger({ onLogSaved }: MoodLoggerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [trigger, setTrigger] = useState("");
  const [note, setNote] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showChat) {
      scrollToBottom();
    }
  }, [chatHistory, showChat]);

  const sendInitialContextToAI = async (moodData: any, submittedTags: string[], submittedTrigger: string, submittedNote: string) => {
    const contextMsg = `I am feeling ${moodData.label} today. ${submittedTags.length > 0 ? "Related factors: " + submittedTags.join(", ") + ". " : ""} ${submittedTrigger ? "Trigger: " + submittedTrigger + ". " : ""} ${submittedNote ? "Notes: " + submittedNote : ""}`;
    
    // Add silent initial context so AI knows what to talk about
    const initialHistory: ChatMessage[] = [{ role: 'user', content: contextMsg }];
    
    setIsChatSending(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await axios.post(
        `${apiUrl}/api/ai/chat`,
        { message: "Hi Sentira. I just logged my mood, can we talk?", history: initialHistory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setChatHistory([
        ...initialHistory,
        { role: 'assistant', content: response.data.data.message }
      ]);
    } catch (err) {
      toast({ title: "Sentira AI resting", description: "I couldn't process your chat right now, but your mood was saved.", variant: "destructive" });
    } finally {
      setIsChatSending(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    
    setIsChatSending(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await axios.post(
        `${apiUrl}/api/ai/chat`,
        { message: userMsg, history: chatHistory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setChatHistory(prev => [...prev, { role: "assistant", content: response.data.data.message }]);
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to Sentira.", variant: "destructive" });
    } finally {
      setIsChatSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) {
      toast({ title: "Please select a mood", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const moodData = MOOD_OPTIONS[selectedMood];
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      await axios.post(
        `${apiUrl}/api/mood-logs`,
        {
           moodScore: moodData.score,
           moodEmoji: moodData.emoji,
           tags: selectedTags,
           trigger: trigger || undefined,
           note: note || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Mood logged successfully! 🌿",
        description: "Your emotional state has been securely saved.",
      });

      // Transition to AI Chat instead of just resetting
      setShowChat(true);
      sendInitialContextToAI(moodData, selectedTags, trigger, note);

      if (onLogSaved) onLogSaved(moodData.score, moodData.label);
    } catch (err: any) {
      toast({
        title: "Failed to save mood log",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishChat = () => {
    setShowChat(false);
    setSelectedMood(null);
    setSelectedTags([]);
    setTrigger("");
    setNote("");
    setChatHistory([]);
  };

  if (showChat) {
    return (
      <div className={`${s.moodLogger} h-[550px] !p-0 flex flex-col overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/10 bg-[#060b26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Bot size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white tracking-wide">Sentira Companion</h3>
              <p className="text-xs text-indigo-400 font-medium tracking-wider">THERAPEUTIC CHAT SESSION</p>
            </div>
          </div>
          <button 
            onClick={handleFinishChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a] text-slate-300 text-sm font-semibold hover:bg-[#1e293b] transition-all border border-slate-800"
          >
            <ArrowLeft size={16} />
            I'm Done
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#020617] scroll-smooth">
          {chatHistory.filter((_, idx) => idx !== 0).length === 0 && !isChatSending && (
             <div className="flex justify-center mt-10"><Loader2 className="animate-spin text-indigo-500" /></div>
          )}
          {chatHistory.map((msg, idx) => {
            if (idx === 0) return null; // Hide the invisible system context injection
            return (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-violet-600' : 'bg-indigo-600'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600/20 border border-violet-500/30 text-violet-100 rounded-tr-none' : 'bg-[#0f172a] border border-slate-800 text-slate-200 rounded-tl-none shadow-lg shadow-black/20'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {isChatSending && chatHistory.length > 1 && (
            <div className="flex justify-start">
               <div className="bg-[#0f172a] p-4 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                 <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-75" />
                 <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-150" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-indigo-500/10 bg-[#060b26]">
          <form onSubmit={handleSendMessage} className="flex gap-3 relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Reflect on your mood with Sentira..."
              className="flex-1 bg-[#020617] border border-slate-800 text-slate-200 text-sm p-4 pr-14 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-body placeholder:text-slate-600 shadow-inner"
              disabled={isChatSending}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isChatSending}
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={s.moodLogger}>
      <div className={s.header}>
        <h3>How are you feeling right now?</h3>
        <p>Log your current emotion to track your wellness journey.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={s.emojiSelector}>
          {MOOD_OPTIONS.map((mood, idx) => (
            <button
              key={mood.score}
              type="button"
              className={`${s.emojiBtn} ${selectedMood === idx ? s.selected : ""}`}
              onClick={() => setSelectedMood(idx)}
            >
              <span className={s.emoji}>{mood.emoji}</span>
              <span className={s.label}>{mood.label}</span>
            </button>
          ))}
        </div>

        <div className={s.formFields}>
          <div className={s.field}>
            <label>What's affecting your mood? (Select tags)</label>
            <div className={s.tagsContainer}>
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${s.tag} ${selectedTags.includes(tag) ? s.selected : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={s.field}>
            <label>Specific Trigger (Optional)</label>
            <input
              type="text"
              className={s.input}
              placeholder="e.g. Big presentation, Argument with friend"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
            />
          </div>

          <div className={s.field}>
            <label>Notes / Journal (Optional)</label>
            <textarea
              className={s.textarea}
              placeholder="Jot down a few thoughts about how you're feeling..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <button type="submit" className={s.submitBtn} disabled={isSubmitting || selectedMood === null}>
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
          {isSubmitting ? "Logging Mood..." : "Save Log & Open Chat"}
        </button>
      </form>
    </div>
  );
}
