"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  User as UserIcon, 
  Mail, 
  Calendar,
  MoreVertical,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token || token === "undefined") {
        setLoading(false);
        return;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.get(`${apiUrl}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.data.users || res.data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      // Don't show toast if it's an auth error (let layout handles redirect)
      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast({ 
          title: "Connection Error", 
          description: "Could not retrieve user list from server.", 
          variant: "destructive" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "User Deleted", description: "The account has been removed from the system." });
      fetchUsers();
    } catch (err) {
      toast({ title: "Delete Failed", description: "Could not remove user.", variant: "destructive" });
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">User Management</h2>
          <p className="text-slate-500 font-body mt-1">Monitor and manage all registered wellness platform users.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search by name or email..." 
              className="bg-slate-900 border-slate-800 text-white pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={fetchUsers} variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800 h-11">
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl shadow-black/50">
        <Table>
          <TableHeader className="bg-slate-900/50">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-6">Profile</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Email Address</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Joined Date</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Account Status</TableHead>
              <TableHead className="text-right text-slate-400 font-bold uppercase text-[10px] tracking-widest pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-500 text-sm font-medium">Scanning User Database...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-50">
                    <AlertCircle className="w-12 h-12 text-slate-600" />
                    <span className="text-slate-500 text-sm font-medium">No users found in system.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id} className="border-slate-800 hover:bg-slate-800/30 transition-colors group">
                  <TableCell className="pl-6 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <span className="text-white text-sm font-semibold">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-600" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wide">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
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
