"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  ShieldAlert, 
  ShieldCheck,
  Mail, 
  Key,
  Plus,
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

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
<<<<<<< HEAD
      const res = await axios.get("http://localhost:5000/api/admin/auth/admins", {
=======
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.get(`${apiUrl}/api/admin/auth/admins`, {
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      toast({ 
        title: "Access Denied", 
        description: "You do not have permission to view other administrators.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this administrator? They will lose all access immediately.")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/auth/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "Admin Removed", description: "The administrative account has been deactivated." });
      fetchAdmins();
    } catch (err) {
      toast({ title: "Action Failed", description: "Could not remove administrator.", variant: "destructive" });
    }
  };

  const filteredAdmins = admins.filter(a => 
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">System Administrators</h2>
          <p className="text-slate-500 font-body mt-1">Manage core system access and administrative privileges.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search administrators..." 
              className="bg-slate-900 border-slate-800 text-white pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20 gap-2">
            <Plus size={18} />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl shadow-black/50">
        <Table>
          <TableHeader className="bg-slate-900/50">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-6">Admin Name</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Email Address</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Authority Level</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Security Status</TableHead>
              <TableHead className="text-right text-slate-400 font-bold uppercase text-[10px] tracking-widest pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-500 text-sm font-medium">Verifying Credentials...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-50">
                    <AlertCircle className="w-12 h-12 text-slate-600" />
                    <span className="text-slate-500 text-sm font-medium">No other administrators found.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin._id} className="border-slate-800 hover:bg-slate-800/30 transition-colors group text-sm">
                  <TableCell className="pl-6 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 font-bold shadow-inner">
                        {admin.name?.charAt(0) || "A"}
                      </div>
                      <span className="text-white font-semibold">{admin.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 font-medium lowercase tracking-wide">
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-300 font-semibold">
                      <ShieldCheck size={14} className="text-red-500" />
                      Full Access
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-[2px]">
                      Protected
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                       <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800"
                      >
                        <Key size={14} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        onClick={() => handleDelete(admin._id)}
                      >
                        <Trash2 size={16} />
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
