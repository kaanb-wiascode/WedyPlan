"use client";

import React, { useState } from "react";
import { updateDnsRecordAction } from "@/lib/actions/platform-networking";

export default function DnsTlsManagerConsole() {
  const [domainName, setDomainName] = useState("api.wedyplan.com");
  const [recordType, setRecordType] = useState<any>("A");
  const [content, setContent] = useState("172.67.18.24");

  const handleUpdateDns = async () => {
    const res = await updateDnsRecordAction({
      domainName,
      recordType,
      content,
      proxied: true,
      ttlSeconds: 300,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🌐 DNS & Anycast Routing Console (Cloudflare Studio)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
          DNS Proxied
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Domain / Subdomain</label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-cyan-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kayıt Türü</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="A">A Record (IPv4)</option>
              <option value="AAAA">AAAA Record (IPv6)</option>
              <option value="CNAME">CNAME Alias</option>
              <option value="TXT">TXT Record</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef IP / Adres</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
          />
        </div>

        <button
          onClick={handleUpdateDns}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🌐 DNS Kaydını Güncelle & BGP'ye Yay
        </button>
      </div>
    </div>
  );
}
