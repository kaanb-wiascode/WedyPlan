"use client";

import React from "react";

export default function RolePermissionMatrix({
  roles,
}: {
  roles: any[];
}) {
  const permissionsList = [
    { key: "manage_leads", label: "Müşteri Talepleri (Leads) Yönetimi" },
    { key: "manage_proposals", label: "Teklif Hazırlama & Gönderme" },
    { key: "manage_contracts", label: "Dijital Sözleşme & İmza Yetkisi" },
    { key: "manage_finance", label: "Finans, Fatura & Banka Kasası" },
    { key: "view_calendar", label: "Operasyon Takvimi & Lojistik" },
    { key: "edit_portfolio", label: "Portföy & Görsel Galerisi" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🔐 Granüler Rol & Modül Yetkilendirme Matrisi
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
              <th className="py-3 px-2">Modül / İzin</th>
              <th className="py-3 px-2 text-center">Admin</th>
              <th className="py-3 px-2 text-center">Manager</th>
              <th className="py-3 px-2 text-center">Coordinator</th>
              <th className="py-3 px-2 text-center">Staff</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {permissionsList.map((perm) => (
              <tr key={perm.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{perm.label}</td>
                <td className="py-3 px-2 text-center text-emerald-600 font-bold">✓ Tam Yetki</td>
                <td className="py-3 px-2 text-center text-emerald-600 font-bold">✓ Tam Yetki</td>
                <td className="py-3 px-2 text-center text-amber-600 font-bold">● Sınırlı</td>
                <td className="py-3 px-2 text-center text-slate-400 font-bold">✕ Yok</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
