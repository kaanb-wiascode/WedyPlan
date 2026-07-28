"use client";

import React, { useState } from "react";
import { blockSecurityIpAddressAction, resolveSecurityIncidentAction } from "@/lib/actions/admin-security-ops";

export default function SecurityIncidentsTable({
  incidents,
}: {
  incidents: any[];
}) {
  const [banIp, setBanIp] = useState("");

  const handleBlockIp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banIp) return;

    const res = await blockSecurityIpAddressAction({
      ipAddress: banIp,
      reason: "SOC Operatör Manuel Karantina Kararı",
      durationHours: 24,
    });

    if (res.success) {
      alert("✨ " + res.message);
      setBanIp("");
    }
  };

  const handleResolve = async (incidentId: string) => {
    const res = await resolveSecurityIncidentAction({
      incidentId,
      actionTaken: "CONTAINED",
      notes: "İnsidant güvenli alana çekilip çözüldü.",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🛡️ Hızlı IP Karantina & İnsidant Çözüm Masası
        </span>
      </div>

      {/* Manuel IP Karantina Formu */}
      <form onSubmit={handleBlockIp} className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 space-y-3">
        <h4 className="font-bold text-rose-900 dark:text-rose-200 text-xs">🚫 Anında IP / Subnet Engelle (Cloudflare WAF Ban)</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="IP Adresi veya CIDR (Örn: 185.220.101.5)..."
            value={banIp}
            onChange={(e) => setBanIp(e.target.value)}
            className="flex-1 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-800 font-mono font-bold"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
          >
            IP'yi Karantinaya Al 🛡️
          </button>
        </div>
      </form>

      {/* İnsidant Listesi */}
      <div className="space-y-2">
        <span className="font-bold text-slate-700 dark:text-slate-200 block">Açık Siber İnsidantlar</span>
        <div className="space-y-2">
          {incidents.map((inc) => (
            <div key={inc.id} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100">{inc.title}</span>
                <span className="block text-[10px] text-slate-400 font-mono">Bileşen: {inc.component} • Risk: {inc.severity}</span>
              </div>
              <button
                onClick={() => handleResolve(inc.id)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
              >
                Çözüldü Olarak İşaretle ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
