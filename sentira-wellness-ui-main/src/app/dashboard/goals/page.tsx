"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Plus, 
  Target, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  ChevronRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", priority: "Medium", targetDate: "" });
  const { toast } = useToast();

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await axios.get(`${apiUrl}/api/goals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(res.data.data);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.post(`${apiUrl}/api/goals`, newGoal, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "Goal Created! 🎯", description: "Your new wellness objective has been set." });
      setShowAddModal(false);
      setNewGoal({ title: "", priority: "Medium", targetDate: "" });
      fetchGoals();
    } catch (err) {
      toast({ 
        title: "Error", 
        description: "Failed to create goal. Please check your inputs.", 
        variant: "destructive" 
      });
    }
  };

  const toggleGoalStatus = async (id: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.put(`${apiUrl}/api/goals/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await axios.delete(`${apiUrl}/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  const completedCount = goals.filter(g => g.status === "Completed").length;
  const progressPercent = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Wellness Goals
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Track your journey and celebrate your progress.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="rounded-full gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} />
          New Goal
        </Button>
      </motion.div>

      {/* Progress Overview */}
      <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 text-primary/10">
          <Target size={120} strokeWidth={1} />
        </div>
        <CardContent className="p-6 relative z-10 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-primary font-medium flex items-center gap-2">
                <Sparkles size={16} />
                Overall Progress
              </p>
              <h2 className="text-3xl font-display font-bold mt-1 text-foreground">
                {Math.round(progressPercent)}%
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-body">Achievements</p>
              <p className="font-display font-bold text-foreground">{completedCount} / {goals.length}</p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3 bg-primary/10 [&>div]:bg-primary" />
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-3">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-24 bg-accent/20 animate-pulse rounded-2xl" />)
        ) : goals.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-accent/5 rounded-3xl border border-dashed border-accent">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent-foreground/40">
              <Target size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold">No goals set yet</h3>
              <p className="text-muted-foreground text-sm font-body max-w-xs mx-auto">
                Setting small, achievable goals is the first step towards a healthier mental landscape.
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowAddModal(true)} className="rounded-full">
              Create your first goal
            </Button>
          </div>
        ) : (
          goals.map((goal, i) => (
            <motion.div 
              key={goal._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`group transition-all hover:bg-accent/5 ${goal.status === "Completed" ? "opacity-70" : ""}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <button 
                    onClick={() => toggleGoalStatus(goal._id, goal.status)}
                    className="shrink-0 transition-transform active:scale-95"
                  >
                    {goal.status === "Completed" ? (
                      <CheckCircle2 className="text-primary" size={28} />
                    ) : (
                      <Circle className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" size={28} />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-display font-bold truncate ${goal.status === "Completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {goal.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        goal.priority === "High" ? "bg-destructive/10 text-destructive" :
                        goal.priority === "Medium" ? "bg-soft-blue/10 text-soft-blue" :
                        "bg-soft-green/10 text-soft-green"
                      }`}>
                        {goal.priority}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => deleteGoal(goal._id)}
                    className="p-2 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border shadow-2xl rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-primary/5">
                <h3 className="font-display text-xl font-bold flex items-center gap-2">
                  <Target className="text-primary" /> Set New Goal
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddGoal} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-body">Goal Title</label>
                    <input 
                      required
                      className="w-full bg-accent/20 border-none rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none transition-all"
                      placeholder="e.g. Meditate for 10 minutes"
                      value={newGoal.title}
                      onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium font-body">Target Date</label>
                      <input 
                        required
                        type="date"
                        className="w-full bg-accent/20 border-none rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none transition-all text-sm"
                        value={newGoal.targetDate}
                        onChange={e => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium font-body">Priority</label>
                      <select 
                        className="w-full bg-accent/20 border-none rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none transition-all text-sm appearance-none"
                        value={newGoal.priority}
                        onChange={e => setNewGoal({ ...newGoal, priority: e.target.value })}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 rounded-xl text-lg font-semibold">
                    Set Objective
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
