"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityThreatsBento() {
  const threatLogs = [
    { ip: "185.220.101.5", type: "TOR / Anonymous Proxy", target: "/admin/login", status: "BLOCKED_WAF", time: "2 Dk Önce" },
    { ip: "176.234.12.88", type: "Role Escalation Attempt", target: "/api/admin/roles", status: "SESSION_REVOKED", time: "12 Dk Önce" },
    { ip: "194.26.29.110", type: "Bulk Scraping Rate-Limit", target: "/api/vendors/search", status: "RATE_LIMITED", time: "24 Dk Önce" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Canlı Siber Tehdit & Anomali Kayıtları
      </span>

      <div className="space-y-2">
        {threatLogs.map((log, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -1 }}
            className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{log.ip}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  {log.type}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Hedef: {log.target} • {log.time}</span>
            </div>

            <span className="font-mono font-bold text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {log.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
