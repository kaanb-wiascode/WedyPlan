"use client";

import React, { useState } from "react";
import { generateVendorApiKeyAction } from "@/lib/actions/vendor-security";

export default function AuditLogsAndApiKeyManager({
  auditLogs,
  apiKeys,
  vendorId,
}: {
  auditLogs: any[];
  apiKeys: any[];
  vendorId: string;
}) {
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    const res = await generateVendorApiKeyAction(vendorId, {
      keyName: newKeyName,
      scopes: ["read_leads", "write_proposals"],
      expirationDays: 90,
    });

    if (res.success && res.apiKey) {
      setCreatedKey(res.apiKey);
      setNewKeyName("");
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* API Key Yönetimi */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            🔑 API Anahtarları & Entegrasyon Erişim İzinleri
          </span>
        </div>

        {createdKey && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-600 block">✓ Oluşturulan API Anahtarınız (Lütfen Güvenli Bir Yere Kaydedin)</span>
            <code className="font-mono text-xs font-bold block text-slate-900 dark:text-slate-100 select-all p-2 bg-white dark:bg-slate-800 rounded-xl border">
              {createdKey}
            </code>
          </div>
        )}

        <form onSubmit={handleGenerateKey} className="flex gap-2">
          <input
            type="text"
            placeholder="API Anahtar Adı (Örn: CRM Entegrasyonu)..."
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition"
          >
            + API Key Üret
          </button>
        </form>
      </div>

      {/* Immutable Audit Logs (Denetim İzleri) */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Şifreli Denetim İzleri (Immutable Audit Logs)
        </span>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
              <th className="py-3 px-2">Eylem / Personel</th>
              <th className="py-3 px-2">Zaman</th>
              <th className="py-3 px-2">IP Adresi</th>
              <th className="py-3 px-2 text-right">Seviye</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                  {log.action}
                  <span className="block text-[10px] text-slate-400 font-normal">{log.performedBy}</span>
                </td>
                <td className="py-3 px-2 text-slate-500">{log.timestamp}</td>
                <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">{log.ipAddress}</td>
                <td className="py-3 px-2 text-right">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
