"use client";

import { useState, useEffect } from "react";
import { Send, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CATEGORIES = ['Anxiety', 'Confidence', 'Self-Love', 'Focus', 'General'];

export default function BroadcastPage() {
  const [affirmations, setAffirmations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [category, setCategory] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const fetchAffirmations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${apiUrl}/api/affirmations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAffirmations(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch affirmations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffirmations();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        "http://localhost:5000/api/affirmations",
        { text, author, category, isActive: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({ title: "Broadcast Sent! 🚀", description: "All users will now see this message." });
      setText("");
      fetchAffirmations();
    } catch (err: any) {
      toast({ 
        title: "Broadcast Failed", 
        description: err.response?.data?.message || err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this broadcast from the live user pool?")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/affirmations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "Broadcast Deleted" });
      fetchAffirmations();
    } catch (err) {
      toast({ title: "Delete Failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Content Broadcast</h2>
        <p className="text-slate-500 font-body mt-1">Send daily affirmations, motivation, and system messages directly to user dashboards.</p>
      </div>

      {/* Broadcast Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50">
        <h3 className="text-xl font-display font-semibold text-white mb-4">Create New Broadcast</h3>
        <form onSubmit={handleBroadcast} className="space-y-4 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Message Text</label>
            <Textarea
              placeholder="e.g. 'Take a deep breath. You are capable of amazing things today.'"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[100px] resize-none"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-slate-300">Category Tags</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-slate-300">Author Name</label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="e.g. Sentira Team"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !text.trim()} 
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white gap-2 mt-4"
          >
            <Send size={16} />
            {isSubmitting ? "Broadcasting..." : "Broadcast to All Users"}
          </Button>
        </form>
      </div>

      {/* Broadcast History */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 bg-slate-900/50">
          <h3 className="font-display font-semibold text-white">Live Broadcast Pool</h3>
          <p className="text-xs text-slate-500">These messages are actively being pushed to user dashboards.</p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">Content</TableHead>
              <TableHead className="text-slate-400">Category</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center text-slate-500">Loading broadcasts...</TableCell>
              </TableRow>
            ) : affirmations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500 opacity-60">
                    <AlertCircle size={32} className="mb-2" />
                    <p>No active broadcasts. Send one above to populate dashboards!</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              affirmations.map((a) => (
                <TableRow key={a._id} className="border-slate-800 hover:bg-slate-800/30">
                  <TableCell className="font-medium text-slate-200 py-4 max-w-md">
                    "{a.text}"
                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">By: {a.author}</div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-teal-400 uppercase tracking-wide">
                      {a.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex text-xs items-center gap-1.5 text-green-500 font-medium">
                      <CheckCircle2 size={14} /> Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDelete(a._id)}
                      className="text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
