"use client";

import React from "react";
import styles from "../AdminDashboard.module.scss";

// Expanded mock data for full page view
const mockPayments = [
  { id: "sub_1A2b3C", amount: "$9.99", status: "Success", date: "2026-03-23 09:30 AM", user: "user1@example.com", plan: "Premium" },
  { id: "sub_4D5e6F", amount: "$9.99", status: "Success", date: "2026-03-22 14:15 PM", user: "user2@example.com", plan: "Premium" },
  { id: "sub_7G8h9I", amount: "$9.99", status: "Failed", date: "2026-03-22 11:20 AM", user: "user4@example.com", plan: "Premium" },
  { id: "sub_0J1k2L", amount: "$99.99", status: "Success", date: "2026-03-21 08:45 AM", user: "user5@example.com", plan: "Annual Base" },
  { id: "sub_3M4n5O", amount: "$9.99", status: "Success", date: "2026-03-20 16:10 PM", user: "user6@example.com", plan: "Premium" },
  { id: "sub_9E8d7C", amount: "$9.99", status: "Refunded", date: "2026-03-19 12:00 PM", user: "user7@example.com", plan: "Premium" },
  { id: "sub_6F5g4H", amount: "$99.99", status: "Success", date: "2026-03-18 09:55 AM", user: "user8@example.com", plan: "Annual Plus" },
];

export default function PaymentStatementsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Payment Statements</h2>
        <p className="text-slate-500 font-body mt-1">Review raw Stripe webhook captures and user transactions.</p>
      </div>

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2>Transaction History</h2>
        </div>
        <div className={styles.tableWrapper}>
           <table className={styles.table}>
              <thead>
                 <tr>
                    <th className="pl-6">Transaction ID</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Detailed Date</th>
                    <th className="pr-6">Billed User</th>
                 </tr>
              </thead>
              <tbody>
                 {mockPayments.map((pm, idx) => (
                    <tr key={idx}>
                       <td className="pl-6 font-mono text-xs opacity-70">{pm.id}</td>
                       <td className="font-semibold text-slate-300 text-sm">{pm.plan}</td>
                       <td className="font-bold text-indigo-300">{pm.amount}</td>
                       <td>
                          <span className={pm.status === "Success" ? "text-emerald-400 text-xs font-bold" 
                            : pm.status === "Failed" ? "text-rose-400 text-xs font-bold" 
                            : "text-amber-400 text-xs font-bold"}>
                            {pm.status}
                          </span>
                       </td>
                       <td className="opacity-60 text-xs font-mono">{pm.date}</td>
                       <td className="pr-6">
                          <span className="px-2 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-medium">
                            {pm.user}
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>
    </div>
  );
}
